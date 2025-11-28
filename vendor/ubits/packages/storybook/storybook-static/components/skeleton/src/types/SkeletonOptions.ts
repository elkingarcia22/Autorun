/**
 * Opciones para crear un skeleton loader
 */
export interface SkeletonOptions {
  /**
   * Variante del skeleton
   * - 'text': Líneas de texto
   * - 'circle': Círculo (para avatares)
   * - 'rectangle': Rectángulo (para imágenes, cards)
   * - 'custom': Forma personalizada
   */
  variant?: 'text' | 'circle' | 'rectangle' | 'custom';
  
  /**
   * Tamaño del skeleton
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Ancho del skeleton (para text y rectangle)
   * Puede ser un número (px), porcentaje, o 'full' para 100%
   */
  width?: number | string | 'full';
  
  /**
   * Alto del skeleton (para rectangle y custom)
   * Puede ser un número (px) o porcentaje
   */
  height?: number | string;
  
  /**
   * Número de líneas de texto (solo para variant='text')
   */
  lines?: number;
  
  /**
   * Si el skeleton debe tener animación de pulso
   */
  animated?: boolean;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Estilos inline adicionales
   */
  style?: string;
}

