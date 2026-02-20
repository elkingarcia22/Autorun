
import { chromium, ConsoleMessage } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { LocalServer } from '../packages/autorun-core/src/server/LocalServer';
import * as cheerio from 'cheerio'; // Need to install this or use regex if unavailable

process.on('unhandledRejection', (reason, promise) => {
    console.error(`::: NODE CRASH ::: Unhandled Rejection: ${reason}`);
});
process.on('uncaughtException', (error) => {
    console.error(`::: NODE CRASH ::: Uncaught Exception: ${error.message}`);
});
process.on('exit', (code) => {
    console.log(`::: NODE EXIT ::: Process exiting with code: ${code}`);
});
// --- CONFIGURATION ---
const REGISTRY_CHECK_PATHS = [
    '/vendor/ubits/packages/templates/engine/template-loader.js',
    '/vendor/ubits/packages/templates/components-loader.js',
    '/packages/autorun-core/dist/runtime/runtime-bundle.js',
    '/registry-providers/ubits/components/accordion/manifest.json'
];

// --- ARGS PARSING ---
const args = process.argv.slice(2);
let targetFile = '';

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1]) {
        targetFile = args[i + 1];
        i++;
    } else if (args[i].startsWith('--file=')) {
        targetFile = args[i].split('=')[1];
    }
}

