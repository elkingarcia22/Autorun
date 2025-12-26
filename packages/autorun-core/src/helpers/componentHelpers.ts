/**
 * Component Helpers
 *
 * Funciones helper para automatizar consultas y verificaciones
 * antes de implementar componentes UBITS.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { buildSafeStorybookUrl } from './verifyStorybookStories';

/**
 * Mapea nombre de componente a nombre en Storybook
 */
function mapComponentNameToStorybook(componentName: string): string {
  const mapping: Record<string, string> = {
    Tabs: 'navegación-tabs',
    DataTable: 'data-data-table',
    Button: 'bsicos-button',
    Modal: 'feedback-modal',
    Sidebar: 'navegacion-sidebar',
    SubNav: 'navegacion-sub-nav',
    TabBar: 'navegacion-tab-bar',
    Input: 'formularios-input', // ⚠️ CRÍTICO: Mapear Input al ID correcto
    'Formularios/Input': 'formularios-input',
    'entrada-input': 'formularios-input', // ⚠️ Alias común pero incorrecto
    'Entrada/Input': 'formularios-input', // ⚠️ Alias común pero incorrecto
  };

  return (
    mapping[componentName] || componentName.toLowerCase().replace(/\s+/g, '-')
  );
}

/**
 * Mapea nombre de componente a URL de Storybook en Vercel (con fallback a GitHub)
 */
async function mapComponentNameToStorybookURL(
  componentName: string
): Promise<string> {
  const storybookName = mapComponentNameToStorybook(componentName);

  // Usar el sistema de fallback para obtener la URL
  const { getComponentStorybookUrlWithFallback } = await import(
    './storybookFallback'
  );
  const result = await getComponentStorybookUrlWithFallback(componentName);

  // Si se usó fallback, loguear advertencia
  if (result.usedFallback) {
    console.warn(
      `⚠️ [Component Helper] Usando GitHub como fallback para ${componentName}`
    );
  }

  return result.url;
}

/**
 * Mapea nombre de componente a URL de Storybook (versión síncrona para compatibilidad)
 *
 * ⚠️ CRÍTICO: Esta función está DEPRECADA y NO debería usarse.
 * Usa buildSafeStorybookUrl() o getComponentStorybookUrlWithFallback() en su lugar.
 *
 * ⚠️ NOTA: Esta función es síncrona, pero debería usarse buildSafeStorybookUrl() cuando sea posible
 * Esta función NO puede usar el Storybook activo porque es síncrona.
 *
 * @deprecated Usar buildSafeStorybookUrl() o getComponentStorybookUrlWithFallback() en su lugar
 */
function mapComponentNameToStorybookURLSync(componentName: string): string {
  // ⚠️ CRÍTICO: Esta función está DEPRECADA
  // NO puede usar el Storybook activo porque es síncrona
  // Debería usarse buildSafeStorybookUrl() o getComponentStorybookUrlWithFallback() en su lugar
  console.warn(
    `⚠️ [Component Helpers] mapComponentNameToStorybookURLSync() está DEPRECADA. Usa buildSafeStorybookUrl() o getComponentStorybookUrlWithFallback() en su lugar.`
  );

  // ⚠️ CRÍTICO: Esta función es síncrona, NO puede usar await
  // Intentar obtener URL del Storybook activo de forma síncrona
  try {
    // Importar de forma síncrona usando require dinámico (solo si está disponible)
    // Si no está disponible, lanzar error
    const storybookManagerModule = require('./storybookManager.js');
    const StorybookManager = storybookManagerModule.StorybookManager;
    const manager = StorybookManager.getInstance();
    const activeConfig = manager.getActiveConfigSync?.();

    if (activeConfig) {
      const storybookName = mapComponentNameToStorybook(componentName);
      // Construir URL usando el Storybook activo
      const baseURL = activeConfig.url.endsWith('/')
        ? activeConfig.url
        : `${activeConfig.url}/`;
      return `${baseURL}?path=/story/${storybookName}--default`;
    }
  } catch (error) {
    // Si no se puede obtener Storybook activo, lanzar error
    console.error(
      `❌ [Component Helpers] No se puede usar mapComponentNameToStorybookURLSync() sin Storybook activo. Usa buildSafeStorybookUrl() en su lugar.`
    );
  }

  // ⚠️ CRÍTICO: NO usar fallback de UBITS
  // Lanzar error en lugar de usar fallback
  throw new Error(
    `❌ No se puede usar mapComponentNameToStorybookURLSync() sin Storybook activo. Usa buildSafeStorybookUrl() o getComponentStorybookUrlWithFallback() en su lugar.`
  );
}

