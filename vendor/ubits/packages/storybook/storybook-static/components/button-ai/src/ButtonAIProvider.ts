/**
 * ButtonAIProvider
 * Lógica de renderizado del componente Button AI
 * Basado en Button de UBITS pero con estilo redondeado y gradación
 */

import { ButtonAIOptions } from './types/ButtonAIOptions';

// Helper para renderizar iconos
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza un botón AI UBITS como HTML string
 */
export function renderButtonAI(options: ButtonAIOptions): string {
  const {
    variant = 'primary',
    size = 'md',
    text = '',
    icon,
    iconStyle = 'regular',
    iconOnly = false,
    disabled = false,
    badge = false,
    active = false,
    className = '',
    attributes = {}
  } = options;

  // Construir clases CSS
  const classes = [
    'ubits-button-ai',
    `ubits-button-ai--${variant}`,
    `ubits-button-ai--${size}`,
    active && 'ubits-button-ai--active',
    iconOnly && 'ubits-button-ai--icon-only',
    badge && 'ubits-button-ai--badge',
    className
  ].filter(Boolean).join(' ');

  // Construir atributos HTML
  const attrs = [
    disabled && 'disabled',
    ...Object.entries(attributes).map(([key, value]) => `${key}="${value}"`)
  ].filter(Boolean).join(' ');

  // Renderizar icono
  let iconHTML = '';
  if (icon) {
    iconHTML = renderIconHelper(icon, iconStyle);
  }

  // Renderizar badge
  const badgeHTML = badge
    ? '<span class="ubits-button-ai__badge"></span>'
    : '';

  // Renderizar contenido
  let contentHTML = '';
  if (iconOnly) {
    // Solo icono
    contentHTML = iconHTML;
  } else if (icon && text) {
    // Icono y texto (icono siempre a la izquierda)
    contentHTML = `${iconHTML}<span>${text}</span>`;
  } else if (text) {
    // Solo texto
    contentHTML = `<span>${text}</span>`;
  } else if (icon) {
    // Solo icono (fallback si no hay texto)
    contentHTML = iconHTML;
  }

  const html = `
    <button class="${classes}" ${attrs}>
      ${contentHTML}
      ${badgeHTML}
    </button>
  `.trim();

  return html;
}

/**
 * Crea e inicializa el componente Button AI en el DOM
 */
export function createButtonAI(options: ButtonAIOptions): HTMLButtonElement | null {
  const div = document.createElement('div');
  div.innerHTML = renderButtonAI(options);
  const button = div.querySelector('button') as HTMLButtonElement;

  if (!button) {
    console.error('ButtonAI: No se pudo crear el botón');
    return null;
  }

  // Agregar event listener si existe
  if (options.onClick) {
    button.addEventListener('click', options.onClick);
  }

  return button;
}

