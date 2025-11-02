/**
 * TabBarProvider
 * Lógica de renderizado y gestión del componente TabBar
 * Incluye items personalizables, estados, dark mode toggle,
 * Floating Menu (accordions) y Profile Menu
 */

import type { TabBarOptions, TabBarItem, FloatingMenuSection, ProfileMenuItem } from './types/TabBarOptions';
import './styles/tabbar.css';

// Helper para renderizar iconos
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza el HTML del TabBar
 */
export function renderTabBar(options: TabBarOptions): string {
  const {
    items,
    activeTabId,
    visible = false,
    className = ''
  } = options;

  const containerClasses = [
    'ubits-tabbar',
    visible ? 'ubits-tabbar--visible' : '',
    className
  ].filter(Boolean).join(' ');

  const itemsHTML = items.map(item => {
    const isActive = item.id === activeTabId;
    const itemClasses = [
      'ubits-tabbar-item',
      isActive ? 'ubits-tabbar-item--active' : ''
    ].filter(Boolean).join(' ');

    let iconOrAvatarHTML = '';
    if (item.avatar) {
      iconOrAvatarHTML = `<img src="${item.avatar}" alt="${item.avatarAlt || item.label}" class="ubits-tabbar-avatar">`;
    } else if (item.icon) {
      iconOrAvatarHTML = `<span class="ubits-tabbar-icon">${renderIconHelper(item.icon)}</span>`;
    }

    return `
      <div 
        class="${itemClasses}" 
        data-tab-id="${item.id}"
        data-has-click-handler="${item.onClick ? 'true' : 'false'}"
      >
        ${iconOrAvatarHTML}
        <span class="ubits-tabbar-text">${item.label}</span>
      </div>
    `;
  }).join('\n');

  return `
    <div class="${containerClasses}" id="ubits-tabbar">
      <div class="ubits-tabbar-content">
        ${itemsHTML}
      </div>
    </div>
  `;
}

/**
 * Crea e inicializa el componente TabBar en el DOM
 */
export function createTabBar(options: TabBarOptions): HTMLElement | null {
  const {
    containerId,
    container: providedContainer,
    items,
    activeTabId,
    onTabChange,
    visible = false,
    darkModeEnabled = false,
    onDarkModeToggle
  } = options;

  // Obtener contenedor
  let container: HTMLElement | null = null;
  if (providedContainer) {
    container = providedContainer;
  } else if (containerId) {
    container = document.getElementById(containerId);
  }

  if (!container) {
    console.error('TabBar: Contenedor no encontrado');
    return null;
  }

  // Detectar si es modo preview
  const isPreview = container.classList.contains('ubits-tabbar-preview-container');
  
  // Renderizar HTML
  const html = renderTabBar({
    ...options,
    visible: visible || isPreview,
    className: isPreview ? 'ubits-tabbar--preview' : ''
  });
  container.innerHTML = html;

  // Asegurar que el contenedor tenga position: relative para que el TabBar absolute sea relativo a él
  if (isPreview) {
    const containerStyle = window.getComputedStyle(container);
    if (containerStyle.position === 'static') {
      container.style.position = 'relative';
    }
  }

  const tabBarElement = container.querySelector('.ubits-tabbar');
  if (!tabBarElement) {
    console.error('TabBar: Elemento no encontrado después de renderizar');
    return null;
  }

  // Inicializar event listeners
  initTabBarListeners(
    tabBarElement as HTMLElement,
    items,
    onTabChange,
    darkModeEnabled,
    onDarkModeToggle,
    options.floatingMenuSections,
    options.profileMenuItems,
    options.onFloatingMenuItemClick,
    options.onProfileMenuItemClick,
    container
  );

  return tabBarElement as HTMLElement;
}

/**
 * Renderiza el Floating Menu
 */
