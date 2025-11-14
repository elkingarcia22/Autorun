/**
 * Tipos TypeScript para el componente MetricCard
 * Componente para mostrar métricas numéricas usando tokens UBITS
 */

export type MetricCardSize = 'sm' | 'md' | 'lg';

export interface MetricCardOptions {
  /**
   * Título de la métrica
   */
  title: string;
  
  /**
   * Valor principal (puede ser número o string, ej: "200 / 204")
   */
  value: string | number;
  
  /**
   * Texto descriptivo debajo del valor
   */
  label: string;
  
  /**
   * Icono opcional para el título (nombre de FontAwesome sin el prefijo 'fa-')
   */
  titleIcon?: string;
  
  /**
   * Estilo del icono del título
   * @default 'regular'
   */
  titleIconStyle?: 'regular' | 'solid';
  
  /**
   * Color del icono del título (usando tokens UBITS)
   */
  titleIconColor?: string;
  
  /**
   * Mostrar icono de información junto al título
   * @default false
   */
  showInfoIcon?: boolean;
  
  /**
   * Mostrar botón de acción con flecha a la derecha en la esquina superior derecha
   * @default false
   */
  showActionButton?: boolean;
  
  /**
   * Tamaño de la tarjeta
   * @default 'md'
   */
  size?: MetricCardSize;
  
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
}

