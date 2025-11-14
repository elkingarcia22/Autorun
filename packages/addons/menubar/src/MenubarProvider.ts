/**
 * MenubarProvider
 * Lógica de renderizado del componente Menubar horizontal
 * Genera HTML según las opciones proporcionadas usando tokens y tipografía UBITS
 */

import type { MenubarOptions, MenubarItem, MenubarSubmenuItem } from './types/MenubarOptions';
import './styles/menubar.css';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

// Renderizar subitem del submenú (puede tener submenú anidado)
function renderSubmenuItem(item: MenubarSubmenuItem, parentId: string, level: number = 1): string {
  const classes = [
    'ubits-menubar-submenu-item',
    item.active && 'ubits-menubar-submenu-item--active',
    item.disabled && 'ubits-menubar-submenu-item--disabled',
    item.submenu && item.submenu.length > 0 && 'ubits-menubar-submenu-item--has-submenu'
  ].filter(Boolean).join(' ');

  const iconHTML = item.icon ? renderIconHelper(item.icon, item.iconStyle) : '';
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const chevronHTML = hasSubmenu ? '<i class="far fa-chevron-right ubits-menubar-submenu-chevron"></i>' : '';
  
  const onClickAttr = item.onClick ? 'data-has-click-handler="true"' : '';
  const hrefAttr = item.href ? `data-href="${item.href}"` : '';
  const disabledAttr = item.disabled ? 'disabled' : '';
  const submenuId = hasSubmenu ? `ubits-menubar-submenu-${parentId}-${item.id}-${level}` : '';

  const submenuHTML = hasSubmenu ? `
    <ul class="ubits-menubar-submenu ubits-menubar-submenu--level-${level + 1}" id="${submenuId}">
      ${item.submenu!.map(subItem => renderSubmenuItem(subItem, `${parentId}-${item.id}`, level + 1)).join('')}
    </ul>
  ` : '';

  return `
    <li class="${classes}" data-item-id="${item.id}" data-parent-id="${parentId}">
      <a 
        href="${item.href || '#'}" 
        class="ubits-menubar-submenu-link"
        ${onClickAttr}
        ${hrefAttr}
        ${disabledAttr}
        ${hasSubmenu ? `data-submenu-id="${submenuId}"` : ''}
      >
        ${iconHTML ? `<span class="ubits-menubar-submenu-icon">${iconHTML}</span>` : ''}
        <span class="ubits-menubar-submenu-label">${item.label}</span>
        ${chevronHTML}
      </a>
      ${submenuHTML}
    </li>
  `;
}

// Renderizar dropdown del menubar
function renderDropdown(item: MenubarItem): string {
  if (!item.submenu || item.submenu.length === 0) return '';
  
  const dropdownId = `ubits-menubar-dropdown-${item.id}`;
  
  return `
    <ul class="ubits-menubar-dropdown" id="${dropdownId}">
      ${item.submenu.map(subItem => renderSubmenuItem(subItem, item.id)).join('')}
    </ul>
  `;
}

// Renderizar item del menubar
function renderMenubarItem(item: MenubarItem): string {
  const classes = [
    'ubits-menubar-item',
    item.active && 'ubits-menubar-item--active',
    item.disabled && 'ubits-menubar-item--disabled',
    item.submenu && item.submenu.length > 0 && 'ubits-menubar-item--has-dropdown'
  ].filter(Boolean).join(' ');

  const iconHTML = item.icon ? renderIconHelper(item.icon, item.iconStyle) : '';
  const hasDropdown = item.submenu && item.submenu.length > 0;
  const chevronHTML = hasDropdown ? '<i class="far fa-chevron-down ubits-menubar-chevron"></i>' : '';
  
  const onClickAttr = item.onClick ? 'data-has-click-handler="true"' : '';
  const hrefAttr = item.href ? `data-href="${item.href}"` : '';
  const disabledAttr = item.disabled ? 'disabled' : '';
  const dropdownId = hasDropdown ? `ubits-menubar-dropdown-${item.id}` : '';

  return `
    <li class="${classes}" data-item-id="${item.id}">
      <a 
        href="${item.href || '#'}" 
        class="ubits-menubar-link"
        ${onClickAttr}
        ${hrefAttr}
        ${disabledAttr}
        ${hasDropdown ? `data-dropdown-id="${dropdownId}" aria-haspopup="true" aria-expanded="false"` : ''}
      >
        ${iconHTML ? `<span class="ubits-menubar-icon">${iconHTML}</span>` : ''}
        <span class="ubits-menubar-label">${item.label}</span>
        ${chevronHTML}
      </a>
      ${hasDropdown ? renderDropdown(item) : ''}
    </li>
  `;
}

/**
 * Renderiza el menubar UBITS como HTML string
 */
