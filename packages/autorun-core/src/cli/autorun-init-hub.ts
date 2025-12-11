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



