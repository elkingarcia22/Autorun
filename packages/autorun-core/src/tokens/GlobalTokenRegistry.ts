import * as fs from 'fs/promises';
import * as path from 'path';

// ✅ NUEVO: Importar fetch para Node.js (compatible con Node 18+)
// Node.js 18+ tiene fetch nativo, pero para compatibilidad con versiones anteriores
// usamos node-fetch si está disponible, o fetch global
let fetchFn: typeof fetch;
if (typeof fetch !== 'undefined') {
  fetchFn = fetch;
} else {
  // Fallback para Node.js < 18
  try {
    const nodeFetch = await import('node-fetch');
    fetchFn = nodeFetch.default as any;
  } catch {
    throw new Error(
      'fetch no está disponible. Necesitas Node.js 18+ o instalar node-fetch'
    );
  }
}

/**
 * ✅ GlobalTokenRegistry - Registro global de tokens de diseño
 *
 * Carga tokens desde:
 * - vendor/ubits/packages/tokens/dist/tokens.css (ubits)
 * - vendor/ubits/packages/tokens/dist/figma-tokens.css (modifiers)
 * - vendor/ubits/packages/tokens/tokens.json (fallback)
 *
 * Proporciona validación y sugerencias de tokens para Mode B.
 */
export class GlobalTokenRegistry {
  private tokens: Set<string> = new Set();
  private initialized = false;

