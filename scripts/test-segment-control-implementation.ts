/**
 * Script de prueba para implementar SegmentControl
 * 
 * Prueba todas las mejoras de extractores:
 * 1. Extracción desde código fuente local
 * 2. Extracción desde documentación local
 * 3. Extracción desde Storybook MCP
 * 4. Extracción desde Browser MCP
 */

import { executeCompleteImplementationFlow } from '../packages/autorun-core/src/helpers/callAutorunMCPTool.js';

async function testSegmentControlImplementation() {
  console.log('🧪 [Test] Iniciando prueba de implementación de SegmentControl...\n');

  const result = await executeCompleteImplementationFlow(
    'implementar segment control',
    ['prototypes/canvas-administrador-encuestas-2025-12-29.html'],
    {
      mode: 'prototypeTokens',
    }
  );

  console.log('\n📊 [Test] Resultado de la implementación:');
  console.log(JSON.stringify(result, null, 2));

  if (result.success) {
    console.log('\n✅ [Test] Implementación exitosa!');
    console.log(`   - Archivos escritos: ${result.applyResult?.filesWritten?.length || 0}`);
    console.log(`   - Componentes implementados: ${result.applyResult?.components?.length || 0}`);
    if (result.applyResult?.components?.length > 0) {
      result.applyResult.components.forEach((comp: any) => {
        console.log(`     - ${comp.name} (${comp.storybookId})`);
      });
    }
  } else {
    console.log('\n❌ [Test] Implementación falló:');
    result.errors.forEach((error: string) => {
      console.log(`   - ${error}`);
    });
  }

  return result;
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testSegmentControlImplementation()
    .then(() => {
      console.log('\n✅ [Test] Prueba completada');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ [Test] Error en la prueba:', error);
      process.exit(1);
    });
}

export { testSegmentControlImplementation };
