/**
 * Implementation Helpers
 *
 * Funciones helper obligatorias para verificar que se sigan los lineamientos
 * antes de implementar componentes UBITS.
 */

import { getAutorunHub } from '@autorun/core';

/**
 * ⚠️ OBLIGATORIO: Verificar que se completó el checklist obligatorio antes de implementar
 *
 * Esta función DEBE ejecutarse ANTES de usar write() o search_replace() para implementar un componente.
 *
 * @param componentName Nombre del componente a implementar (ej: 'DataTable', 'Tabs', 'Modal')
 * @throws Error si el checklist no está completo
 *
 * @example
 * ```typescript
 * // ⚠️ OBLIGATORIO: Verificar antes de implementar
 * await ensureImplementationReady('DataTable');
 *
 * // Solo después de que esta función pase, puedes usar write() o search_replace()
 * await write('file.html', content);
 * ```
 */
export async function ensureImplementationReady(
  componentName: string
): Promise<void> {
  if (!componentName) {
    throw new Error(
      '❌ Componente no especificado. Debes proporcionar el nombre del componente.'
    );
  }

  // Obtener AutorunHub
  const hub = await getAutorunHub();
  if (!hub) {
    throw new Error(
      '❌ AutorunHub no está inicializado. Ejecuta: npm run autorun:init-hub'
    );
  }

  // Obtener Pre-Implementation Check add-on
  const preCheckAddon = hub.getAddon('pre-implementation-check');
  if (!preCheckAddon) {
    console.warn(
      '⚠️ Pre-Implementation Check add-on no está disponible. Continuando sin verificación...'
    );
    return; // Permitir continuar si el add-on no está disponible
  }

  // Verificar si se puede implementar
  const checkResult = await (preCheckAddon as any).canImplement(componentName);

  if (!checkResult.allowed) {
    const errorMessage = `
❌❌❌ IMPLEMENTACIÓN BLOQUEADA ❌❌❌

Componente: ${componentName}
Razón: ${checkResult.reason || 'Faltan pasos obligatorios'}

📋 Pasos faltantes:
${checkResult.missingSteps?.map((step: string) => `  - ${step}`).join('\n') || '  - No especificados'}

⚠️ NO puedes usar write() o search_replace() hasta completar estos pasos.

📚 Pasos obligatorios:
1. Consultar Storybook en Vercel (PRIMERO)
   - URL: https://ubits-storybook10.vercel.app/
   - Revisar pestaña "Code" y "Controls"
   - Volver al template después de consultar

2. Consultar Storybook MCP
   - Usar mcp_storybook_getComponentList
   - Usar mcp_storybook_getComponentsProps

3. Consultar documentación específica
   - Leer docs/referencia/componentes/[nombre-componente].md
   - Leer docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md

4. Comparar versiones
   - Comparar Storybook Vercel vs código local
   - Usar versión del Storybook si hay diferencias

📖 Ver guía completa: docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md
    `.trim();

    // Crear error personalizado
    const error = new Error(errorMessage);
    (error as any).blocked = true;
    (error as any).componentName = componentName;
    (error as any).missingSteps = checkResult.missingSteps || [];
    (error as any).checklist = checkResult.checklist;

    throw error;
  }

  console.log(
    `✅ Checklist completo para ${componentName}, procediendo con implementación`
  );
}

/**
 * Detectar componente del contenido o mensaje
 */
export function detectComponentFromContent(content: string): string | null {
  const patterns = [
    { pattern: /window\.createDataTable\(/i, component: 'DataTable' },
    { pattern: /window\.createTabs\(/i, component: 'Tabs' },
    { pattern: /window\.createModal\(/i, component: 'Modal' },
    { pattern: /window\.createSidebar\(/i, component: 'Sidebar' },
    { pattern: /window\.createSubNav\(/i, component: 'SubNav' },
    { pattern: /window\.UBITS\.Button\.create\(/i, component: 'Button' },
    { pattern: /<ubits-data-table/i, component: 'DataTable' },
    { pattern: /<ubits-tabs/i, component: 'Tabs' },
    { pattern: /<ubits-modal/i, component: 'Modal' },
    { pattern: /<ubits-button/i, component: 'Button' },
  ];

  for (const { pattern, component } of patterns) {
    if (pattern.test(content)) {
      return component;
    }
  }

  return null;
}

/**
 * Detectar componente del mensaje del usuario
 */
export function detectComponentFromMessage(message: string): string | null {
  const patterns = [
    {
      // ⚠️ MEJORADO: Detección más amplia de DataTable
      pattern:
        /(?:implementar|crear|agregar|poner|hacer|necesito|quiero|debe).*(?:data.?table|data-table|tabla|tabla de datos|tabla con|tabla que|tabla para)/i,
      component: 'DataTable',
    },
    // Detección directa de "tabla" o "data table" (sin verbo)
    {
      pattern:
        /(?:^|\s)(?:una\s+)?(?:data.?table|data-table|tabla\s+de\s+datos|tabla\s+con\s+columnas|tabla\s+con\s+filas)(?:\s|$)/i,
      component: 'DataTable',
    },
    // Detección de contexto de tabla (columnas, filas, paginación, etc.)
    {
      pattern:
        /(?:tabla|data.?table).*(?:columnas|filas|paginación|búsqueda|filtros|ordenamiento|checkboxes)/i,
      component: 'DataTable',
    },
    { pattern: /implementar.*tabs?|crear.*tabs?/i, component: 'Tabs' },
    { pattern: /implementar.*modal|crear.*modal/i, component: 'Modal' },
    { pattern: /implementar.*button|crear.*botón/i, component: 'Button' },
    { pattern: /implementar.*sidebar|crear.*sidebar/i, component: 'Sidebar' },
    { pattern: /implementar.*subnav|crear.*subnav/i, component: 'SubNav' },
  ];

  for (const { pattern, component } of patterns) {
    if (pattern.test(message)) {
      return component;
    }
  }

  return null;
}
