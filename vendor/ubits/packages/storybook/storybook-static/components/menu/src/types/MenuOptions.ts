/**
 * Tipos TypeScript para el componente Menu
 */

export interface MenuBadge {
  /**
   * Contenido del badge (número o texto)
   */
  content: string | number;
  
  /**
   * Variante del badge
   */
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export interface MenuItem {
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
   * Badge del item (opcional)
   */
  badge?: MenuBadge;
  
  /**
   * Si el item está activo/seleccionado
   */
  active?: boolean;
  
  /**
   * URL a la que redirige (opcional)
   */
  href?: string;
  
  /**
   * Callback cuando se hace click (opcional)
   */
  onClick?: (event: MouseEvent, item: MenuItem) => void;
  
  /**
   * Si el item está deshabilitado
   */
  disabled?: boolean;
}

export interface MenuSection {
  /**
   * ID único de la sección
   */
  id: string;
  
  /**
   * Título de la sección
   */
  title: string;
  
  /**
   * Items de la sección
   */
  items: MenuItem[];
}

export interface MenuUserInfo {
  /**
   * URL de la imagen del avatar
   */
  avatarImage: string;
  
  /**
   * Nombre del usuario
   */
  name: string;
  
  /**
   * Rol del usuario
   */
  role: string;
  
  /**
   * Callback cuando se hace click en el avatar (opcional)
   */
  onAvatarClick?: () => void;
}

export interface MenuOptions {
  /**
   * ID del contenedor donde se renderizará el menú
   */
  containerId?: string;
  
  /**
   * Logo de la aplicación (URL de la imagen)
   */
  logoImage?: string;
  
  /**
   * Nombre de la aplicación
   */
  appName?: string;
  
  /**
   * URL a la que redirige el logo (opcional)
   */
  logoHref?: string;
  
  /**
   * Secciones del menú
   */
  sections: MenuSection[];
  
  /**
   * Información del usuario (opcional)
   */
  userInfo?: MenuUserInfo;
  
  /**
   * Ancho del menú
   */
  width?: string | number;
  
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
  onActiveItemChange?: (itemId: string, sectionId: string) => void;
}

