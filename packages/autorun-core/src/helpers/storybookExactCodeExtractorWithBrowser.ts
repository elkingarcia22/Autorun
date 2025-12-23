/**
 * Storybook Exact Code Extractor with Browser MCP
 *
 * ⭐ NUEVO: Versión mejorada que usa Browser MCP para navegar y extraer código exacto
 * desde la pestaña "Code" de Storybook automáticamente.
 */

import {
  ExactCodeResult,
  ComponentStructure,
} from './storybookExactCodeExtractor';

/**
 * Extrae código exacto desde Storybook usando Browser MCP
 * Navega automáticamente a la pestaña "Code" y extrae HTML/JSX
 *
 * ⚠️ CRÍTICO: Esta función DEBE ser usada antes de implementar cualquier componente
 */
export async function extractExactCodeFromStorybookWithBrowser(
  componentId: string,
  storyName: string = 'default'
): Promise<ExactCodeResult> {
  console.log(
    `🔍 [Exact Code Extractor with Browser] Extrayendo código exacto para: ${componentId}--${storyName}`
  );

  // 1. Obtener Storybook activo
  const { StorybookManager } = await import('./storybookManager');
  const manager = StorybookManager.getInstance();
  const activeConfig = await manager.getActiveConfig();

  if (!activeConfig) {
    throw new Error(
      `❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`
    );
  }

  // ⚠️ CRÍTICO: Si storyName es "default", buscar "code" primero, luego "implementation"
  let finalStoryName = storyName;
  if (storyName === 'default') {
    try {
      const { findCodeStory, findImplementationStory } = await import(
        './codePropsCombiner.js'
      );

      // ⚠️ NUEVO: Priorizar historia "code" (sugerencia del usuario)
      const codeStoryName = await findCodeStory(componentId);
      if (codeStoryName) {
        finalStoryName = codeStoryName;
        console.log(
          `   ✅ Usando historia "code" encontrada: ${finalStoryName}`
        );
      } else {
        // Fallback a "implementation"
        const implementationStoryName =
          await findImplementationStory(componentId);
        if (implementationStoryName !== 'default') {
          finalStoryName = implementationStoryName;
          console.log(
            `   ✅ Usando historia "implementation" encontrada: ${finalStoryName}`
          );
        }
      }
    } catch (error: any) {
      console.warn(
        `   ⚠️ Error buscando historias: ${error.message}, usando "default"`
      );
    }
  }

  // 2. ⚠️ NUEVO: Intentar múltiples fuentes en orden de prioridad
  // Prioridad 1: Código fuente local (MÁS CONFIABLE - no requiere fetch)
  // Prioridad 2: URL de la historia directamente
  // Prioridad 3: Docs (requiere Browser MCP)

  let codeFromTab: { html: string; js?: string } | null = null;

  // INTENTO 1: Extraer desde código fuente local (MÁS CONFIABLE)
  console.log(`   📋 Intentando extraer desde código fuente local...`);
  try {
    const { getSourceCode } = await import('./storybookExactCodeExtractor.js');
    const sourceCode = await getSourceCode(componentId);

    if (sourceCode) {
      // Extraer código de la historia específica desde el código fuente
      const storyCode = extractStoryCodeFromSource(sourceCode, finalStoryName);
      if (storyCode) {
        codeFromTab = { html: storyCode, js: undefined };
        console.log(
          `   ✅ Código obtenido desde código fuente: ${storyCode.length} caracteres`
        );
      }
    }
  } catch (sourceError: any) {
    console.warn(
      `   ⚠️ No se pudo obtener código desde código fuente: ${sourceError.message}`
    );
  }

  // INTENTO 2: Extraer desde URL de la historia directamente
  const storyUrl = `${activeConfig.url}/?path=/story/${componentId}--${finalStoryName}`;
  console.log(`   📚 Intentando extraer desde URL de historia: ${storyUrl}`);

  try {
    const html = await fetchStorybookPage(storyUrl);
    try {
      // Intentar extraer desde pestaña "Code" de la historia
      // Buscar bloques de código en el HTML
      const codeBlockRegex =
        /<pre[^>]*class="[^"]*sb-code[^"]*"[^>]*>([\s\S]*?)<\/pre>/gi;
      const matches = Array.from(html.matchAll(codeBlockRegex));

      if (matches.length > 0) {
        const primaryCode = decodeHtmlEntities(matches[0][1]);
        const htmlMatch = primaryCode.match(/<[^>]+>[\s\S]*?<\/[^>]+>/);
        const jsMatch = primaryCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

        codeFromTab = {
          html: htmlMatch ? htmlMatch[0] : primaryCode,
          js: jsMatch ? jsMatch[1] : undefined,
        };
        console.log(
          `   ✅ Código extraído desde historia: ${codeFromTab.html.length} caracteres`
        );
      } else {
        // Fallback: buscar en otros formatos
        const alternativeRegex = /<code[^>]*>([\s\S]*?)<\/code>/gi;
        const altMatches = Array.from(html.matchAll(alternativeRegex));
        if (altMatches.length > 0) {
          codeFromTab = { html: decodeHtmlEntities(altMatches[0][1]) };
          console.log(
            `   ✅ Código extraído desde historia (formato alternativo): ${codeFromTab.html.length} caracteres`
          );
        } else {
          throw new Error('No se encontró código en la URL de la historia');
        }
      }
    } catch (extractError: any) {
      console.warn(
        `   ⚠️ No se pudo extraer desde historia: ${extractError.message}`
      );
    }
  } catch (fetchError: any) {
    console.warn(
      `   ⚠️ Error obteniendo HTML de historia: ${fetchError.message}`
    );
  }

  // INTENTO 3: Intentar desde Docs (último recurso, puede requerir Browser MCP)
  if (!codeFromTab || !codeFromTab.html) {
    console.log(`   📋 Intentando extraer desde Docs...`);
    const docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;

    try {
      const html = await fetchStorybookPage(docsUrl);
      try {
        codeFromTab = await extractCodeFromDocs(html, finalStoryName);
        console.log(
          `   ✅ Código extraído desde Docs: ${codeFromTab.html.length} caracteres`
        );
      } catch (extractError: any) {
        console.warn(
          `   ⚠️ No se pudo extraer código desde Docs: ${extractError.message}`
        );
      }
    } catch (fetchError: any) {
      console.warn(
        `   ⚠️ Error obteniendo HTML de Docs: ${fetchError.message}`
      );
    }
  }

  // Si aún no tenemos código, lanzar error
  if (!codeFromTab || !codeFromTab.html) {
    const error = new Error(
      `No se pudo extraer código desde ninguna fuente. ` +
        `Intentado: 1) URL de historia, 2) Código fuente local, 3) Docs. ` +
        `El código puede estar cargado dinámicamente y requerir Browser MCP.`
    ) as any;
    error.type = 'BROWSER_MCP_REQUIRED';
    error.docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;
    error.storyUrl = storyUrl;
    error.storyName = finalStoryName;
    throw error;
  }

  // 4. Extraer CSS requerido
  const cssUrls = await extractCSSUrls(componentId, activeConfig.url);

  // 5. Extraer estructura HTML
  const structure = await extractHTMLStructure(codeFromTab.html, componentId);

  // 6. Consultar código fuente y comparar
  const { getSourceCode } = await import('./storybookExactCodeExtractor');
  const sourceCode = await getSourceCode(componentId);
  const sourceCodeMatch = compareStructureWithSource(structure, sourceCode);

  if (!sourceCodeMatch) {
    console.warn(`   ⚠️  Estructura no coincide exactamente con código fuente`);
  }

  console.log(
    `✅ [Exact Code Extractor with Browser] Código extraído: ${codeFromTab.html.length} caracteres`
  );

  return {
    html: codeFromTab.html,
    css: cssUrls,
    js: codeFromTab.js || '',
    structure,
    sourceCodeMatch,
    cssUrls,
  };
}

