/**
 * TabBarProvider
 * Lógica de renderizado y gestión del componente TabBar
 * Incluye items personalizables, estados, dark mode toggle,
 * Floating Menu (accordions) y Profile Menu
 */

import type { TabBarOptions, TabBarItem, FloatingMenuSection, ProfileMenuItem, TreeMenuItem } from './types/TabBarOptions';
import './styles/tabbar.css';

// Helper para renderizar iconos
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

// Helper para convertir hex a rgb para comparación
function hexToRgb(hex: string): string | null {
  if (!hex) return null;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
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
  const treeMenuSize = options.treeMenuSize || 'md';
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
    container,
    treeMenuSize
  );

  return tabBarElement as HTMLElement;
}

/**
 * Renderiza un nodo del TreeMenu usando la estructura del componente TreeMenu de Storybook
 */
function renderTreeNode(
  item: FloatingMenuSection | TreeMenuItem,
  level: number = 0,
  size: 'xs' | 'sm' | 'md' | 'lg' = 'md',
  uniqueId: string = 'floating-menu'
): string {
  // Soportar tanto children (tree menu) como subitems (legacy)
  const hasChildren = (item.children && item.children.length > 0) || (item as FloatingMenuSection).subitems?.length > 0;
  const isLink = (item as FloatingMenuSection).isLink || (!hasChildren && item.url);
  
  const nodeId = `${uniqueId}-node-${level}-${item.id}`;
  const cascade = false; // Modo vertical sin indentación
  
  // Calcular valores según tamaño (matching TreeMenu Storybook)
  const padding = size === 'xs' ? '8px 12px' : size === 'sm' ? '10px 14px' : size === 'lg' ? '16px 20px' : '12px 16px';
  const minHeight = size === 'xs' ? '28px' : size === 'sm' ? '32px' : size === 'lg' ? '48px' : '40px';
  const fontSize = size === 'xs' ? 'var(--font-body-xs-size, 11px)' : size === 'sm' ? 'var(--font-body-sm-size, 13px)' : size === 'lg' ? 'var(--font-body-lg-size, 20px)' : 'var(--font-body-md-size, 16px)';
  const lineHeight = size === 'xs' ? 'var(--font-body-xs-line, 16.5px)' : size === 'sm' ? 'var(--font-body-sm-line, 19.5px)' : size === 'lg' ? 'var(--font-body-lg-line, 30px)' : 'var(--font-body-md-line, 24px)';
  const iconSize = size === 'xs' ? '12px' : size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px';
  const chevronSize = size === 'xs' ? '10px' : size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px';
  
  // Clases de tipografía según tamaño
  const typographyClass = size === 'xs'
    ? 'ubits-body-xs-regular'
    : size === 'sm' 
    ? 'ubits-body-sm-regular' 
    : size === 'lg' 
    ? 'ubits-body-lg-regular' 
    : 'ubits-body-md-regular';
  
  // Si es un enlace directo (sin hijos)
  if (isLink) {
    const iconHTML = level === 0 && item.icon ? `
      <span class="ubits-tree-node__icon" style="font-size: ${iconSize};">
        ${renderIconHelper(item.icon)}
      </span>
    ` : '';
    
    return `
      <div class="ubits-tree-node ubits-tree-node--vertical" data-level="${level}">
        <a 
          href="${item.url || '#'}" 
          class="ubits-tree-node__content" 
          data-section-id="${item.id}"
          data-size="${size}"
          style="min-height: ${minHeight} !important; padding: ${padding} !important; font-size: ${fontSize} !important; line-height: ${lineHeight} !important; margin: 0 !important; border: none !important; text-decoration: none; display: flex; align-items: center; gap: var(--ubits-spacing-sm, 8px);"
          role="treeitem"
          aria-label="${item.title}"
        >
          <span class="ubits-tree-node__chevron" style="width: 0; height: 0; display: none;"></span>
          ${iconHTML}
          <span class="ubits-tree-node__label ${typographyClass}" style="line-height: ${lineHeight};">${item.title}</span>
        </a>
      </div>
    `;
  }
  
  // Si tiene hijos, renderizar como nodo expandible
  const children: Array<{ id: string; title: string; icon: string; url?: string; children?: TreeMenuItem[] }> = 
    item.children || 
    (item as FloatingMenuSection).subitems?.map(sub => ({
      id: sub.id,
      title: sub.title,
      icon: sub.icon,
      url: sub.url,
      children: undefined
    })) || [];
  
  const childrenHTML = children.map(child => renderTreeNode(child, level + 1, size, uniqueId)).join('');
  const iconHTML = level === 0 && item.icon ? `
    <span class="ubits-tree-node__icon" style="font-size: ${iconSize};">
      ${renderIconHelper(item.icon)}
    </span>
  ` : '';
  
  return `
    <div class="ubits-tree-node ubits-tree-node--vertical" data-level="${level}">
      <div 
        class="ubits-tree-node__content ubits-tree-node__content--expandable" 
        data-node-id="${nodeId}"
        data-size="${size}"
        data-expanded="false"
        style="min-height: ${minHeight} !important; padding: ${padding} !important; font-size: ${fontSize} !important; line-height: ${lineHeight} !important; margin: 0 !important; border: none !important; cursor: pointer; display: flex; align-items: center; gap: var(--ubits-spacing-sm, 8px);"
        role="button"
        tabindex="0"
        aria-expanded="false"
        aria-label="${item.title}"
      >
        <span class="ubits-tree-node__chevron" style="width: ${chevronSize}; height: ${chevronSize};">
          <i class="far fa-chevron-right" style="font-size: ${chevronSize};"></i>
        </span>
        ${iconHTML}
        <span class="ubits-tree-node__label ${typographyClass}" style="line-height: ${lineHeight};">${item.title}</span>
      </div>
      <div class="ubits-tree-node__children ubits-tree-node__children--vertical" data-children-id="${nodeId}" style="display: none;">
        ${childrenHTML}
      </div>
    </div>
  `;
}

