/**
 * Storybook Code Parser
 *
 * Extrae código HTML/JSX desde la URL de Storybook
 * Parsea bloques de código y los formatea para uso en implementación
 */

import { getStorybookUrlWithFallback } from './storybookFallback';

export interface StorybookCodeBlock {
  code: string;
  language: string; // 'html', 'jsx', 'typescript', 'javascript', etc.
  description?: string;
  imports?: string[];
  storyId?: string;
  useCase?: string;
}

export interface ParsedStorybookCode {
  componentId: string;
  storyId?: string;
  codeBlocks: StorybookCodeBlock[];
  primaryCode?: string; // Código principal (el más relevante)
  allImports: string[];
}

/**
 * Extrae código desde una URL de Storybook
 *
 * @param storybookUrl - URL completa de Storybook (ej: "https://ubits-storybook10.vercel.app/?path=/story/data-data-table--default")
 * @returns Código extraído y parseado
 */
export async function parseCodeFromStorybookUrl(
  storybookUrl: string
): Promise<ParsedStorybookCode> {
  console.log(
    `🔍 [Storybook Code Parser] Extrayendo código desde: ${storybookUrl}`
  );

  // 0. Intentar extracción con Playwright (NUEVO MÉTODO ROBUSTO)
  try {
    // Extraer IDs desde la URL
    const { componentId, storyId } = extractIdsFromUrl(storybookUrl);

    if (componentId) {
      const { extractStoryWithPlaywright } =
        await import('./storybookPlaywrightExtractor.js');

      // Extraer la base URL (eliminar query params)
      // Ejemplo: https://ubits-storybook10.vercel.app/?path=... -> https://ubits-storybook10.vercel.app
      const urlObj = new URL(storybookUrl);
      const baseUrl = `${urlObj.protocol}//${urlObj.host}`;

      const playwrightResult = await extractStoryWithPlaywright({
        storybookUrl: baseUrl,
        componentId,
        storyName: storyId || 'default',
        includeHeadStyles: true,
      });

      if (playwrightResult.html && !playwrightResult.error) {
        console.log(
          `✅ [Storybook Code Parser] Código extraído vía Playwright (${playwrightResult.html.length} chars)`
        );

        // Construir un bloque de código "sintético" con el resultado
        const codeBlock: StorybookCodeBlock = {
          code: playwrightResult.html,
          language: 'html',
          description: 'Rendered directly from Storybook via Playwright',
        };

        // Recolectar links CSS como imports sintéticos si es necesario
        const imports = playwrightResult.headStyles?.links || [];

        return {
          componentId,
          storyId,
          codeBlocks: [codeBlock],
          primaryCode: playwrightResult.html,
          allImports: imports,
        };
      }
    }
  } catch (pwError: any) {
    console.warn(
      `⚠️ [Storybook Code Parser] Falló Playwright, intentando método fallback: ${pwError.message}`
    );
  }

  try {
    // 1. Obtener HTML de la página (Legacy Fetch)
    const html = await fetchStorybookPage(storybookUrl);

    // 2. Extraer bloques de código
    const codeBlocks = extractCodeBlocks(html);

    // 3. Extraer imports
    const allImports = extractImports(codeBlocks);

    // 4. Identificar código principal (el más relevante)
    const primaryCode = identifyPrimaryCode(codeBlocks);

    // 5. Extraer componentId y storyId de la URL
    const { componentId, storyId } = extractIdsFromUrl(storybookUrl);

    console.log(
      `✅ [Storybook Code Parser] ${codeBlocks.length} bloques de código extraídos`
    );

    return {
      componentId,
      storyId,
      codeBlocks,
      primaryCode,
      allImports,
    };
  } catch (error: any) {
    console.error(
      `❌ [Storybook Code Parser] Error extrayendo código:`,
      error.message
    );
    throw new Error(
      `No se pudo extraer código desde ${storybookUrl}: ${error.message}`
    );
  }
}

/**
 * Extrae código desde una historia específica de un componente
 *
 * @param componentId - ID del componente (ej: "data-data-table")
 * @param storyName - Nombre de la historia (ej: "default", "with-icons")
 * @returns Código extraído y parseado
 */
export async function parseCodeFromStory(
  componentId: string,
  storyName: string = 'default'
): Promise<ParsedStorybookCode> {
  // Construir URL de Storybook
  const baseUrlResult = await getStorybookUrlWithFallback('', {
    checkAvailability: false,
  });
  const baseUrl = baseUrlResult.url.replace(/\/$/, '');
  // ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
  const encodedComponentId = encodeURIComponent(componentId);
  const storybookUrl = `${baseUrl}/?path=/story/${encodedComponentId}--${storyName}`;

  return parseCodeFromStorybookUrl(storybookUrl);
}

/**
 * Obtiene HTML de la página de Storybook
 */
async function fetchStorybookPage(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'text/html',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.text();
  } catch (error: any) {
    // Si fetch falla, intentar con fallback
    const { fetchStorybookWithFallback } = await import('./storybookFallback');
    const urlObj = new URL(url);
    const path = urlObj.pathname + urlObj.search;
    const fallbackResponse = await fetchStorybookWithFallback(path);

    if (!fallbackResponse.ok) {
      throw new Error(`No se pudo obtener HTML desde ${url}: ${error.message}`);
    }

    return await fallbackResponse.text();
  }
}

/**
 * Extrae bloques de código desde HTML
 *
 * Busca en múltiples lugares:
 * - <pre><code> (bloques de código estándar)
 * - .sb-code-block (clase específica de Storybook)
 * - [data-code-block] (atributo de datos)
 * - .docs-story (código en documentación)
 */
