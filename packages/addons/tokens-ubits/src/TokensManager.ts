/**
 * TokensManager
 * 
 * Gestor centralizado de tokens que soporta:
 * 1. Tokens estáticos (compatibilidad hacia atrás)
 * 2. Tokens como add-ons (nuevo sistema)
 * 
 * Mantiene compatibilidad total con el sistema actual.
 */

import { UBITSTokensAddon } from './TokensAddon';
import type { TokensAddon, AppContext } from './types/TokensAddon';

export interface TokensManagerOptions {
  /**
   * Ruta a tokens estáticos (fallback)
   */
  staticTokensPath?: string;
  
  /**
   * Ruta al manifest del add-on de tokens (opcional)
   */
  tokensAddonManifestPath?: string;
  
  /**
   * Si debe cargar tokens estáticos automáticamente
   */
  autoLoadStatic?: boolean;
  
  /**
   * Si debe validar tokens después de cargar
   */
  validateAfterLoad?: boolean;
}

export class TokensManager {
  private staticTokensPath: string;
  private tokensAddonManifestPath?: string;
  private autoLoadStatic: boolean;
  private validateAfterLoad: boolean;
  
  private tokensAddon: TokensAddon | null = null;
  private staticTokensLoaded: boolean = false;
  private isInitialized: boolean = false;

  constructor(options: TokensManagerOptions = {}) {
    this.staticTokensPath = options.staticTokensPath || '../../tokens/dist/tokens.css';
    this.tokensAddonManifestPath = options.tokensAddonManifestPath;
    this.autoLoadStatic = options.autoLoadStatic !== false; // Por defecto true
    this.validateAfterLoad = options.validateAfterLoad !== false; // Por defecto true
  }

  /**
   * Inicializa el gestor de tokens
   * Intenta cargar desde add-on, si falla usa tokens estáticos
   */
  async initialize(context: AppContext = {}): Promise<void> {
    if (this.isInitialized) {
      console.warn('TokensManager ya está inicializado');
      return;
    }

    try {
      // PASO 1: Verificar si hay tokens estáticos ya cargados
      if (this.hasStaticTokensLoaded()) {
        console.log('✅ TokensManager: Tokens estáticos ya cargados (modo compatibilidad)');
        this.staticTokensLoaded = true;
        this.isInitialized = true;
        
        if (this.validateAfterLoad) {
          await this.validateTokens();
        }
        return;
      }

      // PASO 2: Intentar cargar desde add-on si está configurado
      if (this.tokensAddonManifestPath) {
        try {
          await this.loadTokensAddon(context);
          this.isInitialized = true;
          
          if (this.validateAfterLoad) {
            await this.validateTokens();
          }
          return;
        } catch (addonError) {
          console.warn('⚠️ TokensManager: Error cargando add-on, usando fallback:', addonError);
        }
      }

      // PASO 3: Cargar tokens estáticos como fallback
      if (this.autoLoadStatic) {
        await this.loadStaticTokens();
        this.staticTokensLoaded = true;
        this.isInitialized = true;
        
        if (this.validateAfterLoad) {
          await this.validateTokens();
        }
      } else {
        throw new Error('No se pudo cargar tokens y autoLoadStatic está deshabilitado');
      }
    } catch (error) {
      console.error('❌ TokensManager: Error crítico inicializando:', error);
      // No lanzar error, dejar que el sistema intente funcionar
      this.isInitialized = false;
    }
  }

  /**
   * Carga tokens desde add-on
   */
  private async loadTokensAddon(context: AppContext): Promise<void> {
    if (!this.tokensAddonManifestPath) {
      throw new Error('tokensAddonManifestPath no configurado');
    }

    // Por ahora, crear instancia directa del add-on UBITS
    // En el futuro, esto podría cargar desde manifest
    this.tokensAddon = new UBITSTokensAddon();
    await this.tokensAddon.initialize(context);
    
    console.log('✅ TokensManager: Tokens cargados desde add-on');
  }

