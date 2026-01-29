#!/usr/bin/env node
/**
 * Diagnóstico completo end-to-end del MCP de Autorun
 * Verifica cada paso del proceso de configuración y ejecución
 */

import { spawn } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔍 DIAGNÓSTICO COMPLETO END-TO-END DEL MCP AUTORUN');
console.log('═══════════════════════════════════════════════════════════\n');

// PASO 1: Verificar archivos
console.log('PASO 1: Verificando archivos necesarios...');
const tsxPath = join(projectRoot, 'node_modules', '.bin', 'tsx');
// ✅ ACTUALIZADO: Usar MCP v2
const serverPath = join(projectRoot, 'packages', 'autorun-core', 'src', 'cli', 'autorun-mcp-server-v2.ts');

if (!existsSync(tsxPath)) {
  console.error(`❌ tsx NO existe: ${tsxPath}`);
  process.exit(1);
}
console.log(`✅ tsx existe: ${tsxPath}`);

if (!existsSync(serverPath)) {
  console.error(`❌ Servidor NO existe: ${serverPath}`);
  process.exit(1);
}
console.log(`✅ Servidor existe: ${serverPath}\n`);

// PASO 2: Verificar configuraciones
console.log('PASO 2: Verificando configuraciones...');
const homeDir = process.env.HOME;
const configPaths = [
  join(homeDir, '.cursor', 'mcp.json'),
  join(homeDir, 'Library', 'Application Support', 'Cursor', 'User', 'settings.json'),
  join(projectRoot, '.cursor', 'mcp.json'),
];

let configFound = false;
for (const configPath of configPaths) {
  if (existsSync(configPath)) {
    try {
      const config = JSON.parse(readFileSync(configPath, 'utf-8'));
      const servers = config.mcpServers || config.servers || {};
      if (servers.autorun) {
        console.log(`✅ Configuración encontrada en: ${configPath}`);
        console.log(`   Command: ${servers.autorun.command}`);
        console.log(`   Args: ${servers.autorun.args?.join(' ') || 'ninguno'}`);
        configFound = true;
      }
    } catch (error) {
      console.log(`⚠️ Error leyendo ${configPath}: ${error.message}`);
    }
  }
}

if (!configFound) {
  console.error('❌ No se encontró configuración de autorun en ningún archivo');
  process.exit(1);
}
console.log('');

// PASO 3: Probar ejecución del servidor
console.log('PASO 3: Probando ejecución del servidor...');
console.log('   Ejecutando servidor con stdio...\n');

const server = spawn(tsxPath, [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: {
    ...process.env,
    NODE_ENV: 'production',
  },
  cwd: projectRoot,
});

let serverReady = false;
let serverError = false;
let stdoutData = '';
let stderrData = '';

server.stdout.on('data', (data) => {
  stdoutData += data.toString();
  const lines = stdoutData.split('\n');
  stdoutData = lines.pop() || '';
  
  for (const line of lines) {
    if (line.trim()) {
      console.log(`📤 STDOUT: ${line}`);
      if (line.includes('Servidor iniciado') || line.includes('ready')) {
        serverReady = true;
      }
    }
  }
});

server.stderr.on('data', (data) => {
  stderrData += data.toString();
  const lines = stderrData.split('\n');
  stderrData = lines.pop() || '';
  
  for (const line of lines) {
    if (line.trim()) {
      console.log(`📥 STDERR: ${line}`);
      if (line.includes('Servidor iniciado') || line.includes('ready')) {
        serverReady = true;
      }
      if (line.includes('Error') || line.includes('error')) {
        serverError = true;
      }
    }
  }
});

server.on('error', (error) => {
  console.error(`❌ Error ejecutando servidor: ${error.message}`);
  serverError = true;
});

server.on('exit', (code, signal) => {
  console.log(`\n⚠️ Servidor terminó: código=${code}, señal=${signal}`);
  if (code === 0 && serverReady) {
    console.log('✅ Servidor funcionó correctamente');
  } else if (serverError) {
    console.log('❌ Servidor tuvo errores');
  } else {
    console.log('⚠️ Servidor terminó inesperadamente');
  }
});

// Enviar mensaje de inicialización MCP
setTimeout(() => {
  if (server.stdin.writable) {
    const initMessage = {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: {
          name: 'diagnostic-client',
          version: '1.0.0',
        },
      },
    };
    
    console.log('\n📤 Enviando mensaje de inicialización MCP...');
    server.stdin.write(JSON.stringify(initMessage) + '\n');
    
    setTimeout(() => {
      console.log('\n📤 Enviando request de listTools...');
      const listToolsMessage = {
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/list',
        params: {},
      };
      server.stdin.write(JSON.stringify(listToolsMessage) + '\n');
      
      setTimeout(() => {
        console.log('\n✅ Diagnóstico completado');
        server.kill();
        process.exit(serverReady ? 0 : 1);
      }, 2000);
    }, 1000);
  } else {
    console.error('❌ stdin no es escribible');
    server.kill();
    process.exit(1);
  }
}, 1000);

// Timeout de seguridad
setTimeout(() => {
  console.log('\n⏱️ Timeout alcanzado');
  server.kill();
  process.exit(serverReady ? 0 : 1);
}, 10000);

