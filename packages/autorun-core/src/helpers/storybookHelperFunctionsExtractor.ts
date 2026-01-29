/**
 * Storybook Helper Functions Extractor
 *
 * Extrae funciones helper y configuraciones desde Storybook
 * para evitar hardcodeo en las implementaciones
 */

export interface HelperFunctionsResult {
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
  source: 'storybook-stories' | 'storybook-docs' | 'source-code' | 'not-found';
}

/**
 * Extrae funciones helper desde el archivo de stories de Storybook
 *
 * @param componentId - ID del componente (ej: "layout-card-content")
 * @returns Funciones helper y configuraciones extraídas
 */
export async function extractHelperFunctionsFromStorybook(
  componentId: string
): Promise<HelperFunctionsResult> {
  console.log(
    `🔍 [Helper Functions Extractor] Extrayendo funciones helper para: ${componentId}`
  );

  const result: HelperFunctionsResult = {
    configs: {},
    source: 'not-found',
  };

  try {
    // PASO 1: Intentar extraer desde el archivo de stories directamente
    const storiesFile = await extractFromStoriesFile(componentId);
    if (storiesFile.getProviderLogo || storiesFile.buildCardData) {
      console.log(`   ✅ Funciones helper encontradas en archivo de stories`);
      return {
        ...storiesFile,
        source: 'storybook-stories',
      };
    }

    // PASO 2: Intentar extraer desde la historia "implementation" completa
    const implementationCode =
      await extractFromImplementationStory(componentId);
    if (
      implementationCode.getProviderLogo ||
      implementationCode.buildCardData
    ) {
      console.log(
        `   ✅ Funciones helper encontradas en historia "implementation"`
      );
      return {
        ...implementationCode,
        source: 'storybook-stories',
      };
    }

    // PASO 3: Intentar extraer desde Docs (pestaña "Code")
    const docsCode = await extractFromDocs(componentId);
    if (docsCode.getProviderLogo || docsCode.buildCardData) {
      console.log(`   ✅ Funciones helper encontradas en Docs`);
      return {
        ...docsCode,
        source: 'storybook-docs',
      };
    }

    // PASO 4: Intentar extraer desde código fuente como último recurso
    const sourceCode = await extractFromSourceCode(componentId);
    if (sourceCode.getProviderLogo || sourceCode.renderIconHelper) {
      console.log(`   ✅ Funciones helper encontradas en código fuente`);
      return {
        ...sourceCode,
        source: 'source-code',
      };
    }

    console.warn(
      `   ⚠️ No se encontraron funciones helper para ${componentId}`
    );
    return result;
  } catch (error: any) {
    console.error(`   ❌ Error extrayendo funciones helper: ${error.message}`);
    return result;
  }
}

/**
 * Extrae funciones helper desde el archivo de stories
 */
