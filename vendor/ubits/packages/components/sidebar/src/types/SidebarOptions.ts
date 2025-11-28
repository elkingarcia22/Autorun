/**
 * Tipos TypeScript para el componente Sidebar
 */

export type SidebarVariant = 'colaborador' | 'admin';

export type SidebarButtonState = 'default' | 'active' | 'disabled';

export interface SidebarButton {
  /**
   * ID único de la sección (data-section)
   */
  section: string;

  /**
   * Icono FontAwesome (clase completa, ej: "far fa-graduation-cap")
   */
  icon: string;

  /**
   * Texto del tooltip
   */
  tooltip: string;

  /**
   * URL a la que redirige al hacer click (opcional)
   */
  href?: string;

  /**
   * Callback cuando se hace click (opcional)
   */
  onClick?: (event: MouseEvent) => void;

  /**
   * Estado del botón
   * @default 'default'
   */
  state?: SidebarButtonState;
}

export interface SidebarFooterButton extends SidebarButton {
  /**
   * ID especial para botones del footer (ej: 'darkmode-toggle')
   */
  id?: string;
}

export interface ProfileMenuItem {
  /**
   * Icono FontAwesome
   */
  icon: string;

  /**
   * Texto del item
   */
  label: string;

  /**
   * URL a la que redirige (opcional)
   */
  href?: string;

  /**
   * Callback cuando se hace click (opcional)
   */
  onClick?: () => void;

  /**
   * Si es un divider
   */
  divider?: boolean;
}

export interface SidebarOptions {
  /**
   * ID del contenedor donde se renderizará el sidebar
   */
  containerId: string;

  /**
   * Variante del sidebar: 'colaborador' o 'admin'
   * @default 'colaborador'
   */
  variant?: SidebarVariant;

  /**
   * Botones del body (navegación principal)
   */
  bodyButtons: SidebarButton[];

  /**
   * Botones del footer (opcionales, solo en admin: API, Centro de ayuda)
   */
  footerButtons?: SidebarFooterButton[];

  /**
   * URL del logo (por defecto usa 'index.html' o 'admin.html' según variant)
   */
  logoHref?: string;

  /**
   * URL de la imagen del logo
   * @default 'images/Ubits-logo.svg'
   */
  logoImage?: string;

  /**
   * Altura del sidebar (se ajusta dinámicamente si no se especifica)
   */
  height?: number | string;

  /**
   * Callback cuando cambia el botón activo
   */
  onActiveButtonChange?: (section: string) => void;

  /**
   * Items del menú de perfil
   */
  profileMenuItems?: ProfileMenuItem[];

  /**
   * URL de la imagen del avatar
   * @default 'images/Profile-image.jpg'
   */
  avatarImage?: string;

  /**
   * Callback cuando se hace click en el avatar
   */
  onAvatarClick?: () => void;

  /**
   * Si el dark mode toggle está habilitado
   * @default true
   */
  darkModeEnabled?: boolean;

  /**
   * Callback cuando se cambia el dark mode
   */
  onDarkModeToggle?: (isDark: boolean) => void;

  /**
   * Clases CSS adicionales
   */
  className?: string;

  /**
   * Atributos HTML adicionales
   */
  attributes?: { [key: string]: string };
}

