/**
 * Opciones para crear un Drawer Navigation
 */
export interface DrawerOptions {
  /**
   * ID del contenedor donde se renderizará el drawer
   */
  containerId?: string;

  /**
   * Título del drawer (requerido)
   */
  title: string;

  /**
   * Texto complementario opcional debajo del título
   */
  complementaryText?: string;

  /**
   * Ancho del drawer como porcentaje del viewport
   * Opciones: 100, 80, 60, 50, 40, 30
   */
  width?: 100 | 80 | 60 | 50 | 40 | 30;

  /**
   * Contenido del body del drawer (HTML string o función que retorna HTML)
   */
  bodyContent?: string | (() => string);

  /**
   * Configuración de botones del footer
   */
  footerButtons?: {
    /**
     * Botón terciario (izquierda)
     */
    tertiary?: {
      label: string;
      onClick?: (event: MouseEvent) => void;
    };
    /**
     * Botón secundario (derecha)
     */
    secondary?: {
      label: string;
      onClick?: (event: MouseEvent) => void;
    };
    /**
     * Botón primario (derecha)
     */
    primary?: {
      label: string;
      onClick?: (event: MouseEvent) => void;
    };
  };

  /**
   * Callback cuando se hace clic en el botón de cerrar
   */
  onClose?: () => void;

  /**
   * Si el drawer está abierto inicialmente
   */
  open?: boolean;

  /**
   * Si se debe cerrar al hacer clic en el overlay
   */
  closeOnOverlayClick?: boolean;

  /**
   * Clases CSS adicionales
   */
  className?: string;
}

