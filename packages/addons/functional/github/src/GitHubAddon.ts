/**
 * GitHubAddon
 * 
 * Add-on funcional de GitHub que implementa IFunctionalAddon.
 * Se conecta automáticamente al repositorio y orquesta el guardado.
 */

import { IFunctionalAddon, AutoframeContext } from '@autoframe/core';
import { GitHubService, GitHubConfig } from './GitHubService';
import { MCPDetector, MCPPrompt } from '@autoframe/core';

export class GitHubAddon implements IFunctionalAddon {
  readonly id = 'github';
  readonly name = 'GitHub Integration';
  readonly version = '1.0.0';
  readonly type = 'functional';
  readonly description = 'Gestión completa de repositorio GitHub: auto-commit, ramas, estados anteriores';
  
  private service?: GitHubService;
  private active = false;
  private config: GitHubConfig = {};
  private context?: AutoframeContext;
  private useMCP = false;

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.github || {};
    this.config = {
      repositoryUrl: addonConfig.repositoryUrl,
      branch: addonConfig.branch || 'main',
      autoCommit: addonConfig.autoCommit !== false,
      autoCommitDelay: addonConfig.autoCommitDelay || 5000,
      commitMessage: addonConfig.commitMessage || 'Auto-commit: {file}',
      pushOnCommit: addonConfig.pushOnCommit || false
    };

    // Si hay repositoryUrl, inicializar servicio
    if (this.config.repositoryUrl || this.shouldAutoConnect()) {
      await this.setupService();
      
      // Detectar y ofrecer MCP si está disponible
      await this.offerMCPIntegration();
    }
  }

  /**
   * Determina si debe conectarse automáticamente
   */
  private shouldAutoConnect(): boolean {
    // Si hay repositoryUrl en la configuración del proyecto, conectar automáticamente
    return !!this.context?.config.repositoryUrl;
  }

  /**
   * Ofrece integración MCP al usuario
   */
  private async offerMCPIntegration(): Promise<void> {
    try {
      const mcpInfo = await MCPDetector.detectMCPServer('github');
      
      // Si ya está configurado, usar MCP
      if (mcpInfo.configured) {
        console.log('✅ GitHub Add-on: MCP detectado y configurado. Usando MCP para mejor experiencia.');
        this.useMCP = true;
        return;
      }

      // Si MCP está disponible pero no configurado, ofrecer instalación
      if (mcpInfo.available && !mcpInfo.configured) {
        const shouldInstall = await MCPPrompt.promptForMCP({
          serviceName: 'github',
          serviceDisplayName: 'GitHub',
          credentials: {
            token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN
          }
        });

        if (shouldInstall) {
          const result = await MCPPrompt.installIfAccepted('github', {
            token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN
          });
          
          if (result.installed) {
            this.useMCP = true;
            console.log('✅ GitHub Add-on: MCP instalado y configurado exitosamente');
          }
        }
      }
    } catch (error) {
      // Si hay error, continuar con implementación tradicional
      console.log('ℹ️  GitHub Add-on: Continuando con implementación tradicional');
    }
  }

  /**
   * Configura el servicio de GitHub
   */
  private async setupService(): Promise<void> {
    // Obtener repositoryUrl de la configuración del proyecto si no está en addon config
    const repositoryUrl = this.config.repositoryUrl || this.context?.config.repositoryUrl;
    
    if (repositoryUrl) {
      this.config.repositoryUrl = repositoryUrl;
    }

    this.service = new GitHubService(this.config);
    
    try {
      await this.service.initialize();
      console.log('✅ GitHub Add-on: Conectado al repositorio');
    } catch (error) {
      console.warn(`⚠️  GitHub Add-on: ${error}`);
      // No lanzar error, permitir que el add-on funcione sin conexión inicial
    }
  }

  async activate(): Promise<void> {
    if (this.config.autoCommit === false) {
      return;
    }

    // Si no hay servicio y debería conectarse, configurarlo
    if (!this.service && this.shouldAutoConnect()) {
      await this.setupService();
    }

    this.active = true;
    console.log('✅ GitHub Add-on: Auto-commit activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    this.service?.stop();
    console.log('🔌 GitHub Add-on: Auto-commit desactivado');
  }

  async onFileChange(filePath: string): Promise<void> {
    if (!this.active || !this.service) {
      return;
    }

    await this.service.handleFileChange(filePath);
  }

  async onBeforeCommit(files: string[]): Promise<void> {
    console.log(`📝 GitHub Add-on: Preparando commit de ${files.length} archivos`);
  }

  async onAfterCommit(commitHash: string): Promise<void> {
    console.log(`✅ GitHub Add-on: Commit realizado: ${commitHash.substring(0, 7)}`);
  }

  isActive(): boolean {
    return this.active;
  }

  getStatus(): 'active' | 'inactive' {
    return this.active ? 'active' : 'inactive';
  }

  destroy(): void {
    this.service?.stop();
    this.active = false;
  }

  async configure(config: Record<string, any>): Promise<void> {
    this.config = { ...this.config, ...config };
    
    // Si se cambió repositoryUrl, reinicializar servicio
    if (config.repositoryUrl && config.repositoryUrl !== this.config.repositoryUrl) {
      this.service?.stop();
      await this.setupService();
    }
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Commit manual
      commit: async (files: string[], message: string) => {
        if (!this.service) {
          throw new Error('GitHub service no está inicializado');
        }
        return await this.service.commit(files, message);
      },
      
      // Push
      push: async (branch?: string) => {
        if (!this.service) {
          throw new Error('GitHub service no está inicializado');
        }
        return await this.service.push(branch);
      },
      
      // Cambiar rama
      switchBranch: async (branchName: string) => {
        if (!this.service) {
          throw new Error('GitHub service no está inicializado');
        }
        return await this.service.switchBranch(branchName);
      },
      
      // Crear rama
      createBranch: async (branchName: string) => {
        if (!this.service) {
          throw new Error('GitHub service no está inicializado');
        }
        return await this.service.createBranch(branchName);
      },
      
      // Listar ramas
      listBranches: () => {
        if (!this.service) {
          throw new Error('GitHub service no está inicializado');
        }
        return this.service.listBranches();
      },
      
      // Merge a main
      mergeToMain: async (branchName: string) => {
        if (!this.service) {
          throw new Error('GitHub service no está inicializado');
        }
        return await this.service.mergeToMain(branchName);
      },
      
      // Historial de commits
      getCommitHistory: (limit?: number) => {
        if (!this.service) {
          throw new Error('GitHub service no está inicializado');
        }
        return this.service.getCommitHistory(limit);
      },
      
      // Volver a commit anterior
      checkoutCommit: async (commitHash: string, createBranch?: boolean) => {
        if (!this.service) {
          throw new Error('GitHub service no está inicializado');
        }
        return await this.service.checkoutCommit(commitHash, createBranch);
      },
      
      // Estado del repositorio
      getStatus: () => {
        if (!this.service) {
          throw new Error('GitHub service no está inicializado');
        }
        return this.service.getStatus();
      },
      
      // Rama actual
      getCurrentBranch: () => {
        if (!this.service) {
          throw new Error('GitHub service no está inicializado');
        }
        return this.service.getCurrentBranch();
      }
    };
  }
}

