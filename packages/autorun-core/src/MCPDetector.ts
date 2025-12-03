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
		};

		const serverName = mcpServers[serviceName.toLowerCase()];
		if (!serverName) {
			return {
				name: serviceName,
				available: false,
				configured: false,
			};
		}

		// Verificar si MCP está disponible en el entorno
		const available = await this.checkMCPAvailable();

		// Verificar si el servidor específico está configurado
		const configured = await this.checkServerConfigured(serviceName);

		return {
			name: serverName,
			available,
			configured,
			configPath: configured ? this.getMCPConfigPath() : undefined,
		};
	}

	/**
	 * Verifica si MCP está disponible en el entorno
	 */
	private static async checkMCPAvailable(): Promise<boolean> {
		try {
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
		} catch {
			return false;
		}
	}

	/**
	 * Verifica si un servidor MCP específico está configurado
	 */
	private static async checkServerConfigured(serviceName: string): Promise<boolean> {
		try {
			const configPath = this.getMCPConfigPath();
			if (!configPath) {
				return false;
			}

			// Intentar leer configuración de MCP
			const fs = await import('fs/promises');
			const path = await import('path');

			const configFile = path.join(configPath, 'mcp.json');
			try {
				const configContent = await fs.readFile(configFile, 'utf-8');
				const config = JSON.parse(configContent);

				// Verificar si el servidor está en la configuración
				const servers = config.servers || config.mcpServers || {};
				return !!servers[serviceName.toLowerCase()];
			} catch {
				return false;
			}
		} catch {
			return false;
		}
	}

	/**
	 * Obtiene la ruta de configuración de MCP
	 */
	private static getMCPConfigPath(): string | undefined {
		// Rutas comunes de configuración de MCP
		const possiblePaths = [
			process.env.MCP_CONFIG_PATH,
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
		const services = ['github', 'vercel', 'clarity', 'figma', 'talk-to-figma'];
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
		const services = ['github', 'vercel', 'clarity', 'figma', 'talk-to-figma'];
		const infos: MCPServerInfo[] = [];

		for (const service of services) {
			const info = await this.detectMCPServer(service);
			infos.push(info);
		}

		return infos;
	}
}
