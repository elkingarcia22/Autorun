#!/usr/bin/env node

/**
 * Browser Helper para Autorun
 *
 * Helper para facilitar el uso del browser MCP de Cursor con templates Autorun
 *
 * Uso desde el agente de Cursor:
 *   - Leer este archivo para obtener información del template
 *   - Usar browser MCP para navegar y analizar
 */

import { readFile } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');

/**
 * Obtiene información de un template para usar con browser MCP
 */
export async function getTemplateInfo(templatePath) {
	const templateName = basename(templatePath);
	const fullPath = join(projectRoot, templatePath);

	if (!existsSync(fullPath)) {
		throw new Error(`Template no encontrado: ${fullPath}`);
	}

	const port = process.env.AUTORUN_PORT || 3000;
	const serverUrl = `http://localhost:${port}`;
	const httpUrl = `${serverUrl}/${templateName}`;

	return {
		templateName,
		templatePath: fullPath,
		httpUrl,
		serverUrl,
		port,
		mcpCommands: {
			navigate: {
				tool: 'mcp_cursor-ide-browser_browser_navigate',
				args: { url: httpUrl },
			},
			snapshot: {
				tool: 'mcp_cursor-ide-browser_browser_snapshot',
				args: {},
			},
			screenshot: {
				tool: 'mcp_cursor-ide-browser_browser_take_screenshot',
				args: { fullPage: true },
			},
		},
		instructions: {
			step1: `Navegar a ${httpUrl} usando browser MCP`,
			step2: 'Tomar snapshot de accesibilidad de la página',
			step3: 'Activar VisBug para inspeccionar elementos visualmente',
			step4: 'Usar DevTools para valores exactos (F12)',
			step5: 'Generar instrucción precisa para implementar cambios',
		},
	};
}

/**
 * Genera instrucción para Cursor basada en análisis visual
 */
export function generateCursorInstruction(analysis) {
	const { component, file, line, property, currentValue, newValue, token } = analysis;

	let instruction = `En el componente ${component}`;

	if (file) {
		instruction += ` del archivo ${file}`;
	}

	if (line) {
		instruction += ` (línea ${line})`;
	}

	if (property && currentValue && newValue) {
		instruction += `, cambia ${property} de ${currentValue}`;

		if (token) {
			instruction += ` (${token})`;
		}

		instruction += ` a ${newValue}`;

		if (token) {
			instruction += ` usando el token ${token}`;
		}
	}

	instruction += '.';

	return instruction;
}

/**
 * Lista templates disponibles
 */
export async function listTemplates() {
	const prototypesDir = join(projectRoot, 'prototypes');

	if (!existsSync(prototypesDir)) {
		return [];
	}

	const { readdir } = await import('fs/promises');
	const files = await readdir(prototypesDir);

	return files
		.filter((file) => file.endsWith('.html'))
		.map((file) => ({
			name: file,
			path: join('prototypes', file),
			url: `http://localhost:${process.env.AUTORUN_PORT || 3000}/${file}`,
		}));
}

// Si se ejecuta directamente, mostrar ayuda
if (import.meta.url === `file://${process.argv[1]}`) {
	console.log('\n📋 Browser Helper para Autorun\n');
	console.log('Este helper está diseñado para ser usado por el agente de Cursor.');
	console.log('No se ejecuta directamente, sino que se importa cuando es necesario.\n');
	console.log('Uso desde el agente:');
	console.log('  1. Leer este archivo para obtener funciones helper');
	console.log('  2. Usar getTemplateInfo() para obtener información del template');
	console.log('  3. Usar browser MCP para navegar y analizar');
	console.log('  4. Usar generateCursorInstruction() para crear instrucciones\n');
}
