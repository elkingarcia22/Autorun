import type { ParticipantsMenuOptions, Participant, ParticipantStatus } from './types/ParticipantsMenuOptions';
import { renderAvatar } from '../../avatar/src/AvatarProvider';
import type { AvatarOptions } from '../../avatar/src/types/AvatarOptions';
import { renderInput, createInput } from '../../input/src/InputProvider';
import type { InputOptions } from '../../input/src/types/InputOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import type { ButtonOptions } from '../../button/src/types/ButtonOptions';
import { createScrollbar } from '../../scroll/src/ScrollProvider';
import { renderStatusTag } from '../../status-tag/src/StatusTagProvider';
import type { StatusTagOptions } from '../../status-tag/src/types/StatusTagOptions';
import { createDrawer } from '../../drawer/src/DrawerProvider';
import { renderCheckbox } from '../../checkbox/src/CheckboxProvider';
import { renderEmptyState } from '../../empty-state/src/EmptyStateProvider';

/**
 * Helper para renderizar iconos FontAwesome
 */
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'solid'): string {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Mapeo de estados de participante a estados del StatusTag de UBITS
 */
const STATUS_TAG_MAPPING: Record<ParticipantStatus, {
  status: StatusTagOptions['status'];
  label: string;
}> = {
  'bajo': {
    status: 'completed', // Verde
    label: 'Bajo'
  },
  'medio': {
    status: 'pending', // Naranja/Amarillo
    label: 'Medio'
  },
  'alto': {
    status: 'not-fulfilled', // Rojo
    label: 'Alto'
  },
  'muy-alto': {
    status: 'denied', // Rojo
    label: 'Muy alto'
  }
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
 * Renderiza un status tag usando el componente StatusTag de UBITS
 */
function renderParticipantStatusTag(status: ParticipantStatus): string {
  const mapping = STATUS_TAG_MAPPING[status];
  const statusTagOptions: StatusTagOptions = {
    label: mapping.label,
    size: 'xs',
    status: mapping.status,
    rightIcon: null, // Sin icono derecho
    className: 'ubits-participants-menu__status-tag'
  };
  
  return renderStatusTag(statusTagOptions);
}

/**
 * Renderiza un avatar usando el componente Avatar de UBITS
 */
function renderParticipantAvatar(participant: Participant): string {
  const avatarOptions: AvatarOptions = {
    size: 'sm', // 28px para el menú de participantes
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
function renderParticipant(
  participant: Participant, 
  isSelected: boolean,
  showAvatar: boolean = true,
  showRole: boolean = true,
  showStatusTag: boolean = true
): string {
  const itemClasses = [
    'ubits-participants-menu__item',
    isSelected ? 'ubits-participants-menu__item--selected' : ''
  ].filter(Boolean).join(' ');
  
  const nameColor = isSelected 
    ? 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static, #0c5bef))' 
    : 'var(--ubits-fg-1-high, #303a47)';
  
  const statusTag = (showStatusTag && participant.status) ? renderParticipantStatusTag(participant.status) : '';
  const avatar = showAvatar ? renderParticipantAvatar(participant) : '';
  
  return `
    <div class="${itemClasses}" data-participant-id="${escapeHtml(participant.id)}" style="
      display: flex;
      align-items: center;
      gap: var(--ubits-spacing-sm, 8px);
      padding: 8px 12px;
      max-height: 46px;
      min-height: 46px;
      box-sizing: border-box;
      border-radius: var(--ubits-border-radius-md, 6px);
      cursor: pointer;
      transition: background-color 0.2s ease;
      ${isSelected ? 'background-color: var(--ubits-bg-active-button, rgba(12, 91, 239, 0.15));' : ''}
    ">
      ${avatar}
      <div class="ubits-participants-menu__item-content" style="
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0px;
        justify-content: center;
      ">
        <div class="ubits-participants-menu__item-name ubits-body-sm-bold" style="
          color: ${nameColor};
          font-size: var(--font-body-sm-size, 13px);
          font-weight: var(--weight-bold, 700);
          line-height: var(--font-body-sm-line, 19.5px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
        ">
          ${escapeHtml(participant.name)}
        </div>
        ${showRole ? `
        <div class="ubits-participants-menu__item-role ubits-body-sm-regular" style="
          color: var(--ubits-fg-1-medium, #5c646f);
          font-size: var(--font-body-sm-size, 13px);
          font-weight: var(--weight-regular, 400);
          line-height: var(--font-body-sm-line, 19.5px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          padding: 0;
          margin-top: -2px;
        ">
          ${escapeHtml(participant.role)}
        </div>
        ` : ''}
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
    className = '',
    showAvatar = true,
    showRole = true,
    showStatusTag = true,
    enableScrollbar = true
  } = options;

  const classes = [
    'ubits-participants-menu',
    className
  ].filter(Boolean).join(' ');

  // Si el scrollbar está desactivado, limitar participantes para evitar scroll
  // Cada item tiene ~46px de altura + 2px de gap = ~48px por item
  // Limitamos a aproximadamente 6-7 items que caben sin scroll
  const maxItemsWithoutScroll = 6;
  const participantsToShow = enableScrollbar 
    ? participants 
    : participants.slice(0, maxItemsWithoutScroll);

  const participantsHtml = participantsToShow.map(participant => {
    // Solo usar selectedParticipantId para determinar selección, ignorar participant.selected
    // para evitar que quede pegado el primer item
    const isSelected = participant.id === selectedParticipantId;
    return renderParticipant(participant, isSelected, showAvatar, showRole, showStatusTag);
  }).join('');

  // Usar componente Input de UBITS para la búsqueda
  // renderInput necesita un containerId, pero lo inicializaremos en createParticipantsMenu
  // Si no se proporciona un searchInputId, usar el containerId o generar uno
  const searchInputId = (options as any).searchInputId || 
    (options.containerId ? `participants-menu-search-${options.containerId}` : `participants-menu-search-${Date.now()}`);
  const searchInputPlaceholder = searchPlaceholder;

  // Calcular cantidad de filtros activos
  const activeFilters = (options as any).activeFilters || { roles: [], statuses: [] };
  const activeFiltersCount = (activeFilters.roles?.length || 0) + (activeFilters.statuses?.length || 0);
  
  // Usar componente Button de UBITS para el filtro con badge solo si hay filtros activos
  const filterButtonOptions: ButtonOptions = {
    variant: 'secondary',
    size: 'md',
    icon: 'filter',
    iconStyle: 'regular',
    iconOnly: true,
    active: activeFiltersCount > 0,
    badge: activeFiltersCount > 0, // Solo mostrar badge si hay filtros activos
    className: 'ubits-participants-menu__filter-button'
  };
  let filterButtonHtml = renderButton(filterButtonOptions);
  
  // Reemplazar el badge genérico con uno que muestre el número si hay filtros activos
  if (activeFiltersCount > 0) {
    const badgeHTML = `<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${activeFiltersCount}</span>`;
    filterButtonHtml = filterButtonHtml.replace(
      '<span class="ubits-button__badge"></span>', 
      badgeHTML
    );
  } else {
    // Si no hay filtros activos, eliminar completamente el badge del HTML inicial
    filterButtonHtml = filterButtonHtml.replace(
      /<span class="ubits-button__badge"><\/span>/g, 
      ''
    );
  }
  
  // Detectar si debemos mostrar empty state
  const hasNoResults = participantsToShow.length === 0;
  const hasSearchTerm = (options as any).searchTerm && (options as any).searchTerm.trim() !== '';
  const hasActiveFilters = activeFiltersCount > 0;
  
  let emptyStateHTML = '';
  if (hasNoResults) {
    let emptyStateConfig;
    if (hasSearchTerm) {
      emptyStateConfig = {
        title: 'No se encontraron resultados',
        description: 'Intenta con otros términos de búsqueda',
        icon: 'search'
      };
    } else if (hasActiveFilters) {
      emptyStateConfig = {
        title: 'No hay resultados',
        description: 'No se encontraron participantes con los filtros aplicados',
        icon: 'filter'
      };
    } else {
      emptyStateConfig = {
        title: 'No hay participantes',
        description: 'No hay participantes para mostrar',
        icon: 'users'
      };
    }
    
    if (emptyStateConfig) {
      emptyStateHTML = renderEmptyState({
        title: escapeHtml(emptyStateConfig.title),
        description: emptyStateConfig.description ? escapeHtml(emptyStateConfig.description) : undefined,
        icon: emptyStateConfig.icon
      });
    }
  }

  return `
    <div class="${classes}">
      <div class="ubits-participants-menu__header">
        <h2 class="ubits-participants-menu__title ubits-body-md-bold" style="
          margin: 0;
          font-size: var(--font-body-md-size, 15px);
          font-weight: var(--weight-bold, 700);
          line-height: var(--font-body-md-line, 22.5px);
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
          ">
            <div id="${searchInputId}" data-search-placeholder="${escapeHtml(searchInputPlaceholder)}"></div>
          </div>
          <div class="ubits-participants-menu__filter-button-wrapper">
            ${filterButtonHtml}
          </div>
        </div>
      </div>
      <div class="ubits-participants-menu__list-wrapper" style="
        display: flex;
        flex: 1;
        min-height: 0;
        position: relative;
      ">
        <div 
          class="ubits-participants-menu__list" 
          id="participants-menu-list-${Date.now()}"
          data-scrollable="true"
          ${enableScrollbar ? 'data-ubits-scrollbar="true"' : ''}
          style="
            display: flex;
            flex-direction: column;
            gap: 2px;
            ${enableScrollbar ? 'overflow-y: auto;' : 'overflow-y: hidden;'}
            flex: 1;
            min-height: 0;
          "
        >
          ${hasNoResults ? emptyStateHTML : participantsHtml}
        </div>
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
  updateParticipantsList: (participants: Participant[], selectedParticipantId?: string) => void;
  destroy: () => void;
} {
  
  const {
    containerId,
    onParticipantSelect,
    onSearchChange,
    onFilterClick,
    onFilterChange,
    ...restOptions
  } = options;

  // Estado de filtros
  let activeFilters: { roles: string[]; statuses: ParticipantStatus[] } = {
    roles: [],
    statuses: []
  };
  
  // Estado del término de búsqueda
  let currentSearchTerm = '';

  // Obtener roles y estados únicos de los participantes
  const allRoles = Array.from(new Set(restOptions.participants.map(p => p.role))).sort();
  const allStatuses: ParticipantStatus[] = ['bajo', 'medio', 'alto', 'muy-alto'];

  // Generar un ID único para el input de búsqueda basado en containerId para mantener consistencia
  const searchInputId = containerId 
    ? `participants-menu-search-${containerId}` 
    : `participants-menu-search-${Date.now()}`;

  // Función para renderizar el menú con los filtros y búsqueda actuales
  const renderMenu = () => {
    return renderParticipantsMenu({ 
      ...restOptions, 
      searchInputId,
      activeFilters,
      searchTerm: currentSearchTerm
    } as any);
  };

  const wrapper = document.createElement('div');
  // Pasar el searchInputId, activeFilters y searchTerm a renderParticipantsMenu
  const menuHtml = renderMenu();
  wrapper.innerHTML = menuHtml;
  const menuElement = wrapper.firstElementChild as HTMLElement;

  if (!menuElement) {
    console.error('❌ [ParticipantsMenu] No se pudo crear el elemento del menú');
    throw new Error('No se pudo crear el menú de participantes');
  }

  // Función para insertar el menú en el contenedor
  const insertMenu = () => {
    let container: HTMLElement | null = null;
    if (containerId) {
      container = document.getElementById(containerId);
      
      if (!container) {
        console.error('❌ [ParticipantsMenu] No se encontró el contenedor con ID:', containerId);
        // Buscar en todo el documento
        const allElements = document.querySelectorAll(`[id="${containerId}"]`);
        
        if (allElements.length > 0) {
          container = allElements[0] as HTMLElement;
        } else {
          console.error('❌ [ParticipantsMenu] No se encontró ningún elemento con ese ID');
          container = document.body;
        }
      }
    } else {
      container = document.body;
    }

    if (!container) {
      console.error('❌ [ParticipantsMenu] No se pudo obtener un contenedor válido');
      return;
    }

    container.appendChild(menuElement);

    // Inicializar componente Input de UBITS para la búsqueda después de insertar el menú
    initializeInput();
    
    // Inicializar badge del botón de filtro
    updateFilterBadge();

    // Función para generar el contenido del drawer de filtros
    const renderFiltersContent = (): string => {
      const rolesHTML = allRoles.map((role, index) => {
        const containerId = `filter-role-${index}`;
        return `
          <div class="ubits-participants-menu__filter-item" data-filter-role="${role}">
            <div id="${containerId}"></div>
          </div>
        `;
      }).join('');

      const statusesHTML = allStatuses.map((status, index) => {
        const containerId = `filter-status-${index}`;
        return `
          <div class="ubits-participants-menu__filter-item" data-filter-status="${status}">
            <div id="${containerId}"></div>
          </div>
        `;
      }).join('');

      return `
        <div class="ubits-participants-menu__filters-container" style="padding: var(--ubits-spacing-lg, 24px);">
          <div style="margin-bottom: var(--ubits-spacing-lg, 24px);">
            <h3 style="
              font-size: var(--font-body-md-size, 15px);
              font-weight: var(--weight-bold, 700);
              color: var(--ubits-fg-1-high, #303a47);
              margin: 0 0 var(--ubits-spacing-md, 16px) 0;
            ">Rol</h3>
            <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-sm, 8px);">
              ${rolesHTML}
            </div>
          </div>
          <div style="margin-bottom: var(--ubits-spacing-lg, 24px);">
            <h3 style="
              font-size: var(--font-body-md-size, 15px);
              font-weight: var(--weight-bold, 700);
              color: var(--ubits-fg-1-high, #303a47);
              margin: 0 0 var(--ubits-spacing-md, 16px) 0;
            ">Estado</h3>
            <div style="display: flex; flex-direction: column; gap: var(--ubits-spacing-sm, 8px);">
              ${statusesHTML}
            </div>
          </div>
        </div>
      `;
    };

    // Crear instancia del drawer (inicialmente cerrado)
    let drawerInstance: ReturnType<typeof createDrawer> | null = null;
    let checkboxInstances: Array<ReturnType<typeof createCheckbox>> = [];

    // Función para abrir el drawer de filtros
    const openFilterDrawer = () => {
      if (!drawerInstance) {
        try {
          drawerInstance = createDrawer({
            title: 'Filtros',
            complementaryText: 'Selecciona los filtros que deseas aplicar',
            width: 40,
            bodyContent: renderFiltersContent,
            footerButtons: {
              secondary: {
                label: 'Limpiar',
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  activeFilters = { roles: [], statuses: [] };
                  
                  // Actualizar badge
                  updateFilterBadge();
                  
                  if (onFilterChange) {
                    onFilterChange(activeFilters);
                  }
                  // Actualizar checkboxes
                  if (drawerInstance) {
                    drawerInstance.updateContent(renderFiltersContent);
                    setTimeout(() => {
                      createFilterCheckboxes();
                    }, 100);
                  }
                }
              },
              primary: {
                label: 'Aplicar',
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  // Recopilar valores de los filtros desde los checkboxes
                  const newFilters: { roles: string[]; statuses: ParticipantStatus[] } = {
                    roles: [],
                    statuses: []
                  };
                  
                  if (drawerInstance) {
                    // Recopilar roles seleccionados
                    allRoles.forEach((role, index) => {
                      const filterItem = drawerInstance.element.querySelector(`[data-filter-role="${role}"]`);
                      if (filterItem) {
                        const checkbox = filterItem.querySelector('.ubits-checkbox__input') as HTMLInputElement;
                        if (checkbox && checkbox.checked) {
                          newFilters.roles.push(role);
                        }
                      }
                    });
                    
                    // Recopilar estados seleccionados
                    allStatuses.forEach((status, index) => {
                      const filterItem = drawerInstance.element.querySelector(`[data-filter-status="${status}"]`);
                      if (filterItem) {
                        const checkbox = filterItem.querySelector('.ubits-checkbox__input') as HTMLInputElement;
                        if (checkbox && checkbox.checked) {
                          newFilters.statuses.push(status);
                        }
                      }
                    });
                  }
                  
                  // Actualizar filtros activos
                  activeFilters = newFilters;
                  
                  // Actualizar badge
                  updateFilterBadge();
                  
                  // Llamar callback si existe
                  if (onFilterChange) {
                    onFilterChange(activeFilters);
                  }
                  
                  // Cerrar el drawer
                  if (drawerInstance) {
                    drawerInstance.close();
                  }
                }
              }
            },
            closeOnOverlayClick: true,
            onClose: () => {
              // Limpiar instancias de checkboxes
              checkboxInstances.forEach(instance => {
                try {
                  instance.destroy();
                } catch (e) {
                  // Ignorar errores al destruir
                }
              });
              checkboxInstances = [];
            }
          });
        } catch (error) {
          console.error('❌ [ParticipantsMenu] Error al crear drawer:', error);
          if (onFilterClick) {
            onFilterClick();
          }
          return;
        }
      } else {
        // Actualizar el contenido del drawer
        try {
          drawerInstance.updateContent(renderFiltersContent);
        } catch (error) {
          console.error('❌ [ParticipantsMenu] Error al actualizar drawer:', error);
          // Si hay error, recrear el drawer
          if (drawerInstance) {
            drawerInstance.element.remove();
            drawerInstance = null;
            openFilterDrawer();
            return;
          }
        }
      }
      
      // Abrir el drawer solo si existe
      if (drawerInstance) {
        drawerInstance.open();
        
        // Crear los checkboxes después de abrir el drawer
        setTimeout(() => {
          createFilterCheckboxes();
        }, 300);
      }
    };

    // Función para crear los checkboxes de filtros
    const createFilterCheckboxes = () => {
      if (!drawerInstance) return;
      
      // Limpiar instancias anteriores
      checkboxInstances.forEach(instance => {
        try {
          instance.destroy();
        } catch (e) {
          // Ignorar errores
        }
      });
      checkboxInstances = [];
      
      // Crear checkboxes de roles
      allRoles.forEach((role, index) => {
        const containerId = `filter-role-${index}`;
        const inputContainer = drawerInstance.element.querySelector(`#${containerId}`) as HTMLElement;
        if (inputContainer) {
          inputContainer.innerHTML = '';
          const isChecked = activeFilters.roles.includes(role);
          
          // Crear checkbox directamente en el contenedor usando renderCheckbox
          const checkboxHTML = renderCheckbox({
            label: role,
            name: 'filter-role',
            value: role,
            checked: isChecked,
            size: 'md'
          });
          
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = checkboxHTML.trim();
          const checkboxElement = tempDiv.firstElementChild as HTMLLabelElement;
          
          if (checkboxElement) {
            inputContainer.appendChild(checkboxElement);
            
            // Agregar event listener para actualizar el estado visual
            const inputElement = checkboxElement.querySelector('.ubits-checkbox__input') as HTMLInputElement;
            const squareElement = checkboxElement.querySelector('.ubits-checkbox__square') as HTMLElement;
            
            if (inputElement && squareElement) {
              inputElement.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                const isChecked = target.checked;
                
                // Actualizar clase checked
                checkboxElement.classList.toggle('ubits-checkbox--checked', isChecked);
                
                // Actualizar el checkmark visual
                let checkmarkElement = squareElement.querySelector('.ubits-checkbox__checkmark') as HTMLElement;
                
                if (isChecked) {
                  // Si no existe el checkmark, crearlo
                  if (!checkmarkElement) {
                    checkmarkElement = document.createElement('span');
                    checkmarkElement.className = 'ubits-checkbox__checkmark';
                    squareElement.appendChild(checkmarkElement);
                  }
                  // Asegurar que el checkmark sea visible
                  checkmarkElement.style.opacity = '1';
                  checkmarkElement.style.transform = 'scale(1)';
                } else {
                  // Ocultar el checkmark
                  if (checkmarkElement) {
                    checkmarkElement.style.opacity = '0';
                    checkmarkElement.style.transform = 'scale(0)';
                  }
                }
              });
            }
            
            checkboxInstances.push({
              element: checkboxElement,
              destroy: () => {
                if (checkboxElement.parentNode) {
                  checkboxElement.parentNode.removeChild(checkboxElement);
                }
              },
              update: () => {}
            });
          }
        }
      });
      
      // Crear checkboxes de estados
      const statusLabels: Record<ParticipantStatus, string> = {
        'bajo': 'Bajo',
        'medio': 'Medio',
        'alto': 'Alto',
        'muy-alto': 'Muy Alto'
      };
      
      allStatuses.forEach((status, index) => {
        const containerId = `filter-status-${index}`;
        const inputContainer = drawerInstance.element.querySelector(`#${containerId}`) as HTMLElement;
        if (inputContainer) {
          inputContainer.innerHTML = '';
          const isChecked = activeFilters.statuses.includes(status);
          
          // Crear checkbox directamente en el contenedor usando renderCheckbox
          const checkboxHTML = renderCheckbox({
            label: statusLabels[status],
            name: 'filter-status',
            value: status,
            checked: isChecked,
            size: 'md'
          });
          
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = checkboxHTML.trim();
          const checkboxElement = tempDiv.firstElementChild as HTMLLabelElement;
          
          if (checkboxElement) {
            inputContainer.appendChild(checkboxElement);
            
            // Agregar event listener para actualizar el estado visual
            const inputElement = checkboxElement.querySelector('.ubits-checkbox__input') as HTMLInputElement;
            const squareElement = checkboxElement.querySelector('.ubits-checkbox__square') as HTMLElement;
            
            if (inputElement && squareElement) {
              inputElement.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                const isChecked = target.checked;
                
                // Actualizar clase checked
                checkboxElement.classList.toggle('ubits-checkbox--checked', isChecked);
                
                // Actualizar el checkmark visual
                let checkmarkElement = squareElement.querySelector('.ubits-checkbox__checkmark') as HTMLElement;
                
                if (isChecked) {
                  // Si no existe el checkmark, crearlo
                  if (!checkmarkElement) {
                    checkmarkElement = document.createElement('span');
                    checkmarkElement.className = 'ubits-checkbox__checkmark';
                    squareElement.appendChild(checkmarkElement);
                  }
                  // Asegurar que el checkmark sea visible
                  checkmarkElement.style.opacity = '1';
                  checkmarkElement.style.transform = 'scale(1)';
                } else {
                  // Ocultar el checkmark
                  if (checkmarkElement) {
                    checkmarkElement.style.opacity = '0';
                    checkmarkElement.style.transform = 'scale(0)';
                  }
                }
              });
            }
            
            checkboxInstances.push({
              element: checkboxElement,
              destroy: () => {
                if (checkboxElement.parentNode) {
                  checkboxElement.parentNode.removeChild(checkboxElement);
                }
              },
              update: () => {}
            });
          }
        }
      });
    };

    // Agregar event listener al botón de filtro
    const filterButton = menuElement.querySelector('.ubits-participants-menu__filter-button') as HTMLButtonElement;
    if (filterButton) {
      filterButton.addEventListener('click', () => {
        if (onFilterClick) {
          onFilterClick();
        }
        openFilterDrawer();
      });
    }

    // Agregar event listeners a los participantes
    const participantItems = menuElement.querySelectorAll('[data-participant-id]');
    
    participantItems.forEach((item) => {
      const participantId = item.getAttribute('data-participant-id');
      
      item.addEventListener('click', () => {
        if (participantId && onParticipantSelect) {
          // Actualizar selección visual sin re-renderizar todo
          // Remover TODAS las selecciones anteriores (no solo la primera)
          const allPreviousSelected = menuElement.querySelectorAll('.ubits-participants-menu__item--selected');
          
          allPreviousSelected.forEach((previousItem) => {
            previousItem.classList.remove('ubits-participants-menu__item--selected');
            const previousName = previousItem.querySelector('.ubits-participants-menu__item-name') as HTMLElement;
            if (previousName) {
              previousName.style.color = 'var(--ubits-fg-1-high, #303a47)';
            }
            (previousItem as HTMLElement).style.backgroundColor = '';
          });
          
          // Agregar selección nueva
          item.classList.add('ubits-participants-menu__item--selected');
          const newName = item.querySelector('.ubits-participants-menu__item-name') as HTMLElement;
          if (newName) {
            newName.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static, #0c5bef))';
          } else {
          }
          (item as HTMLElement).style.backgroundColor = 'var(--ubits-bg-active-button, rgba(12, 91, 239, 0.15))';
          
          // Verificar que solo un item esté seleccionado
          const allSelected = menuElement.querySelectorAll('.ubits-participants-menu__item--selected');
          if (allSelected.length > 1) {
          }
          
          // Llamar callback
          try {
            onParticipantSelect(participantId);
          } catch (error) {
            console.error('❌ [ParticipantsMenu] Error al ejecutar onParticipantSelect:', error);
          }
        }
      });
    });

    // Inicializar scrollbar para la lista usando el componente Scroll de UBITS
    // Solo si enableScrollbar está activado
    let scrollbarContainer: HTMLElement | null = null;
    if (restOptions.enableScrollbar !== false) { // Por defecto true si no se especifica
      const listElement = menuElement.querySelector('[data-scrollable="true"]') as HTMLElement;
      if (listElement && listElement.id) {
        const listWrapper = menuElement.querySelector('.ubits-participants-menu__list-wrapper') as HTMLElement;
        if (listWrapper) {
          const scrollbarContainerId = `participants-menu-scrollbar-${Date.now()}`;
          scrollbarContainer = document.createElement('div');
          scrollbarContainer.id = scrollbarContainerId;
          scrollbarContainer.style.cssText = `
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 8px;
            pointer-events: none;
          `;
          listWrapper.style.position = 'relative';
          listWrapper.appendChild(scrollbarContainer);
          
          createScrollbar({
            containerId: scrollbarContainerId,
            targetId: listElement.id,
            orientation: 'vertical'
          });
        }
      }
    } else {
      // Asegurar que el atributo data-ubits-scrollbar no esté presente
      const listElement = menuElement.querySelector('[data-scrollable="true"]') as HTMLElement;
      if (listElement) {
        listElement.removeAttribute('data-ubits-scrollbar');
      }
    }
  };

  // Variable para guardar la referencia del input y controlar si estamos restaurando
  let inputInstance: ReturnType<typeof createInput> | null = null;
  let isRestoringValue = false; // Flag para evitar que onChange se dispare durante restauración

  // Función para actualizar el badge del botón de filtro
  const updateFilterBadge = () => {
    const filterButton = menuElement.querySelector('.ubits-participants-menu__filter-button') as HTMLElement;
    if (!filterButton) return;
    
    const activeFiltersCount = (activeFilters.roles?.length || 0) + (activeFilters.statuses?.length || 0);
    const badgeElement = filterButton.querySelector('.ubits-button__badge') as HTMLElement;
    
    if (activeFiltersCount > 0) {
      // Reemplazar el badge genérico con el badge personalizado que muestra el número
      if (badgeElement) {
        // Si ya es un badge con número, solo actualizar el texto
        if (badgeElement.classList.contains('ubits-badge--number')) {
          badgeElement.textContent = `${activeFiltersCount}`;
        } else {
        // Reemplazar el badge genérico con el badge personalizado
        const newBadgeHTML = `<span class="ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge">${activeFiltersCount}</span>`;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newBadgeHTML;
        const newBadge = tempDiv.firstElementChild as HTMLElement;
        
        if (newBadge && badgeElement.parentNode) {
          badgeElement.parentNode.replaceChild(newBadge, badgeElement);
          }
        }
      } else {
        // Si no existe el badge genérico, crear el badge personalizado
        const newBadge = document.createElement('span');
        newBadge.className = 'ubits-badge ubits-badge--sm ubits-badge--number ubits-badge--error ubits-button__badge';
        newBadge.textContent = `${activeFiltersCount}`;
        filterButton.appendChild(newBadge);
      }
      // Activar el botón
      filterButton.classList.add('ubits-button--active');
    } else {
      // Remover badge completamente cuando no hay filtros activos
      if (badgeElement) {
        // Eliminar el badge del DOM completamente
        badgeElement.remove();
      }
      // Desactivar el botón
      filterButton.classList.remove('ubits-button--active');
    }
  };

  // Función para inicializar el input de búsqueda
  const initializeInput = () => {
    setTimeout(() => {
      const searchInputContainer = menuElement.querySelector(`#${searchInputId}`) as HTMLElement;
      
      if (searchInputContainer) {
        const placeholder = searchInputContainer.getAttribute('data-search-placeholder') || options.searchPlaceholder || 'Buscar participan...';
        const preservedValue = (options as any).preservedSearchValue || '';
        
        const inputOptions: InputOptions = {
          containerId: searchInputId,
          type: 'search',
          size: 'md',
          placeholder: placeholder,
          showLabel: false,
          className: 'ubits-participants-menu__search-input',
          value: preservedValue,
          onChange: (value: string, event?: Event) => {
            if (isRestoringValue) {
              return;
            }
            
            currentSearchTerm = value || '';
            if (onSearchChange) {
              try {
                onSearchChange(value);
              } catch (error) {
                console.error('[ParticipantsMenu] Error en onSearchChange:', error);
              }
            }
            // Actualizar badge (solo muestra filtros activos, no búsqueda)
            updateFilterBadge();
          }
        };
        
        if (preservedValue) {
          isRestoringValue = true;
        }
        
        inputInstance = createInput(inputOptions);
        
        if (inputInstance?.inputElement) {
          if (preservedValue && inputInstance.inputElement.value !== preservedValue) {
            inputInstance.setValue(preservedValue);
          }
          setTimeout(() => {
            isRestoringValue = false;
          }, 150);
        } else {
          isRestoringValue = false;
          console.error('[ParticipantsMenu] No se pudo crear input');
        }
      }
    }, 0);
  };

  // Usar requestAnimationFrame para asegurar que el DOM esté listo
  if (containerId) {
    requestAnimationFrame(() => {
      // Si aún no se encuentra, intentar una vez más en el siguiente frame
      if (!document.getElementById(containerId)) {
        requestAnimationFrame(insertMenu);
      } else {
        insertMenu();
      }
    });
  } else {
    insertMenu();
  }

  /**
   * Actualiza solo la lista de participantes sin recrear el componente completo
   * Esto evita reinicializar el input y disparar onChange
   */
  const updateParticipantsList = (newParticipants: Participant[], newSelectedParticipantId?: string) => {
    const listElement = menuElement.querySelector('.ubits-participants-menu__list') as HTMLElement;
    if (!listElement) {
      return;
    }
    
    // Si el scrollbar está desactivado, limitar participantes para evitar scroll
    const maxItemsWithoutScroll = 6;
    const participantsToShow = restOptions.enableScrollbar !== false
      ? newParticipants 
      : newParticipants.slice(0, maxItemsWithoutScroll);
    
    // Generar HTML de los nuevos participantes
    const participantsHtml = participantsToShow.map(participant => {
      const isSelected = participant.id === newSelectedParticipantId;
      return renderParticipant(
        participant, 
        isSelected, 
        restOptions.showAvatar !== false, 
        restOptions.showRole !== false, 
        restOptions.showStatusTag !== false
      );
    }).join('');
    
    // Detectar si debemos mostrar empty state
    const hasNoResults = participantsToShow.length === 0;
    const hasSearchTerm = currentSearchTerm && currentSearchTerm.trim() !== '';
    const hasActiveFilters = (activeFilters.roles?.length || 0) + (activeFilters.statuses?.length || 0) > 0;
    
    let emptyStateHTML = '';
    if (hasNoResults) {
      let emptyStateConfig;
      if (hasSearchTerm) {
        emptyStateConfig = {
          title: 'No se encontraron resultados',
          description: 'Intenta con otros términos de búsqueda',
          icon: 'search'
        };
      } else if (hasActiveFilters) {
        emptyStateConfig = {
          title: 'No hay resultados',
          description: 'No se encontraron participantes con los filtros aplicados',
          icon: 'filter'
        };
      } else {
        emptyStateConfig = {
          title: 'No hay participantes',
          description: 'No hay participantes para mostrar',
          icon: 'users'
        };
      }
      
      if (emptyStateConfig) {
        emptyStateHTML = renderEmptyState({
          title: escapeHtml(emptyStateConfig.title),
          description: emptyStateConfig.description ? escapeHtml(emptyStateConfig.description) : undefined,
          icon: emptyStateConfig.icon
        });
      }
    }
    
    // Actualizar el HTML de la lista (con empty state si no hay resultados)
    listElement.innerHTML = hasNoResults ? emptyStateHTML : participantsHtml;
    
    // Re-agregar event listeners a los nuevos items (solo si hay participantes)
    if (!hasNoResults) {
      const participantItems = menuElement.querySelectorAll('[data-participant-id]');
      participantItems.forEach((item) => {
        const participantId = item.getAttribute('data-participant-id');
        
        // Remover listeners anteriores si existen
        const newItem = item.cloneNode(true) as HTMLElement;
        item.parentNode?.replaceChild(newItem, item);
        
        newItem.addEventListener('click', () => {
          if (participantId && onParticipantSelect) {
            // Actualizar selección visual sin re-renderizar todo
            const allPreviousSelected = menuElement.querySelectorAll('.ubits-participants-menu__item--selected');
            
            allPreviousSelected.forEach((previousItem) => {
              previousItem.classList.remove('ubits-participants-menu__item--selected');
              const previousName = previousItem.querySelector('.ubits-participants-menu__item-name') as HTMLElement;
              if (previousName) {
                previousName.style.color = 'var(--ubits-fg-1-high, #303a47)';
              }
              (previousItem as HTMLElement).style.backgroundColor = '';
            });
            
            // Agregar selección nueva
            newItem.classList.add('ubits-participants-menu__item--selected');
            const newName = newItem.querySelector('.ubits-participants-menu__item-name') as HTMLElement;
            if (newName) {
              newName.style.color = 'var(--ubits-button-active-fg, var(--ubits-accent-brand-static, #0c5bef))';
            }
            (newItem as HTMLElement).style.backgroundColor = 'var(--ubits-bg-active-button, rgba(12, 91, 239, 0.15))';
            
            // Llamar callback
            try {
              onParticipantSelect(participantId);
            } catch (error) {
              console.error('❌ [ParticipantsMenu] Error al ejecutar onParticipantSelect:', error);
            }
          }
        });
      });
    }
    
    // Actualizar badge (solo muestra filtros activos, no búsqueda)
    updateFilterBadge();
  };

  /**
   * Actualiza el menú con nuevas opciones
   */
  const update = (newOptions: Partial<ParticipantsMenuOptions>) => {
    const onlyParticipantsChanged = newOptions.participants && 
      Object.keys(newOptions).every(key => 
        key === 'participants' || key === 'selectedParticipantId'
      );
    
    if (onlyParticipantsChanged && inputInstance) {
      updateParticipantsList(newOptions.participants!, newOptions.selectedParticipantId);
      return;
    }
    
    
    // Si se está cambiando enableScrollbar, limpiar el scrollbar anterior
    if (newOptions.enableScrollbar !== undefined && newOptions.enableScrollbar !== restOptions.enableScrollbar) {
      const listWrapper = menuElement.querySelector('.ubits-participants-menu__list-wrapper') as HTMLElement;
      if (listWrapper) {
        const existingScrollbar = listWrapper.querySelector('[id^="participants-menu-scrollbar-"]') as HTMLElement;
        if (existingScrollbar) {
          existingScrollbar.remove();
        }
      }
    }
    
    const updatedOptions = { ...restOptions, ...newOptions };
    const newHtml = renderParticipantsMenu({ 
      ...updatedOptions, 
      searchInputId,
      activeFilters,
      searchTerm: currentSearchTerm
    } as any);
    const newWrapper = document.createElement('div');
    newWrapper.innerHTML = newHtml;
    const newElement = newWrapper.firstElementChild as HTMLElement;
    
    if (newElement && menuElement.parentNode) {
      menuElement.parentNode.replaceChild(newElement, menuElement);
      Object.assign(menuElement, newElement);
      initializeInput();
      
      // Actualizar badge
      updateFilterBadge();
      
      // Re-inicializar scrollbar si está activado
      if (updatedOptions.enableScrollbar !== false) {
        const listElement = menuElement.querySelector('[data-scrollable="true"]') as HTMLElement;
        if (listElement && listElement.id) {
          const listWrapper = menuElement.querySelector('.ubits-participants-menu__list-wrapper') as HTMLElement;
          if (listWrapper) {
            const scrollbarContainerId = `participants-menu-scrollbar-${Date.now()}`;
            const scrollbarContainer = document.createElement('div');
            scrollbarContainer.id = scrollbarContainerId;
            scrollbarContainer.style.cssText = `
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              width: 8px;
              pointer-events: none;
            `;
            listWrapper.style.position = 'relative';
            listWrapper.appendChild(scrollbarContainer);
            
            createScrollbar({
              containerId: scrollbarContainerId,
              targetId: listElement.id,
              orientation: 'vertical'
            });
          }
        }
      } else {
        // Asegurar que el atributo data-ubits-scrollbar no esté presente
        const listElement = menuElement.querySelector('[data-scrollable="true"]') as HTMLElement;
        if (listElement) {
          listElement.removeAttribute('data-ubits-scrollbar');
        }
      }
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
    updateParticipantsList, // Exponer método para actualizar solo la lista
    destroy
  };
}

