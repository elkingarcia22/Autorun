/**
 * Utilidad para crear un add-on de tokens desde cualquier fuente
 * Permite convertir tokens de Storybook, JSON, o cualquier formato a un add-on
 */

import { UBITSTokensAddon } from '../TokensAddon';
import type { TokensAddon } from '../types/TokensAddon';

export interface TokensSource {
  /**
   * Tokens en formato CSS (string con variables CSS)
   */
  css?: string;
  
  /**
   * Tokens en formato JSON (objeto con estructura de tokens)
   */
  json?: Record<string, any>;
  
  /**
   * URL a archivo CSS de tokens
   */
  cssUrl?: string;
  
  /**
   * URL a archivo JSON de tokens
   */
  jsonUrl?: string;
}

/**
 * Crea un add-on de tokens desde una fuente externa
 */
export async function createTokensAddonFromSource(
  source: TokensSource,
  name: string = 'custom-tokens'
): Promise<TokensAddon> {
  let tokensCSS = '';

  // Obtener tokens CSS desde la fuente
  if (source.css) {
    tokensCSS = source.css;
  } else if (source.cssUrl) {
    const response = await fetch(source.cssUrl);
    tokensCSS = await response.text();
  } else if (source.json) {
    // Convertir JSON a CSS
    tokensCSS = convertTokensJSONToCSS(source.json);
  } else if (source.jsonUrl) {
    const response = await fetch(source.jsonUrl);
    const json = await response.json();
    tokensCSS = convertTokensJSONToCSS(json);
  } else {
    throw new Error('Debe proporcionar al menos una fuente de tokens (css, cssUrl, json, o jsonUrl)');
  }

  // Crear add-on personalizado
  return new CustomTokensAddon(name, tokensCSS);
}

/**
 * Convierte tokens JSON a CSS
 */
function convertTokensJSONToCSS(tokens: Record<string, any>): string {
  const lines: string[] = [':root {'];
  
  function flatten(obj: Record<string, any>, prefix = ''): void {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flatten(value, fullKey);
      } else {
        // Asegurar que tenga el prefijo --ubits-
        const cssVar = fullKey.startsWith('--ubits-') 
          ? fullKey 
          : `--ubits-${fullKey}`;
        lines.push(`  ${cssVar}: ${value};`);
      }
    }
  }

  // Procesar tokens light y dark si existen
  if (tokens.light) {
    flatten(tokens.light);
  } else {
    flatten(tokens);
  }

  lines.push('}');

  // Agregar dark mode si existe
  if (tokens.dark) {
    lines.push('');
    lines.push('[data-theme="dark"] {');
    function flattenDark(obj: Record<string, any>, prefix = ''): void {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}-${key}` : key;
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          flattenDark(value, fullKey);
        } else {
          const cssVar = fullKey.startsWith('--ubits-') 
            ? fullKey 
            : `--ubits-${fullKey}`;
          lines.push(`  ${cssVar}: ${value};`);
        }
      }
    }
    flattenDark(tokens.dark);
    lines.push('}');
  }

  return lines.join('\n');
}

/**
 * Add-on de tokens personalizado
 */
class CustomTokensAddon extends UBITSTokensAddon {
  private customTokensCSS: string;

  constructor(name: string, tokensCSS: string) {
    super();
    this.name = `@ubits/tokens-${name}`;
    this.customTokensCSS = tokensCSS;
  }

  async initialize(context: any): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Inyectar tokens CSS directamente
      if (typeof document !== 'undefined') {
        const styleElement = document.createElement('style');
        styleElement.id = `ubits-tokens-${this.name.replace(/[^a-z0-9]/gi, '-')}`;
        styleElement.textContent = this.customTokensCSS;
        document.head.appendChild(styleElement);
        
        (this as any).styleElement = styleElement;
        (this as any).tokensCSS = this.customTokensCSS;
      }

      this.isInitialized = true;
      
      // Validar
      const validation = this.validateDetailed();
      if (!validation.isValid) {
        console.warn('⚠️ Algunos tokens requeridos no están disponibles:', validation.missingTokens);
      } else {
        console.log(`✅ TokensAddon "${this.name}" inicializado y cargado`);
      }
    } catch (error) {
      console.error('❌ Error inicializando CustomTokensAddon:', error);
      throw error;
    }
  }

  getTokensCSS(): string {
    return this.customTokensCSS;
  }
}

/**
 * Función helper para aplicar tokens desde Storybook
 * 
 * Ejemplo de uso:
 * ```typescript
 * await applyTokensFromStorybook({
 *   cssUrl: 'https://storybook.example.com/tokens.css'
 * });
 * ```
 */
export async function applyTokensFromStorybook(
  source: TokensSource,
  options: {
    validate?: boolean;
    replaceExisting?: boolean;
  } = {}
): Promise<void> {
  const { validate = true, replaceExisting = true } = options;

  // Crear add-on desde la fuente
  const addon = await createTokensAddonFromSource(source, 'storybook');

  // Si hay tokens existentes y replaceExisting es true, removerlos
  if (replaceExisting && typeof document !== 'undefined') {
    const existingTokens = document.querySelectorAll('style[id^="ubits-tokens"], link[href*="tokens.css"]');
    existingTokens.forEach(el => {
      // No remover si es el link estático principal (por seguridad)
      if (el.tagName === 'LINK' && (el as HTMLLinkElement).id !== 'ubits-tokens-static') {
        el.remove();
      }
    });
  }

  // Inicializar el nuevo add-on
  await addon.initialize({});

  // Validar si está habilitado
  if (validate) {
    const isValid = addon.validate();
    if (!isValid) {
      const validation = (addon as any).validateDetailed();
      console.warn('⚠️ Tokens de Storybook incompletos:', validation.missingTokens);
    } else {
      console.log('✅ Tokens de Storybook aplicados y validados correctamente');
    }
  }

  // Exponer en API global si existe
  if (typeof window !== 'undefined' && (window as any).UBITS?.Tokens) {
    (window as any).UBITS.Tokens.currentAddon = addon;
  }
}

