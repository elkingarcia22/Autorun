/**
 * Test: handleUserMessage() - Flujo completo
 *
 * Prueba el flujo completo de handleUserMessage() con un mensaje de ejemplo
 */

import { handleUserMessage } from '../packages/autorun-core/src/helpers/autoMessageHandler';

async function testHandleUserMessage() {
	console.log('🧪 [Test] Iniciando prueba de handleUserMessage()...\n');

	// Mensaje de prueba que debería detectar Button y Modal
	const testMessage = 'implementa un botón que abra un modal';

	try {
		const result = await handleUserMessage(testMessage);

		console.log('\n📊 [Test] Resultado:');
		console.log(`  - Detectado: ${result.detected}`);
		console.log(`  - Componente: ${result.componentName || 'Ninguno'}`);
		console.log(`  - Bloqueado: ${result.blocked}`);
		if (result.blocked) {
			console.log(`  - Razón: ${result.reason}`);
		}
		console.log(`  - Mensajes MCP: ${result.mcpMessages?.length || 0}`);

		if (result.mcpMessages && result.mcpMessages.length > 0) {
			console.log('\n📚 [Test] Mensajes MCP preparados:');
			for (const msg of result.mcpMessages) {
				console.log(`  - ${msg.componentName} → ${msg.storybookId}`);
			}
		}

		if (result.blocked) {
			console.log('\n❌ [Test] Flujo bloqueado - esto es correcto si hay pasos faltantes');
			process.exit(1);
		} else if (result.detected && result.mcpMessages && result.mcpMessages.length > 0) {
			console.log('\n✅ [Test] Flujo funcionando correctamente');
			console.log('✅ [Test] Componentes detectados y mensajes MCP preparados');
			process.exit(0);
		} else {
			console.log('\n⚠️ [Test] No se detectaron componentes o no se prepararon mensajes MCP');
			process.exit(1);
		}
	} catch (error: any) {
		console.error('\n❌ [Test] Error en handleUserMessage():', error.message);
		console.error(error.stack);
		process.exit(1);
	}
}

testHandleUserMessage();
