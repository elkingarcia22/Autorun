/**
 * CardContentProvider
 * Lógica de renderizado del componente Card Content
 * Genera HTML según las opciones proporcionadas
 */

import type { CardData, CardContentOptions } from './types/CardContentOptions';
import { LEVELS, STATUSES } from './configs/cardConfigs';

// Helper para renderizar iconos - compatible con Storybook
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza una course-card individual como HTML string
 */
export function renderCardContent(cardData: CardData): string {
  // Determinar estado y texto
  const statusConfig = STATUSES[cardData.status];
  const statusClass = statusConfig.class;
  const statusText = statusConfig.text;

  // Determinar icono según el nivel
  const levelIcon = LEVELS[cardData.level] || LEVELS['Intermedio'];

  // Template de la card
  return `
    <div class="course-card" data-progress="${cardData.progress}" data-status="${cardData.status}">
      <div class="course-thumbnail-wrapper">
        <div class="course-thumbnail">
          <img src="${cardData.image}" alt="${cardData.title}" class="course-image">
        </div>
        <div class="course-progress-overlay">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${cardData.progress}%"></div>
          </div>
        </div>
      </div>
      <div class="course-content">
        <div class="course-header">
          <div class="course-type-status">
            <span class="course-type ubits-body-sm-regular">${cardData.type}</span>
            ${statusText ? `<span class="course-status ${statusClass} ubits-body-sm-bold">${statusText}</span>` : ''}
          </div>
        </div>
        <h3 class="course-title ubits-body-sm-bold">${cardData.title}</h3>
        <div class="course-provider">
          <div class="provider-avatar">
            <img src="${cardData.providerLogo}" alt="${cardData.provider}" class="provider-icon">
          </div>
          <span class="provider-name ubits-body-sm-regular">${cardData.provider}</span>
        </div>
        <div class="course-competency">
          <div class="spec-icon">
            ${renderIconHelper('fa-tag', 'regular')}
          </div>
          <span class="ubits-body-sm-regular">${cardData.competency}</span>
        </div>
        <div class="course-specs">
          <div class="spec-item">
            <div class="spec-icon">
              ${renderIconHelper(levelIcon.replace('far ', '').replace('fas ', ''), levelIcon.startsWith('far') ? 'regular' : 'solid')}
            </div>
            <span class="ubits-body-sm-regular">${cardData.level}</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon">
              ${renderIconHelper('fa-clock', 'regular')}
            </div>
            <span class="ubits-body-sm-regular">${cardData.duration}</span>
          </div>
          <div class="spec-item">
            <div class="spec-icon">
              ${renderIconHelper('fa-globe', 'regular')}
            </div>
            <span class="ubits-body-sm-regular">${cardData.language}</span>
          </div>
        </div>
      </div>
    </div>
  `.trim();
}

/**
 * Carga múltiples course-cards en un contenedor
 */
export function loadCardContent(options: CardContentOptions): void {
  const { containerId, container, cards, onClick } = options;

  // Obtener contenedor
  let targetContainer: HTMLElement | null = null;
  if (container) {
    targetContainer = container;
  } else if (containerId) {
    targetContainer = document.getElementById(containerId);
  }

  if (!targetContainer) {
    console.error(`Container not found: ${containerId || 'container element'}`);
    return;
  }

  // Limpiar contenedor
  targetContainer.innerHTML = '';

  // Renderizar cada card
  cards.forEach((cardData, index) => {
    const cardHTML = renderCardContent(cardData);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardHTML;
    const cardElement = tempDiv.firstElementChild as HTMLElement;

    if (!cardElement) {
      console.error('Failed to create card element');
      return;
    }

    // Agregar event listener si se proporciona onClick
    if (onClick) {
      cardElement.addEventListener('click', () => {
        onClick(cardData, index, cardElement);
      });
    }

    // Agregar al contenedor
    targetContainer!.appendChild(cardElement);
  });
}

/**
 * Crea un elemento card programáticamente
 */
export function createCard(cardData: CardData): HTMLElement {
  const cardHTML = renderCardContent(cardData);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = cardHTML;
  const cardElement = tempDiv.firstElementChild as HTMLElement;

  if (!cardElement) {
    throw new Error('Failed to create card element');
  }

  return cardElement;
}

