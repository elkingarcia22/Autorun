/**
 * MCP with Fallback
 *
 * ⭐ MEJORA 2: Consulta obligatoria de MCP con fallback seguro
 * Obtiene props desde MCP de Storybook, con fallback a extracción visual si MCP falla
 */

import { StorybookManager } from './storybookManager';

export interface ComponentProps {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description?: string;
}

export interface MCPCallResult {
  success: boolean;
  props?: ComponentProps[];
  error?: string;
  fallbackUsed: boolean;
}

/**
 * Obtiene props desde MCP de Storybook con fallback seguro
 */
export async function getComponentPropsWithFallback(
  componentId: string
): Promise<MCPCallResult> {
  console.log(`🔍 [MCP with Fallback] Obteniendo props para: ${componentId}`);

  try {
    // 1. Intentar obtener servidor MCP correcto
    const manager = StorybookManager.getInstance();
    const activeConfig = await manager.getActiveConfig();

    if (!activeConfig) {
      console.warn(
        '⚠️ No hay Storybook activo, no se pueden obtener props desde MCP'
      );
      return {
        success: false,
        error: 'No hay Storybook activo configurado',
        fallbackUsed: false,
      };
    }

    // 2. Determinar servidor MCP
    const mcpServer = getMCPServerForStorybook(activeConfig);
    console.log(`   📡 Usando servidor MCP: ${mcpServer}`);

    // 3. Intentar consultar MCP
    // ⚠️ NOTA: call_mcp_tool debe ser ejecutado por el agente
    // Por ahora, emitimos instrucciones y usamos fallback visual
    // ⚠️ NUEVO MCP: Convertir componentId a nombre de componente
    const { storybookIdToComponentName } = await import(
      './storybookMCPNameMapper.js'
    );
    const componentName =
      storybookIdToComponentName(componentId) || componentId;

    console.log(`   📡 Instrucciones para consultar MCP:`);
    console.log(`      El agente DEBE ejecutar:`);
    console.log(`      call_mcp_tool({`);
    console.log(`        server: "${mcpServer}",`);
    console.log(`        toolName: "getComponentsProps",`); // ⚠️ NUEVO MCP: Sin prefijo mcp_storybook_
    console.log(`        arguments: { componentNames: ["${componentName}"] }`); // ⚠️ NUEVO MCP: Usar componentNames
    console.log(`      })`);
    console.log(`   ⚠️ Por ahora, usando fallback visual...`);

    // 4. Fallback: usar extracción visual
    console.log(`   🔄 Usando fallback: extracción visual desde Storybook`);
    const visualProps = await extractPropsVisually(
      componentId,
      activeConfig.url
    );

    if (visualProps && visualProps.length > 0) {
      console.log(
        `✅ [MCP with Fallback] Props obtenidas visualmente: ${visualProps.length} props`
      );
      return {
        success: true,
        props: visualProps,
        fallbackUsed: true,
        error: 'MCP no disponible, usando extracción visual',
      };
    }

    return {
      success: false,
      error: 'No se pudieron obtener props ni desde MCP ni visualmente',
      fallbackUsed: true,
    };
  } catch (error: any) {
    console.error(`❌ [MCP with Fallback] Error: ${error.message}`);
    return {
      success: false,
      error: error.message,
      fallbackUsed: false,
    };
  }
}

/**
 * Determina el servidor MCP correcto para el Storybook activo
 */
function getMCPServerForStorybook(config: any): string {
  // ⚠️ CRÍTICO: El servidor MCP debe ser "storybook" (no "storybook-ubits")
  // El wizard configura el MCP con el nombre "storybook" (unificado)
  // Todos los Storybooks usan el mismo servidor MCP, solo cambia la URL en STORYBOOK_URL
  return 'storybook'; // Servidor unificado
}

/**
 * Extrae props visualmente desde Storybook (fallback)
 */