  /**
   * Inicializa el registro cargando tokens desde Storybook Vercel (PRIMERO) o archivos locales (FALLBACK)
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // ✅ PRIORIDAD 1: Intentar cargar desde Storybook Vercel
    try {
      // Importar UBITS_PRESET dinámicamente para evitar dependencias circulares
      const { UBITS_PRESET } = await import('../wizard/UBITSPreset.js');
      const storybookUrl = UBITS_PRESET.storybook.url;
      const bypassToken = UBITS_PRESET.storybook.bypassToken;

      // Construir URLs con bypass token
      const tokensCssUrl = `${storybookUrl}/tokens/dist/tokens.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${bypassToken}`;
      const figmaTokensCssUrl = `${storybookUrl}/tokens/dist/figma-tokens.css?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${bypassToken}`;

      console.log(
        `🔄 [GlobalTokenRegistry] Intentando cargar tokens desde Storybook Vercel...`
      );

      // Cargar tokens.css desde Storybook
      try {
        const response = await fetch(tokensCssUrl);
        if (response.ok) {
          const css = await response.text();
          this.parseTokensFromCSS(css);
          console.log(
            `✅ [GlobalTokenRegistry] Cargados ${this.tokens.size} tokens desde Storybook (tokens.css)`
          );
        }
      } catch (error) {
        console.warn(
          `⚠️ [GlobalTokenRegistry] No se pudo cargar tokens.css desde Storybook: ${error}`
        );
      }

      // Cargar figma-tokens.css desde Storybook
      try {
        const response = await fetch(figmaTokensCssUrl);
        if (response.ok) {
          const figmaCss = await response.text();
          this.parseTokensFromCSS(figmaCss);
          console.log(
            `✅ [GlobalTokenRegistry] Total ${this.tokens.size} tokens (incluye modifiers desde Storybook)`
          );
        }
      } catch (error) {
        console.warn(
          `⚠️ [GlobalTokenRegistry] No se pudo cargar figma-tokens.css desde Storybook: ${error}`
        );
      }

      // Si se cargaron tokens desde Storybook, marcar como inicializado y retornar
      if (this.tokens.size > 0) {
        this.initialized = true;
        console.log(
          `✅ [GlobalTokenRegistry] Tokens cargados desde Storybook exitosamente`
        );
        return;
      }
    } catch (error) {
      console.warn(
        `⚠️ [GlobalTokenRegistry] Error al cargar desde Storybook, usando fallback local: ${error}`
      );
    }

    // ✅ PRIORIDAD 2 (FALLBACK): Intentar cargar desde archivos locales
    console.log(
      `🔄 [GlobalTokenRegistry] Usando fallback: cargando tokens desde archivos locales...`
    );

    // ✅ 1. Intentar cargar desde tokens.css local
    const tokensCssPath = path.join(
      process.cwd(),
      'vendor/ubits/packages/tokens/dist/tokens.css'
    );

    try {
      const css = await fs.readFile(tokensCssPath, 'utf-8');
      this.parseTokensFromCSS(css);
      console.log(
        `✅ [GlobalTokenRegistry] Cargados ${this.tokens.size} tokens desde tokens.css local`
      );
    } catch (error) {
      console.warn(
        `⚠️ [GlobalTokenRegistry] No se pudo cargar tokens.css local: ${error}`
      );
    }

    // ✅ 2. Intentar cargar desde figma-tokens.css local
    const figmaTokensCssPath = path.join(
      process.cwd(),
      'vendor/ubits/packages/tokens/dist/figma-tokens.css'
    );

    try {
      const figmaCss = await fs.readFile(figmaTokensCssPath, 'utf-8');
      this.parseTokensFromCSS(figmaCss);
      console.log(
        `✅ [GlobalTokenRegistry] Total ${this.tokens.size} tokens (incluye modifiers locales)`
      );
    } catch (error) {
      console.warn(
        `⚠️ [GlobalTokenRegistry] No se pudo cargar figma-tokens.css local: ${error}`
      );
    }

    // ✅ 3. Fallback a tokens.json (solo si CSS no existe)
    if (this.tokens.size === 0) {
      const tokensJsonPath = path.join(
        process.cwd(),
        'vendor/ubits/packages/tokens/tokens.json'
      );

      try {
        const json = await fs.readFile(tokensJsonPath, 'utf-8');
        const tokensData = JSON.parse(json);
        this.parseTokensFromJSON(tokensData);
        console.log(
          `✅ [GlobalTokenRegistry] Cargados ${this.tokens.size} tokens desde tokens.json`
        );
      } catch (error) {
        console.warn(
          `⚠️ [GlobalTokenRegistry] No se pudo cargar tokens.json: ${error}`
        );
      }
    }

    this.initialized = true;

    if (this.tokens.size === 0) {
      console.warn(
        `⚠️ [GlobalTokenRegistry] ADVERTENCIA: No se pudieron cargar tokens desde ninguna fuente`
      );
    } else {
      console.log(
        `✅ [GlobalTokenRegistry] Inicialización completada: ${this.tokens.size} tokens disponibles`
      );
    }
  }

  /**
   * ✅ Parsea tokens desde CSS (regex rápido y seguro)
   *
   * Regex: /(--(?:ubits|modifiers)[\w-]+)\s*:/g
   * Captura: --token-name: (sin el valor)
   */
  private parseTokensFromCSS(css: string): void {
    // ✅ Regex recomendado: captura --token-name: sin el valor
    const tokenRegex = /(--(?:ubits|modifiers)[\w-]+)\s*:/g;
    let match;

    while ((match = tokenRegex.exec(css)) !== null) {
      const tokenName = match[1].trim();
      this.tokens.add(tokenName);
    }
  }

