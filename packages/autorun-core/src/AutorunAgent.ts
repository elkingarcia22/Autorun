/**
 * AutorunAgent
 *
 * Agente que inicializa AutorunHub automáticamente cuando Cursor está trabajando.
 * Este archivo se ejecuta automáticamente cuando el agente de Cursor detecta que
 * necesita usar Autorun (por ejemplo, cuando se editan archivos en prototypes/).
 */

import { AutorunHub } from './AutorunHub';
import * as path from 'path';
import * as fs from 'fs/promises';
import { registerAvailableAddons } from './helpers/discoverAndRegisterAddons';

let globalHub: AutorunHub | null = null;
let initializationPromise: Promise<AutorunHub> | null = null;

/**
 * Obtiene o inicializa la instancia global de AutorunHub
 * Se ejecuta automáticamente cuando se necesita
 */
export async function getAutorunHub(): Promise<AutorunHub> {
	// Si ya está inicializado, retornar
	if (globalHub && globalHub['initialized']) {
		return globalHub;
	}

	// Si hay una inicialización en curso, esperar
	if (initializationPromise) {
		return initializationPromise;
	}

	// Inicializar
	initializationPromise = initializeAutorunHub();
	return initializationPromise;
}

/**
 * Inicializa AutorunHub automáticamente
 */
async function initializeAutorunHub(): Promise<AutorunHub> {
	try {
		console.log('🚀 AutorunAgent: Inicializando AutorunHub...');
		console.log(`   🔍 [DEBUG] ========================================`);
		console.log(`   🔍 [DEBUG] AutorunAgent: INICIANDO BÚSQUEDA`);
		console.log(`   🔍 [DEBUG] process.cwd(): ${process.cwd()}`);
		console.log(`   🔍 [DEBUG] __dirname: ${typeof __dirname !== 'undefined' ? __dirname : 'undefined'}`);

		// ⚠️ CRÍTICO: Buscar el directorio del proyecto (que contiene .ubits/project-config.json)
		// Empezar desde process.cwd() y subir hasta encontrar el archivo
		let configPath: string | null = null;
		let currentDir = process.cwd();
		
		console.log(`   🔍 [DEBUG] Buscando config desde: ${currentDir}`);
		
		// Buscar en el árbol de directorios hacia arriba
		for (let i = 0; i < 10; i++) {
			const testPath = path.join(currentDir, '.ubits', 'project-config.json');
			console.log(`   🔍 [DEBUG]   [${i}] Intentando: ${testPath}`);
			try {
				await fs.access(testPath);
				configPath = testPath;
				console.log(`   ✅ [DEBUG] ✅✅✅ Config encontrada en: ${configPath}`);
				// ⚠️ CRÍTICO: Cambiar process.cwd() al directorio del proyecto
				if (currentDir !== process.cwd()) {
					console.log(`   🔄 [DEBUG] Cambiando process.cwd() de ${process.cwd()} a ${currentDir}`);
					process.chdir(currentDir);
					console.log(`   ✅ [DEBUG] ✅✅✅ process.cwd() ahora es: ${process.cwd()}`);
				}
				break;
			} catch (err: any) {
				console.log(`   🔍 [DEBUG]   [${i}] No encontrado: ${err.code || err.message}`);
				// No encontrado, intentar directorio padre
				const parent = path.dirname(currentDir);
				if (parent === currentDir) {
					// Llegamos a la raíz del sistema
					console.log(`   ⚠️ [DEBUG] Llegamos a la raíz del sistema: ${currentDir}`);
					break;
				}
				currentDir = parent;
			}
		}
		
		if (!configPath) {
			console.error(`   ❌ [DEBUG] ❌❌❌ NO SE ENCONTRÓ .ubits/project-config.json`);
			console.error(`   ❌ [DEBUG] Último directorio intentado: ${currentDir}`);
			console.error(`   🔍 [DEBUG] ========================================`);
			console.warn('⚠️ AutorunAgent: No se encontró configuración en .ubits/project-config.json');
			console.warn('   Ejecuta "npm run init" para configurar Autorun');
			throw new Error('Autorun no está configurado. Ejecuta "npm run init" primero.');
		}
		
		console.log(`   🔍 [DEBUG] ========================================`);

		// Crear e inicializar hub
		console.log(`   🔍 [DEBUG] Usando config path final: ${configPath}`);
		const hub = new AutorunHub(configPath);

		// ⚠️ CRÍTICO: Registrar add-ons disponibles ANTES de inicializar
		// Esto asegura que los add-ons estén disponibles cuando se intenten activar
		try {
			const registeredCount = await registerAvailableAddons(hub);
			if (registeredCount > 0) {
				console.log(`📦 AutorunAgent: ${registeredCount} add-on(s) registrado(s) automáticamente`);
			}
		} catch (error: any) {
			// No bloquear si falla el registro automático
			console.warn('⚠️ AutorunAgent: Error registrando add-ons automáticamente:', error.message);
		}

		await hub.initialize();

		globalHub = hub;
		console.log('✅ AutorunAgent: AutorunHub inicializado correctamente');
		console.log('   - File watching activo');
		console.log('   - Add-ons cargados');

		return hub;
	} catch (error: any) {
		console.error('❌ AutorunAgent: Error inicializando AutorunHub:', error.message);
		initializationPromise = null;
		throw error;
	}
}

