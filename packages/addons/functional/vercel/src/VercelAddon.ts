/**
 * VercelAddon
 * 
 * Add-on funcional de Vercel que implementa IFunctionalAddon.
 * Proporciona deploy automático, gestión de proyectos y dominios.
 */

import { IFunctionalAddon, AutoframeContext } from '@autoframe/core';
import { VercelService, VercelConfig, VercelProject, VercelDeployment } from './VercelService';
import { MCPDetector, MCPPrompt } from '@autoframe/core';

export class VercelAddon implements IFunctionalAddon {
  readonly id = 'vercel';
  readonly name = 'Vercel Deployment';
  readonly version = '1.0.0';
  readonly type = 'functional';
  readonly description = 'Deploy automático, gestión de proyectos y dominios con Vercel';
  
  private service?: VercelService;
  private active = false;
  private config: VercelConfig = {
    token: ''
  };
  private context?: AutoframeContext;
  private useMCP = false;

  /**
   * Ofrece integración MCP al usuario
   */
  private async offerMCPIntegration(): Promise<void> {
    try {
      const mcpInfo = await MCPDetector.detectMCPServer('vercel');
      
      // Si ya está configurado, usar MCP
      if (mcpInfo.configured) {
        console.log('✅ Vercel Add-on: MCP detectado y configurado. Usando MCP para mejor experiencia.');
        this.useMCP = true;
        return;
      }

      // Si MCP está disponible pero no configurado, ofrecer instalación
      if (mcpInfo.available && !mcpInfo.configured) {
        const shouldInstall = await MCPPrompt.promptForMCP({
          serviceName: 'vercel',
          serviceDisplayName: 'Vercel',
          credentials: {
            token: this.config.token,
            teamId: this.config.teamId
          }
        });

        if (shouldInstall) {
          const result = await MCPPrompt.installIfAccepted('vercel', {
            token: this.config.token,
            teamId: this.config.teamId
          });
          
          if (result.installed) {
            this.useMCP = true;
            console.log('✅ Vercel Add-on: MCP instalado y configurado exitosamente');
          }
        }
      }
    } catch (error) {
      // Si hay error, continuar con implementación tradicional
      console.log('ℹ️  Vercel Add-on: Continuando con implementación tradicional');
    }
  }

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.vercel || {};
    this.config = {
      token: addonConfig.token || process.env.VERCEL_TOKEN || '',
      teamId: addonConfig.teamId || process.env.VERCEL_TEAM_ID,
      autoDeploy: addonConfig.autoDeploy !== false,
      projectName: addonConfig.projectName || context.config.name,
      framework: addonConfig.framework,
      buildCommand: addonConfig.buildCommand,
      outputDirectory: addonConfig.outputDirectory,
      installCommand: addonConfig.installCommand
    };

    // Validar que hay token
    if (!this.config.token) {
      console.warn('⚠️  Vercel Add-on: No se proporcionó token. Vercel no se inicializará.');
      console.warn('   Configura VERCEL_TOKEN en variables de entorno o en la configuración del proyecto.');
      return;
    }

    // Inicializar servicio
    this.service = new VercelService(this.config);
    
