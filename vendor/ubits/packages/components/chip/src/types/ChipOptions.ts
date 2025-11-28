/**
 * Opciones para crear un Chip
 */
export interface ChipOptions {
  /**
   * Texto del chip
   */
  label: string;
  
  /**
   * Tamaño del chip
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  
  /**
   * Estado del chip
   */
  state?: 'default' | 'hover' | 'active' | 'pressed' | 'focus' | 'disabled';
  
  /**
   * Icono izquierdo (nombre del icono FontAwesome sin el prefijo 'fa-')
   */
  leftIcon?: string;
  
  /**
   * Icono derecho (normalmente botón de cerrar)
   * Si se especifica, muestra un botón de cerrar con ese icono
   */
  rightIcon?: string;
  
  /**
   * Si el chip es clickeable
   */
  clickable?: boolean;
  
  /**
   * Si el chip tiene botón de cerrar
   */
  closable?: boolean;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Callback cuando se hace click en el chip
   */
  onClick?: (event: MouseEvent) => void;
  
  /**
   * Callback cuando se hace click en el botón de cerrar
   */
  onClose?: (event: MouseEvent) => void;
  
  /**
   * ID del contenedor donde se renderizará el chip
   */
  containerId?: string;
}
