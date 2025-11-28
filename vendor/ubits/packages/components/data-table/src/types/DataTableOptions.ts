/**
 * Tipos de columna disponibles
 */
export type ColumnType = 
  | 'nombre'
  | 'nombre-avatar'
  | 'nombre-avatar-texto'
  | 'progreso'
  | 'estado'
  | 'radio'
  | 'toggle'
  | 'checkbox'
  | 'correo'
  | 'acciones'
  | 'fecha'
  | 'area'
  | 'lider'
  | 'pais'
  | 'ciudad'
  | 'drag-handle'  // Columna para drag handle (mover filas)
  | 'expand';       // Columna para expand icon (desplegar filas)

/**
 * Columna de la tabla
 */
export interface TableColumn {
  /**
   * ID único de la columna
   */
  id: string;
  
  /**
   * Título de la columna
   */
  title: string;
  
  /**
   * Tipo de columna (determina cómo se renderiza)
   */
  type?: ColumnType;
  
  /**
   * Ancho de la columna (opcional)
   */
  width?: number;
  
  /**
   * Si la columna es visible (por defecto: true)
   */
  visible?: boolean;
  
  /**
   * Función personalizada para renderizar el contenido de la celda
   */
  renderCell?: (rowData: any) => string;
  
  /**
   * Variante del avatar para columnas de tipo 'nombre-avatar' y 'nombre-avatar-texto'
   * 'photo' - Muestra imagen
   * 'initials' - Muestra iniciales
   * 'icon' - Muestra icono
   */
  avatarVariant?: 'photo' | 'initials' | 'icon';
  
  /**
   * Label para radio buttons (solo para tipo 'radio')
   * Si es string, se muestra ese texto como label
   * Si es false o undefined, no se muestra label
   */
  radioLabel?: string | boolean;
  
  /**
   * Label para toggle buttons (solo para tipo 'toggle')
   * Si es string, se muestra ese texto como label
   * Si es false o undefined, no se muestra label
   */
  toggleLabel?: string | boolean;
  
  /**
   * Label para checkbox buttons (solo para tipo 'checkbox')
   * Si es string, se muestra ese texto como label
   * Si es false o undefined, no se muestra label
   */
  checkboxLabel?: string | boolean;
  
  /**
   * Si la columna es editable
   * Para tipos 'nombre', 'nombre-avatar' y 'estado': permite editar el contenido
   * Para tipos 'checkbox' y 'radio': permite activar/desactivar el checkbox o radio button
   */
  editable?: boolean;
  
  /**
   * Si el email es clicable (solo para tipo 'correo')
   * Si es true, el email se renderiza como link azul clicable
   * Si es false, el email se renderiza como texto normal
   * Por defecto: true
   */
  emailClickable?: boolean;

  /**
   * Si la columna está fijada (pinned) - se mantiene visible al hacer scroll horizontal
   * Por defecto: false
   */
  pinned?: boolean;
}

/**
 * Fila de la tabla
 */
export interface TableRow {
  /**
   * ID único de la fila
   */
  id: string | number;
  
  /**
   * Datos de la fila
   */
  data: any;
  
  /**
   * Si la fila está expandida
   */
  expanded?: boolean;
  
  /**
   * Función para renderizar el contenido expandido
   */
  renderExpandedContent?: (rowData: any) => string;
}

/**
 * Opciones del Data Table 3
 */
export interface DataTableOptions {
  /**
   * ID del contenedor donde se renderizará la tabla
   */
  containerId?: string;
  
  /**
   * Columnas de la tabla
   */
  columns: TableColumn[];
  
  /**
   * Filas de la tabla
   */
  rows: TableRow[];
  
  /**
   * Callback cuando se expande/colapsa una fila
   */
  onRowExpand?: (rowId: string | number, expanded: boolean) => void;
  
  /**
   * Callback cuando se hace click en un botón de acción de una fila (columnas de tipo 'acciones')
   */
  onRowAction?: (rowId: string | number, row: TableRow) => void;
  
  /**
   * Si las columnas son reordenables (drag & drop)
   */
  columnReorderable?: boolean;
  
  /**
   * Callback cuando cambia el orden de las columnas
   */
  onColumnReorder?: (columnIds: string[]) => void;
  
  /**
   * Si las filas son reordenables (drag & drop)
   */
  rowReorderable?: boolean;
  
