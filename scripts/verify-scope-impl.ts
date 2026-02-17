
import { spawn } from 'child_process';

// --- CONFIGURATION ---
const ALLOWED_PATHS = [
    'prototypes/',
    'docs/walkthrough.md'
];

const IGNORED_PREFIXES = ['.agent/', 'Autorun/', 'artifacts/', 'node_modules/'];

// --- ARGS PARSING ---
const args = process.argv.slice(2);
const isMaintenanceMode = args.includes('maintenance') || args.some(a => a.includes('mode=maintenance'));
const isStrictUntracked = args.includes('--strict-untracked');

console.log('🛡️  Starting Scope Verification...');
if (isMaintenanceMode) {
    console.log('⚠️  RUNNING IN MAINTENANCE MODE');
} else {
    console.log('🔒 IMPLEMENTATION MODE: Only prototypes/ and docs/walkthrough.md allowed.');
    if (!isStrictUntracked) {
        console.log('   (Untracked files outside scope will be warned, not blocked)');
    }
}

function runCommandStream(cmd: string, args: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, { shell: true });
        let buffer = '';
        const lines: string[] = [];

        child.stdout.on('data', (data) => {
            buffer += data.toString();
            // Process lines as they come in
            let parts = buffer.split('\n');
            buffer = parts.pop() || ''; // Keep the last partial line
            lines.push(...parts);
        });

        child.on('close', (code) => {
            if (buffer) lines.push(buffer);
            // git diff/ls-files return 0 on success
            resolve(lines);
        });

        child.on('error', (err) => reject(err));
    });
}

function filterFiles(files: string[]): string[] {
    return files.filter(f =>
        f && f.trim() !== '' && !IGNORED_PREFIXES.some(prefix => f.startsWith(prefix))
    );
}

function checkViolations(files: string[]): string[] {
    const violations: string[] = [];
    for (const file of files) {
        // Check if file starts with any allowed path
        const isAllowed = ALLOWED_PATHS.some(allowed => file.startsWith(allowed) || file === allowed);

        if (!isAllowed) {
            violations.push(file);
        }
    }
    return violations;
}

async function verifyScope() {
    try {
        // 1. Get changed files
        console.log('   Scanning changed files...');

        // Use spawn to avoid maxBuffer issues
        const unstaged = await runCommandStream('git', ['diff', '--name-only']);
        const staged = await runCommandStream('git', ['diff', '--cached', '--name-only']);
        const untracked = await runCommandStream('git', ['ls-files', '--others', '--exclude-standard']);

        const trackedChanges = filterFiles([...new Set([...unstaged, ...staged])]);
        const untrackedChanges = filterFiles(untracked);

        const totalChanges = trackedChanges.length + untrackedChanges.length;

        if (totalChanges === 0) {
            console.log('✅ No changes detected.');
            process.exit(0);
        }

        // Calculate violations for summary
        const trackedViolations = checkViolations(trackedChanges);
        const untrackedViolations = checkViolations(untrackedChanges);

        console.log(`📝 Detected Changes (${totalChanges} files):`);
        console.log(`   - Changed tracked files: ${trackedChanges.length}`);

        if (untrackedViolations.length > 0) {
            const label = isStrictUntracked ? 'ERROR' : 'WARN';
            console.log(`   - Untracked out-of-scope: ${untrackedViolations.length} (${label})`);
        } else {
            console.log(`   - Untracked out-of-scope: 0`);
        }

        // 2. Validate against Allowlist (unless Maintenance Mode)
        if (isMaintenanceMode) {
            console.log('✅ Scope Verification PASSED (Maintenance Mode)');
            process.exit(0);
        }

        // Check tracked changes (ALWAYS FAIL if violation)
        if (trackedViolations.length > 0) {
            console.error('\n❌ SCOPE VIOLATION (Tracked/Staged Files)');
            console.error('   The following tracked files are modified outside the allowed scope:');
            trackedViolations.slice(0, 10).forEach(v => console.error(`   - ${v}`));
            if (trackedViolations.length > 10) console.error(`   ... and ${trackedViolations.length - 10} more.`);

            console.error('\n🛠️  FIX IT:');
            console.error('   To restore clean state and proceed:');
            console.error('   👉 git stash push -u -m "autorun preflight"');
            console.error('   OR');
            console.error('   👉 git restore ' + trackedViolations.slice(0, 3).join(' ') + (trackedViolations.length > 3 ? ' ...' : ''));

            console.error('\n🚫 BLOCKED: You modified existing files outside the allowed scope.');
            process.exit(1);
        }

        // Check untracked changes
        if (untrackedViolations.length > 0) {
            if (isStrictUntracked) {
                console.error('\n❌ SCOPE VIOLATION (Untracked Files - STRICT MODE)');
                console.error('   The following untracked files are outside the allowed scope:');
                if (untrackedViolations.length > 20) {
                    untrackedViolations.slice(0, 20).forEach(v => console.error(`   - ${v}`));
                    console.error(`   ... and ${untrackedViolations.length - 20} more.`);
                } else {
                    untrackedViolations.forEach(v => console.error(`   - ${v}`));
                }
                console.error('\n🚫 BLOCKED: Strict mode is enabled.');
                process.exit(1);
            } else {
                console.warn(`\n⚠️  WARNING: ${untrackedViolations.length} untracked files are out of scope.`);
                console.warn('   (Ignored in standard Implementation Mode. Use --strict-untracked to fail)');
            }
        }

        console.log('\n✅ Scope Verification PASSED');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error running scope verification:', error);
        process.exit(1);
    }
}

verifyScope();