/**
 * Mapea nombre de componente a archivo de documentación
 */
export function mapComponentNameToDocFile(componentName: string): string {
  const mapping: Record<string, string> = {
    DataTable: 'data-data-table',
    Tabs: 'navegación-tabs',
    Button: 'bsicos-button',
    Modal: 'feedback-modal',
    Sidebar: 'navegacion-sidebar',
    SubNav: 'navegacion-sub-nav',
    TabBar: 'navegacin-tab-bar',
  };

  return (
    mapping[componentName] || componentName.toLowerCase().replace(/\s+/g, '-')
  );
}

/**
 * Obtiene el Pre-Implementation Check add-on desde el contexto
 */
function getPreImplementationCheckAddon(): any {
  // Esta función se implementaría obteniendo el add-on desde AutorunHub
  // Por ahora, retorna null y se debe pasar como parámetro
  return null;
}

/**
 * Consulta automáticamente Storybook MCP
 *
 * @param componentName Nombre del componente
 * @param preCheckAddon Instancia del Pre-Implementation Check add-on (opcional)
 * @returns Props del componente obtenidas de Storybook MCP
 */
export async function autoConsultStorybookMCP(
  componentName: string,
  preCheckAddon?: any
): Promise<any> {
  try {
    // Mapear nombre a nombre de componente en Storybook
    const storybookName = mapComponentNameToStorybook(componentName);

    // Nota: Esta función requiere que el agente de Cursor use las herramientas MCP directamente
    // No podemos llamar mcp_storybook_getComponentsProps desde aquí
    // El agente debe hacerlo y pasar los resultados

    console.log(
      `📚 [Component Helper] Consultando Storybook MCP para: ${componentName}`
    );
    console.log(
      `💡 [Component Helper] El agente debe usar: mcp_storybook_getComponentsProps(['${storybookName}'])`
    );

    // Marcar paso como completado si se proporciona el add-on
    if (preCheckAddon) {
      await preCheckAddon.markStepCompleted(componentName, 'storybookMCP');
    }

    // Retornar instrucciones para el agente
    return {
      componentName,
      storybookName,
      instructions: `Usar mcp_storybook_getComponentsProps(['${storybookName}'])`,
      completed: false, // Se marca como completado cuando el agente consulta
    };
  } catch (error) {
    console.error(
      `❌ [Component Helper] Error consultando Storybook MCP:`,
      error
    );
    throw error;
  }
}

/**
 * Consulta automáticamente Storybook en Vercel (con fallback a GitHub)
 *
 * @param componentName Nombre del componente
 * @param preCheckAddon Instancia del Pre-Implementation Check add-on (opcional)
 * @returns Información del componente obtenida de Storybook en Vercel o GitHub
 */
export async function autoConsultStorybookVercel(
  componentName: string,
  preCheckAddon?: any
): Promise<any> {
  try {
    // ⚠️ CRÍTICO: Verificar historias existentes ANTES de construir URL
    const urlResult = await buildSafeStorybookUrl(componentName, 'default');

    // Si se usó fallback, mostrar advertencia
    if (urlResult.warning) {
      console.warn(`⚠️ [Component Helper] ${urlResult.warning}`);
    }

    const url = urlResult.url;
    const source = url.includes('github') ? 'GitHub (fallback)' : 'Vercel';

    console.log(
      `📚 [Component Helper] Consultando Storybook en ${source} para: ${componentName}`
    );
    console.log(
      `💡 [Component Helper] URL verificada: ${url} (historia: ${urlResult.storyUsed})`
    );
    console.log(
      `💡 [Component Helper] El agente debe usar Browser MCP para abrir y revisar`
    );

    if (source.includes('fallback')) {
      console.warn(
        `⚠️ [Component Helper] Usando GitHub como fallback - Vercel no está disponible`
      );
    }

    // Marcar paso como completado si se proporciona el add-on
    if (preCheckAddon) {
      await preCheckAddon.markStepCompleted(componentName, 'storybookVercel');
    }

    // Retornar información para el agente
    return {
      componentName,
      url,
      source,
      instructions: `Abrir ${url} con Browser MCP y revisar pestañas "Code" y "Controls"`,
      completed: false, // Se marca como completado cuando el agente consulta
    };
  } catch (error) {
    console.error(`❌ [Component Helper] Error consultando Storybook:`, error);
    throw error;
  }
}

