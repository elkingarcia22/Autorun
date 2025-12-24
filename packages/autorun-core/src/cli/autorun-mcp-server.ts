#!/usr/bin/env node

/**
 * CLI para ejecutar el Autorun MCP Server
 *
 * Este script inicia el servidor MCP de Autorun que expone todos los tools
 * para implementar componentes desde Storybook.
 *
 * Uso:
 *   node packages/autorun-core/dist/cli/autorun-mcp-server.js
 *   O desde npm: npm run autorun:mcp-server
 */

import { startAutorunMCPServer } from '../mcp-server/autorunMCPServer.js';

// Manejar errores no capturados
// ⚠️ CRÍTICO: NO cerrar el proceso inmediatamente - permitir que el SDK de MCP maneje el error
// Esto previene que el servidor se cierre por errores recuperables
process.on('uncaughtException', (error) => {
  console.error('❌ [Autorun MCP Server] Error no capturado:', error);
  console.error('   Stack:', error.stack);
  console.error(
    '   ⚠️ [Autorun MCP Server] El servidor intentará continuar...'
  );
  // ⚠️ NO cerrar inmediatamente - el SDK de MCP puede manejar el error
  // Solo cerrar si es un error crítico que no se puede recuperar
  if (error.message?.includes('FATAL') || error.message?.includes('CRITICAL')) {
    console.error(
      '   ❌ [Autorun MCP Server] Error crítico, cerrando servidor...'
    );
    process.exit(1);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ [Autorun MCP Server] Promise rechazada:', reason);
  console.error(
    '   ⚠️ [Autorun MCP Server] El servidor intentará continuar...'
  );
  // ⚠️ NO cerrar inmediatamente - el SDK de MCP puede manejar el error
  // Solo cerrar si es un error crítico que no se puede recuperar
  if (reason && typeof reason === 'object' && 'message' in reason) {
    const errorMessage = (reason as any).message || String(reason);
    if (errorMessage.includes('FATAL') || errorMessage.includes('CRITICAL')) {
      console.error(
        '   ❌ [Autorun MCP Server] Error crítico, cerrando servidor...'
      );
      process.exit(1);
    }
  }
});

// Iniciar servidor
startAutorunMCPServer().catch((error) => {
  console.error(
    '❌ [Autorun MCP Server] Error fatal iniciando servidor:',
    error
  );
  process.exit(1);
});
