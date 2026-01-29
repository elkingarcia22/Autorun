#!/usr/bin/env node

/**
 * Script para configurar automáticamente Storybook MCP en Cursor
 *
 * Este script:
 * 1. Detecta si Storybook local está corriendo
 * 2. Si no, usa Vercel con token de bypass
 * 3. Genera la configuración MCP correcta
 * 4. Muestra instrucciones para agregarla a Cursor
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Token de bypass de Vercel (desde UBITSPreset.ts)
const VERCEL_BYPASS_TOKEN = 'dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';
const VERCEL_STORYBOOK_URL = 'https://ubits-storybook10.vercel.app';
const LOCAL_STORYBOOK_URL = 'http://localhost:6006';

/**
 * Verifica si Storybook local está corriendo
 */
async function checkLocalStorybook() {
	return new Promise((resolve) => {
		const req = http.get(`${LOCAL_STORYBOOK_URL}/index.json`, { timeout: 2000 }, (res) => {
			resolve(res.statusCode === 200);
		});

		req.on('error', () => resolve(false));
		req.on('timeout', () => {
			req.destroy();
			resolve(false);
		});
	});
}

/**
 * Genera la configuración MCP
 */
function generateMCPConfig(useLocal) {
	const storybookUrl = useLocal
		? `${LOCAL_STORYBOOK_URL}/index.json`
		: `${VERCEL_STORYBOOK_URL}/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${VERCEL_BYPASS_TOKEN}`;

	return {
		mcpServers: {
			'storybook': { // ⚠️ CRÍTICO: Usar "storybook" (no "storybook-ubits") para que coincida con el código
				command: 'node',
				args: [
					path.join(__dirname, 'storybook-mcp-wrapper.mjs') // ⚠️ Usar .mjs para que Node.js lo reconozca como ES module
				], // ⚠️ Usar wrapper personalizado con mejor manejo de errores
				env: {
					STORYBOOK_URL: storybookUrl,
				},
			},
		},
	};
}

/**
 * Obtiene la ruta del archivo de configuración MCP de Cursor
 */
function getMCPConfigPath() {
	const platform = os.platform();
	const homeDir = os.homedir();

	if (platform === 'darwin') {
		// macOS
		return path.join(
			homeDir,
			'Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json',
		);
	} else if (platform === 'win32') {
		// Windows
		return path.join(
			process.env.APPDATA || '',
			'Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json',
		);
	} else {
		// Linux
		return path.join(
			homeDir,
			'.config/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json',
		);
	}
}

/**
 * Lee la configuración MCP existente
 */
function readExistingConfig(configPath) {
	try {
		if (fs.existsSync(configPath)) {
			const content = fs.readFileSync(configPath, 'utf8');
			return JSON.parse(content);
		}
	} catch (error) {
		console.warn('⚠️  No se pudo leer la configuración existente:', error.message);
	}
	return { mcpServers: {} };
}

/**
 * Escribe la configuración MCP
 */
function writeMCPConfig(configPath, config) {
	try {
		// Crear directorio si no existe
		const dir = path.dirname(configPath);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		// Leer configuración existente
		const existing = readExistingConfig(configPath);

		// ⚠️ CRÍTICO: Eliminar servidor viejo 'storybook-ubits' antes de agregar el nuevo
		if (existing.mcpServers && existing.mcpServers['storybook-ubits']) {
			delete existing.mcpServers['storybook-ubits'];
			console.log('   🗑️  Eliminando servidor viejo "storybook-ubits"');
		}

		// Fusionar con nueva configuración
		const merged = {
			...existing,
			mcpServers: {
				...existing.mcpServers,
				...config.mcpServers,
			},
		};

		// Escribir configuración
		fs.writeFileSync(configPath, JSON.stringify(merged, null, 2));
		return true;
	} catch (error) {
		console.error('❌ Error escribiendo configuración:', error.message);
		return false;
	}
}

/**
 * Función principal
 */
async function main() {
	console.log('🔧 Configurando Storybook MCP automáticamente...\n');

	// Verificar si Storybook local está corriendo
	console.log('🔍 Verificando Storybook local...');
	const localAvailable = await checkLocalStorybook();

	if (localAvailable) {
		console.log('✅ Storybook local está corriendo en http://localhost:6006');
		console.log('   Usando URL local para MCP\n');
	} else {
		console.log('⚠️  Storybook local no está corriendo');
		console.log('   Usando Vercel con token de bypass\n');
	}

	// Generar configuración
	const config = generateMCPConfig(localAvailable);
	const configPath = getMCPConfigPath();

	console.log('📝 Configuración generada:');
	console.log(JSON.stringify(config, null, 2));
	console.log('\n');

	// Intentar escribir automáticamente
	console.log(`📁 Ruta de configuración: ${configPath}\n`);

	const written = writeMCPConfig(configPath, config);

	if (written) {
		console.log('✅ Configuración escrita exitosamente!');
		console.log('\n📋 Próximos pasos:');
		console.log('   1. Reinicia Cursor completamente');
		console.log('   2. Verifica que el MCP esté funcionando preguntando:');
		console.log('      "Lista los componentes disponibles en Storybook"');
		console.log('   3. Si no funciona, verifica la configuración en:');
		console.log(`      ${configPath}`);
	} else {
		console.log('⚠️  No se pudo escribir automáticamente');
		console.log('\n📋 Instrucciones manuales:');
		console.log('   1. Abre Cursor');
		console.log('   2. Ve a Settings → Features → MCP');
		console.log('   3. O edita manualmente el archivo:');
		console.log(`      ${configPath}`);
		console.log('   4. Agrega la siguiente configuración:');
		console.log('\n' + JSON.stringify(config, null, 2));
		console.log('\n   5. Reinicia Cursor');
	}

	console.log('\n✅ Proceso completado!');
}

// Ejecutar
main().catch((error) => {
	console.error('❌ Error:', error);
	process.exit(1);
});