/**
 * Extrae código desde snapshot del Browser MCP
 *
 * ⚠️ Esta función debe ser llamada DESPUÉS de que el agente navegue a Docs
 * y el código se haya cargado dinámicamente (o después de hacer clic en "Show code")
 */
export async function extractCodeFromBrowserSnapshot(
  snapshot: any
): Promise<{ html: string; js?: string }> {
  // ✅ IMPLEMENTADO: Extraer código desde snapshot
  const { extractCodeFromDocsSnapshot } = await import(
    './extractCodeFromDocsSnapshot'
  );
  const result = extractCodeFromDocsSnapshot(snapshot);

  if (result.found) {
    console.log(`   ✅ Código extraído desde snapshot`);
    console.log(`   📋 Código HTML: ${result.html.length} caracteres`);
    if (result.js) {
      console.log(`   📋 Código JS: ${result.js.length} caracteres`);
    }
    return { html: result.html, js: result.js };
  }

  console.warn(`   ⚠️ No se encontró código en el snapshot`);
  console.log(
    `   💡 Sugerencia: Asegúrate de que el código esté visible (hacer clic en "Show code" si es necesario)`
  );
  return { html: '' };
}

/**
 * Obtiene HTML de la página de Storybook
 */
async function fetchStorybookPage(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error: any) {
    throw new Error(`No se pudo obtener página de Storybook: ${error.message}`);
  }
}

