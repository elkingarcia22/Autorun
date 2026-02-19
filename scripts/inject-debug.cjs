
const fs = require('fs');
const path = require('path');

const bundlePath = path.resolve(__dirname, '../prototypes/assets/components-bundle.js');
const content = fs.readFileSync(bundlePath, 'utf8');
const lines = content.split('\n');

// 0-indexed log injections
// Line 13679 in 1-indexed is index 13678
// We want to insert BEFORE the line or prepend to it.
// The line 13679 (1-indexed) is: "    const POPOVER_WIDTHS = {"
// We want: "console.log('🔥 Gap Start Safe');    const POPOVER_WIDTHS = {"

const injections = [
    { line: 13679, text: 'console.log("🔥 Gap Start Safe"); ' },
    { line: 14323, text: 'console.log("🔥 Mask Start"); ' }
];

// Sort injections by line number descending to avoid shifting indices if we were splicing
// But since we are modifying lines in place (prepending), index doesn't shift for subsequent lines.
// However, if we INSERT lines, indices shift.
// I will prepend to the line content.

injections.forEach(inj => {
    const index = inj.line - 1; // 1-indexed to 0-indexed
    if (lines[index]) {
        lines[index] = inj.text + lines[index];
        console.log(`Injected at line ${inj.line}: ${lines[index].substring(0, 50)}...`);
    } else {
        console.error(`Line ${inj.line} out of bounds!`);
    }
});

fs.writeFileSync(bundlePath, lines.join('\n'));
console.log('Injection complete.');
