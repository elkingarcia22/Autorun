import type { ParticipantsMenuOptions, Participant, ParticipantStatus } from './types/ParticipantsMenuOptions';
import { renderAvatar } from '../../avatar/src/AvatarProvider';
import type { AvatarOptions } from '../../avatar/src/types/AvatarOptions';

/**
 * Helper para renderizar iconos FontAwesome
 */
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'solid'): string {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Mapeo de estados a colores para status tags
 */
const STATUS_TAG_COLORS: Record<ParticipantStatus, {
  bg: string;
  text: string;
  border: string;
}> = {
  'bajo': {
    bg: 'var(--ubits-feedback-success-bg, #e8f8e4)',
    text: 'var(--ubits-feedback-success-text, #223b16)',
    border: 'var(--ubits-feedback-success-border, #41c433)'
  },
  'medio': {
    bg: 'var(--ubits-feedback-warning-bg, #fff1e0)',
    text: 'var(--ubits-feedback-warning-text, #4c2e15)',
    border: 'var(--ubits-feedback-warning-border, #ec9907)'
  },
  'alto': {
    bg: 'var(--ubits-feedback-error-bg, #fff0ee)',
    text: 'var(--ubits-feedback-error-text, #65181e)',
    border: 'var(--ubits-feedback-error-border, #fd8a82)'
  },
  'muy-alto': {
    bg: 'var(--ubits-feedback-error-bg, #fff0ee)',
    text: 'var(--ubits-feedback-error-text, #65181e)',
    border: 'var(--ubits-feedback-error-border, #fd8a82)'
  }
};

/**
 * Mapeo de estados a texto legible
 */
const STATUS_LABELS: Record<ParticipantStatus, string> = {
  'bajo': 'Bajo',
  'medio': 'Medio',
  'alto': 'Alto',
  'muy-alto': 'Muy alto'
};

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text: string): string {
  if (typeof text !== 'string') {
    return '';
  }
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Renderiza un status tag
 */
function renderStatusTag(status: ParticipantStatus): string {
  const colors = STATUS_TAG_COLORS[status];
  const label = STATUS_LABELS[status];
  
  return `
    <span class="ubits-participants-menu__status-tag" style="
      background-color: ${colors.bg};
      color: ${colors.text};
      border: 1px solid ${colors.border};
      padding: 4px 8px;
      border-radius: var(--ubits-border-radius-sm, 4px);
      font-size: var(--font-body-xs-size, 11px);
      font-weight: var(--weight-medium, 500);
      line-height: var(--font-body-xs-line, 16.5px);
      white-space: nowrap;
    ">
      ${escapeHtml(label)}
    </span>
  `.trim();
}

/**
 * Renderiza un avatar usando el componente Avatar de UBITS
 */
function renderParticipantAvatar(participant: Participant): string {
  const avatarOptions: AvatarOptions = {
    size: 'lg', // 40px para el menú de participantes
    alt: participant.name,
    className: 'ubits-participants-menu__avatar'
  };

  // Si tiene imagen, usar variante photo
  if (participant.avatarImage) {
    avatarOptions.imageUrl = participant.avatarImage;
  } else {
    // Si no tiene imagen, usar iniciales
    avatarOptions.initials = participant.name;
  }

  return renderAvatar(avatarOptions);
}

/**
 * Renderiza un participante individual
 */
function renderParticipant(participant: Participant, isSelected: boolean): string {
  const itemClasses = [
    'ubits-participants-menu__item',
    isSelected ? 'ubits-participants-menu__item--selected' : ''
  ].filter(Boolean).join(' ');
  
  const nameColor = isSelected 
    ? 'var(--ubits-accent-brand-static, #0c5bef)' 
    : 'var(--ubits-fg-1-high, #303a47)';
  
  const statusTag = participant.status ? renderStatusTag(participant.status) : '';
  
  return `
    <div class="${itemClasses}" data-participant-id="${escapeHtml(participant.id)}" style="
      display: flex;
      align-items: center;
      gap: var(--ubits-spacing-sm, 8px);
      padding: var(--ubits-spacing-sm, 8px) var(--ubits-spacing-md, 16px);
      border-radius: var(--ubits-border-radius-md, 6px);
      cursor: pointer;
      transition: background-color 0.2s ease;
      ${isSelected ? 'background-color: var(--ubits-bg-active-button, rgba(12, 91, 239, 0.15));' : ''}
    ">
      ${renderParticipantAvatar(participant)}
      <div class="ubits-participants-menu__item-content" style="
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      ">
        <div class="ubits-participants-menu__item-name ubits-body-md-semibold" style="
          color: ${nameColor};
          font-size: var(--font-body-md-size, 16px);
          font-weight: var(--weight-semibold, 600);
          line-height: var(--font-body-md-line, 24px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        ">
          ${escapeHtml(participant.name)}
        </div>
        <div class="ubits-participants-menu__item-role ubits-body-sm-regular" style="
          color: var(--ubits-fg-1-medium, #5c646f);
          font-size: var(--font-body-sm-size, 13px);
          font-weight: var(--weight-regular, 400);
          line-height: var(--font-body-sm-line, 19.5px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        ">
          ${escapeHtml(participant.role)}
        </div>
      </div>
      ${statusTag ? `<div style="flex-shrink: 0;">${statusTag}</div>` : ''}
    </div>
  `.trim();
}

/**
 * Renderiza el HTML del menú de participantes
 */
export function renderParticipantsMenu(options: ParticipantsMenuOptions): string {
  const {
    title = 'Participantes',
    searchPlaceholder = 'Buscar participan...',
    participants = [],
    selectedParticipantId,
    className = ''
  } = options;

  const classes = [
    'ubits-participants-menu',
    className
  ].filter(Boolean).join(' ');

  const participantsHtml = participants.map(participant => {
    const isSelected = participant.selected || participant.id === selectedParticipantId;
    return renderParticipant(participant, isSelected);
  }).join('');

  return `
    <div class="${classes}">
      <div class="ubits-participants-menu__header">
        <h2 class="ubits-participants-menu__title ubits-heading-h2" style="
          margin: 0;
          font-size: var(--font-heading-h2-size, 24px);
          font-weight: var(--weight-bold, 700);
          line-height: var(--font-heading-h2-line, 32px);
          color: var(--ubits-fg-1-high, #303a47);
          margin-bottom: var(--ubits-spacing-md, 16px);
        ">
          ${escapeHtml(title)}
        </h2>
        <div class="ubits-participants-menu__search-container" style="
          display: flex;
          gap: var(--ubits-spacing-sm, 8px);
          margin-bottom: var(--ubits-spacing-md, 16px);
        ">
          <div class="ubits-participants-menu__search-input-wrapper" style="
            flex: 1;
            position: relative;
          ">
            <i class="fas fa-search" style="
              position: absolute;
              left: 12px;
              top: 50%;
              transform: translateY(-50%);
              color: var(--ubits-fg-1-medium, #5c646f);
              font-size: 16px;
              z-index: 1;
              pointer-events: none;
            "></i>
            <input 
              type="text" 
              class="ubits-participants-menu__search-input ubits-input" 
              placeholder="${escapeHtml(searchPlaceholder)}"
              style="
                width: 100%;
                padding: 12px 12px 12px 40px;
                border: 1px solid var(--ubits-border-1, #dbdde0);
                border-radius: var(--ubits-border-radius-md, 6px);
                background-color: var(--ubits-bg-1, #ffffff);
                color: var(--ubits-fg-1-high, #303a47);
                font-size: var(--font-body-md-size, 16px);
                font-family: var(--font-sans, 'Noto Sans', system-ui, sans-serif);
                transition: border-color 0.2s ease;
              "
              data-search-input="true"
            />
          </div>
          <button 
            class="ubits-participants-menu__filter-button ubits-button ubits-button--secondary ubits-button--icon-only" 
            type="button"
            style="
              width: 40px;
              height: 40px;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: var(--ubits-border-radius-md, 6px);
            "
            data-filter-button="true"
          >
            <i class="fas fa-filter" style="font-size: 16px;"></i>
          </button>
        </div>
      </div>
      <div class="ubits-participants-menu__list" style="
        display: flex;
        flex-direction: column;
        gap: 2px;
        overflow-y: auto;
        flex: 1;
      ">
        ${participantsHtml}
      </div>
    </div>
  `.trim();
}

/**
 * Crea un elemento DOM del menú de participantes y lo inserta en el contenedor
 */
export function createParticipantsMenu(options: ParticipantsMenuOptions): {
  element: HTMLElement;
  update: (newOptions: Partial<ParticipantsMenuOptions>) => void;
  destroy: () => void;
} {
  const {
    containerId,
    onParticipantSelect,
    onSearchChange,
    onFilterClick,
    ...restOptions
  } = options;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderParticipantsMenu(restOptions);
  const menuElement = wrapper.firstElementChild as HTMLElement;

  if (!menuElement) {
    throw new Error('No se pudo crear el menú de participantes');
  }

  let container: HTMLElement;
  if (containerId) {
    container = document.getElementById(containerId) || document.body;
  } else {
    container = document.body;
  }

  container.appendChild(menuElement);

  // Agregar event listeners
  const searchInput = menuElement.querySelector('[data-search-input="true"]') as HTMLInputElement;
  if (searchInput && onSearchChange) {
    searchInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      onSearchChange(target.value);
    });
  }

  const filterButton = menuElement.querySelector('[data-filter-button="true"]') as HTMLButtonElement;
  if (filterButton && onFilterClick) {
    filterButton.addEventListener('click', () => {
      onFilterClick();
    });
  }

  const participantItems = menuElement.querySelectorAll('[data-participant-id]');
  participantItems.forEach(item => {
    item.addEventListener('click', () => {
      const participantId = item.getAttribute('data-participant-id');
      if (participantId && onParticipantSelect) {
        onParticipantSelect(participantId);
      }
    });
  });

  /**
   * Actualiza el menú con nuevas opciones
   */
  const update = (newOptions: Partial<ParticipantsMenuOptions>) => {
    const updatedOptions = { ...restOptions, ...newOptions };
    const newHtml = renderParticipantsMenu(updatedOptions);
    const newWrapper = document.createElement('div');
    newWrapper.innerHTML = newHtml;
    const newElement = newWrapper.firstElementChild as HTMLElement;
    
    if (newElement && menuElement.parentNode) {
      menuElement.parentNode.replaceChild(newElement, menuElement);
      Object.assign(menuElement, newElement);
    }
  };

  /**
   * Destruye el menú removiéndolo del DOM
   */
  const destroy = () => {
    if (menuElement.parentNode) {
      menuElement.parentNode.removeChild(menuElement);
    }
  };

  return {
    element: menuElement,
    update,
    destroy
  };
}

