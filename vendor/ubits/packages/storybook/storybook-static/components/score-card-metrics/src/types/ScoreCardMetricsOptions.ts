/**
 * Tipos TypeScript para el componente ScoreCardMetrics
 * Componente para mostrar métricas de calificación con estrellas usando tokens UBITS
 */

export type ScoreCardMetricsSize = 'sm' | 'md' | 'lg';

export interface ScoreCardMetricsOptions {
  /**
   * Título de la métrica
   */
  title: string;
  
  /**
   * Número de respuestas
   */
  totalResponses: number;
  
  /**
   * Etiqueta para las respuestas
   * @default 'respuestas'
   */
  responsesLabel?: string;
  
  /**
   * Promedio de calificación (0-5)
   */
  average: number;
  
  /**
   * Etiqueta para el promedio
   * @default 'Promedio:'
   */
  averageLabel?: string;
  
  /**
   * Score actual (0-5) para mostrar en las estrellas
   */
  score: number;
  
  /**
   * Etiqueta izquierda del gráfico
   * @default 'Nada probable'
   */
  leftLabel?: string;
  
  /**
   * Etiqueta derecha del gráfico
   * @default 'Muy probable'
   */
  rightLabel?: string;
  
  /**
   * Texto descriptivo debajo del gráfico
   * @default '0 a 5 del gráfico'
   */
  chartDescription?: string;
  
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
  size?: ScoreCardMetricsSize;
  
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

