/**
 * FileUploadProvider
 * Lógica de renderizado del componente File Upload
 * Genera HTML según las opciones proporcionadas
 */

import type { FileUploadOptions, FileUploadState } from './types/FileUploadOptions';

/**
 * Formatea el tamaño del archivo en formato legible (KB, MB, GB)
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Renderiza un File Upload UBITS como HTML string
 */
export function renderFileUpload(options: FileUploadOptions = {}): string {
  const {
    state = 'default',
    fileName,
    fileExtension,
    fileSize,
    showFileSize = true,
    showActions = true,
    uploadText = 'Haz clic para subir archivo',
    className = ''
  } = options;

  // Construir clases CSS según el estado
  const classes = [
    'ubits-file-upload',
    `ubits-file-upload--${state}`,
    className
  ].filter(Boolean).join(' ');

  // Determinar estilos del borde según el estado
  let borderColor = 'var(--ubits-border-1, #d0d2d5)';
  let backgroundColor = 'var(--ubits-bg-1, #ffffff)';
  let textColor = 'var(--ubits-fg-1-medium, #5c646f)';
  let iconColor = 'var(--ubits-fg-1-medium, #5c646f)';

  if (state === 'dragging') {
    borderColor = 'var(--ubits-accent-brand, #0c5bef)';
  } else if (state === 'error') {
    borderColor = 'var(--ubits-feedback-accent-error, #e9343c)';
  } else if (state === 'disabled') {
    backgroundColor = 'var(--ubits-bg-disabled, #edeeef)';
    borderColor = 'var(--ubits-border-disabled, #e1e2e5)';
    textColor = 'var(--ubits-fg-on-disabled, #8d9199)';
    iconColor = 'var(--ubits-fg-on-disabled, #8d9199)';
  }

  // Determinar qué icono mostrar según el estado
  let iconHtml = '';
  if (state === 'dragging') {
    // Icono grande de upload
    iconHtml = `
      <div class="ubits-file-upload__icon-large">
        <i class="far fa-arrow-up-from-bracket"></i>
      </div>
    `;
  } else if (state === 'error' || state === 'disabled') {
    // Icono grande de upload
    iconHtml = `
      <div class="ubits-file-upload__icon-large">
        <i class="far fa-arrow-up-from-bracket"></i>
      </div>
    `;
  } else {
    // Default: icono pequeño de archivo en círculo
    iconHtml = `
      <div class="ubits-file-upload__icon-container">
        <i class="far fa-file-arrow-up"></i>
      </div>
    `;
  }

  // Construir texto del archivo
  let fileNameHtml = '';
  if (fileName || fileExtension) {
    // Si hay archivo, mostrar "Haz clic para subir archivo" + "." + extensión
    const parts: string[] = [];
    parts.push(uploadText || 'Haz clic para subir archivo');
    if (fileExtension) {
      parts.push('.');
      parts.push(fileExtension);
    }
    fileNameHtml = `
      <div class="ubits-file-upload__file-name">
        ${parts.join('')}
      </div>
    `;
  } else {
    fileNameHtml = `
      <div class="ubits-file-upload__file-name">
        ${uploadText}
      </div>
    `;
  }

  // Construir tamaño del archivo si está disponible
  let fileSizeHtml = '';
  if (showFileSize && fileSize && fileSize > 0) {
    fileSizeHtml = `
      <div class="ubits-file-upload__file-size">
        ${formatFileSize(fileSize)}
      </div>
    `;
  }

  // Construir botones de acción si están habilitados
  let actionsHtml = '';
  if (showActions && (fileName || state === 'error')) {
    actionsHtml = `
      <div class="ubits-file-upload__actions">
        <button class="ubits-file-upload__action ubits-file-upload__action--reupload" aria-label="Re-subir archivo">
          <i class="far fa-arrow-up-from-bracket"></i>
        </button>
        <button class="ubits-file-upload__action ubits-file-upload__action--remove" aria-label="Eliminar archivo">
          <i class="far fa-trash"></i>
        </button>
      </div>
    `;
  }

  return `
    <div class="${classes}" 
         style="background-color: ${backgroundColor}; border-color: ${borderColor}; color: ${textColor};"
         tabindex="${state === 'disabled' ? '-1' : '0'}"
         role="button"
         aria-disabled="${state === 'disabled' ? 'true' : 'false'}">
      <div class="ubits-file-upload__container">
        ${iconHtml}
        <div class="ubits-file-upload__content">
          ${fileNameHtml}
          ${fileSizeHtml}
        </div>
      </div>
      ${actionsHtml}
    </div>
  `.trim();
}

