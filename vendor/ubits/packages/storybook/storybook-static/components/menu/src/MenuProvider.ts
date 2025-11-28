/**
 * MenuProvider
 * Lógica de renderizado del componente Menu
 * Genera HTML según las opciones proporcionadas usando tokens y tipografía UBITS
 */

import type { MenuOptions, MenuSection, MenuItem, MenuBadge } from './types/MenuOptions';
import { renderBadge } from '../../badge/src/BadgeProvider';
import type { BadgeOptions } from '../../badge/src/types/BadgeOptions';
import './styles/menu.css';
// Importar estilos del Badge para que se carguen
import '../../badge/src/styles/badge.css';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

// Renderizar badge usando el componente Badge de UBITS
function renderMenuBadge(badge: MenuBadge): string {
  const badgeOptions: BadgeOptions = {
    content: typeof badge.content === 'number' ? String(badge.content) : badge.content,
    variant: badge.variant || 'error', // Cambiar de 'primary' a 'error' (primary ya no existe)
    type: 'number',
    size: 'sm',
    style: 'light', // Usar style light para badges en menu
  };
  return renderBadge(badgeOptions);
}

// Renderizar item del menú
function renderMenuItem(item: MenuItem, sectionId: string): string {
  const classes = [
    'ubits-menu-item',
    item.active && 'ubits-menu-item--active',
    item.disabled && 'ubits-menu-item--disabled'
  ].filter(Boolean).join(' ');

  const iconHTML = item.icon ? renderIconHelper(item.icon, item.iconStyle) : '';
  // Ya no renderizamos shortcuts, solo badges
  const badgeHTML = item.badge ? renderMenuBadge(item.badge) : '';
  
  const rightContent = badgeHTML;
  
  const onClickAttr = item.onClick ? 'data-has-click-handler="true"' : '';
  const hrefAttr = item.href ? `data-href="${item.href}"` : '';
  const disabledAttr = item.disabled ? 'disabled' : '';

  return `
    <button 
      class="${classes}" 
      data-item-id="${item.id}"
      data-section-id="${sectionId}"
      ${onClickAttr}
      ${hrefAttr}
      ${disabledAttr}
    >
      ${iconHTML ? `<span class="ubits-menu-item-icon">${iconHTML}</span>` : ''}
      <span class="ubits-menu-item-label">${item.label}</span>
      ${rightContent ? `<span class="ubits-menu-item-right">${rightContent}</span>` : ''}
    </button>
  `;
}

// Renderizar sección del menú
function renderSection(section: MenuSection): string {
  return `
    <div class="ubits-menu-section" data-section-id="${section.id}">
      <h3 class="ubits-menu-section-title">${section.title}</h3>
      <div class="ubits-menu-section-items">
        ${section.items.map(item => renderMenuItem(item, section.id)).join('')}
      </div>
    </div>
  `;
}

// Renderizar información del usuario
function renderUserInfo(userInfo: MenuOptions['userInfo']): string {
  if (!userInfo) return '';
  
  const onClickAttr = userInfo.onAvatarClick ? 'data-has-click-handler="true"' : '';
  
  return `
    <div class="ubits-menu-user-info">
      <div class="ubits-menu-user-avatar" ${onClickAttr}>
        <img src="${userInfo.avatarImage}" alt="${userInfo.name}" />
      </div>
      <div class="ubits-menu-user-details">
        <div class="ubits-menu-user-name">${userInfo.name}</div>
        <div class="ubits-menu-user-role">${userInfo.role}</div>
      </div>
    </div>
  `;
}

/**
 * Renderiza el menú UBITS como HTML string
 */
export function renderMenu(options: MenuOptions): string {
  const {
    logoImage,
    appName,
    logoHref,
    sections,
    userInfo,
    width,
    className = '',
    attributes = {}
  } = options;

  const containerClasses = ['ubits-menu', className].filter(Boolean).join(' ');
  const containerAttrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const widthStyle = width ? `width: ${typeof width === 'number' ? `${width}px` : width};` : '';

  const logoHTML = logoImage ? `
    <div class="ubits-menu-header">
      <div class="ubits-menu-logo" ${logoHref ? `data-href="${logoHref}"` : ''}>
        <img src="${logoImage}" alt="${appName || 'Logo'}" />
      </div>
      ${appName ? `<div class="ubits-menu-app-name">${appName}</div>` : ''}
    </div>
  ` : '';

  const sectionsHTML = sections.map(section => renderSection(section)).join('');
  const userInfoHTML = renderUserInfo(userInfo);

  return `
    <aside class="${containerClasses}" ${containerAttrs} style="${widthStyle}">
      ${logoHTML}
      <div class="ubits-menu-body">
        ${sectionsHTML}
      </div>
      ${userInfoHTML}
    </aside>
  `.trim();
}

/**
 * Inicializa los event listeners del menú
 */
function initMenuEvents(menuElement: HTMLElement, options: MenuOptions): void {
  // Click en logo
  const logoElement = menuElement.querySelector('.ubits-menu-logo');
  if (logoElement && options.logoHref) {
    logoElement.addEventListener('click', () => {
      window.location.href = options.logoHref!;
    });
  }

  // Click en items del menú
  const menuItems = menuElement.querySelectorAll('.ubits-menu-item');
  menuItems.forEach((itemElement) => {
    const itemId = itemElement.getAttribute('data-item-id');
    const sectionId = itemElement.getAttribute('data-section-id');
    
    if (!itemId || !sectionId) return;

    // Encontrar el item en las secciones
    const section = options.sections.find(s => s.id === sectionId);
    const item = section?.items.find(i => i.id === itemId);
    
    if (!item) return;

    itemElement.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (item.disabled) return;

      // Remover active de todos los items
      menuItems.forEach(btn => btn.classList.remove('ubits-menu-item--active'));
      
      // Agregar active al item clickeado
      itemElement.classList.add('ubits-menu-item--active');

      // Llamar callback si existe
      if (options.onActiveItemChange) {
        options.onActiveItemChange(itemId, sectionId);
      }

      // Ejecutar onClick o href
      if (item.onClick) {
        item.onClick(e as MouseEvent, item);
      } else if (item.href) {
        window.location.href = item.href;
      }
    });
  });

  // Click en avatar del usuario
  const avatarElement = menuElement.querySelector('.ubits-menu-user-avatar');
  if (avatarElement && options.userInfo?.onAvatarClick) {
    avatarElement.addEventListener('click', (e) => {
      e.preventDefault();
      options.userInfo!.onAvatarClick!();
    });
  }
}

/**
 * Crea un menú interactivo en el DOM
 */
export function createMenu(options: MenuOptions): HTMLElement {
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

  const menuHTML = renderMenu(options);
  container.innerHTML = menuHTML;

  const menuElement = container.querySelector('.ubits-menu') as HTMLElement;
  if (!menuElement) {
    throw new Error('Failed to create menu element');
  }

  // Inicializar eventos
  initMenuEvents(menuElement, options);

  return menuElement;
}

/**
 * Actualiza el item activo del menú
 */
export function updateActiveMenuItem(containerId: string, itemId: string, sectionId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const menuElement = container.querySelector('.ubits-menu');
  if (!menuElement) return;

  // Remover active de todos los items
  const allItems = menuElement.querySelectorAll('.ubits-menu-item');
  allItems.forEach(item => item.classList.remove('ubits-menu-item--active'));

  // Agregar active al item especificado
  const targetItem = menuElement.querySelector(`[data-item-id="${itemId}"][data-section-id="${sectionId}"]`);
  if (targetItem) {
    targetItem.classList.add('ubits-menu-item--active');
  }
}

