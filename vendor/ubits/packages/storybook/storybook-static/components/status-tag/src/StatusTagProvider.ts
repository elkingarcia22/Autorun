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
    bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
    border: 'var(--modifiers-normal-color-light-feedback-border-success)'
  },
  published: {
    bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
    border: 'var(--modifiers-normal-color-light-feedback-border-success)'
  },
  fulfilled: {
    bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
    border: 'var(--modifiers-normal-color-light-feedback-border-success)'
  },
  created: {
    bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
    border: 'var(--modifiers-normal-color-light-feedback-border-success)'
  },
  active: {
    bg: 'var(--modifiers-normal-color-light-feedback-bg-success-subtle-default)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-success-subtle-default)',
    border: 'var(--modifiers-normal-color-light-feedback-border-success)'
  },
  // Estados rojos (error) - Valores exactos de Figma
  'not-fulfilled': {
    bg: 'var(--modifiers-normal-color-light-feedback-bg-error-subtle-default)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-error-subtle-default)',
    border: 'var(--modifiers-normal-color-light-feedback-border-error)'
  },
  denied: {
    bg: 'var(--modifiers-normal-color-light-feedback-bg-error-subtle-default)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-error-subtle-default)',
    border: 'var(--modifiers-normal-color-light-feedback-border-error)'
  },
  // Estados azules (info) - Valores exactos de Figma con gradiente
  draft: {
    bg: 'var(--modifiers-normal-color-light-bg-active)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-info-subtle-default)',
    border: 'var(--modifiers-normal-color-light-accent-brand)'
  },
  'in-progress': {
    bg: 'var(--modifiers-normal-color-light-bg-active)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-info-subtle-default)',
    border: 'var(--modifiers-normal-color-light-accent-brand)'
  },
  syncing: {
    bg: 'var(--modifiers-normal-color-light-bg-active)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-info-subtle-default)',
    border: 'var(--modifiers-normal-color-light-accent-brand)'
  },
  // Estados naranjas/amarillos (warning) - Valores exactos de Figma
  pending: {
    bg: 'var(--modifiers-normal-color-light-feedback-bg-warning-subtle-default)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-warning-subtle-default)',
    border: 'var(--modifiers-normal-color-light-feedback-border-warning)'
  },
  'pending-approval': {
    bg: 'var(--modifiers-normal-color-light-feedback-bg-warning-subtle-default)',
    text: 'var(--modifiers-normal-color-light-feedback-fg-warning-subtle-default)',
    border: 'var(--modifiers-normal-color-light-feedback-border-warning)'
  },
  // Estados grises (neutral) - Valores exactos de Figma
  'not-started': {
    bg: 'var(--modifiers-normal-color-light-bg-2)',
    text: 'var(--modifiers-normal-color-light-fg-1-medium)',
    border: 'var(--modifiers-normal-color-light-border-1)'
  },
  finished: {
    bg: 'var(--modifiers-normal-color-light-bg-2)',
    text: 'var(--modifiers-normal-color-light-fg-1-medium)',
    border: 'var(--modifiers-normal-color-light-border-1)'
  },
  archived: {
    bg: 'var(--modifiers-normal-color-light-bg-2)',
    text: 'var(--modifiers-normal-color-light-fg-1-medium)',
    border: 'var(--modifiers-normal-color-light-border-1)'
  },
  disabled: {
    bg: 'var(--modifiers-normal-color-light-bg-2)',
    text: 'var(--modifiers-normal-color-light-fg-1-medium)',
    border: 'var(--modifiers-normal-color-light-border-1)'
  },
  paused: {
    bg: 'var(--modifiers-normal-color-light-bg-2)',
    text: 'var(--modifiers-normal-color-light-fg-1-medium)',
    border: 'var(--modifiers-normal-color-light-border-1)'
  },
  hidden: {
    bg: 'var(--modifiers-normal-color-light-bg-2)',
    text: 'var(--modifiers-normal-color-light-fg-1-medium)',
    border: 'var(--modifiers-normal-color-light-border-1)'
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

  // Estilos inline para los colores (usando tokens nuevos de Figma)
  // Para estados azules (draft, in-progress, syncing), usar gradiente
  const isInfoStatus = status === 'draft' || status === 'in-progress' || status === 'syncing';
  const bgStyle = isInfoStatus 
    ? `background: linear-gradient(90deg, var(--modifiers-normal-color-light-bg-active) 0%, var(--modifiers-normal-color-light-bg-active) 100%), linear-gradient(90deg, var(--modifiers-normal-color-light-bg-1) 0%, var(--modifiers-normal-color-light-bg-1) 100%); background-color: ${colors.bg};`
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

