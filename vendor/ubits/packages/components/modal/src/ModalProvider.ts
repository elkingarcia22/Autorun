import type { ModalOptions } from './types/ModalOptions';
import { renderButton } from '../../button/src/ButtonProvider';

/**
 * Modal Provider
 * Componente modal centrado con overlay
 */

/**
 * Tamaños del modal usando tokens UBITS
 */
const MODAL_SIZES: Record<string, string> = {
  sm: 'calc(var(--ubits-spacing-12) * 4)',
  md: 'calc(var(--ubits-spacing-12) * 6)',
  lg: 'calc(var(--ubits-spacing-12) * 8)',
  xl: 'calc(var(--ubits-spacing-12) * 10)',
  full: 'calc(var(--ubits-spacing-12) * 16)'
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
          ${renderButton({
            variant: 'tertiary',
            size: 'md',
            text: footerButtons.tertiary.label,
            className: 'ubits-modal__footer-button'
          })}
        </div>
        ` : ''}
        <div class="ubits-modal__footer-right">
          ${footerButtons.secondary ? renderButton({
            variant: 'secondary',
            size: 'md',
            text: footerButtons.secondary.label,
            className: 'ubits-modal__footer-button'
          }) : ''}
          ${footerButtons.primary ? renderButton({
            variant: 'primary',
            size: 'md',
            text: footerButtons.primary.label,
            className: 'ubits-modal__footer-button'
          }) : ''}
        </div>
      </div>
    </div>
  ` : '';

  // Modal container HTML
  const modalHTML = `
    <div class="ubits-modal-overlay">
      <div class="${classes}" style="max-width: ${modalWidth};">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
  
  return modalHTML;
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
  const modalHTML = renderModal(options);
  wrapper.innerHTML = modalHTML;
  const modalOverlay = wrapper.firstElementChild as HTMLElement;

  if (!modalOverlay) {
    console.error('❌ [Modal] No se pudo crear el modal - modalOverlay es null');
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
    const secondaryButton = modalOverlay.querySelector('.ubits-modal__footer-right .ubits-button--secondary.ubits-modal__footer-button') as HTMLButtonElement;
    const primaryButton = modalOverlay.querySelector('.ubits-modal__footer-right .ubits-button--primary.ubits-modal__footer-button') as HTMLButtonElement;

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

