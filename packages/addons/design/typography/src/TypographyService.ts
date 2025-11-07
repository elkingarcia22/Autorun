/**
 * TypographyService
 * 
 * Servicio que maneja la tipografía de Autoframe
 */

export interface TypographyConfig {
  enabled?: boolean;
  fontsPath?: string;
  tokensPath?: string;
}

export class TypographyService {
  private config: TypographyConfig;
  private initialized = false;
  private fontsLink?: HTMLLinkElement;
  private tokensLink?: HTMLLinkElement;

  constructor(config: TypographyConfig) {
    this.config = {
      enabled: true,
      fontsPath: './fonts.css',
      tokensPath: './tokens-typography.css',
      ...config
    };
  }

  /**
   * Inicializa el servicio
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (typeof document === 'undefined') {
      console.warn('⚠️ Typography: Solo funciona en el navegador');
      return;
    }

    // Cargar fonts.css
    if (this.config.fontsPath) {
      this.loadFonts();
    }

    // Cargar tokens-typography.css
    if (this.config.tokensPath) {
      this.loadTokens();
    }

    this.initialized = true;
    console.log('✅ Typography Service: Inicializado');
  }

  /**
   * Carga fonts.css
   */
  private loadFonts(): void {
    if (!this.config.fontsPath || typeof document === 'undefined') {
      return;
    }

    // Verificar si ya está cargado
    if (document.querySelector(`link[href*="fonts.css"]`)) {
      return;
    }

    this.fontsLink = document.createElement('link');
    this.fontsLink.rel = 'stylesheet';
    this.fontsLink.href = this.config.fontsPath;
    this.fontsLink.id = 'autoframe-typography-fonts';
    document.head.appendChild(this.fontsLink);
  }

  /**
   * Carga tokens-typography.css
   */
  private loadTokens(): void {
    if (!this.config.tokensPath || typeof document === 'undefined') {
      return;
    }

    // Verificar si ya está cargado
    if (document.querySelector(`link[href*="tokens-typography.css"]`)) {
      return;
    }

    this.tokensLink = document.createElement('link');
    this.tokensLink.rel = 'stylesheet';
    this.tokensLink.href = this.config.tokensPath;
    this.tokensLink.id = 'autoframe-typography-tokens';
    document.head.appendChild(this.tokensLink);
  }

  /**
   * Obtiene el estado del servicio
   */
  getStatus(): 'initialized' | 'not-initialized' {
    return this.initialized ? 'initialized' : 'not-initialized';
  }

  /**
   * Verifica si las fuentes están cargadas
   */
  areFontsLoaded(): boolean {
    if (typeof document === 'undefined') {
      return false;
    }

    return !!document.querySelector('#autoframe-typography-fonts') ||
           !!document.querySelector('link[href*="fonts.css"]');
  }

  /**
   * Verifica si los tokens están cargados
   */
  areTokensLoaded(): boolean {
    if (typeof document === 'undefined') {
      return false;
    }

    return !!document.querySelector('#autoframe-typography-tokens') ||
           !!document.querySelector('link[href*="tokens-typography.css"]');
  }

  /**
   * Detiene el servicio
   */
  stop(): void {
    if (this.fontsLink) {
      this.fontsLink.remove();
      this.fontsLink = undefined;
    }
    if (this.tokensLink) {
      this.tokensLink.remove();
      this.tokensLink = undefined;
    }
    this.initialized = false;
  }
}

