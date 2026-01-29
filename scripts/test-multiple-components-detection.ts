/**
 * Script de prueba para verificar detección de múltiples componentes
 * 
 * Prueba la detección automática con varios componentes diferentes
 */

import { handleUserMessage } from '../packages/autorun-core/src/helpers/autoMessageHandler.js';
import { detectComponentFromMessage } from '../packages/autorun-core/src/helpers/implementationHelpers.js';
import { IntelligentComponentParser } from '../packages/autorun-core/src/helpers/intelligentComponentParser.js';

const testCases = [
  { message: 'implementar segment control', expected: 'SegmentControl' },
  { message: 'crear un segment control', expected: 'SegmentControl' },
  { message: 'agregar segment control', expected: 'SegmentControl' },
  { message: 'implementar button', expected: 'Button' },
  { message: 'crear un botón', expected: 'Button' },
  { message: 'implementar simple card', expected: 'SimpleCard' },
  { message: 'agregar una simple card', expected: 'SimpleCard' },
  { message: 'implementar tabs', expected: 'Tabs' },
  { message: 'crear pestañas', expected: 'Tabs' },
  { message: 'implementar data table', expected: 'DataTable' },
  { message: 'agregar tabla de datos', expected: 'DataTable' },
  { message: 'implementar modal', expected: 'Modal' },
  { message: 'crear un modal', expected: 'Modal' },
  { message: 'implementar selection card', expected: 'SelectionCard' },
  { message: 'agregar selection card', expected: 'SelectionCard' },
];

async function testDetection() {
  console.log('🧪 [Test] Iniciando pruebas de detección de componentes...\n');

  const results: Array<{
    message: string;
    expected: string;
    basicDetection: string | null;
    intelligentParser: string | null;
    handleUserMessage: string | null;
    success: boolean;
  }> = [];

  for (const testCase of testCases) {
    console.log(`\n📋 [Test] Probando: "${testCase.message}"`);
    console.log(`   Esperado: ${testCase.expected}`);

    // 1. Detección básica
    const basicDetection = detectComponentFromMessage(testCase.message);
    console.log(`   ✅ Detección básica: ${basicDetection || 'NINGUNO'}`);

    // 2. Parser inteligente
    let intelligentParser: string | null = null;
    try {
      const parsed = await IntelligentComponentParser.parse(testCase.message);
      intelligentParser = parsed.componentName || null;
      console.log(`   ✅ Parser inteligente: ${intelligentParser || 'NINGUNO'}`);
    } catch (error: any) {
      console.log(`   ❌ Error en parser inteligente: ${error.message}`);
    }

    // 3. handleUserMessage (flujo completo)
    let handleUserMessageResult: string | null = null;
    try {
      const result = await handleUserMessage(testCase.message, { skipPreCheck: true });
      handleUserMessageResult = result.componentName || null;
      console.log(`   ✅ handleUserMessage: ${handleUserMessageResult || 'NINGUNO'}`);
      if (result.blocked) {
        console.log(`   ⚠️ Bloqueado: ${result.reason}`);
      }
    } catch (error: any) {
      console.log(`   ❌ Error en handleUserMessage: ${error.message}`);
    }

    const success =
      basicDetection === testCase.expected ||
      intelligentParser === testCase.expected ||
      handleUserMessageResult === testCase.expected;

    results.push({
      message: testCase.message,
      expected: testCase.expected,
      basicDetection,
      intelligentParser,
      handleUserMessage: handleUserMessageResult,
      success,
    });

    if (success) {
      console.log(`   ✅ ÉXITO: Componente detectado correctamente`);
    } else {
      console.log(`   ❌ FALLO: No se detectó el componente esperado`);
    }
  }

  // Resumen
  console.log('\n\n📊 [Test] RESUMEN DE RESULTADOS');
  console.log('='.repeat(80));

  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log(`\n✅ Exitosos: ${successful}/${results.length}`);
  console.log(`❌ Fallidos: ${failed}/${results.length}`);

  if (failed > 0) {
    console.log('\n❌ CASOS FALLIDOS:');
    results
      .filter((r) => !r.success)
      .forEach((r) => {
        console.log(`\n   Mensaje: "${r.message}"`);
        console.log(`   Esperado: ${r.expected}`);
        console.log(`   Detección básica: ${r.basicDetection || 'NINGUNO'}`);
        console.log(`   Parser inteligente: ${r.intelligentParser || 'NINGUNO'}`);
        console.log(`   handleUserMessage: ${r.handleUserMessage || 'NINGUNO'}`);
      });
  }

  console.log('\n✅ CASOS EXITOSOS:');
  results
    .filter((r) => r.success)
    .forEach((r) => {
      const detectedBy =
        r.basicDetection === r.expected
          ? 'básica'
          : r.intelligentParser === r.expected
            ? 'inteligente'
            : 'handleUserMessage';
      console.log(`   ✅ "${r.message}" → ${r.expected} (detectado por: ${detectedBy})`);
    });

  return {
    total: results.length,
    successful,
    failed,
    results,
  };
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testDetection()
    .then((summary) => {
      console.log('\n✅ [Test] Pruebas completadas');
      process.exit(summary.failed > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error('\n❌ [Test] Error en las pruebas:', error);
      process.exit(1);
    });
}

export { testDetection };
