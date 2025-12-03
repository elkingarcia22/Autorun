/**
 * MCPInstaller
 *
 * Instala y configura servidores MCP automáticamente
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { MCPDetector, MCPServerInfo } from './MCPDetector';

export interface MCPInstallOptions {
	serviceName: string;
	configPath?: string;
	autoConfigure?: boolean;
}

export interface MCPConfig {
	servers?: Record<string, any>;
	mcpServers?: Record<string, any>;
}

export class MCPInstaller {
	/**
	 * Instala y configura un servidor MCP para un servicio específico
	 */
	static async installMCPServer(
		serviceName: string,
		credentials?: Record<string, any>,
	): Promise<{ success: boolean; message: string; configPath?: string }> {
		try {
			// Verificar si ya está configurado
			const existingInfo = await MCPDetector.detectMCPServer(serviceName);
			if (existingInfo.configured) {
				return {
					success: true,
					message: `MCP para ${serviceName} ya está configurado`,
					configPath: existingInfo.configPath,
				};
			}

			// Obtener configuración de MCP
			const configPath = await this.ensureMCPConfigPath();
			const config = await this.loadOrCreateConfig(configPath);

			// Configurar servidor según el servicio
			const serverConfig = this.getServerConfig(serviceName, credentials);

			// Agregar servidor a la configuración
			if (!config.servers) {
				config.servers = {};
			}
			if (!config.mcpServers) {
				config.mcpServers = {};
			}

			config.servers[serviceName] = serverConfig;
			config.mcpServers[serviceName] = serverConfig;

			// Guardar configuración
			await this.saveConfig(configPath, config);

			return {
				success: true,
				message: `MCP para ${serviceName} configurado exitosamente`,
				configPath,
			};
		} catch (error: any) {
			return {
				success: false,
				message: `Error al instalar MCP para ${serviceName}: ${error.message}`,
			};
		}
	}

	/**
	 * Asegura que existe el directorio de configuración de MCP
	 */
	private static async ensureMCPConfigPath(): Promise<string> {
		// Verificar si estamos en Cursor (prioridad)
		if (this.isRunningInCursor()) {
			// Cursor usa .cursor/mcp.json en el proyecto o ~/.cursor/mcp.json globalmente
			// Preferir proyecto local primero
			const projectCursorPath = path.join(process.cwd(), '.cursor');
			try {
				await fs.mkdir(projectCursorPath, { recursive: true });
				return projectCursorPath; // Retornar directorio, el archivo será mcp.json
			} catch {
				// Fallback a global
				const homeDir = process.env.HOME || process.env.USERPROFILE;
				if (homeDir) {
					const globalCursorPath = path.join(homeDir, '.cursor');
					await fs.mkdir(globalCursorPath, { recursive: true });
					return globalCursorPath;
				}
			}
		}

		// Rutas estándar de MCP
		const homeDir = process.env.HOME || process.env.USERPROFILE;
		const configPath = homeDir
			? path.join(homeDir, '.config', 'mcp')
			: path.join(process.cwd(), '.mcp');

		try {
			await fs.mkdir(configPath, { recursive: true });
			return configPath;
		} catch (error) {
			// Fallback a directorio local
			const localPath = path.join(process.cwd(), '.mcp');
			await fs.mkdir(localPath, { recursive: true });
			return localPath;
		}
	}

	/**
	 * Verifica si estamos ejecutando en Cursor
	 */
	private static isRunningInCursor(): boolean {
		try {
			// Verificar variables de entorno de Cursor (más confiable)
			if (process.env.CURSOR_VERSION || process.env.CURSOR_AGENT) {
				return true;
			}

			// Verificar si existe el directorio .cursor en el proyecto actual
			// Esto es un indicador fuerte de que estamos en Cursor
			const fsSync = require('fs');
			const projectCursorDir = path.join(process.cwd(), '.cursor');
			if (fsSync.existsSync(projectCursorDir)) {
				return true;
			}

			// Verificar si existe .cursor/mcp.json en el proyecto actual
			const projectCursorMCP = path.join(process.cwd(), '.cursor', 'mcp.json');
			if (fsSync.existsSync(projectCursorMCP)) {
				return true;
			}

			// Verificar si existe el directorio .cursor global (indicador secundario)
			const cursorDir = process.env.HOME ? path.join(process.env.HOME, '.cursor') : null;
			if (cursorDir && fsSync.existsSync(cursorDir)) {
				return true;
			}

			return false;
		} catch {
			return false;
		}
	}

	/**
	 * Carga o crea configuración de MCP
	 */
	private static async loadOrCreateConfig(configPath: string): Promise<MCPConfig> {
		// Determinar nombre del archivo según el entorno
		const isCursor = this.isRunningInCursor();
		const configFileName = isCursor ? 'mcp.json' : 'config.json';
		const configFile = path.join(configPath, configFileName);

		try {
			const content = await fs.readFile(configFile, 'utf-8');
			const parsed = JSON.parse(content);
			// Asegurar que tiene la estructura correcta
			return {
				servers: parsed.servers || parsed.mcpServers || {},
				mcpServers: parsed.mcpServers || parsed.servers || {},
			};
		} catch {
			// Crear configuración nueva
			return {
				servers: {},
				mcpServers: {},
			};
		}
	}

	/**
	 * Guarda configuración de MCP
	 */
	private static async saveConfig(configPath: string, config: MCPConfig): Promise<void> {
		// Determinar nombre del archivo según el entorno
		const isCursor = this.isRunningInCursor();
		const configFileName = isCursor ? 'mcp.json' : 'config.json';
		const configFile = path.join(configPath, configFileName);

		// Cursor usa "mcpServers", estándar puede usar ambos
		const configToSave = isCursor
			? { mcpServers: config.mcpServers || config.servers || {} }
			: { servers: config.servers || {}, mcpServers: config.mcpServers || {} };

		await fs.writeFile(configFile, JSON.stringify(configToSave, null, 2), 'utf-8');
	}

	/**
	 * Obtiene configuración específica para cada servidor MCP
	 */
	private static getServerConfig(serviceName: string, credentials?: Record<string, any>): any {
		const service = serviceName.toLowerCase();

		switch (service) {
			case 'github':
				return {
					command: 'npx',
					args: ['-y', '@modelcontextprotocol/server-github'],
					env: credentials?.token
						? {
								GITHUB_PERSONAL_ACCESS_TOKEN: credentials.token,
							}
						: {},
				};

			case 'vercel':
				return {
					command: 'npx',
					args: ['-y', '@modelcontextprotocol/server-vercel'],
					env: credentials?.token
						? {
								VERCEL_TOKEN: credentials.token,
								VERCEL_TEAM_ID: credentials.teamId || '',
							}
						: {},
				};

			case 'clarity':
				return {
					command: 'npx',
					args: ['-y', '@modelcontextprotocol/server-clarity'],
					env: credentials?.projectId
						? {
								CLARITY_PROJECT_ID: credentials.projectId,
								CLARITY_API_KEY: credentials.apiKey || '',
							}
						: {},
				};

			case 'figma':
				return {
					command: 'npx',
					args: ['-y', '@modelcontextprotocol/server-figma'],
					env: credentials?.accessToken
						? {
								FIGMA_ACCESS_TOKEN: credentials.accessToken,
								FIGMA_FILE_KEY: credentials.fileKey || '',
							}
						: {},
				};

			case 'talk-to-figma':
				return {
					command: 'npx',
					args: ['-y', '@modelcontextprotocol/server-talk-to-figma'],
					env: credentials?.accessToken
						? {
								FIGMA_ACCESS_TOKEN: credentials.accessToken,
								FIGMA_FILE_KEY: credentials.fileKey || '',
							}
						: {},
				};

			default:
				return {
					command: 'npx',
					args: ['-y', `@modelcontextprotocol/server-${service}`],
					env: credentials || {},
				};
		}
	}

	/**
	 * Genera instrucciones de instalación manual
	 */
	static getInstallInstructions(serviceName: string): string {
		const service = serviceName.toLowerCase();

		const instructions: Record<string, string> = {
			github: `
Para instalar MCP de GitHub manualmente:

1. Instala el servidor MCP:
   npm install -g @modelcontextprotocol/server-github

2. Configura en tu archivo MCP (usualmente ~/.config/mcp/config.json):
   {
     "servers": {
       "github": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-github"],
         "env": {
           "GITHUB_PERSONAL_ACCESS_TOKEN": "tu-token-aqui"
         }
       }
     }
   }

3. Reinicia tu editor/IDE para que cargue la configuración MCP.
      `,
			vercel: `
Para instalar MCP de Vercel manualmente:

1. Instala el servidor MCP:
   npm install -g @modelcontextprotocol/server-vercel

2. Configura en tu archivo MCP:
   {
     "servers": {
       "vercel": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-vercel"],
         "env": {
           "VERCEL_TOKEN": "tu-token-aqui",
           "VERCEL_TEAM_ID": "tu-team-id-opcional"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.
      `,
			clarity: `
Para instalar MCP de Clarity manualmente:

1. Instala el servidor MCP:
   npm install -g @modelcontextprotocol/server-clarity

2. Configura en tu archivo MCP:
   {
     "servers": {
       "clarity": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-clarity"],
         "env": {
           "CLARITY_PROJECT_ID": "tu-project-id",
           "CLARITY_API_KEY": "tu-api-key-opcional"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.
      `,
			figma: `
Para instalar MCP de Figma manualmente:

1. Instala el servidor MCP:
   npm install -g @modelcontextprotocol/server-figma

2. Configura en tu archivo MCP:
   {
     "servers": {
       "figma": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-figma"],
         "env": {
           "FIGMA_ACCESS_TOKEN": "tu-access-token",
           "FIGMA_FILE_KEY": "tu-file-key-opcional"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.

⚠️ IMPORTANTE: Ni MCP ni la API de Figma pueden acceder directamente a las Variables de Figma.
Se recomienda descargar el JSON de tokens usando el plugin de Figma Tokens.
      `,
			'talk-to-figma': `
Para instalar MCP de Talk to Figma manualmente:

1. Instala el servidor MCP:
   npm install -g @modelcontextprotocol/server-talk-to-figma

2. Configura en tu archivo MCP:
   {
     "servers": {
       "talk-to-figma": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-talk-to-figma"],
         "env": {
           "FIGMA_ACCESS_TOKEN": "tu-access-token",
           "FIGMA_FILE_KEY": "tu-file-key-opcional"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.

⚠️ IMPORTANTE: Ni MCP ni la API de Figma pueden acceder directamente a las Variables de Figma.
Se recomienda descargar el JSON de tokens usando el plugin de Figma Tokens.
      `,
		};

		return instructions[service] || `Instrucciones para ${serviceName} no disponibles.`;
	}
}
