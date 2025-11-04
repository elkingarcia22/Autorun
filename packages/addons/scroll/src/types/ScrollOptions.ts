/**
 * Opciones para crear un Scrollbar
 */
export interface ScrollOptions {
  /**
   * ID del contenedor donde se renderizará el scrollbar
   */
  containerId?: string;

  /**
   * Orientación del scrollbar
   * 'vertical' (por defecto) o 'horizontal'
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * Estado del scrollbar
   */
  state?: 'default';

  /**
   * ID del elemento scrollable al que está asociado el scrollbar
   */
  targetId?: string;

  /**
   * Clases CSS adicionales
   */
  className?: string;
}