/**
 * Verifica si AutorunHub está inicializado
 */
export function isAutorunHubInitialized(): boolean {
	return globalHub !== null && globalHub['initialized'] === true;
}

/**
 * Verifica y asegura que AutorunHub esté inicializado
 * Útil para verificación automática antes de operaciones críticas
 */
export async function ensureAutorunHubInitialized(): Promise<AutorunHub> {
	if (isAutorunHubInitialized()) {
		return globalHub!;
	}

	console.log('⚠️ AutorunHub no está inicializado. Inicializando automáticamente...');
	return await getAutorunHub();
}

/**
 * Obtiene el estado completo de AutorunHub
 */
export async function getAutorunHubStatus(): Promise<{
	initialized: boolean;
	fileWatching: boolean;
	activeAddons: string[];
	error?: string;
}> {
	try {
		const hub = await ensureAutorunHubInitialized();
		const activeAddonsMap = (hub as any).activeAddons as Map<string, any> | undefined;
		const activeAddons: string[] = activeAddonsMap
			? Array.from(activeAddonsMap.keys()).map((key) => String(key))
			: [];
		const fileWatching = !!(hub as any).fileWatcher;

		return {
			initialized: hub['initialized'] || false,
			fileWatching,
			activeAddons,
		};
	} catch (error: any) {
		return {
			initialized: false,
			fileWatching: false,
			activeAddons: [],
			error: error.message,
		};
	}
}

/**
 * Obtiene la instancia actual de AutorunHub (puede ser null)
 */
export function getCurrentHub(): AutorunHub | null {
	return globalHub;
}

/**
 * Reinicia AutorunHub (útil para testing o reconfiguración)
 */
export async function restartAutorunHub(): Promise<AutorunHub> {
	if (globalHub) {
		try {
			// Detener file watching
			if (typeof (globalHub as any).stopFileWatching === 'function') {
				(globalHub as any).stopFileWatching();
			}
			// Desactivar todos los add-ons
			const activeAddonIds = Array.from((globalHub as any).activeAddons?.keys() || []);
			for (const addonId of activeAddonIds) {
				try {
					await (globalHub as any).deactivateAddon(addonId);
				} catch (error) {
					// Ignorar errores individuales
				}
			}
		} catch (error) {
			// Ignorar errores al destruir
		}
		globalHub = null;
		initializationPromise = null;
	}

	return initializeAutorunHub();
}