function extractCodeBlocks(html: string): StorybookCodeBlock[] {
  const codeBlocks: StorybookCodeBlock[] = [];

  // Patrones para encontrar bloques de código
  const patterns = [
    // Patrón 1: <pre><code class="language-xxx">...</code></pre>
    /<pre[^>]*>\s*<code[^>]*class=["']language-(\w+)["'][^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    // Patrón 2: <pre><code>...</code></pre> (sin clase de lenguaje)
    /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    // Patrón 3: <code>...</code> (sin pre)
    /<code[^>]*class=["']language-(\w+)["'][^>]*>([\s\S]*?)<\/code>/gi,
    // Patrón 4: .sb-code-block
    /<div[^>]*class=["'][^"]*sb-code-block[^"]*["'][^>]*>([\s\S]*?)<\/div>/gi,
    // Patrón 5: [data-code-block]
    /<div[^>]*data-code-block[^>]*>([\s\S]*?)<\/div>/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const code = decodeHtmlEntities(match[2] || match[1] || match[0]);
      const language = match[1] || detectLanguage(code);

      if (code.trim().length > 0) {
        codeBlocks.push({
          code: code.trim(),
          language: language || 'html',
          description: extractDescription(match[0], html),
        });
      }
    }
  }

  // Eliminar duplicados (código similar)
  return deduplicateCodeBlocks(codeBlocks);
}

/**
 * Decodifica entidades HTML
 */
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };

  return text.replace(/&[#\w]+;/g, (entity) => {
    return entities[entity] || entity;
  });
}

/**
 * Detecta el lenguaje del código
 */
function detectLanguage(code: string): string {
  // Detectar por patrones comunes
  if (/import\s+.*from\s+["']/.test(code)) {
    return 'typescript';
  }
  if (/<[A-Z]\w+/.test(code)) {
    return 'jsx';
  }
  if (/<[a-z]/.test(code)) {
    return 'html';
  }
  if (/function\s+\w+\(/.test(code) || /const\s+\w+\s*=/.test(code)) {
    return 'javascript';
  }
  return 'html';
}

/**
 * Extrae descripción del bloque de código
 */
function extractDescription(
  codeBlock: string,
  html: string
): string | undefined {
  // Buscar texto antes del bloque de código
  const beforeMatch = html.match(
    new RegExp(`([^<]{0,200})${escapeRegex(codeBlock)}`, 'i')
  );
  if (beforeMatch) {
    const before = beforeMatch[1].trim();
    // Buscar descripciones comunes
    const descMatch = before.match(
      /(?:description|desc|example|ejemplo)[:：]\s*(.+?)(?:\.|$)/i
    );
    if (descMatch) {
      return descMatch[1].trim();
    }
  }
  return undefined;
}

/**
 * Escapa caracteres especiales para regex
 */
function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extrae imports desde bloques de código
 */
function extractImports(codeBlocks: StorybookCodeBlock[]): string[] {
  const imports = new Set<string>();

  for (const block of codeBlocks) {
    // Buscar imports en el código
    const importMatches = block.code.match(
      /import\s+.*?\s+from\s+["']([^"']+)["']/g
    );
    if (importMatches) {
      for (const match of importMatches) {
        const importPath = match.match(/from\s+["']([^"']+)["']/)?.[1];
        if (importPath) {
          imports.add(importPath);
        }
      }
    }

    // Si el bloque tiene imports explícitos
    if (block.imports) {
      block.imports.forEach((imp) => imports.add(imp));
    }
  }

  return Array.from(imports);
}

/**
 * Identifica el código principal (el más relevante)
 */
function identifyPrimaryCode(
  codeBlocks: StorybookCodeBlock[]
): string | undefined {
  if (codeBlocks.length === 0) {
    return undefined;
  }

  // Priorizar código JSX/TSX sobre HTML
  const jsxCode = codeBlocks.find(
    (block) => block.language === 'jsx' || block.language === 'typescript'
  );
  if (jsxCode) {
    return jsxCode.code;
  }

  // Si no hay JSX, usar el bloque más largo (probablemente el más completo)
  const longestBlock = codeBlocks.reduce((prev, current) =>
    current.code.length > prev.code.length ? current : prev
  );

  return longestBlock.code;
}

/**
 * Elimina bloques de código duplicados
 */
function deduplicateCodeBlocks(
  blocks: StorybookCodeBlock[]
): StorybookCodeBlock[] {
  const seen = new Set<string>();
  const unique: StorybookCodeBlock[] = [];

  for (const block of blocks) {
    // Normalizar código (eliminar espacios extra, etc.)
    const normalized = block.code.replace(/\s+/g, ' ').trim().toLowerCase();

    // Si no hemos visto este código antes
    if (!seen.has(normalized)) {
      seen.add(normalized);
      unique.push(block);
    }
  }

  return unique;
}

/**
 * Extrae componentId y storyId desde la URL
 */
function extractIdsFromUrl(url: string): {
  componentId: string;
  storyId?: string;
} {
  // Buscar patrón: /story/component-id--story-name
  const storyMatch = url.match(/\/story\/([^?]+)/);
  if (storyMatch) {
    const fullId = storyMatch[1];
    const [componentId, storyId] = fullId.split('--');
    return {
      componentId: componentId || '',
      storyId: storyId || undefined,
    };
  }

  // Si no hay match, intentar extraer de query params
  const pathMatch = url.match(/[?&]path=([^&]+)/);
  if (pathMatch) {
    const path = decodeURIComponent(pathMatch[1]);
    const storyMatch2 = path.match(/\/story\/([^?]+)/);
    if (storyMatch2) {
      const fullId = storyMatch2[1];
      const [componentId, storyId] = fullId.split('--');
      return {
        componentId: componentId || '',
        storyId: storyId || undefined,
      };
    }
  }

  return { componentId: '' };
}
