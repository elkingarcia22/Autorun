#!/usr/bin/env node

/**
 * ✅ CLI para Autorun MCP Server v3
 *
 * Versión simple y robusta
 */

import { startAutorunMCPServerV3 } from '../mcp-server-v3/server.js';

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  console.error('❌ [Autorun MCP v3] Error no capturado:', error.message);
  console.error('   Stack:', error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ [Autorun MCP v3] Promise rechazada:', reason);
});

// Iniciar servidor
startAutorunMCPServerV3().catch((error) => {
  console.error(
    '❌ [Autorun MCP v3] Error fatal iniciando servidor:',
    error.message
  );
  process.exit(1);
});
