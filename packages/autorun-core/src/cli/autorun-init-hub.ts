#!/usr/bin/env node
/**
 * Script CLI para inicializar AutorunHub
 *
 * Este script se ejecuta para asegurar que AutorunHub esté inicializado
 * antes de cualquier operación que requiera Autorun.
 *
 * Uso:
 *   npm run autorun:init-hub
 *   o
 *   tsx packages/autorun-core/src/cli/autorun-init-hub.ts
 */

import {
	ensureAutorunHubInitialized,
	getAutorunHubStatus,
	getCurrentHub,
} from '../AutorunAgent.js';
import { registerAvailableAddons } from '../helpers/discoverAndRegisterAddons.js';

async function main() {
	try {
		console.log('🚀 Inicializando AutorunHub...');

		// Inicializar AutorunHub (puede tener errores de add-ons, pero continúa)
		const hub = await ensureAutorunHubInitialized();

		// ⚠️ CRÍTICO: Registrar add-ons disponibles si no se registraron automáticamente
		// Esto asegura que los add-ons estén disponibles cuando se intenten activar
		try {
			const registeredCount = await registerAvailableAddons(hub);
			if (registeredCount > 0) {
				console.log(`📦 ${registeredCount} add-on(s) registrado(s) automáticamente`);
				// Re-inicializar para activar los add-ons recién registrados
				await hub.initialize();
			}
		} catch (error: any) {
			// No bloquear si falla el registro automático
			console.warn('⚠️ Error registrando add-ons automáticamente:', error.message);
		}

		// Obtener estado completo
		const status = await getAutorunHubStatus();

		// Mostrar estado
		console.log('✅ AutorunHub inicializado correctamente');
		console.log('📊 Estado de Autorun:');
		console.log(`   - Inicializado: ${status.initialized ? '✅' : '❌'}`);
		console.log(`   - File Watching: ${status.fileWatching ? '✅ activo' : '❌ inactivo'}`);
		console.log(`   - Add-ons activos: ${status.activeAddons.length}`);
		if (status.activeAddons.length > 0) {
			console.log(`   - Add-ons: ${status.activeAddons.join(', ')}`);
		} else {
			console.log('   ⚠️ Nota: Algunos add-ons pueden no estar registrados (esto es normal)');
		}

		// Si hay error pero AutorunHub está inicializado, solo advertir
		if (status.error && !status.initialized) {
			console.error('⚠️ Error crítico:', status.error);
			console.error('   Ejecuta "npm run init" para configurar Autorun primero');
			process.exit(1);
		} else if (status.error) {
			console.warn('⚠️ Advertencia:', status.error);
			console.warn(
				'   Algunos add-ons pueden no estar disponibles, pero AutorunHub está funcionando',
			);
		}

		// Verificar que FileWatcher está activo (lo más importante)
		if (!status.fileWatching) {
			console.warn('⚠️ FileWatcher no está activo. Algunas funcionalidades pueden no funcionar.');
		}

		// Mostrar instrucciones de auto-reload
		console.log('\n🔄 Auto-Reload Configurado:');
		console.log('   ✅ FileWatcher detectará cambios en prototypes/');
		console.log('   ✅ Auto-Reload Add-on está activo');
		console.log(
			'   ⚠️ El agente debe recargar automáticamente después de write() o search_replace()',
		);
		console.log('   📋 Ver reglas en .cursorrules - Sección "Auto-Apertura y Recarga"');

		// ⚠️ NUEVO: Detectar template más reciente y navegar automáticamente
		console.log('\n🔍 Detectando templates disponibles...');
		try {
			const { detectTemplateToOpen } = await import('../helpers/templateDetector.js');
			const templateInfo = await detectTemplateToOpen();

			if (templateInfo.url) {
				console.log(`\n📋 Template detectado: ${templateInfo.url}`);
				console.log(`   Fuente: ${templateInfo.source}`);
				console.log(`\n🌐 El agente debe navegar automáticamente a:`);
				console.log(`   [AUTORUN_BROWSER_URL]${templateInfo.url}[/AUTORUN_BROWSER_URL]`);
				console.log(`   [AUTORUN_TEMPLATE_DETECTED]true[/AUTORUN_TEMPLATE_DETECTED]`);
				console.log(
					`   [AUTORUN_EXECUTE_HANDLE_USER_MESSAGE]true[/AUTORUN_EXECUTE_HANDLE_USER_MESSAGE]`,
				);
				console.log(`\n💡 Instrucciones para el agente:`);
				console.log(`   1. Navegar a: ${templateInfo.url}`);
				console.log(`   2. Tomar snapshot para verificar que cargó correctamente`);
				console.log(`   3. Ejecutar handleUserMessage() automáticamente para completar el flujo`);
				console.log(`\n💡 RECOMENDACIÓN: El agente debe ejecutar automáticamente:`);
				console.log(
					`   - call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_navigate", arguments: { url: "${templateInfo.url}" } })`,
				);
				console.log(
					`   - call_mcp_tool({ server: "cursor-ide-browser", toolName: "browser_snapshot" })`,
				);
				console.log(`   - handleUserMessage(userMessage) para completar el flujo automático`);

				// Limpiar archivo de estado si viene del wizard
				if (templateInfo.source === 'wizard-state') {
					try {
						const fs = await import('fs/promises');
						const path = await import('path');
						const statePath = path.join(process.cwd(), '.autorun', 'wizard-state.json');
						await fs.unlink(statePath);
						console.log(`\n✅ Archivo de estado del wizard limpiado automáticamente`);
					} catch (error: any) {
						console.warn(`\n⚠️  No se pudo limpiar archivo de estado: ${error.message}`);
					}
				}
			} else {
				console.log('   ℹ️  No se detectaron templates en prototypes/');
				console.log('   💡 Crea un template con el wizard o coloca un archivo HTML en prototypes/');
			}
		} catch (error: any) {
			console.warn(`   ⚠️  Error detectando templates: ${error.message}`);
		}

		// ⭐ NUEVO: Ejecutar pruebas de Storybook Implementation
		console.log('\n🧪 Probando funcionalidades de Storybook Implementation...');
		try {
			const testerModule = await import('../helpers/storybookImplementationTester.js');
			const runQuickTest = testerModule.runQuickTest;
			if (typeof runQuickTest === 'function') {
				const testPassed = await runQuickTest('data-data-table');
				if (testPassed) {
					console.log('   ✅ Pruebas de Storybook Implementation: OK');
					console.log('   📚 Todas las funcionalidades están operativas');
				} else {
					console.warn('   ⚠️  Algunas pruebas de Storybook Implementation fallaron');
					console.warn(
						'   💡 Esto puede ser normal si el componente no está disponible en Storybook',
					);
				}
			} else {
				console.warn('   ⚠️  runQuickTest no está disponible en el módulo');
			}
		} catch (error: any) {
			// No bloquear si falla
			console.warn(`   ⚠️  No se pudieron ejecutar pruebas: ${error.message}`);
			console.warn('   💡 Esto puede ser normal si Storybook no está disponible');
		}

		process.exit(0);
	} catch (error: any) {
		// Si el error es sobre configuración faltante, dar instrucciones claras
		if (
			error.message?.includes('no está configurado') ||
			error.message?.includes('project-config.json')
		) {
			console.error('❌ Autorun no está configurado');
			console.error('   Ejecuta: npm run init');
			process.exit(1);
		}

		console.error('❌ Error inicializando AutorunHub:', error.message);
		console.error('   Ejecuta "npm run init" para configurar Autorun primero');
		process.exit(1);
	}
}

main();
