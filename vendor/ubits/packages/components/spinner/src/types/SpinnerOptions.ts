/**
 * Opciones para crear un spinner/loader
 */
export interface SpinnerOptions {
  /**
   * Tamaño del spinner
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Variante del spinner
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  
  /**
   * Si el spinner está animado
   */
  animated?: boolean;
  
  /**
   * Texto a mostrar debajo del spinner (opcional)
   */
  label?: string;
  
  /**
   * Si el spinner debe ocupar todo el contenedor (centrado)
   */
  fullScreen?: boolean;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Estilos inline adicionales
   */
  style?: string;
}