  /**
   * Callback cuando cambia el orden de las filas
   */
  onRowReorder?: (rowIds: (string | number)[]) => void;
  
  /**
   * Si las filas son expandibles (muestra el icono de expandir)
   */
  rowExpandable?: boolean;
  
  /**
   * Si las columnas son ordenables (muestra botones de ordenamiento)
   */
  columnSortable?: boolean;
  
  /**
   * Callback cuando se ordena una columna
   */
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
  
  /**
   * Callback cuando se fija/desfija una columna
   */
  onColumnPin?: (columnId: string, pinned: boolean) => void;
  
  /**
   * Si se muestra la columna de checkbox (por defecto: true)
   */
  showCheckbox?: boolean;
  
  /**
   * Si se muestra el scrollbar vertical (por defecto: false)
   */
  showVerticalScrollbar?: boolean;

  /**
   * Si se muestra el scrollbar horizontal (por defecto: false)
   */
  showHorizontalScrollbar?: boolean;

  /**
   * Si se muestra el botón de menú en los headers de las columnas (por defecto: true)
   */
  showColumnMenu?: boolean;

  /**
   * Si se muestra el menú contextual (click derecho) en las filas (por defecto: true)
   */
  showContextMenu?: boolean;

  /**
   * Si el checkbox debe ser sticky (por defecto: false)
   */
  checkboxSticky?: boolean;

  /**
   * Si el drag-handle (mover filas) debe ser sticky (por defecto: false)
   */
  dragHandleSticky?: boolean;

  /**
   * Si el expand (desplegar filas) debe ser sticky (por defecto: false)
   */
  expandSticky?: boolean;

  /**
   * Si se muestra el paginador (por defecto: false)
   */
  showPagination?: boolean;

  /**
   * Página actual (por defecto: 1)
   */
  currentPage?: number;

  /**
   * Items por página (por defecto: 10)
   */
  itemsPerPage?: number;

  /**
   * Callback cuando cambia la página
   */
  onPageChange?: (page: number) => void;

  /**
   * Callback cuando cambia el número de items por página
   */
  onItemsPerPageChange?: (itemsPerPage: number) => void;

  /**
   * Variante del paginador (por defecto: 'default')
   */
  paginationVariant?: 'default' | 'compact' | 'minimal';

  /**
   * Tamaño del paginador (por defecto: 'md')
   */
  paginationSize?: 'sm' | 'md' | 'lg';

  /**
   * Si se activa el lazy load (infinite scroll) - por defecto: true si showPagination es false
   * Si showPagination está activo, el lazy load se desactiva automáticamente
   */
  lazyLoad?: boolean;

  /**
   * Número de items a cargar por batch en lazy load (por defecto: 10)
   */
  lazyLoadItemsPerBatch?: number;

  /**
   * Callback cuando se cargan más items en lazy load
   */
  onLazyLoad?: (loadedItems: number, totalItems: number) => void;

  /**
   * Clases CSS adicionales
   */
  className?: string;

