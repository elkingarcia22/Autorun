/**
 * SubNavProvider
 * Lógica de renderizado y gestión del componente SubNav
 * Incluye variantes, tabs y navegación
 */

import type { SubNavOptions, SubNavTab } from './types/SubNavOptions';
import { getSubNavConfig } from './configs/subNavVariants';
import './styles/subnav.css';

// Helper para renderizar iconos (compatible con FontAwesome)
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza el HTML del SubNav
 */
export function renderSubNav(options: SubNavOptions): string {
  const {
    variant = 'template',
    tabs: customTabs,
    activeTabId
  } = options;

  // Obtener configuración de la variante o usar tabs personalizados
  const config = getSubNavConfig(variant);
  const tabs = (variant === 'template' && customTabs && customTabs.length > 0) 
    ? customTabs 
    : config.tabs;

  // Determinar tab activo
  const activeId = activeTabId || (tabs.length > 0 ? tabs[0].id : '');

  // Renderizar tabs normales
  const tabsHTML = tabs.map(tab => {
    const isActive = tab.id === activeId || tab.active;
    const activeClass = isActive ? 'ubits-sub-nav-tab--active' : '';
    
    return `
      <button 
        class="ubits-sub-nav-tab ${activeClass}" 
        data-tab="${tab.id}"
        ${tab.url ? `data-url="${tab.url}"` : ''}
        ${tab.onClick ? 'data-has-click-handler="true"' : ''}
      >
        ${renderIconHelper(tab.icon)}
        <span>${tab.label}</span>
      </button>
    `;
  }).join('');

  return `
    <nav class="ubits-sub-nav" data-variant="${variant}">
      <div class="ubits-sub-nav-tabs">
        ${tabsHTML}
      </div>
    </nav>
  `.trim();
}

/**
 * Inicializa los event listeners de los tabs
 */
function initTabListeners(subNavElement: HTMLElement, options: SubNavOptions): void {
  const tabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
  
  const handleTabClick = (tabElement: HTMLElement) => {
    const tabId = tabElement.getAttribute('data-tab');
    const url = tabElement.getAttribute('data-url');
    
    // Remover active de todos los tabs
    tabs.forEach(t => t.classList.remove('ubits-sub-nav-tab--active'));
    
    // Agregar active al tab clickeado
    tabElement.classList.add('ubits-sub-nav-tab--active');
    
    // Navegar a URL si existe
    if (url) {
      window.location.href = url;
      return;
    }
    
    // Buscar el callback onClick del tab original
    const config = getSubNavConfig(options.variant || 'template');
    const allTabs = (options.variant === 'template' && options.tabs && options.tabs.length > 0)
      ? options.tabs
      : config.tabs;
    const tabConfig = allTabs.find(t => t.id === tabId);
    
    if (tabConfig && tabConfig.onClick) {
      tabConfig.onClick(new MouseEvent('click'));
    }
    
    // Llamar callback si existe
    if (options.onTabChange) {
      options.onTabChange(tabId || '', tabElement);
    }
    
    // Disparar evento personalizado
    const event = new CustomEvent('subNavTabClick', {
      detail: { tabId: tabId, tabElement: tabElement }
    });
    document.dispatchEvent(event);
  };

  // Event listeners para tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      handleTabClick(tab as HTMLElement);
    });
  });
}

/**
 * Crea un SubNav interactivo en el DOM
 */
export function createSubNav(options: SubNavOptions): HTMLElement {
  const { containerId } = options;

  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id "${containerId}" not found`);
  }

  const subNavHTML = renderSubNav(options);
  container.innerHTML = subNavHTML;

  const subNavElement = container.querySelector('.ubits-sub-nav') as HTMLElement;
  if (!subNavElement) {
    throw new Error('Failed to create sub-nav element');
  }

  // Inicializar funcionalidades
  initTabListeners(subNavElement, options);

  return subNavElement;
}

/**
 * Actualiza el tab activo del SubNav
 */
export function updateActiveSubNavTab(containerId: string, tabId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const subNavElement = container.querySelector('.ubits-sub-nav');
  if (!subNavElement) return;

  const tabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');

  // Remover active de todos
  tabs.forEach(t => t.classList.remove('ubits-sub-nav-tab--active'));

  // Agregar active al tab especificado
  const targetTab = subNavElement.querySelector(`.ubits-sub-nav-tab[data-tab="${tabId}"]`);

  if (targetTab) {
    targetTab.classList.add('ubits-sub-nav-tab--active');
  }
}

