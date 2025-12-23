/**
 * Mapeo de IDs de Storybook a nombres de componentes para el nuevo MCP
 *
 * El nuevo MCP (https://github.com/mcpland/storybook-mcp) usa nombres de componentes
 * como "Button", "Input", etc., en lugar de IDs como "basicos-button"
 */

/**
 * Mapeo de IDs de Storybook a nombres de componentes COMPLETOS
 *
 * ⚠️ CRÍTICO: El MCP necesita los nombres completos como aparecen en Storybook
 * Ejemplo: "Básicos/Button" en lugar de "Button"
 */
const STORYBOOK_ID_TO_COMPONENT_NAME: Record<string, string> = {
  // Básicos
  'basicos-button': 'Básicos/Button',
  'basicos-buttonai': 'Básicos/ButtonAI',
  'basicos-avatar': 'Básicos/Avatar',
  'basicos-badge': 'Básicos/Badge',
  'basicos-chip': 'Básicos/Chip',
  'basicos-skeleton': 'Básicos/Skeleton',
  'basicos-spinner': 'Básicos/Spinner',
  'basicos-status-tag': 'Básicos/Status Tag',

  // Formularios
  'formularios-input': 'Formularios/Input',
  'formularios-checkbox': 'Formularios/Checkbox',
  'formularios-radio-button': 'Formularios/Radio Button',
  'formularios-select': 'Formularios/Select',
  'formularios-calendar': 'Formularios/Calendar',
  'formularios-file-upload': 'Formularios/File Upload',
  'formularios-toggle': 'Formularios/Toggle',
  'formularios-slider': 'Formularios/Slider',
  'formularios-search-button': 'Formularios/Search Button',

  // Feedback
  'feedback-modal': 'Feedback/Modal',
  'feedback-drawer': 'Feedback/Drawer Navigation',
  'feedback-popover': 'Feedback/Popover',
  'feedback-alert': 'Feedback/Alert',
  'feedback-toast': 'Feedback/Toast',
  'feedback-tooltip': 'Feedback/Tooltip',
  'feedback-empty-state': 'Feedback/Empty State',
  'feedback-mask': 'Feedback/Mask',
  'feedback-button-feedback': 'Feedback/Button Feedback',

  // Data
  'data-data-table': 'Data/Data Table',
  'data-pagination': 'Data/Pagination',
  'data-list': 'Data/List',

  // Navegación
  'navegación-tabs': 'Navegación/Tabs',
  'navegación-sidebar': 'Navegación/Sidebar',
  'navegación-subnav': 'Navegación/SubNav',
  'navegación-tabbar': 'Navegación/TabBar',
  'navegación-breadcrumb': 'Navegación/Breadcrumb',
  'navegación-menu': 'Navegación/Menu',
  'navegación-menu-de-participantes': 'Navegación/Menu de Participantes',
  'navegación-segment-control': 'Navegación/Segment Control',
  'navegación-treemenu': 'Navegación/TreeMenu',

  // Layout
  'layout-card': 'Layout/Card Content',
  'layout-accordion': 'Layout/Accordion',
  'layout-carousel': 'Layout/Carousel',
  'layout-stepper': 'Layout/Stepper',
  'layout-timeline': 'Layout/Timeline',
  'layout-gallery': 'Layout/Gallery',
  'layout-contenedor': 'Layout/Contenedor',
  'layout-headersection': 'Layout/HeaderSection',
  'layout-selection-card': 'Layout/Selection Card',
  'layout-simple-card': 'Layout/Simple Card',

  // Charts
  'charts-bar-metric-card': 'Charts/Bar Metric Card',
  'charts-circle-metric-card': 'Charts/Circle Metric Card',
  'charts-csat-metric-card': 'Charts/CSAT Metric Card',
  'charts-nps-card': 'Charts/NPS Card',
  'charts-progress-bar': 'Charts/Progress Bar',
  'charts-score-card-metrics': 'Charts/Score Card Metrics',
  'charts-text-metric-card': 'Charts/Text Metric Card',
};

/**
 * Convierte un ID de Storybook a nombre de componente para el MCP
 */
export function storybookIdToComponentName(storybookId: string): string | null {
  // Si ya es un nombre de componente (empieza con mayúscula), devolverlo tal cual
  if (/^[A-Z]/.test(storybookId)) {
    return storybookId;
  }

  // Buscar en el mapeo
  return STORYBOOK_ID_TO_COMPONENT_NAME[storybookId] || null;
}

/**
 * Convierte múltiples IDs de Storybook a nombres de componentes
 */
export function storybookIdsToComponentNames(storybookIds: string[]): string[] {
  return storybookIds
    .map((id) => storybookIdToComponentName(id))
    .filter((name): name is string => name !== null);
}

/**
 * Mapeo inverso: nombre de componente a ID de Storybook
 */
const COMPONENT_NAME_TO_STORYBOOK_ID: Record<string, string> =
  Object.fromEntries(
    Object.entries(STORYBOOK_ID_TO_COMPONENT_NAME).map(([id, name]) => [
      name,
      id,
    ])
  );

/**
 * Convierte un nombre de componente a ID de Storybook
 */
export function componentNameToStorybookId(
  componentName: string
): string | null {
  // Si ya es un ID (no empieza con mayúscula), devolverlo tal cual
  if (!/^[A-Z]/.test(componentName)) {
    return componentName;
  }

  return COMPONENT_NAME_TO_STORYBOOK_ID[componentName] || null;
}
