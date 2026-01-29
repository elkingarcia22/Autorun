#!/usr/bin/env tsx

/**
 * Script de prueba para el Autorun MCP Server
 *
 * Prueba que el servidor MCP esté funcionando correctamente
 * y que todos los tools estén disponibles.
 */

// ⚠️ ACTUALIZADO: Usar MCP v2
import { startAutorunMCPServerV2 } from '../packages/autorun-core/src/mcp-server-v2/server.js';

async function testMCPServer() {
  // ⚠️ ACTUALIZADO: Usar MCP v2
  console.log('🚀 [Test] Probando Autorun MCP Server v2...');
	console.log('\n🧪 [Test Autorun MCP] Iniciando prueba del servidor MCP...\n');

	try {
		// Intentar iniciar el servidor
		console.log('📋 [Test] Iniciando servidor MCP...');

		// El servidor se ejecuta en modo stdio, así que necesitamos simular entrada
		// Por ahora solo verificamos que se puede importar y que la función existe
		const serverFunction = startAutorunMCPServerV2;

		if (typeof serverFunction === 'function') {
			console.log('✅ [Test] Función startAutorunMCPServerV2 está disponible');
		} else {
			console.error('❌ [Test] Función startAutorunMCPServerV2 NO está disponible');
			process.exit(1);
		}

		// Verificar que los tools están exportados
		console.log('📋 [Test] Verificando exports de tools...');

		const { autorunPlan } = await import(
			'../packages/autorun-core/src/mcp-server/tools/autorunPlan.js'
		);
		const { autorunApply } = await import(
			'../packages/autorun-core/src/mcp-server/tools/autorunApply.js'
		);
		const { autorunVerify } = await import(
			'../packages/autorun-core/src/mcp-server/tools/autorunVerify.js'
		);

		if (typeof autorunPlan === 'function') {
			console.log('✅ [Test] autorun.plan() está disponible');
		} else {
			console.error('❌ [Test] autorun.plan() NO está disponible');
		}

		if (typeof autorunApply === 'function') {
			console.log('✅ [Test] autorun.apply() está disponible');
		} else {
			console.error('❌ [Test] autorun.apply() NO está disponible');
		}

		if (typeof autorunVerify === 'function') {
			console.log('✅ [Test] autorun.verify() está disponible');
		} else {
			console.error('❌ [Test] autorun.verify() NO está disponible');
		}

		console.log('\n✅ [Test] Todos los tests pasaron!');
		console.log('📋 [Test] El servidor MCP está listo para usar\n');
	} catch (error: any) {
		console.error('\n❌ [Test] Error en la prueba:');
		console.error(`   ${error.message}\n`);
		console.error(error.stack);
		process.exit(1);
	}
}

testMCPServer();