/**
 * Consulta automáticamente la documentación local
 *
 * @param componentName Nombre del componente
 * @param preCheckAddon Instancia del Pre-Implementation Check add-on (opcional)
 * @returns Contenido de la documentación
 */
export async function autoConsultDocumentation(
  componentName: string,
  preCheckAddon?: any
): Promise<any> {
  try {
    const docFileName = mapComponentNameToDocFile(componentName);
    const docPath = path.join(
      process.cwd(),
      'docs/referencia/componentes',
      `${docFileName}.md`
    );

    console.log(
      `📚 [Component Helper] Consultando documentación para: ${componentName}`
    );
    console.log(`💡 [Component Helper] Ruta: ${docPath}`);

    // Leer documentación
    let content = '';
    try {
      content = await fs.readFile(docPath, 'utf-8');
      console.log(`✅ [Component Helper] Documentación encontrada`);
    } catch (error) {
      console.warn(
        `⚠️ [Component Helper] Documentación no encontrada en: ${docPath}`
      );
      // Intentar buscar en otras ubicaciones
      const altPath = path.join(
        process.cwd(),
        'docs/referencia',
        `${docFileName}.md`
      );
      try {
        content = await fs.readFile(altPath, 'utf-8');
        console.log(
          `✅ [Component Helper] Documentación encontrada en ubicación alternativa`
        );
      } catch {
        content = '';
      }
    }

    // Marcar paso como completado si se proporciona el add-on
    if (preCheckAddon && content) {
      await preCheckAddon.markStepCompleted(componentName, 'documentation');
    }

    return {
      componentName,
      path: docPath,
      content,
      exists: content.length > 0,
      completed: content.length > 0,
    };
  } catch (error) {
    console.error(
      `❌ [Component Helper] Error consultando documentación:`,
      error
    );
    throw error;
  }
}

/**
 * Extrae el HTML real generado desde la documentación del componente
 *
 * ⚠️ CRÍTICO: Esta función lee la sección "## 📄 Estructura HTML Generada"
 * de la documentación del componente en docs/referencia/componentes/
 *
 * @param componentName Nombre del componente
 * @returns HTML real extraído de la documentación, o null si no se encuentra
 */
export async function extractHTMLFromDocumentation(
  componentName: string
): Promise<{ html: string; found: boolean; source: string }> {
  try {
    // 1. Obtener documentación del componente
    const docResult = await autoConsultDocumentation(componentName);

    if (!docResult.exists || !docResult.content) {
      console.warn(
        `⚠️ [HTML Extractor] Documentación no encontrada para: ${componentName}`
      );
      return { html: '', found: false, source: 'documentation' };
    }

    const content = docResult.content;

    // 2. Buscar sección "## 📄 Estructura HTML Generada"
    const htmlSectionRegex =
      /##\s*📄\s*Estructura\s*HTML\s*Generada[\s\S]*?(?=##|$)/i;
    const htmlSectionMatch = content.match(htmlSectionRegex);

    if (!htmlSectionMatch) {
      console.warn(
        `⚠️ [HTML Extractor] Sección "Estructura HTML Generada" no encontrada en documentación de: ${componentName}`
      );
      return { html: '', found: false, source: 'documentation' };
    }

    const htmlSection = htmlSectionMatch[0];

    // 3. Extraer bloques de código HTML (```html ... ```)
    const htmlCodeBlockRegex = /```html\s*([\s\S]*?)```/gi;
    const htmlMatches = Array.from(htmlSection.matchAll(htmlCodeBlockRegex));

    if (htmlMatches.length === 0) {
      // Intentar con bloques de código sin especificar lenguaje (``` ... ```)
      const genericCodeBlockRegex = /```\s*([\s\S]*?)```/gi;
      const genericMatches = Array.from(
        htmlSection.matchAll(genericCodeBlockRegex)
      );

      if (genericMatches.length > 0) {
        // Buscar el bloque que parece HTML (contiene <div, <button, etc.)
        for (const match of genericMatches) {
          const code = match[1].trim();
          if (
            code.includes('<div') ||
            code.includes('<button') ||
            code.includes('<span')
          ) {
            console.log(
              `✅ [HTML Extractor] HTML extraído desde documentación de: ${componentName}`
            );
            return { html: code, found: true, source: 'documentation' };
          }
        }
      }

      console.warn(
        `⚠️ [HTML Extractor] No se encontraron bloques de código HTML en la sección de: ${componentName}`
      );
      return { html: '', found: false, source: 'documentation' };
    }

    // 4. Priorizar el bloque "Ejemplo Completo" si existe
    const exampleCompleteMatch = htmlSection.match(
      /###\s*Ejemplo\s*Completo[\s\S]*?```html\s*([\s\S]*?)```/i
    );

    if (exampleCompleteMatch) {
      console.log(
        `✅ [HTML Extractor] HTML extraído desde "Ejemplo Completo" de: ${componentName}`
      );
      return {
        html: exampleCompleteMatch[1].trim(),
        found: true,
        source: 'documentation',
      };
    }

    // 5. Usar el primer bloque HTML encontrado
    const firstHTML = htmlMatches[0][1].trim();
    console.log(
      `✅ [HTML Extractor] HTML extraído desde documentación de: ${componentName}`
    );
    return { html: firstHTML, found: true, source: 'documentation' };
  } catch (error: any) {
    console.error(
      `❌ [HTML Extractor] Error extrayendo HTML desde documentación:`,
      error
    );
    return { html: '', found: false, source: 'documentation' };
  }
}

