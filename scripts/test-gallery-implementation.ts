/**
 * Script de prueba para implementar Gallery usando autorun.apply()
 */

import { callAutorunMCPTool } from '../packages/autorun-core/src/helpers/callAutorunMCPTool.js';

async function testGalleryImplementation() {
  console.log('🚀 Iniciando implementación de Gallery...\n');

  try {
    // Ejecutar autorun.apply() vía MCP
    const result = await callAutorunMCPTool('autorun.apply', {
      message: 'implementar gallery',
      targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-29.html'],
      options: {
        mode: 'prototypeTokens',
      },
    });

    if (!result.success) {
      console.error('❌ Error:', result.error);
      process.exit(1);
    }

    console.log('\n✅ Resultado de autorun.apply():');
    console.log(JSON.stringify(result.result, null, 2));

    // Verificar éxito
    if (result.result?.success) {
      console.log('\n✅ Implementación exitosa!');
      if (result.result.filesWritten && result.result.filesWritten.length > 0) {
        console.log(`📁 Archivos escritos: ${result.result.filesWritten.join(', ')}`);
      }
      if (result.result.errors && result.result.errors.length > 0) {
        console.log(`⚠️ Errores: ${result.result.errors.join(', ')}`);
      }
      if (result.result.warnings && result.result.warnings.length > 0) {
        console.log(`⚠️ Advertencias: ${result.result.warnings.join(', ')}`);
      }
    } else {
      console.error('\n❌ Implementación falló');
      if (result.result?.errors) {
        console.error(`Errores: ${result.result.errors.join(', ')}`);
      }
      process.exit(1);
    }
  } catch (error: any) {
    console.error('❌ Error ejecutando autorun.apply():', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testGalleryImplementation();