async function extractFromStoriesFile(
  componentId: string
): Promise<HelperFunctionsResult> {
  // Mapear componentId a ruta del archivo de stories
  const storiesPath = mapComponentIdToStoriesPath(componentId);

  if (!storiesPath) {
    return { configs: {}, source: 'not-found' };
  }

  try {
    const fs = await import('fs/promises');
    const path = await import('path');

    const fullPath = path.join(process.cwd(), storiesPath);
    const fileContent = await fs.readFile(fullPath, 'utf-8');

    // Extraer función getProviderLogo (puede estar en múltiples líneas con tabs)
    // Buscar desde "function getProviderLogo" hasta el cierre de la función
    const getProviderLogoStart = fileContent.indexOf(
      'function getProviderLogo'
    );
    let getProviderLogo: string | undefined;

    if (getProviderLogoStart !== -1) {
      // Buscar el cierre de la función contando llaves
      let braceCount = 0;
      let startPos = fileContent.indexOf('{', getProviderLogoStart);
      let endPos = startPos;

      if (startPos !== -1) {
        for (let i = startPos; i < fileContent.length; i++) {
          if (fileContent[i] === '{') braceCount++;
          if (fileContent[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              endPos = i + 1;
              break;
            }
          }
        }

        getProviderLogo = fileContent.substring(getProviderLogoStart, endPos);
      }
    }

    // Extraer función buildCardData (puede estar en múltiples líneas con tabs)
    const buildCardDataStart = fileContent.indexOf('function buildCardData');
    let buildCardData: string | undefined;

    if (buildCardDataStart !== -1) {
      // Buscar el cierre de la función contando llaves
      let braceCount = 0;
      let startPos = fileContent.indexOf('{', buildCardDataStart);
      let endPos = startPos;

      if (startPos !== -1) {
        for (let i = startPos; i < fileContent.length; i++) {
          if (fileContent[i] === '{') braceCount++;
          if (fileContent[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              endPos = i + 1;
              break;
            }
          }
        }

        buildCardData = fileContent.substring(buildCardDataStart, endPos);
      }
    }

    // Extraer PROVIDERS del import (viene de cardConfigs.ts)
    // Buscar import de PROVIDERS
    const providersImportMatch = fileContent.match(
      /import\s*\{[^}]*PROVIDERS[^}]*\}\s*from\s*['"]([^'"]+)['"]/
    );

    let PROVIDERS: Record<string, string> | undefined;

    // Si hay import de PROVIDERS, leer desde el archivo fuente
    if (providersImportMatch) {
      const importPath = providersImportMatch[1];
      try {
        const fs = await import('fs/promises');
        const path = await import('path');

        // Resolver ruta relativa desde el archivo de stories
        const storiesDir = path.dirname(fullPath);
        let resolvedPath = path.resolve(storiesDir, importPath);

        // Si no tiene extensión, agregar .ts
        if (!resolvedPath.endsWith('.ts') && !resolvedPath.endsWith('.js')) {
          resolvedPath += '.ts';
        }

        let configFileContent: string;

        // Intentar leer desde ruta resuelta
        try {
          configFileContent = await fs.readFile(resolvedPath, 'utf-8');
          console.log(`   ✅ Archivo encontrado en: ${resolvedPath}`);
        } catch (e1: any) {
          // Si falla, intentar desde raíz del proyecto (ruta alternativa)
          console.log(
            `   🔍 Ruta resuelta no funciona, intentando ruta alternativa...`
          );
          const altPath = path.join(
            process.cwd(),
            'vendor/ubits/packages/components/card/src/configs/cardConfigs.ts'
          );
          configFileContent = await fs.readFile(altPath, 'utf-8');
          console.log(
            `   ✅ Archivo encontrado en ruta alternativa: ${altPath}`
          );
        }

        // Extraer PROVIDERS del archivo de configuración
        // Buscar desde "export const PROVIDERS" hasta el cierre del objeto
        const providersStart = configFileContent.indexOf(
          'export const PROVIDERS'
        );
        if (providersStart !== -1) {
          let braceCount = 0;
          let startPos = configFileContent.indexOf('{', providersStart);
          let endPos = startPos;

          if (startPos !== -1) {
            for (let i = startPos; i < configFileContent.length; i++) {
              if (configFileContent[i] === '{') braceCount++;
              if (configFileContent[i] === '}') {
                braceCount--;
                if (braceCount === 0) {
                  endPos = i + 1;
                  break;
                }
              }
            }

            const providersCode = configFileContent.substring(startPos, endPos);
            PROVIDERS = extractProvidersFromCode(providersCode);
          }
        }
      } catch (e) {
        console.warn(`   ⚠️ Error leyendo PROVIDERS desde ${importPath}: ${e}`);
      }
    }

    // También buscar PROVIDERS directamente en el archivo de stories (por si está definido ahí)
    if (!PROVIDERS) {
      const providersMatch = fileContent.match(
        /PROVIDERS[^=]*=\s*\{[\s\S]*?\n\s*\}/m
      );
      if (providersMatch) {
        try {
          PROVIDERS = extractProvidersFromCode(providersMatch[0]);
        } catch (e) {
          console.warn(`   ⚠️ Error parseando PROVIDERS: ${e}`);
        }
      }
    }

    return {
      getProviderLogo,
      buildCardData,
      configs: {
        PROVIDERS,
      },
      source: 'storybook-stories',
    };
  } catch (error: any) {
    console.warn(`   ⚠️ Error leyendo archivo de stories: ${error.message}`);
    return { configs: {}, source: 'not-found' };
  }
}

/**
 * Extrae funciones helper desde la historia "implementation"
 *
 * ⚠️ NOTA: Esta función requiere MCP, pero si no está disponible,
 * se usa extractFromStoriesFile como fallback
 */
