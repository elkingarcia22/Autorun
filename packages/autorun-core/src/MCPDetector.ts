/**
 * MCPDetector
 *
 * Detecta si hay servidores MCP disponibles para un servicio específico
 * y verifica si están configurados correctamente.
 */

export interface MCPServerInfo {
	name: string;
	available: boolean;
	configured: boolean;
	configPath?: string;
}

export interface MCPCapabilities {
	github?: boolean;
	vercel?: boolean;
	clarity?: boolean;
	figma?: boolean;
	'talk-to-figma'?: boolean;
	storybook?: boolean;
	supabase?: boolean;
	'n8n-mcp'?: boolean;
	'google-sheets'?: boolean;
	[key: string]: boolean | undefined;
}

export class MCPDetector {
	/**
	 * Detecta si hay un servidor MCP disponible para un servicio específico
	 */
	static async detectMCPServer(serviceName: string): Promise<MCPServerInfo> {
		const mcpServers: Record<string, string> = {
			github: 'GitHub',
			vercel: 'Vercel',
			clarity: 'Clarity',
			figma: 'Figma',
			'talk-to-figma': 'Talk to Figma',
			storybook: 'Storybook',
			supabase: 'Supabase',
			'n8n-mcp': 'n8n MCP',
			n8n: 'n8n MCP',
			'google-sheets': 'Google Sheets',
			'mcp-gsheets': 'Google Sheets',
		};

		const normalizedName = serviceName.toLowerCase();
		const serverName = mcpServers[normalizedName] || normalizedName;

		// Verificar si MCP está disponible en el entorno
		const available = await this.checkMCPAvailable();

		// Si estamos en Cursor y el servicio no está en la lista, aún así considerarlo disponible
		// porque se puede instalar con npx
		const isCursor = await this.isRunningInCursor();
		const isKnownService = !!mcpServers[normalizedName];
		const finalAvailable = available || (isCursor && !isKnownService);

		// Verificar si el servidor específico está configurado
		const configured = await this.checkServerConfigured(serviceName);

		return {
			name: serverName,
			available: finalAvailable,
			configured,
			configPath: configured ? this.getMCPConfigPath() : undefined,
		};
	}

	/**
	 * Verifica si MCP está disponible en el entorno
	 */
	private static async checkMCPAvailable(): Promise<boolean> {
		try {
			// Verificar si estamos en Cursor (que tiene soporte MCP nativo)
			const isCursor = await this.isRunningInCursor();
			if (isCursor) {
				return true; // Cursor siempre tiene soporte MCP
			}

			// Verificar si hay herramientas MCP disponibles
			// Esto verifica si el entorno tiene acceso a MCP
			if (typeof process !== 'undefined' && process.env) {
				// Verificar variables de entorno relacionadas con MCP
				return !!(
					process.env.MCP_SERVER_PATH ||
					process.env.MCP_CONFIG_PATH ||
					this.checkMCPInConfig()
				);
			}
			return false;
		} catch (error) {
			// Log error en modo desarrollo para debugging
			if (process.env.DEBUG) {
				console.warn('Error checking MCP availability:', error);
			}
			return false;
		}
	}

	/**
	 * Verifica si estamos ejecutando en Cursor
	 */
	private static async isRunningInCursor(): Promise<boolean> {
		try {
			// Verificar variables de entorno de Cursor (más confiable)
			const hasCursorEnv = !!(process.env.CURSOR_VERSION || process.env.CURSOR_AGENT);
			if (hasCursorEnv) {
				return true;
			}

			// Verificar si existe el directorio .cursor en el proyecto actual
			// Esto es un indicador fuerte de que estamos en Cursor
			const fs = await import('fs/promises');
			const path = await import('path');
			const projectCursorDir = path.join(process.cwd(), '.cursor');
			try {
				const stats = await fs.stat(projectCursorDir);
				if (stats.isDirectory()) {
					return true;
				}
			} catch {
				// No existe, continuar
			}

			// Verificar si existe .cursor/mcp.json en el proyecto actual
			const projectCursorMCP = path.join(process.cwd(), '.cursor', 'mcp.json');
			try {
				await fs.access(projectCursorMCP);
				return true;
			} catch {
				// No existe, continuar
			}

			// Verificar si existe el directorio .cursor global (indicador secundario)
			if (process.env.HOME) {
				const cursorDir = path.join(process.env.HOME, '.cursor');
				try {
					const stats = await fs.stat(cursorDir);
					if (stats.isDirectory()) {
						return true;
					}
				} catch {
					// No existe, continuar
				}
			}

			return false;
		} catch (error) {
			// Log error en modo desarrollo para debugging
			if (process.env.DEBUG) {
				console.warn('Error checking if running in Cursor:', error);
			}
			return false;
		}
	}

