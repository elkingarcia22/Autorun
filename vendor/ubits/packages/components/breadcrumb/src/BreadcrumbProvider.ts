import type { BreadcrumbOptions, BreadcrumbItem } from './types/BreadcrumbOptions';

/**
 * Renderiza el HTML del componente Breadcrumb
 */
export function renderBreadcrumb(options: BreadcrumbOptions): string {
  const { items, separator = '>', className = '' } = options;

  if (!items || items.length === 0) {
    return '<nav class="ubits-breadcrumb" aria-label="Breadcrumb"></nav>';
  }

  // El último item siempre está activo
  const itemsWithActive = items.map((item, index) => ({
    ...item,
    active: index === items.length - 1
  }));

  // Renderizar items
  const itemsHTML = itemsWithActive.map((item, index) => {
    const isActive = item.active;
    const isLast = index === itemsWithActive.length - 1;
    const activeClass = isActive ? 'ubits-breadcrumb__item--active' : '';
    const disabledClass = item.disabled ? 'ubits-breadcrumb__item--disabled' : '';
    const classes = ['ubits-breadcrumb__item', activeClass, disabledClass].filter(Boolean).join(' ');
    
    // Si es el último item o está deshabilitado, usar span, sino usar link/button
    const isClickable = !isActive && !item.disabled;
    
    if (isClickable) {
      if (item.url) {
        return `
          <a 
            href="${item.url}" 
            class="${classes}"
            data-breadcrumb-id="${item.id}"
            ${item.onClick ? 'data-has-click-handler="true"' : ''}
          >
            ${item.label}
          </a>
        `;
      } else {
        return `
          <button 
            class="${classes}"
            data-breadcrumb-id="${item.id}"
            ${item.onClick ? 'data-has-click-handler="true"' : ''}
          >
            ${item.label}
          </button>
        `;
      }
    } else {
      return `
        <span 
          class="${classes}"
          data-breadcrumb-id="${item.id}"
          ${item.disabled ? 'aria-disabled="true"' : ''}
        >
          ${item.label}
        </span>
      `;
    }
  }).join(`<span class="ubits-breadcrumb__separator" aria-hidden="true">${separator}</span>`);

  const containerClasses = ['ubits-breadcrumb', className].filter(Boolean).join(' ');

  return `
    <nav class="${containerClasses}" aria-label="Breadcrumb">
      <ol class="ubits-breadcrumb__list">
        ${itemsHTML}
      </ol>
    </nav>
  `.trim();
}

/**
 * Inicializa los event listeners del breadcrumb
 */
function initBreadcrumbListeners(breadcrumbElement: HTMLElement, options: BreadcrumbOptions): void {
  // Remover listeners anteriores si existen
  const existingItems = breadcrumbElement.querySelectorAll<HTMLElement>('.ubits-breadcrumb__item[data-listener-attached]');
  existingItems.forEach(item => {
    const clonedItem = item.cloneNode(true) as HTMLElement;
    item.parentNode?.replaceChild(clonedItem, item);
  });
  
  const items = breadcrumbElement.querySelectorAll<HTMLElement>('.ubits-breadcrumb__item:not(.ubits-breadcrumb__item--disabled):not(.ubits-breadcrumb__item--active)');
  
  const handleItemClick = (itemElement: HTMLElement, event: Event) => {
    const itemId = itemElement.getAttribute('data-breadcrumb-id');
    const url = (itemElement as HTMLAnchorElement).href;
    
    // Si tiene URL y es un link, dejar que el navegador maneje la navegación
    if (itemElement.tagName === 'A' && url && !itemElement.hasAttribute('data-has-click-handler')) {
      return; // Permitir navegación normal
    }
    
    // Prevenir navegación por defecto si hay handler
    event.preventDefault();
    
    // Buscar el callback onClick del item original
    const itemConfig = options.items.find(item => item.id === itemId);
    
    if (itemConfig && itemConfig.onClick) {
      itemConfig.onClick(event as MouseEvent);
    }
    
    // Llamar callback si existe
    if (options.onItemClick) {
      options.onItemClick(itemId || '', itemElement);
    }
    
    // Disparar evento personalizado
    const customEvent = new CustomEvent('breadcrumbItemClick', {
      detail: { itemId: itemId, itemElement: itemElement }
    });
    document.dispatchEvent(customEvent);
  };

  // Event listeners para items
  items.forEach(item => {
    item.setAttribute('data-listener-attached', 'true');
    item.addEventListener('click', (e) => handleItemClick(item, e));
  });
}

/**
 * Crea un componente Breadcrumb interactivo en el DOM
 */
export function createBreadcrumb(options: BreadcrumbOptions, containerId?: string): HTMLElement {
  const container = containerId 
    ? document.getElementById(containerId) || document.createElement('div')
    : document.createElement('div');
  
  if (containerId && !container.id) {
    container.id = containerId;
  }
  
  container.innerHTML = renderBreadcrumb(options);
  
  // Inicializar listeners
  requestAnimationFrame(() => {
    const breadcrumbElement = container.querySelector('.ubits-breadcrumb') as HTMLElement;
    if (breadcrumbElement) {
      initBreadcrumbListeners(breadcrumbElement, options);
    } else {
      // Fallback: usar el contenedor directamente
      initBreadcrumbListeners(container, options);
    }
  });
  
  return container;
}

