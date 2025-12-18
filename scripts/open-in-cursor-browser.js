#!/usr/bin/env node

/**
 * Script helper para abrir templates en el browser de Cursor
 *
 * Este script está diseñado para ser usado por el agente de Cursor
 * para abrir templates en el browser integrado de Cursor usando MCP.
 *
 * Uso:
 *   node scripts/open-in-cursor-browser.js <template-file>
 *
 * Ejemplo:
 *   node scripts/open-in-cursor-browser.js prototypes/canvas-encuestas.html
 */

import { readFile } from 'fs/promises';
import { pathToFileURL } from 'url';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error('❌ Error: Debes proporcionar la ruta del template');
		console.log('\nUso:');
		console.log('  node scripts/open-in-cursor-browser.js <template-file>');
		console.log('\nEjemplo:');
		console.log('  node scripts/open-in-cursor-browser.js prototypes/canvas-encuestas.html');
		process.exit(1);
	}

	const templatePath = args[0];
	const templateName = basename(templatePath);

	// Detectar si estamos en el directorio prototypes/ o necesitamos la ruta completa
	let fullPath = templatePath;
	if (!templatePath.startsWith(projectRoot)) {
		fullPath = join(projectRoot, templatePath);
	}

	// Puerto por defecto del servidor local
	const port = process.env.AUTORUN_PORT || 3000;
	const serverUrl = `http://localhost:${port}`;
	const httpUrl = `${serverUrl}/${templateName}`;

	console.log('\n📋 Información del Template:');
	console.log(`   📄 Archivo: ${templateName}`);
	console.log(`   📁 Ruta: ${fullPath}`);
	console.log(`   🌐 URL Local: ${httpUrl}`);
	console.log(`   🔌 Puerto: ${port}`);

	console.log('\n💡 Instrucciones para el Agente de Cursor:');
	console.log('   1. Verifica que el servidor local esté corriendo en el puerto', port);
	console.log('   2. Usa el browser MCP de Cursor para navegar a:', httpUrl);
	console.log(
		'   3. Usa las herramientas de inspección (VisBug, DevTools) para analizar elementos',
	);
	console.log('\n🔧 Comandos MCP sugeridos:');
	console.log(`   - mcp_cursor-ide-browser_browser_navigate({ url: "${httpUrl}" })`);
	console.log('   - mcp_cursor-ide-browser_browser_snapshot()');
	console.log('   - mcp_cursor-ide-browser_browser_take_screenshot()');

	console.log('\n📚 Recursos:');
	console.log('   - Guía VisBug: docs/guias/uso/GUIA-USO-VISBUG-AUTORUN.md');
	console.log('   - Análisis herramientas: ANALISIS-HERRAMIENTAS-SELECCION-ELEMENTOS.md');

	// Retornar información estructurada para el agente
	return {
		templateName,
		templatePath: fullPath,
		httpUrl,
		serverUrl,
		port,
		instructions: {
			navigate: `Navegar a ${httpUrl} usando browser MCP`,
			snapshot: 'Tomar snapshot de accesibilidad de la página',
			screenshot: 'Tomar screenshot para análisis visual',
		},
	};
}

main()
	.then((result) => {
		// Si se ejecuta desde Node.js directamente, mostrar resultado
		if (require.main === module) {
			console.log('\n✅ Script ejecutado correctamente');
			console.log('\n📝 Nota: Este script está diseñado para ser usado por el agente de Cursor.');
			console.log('   El agente debe usar el browser MCP para abrir la URL mostrada arriba.');
		}
	})
	.catch((error) => {
		console.error('❌ Error:', error.message);
		process.exit(1);
	});
