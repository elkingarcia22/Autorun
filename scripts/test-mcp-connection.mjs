#!/usr/bin/env node

/**
 * Script para probar la conexión del MCP de autorun
 * y diagnosticar problemas
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔍 [Test MCP] Probando conexión del MCP de autorun...');
console.log(`   📍 Directorio: ${projectRoot}`);

// Probar iniciar el servidor MCP
const serverPath = join(projectRoot, 'packages/autorun-core/src/cli/autorun-mcp-server-v3.ts');

console.log(`   📁 Servidor: ${serverPath}`);

// Verificar que el archivo existe
import { existsSync } from 'fs';
if (!existsSync(serverPath)) {
  console.error(`   ❌ Archivo no encontrado: ${serverPath}`);
  process.exit(1);
}

console.log(`   ✅ Archivo encontrado`);

// Intentar iniciar el servidor con timeout
const child = spawn('npx', ['-y', 'tsx', serverPath], {
  cwd: projectRoot,
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env, NODE_ENV: 'production' }
});

let stdout = '';
let stderr = '';

child.stdout.on('data', (data) => {
  stdout += data.toString();
  console.log(`   📤 STDOUT: ${data.toString().trim()}`);
});

child.stderr.on('data', (data) => {
  stderr += data.toString();
  console.error(`   📥 STDERR: ${data.toString().trim()}`);
});

child.on('error', (error) => {
  console.error(`   ❌ Error iniciando servidor: ${error.message}`);
  process.exit(1);
});

// Esperar 3 segundos para ver si el servidor inicia correctamente
setTimeout(() => {
  console.log('\n✅ [Test MCP] Servidor iniciado correctamente');
  console.log(`   📊 STDOUT (${stdout.length} caracteres)`);
  console.log(`   📊 STDERR (${stderr.length} caracteres)`);
  
  if (stderr.includes('Servidor iniciado correctamente')) {
    console.log('   ✅ Servidor MCP funcionando correctamente');
  } else {
    console.log('   ⚠️ Servidor iniciado pero no se confirmó el mensaje esperado');
  }
  
  child.kill();
  process.exit(0);
}, 3000);