	/**
	 * Verifica si un servidor MCP específico está configurado
	 */
	private static async checkServerConfigured(serviceName: string): Promise<boolean> {
		try {
			// Buscar configuración en múltiples ubicaciones (Cursor y estándar)
			const fs = await import('fs/promises');
			const path = await import('path');

			// Rutas posibles de configuración
			const configPaths = [
				// Cursor: proyecto local
				path.join(process.cwd(), '.cursor', 'mcp.json'),
				// Cursor: global
				process.env.HOME ? path.join(process.env.HOME, '.cursor', 'mcp.json') : null,
				// Estándar: proyecto local
				path.join(process.cwd(), '.mcp', 'config.json'),
				path.join(process.cwd(), 'mcp.json'),
				// Estándar: global
				process.env.HOME ? path.join(process.env.HOME, '.config', 'mcp', 'mcp.json') : null,
				process.env.HOME ? path.join(process.env.HOME, '.mcp', 'mcp.json') : null,
				// Variable de entorno
				process.env.MCP_CONFIG_PATH ? path.join(process.env.MCP_CONFIG_PATH, 'mcp.json') : null,
			].filter((p): p is string => p !== null);

			for (const configFile of configPaths) {
				try {
					const configContent = await fs.readFile(configFile, 'utf-8');
					const config = JSON.parse(configContent);

					// Verificar si el servidor está en la configuración
					// Cursor usa "mcpServers", estándar puede usar "servers" o "mcpServers"
					const servers = config.mcpServers || config.servers || {};
					const serverConfig = servers[serviceName.toLowerCase()];
					if (serverConfig) {
						// Verificar que la configuración no esté vacía
						// Debe tener al menos 'command' o 'url' (campos mínimos requeridos)
						if (Object.keys(serverConfig).length > 0 && (serverConfig.command || serverConfig.url)) {
							return true;
						}
					}
				} catch {
					// Continuar con la siguiente ruta
					continue;
				}
			}

			return false;
		} catch {
			return false;
		}
	}

	/**
	 * Obtiene la ruta de configuración de MCP
	 */
	private static getMCPConfigPath(): string | undefined {
		// Rutas comunes de configuración de MCP
		// Priorizar rutas de Cursor si estamos en Cursor
		const possiblePaths = [
			process.env.MCP_CONFIG_PATH,
			// Rutas de Cursor (prioridad alta)
			process.env.HOME ? `${process.env.HOME}/.cursor` : undefined,
			process.cwd() + '/.cursor',
			// Rutas estándar de MCP
			process.env.HOME ? `${process.env.HOME}/.config/mcp` : undefined,
			process.env.HOME ? `${process.env.HOME}/.mcp` : undefined,
			process.cwd() + '/.mcp',
		];

		return possiblePaths.find((p) => p) || undefined;
	}

	/**
	 * Verifica si hay configuración de MCP en el proyecto actual
	 */
	private static checkMCPInConfig(): boolean {
		try {
			const fs = require('fs');
			const path = require('path');

			const configPaths = [
				path.join(process.cwd(), '.mcp', 'config.json'),
				path.join(process.cwd(), 'mcp.json'),
				path.join(process.cwd(), '.cursor', 'mcp.json'),
			];

			return configPaths.some((configPath) => {
				try {
					return fs.existsSync(configPath);
				} catch {
					return false;
				}
			});
		} catch {
			return false;
		}
	}

	/**
	 * Detecta todas las capacidades MCP disponibles
	 */
	static async detectAllCapabilities(): Promise<MCPCapabilities> {
		const services = [
			'github',
			'vercel',
			'clarity',
			'figma',
			'talk-to-figma',
			'storybook',
			'supabase',
			'n8n-mcp',
			'google-sheets',
		];
		const capabilities: MCPCapabilities = {};

		for (const service of services) {
			const info = await this.detectMCPServer(service);
			capabilities[service] = info.available && info.configured;
		}

		return capabilities;
	}

	/**
	 * Obtiene información detallada de todos los servidores MCP
	 */
	static async getAllServerInfo(): Promise<MCPServerInfo[]> {
		const services = [
			'github',
			'vercel',
			'clarity',
			'figma',
			'talk-to-figma',
			'storybook',
			'supabase',
			'n8n-mcp',
			'google-sheets',
		];
		const infos: MCPServerInfo[] = [];

		for (const service of services) {
			const info = await this.detectMCPServer(service);
			infos.push(info);
		}

		return infos;
	}
}
