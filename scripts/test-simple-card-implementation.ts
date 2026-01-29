/**
 * ✅ Script de Prueba: Implementación de Simple Card en Caso Real
 *
 * Este script prueba el flujo completo de implementación usando `executeCompleteImplementationFlow`
 * para implementar una Simple Card en el archivo activo.
 */

import { executeCompleteImplementationFlow } from '../packages/autorun-core/src/helpers/callAutorunMCPTool.js';

/**
 * ✅ Ejecuta el flujo completo de implementación de Simple Card
 */
async function testSimpleCardImplementation() {
  console.log('🚀 [Test Simple Card] Iniciando flujo completo de implementación...\n');

  const message =
    'implementar una simple card debajo del subnav usando el componente Layout/Simple Card con título "Mi Simple Card", subtítulo "Subtítulo de ejemplo", contenido "Este es el contenido de la simple card", variante default, tamaño md, sin botones';

  const targetFiles = [
    'prototypes/canvas-administrador-encuestas-2025-12-29.html',
  ];

  const options = {
    mode: 'prototypeTokens' as const,
    requireStorybookMcp: true,
    allowPrototypeTokens: true,
  };

  try {
    console.log('📋 [Test Simple Card] Mensaje:', message);
    console.log('📁 [Test Simple Card] Archivos objetivo:', targetFiles);
    console.log('⚙️ [Test Simple Card] Opciones:', options);
    console.log('');

    const result = await executeCompleteImplementationFlow(
      message,
      targetFiles,
      options
    );

    console.log('\n📊 [Test Simple Card] Resultado del flujo completo:');
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
      console.log('\n📋 [Test Simple Card] Resultado de handleUserMessage:');
      try {
        const handleData = typeof result.handleResult === 'string' 
          ? JSON.parse(result.handleResult) 
          : result.handleResult;
        console.log(JSON.stringify(handleData, null, 2));
      } catch (e) {
        console.log(result.handleResult);
      }
    }

    if (result.applyResult) {
      console.log('\n🚀 [Test Simple Card] Resultado de apply:');
      try {
        const applyData = typeof result.applyResult === 'string' 
          ? JSON.parse(result.applyResult) 
          : result.applyResult;
        console.log(JSON.stringify(applyData, null, 2));
      } catch (e) {
        console.log(result.applyResult);
      }
    }

    if (result.verifyResult) {
      console.log('\n✅ [Test Simple Card] Resultado de verify:');
      try {
        const verifyData = typeof result.verifyResult === 'string' 
          ? JSON.parse(result.verifyResult) 
          : result.verifyResult;
        console.log(JSON.stringify(verifyData, null, 2));
      } catch (e) {
        console.log(result.verifyResult);
      }
    }

    if (result.success) {
      console.log('\n✅ [Test Simple Card] Flujo completo ejecutado exitosamente');
    } else {
      console.log('\n❌ [Test Simple Card] Flujo completo falló');
      process.exit(1);
    }
  } catch (error: any) {
    console.error('\n❌ [Test Simple Card] Error ejecutando flujo completo:', error);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testSimpleCardImplementation();
}

export { testSimpleCardImplementation };
