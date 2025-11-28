/**
 * HeaderSectionProvider
 * Lógica de renderizado del componente HeaderSection
 * Genera HTML según las opciones proporcionadas
 */

import { HeaderSectionOptions, HeaderSectionAction } from './types/HeaderSectionOptions';
import { renderButton } from '../../button/src/ButtonProvider';
import { renderButtonAI } from '../../button-ai/src/ButtonAIProvider';
import { renderStatusTag } from '../../status-tag/src/StatusTagProvider';
import { createTooltip } from '../../tooltip/src/TooltipProvider';
import type { TooltipOptions } from '../../tooltip/src/types/TooltipOptions';
import { createList } from '../../list/src/ListProvider';
import type { ListItem } from '../../list/src/types/ListOptions';
import { renderBreadcrumb, createBreadcrumb } from '../../breadcrumb/src/BreadcrumbProvider';

// Helper para renderizar iconos
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza un HeaderSection UBITS como HTML string
 */
export function renderHeaderSection(options: HeaderSectionOptions): string {
  const {
    title = '',
    showTitle = true,
    showBackButton = false,
    showInfoButton = false,
    showStatusTag = false,
    statusTag,
    actions = [],
    showActions = true,
    showBreadcrumb = false,
    breadcrumb,
    className = ''
  } = options;

  // Construir clases CSS
  const classes = [
    'ubits-header-section',
    className
  ].filter(Boolean).join(' ');

  // Renderizar botón de atrás (secundario md)
  const backButtonHTML = showBackButton
    ? renderButton({
        variant: 'secondary',
        size: 'md',
        icon: 'arrow-left',
        iconStyle: 'regular',
        iconOnly: true,
        attributes: {
          'data-back-button': 'true',
          'aria-label': 'Volver'
        }
      })
    : '';

  // Renderizar botón de información
  const infoButtonHTML = showInfoButton
    ? renderButton({
        variant: 'tertiary',
        size: 'sm',
        icon: 'circle-info',
        iconStyle: 'regular',
        iconOnly: true,
        attributes: {
          'data-info-button': 'true',
          'aria-label': 'Información'
        }
      })
    : '';

  // Renderizar status tag (independiente del título)
  const statusTagHTML = showStatusTag && statusTag
    ? renderStatusTag({
        ...statusTag,
        size: statusTag.size || 'sm',
        rightIcon: null // Ocultar icono derecho
      })
    : '';

  // Renderizar título con botón de información y status tag
  let titleHTML = '';
  if (showTitle && title) {
    titleHTML = `
      <div class="ubits-header-section__title-wrapper">
        ${backButtonHTML}
        <div class="ubits-header-section__title-group">
          <h2 class="ubits-heading-h2">${title}</h2>
          ${infoButtonHTML}
          ${statusTagHTML ? `<div class="ubits-header-section__status-tag-wrapper">${statusTagHTML}</div>` : ''}
        </div>
      </div>
    `;
  } else if (showBackButton || showInfoButton || showStatusTag) {
    // Si no hay título pero sí botón de atrás, info o status tag, mostrarlos
    titleHTML = `
      <div class="ubits-header-section__title-wrapper">
        ${backButtonHTML}
        <div class="ubits-header-section__title-group">
          ${infoButtonHTML}
          ${statusTagHTML ? `<div class="ubits-header-section__status-tag-wrapper">${statusTagHTML}</div>` : ''}
        </div>
      </div>
    `;
  }

  // Renderizar botón secundario adicional
  const showSecondaryButton = options.showSecondaryButton || false;
  const secondaryButtonHTML = showSecondaryButton
    ? renderButton({
        variant: 'secondary',
        size: 'md',
        text: options.secondaryButtonText || '',
        icon: options.secondaryButtonIcon,
        iconStyle: 'regular',
        attributes: {
          'data-secondary-button': 'true',
          'aria-label': options.secondaryButtonText || 'Botón secundario'
        }
      })
    : '';

  // Renderizar botón de opciones (3 puntos horizontales)
  const showOptionsButton = options.showOptionsButton || false;
  const optionsButtonHTML = showOptionsButton
    ? renderButton({
        variant: 'secondary',
        size: 'md',
        icon: 'ellipsis',
        iconStyle: 'regular',
        iconOnly: true,
        attributes: {
          'data-options-button': 'true',
          'aria-label': 'Más opciones'
        }
      })
    : '';

  // Renderizar acciones
  // Separar acciones normales del botón AI
  const normalActions = actions.filter(action => action.id !== 'ai-button');
  const aiAction = actions.find(action => action.id === 'ai-button');
  
  // Separar acciones secundarias de las primarias
  const secondaryActions = normalActions.filter(action => action.variant === 'secondary' || !action.variant);
  const primaryActions = normalActions.filter(action => action.variant === 'primary');
  
  let actionsHTML = '';
  if (showActions && actions.length > 0) {
    // Renderizar acciones secundarias
    const secondaryActionsButtons = secondaryActions.map(action => {
      const buttonOptions = {
        ...action,
        size: 'md' as const, // Forzar tamaño md para acciones
        text: action.text,
        onClick: action.onClick
      };
      return renderButton(buttonOptions);
    }).join('');
    
    // Renderizar botón AI al final de los botones secundarios (antes del botón primario)
    let aiButtonHTML = '';
    if (aiAction) {
      aiButtonHTML = renderButtonAI({
        variant: 'secondary',
        size: 'md',
        text: aiAction.text || 'AI button',
        icon: aiAction.icon || 'sparkles',
        iconStyle: aiAction.iconStyle || 'regular',
        iconOnly: false,
        disabled: false,
        badge: false,
        active: false
      });
    }
    
    // Renderizar acciones primarias
    const primaryActionsButtons = primaryActions.map(action => {
      const buttonOptions = {
        ...action,
        size: 'md' as const, // Forzar tamaño md para acciones
        text: action.text,
        onClick: action.onClick
      };
      return renderButton(buttonOptions);
    }).join('');
    
    actionsHTML = `
      <div class="ubits-header-section__actions">
        ${aiButtonHTML}
        ${secondaryButtonHTML}
        ${secondaryActionsButtons}
        ${primaryActionsButtons}
        ${optionsButtonHTML}
      </div>
    `;
  } else if (showSecondaryButton || showOptionsButton) {
    // Si no hay acciones pero sí botones adicionales, mostrarlos
    actionsHTML = `
      <div class="ubits-header-section__actions">
        ${secondaryButtonHTML}
        ${optionsButtonHTML}
      </div>
    `;
  }

  // Renderizar breadcrumb
  const breadcrumbHTML = showBreadcrumb && breadcrumb
    ? renderBreadcrumb(breadcrumb)
    : '';

  // HTML completo
  const html = `
    <div class="${classes}">
      <div class="ubits-header-section__content">
        ${titleHTML}
        ${actionsHTML}
      </div>
      ${breadcrumbHTML ? `<div class="ubits-header-section__breadcrumb-wrapper">${breadcrumbHTML}</div>` : ''}
    </div>
  `;

  return html.trim();
}