/**
 * Renderiza el Floating Menu usando el componente TreeMenu de Storybook
 */
function renderFloatingMenu(sections: FloatingMenuSection[], size: 'xs' | 'sm' | 'md' | 'lg' = 'md'): string {
  const uniqueId = `floating-menu-${Date.now()}`;
  const treeHTML = sections.map(section => renderTreeNode(section, 0, size, uniqueId)).join('');

  return `
    <div class="ubits-floating-menu" id="ubits-floating-menu">
      <div class="ubits-floating-menu-header">
        <h2 class="ubits-floating-menu-title">Módulos</h2>
        <button class="ubits-floating-menu-close" id="ubits-floating-menu-close">
          ${renderIconHelper('times')}
        </button>
      </div>
      <div class="ubits-floating-menu-content">
        <div class="ubits-tree-menu ubits-tree-menu--vertical" role="tree">
          ${treeHTML}
        </div>
      </div>
    </div>
  `;
}

/**
 * Renderiza un item del Profile Menu Tree recursivamente
 */
function renderProfileTreeMenuItem(item: ProfileMenuItem, level: number = 0, size: 'xs' | 'sm' | 'md' | 'lg' = 'md'): string {
  const hasChildren = item.children && item.children.length > 0;
  const indent = level * 24; // 24px de indentación por nivel
  const sizeClass = `ubits-profile-tree-${hasChildren ? 'header' : 'link'}--${size}`;
  
  // Si no tiene hijos, renderizar como enlace simple
  // Solo mostrar icono en level 0 (items principales), no en sub-items
  const iconHTML = level === 0 ? `<i class="far fa-${item.icon} ubits-profile-tree-icon"></i>` : '';
  if (!hasChildren) {
    return `
      <div class="ubits-profile-tree-item" data-profile-item-id="${item.id}" data-tree-level="${level}" style="padding-left: ${indent}px;">
        <a href="${item.url || '#'}" class="ubits-profile-tree-link ${sizeClass}" ${item.onClick ? 'data-has-onclick="true"' : ''}>
          ${iconHTML}
          <span class="ubits-profile-tree-text">${item.label}</span>
        </a>
      </div>
    `;
  }
  
  // Si tiene hijos, renderizar como nodo expandible
  const childrenHTML = item.children!.map(child => renderProfileTreeMenuItem(child, level + 1, size)).join('');
  
  return `
    <div class="ubits-profile-tree-item" data-profile-item-id="${item.id}" data-tree-level="${level}" style="padding-left: ${indent}px;">
      <div class="ubits-profile-tree-node" data-tree-node-id="${item.id}">
        <div class="ubits-profile-tree-header ${sizeClass}">
          ${iconHTML}
          <span class="ubits-profile-tree-text">${item.label}</span>
          <i class="far fa-chevron-down ubits-profile-tree-chevron" data-chevron-id="${item.id}"></i>
        </div>
        <div class="ubits-profile-tree-children" data-tree-children-id="${item.id}" style="display: none;">
          ${childrenHTML}
        </div>
      </div>
    </div>
  `;
}