/**
 * Extrae código desde Docs de Storybook (código visible con botones "Show code")
 *
 * ✅ NUEVO: Usa Docs en lugar de pestaña "Code" - el código está visible directamente
 */
async function extractCodeFromDocs(
  html: string,
  storyName: string = 'default'
): Promise<{
  html: string;
  js?: string;
}> {
  // 1. Buscar código de historia específica (priorizar "implementation")
  if (storyName !== 'default') {
    // Buscar sección con título de la historia
    const storySectionRegex = new RegExp(
      `${storyName}[^<]*<pre[^>]*>([\\s\\S]*?)<\\/pre>`,
      'i'
    );
    const storyMatch = html.match(storySectionRegex);
    if (storyMatch) {
      const code = decodeHtmlEntities(storyMatch[1]);
      return parseCodeBlock(code);
    }
  }

  // 2. Buscar bloques de código visibles en Docs
  // Los bloques están en diferentes formatos:

  // Patrón 1: Bloques con clase específica de Docs
  const docsCodeRegex =
    /<pre[^>]*class="[^"]*docs-code[^"]*"[^>]*>([\s\S]*?)<\/pre>/gi;
  const docsMatches = Array.from(html.matchAll(docsCodeRegex));

  // Patrón 2: Bloques en secciones de ejemplos
  const exampleCodeRegex =
    /<div[^>]*class="[^"]*docs-story[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  const exampleMatches = Array.from(html.matchAll(exampleCodeRegex));

  // Patrón 3: Buscar código de historia "implementation" específicamente
  const implementationMatch = html.match(
    /Implementation[^<]*<pre[^>]*>([\s\S]*?)<\/pre>/i
  );

  if (implementationMatch) {
    return parseCodeBlock(decodeHtmlEntities(implementationMatch[1]));
  }

  // Patrón 4: Bloques estándar <pre><code>
  const standardCodeRegex =
    /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi;
  const standardMatches = Array.from(html.matchAll(standardCodeRegex));

  // Patrón 5: Bloques <code> sin <pre>
  const codeOnlyRegex =
    /<code[^>]*class="[^"]*language-[^"]*"[^>]*>([\s\S]*?)<\/code>/gi;
  const codeOnlyMatches = Array.from(html.matchAll(codeOnlyRegex));

  // Priorizar: implementation > docs-code > docs-story > standard > code-only
  if (docsMatches.length > 0) {
    return parseCodeBlock(decodeHtmlEntities(docsMatches[0][1]));
  }

  if (exampleMatches.length > 0) {
    return parseCodeBlock(decodeHtmlEntities(exampleMatches[0][1]));
  }

  if (standardMatches.length > 0) {
    return parseCodeBlock(decodeHtmlEntities(standardMatches[0][1]));
  }

  if (codeOnlyMatches.length > 0) {
    return parseCodeBlock(decodeHtmlEntities(codeOnlyMatches[0][1]));
  }

  // ⚠️ CRÍTICO: Docs también carga código dinámicamente con JavaScript
  // Necesitamos usar Browser MCP para navegar y extraer desde el snapshot
  throw new Error(
    'No se encontró código en Docs. El código se carga dinámicamente con JavaScript. ' +
      'Necesitamos usar Browser MCP para navegar a Docs y extraer desde el snapshot después de que se cargue.'
  );
}

/**
 * Parsea un bloque de código para separar HTML y JS
 */
function parseCodeBlock(code: string): { html: string; js?: string } {
  // Intentar separar HTML y JS
  const htmlMatch = code.match(/<[^>]+>[\s\S]*?<\/[^>]+>/);
  const jsMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

  // Si es código JavaScript puro (window.UBITS, etc.)
  if (code.includes('window.UBITS') || code.includes('create(')) {
    return { html: '', js: code };
  }

  // Si tiene HTML
  if (htmlMatch) {
    return {
      html: htmlMatch[0],
      js: jsMatch ? jsMatch[1] : undefined,
    };
  }

  // Si no tiene HTML, asumir que es código JavaScript
  return { html: '', js: code };
}

