/**
 * Helper para configurar y verificar Storybook MCP
 *
 * Este helper:
 * 1. Detecta si Storybook local está corriendo
 * 2. Si no, usa Vercel con token de bypass
 * 3. Proporciona la configuración MCP correcta
 */

import http from 'http';

// Token de bypass de Vercel (desde UBITSPreset.ts)
const VERCEL_BYPASS_TOKEN = 'dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT';
const VERCEL_STORYBOOK_URL = 'https://ubits-storybook10.vercel.app';
const LOCAL_STORYBOOK_URL = 'http://localhost:6006';

export interface StorybookMCPConfig {
	command: string;
	args: string[];
	env: {
		STORYBOOK_URL: string;
	};
}

export interface StorybookMCPInfo {
	localAvailable: boolean;
	url: string;
	config: StorybookMCPConfig;
}

/**
 * Verifica si Storybook local está corriendo
 */
export async function checkLocalStorybook(): Promise<boolean> {
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
 * Genera la configuración MCP para Storybook
 */
export async function getStorybookMCPConfig(): Promise<StorybookMCPInfo> {
	const localAvailable = await checkLocalStorybook();

	const storybookUrl = localAvailable
		? `${LOCAL_STORYBOOK_URL}/index.json`
		: `${VERCEL_STORYBOOK_URL}/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${VERCEL_BYPASS_TOKEN}`;

	const config: StorybookMCPConfig = {
		command: 'npx',
		args: ['-y', 'storybook-mcp@latest'],
		env: {
			STORYBOOK_URL: storybookUrl,
		},
	};

	return {
		localAvailable,
		url: storybookUrl,
		config,
	};
}

/**
 * Genera la configuración MCP completa para agregar a Cursor
 */
export async function getFullMCPConfig(): Promise<{
	mcpServers: Record<string, StorybookMCPConfig>;
}> {
	const info = await getStorybookMCPConfig();

	return {
		mcpServers: {
			'storybook-ubits': info.config,
		},
	};
}

/**
 * Obtiene instrucciones para configurar MCP manualmente
 */
export async function getMCPSetupInstructions(): Promise<string> {
	const info = await getStorybookMCPConfig();
	const config = await getFullMCPConfig();

	const instructions = [
		'📋 Configuración de Storybook MCP',
		'',
		`✅ Storybook ${info.localAvailable ? 'local' : 'Vercel'} detectado`,
		`   URL: ${info.url}`,
		'',
		'📝 Agrega esta configuración a Cursor:',
		'',
		'1. Abre Cursor',
		'2. Ve a Settings → Features → MCP',
		'3. O edita manualmente el archivo de configuración MCP',
		'4. Agrega la siguiente configuración:',
		'',
		JSON.stringify(config, null, 2),
		'',
		'5. Reinicia Cursor completamente',
		'',
		'✅ Después de reiniciar, el MCP debería funcionar correctamente',
	];

	return instructions.join('\n');
}
