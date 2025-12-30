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
          // pero también registrar que estamos usando "default"
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

  // 2. ⚠️ NUEVO FLUJO: Primero obtener lista de componentes, luego buscar nombre exacto
  // Paso 1: Obtener lista completa de componentes disponibles
  // Paso 2: Buscar el componente en la lista por nombre o ID
  // Paso 3: Usar el nombre exacto encontrado para extraer código

  let codeFromTab: { html: string; js?: string } | null = null;
  let exactComponentName: string | null = null;
  let exactComponentId: string | null = componentId;

  // ⚠️ CRÍTICO: Codificar componentId para URLs (caracteres especiales como "á" en "básicos")
  const encodedComponentId = encodeURIComponent(componentId);

  // Definir storyUrl aquí para usarlo en el error si es necesario
  const storyUrl = `${activeConfig.url}/?path=/story/${encodedComponentId}--${finalStoryName}`;

  // INTENTO 1: Obtener lista de componentes y buscar nombre exacto
  if (!codeFromTab || !codeFromTab.html) {
    console.log(
      `   📋 [PASO 1] Obteniendo lista completa de componentes del Storybook...`
    );

    try {
      const { callStorybookMCPTool } = await import('./mcpClient.js');

      // Paso 1.1: Obtener lista de componentes
      console.log(`   🔍 Llamando getComponentList del Storybook MCP...`);
      const componentListResult = await callStorybookMCPTool(
        'getComponentList',
        {}
      );

      console.log(
        `   📋 Resultado de getComponentList:`,
        JSON.stringify(componentListResult, null, 2).substring(0, 500)
      );

      if (
        componentListResult &&
        componentListResult.content &&
        componentListResult.content.length > 0
      ) {
        const listText = componentListResult.content[0].text;
        console.log(
          `   📋 Texto recibido (primeros 500 caracteres):`,
          listText.substring(0, 500)
        );

        let componentList: string[] = [];

        try {
          // Intentar parsear como JSON
          const parsed = JSON.parse(listText);

          // ⚠️ CRÍTICO: Si el JSON tiene success: false, es un error
          if (parsed.success === false) {
            console.warn(
              `   ⚠️ getComponentList retornó error: ${parsed.error || 'unknown error'}`
            );
            console.warn(
              `   💡 SOLUCIÓN: Verificar que STORYBOOK_URL esté configurado correctamente`
            );
            console.warn(
              `   💡 URL esperada: https://ubits-storybook10.vercel.app/index.json`
            );
            console.warn(
              `   💡 Continuando con ID original "${componentId}" directamente`
            );
            // Continuar con lista vacía, pero intentar usar el ID directamente
            componentList = [];
          } else {
            componentList = Array.isArray(parsed)
              ? parsed
              : parsed.components || [];
            console.log(
              `   ✅ Parseado como JSON: ${componentList.length} componentes`
            );
          }
        } catch {
          // Si no es JSON, intentar parsear como texto plano
          // El formato puede ser: "Available components:\nComponent1\nComponent2..."
          const lines = listText
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => {
              // Filtrar líneas vacías y encabezados como "Available components:"
              return (
                line &&
                !line.toLowerCase().startsWith('available') &&
                !line.toLowerCase().startsWith('componentes') &&
                line !== ':'
              );
            });
          componentList = lines;
          console.log(
            `   ✅ Parseado como texto: ${componentList.length} componentes`
          );
          if (componentList.length > 0) {
            console.log(
              `   📋 Primeros 5 componentes: ${componentList.slice(0, 5).join(', ')}`
            );
          }
        }

        console.log(
          `   ✅ Lista de componentes obtenida: ${componentList.length} componentes`
        );

        // Paso 1.2: Buscar el componente en la lista
        console.log(
          `   🔍 [PASO 2] Buscando componente "${componentId}" en la lista...`
        );

        // Buscar por ID exacto primero (ej: "layout-carousel")
        let foundComponent = componentList.find(
          (comp) =>
            comp.toLowerCase().includes(componentId.toLowerCase()) ||
            componentId
              .toLowerCase()
              .includes(comp.toLowerCase().replace(/\//g, '-'))
        );

        // Si no se encuentra, buscar por nombre sin categoría (ej: "Carousel" en "Layout/Carousel")
        if (!foundComponent) {
          const componentNameWithoutCategory =
            componentId.split('-').pop() || componentId;
          foundComponent = componentList.find((comp) => {
            const compName = comp.split('/').pop() || comp;
            return (
              compName.toLowerCase() ===
                componentNameWithoutCategory.toLowerCase() ||
              comp
                .toLowerCase()
                .includes(componentNameWithoutCategory.toLowerCase())
            );
          });
        }

        // Si aún no se encuentra, buscar por coincidencia parcial
        if (!foundComponent) {
          const searchTerms = componentId.split('-');
          foundComponent = componentList.find((comp) => {
            const compLower = comp.toLowerCase();
            return searchTerms.some((term) =>
              compLower.includes(term.toLowerCase())
            );
          });
        }

        if (foundComponent) {
          exactComponentName = foundComponent;
          console.log(
            `   ✅ Componente encontrado en la lista: "${exactComponentName}"`
          );

          // Convertir nombre a ID si es necesario (ej: "Layout/Carousel" -> "layout-carousel")
          const { storybookIdToComponentName, COMPONENT_NAME_TO_STORYBOOK_ID } =
            await import('./storybookMCPNameMapper.js');

          // Intentar obtener ID desde el mapeo inverso
          const mappedId = COMPONENT_NAME_TO_STORYBOOK_ID[exactComponentName];
          if (mappedId) {
            exactComponentId = mappedId;
            console.log(`   ✅ ID mapeado: "${exactComponentId}"`);
          } else {
            // Si no hay mapeo, construir ID desde el nombre
            exactComponentId = exactComponentName
              .toLowerCase()
              .replace(/\//g, '-')
              .replace(/\s+/g, '-');
            console.log(
              `   ⚠️ ID construido desde nombre: "${exactComponentId}"`
            );
          }
        } else {
          console.warn(
            `   ⚠️ Componente "${componentId}" no encontrado en la lista de componentes`
          );
          console.warn(
            `   💡 Componentes disponibles (primeros 10): ${componentList.slice(0, 10).join(', ')}`
          );
        }
      } else {
        console.warn(`   ⚠️ No se pudo obtener lista de componentes`);
      }
    } catch (listError: any) {
      console.warn(
        `   ⚠️ Error obteniendo lista de componentes: ${listError.message}`
      );
    }
  }

  // INTENTO 2: Usar getComponentCode del Storybook MCP con el ID/nombre exacto encontrado
  if (!codeFromTab || !codeFromTab.html) {
    console.log(
      `   🔧 [PASO 3] Intentando extraer código con getComponentCode usando ID: "${exactComponentId || componentId}"...`
    );

    try {
      const { callStorybookMCPTool } = await import('./mcpClient.js');

      const mcpResult = await callStorybookMCPTool('getComponentCode', {
        componentId: exactComponentId || componentId,
        storyName: finalStoryName,
      });

      // Parsear resultado del MCP
      if (mcpResult && mcpResult.content && mcpResult.content.length > 0) {
        const contentText = mcpResult.content[0].text;
        const parsed = JSON.parse(contentText);

        if (parsed.success && parsed.html) {
          codeFromTab = {
            html: parsed.html,
            js: parsed.js,
          };

          console.log(
            `   ✅ Código extraído con getComponentCode: ${codeFromTab.html.length} caracteres HTML, ${codeFromTab.js?.length || 0} caracteres JS`
          );
          console.log(
            `   📋 Método de extracción: ${parsed.extractionMethod || 'unknown'}`
          );
          console.log(
            `   📋 Selector usado: ${parsed.extractionSelector || 'unknown'}`
          );
          console.log(
            `   📋 Componente usado: "${exactComponentName || exactComponentId || componentId}"`
          );
        } else {
          console.warn(
            `   ⚠️ getComponentCode no retornó código válido: ${parsed.error || 'unknown error'}`
          );
        }
      } else {
        console.warn(`   ⚠️ getComponentCode retornó resultado vacío`);
      }
    } catch (mcpError: any) {
      console.error(`   ❌ [DEBUG] Error completo en getComponentCode:`);
      console.error(`      - Mensaje: ${mcpError.message}`);
      console.error(
        `      - Stack: ${mcpError.stack?.substring(0, 500) || 'N/A'}`
      );
      console.error(`      - Tipo: ${mcpError.type || 'N/A'}`);
      console.warn(
        `   ⚠️ Error llamando getComponentCode del Storybook MCP: ${mcpError.message}`
      );
      console.warn(`   🔄 Continuando con método fallback (fetch)...`);
    }
  }

  // INTENTO 2: Extraer desde URL de la historia directamente (fallback)
  if (!codeFromTab || !codeFromTab.html) {
    console.log(`   📚 Intentando extraer desde URL de historia: ${storyUrl}`);

    try {
      const html = await fetchStorybookPage(storyUrl);
      try {
        // ⚠️ MEJORADO: Buscar código en múltiples formatos y ubicaciones
        // Formato 1: Bloques <pre><code> con clase sb-code
        const codeBlockRegex =
          /<pre[^>]*class="[^"]*sb-code[^"]*"[^>]*>([\s\S]*?)<\/pre>/gi;
        const matches = Array.from(html.matchAll(codeBlockRegex));

        // Formato 2: Bloques <pre><code> estándar
        const standardCodeRegex =
          /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi;
        const standardMatches = Array.from(html.matchAll(standardCodeRegex));

        // Formato 3: Bloques <code> sin <pre>
        const codeOnlyRegex =
          /<code[^>]*class="[^"]*language-[^"]*"[^>]*>([\s\S]*?)<\/code>/gi;
        const codeOnlyMatches = Array.from(html.matchAll(codeOnlyRegex));

        // Formato 4: Buscar código JavaScript directamente en el HTML (window.UBITS, create, etc.)
        const jsCodeRegex =
          /(window\.UBITS\.[\s\S]*?create\([\s\S]*?\{[\s\S]*?\}[\s\S]*?\))/gi;
        const jsMatches = Array.from(html.matchAll(jsCodeRegex));

        // Formato 5: Buscar código en scripts inline
        const scriptRegex =
          /<script[^>]*>([\s\S]*?window\.UBITS[\s\S]*?)<\/script>/gi;
        const scriptMatches = Array.from(html.matchAll(scriptRegex));

        // Priorizar: sb-code > standard > code-only > js-code > script
        let extractedCode: string | null = null;

        if (matches.length > 0) {
          extractedCode = decodeHtmlEntities(matches[0][1]);
          console.log(`   📋 Código encontrado en formato sb-code`);
        } else if (standardMatches.length > 0) {
          extractedCode = decodeHtmlEntities(standardMatches[0][1]);
          console.log(`   📋 Código encontrado en formato estándar`);
        } else if (codeOnlyMatches.length > 0) {
          extractedCode = decodeHtmlEntities(codeOnlyMatches[0][1]);
          console.log(`   📋 Código encontrado en formato code-only`);
        } else if (jsMatches.length > 0) {
          extractedCode = jsMatches[0][1];
          console.log(`   📋 Código encontrado como JavaScript directo`);
        } else if (scriptMatches.length > 0) {
          extractedCode = scriptMatches[0][1];
          console.log(`   📋 Código encontrado en script inline`);
        }

        if (extractedCode) {
          // Separar HTML y JS
          const htmlMatch = extractedCode.match(/<[^>]+>[\s\S]*?<\/[^>]+>/);
          const jsMatch = extractedCode.match(
            /window\.UBITS\.[\s\S]*?create\([\s\S]*?\{[\s\S]*?\}[\s\S]*?\)/
          );

          codeFromTab = {
            html: htmlMatch
              ? htmlMatch[0]
              : extractedCode.includes('<')
                ? extractedCode
                : '',
            js: jsMatch
              ? jsMatch[0]
              : extractedCode.includes('window.UBITS')
                ? extractedCode
                : undefined,
          };

          console.log(
            `   ✅ Código extraído desde URL de historia: ${codeFromTab.html.length} caracteres HTML, ${codeFromTab.js?.length || 0} caracteres JS`
          );
        } else {
          throw new Error('No se encontró código en la URL de la historia');
        }
      } catch (extractError: any) {
        console.warn(
          `   ⚠️ No se pudo extraer desde URL de historia: ${extractError.message}`
        );
      }
    } catch (fetchError: any) {
      console.warn(
        `   ⚠️ Error obteniendo HTML de historia: ${fetchError.message}`
      );
    }
  }

  // INTENTO 2: Intentar desde Docs (último recurso, puede requerir Browser MCP)
  if (!codeFromTab || !codeFromTab.html) {
    console.log(`   📋 Intentando extraer desde Docs...`);
    // ⚠️ CRÍTICO: Usar encodedComponentId para codificar caracteres especiales
    const encodedIdForDocs = encodeURIComponent(
      exactComponentId || componentId
    );
    const docsUrl = `${activeConfig.url}/?path=/docs/${encodedIdForDocs}--docs`;

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

  // ⚠️ NUEVO: INTENTO 4: Extraer desde código fuente local (fallback prioritario)
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
        // Extraer código de la historia específica
        const storyCode = extractStoryCodeFromSource(
          sourceCode,
          finalStoryName
        );

        if (storyCode && storyCode.length > 20) {
          codeFromTab = { html: storyCode, js: undefined };
          console.log(
            `   ✅ Código extraído desde código fuente local: ${storyCode.length} caracteres`
          );
        } else {
          // Si no hay historia específica, buscar cualquier código en el archivo
          const allCodeMatches = Array.from(
            sourceCode.matchAll(/code:\s*`([\s\S]*?)`/g)
          );
          if (allCodeMatches.length > 0) {
            // Seleccionar el match más largo (probablemente el correcto)
            const longestMatch = allCodeMatches.reduce((longest, current) =>
              (current[1]?.length || 0) > (longest[1]?.length || 0)
                ? current
                : longest
            );

            if (longestMatch && longestMatch[1]) {
              const code = longestMatch[1]
                .replace(/\\n/g, '\n')
                .replace(/\\`/g, '`')
                .replace(/\\'/g, "'")
                .replace(/\\"/g, '"')
                .trim();

              if (code.length > 20) {
                codeFromTab = { html: code, js: undefined };
                console.log(
                  `   ✅ Código extraído desde código fuente local (cualquier historia): ${code.length} caracteres`
                );
              }
            }
          }
        }
      }
    } catch (sourceError: any) {
      console.warn(
        `   ⚠️ Error extrayendo desde código fuente local: ${sourceError.message}`
      );
    }
  }

  // ⚠️ NUEVO: INTENTO 5: Extraer desde documentación local (docs/referencia/componentes/)
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
          codeFromTab = { html: docResult.html, js: undefined };
          console.log(
            `   ✅ Código extraído desde documentación local: ${docResult.html.length} caracteres`
          );
        }
      }
    } catch (docError: any) {
      console.warn(
        `   ⚠️ Error extrayendo desde documentación local: ${docError.message}`
      );
    }
  }

  // Si aún no tenemos código, lanzar error
  if (!codeFromTab || !codeFromTab.html) {
    const error = new Error(
      `No se pudo extraer código desde ninguna fuente. ` +
        `Intentado: 1) getComponentCode (Storybook MCP con Playwright), 2) URL de historia (fetch), 3) Docs (fetch), 4) Código fuente local, 5) Documentación local. ` +
        `Verifica que el Storybook MCP esté configurado correctamente con STORYBOOK_URL o que el código fuente/documentación esté disponible.`
    ) as any;
    error.type = 'BROWSER_MCP_REQUIRED';
    // ⚠️ CRÍTICO: Codificar componentId para URLs
    const encodedIdForError = encodeURIComponent(
      exactComponentId || componentId
    );
    error.docsUrl = `${activeConfig.url}/?path=/docs/${encodedIdForError}--docs`;
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

  // Normalizar componentId (remover prefijos)
  const normalizedId = componentId
    .replace('feedback-', '')
    .replace('data-', '')
    .replace('formularios-', '')
    .replace('metricas-', '')
    .replace('charts-', '')
    .toLowerCase();

  // CSS principal del componente - Intentar múltiples rutas
  const possibleCSSPaths = [
    `${storybookBaseUrl}/components/${normalizedId}/src/styles/${normalizedId}.css`,
    `${storybookBaseUrl}/components/${normalizedId}/dist/${normalizedId}.css`,
    `${storybookBaseUrl}/components/${componentId}/src/styles/${componentId}.css`,
    `${storybookBaseUrl}/components/${componentId}/dist/${componentId}.css`,
  ];

  // Verificar cuál existe (usar HEAD request)
  for (const cssUrl of possibleCSSPaths) {
    try {
      const response = await fetch(cssUrl, { method: 'HEAD' });
      if (response.ok) {
        cssUrls.push(cssUrl);
        console.log(`   ✅ CSS encontrado: ${cssUrl}`);
        break; // Usar el primero que existe
      }
    } catch (error) {
      // Continuar con siguiente
    }
  }

  // Si no se encontró, agregar la ruta más común (se intentará cargar)
  if (cssUrls.length === 0) {
    cssUrls.push(
      `${storybookBaseUrl}/components/${normalizedId}/src/styles/${normalizedId}.css`
    );
    console.warn(
      `   ⚠️ CSS no verificado, usando ruta estándar: ${cssUrls[0]}`
    );
  }

  // CSS de dependencias comunes
  if (componentId.includes('modal') || normalizedId.includes('modal')) {
    cssUrls.push(`${storybookBaseUrl}/components/button/src/styles/button.css`);
  }

  return cssUrls;
}

