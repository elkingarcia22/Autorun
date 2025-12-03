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
		if (await this.isRunningInCursor()) {
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
	private static async isRunningInCursor(): Promise<boolean> {
		try {
			// Verificar variables de entorno de Cursor (más confiable)
			if (process.env.CURSOR_VERSION || process.env.CURSOR_AGENT) {
				return true;
			}

			// Verificar si existe el directorio .cursor en el proyecto actual
			// Esto es un indicador fuerte de que estamos en Cursor
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
		} catch {
			return false;
		}
	}

	/**
	 * Carga o crea configuración de MCP
	 */
	private static async loadOrCreateConfig(configPath: string): Promise<MCPConfig> {
		// Determinar nombre del archivo según el entorno
		const isCursor = await this.isRunningInCursor();
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
		const isCursor = await this.isRunningInCursor();
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
				// Vercel MCP es un servidor remoto HTTP, no un paquete npm
				return {
					url: 'https://mcp.vercel.com',
				};

			case 'clarity':
				return {
					command: 'npx',
					args: ['-y', '@microsoft/clarity-mcp-server'],
					env: credentials?.projectId
						? {
								CLARITY_PROJECT_ID: credentials.projectId,
								CLARITY_API_KEY: credentials.apiKey || '',
							}
						: {},
				};

			case 'figma':
				// Figma tiene un servidor MCP remoto oficial: https://mcp.figma.com/mcp
				// También puede ser local desde Figma Desktop (http://127.0.0.1:3845/mcp)
				// Preferir servidor remoto oficial sobre paquetes npm comunitarios
				return {
					url: 'https://mcp.figma.com/mcp',
				};

			case 'talk-to-figma':
				// Usar paquete comunitario
				// cursor-talk-to-figma-mcp puede usar FIGMA_ACCESS_TOKEN o FIGMA_API_KEY
				return {
					command: 'npx',
					args: ['-y', 'cursor-talk-to-figma-mcp'],
					env: credentials?.accessToken
						? {
								FIGMA_ACCESS_TOKEN: credentials.accessToken,
								...(credentials.fileKey ? { FIGMA_FILE_KEY: credentials.fileKey } : {}),
							}
						: {},
				};

			case 'storybook':
				// Storybook tiene un addon oficial @storybook/addon-mcp que expone MCP en http://localhost:6006/mcp
				// Si el addon está instalado y Storybook está corriendo, usar el servidor MCP integrado
				// Si no, usar el paquete standalone storybook-mcp con la URL del index.json
				const storybookUrl = credentials?.storybookUrl || 'http://localhost:6006/index.json';

				// Preferir el servidor MCP integrado del addon (más potente, más tools)
				// Si Storybook está corriendo con el addon, usar la URL del servidor MCP
				// Si no, usar el paquete standalone como fallback
				return {
					url: 'http://localhost:6006/mcp', // Servidor MCP integrado del addon @storybook/addon-mcp
				};

			case 'supabase':
				// Supabase ahora usa un servidor remoto oficial: https://mcp.supabase.com/mcp
				// Ya no requiere PAT manualmente - usa OAuth dinámico
				// La autenticación se hace automáticamente cuando Cursor se conecta
				return {
					url: 'https://mcp.supabase.com/mcp',
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

⚠️ Vercel MCP es un servidor remoto HTTP, no requiere instalación de paquete npm.

1. Configura en tu archivo MCP (usualmente ~/.cursor/mcp.json):
   {
     "mcpServers": {
       "vercel": {
         "url": "https://mcp.vercel.com"
       }
     }
   }

2. Reinicia tu editor/IDE (Cursor, VS Code, etc.).

3. Cuando se conecte, aparecerá un prompt "Needs login". Haz clic para autorizar
   el acceso a tu cuenta de Vercel mediante OAuth.

Nota: Vercel MCP usa autenticación OAuth, no requiere tokens manuales.
      `,
			clarity: `
Para instalar MCP de Clarity manualmente:

1. Instala el servidor MCP:
   npm install -g @microsoft/clarity-mcp-server

2. Configura en tu archivo MCP (usualmente ~/.cursor/mcp.json o ~/.config/mcp/config.json):
   {
     "mcpServers": {
       "clarity": {
         "command": "npx",
         "args": ["-y", "@microsoft/clarity-mcp-server"],
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

1. Instala el servidor MCP (paquete comunitario):
   npm install -g figma-developer-mcp

2. Configura en tu archivo MCP (usualmente ~/.cursor/mcp.json o ~/.config/mcp/config.json):
   {
     "mcpServers": {
       "figma": {
         "command": "npx",
         "args": ["-y", "figma-developer-mcp"],
         "env": {
           "FIGMA_API_KEY": "tu-api-key",
           "FIGMA_FILE_KEY": "tu-file-key-opcional"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.

⚠️ IMPORTANTE: 
- figma-developer-mcp requiere FIGMA_API_KEY o FIGMA_OAUTH_TOKEN (no FIGMA_ACCESS_TOKEN)
- Ni MCP ni la API de Figma pueden acceder directamente a las Variables de Figma.
- Se recomienda descargar el JSON de tokens usando el plugin de Figma Tokens.
      `,
			'talk-to-figma': `
Para instalar MCP de Talk to Figma manualmente:

1. Instala el servidor MCP (paquete comunitario):
   npm install -g cursor-talk-to-figma-mcp

2. Configura en tu archivo MCP (usualmente ~/.cursor/mcp.json o ~/.config/mcp/config.json):
   {
     "mcpServers": {
       "talk-to-figma": {
         "command": "npx",
         "args": ["-y", "cursor-talk-to-figma-mcp"],
         "env": {
           "FIGMA_ACCESS_TOKEN": "tu-access-token",
           "FIGMA_FILE_KEY": "tu-file-key-opcional"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.

⚠️ IMPORTANTE: 
- Requiere que Figma Desktop esté abierto con el plugin instalado
- Ni MCP ni la API de Figma pueden acceder directamente a las Variables de Figma.
- Se recomienda descargar el JSON de tokens usando el plugin de Figma Tokens.
      `,
			storybook: `
Para instalar MCP de Storybook manualmente:

1. Instala el servidor MCP:
   npm install -g storybook-mcp

2. Configura en tu archivo MCP (usualmente ~/.cursor/mcp.json o ~/.config/mcp/config.json):
   {
     "mcpServers": {
       "storybook": {
         "command": "npx",
         "args": ["-y", "storybook-mcp@latest"],
         "env": {
           "STORYBOOK_URL": "https://tu-storybook.com/index.json"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.

Nota: STORYBOOK_URL debe apuntar al archivo index.json de tu Storybook.
      `,
			supabase: `
Para instalar MCP de Supabase manualmente:

1. Instala el servidor MCP:
   npm install -g @supabase/mcp-server-supabase

2. Configura en tu archivo MCP (usualmente ~/.cursor/mcp.json o ~/.config/mcp/config.json):
   {
     "mcpServers": {
       "supabase": {
         "command": "npx",
         "args": ["-y", "@supabase/mcp-server-supabase"],
         "env": {
           "SUPABASE_ACCESS_TOKEN": "tu-access-token",
           "SUPABASE_PROJECT_REF": "tu-project-ref"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.

Nota: Necesitas un token de acceso personal de Supabase y la referencia de tu proyecto.
      `,
		};

		return instructions[service] || `Instrucciones para ${serviceName} no disponibles.`;
	}
}
