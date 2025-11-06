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
  | 'ciudad';

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