function renderFloatingMenu(sections: FloatingMenuSection[]): string {
  const sectionsHTML = sections.map(section => {
    // Si es un enlace directo (no accordion)
    if (section.isLink) {
      return `
        <a href="${section.url || '#'}" class="ubits-accordion-link ubits-accordion-link--direct" data-section-id="${section.id}">
          <div class="ubits-accordion-icon-circle" data-circle-id="${section.id}">
            ${renderIconHelper(section.icon)}
          </div>
          <span>${section.title}</span>
          <i class="far fa-chevron-right ubits-accordion-chevron"></i>
        </a>
      `;
    }
    
    // Si es accordion con subitems
    const subitemsHTML = (section.subitems || []).map(subitem => `
      <a href="${subitem.url}" class="ubits-accordion-link" data-subitem-id="${subitem.id}">
        <div class="ubits-accordion-icon-circle" data-circle-id="${subitem.id}">
          ${renderIconHelper(subitem.icon)}
        </div>
        <span>${subitem.title}</span>
      </a>
    `).join('');

    return `
      <div class="ubits-accordion-item">
        <div class="ubits-accordion-header" data-accordion-id="${section.id}">
          <div class="ubits-accordion-title">
            <div class="ubits-accordion-icon-circle" data-circle-id="${section.id}">
              ${renderIconHelper(section.icon)}
            </div>
            <span>${section.title}</span>
          </div>
          <i class="far fa-chevron-down ubits-accordion-chevron" data-chevron-id="${section.id}"></i>
        </div>
        <div class="ubits-accordion-body" data-body-id="${section.id}">
          ${subitemsHTML}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="ubits-floating-menu" id="ubits-floating-menu">
      <div class="ubits-floating-menu-header">
        <h2 class="ubits-floating-menu-title">Módulos</h2>
        <button class="ubits-floating-menu-close" id="ubits-floating-menu-close">
          ${renderIconHelper('times')}
        </button>
      </div>
      <div class="ubits-floating-menu-content">
        ${sectionsHTML}
      </div>
    </div>
  `;
}

/**
 * Renderiza el Profile Menu
 */
function renderProfileMenu(items: ProfileMenuItem[]): string {
  const itemsHTML = items.map(item => `
    <div class="ubits-profile-menu-item" data-profile-item-id="${item.id}" ${item.url ? `data-href="${item.url}"` : ''}>
      <i class="far fa-${item.icon} ubits-profile-menu-icon"></i>
      <span class="ubits-profile-menu-text">${item.label}</span>
    </div>
  `).join('');

  return `
    <div class="ubits-profile-menu" id="ubits-profile-menu">
      ${itemsHTML}
    </div>
  `;
}

/**
 * Inicializa los event listeners del TabBar
 */
function initTabBarListeners(
  tabBarElement: HTMLElement,
  items: TabBarItem[],
  onTabChange?: (tabId: string, item: TabBarItem, element: HTMLElement) => void,
  darkModeEnabled: boolean = false,
  onDarkModeToggle?: (isDark: boolean) => void,
  floatingMenuSections?: FloatingMenuSection[],
  profileMenuItems?: ProfileMenuItem[],
  onFloatingMenuItemClick?: (sectionId: string, subitemId?: string, url?: string) => void,
  onProfileMenuItemClick?: (itemId: string, item: ProfileMenuItem) => void,
  container?: HTMLElement
): void {
  const tabItems = tabBarElement.querySelectorAll('.ubits-tabbar-item');
  const tabBarContainer = container || tabBarElement.parentElement;
  const isPreview = tabBarContainer?.classList.contains('ubits-tabbar-preview-container');

  // Crear contenedores para Floating Menu y Profile Menu si no existen
  let floatingMenuContainer: HTMLElement | null = null;
  let profileMenuContainer: HTMLElement | null = null;

  if (floatingMenuSections && floatingMenuSections.length > 0) {
    floatingMenuContainer = document.getElementById('ubits-floating-menu-container') || document.createElement('div');
    floatingMenuContainer.id = 'ubits-floating-menu-container';
    if (isPreview) {
      floatingMenuContainer.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 76px; width: 100%; height: 500px; z-index: 2000; overflow: visible; display: none;';
    } else {
      floatingMenuContainer.style.cssText = '';
    }
    
    if (!document.getElementById('ubits-floating-menu-container')) {
      if (tabBarContainer) {
        tabBarContainer.appendChild(floatingMenuContainer);
      } else {
        document.body.appendChild(floatingMenuContainer);
      }
    }
    
    floatingMenuContainer.innerHTML = renderFloatingMenu(floatingMenuSections);
    initFloatingMenuListeners(floatingMenuContainer, onFloatingMenuItemClick);
  }

  if (profileMenuItems && profileMenuItems.length > 0) {
    profileMenuContainer = document.getElementById('ubits-profile-menu-container') || document.createElement('div');
    profileMenuContainer.id = 'ubits-profile-menu-container';
    if (isPreview) {
      // Contenedor igual que Floating Menu pero solo en bottom
      profileMenuContainer.style.cssText = 'position: absolute; bottom: 76px; left: 0; right: 0; width: 100%; max-width: 100%; z-index: 2001; overflow: visible; display: none;';
    } else {
      profileMenuContainer.style.cssText = '';
    }
    
    if (!document.getElementById('ubits-profile-menu-container')) {
      if (tabBarContainer) {
        tabBarContainer.appendChild(profileMenuContainer);
      } else {
        document.body.appendChild(profileMenuContainer);
      }
    }
    
    profileMenuContainer.innerHTML = renderProfileMenu(profileMenuItems);
    // Asegurar que el menú tenga la clase preview si estamos en modo preview - igual que Floating Menu
    if (isPreview) {
      const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
      if (profileMenu) {
        profileMenu.classList.add('ubits-profile-menu--preview');
        // El menú debe rellenar todo el contenedor con posición absoluta, igual que Floating Menu
        profileMenu.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;';
      }
    }
    initProfileMenuListeners(profileMenuContainer, profileMenuItems, onProfileMenuItemClick);
  }

  tabItems.forEach((tabItemElement) => {
    const itemElement = tabItemElement as HTMLElement;
    const tabId = itemElement.getAttribute('data-tab-id');
    if (!tabId) return;

    const item = items.find(i => i.id === tabId);
    if (!item) return;

    itemElement.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      // Si es modo oscuro y está habilitado
      if (tabId === 'modo-oscuro' && darkModeEnabled) {
        toggleDarkMode(tabBarElement, onDarkModeToggle);
        // Cerrar otros menús
        if (floatingMenuContainer) {
          floatingMenuContainer.style.display = 'none';
          const floatingMenu = floatingMenuContainer.querySelector('.ubits-floating-menu') as HTMLElement;
          if (floatingMenu) {
            floatingMenu.classList.remove('ubits-floating-menu--show');
          }
        }
        if (profileMenuContainer) {
          profileMenuContainer.style.display = 'none';
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
          if (profileMenu) {
            profileMenu.classList.remove('ubits-profile-menu--show');
          }
        }
        return;
      }

      // Si es módulos, toggle Floating Menu
      if (tabId === 'modulos' && floatingMenuContainer) {
        const floatingMenu = floatingMenuContainer.querySelector('.ubits-floating-menu') as HTMLElement;
        if (floatingMenu) {
          if (floatingMenu.classList.contains('ubits-floating-menu--show')) {
            floatingMenu.classList.remove('ubits-floating-menu--show');
          } else {
            floatingMenu.classList.add('ubits-floating-menu--show', 'ubits-floating-menu--preview');
            // Asegurar posicionamiento correcto en preview
            if (isPreview && floatingMenuContainer) {
              floatingMenuContainer.style.display = 'block';
              floatingMenuContainer.style.position = 'absolute';
              floatingMenuContainer.style.top = '0';
              floatingMenuContainer.style.left = '0';
              floatingMenuContainer.style.right = '0';
              floatingMenuContainer.style.bottom = '76px';
              floatingMenuContainer.style.width = '100%';
              floatingMenuContainer.style.height = '500px';
              floatingMenuContainer.style.zIndex = '2000';
              floatingMenuContainer.style.overflow = 'visible';
              // Asegurar estilos del menú interno
              floatingMenu.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; display: block;';
            }
            // Cerrar Profile Menu si está abierto
            if (profileMenuContainer) {
              const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
              if (profileMenu) {
                profileMenu.classList.remove('ubits-profile-menu--show');
              }
              profileMenuContainer.style.display = 'none';
            }
          }
        }
        return;
      }

      // Si es perfil, toggle Profile Menu
      if (tabId === 'perfil' && profileMenuContainer) {
        const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
        if (profileMenu) {
          if (profileMenu.classList.contains('ubits-profile-menu--show')) {
            profileMenu.classList.remove('ubits-profile-menu--show');
            profileMenuContainer.style.display = 'none';
          } else {
            profileMenu.classList.add('ubits-profile-menu--show');
            // Asegurar posicionamiento correcto en preview - igual que Floating Menu
            if (isPreview && profileMenuContainer) {
              profileMenuContainer.style.display = 'block';
              profileMenuContainer.style.position = 'absolute';
              profileMenuContainer.style.bottom = '76px';
              profileMenuContainer.style.left = '0';
              profileMenuContainer.style.right = '0';
              profileMenuContainer.style.width = '100%';
              profileMenuContainer.style.maxWidth = '100%';
              profileMenuContainer.style.zIndex = '2001';
              profileMenuContainer.style.overflow = 'visible';
              // Asegurar que el menú interno tenga el ancho completo y posición absoluta, igual que Floating Menu
              const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
              if (profileMenu) {
                profileMenu.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;';
                profileMenu.classList.add('ubits-profile-menu--preview');
              }
            }
            // Cerrar Floating Menu si está abierto
            if (floatingMenuContainer) {
              const floatingMenu = floatingMenuContainer.querySelector('.ubits-floating-menu') as HTMLElement;
              if (floatingMenu) {
                floatingMenu.classList.remove('ubits-floating-menu--show');
              }
            }
          }
        }
        return;
      }

      // Llamar callback del item si existe
      if (item.onClick) {
        item.onClick(item, event);
      }

      // Actualizar estado activo
      updateActiveTab(tabBarElement, tabId);

      // Llamar callback global
      if (onTabChange) {
        onTabChange(tabId, item, itemElement);
      }
    });
  });
}

