/**
 * EmptyStateProvider
 * Lógica de renderizado del componente Empty State
 * Genera HTML para estados vacíos usando tokens UBITS
 */

import type { EmptyStateOptions } from './types/EmptyStateOptions';

/**
 * Renderiza un empty state como HTML string
 */
export function renderEmptyState(options: EmptyStateOptions): string {
  const {
    title,
    description,
    imageUrl,
    icon,
    iconSize = 'lg',
    actionLabel,
    onAction,
    showPrimaryButton = false,
    primaryButtonIcon,
    showPrimaryButtonIcon = false,
    secondaryActionLabel,
    onSecondaryAction,
    showSecondaryButton = false,
    secondaryButtonIcon,
    showSecondaryButtonIcon = false,
    className = '',
    style = ''
  } = options;

  // Construir clases base (solo default)
  const classes = [
    'ubits-empty-state',
    'ubits-empty-state--default',
    className
  ].filter(Boolean).join(' ');

  const styleAttr = style ? ` style="${style}"` : '';

  // Renderizar imagen o icono
  let visualElement = '';
  if (imageUrl) {
    visualElement = `
      <div class="ubits-empty-state__image">
        <img src="${imageUrl}" alt="${title}" />
      </div>
    `;
  } else if (icon) {
    visualElement = `
      <div class="ubits-empty-state__icon">
        <i class="far fa-${icon}"></i>
      </div>
    `;
  }

  // Renderizar botones de acción
  let actionsHTML = '';
  let primaryButtonContent = actionLabel || '';
  if (showPrimaryButtonIcon && primaryButtonIcon) {
    primaryButtonContent = `<i class="far fa-${primaryButtonIcon}"></i> ${primaryButtonContent}`;
  }
  
  let secondaryButtonContent = secondaryActionLabel || '';
  if (showSecondaryButtonIcon && secondaryButtonIcon) {
    secondaryButtonContent = `<i class="far fa-${secondaryButtonIcon}"></i> ${secondaryButtonContent}`;
  }
  
  const primaryButton = (showPrimaryButton && actionLabel)
    ? `<button class="ubits-button ubits-button--primary ubits-button--sm" data-action="primary" type="button">${primaryButtonContent}</button>`
    : '';
  
  const secondaryButton = (showSecondaryButton && secondaryActionLabel)
    ? `<button class="ubits-button ubits-button--secondary ubits-button--sm" data-action="secondary" type="button">${secondaryButtonContent}</button>`
    : '';

  if (primaryButton || secondaryButton) {
    actionsHTML = `
      <div class="ubits-empty-state__actions">
        ${secondaryButton}
        ${primaryButton}
      </div>
    `;
  }

  // Construir el HTML completo
  const emptyStateHTML = `
    <div class="${classes}"${styleAttr}>
      ${visualElement}
      <div class="ubits-empty-state__content">
        <h3 class="ubits-empty-state__title">${title}</h3>
        ${description ? `<p class="ubits-empty-state__description">${description}</p>` : ''}
      </div>
      ${actionsHTML}
    </div>
  `;

  return emptyStateHTML.trim();
}

/**
 * Crea un elemento empty state programáticamente
 */
export function createEmptyState(options: EmptyStateOptions): HTMLDivElement {
  const div = document.createElement('div');
  div.innerHTML = renderEmptyState(options);
  
  // Adjuntar event listeners si existen
  const emptyState = div.querySelector('.ubits-empty-state') as HTMLDivElement;
  if (options.onAction) {
    const actionButton = emptyState.querySelector('[data-action="primary"]');
    if (actionButton) {
      actionButton.addEventListener('click', options.onAction);
    }
  }
  if (options.onSecondaryAction) {
    const secondaryButton = emptyState.querySelector('[data-action="secondary"]');
    if (secondaryButton) {
      secondaryButton.addEventListener('click', options.onSecondaryAction);
    }
  }
  
  return emptyState;
}

