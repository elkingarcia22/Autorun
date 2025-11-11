/**
 * Estados del componente File Upload
 */
export type FileUploadState = 'default' | 'dragging' | 'error' | 'disabled' | 'filled' | 'files-list';

/**
 * Información de un archivo individual
 */
export interface FileInfo {
  /**
   * Nombre del archivo
   */
  name: string;
  
  /**
   * Tamaño del archivo en bytes
   */
  size: number;
  
  /**
   * Progreso de subida (0-100)
   */
  progress?: number;
  
  /**
   * Estado del archivo
   */
  status?: 'pending' | 'uploading' | 'completed' | 'error';
  
  /**
   * ID único del archivo
   */
  id?: string;
}

/**
 * Opciones del componente File Upload
 */
export interface FileUploadOptions {
  /**
   * Estado del componente
   * @default 'default'
   */
  state?: FileUploadState;

  /**
   * Nombre del archivo a mostrar (legacy, usar files array)
   */
  fileName?: string;

  /**
   * Extensión del archivo (ej: 'pdf', 'jpg', 'docx') (legacy)
   */
  fileExtension?: string;

  /**
   * Tamaño del archivo en bytes (se mostrará formateado automáticamente) (legacy)
   */
  fileSize?: number;

  /**
   * Array de archivos a mostrar (nuevo diseño)
   */
  files?: FileInfo[];

  /**
   * Número máximo de archivos permitidos
   * @default 6
   */
  maxFiles?: number;

  /**
   * Tamaño máximo por archivo en bytes
   * @default 5242880 (5MB)
   */
  maxSize?: number;

  /**
   * Si se muestra el tamaño del archivo
   * @default true
   */
  showFileSize?: boolean;

  /**
   * Si se muestran los botones de acción (re-subir y eliminar)
   * @default true
   */
  showActions?: boolean;

  /**
   * Si se muestra la barra de progreso
   * @default true
   */
  showProgress?: boolean;

  /**
   * Texto personalizado para el área de drop
   * @default 'Drop your files here'
   */
  dropText?: string;

  /**
   * Texto de restricciones (ej: 'Max 6 files · Up to 5MB')
   */
  constraintsText?: string;

  /**
   * Texto del botón de selección
   * @default 'Select images'
   */
  selectButtonText?: string;

  /**
   * Si se muestra el icono en el drop zone
   * @default false
   */
  showIcon?: boolean;

  /**
   * Texto personalizado para el área de upload (legacy)
   * @default 'Haz clic para subir archivo'
   */
  uploadText?: string;

  /**
   * Callback cuando se hace clic en el área de upload
   */
  onClick?: () => void;

  /**
   * Callback cuando se hace clic en el botón de agregar archivos
   */
  onAddFiles?: () => void;

  /**
   * Callback cuando se hace clic en el botón de eliminar todos
   */
  onRemoveAll?: () => void;

  /**
   * Callback cuando se hace clic en el botón de re-subir
   */
  onReupload?: () => void;

  /**
   * Callback cuando se hace clic en el botón de eliminar un archivo específico
   */
  onRemove?: (fileId?: string) => void;

  /**
   * Callback cuando se arrastra un archivo sobre el área
   */
  onDragOver?: (e: DragEvent) => void;

  /**
   * Callback cuando se suelta un archivo sobre el área
   */
  onDrop?: (e: DragEvent) => void;

  /**
   * ID del contenedor donde se insertará el componente
   */
  containerId?: string;

  /**
   * Clases CSS adicionales
   */
  className?: string;

  /**
   * Estado del archivo subido (para estado filled) (legacy)
   * @default 'pending'
   */
  fileStatus?: 'pending' | 'completed' | 'error' | 'uploading';
}

