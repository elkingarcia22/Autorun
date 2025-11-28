import type { PopoverOptions } from '../../popover/src/types/PopoverOptions';

/**
 * Opciones para crear un Mask (máscara de onboarding)
 */
export interface MaskOptions {
  /**
   * ID del contenedor donde se renderizará la máscara
   */
  containerId?: string;

  /**
   * Selector CSS o elemento HTML que se quiere destacar
   */
  targetElement: string | HTMLElement;

  /**
   * Configuración del Popover que se mostrará
   */
  popover: PopoverOptions;

  /**
   * Padding adicional alrededor del elemento destacado (en píxeles)
   * @default 8
   */
  padding?: number;

  /**
   * Si se debe cerrar al hacer clic en el overlay
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Callback cuando se cierra la máscara
   */
  onClose?: () => void;

  /**
   * Si la máscara está abierta inicialmente
   * @default false
   */
  open?: boolean;

  /**
   * Posición del popover relativa al elemento destacado
   * @default 'auto'
   */
  popoverPosition?: 'auto' | 'top' | 'bottom' | 'left' | 'right';

  /**
   * Offset del popover desde el elemento destacado (en píxeles)
   * @default 12
   */
  popoverOffset?: number;

  /**
   * Clases CSS adicionales
   */
  className?: string;
}

