/**
 * FileUploadProvider
 * Lógica de renderizado del componente File Upload
 * Genera HTML según las opciones proporcionadas
 */

import type { FileUploadOptions, FileUploadState } from './types/FileUploadOptions';
import { renderProgressBar } from '../../progress/src/ProgressProvider';

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
 * Renderiza el HTML de un Status Tag inline (sin importar el componente completo)
 */
function renderStatusTagInline(label: string, status: 'pending' | 'completed' | 'error' | 'uploading' = 'pending'): string {
  const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    pending: {
      bg: 'var(--ubits-feedback-accent-warning, #ec9907)',
      text: 'var(--ubits-fg-1-inverted, #ffffff)',
      border: 'var(--ubits-feedback-accent-warning, #ec9907)'
    },
    completed: {
      bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
      text: 'var(--ubits-feedback-success-text, #223b16)',
      border: 'var(--ubits-feedback-success-border, #41c433)'
    },
    error: {
      bg: 'var(--ubits-feedback-error-bg, #fff0ee)',
      text: 'var(--ubits-feedback-error-text, #65181e)',
      border: 'var(--ubits-feedback-error-border, #fd8a82)'
    },
    uploading: {
      bg: 'var(--ubits-feedback-info-bg, rgba(12, 91, 239, 0.15))',
      text: 'var(--ubits-feedback-info-text, #212f70)',
      border: 'var(--ubits-accent-brand-static-inverted, #0c5bef)'
    }
  };

  const colors = STATUS_COLORS[status] || STATUS_COLORS.pending;
  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    completed: 'Completado',
    error: 'Error',
    uploading: 'Subiendo'
  };

  return `
    <span class="ubits-file-upload__status-tag" style="background-color: ${colors.bg}; color: ${colors.text}; border-color: ${colors.border};">
      ${statusLabels[status] || label}
    </span>
  `.trim();
}

/**
 * Renderiza un File Upload UBITS como HTML string
 */
