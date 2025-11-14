/**
 * Tipos TypeScript para el componente ProgressGeneralCard
 * Componente para mostrar progreso general con indicador circular y categorías
 * Usando tokens UBITS
 */

export type ProgressGeneralCardLayout = 'vertical' | 'horizontal';
export type ProgressGeneralCardSize = 'sm' | 'md' | 'lg';

export interface ProgressCategory {
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

export interface ProgressGeneralCardOptions {
  /**
   * Título del componente
   * @default 'Progreso general'
   */
  title?: string;
  
  /**
   * Porcentaje principal mostrado en el círculo
   * @default 50
   */
  mainPercentage: number;
  
  /**
   * Etiqueta del porcentaje principal (ej: "Ciclos")
   * @default 'Ciclos'
   */
  mainLabel?: string;
  
  /**
   * Categorías de progreso
   */
  categories: ProgressCategory[];
  
  /**
   * Layout del componente
   * @default 'vertical'
   */
  layout?: ProgressGeneralCardLayout;
  
  /**
   * Tamaño del componente
   * @default 'md'
   */
  size?: ProgressGeneralCardSize;
  
  /**
   * Mostrar el título
   * @default true
   */
  showTitle?: boolean;
  
  /**
   * Mostrar el indicador circular
   * @default true
   */
  showCircularProgress?: boolean;
  
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
   * Color del progreso circular (token UBITS)
   * @default 'var(--ubits-chart-color-bg-neutral-blue-base, #557593)'
   */
  progressColor?: string;
  
  /**
   * Color de fondo del círculo (token UBITS)
   * @default 'var(--ubits-bg-3)'
   */
  circleBackgroundColor?: string;
  
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

