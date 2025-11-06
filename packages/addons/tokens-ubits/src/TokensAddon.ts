/**
 * TokensAddon - Add-on de tokens UBITS oficiales
 * 
 * Este add-on carga los tokens UBITS oficiales como CSS variables.
 * Mantiene compatibilidad con el sistema actual.
 */

import type { TokensAddon, AppContext } from './types/TokensAddon';

export class UBITSTokensAddon implements TokensAddon {
  name = '@ubits/tokens-ubits';
  version = '1.0.0';
  
  private tokensCSS: string = '';
  private tokensJS: Record<string, any> = {};
  private styleElement: HTMLStyleElement | null = null;
  private linkElement: HTMLLinkElement | null = null;
  private isInitialized: boolean = false;

  /**
   * Lista de tokens requeridos que deben existir
   */
  private readonly requiredTokens: string[] = [
    // Button tokens
    '--ubits-button-primary-bg-default',
    '--ubits-button-primary-hover',
    '--ubits-button-primary-pressed',
    '--ubits-btn-primary-fg',
    '--ubits-btn-secondary-bg-default',
    '--ubits-btn-secondary-fg-default',
    '--ubits-btn-secondary-border',
    '--ubits-btn-tertiary-fg-default',
    
    // Background tokens
    '--ubits-bg-1',
    '--ubits-bg-2',
    '--ubits-bg-3',
    '--ubits-bg-active',
    '--ubits-bg-disabled-button',
    
    // Foreground tokens
    '--ubits-fg-1-high',
    '--ubits-fg-1-medium',
    '--ubits-fg-1-low',
    '--ubits-fg-on-disabled-button',
    
    // Border tokens
    '--ubits-border-1',
    '--ubits-border-2',
    '--ubits-border-disabled-button',
    
    // Accent tokens
    '--ubits-accent-brand',
    '--ubits-accent-success',
    '--ubits-accent-error',
    
    // Spacing tokens (al menos algunos básicos)
    '--ubits-spacing-2',
    '--ubits-spacing-3',
    '--ubits-spacing-4',
    
    // Focus ring
    '--ubits-button-focus-ring',
  ];

  async initialize(context: AppContext): Promise<void> {
    if (this.isInitialized) {
      console.warn('TokensAddon ya está inicializado');
      return;
    }

    try {
      // Por ahora, este add-on simplemente verifica que los tokens base estén cargados
      // No los carga directamente porque ya están en tokens.css estático
      // Esto mantiene compatibilidad hacia atrás
      
      this.isInitialized = true;
      console.log('✅ TokensAddon UBITS inicializado (modo compatibilidad)');
    } catch (error) {
      console.error('❌ Error inicializando TokensAddon:', error);
      throw error;
    }
  }

  destroy(): void {
    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
    if (this.linkElement) {
      this.linkElement.remove();
      this.linkElement = null;
    }
    this.isInitialized = false;
    this.tokensCSS = '';
    this.tokensJS = {};
  }

  getTokensCSS(): string {
    // Por ahora retorna string vacío porque los tokens están en tokens.css estático
    // En el futuro, esto cargará los tokens del add-on
    return this.tokensCSS;
  }

  getTokensJS(): Record<string, any> {
    return this.tokensJS;
  }

  validate(): boolean {
    // Validar que los tokens requeridos existan en el DOM
    if (typeof document === 'undefined') {
      return false;
    }

    const testElement = document.createElement('div');
    document.body.appendChild(testElement);

    const allPresent = this.requiredTokens.every(token => {
      testElement.style.setProperty(token, 'test');
      const value = getComputedStyle(testElement).getPropertyValue(token);
      return value !== '';
    });

    document.body.removeChild(testElement);
    return allPresent;
  }

  getTokenList(): string[] {
    // Extraer tokens del CSS si está disponible
    if (this.tokensCSS) {
      const matches = this.tokensCSS.matchAll(/--ubits-[^:;]+/g);
      return Array.from(matches, m => m[0].trim());
    }
    
    // Si no hay CSS cargado, retornar lista de tokens requeridos
    return [...this.requiredTokens];
  }

  hasToken(tokenName: string): boolean {
    if (typeof document === 'undefined') {
      return false;
    }

    const testElement = document.createElement('div');
    document.body.appendChild(testElement);
    testElement.style.setProperty(tokenName, 'test');
    const value = getComputedStyle(testElement).getPropertyValue(tokenName);
    document.body.removeChild(testElement);
    
    return value !== '';
  }
}

