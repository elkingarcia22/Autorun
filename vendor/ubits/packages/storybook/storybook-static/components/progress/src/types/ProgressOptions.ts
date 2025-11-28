/**
 * Segmento de progreso con color específico
 */
export interface ProgressSegment {
  /**
   * Porcentaje del segmento (0-100)
   */
  value: number;
  
  /**
   * Color del segmento
   */
  color: 'yellow' | 'green' | 'gray' | 'info' | 'error';
}

/**
 * Opciones para crear un Progress Bar
 */
export interface ProgressOptions {
  /**
   * Tamaño del progress bar
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  
  /**
   * Valor del progreso (0-100)
   * Solo se usa cuando variant es 'default'
   */
  value?: number;
  
  /**
   * Variante del progress bar
   * - 'default': Un solo color (azul neutral)
   * - 'multi-color': Múltiples segmentos con diferentes colores
   */
  variant?: 'default' | 'multi-color';
  
  /**
   * Segmentos para la variante multi-color
   * Cada segmento representa una porción del progreso con su color
   */
  segments?: ProgressSegment[];
  
  /**
   * Indicador de texto (porcentaje o texto personalizado)
   * Si es true, muestra el porcentaje automáticamente
   * Si es string, muestra ese texto
   */
  indicator?: boolean | string;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * ID del contenedor donde se insertará el progress bar
   */
  containerId?: string;
}

