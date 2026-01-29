#!/usr/bin/env tsx

/**
 * Script de prueba para diagnosticar errores del MCP de Autorun
 * 
 * Este script ejecuta autorun.apply() directamente para ver qué error ocurre
 */

import { autorunApply } from '../packages/autorun-core/src/mcp-server/tools/autorunApply.js';
import { AutorunApplyInput } from '../packages/autorun-core/src/mcp-server/types.js';

async function testMCPSApplyError() {
  console.log('🧪 [Test MCP] Iniciando prueba controlada de autorun.apply()...\n');

  const input: AutorunApplyInput = {
    message: 'implementar un EmptyState',
    targetFiles: undefined, // No especificar archivo para que detecte automáticamente
    options: {
      skipVerification: false,
      skipFormatting: true, // Saltar formateo para prueba rápida
      skipLinting: true, // Saltar linting para prueba rápida
      skipAutoReload: true, // Saltar auto-reload para prueba
      skipAutoCommit: true, // Saltar auto-commit para prueba
      dryRun: false,
    },
  };

  try {
    console.log('📝 [Test MCP] Input:');
    console.log('   - message:', input.message);
    console.log('   - targetFiles:', input.targetFiles || 'undefined (auto-detect)');
    console.log('   - options:', JSON.stringify(input.options, null, 2));
    console.log('\n🚀 [Test MCP] Ejecutando autorun.apply()...\n');

    const startTime = Date.now();
    const result = await autorunApply(input);
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log(`\n⏱️  [Test MCP] Tiempo de ejecución: ${duration}s\n`);

    console.log('📊 [Test MCP] Resultado:');
    console.log('   - success:', result.success);
    
    if (result.message) {
      console.log('   - message:', result.message);
    }

    if (result.filesWritten && result.filesWritten.length > 0) {
      console.log(`   - filesWritten: ${result.filesWritten.length} archivo(s)`);
      result.filesWritten.forEach((file: string) => {
        console.log(`      • ${file}`);
      });
    }

    if (result.components && result.components.length > 0) {
      console.log(`   - components: ${result.components.length} componente(s)`);
      result.components.forEach((comp: any) => {
        console.log(`      • ${comp.name || comp.componentName || 'Unknown'}`);
      });
    }

    if (result.errors && result.errors.length > 0) {
      console.log(`\n❌ [Test MCP] Errores (${result.errors.length}):`);
      result.errors.forEach((error: string, index: number) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }

    if (result.warnings && result.warnings.length > 0) {
      console.log(`\n⚠️  [Test MCP] Advertencias (${result.warnings.length}):`);
      result.warnings.slice(0, 5).forEach((warning: string, index: number) => {
        console.log(`   ${index + 1}. ${warning}`);
      });
      if (result.warnings.length > 5) {
        console.log(`   ... y ${result.warnings.length - 5} más`);
      }
    }

    if (result.verification) {
      console.log('\n✅ [Test MCP] Verificación:');
      console.log('   - preImplementation:', result.verification.preImplementation);
      console.log('   - postImplementation:', result.verification.postImplementation);
      
      if (result.verification.errors && result.verification.errors.length > 0) {
        console.log(`   - verification.errors: ${result.verification.errors.length}`);
        result.verification.errors.slice(0, 3).forEach((error: string, index: number) => {
          console.log(`      ${index + 1}. ${error}`);
        });
      }
      
      if (result.verification.warnings && result.verification.warnings.length > 0) {
        console.log(`   - verification.warnings: ${result.verification.warnings.length}`);
      }
    }

    if (result.success) {
      console.log('\n✅ [Test MCP] PRUEBA EXITOSA - autorun.apply() funcionó correctamente');
    } else {
      console.log('\n❌ [Test MCP] PRUEBA FALLIDA - autorun.apply() retornó success: false');
      console.log('   Revisa los errores arriba para diagnosticar el problema');
    }

  } catch (error: any) {
    console.error('\n❌ [Test MCP] ERROR NO CAPTURADO (esto NO debería pasar):');
    console.error('   Tipo:', error?.constructor?.name || typeof error);
    console.error('   Mensaje:', error?.message || String(error));
    console.error('   Stack:', error?.stack || 'No disponible');
    
    if (error?.cause) {
      console.error('   Cause:', error.cause);
    }
    
    process.exit(1);
  }
}

// Ejecutar prueba
testMCPSApplyError().catch((error) => {
  console.error('❌ [Test MCP] Error fatal:', error);
  process.exit(1);
});


