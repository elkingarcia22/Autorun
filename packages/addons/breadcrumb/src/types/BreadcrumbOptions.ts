/**
 * Tipos TypeScript para el componente Breadcrumb
 */

export interface BreadcrumbItem {
  /**
   * ID único del item del breadcrumb
   */
  id: string;

  /**
   * Label/texto del item
   */
  label: string;

  /**
   * URL a la que redirige al hacer click (opcional)
   */
  url?: string;

  /**
   * Callback cuando se hace click (opcional, usado si no hay URL)
   */
  onClick?: (event: MouseEvent) => void;

  /**
   * Si el item está activo (último item del breadcrumb)
   */
  active?: boolean;

  /**
   * Si el item está deshabilitado
   */
  disabled?: boolean;
}

export interface BreadcrumbOptions {
  /**
   * Array de items del breadcrumb
   */
  items: BreadcrumbItem[];

  /**
   * Separador entre items (por defecto: ">")
   */
  separator?: string;

  /**
   * Callback cuando se hace click en un item
   */
  onItemClick?: (itemId: string, itemElement: HTMLElement) => void;

  /**
   * Clases CSS adicionales para el contenedor
   */
  className?: string;
}

