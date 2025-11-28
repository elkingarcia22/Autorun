import type { SearchButtonOptions } from './types/SearchButtonOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import { renderInput } from '../../input/src/InputProvider';

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

    // Generar el input usando renderInput pero sin atributos para evitar wrapper extra
    // Luego agregamos el aria-label directamente al input
    // NO agregamos leftIcon porque el SearchButton tiene su propio diseño sin icono en el input
    const inputHTML = renderInput({
      type: 'text',
      size: size,
      placeholder: placeholder,
      value: value,
      showLabel: false,
      showHelper: false,
      className: 'ubits-search-button__input',
      state: isDisabled ? 'disabled' : 'default'
    });
    
    // renderInput genera: <div style="position: relative; display: inline-block; width: 100%;">...</div>
    // El wrapper del SearchButton ya tiene position: relative, así que podemos extraer el contenido
    // pero necesitamos mantener el wrapper interno para que el icono absolute funcione
    // O mejor aún, extraer solo el input y el icono, y el wrapper del SearchButton será el contenedor relative
    
    let inputContent = inputHTML;
    
    // Remover el wrapper div externo si existe (el que tiene position: relative)
    // Pero mantener el input y el icono
    const wrapperMatch = inputHTML.match(/^<div[^>]*style="[^"]*position:\s*relative[^"]*"[^>]*>(.*?)<\/div>$/s);
    
    if (wrapperMatch && wrapperMatch[1]) {
      inputContent = wrapperMatch[1].trim();
      
      // Sin icono, el input solo necesita el padding estándar
      // El wrapper ya tiene padding-left: var(--ubits-spacing-md), así que el input no necesita padding-left adicional
      // Remover cualquier padding-left que renderInput haya agregado
      inputContent = inputContent.replace(
        /padding-left:\s*\d+px;/g,
        'padding-left: 0;'
      );
    }
    
    // Agregar aria-label directamente al input dentro del contenido
    inputContent = inputContent.replace(
      /(<input[^>]*class="[^"]*ubits-search-button__input[^"]*"[^>]*)(>)/,
      '$1 aria-label="Buscar"$2'
    );
    
    const finalHTML = `
      <div class="${inputWrapperClasses}" style="${widthStyle}">
        <div class="ubits-search-button__input-wrapper">
          ${inputContent}
          ${clearButtonHTML}
        </div>
      </div>
    `.trim();
    
    return finalHTML;
  }

  // Si no está activo, usar el botón UBITS estándar (secondary, icon-only)
  // Agregar clases para simular estados hover y pressed cuando se seleccionan desde el control
  // Nota: 'active' ahora controla el despliegue, no el estado pressed del botón
  const additionalClasses = [
    state === 'hover' ? 'ubits-search-button--force-hover' : '',
    className
  ].filter(Boolean).join(' ');

  return renderButton({
    variant: 'secondary',
    size: size,
    icon: 'magnifying-glass',
    iconOnly: true,
    disabled: isDisabled,
    className: additionalClasses,
    attributes: {
      'aria-label': 'Buscar'
    }
  });
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
    const isSearchActive = updatedOptions.active || updatedOptions.state === 'active';
    const wasSearchActive = options.active || options.state === 'active';
    
    // Si el input está activo y solo cambió el valor, actualizar directamente sin regenerar
    if (isSearchActive && wasSearchActive) {
      const currentInput = element.querySelector('.ubits-search-button__input') as HTMLInputElement;
      const currentClearButton = element.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
      
      // Si solo cambió el valor y el input existe, actualizar directamente
      if (currentInput && newOptions.value !== undefined && newOptions.value !== currentInput.value) {
        // Preservar posición del cursor
        const cursorPosition = currentInput.selectionStart || 0;
        currentInput.value = newOptions.value || '';
        // Restaurar posición del cursor
        currentInput.setSelectionRange(cursorPosition, cursorPosition);
        return; // No regenerar el HTML
      }
      
      // Si cambió el placeholder, actualizar directamente
      if (currentInput && newOptions.placeholder !== undefined) {
        currentInput.placeholder = newOptions.placeholder || '';
      }
      
      // Si cambió el estado disabled, actualizar directamente
      if (currentInput && newOptions.disabled !== undefined) {
        currentInput.disabled = newOptions.disabled || false;
      }
      
      // Si solo cambió el valor o propiedades simples, no regenerar
      const significantChanges = ['active', 'state', 'size', 'width', 'className'];
      const hasSignificantChange = significantChanges.some(key => 
        newOptions[key as keyof SearchButtonOptions] !== undefined && 
        newOptions[key as keyof SearchButtonOptions] !== options[key as keyof SearchButtonOptions]
      );
      
      if (!hasSignificantChange) {
        return; // No regenerar el HTML
      }
    }
    
    // Para otros cambios, regenerar el HTML completo
    const newHTML = renderSearchButton(updatedOptions);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHTML.trim();
    const newElement = tempDiv.firstElementChild as HTMLButtonElement | HTMLDivElement;
    
    if (newElement && element.parentNode) {
      // Preservar foco y posición del cursor si el input existía
      let shouldRestoreFocus = false;
      let cursorPosition = 0;
      if (isSearchActive && wasSearchActive) {
        const oldInput = element.querySelector('.ubits-search-button__input') as HTMLInputElement;
        if (oldInput && oldInput === document.activeElement) {
          shouldRestoreFocus = true;
          cursorPosition = oldInput.selectionStart || 0;
        }
      }
      
      element.parentNode.replaceChild(newElement, element);
      
      // Actualizar referencias y event listeners
      if (isSearchActive) {
        const inputElement = newElement.querySelector('.ubits-search-button__input') as HTMLInputElement;
        const clearButton = newElement.querySelector('.ubits-search-button__clear') as HTMLButtonElement;
        
        if (inputElement) {
          // Restaurar foco y posición del cursor
          if (shouldRestoreFocus) {
            inputElement.focus();
            inputElement.setSelectionRange(cursorPosition, cursorPosition);
          }
          
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

