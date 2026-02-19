const fs = require('fs');
const path = require('path');

const files = [
    'vendor/ubits/packages/components/avatar/src/index.ts',
    'vendor/ubits/packages/components/button/src/index.ts',
    'vendor/ubits/packages/components/data-table/src/index.ts',
    'vendor/ubits/packages/components/drawer/src/index.ts',
    'vendor/ubits/packages/components/file-upload/src/index.ts',
    'vendor/ubits/packages/components/mask/src/index.ts',
    'vendor/ubits/packages/components/modal/src/index.ts',
    'vendor/ubits/packages/components/popover/src/index.ts',
    'vendor/ubits/packages/components/progress/src/index.ts',
    'vendor/ubits/packages/components/scroll/src/index.ts',
    'vendor/ubits/packages/components/sidebar/src/index.ts',
    'vendor/ubits/packages/components/status-tag/src/index.ts',
    'vendor/ubits/packages/components/subnav/src/index.ts',
    'vendor/ubits/packages/components/tabbar/src/index.ts',
    'vendor/ubits/packages/components/tooltip/src/index.ts'
];

files.forEach(file => {
    const filePath = path.resolve(process.cwd(), file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if already commented
        if (content.includes('// if (typeof window !== \'undefined\')')) {
            console.log(`Skipping ${file} (already commented)`);
            return;
        }

        // Regex to match the block at the end (assuming it is at the end)
        // We match: if (typeof window !== 'undefined') { ... }
        // We need to be careful about nested braces. 
        // Most of these files are simple. We can match until end of file if it's the last block.

        // Safer approach: Search for the specific string and comment out lines until end of block?
        // Or just replace the specific line `if (typeof window !== 'undefined')` with `/* if (typeof window !== 'undefined')` 
        // and the closing `}` with `} */`? No, balancing is hard.

        // Simple approach: Comment out the whole block line by line.
        const lines = content.split('\n');
        let inBlock = false;
        let braceCount = 0;
        let modified = false;

        const newLines = lines.map(line => {
            if (line.trim().startsWith('if (typeof window !== \'undefined\')')) {
                inBlock = true;
                braceCount = 0; // Reset, will count below
            }

            if (inBlock) {
                // Count braces to find end of block
                const open = (line.match(/\{/g) || []).length;
                const close = (line.match(/\}/g) || []).length;
                braceCount += open - close;

                const newLine = '// ' + line;

                if (braceCount === 0 && open > 0) {
                    // Just opened and closed on same line? Or end of block?
                    // Wait, braceCount tracks net balance.
                    // Initial state: braceCount = 0.
                    // On first line: braces might be { (count=1).
                }

                // If we drop back to 0 (and we had some open), we are done.
                // But typically braceCount starts at 0.
                // We need to track *cumulative* balance once inside.

                if (braceCount <= 0 && line.includes('}')) {
                    inBlock = false;
                }
                modified = true;
                return newLine;
            }
            return line;
        });

        if (modified) {
            fs.writeFileSync(filePath, newLines.join('\n'));
            console.log(`Updated ${file}`);
        } else {
            console.log(`No match in ${file}`);
        }

    } else {
        console.error(`File not found: ${file}`);
    }
});
