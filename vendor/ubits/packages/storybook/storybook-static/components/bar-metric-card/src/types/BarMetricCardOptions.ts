/**
 * Tipos TypeScript para el componente BarMetricCard
 * Componente para mostrar métricas con gráfico de barras y categorías
 * Usando tokens UBITS
 */

export type BarMetricCardLayout = 'vertical' | 'horizontal';
export type BarMetricCardSize = 'sm' | 'md' | 'lg';

export interface BarCategory {
  /**
   * Etiqueta de la categoría (ej: "Área", "Equipo", "Propio")
   */
  label: string;
  
  /**
   * Valor actual (ej: 3)
   */
  current: number;
  
  /**
   * Valor total (ej: 20)
   */
  total: number;
  
  /**
   * Porcentaje calculado automáticamente o manual
   */
  percentage?: number;
}

export interface BarMetricCardOptions {
  /**
   * Título del componente
   * @default 'Métricas'
   */
  title?: string;
  
  /**
   * Cantidad de respuestas a mostrar debajo del título
   */
  responseCount?: number;
  
  /**
   * Mostrar la cantidad de respuestas
   * @default false
   */
  showResponseCount?: boolean;
  
  /**
   * Datos para el gráfico de barras (array de valores)
   * Cada valor puede ser positivo o negativo
   */
  barData: number[];
  
  /**
   * Etiquetas para las barras (opcional, si no se proporciona se usan índices)
   */
  barLabels?: string[];
  
  /**
   * Valor máximo para el eje Y (si no se proporciona se calcula automáticamente)
   */
  maxValue?: number;
  
  /**
   * Valor mínimo para el eje Y (si no se proporciona se calcula automáticamente)
   */
  minValue?: number;
  
  /**
   * Categorías de métricas
   */
  categories: BarCategory[];
  
  /**
   * Layout del componente
   * @default 'vertical'
   */
  layout?: BarMetricCardLayout;
  
  /**
   * Tamaño del componente
   * @default 'md'
   */
  size?: BarMetricCardSize;
  
  /**
   * Mostrar el título
   * @default true
   */
  showTitle?: boolean;
  
  /**
   * Mostrar el gráfico de barras
   * @default true
   */
  showBarChart?: boolean;
  
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
   * Mostrar valores negativos (barras hacia abajo)
   * @default true
   */
  showNegativeValues?: boolean;
  
  /**
   * Mostrar líneas de guía (grid lines)
   * @default true
   */
  showGridLines?: boolean;
  
  /**
   * Color de las barras (token UBITS)
   * @default 'var(--ubits-chart-color-bg-neutral-blue-base)'
   */
  barColor?: string;
  
  /**
   * Color de fondo del gráfico (token UBITS)
   * @default 'var(--modifiers-normal-color-light-bg-1)'
   */
  chartBackgroundColor?: string;
  
  /**
   * Color de las líneas de la grilla (token UBITS)
   * @default 'var(--modifiers-normal-color-light-border-1)'
   */
  gridLineColor?: string;
  
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