/**
 * Detecta y extrae la URL del bundle UMD de un componente
 */
export async function extractUMDBundleUrl(
  componentId: string,
  storybookBaseUrl: string
): Promise<string | null> {
  // Normalizar componentId
  const normalizedId = componentId
    .replace('feedback-', '')
    .replace('data-', '')
    .replace('formularios-', '')
    .replace('metricas-', '')
    .replace('charts-', '')
    .toLowerCase();

  // Patrones posibles para bundles UMD
  const possiblePaths = [
    `${storybookBaseUrl}/components/${normalizedId}/dist/${normalizedId}.umd.js`,
    `${storybookBaseUrl}/components/${normalizedId}/dist/index.umd.js`,
    `${storybookBaseUrl}/components/${normalizedId}/dist/${normalizedId}.js`,
    `${storybookBaseUrl}/components/${componentId}/dist/${componentId}.umd.js`,
    `${storybookBaseUrl}/components/${componentId}/dist/index.umd.js`,
    `${storybookBaseUrl}/components/${componentId}/dist/${componentId}.js`,
  ];

  // Verificar cuál existe
  for (const url of possiblePaths) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        console.log(`   ✅ Bundle UMD encontrado: ${url}`);
        return url;
      }
    } catch (error) {
      // Continuar con siguiente
    }
  }

  console.warn(`   ⚠️ No se encontró bundle UMD para ${componentId}`);
  return null;
}

