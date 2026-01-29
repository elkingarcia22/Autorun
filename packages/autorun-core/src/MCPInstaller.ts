/**
 * MCPInstaller
 *
 * Instala y configura servidores MCP automáticamente
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
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
      // ⚠️ CRÍTICO: Para 'autorun', SIEMPRE actualizar (no verificar si ya existe)
      // Esto permite actualizar del MCP viejo al MCP v2
      if (serviceName !== 'autorun') {
        // Verificar si ya está configurado (solo para otros servicios)
        const existingInfo = await MCPDetector.detectMCPServer(serviceName);
        if (existingInfo.configured) {
          return {
            success: true,
            message: `MCP para ${serviceName} ya está configurado`,
            configPath: existingInfo.configPath,
          };
        }
      }

      // ⚠️ Para Storybook MCP, instalar dependencias necesarias antes de configurar
      if (serviceName.toLowerCase() === 'storybook') {
        await this.installStorybookMCPDependencies();
      }

      // Obtener configuración de MCP
      const configPath = await this.ensureMCPConfigPath();
      const config = await this.loadOrCreateConfig(configPath);

      // Configurar servidor según el servicio
      const serverConfig = await this.getServerConfig(serviceName, credentials);

      // Agregar servidor a la configuración
      if (!config.servers) {
        config.servers = {};
      }
      if (!config.mcpServers) {
        config.mcpServers = {};
      }

      // ⚠️ CRÍTICO: Para 'autorun', SIEMPRE actualizar (sobrescribir configuración existente)
      // Esto permite actualizar del MCP viejo al MCP v2
      if (serviceName === 'autorun') {
        console.log(`   🔄 Actualizando configuración de autorun al MCP v2...`);
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
  private static async loadOrCreateConfig(
    configPath: string
  ): Promise<MCPConfig> {
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
  private static async saveConfig(
    configPath: string,
    config: MCPConfig
  ): Promise<void> {
    // Determinar nombre del archivo según el entorno
    const isCursor = await this.isRunningInCursor();
    const configFileName = isCursor ? 'mcp.json' : 'config.json';
    const configFile = path.join(configPath, configFileName);

    // Cursor usa "mcpServers", estándar puede usar ambos
    const configToSave = isCursor
      ? { mcpServers: config.mcpServers || config.servers || {} }
      : { servers: config.servers || {}, mcpServers: config.mcpServers || {} };

    await fs.writeFile(
      configFile,
      JSON.stringify(configToSave, null, 2),
      'utf-8'
    );
  }

  /**
   * Obtiene configuración específica para cada servidor MCP
   */
  private static async getServerConfig(
    serviceName: string,
    credentials?: Record<string, any>
  ): Promise<any> {
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
                ...(credentials.fileKey
                  ? { FIGMA_FILE_KEY: credentials.fileKey }
                  : {}),
              }
            : {},
        };

      case 'storybook':
        // Storybook MCP usa nuestro wrapper personalizado con mejor manejo de errores
        // Requiere STORYBOOK_URL apuntando al index.json del Storybook
        // El wrapper usa Playwright con timeouts aumentados y múltiples selectores
        // ⚠️ CRÍTICO: Usar URL de Vercel por defecto (más reciente y confiable)
        const storybookUrl =
          credentials?.storybookUrl ||
          'https://ubits-storybook10.vercel.app/index.json';
        const wrapperPath = path.join(
          process.cwd(),
          'scripts',
          'storybook-mcp-wrapper.mjs'
        );

        // Verificar que el wrapper existe
        try {
          await fs.access(wrapperPath);
        } catch {
          console.warn(
            `⚠️  Wrapper no encontrado en ${wrapperPath}, usando npx como fallback`
          );
          return {
            command: 'npx',
            args: ['-y', 'storybook-mcp@latest'],
            env: {
              STORYBOOK_URL: storybookUrl,
              ...(credentials?.customTools
                ? { CUSTOM_TOOLS: credentials.customTools }
                : {}),
            },
          };
        }

        return {
          command: 'node',
          args: [wrapperPath],
          env: {
            STORYBOOK_URL: storybookUrl,
            ...(credentials?.customTools
              ? { CUSTOM_TOOLS: credentials.customTools }
              : {}),
          },
        };

      case 'supabase':
        // Supabase ahora usa un servidor remoto oficial: https://mcp.supabase.com/mcp
        // Ya no requiere PAT manualmente - usa OAuth dinámico
        // La autenticación se hace automáticamente cuando Cursor se conecta
        return {
          url: 'https://mcp.supabase.com/mcp',
        };

      case 'n8n-mcp':
      case 'n8n':
        // n8n MCP usa npx n8n-mcp
        // Soporta modo stdio y HTTP
        // Requiere N8N_API_URL y N8N_API_KEY si se quiere gestión de workflows
        return {
          command: 'npx',
          args: ['n8n-mcp'],
          env: {
            MCP_MODE: credentials?.mode || 'stdio',
            LOG_LEVEL: credentials?.logLevel || 'error',
            DISABLE_CONSOLE_OUTPUT:
              credentials?.disableConsoleOutput !== false ? 'true' : 'false',
            ...(credentials?.n8nApiUrl
              ? { N8N_API_URL: credentials.n8nApiUrl }
              : {}),
            ...(credentials?.n8nApiKey
              ? { N8N_API_KEY: credentials.n8nApiKey }
              : {}),
          },
        };

      case 'google-sheets':
      case 'mcp-gsheets':
        // Google Sheets MCP - Soporta dos métodos:
        // 1. OAuth 2.0 (recomendado, similar a Figma/Vercel) - usa wrapper OAuth
        // 2. Service Account (tradicional) - usa mcp-gsheets
        const hasOAuthCredentials =
          credentials?.googleClientId &&
          credentials.googleClientId.trim() !== '';

        if (hasOAuthCredentials) {
          // Método OAuth 2.0 - Usar wrapper OAuth (similar a Figma/Vercel)
          const oauthEnv: Record<string, string> = {};

          if (
            credentials.googleClientId &&
            credentials.googleClientId.trim() !== ''
          ) {
            oauthEnv.GOOGLE_CLIENT_ID = credentials.googleClientId.trim();
          }

          if (
            credentials.googleClientSecret &&
            credentials.googleClientSecret.trim() !== ''
          ) {
            oauthEnv.GOOGLE_CLIENT_SECRET =
              credentials.googleClientSecret.trim();
          }

          if (
            credentials.googleRedirectUri &&
            credentials.googleRedirectUri.trim() !== ''
          ) {
            oauthEnv.GOOGLE_REDIRECT_URI = credentials.googleRedirectUri.trim();
          } else {
            oauthEnv.GOOGLE_REDIRECT_URI =
              'http://localhost:3000/oauth2callback';
          }

          if (
            credentials.googleOAuthTokens &&
            credentials.googleOAuthTokens.trim() !== ''
          ) {
            oauthEnv.GOOGLE_OAUTH_TOKENS = credentials.googleOAuthTokens.trim();
          }

          // Usar wrapper OAuth
          const wrapperPath = path.resolve(
            process.cwd(),
            'scripts',
            'google-sheets-mcp-oauth-wrapper.mjs'
          );

          return {
            command: 'node',
            args: [wrapperPath],
            env: oauthEnv,
          };
        }

        // Método Service Account - Usar mcp-gsheets tradicional
        // Soporta múltiples métodos de autenticación
        // Requiere GOOGLE_PROJECT_ID y credenciales (Service Account)
        // ⚠️ FIX: Solo agregar variables de entorno si tienen valores válidos (no vacíos)
        const env: Record<string, string> = {};

        if (
          credentials?.googleProjectId &&
          credentials.googleProjectId.trim() !== ''
        ) {
          env.GOOGLE_PROJECT_ID = credentials.googleProjectId.trim();
        }

        // Método 1: Archivo de credenciales
        if (
          credentials?.googleApplicationCredentials &&
          credentials.googleApplicationCredentials.trim() !== ''
        ) {
          env.GOOGLE_APPLICATION_CREDENTIALS =
            credentials.googleApplicationCredentials.trim();
        }

        // Método 2: JSON string completo
        if (
          credentials?.googleServiceAccountKey &&
          credentials.googleServiceAccountKey.trim() !== ''
        ) {
          env.GOOGLE_SERVICE_ACCOUNT_KEY =
            credentials.googleServiceAccountKey.trim();
        }

        // Método 3: Private Key + Email (más simple)
        if (
          credentials?.googlePrivateKey &&
          credentials.googlePrivateKey.trim() !== '' &&
          credentials?.googleClientEmail &&
          credentials.googleClientEmail.trim() !== ''
        ) {
          env.GOOGLE_PRIVATE_KEY = credentials.googlePrivateKey.trim();
          env.GOOGLE_CLIENT_EMAIL = credentials.googleClientEmail.trim();
        }

        // ⚠️ ADVERTENCIA: Si no hay credenciales, el MCP fallará pero no bloqueamos la instalación
        // El usuario puede configurar las credenciales después
        if (Object.keys(env).length === 0) {
          console.warn(
            '⚠️  Google Sheets MCP se instalará sin credenciales. Configúralas después en ~/.cursor/mcp.json'
          );
        }

        return {
          command: 'npx',
          args: ['-y', 'mcp-gsheets@latest'],
          env,
        };

      case 'autorun':
        // ✅ Autorun MCP Server v2 - Servidor propio de Autorun (NUEVO)
        // ⚠️ CRÍTICO: Usar path absoluto para garantizar que funcione desde Cursor
        const autorunCorePath = path.resolve(
          process.cwd(),
          'packages',
          'autorun-core'
        );
        
        // ✅ NUEVO: Usar MCP v2 (autorun-mcp-server-v2.ts)
        const autorunServerSourcePath = path.join(
          autorunCorePath,
          'src',
          'cli',
          'autorun-mcp-server-v2.ts'
        );

        // ⚠️ CRÍTICO: Usar path absoluto para que funcione desde cualquier directorio
        const absoluteSourcePath = path.resolve(autorunServerSourcePath);

        // ⚠️ CRÍTICO: Usar node_modules/.bin/tsx directamente con path absoluto
        // Esto evita problemas con npx y PATH
        const nodeModulesTsx = path.resolve(
          process.cwd(),
          'node_modules',
          '.bin',
          'tsx'
        );

        // Verificar si tsx está en node_modules
        let useNodeModulesTsx = false;
        try {
          await fs.access(nodeModulesTsx);
          useNodeModulesTsx = true;
        } catch {
          // tsx no está en node_modules, usar npx como fallback
          useNodeModulesTsx = false;
        }

        if (useNodeModulesTsx) {
          // Usar tsx de node_modules directamente (más confiable)
          return {
            command: nodeModulesTsx,
            args: [absoluteSourcePath],
            env: {
              NODE_ENV: 'production',
            },
          };
        } else {
          // Fallback: usar npx con path absoluto
          return {
            command: 'npx',
            args: ['-y', 'tsx', absoluteSourcePath],
            env: {
              NODE_ENV: 'production',
            },
          };
        }

      default:
        return {
          command: 'npx',
          args: ['-y', `@modelcontextprotocol/server-${service}`],
          env: credentials || {},
        };
    }
  }

  /**
   * Instala las dependencias necesarias para Storybook MCP
   * Requiere: playwright, @modelcontextprotocol/sdk, zod
   */
  private static async installStorybookMCPDependencies(): Promise<void> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    const dependencies = ['playwright', '@modelcontextprotocol/sdk', 'zod'];

    console.log('   📦 Instalando dependencias para Storybook MCP...');

    for (const dep of dependencies) {
      try {
        // Verificar si ya está instalado
        const { stdout } = await execAsync(`npm list ${dep} --depth=0`, {
          cwd: process.cwd(),
        });
        if (stdout.includes(dep)) {
          console.log(`   ✅ ${dep} ya está instalado`);
          continue;
        }
      } catch {
        // No está instalado, continuar
      }

      try {
        console.log(`   📥 Instalando ${dep}...`);
        await execAsync(`npm install ${dep}`, { cwd: process.cwd() });
        console.log(`   ✅ ${dep} instalado`);
      } catch (error: any) {
        console.warn(`   ⚠️  Error instalando ${dep}: ${error.message}`);
        // Continuar con las demás dependencias
      }
    }

    // Instalar browsers de Playwright
    try {
      console.log('   📥 Instalando browsers de Playwright...');
      await execAsync('npx playwright install chromium', {
        cwd: process.cwd(),
      });
      console.log('   ✅ Browsers de Playwright instalados');
    } catch (error: any) {
      console.warn(
        `   ⚠️  Error instalando browsers de Playwright: ${error.message}`
      );
      // Continuar aunque falle
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
      'n8n-mcp': `
Para instalar MCP de n8n manualmente:

1. El servidor MCP se ejecuta con npx (no requiere instalación global):
   npx n8n-mcp

2. Configura en tu archivo MCP (usualmente ~/.cursor/mcp.json o ~/.config/mcp/config.json):
   {
     "mcpServers": {
       "n8n-mcp": {
         "command": "npx",
         "args": ["n8n-mcp"],
         "env": {
           "MCP_MODE": "stdio",
           "LOG_LEVEL": "error",
           "DISABLE_CONSOLE_OUTPUT": "true",
           "N8N_API_URL": "https://your-n8n-instance.com",
           "N8N_API_KEY": "your-api-key"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.

Nota: 
- N8N_API_URL y N8N_API_KEY son opcionales si solo quieres usar las herramientas de documentación
- Si los proporcionas, tendrás acceso completo a gestión de workflows y ejecuciones
- El MCP proporciona acceso a 525+ nodos de n8n con 99% de cobertura de propiedades
- Más información: https://www.n8n-mcp.com/
      `,
      n8n: `
Para instalar MCP de n8n manualmente:

1. El servidor MCP se ejecuta con npx (no requiere instalación global):
   npx n8n-mcp

2. Configura en tu archivo MCP (usualmente ~/.cursor/mcp.json o ~/.config/mcp/config.json):
   {
     "mcpServers": {
       "n8n-mcp": {
         "command": "npx",
         "args": ["n8n-mcp"],
         "env": {
           "MCP_MODE": "stdio",
           "LOG_LEVEL": "error",
           "DISABLE_CONSOLE_OUTPUT": "true",
           "N8N_API_URL": "https://your-n8n-instance.com",
           "N8N_API_KEY": "your-api-key"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.

Nota: 
- N8N_API_URL y N8N_API_KEY son opcionales si solo quieres usar las herramientas de documentación
- Si los proporcionas, tendrás acceso completo a gestión de workflows y ejecuciones
- El MCP proporciona acceso a 525+ nodos de n8n con 99% de cobertura de propiedades
- Más información: https://www.n8n-mcp.com/
      `,
      'google-sheets': `
Para instalar MCP de Google Sheets manualmente:

1. El servidor MCP se ejecuta con npx (no requiere instalación global):
   npx -y mcp-gsheets@latest

2. Configura en tu archivo MCP (usualmente ~/.cursor/mcp.json o ~/.config/mcp/config.json):
   {
     "mcpServers": {
       "google-sheets": {
         "command": "npx",
         "args": ["-y", "mcp-gsheets@latest"],
         "env": {
           "GOOGLE_PROJECT_ID": "your-project-id",
           "GOOGLE_APPLICATION_CREDENTIALS": "/absolute/path/to/service-account-key.json"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.

Nota: 
- Requiere Google Cloud Project con Google Sheets API habilitada
- Necesitas crear un Service Account y descargar el JSON key
- Comparte tus hojas de cálculo con el email del Service Account
- La API es completamente gratuita: 300 requests/min por proyecto, 60 por usuario
- Más información: https://github.com/freema/mcp-gsheets
      `,
      'mcp-gsheets': `
Para instalar MCP de Google Sheets manualmente:

1. El servidor MCP se ejecuta con npx (no requiere instalación global):
   npx -y mcp-gsheets@latest

2. Configura en tu archivo MCP (usualmente ~/.cursor/mcp.json o ~/.config/mcp/config.json):
   {
     "mcpServers": {
       "google-sheets": {
         "command": "npx",
         "args": ["-y", "mcp-gsheets@latest"],
         "env": {
           "GOOGLE_PROJECT_ID": "your-project-id",
           "GOOGLE_APPLICATION_CREDENTIALS": "/absolute/path/to/service-account-key.json"
         }
       }
     }
   }

3. Reinicia tu editor/IDE.

Nota: 
- Requiere Google Cloud Project con Google Sheets API habilitada
- Necesitas crear un Service Account y descargar el JSON key
- Comparte tus hojas de cálculo con el email del Service Account
- La API es completamente gratuita: 300 requests/min por proyecto, 60 por usuario
- Más información: https://github.com/freema/mcp-gsheets
      `,
    };

    return (
      instructions[service] ||
      `Instrucciones para ${serviceName} no disponibles.`
    );
  }
}
