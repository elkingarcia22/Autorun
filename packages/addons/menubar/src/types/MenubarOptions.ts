/**
 * Tipos TypeScript para el componente Menubar
 */

export interface MenubarSubmenuItem {
  /**
   * ID único del subitem
   */
  id: string;
  
  /**
   * Texto del subitem
   */
  label: string;
  
  /**
   * Icono FontAwesome (nombre sin prefijo fa-)
   */
  icon?: string;
  
  /**
   * Estilo del icono
   */
  iconStyle?: 'regular' | 'solid';
  
  /**
   * URL a la que redirige (opcional)
   */
  href?: string;
  
  /**
   * Callback cuando se hace click (opcional)
   */
  onClick?: (event: MouseEvent, item: MenubarSubmenuItem) => void;
  
  /**
   * Si el subitem está deshabilitado
   */
  disabled?: boolean;
  
  /**
   * Submenú anidado (opcional, para menús de 3 niveles)
   */
  submenu?: MenubarSubmenuItem[];
  
  /**
   * Si el subitem está activo/seleccionado
   */
  active?: boolean;
}

export interface MenubarItem {
  /**
   * ID único del item
   */
  id: string;
  
  /**
   * Texto del item
   */
  label: string;
  
  /**
   * Icono FontAwesome (nombre sin prefijo fa-)
   */
  icon?: string;
  
  /**
   * Estilo del icono
   */
  iconStyle?: 'regular' | 'solid';
  
  /**
   * URL a la que redirige (opcional, si no hay submenu)
   */
  href?: string;
  
  /**
   * Callback cuando se hace click (opcional, si no hay submenu)
   */
  onClick?: (event: MouseEvent, item: MenubarItem) => void;
  
  /**
   * Submenú del item (opcional)
   */
  submenu?: MenubarSubmenuItem[];
  
  /**
   * Si el item está activo/seleccionado
   */
  active?: boolean;
  
  /**
   * Si el item está deshabilitado
   */
  disabled?: boolean;
}

export interface MenubarOptions {
  /**
   * ID del contenedor donde se renderizará el menubar
   */
  containerId?: string;
  
  /**
   * Items del menubar
   */
  items: MenubarItem[];
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Atributos HTML adicionales
   */
  attributes?: Record<string, string>;
  
  /**
   * Callback cuando cambia el item activo
   */
  onActiveItemChange?: (itemId: string, parentId?: string) => void;
  
  /**
   * Callback cuando se hace click en un item
   */
  onItemClick?: (itemId: string, item: MenubarItem | MenubarSubmenuItem) => void;
}

