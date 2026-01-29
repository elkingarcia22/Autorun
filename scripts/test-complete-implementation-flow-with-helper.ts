/**
 * ✅ Script de Prueba: Flujo Completo de Implementación usando Helper Function
 *
 * Este script demuestra cómo usar la función helper `executeCompleteImplementationFlow`
 * para ejecutar el flujo completo de implementación automáticamente.
 *
 * ⚠️ NOTA: Este script es para uso interno de Autorun.
 * Para uso desde el agente en Cursor, ver la documentación sobre cómo mencionar
 * las herramientas MCP en la respuesta.
 */

import { executeCompleteImplementationFlow } from '../packages/autorun-core/src/helpers/callAutorunMCPTool.js';

/**
 * ✅ Ejecuta el flujo completo de implementación
 */
async function testCompleteFlow() {
  console.log('🚀 [Test] Iniciando flujo completo de implementación...\n');

  const message =
    'implementar una content card debajo del subnav usando el componente Layout/Card Content con tipo Curso, título "Segmenta la experiencia del cliente", proveedor UBITS, duración 60 min, nivel Básico, competencia Product design, idioma Español';

  const targetFiles = [
    'prototypes/canvas-administrador-encuestas-2025-12-29.html',
  ];

  const options = {
    mode: 'prototypeTokens' as const,
    requireStorybookMcp: true,
    allowPrototypeTokens: true,
  };

  try {
    const result = await executeCompleteImplementationFlow(
      message,
      targetFiles,
      options
    );

    console.log('\n📊 [Test] Resultado del flujo completo:');
    console.log('==========================================');
    console.log(`✅ Éxito: ${result.success}`);
    console.log(`❌ Errores: ${result.errors.length}`);

    if (result.errors.length > 0) {
      console.log('\n❌ Errores encontrados:');
      result.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }

    if (result.handleResult) {
      console.log('\n📋 [Test] Resultado de handleUserMessage:');
      console.log(JSON.stringify(result.handleResult, null, 2));
    }

    if (result.applyResult) {
      console.log('\n🚀 [Test] Resultado de apply:');
      console.log(JSON.stringify(result.applyResult, null, 2));
    }

    if (result.verifyResult) {
      console.log('\n✅ [Test] Resultado de verify:');
      console.log(JSON.stringify(result.verifyResult, null, 2));
    }

    if (result.success) {
      console.log('\n✅ [Test] Flujo completo ejecutado exitosamente');
    } else {
      console.log('\n❌ [Test] Flujo completo falló');
      process.exit(1);
    }
  } catch (error: any) {
    console.error('\n❌ [Test] Error ejecutando flujo completo:', error);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testCompleteFlow();
}

export { testCompleteFlow };