/**
 * Crea un elemento File Upload programáticamente
 */
export function createFileUpload(options: FileUploadOptions = {}): {
  element: HTMLElement;
  update: (newOptions: Partial<FileUploadOptions>) => void;
  destroy: () => void;
} {
  const {
    containerId,
    onClick,
    onReupload,
    onRemove,
    onDragOver,
    onDrop,
    ...restOptions
  } = options;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderFileUpload(restOptions);
  const fileUploadElement = wrapper.firstElementChild as HTMLElement;

  if (!fileUploadElement) {
    throw new Error('No se pudo crear el file upload');
  }

  // Determinar contenedor
  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  container.appendChild(fileUploadElement);

  // Agregar event listeners
  if (onClick && options.state !== 'disabled') {
    fileUploadElement.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      // No ejecutar si se hizo clic en los botones de acción
      if (!target.closest('.ubits-file-upload__actions')) {
        onClick();
      }
    });
  }

  // Drag & drop handlers
  if (options.state !== 'disabled') {
    fileUploadElement.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onDragOver) {
        onDragOver(e as DragEvent);
      } else {
        fileUploadElement.classList.add('ubits-file-upload--dragging');
      }
    });

    fileUploadElement.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileUploadElement.classList.remove('ubits-file-upload--dragging');
    });

    fileUploadElement.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileUploadElement.classList.remove('ubits-file-upload--dragging');
      if (onDrop) {
        onDrop(e as DragEvent);
      }
    });
  }

  // Botón de re-subir
  const reuploadButton = fileUploadElement.querySelector('.ubits-file-upload__action--reupload');
  if (reuploadButton && onReupload) {
    reuploadButton.addEventListener('click', (e) => {
      e.stopPropagation();
      onReupload();
    });
  }

  // Botón de eliminar
  const removeButton = fileUploadElement.querySelector('.ubits-file-upload__action--remove');
  if (removeButton && onRemove) {
    removeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      onRemove();
    });
  }

  /**
   * Actualiza el file upload con nuevas opciones
   */
  const update = (newOptions: Partial<FileUploadOptions>) => {
    const updatedOptions = { ...restOptions, ...newOptions };
    const newHtml = renderFileUpload(updatedOptions);
    const newWrapper = document.createElement('div');
    newWrapper.innerHTML = newHtml;
    const newElement = newWrapper.firstElementChild as HTMLElement;
    
    if (newElement && fileUploadElement.parentNode) {
      // Reemplazar elemento manteniendo event listeners
      fileUploadElement.parentNode.replaceChild(newElement, fileUploadElement);
      
      // Recrear event listeners en el nuevo elemento
      if (updatedOptions.onClick && updatedOptions.state !== 'disabled') {
        newElement.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (!target.closest('.ubits-file-upload__actions')) {
            updatedOptions.onClick?.();
          }
        });
      }

      // Actualizar drag & drop handlers
      if (updatedOptions.state !== 'disabled') {
        newElement.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (updatedOptions.onDragOver) {
            updatedOptions.onDragOver(e as DragEvent);
          } else {
            newElement.classList.add('ubits-file-upload--dragging');
          }
        });

        newElement.addEventListener('dragleave', (e) => {
          e.preventDefault();
          e.stopPropagation();
          newElement.classList.remove('ubits-file-upload--dragging');
        });

        newElement.addEventListener('drop', (e) => {
          e.preventDefault();
          e.stopPropagation();
          newElement.classList.remove('ubits-file-upload--dragging');
          if (updatedOptions.onDrop) {
            updatedOptions.onDrop(e as DragEvent);
          }
        });
      }

      // Actualizar botones de acción
      const newReuploadButton = newElement.querySelector('.ubits-file-upload__action--reupload');
      if (newReuploadButton && updatedOptions.onReupload) {
        newReuploadButton.addEventListener('click', (e) => {
          e.stopPropagation();
          updatedOptions.onReupload?.();
        });
      }

      const newRemoveButton = newElement.querySelector('.ubits-file-upload__action--remove');
      if (newRemoveButton && updatedOptions.onRemove) {
        newRemoveButton.addEventListener('click', (e) => {
          e.stopPropagation();
          updatedOptions.onRemove?.();
        });
      }
    }
  };

  /**
   * Destruye el file upload removiéndolo del DOM
   */
  const destroy = () => {
    if (fileUploadElement.parentNode) {
      fileUploadElement.parentNode.removeChild(fileUploadElement);
    }
  };

  return {
    element: fileUploadElement,
    update,
    destroy
  };
}

