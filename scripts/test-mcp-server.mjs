#!/usr/bin/env node
/**
 * Script para probar el servidor MCP de Autorun
 * Simula cómo Cursor ejecutaría el servidor
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const tsxPath = join(projectRoot, 'node_modules', '.bin', 'tsx');
// ✅ ACTUALIZADO: Usar MCP v2
const serverPath = join(projectRoot, 'packages', 'autorun-core', 'src', 'cli', 'autorun-mcp-server-v2.ts');

console.log('🧪 Probando servidor MCP de Autorun...\n');
console.log(`📋 Command: ${tsxPath}`);
console.log(`📋 Args: ${serverPath}\n`);

// Simular cómo Cursor ejecutaría el servidor
const server = spawn(tsxPath, [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: {
    ...process.env,
    NODE_ENV: 'production',
  },
  cwd: projectRoot,
});

let stdoutBuffer = '';
let stderrBuffer = '';

server.stdout.on('data', (data) => {
  stdoutBuffer += data.toString();
  const lines = stdoutBuffer.split('\n');
  stdoutBuffer = lines.pop() || '';
  
  for (const line of lines) {
    if (line.trim()) {
      console.log(`📤 STDOUT: ${line}`);
    }
  }
});

server.stderr.on('data', (data) => {
  stderrBuffer += data.toString();
  const lines = stderrBuffer.split('\n');
  stderrBuffer = lines.pop() || '';
  
  for (const line of lines) {
    if (line.trim()) {
      console.log(`📥 STDERR: ${line}`);
    }
  }
});

server.on('error', (error) => {
  console.error(`❌ Error ejecutando servidor: ${error.message}`);
  console.error(`   Stack: ${error.stack}`);
  process.exit(1);
});

server.on('exit', (code, signal) => {
  if (code !== null) {
    console.log(`\n⚠️ Servidor terminó con código: ${code}`);
  } else if (signal) {
    console.log(`\n⚠️ Servidor terminado por señal: ${signal}`);
  }
  
  if (code === 0) {
    console.log('✅ Servidor se ejecutó correctamente');
  } else {
    console.log('❌ Servidor terminó con error');
  }
  
  process.exit(code || 1);
});

// Enviar mensaje de inicialización MCP
setTimeout(() => {
  const initMessage = {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'test-client',
        version: '1.0.0',
      },
    },
  };
  
  console.log('\n📤 Enviando mensaje de inicialización...');
  server.stdin.write(JSON.stringify(initMessage) + '\n');
  
  // Esperar respuesta
  setTimeout(() => {
    console.log('\n⏱️ Esperando respuesta del servidor...');
    setTimeout(() => {
      console.log('\n✅ Prueba completada');
      server.kill();
    }, 2000);
  }, 1000);
}, 1000);

// Timeout de seguridad
setTimeout(() => {
  console.log('\n⏱️ Timeout alcanzado, terminando servidor...');
  server.kill();
  process.exit(0);
}, 10000);


