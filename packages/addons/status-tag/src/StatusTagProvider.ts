import type { StatusTagOptions } from './types/StatusTagOptions';

/**
 * Mapeo de estados a colores/tokens UBITS
 */
const STATUS_COLORS: Record<string, {
  bg: string;
  text: string;
  border: string;
}> = {
  // Estados verdes (success) - Valores exactos de Figma
  completed: {
    bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
    text: 'var(--ubits-feedback-success-text, #223b16)',
    border: 'var(--ubits-feedback-success-border, #41c433)'
  },
  published: {
    bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
    text: 'var(--ubits-feedback-success-text, #223b16)',
    border: 'var(--ubits-feedback-success-border, #41c433)'
  },
  fulfilled: {
    bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
    text: 'var(--ubits-feedback-success-text, #223b16)',
    border: 'var(--ubits-feedback-success-border, #41c433)'
  },
  created: {
    bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
    text: 'var(--ubits-feedback-success-text, #223b16)',
    border: 'var(--ubits-feedback-success-border, #41c433)'
  },
  active: {
    bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
    text: 'var(--ubits-feedback-success-text, #223b16)',
    border: 'var(--ubits-feedback-success-border, #41c433)'
  },
  // Estados rojos (error) - Valores exactos de Figma
  'not-fulfilled': {
    bg: 'var(--ubits-feedback-error-bg, #fff0ee)',
    text: 'var(--ubits-feedback-error-text, #65181e)',
    border: 'var(--ubits-feedback-error-border, #fd8a82)'
  },
  denied: {
    bg: 'var(--ubits-feedback-error-bg, #fff0ee)',
    text: 'var(--ubits-feedback-error-text, #65181e)',
    border: 'var(--ubits-feedback-error-border, #fd8a82)'
  },
  // Estados azules (info) - Valores exactos de Figma con gradiente
  draft: {
    bg: 'rgba(12, 91, 239, 0.15)',
    text: 'var(--ubits-feedback-info-text, #212f70)',
    border: 'var(--ubits-accent-brand-static-inverted, #0c5bef)'
  },
  'in-progress': {
    bg: 'rgba(12, 91, 239, 0.15)',
    text: 'var(--ubits-feedback-info-text, #212f70)',
    border: 'var(--ubits-accent-brand-static-inverted, #0c5bef)'
  },
  syncing: {
    bg: 'rgba(12, 91, 239, 0.15)',
    text: 'var(--ubits-feedback-info-text, #212f70)',
    border: 'var(--ubits-accent-brand-static-inverted, #0c5bef)'
  },
  // Estados naranjas/amarillos (warning) - Valores exactos de Figma
  pending: {
    bg: 'var(--ubits-feedback-warning-bg, #fff1e0)',
    text: 'var(--ubits-feedback-warning-text, #4c2e15)',
    border: 'var(--ubits-feedback-warning-border, #ec9907)'
  },
  'pending-approval': {
    bg: 'var(--ubits-feedback-warning-bg, #fff1e0)',
    text: 'var(--ubits-feedback-warning-text, #4c2e15)',
    border: 'var(--ubits-feedback-warning-border, #ec9907)'
  },
  // Estados grises (neutral) - Valores exactos de Figma
  'not-started': {
    bg: 'var(--ubits-bg-2, #f3f3f4)',
    text: 'var(--ubits-fg-1-medium, #2b3543)',
    border: 'var(--ubits-border-1, #a8abb2)'
  },
  finished: {
    bg: 'var(--ubits-bg-2, #f3f3f4)',
    text: 'var(--ubits-fg-1-medium, #2b3543)',
    border: 'var(--ubits-border-1, #a8abb2)'
  },
  archived: {
    bg: 'var(--ubits-bg-2, #f3f3f4)',
    text: 'var(--ubits-fg-1-medium, #2b3543)',
    border: 'var(--ubits-border-1, #a8abb2)'
  },
  disabled: {
    bg: 'var(--ubits-bg-2, #f3f3f4)',
    text: 'var(--ubits-fg-1-medium, #2b3543)',
    border: 'var(--ubits-border-1, #a8abb2)'
  },
  paused: {
    bg: 'var(--ubits-bg-2, #f3f3f4)',
    text: 'var(--ubits-fg-1-medium, #2b3543)',
    border: 'var(--ubits-border-1, #a8abb2)'
  },
  hidden: {
    bg: 'var(--ubits-bg-2, #f3f3f4)',
    text: 'var(--ubits-fg-1-medium, #2b3543)',
    border: 'var(--ubits-border-1, #a8abb2)'
  }
};

/**
 * Renderiza el HTML de un Status Tag
 */
export function renderStatusTag(options: StatusTagOptions = {} as StatusTagOptions): string {
  const {
    label = '',
    size = 'md',
    status = 'pending',
    leftIcon,
    rightIcon = 'chevron-down',
    clickable = false,
    className = ''
  } = options;

  // Obtener colores del estado
  const colors = STATUS_COLORS[status] || STATUS_COLORS.pending;

  // Icono izquierdo: SOLO mostrar si está especificado (NO punto de color por defecto)
  const leftIconHTML = leftIcon 
    ? `<span class="ubits-status-tag-left-icon"><i class="far fa-${leftIcon}"></i></span>`
    : '';

  // Icono derecho: solo mostrar si está especificado
  const rightIconHTML = rightIcon !== null && rightIcon !== undefined
    ? `<span class="ubits-status-tag-right-icon"><i class="far fa-${rightIcon}"></i></span>`
    : '';

  // Construir clases
  const classes = [
    'ubits-status-tag',
    `ubits-status-tag--${size}`,
    clickable ? 'ubits-status-tag--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  // Estilos inline para los colores (usando tokens en CSS, pero como fallback)
  // Para estados azules (draft, in-progress, syncing), usar gradiente
  const isInfoStatus = status === 'draft' || status === 'in-progress' || status === 'syncing';
  const bgStyle = isInfoStatus 
    ? `background: linear-gradient(90deg, rgba(12, 91, 239, 0.15) 0%, rgba(12, 91, 239, 0.15) 100%), linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%); background-color: ${colors.bg};`
    : `background-color: ${colors.bg};`;

  const inlineStyles = `
    ${bgStyle}
    color: ${colors.text};
    border-color: ${colors.border};
  `.trim();

  return `
    <span class="${classes}" style="${inlineStyles}" data-status="${status}">
      ${leftIconHTML}
      <span class="ubits-status-tag-label">${label}</span>
      ${rightIconHTML}
    </span>
  `.trim();
}

/**
 * Crea un elemento Status Tag programáticamente
 */
export function createStatusTag(options: StatusTagOptions = {} as StatusTagOptions): HTMLSpanElement {
  const div = document.createElement('div');
  div.innerHTML = renderStatusTag(options);
  const tag = div.querySelector('.ubits-status-tag') as HTMLSpanElement;
  
  // Agregar event listener si es clickeable
  if (options.clickable && options.onClick) {
    tag.addEventListener('click', options.onClick);
  }
  
  return tag;
}

