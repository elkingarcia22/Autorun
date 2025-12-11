#!/usr/bin/env node
/**
 * Script de prueba para simular el flujo completo del wizard
 * Esto ayuda a ver todos los logs y verificar que todo funciona
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testWizardFlow() {
	console.log('='.repeat(80));
	console.log('🧪 PRUEBA DEL FLUJO COMPLETO DEL WIZARD');
	console.log('='.repeat(80));

	// Paso 1: Simular que el wizard escribe el archivo de estado
	console.log('\n[TEST] Paso 1: Simulando escritura del archivo de estado del wizard...');
	const statePath = path.join(process.cwd(), '.autorun', 'wizard-state.json');
	const stateDir = path.dirname(statePath);

	// Crear directorio si no existe
	if (!fs.existsSync(stateDir)) {
		fs.mkdirSync(stateDir, { recursive: true });
		console.log(`[TEST] ✅ Directorio creado: ${stateDir}`);
	}

	const testUrl = 'http://localhost:3000/canvas-administrador-encuestas-2025-12-10.html';
	const state = {
		url: testUrl,
		initHub: true,
		timestamp: new Date().toISOString(),
		message: 'El agente debe inicializar AutorunHub y abrir el browser automáticamente',
	};

	fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf-8');
	console.log(`[TEST] ✅ Archivo de estado escrito: ${statePath}`);
	console.log(`[TEST] Contenido:`, JSON.stringify(state, null, 2));

	// Paso 2: Ejecutar el script de detección (como lo haría el wizard)
	console.log('\n[TEST] Paso 2: Ejecutando script de detección (como lo haría el wizard)...');
	console.log('-'.repeat(80));

	try {
		const scriptPath = path.join(process.cwd(), 'scripts', 'detect-wizard-state.js');
		const { stdout, stderr } = await execAsync(`node "${scriptPath}"`);

		console.log('[TEST] Salida del script de detección:');
		console.log(stdout);
		if (stderr) {
			console.log('[TEST] Errores:');
			console.log(stderr);
		}
	} catch (error) {
		console.log(`[TEST] ❌ Error ejecutando script: ${error.message}`);
	}

	console.log('-'.repeat(80));

	// Paso 3: Verificar que el agente puede detectar los mensajes
	console.log('\n[TEST] Paso 3: Verificando que el agente puede detectar los mensajes...');
	const output = await execAsync(
		`node "${path.join(process.cwd(), 'scripts', 'detect-wizard-state.js')}"`,
	);

	const hasWizardState = output.stdout.includes(
		'[AUTORUN_WIZARD_STATE_DETECTED]true[/AUTORUN_WIZARD_STATE_DETECTED]',
	);
	const hasBrowserUrl = output.stdout.includes('[AUTORUN_BROWSER_URL]');
	const hasInitHub = output.stdout.includes('[AUTORUN_INIT_HUB]true[/AUTORUN_INIT_HUB]');

	console.log(
		`[TEST] ¿Detectó [AUTORUN_WIZARD_STATE_DETECTED]? ${hasWizardState ? '✅ SÍ' : '❌ NO'}`,
	);
	console.log(`[TEST] ¿Detectó [AUTORUN_BROWSER_URL]? ${hasBrowserUrl ? '✅ SÍ' : '❌ NO'}`);
	console.log(`[TEST] ¿Detectó [AUTORUN_INIT_HUB]? ${hasInitHub ? '✅ SÍ' : '❌ NO'}`);

	if (hasWizardState && hasBrowserUrl && hasInitHub) {
		console.log('\n[TEST] ✅ Todos los mensajes especiales fueron emitidos correctamente');
		console.log('[TEST] El agente debería poder detectarlos y procesarlos automáticamente');
	} else {
		console.log('\n[TEST] ⚠️  Algunos mensajes especiales no fueron emitidos');
	}

	// Paso 4: Mostrar qué debería hacer el agente
	console.log('\n[TEST] Paso 4: Lo que el agente debería hacer ahora:');
	console.log('  1. Detectar los mensajes especiales en la salida');
	console.log('  2. Extraer la URL de [AUTORUN_BROWSER_URL]...[/AUTORUN_BROWSER_URL]');
	console.log('  3. Ejecutar: npm run autorun:init-hub');
	console.log('  4. Abrir browser con la URL extraída');
	console.log('  5. Limpiar el archivo de estado: rm .autorun/wizard-state.json');

	console.log('\n' + '='.repeat(80));
	console.log('✅ Prueba completada');
	console.log('='.repeat(80));
}

testWizardFlow().catch(console.error);



