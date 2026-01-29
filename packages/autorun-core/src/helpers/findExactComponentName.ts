/**
 * ⚠️ CRÍTICO: Buscar nombre exacto del componente en la lista de Storybook
 *
 * Este helper DEBE ejecutarse PRIMERO antes de consultar Storybook MCP o navegar a Storybook.
 *
 * Flujo correcto:
 * 1. Consultar getComponentList() del Storybook MCP
 * 2. Buscar el componente en la lista (puede ser "cardcontent", "layout-card-content", "CardContent", etc.)
 * 3. Retornar el nombre exacto encontrado
 * 4. Usar ese nombre exacto para consultar props y navegar
 */

import { callStorybookMCPTool } from './mcpClient.js';

export interface FindExactComponentNameResult {
  found: boolean;
  exactName?: string;
  storybookId?: string;
  allMatches?: string[];
  error?: string;
}

/**
 * Busca el nombre exacto del componente en la lista de componentes disponibles en Storybook
 *
 * @param componentName Nombre del componente detectado (ej: "CardContent", "contentcard", "card-content")
 * @returns Resultado con el nombre exacto encontrado
 */
export async function findExactComponentName(
  componentName: string
): Promise<FindExactComponentNameResult> {
  console.log(
    `\n🔍 [Find Exact Component Name] ========================================`
  );
  console.log(
    `🔍 [Find Exact Component Name] Buscando nombre exacto para: ${componentName}`
  );

  try {
    // PASO 1: Consultar index.json directamente desde Storybook (sin MCP)
    console.log(
      `🔍 [Find Exact Component Name] PASO 1: Consultando lista de componentes desde Storybook index.json...`
    );

    // Usar StorybookDynamicMapper que consulta index.json directamente
    let componentList: string[] = [];

    try {
      const { StorybookDynamicMapper } = await import(
        './storybookDynamicMapper.js'
      );
      const mappingCache =
        await StorybookDynamicMapper.getMappingsFromStorybook();

      if (mappingCache && mappingCache.mappings) {
        // Extraer lista de nombres completos de componentes
        componentList = mappingCache.mappings.map((m) => m.fullName);
        console.log(
          `✅ [Find Exact Component Name] Lista obtenida desde index.json: ${componentList.length} componentes`
        );

        // PASO 2: Buscar el componente en la lista
        console.log(
          `🔍 [Find Exact Component Name] PASO 2: Buscando "${componentName}" en la lista...`
        );

        const normalizedSearch = componentName.toLowerCase().trim();
        const allMatches: { fullName: string; id: string }[] = [];

        for (const mapping of mappingCache.mappings) {
          const component = mapping.fullName;
          const normalizedComponent = component.toLowerCase().trim();

          // 1. Búsqueda exacta
          if (normalizedComponent === normalizedSearch) {
            console.log(
              `✅ [Find Exact Component Name] Coincidencia exacta encontrada: ${component}`
            );
            return {
              found: true,
              exactName: component,
              storybookId: mapping.componentId,
              allMatches: [component],
            };
          }

          // 2. Búsqueda por nombre sin categoría (ej: "CardContent" en "Layout/Card Content")
          const componentNameOnly =
            normalizedComponent.split('/').pop() || normalizedComponent;
          const searchNameOnly =
            normalizedSearch.split('/').pop() || normalizedSearch;

          if (
            componentNameOnly === searchNameOnly ||
            componentNameOnly.replace(/\s+/g, '-') === searchNameOnly ||
            componentNameOnly.replace(/\s+/g, '') === searchNameOnly
          ) {
            allMatches.push({ fullName: component, id: mapping.componentId });
          }

          // 3. Búsqueda parcial
          if (
            normalizedComponent.includes(normalizedSearch) ||
            normalizedSearch.includes(componentNameOnly)
          ) {
            if (!allMatches.some((m) => m.fullName === component)) {
              allMatches.push({ fullName: component, id: mapping.componentId });
            }
          }

          // 4. Búsqueda por variantes comunes
          const variants = [
            normalizedSearch.replace(/\s+/g, '-'),
            normalizedSearch.replace(/\s+/g, ''),
            normalizedSearch.replace(/-/g, ''),
            normalizedSearch.replace(/-/g, ' '),
          ];

          for (const variant of variants) {
            if (
              normalizedComponent.includes(variant) ||
              componentNameOnly.includes(variant)
            ) {
              if (!allMatches.some((m) => m.fullName === component)) {
                allMatches.push({
                  fullName: component,
                  id: mapping.componentId,
                });
              }
            }
          }
        }

        // Si hay coincidencias, retornar la primera (más probable)
        if (allMatches.length > 0) {
          const bestMatch = allMatches[0];
          console.log(
            `✅ [Find Exact Component Name] Coincidencia encontrada: ${bestMatch.fullName}`
          );
          console.log(
            `   📋 Todas las coincidencias: ${allMatches.map((m) => m.fullName).join(', ')}`
          );
          return {
            found: true,
            exactName: bestMatch.fullName,
            storybookId: bestMatch.id,
            allMatches: allMatches.map((m) => m.fullName),
          };
        }
      } else {
        throw new Error('No se pudo obtener mapeo de componentes');
      }
    } catch (mapperError: any) {
      console.warn(
        `⚠️ [Find Exact Component Name] Error usando StorybookDynamicMapper: ${mapperError.message}`
      );
      console.warn(
        `⚠️ [Find Exact Component Name] Intentando fallback a MCP...`
      );

      // Fallback: Intentar MCP solo si el mapper falla
      try {
        const listResult = await callStorybookMCPTool('getComponentList', {});

        if (
          !listResult ||
          !listResult.content ||
          !Array.isArray(listResult.content)
        ) {
          throw new Error('getComponentList no retornó lista válida');
        }

        // Extraer lista de componentes del MCP
        const content = listResult.content[0];

        if (content && content.text) {
          try {
            const parsed = JSON.parse(content.text);
            if (Array.isArray(parsed)) {
              componentList = parsed;
            } else if (parsed.components && Array.isArray(parsed.components)) {
              componentList = parsed.components;
            } else if (typeof parsed === 'string') {
              // Si es texto plano, parsear líneas
              const lines = parsed.split('\n');
              componentList = lines
                .filter(
                  (line: string) =>
                    line.trim() && !line.includes('Available components:')
                )
                .map((line: string) => line.trim());
            }
          } catch (parseError) {
            // Si no es JSON, intentar parsear como texto
            const text = content.text;
            if (text.includes('Available components:')) {
              const lines = text.split('\n');
              componentList = lines
                .filter(
                  (line) =>
                    line.trim() && !line.includes('Available components:')
                )
                .map((line) => line.trim());
            } else {
              // Intentar como array de líneas
              componentList = text
                .split('\n')
                .map((line: string) => line.trim())
                .filter((line: string) => line);
            }
          }
        }
      } catch (mcpError: any) {
        console.error(
          `❌ [Find Exact Component Name] Error en fallback MCP: ${mcpError.message}`
        );
        return {
          found: false,
          error: `No se pudo obtener lista de componentes: ${mapperError.message}, ${mcpError.message}`,
        };
      }

      if (componentList.length === 0) {
        console.error(
          `❌ [Find Exact Component Name] Error: No se encontraron componentes en la lista`
        );
        return {
          found: false,
          error: 'No se encontraron componentes en la lista',
        };
      }

      // PASO 2: Buscar el componente en la lista (Lógica duplicada para fallback MCP)
      console.log(
        `🔍 [Find Exact Component Name] PASO 2 (Fallback): Buscando "${componentName}" en la lista...`
      );

      const normalizedSearch = componentName.toLowerCase().trim();
      const allMatches: string[] = [];

      for (const component of componentList) {
        const normalizedComponent = component.toLowerCase().trim();

        if (normalizedComponent === normalizedSearch) {
          return {
            found: true,
            exactName: component,
            storybookId: componentToStorybookId(component),
            allMatches: [component],
          };
        }

        const componentNameOnly =
          normalizedComponent.split('/').pop() || normalizedComponent;
        const searchNameOnly =
          normalizedSearch.split('/').pop() || normalizedSearch;

        if (
          componentNameOnly === searchNameOnly ||
          componentNameOnly.replace(/\s+/g, '-') === searchNameOnly ||
          componentNameOnly.replace(/\s+/g, '') === searchNameOnly
        ) {
          allMatches.push(component);
        }
      }

      if (allMatches.length > 0) {
        return {
          found: true,
          exactName: allMatches[0],
          storybookId: componentToStorybookId(allMatches[0]),
          allMatches,
        };
      }
    }

    // Si llegamos aquí sin retornar, no se encontró
    console.error(
      `❌ [Find Exact Component Name] No se encontró "${componentName}" en la lista`
    );
    return {
      found: false,
      error: `No se encontró "${componentName}" en la lista de componentes`,
      allMatches: [],
    };
  } catch (error: any) {
    console.error(`❌ [Find Exact Component Name] Error: ${error.message}`);
    return {
      found: false,
      error: error.message,
    };
  }
}

/**
 * Convierte un nombre de componente a ID de Storybook
 * Ejemplo: "Layout/Card Content" → "layout-card-content"
 */
function componentToStorybookId(componentName: string): string {
  return componentName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
