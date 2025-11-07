/**
 * TokensAddonIntegration
 * 
 * Integración del add-on de tokens con el sistema de add-ons existente
 * Expone API global y se integra con window.Autoframe
 */

import { AutoframeTokensAddon } from './TokensAddon';
import { TokensManager, getTokensManager, initializeTokensManager } from './TokensManager';
import type { TokensAddon } from './types/TokensAddon';

/**
 * Interfaz para el objeto global Autoframe.Tokens
 */
export interface AutoframeTokensAPI {
  /**
   * Inicializa el gestor de tokens
   */
  initialize(options?: {
    staticTokensPath?: string;
    tokensAddonManifestPath?: string;
    autoLoadStatic?: boolean;
    validateAfterLoad?: boolean;
  }): Promise<void>;

  /**
   * Obtiene el gestor de tokens
   */
  getManager(): TokensManager;

  /**
   * Carga un add-on de tokens específico
   */
  loadAddon(manifestPath: string): Promise<TokensAddon>;

  /**
   * Aplica tokens desde una fuente externa (Storybook, URL, JSON, etc.)
   */
  applyFromSource(source: {
    css?: string;
    cssUrl?: string;
    json?: Record<string, any>;
    jsonUrl?: string;
  }): Promise<void>;

  /**
   * Valida que los tokens estén disponibles
   */
  validate(): Promise<boolean>;

  /**
   * Obtiene información sobre los tokens
   */
  getInfo(): {
    source: 'static' | 'addon' | 'unknown';
    isValid: boolean;
  };
}

/**
 * Inicializa la integración con el sistema global
 */
export function initializeTokensIntegration(): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Crear objeto global Autoframe si no existe
  if (!(window as any).Autoframe) {
    (window as any).Autoframe = {};
  }

  // Crear API de tokens
  const tokensAPI: AutoframeTokensAPI = {
    async initialize(options = {}) {
      await initializeTokensManager(options);
    },

    getManager() {
      return getTokensManager();
    },

    async loadAddon(manifestPath: string): Promise<TokensAddon> {
      const manager = getTokensManager();
      await manager.switchTokensAddon(manifestPath);
      const info = manager.getTokensInfo();
      return info.tokensAddon!;
    },

    async applyFromSource(source: {
      css?: string;
      cssUrl?: string;
      json?: Record<string, any>;
      jsonUrl?: string;
    }): Promise<void> {
      const { applyTokensFromStorybook } = await import('./utils/createTokensAddon');
      await applyTokensFromStorybook(source, {
        validate: true,
        replaceExisting: true
      });
    },

    async validate(): Promise<boolean> {
      const manager = getTokensManager();
      return await manager.validateTokens();
    },

    getInfo() {
      const manager = getTokensManager();
      const info = manager.getTokensInfo();
      return {
        source: info.source,
        isValid: info.isValid
      };
    }
  };

  // Exponer API global
  (window as any).Autoframe.Tokens = tokensAPI;

  console.log('✅ Tokens integration initialized');
}

/**
 * Auto-inicializar si estamos en el navegador
 */
if (typeof window !== 'undefined') {
  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTokensIntegration);
  } else {
    initializeTokensIntegration();
  }
}