/**
 * Inicializa listeners del Floating Menu
 */
function initFloatingMenuListeners(
  container: HTMLElement,
  onFloatingMenuItemClick?: (sectionId: string, subitemId?: string, url?: string) => void
): void {
  const floatingMenu = container.querySelector('.ubits-floating-menu') as HTMLElement;
  if (!floatingMenu) return;

  // Botón cerrar - usar el contenedor específico en lugar de buscar por ID global
  const closeButton = floatingMenu.querySelector('#ubits-floating-menu-close');
  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Cerrar desde el contenedor específico
      if (container) {
        container.style.display = 'none';
      }
      if (floatingMenu) {
        floatingMenu.classList.remove('ubits-floating-menu--show');
      }
    });
  }

  // Accordion headers
  const accordionHeaders = floatingMenu.querySelectorAll('.ubits-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionId = header.getAttribute('data-accordion-id');
      if (accordionId) {
        toggleAccordion(accordionId);
      }
    });
  });

  // Links (directos y subitems)
  const links = floatingMenu.querySelectorAll('.ubits-accordion-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const sectionId = link.getAttribute('data-section-id');
      const subitemId = link.getAttribute('data-subitem-id');
      const url = (link as HTMLElement).getAttribute('href');

      if (onFloatingMenuItemClick) {
        onFloatingMenuItemClick(sectionId || '', subitemId || undefined, url || undefined);
      }
    });
  });

  // Cerrar con ESC
  const escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && floatingMenu.classList.contains('ubits-floating-menu--show')) {
      container.style.display = 'none';
      floatingMenu.classList.remove('ubits-floating-menu--show');
    }
  };
  document.addEventListener('keydown', escHandler);

  // Cerrar al hacer click fuera
  const clickOutsideHandler = (e: MouseEvent) => {
    if (floatingMenu.classList.contains('ubits-floating-menu--show')) {
      const target = e.target as HTMLElement;
      if (!floatingMenu.contains(target) && !target.closest('[data-tab-id="modulos"]')) {
        container.style.display = 'none';
        floatingMenu.classList.remove('ubits-floating-menu--show');
      }
    }
  };
  document.addEventListener('click', clickOutsideHandler);
}