/**
 * Extrae código desde la pestaña "Code" de Storybook (DEPRECADO - usar extractCodeFromDocs)
 *
 * @deprecated Usar extractCodeFromDocs en su lugar
 */
async function extractCodeFromCodeTab(html: string): Promise<{
  html: string;
  js?: string;
}> {
  // Redirigir a extractCodeFromDocs
  return extractCodeFromDocs(html, 'default');
}

/**
 * Extrae URLs de CSS requeridas para el componente
 */
async function extractCSSUrls(
  componentId: string,
  storybookBaseUrl: string
): Promise<string[]> {
  const cssUrls: string[] = [];

  // CSS principal del componente
  cssUrls.push(
    `${storybookBaseUrl}/components/${componentId}/src/styles/${componentId}.css`
  );

  // CSS de dependencias comunes (button, etc.)
  if (componentId.includes('modal')) {
    cssUrls.push(`${storybookBaseUrl}/components/button/src/styles/button.css`);
  }

  return cssUrls;
}

/**
 * Extrae estructura HTML del código
 */
async function extractHTMLStructure(
  html: string,
  componentId: string
): Promise<ComponentStructure> {
  const elementHierarchy: string[] = [];
  const requiredClasses: string[] = [];
  const requiredElements: string[] = [];

  // Extraer clases
  const classRegex = /class="([^"]+)"/g;
  const classMatches = Array.from(html.matchAll(classRegex));
  classMatches.forEach((match) => {
    const classes = match[1].split(/\s+/);
    classes.forEach((cls) => {
      if (cls.startsWith('ubits-') && !requiredClasses.includes(cls)) {
        requiredClasses.push(cls);
      }
    });
  });

  // Extraer elementos
  const elementRegex = /<([a-z][a-z0-9]*)[^>]*>/gi;
  const elementMatches = Array.from(html.matchAll(elementRegex));
  elementMatches.forEach((match) => {
    const element = match[1];
    if (!requiredElements.includes(element)) {
      requiredElements.push(element);
    }
  });

  // Construir jerarquía (simplificada)
  const hierarchyRegex =
    /<([a-z][a-z0-9]*)[^>]*class="([^"]*ubits-[^"]+)"[^>]*>/gi;
  const hierarchyMatches = Array.from(html.matchAll(hierarchyRegex));
  hierarchyMatches.forEach((match) => {
    elementHierarchy.push(`${match[1]}.${match[2].split(/\s+/)[0]}`);
  });

  return {
    componentId,
    elementHierarchy,
    requiredClasses,
    requiredElements,
  };
}

/**
 * Compara estructura extraída con código fuente
 */
function compareStructureWithSource(
  structure: ComponentStructure,
  sourceCode: string | null
): boolean {
  if (!sourceCode) {
    return false;
  }

  // Verificar que las clases requeridas estén en el código fuente
  const missingClasses = structure.requiredClasses.filter(
    (cls) => !sourceCode.includes(cls)
  );

  if (missingClasses.length > 0) {
    console.warn(
      `   ⚠️  Clases faltantes en código fuente: ${missingClasses.join(', ')}`
    );
    return false;
  }

  return true;
}

/**
 * Extrae código de una historia específica desde el código fuente
 */
function extractStoryCodeFromSource(
  sourceCode: string,
  storyName: string
): string | null {
  // Buscar la historia específica en el código fuente
  const storyRegex = new RegExp(
    `export\\s+const\\s+${storyName}\\s*[:=]\\s*([\\s\\S]*?)(?:export|const|function|\\/\\*|$)`,
    'i'
  );
  const match = sourceCode.match(storyRegex);

  if (match) {
    // Extraer el código de la historia
    let storyCode = match[1].trim();

    // Limpiar el código (remover comentarios, etc.)
    storyCode = storyCode
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remover comentarios multi-línea
      .replace(/\/\/.*$/gm, '') // Remover comentarios de línea
      .trim();

    // Intentar extraer el código HTML/JS del return o del objeto
    const returnMatch = storyCode.match(/return\s*\(?([\s\S]*?)\)?\s*;?$/);
    if (returnMatch) {
      return returnMatch[1].trim();
    }

    // Si no hay return, buscar template o render
    const templateMatch = storyCode.match(/template:\s*['"`]([\s\S]*?)['"`]/);
    if (templateMatch) {
      return templateMatch[1].trim();
    }

    return storyCode;
  }

  return null;
}

/**
 * Decodifica entidades HTML
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}
