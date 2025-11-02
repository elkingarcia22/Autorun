/**
 * Tipos TypeScript para el componente SubNav
 */

export type SubNavVariant = 
  | 'template'
  | 'aprendizaje'
  | 'desempeno'
  | 'encuestas'
  | 'tareas'
  | 'empresa'
  | 'admin-aprendizaje'
  | 'admin-desempeno';

export interface SubNavTab {
  /**
   * ID único del tab
   */
  id: string;

  /**
   * Label/texto del tab
   */
  label: string;

  /**
   * Icono FontAwesome (clase completa, ej: "far fa-home")
   */
  icon: string;

  /**
   * URL a la que redirige al hacer click (opcional)
   */
  url?: string;

  /**
   * Callback cuando se hace click (opcional, usado si no hay URL)
   */
  onClick?: (event: MouseEvent) => void;

  /**
   * Si el tab está activo
   */
  active?: boolean;
}

export interface SubNavOptions {
  /**
   * ID del contenedor donde se renderizará el sub-nav
   */
  containerId: string;

  /**
   * Variante del sub-nav
   * @default 'template'
   */
  variant?: SubNavVariant;

  /**
   * Tabs personalizados (para variante template)
   */
  tabs?: SubNavTab[];

  /**
   * ID del tab activo
   */
  activeTabId?: string;


  /**
   * Callback cuando cambia el tab activo
   */
  onTabChange?: (tabId: string, tabElement: HTMLElement) => void;
}

