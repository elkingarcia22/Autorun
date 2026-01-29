/**
 * Storybook Exact Code Extractor
 *
 * Extrae código exacto desde Storybook usando Browser MCP
 * para navegar y extraer desde la pestaña "Code"
 */

export interface ExactCodeResult {
  html: string;
  css: string[];
  js: string;
  structure: ComponentStructure;
  sourceCodeMatch: boolean;
  cssUrls: string[];
  helperFunctions?: {
    getProviderLogo?: string;
    buildCardData?: string;
    renderIconHelper?: string;
    configs: {
      PROVIDERS?: Record<string, string>;
      LEVELS?: Record<string, string>;
      STATUSES?: Record<string, { class: string; text: string }>;
      CONTENT_TYPES?: string[];
      COMPETENCIES?: string[];
      DURATIONS?: string[];
      LANGUAGES?: string[];
    };
    source: string;
  };
}

export interface ComponentStructure {
  componentId: string;
  elementHierarchy: string[];
  requiredClasses: string[];
  requiredElements: string[];
}

/**
 * Extrae código exacto desde Storybook usando Browser MCP
 *
 * @param componentId - ID del componente (ej: "feedback-modal")
 * @param storyName - Nombre de la historia (ej: "default")
 * @param storybookBaseUrl - URL base de Storybook (default: Vercel)
 * @returns Código exacto extraído
 */