/**
 * Inicializa listeners del Profile Menu
 */
function initProfileMenuListeners(
  container: HTMLElement,
  items: ProfileMenuItem[],
  onProfileMenuItemClick?: (itemId: string, item: ProfileMenuItem) => void
): void {
  const profileMenu = container.querySelector('.ubits-profile-menu');
  if (!profileMenu) return;

  const menuItems = profileMenu.querySelectorAll('.ubits-profile-menu-item');
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', (e) => {
      const itemId = menuItem.getAttribute('data-profile-item-id');
      if (itemId) {
        const item = items.find(i => i.id === itemId);
        if (item) {
          // Si tiene onClick, ejecutarlo
          if (item.onClick) {
            item.onClick();
          }
          // Si tiene url y no tiene onClick, navegar directamente
          else if (item.url) {
            window.location.href = item.url;
          }
          // Llamar al callback si existe
          if (onProfileMenuItemClick) {
            onProfileMenuItemClick(itemId, item);
          }
          hideProfileMenu();
        }
      }
    });
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profileMenu.classList.contains('ubits-profile-menu--show')) {
      hideProfileMenu();
    }
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (profileMenu.classList.contains('ubits-profile-menu--show')) {
      const target = e.target as HTMLElement;
      if (!profileMenu.contains(target) && !target.closest('[data-tab-id="perfil"]')) {
        hideProfileMenu();
      }
    }
  });
}

