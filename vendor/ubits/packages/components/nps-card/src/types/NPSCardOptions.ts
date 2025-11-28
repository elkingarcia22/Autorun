/**
 * Tipos TypeScript para el componente NPSCard
 * Componente para mostrar métricas NPS (Net Promoter Score) con gauge semicircular
 * Usando tokens UBITS
 */

export type NPSCardSize = 'sm' | 'md' | 'lg';

export interface NPSCategory {
  /**
   * Etiqueta de la categoría (ej: "No tienen confianza", "Neutrales", "Tienen confianza")
   */
  label: string;
  
  /**
   * Valor actual (ej: 50)
   */
  current: number;
  
  /**
   * Valor total (ej: 100)
   */
  total: number;
  
  /**
   * Color de la categoría (token UBITS)
   */
  color: string;
  
  /**
   * Porcentaje calculado automáticamente o manual
   */
  percentage?: number;
}

export interface NPSCardOptions {
  /**
   * Título del componente
   * @default 'Nivel de confianza'
   */
  title?: string;
  
  /**
   * Puntuación principal mostrada en el gauge (0-100)
   * @default 0
   */
  score: number;
  
  /**
   * Etiqueta del score (ej: "Puntuación")
   * @default 'Puntuación'
   */
  scoreLabel?: string;
  
  /**
   * Número total de respuestas
   * @default 0
   */
  totalResponses: number;
  
  /**
   * Texto para mostrar las respuestas (ej: "290 respuestas")
   * @default 'respuestas'
   */
  responsesLabel?: string;
  
  /**
   * Categorías de NPS
   */
  categories: NPSCategory[];
  
  /**
   * Tamaño del componente
   * @default 'md'
   */
  size?: NPSCardSize;
  
  /**
   * Mostrar el título
   * @default true
   */
  showTitle?: boolean;
  
  /**
   * Mostrar el contador de respuestas
   * @default true
   */
  showResponsesCount?: boolean;
  
  /**
   * Mostrar el gauge semicircular
   * @default true
   */
  showGauge?: boolean;
  
  /**
   * Mostrar las categorías
   * @default true
   */
  showCategories?: boolean;
  
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
   * Color del gauge para el segmento rojo (0-20)
   * @default 'var(--modifiers-normal-color-light-feedback-accent-error)'
   */
  lowColor?: string;
  
  /**
   * Color del gauge para el segmento amarillo (20-60)
   * @default 'var(--modifiers-normal-color-light-feedback-accent-warning)'
   */
  mediumColor?: string;
  
  /**
   * Color del gauge para el segmento verde (60-100)
   * @default 'var(--modifiers-normal-color-light-feedback-accent-success)'
   */
  highColor?: string;
  
  /**
   * Color de fondo del gauge (token UBITS)
   * @default 'var(--modifiers-normal-color-light-bg-3)'
   */
  gaugeBackgroundColor?: string;
  
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
   * Handler de click en el botón de acción
   */
  onAction?: (event: MouseEvent) => void;
}

