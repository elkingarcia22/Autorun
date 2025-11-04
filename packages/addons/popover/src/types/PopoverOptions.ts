/**
 * Opciones para crear un Popover
 */
export interface PopoverOptions {
  /**
   * ID del contenedor donde se renderizará el popover
   */
  containerId?: string;

  /**
   * Título del popover (opcional)
   */
  title?: string;

  /**
   * Contenido del body del popover (HTML string o función que retorna HTML)
   */
  bodyContent?: string | (() => string);

  /**
   * Ancho del popover
   * Opciones: 'sm' (240px), 'md' (360px), 'lg' (400px), 'xl' (480px)
   * @default 'md'
   */
  width?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Posición del tail (flecha)
   * Opciones: 'top', 'bottom', 'left', 'right'
   * @default 'top'
   */
  tailPosition?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Offset horizontal del tail desde el centro (en píxeles)
   * @default 0
   */
  tailOffset?: number;

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
   * Callback cuando se hace clic fuera del popover
   */
  onClose?: () => void;

  /**
   * Si el popover está abierto inicialmente
   */
  open?: boolean;

  /**
   * Si se debe cerrar al hacer clic fuera
   */
  closeOnOutsideClick?: boolean;

  /**
   * Posición del popover (coordenadas absolutas)
   */
  position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };

  /**
   * Elemento de referencia para posicionar el popover
   */
  referenceElement?: HTMLElement;

  /**
   * Clases CSS adicionales
   */
  className?: string;
}

