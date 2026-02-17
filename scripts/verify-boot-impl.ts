
import { chromium, ConsoleMessage } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { startPreview, PreviewResult } from '../.agent/skills/autorun-preview/src/preview';

// --- CONFIGURATION ---
const REGISTRY_CHECK_PATHS = [
    '/registry-providers/ubits/components/accordion/manifest.json',
    '/registry-providers/ubits/components/card/manifest.json'
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

async function checkUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        http.get(url, (res) => {
            if (res.statusCode === 200) resolve(true);
            else resolve(false);
        }).on('error', () => resolve(false));
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
    let preview: PreviewResult | null = null;
    let browser = null;

    try {
        console.log('🚀 Starting Strict Boot Verification (Impl Mode)...');
        console.log(`📄 Target: ${targetFile}`);

        // 1. START PREVIEW SERVER (API)
        // Definitivo: Port 0, Clean Start
        preview = await startPreview({
            file: targetFile,
            port: 0,
            openBrowser: false,
            hotReload: false // Disable hot reload for verification stability
        });

        const baseUrl = `http://localhost:${preview.port}`;
        console.log(`✅ Server ready at ${baseUrl}`);

        // 2. HEALTH CHECK GATE
        console.log('❤️  Waiting for Health Check...');
        await waitForHealth(baseUrl);
        console.log('✅ System Healthy');

        // 3. FAST HTTP CHECK (Manifests)
        console.log('⚡ Running Fast HTTP Check...');
        for (const checkPath of REGISTRY_CHECK_PATHS) {
            const url = `${baseUrl}${checkPath}`;
            const ok = await checkUrl(url);
            if (!ok) {
                throw new Error(`Failed to fetch manifest: ${checkPath}. Check Registry path mapping.`);
            }
            console.log(`  ✅ HTTP 200: ${checkPath}`);
        }

        // 4. PLAYWRIGHT VERIFICATION
        console.log('🕵️  Running Runtime Verification (Playwright)...');
        browser = await chromium.launch();
        const page = await browser.newPage();

        // Console Trap
        const fatalErrors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                const text = msg.text();
                // Ignore generic network errors (handled by page.on('response'))
                // Ignore favicon and manifest issues
                if (!text.includes('favicon.ico') &&
                    !text.includes('manifest.json') &&
                    !text.includes('Failed to load resource')) {
                    fatalErrors.push(text);
                } else {
                    console.log(`⚠️  Ignored console error: ${text}`);
                }
            } else {
                // Log non-errors for debugging
                console.log(`PAGE LOG [${msg.type()}]: ${msg.text()}`);
            }
        });

        page.on('response', response => {
            if (response.status() === 404 || response.status() === 500) {
                const url = response.url();
                if (!url.includes('favicon.ico') && !url.includes('manifest.json')) {
                    console.error(`❌ Network Error (${response.status()}): ${url}`);
                    fatalErrors.push(`Network Error ${response.status()}: ${url}`);
                }
            }
        });

        // Navigate
        const previewUrl = preview.url;
        console.log(`🌐 Navigating to: ${previewUrl}`);
        await page.goto(previewUrl, { waitUntil: 'networkidle' });

        // Extract State
        const state = await page.evaluate(() => {
            return {
                protocol: window.location.protocol,
                bootRequired: (window as any).AUTORUN_BOOT_REQUIRED,
                booted: (window as any).__AUTORUN_BOOTED__,
                bootReport: (window as any).__AUTORUN_BOOT_REPORT__,
                catalog: (window as any).__AUTORUN_CATALOG__
            };
        });

        // 5. INVARIANTS CHECK
        const errors: string[] = [];

        // Protocol
        if (state.protocol !== 'http:' && state.protocol !== 'https:') {
            errors.push(`Invalid Protocol: ${state.protocol}. Must be http/https.`);
        }

        // Boot Flags
        if (state.bootRequired !== true) errors.push('window.AUTORUN_BOOT_REQUIRED is not true');
        if (state.booted !== true) errors.push('window.__AUTORUN_BOOTED__ is not true');

        // Status & Catalog
        if (!state.bootReport) {
            errors.push('window.__AUTORUN_BOOT_REPORT__ is missing');
        } else if (state.bootReport.status !== 'READY') {
            errors.push(`Boot Status is '${state.bootReport.status}' (Expected: READY)`);
        } else {
            // If READY, Catalog match be present and populated
            if (!state.catalog) {
                errors.push('Status is READY but window.__AUTORUN_CATALOG__ is missing');
            } else if (!state.bootReport.catalogSize || state.bootReport.catalogSize <= 0) {
                errors.push('Status is READY but catalogSize is 0');
            }
        }

        // Console Errors
        if (fatalErrors.length > 0) {
            console.error('\n❌ FATAL CONSOLE ERRORS DETECTED:');
            fatalErrors.forEach(e => console.error(`   - ${e}`));
            errors.push(`${fatalErrors.length} fatal console errors detected`);
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
            console.log('\n🚫 BLOCKED: BOOT NOT READY');
            process.exit(1);
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
        process.exit(1);
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
