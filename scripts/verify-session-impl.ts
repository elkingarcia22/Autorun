
import { spawn } from 'child_process';
import * as path from 'path';

// Orchestrator for "New Chat Ritual"
// npm run autorun:session:impl -- --file=./prototypes/x.html --mode maintenance

const args = process.argv.slice(2);

function runScript(scriptName: string, scriptArgs: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const cmd = 'tsx';
        const fullArgs = [path.join('scripts', scriptName), ...scriptArgs];

        console.log(`\n🔹 Executing: ${scriptName} ${scriptArgs.join(' ')}`);

        const child = spawn(cmd, fullArgs, { stdio: 'inherit', shell: true });

        child.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`${scriptName} failed with exit code ${code}`));
        });

        child.on('error', (err) => reject(err));
    });
}

function runCommand(command: string, args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        console.log(`\n🔹 Executing: ${command} ${args.join(' ')}`);
        const child = spawn(command, args, { stdio: 'inherit', shell: true });
        child.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`${command} failed with exit code ${code}`));
        });
        child.on('error', (err) => reject(err));
    });
}

async function main() {
    const isAutoStash = args.includes('--autostash');

    try {
        console.log('🚀 INITIALIZING AUTORUN SESSION...');

        // 1. BOOT CHECK
        await runScript('verify-boot-impl.ts', args);

        // 2. SCOPE CHECK
        try {
            await runScript('verify-scope-impl.ts', args);
        } catch (scopeError) {
            // If scope failed and --autostash is enabled
            if (isAutoStash) {
                console.log('\n🔄 Scope check failed. Attempting AUTO-FIX (--autostash)...');
                console.log('📦 Stashing changes: git stash push -u -m "autorun preflight"');

                try {
                    await runCommand('git', ['stash', 'push', '-u', '-m', '"autorun preflight"']);
                    console.log('✅ Stash successful. Retrying session checks...');

                    // RE-RUN CHECKS AFTER STASH
                    console.log('\n🔁 RE-RUNNING AUTORUN SESSION...');
                    await runScript('verify-boot-impl.ts', args);
                    await runScript('verify-scope-impl.ts', args);

                } catch (stashError) {
                    throw new Error(`Auto-stash failed: ${(stashError as Error).message}`);
                }
            } else {
                // Re-throw if no autostash
                throw scopeError;
            }
        }

        console.log('\n✅ SESSION READY. You may proceed.');

    } catch (error) {
        console.error('\n🛑 SESSION BLOCKED');
        console.error('   ' + (error as Error).message);
        process.exit(1);
    }
}

main();
