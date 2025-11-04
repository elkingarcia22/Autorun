import type { ModalOptions } from './types/ModalOptions';

/**
 * Modal Provider
 * Componente modal centrado con overlay
 */

/**
 * Tamaños del modal en píxeles
 */
const MODAL_SIZES: Record<string, string> = {
  sm: '320px',
  md: '480px',
  lg: '640px',
  xl: '800px',
  full: '1280px'
};

/**
 * Renderiza el HTML de un Modal
 */
export function renderModal(options: ModalOptions): string {
  const {
    title,
    bodyContent = '',
    size = 'md',
    fullScreen = false,
    footerButtons,
    className = ''
  } = options;

  const modalWidth = MODAL_SIZES[size] || MODAL_SIZES.md;
  const modalSizeClass = `ubits-modal--size-${size}`;
  const fullScreenClass = fullScreen ? 'ubits-modal--full-screen' : '';

  // Construir clases
  const classes = [
    'ubits-modal',
    modalSizeClass,
    fullScreenClass,
    className
  ].filter(Boolean).join(' ');

  // Header HTML
  const headerHTML = `
    <div class="ubits-modal__header">
      <div class="ubits-modal__header-text">
        <div class="ubits-modal__header-title">
          <p class="ubits-heading-h2">${title}</p>
        </div>
      </div>
      <button class="ubits-modal__close" aria-label="Cerrar modal" type="button">
        <i class="far fa-times"></i>
      </button>
    </div>
  `;

  // Body HTML
  const bodyHTMLContent = typeof bodyContent === 'function' 
    ? bodyContent() 
    : bodyContent || '<div class="ubits-modal__placeholder">Contenido del modal</div>';

  const bodyHTML = `
    <div class="ubits-modal__body">
      <div class="ubits-modal__body-content">
        ${bodyHTMLContent}
      </div>
      <div class="ubits-modal__scrollbar">
        <div class="ubits-modal__scrollbar-bar"></div>
      </div>
    </div>
  `;

  // Footer HTML
  const footerHTML = footerButtons ? `
    <div class="ubits-modal__footer">
      <div class="ubits-modal__footer-actions">
        ${footerButtons.tertiary ? `
        <div class="ubits-modal__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${footerButtons.tertiary.label}</span>
          </button>
        </div>
        ` : ''}
        <div class="ubits-modal__footer-right">
          ${footerButtons.secondary ? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${footerButtons.secondary.label}</span>
          </button>
          ` : ''}
          ${footerButtons.primary ? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-modal__footer-button" type="button">
            <span>${footerButtons.primary.label}</span>
          </button>
          ` : ''}
        </div>
      </div>
    </div>
  ` : '';

  // Modal container HTML
  return `
    <div class="ubits-modal-overlay">
      <div class="${classes}" style="max-width: ${modalWidth};">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
}

/**
 * Crea y renderiza un Modal en el DOM
 */
export function createModal(options: ModalOptions): {
  element: HTMLElement;
  open: () => void;
  close: () => void;
  updateContent: (content: string | (() => string)) => void;
} {
  const {
    containerId,
    onClose,
    closeOnOverlayClick = true,
    open = false
  } = options;

  // Crear contenedor si no existe
  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  // Crear elemento del modal
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderModal(options);
  const modalOverlay = wrapper.firstElementChild as HTMLElement;

  if (!modalOverlay) {
    throw new Error('No se pudo crear el modal');
  }

  const modal = modalOverlay.querySelector('.ubits-modal') as HTMLElement;
  const closeButton = modalOverlay.querySelector('.ubits-modal__close') as HTMLButtonElement;
  const overlay = modalOverlay as HTMLElement;

  // Funciones de control
  const openModal = () => {
    modalOverlay.classList.add('ubits-modal-overlay--open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('ubits-modal-overlay--open');
    document.body.style.overflow = '';
    if (onClose) {
      onClose();
    }
  };

  const updateContent = (content: string | (() => string)) => {
    const bodyContentElement = modalOverlay.querySelector('.ubits-modal__body-content');
    if (bodyContentElement) {
      const contentHTML = typeof content === 'function' ? content() : content;
      bodyContentElement.innerHTML = contentHTML;
    }
  };

  // Event listeners
  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  if (closeOnOverlayClick && overlay) {
    overlay.addEventListener('click', (e) => {
      // Solo cerrar si se hace clic directamente en el overlay, no en el modal
      if (e.target === overlay) {
        closeModal();
      }
    });
  }

  // Cerrar con ESC
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('ubits-modal-overlay--open')) {
      closeModal();
    }
  };
  document.addEventListener('keydown', handleEsc);

  // Agregar event listeners a los botones del footer
  if (options.footerButtons) {
    const tertiaryButton = modalOverlay.querySelector('.ubits-modal__footer-left .ubits-modal__footer-button') as HTMLButtonElement;
    const secondaryButton = modalOverlay.querySelector('.ubits-modal__footer-right .ubits-button--secondary') as HTMLButtonElement;
    const primaryButton = modalOverlay.querySelector('.ubits-modal__footer-right .ubits-button--primary') as HTMLButtonElement;

    if (tertiaryButton && options.footerButtons.tertiary?.onClick) {
      tertiaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        options.footerButtons!.tertiary!.onClick!(e);
      });
    }

    if (secondaryButton && options.footerButtons.secondary?.onClick) {
      secondaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        options.footerButtons!.secondary!.onClick!(e);
      });
    }

    if (primaryButton && options.footerButtons.primary?.onClick) {
      primaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        options.footerButtons!.primary!.onClick!(e);
      });
    }
  }

  // Agregar al DOM
  container.appendChild(modalOverlay);

  // Abrir si está configurado para abrirse inicialmente
  if (open) {
    openModal();
  }

  return {
    element: modalOverlay,
    open: openModal,
    close: closeModal,
    updateContent
  };
}

