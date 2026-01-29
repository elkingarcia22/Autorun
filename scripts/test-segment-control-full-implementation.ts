/**
 * Script de prueba completa para implementar SegmentControl
 * 
 * Prueba el flujo completo de implementación con todas las mejoras de extractores
 */

import { executeCompleteImplementationFlow } from '../packages/autorun-core/src/helpers/callAutorunMCPTool.js';

async function testSegmentControlFullImplementation() {
  console.log('🧪 [Test] Iniciando prueba completa de implementación de SegmentControl...\n');

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
    
    // Analizar qué estrategias de extracción funcionaron
    console.log('\n📋 [Test] Análisis de estrategias de extracción:');
    if (result.applyResult?.extractionStrategies) {
      console.log(`   Estrategias usadas: ${result.applyResult.extractionStrategies.join(', ')}`);
    }
  } else {
    console.log('\n❌ [Test] Implementación falló:');
    result.errors.forEach((error: string) => {
      console.log(`   - ${error}`);
    });
    
    // Analizar qué estrategias se intentaron
    console.log('\n📋 [Test] Estrategias de extracción intentadas:');
    if (result.applyResult?.extractionAttempts) {
      result.applyResult.extractionAttempts.forEach((attempt: any) => {
        console.log(`   - ${attempt.strategy}: ${attempt.success ? '✅' : '❌'} ${attempt.error || ''}`);
      });
    }
  }

  return result;
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testSegmentControlFullImplementation()
    .then(() => {
      console.log('\n✅ [Test] Prueba completada');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ [Test] Error en la prueba:', error);
      process.exit(1);
    });
}

export { testSegmentControlFullImplementation };
