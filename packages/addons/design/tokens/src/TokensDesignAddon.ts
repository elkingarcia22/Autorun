/**
 * TokensDesignAddon
 * 
 * Add-on de diseño que implementa IDesignAddon para el Hub de Autoframe.
 * Proporciona tokens de diseño genéricos de Autoframe.
 */

import { IDesignAddon } from '../../../../autoframe-core/dist/interfaces/IDesignAddon';
import type { AutoframeContext } from '../../../../autoframe-core/dist/interfaces/IAddon';
import { AutoframeTokensAddon } from './TokensAddon';
import type { AppContext } from './types/TokensAddon';

export class TokensDesignAddon implements IDesignAddon {
  readonly id = 'tokens';
  readonly name = 'Tokens Autoframe';
  readonly version = '1.0.0';
  readonly type = 'design';
  readonly description = 'Tokens de diseño genéricos de Autoframe';
  
  private tokensAddon?: AutoframeTokensAddon;
  private active = false;
  private config: Record<string, any> = {};
  private context?: AutoframeContext;

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.tokens || {};
    this.config = {
      enabled: addonConfig.enabled !== false,
      tokensCSSPath: addonConfig.tokensCSSPath,
      fallbackTokensCSSPath: addonConfig.fallbackTokensCSSPath
    };

    // Inicializar servicio
    if (this.config.enabled) {
      await this.setupTokensAddon();
    }
  }

  private async setupTokensAddon(): Promise<void> {
    this.tokensAddon = new AutoframeTokensAddon();
    
    // Configurar rutas si están especificadas
    if (this.config.tokensCSSPath) {
      this.tokensAddon.setTokensCSSPath(this.config.tokensCSSPath);
    }
    if (this.config.fallbackTokensCSSPath) {
      this.tokensAddon.setFallbackTokensCSSPath(this.config.fallbackTokensCSSPath);
    }
    
    try {
      // Crear contexto de aplicación compatible
      const appContext: AppContext = {
        config: this.context?.config || {}
      };
      
      await this.tokensAddon.initialize(appContext);
      console.log('✅ Tokens Autoframe Add-on: Inicializado');
    } catch (error) {
      console.warn(`⚠️  Tokens Autoframe Add-on: ${error}`);
    }
  }

  async activate(): Promise<void> {
    if (!this.tokensAddon && this.config.enabled) {
      await this.setupTokensAddon();
    }

    this.active = true;
    console.log('✅ Tokens Autoframe Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    this.tokensAddon?.destroy();
    console.log('🔌 Tokens Autoframe Add-on: Desactivado');
  }

  isActive(): boolean {
    return this.active;
  }

  getStatus(): 'active' | 'inactive' {
    return this.active ? 'active' : 'inactive';
  }

  destroy(): void {
    this.tokensAddon?.destroy();
    this.active = false;
  }

  async configure(config: Record<string, any>): Promise<void> {
    this.config = { ...this.config, ...config };
    
    if (config.enabled !== undefined && config.enabled !== this.config.enabled) {
      this.tokensAddon?.destroy();
      if (config.enabled) {
        await this.setupTokensAddon();
      }
    }
  }

  /**
   * Obtiene los tokens/recursos de diseño
   */
  getDesignTokens(): Record<string, any> {
    if (!this.tokensAddon) {
      return {};
    }

    return {
      tokens: {
        css: this.tokensAddon.getTokensCSS(),
        js: this.tokensAddon.getTokensJS(),
        list: this.tokensAddon.getTokenList(),
        isValid: this.tokensAddon.validate()
      }
    };
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Obtener tokens CSS
      getTokensCSS: () => {
        if (!this.tokensAddon) {
          throw new Error('Tokens service no está inicializado');
        }
        return this.tokensAddon.getTokensCSS();
      },
      
      // Obtener tokens JS
      getTokensJS: () => {
        if (!this.tokensAddon) {
          throw new Error('Tokens service no está inicializado');
        }
        return this.tokensAddon.getTokensJS();
      },
      
      // Validar tokens
      validate: () => {
        if (!this.tokensAddon) {
          throw new Error('Tokens service no está inicializado');
        }
        return this.tokensAddon.validate();
      },
      
      // Obtener lista de tokens
      getTokenList: () => {
        if (!this.tokensAddon) {
          throw new Error('Tokens service no está inicializado');
        }
        return this.tokensAddon.getTokenList();
      },
      
      // Verificar si token existe
      hasToken: (tokenName: string) => {
        if (!this.tokensAddon) {
          throw new Error('Tokens service no está inicializado');
        }
        return this.tokensAddon.hasToken(tokenName);
      },
      
      // Obtener estado
      getStatus: () => {
        if (!this.tokensAddon) {
          throw new Error('Tokens service no está inicializado');
        }
        return this.tokensAddon.validateDetailed();
      }
    };
  }
}

