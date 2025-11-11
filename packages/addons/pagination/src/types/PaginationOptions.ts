/**
 * Tipos TypeScript para el componente Pagination
 * Componente para paginación usando tokens UBITS
 */

export type PaginationVariant = 'default' | 'compact' | 'minimal';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationOptions {
  /**
   * Página actual (1-indexed)
   * @default 1
   */
  currentPage?: number;
  
  /**
   * Total de páginas
   */
  totalPages: number;
  
  /**
   * Total de items (opcional, para mostrar información adicional)
   */
  totalItems?: number;
  
  /**
   * Items por página (opcional, para mostrar información adicional)
   */
  itemsPerPage?: number;
  
  /**
   * Variante visual del paginador
   * @default 'default'
   */
  variant?: PaginationVariant;
  
  /**
   * Tamaño del paginador
   * @default 'md'
   */
  size?: PaginationSize;
  
  /**
   * Número máximo de páginas visibles (para variante default)
   * @default 7
   */
  maxVisiblePages?: number;
  
  /**
   * Mostrar botón "Primera página"
   * @default true
   */
  showFirst?: boolean;
  
  /**
   * Mostrar botón "Última página"
   * @default true
   */
  showLast?: boolean;
  
  /**
   * Mostrar botones anterior/siguiente
   * @default true
   */
  showPrevNext?: boolean;
  
  /**
   * Mostrar información de items (ej: "1-10 de 100")
   * @default false
   */
  showInfo?: boolean;
  
  /**
   * Mostrar selector de items por página
   * @default false
   */
  showItemsPerPage?: boolean;
  
  /**
   * Opciones de items por página (solo si showItemsPerPage es true)
   * @default [10, 20, 50, 100]
   */
  itemsPerPageOptions?: number[];
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Atributos HTML adicionales
   */
  attributes?: Record<string, string>;
  
  /**
   * Callback cuando cambia la página
   */
  onPageChange?: (page: number) => void;
  
  /**
   * Callback cuando cambia items por página
   */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  
  /**
   * Texto personalizado para botones
   */
  labels?: {
    first?: string;
    last?: string;
    previous?: string;
    next?: string;
    page?: string;
    of?: string;
    items?: string;
    itemsPerPage?: string;
  };
}

