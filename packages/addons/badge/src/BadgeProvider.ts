import type { BadgeOptions } from './types/BadgeOptions';

/**
 * Genera el HTML de un badge
 */
export function renderBadge(options: BadgeOptions = {}): string {
  const {
    content,
    size = 'md',
    type,
    variant = 'primary',
    absolute = false,
    position = 'top-right',
    className = '',
    label,
    showLabel = false,
    labelTypography = 'ubits-body-md-regular'
  } = options;

  // Determinar tipo: si type está definido, usarlo; si no, inferir de content
  const badgeType = type || (content !== undefined && content !== null && content !== '' ? 'number' : 'dot');

  // Construir clases
  const classes = [
    'ubits-badge',
    size !== 'md' ? `ubits-badge--${size}` : '',
    badgeType === 'dot' ? 'ubits-badge--dot' : '',
    badgeType === 'number' ? 'ubits-badge--number' : '',
    `ubits-badge--${variant}`, // Siempre agregar la clase de variante
    absolute ? `ubits-badge--absolute` : '',
    absolute && position ? `ubits-badge--absolute-${position}` : '',
    className
  ].filter(Boolean).join(' ');

  // Contenido del badge: solo mostrar si es tipo number
  const badgeContent = badgeType === 'number' && content !== undefined && content !== null 
    ? String(content) 
    : '';

  const badgeHtml = `<span class="${classes}">${badgeContent}</span>`;

  // Si hay label y showLabel está activado, envolver en un contenedor con el label a la derecha
  if (label && showLabel) {
    return `<div class="ubits-badge-wrapper">
      ${badgeHtml}
      <span class="${labelTypography}">${label}</span>
    </div>`;
  }

  return badgeHtml;
}

/**
 * Crea un badge para usar dentro de botones (con clase ubits-button__badge)
 */
export function renderButtonBadge(): string {
  return '<span class="ubits-button__badge"></span>';
}

/**
 * Crea un elemento badge programáticamente
 */
export function createBadge(options: BadgeOptions = {}): HTMLSpanElement {
  const div = document.createElement('div');
  div.innerHTML = renderBadge(options);
  return div.querySelector('.ubits-badge') as HTMLSpanElement;
}
