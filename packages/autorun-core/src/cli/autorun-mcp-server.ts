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
process.on('uncaughtException', (error) => {
	console.error('❌ [Autorun MCP Server] Error no capturado:', error);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('❌ [Autorun MCP Server] Promise rechazada:', reason);
	process.exit(1);
});

// Iniciar servidor
startAutorunMCPServer().catch((error) => {
	console.error('❌ [Autorun MCP Server] Error fatal iniciando servidor:', error);
	process.exit(1);
});