    try {
      await this.service.initialize();
      console.log('✅ Vercel Add-on: Inicializado correctamente');
      
      // Detectar y ofrecer MCP si está disponible
      await this.offerMCPIntegration();
    } catch (error) {
      console.error(`❌ Vercel Add-on: Error al inicializar - ${error}`);
      // No lanzar error, permitir que el add-on funcione sin inicialización completa
    }
  }

  async activate(): Promise<void> {
    if (!this.service) {
      // Intentar inicializar si no está inicializado
      if (this.config.token) {
        this.service = new VercelService(this.config);
        await this.service.initialize();
      } else {
        console.warn('⚠️  Vercel Add-on: No se puede activar sin token');
        return;
      }
    }

    this.active = true;
    console.log('✅ Vercel Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    console.log('🔌 Vercel Add-on: Desactivado');
  }

  isActive(): boolean {
    return this.active;
  }

  getStatus(): 'active' | 'inactive' {
    return this.active ? 'active' : 'inactive';
  }

  destroy(): void {
    this.active = false;
    this.service = undefined;
  }

  async configure(config: Record<string, any>): Promise<void> {
    const vercelConfig: Partial<VercelConfig> = {};
    
    if (config.token) vercelConfig.token = config.token;
    if (config.teamId !== undefined) vercelConfig.teamId = config.teamId;
    if (config.autoDeploy !== undefined) vercelConfig.autoDeploy = config.autoDeploy;
    if (config.projectName) vercelConfig.projectName = config.projectName;
    if (config.framework) vercelConfig.framework = config.framework;
    if (config.buildCommand) vercelConfig.buildCommand = config.buildCommand;
    if (config.outputDirectory) vercelConfig.outputDirectory = config.outputDirectory;
    if (config.installCommand) vercelConfig.installCommand = config.installCommand;

    this.config = { ...this.config, ...vercelConfig };

    if (this.service) {
      this.service.updateConfig(vercelConfig);
    } else if (this.config.token) {
      // Si no hay servicio pero ahora hay token, inicializar
      this.service = new VercelService(this.config);
      await this.service.initialize();
    }
  }

  /**
   * Hook llamado antes de hacer deploy
   */
  async onBeforeDeploy(): Promise<void> {
    if (!this.active || !this.service) {
      return;
    }

    console.log('📦 Vercel Add-on: Preparando deploy...');
  }

  /**
   * Hook llamado después de hacer deploy
   */
  async onAfterDeploy(url: string): Promise<void> {
    if (!this.active || !this.service) {
      return;
    }

    console.log(`✅ Vercel Add-on: Deploy completado - ${url}`);
    
    // Trackear deploy si Clarity está disponible
    if (this.context) {
      const clarityService = this.context.hub?.getService?.('clarity', 'trackEvent');
      if (clarityService) {
        clarityService('vercel_deploy', {
          url,
          timestamp: new Date().toISOString()
        });
      }
    }
  }

  /**
   * Hook llamado después de hacer commit
   */
  async onAfterCommit(commitHash: string): Promise<void> {
    if (!this.active || !this.service || !this.config.autoDeploy) {
      return;
    }

    // Auto-deploy después de commit si está habilitado
    try {
      console.log('🚀 Vercel Add-on: Auto-deploy después de commit...');
      const deployment = await this.service.deploy({ target: 'production' });
      await this.onAfterDeploy(deployment.url);
    } catch (error) {
      console.error('❌ Vercel Add-on: Error en auto-deploy:', error);
    }
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Deploy
      deploy: async (options?: {
        projectName?: string;
        files?: Record<string, string>;
        target?: 'production' | 'staging';
      }) => {
        if (!this.service) {
          throw new Error('Vercel service no está inicializado');
        }
        await this.onBeforeDeploy();
        const deployment = await this.service.deploy(options);
        await this.onAfterDeploy(deployment.url);
        return deployment;
      },
      
      // Listar proyectos
      listProjects: async () => {
        if (!this.service) {
          throw new Error('Vercel service no está inicializado');
        }
        return await this.service.listProjects();
      },
      
      // Obtener proyecto
      getProject: async (projectName: string) => {
        if (!this.service) {
          throw new Error('Vercel service no está inicializado');
        }
        return await this.service.getProject(projectName);
      },
      
      // Crear proyecto
      createProject: async (projectName: string, options?: {
        framework?: string;
        buildCommand?: string;
        outputDirectory?: string;
        installCommand?: string;
        gitRepository?: {
          type: 'github' | 'gitlab' | 'bitbucket';
          repo: string;
        };
      }) => {
        if (!this.service) {
          throw new Error('Vercel service no está inicializado');
        }
        return await this.service.createProject(projectName, options);
      },
      
      // Listar deployments
      listDeployments: async (projectId: string, limit?: number) => {
        if (!this.service) {
          throw new Error('Vercel service no está inicializado');
        }
        return await this.service.listDeployments(projectId, limit);
      },
      
      // Obtener deployment
      getDeployment: async (deploymentId: string) => {
        if (!this.service) {
          throw new Error('Vercel service no está inicializado');
        }
        return await this.service.getDeployment(deploymentId);
      },
      
      // Listar dominios
      listDomains: async (projectId: string) => {
        if (!this.service) {
          throw new Error('Vercel service no está inicializado');
        }
        return await this.service.listDomains(projectId);
      },
      
      // Agregar dominio
      addDomain: async (projectId: string, domain: string, gitBranch?: string) => {
        if (!this.service) {
          throw new Error('Vercel service no está inicializado');
        }
        return await this.service.addDomain(projectId, domain, gitBranch);
      },
      
      // Eliminar dominio
      removeDomain: async (projectId: string, domain: string) => {
        if (!this.service) {
          throw new Error('Vercel service no está inicializado');
        }
        return await this.service.removeDomain(projectId, domain);
      },
      
      // Obtener estado
      getStatus: () => {
        if (!this.service) {
          return {
            initialized: false,
            hasToken: false,
            hasProject: false
          };
        }
        return this.service.getStatus();
      },
      
      // Obtener configuración
      getConfig: () => {
        if (!this.service) {
          return this.config;
        }
        return this.service.getConfig();
      },
      
      // Actualizar configuración
      updateConfig: (config: Partial<VercelConfig>) => {
        if (!this.service) {
          throw new Error('Vercel service no está inicializado');
        }
        return this.service.updateConfig(config);
      }
    };
  }
}

