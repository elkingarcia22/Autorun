/**
 * ✅ Tool: autorun.discoverComponent
 *
 * ⚠️ CRÍTICO: Descubre el nombre exacto del componente en Storybook
 * NUNCA adivinar nombres - siempre consultar getComponentList() primero
 *
 * Flujo:
 * 1. Consulta getComponentList() del Storybook MCP
 * 2. Busca coincidencias con el término de búsqueda
 * 3. Retorna el nombre exacto del componente encontrado
 */

import type {
  AutorunDiscoverComponentInput,
  AutorunDiscoverComponentOutput,
} from '../types.js';

/**
 * ✅ Descubre el nombre exacto del componente en Storybook
 *
 * ⚠️ CRÍTICO: NUNCA adivinar nombres. Siempre consultar getComponentList() primero.
 */
export async function autorunDiscoverComponent(
  input: AutorunDiscoverComponentInput
): Promise<AutorunDiscoverComponentOutput> {
  console.error(
    '\n🔍 [autorun.discoverComponent] ========================================'
  );
  console.error('🔍 [autorun.discoverComponent] Iniciando descubrimiento...');
  console.error(`   🔍 Término de búsqueda: "${input.searchTerm}"`);

  try {
    // PASO 1: Consultar getComponentList() del Storybook MCP
    console.error('   📋 [PASO 1] Consultando lista de componentes...');

    // Intentar usar el cliente MCP si está disponible
    let componentList: string[] = [];

    try {
      const { callStorybookMCPTool } = await import(
        '../../helpers/mcpClient.js'
      );
      const listResult = await callStorybookMCPTool('getComponentList', {});

      if (
        listResult &&
        listResult.content &&
        Array.isArray(listResult.content)
      ) {
        // Extraer lista de componentes del resultado
        const content = listResult.content[0];
        if (content && content.text) {
          try {
            const parsed = JSON.parse(content.text);
            if (Array.isArray(parsed)) {
              componentList = parsed;
            } else if (parsed.components && Array.isArray(parsed.components)) {
              componentList = parsed.components;
            }
          } catch {
            // Si no es JSON, intentar parsear como texto
            const text = content.text;
            if (text.includes('Available components:')) {
              // Extraer componentes del texto
              const lines = text.split('\n');
              for (const line of lines) {
                if (line.trim() && !line.includes('Available components:')) {
                  componentList.push(line.trim());
                }
              }
            }
          }
        }
      }
    } catch (mcpError: any) {
      console.error(
        `   ⚠️ No se pudo consultar Storybook MCP directamente: ${mcpError.message}`
      );
      console.error(
        `   💡 El agente DEBE consultar Storybook MCP usando call_mcp_tool()`
      );
    }

    if (componentList.length === 0) {
      console.error(
        '   ⚠️ No se pudo obtener lista de componentes desde Node.js'
      );
      console.error(
        '   💡 El agente DEBE ejecutar: call_mcp_tool({ server: "storybook", toolName: "getComponentList", arguments: {} })'
      );

      return {
        success: false,
        found: false,
        error:
          'No se pudo obtener lista de componentes. El agente debe consultar Storybook MCP directamente.',
        suggestions: [],
      };
    }

    console.error(
      `   ✅ [PASO 1] Lista obtenida: ${componentList.length} componente(s)`
    );

    // PASO 2: Buscar coincidencias
    console.error('   🔍 [PASO 2] Buscando coincidencias...');
    const searchTermLower = input.searchTerm.toLowerCase();
    const searchWords = searchTermLower
      .split(/\s+/)
      .filter((w) => w.length > 2);

    // Buscar coincidencias exactas primero
    const exactMatch = componentList.find(
      (c) => c.toLowerCase() === searchTermLower
    );

    if (exactMatch) {
      console.error(
        `   ✅ [PASO 2] Coincidencia exacta encontrada: "${exactMatch}"`
      );
      return {
        success: true,
        found: true,
        exactName: exactMatch,
        componentId: exactMatch
          .toLowerCase()
          .replace(/\//g, '-')
          .replace(/\s+/g, '-'),
      };
    }

    // Buscar por palabras clave
    const matches = componentList.filter((component) => {
      const componentLower = component.toLowerCase();

      // Coincidencia exacta de palabras
      if (searchWords.every((word) => componentLower.includes(word))) {
        return true;
      }

      // Coincidencia parcial
      if (componentLower.includes(searchTermLower)) {
        return true;
      }

      return false;
    });

    if (matches.length > 0) {
      const bestMatch = matches[0];
      console.error(
        `   ✅ [PASO 2] Coincidencia encontrada: "${bestMatch}" (${matches.length} opciones)`
      );

      return {
        success: true,
        found: true,
        exactName: bestMatch,
        componentId: bestMatch
          .toLowerCase()
          .replace(/\//g, '-')
          .replace(/\s+/g, '-'),
        suggestions: matches.slice(1, 5), // Primeras 4 sugerencias adicionales
      };
    }

    // Si no se encontró, retornar sugerencias
    console.error('   ⚠️ [PASO 2] No se encontró coincidencia exacta');

    // Buscar sugerencias por palabras individuales
    const suggestions = componentList
      .filter((component) => {
        const componentLower = component.toLowerCase();
        return searchWords.some((word) => componentLower.includes(word));
      })
      .slice(0, 10);

    return {
      success: true,
      found: false,
      suggestions:
        suggestions.length > 0 ? suggestions : componentList.slice(0, 10),
    };
  } catch (error: any) {
    console.error(`❌ [autorun.discoverComponent] Error: ${error.message}`);
    console.error(`   Stack: ${error.stack?.substring(0, 500)}`);

    return {
      success: false,
      found: false,
      error: error.message,
    };
  }
}