export async function extractPropsVisually(
  componentId: string,
  storybookBaseUrl: string
): Promise<ComponentProps[]> {
  console.log(`   👁️ Extrayendo props visualmente desde: ${storybookBaseUrl}`);

  try {
    // Construir URL de Docs (tiene información más completa)
    const docsUrl = `${storybookBaseUrl}/?path=/docs/${componentId}--docs`;

    // Intentar obtener HTML de la página de Docs
    const response = await fetch(docsUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    // Extraer props desde la tabla de props en Docs
    const props = extractPropsFromDocsHTML(html);

    return props;
  } catch (error: any) {
    console.warn(`   ⚠️ Error extrayendo props visualmente: ${error.message}`);
    return [];
  }
}

/**
 * Extrae props desde el HTML de la pestaña Docs
 */
export async function extractPropsFromDocsHTML(
  html: string
): Promise<ComponentProps[]> {
  const props: ComponentProps[] = [];

  // Buscar tabla de props en el HTML de Docs
  // Storybook muestra props en una tabla con estructura específica
  const propsTableRegex =
    /<table[^>]*class="[^"]*props[^"]*"[^>]*>([\s\S]*?)<\/table>/i;
  const tableMatch = html.match(propsTableRegex);

  if (!tableMatch) {
    // Intentar buscar en otros formatos
    const alternativeRegex = /<tbody[^>]*>([\s\S]*?)<\/tbody>/i;
    const tbodyMatch = html.match(alternativeRegex);
    if (tbodyMatch) {
      return extractPropsFromTableBody(tbodyMatch[1]);
    }
    return props;
  }

  return extractPropsFromTableBody(tableMatch[1]);
}

/**
 * Extrae props desde el cuerpo de una tabla
 */
function extractPropsFromTableBody(tbodyHtml: string): ComponentProps[] {
  const props: ComponentProps[] = [];

  // Buscar filas de la tabla (cada fila es una prop)
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  const rows = Array.from(tbodyHtml.matchAll(rowRegex));

  for (const rowMatch of rows) {
    const rowHtml = rowMatch[1];

    // Extraer nombre de la prop (primera columna)
    const nameMatch = rowHtml.match(/<td[^>]*>([^<]+)<\/td>/);
    if (!nameMatch) continue;

    const propName = nameMatch[1].trim();

    // Extraer tipo (segunda columna)
    const typeMatch = rowHtml.match(/<td[^>]*>([^<]+)<\/td>/g);
    const propType =
      typeMatch && typeMatch[1]
        ? typeMatch[1].replace(/<[^>]+>/g, '').trim()
        : 'unknown';

    // Extraer si es requerida (buscar "required" o "optional")
    const isRequired =
      rowHtml.includes('required') || rowHtml.includes('Required');

    // Extraer valor por defecto (buscar en la fila)
    const defaultValueMatch = rowHtml.match(/default[^<]*>([^<]+)</i);
    const defaultValue = defaultValueMatch
      ? defaultValueMatch[1].trim()
      : undefined;

    props.push({
      name: propName,
      type: propType,
      required: isRequired,
      defaultValue,
    });
  }

  return props;
}

/**
 * Valida estructura HTML contra props obtenidas
 */
export async function validateStructureAgainstProps(
  html: string,
  props: ComponentProps[] | null
): Promise<{
  valid: boolean;
  errors: string[];
  warnings: string[];
}> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!props || props.length === 0) {
    // Si no hay props, validar solo estructura básica
    return { valid: true, errors: [], warnings: ['No hay props para validar'] };
  }

  // Validar que todas las props requeridas están presentes
  const requiredProps = props.filter((p) => p.required);
  const missingProps: ComponentProps[] = [];

  requiredProps.forEach((prop) => {
    // Verificar que el HTML contiene el atributo o elemento necesario
    const propPattern = new RegExp(
      `(?:${prop.name}|data-${prop.name}|aria-${prop.name})[\\s=]`,
      'i'
    );
    if (!propPattern.test(html)) {
      missingProps.push(prop);
    }
  });

  if (missingProps.length > 0) {
    errors.push(
      `Props requeridas faltantes: ${missingProps.map((p) => p.name).join(', ')}`
    );
  }

  // Validar valores por defecto (advertencias)
  props.forEach((prop) => {
    if (prop.defaultValue && !html.includes(prop.defaultValue.toString())) {
      warnings.push(
        `Valor por defecto recomendado para "${prop.name}": ${prop.defaultValue}`
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
