/**
 * Tipos de columna disponibles
 */
export type ColumnType3 = 
  | 'nombre'
  | 'nombre-avatar'
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
  | 'ciudad';

/**
 * Columna de la tabla
 */
export interface TableColumn3 {
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
  type?: ColumnType3;
  
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
   * Variante del avatar para columnas de tipo 'nombre-avatar'
   * 'photo' - Muestra imagen
   * 'initials' - Muestra iniciales
   * 'icon' - Muestra icono
   */
  avatarVariant?: 'photo' | 'initials' | 'icon';
}

/**
 * Fila de la tabla
 */
export interface TableRow3 {
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
export interface DataTable3Options {
  /**
   * ID del contenedor donde se renderizará la tabla
   */
  containerId?: string;
  
  /**
   * Columnas de la tabla
   */
  columns: TableColumn3[];
  
  /**
   * Filas de la tabla
   */
  rows: TableRow3[];
  
  /**
   * Callback cuando se expande/colapsa una fila
   */
  onRowExpand?: (rowId: string | number, expanded: boolean) => void;
  
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
   * Clases CSS adicionales
   */
  className?: string;
}

