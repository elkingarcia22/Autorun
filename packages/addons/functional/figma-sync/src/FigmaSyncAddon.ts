/**
 * FigmaSyncAddon
 * 
 * Add-on funcional de Figma Sync que implementa IFunctionalAddon.
 * Proporciona sincronización de tokens y componentes desde Figma.
 */

import { IFunctionalAddon, AutoframeContext } from '@autoframe/core';
import { FigmaSyncService, FigmaSyncConfig, SyncResult, TokenComparison } from './FigmaSyncService';

export class FigmaSyncAddon implements IFunctionalAddon {
  readonly id = 'figma-sync';
  readonly name = 'Figma Sync';
  readonly version = '1.0.0';
  readonly type = 'functional';
  readonly description = 'Sincronización de tokens y componentes desde Figma';
  
  private service?: FigmaSyncService;
  private active = false;
  private config: FigmaSyncConfig = {
    figmaTokensPath: '../tokens',
    projectTokensPath: 'packages/tokens/tokens.json',
    autoSync: false,
    backupBeforeSync: true,
    syncMode: 'selective',
    tokenMapping: {}
  };
  private context?: AutoframeContext;

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.['figma-sync'] || {};
    this.config = {
      figmaTokensPath: addonConfig.figmaTokensPath || '../tokens',
      projectTokensPath: addonConfig.projectTokensPath || 'packages/tokens/tokens.json',
      autoSync: addonConfig.autoSync || false,
      backupBeforeSync: addonConfig.backupBeforeSync !== false,
      syncMode: addonConfig.syncMode || 'selective',
      tokenMapping: addonConfig.tokenMapping || {}
    };

    // Inicializar servicio
    this.service = new FigmaSyncService(this.config, process.cwd());
    
    try {
      await this.service.initialize();
      console.log('✅ Figma Sync Add-on: Inicializado correctamente');
    } catch (error) {
      console.error(`❌ Figma Sync Add-on: Error al inicializar - ${error}`);
      // No lanzar error, permitir que el add-on funcione sin inicialización completa
    }
  }

  async activate(): Promise<void> {
    if (!this.service) {
      this.service = new FigmaSyncService(this.config, process.cwd());
      await this.service.initialize();
    }

    this.active = true;
    console.log('✅ Figma Sync Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    console.log('🔌 Figma Sync Add-on: Desactivado');
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
    const figmaSyncConfig: Partial<FigmaSyncConfig> = {};
    
    if (config.figmaTokensPath) figmaSyncConfig.figmaTokensPath = config.figmaTokensPath;
    if (config.projectTokensPath) figmaSyncConfig.projectTokensPath = config.projectTokensPath;
    if (config.autoSync !== undefined) figmaSyncConfig.autoSync = config.autoSync;
    if (config.backupBeforeSync !== undefined) figmaSyncConfig.backupBeforeSync = config.backupBeforeSync;
    if (config.syncMode) figmaSyncConfig.syncMode = config.syncMode;
    if (config.tokenMapping) figmaSyncConfig.tokenMapping = config.tokenMapping;

    this.config = { ...this.config, ...figmaSyncConfig };

    if (this.service) {
      this.service.updateConfig(figmaSyncConfig);
    } else {
      this.service = new FigmaSyncService(this.config, process.cwd());
      await this.service.initialize();
    }
  }

  /**
   * Hook llamado cuando un archivo cambia
   */
  async onFileChange(filePath: string): Promise<void> {
    if (!this.active || !this.service || !this.config.autoSync) {
      return;
    }

    // Si cambia un archivo de tokens de Figma, sincronizar automáticamente
    if (filePath.includes('tokens') && (filePath.includes('figma') || filePath.includes('Figma'))) {
      try {
        console.log('🔄 Figma Sync: Detectado cambio en tokens de Figma, sincronizando...');
        await this.service.sync({ mode: 'selective' });
      } catch (error) {
        console.error('❌ Figma Sync: Error en auto-sync:', error);
      }
    }
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Comparar tokens
      compare: async () => {
        if (!this.service) {
          throw new Error('Figma Sync service no está inicializado');
        }
        return await this.service.compare();
      },
      
      // Sincronizar tokens
      sync: async (options?: {
        mode?: 'full' | 'selective' | 'manual';
        updateDifferent?: boolean;
        addMissing?: boolean;
        removeExtra?: boolean;
      }) => {
        if (!this.service) {
          throw new Error('Figma Sync service no está inicializado');
        }
        const result = await this.service.sync(options);
        
        // Trackear sincronización en Clarity si está disponible
        if (this.context) {
          const clarityService = this.context.hub?.getService?.('clarity', 'trackEvent');
          if (clarityService) {
            clarityService('figma_sync', {
              tokensUpdated: result.tokensUpdated,
              tokensAdded: result.tokensAdded,
              tokensRemoved: result.tokensRemoved,
              timestamp: new Date().toISOString()
            });
          }
        }
        
        return result;
      },
      
      // Obtener estado
      getStatus: () => {
        if (!this.service) {
          return {
            initialized: false,
            figmaTokensExists: false,
            projectTokensExists: false
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
      updateConfig: (config: Partial<FigmaSyncConfig>) => {
        if (!this.service) {
          throw new Error('Figma Sync service no está inicializado');
        }
        return this.service.updateConfig(config);
      }
    };
  }
}

