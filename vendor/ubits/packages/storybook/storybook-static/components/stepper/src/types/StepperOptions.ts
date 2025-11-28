/**
 * Estado de un paso del stepper
 */
export type StepperStepState = 'default' | 'completed' | 'active' | 'error' | 'warning';

/**
 * Orientación del stepper
 */
export type StepperOrientation = 'horizontal' | 'vertical';

/**
 * Opciones de un paso individual del stepper
 */
export interface StepperStep {
  /**
   * Número del paso (1, 2, 3, etc.)
   */
  number: number;
  
  /**
   * Título del paso
   */
  title: string;
  
  /**
   * Descripción o texto complementario del paso
   */
  description?: string;
  
  /**
   * Estado del paso
   */
  state?: StepperStepState;
}

/**
 * Tamaño del stepper
 */
export type StepperSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Opciones para crear un Stepper
 */
export interface StepperOptions {
  /**
   * Orientación del stepper
   */
  orientation?: StepperOrientation;
  
  /**
   * Tamaño del stepper
   */
  size?: StepperSize;
  
  /**
   * Mostrar títulos
   */
  showTitle?: boolean;
  
  /**
   * Mostrar descripciones (texto complementario)
   */
  showDescription?: boolean;
  
  /**
   * Array de pasos del stepper
   */
  steps: StepperStep[];
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * ID del contenedor donde se insertará el stepper
   */
  containerId?: string;
}