/**
 * Obtiene el plan de implementación basado en historias de Storybook
 *
 * @param componentName Nombre del componente
 * @param componentId ID del componente en Storybook (opcional)
 * @returns Plan de implementación basado en historias
 */
export async function getStoryBasedImplementationPlan(
  componentName: string,
  componentId?: string
): Promise<any> {
  try {
    const {
      createStoryBasedImplementationPlan,
      generateStoryBasedPlanSummary,
    } = await import('./storyBasedImplementation');

    console.log(
      `📚 [Component Helper] Obteniendo plan de implementación basado en historias para: ${componentName}`
    );

    const plan = await createStoryBasedImplementationPlan(
      componentName,
      componentId
    );
    const summary = generateStoryBasedPlanSummary(plan);

    console.log(summary);

    return {
      plan,
      summary,
      instructions: `Implementar ${componentName} dividiendo por ${plan.totalSteps} historias específicas de Storybook (NO usar "default"). Implementar UNA historia a la vez, completando TODO el checklist antes de continuar con la siguiente.`,
    };
  } catch (error) {
    console.error(
      `❌ [Component Helper] Error obteniendo plan basado en historias:`,
      error
    );
    throw error;
  }
}

/**
 * Verifica y completa automáticamente el checklist antes de implementar
 *
 * @param componentName Nombre del componente
 * @param preCheckAddon Instancia del Pre-Implementation Check add-on
 * @returns Resultado de la verificación
 */
export async function checkComponentBeforeImplementation(
  componentName: string,
  preCheckAddon: any
): Promise<{
  allowed: boolean;
  checklist: any;
  missingSteps: string[];
  reason?: string;
  consulted: {
    storybookMCP: any;
    storybookVercel: any;
    documentation: any;
  };
}> {
  // 1. Verificar estado actual
  const checkResult = await preCheckAddon.canImplement(componentName);

  if (checkResult.allowed) {
    return {
      ...checkResult,
      consulted: {
        storybookMCP: null,
        storybookVercel: null,
        documentation: null,
      },
    };
  }

  // 2. Completar pasos faltantes automáticamente
  console.log(
    `🔍 [Component Helper] Completando checklist para: ${componentName}`
  );

  const consulted = {
    storybookMCP: null as any,
    storybookVercel: null as any,
    documentation: null as any,
  };

  // Consultar Storybook MCP si falta
  if (!checkResult.checklist.storybookMCP) {
    consulted.storybookMCP = await autoConsultStorybookMCP(
      componentName,
      preCheckAddon
    );
  }

  // Consultar Storybook en Vercel si falta
  if (!checkResult.checklist.storybookVercel) {
    consulted.storybookVercel = await autoConsultStorybookVercel(
      componentName,
      preCheckAddon
    );
  }

  // Consultar documentación si falta
  if (!checkResult.checklist.documentation) {
    consulted.documentation = await autoConsultDocumentation(
      componentName,
      preCheckAddon
    );
  }

  // 3. Verificar nuevamente
  const finalCheck = await preCheckAddon.canImplement(componentName);

  return {
    ...finalCheck,
    consulted,
  };
}
