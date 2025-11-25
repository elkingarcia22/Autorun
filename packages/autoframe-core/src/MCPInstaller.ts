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
    credentials?: Record<string, any>
  ): Promise<{ success: boolean; message: string; configPath?: string }> {
    try {
      // Verificar si ya está configurado
      const existingInfo = await MCPDetector.detectMCPServer(serviceName);
      if (existingInfo.configured) {
        return {
          success: true,
          message: `MCP para ${serviceName} ya está configurado`,
          configPath: existingInfo.configPath
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
        configPath
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Error al instalar MCP para ${serviceName}: ${error.message}`
      };
    }
  }

  /**
   * Asegura que existe el directorio de configuración de MCP
   */
  private static async ensureMCPConfigPath(): Promise<string> {
    // Intentar usar ruta de configuración estándar
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
   * Carga o crea configuración de MCP
   */
  private static async loadOrCreateConfig(configPath: string): Promise<MCPConfig> {
    const configFile = path.join(configPath, 'config.json');
    
    try {
      const content = await fs.readFile(configFile, 'utf-8');
      return JSON.parse(content);
    } catch {
      // Crear configuración nueva
      return {
        servers: {},
        mcpServers: {}
      };
    }
  }

  /**
   * Guarda configuración de MCP
   */
  private static async saveConfig(configPath: string, config: MCPConfig): Promise<void> {
    const configFile = path.join(configPath, 'config.json');
    await fs.writeFile(configFile, JSON.stringify(config, null, 2), 'utf-8');
  }

  /**
   * Obtiene configuración específica para cada servidor MCP
   */
  private static getServerConfig(
    serviceName: string,
    credentials?: Record<string, any>
  ): any {
    const service = serviceName.toLowerCase();

    switch (service) {
      case 'github':
        return {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-github'],
          env: credentials?.token ? {
            GITHUB_PERSONAL_ACCESS_TOKEN: credentials.token
          } : {}
        };

      case 'vercel':
        return {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-vercel'],
          env: credentials?.token ? {
            VERCEL_TOKEN: credentials.token,
            VERCEL_TEAM_ID: credentials.teamId || ''
          } : {}
        };

      case 'clarity':
        return {
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-clarity'],
          env: credentials?.projectId ? {
            CLARITY_PROJECT_ID: credentials.projectId,
            CLARITY_API_KEY: credentials.apiKey || ''
          } : {}
        };

      default:
        return {
          command: 'npx',
          args: ['-y', `@modelcontextprotocol/server-${service}`],
          env: credentials || {}
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
      `
    };

    return instructions[service] || `Instrucciones para ${serviceName} no disponibles.`;
  }
}

