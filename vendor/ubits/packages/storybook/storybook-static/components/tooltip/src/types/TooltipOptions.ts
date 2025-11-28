/**
 * Opciones para crear un tooltip
 */
export interface TooltipOptions {
  /**
   * Título del tooltip
   */
  title?: string;
  
  /**
   * Mostrar título
   */
  showTitle?: boolean;
  
  /**
   * Descripción o mensaje del tooltip
   */
  description?: string;
  
  /**
   * Mostrar descripción
   */
  showDescription?: boolean;
  
  /**
   * Texto del botón de acción principal (opcional)
   */
  primaryButtonLabel?: string;
  
  /**
   * Callback cuando se hace clic en el botón primario
   */
  onPrimaryAction?: () => void;
  
  /**
   * Mostrar botón primario
   */
  showPrimaryButton?: boolean;
  
  /**
   * Icono del botón primario (opcional)
   */
  primaryButtonIcon?: string;
  
  /**
   * Mostrar icono en el botón primario
   */
  showPrimaryButtonIcon?: boolean;
  
  /**
   * Texto del botón secundario (opcional)
   */
  secondaryButtonLabel?: string;
  
  /**
   * Callback cuando se hace clic en el botón secundario
   */
  onSecondaryAction?: () => void;
  
  /**
   * Mostrar botón secundario
   */
  showSecondaryButton?: boolean;
  
  /**
   * Icono del botón secundario (opcional)
   */
  secondaryButtonIcon?: string;
  
  /**
   * Mostrar icono en el botón secundario
   */
  showSecondaryButtonIcon?: boolean;
  
  /**
   * Texto del botón terciario (opcional)
   */
  tertiaryButtonLabel?: string;
  
  /**
   * Callback cuando se hace clic en el botón terciario
   */
  onTertiaryAction?: () => void;
  
  /**
   * Mostrar botón terciario
   */
  showTertiaryButton?: boolean;
  
  /**
   * Icono del botón terciario (opcional)
   */
  tertiaryButtonIcon?: string;
  
  /**
   * Mostrar icono en el botón terciario
   */
  showTertiaryButtonIcon?: boolean;
  
  /**
   * Posición del tail (flecha)
   * Opciones: 'top', 'bottom', 'left', 'right'
   * @default 'top'
   */
  tailPosition?: 'top' | 'bottom' | 'left' | 'right';
  
  /**
   * Offset del tail desde el centro (en píxeles)
   * @default 0
   */
  tailOffset?: number;
  
  /**
   * Ancho del tooltip
   * Opciones: 'sm' (240px), 'md' (320px), 'lg' (400px)
   * @default 'md'
   */
  width?: 'sm' | 'md' | 'lg';
  
  /**
   * Posición del tooltip (coordenadas absolutas)
   */
  position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  
  /**
   * Elemento de referencia para posicionar el tooltip
   */
  referenceElement?: HTMLElement;
  
  /**
   * Si el tooltip está abierto inicialmente
   */
  open?: boolean;
  
  /**
   * Callback cuando se cierra el tooltip
   */
  onClose?: () => void;
  
  /**
   * Si se debe cerrar al hacer clic fuera
   */
  closeOnOutsideClick?: boolean;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Estilos inline adicionales
   */
  style?: string;
}

