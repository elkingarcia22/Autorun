#!/usr/bin/env node

/**
 * Script de instalación automática del Autorun MCP Server
 *
 * Este script instala y configura automáticamente el Autorun MCP Server
 * en la configuración de Cursor (.cursor/mcp.json).
 *
 * Uso:
 *   npm run autorun:install-mcp
 *   O: tsx packages/autorun-core/src/cli/install-autorun-mcp.ts
 */

import { MCPInstaller } from '../MCPInstaller.js';

async function installAutorunMCP() {
  console.log('\n🚀 [Instalador Autorun MCP] Iniciando instalación...\n');

  try {
    // Instalar Autorun MCP Server
    const result = await MCPInstaller.installMCPServer('autorun');

    if (result.success) {
      console.log('\n✅ [Instalador Autorun MCP] Instalación exitosa!');
      console.log(`   Configuración guardada en: ${result.configPath || 'N/A'}`);
      console.log('\n📋 [Instalador Autorun MCP] Próximos pasos:');
      console.log('   1. Reinicia Cursor para que cargue el servidor MCP');
      console.log('   2. Verifica que el servidor esté disponible ejecutando:');
      console.log('      npm run autorun:mcp-server');
      console.log('   3. El agente ahora puede usar autorun.apply() para implementar componentes\n');
    } else {
      console.error('\n❌ [Instalador Autorun MCP] Error en la instalación:');
      console.error(`   ${result.message}\n`);
      process.exit(1);
    }
  } catch (error: any) {
    console.error('\n❌ [Instalador Autorun MCP] Error fatal:');
    console.error(`   ${error.message}\n`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Ejecutar instalación
installAutorunMCP();
