/**
 * AlertProvider
 * Lógica de renderizado del componente Alert
 * Genera HTML según las opciones proporcionadas
 */

import type { AlertOptions, AlertType } from './types/AlertOptions';

// Mapeo de iconos por tipo de alert
const iconMap: Record<AlertType, string> = {
  success: 'fa-check-circle',
  info: 'fa-info-circle',
  warning: 'fa-exclamation-triangle',
  error: 'fa-times-circle'
};

// Helper para renderizar iconos - compatible con Storybook
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza un alert UBITS como HTML string
 */
export function renderAlert(options: AlertOptions = {}): string {
  const {
    type = 'success',
    message = '',
    closable = true,
    className = ''
  } = options;

  // Obtener el icono apropiado para el tipo
  const iconClass = iconMap[type] || iconMap.success;

  // Construir clases CSS
  const classes = [
    'ubits-alert',
    `ubits-alert--${type}`,
    !closable && 'ubits-alert--no-close',
    className
  ].filter(Boolean).join(' ');

  // Generar HTML del alert
  return `
    <div class="${classes}" role="alert" aria-live="polite">
      <div class="ubits-alert__icon">
        ${renderIconHelper(iconClass, 'regular')}
      </div>
      <div class="ubits-alert__content">
        <div class="ubits-alert__text">${message}</div>
      </div>
      ${closable ? `
        <button class="ubits-alert__close" aria-label="Cerrar alerta">
          ${renderIconHelper('fa-times', 'regular')}
        </button>
      ` : ''}
    </div>
  `.trim();
}

/**
 * Crea un elemento alert programáticamente
 */
export function createAlert(options: AlertOptions = {}): HTMLDivElement {
  const div = document.createElement('div');
  div.innerHTML = renderAlert(options);
  const alert = div.querySelector('.ubits-alert');
  
  if (!alert) {
    throw new Error('Failed to create alert element');
  }

  // Agregar event listener para el botón cerrar
  if (options.closable !== false) {
    const closeButton = alert.querySelector('.ubits-alert__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        if (options.onClose) {
          options.onClose();
        }
        // Agregar animación de cierre
        alert.classList.add('ubits-alert--closing');
        setTimeout(() => {
          if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
          }
        }, 300);
      });
    }
  }


  // Configurar auto-close si se especifica duration
  if (options.duration && options.duration > 0) {
    setTimeout(() => {
      const closeBtn = alert.querySelector('.ubits-alert__close') as HTMLButtonElement;
      if (closeBtn) {
        closeBtn.click();
      } else {
        // Si no hay botón cerrar, simplemente remover
        alert.classList.add('ubits-alert--closing');
        setTimeout(() => {
          if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
          }
          if (options.onClose) {
            options.onClose();
          }
        }, 300);
      }
    }, options.duration);
  }

  // Mover el alert fuera del div temporal
  const parent = alert.parentElement;
  if (parent) {
    parent.replaceChild(alert, parent);
  }

  return alert as HTMLDivElement;
}

/**
 * Función helper para mostrar alert fácilmente
 */
export function showAlert(
  type: AlertType,
  message: string,
  options: Omit<AlertOptions, 'type' | 'message'> = {}
): HTMLDivElement | null {
  const containerId = options.container ? undefined : (options as any).containerId;
  const container = options.container || (containerId ? document.getElementById(containerId || '') : document.body);
  
  if (!container) {
    console.error('Alert container not found:', containerId);
    return null;
  }

  const alert = createAlert({
    type,
    message,
    ...options,
    container
  });

  container.appendChild(alert);
  return alert;
}

