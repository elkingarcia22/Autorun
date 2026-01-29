#!/usr/bin/env node

/**
 * Script para actualizar la configuración del MCP a la versión v3
 */

const fs = require('fs');
const path = require('path');

const mcpConfigPath = path.join(process.cwd(), '.cursor', 'mcp.json');

console.log('🔧 Actualizando configuración MCP a v3...');

// Leer configuración actual
let config = {};
if (fs.existsSync(mcpConfigPath)) {
  try {
    const content = fs.readFileSync(mcpConfigPath, 'utf-8');
    config = JSON.parse(content);
  } catch (error) {
    console.error('⚠️ Error leyendo configuración actual:', error.message);
    config = { mcpServers: {} };
  }
} else {
  config = { mcpServers: {} };
}

// Actualizar configuración de autorun
config.mcpServers = config.mcpServers || {};
config.mcpServers.autorun = {
  command: 'npx',
  args: [
    '-y',
    'tsx',
    'packages/autorun-core/src/cli/autorun-mcp-server-v3.ts'
  ],
  env: {
    NODE_ENV: 'production'
  }
};

// Asegurar que el directorio existe
const mcpDir = path.dirname(mcpConfigPath);
if (!fs.existsSync(mcpDir)) {
  fs.mkdirSync(mcpDir, { recursive: true });
}

// Escribir configuración actualizada
fs.writeFileSync(mcpConfigPath, JSON.stringify(config, null, 2), 'utf-8');

console.log('✅ Configuración MCP actualizada a v3');
console.log(`   📁 Archivo: ${mcpConfigPath}`);
console.log('   ⚠️ IMPORTANTE: Reinicia Cursor para que los cambios surtan efecto');
