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
  'basicos-scrollbar': 'Básicos/Scrollbar',
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
  'feedback-drawer-navigation': 'Feedback/Drawer Navigation',
  'feedback-popover': 'Feedback/Popover',
  'feedback-alert': 'Feedback/Alert',
  'feedback-toast': 'Feedback/Toast',
  'feedback-tooltip': 'Feedback/Tooltip',
  'feedback-empty-state': 'Feedback/Empty State',
  'feedback-mask': 'Feedback/Mask',
  'feedback-button-feedback': 'Feedback/Button Feedback',

  // Data
  'data-data-table': 'Data/Data Table',
  'data-dataview': 'Data/DataView',
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
  'layout-card-content': 'Layout/Card Content',
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

// ⚠️ Mapeos adicionales para nombres de componentes sin categoría
// Estos se usan cuando el componente se detecta como "RadioButton" en lugar de "Formularios/Radio Button"
const ADDITIONAL_COMPONENT_NAME_MAPPINGS: Record<string, string> = {
  // Básicos
  Button: 'Básicos/Button',
  ButtonAI: 'Básicos/ButtonAI',
  Avatar: 'Básicos/Avatar',
  Badge: 'Básicos/Badge',
  Chip: 'Básicos/Chip',
  Scrollbar: 'Básicos/Scrollbar',
  Skeleton: 'Básicos/Skeleton',
  Spinner: 'Básicos/Spinner',
  StatusTag: 'Básicos/Status Tag',
  'Status Tag': 'Básicos/Status Tag',

  // Formularios
  Input: 'Formularios/Input',
  Checkbox: 'Formularios/Checkbox',
  RadioButton: 'Formularios/Radio Button',
  Radio: 'Formularios/Radio Button',
  Select: 'Formularios/Select',
  Calendar: 'Formularios/Calendar',
  FileUpload: 'Formularios/File Upload',
  'File Upload': 'Formularios/File Upload',
  Toggle: 'Formularios/Toggle',
  Slider: 'Formularios/Slider',
  SearchButton: 'Formularios/Search Button',
  'Search Button': 'Formularios/Search Button',

  // Feedback
  Modal: 'Feedback/Modal',
  Drawer: 'Feedback/Drawer Navigation',
  'Drawer Navigation': 'Feedback/Drawer Navigation',
  Popover: 'Feedback/Popover',
  Alert: 'Feedback/Alert',
  Toast: 'Feedback/Toast',
  Tooltip: 'Feedback/Tooltip',
  EmptyState: 'Feedback/Empty State',
  'Empty State': 'Feedback/Empty State',
  Mask: 'Feedback/Mask',
  ButtonFeedback: 'Feedback/Button Feedback',
  'Button Feedback': 'Feedback/Button Feedback',

  // Data
  DataTable: 'Data/Data Table',
  'Data Table': 'Data/Data Table',
  DataView: 'Data/DataView',
  Pagination: 'Data/Pagination',
  List: 'Data/List',

  // Navegación
  Tabs: 'Navegación/Tabs',
  Sidebar: 'Navegación/Sidebar',
  SubNav: 'Navegación/SubNav',
  TabBar: 'Navegación/TabBar',
  Breadcrumb: 'Navegación/Breadcrumb',
  Menu: 'Navegación/Menu',
  'Menu de Participantes': 'Navegación/Menu de Participantes',
  MenuParticipantes: 'Navegación/Menu de Participantes',
  SegmentControl: 'Navegación/Segment Control',
  'Segment Control': 'Navegación/Segment Control',
  TreeMenu: 'Navegación/TreeMenu',

  // Layout
  Card: 'Layout/Card Content',
  'Card Content': 'Layout/Card Content',
  Accordion: 'Layout/Accordion',
  Carousel: 'Layout/Carousel',
  Stepper: 'Layout/Stepper',
  Timeline: 'Layout/Timeline',
  Gallery: 'Layout/Gallery',
  Contenedor: 'Layout/Contenedor',
  HeaderSection: 'Layout/HeaderSection',
  SelectionCard: 'Layout/Selection Card',
  'Selection Card': 'Layout/Selection Card',
  SimpleCard: 'Layout/Simple Card',
  'Simple Card': 'Layout/Simple Card',

  // Charts
  BarMetricCard: 'Charts/Bar Metric Card',
  'Bar Metric Card': 'Charts/Bar Metric Card',
  CircleMetricCard: 'Charts/Circle Metric Card',
  'Circle Metric Card': 'Charts/Circle Metric Card',
  CSATMetricCard: 'Charts/CSAT Metric Card',
  'CSAT Metric Card': 'Charts/CSAT Metric Card',
  NPSCard: 'Charts/NPS Card',
  'NPS Card': 'Charts/NPS Card',
  ProgressBar: 'Charts/Progress Bar',
  'Progress Bar': 'Charts/Progress Bar',
  ScoreCardMetrics: 'Charts/Score Card Metrics',
  'Score Card Metrics': 'Charts/Score Card Metrics',
  TextMetricCard: 'Charts/Text Metric Card',
  'Text Metric Card': 'Charts/Text Metric Card',
};

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

  // ⚠️ NUEVO: Primero intentar mapeo adicional (RadioButton → Formularios/Radio Button)
  const mappedName = ADDITIONAL_COMPONENT_NAME_MAPPINGS[componentName];
  if (mappedName) {
    // Luego convertir el nombre completo a ID
    return COMPONENT_NAME_TO_STORYBOOK_ID[mappedName] || null;
  }

  // Si no hay mapeo adicional, buscar directamente
  return COMPONENT_NAME_TO_STORYBOOK_ID[componentName] || null;
}
