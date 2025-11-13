/**
 * Tipos TypeScript para el componente Tabs
 */

export interface TabItem {
  /**
   * ID único del tab
   */
  id: string;

  /**
   * Label/texto del tab
   */
  label: string;

  /**
   * Icono FontAwesome (clase completa, ej: "far fa-home" o "fas fa-grid")
   * Opcional: si no se proporciona, el tab se renderiza sin icono
   */
  icon?: string;

  /**
   * Si el tab está activo
   */
  active?: boolean;

  /**
   * URL a la que redirige al hacer click (opcional)
   */
  url?: string;

  /**
   * Callback cuando se hace click (opcional, usado si no hay URL)
   */
  onClick?: (event: MouseEvent) => void;

  /**
   * Si el tab está deshabilitado
   */
  disabled?: boolean;
}

export interface TabsOptions {
  /**
   * Array de tabs a mostrar
   */
  tabs: TabItem[];

  /**
   * ID del tab activo (opcional, si no se proporciona se usa el primer tab con active: true)
   */
  activeTabId?: string;

  /**
   * Callback cuando cambia el tab activo
   */
  onTabChange?: (tabId: string, tabElement: HTMLElement) => void;

  /**
   * Clases CSS adicionales para el contenedor
   */
  className?: string;
}

