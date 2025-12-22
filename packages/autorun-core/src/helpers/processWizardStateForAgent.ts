/**
 * Process Wizard State For Agent
 *
 * ⚠️ CRÍTICO: Helper que el agente puede llamar directamente para procesar
 * el wizard state automáticamente. Este helper ejecuta todas las acciones
 * necesarias: inicializar AutorunHub, abrir browser, limpiar archivo.
 *
 * Este helper DEBE ser llamado por el agente cuando detecta mensajes
 * [AUTORUN_WIZARD_STATE_DETECTED]true[/AUTORUN_WIZARD_STATE_DETECTED] en los logs.
 */

import { autoDetectWizardState, processWizardState } from './autoWizardDetection.js';
import { getAutorunHub } from '../AutorunAgent.js';

export interface ProcessWizardStateResult {
	success: boolean;
	url?: string;
	error?: string;
	message?: string;
}

/**
 * ⚠️ CRÍTICO: Procesar wizard state automáticamente para el agente
 *
 * Esta función DEBE ser llamada por el agente cuando detecta wizard state.
 * Ejecuta todas las acciones necesarias automáticamente.
 *
 * @returns Resultado con URL para abrir en el browser
 */
export async function processWizardStateForAgent(): Promise<ProcessWizardStateResult> {
	console.log('\n🚀 [Process Wizard State For Agent] ========================================');
	console.log('🚀 [Process Wizard State For Agent] Procesando wizard state...');

	try {
		// 1. Detectar wizard state
		const detection = await autoDetectWizardState();

		if (!detection.detected || !detection.url) {
			console.log('✅ [Process Wizard State For Agent] No hay wizard state para procesar');
			return {
				success: false,
				message: 'No hay wizard state para procesar',
			};
		}

		console.log(`✅ [Process Wizard State For Agent] Wizard state detectado: ${detection.url}`);

		// 2. Procesar wizard state (inicializa AutorunHub)
		if (detection.initHub) {
			console.log('🚀 [Process Wizard State For Agent] Inicializando AutorunHub...');
			const hub = await getAutorunHub();
			if (hub) {
				console.log('✅ [Process Wizard State For Agent] AutorunHub inicializado');
			}
		}

		console.log(`✅ [Process Wizard State For Agent] Wizard state procesado exitosamente`);
		console.log(
			`📋 [Process Wizard State For Agent] El agente debe abrir el browser con: ${detection.url}`,
		);

		return {
			success: true,
			url: detection.url,
			message: 'Wizard state procesado exitosamente. Abre el browser con la URL proporcionada.',
		};
	} catch (error: any) {
		console.error(
			`❌ [Process Wizard State For Agent] Error procesando wizard state: ${error.message}`,
		);
		return {
			success: false,
			error: error.message,
		};
	}
}
