#!/usr/bin/env node
/**
 * Script para detectar y procesar el archivo de estado del wizard
 * Este script se ejecuta automáticamente para detectar si el wizard terminó
 * y necesita inicializar AutorunHub y abrir el browser
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function detectAndProcessWizardState() {
	console.log('[DETECT-WIZARD-STATE] Iniciando detección del estado del wizard...');
	console.log(`[DETECT-WIZARD-STATE] Directorio de trabajo: ${process.cwd()}`);

	try {
		const statePath = path.join(process.cwd(), '.autorun', 'wizard-state.json');
		console.log(`[DETECT-WIZARD-STATE] Ruta del archivo de estado: ${statePath}`);

		// Verificar si existe el archivo
		if (!fs.existsSync(statePath)) {
			console.log('[DETECT-WIZARD-STATE] ❌ No hay archivo de estado del wizard');
			console.log('[DETECT-WIZARD-STATE] El wizard aún no ha terminado o el archivo fue eliminado');
			process.exit(0);
		}

		console.log('[DETECT-WIZARD-STATE] ✅ Archivo de estado encontrado');

		// Leer el archivo
		const stateContent = fs.readFileSync(statePath, 'utf-8');
		console.log('[DETECT-WIZARD-STATE] Contenido del archivo leído');
		const state = JSON.parse(stateContent);
		console.log(`[DETECT-WIZARD-STATE] Estado parseado:`, JSON.stringify(state, null, 2));

		if (state && state.initHub && state.url) {
			console.log('[DETECT-WIZARD-STATE] ✅ Archivo de estado del wizard detectado');
			console.log(`[DETECT-WIZARD-STATE] URL: ${state.url}`);
			console.log(`[DETECT-WIZARD-STATE] InitHub: ${state.initHub}`);
			console.log(`[DETECT-WIZARD-STATE] Timestamp: ${state.timestamp}`);
			console.log(`\n[DETECT-WIZARD-STATE] 🚀 El agente debe ejecutar:`);
			console.log(`[DETECT-WIZARD-STATE] 1. npm run autorun:init-hub`);
			console.log(`[DETECT-WIZARD-STATE] 2. Abrir browser: ${state.url}`);
			console.log(`\n[DETECT-WIZARD-STATE] Emitiendo mensajes especiales para el agente...`);
			console.log(`[AUTORUN_WIZARD_STATE_DETECTED]true[/AUTORUN_WIZARD_STATE_DETECTED]`);
			console.log(`[AUTORUN_BROWSER_URL]${state.url}[/AUTORUN_BROWSER_URL]`);
			console.log(`[AUTORUN_INIT_HUB]true[/AUTORUN_INIT_HUB]`);
			console.log(`[DETECT-WIZARD-STATE] ✅ Mensajes emitidos correctamente`);
			process.exit(0);
		} else {
			console.log(
				'[DETECT-WIZARD-STATE] ⚠️ Archivo de estado del wizard no tiene información válida',
			);
			console.log(`[DETECT-WIZARD-STATE] Estado recibido:`, state);
			process.exit(0);
		}
	} catch (error) {
		// No es crítico si falla
		console.log('[DETECT-WIZARD-STATE] ❌ Error al leer el archivo de estado del wizard');
		console.log(`[DETECT-WIZARD-STATE] Error:`, error.message);
		console.log(`[DETECT-WIZARD-STATE] Stack:`, error.stack);
		process.exit(0);
	}
}

detectAndProcessWizardState();