  /**
   * ✅ CORRECTO (Fix A): Solo usar key cuando el value es leaf
   *
   * "ubits-accent-brand" → "--ubits-accent-brand"
   * NO "light-background-ubits-bg-1"
   */
  private parseTokensFromJSON(json: any): void {
    const walk = (obj: any): void => {
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object') {
          // Es objeto anidado, seguir recorriendo
          walk(value);
        } else {
          // Es leaf (valor final), verificar si key empieza con ubits- o modifiers-
          if (key.startsWith('ubits-') || key.startsWith('modifiers-')) {
            this.tokens.add(`--${key}`);
          }
        }
      }
    };
    walk(json);
  }

  /**
   * Verifica si un token existe
   */
  has(tokenName: string): boolean {
    return this.tokens.has(tokenName);
  }

  /**
   * ✅ Assert que un token existe (lanza error con sugerencia)
   */
  assertExists(tokenName: string): void {
    if (!this.has(tokenName)) {
      // ✅ Sugerencia fuzzy: buscar tokens similares
      const suggestions = this.findSimilarTokens(tokenName);
      const suggestionText =
        suggestions.length > 0
          ? ` ¿Quizás quisiste: ${suggestions.slice(0, 3).join(', ')}?`
          : '';

      throw new Error(
        `Token no encontrado: ${tokenName}.${suggestionText} ` +
          `Tokens disponibles: ${this.tokens.size} total.`
      );
    }
  }

  /**
   * ✅ PÚBLICO (Fix B): Sugiere tokens similares
   */
  public suggest(tokenName: string): string[] {
    return this.findSimilarTokens(tokenName);
  }

  /**
   * ✅ PRIVADO: Implementación interna
   */
  private findSimilarTokens(tokenName: string): string[] {
    const tokenLower = tokenName.toLowerCase();
    const similar: Array<{ token: string; score: number }> = [];

    for (const token of this.tokens) {
      const tokenLower2 = token.toLowerCase();

      // Calcular similitud simple (contar caracteres comunes)
      let score = 0;
      const minLen = Math.min(tokenLower.length, tokenLower2.length);

      for (let i = 0; i < minLen; i++) {
        if (tokenLower[i] === tokenLower2[i]) {
          score++;
        }
      }

      // Bonus si contiene palabras clave comunes
      if (tokenLower2.includes('bg') && tokenLower.includes('bg')) score += 5;
      if (tokenLower2.includes('fg') && tokenLower.includes('fg')) score += 5;
      if (tokenLower2.includes('spacing') && tokenLower.includes('spacing'))
        score += 5;

      if (score > tokenLower.length * 0.5) {
        similar.push({ token, score });
      }
    }

    return similar.sort((a, b) => b.score - a.score).map((item) => item.token);
  }

  /**
   * Obtiene todos los tokens
   */
  getAll(): string[] {
    return Array.from(this.tokens).sort();
  }

  /**
   * Obtiene tokens por prefijo
   */
  getByPrefix(prefix: string): string[] {
    return Array.from(this.tokens)
      .filter((token) => token.startsWith(prefix))
      .sort();
  }

  /**
   * ✅ MEJORA: Obtiene valores de tokens desde CSS
   *
   * Retorna un mapa de token -> valor para mapeo de colores
   */
  async getTokenValues(): Promise<Map<string, string>> {
    const tokenValues = new Map<string, string>();

    // Cargar desde tokens.css
    const tokensCssPath = path.join(
      process.cwd(),
      'vendor/ubits/packages/tokens/dist/tokens.css'
    );

    try {
      const css = await fs.readFile(tokensCssPath, 'utf-8');
      this.parseTokenValuesFromCSS(css, tokenValues);
    } catch (error) {
      console.warn(
        `⚠️ No se pudo cargar valores de tokens desde tokens.css: ${error}`
      );
    }

    // Cargar desde figma-tokens.css
    const figmaTokensCssPath = path.join(
      process.cwd(),
      'vendor/ubits/packages/tokens/dist/figma-tokens.css'
    );

    try {
      const figmaCss = await fs.readFile(figmaTokensCssPath, 'utf-8');
      this.parseTokenValuesFromCSS(figmaCss, tokenValues);
    } catch (error) {
      console.warn(
        `⚠️ No se pudo cargar valores de tokens desde figma-tokens.css: ${error}`
      );
    }

    return tokenValues;
  }

  /**
   * ✅ Parsea valores de tokens desde CSS
   */
  private parseTokenValuesFromCSS(
    css: string,
    tokenValues: Map<string, string>
  ): void {
    // Regex para capturar token: valor
    const tokenValueRegex = /(--(?:ubits|modifiers)[\w-]+)\s*:\s*([^;]+);/g;
    let match;

    while ((match = tokenValueRegex.exec(css)) !== null) {
      const tokenName = match[1].trim();
      const tokenValue = match[2].trim();
      tokenValues.set(tokenName, tokenValue);
    }
  }
}

// ✅ Singleton global
let globalRegistry: GlobalTokenRegistry | null = null;

/**
 * ✅ Obtiene el registro global de tokens (singleton)
 */
export async function getGlobalTokenRegistry(): Promise<GlobalTokenRegistry> {
  if (!globalRegistry) {
    globalRegistry = new GlobalTokenRegistry();
    await globalRegistry.initialize();
  }
  return globalRegistry;
}
