/**
 * Estados del componente File Upload
 */
export type FileUploadState = 'default' | 'dragging' | 'error' | 'disabled';

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
   * Nombre del archivo a mostrar
   */
  fileName?: string;

  /**
   * Extensión del archivo (ej: 'pdf', 'jpg', 'docx')
   */
  fileExtension?: string;

  /**
   * Tamaño del archivo en bytes (se mostrará formateado automáticamente)
   */
  fileSize?: number;

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
   * Texto personalizado para el área de upload
   * @default 'Haz clic para subir archivo'
   */
  uploadText?: string;

  /**
   * Callback cuando se hace clic en el área de upload
   */
  onClick?: () => void;

  /**
   * Callback cuando se hace clic en el botón de re-subir
   */
  onReupload?: () => void;

  /**
   * Callback cuando se hace clic en el botón de eliminar
   */
  onRemove?: () => void;

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
}