export function renderMenubar(options: MenubarOptions): string {
  const {
    items,
    className = '',
    attributes = {}
  } = options;

  const containerClasses = ['ubits-menubar', className].filter(Boolean).join(' ');
  const containerAttrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const itemsHTML = items.map(item => renderMenubarItem(item)).join('');

  return `
    <nav class="${containerClasses}" ${containerAttrs} role="menubar">
      <ul class="ubits-menubar-list">
        ${itemsHTML}
      </ul>
    </nav>
  `.trim();
}

/**
 * Inicializa los event listeners del menubar
 */
function initMenubarEvents(menubarElement: HTMLElement, options: MenubarOptions): void {
  // Click en items del menubar
  const menubarItems = menubarElement.querySelectorAll('.ubits-menubar-item > .ubits-menubar-link');
  menubarItems.forEach((linkElement) => {
    const itemElement = linkElement.closest('.ubits-menubar-item') as HTMLElement;
    const itemId = itemElement?.getAttribute('data-item-id');
    
    if (!itemId) return;

    const item = options.items.find(i => i.id === itemId);
    if (!item) return;

    linkElement.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (item.disabled) return;

      // Si tiene dropdown, toggle el dropdown
      if (item.submenu && item.submenu.length > 0) {
        const dropdownId = linkElement.getAttribute('data-dropdown-id');
        if (dropdownId) {
          const dropdown = document.getElementById(dropdownId);
          const isExpanded = linkElement.getAttribute('aria-expanded') === 'true';
          
          // Cerrar todos los dropdowns
          menubarElement.querySelectorAll('.ubits-menubar-dropdown').forEach(dd => {
            dd.classList.remove('ubits-menubar-dropdown--open');
          });
          menubarElement.querySelectorAll('.ubits-menubar-link').forEach(link => {
            link.setAttribute('aria-expanded', 'false');
          });
          
          // Toggle el dropdown actual
          if (!isExpanded && dropdown) {
            dropdown.classList.add('ubits-menubar-dropdown--open');
            linkElement.setAttribute('aria-expanded', 'true');
          }
        }
      } else {
        // Si no tiene dropdown, manejar como item normal
        // Remover active de todos los items (menubar y submenu)
        menubarElement.querySelectorAll('.ubits-menubar-item, .ubits-menubar-submenu-item').forEach(li => {
          li.classList.remove('ubits-menubar-item--active', 'ubits-menubar-submenu-item--active');
        });
        
        // Cerrar todos los dropdowns
        menubarElement.querySelectorAll('.ubits-menubar-dropdown').forEach(dd => {
          dd.classList.remove('ubits-menubar-dropdown--open');
        });
        menubarElement.querySelectorAll('.ubits-menubar-link').forEach(link => {
          link.setAttribute('aria-expanded', 'false');
        });
        
        // Agregar active al item clickeado
        itemElement.classList.add('ubits-menubar-item--active');

        // Llamar callbacks
        if (options.onActiveItemChange) {
          options.onActiveItemChange(itemId);
        }

        if (item.onClick) {
          item.onClick(e as MouseEvent, item);
        } else if (item.href) {
          window.location.href = item.href;
        }

        if (options.onItemClick) {
          options.onItemClick(itemId, item);
        }
      }
    });
  });

  // Click en subitems del dropdown
  const submenuItems = menubarElement.querySelectorAll('.ubits-menubar-submenu-item > .ubits-menubar-submenu-link');
  submenuItems.forEach((linkElement) => {
    const itemElement = linkElement.closest('.ubits-menubar-submenu-item') as HTMLElement;
    const itemId = itemElement?.getAttribute('data-item-id');
    const parentId = itemElement?.getAttribute('data-parent-id');
    
    if (!itemId) return;

    // Buscar el item en la estructura
    let subItem: MenubarSubmenuItem | undefined;
    for (const item of options.items) {
      if (item.submenu) {
        subItem = item.submenu.find(si => si.id === itemId);
        if (subItem) break;
        
        // Buscar en submenús anidados
        for (const si of item.submenu) {
          if (si.submenu) {
            subItem = si.submenu.find(ssi => ssi.id === itemId);
            if (subItem) break;
          }
        }
        if (subItem) break;
      }
    }

    if (!subItem) return;

    linkElement.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (subItem!.disabled) return;

      // Si tiene submenú anidado, toggle el submenú
      if (subItem!.submenu && subItem!.submenu.length > 0) {
        const submenuId = linkElement.getAttribute('data-submenu-id');
        if (submenuId) {
          const submenu = document.getElementById(submenuId);
          const isExpanded = submenu?.classList.contains('ubits-menubar-submenu--open');
          
          // Cerrar todos los submenús del mismo nivel
          const parentSubmenu = itemElement.closest('.ubits-menubar-submenu');
          if (parentSubmenu) {
            parentSubmenu.querySelectorAll('.ubits-menubar-submenu--open').forEach(sm => {
              sm.classList.remove('ubits-menubar-submenu--open');
            });
          }
          
          // Toggle el submenú actual
          if (!isExpanded && submenu) {
            submenu.classList.add('ubits-menubar-submenu--open');
          }
        }
      } else {
        // Si no tiene submenú, manejar como item normal
        // Remover active de todos los items
        menubarElement.querySelectorAll('.ubits-menubar-item, .ubits-menubar-submenu-item').forEach(li => {
          li.classList.remove('ubits-menubar-item--active', 'ubits-menubar-submenu-item--active');
        });
        
        // Agregar active al item clickeado
        itemElement.classList.add('ubits-menubar-submenu-item--active');

        // Cerrar todos los dropdowns
        menubarElement.querySelectorAll('.ubits-menubar-dropdown').forEach(dd => {
          dd.classList.remove('ubits-menubar-dropdown--open');
        });
        menubarElement.querySelectorAll('.ubits-menubar-link').forEach(link => {
          link.setAttribute('aria-expanded', 'false');
        });

        // Llamar callbacks
        if (options.onActiveItemChange) {
          options.onActiveItemChange(itemId, parentId || undefined);
        }

        if (subItem!.onClick) {
          subItem!.onClick(e as MouseEvent, subItem!);
        } else if (subItem!.href) {
          window.location.href = subItem!.href;
        }

        if (options.onItemClick) {
          options.onItemClick(itemId, subItem!);
        }
      }
    });
  });

  // Soporte para hover en submenús anidados
  const submenuItemsWithSubmenu = menubarElement.querySelectorAll('.ubits-menubar-submenu-item--has-submenu');
  submenuItemsWithSubmenu.forEach((itemElement) => {
    const linkElement = itemElement.querySelector('.ubits-menubar-submenu-link') as HTMLElement;
    if (!linkElement) return;

    const submenuId = linkElement.getAttribute('data-submenu-id');
    if (!submenuId) return;

    itemElement.addEventListener('mouseenter', () => {
      const submenu = document.getElementById(submenuId);
      if (submenu) {
        submenu.classList.add('ubits-menubar-submenu--open');
      }
    });

    itemElement.addEventListener('mouseleave', () => {
      const submenu = document.getElementById(submenuId);
      if (submenu && !submenu.matches(':hover')) {
        submenu.classList.remove('ubits-menubar-submenu--open');
      }
    });
  });

  // Cerrar dropdowns al hacer click fuera
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!menubarElement.contains(target)) {
      menubarElement.querySelectorAll('.ubits-menubar-dropdown').forEach(dd => {
        dd.classList.remove('ubits-menubar-dropdown--open');
      });
      menubarElement.querySelectorAll('.ubits-menubar-link').forEach(link => {
        link.setAttribute('aria-expanded', 'false');
      });
      // También cerrar submenús anidados
      menubarElement.querySelectorAll('.ubits-menubar-submenu--open').forEach(sm => {
        sm.classList.remove('ubits-menubar-submenu--open');
      });
    }
  });
}

