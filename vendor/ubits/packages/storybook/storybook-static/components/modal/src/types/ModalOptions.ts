/**
 * Opciones para crear un Modal
 */
export interface ModalOptions {
  /**
   * ID del contenedor donde se renderizará el modal
   */
  containerId?: string;

  /**
   * Título del modal (requerido)
   */
  title: string;

  /**
   * Contenido del body del modal (HTML string o función que retorna HTML)
   */
  bodyContent?: string | (() => string);

  /**
   * Ancho del modal
   * Opciones: 'sm' (320px), 'md' (480px), 'lg' (640px), 'xl' (800px), 'full' (1280px)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Si el modal debe ocupar altura máxima (full-screen)
   */
  fullScreen?: boolean;

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
   * Si el modal está abierto inicialmente
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

