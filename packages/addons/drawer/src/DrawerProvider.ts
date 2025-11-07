import type { DrawerOptions } from './types/DrawerOptions';
import { renderButton } from '../../button/src/ButtonProvider';

/**
 * Drawer Navigation Provider
 * Componente drawer que sale de izquierda a derecha con overlay
 */

/**
 * Anchos del drawer en porcentajes del viewport
 */
const DRAWER_WIDTHS: Record<number, string> = {
  100: '100%',
  80: '80%',
  60: '60%',
  50: '50%',
  40: '40%',
  30: '30%'
};

/**
 * Renderiza el HTML de un Drawer Navigation
 */
export function renderDrawer(options: DrawerOptions): string {
  const {
    title,
    complementaryText,
    width = 40,
    bodyContent = '',
    footerButtons,
    className = ''
  } = options;

  const drawerWidth = DRAWER_WIDTHS[width] || DRAWER_WIDTHS[40];
  const drawerWidthClass = `ubits-drawer--width-${width}`;

  // Construir clases
  const classes = [
    'ubits-drawer',
    drawerWidthClass,
    className
  ].filter(Boolean).join(' ');

  // Header HTML
  const headerHTML = `
    <div class="ubits-drawer__header">
      <div class="ubits-drawer__header-text">
        <div class="ubits-drawer__header-title">
          <p class="ubits-heading-h2">${title}</p>
        </div>
        ${complementaryText ? `
        <div class="ubits-drawer__header-complementary">
          <p class="ubits-body-sm-regular">${complementaryText}</p>
        </div>
        ` : ''}
      </div>
      ${renderButton({
        variant: 'secondary',
        size: 'md',
        icon: 'fa-times',
        iconOnly: true,
        className: 'ubits-drawer__close'
      })}
    </div>
  `;

  // Body HTML
  const bodyHTMLContent = typeof bodyContent === 'function' 
    ? bodyContent() 
    : bodyContent || '<div class="ubits-drawer__placeholder">Contenido del drawer</div>';

  const bodyHTML = `
    <div class="ubits-drawer__body">
      <div class="ubits-drawer__body-content">
        ${bodyHTMLContent}
      </div>
      <div class="ubits-drawer__scrollbar">
        <div class="ubits-drawer__scrollbar-bar"></div>
      </div>
    </div>
  `;

  // Footer HTML
  const footerHTML = footerButtons ? `
    <div class="ubits-drawer__footer">
      <div class="ubits-drawer__footer-actions">
        ${footerButtons.tertiary ? `
        <div class="ubits-drawer__footer-left">
          <button class="ubits-button ubits-button--tertiary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${footerButtons.tertiary.label}</span>
          </button>
        </div>
        ` : ''}
        <div class="ubits-drawer__footer-right">
          ${footerButtons.secondary ? `
          <button class="ubits-button ubits-button--secondary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${footerButtons.secondary.label}</span>
          </button>
          ` : ''}
          ${footerButtons.primary ? `
          <button class="ubits-button ubits-button--primary ubits-button--md ubits-drawer__footer-button" type="button">
            <span>${footerButtons.primary.label}</span>
          </button>
          ` : ''}
        </div>
      </div>
    </div>
  ` : '';

  // Drawer container HTML
  const drawerContainerHTML = `
    <div class="ubits-drawer__container" style="width: ${drawerWidth};">
      ${headerHTML}
      ${bodyHTML}
      ${footerHTML}
    </div>
  `;

  // Overlay + Drawer HTML completo
  return `
    <div class="ubits-drawer-overlay">
      <div class="${classes}">
        ${headerHTML}
        ${bodyHTML}
        ${footerHTML}
      </div>
    </div>
  `.trim();
}

/**
 * Crea y renderiza un Drawer Navigation en el DOM
 */
export function createDrawer(options: DrawerOptions): {
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

  // Crear elemento del drawer
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderDrawer(options);
  const drawerOverlay = wrapper.firstElementChild as HTMLElement;

  if (!drawerOverlay) {
    throw new Error('No se pudo crear el drawer');
  }

  const drawer = drawerOverlay.querySelector('.ubits-drawer') as HTMLElement;
  const closeButton = drawerOverlay.querySelector('.ubits-drawer__close') as HTMLButtonElement;
  const overlay = drawerOverlay as HTMLElement;

  // Funciones de control
  const openDrawer = () => {
    drawerOverlay.classList.add('ubits-drawer-overlay--open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawerOverlay.classList.remove('ubits-drawer-overlay--open');
    document.body.style.overflow = '';
    if (onClose) {
      onClose();
    }
  };

  const updateContent = (content: string | (() => string)) => {
    const bodyContentElement = drawerOverlay.querySelector('.ubits-drawer__body-content');
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
      closeDrawer();
    });
  }

  if (closeOnOverlayClick && overlay) {
    overlay.addEventListener('click', (e) => {
      // Solo cerrar si se hace clic directamente en el overlay, no en el drawer
      if (e.target === overlay) {
        closeDrawer();
      }
    });
  }

  // Cerrar con ESC
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && drawerOverlay.classList.contains('ubits-drawer-overlay--open')) {
      closeDrawer();
    }
  };
  document.addEventListener('keydown', handleEsc);

  // Agregar event listeners a los botones del footer
  if (options.footerButtons) {
    const tertiaryButton = drawerOverlay.querySelector('.ubits-drawer__footer-left .ubits-drawer__footer-button') as HTMLButtonElement;
    const secondaryButton = drawerOverlay.querySelector('.ubits-drawer__footer-right .ubits-button--secondary') as HTMLButtonElement;
    const primaryButton = drawerOverlay.querySelector('.ubits-drawer__footer-right .ubits-button--primary') as HTMLButtonElement;

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
  container.appendChild(drawerOverlay);

  // Abrir si está configurado para abrirse inicialmente
  if (open) {
    openDrawer();
  }

  return {
    element: drawerOverlay,
    open: openDrawer,
    close: closeDrawer,
    updateContent
  };
}