export async function extractExactCodeFromStorybook(
  componentId: string,
  storyName: string = 'default',
  storybookBaseUrl?: string // ⚠️ CRÍTICO: NO usar default de UBITS
): Promise<ExactCodeResult> {
  // ⚠️ CRÍTICO: Si no se proporciona storybookBaseUrl, usar SOLO el Storybook activo
  if (!storybookBaseUrl) {
    try {
      const { StorybookManager } = await import('./storybookManager');
      const manager = StorybookManager.getInstance();
      const activeConfig = await manager.getActiveConfig();

      if (!activeConfig) {
        throw new Error(
          `❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`
        );
      }

      storybookBaseUrl = activeConfig.url;
    } catch (error: any) {
      // ⚠️ CRÍTICO: NO usar fallback de UBITS
      // Lanzar error en lugar de usar fallback
      throw new Error(
        `❌ No se pudo obtener URL del Storybook activo. ${error.message}`
      );
    }
  }
  console.log(
    `🔍 [Exact Code Extractor] Extrayendo código exacto para: ${componentId}--${storyName}`
  );

  // ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
  const encodedComponentId = encodeURIComponent(componentId);
  const storybookUrl = `${storybookBaseUrl}/?path=/story/${encodedComponentId}--${storyName}`;

  try {
    // 1. Navegar a Storybook (requiere Browser MCP)
    console.log(`   📚 Navegando a: ${storybookUrl}`);
    // Nota: Esto requiere que el agente ejecute browser_navigate
    // Por ahora, usamos fetch como fallback
    const html = await fetchStorybookPage(storybookUrl);

    // 2. Extraer código desde pestaña "Code"
    const codeFromTab = await extractCodeFromCodeTab(html);

    // 3. Extraer CSS requerido
    const cssUrls = await extractCSSUrls(componentId, storybookBaseUrl);

    // 4. Extraer estructura HTML
    const structure = await extractHTMLStructure(codeFromTab.html, componentId);

    // 5. Consultar código fuente y comparar
    const sourceCode = await getSourceCode(componentId);
    const sourceCodeMatch = compareStructureWithSource(structure, sourceCode);

    if (!sourceCodeMatch) {
      console.warn(
        `   ⚠️  Estructura no coincide exactamente con código fuente`
      );
    }

    console.log(
      `✅ [Exact Code Extractor] Código extraído: ${codeFromTab.html.length} caracteres`
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
    console.error(`❌ [Exact Code Extractor] Error: ${error.message}`);
    throw new Error(
      `No se pudo extraer código exacto desde Storybook: ${error.message}`
    );
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
  // Storybook muestra código en elementos con clase específica
  const codeBlockRegex =
    /<pre[^>]*class="[^"]*sb-code[^"]*"[^>]*>([\s\S]*?)<\/pre>/gi;
  const matches = Array.from(html.matchAll(codeBlockRegex));

  if (matches.length === 0) {
    // Fallback: buscar en otros formatos
    const alternativeRegex = /<code[^>]*>([\s\S]*?)<\/code>/gi;
    const altMatches = Array.from(html.matchAll(alternativeRegex));
    if (altMatches.length > 0) {
      return { html: decodeHtmlEntities(altMatches[0][1]) };
    }
    throw new Error('No se encontró código en la pestaña "Code"');
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
  // Construir URL del CSS basado en estructura estándar
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
  // Parsear HTML para extraer estructura
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
 * Obtiene código fuente del componente
 */
export async function getSourceCode(
  componentId: string
): Promise<string | null> {
  try {
    // Intentar leer desde código fuente local
    const fs = await import('fs/promises');
    const path = await import('path');

    // Normalizar componentId (puede venir como "feedback-modal" o "modal")
    const normalizedId = componentId
      .replace(/^feedback-/, '')
      .replace(/^data-/, '')
      .replace(/^formularios-/, '')
      .replace(/^metricas-/, '')
      .replace(/^charts-/, '')
      .replace(/^navegaci[oó]n-/, '')
      .replace(/^navegacion-/, '')
      .replace(/^layout-/, '')
      .replace(/^b[aá]sicos-/, '')
      .replace(/^basicos-/, '')
      .replace(/^básicos-/, '');

    // Convertir a PascalCase para nombres de archivos (ej: "radio-button" -> "RadioButton")
    // ⚠️ MEJORADO: Manejar acrónimos como "nps" -> "NPS" (no "Nps")
    let pascalCase = normalizedId
      .split('-')
      .map((word) => {
        // Si la palabra es un acrónimo común (nps, api, etc.), mantenerlo en mayúsculas
        const acronyms = ['nps', 'api', 'ui', 'ux', 'id', 'url'];
        if (acronyms.includes(word.toLowerCase())) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');

    // ✅ CASOS ESPECIALES de nombres de directorios vs nombres de componentes
    const pascalMappings: Record<string, string> = {
      TextMetricCard: 'MetricCard',
      BarMetricCard: 'BarMetricCard',
      CsatMetricCard: 'CSATMetricCard',
      NpsCard: 'NPSCard',
    };

    if (pascalMappings[pascalCase]) {
      pascalCase = pascalMappings[pascalCase];
    }

    // Buscar en diferentes ubicaciones posibles
    const possiblePaths = [
      // ⚠️ NUEVO: Buscar en archivos de stories primero (más confiable para extraer código de historias)
      `vendor/ubits/packages/storybook/stories/components/${pascalCase}/${pascalCase}.stories.ts`,
      `vendor/ubits/packages/storybook/stories/components/${pascalCase}/RadioButton.stories.ts`, // Caso especial para RadioButton
      `vendor/ubits/packages/storybook/stories/components/${pascalCase}/NPSCard.stories.ts`, // Caso especial para NPSCard
      `vendor/ubits/packages/storybook/stories/components/${normalizedId}/${normalizedId}.stories.ts`,
      // Con PascalCase (ej: RadioButtonProvider.ts)
      `vendor/ubits/packages/components/${normalizedId}/src/${pascalCase}Provider.ts`,
      `vendor/ubits/packages/components/${normalizedId}/src/${pascalCase}Provider.js`,
      // Con normalizedId (ej: radio-buttonProvider.ts)
      `vendor/ubits/packages/components/${normalizedId}/src/${normalizedId}Provider.ts`,
      `vendor/ubits/packages/components/${normalizedId}/src/${normalizedId}Provider.js`,
      // Con componentId original
      `vendor/ubits/packages/components/${componentId}/src/${pascalCase}Provider.ts`,
      `vendor/ubits/packages/components/${componentId}/src/${componentId}Provider.ts`,
      // Addons
      `vendor/ubits/packages/addons/${normalizedId}/src/${pascalCase}Provider.ts`,
      `vendor/ubits/packages/addons/${normalizedId}/src/${normalizedId}Provider.ts`,
      `packages/addons/${normalizedId}/src/${pascalCase}Provider.ts`,
    ];

    for (const filePath of possiblePaths) {
      try {
        const fullPath = path.join(process.cwd(), filePath);
        const content = await fs.readFile(fullPath, 'utf-8');
        console.log(`   ✅ Código fuente encontrado: ${filePath}`);
        return content;
      } catch {
        // Continuar con siguiente ruta
      }
    }

    return null;
  } catch (error) {
    console.warn(`   ⚠️  No se pudo leer código fuente: ${error}`);
    return null;
  }
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
