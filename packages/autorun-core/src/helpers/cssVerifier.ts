/**
 * CSS Verifier
 *
 * Verifica y carga CSS de componentes automáticamente
 */

export interface CSSVerificationResult {
  loaded: boolean;
  cssUrls: string[];
  missingUrls: string[];
  errors: string[];
}

/**
 * Verifica que el CSS de un componente esté cargado en el template
 *
 * @param componentId - ID del componente (ej: "modal")
 * @param templatePath - Ruta al template HTML
 * @returns Resultado de verificación
 */
export async function verifyAndLoadCSS(
  componentId: string,
  templatePath: string
): Promise<CSSVerificationResult> {
  console.log(`🔍 [CSS Verifier] Verificando CSS para: ${componentId}`);

  const result: CSSVerificationResult = {
    loaded: false,
    cssUrls: [],
    missingUrls: [],
    errors: [],
  };

  try {
    // 1. Obtener URLs de CSS requeridas
    const cssUrls = await getCSSUrlsForComponent(componentId);
    result.cssUrls = cssUrls;

    // 2. Leer template
    const fs = await import('fs/promises');
    let templateContent = await fs.readFile(templatePath, 'utf-8');

    // 3. Verificar qué CSS ya está cargado
    const loadedUrls: string[] = [];
    const missingUrls: string[] = [];

    for (const cssUrl of cssUrls) {
      const isLoaded = templateContent.includes(cssUrl);
      if (isLoaded) {
        loadedUrls.push(cssUrl);
      } else {
        missingUrls.push(cssUrl);
      }
    }

    result.missingUrls = missingUrls;

    // 4. Cargar CSS faltante
    if (missingUrls.length > 0) {
      console.log(
        `   📦 Cargando ${missingUrls.length} archivo(s) CSS faltante(s)...`
      );

      // Encontrar posición para insertar (antes de </head> o al inicio de <head>)
      const headMatch = templateContent.match(/<head[^>]*>/i);
      const headCloseMatch = templateContent.match(/<\/head>/i);

      if (headMatch && headCloseMatch) {
        // Insertar antes de </head>
        const cssLinks = missingUrls
          .map((url) => `  <link rel="stylesheet" href="${url}" />`)
          .join('\n');

        const insertPosition = headCloseMatch.index!;
        templateContent =
          templateContent.slice(0, insertPosition) +
          cssLinks +
          '\n' +
          templateContent.slice(insertPosition);

        // Guardar template actualizado
        await fs.writeFile(templatePath, templateContent, 'utf-8');

        console.log(`   ✅ CSS agregado al template`);
      } else {
        result.errors.push('No se encontró <head> en el template');
      }
    }

    // 5. Verificar resultado final
    result.loaded = missingUrls.length === 0;

    if (result.loaded) {
      console.log(`✅ [CSS Verifier] CSS verificado y cargado correctamente`);
    } else {
      console.warn(
        `⚠️  [CSS Verifier] Algunos CSS no se pudieron cargar: ${result.missingUrls.join(', ')}`
      );
    }

    return result;
  } catch (error: any) {
    result.errors.push(error.message);
    console.error(`❌ [CSS Verifier] Error: ${error.message}`);
    return result;
  }
}

/**
 * Obtiene URLs de CSS para un componente
 */
async function getCSSUrlsForComponent(componentId: string): Promise<string[]> {
  // ⚠️ CRÍTICO: NO usar URL hardcodeada de UBITS
  // Usar SOLO el Storybook activo del StorybookManager
  const { StorybookManager } = await import('./storybookManager');
  const manager = StorybookManager.getInstance();
  const activeConfig = await manager.getActiveConfig();

  if (!activeConfig) {
    throw new Error(
      `❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`
    );
  }

  const baseUrl = activeConfig.url;
  const cssUrls: string[] = [];

  // CSS principal del componente
  // Intentar diferentes estructuras posibles
  const possiblePaths = [
    `/components/${componentId}/src/styles/${componentId}.css`,
    `/addons/${componentId}/src/styles/${componentId}.css`,
    `/components/${componentId}/dist/${componentId}.css`,
  ];

  // Para componentes específicos, usar rutas conocidas
  const componentPaths: Record<string, string[]> = {
    modal: [
      `${baseUrl}/components/modal/src/styles/modal.css`,
      `${baseUrl}/components/button/src/styles/button.css`, // Dependencia
    ],
    'data-table': [
      `${baseUrl}/components/data-table/src/styles/data-table.css`,
    ],
    button: [`${baseUrl}/components/button/src/styles/button.css`],
    tabs: [`${baseUrl}/components/tabs/src/styles/tabs.css`],
  };

  if (componentPaths[componentId]) {
    return componentPaths[componentId];
  }

  // Fallback: usar primera ruta posible
  cssUrls.push(`${baseUrl}${possiblePaths[0]}`);

  return cssUrls;
}

/**
 * Verifica que un CSS específico esté cargado en el template
 */
export async function checkCSSLoaded(
  cssUrl: string,
  templatePath: string
): Promise<boolean> {
  try {
    const fs = await import('fs/promises');
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    return templateContent.includes(cssUrl);
  } catch {
    return false;
  }
}
