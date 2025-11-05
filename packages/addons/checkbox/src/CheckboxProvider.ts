import type { CheckboxOptions } from './types/CheckboxOptions';

/**
 * Renderiza el HTML de un Checkbox
 */
export function renderCheckbox(options: CheckboxOptions): string {
  const {
    label,
    complementaryText,
    value = '',
    name = '',
    checked = false,
    size = 'md',
    state = 'default',
    disabled = false,
    className = ''
  } = options;

  const isDisabled = disabled || state === 'disabled';

  // Construir clases
  const classes = [
    'ubits-checkbox',
    `ubits-checkbox--${size}`,
    state !== 'default' ? `ubits-checkbox--${state}` : '',
    checked ? 'ubits-checkbox--checked' : '',
    isDisabled ? 'ubits-checkbox--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // Checkbox input
  const checkboxInput = `
    <input
      type="checkbox"
      id="checkbox-${name}-${value || 'default'}"
      ${name ? `name="${name}"` : ''}
      ${value ? `value="${value}"` : ''}
      ${checked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
      class="ubits-checkbox__input"
    />
  `;

  // Checkbox square (visual)
  const checkboxSquare = `
    <span class="ubits-checkbox__square" aria-hidden="true">
      ${checked || (state === 'active' && !checked) ? '<span class="ubits-checkbox__checkmark"></span>' : ''}
    </span>
  `;

  // Label text
  const labelHTML = `
    <span class="ubits-checkbox__label">${label}</span>
  `;

  // Complementary text
  const complementaryTextHTML = complementaryText
    ? `<span class="ubits-checkbox__complementary-text">${complementaryText}</span>`
    : '';

  // Text content wrapper
  const textContentHTML = `
    <div class="ubits-checkbox__text-content">
      ${labelHTML}
      ${complementaryTextHTML}
    </div>
  `;

  return `
    <label class="${classes}">
      ${checkboxInput}
      ${checkboxSquare}
      ${textContentHTML}
    </label>
  `.trim();
}

/**
 * Crea un elemento Checkbox programáticamente
 */
export function createCheckbox(options: CheckboxOptions): {
  element: HTMLLabelElement;
  destroy: () => void;
  update: (newOptions: Partial<CheckboxOptions>) => void;
} {
  const container = options.containerId 
    ? document.getElementById(options.containerId)
    : document.body;

  if (!container) {
    throw new Error(`Container with id "${options.containerId}" not found`);
  }

  const checkboxHTML = renderCheckbox(options);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = checkboxHTML.trim();
  const element = tempDiv.firstElementChild as HTMLLabelElement;

  if (!element) {
    throw new Error('Failed to create checkbox element');
  }

  container.appendChild(element);

  // Agregar event listener para cambio
  const inputElement = element.querySelector('.ubits-checkbox__input') as HTMLInputElement;
  if (inputElement && options.onChange) {
    inputElement.addEventListener('change', options.onChange);
  }

  const destroy = () => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  const update = (newOptions: Partial<CheckboxOptions>) => {
    const updatedOptions = { ...options, ...newOptions };
    const newHTML = renderCheckbox(updatedOptions);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHTML.trim();
    const newElement = tempDiv.firstElementChild as HTMLLabelElement;
    
    if (newElement && element.parentNode) {
      element.parentNode.replaceChild(newElement, element);
      // Actualizar referencias
      const newInputElement = newElement.querySelector('.ubits-checkbox__input') as HTMLInputElement;
      if (newInputElement && updatedOptions.onChange) {
        newInputElement.addEventListener('change', updatedOptions.onChange);
      }
    }
  };

  return {
    element,
    destroy,
    update
  };
}