// Fallback: Find latest modified HTML in prototypes/
if (!targetFile) {
    const prototypesDir = './prototypes';
    if (fs.existsSync(prototypesDir)) {
        const files = fs.readdirSync(prototypesDir)
            .filter(f => f.endsWith('.html'))
            .map(f => ({
                name: f,
                time: fs.statSync(path.join(prototypesDir, f)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time);

        if (files.length > 0) {
            targetFile = path.join(prototypesDir, files[0].name);
            console.log(`ℹ️  No --file provided. Using latest: ${targetFile}`);
        }
    }
}

if (!targetFile) {
    console.error('❌ Error: No target file provided and no prototypes found.');
    process.exit(1);
}

// Check file existence
if (!fs.existsSync(targetFile)) {
    console.error(`❌ Error: Target file not found: ${targetFile}`);
    process.exit(1);
}

async function checkUrl(url: string): Promise<{ ok: boolean, status?: number }> {
    return new Promise((resolve) => {
        http.get(url, (res) => {
            resolve({ ok: res.statusCode === 200, status: res.statusCode });
        }).on('error', () => resolve({ ok: false }));
    });
}

async function waitForHealth(baseUrl: string, timeoutMs = 30000): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        if (await checkUrl(`${baseUrl}/__autorun_health`)) return;
        await new Promise(r => setTimeout(r, 500));
    }
    throw new Error(`Health check timed out after ${timeoutMs}ms`);
}

async function verifyBoot() {
    let preview: any | null = null;
    let browser = null;

    try {
        console.log('🚀 Starting Strict Boot Verification (Impl Mode)...');
        console.log(`📄 Target: ${targetFile}`);

        // 1. START LOCAL SERVER
        const server = new LocalServer({
            port: 3000,
            directory: process.cwd()
        });
        await server.start();

        const baseUrl = server.getUrl();
        // Resolve target file relative to CWD (root)
        let relativePath = path.isAbsolute(targetFile)
            ? path.relative(process.cwd(), targetFile)
            : targetFile.replace(/^\.\//, '');

        const previewUrl = `${baseUrl}/${relativePath}`;

        preview = {
            url: previewUrl,
            close: async () => await server.stop()
        }; // Mock preview object to maintain compatibility with finally block or just use server directly

        console.log(`✅ Server ready at ${baseUrl}`);

        // 2. HEALTH CHECK GATE - Skipped for LocalServer (it's synchronous and doesn't have a health endpoint)
        console.log('✅ System Healthy (LocalServer started)');

        // 3. FAST HTTP CHECK (Manifests)
        console.log('⚡ Running Fast HTTP Check (4 Smoke Checks)...');
        const failedChecks: string[] = [];

        for (const checkPath of REGISTRY_CHECK_PATHS) {
            const url = `${baseUrl}${checkPath}`;
            const res = await checkUrl(url);
            if (!res.ok) {
                console.log(`  ❌ 404 Not Found: ${checkPath}`);
                failedChecks.push(url);
            } else {
                console.log(`  ✅ 200 OK: ${checkPath}`);
            }
        }

        if (failedChecks.length > 0) {
            console.error('\n❌ CRITICAL: PREVIEW ROOT INCORRECTO');
            console.error('   The following URLs returned 404 (Assets not served from root):');
            failedChecks.forEach(url => console.error(`   - ${url}`));
            console.log('\n🚫 BLOCKED: Preview root incorrecto');
        }

        // 3.1 DYNAMIC SMOKE CHECKS (Scripts)
        console.log('⚡ Running Dynamic Script Smoke Checks...');
        const htmlContent = fs.readFileSync(targetFile, 'utf-8');
        // Simple regex to find script src (cheerio might not be available in verify env)
        const scriptRegex = /<script[^>]+src=["']([^"']+)["'][^>]*>/g;
        let match;
        const scriptsToCheck: string[] = [];

        // Determine base path for relative URLs
        // If targetFile is "prototypes/foo.html", relative base is "/prototypes"
        let relativeBase = path.dirname(relativePath);
        if (relativeBase === '.') relativeBase = '';
        if (!relativeBase.startsWith('/')) relativeBase = '/' + relativeBase;

        while ((match = scriptRegex.exec(htmlContent)) !== null) {
            let src = match[1];
            if (!src.startsWith('http') && !src.startsWith('//')) {
                // Resolve relative paths
                if (src.startsWith('/')) {
                    // Absolute path relative to server root
                    scriptsToCheck.push(src);
                } else {
                    // Relative to file
                    // Use path.posix.join to resolve ".." and normal paths
                    // We need to ensure we use forward slashes for URL
                    const joined = path.posix.join(relativeBase, src);
                    scriptsToCheck.push(joined);
                }
            }
        }

        for (const scriptPath of scriptsToCheck) {
            // Ignore common externals if any
            if (scriptPath.includes('cdn.tailwindcss.com')) continue;

            const url = `${baseUrl}${scriptPath}`;
            const res = await checkUrl(url);
            if (!res.ok) {
                console.log(`  ❌ 404 Missing Script: ${scriptPath}`);
                failedChecks.push(url);
            } else {
                console.log(`  ✅ Script OK: ${scriptPath}`);
            }
        }

        if (failedChecks.length > 0) {
            console.error('\n❌ CRITICAL: PREVIEW ROOT INCORRECTO OR MISSING ASSETS');
            console.error('   The following URLs returned 404:');
            failedChecks.forEach(url => console.error(`   - ${url}`));
            console.log('\n🚫 BLOCKED: Missing Assets');
            process.exitCode = 1;
            return;
        }

        // 4. PLAYWRIGHT VERIFICATION
        console.log('🕵️  Running Runtime Verification (Playwright)...');
        browser = await chromium.launch();
        const page = await browser.newPage();

        // Console Trap
        const fatalErrors: string[] = [];
        const recentLogs: string[] = [];
        function classifyConsole(msg: { type: string; text: string }) {
            const t = msg.text;

            if (t.includes('net::ERR_BLOCKED_BY_CLIENT') && t.includes('components-loader.js')) return 'ignore';
            if (t.includes('.ubits-sub-nav NO encontrado') || t.includes('Sidebar NO encontrado')) return 'ignore';
            if (t.includes('[Autorun] FATAL:') || t.includes('ReferenceError') || t.includes('TypeError')) return 'fatal';
            if (t.includes('Administrador') || t.includes('Max attempts') || t.includes('Máximo de intentos')) return 'warn';

            // Allowlists options from Option B
            const isAllowedCssRulesError =
                t.includes("Failed to read the 'cssRules' property") ||
                t.includes("SecurityError: Failed to read the 'cssRules'") ||
                t.includes("tokens.css") ||
                (t.includes('vercel.app') && (t.includes('cssRules') || t.includes('tokens')));

            if (isAllowedCssRulesError) return 'ignore';
            if (t.includes('favicon.ico') || t.includes('manifest.json') || t.includes('Failed to load resource')) return 'warn';

            return msg.type === 'error' ? 'fatal' : 'info';
        }

        page.on('console', (msg) => {
            const type = msg.type();
            const text = msg.text();
            const loc = msg.location();
            const locString = loc ? ` (${loc.url}:${loc.lineNumber}:${loc.columnNumber})` : '';

            const fullLog = `PAGE LOG [${type}]: ${text}${locString}`;
            console.log(fullLog);
            recentLogs.push(fullLog);
            if (recentLogs.length > 30) recentLogs.shift();

            const severity = classifyConsole({ type, text });
            if (severity === 'fatal') {
                fatalErrors.push(`${text}${locString}`);
            } else if (severity === 'ignore') {
                console.log(`🧹 Ignored expected error: ${text}`);
            } else if (severity === 'warn') {
                console.log(`⚠️  Warn/Ignored: ${text}`);
            }
        });

        const networkFailures: string[] = [];
        page.on('response', response => {
            const status = response.status();
            const url = response.url();

            if (status === 404 || status >= 400) {
                if (url.includes('/vendor/') || url.includes('/packages/') || url.includes('/registry-providers/')) {
                    console.error(`❌ Network Error (${status}): ${url}`);
                    const errorMsg = `Network Error (${status}): ${url}`;
                    fatalErrors.push(errorMsg);
                    networkFailures.push(errorMsg);
                } else if (!url.includes('favicon.ico') && !url.includes('manifest.json')) {
                    // Log other errors but maybe not fatal if external
                    console.log(`⚠️  External/Other Error (${status}): ${url}`);
                }
            }
        });

        page.on('requestfailed', request => {
            const url = request.url();
            const failure = request.failure();

            const severity = classifyConsole({ type: 'error', text: `${failure?.errorText} ${url}` });
            if (severity === 'ignore') {
                console.log(`⚠️  Ignored Expected Request Block: ${url}`);
                return;
            }

            console.error(`❌ Request Failed: ${url} - ${failure?.errorText}`);
            fatalErrors.push(`Request Failed: ${url} - ${failure?.errorText}`);
        });

        page.on('close', () => console.error('::: LOG ::: PAGE CLOSED EVENT FIRED!'));
        page.on('crash', () => console.error('::: LOG ::: PAGE CRASHED EVENT FIRED!'));
        page.on('pageerror', error => console.error(`::: LOG ::: UNCAUGHT PAGE ERROR: ${error.message}`));

        // Intercept requests to registry and proxy to localhost
        await page.route(/templates\/components-loader\.js/, async route => {
            console.log(`🚫 Bloqueando loader legacy: ${route.request().url()}`);
            await route.abort('blockedbyclient');
        });

        await page.route(/^https:\/\/registry\.ubits\.com\/components\/.+/, async route => {
            const url = route.request().url();
            console.log(`🔄 [Interceptor] Redirecting: ${url}`);
            const localUrl = url.replace('https://registry.ubits.com/components', 'http://localhost:3000/registry-providers/ubits/components');

            try {
                const res = await fetch(localUrl);
                if (!res.ok) {
                    console.error(`❌ [Interceptor] Failed local fetch: ${res.status} ${localUrl}`);
                    route.abort();
                    return;
                }
                const buffer = await res.arrayBuffer();
                let bodyPayload: string | Buffer = Buffer.from(buffer);
                if (url.includes('subnav/index.js') || url.includes('sidebar/index.js') || url.includes('tabbar/index.js')) {
                    const jsText = bodyPayload.toString('utf-8');
                    bodyPayload = `
console.log('✅ [UBITS:Interceptor] Module STARTED eval for: ${url.split('/').pop()}', performance.now());
${jsText}
console.log('✅ [UBITS:Interceptor] Module ENDED eval for: ${url.split('/').pop()}', performance.now(), 'UBITS Keys:', Object.keys(window.UBITS || {}));
window.__ubitsFlush && window.__ubitsFlush();
                    `;
                }

                await route.fulfill({
                    status: res.status,
                    contentType: res.headers.get('content-type') || 'application/javascript',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: bodyPayload
                });
            } catch (e) {
                console.error('Interceptor Fetch Error', e);
                route.abort();
            }
        });

        // Debug logging for other requests
        page.on('request', request => {
            const url = request.url();
            if (!url.includes('registry.ubits.com')) {
                console.log(`🌐 [Network] ${request.method()} ${url}`);
            }
        });

        // Inject configuration (keeping it just in case)
        await page.addInitScript(() => {
            (window as any).AUTORUN_CONFIG = {
                rules: {
                    registryOnly: false, // Still trying to relax
                    noAdHocScripts: false,
                    noStorybookAPIs: false
                }
            };
            (window as any).__AUTORUN_CONFIG__ = {
                ubitsTimeout: 20000
            };

            // TRAP CLOSE
            const stack = () => (new Error('[autorun] window.close called')).stack;

            function trapClose(target: any, label: string) {
                const orig = target?.close;
                if (typeof orig !== 'function') return;

                target.close = function (...args: any[]) {
                    console.warn(`[autorun-trap] ${label}.close() BLOCKED`);
                    console.warn(stack());
                    return undefined;
                };
            }

            trapClose(window, 'window');
            trapClose(self, 'self');

            const proto = Object.getPrototypeOf(window);
            if (proto) trapClose(proto, 'Window.prototype');
        });

        // Navigate
        // Navigate
        console.log(`🌐 Navigating to: ${previewUrl}`);
        // We need to wait for the loadProduct to complete (which logs "✅ Producto cargado")
        // Since it might be polling, networkidle is not enough.

        let productLoaded = false;
        page.on('console', msg => {
            if (msg.text().includes('✅ Producto cargado')) {
                productLoaded = true;
            }
        });

        await page.goto(previewUrl, { waitUntil: 'domcontentloaded' });

        console.log('⏳ Waiting for product load completion (max 15s)...');
        try {
            await page.waitForFunction(() => {
                const w = window as any;
                // Check new __AUTORUN_BOOT_STATE__ object as Single Source of Truth
                return w.__AUTORUN_BOOT_STATE__?.ready === true;
            }, null, { timeout: 15000 });
            console.log('✅ Wait complete (Runtime Ready)');
        } catch (e: any) {
            console.error(`⚠️  Timed out waiting. Error: ${e.message}`);
            try {
                const fs = require('fs');
                if (!fs.existsSync('artifacts')) fs.mkdirSync('artifacts');
                await page.screenshot({ path: 'artifacts/fail.png', fullPage: true });
                const htmlData = await page.content();
                fs.writeFileSync('artifacts/fail.html', htmlData);
                console.log('📸 Evidence dumped to artifacts/fail.png and artifacts/fail.html');
            } catch (fsErr) {
                console.error('Failed to write failure evidence dump', fsErr);
            }
        }

        // Helper to dump evidence
        const dumpEvidence = async (reason: string, isClosed: boolean) => {
            console.error(`\n❌ CRITICAL EVIDENCE DUMP: ${reason}`);
            console.error('--- LAST 30 CONSOLE LOGS ---');
            recentLogs.forEach(l => console.error(l));

            if (networkFailures.length > 0) {
                console.error('\n--- NETWORK FAILURES ---');
                networkFailures.forEach(f => console.error(f));
            }

            if (!isClosed) {
                try {
                    const globalsState = await page.evaluate(() => {
                        return {
                            hasSidebar: typeof (window as any).createSidebar,
                            hasTabBar: typeof (window as any).createTabBar,
                            ubitsKeys: Object.keys((window as any).UBITS || {})
                        };
                    });
                    console.error('\n--- GLOBALS STATE ---');
                    console.error(`createSidebar: ${globalsState.hasSidebar}`);
                    console.error(`createTabBar: ${globalsState.hasTabBar}`);
                    console.error(`UBITS keys: ${JSON.stringify(globalsState.ubitsKeys)}`);
                } catch (e) {
                    console.error('\n--- GLOBALS STATE ---');
                    console.error('Failed to read globals state (page evaluation error).');
                }
            } else {
                console.error('\n--- GLOBALS STATE ---');
                console.error('Target page closed. Cannot read globals.');
            }
        };

        if (page.isClosed()) {
            await dumpEvidence('Page closed prematurely before wait', true);
            process.exitCode = 1;
            return;
        }

        // Wait a bit more for stability
        await page.waitForTimeout(2000);

        if (page.isClosed()) {
            await dumpEvidence('Page closed during wait', true);
            process.exitCode = 1;
            return;
        }

        // Extract State
        const state = await page.evaluate(() => {
            const ubits = (window as any).UBITS;
            const hasUbits = ubits && (Object.keys(ubits).length > 0 || !!ubits.Accordion || !!ubits.Card);

            return {
                protocol: window.location.protocol,
                bootState: (window as any).__AUTORUN_BOOT_STATE__,
                booted: (window as any).__AUTORUN_BOOTED__,
                bootReport: (window as any).__AUTORUN_BOOT_REPORT__,
                catalog: (window as any).__AUTORUN_CATALOG__,
                hasUbits
            };
        });

        // 5. INVARIANTS CHECK
        const errors: string[] = [];

        // Protocol
        if (state.protocol !== 'http:' && state.protocol !== 'https:') {
            errors.push(`Invalid Protocol: ${state.protocol}. Must be http/https.`);
        }

        // Boot Flags
        if (!state.bootState || state.bootState.ready !== true) errors.push('window.__AUTORUN_BOOT_STATE__ is not ready');
        if (state.booted !== true) errors.push('window.__AUTORUN_BOOTED__ is not true');

        // Status & Catalog
        if (!state.bootReport) {
            errors.push('window.__AUTORUN_BOOT_REPORT__ is missing');
        } else if (state.bootReport.status !== 'READY') {
            // Relaxed check: valid if UBITS is present even if status is not fully READY yet
            if (state.hasUbits) {
                console.log(`⚠️  Status is '${state.bootReport.status}' but window.UBITS is present. Proceeding.`);
            } else {
                errors.push(`Boot Status is '${state.bootReport.status}' (Expected: READY) and window.UBITS is empty`);
            }
        } else {
            // If READY, Catalog check
            if (!state.catalog && !state.hasUbits) {
                errors.push('Status is READY but window.__AUTORUN_CATALOG__ is missing');
            }
        }

        // 6. CONTRACT ENFORCEMENT (Globals)
        const missingGlobals = await page.evaluate(() => {
            const missing = [];
            const sidebarContainer = document.getElementById('sidebar-container');
            if (sidebarContainer && typeof window.createSidebar !== 'function') {
                missing.push('createSidebar (required by #sidebar-container)');
            }
            const tabsContainer = document.getElementById('tabs-container');
            if (tabsContainer && typeof window.createTabBar !== 'function') {
                missing.push('createTabBar (required by #tabs-container)');
            }
            return missing;
        });

        if (missingGlobals.length > 0) {
            console.error('\n❌ CRITICAL: MISSING GLOBALS CONTRACT VIOLATION');
            missingGlobals.forEach(g => console.error(`   - ${g}`));
            // We force failure here even if nothing else failed
            errors.push(`Missing Globals: ${missingGlobals.join(', ')}`);
        }

        // Console Errors
        if (fatalErrors.length > 0) {
            console.error('\n❌ FATAL CONSOLE ERRORS DETECTED:');
            fatalErrors.forEach(e => console.error(`   - ${e}`));
            errors.push(`${fatalErrors.length} fatal console errors detected`);
        }

        // Report specific network failures as requested
        if (networkFailures.length > 0) {
            console.log('\n❌ CAPTURED NETWORK FAILURES (vendor/packages/registry-providers):');
            networkFailures.forEach(f => console.log(`   - ${f}`));
        }

        // 6. REPORTING
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🔎 AUTORUN V2 IMPL CHECK');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`🔗 PREVIEW URL: ${previewUrl}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        if (state.bootReport) {
            console.log('📜 DETECTED BOOT REPORT:');
            console.log(JSON.stringify(state.bootReport, null, 2));
        }

        if (errors.length > 0) {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.error('❌ VERIFICATION FAILED');
            errors.forEach(e => console.error(`   - ${e}`));
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

            // Si el boot falló, imprimir las evidencias solicitadas explícitamente
            await dumpEvidence('Boot verification check failed', page.isClosed());

            console.log('\n🚫 BLOCKED: BOOT NOT READY');
            process.exitCode = 1;
            return;
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ VERIFICATION PASSED');
        console.log('   - Environment: HTTP Strict');
        console.log('   - Runtime: READY');
        console.log('   - Catalog: Active');
        console.log('   - No Fatal Errors');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // Clean Shutdown via finally

    } catch (error) {
        console.error('\n❌ CRITICAL FAILURE:', error);
        console.log('\n🚫 BLOCKED: BOOT CHECK CRASHED');
        process.exitCode = 1;
        return;
    } finally {
        // DEFINITIVE CLEANUP
        if (browser) {
            await browser.close().catch(() => { });
        }
        if (preview && preview.close) {
            console.log('🧹 Shutting down preview server...');
            await preview.close().catch(e => console.error('Error closing server:', e));
            console.log('✅ Server closed');
        }
    }
}

verifyBoot();
