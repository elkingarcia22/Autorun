#!/usr/bin/env tsx
/**
 * Script de Prueba: handleUserMessage()
 * 
 * Prueba que handleUserMessage() se ejecuta correctamente y detecta archivo activo
 */

import { handleUserMessage } from '../packages/autorun-core/src/helpers/autoMessageHandler.js';

async function testHandleUserMessage() {
  console.log('\n🧪 [Test handleUserMessage] ========================================');
  console.log('🧪 [Test handleUserMessage] Iniciando prueba...\n');

  try {
    // Mensaje de prueba
    const testMessage = 'quiero agregar un botón que abra un modal';

    console.log('📝 [Test handleUserMessage] Mensaje de prueba:');
    console.log(`   "${testMessage}"\n`);

    console.log('🚀 [Test handleUserMessage] Ejecutando handleUserMessage()...\n');

    const result = await handleUserMessage(testMessage);

    console.log('\n📊 [Test handleUserMessage] ========================================');
    console.log('📊 [Test handleUserMessage] RESULTADO:');
    console.log(`   - Detectado: ${result.detected}`);
    console.log(`   - Componente: ${result.componentName || 'NINGUNO'}`);
    console.log(`   - Bloqueado: ${result.blocked ? 'SÍ' : 'NO'}`);
    if (result.blocked) {
      console.log(`   - Razón: ${result.reason || 'N/A'}`);
    }
    console.log(`   - Mensajes MCP: ${result.mcpMessages?.length || 0}`);
    if (result.mcpMessages && result.mcpMessages.length > 0) {
      result.mcpMessages.forEach((msg, index) => {
        console.log(`     ${index + 1}. ${msg.componentName} → ${msg.storybookId}`);
      });
    }
    console.log('📊 [Test handleUserMessage] ========================================\n');

    // Verificar que se emitió el mensaje de detección de archivo activo
    console.log('📋 [Test handleUserMessage] ========================================');
    console.log('📋 [Test handleUserMessage] VERIFICACIÓN:');
    console.log('   1. Revisa los logs anteriores para ver si se ejecutó executeOnMessageStart()');
    console.log('   2. Deberías ver mensajes como:');
    console.log('      - "🚀 [Auto Message Handler] Iniciando manejo automático del mensaje"');
    console.log('      - "🚀 [Execute On Message Start] Ejecutando al inicio del mensaje"');
    console.log('      - "[AUTORUN_DETECT_ACTIVE_FILE]true[/AUTORUN_DETECT_ACTIVE_FILE]"');
    console.log('   3. Si NO ves estos mensajes, handleUserMessage() no se está ejecutando');
    console.log('📋 [Test handleUserMessage] ========================================\n');

    if (result.detected) {
      console.log('✅ [Test handleUserMessage] Componente detectado correctamente');
    } else {
      console.log('⚠️ [Test handleUserMessage] No se detectó componente (puede ser normal)');
    }

    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ [Test handleUserMessage] ========================================');
    console.error('❌ [Test handleUserMessage] Error en la prueba:', error.message);
    console.error('❌ [Test handleUserMessage] Stack:', error.stack);
    console.error('❌ [Test handleUserMessage] ========================================\n');
    process.exit(1);
  }
}

testHandleUserMessage();

