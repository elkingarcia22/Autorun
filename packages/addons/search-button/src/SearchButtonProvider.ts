import type { SearchButtonOptions } from './types/SearchButtonOptions';

/**
 * Renderiza el icono de lupa
 */
function renderSearchIcon(): string {
  return `
    <i class="far fa-magnifying-glass ubits-search-button__icon" aria-hidden="true"></i>
  `;
}

/**
 * Renderiza el HTML de un Search Button
 */
export function renderSearchButton(options: SearchButtonOptions): string {
  const {
    active = false,
    size = 'md',
    state = 'default',
    disabled = false,
    placeholder = '',
    value = '',
    width = 248,
    className = ''
  } = options;

  const isDisabled = disabled || state === 'disabled';

  // Construir clases
  const classes = [
    'ubits-search-button',
    `ubits-search-button--${size}`,
    state !== 'default' ? `ubits-search-button--${state}` : '',
    active ? 'ubits-search-button--active' : '',
    isDisabled ? 'ubits-search-button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const iconHTML = renderSearchIcon();

  // Si está activo, mostrar input
  if (active) {
    return `
      <div class="${classes}" style="width: ${width}px;">
        <div class="ubits-search-button__input-wrapper">
          ${iconHTML}
          <input
            type="text"
            class="ubits-search-button__input"
            placeholder="${placeholder}"
            value="${value}"
            ${isDisabled ? 'disabled' : ''}
            aria-label="Buscar"
          />
        </div>
      </div>
    `.trim();
  }

  // Si no está activo, mostrar solo el botón con icono
  return `
    <button
      type="button"
      class="${classes}"
      ${isDisabled ? 'disabled' : ''}
      aria-label="Buscar"
    >
      ${iconHTML}
    </button>
  `.trim();
}

/**
 * Crea un elemento Search Button programáticamente
 */
export function createSearchButton(options: SearchButtonOptions): {
  element: HTMLButtonElement | HTMLDivElement;
  destroy: () => void;
  update: (newOptions: Partial<SearchButtonOptions>) => void;
} {
  const container = options.containerId 
    ? document.getElementById(options.containerId)
    : document.body;

  if (!container) {
    throw new Error(`Container with id "${options.containerId}" not found`);
  }

  const searchHTML = renderSearchButton(options);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = searchHTML.trim();
  const element = tempDiv.firstElementChild as HTMLButtonElement | HTMLDivElement;

  if (!element) {
    throw new Error('Failed to create search button element');
  }

  container.appendChild(element);

  // Agregar event listeners
  if (options.active) {
    const inputElement = element.querySelector('.ubits-search-button__input') as HTMLInputElement;
    if (inputElement) {
      if (options.onChange) {
        inputElement.addEventListener('input', options.onChange);
        inputElement.addEventListener('change', options.onChange);
      }
      if (options.onFocus) {
        inputElement.addEventListener('focus', options.onFocus);
      }
      if (options.onBlur) {
        inputElement.addEventListener('blur', options.onBlur);
      }
    }
  } else {
    const buttonElement = element as HTMLButtonElement;
    if (buttonElement && options.onClick) {
      buttonElement.addEventListener('click', options.onClick);
    }
  }

  const destroy = () => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  const update = (newOptions: Partial<SearchButtonOptions>) => {
    const updatedOptions = { ...options, ...newOptions };
    const newHTML = renderSearchButton(updatedOptions);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHTML.trim();
    const newElement = tempDiv.firstElementChild as HTMLButtonElement | HTMLDivElement;
    
    if (newElement && element.parentNode) {
      element.parentNode.replaceChild(newElement, element);
      
      // Actualizar referencias y event listeners
      if (updatedOptions.active) {
        const inputElement = newElement.querySelector('.ubits-search-button__input') as HTMLInputElement;
        if (inputElement) {
          if (updatedOptions.onChange) {
            inputElement.addEventListener('input', updatedOptions.onChange);
            inputElement.addEventListener('change', updatedOptions.onChange);
          }
          if (updatedOptions.onFocus) {
            inputElement.addEventListener('focus', updatedOptions.onFocus);
          }
          if (updatedOptions.onBlur) {
            inputElement.addEventListener('blur', updatedOptions.onBlur);
          }
        }
      } else {
        const buttonElement = newElement as HTMLButtonElement;
        if (buttonElement && updatedOptions.onClick) {
          buttonElement.addEventListener('click', updatedOptions.onClick);
        }
      }
    }
  };

  return {
    element,
    destroy,
    update
  };
}

