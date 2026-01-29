/**
 * Auto Wizard Detection
 *
 * ⚠️ CRÍTICO: Sistema que detecta automáticamente el estado del wizard
 * y ejecuta la inicialización de AutorunHub y apertura del browser automáticamente.
 *
 * Este sistema DEBE ejecutarse al inicio de cada mensaje, ANTES de cualquier otra cosa.
 */

import { hasWizardState, readWizardState, clearWizardState } from './wizardStateDetector.js';
import { getAutorunHub } from '../AutorunAgent.js';

export interface WizardDetectionResult {
	detected: boolean;
	url?: string;
	initHub?: boolean;
	processed: boolean;
	error?: string;
}

/**
 * ⚠️ CRÍTICO: Detectar y procesar wizard state automáticamente
 *
 * Esta función DEBE llamarse al inicio de cada mensaje, ANTES de cualquier otra cosa.
 * Detecta el archivo de estado del wizard y emite mensajes especiales para que el agente
 * inicialice AutorunHub y abra el browser automáticamente.
 *
 * @returns Resultado con información de detección
 */
export async function autoDetectWizardState(): Promise<WizardDetectionResult> {
	console.log('\n🔍 [Auto Wizard Detection] ========================================');
	console.log('🔍 [Auto Wizard Detection] Detectando estado del wizard...');

	try {
		// Verificar si existe archivo de estado
		if (!(await hasWizardState())) {
			console.log('✅ [Auto Wizard Detection] No hay archivo de estado del wizard');
			return {
				detected: false,
				processed: false,
			};
		}

		// Leer estado del wizard
		const wizardState = await readWizardState();
		if (!wizardState || !wizardState.url) {
			console.log('✅ [Auto Wizard Detection] Archivo de estado no tiene información válida');
			return {
				detected: false,
				processed: false,
			};
		}

		console.log(`✅ [Auto Wizard Detection] Wizard state detectado: ${wizardState.url}`);
		console.log(`🚀 [Auto Wizard Detection] Emitiendo mensajes para inicialización automática...`);

		// Emitir mensajes especiales para que el agente los procese
		// Estos mensajes son interceptados por las reglas de Cursor
		console.log(`[AUTORUN_WIZARD_STATE_DETECTED]true[/AUTORUN_WIZARD_STATE_DETECTED]`);
		console.log(`[AUTORUN_BROWSER_URL]${wizardState.url}[/AUTORUN_BROWSER_URL]`);
		if (wizardState.initHub) {
			console.log(`[AUTORUN_INIT_HUB]true[/AUTORUN_INIT_HUB]`);
		}

		console.log(`\n📋 [Auto Wizard Detection] El agente debe ejecutar automáticamente:`);
		console.log(`   1. npm run autorun:init-hub`);
		console.log(`   2. Abrir browser: ${wizardState.url}`);
		console.log(`   3. Limpiar archivo de estado`);

		// NO limpiar el archivo aquí - el agente lo hará después de procesar
		// Esto permite que el agente vea los mensajes y ejecute las acciones

		return {
			detected: true,
			url: wizardState.url,
			initHub: wizardState.initHub,
			processed: false, // El agente debe procesarlo
		};
	} catch (error: any) {
		console.error(`❌ [Auto Wizard Detection] Error detectando wizard state: ${error.message}`);
		return {
			detected: false,
			processed: false,
			error: error.message,
		};
	}
}

/**
 * ⚠️ CRÍTICO: Procesar wizard state automáticamente
 *
 * Esta función ejecuta las acciones necesarias cuando se detecta wizard state:
 * 1. Inicializa AutorunHub
 * 2. Retorna la URL para que el agente abra el browser
 *
 * NOTA: Esta función NO limpia el archivo de estado - el agente lo hará después de abrir el browser
 *
 * @param wizardState Estado del wizard detectado
 * @returns URL del template para abrir en el browser
 */
export async function processWizardState(wizardState: {
	url: string;
	initHub?: boolean;
}): Promise<{ url: string; initHub: boolean }> {
	console.log('\n🚀 [Auto Wizard Detection] Procesando wizard state...');

	try {
		// 1. Inicializar AutorunHub si es necesario
		if (wizardState.initHub) {
			console.log('🚀 [Auto Wizard Detection] Inicializando AutorunHub...');
			const hub = await getAutorunHub();
			if (hub) {
				console.log('✅ [Auto Wizard Detection] AutorunHub inicializado');
			}
		}

		// 2. Retornar URL para que el agente abra el browser
		// El agente debe usar call_mcp_tool para abrir el browser interno de Cursor

		// 3. NO limpiar el archivo aquí - el agente lo hará después de abrir el browser
		// Esto permite que el agente vea los mensajes y ejecute las acciones

		return {
			url: wizardState.url,
			initHub: wizardState.initHub || false,
		};
	} catch (error: any) {
		console.error(`❌ [Auto Wizard Detection] Error procesando wizard state: ${error.message}`);
		throw error;
	}
}
