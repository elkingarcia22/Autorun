#!/usr/bin/env node

/**
 * Script para instalar y configurar Storybook MCP
 * 
 * Este script:
 * 1. Instala storybook-mcp como dependencia de desarrollo
 * 2. Instala Playwright (requerido por storybook-mcp)
 * 3. Configura el MCP en Cursor
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Token de bypass de Vercel
const VERCEL_BYPASS_TOKEN = 'dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';
const VERCEL_STORYBOOK_URL = 'https://ubits-storybook10.vercel.app';
const LOCAL_STORYBOOK_URL = 'http://localhost:6006';

/**
 * Verifica si Storybook local está corriendo
 */
async function checkLocalStorybook() {
	return new Promise(async (resolve) => {
		const http = await import('http');
		const req = http.default.get(`${LOCAL_STORYBOOK_URL}/index.json`, { timeout: 2000 }, (res) => {
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
 * Obtiene la ruta del archivo de configuración MCP de Cursor
 */
function getMCPConfigPath() {
	const platform = os.platform();
	const homeDir = os.homedir();

	if (platform === 'darwin') {
		return path.join(
			homeDir,
			'Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json',
		);
	} else if (platform === 'win32') {
		return path.join(
			process.env.APPDATA || '',
			'Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json',
		);
	} else {
		return path.join(
			homeDir,
			'.config/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json',
		);
	}
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
			'storybook-ubits': {
				command: 'npx',
				args: ['-y', 'storybook-mcp@latest'],
				env: {
					STORYBOOK_URL: storybookUrl,
				},
			},
		},
	};
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
	console.log('🔧 Instalando y configurando Storybook MCP...\n');

	// Paso 1: Instalar storybook-mcp
	console.log('📦 Paso 1: Instalando storybook-mcp...');
	try {
		execSync('npm install --save-dev storybook-mcp@latest', {
			stdio: 'inherit',
			cwd: path.join(__dirname, '..'),
		});
		console.log('✅ storybook-mcp instalado correctamente\n');
	} catch (error) {
		console.error('❌ Error instalando storybook-mcp:', error.message);
		process.exit(1);
	}

	// Paso 2: Instalar Playwright (requerido por storybook-mcp)
	console.log('📦 Paso 2: Instalando Playwright (requerido por storybook-mcp)...');
	try {
		execSync('npx playwright install chromium', {
			stdio: 'inherit',
			cwd: path.join(__dirname, '..'),
		});
		console.log('✅ Playwright instalado correctamente\n');
	} catch (error) {
		console.warn('⚠️  Advertencia: No se pudo instalar Playwright automáticamente');
		console.warn('   El MCP intentará instalarlo automáticamente cuando se ejecute\n');
	}

	// Paso 3: Verificar Storybook
	console.log('🔍 Paso 3: Verificando Storybook...');
	const localAvailable = await checkLocalStorybook();

	if (localAvailable) {
		console.log('✅ Storybook local está corriendo en http://localhost:6006');
		console.log('   Usando URL local para MCP\n');
	} else {
		console.log('⚠️  Storybook local no está corriendo');
		console.log('   Usando Vercel con token de bypass\n');
	}

	// Paso 4: Configurar MCP en Cursor
	console.log('⚙️  Paso 4: Configurando MCP en Cursor...');
	const config = generateMCPConfig(localAvailable);
	const configPath = getMCPConfigPath();

	console.log('📝 Configuración generada:');
	console.log(JSON.stringify(config, null, 2));
	console.log('\n');

	const written = writeMCPConfig(configPath, config);

	if (written) {
		console.log('✅ Configuración escrita exitosamente en Cursor!');
		console.log(`   Ruta: ${configPath}\n`);
	} else {
		console.log('⚠️  No se pudo escribir automáticamente');
		console.log('\n📋 Instrucciones manuales:');
		console.log(`   1. Edita manualmente el archivo: ${configPath}`);
		console.log('   2. Agrega la siguiente configuración:');
		console.log('\n' + JSON.stringify(config, null, 2));
		console.log('\n');
	}

	// Resumen
	console.log('✅ Instalación completada!\n');
	console.log('📋 Próximos pasos:');
	console.log('   1. Reinicia Cursor completamente (cierra todas las ventanas)');
	console.log('   2. Verifica que el MCP esté funcionando preguntando:');
	console.log('      "Lista los componentes disponibles en Storybook"');
	console.log('   3. Si no funciona, verifica la configuración en:');
	console.log(`      ${configPath}`);
	console.log('\n');
}

// Ejecutar
main().catch((error) => {
	console.error('❌ Error:', error);
	process.exit(1);
});

