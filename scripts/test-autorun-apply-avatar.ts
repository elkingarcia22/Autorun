#!/usr/bin/env tsx

/**
 * 🧪 Script de Prueba: autorun.apply con Avatar
 * 
 * Este script prueba autorun.apply() implementando un Avatar
 * y captura todos los logs para análisis en profundidad
 */

import { autorunApply } from '../packages/autorun-core/src/mcp-server-v2/tools/apply.js';

async function main() {
  console.log('🧪 [PRUEBA] autorun.apply con Avatar');
  console.log('────────────────────────────────────────');
  console.log('📋 Iniciando implementación de Avatar...');
  console.log('');

  try {
    const result = await autorunApply({
      message: 'implementa un avatar',
      targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-26.html'],
      options: {
        skipVerification: false,
        dryRun: false,
        skipFormatting: false,
        skipLinting: false,
        skipAutoReload: false,
        skipAutoCommit: true, // No hacer commit en pruebas
      },
    });

    console.log('');
    console.log('✅ autorun.apply COMPLETADO:');
    console.log(JSON.stringify(result, null, 2));
    
    if (!result.success) {
      console.log('');
      console.log('❌ ERRORES ENCONTRADOS:');
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((error, index) => {
          console.log(`   ${index + 1}. ${error}`);
        });
      }
    }

    if (result.warnings && result.warnings.length > 0) {
      console.log('');
      console.log('⚠️ ADVERTENCIAS:');
      result.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. ${warning}`);
      });
    }

    if (result.filesWritten && result.filesWritten.length > 0) {
      console.log('');
      console.log('📝 ARCHIVOS ESCRITOS:');
      result.filesWritten.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file}`);
      });
    }

    process.exit(result.success ? 0 : 1);
  } catch (error: any) {
    console.error('');
    console.error('❌ ERROR EN PRUEBA:');
    console.error(`   Mensaje: ${error.message}`);
    console.error(`   Tipo: ${error.constructor.name}`);
    console.error(`   Stack: ${error.stack}`);
    process.exit(1);
  }
}

main();

