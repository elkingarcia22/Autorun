#!/usr/bin/env node

/**
 * ✅ CLI para Autorun MCP Server v2
 * 
 * Punto de entrada limpio y robusto
 * Creado desde cero
 */

import { startAutorunMCPServerV2 } from '../mcp-server-v2/server.js';

// ⚠️ CRÍTICO: Manejar errores no capturados
process.on('uncaughtException', (error) => {
  console.error('❌ [Autorun MCP v2] Error no capturado:', error);
  console.error('   Stack:', error.stack);
  // NO cerrar inmediatamente - permitir que el SDK maneje el error
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ [Autorun MCP v2] Promise rechazada:', reason);
  // NO cerrar inmediatamente - permitir que el SDK maneje el error
});

// ⚠️ CRÍTICO: Iniciar servidor
startAutorunMCPServerV2().catch((error) => {
  console.error('❌ [Autorun MCP v2] Error fatal iniciando servidor:', error);
  process.exit(1);
});

