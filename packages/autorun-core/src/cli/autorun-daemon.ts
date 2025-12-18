#!/usr/bin/env node
/**
 * Script para mantener AutorunHub corriendo en background (daemon)
 *
 * Este script inicializa AutorunHub y lo mantiene corriendo continuamente
 * para que FileWatcher y los add-ons funcionen correctamente.
 *
 * Uso:
 *   npm run autorun:daemon
 *   o
 *   tsx packages/autorun-core/src/cli/autorun-daemon.ts
 *
 * Para detener: Ctrl+C o kill <PID>
 */

import {
	ensureAutorunHubInitialized,
	getAutorunHubStatus,
	getCurrentHub,
} from '../AutorunAgent.js';
import { registerAvailableAddons } from '../helpers/discoverAndRegisterAddons.js';

let isRunning = true;
let hub: any = null;

/**
 * Maneja señales de terminación
 */
function setupSignalHandlers() {
	// Manejar SIGINT (Ctrl+C)
	process.on('SIGINT', async () => {
		console.log('\n\n🛑 Deteniendo AutorunHub...');
		isRunning = false;

		if (hub) {
			try {
				hub.stopFileWatching?.();
				// Desactivar todos los add-ons
				const activeAddons = hub.getActiveAddons?.() || [];
				for (const addon of activeAddons) {
					try {
						await hub.deactivateAddon?.(addon.id);
					} catch (error: any) {
						console.warn(`⚠️  Error desactivando add-on ${addon.id}:`, error.message);
					}
				}
			} catch (error: any) {
				console.warn('⚠️  Error deteniendo AutorunHub:', error.message);
			}
		}

		console.log('✅ AutorunHub detenido');
		process.exit(0);
	});

	// Manejar SIGTERM
	process.on('SIGTERM', async () => {
		console.log('\n🛑 Recibida señal SIGTERM, deteniendo...');
		isRunning = false;
		process.exit(0);
	});

	// Manejar errores no capturados
	process.on('uncaughtException', (error) => {
		console.error('❌ Error no capturado:', error);
		// No terminar el proceso, solo loguear
	});

	process.on('unhandledRejection', (reason, promise) => {
		console.error('❌ Promesa rechazada no manejada:', reason);
		// No terminar el proceso, solo loguear
	});
}

/**
 * Función principal
 */
async function main() {
	try {
		setupSignalHandlers();

		console.log('🚀 Iniciando AutorunHub en modo daemon...');
		console.log('   💡 Este proceso se mantendrá corriendo en background');
		console.log('   💡 Presiona Ctrl+C para detener\n');

		// Inicializar AutorunHub
		hub = await ensureAutorunHubInitialized();

		// Registrar add-ons disponibles si no se registraron automáticamente
		try {
			const registeredCount = await registerAvailableAddons(hub);
			if (registeredCount > 0) {
				console.log(`📦 ${registeredCount} add-on(s) registrado(s) automáticamente`);
				// Re-inicializar para activar los add-ons recién registrados
				await hub.initialize();
			}
		} catch (error: any) {
			console.warn('⚠️ Error registrando add-ons automáticamente:', error.message);
		}

		// Obtener estado completo
		const status = await getAutorunHubStatus();

		// Mostrar estado
		console.log('\n✅ AutorunHub corriendo en modo daemon');
		console.log('📊 Estado de Autorun:');
		console.log(`   - Inicializado: ${status.initialized ? '✅' : '❌'}`);
		console.log(`   - File Watching: ${status.fileWatching ? '✅ activo' : '❌ inactivo'}`);
		console.log(`   - Add-ons activos: ${status.activeAddons.length}`);
		if (status.activeAddons.length > 0) {
			console.log(`   - Add-ons: ${status.activeAddons.join(', ')}`);
		}
		console.log('\n💡 Manteniendo proceso activo...');
		console.log('   Presiona Ctrl+C para detener\n');

		// Mantener el proceso vivo
		// Usar un intervalo para verificar el estado periódicamente
		const healthCheckInterval = setInterval(async () => {
			if (!isRunning) {
				clearInterval(healthCheckInterval);
				return;
			}

			try {
				const currentStatus = await getAutorunHubStatus();
				if (!currentStatus.initialized || !currentStatus.fileWatching) {
					console.warn('⚠️  AutorunHub parece haber dejado de funcionar. Reiniciando...');
					// Intentar reinicializar
					try {
						hub = await ensureAutorunHubInitialized();
					} catch (error: any) {
						console.error('❌ Error reinicializando AutorunHub:', error.message);
					}
				}
			} catch (error: any) {
				console.warn('⚠️  Error en health check:', error.message);
			}
		}, 30000); // Verificar cada 30 segundos

		// Mantener el proceso vivo indefinidamente
		// El proceso se detendrá cuando reciba SIGINT o SIGTERM
		while (isRunning) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
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

		console.error('❌ Error iniciando AutorunHub:', error.message);
		console.error('   Ejecuta "npm run init" para configurar Autorun primero');
		process.exit(1);
	}
}

main();
