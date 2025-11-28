/**
 * EmptyStateProvider
 * Lógica de renderizado del componente Empty State
 * Genera HTML para estados vacíos usando tokens UBITS
 */

import type { EmptyStateOptions } from './types/EmptyStateOptions';
import { renderButton } from '../../button/src/ButtonProvider';

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
  
  const primaryButton = (showPrimaryButton && actionLabel)
    ? renderButton({
        variant: 'primary',
        size: 'sm',
        text: actionLabel,
        icon: showPrimaryButtonIcon && primaryButtonIcon ? primaryButtonIcon : undefined,
        className: '',
        attributes: {
          'data-action': 'primary'
        }
      })
    : '';
  
  const secondaryButton = (showSecondaryButton && secondaryActionLabel)
    ? renderButton({
        variant: 'secondary',
        size: 'sm',
        text: secondaryActionLabel,
        icon: showSecondaryButtonIcon && secondaryButtonIcon ? secondaryButtonIcon : undefined,
        className: '',
        attributes: {
          'data-action': 'secondary'
        }
      })
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