/**
 * Crea un menubar interactivo en el DOM
 */
export function createMenubar(options: MenubarOptions): HTMLElement {
  const { containerId } = options;

  let container: HTMLElement | null = null;
  
  if (containerId) {
    container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
  } else {
    // Si no hay containerId, crear un contenedor temporal
    container = document.createElement('div');
    document.body.appendChild(container);
  }

  const menubarHTML = renderMenubar(options);
  container.innerHTML = menubarHTML;

  const menubarElement = container.querySelector('.ubits-menubar') as HTMLElement;
  if (!menubarElement) {
    throw new Error('Failed to create menubar element');
  }

  // Inicializar eventos
  initMenubarEvents(menubarElement, options);

  return menubarElement;
}

/**
 * Actualiza el item activo del menubar
 */
export function updateActiveMenubarItem(containerId: string, itemId: string, parentId?: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const menubarElement = container.querySelector('.ubits-menubar');
  if (!menubarElement) return;

  // Remover active de todos los items
  menubarElement.querySelectorAll('.ubits-menubar-item, .ubits-menubar-submenu-item').forEach(item => {
    item.classList.remove('ubits-menubar-item--active', 'ubits-menubar-submenu-item--active');
  });

  // Agregar active al item especificado
  if (parentId) {
    const targetItem = menubarElement.querySelector(`[data-item-id="${itemId}"][data-parent-id="${parentId}"]`);
    if (targetItem) {
      targetItem.classList.add('ubits-menubar-submenu-item--active');
    }
  } else {
    const targetItem = menubarElement.querySelector(`.ubits-menubar-item[data-item-id="${itemId}"]`);
    if (targetItem) {
      targetItem.classList.add('ubits-menubar-item--active');
    }
  }
}