export function renderFileUpload(options: FileUploadOptions = {}): string {
  const {
    state = 'default',
    files = [],
    maxFiles = 6,
    maxSize = 5242880, // 5MB
    showFileSize = true,
    showActions = true,
    showProgress = true,
    showIcon = false,
    dropText = 'Arrastra tus archivos aquí',
    constraintsText,
    selectButtonText = 'Seleccionar archivos',
    // Legacy support
    fileName,
    fileExtension,
    fileSize,
    uploadText = 'Haz clic para subir archivo',
    fileStatus = 'pending',
    className = ''
  } = options;

  // Determinar si mostrar vista de lista o drop zone
  const hasFiles = files && files.length > 0;
  const actualState = hasFiles && state !== 'files-list' ? 'files-list' : state;
  
  // Generar texto de restricciones si no se proporciona
  const finalConstraintsText = constraintsText || `Máx. ${maxFiles} archivos · Hasta ${formatFileSize(maxSize)}`;

  // Vista de lista de archivos
  if (actualState === 'files-list' && hasFiles) {
    const isSingleMode = maxFiles === 1;
    // En modo single, solo mostrar el primer archivo
    const filesToShow = isSingleMode ? files.slice(0, 1) : files;
    const filesListHtml = filesToShow.map((file, index) => {
      const fileId = file.id || `file-${index}`;
      const fileProgress = file.progress !== undefined ? file.progress : 0;
      const fileStatusClass = file.status || 'pending';
      const showFileProgress = showProgress && file.status === 'uploading' && fileProgress > 0;

      return `
        <div class="ubits-file-upload__file-item" data-file-id="${fileId}">
          <div class="ubits-file-upload__file-icon">
            <i class="far fa-file"></i>
          </div>
          <div class="ubits-file-upload__file-info">
            <div class="ubits-file-upload__file-name">${file.name}</div>
            ${showFileSize ? `<div class="ubits-file-upload__file-size">${formatFileSize(file.size)}</div>` : ''}
            ${showFileProgress ? `
              <div class="ubits-file-upload__progress-container">
                ${(() => {
                  try {
                    return renderProgressBar({
                      size: 'xs',
                      value: fileProgress,
                      variant: 'default',
                      indicator: `${fileProgress}%`
                    });
                  } catch (error) {
                    console.error('Error rendering progress bar:', error);
                    return `<div class="ubits-progress-bar ubits-progress-bar--xs" style="height: 4px;">
                      <div class="ubits-progress-bar__container">
                        <div class="ubits-progress-bar__indicator-wrapper" style="width: ${fileProgress}%;"></div>
                      </div>
                      <span class="ubits-progress-bar__indicator">${fileProgress}%</span>
                    </div>`;
                  }
                })()}
              </div>
            ` : ''}
          </div>
          <button class="ubits-file-upload__file-remove" data-file-id="${fileId}" aria-label="Eliminar archivo">
            <i class="far fa-times"></i>
          </button>
        </div>
      `;
    }).join('');

    // En modo single, no mostrar título con contador ni botones Add/Remove all
    const headerHtml = isSingleMode ? '' : `
      <div class="ubits-file-upload__header">
        <h3 class="ubits-file-upload__title">Files (${filesToShow.length})</h3>
        <div class="ubits-file-upload__header-actions">
            <button class="ubits-button ubits-button--secondary ubits-button--sm ubits-file-upload__add-button" aria-label="Agregar archivos">
              <i class="far fa-arrow-up-from-bracket"></i> Agregar archivos
            </button>
            <button class="ubits-button ubits-button--secondary ubits-button--sm ubits-file-upload__remove-all-button" aria-label="Eliminar todos">
              <i class="far fa-trash"></i> Eliminar todos
            </button>
        </div>
      </div>
    `;

    return `
      <div class="ubits-file-upload ubits-file-upload--files-list ${isSingleMode ? 'ubits-file-upload--single-mode' : ''} ${className}">
        ${headerHtml}
        <div class="ubits-file-upload__files-list">
          ${filesListHtml}
        </div>
      </div>
    `.trim();
  }

  // Vista de drop zone (default)
  const classes = [
    'ubits-file-upload',
    `ubits-file-upload--${actualState}`,
    className
  ].filter(Boolean).join(' ');

  // Determinar estilos del borde según el estado
  let borderColor = 'var(--ubits-border-1, #d0d2d5)';
  let backgroundColor = 'var(--ubits-bg-1)';

  if (actualState === 'dragging') {
    borderColor = 'var(--ubits-accent-brand-static-inverted, #0c5bef)';
  } else if (actualState === 'error') {
    borderColor = 'var(--ubits-feedback-accent-error, #e9343c)';
  } else if (actualState === 'disabled') {
    backgroundColor = 'var(--ubits-bg-disabled, #edeeef)';
    borderColor = 'var(--ubits-border-disabled, #e1e2e5)';
  }

  // Icono circular con icono de archivo (opcional)
  const iconHtml = showIcon ? `
    <div class="ubits-file-upload__drop-icon">
      <i class="far fa-file"></i>
    </div>
  ` : '';

  // Botón de selección usando componente Button UBITS
  const selectButtonHtml = `
    <button class="ubits-button ubits-button--secondary ubits-button--sm ubits-file-upload__select-button" type="button">
      <i class="far fa-arrow-up-from-bracket"></i> ${selectButtonText}
    </button>
  `;

  return `
    <div class="${classes}" 
         style="background-color: ${backgroundColor}; border-color: ${borderColor};"
         tabindex="${actualState === 'disabled' ? '-1' : '0'}"
         role="button"
         aria-disabled="${actualState === 'disabled' ? 'true' : 'false'}">
      <div class="ubits-file-upload__drop-zone">
        ${iconHtml}
        <div class="ubits-file-upload__drop-content">
          <div class="ubits-file-upload__drop-text">${dropText}</div>
          <div class="ubits-file-upload__constraints">${finalConstraintsText}</div>
        </div>
        ${selectButtonHtml}
      </div>
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
    onAddFiles,
    onRemoveAll,
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
  if (onClick && options.state !== 'disabled' && options.state !== 'filled') {
    fileUploadElement.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      // No ejecutar si se hizo clic en los botones de acción
      if (!target.closest('.ubits-file-upload__actions')) {
        onClick();
      }
    });
  }

  // Drag & drop handlers
  if (options.state !== 'disabled' && options.state !== 'filled') {
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

  // Botón de eliminar (legacy)
  const removeButton = fileUploadElement.querySelector('.ubits-file-upload__action--remove');
  if (removeButton && onRemove) {
    removeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      onRemove();
    });
  }

  // Botón de agregar archivos (nuevo diseño)
  const addFilesButton = fileUploadElement.querySelector('.ubits-file-upload__add-button');
  if (addFilesButton && onAddFiles) {
    addFilesButton.addEventListener('click', (e) => {
      e.stopPropagation();
      onAddFiles();
    });
  } else if (addFilesButton && onClick) {
    // Fallback a onClick si no hay onAddFiles
    addFilesButton.addEventListener('click', (e) => {
      e.stopPropagation();
      onClick();
    });
  }

  // Botón de eliminar todos (nuevo diseño)
  const removeAllButton = fileUploadElement.querySelector('.ubits-file-upload__remove-all-button');
  if (removeAllButton && onRemoveAll) {
    removeAllButton.addEventListener('click', (e) => {
      e.stopPropagation();
      onRemoveAll();
    });
  }

  // Botones de eliminar archivos individuales (nuevo diseño)
  const fileRemoveButtons = fileUploadElement.querySelectorAll('.ubits-file-upload__file-remove');
  fileRemoveButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const fileId = button.getAttribute('data-file-id');
      if (onRemove) {
        onRemove(fileId);
      }
    });
  });

  // Botón de selección en drop zone
  const selectButton = fileUploadElement.querySelector('.ubits-file-upload__select-button');
  if (selectButton && onClick) {
    selectButton.addEventListener('click', (e) => {
      e.stopPropagation();
      onClick();
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
      if (updatedOptions.onClick && updatedOptions.state !== 'disabled' && updatedOptions.state !== 'filled') {
        newElement.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (!target.closest('.ubits-file-upload__actions')) {
            updatedOptions.onClick?.();
          }
        });
      }

      // Actualizar drag & drop handlers
      if (updatedOptions.state !== 'disabled' && updatedOptions.state !== 'filled') {
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