/**
 * Crea e inicializa el componente HeaderSection en el DOM
 */
export function createHeaderSection(options: HeaderSectionOptions): HTMLElement | null {
  const {
    containerId,
    container: providedContainer,
    title,
    showTitle = true,
    showBackButton = false,
    showInfoButton = false,
    infoTooltipText = '',
    showStatusTag = false,
    statusTag,
    actions = [],
    showActions = true,
    showSecondaryButton = false,
    showOptionsButton = false,
    showBreadcrumb = false,
    breadcrumb,
    onBackClick,
    onInfoClick,
    onSecondaryButtonClick,
    onOptionsClick
  } = options;

  // Obtener contenedor
  let container: HTMLElement | null = null;
  if (providedContainer) {
    container = providedContainer;
  } else if (containerId) {
    container = document.getElementById(containerId);
  }

  if (!container) {
    console.error('HeaderSection: Contenedor no encontrado');
    return null;
  }

  // Renderizar HTML
  const html = renderHeaderSection({
    ...options,
    container: undefined, // No pasar container al render
    containerId: undefined
  });
  container.innerHTML = html;

  const headerElement = container.querySelector('.ubits-header-section');
  if (!headerElement) {
    console.error('HeaderSection: Elemento no encontrado después de renderizar');
    return null;
  }

  // Inicializar botón de atrás
  if (showBackButton) {
    const backButton = headerElement.querySelector('[data-back-button="true"]') as HTMLElement;
    if (backButton) {
      // Encontrar el botón real (puede estar dentro de un wrapper)
      const actualButton = backButton.closest('button') || backButton;
      if (actualButton && onBackClick) {
        actualButton.addEventListener('click', onBackClick);
      }
    }
  }

  // Inicializar botón de información con tooltip
  if (showInfoButton && infoTooltipText) {
    const infoButton = headerElement.querySelector('[data-info-button="true"]') as HTMLElement;
    if (infoButton) {
      // Encontrar el botón real (puede estar dentro de un wrapper)
      const actualButton = infoButton.closest('button') || infoButton;
      
      let tooltipInstance: ReturnType<typeof createTooltip> | null = null;
      let isTooltipOpen = false;

      const updateTooltipPosition = () => {
        if (!tooltipInstance || !isTooltipOpen) return;
        
        const rect = actualButton.getBoundingClientRect();
        const tooltipElement = tooltipInstance.element;
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        // Calcular posición: tooltip justo encima del botón
        const tooltipLeft = rect.left + (rect.width / 2);
        // Obtener valor de spacing-sm (8px) desde CSS
        const spacingSm = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ubits-spacing-sm').replace('px', '')) || 8;
        const tooltipTop = rect.top - tooltipRect.height - spacingSm;
        
        tooltipInstance.updatePosition({
          top: tooltipTop,
          left: tooltipLeft
        });
      };

      const openTooltip = () => {
        if (!tooltipInstance) {
          const rect = actualButton.getBoundingClientRect();
          
          // Crear tooltip con posición inicial estimada
          tooltipInstance = createTooltip({
            description: infoTooltipText,
            showDescription: true,
            showTitle: false,
            showPrimaryButton: false,
            showSecondaryButton: false,
            showTertiaryButton: false,
            width: 'sm',
            tailPosition: 'bottom', // Tail apunta hacia abajo (tooltip arriba)
            position: {
              left: rect.left + (rect.width / 2),
              top: rect.top - 200 // Posición temporal, se ajustará después
            },
            closeOnOutsideClick: true,
            onClose: () => {
              isTooltipOpen = false;
              // Remover clase active al cerrar
              actualButton.classList.remove('ubits-button--active');
            }
          });

          // Esperar a que el tooltip se renderice para obtener su altura real
          requestAnimationFrame(() => {
            updateTooltipPosition();
          });
        }
        
        tooltipInstance.open();
        isTooltipOpen = true;
        // Agregar clase active cuando el tooltip está abierto
        actualButton.classList.add('ubits-button--active');
        updateTooltipPosition();
      };

      const closeTooltip = () => {
        if (tooltipInstance && isTooltipOpen) {
          tooltipInstance.close();
          isTooltipOpen = false;
          // Remover clase active al cerrar
          actualButton.classList.remove('ubits-button--active');
        }
      };

      // Click en el botón de información
      actualButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (isTooltipOpen) {
          closeTooltip();
        } else {
          openTooltip();
        }
        
        if (onInfoClick) {
          onInfoClick(e);
        }
      });

      // Cerrar tooltip al hacer click fuera
      document.addEventListener('click', (e) => {
        if (isTooltipOpen && tooltipInstance && 
            !actualButton.contains(e.target as Node) && 
            !tooltipInstance.element.contains(e.target as Node)) {
          closeTooltip();
        }
      });

      // Mantener posición del tooltip al hacer scroll o resize
      let scrollTimeout: number | null = null;
      const handleScroll = () => {
        if (scrollTimeout) {
          cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(() => {
          if (isTooltipOpen) {
            updateTooltipPosition();
          }
        });
      };

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);

      // Limpiar listeners al destruir el componente
      const originalDestroy = () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
        if (tooltipInstance) {
          tooltipInstance.destroy();
          tooltipInstance = null;
        }
      };

      // Guardar referencia para limpieza si es necesario
      (headerElement as any).__headerSectionCleanup = originalDestroy;
    }
  }

  // Inicializar status tag
  if (showStatusTag && statusTag) {
    const statusTagElement = headerElement.querySelector('.ubits-status-tag') as HTMLElement;
    if (statusTagElement && statusTag.onClick) {
      statusTagElement.addEventListener('click', statusTag.onClick);
      statusTagElement.style.cursor = 'pointer';
    }
  }

  // Inicializar event listeners para las acciones
  if (showActions && actions.length > 0) {
    // Separar acciones normales del botón AI
    const normalActions = actions.filter(action => action.id !== 'ai-button');
    const aiAction = actions.find(action => action.id === 'ai-button');
    
    // Separar acciones secundarias de las primarias
    const secondaryActions = normalActions.filter(action => action.variant === 'secondary' || !action.variant);
    const primaryActions = normalActions.filter(action => action.variant === 'primary');
    
    // Event listeners para botones secundarios
    const secondaryActionButtons = headerElement.querySelectorAll('.ubits-header-section__actions .ubits-button:not([data-options-button="true"]):not([data-secondary-button="true"]):not(.ubits-button-ai):not(.ubits-button--primary)');
    secondaryActionButtons.forEach((button, index) => {
      const action = secondaryActions[index];
      if (action && action.onClick) {
        button.addEventListener('click', action.onClick);
      }
    });
    
    // Event listener para botón AI (si existe)
    if (aiAction) {
      const aiButton = headerElement.querySelector('.ubits-header-section__actions .ubits-button-ai');
      if (aiButton && aiAction.onClick) {
        aiButton.addEventListener('click', aiAction.onClick);
      }
    }
    
    // Event listeners para botones primarios
    const primaryActionButtons = headerElement.querySelectorAll('.ubits-header-section__actions .ubits-button--primary');
    primaryActionButtons.forEach((button, index) => {
      const action = primaryActions[index];
      if (action && action.onClick) {
        button.addEventListener('click', action.onClick);
      }
    });
  }

  // Inicializar botón secundario adicional
  if (showSecondaryButton) {
    const secondaryButton = headerElement.querySelector('[data-secondary-button="true"]') as HTMLElement;
    if (secondaryButton) {
      // Encontrar el botón real (puede estar dentro de un wrapper)
      const actualButton = secondaryButton.closest('button') || secondaryButton;
      if (actualButton && onSecondaryButtonClick) {
        actualButton.addEventListener('click', onSecondaryButtonClick);
      }
    }
  }

  // Inicializar botón de opciones con dropdown
  if (showOptionsButton) {
    const optionsButton = headerElement.querySelector('[data-options-button="true"]') as HTMLElement;
    if (optionsButton) {
      // Encontrar el botón real (puede estar dentro de un wrapper)
      const actualButton = optionsButton.closest('button') || optionsButton;
      
      // Crear contenedor para el dropdown
      const dropdownContainer = document.createElement('div');
      dropdownContainer.className = 'ubits-header-section-options-dropdown';
      // Obtener valores de spacing desde CSS
      const spacing12 = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ubits-spacing-12').replace('px', '')) || 48;
      const minWidth = spacing12 * 2.5; // 200px = 48px * 2.5
      
      dropdownContainer.style.cssText = `
        position: fixed;
        z-index: 1000;
        display: none;
        min-width: ${minWidth}px;
      `;
      
      // Agregar el contenedor al body para posicionamiento fijo
      document.body.appendChild(dropdownContainer);
      
      let isOpen = false;
      
      const toggleDropdown = (e: MouseEvent) => {
        e.stopPropagation();
        
        if (isOpen) {
          dropdownContainer.style.display = 'none';
          isOpen = false;
          actualButton.classList.remove('ubits-button--active');
          return;
        }
        
        // Calcular posición del dropdown (debajo del botón, alineado a la derecha)
        const buttonRect = actualButton.getBoundingClientRect();
        
        // Obtener valor de spacing-sm (8px) desde CSS
        const spacingSm = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ubits-spacing-sm').replace('px', '')) || 8;
        
        dropdownContainer.style.display = 'block';
        dropdownContainer.style.top = `${buttonRect.bottom + window.scrollY + spacingSm}px`;
        dropdownContainer.style.right = `${window.innerWidth - buttonRect.right}px`;
        
        // Crear lista de opciones si hay items
        if (options.optionsMenuItems && options.optionsMenuItems.length > 0) {
          const listId = `header-section-options-menu-${Date.now()}`;
          dropdownContainer.id = listId;
          dropdownContainer.innerHTML = '';
          
          // Convertir menuItems a ListItems
          const listItems: ListItem[] = options.optionsMenuItems.map(item => ({
            label: item.label,
            state: item.state || 'default',
            value: item.value || item.label,
            selected: false
          }));
          
          try {
            createList({
              containerId: listId,
              items: listItems,
              size: 'md',
              maxHeight: 'none',
              onSelectionChange: (selectedItem, index) => {
                if (selectedItem && options.optionsMenuItems && options.optionsMenuItems[index]) {
                  const menuItem = options.optionsMenuItems![index];
                  if (menuItem.onClick) {
                    menuItem.onClick(new MouseEvent('click'), {
                      label: selectedItem.label,
                      value: selectedItem.value
                    });
                  }
                  dropdownContainer.style.display = 'none';
                  isOpen = false;
                  actualButton.classList.remove('ubits-button--active');
                }
              }
            });
            
            // Ajustar dinámicamente: si hay más de 5 items, aplicar max-height con scroll
            setTimeout(() => {
              const listElement = dropdownContainer.querySelector('.ubits-list') as HTMLElement;
              if (listElement && listItems.length > 5) {
                listElement.style.maxHeight = 'calc(var(--ubits-spacing-12) * 6)';
                listElement.style.overflowY = 'auto';
              }
            }, 0);
          } catch (error) {
            console.error('Error creating options menu:', error);
          }
        }
        
        isOpen = true;
        actualButton.classList.add('ubits-button--active');
        
        // Llamar al handler si existe
        if (onOptionsClick) {
          onOptionsClick(e);
        }
      };
      
      actualButton.addEventListener('click', toggleDropdown);
      
      // Cerrar el dropdown al hacer click fuera
      const closeDropdown = (e: MouseEvent) => {
        if (isOpen && 
            !dropdownContainer.contains(e.target as Node) && 
            !actualButton.contains(e.target as Node)) {
          dropdownContainer.style.display = 'none';
          isOpen = false;
          actualButton.classList.remove('ubits-button--active');
        }
      };
      
      document.addEventListener('click', closeDropdown);
      
      // Limpiar listener al destruir
      (headerElement as any).__optionsDropdownCleanup = () => {
        document.removeEventListener('click', closeDropdown);
      };
    }
  }

  // Inicializar breadcrumb
  if (showBreadcrumb && breadcrumb) {
    const breadcrumbWrapper = headerElement.querySelector('.ubits-header-section__breadcrumb-wrapper');
    if (breadcrumbWrapper) {
      const breadcrumbContainerId = `header-section-breadcrumb-${Date.now()}`;
      breadcrumbWrapper.id = breadcrumbContainerId;
      breadcrumbWrapper.innerHTML = '';
      
      try {
        createBreadcrumb(breadcrumb, breadcrumbContainerId);
      } catch (error) {
        console.error('Error creating breadcrumb:', error);
        // Fallback: usar renderBreadcrumb
        breadcrumbWrapper.innerHTML = renderBreadcrumb(breadcrumb);
      }
    }
  }

  return headerElement as HTMLElement;
}

