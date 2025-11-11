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
 * Renderiza el botón de limpiar (X)
 */
function renderClearButton(): string {
  return `
    <button
      type="button"
      class="ubits-search-button__clear"
      aria-label="Limpiar búsqueda"
      tabindex="0"
    >
      <i class="far fa-times ubits-search-button__clear-icon" aria-hidden="true"></i>
    </button>
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
  
  // Si state es 'active', el buscador está desplegado
  const isSearchActive = active || state === 'active';

  const iconHTML = renderSearchIcon();
  const showClearButton = value && value.trim().length > 0;
  const clearButtonHTML = showClearButton ? renderClearButton() : '';

  // Si está activo (desplegado), mostrar input
  if (isSearchActive) {
    // Construir clases para el wrapper del input
    const inputWrapperClasses = [
      'ubits-search-button',
      'ubits-search-button--active',
      `ubits-search-button--${size}`,
      isDisabled ? 'ubits-search-button--disabled' : '',
      className
    ].filter(Boolean).join(' ');

    // Si se especifica width, usarlo; si no, usar auto para que se ajuste al contenido
    const widthStyle = width ? `width: ${width}px;` : '';

    return `
      <div class="${inputWrapperClasses}" style="${widthStyle}">
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
          ${clearButtonHTML}
        </div>
      </div>
    `.trim();
  }

  // Si no está activo, usar el botón UBITS estándar (secondary, icon-only)
  // Agregar clases para simular estados hover y pressed cuando se seleccionan desde el control
  // Nota: 'active' ahora controla el despliegue, no el estado pressed del botón
  const buttonClasses = [
    'ubits-button',
    'ubits-button--secondary',
    'ubits-button--icon-only',
    `ubits-button--${size}`,
    state === 'hover' ? 'ubits-search-button--force-hover' : '',
    // 'active' ya no se usa para el estado pressed, se usa para desplegar
    className
  ].filter(Boolean).join(' ');

  return `
    <button
      type="button"
      class="${buttonClasses}"
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
  const isSearchActive = options.active || options.state === 'active';
  
  if (isSearchActive) {
    const inputElement = element.querySelector('.ubits-search-button__input') as HTMLInputElement;
    const clearButton = element.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
    
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
    
    // Botón de limpiar
    if (clearButton) {
      clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (inputElement) {
          inputElement.value = '';
          inputElement.focus();
          // Trigger onChange si existe
          if (options.onChange) {
            const event = new Event('input', { bubbles: true });
            inputElement.dispatchEvent(event);
          }
        }
      });
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
      const isSearchActive = updatedOptions.active || updatedOptions.state === 'active';
      
      if (isSearchActive) {
        const inputElement = newElement.querySelector('.ubits-search-button__input') as HTMLInputElement;
        const clearButton = newElement.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
        
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
        
        // Botón de limpiar
        if (clearButton) {
          clearButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (inputElement) {
              inputElement.value = '';
              inputElement.focus();
              // Trigger onChange si existe
              if (updatedOptions.onChange) {
                const event = new Event('input', { bubbles: true });
                inputElement.dispatchEvent(event);
              }
            }
          });
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

