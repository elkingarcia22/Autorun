/**
 * Tipos TypeScript para el componente StatsCard
 * Componente para mostrar métricas y estadísticas usando tokens UBITS
 */

export type StatsCardVariant = 'default' | 'highlight' | 'success' | 'warning' | 'error' | 'info';

export type StatsCardSize = 'sm' | 'md' | 'lg';

export interface StatItem {
  /**
   * Etiqueta o título de la métrica
   */
  label: string;
  
  /**
   * Valor de la métrica (puede ser número o string)
   */
  value: string | number;
  
  /**
   * Icono opcional (nombre de FontAwesome sin el prefijo 'fa-')
   */
  icon?: string;
  
  /**
   * Estilo del icono FontAwesome
   * @default 'regular'
   */
  iconStyle?: 'regular' | 'solid';
  
  /**
   * Color del icono (usando tokens UBITS)
   */
  iconColor?: string;
  
  /**
   * Cambio porcentual (opcional, para mostrar tendencias)
   */
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    label?: string;
  };
  
  /**
   * Descripción adicional opcional
   */
  description?: string;
}

export interface StatsCardOptions {
  /**
   * Título principal de la tarjeta
   */
  title?: string;
  
  /**
   * Variante visual de la tarjeta
   * @default 'default'
   */
  variant?: StatsCardVariant;
  
  /**
   * Tamaño de la tarjeta
   * @default 'md'
   */
  size?: StatsCardSize;
  
  /**
   * Array de métricas a mostrar
   */
  stats: StatItem[];
  
  /**
   * Layout de las métricas: 'grid' (grid responsive) o 'list' (lista vertical)
   * @default 'grid'
   */
  layout?: 'grid' | 'list';
  
  /**
   * Número de columnas en layout grid (1-4)
   * @default 2
   */
  columns?: 1 | 2 | 3 | 4;
  
  /**
   * Mostrar borde
   * @default true
   */
  bordered?: boolean;
  
  /**
   * Mostrar sombra/elevación
   * @default false
   */
  elevated?: boolean;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Atributos HTML adicionales
   */
  attributes?: Record<string, string>;
  
  /**
   * Handler de click en la tarjeta
   */
  onClick?: (event: MouseEvent) => void;
  
  /**
   * Mostrar acción/icono de acción (ej: flecha, más info)
   */
  showAction?: boolean;
  
  /**
   * Texto o icono de la acción
   */
  actionLabel?: string;
  
  /**
   * Handler de la acción
   */
  onAction?: (event: MouseEvent) => void;
}

