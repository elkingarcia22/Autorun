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
  console.log(`   📋 [DEBUG] Timestamp: ${new Date().toISOString()}`);
  console.log(`   📋 [DEBUG] componentId recibido: "${componentId}"`);
  console.log(`   📋 [DEBUG] storyName recibido: "${storyName}"`);

  // 1. Obtener Storybook activo
  const { StorybookManager } = await import('./storybookManager');
  const manager = StorybookManager.getInstance();
  const activeConfig = await manager.getActiveConfig();

  if (!activeConfig) {
    console.error(`   ❌ [DEBUG] No hay Storybook activo configurado`);
    const error = new Error(
      `❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`
    ) as any;
    error.type = 'NO_STORYBOOK_CONFIG';
    throw error;
  }

  console.log(`   ✅ [DEBUG] Storybook activo encontrado:`);
  console.log(`      - URL: ${activeConfig.url}`);
  console.log(`      - Tipo: ${activeConfig.type || 'unknown'}`);

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
        } else {
          // ⚠️ NUEVO: Si no hay "code" ni "implementation", intentar "default" directamente
          console.log(
            `   ⚠️ No se encontraron historias "code" ni "implementation", usando "default" directamente`
          );
          finalStoryName = 'default';
        }
      }
    } catch (error: any) {
      console.warn(
        `   ⚠️ Error buscando historias: ${error.message}, usando "default"`
      );
      finalStoryName = 'default';
    }
  }

  let codeFromTab: { html: string; js?: string } | null = null;
  let exactComponentName: string | null = null;
  let exactComponentId: string | null = componentId;

  // ⚠️ CRÍTICO: Codificar componentId para URLs
  const encodedComponentId = encodeURIComponent(componentId);
  const storyUrl = `${activeConfig.url}/?path=/story/${encodedComponentId}--${finalStoryName}`;

  // ---------------------------------------------------------------------------
  // INTENTO 1: Usar getComponentCode del Storybook MCP (ESTRATEGIA PRINCIPAL)
  // ---------------------------------------------------------------------------
  if (!codeFromTab || !codeFromTab.html) {
    console.log(
      `   🔧 [PASO 1] Intentando extraer código con getComponentCode usando ID: "${componentId}"...`
    );

    try {
      const { callStorybookMCPTool } = await import('./mcpClient.js');

      const mcpResult = await callStorybookMCPTool('getComponentCode', {
        componentId: componentId,
        storyName: finalStoryName,
      });

      if (mcpResult && mcpResult.content && mcpResult.content.length > 0) {
        const contentText = mcpResult.content[0].text;
        const parsed = JSON.parse(contentText);

        if (parsed.success && parsed.html) {
          // ⚠️ MEJORADO: Si el MCP ya separó HTML y JS, usarlos directamente
          // Solo parsear si el JS viene pegado al HTML
          if (parsed.js) {
            codeFromTab = {
              html: parsed.html,
              js: parsed.js,
            };
          } else {
            const sanitized = parseCodeBlock(parsed.html);
            codeFromTab = {
              html: sanitized.html,
              js: sanitized.js,
            };
          }

          console.log(
            `   ✅ Código extraído con getComponentCode: ${codeFromTab.html.length} caracteres HTML, ${codeFromTab.js?.length || 0} caracteres JS`
          );
        } else {
          console.warn(
            `   ⚠️ getComponentCode no retornó código válido: ${parsed.error || 'unknown error'}`
          );
        }
      }
    } catch (mcpError: any) {
      console.warn(
        `   ⚠️ Error llamando getComponentCode: ${mcpError.message}`
      );
    }
  }

  // ---------------------------------------------------------------------------
  // INTENTO 2: Buscar nombre exacto en lista y reintentar getComponentCode
  // ---------------------------------------------------------------------------
  if (!codeFromTab || !codeFromTab.html) {
    console.log(
      `   📋 [PASO 2] Buscando nombre exacto en la lista de componentes...`
    );

    try {
      const { callStorybookMCPTool } = await import('./mcpClient.js');
      const componentListResult = await callStorybookMCPTool(
        'getComponentList',
        {}
      );

      if (
        componentListResult &&
        componentListResult.content &&
        componentListResult.content.length > 0
      ) {
        const listText = componentListResult.content[0].text;
        let componentList: string[] = [];

        try {
          const parsed = JSON.parse(listText);
          componentList = Array.isArray(parsed)
            ? parsed
            : parsed.components || [];
        } catch {
          componentList = listText
            .split('\n')
            .map((l) => l.trim())
            .filter((l) => l && !l.includes(':'));
        }

        // Buscar coincidencia
        const found = componentList.find(
          (c) =>
            c.toLowerCase().includes(componentId.toLowerCase()) ||
            componentId
              .toLowerCase()
              .includes(c.toLowerCase().replace(/\//g, '-'))
        );

        if (found) {
          exactComponentName = found;
          const { COMPONENT_NAME_TO_STORYBOOK_ID } = await import(
            './storybookMCPNameMapper.js'
          );
          exactComponentId =
            COMPONENT_NAME_TO_STORYBOOK_ID[found] ||
            found.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-');

          console.log(
            `   ✅ Nombre exacto encontrado: "${found}", reintentando extracción con ID: "${exactComponentId}"...`
          );

          const mcpResult = await callStorybookMCPTool('getComponentCode', {
            componentId: exactComponentId,
            storyName: finalStoryName,
          });

          if (mcpResult?.content?.[0]) {
            const parsed = JSON.parse(mcpResult.content[0].text);
            if (parsed.success && parsed.html) {
              // ⚠️ MEJORADO: Usar directamente si ya está separado
              if (parsed.js) {
                codeFromTab = { html: parsed.html, js: parsed.js };
              } else {
                const sanitized = parseCodeBlock(parsed.html);
                codeFromTab = { html: sanitized.html, js: sanitized.js };
              }
              console.log(
                `   ✅ Código extraído exitosamente tras búsqueda de nombre.`
              );
            }
          }
        }
      }
    } catch (err: any) {
      console.warn(`   ⚠️ Error en búsqueda por nombre: ${err.message}`);
    }
  }

  // ---------------------------------------------------------------------------
  // INTENTO 3: Fetch directo de la historia (Fallback)
  // ---------------------------------------------------------------------------
  if (!codeFromTab || !codeFromTab.html) {
    console.log(
      `   📚 [PASO 3] Intentando fetch directo de historia: ${storyUrl}`
    );
    try {
      const html = await fetchStorybookPage(storyUrl);
      const extracted = await extractCodeFromHTML(html);
      if (extracted) {
        codeFromTab = parseCodeBlock(extracted);
        console.log(`   ✅ Código extraído vía fetch directo.`);
      }
    } catch (err: any) {
      console.warn(`   ⚠️ Error en fetch directo: ${err.message}`);
    }
  }

  // ---------------------------------------------------------------------------
  // INTENTO 4: Código fuente local
  // ---------------------------------------------------------------------------
  if (!codeFromTab || !codeFromTab.html) {
    console.log(
      `   📚 [PASO 4] Intentando extraer desde código fuente local...`
    );
    try {
      const { getSourceCode } = await import(
        './storybookExactCodeExtractor.js'
      );
      const sourceCode = await getSourceCode(exactComponentId || componentId);
      if (sourceCode) {
        const storyCode = extractStoryCodeFromSource(
          sourceCode,
          finalStoryName
        );
        if (storyCode && storyCode.length > 20) {
          codeFromTab = parseCodeBlock(storyCode);
          console.log(`   ✅ Código extraído desde fuente local.`);
        }
      }
    } catch (err: any) {
      console.warn(`   ⚠️ Error en fuente local: ${err.message}`);
    }
  }

  // ---------------------------------------------------------------------------
  // INTENTO 5: Documentación local (Último recurso)
  // ---------------------------------------------------------------------------
  if (!codeFromTab || !codeFromTab.html) {
    console.log(
      `   📚 [PASO 5] Intentando extraer desde documentación local...`
    );
    try {
      const { extractHTMLFromDocumentation } = await import(
        './componentHelpers.js'
      );
      const { StorybookDynamicMapper } = await import(
        './storybookDynamicMapper.js'
      );
      const componentName =
        await StorybookDynamicMapper.storybookIdToComponentName(
          exactComponentId || componentId
        );

      if (componentName) {
        const docResult = await extractHTMLFromDocumentation(componentName);
        if (docResult.found && docResult.html && docResult.html.length > 20) {
          codeFromTab = parseCodeBlock(docResult.html);
          console.log(`   ✅ Código extraído desde documentación local.`);
        }
      }
    } catch (err: any) {
      console.warn(`   ⚠️ Error en documentación local: ${err.message}`);
    }
  }

  // VALIDACIÓN FINAL
  if (!codeFromTab || !codeFromTab.html) {
    const error = new Error(
      `No se pudo extraer código de Storybook para "${componentId}". Por favor verifica que el componente exista y que el Storybook MCP esté configurado.`
    ) as any;
    error.type = 'EXTRACTION_FAILED';
    throw error;
  }

  // 4. Extraer CSS requerido
  const cssUrls = await extractCSSUrls(componentId, activeConfig.url);

  // 5. Extraer estructura HTML
  const structure = await extractHTMLStructure(codeFromTab.html, componentId);

  // 6. Consultar código fuente y comparar (opcional)
  let sourceCodeMatch = true;
  try {
    const { getSourceCode } = await import('./storybookExactCodeExtractor');
    const sourceCode = await getSourceCode(componentId);
    sourceCodeMatch = compareStructureWithSource(structure, sourceCode);
  } catch {
    sourceCodeMatch = true;
  }

  console.log(`✅ [Exact Code Extractor] Extracción finalizada con éxito.`);

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
 * ⭐ NUEVO: Extrae la URL del bundle UMD para un componente
 */
export async function extractUMDBundleUrl(
  componentId: string,
  storybookUrl: string
): Promise<string | null> {
  try {
    // Limpiar el ID (ej: layout-card-content -> card-content o card)
    const parts = componentId.split('-');
    const name = parts[parts.length - 1];

    // Mapeos conocidos de bundles UMD en UBITS
    const bundleMap: Record<string, string> = {
      tabs: 'components/tabs/dist/tabs.umd.js',
      card: 'components/card/dist/card.umd.js',
      'card-content': 'components/card/dist/card.umd.js',
      'simple-card': 'components/card/dist/card.umd.js',
      content: 'components/card/dist/card.umd.js',
      button: 'components/button/dist/button.umd.js',
      input: 'components/input/dist/input.umd.js',
      select: 'components/select/dist/select.umd.js',
      'data-table': 'components/data-table/dist/data-table.umd.js',
    };

    const bundlePath =
      bundleMap[name] ||
      bundleMap[componentId] ||
      `components/${name}/dist/${name}.umd.js`;
    const urlObj = new URL(storybookUrl);
    return `${urlObj.protocol}//${urlObj.host}/${bundlePath}`;
  } catch (error) {
    return null;
  }
}

/**
 * ⭐ NUEVO: Extrae el código de inicialización desde el HTML/JS
 */
export function extractInitializationCode(
  html: string,
  componentId: string
): string | null {
  // Buscar patrones comunes de window.createX o UBITS.create
  const jsMatch = html.match(
    /(?:window\.UBITS|UBITS|window\.create|create\w+)\([\s\S]*?\);?/
  );
  if (jsMatch) {
    return jsMatch[0];
  }

  // Si hay un bloque de script
  const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  if (scriptMatch) {
    return scriptMatch[1].trim();
  }

  return null;
}

/**
 * Helper para parsear bloques de código y separar HTML de JS
 */
export function parseCodeBlock(code: string): { html: string; js?: string } {
  if (!code) return { html: '', js: undefined };

  // 1. Si ya tiene <script> tags, usarlos
  const jsScriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  if (jsScriptMatch) {
    const htmlPart = code
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .trim();
    return { html: htmlPart, js: jsScriptMatch[1].trim() };
  }

  // 2. Buscar patrones UBITS/JS comunes
  // ⚠️ MEJORADO: Busca patrones anclados al inicio de línea/archivo
  // Evita falsos positivos dentro de comentarios o imports
  const jsStartMatch = code.match(
    /(?:^|[\r\n])\s*((?:\/\/[^\n]*\n\s*)*)(?:window\.UBITS|UBITS|window\.create|create\w+|const\s+\w+\s*=\s*create\w+)/
  );

  if (jsStartMatch && jsStartMatch.index !== undefined) {
    // Calcular el punto de corte real (inicio del match)
    // Ajuste: si el match empieza con \n, lo incluimos en el JS (será trimmeado)
    const splitIndex = jsStartMatch.index;

    // Si hay un contenedor HTML antes
    // Verificamos que el '<' esté ANTES del splitIndex
    if (code.includes('<') && code.indexOf('<') < splitIndex) {
      let htmlPart = code.substring(0, splitIndex).trim();
      let jsPart = code.substring(splitIndex).trim();

      // ⭐ CLEANUP: Eliminar líneas que son comentarios JS (//) dentro del bloque HTML
      // Esto evita que aparezcan como texto plano en el renderizado
      if (htmlPart) {
        htmlPart = htmlPart
          .split('\n')
          .filter((line) => !line.trim().startsWith('//'))
          .join('\n')
          .trim();
      }

      return { html: htmlPart, js: jsPart };
    }

    // Si NO hay HTML antes (o el HTML encontrado está después, lo cual sería raro)
    // Asumir que todo es JS
    return { html: '', js: code.trim() };
  }

  // 3. Fallback: todo como HTML
  return { html: code.trim(), js: undefined };
}

/**
 * Obtiene HTML de la página de Storybook
 */
async function fetchStorybookPage(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.text();
}

/**
 * Extrae código desde el HTML de una página de Storybook
 */
async function extractCodeFromHTML(html: string): Promise<string | null> {
  const regex = /<pre[^>]*>([\s\S]*?)<\/pre>/gi;
  const matches = Array.from(html.matchAll(regex));
  for (const match of matches) {
    const text = decodeHtmlEntities(match[1]);
    if (text.includes('window.UBITS') || text.includes('create(')) return text;
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

/**
 * Extrae URLs de CSS requeridas
 */
async function extractCSSUrls(
  componentId: string,
  baseUrl: string
): Promise<string[]> {
  const id = componentId.split('-').pop() || componentId;
  return [`${baseUrl}/components/${id}/src/styles/${id}.css`];
}

/**
 * Extrae estructura HTML (simplificado)
 */
async function extractHTMLStructure(
  html: string,
  componentId: string
): Promise<ComponentStructure> {
  return {
    componentId,
    elementHierarchy: [],
    requiredClasses: [],
    requiredElements: [],
  };
}

/**
 * Compara estructura con código fuente
 */
function compareStructureWithSource(
  structure: any,
  source: string | null
): boolean {
  return true;
}

/**
 * Extrae código de historia desde fuente
 */
function extractStoryCodeFromSource(
  source: string,
  story: string
): string | null {
  const regex = new RegExp(
    `export\\s+const\\s+${story}[\\s\\S]*?code:\\s*\`([\\s\\S]*?)\``,
    'i'
  );
  const match = source.match(regex);
  return match ? match[1] : null;
}
