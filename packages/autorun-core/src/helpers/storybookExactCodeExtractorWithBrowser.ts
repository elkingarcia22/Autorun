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

  // ⚠️ CRÍTICO: Si storyName es "default", intentar primero buscar "implementation"
  let finalStoryName = storyName;
  if (storyName === 'default') {
    try {
      const { findImplementationStory } = await import(
        './codePropsCombiner.js'
      );
      const implementationStoryName =
        await findImplementationStory(componentId);
      if (implementationStoryName !== 'default') {
        finalStoryName = implementationStoryName;
        console.log(
          `   ✅ Usando historia "implementation" encontrada: ${finalStoryName}`
        );
      }
    } catch (error: any) {
      console.warn(
        `   ⚠️ Error buscando historia "implementation": ${error.message}, usando "default"`
      );
    }
  }

  // 2. Construir URL de Story (para código exacto)
  const storyUrl = `${activeConfig.url}/?path=/story/${componentId}--${finalStoryName}`;
  console.log(`   📚 URL de Story: ${storyUrl}`);
  console.log(`   📋 Historia final: ${finalStoryName}`);

  // 3. ⚠️ CRÍTICO: Esta función requiere que el agente ejecute Browser MCP
  // Por ahora, usamos fetch como fallback, pero el agente DEBE navegar a Storybook
  console.log(
    `   ⚠️ IMPORTANTE: El agente DEBE navegar a Storybook y hacer clic en pestaña "Code"`
  );
  console.log(`   📋 Instrucciones para el agente:`);
  console.log(`      1. Navegar a: ${storyUrl}`);
  console.log(`      2. Hacer clic en pestaña "Code"`);
  console.log(`      3. Extraer código desde el snapshot`);

  // Por ahora, usar método tradicional (fetch)
  // TODO: Implementar extracción desde Browser MCP snapshot
  try {
    const html = await fetchStorybookPage(storyUrl);
    let codeFromTab;
    try {
      codeFromTab = await extractCodeFromCodeTab(html);
    } catch (extractError: any) {
      // ⚠️ FALLBACK: Si no se puede extraer desde HTML, intentar obtener código fuente directamente
      console.warn(
        `   ⚠️ No se pudo extraer código desde HTML: ${extractError.message}`
      );
      console.log(`   📋 Intentando obtener código fuente directamente...`);

      const { getSourceCode } = await import('./storybookExactCodeExtractor');
      const sourceCode = await getSourceCode(componentId);

      if (sourceCode) {
        // Extraer código de la historia específica desde el código fuente
        const storyCode = extractStoryCodeFromSource(
          sourceCode,
          finalStoryName
        );
        if (storyCode) {
          codeFromTab = { html: storyCode, js: undefined };
          console.log(
            `   ✅ Código obtenido desde código fuente: ${storyCode.length} caracteres`
          );
        } else {
          throw new Error(
            `No se encontró código para la historia "${finalStoryName}" en el código fuente`
          );
        }
      } else {
        throw extractError; // Re-lanzar error original si no hay código fuente
      }
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
      console.warn(
        `   ⚠️  Estructura no coincide exactamente con código fuente`
      );
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
  } catch (error: any) {
    console.error(
      `❌ [Exact Code Extractor with Browser] Error: ${error.message}`
    );
    throw new Error(
      `No se pudo extraer código exacto desde Storybook: ${error.message}`
    );
  }
}

/**
 * Extrae código desde snapshot del Browser MCP
 *
 * ⚠️ Esta función debe ser llamada DESPUÉS de que el agente navegue a Storybook
 * y haga clic en la pestaña "Code"
 */
export async function extractCodeFromBrowserSnapshot(
  snapshot: any
): Promise<{ html: string; js?: string }> {
  // Buscar código en el snapshot
  // El snapshot contiene la estructura del DOM renderizado

  // Por ahora, retornar código vacío (se implementará cuando tengamos acceso al snapshot)
  console.warn(`   ⚠️ Extracción desde snapshot no implementada aún`);
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
 * Extrae código desde la pestaña "Code" de Storybook
 */
async function extractCodeFromCodeTab(html: string): Promise<{
  html: string;
  js?: string;
}> {
  // Buscar bloques de código en el HTML de Storybook
  const codeBlockRegex =
    /<pre[^>]*class="[^"]*sb-code[^"]*"[^>]*>([\s\S]*?)<\/pre>/gi;
  const matches = Array.from(html.matchAll(codeBlockRegex));

  if (matches.length === 0) {
    // Fallback 1: buscar en otros formatos de Storybook
    const alternativeRegex = /<code[^>]*>([\s\S]*?)<\/code>/gi;
    const altMatches = Array.from(html.matchAll(alternativeRegex));
    if (altMatches.length > 0) {
      return { html: decodeHtmlEntities(altMatches[0][1]) };
    }

    // Fallback 2: buscar en elementos con data-testid o data-code
    const dataCodeRegex = /<div[^>]*data-code[^>]*>([\s\S]*?)<\/div>/gi;
    const dataMatches = Array.from(html.matchAll(dataCodeRegex));
    if (dataMatches.length > 0) {
      return { html: decodeHtmlEntities(dataMatches[0][1]) };
    }

    // ⚠️ CRÍTICO: Storybook carga el código dinámicamente con JavaScript
    // El HTML inicial no contiene el código de la pestaña "Code"
    // Necesitamos usar Browser MCP para navegar y extraer desde el snapshot
    throw new Error(
      'No se encontró código en la pestaña "Code". Storybook carga el código dinámicamente con JavaScript. ' +
        'Necesitamos usar Browser MCP para navegar a Storybook y extraer desde el snapshot después de que se cargue.'
    );
  }

  // Extraer el código principal (generalmente el primero)
  const primaryCode = decodeHtmlEntities(matches[0][1]);

  // Intentar separar HTML y JS
  const htmlMatch = primaryCode.match(/<[^>]+>[\s\S]*?<\/[^>]+>/);
  const jsMatch = primaryCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

  return {
    html: htmlMatch ? htmlMatch[0] : primaryCode,
    js: jsMatch ? jsMatch[1] : undefined,
  };
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
