/**
 * SpinnerProvider
 * Lógica de renderizado del componente Spinner/Loader
 * Genera HTML para spinners de carga usando tokens UBITS
 */

import type { SpinnerOptions } from './types/SpinnerOptions';

/**
 * Renderiza un spinner loader como HTML string
 */
export function renderSpinner(options: SpinnerOptions = {}): string {
  const {
    size = 'md',
    variant = 'primary',
    animated = true,
    label,
    fullScreen = false,
    className = '',
    style = ''
  } = options;

  // Construir clases base
  const classes = [
    'ubits-spinner',
    `ubits-spinner--${size}`,
    `ubits-spinner--${variant}`,
    animated ? 'ubits-spinner--animated' : '',
    fullScreen ? 'ubits-spinner--fullscreen' : '',
    className
  ].filter(Boolean).join(' ');

  const styleAttr = style ? ` style="${style}"` : '';

  // Renderizar el spinner con su círculo
  const spinnerHTML = `
    <div class="${classes}"${styleAttr}>
      <div class="ubits-spinner__circle">
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
        <div class="ubits-spinner__segment"></div>
      </div>
      ${label ? `<span class="ubits-spinner__label">${label}</span>` : ''}
    </div>
  `;

  return spinnerHTML.trim();
}

/**
 * Crea un elemento spinner programáticamente
 */
export function createSpinner(options: SpinnerOptions = {}): HTMLDivElement {
  const div = document.createElement('div');
  div.innerHTML = renderSpinner(options);
  return div.querySelector('.ubits-spinner') as HTMLDivElement;
}