  /**
   * Carga tokens estáticos
   */
  private async loadStaticTokens(): Promise<void> {
    if (typeof document === 'undefined') {
      throw new Error('Document no disponible');
    }

    // Verificar si ya están cargados
    if (this.hasStaticTokensLoaded()) {
      this.staticTokensLoaded = true;
      return;
    }

    // Cargar tokens estáticos
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = this.staticTokensPath;
    link.id = 'ubits-tokens-static';

    return new Promise<void>((resolve, reject) => {
      link.onload = () => {
        this.staticTokensLoaded = true;
        console.log('✅ TokensManager: Tokens estáticos cargados');
        resolve();
      };

      link.onerror = () => {
        reject(new Error(`Error cargando tokens estáticos desde ${this.staticTokensPath}`));
      };

      document.head.appendChild(link);

      // Timeout de seguridad
      setTimeout(() => {
        if (!link.sheet) {
          reject(new Error('Timeout cargando tokens estáticos'));
        }
      }, 5000);
    });
  }

  /**
   * Verifica si hay tokens estáticos cargados
   */
  private hasStaticTokensLoaded(): boolean {
    if (typeof document === 'undefined') {
      return false;
    }

    // Buscar link a tokens.css
    const tokensLink = document.querySelector('link[href*="tokens.css"]') as HTMLLinkElement;
    if (tokensLink) {
      return true;
    }

    // Buscar style con tokens
    const styles = document.querySelectorAll('style');
    for (const style of styles) {
      if (style.textContent && style.textContent.includes('--ubits-')) {
        return true;
      }
    }

    return false;
  }

  /**
   * Valida que los tokens estén disponibles
   */
  async validateTokens(): Promise<boolean> {
    if (this.tokensAddon) {
      return this.tokensAddon.validate();
    }

    // Si no hay add-on, crear uno temporal para validar
    const tempAddon = new UBITSTokensAddon();
    await tempAddon.initialize({});
    const isValid = tempAddon.validate();
    tempAddon.destroy();
    
    return isValid;
  }

  /**
   * Obtiene información sobre los tokens cargados
   */
  getTokensInfo(): {
    source: 'static' | 'addon' | 'unknown';
    isValid: boolean;
    tokensAddon?: TokensAddon;
  } {
    return {
      source: this.tokensAddon ? 'addon' : (this.staticTokensLoaded ? 'static' : 'unknown'),
      isValid: this.tokensAddon ? this.tokensAddon.validate() : false,
      tokensAddon: this.tokensAddon || undefined
    };
  }

  /**
   * Cambia a un add-on de tokens diferente
   */
  async switchTokensAddon(addonPath: string, context: AppContext = {}): Promise<void> {
    // Destruir add-on actual si existe
    if (this.tokensAddon) {
      this.tokensAddon.destroy();
      this.tokensAddon = null;
    }

    // Cargar nuevo add-on
    this.tokensAddonManifestPath = addonPath;
    await this.loadTokensAddon(context);
    
    console.log('✅ TokensManager: Cambiado a nuevo add-on de tokens');
  }

  /**
   * Limpia recursos
   */
  destroy(): void {
    if (this.tokensAddon) {
      this.tokensAddon.destroy();
      this.tokensAddon = null;
    }

    // No remover tokens estáticos porque pueden ser usados por otros componentes
    this.isInitialized = false;
  }
}

/**
 * Instancia global del TokensManager (opcional)
 */
let globalTokensManager: TokensManager | null = null;

/**
 * Obtiene o crea la instancia global del TokensManager
 */
export function getTokensManager(options?: TokensManagerOptions): TokensManager {
  if (!globalTokensManager) {
    globalTokensManager = new TokensManager(options);
  }
  return globalTokensManager;
}

/**
 * Inicializa el TokensManager global
 */
export async function initializeTokensManager(options?: TokensManagerOptions): Promise<void> {
  const manager = getTokensManager(options);
  await manager.initialize();
}

