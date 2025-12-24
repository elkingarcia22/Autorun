/**
 * Implementation Helpers
 *
 * Funciones helper obligatorias para verificar que se sigan los lineamientos
 * antes de implementar componentes UBITS.
 */

import { getAutorunHub } from '@autorun/core';
import { ACTION_VERBS_PATTERN } from './actionVerbsPattern.js';

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
/**
 * ⚠️ MEJORADO: Detecta múltiples componentes en el mensaje
 * Retorna el componente con mayor prioridad, pero permite detectar múltiples
 */
export function detectComponentFromMessage(message: string): string | null {
  const patterns = [
    // ⚠️ CRÍTICO: Tabs DEBE estar ANTES de DataTable para evitar falsos positivos
    // porque "tabla" puede aparecer en "Lista de encuestas" pero "tabs" es más específico
    {
      pattern: new RegExp(`${ACTION_VERBS_PATTERN}.*\\btabs?\\b`, 'i'),
      component: 'Tabs',
      priority: 11, // Mayor prioridad que DataTable
    },
    {
      pattern: /\btabs?\b.*(?:debajo|abajo|bajo|después)/i, // "tabs debajo del subnav"
      component: 'Tabs',
      priority: 11,
    },
    {
      pattern: /\bpesta[ñn]as?\b/i,
      component: 'Tabs',
      priority: 11,
    },
    {
      // ⚠️ MEJORADO: Detección más amplia de DataTable (evitando "tabla" en contexto de "lista de")
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:data\\s*table|data-table|tabla\\s+de\\s+datos)(?!.*lista\\s+de)`,
        'i'
      ),
      component: 'DataTable',
      priority: 10, // Alta prioridad
    },
    {
      // ⚠️ Solo detectar "tabla" si NO está precedido por "lista de"
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*\\btabla\\b(?!\\s+de\\s+encuestas)(?!.*lista\\s+de)`,
        'i'
      ),
      component: 'DataTable',
      priority: 9, // Menor prioridad que Tabs
    },
    // Detección directa de "tabla" o "data table" (sin verbo)
    {
      pattern:
        /(?:^|\s)(?:una\s+)?(?:data.?table|data-table|tabla\s+de\s+datos|tabla\s+con\s+columnas|tabla\s+con\s+filas)(?:\s|$)/i,
      component: 'DataTable',
      priority: 9,
    },
    // Detección de contexto de tabla (columnas, filas, paginación, etc.)
    {
      pattern:
        /(?:tabla|data.?table).*(?:columnas|filas|paginación|búsqueda|filtros|ordenamiento|checkboxes)/i,
      component: 'DataTable',
      priority: 8,
    },
    // ⚠️ CRÍTICO: RadioButton DEBE estar ANTES de Button para evitar falsos positivos
    {
      pattern: /\bradio\s*button\b/i,
      component: 'RadioButton',
      priority: 9, // Mayor prioridad que Button
    },
    {
      pattern: /\bradio\s*bot[oó]n\b/i,
      component: 'RadioButton',
      priority: 9,
    },
    {
      pattern: new RegExp(`${ACTION_VERBS_PATTERN}.*radio.*button`, 'i'),
      component: 'RadioButton',
      priority: 9,
    },
    {
      pattern: new RegExp(`${ACTION_VERBS_PATTERN}.*radio.*bot[oó]n`, 'i'),
      component: 'RadioButton',
      priority: 9,
    },
    // ⚠️ MEJORADO: Detección de Button con más patrones (excluyendo radio button)
    {
      pattern:
        new RegExp(`${ACTION_VERBS_PATTERN}.*(?:bot[oó]n|button)(?!.*radio)`, 'i'),
      component: 'Button',
      priority: 7,
    },
    {
      pattern: /\bbot[oó]n\b(?!\s*radio)/i,
      component: 'Button',
      priority: 6,
    },
    {
      pattern: /\bbutton\b(?!\s*radio)/i,
      component: 'Button',
      priority: 6,
    },
    // ⚠️ MEJORADO: Detección de Modal con más patrones
    {
      pattern:
        new RegExp(`${ACTION_VERBS_PATTERN}.*(?:modal|ventana\\s+emergente|dialogo)`, 'i'),
      component: 'Modal',
      priority: 7,
    },
    {
      pattern: /\bmodal\b/i,
      component: 'Modal',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Popover
    {
      pattern: new RegExp(`${ACTION_VERBS_PATTERN}.*(?:popover)`, 'i'),
      component: 'Popover',
      priority: 7,
    },
    {
      pattern: /\bpopover\b/i,
      component: 'Popover',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Drawer
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:drawer|caj[oó]n\\s+lateral|panel\\s+lateral)`,
        'i'
      ),
      component: 'Drawer',
      priority: 7,
    },
    {
      pattern: /\bdrawer\b/i,
      component: 'Drawer',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Checkbox
    {
      pattern: new RegExp(`${ACTION_VERBS_PATTERN}.*(?:checkbox|casilla)`, 'i'),
      component: 'Checkbox',
      priority: 7,
    },
    {
      pattern: /\bcheckbox\b/i,
      component: 'Checkbox',
      priority: 6,
    },
    // ⚠️ RadioButton ya está definido arriba con mayor prioridad
    // Radio está deprecado, usar RadioButton en su lugar
    // ⚠️ NUEVO: Detección de DatePicker
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:datepicker|date-picker|selector\s+de\s+fecha|calendario)/i,
      component: 'DatePicker',
      priority: 7,
    },
    {
      pattern: /\bdatepicker\b|\bdate-picker\b/i,
      component: 'DatePicker',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Toast
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:toast|notificaci[oó]n|aviso\s+temporal)/i,
      component: 'Toast',
      priority: 7,
    },
    {
      pattern: /\btoast\b/i,
      component: 'Toast',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Alert
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:alert|alerta|aviso)/i,
      component: 'Alert',
      priority: 7,
    },
    {
      pattern: /\balert\b/i,
      component: 'Alert',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Tooltip
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:tooltip|informaci[oó]n\s+adicional)/i,
      component: 'Tooltip',
      priority: 7,
    },
    {
      pattern: /\btooltip\b/i,
      component: 'Tooltip',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Accordion
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:accordion|acorde[oó]n)/i,
      component: 'Accordion',
      priority: 7,
    },
    {
      pattern: /\baccordion\b/i,
      component: 'Accordion',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Breadcrumb
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:breadcrumb|migas\s+de\s+pan)/i,
      component: 'Breadcrumb',
      priority: 7,
    },
    {
      pattern: /\bbreadcrumb\b/i,
      component: 'Breadcrumb',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Pagination
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:pagination|paginaci[oó]n)/i,
      component: 'Pagination',
      priority: 7,
    },
    {
      pattern: /\bpagination\b/i,
      component: 'Pagination',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de FileUpload
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:file\s+upload|subir\s+archivo|carga\s+de\s+archivo)/i,
      component: 'FileUpload',
      priority: 7,
    },
    {
      pattern: /\bfile\s+upload\b/i,
      component: 'FileUpload',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Calendar
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:calendar|calendario)/i,
      component: 'Calendar',
      priority: 7,
    },
    {
      pattern: /\bcalendar\b/i,
      component: 'Calendar',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Switch/Toggle
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:switch|toggle|interruptor)/i,
      component: 'Switch',
      priority: 7,
    },
    {
      pattern: /\bswitch\b|\btoggle\b/i,
      component: 'Switch',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Slider
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:slider|deslizador|rango)/i,
      component: 'Slider',
      priority: 7,
    },
    {
      pattern: /\bslider\b/i,
      component: 'Slider',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Chip
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:chip|etiqueta\s+peque[ñn]a)/i,
      component: 'Chip',
      priority: 7,
    },
    {
      pattern: /\bchip\b/i,
      component: 'Chip',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Skeleton
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:skeleton|esqueleto|placeholder)/i,
      component: 'Skeleton',
      priority: 7,
    },
    {
      pattern: /\bskeleton\b/i,
      component: 'Skeleton',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Spinner
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:spinner|cargador|loading)/i,
      component: 'Spinner',
      priority: 7,
    },
    {
      pattern: /\bspinner\b/i,
      component: 'Spinner',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Progress
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:progress|barra\s+de\s+progreso)/i,
      component: 'Progress',
      priority: 7,
    },
    {
      pattern: /\bprogress\b/i,
      component: 'Progress',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Rating
    {
      pattern:
        /(?:implementar|crear|agregar|poner|hacer).*(?:rating|calificaci[oó]n|estrellas)/i,
      component: 'Rating',
      priority: 7,
    },
    {
      pattern: /\brating\b/i,
      component: 'Rating',
      priority: 6,
    },
    // ⚠️ REMOVIDO: Pattern duplicado de Tabs (ya está arriba con mayor prioridad)
    {
      pattern: /implementar.*sidebar|crear.*sidebar/i,
      component: 'Sidebar',
      priority: 4,
    },
    {
      pattern: /implementar.*subnav|crear.*subnav/i,
      component: 'SubNav',
      priority: 4,
    },
  ];

  // Encontrar todos los componentes que coinciden
  const matches: Array<{ component: string; priority: number }> = [];
  for (const { pattern, component, priority } of patterns) {
    if (pattern.test(message)) {
      matches.push({ component, priority: priority || 1 });
    }
  }

  // Retornar el componente con mayor prioridad
  if (matches.length > 0) {
    matches.sort((a, b) => b.priority - a.priority);
    return matches[0].component;
  }

  return null;
}