async function extractFromImplementationStory(
  componentId: string
): Promise<HelperFunctionsResult> {
  // Por ahora, esta función no se usa porque las funciones helper
  // están en el archivo de stories, no en el código de la historia "implementation"
  // La historia "implementation" solo muestra el código de uso, no las funciones helper

  // Si en el futuro necesitamos extraer desde la historia, podemos implementarlo aquí
  return { configs: {}, source: 'not-found' };
}

/**
 * Extrae funciones helper desde Docs
 */
async function extractFromDocs(
  componentId: string
): Promise<HelperFunctionsResult> {
  // Por ahora, Docs no contiene funciones helper directamente
  // Se puede extraer desde la pestaña "Code" si está disponible
  return { configs: {}, source: 'not-found' };
}

/**
 * Extrae funciones helper desde el código fuente
 */
async function extractFromSourceCode(
  componentId: string
): Promise<HelperFunctionsResult> {
  // Mapear componentId a ruta del código fuente
  const sourcePath = mapComponentIdToSourcePath(componentId);

  if (!sourcePath) {
    return { configs: {}, source: 'not-found' };
  }

  try {
    const fs = await import('fs/promises');
    const path = await import('path');

    const fullPath = path.join(process.cwd(), sourcePath);
    const fileContent = await fs.readFile(fullPath, 'utf-8');

    // Extraer función renderIconHelper
    const renderIconHelperMatch = fileContent.match(
      /function\s+renderIconHelper\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\}/m
    );
    const renderIconHelper = renderIconHelperMatch
      ? renderIconHelperMatch[0]
      : undefined;

    return {
      renderIconHelper,
      configs: {},
      source: 'source-code',
    };
  } catch (error: any) {
    console.warn(`   ⚠️ Error leyendo código fuente: ${error.message}`);
    return { configs: {}, source: 'not-found' };
  }
}

/**
 * Mapea componentId a ruta del archivo de stories
 */
function mapComponentIdToStoriesPath(componentId: string): string | null {
  // Mapeo de componentId a ruta de stories
  const mapping: Record<string, string> = {
    'layout-card-content':
      'vendor/ubits/packages/storybook/stories/components/CardContent/CardContent.stories.ts',
    'layout-simple-card':
      'vendor/ubits/packages/storybook/stories/components/SimpleCard/SimpleCard.stories.ts',
    // Agregar más mapeos según sea necesario
  };

  return mapping[componentId] || null;
}

/**
 * Mapea componentId a ruta del código fuente
 */
function mapComponentIdToSourcePath(componentId: string): string | null {
  // Mapeo de componentId a ruta del código fuente
  const mapping: Record<string, string> = {
    'layout-card-content':
      'vendor/ubits/packages/components/card/src/CardContentProvider.ts',
    'layout-simple-card':
      'vendor/ubits/packages/components/card/src/SimpleCardProvider.ts',
    // Agregar más mapeos según sea necesario
  };

  return mapping[componentId] || null;
}

/**
 * Extrae PROVIDERS desde código
 */
function extractProvidersFromCode(code: string): Record<string, string> {
  const providers: Record<string, string> = {};

  // Buscar patrones como:
  // 'UBITS': 'assets/images/Favicons/UBITS.jpg' (con comillas en clave)
  // UBITS: 'assets/images/Favicons/UBITS.jpg' (sin comillas en clave)
  // "UBITS": "assets/images/Favicons/UBITS.jpg" (comillas dobles)

  // Patrón 1: Clave con comillas
  const quotedMatches = code.matchAll(
    /['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/g
  );

  for (const match of quotedMatches) {
    const key = match[1].trim();
    const value = match[2].trim();
    // Solo agregar si parece un provider (tiene "images" o "Favicons" en la ruta)
    if (value.includes('images') || value.includes('Favicons')) {
      providers[key] = value;
    }
  }

  // Patrón 2: Clave sin comillas (identificador JavaScript válido)
  const unquotedMatches = code.matchAll(
    /([A-Za-z_$][A-Za-z0-9_$]*)\s*:\s*['"]([^'"]+)['"]/g
  );

  for (const match of unquotedMatches) {
    const key = match[1].trim();
    const value = match[2].trim();
    // Solo agregar si parece un provider (tiene "images" o "Favicons" en la ruta)
    // Y si no es una palabra reservada
    if (
      (value.includes('images') || value.includes('Favicons')) &&
      !['Record', 'string', 'export', 'const', 'PROVIDERS'].includes(key) &&
      !providers[key] // No sobrescribir si ya existe
    ) {
      providers[key] = value;
    }
  }

  return providers;
}
