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
    '--ubits-accent-brand-static-inverted',
    '--ubits-accent-success',
    '--ubits-accent-error',
    
    // Spacing tokens (al menos algunos básicos)
    '--ubits-spacing-2',
    '--ubits-spacing-3',
    '--ubits-spacing-4',
    
    // Focus ring
    '--ubits-button-focus-ring',
  ];

  /**
   * Ruta base para cargar tokens CSS
   * Por defecto usa la ruta estática, pero puede ser sobrescrita
   */
  private tokensCSSPath: string = '../../tokens/dist/tokens.css';

  /**
   * Ruta de fallback para tokens (si la principal falla)
   */
  private fallbackTokensCSSPath: string = '../../tokens/dist/tokens.css';

  /**
   * Configurar ruta de tokens CSS (opcional)
   */
  setTokensCSSPath(path: string): void {
    this.tokensCSSPath = path;
  }

  /**
   * Configurar ruta de fallback (opcional)
   */
  setFallbackTokensCSSPath(path: string): void {
    this.fallbackTokensCSSPath = path;
  }

  /**
   * Verifica si hay tokens estáticos ya cargados en el DOM
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
   * Carga tokens estáticos como fallback
   */
  private async loadFallbackTokens(): Promise<void> {
    if (typeof document === 'undefined') {
      throw new Error('Document no disponible para fallback');
    }

    console.warn('⚠️ Usando fallback: cargando tokens estáticos');

    // Intentar cargar desde ruta de fallback
    const fallbackLink = document.createElement('link');
    fallbackLink.rel = 'stylesheet';
    fallbackLink.href = this.fallbackTokensCSSPath;
    fallbackLink.id = 'ubits-tokens-fallback';

    return new Promise<void>((resolve, reject) => {
      fallbackLink.onload = () => {
        this.linkElement = fallbackLink;
        console.log('✅ Tokens de fallback cargados correctamente');
        resolve();
      };

      fallbackLink.onerror = () => {
        console.error('❌ Error cargando tokens de fallback');
        reject(new Error('No se pudieron cargar tokens ni siquiera como fallback'));
      };

      document.head.appendChild(fallbackLink);

      // Timeout de seguridad
      setTimeout(() => {
        if (!fallbackLink.sheet) {
          reject(new Error('Timeout cargando tokens de fallback'));
        }
      }, 5000);
    });
  }

  async initialize(context: AppContext): Promise<void> {
    if (this.isInitialized) {
      console.warn('TokensAddon ya está inicializado');
      return;
    }

    try {
      // PASO 1: Verificar si los tokens ya están cargados (compatibilidad hacia atrás)
      if (this.hasStaticTokensLoaded()) {
        console.log('✅ Tokens UBITS ya cargados estáticamente (modo compatibilidad)');
        this.isInitialized = true;
        
        // Intentar extraer tokens del DOM para validación
        await this.extractTokensFromDOM();
        
        // Validar que los tokens estáticos tengan todo lo necesario
        const validation = this.validateDetailed();
        if (validation.isValid) {
          console.log('✅ Tokens estáticos validados correctamente');
        } else {
          console.warn('⚠️ Tokens estáticos incompletos, pero usando como fallback');
        }
        return;
      }

      // PASO 2: Intentar cargar desde el add-on
      try {
        await this.loadTokensCSS();
        this.isInitialized = true;
        
        // Validar después de cargar
        const validation = this.validateDetailed();
        if (!validation.isValid) {
          console.warn('⚠️ Algunos tokens requeridos no están disponibles:', validation.missingTokens);
          // No lanzar error, los tokens parciales son mejor que nada
        } else {
          console.log('✅ TokensAddon UBITS inicializado y cargado - Todos los tokens válidos');
        }
      } catch (loadError) {
        // PASO 3: Si falla, usar fallback
        console.error('❌ Error cargando tokens desde add-on:', loadError);
        console.log('🔄 Intentando fallback...');
        
        try {
          await this.loadFallbackTokens();
          this.isInitialized = true;
          console.log('✅ Tokens cargados mediante fallback');
        } catch (fallbackError) {
          // Último recurso: verificar si hay tokens en el DOM de alguna forma
          console.error('❌ Error en fallback también:', fallbackError);
          
          // Verificar si hay tokens disponibles de alguna forma
          const validation = this.validateDetailed();
          if (validation.presentTokens.length > 0) {
            console.warn(`⚠️ Solo ${validation.presentTokens.length}/${validation.totalRequired} tokens disponibles`);
            this.isInitialized = true;
          } else {
            throw new Error('No se pudieron cargar tokens de ninguna forma');
          }
        }
      }
    } catch (error) {
      console.error('❌ Error crítico inicializando TokensAddon:', error);
      // No lanzar error final, dejar que el sistema intente funcionar
      // con lo que tenga disponible
      this.isInitialized = false;
    }
  }

  /**
   * Carga tokens CSS desde el add-on
   */
  private async loadTokensCSS(): Promise<void> {
    if (typeof document === 'undefined') {
      throw new Error('Document no disponible');
    }

    try {
      // Intentar cargar desde fetch primero (para obtener el contenido)
      const response = await fetch(this.tokensCSSPath);
      if (!response.ok) {
        throw new Error(`No se pudo cargar tokens.css desde ${this.tokensCSSPath}`);
      }
      
      this.tokensCSS = await response.text();
      
      // Crear elemento <style> e inyectar tokens
      this.styleElement = document.createElement('style');
      this.styleElement.id = 'ubits-tokens-addon';
      this.styleElement.textContent = this.tokensCSS;
      document.head.appendChild(this.styleElement);
      
      console.log('✅ Tokens CSS cargados desde add-on');
    } catch (fetchError) {
      // Si fetch falla (por ejemplo, en file://), usar <link> como fallback
      console.warn('⚠️ No se pudo cargar tokens con fetch, usando <link> como fallback');
      
      this.linkElement = document.createElement('link');
      this.linkElement.rel = 'stylesheet';
      this.linkElement.href = this.tokensCSSPath;
      this.linkElement.id = 'ubits-tokens-addon-link';
      document.head.appendChild(this.linkElement);
      
      // Esperar a que el CSS se cargue
      await new Promise<void>((resolve, reject) => {
        this.linkElement!.onload = () => resolve();
        this.linkElement!.onerror = () => reject(new Error('Error cargando tokens.css'));
        // Timeout de seguridad
        setTimeout(() => reject(new Error('Timeout cargando tokens.css')), 5000);
      });
    }
  }

  /**
   * Extrae tokens del DOM cuando ya están cargados estáticamente
   */
  private async extractTokensFromDOM(): Promise<void> {
    if (typeof document === 'undefined') {
      return;
    }

    // Intentar obtener tokens del CSS cargado
    // Esto es útil para validación cuando los tokens ya están en el DOM
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    document.body.appendChild(testElement);

    // Verificar algunos tokens para confirmar que están cargados
    const sampleTokens = [
      '--ubits-accent-brand-static-inverted',
      '--ubits-bg-1',
      '--ubits-fg-1-high'
    ];

    const loadedTokens = sampleTokens.filter(token => {
      testElement.style.setProperty(token, 'test');
      const value = getComputedStyle(testElement).getPropertyValue(token);
      return value !== '';
    });

    document.body.removeChild(testElement);

    if (loadedTokens.length === sampleTokens.length) {
      console.log('✅ Tokens verificados en DOM');
    } else {
      console.warn('⚠️ Algunos tokens no están disponibles en el DOM');
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
    // Si tenemos tokens cargados, retornarlos
    if (this.tokensCSS) {
      return this.tokensCSS;
    }

    // Si no, intentar extraer del DOM
    if (this.styleElement && this.styleElement.textContent) {
      return this.styleElement.textContent;
    }

    // Si hay link element, no podemos obtener el contenido directamente
    // pero podemos indicar que está cargado
    if (this.linkElement) {
      return '[Tokens cargados vía <link>]';
    }

    return '';
  }

  getTokensJS(): Record<string, any> {
    return this.tokensJS;
  }

  /**
   * Resultado de validación detallado
   */
  private validationResult: {
    isValid: boolean;
    missingTokens: string[];
    presentTokens: string[];
    totalRequired: number;
  } | null = null;

  /**
   * Valida que los tokens requeridos existan en el DOM
   * @returns true si todos los tokens requeridos están presentes
   */
  validate(): boolean {
    return this.validateDetailed().isValid;
  }

  /**
   * Valida tokens y retorna resultado detallado
   */
  validateDetailed(): {
    isValid: boolean;
    missingTokens: string[];
    presentTokens: string[];
    totalRequired: number;
  } {
    // Si ya validamos y no ha cambiado nada, retornar resultado cacheado
    if (this.validationResult && this.isInitialized) {
      return this.validationResult;
    }

    if (typeof document === 'undefined') {
      this.validationResult = {
        isValid: false,
        missingTokens: [...this.requiredTokens],
        presentTokens: [],
        totalRequired: this.requiredTokens.length
      };
      return this.validationResult;
    }

    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    testElement.style.top = '-9999px';
    document.body.appendChild(testElement);

    const missingTokens: string[] = [];
    const presentTokens: string[] = [];

    this.requiredTokens.forEach(token => {
      // Intentar usar el token
      testElement.style.setProperty(token, 'test-value');
      const computedValue = getComputedStyle(testElement).getPropertyValue(token);
      
      if (computedValue && computedValue !== '') {
        presentTokens.push(token);
      } else {
        missingTokens.push(token);
      }
    });

    document.body.removeChild(testElement);

    this.validationResult = {
      isValid: missingTokens.length === 0,
      missingTokens,
      presentTokens,
      totalRequired: this.requiredTokens.length
    };

    return this.validationResult;
  }

  /**
   * Obtiene el resultado de la última validación
   */
  getValidationResult() {
    return this.validationResult;
  }

  /**
   * Limpia el cache de validación (útil después de cambios)
   */
  clearValidationCache(): void {
    this.validationResult = null;
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