  /**
   * Configuración del header de la tabla
   */
  header?: {
    /**
     * Título del header (opcional)
     */
    title?: string;
    
    /**
     * Si se muestra el título (por defecto: true si title está definido)
     */
    showTitle?: boolean;
    
    /**
     * Contador de items (opcional)
     * Si es string, se muestra ese texto
     * Si es true, se muestra automáticamente "X/Y resultados" basado en rows.length
     * Si es 'total-only', se muestra solo "Y resultados" (solo el total)
     * Si es false o undefined, no se muestra
     */
    counter?: string | boolean | 'total-only';
    
    /**
     * Items mostrados actualmente (para el contador X/Y cuando counter es true)
     * Si no se proporciona, se usa rows.length
     */
    displayedItems?: number;
    
    /**
     * Total de items para el contador (solo si counter es true o 'total-only')
     * Si no se proporciona, se usa rows.length
     */
    totalItems?: number;
    
    /**
     * Si se muestra el contador (por defecto: true si counter está definido)
     */
    showCounter?: boolean;
    
    /**
     * Botón primario
     */
    primaryButton?: {
      text: string;
      icon?: string;
      iconStyle?: 'regular' | 'solid';
      onClick?: (event: MouseEvent) => void;
      disabled?: boolean;
      loading?: boolean;
    };
    
    /**
     * Si se muestra el botón primario (por defecto: true si primaryButton está definido)
     */
    showPrimaryButton?: boolean;
    
    /**
     * Botones secundarios (máximo 2)
     */
    secondaryButtons?: Array<{
      text: string;
      icon?: string;
      iconStyle?: 'regular' | 'solid';
      onClick?: (event: MouseEvent) => void;
      disabled?: boolean;
      loading?: boolean;
    }>;
    
    /**
     * Si se muestran los botones secundarios (por defecto: true si secondaryButtons está definido)
     */
    showSecondaryButtons?: boolean;
    
    /**
     * Botón de búsqueda
     */
    searchButton?: {
      placeholder?: string;
      value?: string;
      onChange?: (value: string) => void;
      onClick?: (event: MouseEvent) => void;
      onSearch?: (searchTerm: string, filteredRows: TableRow[]) => void;
      disabled?: boolean;
    };
    
    /**
     * Si se muestra el botón de búsqueda (por defecto: true si searchButton está definido)
     */
    showSearchButton?: boolean;
    
    /**
     * Botón de filtros
     */
    filterButton?: {
      onClick?: (event: MouseEvent) => void;
      disabled?: boolean;
      active?: boolean;
      /**
       * Configuración de filtros disponibles
       */
      filters?: Array<{
        /**
         * ID único del filtro
         */
        id: string;
        /**
         * Label del filtro
         */
        label: string;
        /**
         * ID de la columna a filtrar
         */
        columnId: string;
        /**
         * Tipo de filtro: 'text', 'select', 'date', 'number'
         */
        type: 'text' | 'select' | 'date' | 'number';
        /**
         * Opciones para filtros de tipo 'select'
         */
        options?: Array<{
          value: string;
          label: string;
        }>;
        /**
         * Valor inicial del filtro
         */
        value?: string;
      }>;
      /**
       * Callback cuando se aplican los filtros
       */
      onApplyFilters?: (filters: Record<string, string>) => void;
      /**
       * Callback cuando se limpian los filtros
       */
      onClearFilters?: () => void;
    };
    
    /**
     * Si se muestra el botón de filtros (por defecto: true si filterButton está definido)
     */
    showFilterButton?: boolean;
    
    /**
     * Botón de seleccionar columnas
     */
    columnSelectorButton?: {
      onClick?: (event: MouseEvent) => void;
      disabled?: boolean;
      active?: boolean;
    };
    
    /**
     * Si se muestra el botón de seleccionar columnas (por defecto: true si columnSelectorButton está definido)
     */
    showColumnSelectorButton?: boolean;
  };
  
  /**
   * Configuración del empty state (estado vacío)
   */
  emptyState?: {
    /**
     * Empty state cuando no hay datos
     */
    noData?: {
      title?: string;
      description?: string;
      icon?: string;
      imageUrl?: string;
      actionLabel?: string;
      onAction?: () => void;
      showPrimaryButton?: boolean;
      primaryButtonIcon?: string;
      showPrimaryButtonIcon?: boolean;
      secondaryActionLabel?: string;
      onSecondaryAction?: () => void;
      showSecondaryButton?: boolean;
      secondaryButtonIcon?: string;
      showSecondaryButtonIcon?: boolean;
    };
    
    /**
     * Empty state cuando no hay resultados de búsqueda
     */
    noSearchResults?: {
      title?: string;
      description?: string;
      icon?: string;
      imageUrl?: string;
      actionLabel?: string;
      onAction?: () => void;
      showPrimaryButton?: boolean;
      primaryButtonIcon?: string;
      showPrimaryButtonIcon?: boolean;
      secondaryActionLabel?: string;
      onSecondaryAction?: () => void;
      showSecondaryButton?: boolean;
      secondaryButtonIcon?: string;
      showSecondaryButtonIcon?: boolean;
    };
    
    /**
     * Empty state cuando no hay resultados de filtros
     */
    noFilterResults?: {
      title?: string;
      description?: string;
      icon?: string;
      imageUrl?: string;
      actionLabel?: string;
      onAction?: () => void;
      showPrimaryButton?: boolean;
      primaryButtonIcon?: string;
      showPrimaryButtonIcon?: boolean;
      secondaryActionLabel?: string;
      onSecondaryAction?: () => void;
      showSecondaryButton?: boolean;
      secondaryButtonIcon?: string;
      showSecondaryButtonIcon?: boolean;
    };
  };
}

