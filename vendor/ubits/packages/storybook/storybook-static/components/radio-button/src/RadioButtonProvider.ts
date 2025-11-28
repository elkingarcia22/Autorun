import type { RadioButtonOptions } from './types/RadioButtonOptions';

/**
 * Renderiza el HTML de un Radio Button
 */
export function renderRadioButton(options: RadioButtonOptions): string {
  const {
    label,
    complementaryText,
    value,
    name,
    checked = false,
    size = 'md',
    state = 'default',
    disabled = false,
    className = ''
  } = options;

  const isDisabled = disabled || state === 'disabled';

  // Construir clases
  const classes = [
    'ubits-radio-button',
    `ubits-radio-button--${size}`,
    state !== 'default' ? `ubits-radio-button--${state}` : '',
    checked ? 'ubits-radio-button--checked' : '',
    isDisabled ? 'ubits-radio-button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // Radio input
  const radioInput = `
    <input
      type="radio"
      id="radio-${name}-${value}"
      name="${name}"
      value="${value}"
      ${checked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
      class="ubits-radio-button__input"
    />
  `;

  // Radio circle (visual)
  const radioCircle = `
    <span class="ubits-radio-button__circle" aria-hidden="true">
      ${checked || (state === 'active' && !checked) ? '<span class="ubits-radio-button__dot"></span>' : ''}
    </span>
  `;

  // Label text
  const labelHTML = `
    <span class="ubits-radio-button__label">${label}</span>
  `;

  // Complementary text
  const complementaryTextHTML = complementaryText
    ? `<span class="ubits-radio-button__complementary-text">${complementaryText}</span>`
    : '';

  // Text content wrapper
  const textContentHTML = `
    <div class="ubits-radio-button__text-content">
      ${labelHTML}
      ${complementaryTextHTML}
    </div>
  `;

  return `
    <label class="${classes}">
      ${radioInput}
      ${radioCircle}
      ${textContentHTML}
    </label>
  `.trim();
}

/**
 * Crea un elemento Radio Button programáticamente
 */
export function createRadioButton(options: RadioButtonOptions): {
  element: HTMLLabelElement;
  destroy: () => void;
  update: (newOptions: Partial<RadioButtonOptions>) => void;
} {
  const {
    containerId,
    onChange
  } = options;

  // Crear elemento
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderRadioButton(options);
  const radioButton = wrapper.firstElementChild as HTMLLabelElement;

  if (!radioButton) {
    throw new Error('No se pudo crear el radio button');
  }

  // Event listener para cambio
  const inputElement = radioButton.querySelector('.ubits-radio-button__input') as HTMLInputElement;
  if (inputElement && onChange) {
    inputElement.addEventListener('change', onChange);
  }

  // Agregar al DOM
  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  container.appendChild(radioButton);

  // Métodos
  const destroy = () => {
    if (radioButton.parentElement) {
      radioButton.parentElement.removeChild(radioButton);
    }
  };

  const update = (newOptions: Partial<RadioButtonOptions>) => {
    const updatedOptions = { ...options, ...newOptions };
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderRadioButton(updatedOptions);
    const newRadioButton = wrapper.firstElementChild as HTMLLabelElement;
    
    if (newRadioButton && radioButton.parentElement) {
      // Copiar event listener
      const newInputElement = newRadioButton.querySelector('.ubits-radio-button__input') as HTMLInputElement;
      if (newInputElement && updatedOptions.onChange) {
        newInputElement.addEventListener('change', updatedOptions.onChange);
      }

      radioButton.parentElement.replaceChild(newRadioButton, radioButton);
      return newRadioButton;
    }
  };

  return {
    element: radioButton,
    destroy,
    update
  };
}

