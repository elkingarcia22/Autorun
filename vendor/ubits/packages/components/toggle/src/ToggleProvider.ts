import type { ToggleOptions } from './types/ToggleOptions';

/**
 * Renderiza el HTML de un Toggle/Switch
 */
export function renderToggle(options: ToggleOptions): string {
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
    'ubits-toggle',
    `ubits-toggle--${size}`,
    state !== 'default' ? `ubits-toggle--${state}` : '',
    checked ? 'ubits-toggle--checked' : '',
    isDisabled ? 'ubits-toggle--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // Toggle input
  const toggleInput = `
    <input
      type="checkbox"
      id="toggle-${name}-${value || 'default'}"
      ${name ? `name="${name}"` : ''}
      ${value ? `value="${value}"` : ''}
      ${checked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
      class="ubits-toggle__input"
      role="switch"
      aria-checked="${checked}"
    />
  `;

  // Toggle track (container)
  const toggleTrack = `
    <span class="ubits-toggle__track" aria-hidden="true">
      <span class="ubits-toggle__thumb"></span>
    </span>
  `;

  // Text content (si hay label o complementaryText)
  let textContentHTML = '';
  if (label || complementaryText) {
    const labelHTML = label ? `<span class="ubits-toggle__label">${label}</span>` : '';
    const complementaryTextHTML = complementaryText
      ? `<span class="ubits-toggle__complementary-text">${complementaryText}</span>`
      : '';

    textContentHTML = `
      <div class="ubits-toggle__text-content">
        ${labelHTML}
        ${complementaryTextHTML}
      </div>
    `;
  }

  // Si hay texto, usar label wrapper, si no, usar div
  const wrapperTag = label || complementaryText ? 'label' : 'div';
  const wrapperClass = label || complementaryText ? classes : `${classes} ubits-toggle--no-label`;

  // Si hay texto, ponerlo primero (a la izquierda), luego el toggle
  return `
    <${wrapperTag} class="${wrapperClass}">
      ${toggleInput}
      ${textContentHTML}
      ${toggleTrack}
    </${wrapperTag}>
  `.trim();
}

/**
 * Crea un elemento Toggle programáticamente
 */
export function createToggle(options: ToggleOptions): {
  element: HTMLLabelElement | HTMLDivElement;
  destroy: () => void;
  update: (newOptions: Partial<ToggleOptions>) => void;
} {
  const container = options.containerId 
    ? document.getElementById(options.containerId)
    : document.body;

  if (!container) {
    throw new Error(`Container with id "${options.containerId}" not found`);
  }

  const toggleHTML = renderToggle(options);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = toggleHTML.trim();
  const element = tempDiv.firstElementChild as HTMLLabelElement | HTMLDivElement;

  if (!element) {
    throw new Error('Failed to create toggle element');
  }

  container.appendChild(element);

  // Agregar event listener para cambio
  const inputElement = element.querySelector('.ubits-toggle__input') as HTMLInputElement;
  if (inputElement && options.onChange) {
    inputElement.addEventListener('change', options.onChange);
  }

  const destroy = () => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  const update = (newOptions: Partial<ToggleOptions>) => {
    const updatedOptions = { ...options, ...newOptions };
    const newHTML = renderToggle(updatedOptions);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHTML.trim();
    const newElement = tempDiv.firstElementChild as HTMLLabelElement | HTMLDivElement;
    
    if (newElement && element.parentNode) {
      element.parentNode.replaceChild(newElement, element);
      // Actualizar referencias
      const newInputElement = newElement.querySelector('.ubits-toggle__input') as HTMLInputElement;
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