/**
 * Muestra el Floating Menu
 */
function showFloatingMenu(): void {
  const floatingMenu = document.getElementById('ubits-floating-menu');
  if (floatingMenu) {
    floatingMenu.classList.add('ubits-floating-menu--show');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Oculta el Floating Menu
 */
function hideFloatingMenu(): void {
  const floatingMenu = document.getElementById('ubits-floating-menu');
  if (floatingMenu) {
    floatingMenu.classList.remove('ubits-floating-menu--show');
    document.body.style.overflow = '';
  }
}

/**
 * Muestra el Profile Menu
 */
function showProfileMenu(container: HTMLElement): void {
  const profileMenu = container.querySelector('.ubits-profile-menu');
  if (profileMenu) {
    profileMenu.classList.add('ubits-profile-menu--show');
  }
}

/**
 * Oculta el Profile Menu
 */
function hideProfileMenu(): void {
  const profileMenu = document.getElementById('ubits-profile-menu');
  if (profileMenu) {
    profileMenu.classList.remove('ubits-profile-menu--show');
  }
}

/**
 * Toggle de accordion
 */
function toggleAccordion(sectionId: string): void {
  const body = document.querySelector(`[data-body-id="${sectionId}"]`) as HTMLElement;
  const chevron = document.querySelector(`[data-chevron-id="${sectionId}"]`) as HTMLElement;
  const circle = document.querySelector(`[data-circle-id="${sectionId}"]`) as HTMLElement;
  const title = document.querySelector(`[data-accordion-id="${sectionId}"] .ubits-accordion-title`) as HTMLElement;

  if (!body || !chevron || !circle || !title) return;

  const isCurrentlyOpen = body.style.display === 'block';

  // Cerrar todos los accordions primero
  closeAllAccordions();

  if (!isCurrentlyOpen) {
    // Abrir solo este accordion
    body.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
    title.classList.add('active');
    circle.classList.add('active');
  }
}

/**
 * Cierra todos los accordions
 */
function closeAllAccordions(): void {
  const allBodies = document.querySelectorAll('.ubits-accordion-body');
  const allChevrons = document.querySelectorAll('.ubits-accordion-chevron');
  const allCircles = document.querySelectorAll('.ubits-accordion-icon-circle');
  const allTitles = document.querySelectorAll('.ubits-accordion-title');

  allBodies.forEach(body => {
    (body as HTMLElement).style.display = 'none';
  });

  allChevrons.forEach(chevron => {
    (chevron as HTMLElement).style.transform = 'rotate(0deg)';
  });

  allCircles.forEach(circle => {
    circle.classList.remove('active');
    const icon = circle.querySelector('i');
    if (icon) icon.classList.remove('active');
  });

  allTitles.forEach(title => {
    title.classList.remove('active');
  });
}

/**
 * Actualiza el tab activo
 */
function updateActiveTab(tabBarElement: HTMLElement, activeTabId: string): void {
  const allTabs = tabBarElement.querySelectorAll('.ubits-tabbar-item');
  allTabs.forEach(tab => {
    const tabId = tab.getAttribute('data-tab-id');
    if (tabId === activeTabId) {
      tab.classList.add('ubits-tabbar-item--active');
    } else {
      tab.classList.remove('ubits-tabbar-item--active');
    }
  });
}

/**
 * Toggle de dark mode
 */
function toggleDarkMode(
  tabBarElement: HTMLElement,
  onDarkModeToggle?: (isDark: boolean) => void
): void {
  // Buscar el contenedor padre (puede ser el preview container)
  let themeContainer: HTMLElement | null = tabBarElement.closest('[data-theme]');
  if (!themeContainer) {
    // Si no hay contenedor con data-theme, buscar el body o documentElement
    themeContainer = document.body;
  }

  const currentTheme = themeContainer.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  themeContainer.setAttribute('data-theme', newTheme);
  
  if (onDarkModeToggle) {
    onDarkModeToggle(newTheme === 'dark');
  }
}