/**
 * Renderiza el Profile Menu como Tree Menu
 */
function renderProfileMenu(items: ProfileMenuItem[], size: 'xs' | 'sm' | 'md' | 'lg' = 'md'): string {
  const itemsHTML = items.map(item => renderProfileTreeMenuItem(item, 0, size)).join('');

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
  container?: HTMLElement,
  treeMenuSize: 'xs' | 'sm' | 'md' | 'lg' = 'md'
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
      floatingMenuContainer.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 68px; width: 100%; height: 500px; z-index: 2000; overflow: visible; display: none;'; // 60px (TabBar) + 8px (espacio)
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
    
    const floatingMenuHTML = renderFloatingMenu(floatingMenuSections, treeMenuSize);
    floatingMenuContainer.innerHTML = floatingMenuHTML;
    initFloatingMenuListeners(floatingMenuContainer, onFloatingMenuItemClick);
  }

  if (profileMenuItems && profileMenuItems.length > 0) {
    profileMenuContainer = document.getElementById('ubits-profile-menu-container') || document.createElement('div');
    profileMenuContainer.id = 'ubits-profile-menu-container';
    if (isPreview) {
      // Contenedor igual que Floating Menu pero solo en bottom
      profileMenuContainer.style.cssText = 'position: absolute; bottom: 68px; left: 0; right: 0; width: 100%; max-width: 100%; z-index: 2001; overflow: visible; display: none;'; // 60px (TabBar) + 8px (espacio)
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
    
      const profileMenuHTML = renderProfileMenu(profileMenuItems, treeMenuSize);
      profileMenuContainer.innerHTML = profileMenuHTML;
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
            floatingMenu.classList.add('ubits-floating-menu--show');
            // Asegurar posicionamiento correcto en preview
            if (isPreview && floatingMenuContainer) {
              floatingMenu.classList.add('ubits-floating-menu--preview');
              
              // Calcular posición relativa al contenedor padre
              const tabBarRect = tabBarElement.getBoundingClientRect();
              const containerRect = container ? container.getBoundingClientRect() : { top: 0, bottom: 0 };
              const tabBarHeight = 60;
              const spaceBetween = 8; // Espacio entre TabBar y menú
              
              // Calcular la posición del TabBar relativa al contenedor padre
              const tabBarTopRelative = tabBarRect.top - containerRect.top;
              const containerBottom = tabBarTopRelative - spaceBetween;
              
              // Configurar contenedor
              floatingMenuContainer.style.display = 'block';
              floatingMenuContainer.style.position = 'absolute';
              floatingMenuContainer.style.top = '0';
              floatingMenuContainer.style.left = '0';
              floatingMenuContainer.style.right = '0';
              floatingMenuContainer.style.bottom = `${tabBarHeight + spaceBetween}px`; // 60px (altura TabBar) + 8px (espacio)
              floatingMenuContainer.style.width = '100%';
              floatingMenuContainer.style.height = '';
              floatingMenuContainer.style.zIndex = '2000';
              floatingMenuContainer.style.overflow = 'visible';
              floatingMenuContainer.style.boxSizing = 'border-box';
              
              // Asegurar estilos del menú interno - EXACTAMENTE igual que Profile Menu (sin !important en inline)
              // El menú debe respetar la altura del contenedor usando bottom: 0, no height explícito
              // El padding del menú (8px 0) no debe afectar la altura total
              floatingMenu.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; max-width: 100%; display: block; box-sizing: border-box;';
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
              const tabBarRect = tabBarElement.getBoundingClientRect();
              profileMenuContainer.style.display = 'block';
              profileMenuContainer.style.position = 'absolute';
              profileMenuContainer.style.bottom = '68px'; // 60px (altura TabBar) + 8px (espacio)
              profileMenuContainer.style.left = '0';
              profileMenuContainer.style.right = '0';
              profileMenuContainer.style.width = '100%';
              profileMenuContainer.style.maxWidth = '100%';
              profileMenuContainer.style.zIndex = '2001';
              profileMenuContainer.style.overflow = 'visible';
              // Asegurar que el menú interno tenga el ancho completo y posición absoluta, igual que Floating Menu
              const profileMenuInner = profileMenuContainer.querySelector('.ubits-profile-menu') as HTMLElement;
              if (profileMenuInner) {
                profileMenuInner.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; width: 100%; max-width: 100%; display: block;';
                profileMenuInner.classList.add('ubits-profile-menu--preview');
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

  // Un solo event listener para todo el tree menu (como en Storybook)
  const treeElement = floatingMenu.querySelector('.ubits-tree-menu');
  if (treeElement) {
    treeElement.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const content = target.closest('.ubits-tree-node__content') as HTMLElement;
      
      if (!content) return;
      
      // Manejar expandir/colapsar para nodos con hijos
      if (content.classList.contains('ubits-tree-node__content--expandable')) {
        const nodeId = content.getAttribute('data-node-id');
        const children = treeElement.querySelector(`[data-children-id="${nodeId}"]`) as HTMLElement;
        const chevron = content.querySelector('.ubits-tree-node__chevron i') as HTMLElement;
        const isExpanded = content.getAttribute('data-expanded') === 'true';
        
        if (children) {
          if (isExpanded) {
            children.style.display = 'none';
            content.setAttribute('data-expanded', 'false');
            content.setAttribute('aria-expanded', 'false');
            if (chevron) {
              chevron.className = 'far fa-chevron-right';
            }
          } else {
            children.style.display = 'block';
            content.setAttribute('data-expanded', 'true');
            content.setAttribute('aria-expanded', 'true');
            if (chevron) {
              chevron.className = 'far fa-chevron-down';
            }
          }
        }
      }
      
      // Manejar selección (active state) para TODOS los nodos (expandibles y links)
      // Remover active de todos los nodos
      const allContents = treeElement.querySelectorAll('.ubits-tree-node__content');
      allContents.forEach((node) => {
        (node as HTMLElement).classList.remove('ubits-tree-node__content--active');
        (node as HTMLElement).removeAttribute('aria-selected');
      });
      
      // Agregar active al nodo clickeado
      content.classList.add('ubits-tree-node__content--active');
      content.setAttribute('aria-selected', 'true');
      
      // Si es un link directo (no expandible), ejecutar callback
      if (!content.classList.contains('ubits-tree-node__content--expandable')) {
        const sectionId = content.getAttribute('data-section-id');
        const url = content.getAttribute('href');
        
        if (onFloatingMenuItemClick && sectionId) {
          onFloatingMenuItemClick(sectionId, undefined, url || undefined);
        }
      }
    });
    
    // Soporte para teclado
    treeElement.addEventListener('keydown', (e) => {
      const target = e.target as HTMLElement;
      const content = target.closest('.ubits-tree-node__content') as HTMLElement;
      
      if (!content) return;
      
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        content.click();
      }
    });
  }

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

  // Tree menu nodes (expandible/collapsible)
  const treeNodes = profileMenu.querySelectorAll('.ubits-profile-tree-node');
  treeNodes.forEach(node => {
    const header = node.querySelector('.ubits-profile-tree-header') as HTMLElement;
    if (header) {
      header.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const nodeId = node.getAttribute('data-tree-node-id');
        if (nodeId) {
          toggleProfileTreeMenuNode(profileMenu, nodeId);
        }
      });
    }
  });

  // Tree menu links (enlaces directos)
  const links = profileMenu.querySelectorAll('.ubits-profile-tree-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const itemId = link.closest('[data-profile-item-id]')?.getAttribute('data-profile-item-id');
      
      // Remover active de todos los links del profile menu
      profileMenu.querySelectorAll('.ubits-profile-tree-link').forEach(l => {
        (l as HTMLElement).classList.remove('ubits-profile-tree-link--active');
      });
      
      // Agregar active al link clickeado
      (link as HTMLElement).classList.add('ubits-profile-tree-link--active');
      
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
 * Toggle de profile tree menu node (expandir/colapsar)
 */
function toggleProfileTreeMenuNode(container: HTMLElement, nodeId: string): void {
  const children = container.querySelector(`[data-tree-children-id="${nodeId}"]`) as HTMLElement;
  const chevron = container.querySelector(`[data-chevron-id="${nodeId}"]`) as HTMLElement;
  const header = container.querySelector(`[data-tree-node-id="${nodeId}"] .ubits-profile-tree-header`) as HTMLElement;

  if (!children || !chevron) {
    console.warn(`Profile tree menu node not found: ${nodeId}`, { children: !!children, chevron: !!chevron });
    return;
  }

  // Verificar si está abierto (puede estar en display: none o display: block)
  const computedStyle = window.getComputedStyle(children);
  const isCurrentlyOpen = computedStyle.display !== 'none';

  if (isCurrentlyOpen) {
    // Cerrar
    children.style.display = 'none';
    chevron.style.transform = 'rotate(0deg)';
    if (header) header.classList.remove('ubits-profile-tree-header--active');
  } else {
    // Abrir
    children.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
    if (header) header.classList.add('ubits-profile-tree-header--active');
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
 * Toggle de tree menu node (expandir/colapsar) usando la estructura del TreeMenu de Storybook
 */
function toggleTreeMenuNode(container: HTMLElement, nodeId: string): void {
  const content = container.querySelector(`[data-node-id="${nodeId}"]`) as HTMLElement;
  const children = container.querySelector(`[data-children-id="${nodeId}"]`) as HTMLElement;
  const chevronIcon = content?.querySelector('.ubits-tree-node__chevron i') as HTMLElement;

  if (!children || !content) {
    console.warn(`[toggleTreeMenuNode] Tree menu node not found: ${nodeId}`, { 
      children: !!children, 
      chevronIcon: !!chevronIcon
    });
    return;
  }

  // Verificar si está abierto (puede estar en display: none o display: block)
  const computedStyle = window.getComputedStyle(children);
  const isCurrentlyOpen = computedStyle.display !== 'none';

  if (isCurrentlyOpen) {
    // Cerrar
    children.style.display = 'none';
    content.setAttribute('data-expanded', 'false');
    content.setAttribute('aria-expanded', 'false');
    if (chevronIcon) {
      chevronIcon.classList.remove('fa-chevron-down');
      chevronIcon.classList.add('fa-chevron-right');
    }
  } else {
    // Abrir
    children.style.display = 'block';
    content.setAttribute('data-expanded', 'true');
    content.setAttribute('aria-expanded', 'true');
    if (chevronIcon) {
      chevronIcon.classList.remove('fa-chevron-right');
      chevronIcon.classList.add('fa-chevron-down');
    }
  }
}

/**
 * Toggle de accordion (mantener para compatibilidad)
 * @deprecated Usar toggleTreeMenuNode en su lugar
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
 * @deprecated Ya no se usa con tree menu
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