/**
 * Extrae código de inicialización desde el HTML extraído
 */
export function extractInitializationCode(
  html: string,
  componentId: string
): string | null {
  // Normalizar componentId para buscar patrones
  const normalizedId = componentId
    .replace('feedback-', '')
    .replace('data-', '')
    .replace('formularios-', '')
    .replace('metricas-', '')
    .replace('charts-', '')
    .toLowerCase();

  // Convertir a PascalCase para nombres de funciones
  const pascalCase = normalizedId
    .split('-')
    .map((word) => {
      const acronyms = ['nps', 'api', 'ui', 'ux', 'id', 'url'];
      if (acronyms.includes(word.toLowerCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');

  // Buscar patrones comunes de inicialización:
  // 1. window.createDataView, window.createButton, etc.
  const createPattern = new RegExp(
    `window\\.create${pascalCase}\\s*\\([\\s\\S]*?\\);?`,
    'i'
  );

  // 2. window.UBITS.DataView.create, etc.
  const ubitsCreatePattern = new RegExp(
    `window\\.UBITS\\.${pascalCase}\\.create\\s*\\([\\s\\S]*?\\);?`,
    'i'
  );

  // 3. window.UBITSDataView.createDataView, etc.
  const ubitsGlobalPattern = new RegExp(
    `window\\.UBITS${pascalCase}\\.create${pascalCase}\\s*\\([\\s\\S]*?\\);?`,
    'i'
  );

  // 4. Patrón genérico: window.UBITS.*.create(...)
  const genericUBITSPattern =
    /window\.UBITS\.[\s\S]*?\.create\s*\([\s\S]*?\);?/i;

  // 5. Patrón genérico: window.create*(...)
  const genericCreatePattern = /window\.create\w+\s*\([\s\S]*?\);?/i;

  // Priorizar: específico > genérico
  const patterns = [
    createPattern,
    ubitsCreatePattern,
    ubitsGlobalPattern,
    genericUBITSPattern,
    genericCreatePattern,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      console.log(
        `   ✅ Código de inicialización encontrado: ${match[0].substring(0, 50)}...`
      );
      return match[0].trim();
    }
  }

  console.warn(
    `   ⚠️ No se encontró código de inicialización para ${componentId}`
  );
  return null;
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
 *
 * ⚠️ EXPORTADO: Para uso en otros extractores
 */
export function extractStoryCodeFromSource(
  sourceCode: string,
  storyName: string
): string | null {
  // ⚠️ NUEVO: Priorizar extracción desde parameters.docs.source.code (más confiable)
  // Buscar específicamente para historias "Implementation" o "implementation"
  if (storyName.toLowerCase().includes('implementation')) {
    // ⚠️ CRÍTICO: Buscar "Implementation" con mayúscula primero (como está en el código fuente)
    // Luego buscar con el nombre exacto de la historia
    const implementationPatterns = [
      `export\\s+const\\s+Implementation[\\s\\S]*?code:\\s*\`([\\s\\S]*?)\`;?`, // "Implementation" con mayúscula
      `export\\s+const\\s+${storyName}[\\s\\S]*?code:\\s*\`([\\s\\S]*?)\`;?`, // Nombre exacto de la historia
    ];

    let storySection: RegExpMatchArray | null = null;
    for (const pattern of implementationPatterns) {
      storySection = sourceCode.match(new RegExp(pattern, 'i'));
      if (storySection && storySection[1]) {
        break;
      }
    }

    if (storySection && storySection[1]) {
      const code = storySection[1]
        .replace(/\\n/g, '\n')
        .replace(/\\`/g, '`')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .trim();

      if (code.length > 20) {
        console.log(
          `   ✅ Código extraído desde parameters.docs.source.code (${code.length} caracteres)`
        );
        return code;
      }
    }

    // Fallback: buscar cualquier code: `...` en el archivo (puede estar en cualquier historia)
    // ⚠️ MEJORADO: Buscar el más largo (probablemente el correcto)
    const allCodeMatches = Array.from(
      sourceCode.matchAll(/code:\s*`([\s\S]*?)`/g)
    );
    if (allCodeMatches.length > 0) {
      // Seleccionar el match más largo (probablemente el correcto)
      const longestMatch = allCodeMatches.reduce((longest, current) =>
        (current[1]?.length || 0) > (longest[1]?.length || 0)
          ? current
          : longest
      );

      if (longestMatch && longestMatch[1]) {
        const code = longestMatch[1]
          .replace(/\\n/g, '\n')
          .replace(/\\`/g, '`')
          .replace(/\\'/g, "'")
          .replace(/\\"/g, '"')
          .trim();

        if (code.length > 20) {
          console.log(
            `   ✅ Código extraído desde code: (${code.length} caracteres)`
          );
          return code;
        }
      }
    }
  }

  // Buscar la historia específica en el código fuente
  const storyRegex = new RegExp(
    `export\\s+const\\s+${storyName}\\s*[:=]\\s*([\\s\\S]*?)(?:export|const|function|\\/\\*|$)`,
    'i'
  );
  const match = sourceCode.match(storyRegex);

  if (match) {
    // Extraer el código de la historia
    let storyCode = match[1].trim();

    // ⚠️ NUEVO: Buscar parameters.docs.source.code dentro de la historia
    // Buscar específicamente code: `...` (template string con backticks)
    const sourceCodeInStory = storyCode.match(/code:\s*`([\s\S]*?)`/);
    if (sourceCodeInStory && sourceCodeInStory[1]) {
      const code = sourceCodeInStory[1]
        .replace(/\\n/g, '\n')
        .replace(/\\`/g, '`')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .trim();

      if (code.length > 20) {
        console.log(
          `   ✅ Código extraído desde parameters.docs.source.code dentro de la historia (${code.length} caracteres)`
        );
        return code;
      }
    }

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
