import type { ChipOptions } from './types/ChipOptions';

/**
 * Renderiza el HTML de un Chip
 */
export function renderChip(options: ChipOptions = {} as ChipOptions): string {
  const {
    label = '',
    size = 'md',
    state = 'default',
    leftIcon,
    rightIcon,
    clickable = false,
    closable = false,
    className = ''
  } = options;

  // Construir clases
  const classes = [
    'ubits-chip',
    `ubits-chip--${size}`,
    state !== 'default' ? `ubits-chip--${state}` : '',
    clickable ? 'ubits-chip--clickable' : '',
    closable ? 'ubits-chip--closable' : '',
    className
  ].filter(Boolean).join(' ');

  // Icono izquierdo
  const leftIconHTML = leftIcon 
    ? `<span class="ubits-chip__left-icon" aria-hidden="true"><i class="far fa-${leftIcon}"></i></span>`
    : '';

  // Icono derecho (botón de cerrar)
  const rightIconHTML = closable || rightIcon
    ? `<button class="ubits-chip__right-icon" type="button" aria-label="Cerrar chip" ${state === 'disabled' ? 'disabled' : ''}>
        <i class="far fa-${rightIcon || 'xmark'}"></i>
      </button>`
    : '';

  // Determinar role y aria attributes
  const role = clickable ? 'button' : 'none';
  const tabIndex = clickable && state !== 'disabled' ? '0' : '-1';
  const ariaDisabled = state === 'disabled' ? 'true' : 'false';

  return `
    <span class="${classes}" role="${role}" tabindex="${tabIndex}" aria-disabled="${ariaDisabled}">
      ${leftIconHTML}
      <span class="ubits-chip__label">${label}</span>
      ${rightIconHTML}
    </span>
  `.trim();
}

/**
 * Crea un elemento Chip programáticamente
 */
export function createChip(options: ChipOptions = {} as ChipOptions): {
  element: HTMLSpanElement;
  destroy: () => void;
  update: (newOptions: Partial<ChipOptions>) => void;
} {
  const {
    containerId,
    onClick,
    onClose
  } = options;

  // Crear elemento
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderChip(options);
  const chip = wrapper.firstElementChild as HTMLSpanElement;

  if (!chip) {
    throw new Error('No se pudo crear el chip');
  }

  // Event listeners
  if (onClick && options.state !== 'disabled') {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick(e);
    });
  }

  // Botón de cerrar
  const closeButton = chip.querySelector('.ubits-chip__right-icon') as HTMLButtonElement;
  if (closeButton && onClose) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose(e);
    });
  }

  // Agregar al DOM
  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  container.appendChild(chip);

  // Métodos
  const destroy = () => {
    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }
  };

  const update = (newOptions: Partial<ChipOptions>) => {
    const updatedOptions = { ...options, ...newOptions };
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderChip(updatedOptions);
    const newChip = wrapper.firstElementChild as HTMLSpanElement;
    
    if (newChip && chip.parentElement) {
      // Copiar event listeners
      if (updatedOptions.onClick && updatedOptions.state !== 'disabled') {
        newChip.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          updatedOptions.onClick!(e);
        });
      }

      const newCloseButton = newChip.querySelector('.ubits-chip__right-icon') as HTMLButtonElement;
      if (newCloseButton && updatedOptions.onClose) {
        newCloseButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          updatedOptions.onClose!(e);
        });
      }

      chip.parentElement.replaceChild(newChip, chip);
      return newChip;
    }
  };

  return {
    element: chip,
    destroy,
    update
  };
}
