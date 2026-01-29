#!/usr/bin/env node
/**
 * Script temporal para ejecutar el wizard sin compilar
 * Usa tsx para ejecutar directamente desde TypeScript
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');
const wizardPath = join(projectRoot, 'packages/autorun-core/src/cli/autorun-init.ts');

console.log('🚀 Ejecutando wizard desde TypeScript...\n');

const child = spawn('npx', ['tsx', wizardPath, ...process.argv.slice(2)], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: {
        ...process.env,
        // Forzar que use los archivos .ts en lugar de .js
        NODE_OPTIONS: '--loader tsx'
    }
});

child.on('exit', (code) => {
    process.exit(code || 0);
});
