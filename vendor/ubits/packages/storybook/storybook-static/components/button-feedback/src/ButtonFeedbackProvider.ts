import type { ButtonFeedbackOptions } from './types/ButtonFeedbackOptions';
import { createModal } from '../../modal/src/ModalProvider';
import { renderInput, createInput } from '../../input/src/InputProvider';
import { createButton, renderButton } from '../../button/src/ButtonProvider';
import { showToast } from '../../toast/src/ToastProvider';
import './styles/button-feedback.css';
import '../../modal/src/styles/modal.css';
import '../../input/src/styles/input.css';
import '../../button/src/styles/button.css';
import '../../toast/src/styles/toast.css';

/**
 * ButtonFeedback Provider
 * Botón flotante para obtener feedback de clientes con modal de formulario
 */

/**
 * Helper para renderizar iconos
 */
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Crea y renderiza un ButtonFeedback en el DOM
 */
export function createButtonFeedback(options: ButtonFeedbackOptions): {
  element: HTMLElement;
  show: () => void;
  hide: () => void;
  open: () => void;
  close: () => void;
  destroy: () => void;
} {
  const {
    containerId,
    text = '',
    icon = 'comment-dots',
    position = 'bottom-right',
    offset = 24,
    modalTitle = 'Deja tu Feedback',
    sectionOptions = [
      { value: 'home', text: 'Home' },
      { value: 'encuestas', text: 'Encuestas' },
    ],
    defaultSection = '',
    commentPlaceholder = '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías? ¿Qué necesita tu empresa?',
    n8nWebhookUrl,
    onFeedbackSent,
    onCancel,
    onClose,
    visible = true,
    className = ''
  } = options;

  // Crear contenedor si no existe
  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  // Estado del formulario
  let sectionValue = defaultSection || (sectionOptions.length > 0 ? sectionOptions[0].value : '');
  let commentValue = '';
  let modalInstance: ReturnType<typeof createModal> | null = null;
  let formContainerId = '';

  // Crear contenido del modal
  const createModalContent = (): string => {
    // Container para el formulario (generar ID único)
    formContainerId = `ubits-button-feedback-form-${Math.random().toString(36).substr(2, 9)}`;
    
    // Header con icono, título y botón de cerrar (usando botón secundario de UBITS)
    const closeButtonHTML = renderButton({
      variant: 'secondary',
      size: 'sm',
      icon: 'times',
      iconStyle: 'regular',
      iconOnly: true,
      className: 'ubits-button-feedback-modal__close'
    });
    
    const headerHTML = `
      <div class="ubits-button-feedback-modal__header">
        <div class="ubits-button-feedback-modal__header-content">
          <div class="ubits-button-feedback-modal__header-icon">
            ${renderIconHelper('comment-dots', 'regular')}
          </div>
          <h2 class="ubits-heading-h2 ubits-button-feedback-modal__header-title">${modalTitle}</h2>
        </div>
        ${closeButtonHTML}
      </div>
    `;

    // Formulario con contenedores para los inputs
    const formHTML = `
      <div class="ubits-button-feedback-form" id="${formContainerId}">
        <div class="ubits-button-feedback-form__field">
          <div id="${formContainerId}-section"></div>
        </div>
        <div class="ubits-button-feedback-form__field">
          <div id="${formContainerId}-comment"></div>
        </div>
      </div>
    `;

    return headerHTML + formHTML;
  };

  // Función para abrir/cerrar el modal (toggle)
  const toggleModal = () => {
    // Si el modal está abierto, cerrarlo
    if (modalInstance) {
      closeModal();
      return;
    }

    // Limpiar cualquier modal anterior que pueda estar en el DOM
    const existingModals = document.querySelectorAll('.ubits-button-feedback-modal');
    existingModals.forEach(modal => {
      const overlay = modal.closest('.ubits-modal-overlay');
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    });

    // Si el modal está cerrado, abrirlo
    modalInstance = createModal({
      title: '', // El título está en el bodyContent
      bodyContent: createModalContent(),
      size: 'md',
      open: true, // Abrir el modal automáticamente
      containerId: containerId,
      closeOnOverlayClick: false, // No cerrar al hacer clic fuera
      className: 'ubits-button-feedback-modal', // Clase para estilos personalizados
      footerButtons: {
        tertiary: {
          label: 'Cancelar',
          onClick: () => {
            if (onCancel) {
              onCancel();
            }
            closeModal();
          },
        },
        primary: {
          label: 'Enviar Feedback',
          onClick: async () => {
            // Obtener valores del formulario directamente del DOM
            const sectionContainer = document.getElementById(`${formContainerId}-section`);
            const commentContainer = document.getElementById(`${formContainerId}-comment`);

            if (sectionContainer) {
              const sectionElement = sectionContainer.querySelector('.ubits-input') as HTMLInputElement;
              if (sectionElement) {
                sectionValue = sectionElement.value;
              }
            }

            if (commentContainer) {
              const commentElement = commentContainer.querySelector('textarea') as HTMLTextAreaElement;
              if (commentElement) {
                commentValue = commentElement.value;
              }
            }

            // Validar que haya comentario
            if (!commentValue.trim()) {
              showToast('warning', 'Por favor, ingresa un comentario');
              return;
            }

            // Enviar a n8n si hay URL configurada
            if (n8nWebhookUrl) {
              try {
                const response = await fetch(n8nWebhookUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    section: sectionValue,
                    comment: commentValue,
                    timestamp: new Date().toISOString(),
                    url: window.location.href,
                  }),
                });

                if (!response.ok) {
                  throw new Error('Error al enviar feedback');
                }

                // Llamar callback de éxito
                if (onFeedbackSent) {
                  onFeedbackSent({
                    section: sectionValue,
                    comment: commentValue,
                  });
                }

                // Cerrar modal
                closeModal();

                // Mostrar mensaje de éxito
                showToast('success', '¡Gracias por tu feedback!');
              } catch (error) {
                console.error('Error enviando feedback:', error);
                showToast('error', 'Error al enviar el feedback. Por favor, intenta de nuevo.');
              }
            } else {
              // Si no hay URL, solo llamar al callback
              if (onFeedbackSent) {
                onFeedbackSent({
                  section: sectionValue,
                  comment: commentValue,
                });
              }
              closeModal();
            }
          },
        },
      },
      onClose: () => {
        // Quitar clase active del botón cuando el modal se cierra
        button.classList.remove('ubits-button--active');
        
        // Ejecutar el callback del usuario
        if (onClose) {
          onClose();
        }
        // Limpiar la instancia del modal
        modalInstance = null;
      },
    });

    // Posicionar el modal arriba del botón y ocultar overlay
    // Usar doble requestAnimationFrame para asegurar que el modal esté en el DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Usar la referencia de la instancia en lugar de querySelector
        const modalOverlay = modalInstance?.element as HTMLElement;
        const modal = modalOverlay?.querySelector('.ubits-button-feedback-modal') as HTMLElement;
        
        if (modalOverlay && modal && button) {
          // Ocultar el overlay/velo
          modalOverlay.style.backgroundColor = 'transparent';
          modalOverlay.style.pointerEvents = 'none';
          
          // Ocultar completamente el header del modal (usamos nuestro propio header en el bodyContent)
          const modalHeader = modal.querySelector('.ubits-modal__header');
          if (modalHeader) {
            (modalHeader as HTMLElement).style.display = 'none';
          }
          
          // Agregar event listener al botón de cerrar de nuestro header
          const closeButton = modal.querySelector('.ubits-button-feedback-modal__close') as HTMLButtonElement;
          if (closeButton) {
            closeButton.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              closeModal();
            });
          }
          
          // Agregar clase active al botón cuando el modal está abierto
          button.classList.add('ubits-button--active');
          
          // Posicionar el modal arriba del botón
          const buttonRect = button.getBoundingClientRect();
          
          modalOverlay.style.position = 'fixed';
          modalOverlay.style.top = '0';
          modalOverlay.style.left = '0';
          modalOverlay.style.right = '0';
          modalOverlay.style.bottom = '0';
          modalOverlay.style.display = 'flex';
          modalOverlay.style.alignItems = 'flex-end';
          modalOverlay.style.justifyContent = position === 'bottom-right' || position === 'top-right' ? 'flex-end' : 'flex-start';
          modalOverlay.style.paddingBottom = `${buttonRect.height + offset + 16}px`;
          modalOverlay.style.paddingRight = position === 'bottom-right' || position === 'top-right' ? `${offset}px` : 'auto';
          modalOverlay.style.paddingLeft = position === 'bottom-left' || position === 'top-left' ? `${offset}px` : 'auto';
          
          // Permitir interacción con el modal
          modal.style.pointerEvents = 'auto';
        }
      });
    });

    // Inicializar inputs después de que el modal se renderice
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const sectionContainer = document.getElementById(`${formContainerId}-section`);
        const commentContainer = document.getElementById(`${formContainerId}-comment`);

        if (sectionContainer) {
          // Crear select
          try {
            const sectionInputInstance = createInput({
              containerId: `${formContainerId}-section`,
              label: 'Sección actual:',
              type: 'select',
              size: 'md',
              value: sectionValue,
              selectOptions: sectionOptions.map(opt => ({ value: opt.value, text: opt.text })),
              showLabel: true,
              showHelper: false,
              onChange: (value) => {
                sectionValue = value;
              },
            });
          } catch (error) {
            console.error('Error creando select de sección:', error);
          }
        }

        if (commentContainer) {
          // Crear textarea
          try {
            const commentInputInstance = createInput({
              containerId: `${formContainerId}-comment`,
              label: 'Tu comentario:',
              type: 'textarea',
              size: 'md',
              value: commentValue,
              placeholder: commentPlaceholder,
              showLabel: true,
              showHelper: false,
              attributes: {
                rows: '6',
                style: 'resize: vertical; min-height: 120px;'
              },
              onChange: (value) => {
                commentValue = value;
              },
            });
          } catch (error) {
            console.error('Error creando textarea de comentario:', error);
          }
        }
      });
    });
  };

  // Función para cerrar el modal
  const closeModal = () => {
    if (modalInstance) {
      // Guardar referencia antes de cerrar para evitar recursión
      const instance = modalInstance;
      const modalElement = instance.element;
      modalInstance = null;
      
      // Cerrar el modal
      instance.close();
      
      // Eliminar el modal del DOM completamente
      if (modalElement && modalElement.parentNode) {
        modalElement.parentNode.removeChild(modalElement);
      }
      
      // Quitar clase active del botón cuando el modal se cierra
      button.classList.remove('ubits-button--active');
    }
  };

  // Crear botón flotante usando componente UBITS Button con variante floating
  // Asegurar que siempre tenga icono, y si hay texto, mostrar ambos
  const finalIcon = icon || 'comment-dots';
  const finalText = text || '';
  
  const buttonOptions = {
    variant: 'primary' as const,
    size: 'md' as const,
    text: finalText, // Texto del botón
    icon: finalIcon, // Icono del botón
    iconStyle: 'regular' as const,
    floating: true, // Activar variante floating
    iconOnly: !finalText && !!finalIcon, // Solo icono si no hay texto
    className: `ubits-button-feedback--${position} ${className}`.trim(),
    attributes: {
      'aria-label': 'Deja tu feedback'
    },
    onClick: () => {
      toggleModal();
    }
  };

  const button = createButton(buttonOptions);

  // Agregar la clase floating manualmente si no está presente
  if (buttonOptions.floating && !button.classList.contains('ubits-button--floating')) {
    button.classList.add('ubits-button--floating');
  }

  // Aplicar posicionamiento fijo y offset personalizado
  button.style.position = 'fixed';
  button.style.zIndex = '9998';
  
  if (position === 'bottom-right') {
    button.style.bottom = `${offset}px`;
    button.style.right = `${offset}px`;
    button.style.top = 'auto';
    button.style.left = 'auto';
  } else if (position === 'bottom-left') {
    button.style.bottom = `${offset}px`;
    button.style.left = `${offset}px`;
    button.style.top = 'auto';
    button.style.right = 'auto';
  } else if (position === 'top-right') {
    button.style.top = `${offset}px`;
    button.style.right = `${offset}px`;
    button.style.bottom = 'auto';
    button.style.left = 'auto';
  } else if (position === 'top-left') {
    button.style.top = `${offset}px`;
    button.style.left = `${offset}px`;
    button.style.bottom = 'auto';
    button.style.right = 'auto';
  }


  // Funciones de control
  const show = () => {
    button.classList.remove('ubits-button-feedback--hidden');
  };

  const hide = () => {
    button.classList.add('ubits-button-feedback--hidden');
  };

  const open = () => {
    toggleModal();
  };

  const destroy = () => {
    closeModal();
    if (button.parentElement) {
      button.parentElement.removeChild(button);
    }
  };

  // El onClick ya está configurado en createButton

  // Agregar al DOM
  container.appendChild(button);

  // Configurar visibilidad inicial
  if (!visible) {
    hide();
  }

  return {
    element: button,
    show,
    hide,
    open,
    close: closeModal,
    destroy
  };
}

