/**
 * Script de prueba real para implementar SegmentControl
 * 
 * Prueba el flujo completo usando Browser MCP para extraer código
 */

import { executeCompleteImplementationFlow } from '../packages/autorun-core/src/helpers/callAutorunMCPTool.js';

async function testSegmentControlReal() {
  console.log('🧪 [Test] Iniciando prueba REAL de implementación de SegmentControl...\n');

  // Primero, usar Browser MCP para extraer código desde Storybook
  console.log('📚 [Test] Paso 1: Consultando Storybook en Vercel...');
  
  const result = await executeCompleteImplementationFlow(
    'implementar segment control',
    ['prototypes/canvas-administrador-encuestas-2025-12-29.html'],
    {
      mode: 'prototypeTokens',
    }
  );

  console.log('\n📊 [Test] Resultado:');
  console.log(`   - Success: ${result.success}`);
  console.log(`   - Errors: ${result.errors.length}`);
  console.log(`   - Files written: ${result.applyResult?.filesWritten?.length || 0}`);
  console.log(`   - Components: ${result.applyResult?.components?.length || 0}`);

  if (result.errors.length > 0) {
    console.log('\n❌ Errores:');
    result.errors.forEach((error: string) => {
      console.log(`   - ${error}`);
    });
  }

  return result;
}

testSegmentControlReal()
  .then(() => {
    console.log('\n✅ [Test] Prueba completada');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ [Test] Error:', error);
    process.exit(1);
  });
