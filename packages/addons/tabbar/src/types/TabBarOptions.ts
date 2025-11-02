/**
 * Opciones para un item del TabBar
 */
export interface TabBarItem {
  /** ID único del tab */
  id: string;
  /** Texto del tab */
  label: string;
  /** Icono FontAwesome (sin prefijo, ej: 'th-large') */
  icon?: string;
  /** URL de imagen para avatar (alternativa a icono) */
  avatar?: string;
  /** Texto alternativo para el avatar */
  avatarAlt?: string;
  /** Callback al hacer click en el tab */
  onClick?: (item: TabBarItem, event: MouseEvent) => void;
}

/**
 * Sección del Floating Menu (puede ser accordion o enlace directo)
 */
export interface FloatingMenuSection {
  /** ID único de la sección */
  id: string;
  /** Título de la sección */
  title: string;
  /** Icono FontAwesome (sin prefijo, ej: 'graduation-cap') */
  icon: string;
  /** Si es un enlace directo (no accordion) */
  isLink?: boolean;
  /** URL del enlace directo */
  url?: string;
  /** Si el enlace es clickeable */
  clickable?: boolean;
  /** Subitems para accordions */
  subitems?: Array<{
    id: string;
    title: string;
    icon: string;
    url: string;
  }>;
}

/**
 * Item del Profile Menu
 */
export interface ProfileMenuItem {
  /** ID único del item */
  id: string;
  /** Label del item */
  label: string;
  /** Icono FontAwesome (sin prefijo) */
  icon: string;
  /** URL del enlace */
  url?: string;
  /** Callback cuando se hace click */
  onClick?: () => void;
}

/**
 * Opciones del componente TabBar
 */
export interface TabBarOptions {
  /** ID del contenedor donde renderizar el TabBar */
  containerId?: string;
  /** Contenedor DOM donde renderizar (alternativa a containerId) */
  container?: HTMLElement;
  /** Array de items del TabBar */
  items: TabBarItem[];
  /** ID del tab activo */
  activeTabId?: string;
  /** Callback cuando cambia el tab activo */
  onTabChange?: (tabId: string, item: TabBarItem, element: HTMLElement) => void;
  /** Mostrar el TabBar (por defecto false, solo visible en móvil) */
  visible?: boolean;
  /** Habilitar dark mode toggle automático */
  darkModeEnabled?: boolean;
  /** Callback para toggle de dark mode */
  onDarkModeToggle?: (isDark: boolean) => void;
  /** Secciones del Floating Menu (se muestra cuando se hace click en "Módulos") */
  floatingMenuSections?: FloatingMenuSection[];
  /** Items del Profile Menu (se muestra cuando se hace click en "Mi perfil") */
  profileMenuItems?: ProfileMenuItem[];
  /** Callback cuando se hace click en un item del Floating Menu */
  onFloatingMenuItemClick?: (sectionId: string, subitemId?: string, url?: string) => void;
  /** Callback cuando se hace click en un item del Profile Menu */
  onProfileMenuItemClick?: (itemId: string, item: ProfileMenuItem) => void;
}

