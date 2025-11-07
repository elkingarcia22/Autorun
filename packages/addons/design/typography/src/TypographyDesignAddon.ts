/**
 * TypographyDesignAddon
 * 
 * Add-on de diseño que implementa IDesignAddon para el Hub de Autoframe.
 * Proporciona tipografía genérica de Autoframe.
 */

import { IDesignAddon } from '../../../../autoframe-core/dist/interfaces/IDesignAddon';
import type { AutoframeContext } from '../../../../autoframe-core/dist/interfaces/IAddon';
import { TypographyService, TypographyConfig } from './TypographyService';

export class TypographyDesignAddon implements IDesignAddon {
  readonly id = 'typography';
  readonly name = 'Typography Autoframe';
  readonly version = '1.0.0';
  readonly type = 'design';
  readonly description = 'Tipografía genérica de Autoframe';
  
  private service?: TypographyService;
  private active = false;
  private config: TypographyConfig = {};
  private context?: AutoframeContext;

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.typography || {};
    this.config = {
      enabled: addonConfig.enabled !== false,
      fontsPath: addonConfig.fontsPath || './fonts.css',
      tokensPath: addonConfig.tokensPath || './tokens-typography.css'
    };

    // Inicializar servicio
    if (this.config.enabled) {
      await this.setupService();
    }
  }

  private async setupService(): Promise<void> {
    this.service = new TypographyService(this.config);
    
    try {
      await this.service.initialize();
      console.log('✅ Typography Autoframe Add-on: Inicializado');
    } catch (error) {
      console.warn(`⚠️  Typography Autoframe Add-on: ${error}`);
    }
  }

  async activate(): Promise<void> {
    if (!this.service && this.config.enabled) {
      await this.setupService();
    }

    this.active = true;
    console.log('✅ Typography Autoframe Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    this.service?.stop();
    console.log('🔌 Typography Autoframe Add-on: Desactivado');
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
    
    if (config.enabled !== undefined && config.enabled !== this.config.enabled) {
      this.service?.stop();
      if (config.enabled) {
        await this.setupService();
      }
    }
  }

  /**
   * Obtiene los tokens/recursos de diseño
   */
  getDesignTokens(): Record<string, any> {
    if (!this.service) {
      return {};
    }

    return {
      typography: {
        fonts: {
          loaded: this.service.areFontsLoaded(),
          path: this.config.fontsPath
        },
        tokens: {
          loaded: this.service.areTokensLoaded(),
          path: this.config.tokensPath
        },
        available: true
      }
    };
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Verificar si fuentes están cargadas
      areFontsLoaded: () => {
        if (!this.service) {
          throw new Error('Typography service no está inicializado');
        }
        return this.service.areFontsLoaded();
      },
      
      // Verificar si tokens están cargados
      areTokensLoaded: () => {
        if (!this.service) {
          throw new Error('Typography service no está inicializado');
        }
        return this.service.areTokensLoaded();
      },
      
      // Obtener estado
      getStatus: () => {
        if (!this.service) {
          throw new Error('Typography service no está inicializado');
        }
        return this.service.getStatus();
      }
    };
  }
}

