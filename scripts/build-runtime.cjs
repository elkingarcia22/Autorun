
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const entryPoint = path.resolve(__dirname, '../packages/autorun-core/src/runtime/browser-entry.ts');
const outfile = path.resolve(__dirname, '../packages/autorun-core/dist/runtime/runtime-bundle.js');

console.log(`Building runtime bundle...`);
console.log(`Entry: ${entryPoint}`);
console.log(`Output: ${outfile}`);

if (!fs.existsSync(entryPoint)) {
    console.error(`❌ Entry point not found: ${entryPoint}`);
    process.exit(1);
}

esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    outfile: outfile,
    format: 'iife',
    platform: 'browser',
    target: ['es2020'],
    sourcemap: true,
    minify: false, // Keep it readable for debugging
    alias: {
        'fs': path.resolve(__dirname, '../packages/autorun-core/src/runtime/browser-stubs/fs.ts'),
        'path': path.resolve(__dirname, '../packages/autorun-core/src/runtime/browser-stubs/path.ts')
    }
}).then(() => {
    console.log('✅ Build successful');

    // Quick verification
    if (fs.existsSync(outfile)) {
        const stats = fs.statSync(outfile);
        console.log(`Bundle size: ${stats.size} bytes`);

        // Check for bridge
        const content = fs.readFileSync(outfile, 'utf-8');
        if (content.includes('initTemplateGlobalsBridge')) {
            console.log('✅ Bridge code detected in bundle');
        } else {
            console.error('❌ Bridge code NOT detected in bundle');
            process.exit(1);
        }
    } else {
        console.error('❌ Output file not created');
        process.exit(1);
    }
}).catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});
