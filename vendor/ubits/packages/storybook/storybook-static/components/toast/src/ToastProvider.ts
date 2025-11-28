/**
 * ToastProvider
 * Lógica de renderizado y gestión del componente Toast
 * Incluye timer inteligente, pausa en hover, apilado, etc.
 */

import type { ToastOptions, ToastType } from './types/ToastOptions';
import { renderButton } from '../../button/src/ButtonProvider';

// Duraciones por defecto por tipo
const DEFAULT_DURATIONS: Record<ToastType, number> = {
  success: 3500,
  info: 3500,
  warning: 5000,
  error: 6500
};

// Configuración por defecto
const DEFAULTS = {
  maxVisible: 3,
  pauseOnHover: true
};

// Mapeo de iconos por tipo
const iconMap: Record<ToastType, string> = {
  success: 'fa-check-circle',
  info: 'fa-info-circle',
  warning: 'fa-exclamation-triangle',
  error: 'fa-times-circle'
};

// Helper para renderizar iconos - compatible con Storybook
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Asegura que el container existe en el DOM
 */
function ensureContainer(containerId?: string): HTMLElement {
  const id = containerId || 'ubits-toast-container';
  let container = document.getElementById(id);
  
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    // Aplicar estilos al contenedor
    container.style.cssText = `
      position: fixed;
      top: var(--p-spacing-mode-1-lg, 16px);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--p-spacing-mode-1-md, 12px);
      width: 100%;
      max-width: 560px;
      min-width: 320px;
      padding: 0 var(--p-spacing-mode-1-lg, 16px);
      box-sizing: border-box;
      z-index: 10000;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }
  
  return container;
}

/**
 * Obtiene el rol ARIA apropiado según el tipo de toast
 */
function getAriaRole(type: ToastType): { role: string; ariaLive: string } {
  if (type === 'warning' || type === 'error') {
    return { role: 'alert', ariaLive: 'assertive' };
  }
  return { role: 'status', ariaLive: 'polite' };
}

/**
 * Limita el número de toasts visibles (elimina los más antiguos)
 */
function limitStack(container: HTMLElement, maxVisible: number): void {
  const toasts = Array.from(container.querySelectorAll('.ubits-toast'));
  if (toasts.length <= maxVisible) return;
  
  const overflow = toasts.length - maxVisible;
  for (let i = 0; i < overflow; i++) {
    safelyRemove(toasts[i] as HTMLElement);
  }
}

/**
 * Elimina un toast de forma segura con animación
 */
function safelyRemove(toast: HTMLElement | null): void {
  if (!toast) return;
  
  toast.classList.add('ubits-toast--exit');
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 180);
}

/**
 * Renderiza un toast UBITS como HTML string
 */
export function renderToast(options: ToastOptions): string {
  const {
    type = 'info',
    title = '',
    message = '',
    noClose = false,
    action,
    className = '',
    attributes = {}
  } = options;

  const iconClass = iconMap[type] || iconMap.info;
  const { role, ariaLive } = getAriaRole(type);

  const classes = [
    'ubits-toast',
    `ubits-toast--${type}`,
    className
  ].filter(Boolean).join(' ');

  const attrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  // Header con icono, título y botón cerrar alineados en una sola fila
  const headerHTML = `
    <div class="ubits-toast__header">
      <div class="ubits-toast__icon" aria-hidden="true">${renderIconHelper(iconClass, 'regular')}</div>
      <div class="ubits-toast__title">${title || ''}</div>
      ${!noClose ? renderButton({
        variant: 'tertiary',
        size: 'sm',
        icon: 'times',
        iconOnly: true,
        className: 'ubits-toast__close',
        attributes: {
          'aria-label': 'Cerrar notificación'
        }
      }) : ''}
    </div>
  `;

  // Botón de acción opcional
  const actionButton = action && action.label && typeof action.onClick === 'function'
    ? `
      <div class="ubits-toast__actions">
        <button class="ubits-toast__action ubits-toast__action--${type}" type="button" data-toast-action>
          <span>${action.label}</span>
        </button>
      </div>
    `
    : '';

  return `
    <div class="${classes}" role="${role}" aria-live="${ariaLive}" ${attrs}>
      <div class="ubits-toast__content">
        ${headerHTML}
        <div class="ubits-toast__body">${message}</div>
        ${actionButton}
      </div>
    </div>
  `.trim();
}

/**
 * Crea un elemento toast programáticamente
 */
export function createToast(options: ToastOptions): HTMLDivElement {
  const div = document.createElement('div');
  div.innerHTML = renderToast(options);
  const toast = div.querySelector('.ubits-toast') as HTMLDivElement;
  
  if (!toast) {
    throw new Error('Failed to create toast element');
  }

  // Remover el toast del div temporal antes de agregar event listeners
  // para evitar problemas de referencias
  const tempParent = toast.parentElement;
  if (tempParent) {
    tempParent.removeChild(toast);
  }

  // Event listener para botón cerrar
  if (!options.noClose) {
    const closeButton = toast.querySelector('.ubits-toast__close');
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        safelyRemove(toast);
        if (options.onClose) {
          options.onClose();
        }
      });
    }
  }

  // Event listener para botón de acción
  const actionButton = toast.querySelector('[data-toast-action]');
  if (actionButton && options.action) {
    actionButton.addEventListener('click', (e) => {
      e.stopPropagation();
      if (options.action && options.action.onClick) {
        options.action.onClick();
      }
    });
  }

  return toast;
}

/**
 * Muestra un toast con gestión completa de timer, pausa, apilado, etc.
 */
export function showToast(
  type: ToastType,
  message: string,
  options: Omit<ToastOptions, 'type' | 'message'> = {}
): HTMLDivElement {
  const container = ensureContainer(options.containerId);
  const toast = createToast({
    type,
    message,
    ...options
  });

  container.appendChild(toast);

  // Limitar apilado
  limitStack(container, DEFAULTS.maxVisible);

  // Animación de entrada
  requestAnimationFrame(() => {
    toast.classList.add('ubits-toast--enter');
  });

  // Gestión de duración y timer
  const baseDuration = DEFAULT_DURATIONS[type] || DEFAULT_DURATIONS.info;
  const duration = typeof options.duration === 'number' ? options.duration : baseDuration;
  
  if (duration > 0) {
    let remaining = duration;
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let startTs: number | null = null;

    const startTimer = () => {
      if (duration <= 0) return;
      
      startTs = performance.now();
      timerId = setTimeout(() => {
        safelyRemove(toast);
        if (options.onClose) {
          options.onClose();
        }
      }, remaining);
    };

    const pauseTimer = () => {
      if (!timerId) return;
      
      clearTimeout(timerId);
      timerId = null;
      
      if (startTs) {
        const elapsed = performance.now() - startTs;
        remaining = Math.max(0, remaining - elapsed);
      }
    };

    // Configurar pausa en hover/focus
    const pauseOnHover = options.pauseOnHover !== false && DEFAULTS.pauseOnHover;
    
    if (pauseOnHover) {
      toast.addEventListener('mouseenter', pauseTimer);
      toast.addEventListener('mouseleave', startTimer);
      toast.addEventListener('focusin', pauseTimer);
      toast.addEventListener('focusout', startTimer);
    }

    // Iniciar timer
    startTimer();

    // Limpiar event listeners cuando se elimina el toast
    const cleanup = () => {
      toast.removeEventListener('mouseenter', pauseTimer);
      toast.removeEventListener('mouseleave', startTimer);
      toast.removeEventListener('focusin', pauseTimer);
      toast.removeEventListener('focusout', startTimer);
      if (timerId) {
        clearTimeout(timerId);
      }
    };

    // Observar cuando el toast se elimina
    const observer = new MutationObserver(() => {
      if (!toast.parentNode) {
        cleanup();
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true });
  }

  return toast;
}

/**
 * Función helper para mostrar toasts fácilmente (API similar al playground anterior)
 */
export function showToastHelper(
  type: ToastType,
  message: string,
  options: Omit<ToastOptions, 'type' | 'message'> = {}
): void {
  showToast(type, message, options);
}

