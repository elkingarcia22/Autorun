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
    // ⚠️ MEJORADO: Detección de Button con más patrones (excluyendo radio button y simple card)
    // ⚠️ CRÍTICO: Button DEBE tener menor prioridad que SimpleCard para evitar falsos positivos
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:bot[oó]n|button)(?!.*radio)(?!.*simple\s+card)(?!.*simplecard)`,
        'i'
      ),
      component: 'Button',
      priority: 7,
    },
    {
      pattern: /\bbot[oó]n\b(?!\s*radio)(?!.*simple\s+card)(?!.*simplecard)/i,
      component: 'Button',
      priority: 6,
    },
    {
      pattern: /\bbutton\b(?!\s*radio)(?!.*simple\s+card)(?!.*simplecard)/i,
      component: 'Button',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Avatar
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:avatar|foto\\s+de\\s+perfil|imagen\\s+de\\s+usuario)`,
        'i'
      ),
      component: 'Avatar',
      priority: 7,
    },
    {
      pattern: /\bavatar\b/i,
      component: 'Avatar',
      priority: 6,
    },
    // ⚠️ MEJORADO: Detección de Modal con más patrones
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:modal|ventana\\s+emergente|dialogo)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:datepicker|date-picker|selector\\s+de\\s+fecha|calendario)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:toast|notificaci[oó]n|aviso\\s+temporal)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:alert|alerta|aviso)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:tooltip|informaci[oó]n\\s+adicional)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:accordion|acorde[oó]n)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:breadcrumb|migas\\s+de\\s+pan)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:pagination|paginaci[oó]n)`,
        'i'
      ),
      component: 'Pagination',
      priority: 7,
    },
    {
      pattern: /\bpagination\b/i,
      component: 'Pagination',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de List (lista de elementos)
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:lista|list)(?!.*tabla)(?!.*encuestas)(?!.*data\\s*table)`,
        'i'
      ),
      component: 'List',
      priority: 7,
    },
    {
      pattern:
        /\b(?:componente\s+)?list\b(?!.*tabla)(?!.*encuestas)(?!.*data\s*table)/i,
      component: 'List',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de FileUpload
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:file\\s+upload|subir\\s+archivo|carga\\s+de\\s+archivo)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:calendar|calendario)`,
        'i'
      ),
      component: 'Calendar',
      priority: 7,
    },
    {
      pattern: /\bcalendar\b/i,
      component: 'Calendar',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Toggle (prioridad sobre Switch)
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:toggle|interruptor)`,
        'i'
      ),
      component: 'Toggle',
      priority: 8,
    },
    {
      pattern: /\btoggle\b/i,
      component: 'Toggle',
      priority: 7,
    },
    // ⚠️ NUEVO: Detección de Switch (diferente de Toggle)
    {
      pattern: new RegExp(`${ACTION_VERBS_PATTERN}.*(?:switch)`, 'i'),
      component: 'Switch',
      priority: 7,
    },
    {
      pattern: /\bswitch\b/i,
      component: 'Switch',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de Slider
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:slider|deslizador|rango)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:chip|etiqueta\\s+peque[ñn]a)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:skeleton|esqueleto|placeholder)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:spinner|cargador|loading)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:progress|barra\\s+de\\s+progreso)`,
        'i'
      ),
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
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:rating|calificaci[oó]n|estrellas)`,
        'i'
      ),
      component: 'Rating',
      priority: 7,
    },
    {
      pattern: /\brating\b/i,
      component: 'Rating',
      priority: 6,
    },
    // ⚠️ NUEVO: Detección de EmptyState
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:empty\\s+state|emptystate|estado\\s+vac[ií]o|sin\\s+datos)`,
        'i'
      ),
      component: 'EmptyState',
      priority: 7,
    },
    {
      pattern: /\bempty\s+state\b|\bemptystate\b|\bestado\s+vac[ií]o\b/i,
      component: 'EmptyState',
      priority: 6,
    },
    // ⚠️ CRÍTICO: SimpleCard DEBE estar ANTES de Button y Card genérico para evitar falsos positivos
    // Detección de componentes mencionados explícitamente (Layout/Simple Card, layout-simple-card)
    {
      pattern: /\b(?:Layout\/)?Simple\s+Card\b|\blayout-simple-card\b/i,
      component: 'SimpleCard',
      priority: 15, // Mayor prioridad para menciones explícitas
    },
    {
      pattern: /\bSimpleCard\b/i,
      component: 'SimpleCard',
      priority: 15, // Mayor prioridad para PascalCase explícito
    },
    // Patrón con verbo de acción
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:simple\s+card|simplecard|tarjeta\s+simple)`,
        'i'
      ),
      component: 'SimpleCard',
      priority: 14, // Mayor prioridad que Button (7) y Card genérico
    },
    // Patrón sin verbo de acción
    {
      pattern: /\bsimple\s+card\b|\bsimplecard\b|\btarjeta\s+simple\b/i,
      component: 'SimpleCard',
      priority: 13, // Mayor prioridad que Button (6)
    },
    // ⚠️ CRÍTICO: CardContent DEBE estar ANTES de SelectionCard y Carousel para evitar falsos positivos
    // Patrón más específico primero (con verbo de acción)
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:card\s+content|cardcontent|contenido\s+de\s+tarjeta|contentcard)`,
        'i'
      ),
      component: 'CardContent',
      priority: 13, // Mayor prioridad que SelectionCard y Carousel
    },
    // Patrón sin verbo de acción (más flexible)
    {
      pattern: /\bcard\s+content\b|\bcardcontent\b|\bcontentcard\b/i,
      component: 'CardContent',
      priority: 12,
    },
    {
      pattern: /\bcontenido\s+de\s+tarjeta\b/i,
      component: 'CardContent',
      priority: 11,
    },
    // Patrón adicional: "CardContent" como palabra completa (PascalCase)
    {
      pattern: /\bCardContent\b/i,
      component: 'CardContent',
      priority: 14, // Mayor prioridad para PascalCase explícito
    },
    // ⚠️ CRÍTICO: Carousel DEBE estar ANTES de SelectionCard para evitar falsos positivos
    // porque "carousel" puede aparecer en otros contextos pero debe tener prioridad
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:carousel|carrusel)`,
        'i'
      ),
      component: 'Carousel',
      priority: 12, // Mayor prioridad que SelectionCard
    },
    {
      pattern: /\bcarousel\b.*(?:debajo|abajo|bajo|después)/i, // "carousel debajo de la selection card"
      component: 'Carousel',
      priority: 12,
    },
    {
      pattern: /\bcarrusel\b/i,
      component: 'Carousel',
      priority: 11,
    },
    // ⚠️ NUEVO: Detección de SelectionCard
    {
      pattern: new RegExp(
        `${ACTION_VERBS_PATTERN}.*(?:selection\\s+card|tarjeta\\s+de\\s+selecci[oó]n|selectioncard)`,
        'i'
      ),
      component: 'SelectionCard',
      priority: 8,
    },
    {
      pattern: /\bselection\s+card\b|\bselectioncard\b/i,
      component: 'SelectionCard',
      priority: 7,
    },
    // ⚠️ REMOVIDO: Pattern duplicado de Tabs (ya está arriba con mayor prioridad)
    {
      pattern: new RegExp(`${ACTION_VERBS_PATTERN}.*sidebar`, 'i'),
      component: 'Sidebar',
      priority: 4,
    },
    {
      // ⚠️ MEJORADO: Solo detectar SubNav si NO hay otro componente mencionado explícitamente ANTES o DESPUÉS
      // Usar negative lookbehind y lookahead para evitar falsos positivos
      pattern: new RegExp(
        `(?!.*(?:card\s+content|cardcontent|contentcard|button|input|table|modal|drawer|tabs|accordion|carousel|gallery|stepper|timeline|header|footer|sidebar|breadcrumb|menu|select|checkbox|radio|datepicker|calendar|list|pagination|data\s*table|data-table).*subnav)${ACTION_VERBS_PATTERN}.*subnav(?!.*(?:card\s+content|cardcontent|contentcard|button|input|table|modal|drawer|tabs|accordion|carousel|gallery|stepper|timeline|header|footer|sidebar|breadcrumb|menu|select|checkbox|radio|datepicker|calendar|list|pagination|data\s*table|data-table))`,
        'i'
      ),
      component: 'SubNav',
      priority: 3, // Reducir prioridad para que otros componentes tengan preferencia
    },
  ];

  // Encontrar todos los componentes que coinciden
  const matches: Array<{
    component: string;
    priority: number;
    pattern: RegExp;
  }> = [];
  for (const { pattern, component, priority } of patterns) {
    if (pattern.test(message)) {
      matches.push({ component, priority: priority || 1, pattern });
      console.log(
        `   🔍 [detectComponentFromMessage] Patrón coincidió: ${component} (prioridad: ${priority || 1})`
      );
    }
  }

  // ⚠️ MEJORADO: Filtrar SubNav si hay otros componentes con mayor prioridad
  // SubNav solo debe detectarse si es el único componente mencionado
  if (matches.length > 1) {
    const subNavMatch = matches.find((m) => m.component === 'SubNav');
    const otherMatches = matches.filter((m) => m.component !== 'SubNav');

    if (subNavMatch && otherMatches.length > 0) {
      // Hay otros componentes además de SubNav, eliminar SubNav de las coincidencias
      console.log(
        `   ⚠️ [detectComponentFromMessage] SubNav detectado pero hay otros componentes, eliminando SubNav de coincidencias`
      );
      const filteredMatches = matches.filter((m) => m.component !== 'SubNav');
      matches.length = 0;
      matches.push(...filteredMatches);
    }
  }

  // Retornar el componente con mayor prioridad
  if (matches.length > 0) {
    matches.sort((a, b) => b.priority - a.priority);
    const selected = matches[0].component;
    console.log(
      `   ✅ [detectComponentFromMessage] Componente seleccionado: ${selected} (prioridad: ${matches[0].priority})`
    );
    if (matches.length > 1) {
      console.log(
        `   📋 [detectComponentFromMessage] Otros componentes detectados: ${matches
          .slice(1)
          .map((m) => `${m.component} (${m.priority})`)
          .join(', ')}`
      );
    }
    return selected;
  }

  console.log(
    `   ❌ [detectComponentFromMessage] No se detectó ningún componente`
  );
  return null;
}
