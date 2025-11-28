/**
 * SidebarProvider
 * Lógica de renderizado y gestión del componente Sidebar
 * Incluye variantes default/admin, tooltips, menú de perfil, dark mode toggle
 */

import type { SidebarOptions, SidebarButton, SidebarFooterButton, ProfileMenuItem } from './types/SidebarOptions';
import './styles/sidebar.css';

// Helper para renderizar iconos
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

// Función para ajustar la altura del sidebar dinámicamente
function adjustSidebarHeight(sidebarElement: HTMLElement): void {
  const windowHeight = window.innerHeight;
  const topMargin = 16;
  const bottomMargin = 16;
  const availableHeight = windowHeight - topMargin - bottomMargin;
  const minHeight = 578;
  const sidebarHeight = Math.max(minHeight, availableHeight);
  
  sidebarElement.style.height = `${sidebarHeight}px`;
  sidebarElement.style.top = `${topMargin}px`;
}

/**
 * Renderiza el HTML del sidebar
 */
export function renderSidebar(options: SidebarOptions): string {
  const {
    variant = 'colaborador',
    bodyButtons,
    footerButtons = [],
    logoHref,
    logoImage = 'images/Ubits-logo.svg',
    profileMenuItems = [],
    avatarImage = 'images/Profile-image.jpg',
    darkModeEnabled = true,
    className = '',
    attributes = {}
  } = options;

  const defaultLogoHref = variant === 'admin' ? 'admin.html' : 'index.html';
  const finalLogoHref = logoHref || defaultLogoHref;

  const containerClasses = ['ubits-sidebar', className].filter(Boolean).join(' ');
  const containerAttrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  // Renderizar botones del body
  const bodyButtonsHTML = bodyButtons.map(button => {
    const buttonClasses = [
      'ubits-sidebar-nav-button',
      button.state === 'active' ? 'active' : '',
      button.state === 'disabled' ? 'disabled' : ''
    ].filter(Boolean).join(' ');

    const onClickAttr = button.onClick ? 'data-has-click-handler="true"' : '';
    const hrefAttr = button.href ? `data-href="${button.href}"` : '';
    
    return `
      <button 
        class="${buttonClasses}" 
        data-section="${button.section}" 
        data-tooltip="${button.tooltip}"
        ${onClickAttr}
        ${hrefAttr}
        ${button.state === 'disabled' ? 'disabled' : ''}
      >
        ${renderIconHelper(button.icon)}
      </button>
    `;
  }).join('\n');

  // Renderizar botones del footer
  const footerButtonsHTML = footerButtons.map(button => {
    const buttonClasses = [
      'ubits-sidebar-nav-button',
      button.id ? `id="ubits-${button.id}"` : '',
      button.state === 'active' ? 'active' : '',
      button.state === 'disabled' ? 'disabled' : ''
    ].filter(Boolean).join(' ');

    const onClickAttr = button.onClick ? 'data-has-click-handler="true"' : '';
    const hrefAttr = button.href ? `data-href="${button.href}"` : '';
    
    return `
      <button 
        class="${buttonClasses}" 
        ${button.id ? `id="ubits-${button.id}"` : ''}
        data-section="${button.section}" 
        data-tooltip="${button.tooltip}"
        ${button.id === 'darkmode-toggle' ? 'data-theme="light"' : ''}
        ${onClickAttr}
        ${hrefAttr}
        ${button.state === 'disabled' ? 'disabled' : ''}
      >
        ${renderIconHelper(button.icon)}
      </button>
    `;
  }).join('\n');

  // Renderizar dark mode toggle si está habilitado
  const darkModeToggleHTML = darkModeEnabled ? `
    <button 
      class="ubits-sidebar-nav-button" 
      id="ubits-darkmode-toggle" 
      data-tooltip="Modo oscuro" 
      data-theme="light"
      data-has-click-handler="true"
    >
      ${renderIconHelper('fa-moon', 'regular')}
    </button>
  ` : '';

  // Renderizar items del menú de perfil
  const profileMenuHTML = profileMenuItems.length > 0 ? `
    <div class="ubits-sidebar-profile-menu" id="ubits-sidebar-profile-menu">
      ${profileMenuItems.map(item => {
        if (item.divider) {
          return '<div class="ubits-sidebar-profile-menu-divider"></div>';
        }
        const onClickAttr = item.onClick ? 'data-has-click-handler="true"' : '';
        const hrefAttr = item.href ? `data-href="${item.href}"` : '';
        return `
          <div class="ubits-sidebar-profile-menu-item" ${onClickAttr} ${hrefAttr}>
            ${renderIconHelper(item.icon)}
            <span>${item.label}</span>
          </div>
        `;
      }).join('')}
    </div>
  ` : '';

  return `
    <aside class="${containerClasses}" id="ubits-sidebar" ${containerAttrs}>
      <div class="ubits-sidebar-main">
        <div class="ubits-sidebar-header">
          <div class="ubits-sidebar-logo" data-href="${finalLogoHref}">
            <img src="${logoImage}" alt="UBITS Logo" />
          </div>
        </div>
        <div class="ubits-sidebar-body">
          ${bodyButtonsHTML}
        </div>
      </div>
      <div class="ubits-sidebar-footer">
        ${footerButtonsHTML}
        ${darkModeToggleHTML}
        <div class="ubits-sidebar-user-avatar-container">
          <div class="ubits-sidebar-user-avatar" data-has-click-handler="${options.onAvatarClick ? 'true' : ''}">
            <img src="${avatarImage}" alt="Usuario" class="ubits-sidebar-avatar-image" />
          </div>
        </div>
      </div>
    </aside>
    ${profileMenuHTML}
    <div class="ubits-sidebar-tooltip" id="ubits-sidebar-tooltip"></div>
  `.trim();
}

/**
 * Inicializa tooltips para el sidebar
 */
function initTooltips(sidebarElement: HTMLElement): void {
  const tooltipElement = document.getElementById('ubits-sidebar-tooltip');
  if (!tooltipElement) return;

  // Encontrar el contenedor padre del sidebar (debe tener position: relative)
  const sidebarContainer = sidebarElement.parentElement;
  if (!sidebarContainer) return;
  
  const buttons = sidebarElement.querySelectorAll('[data-tooltip]');
  
  buttons.forEach(button => {
    const tooltipText = button.getAttribute('data-tooltip');
    if (!tooltipText) return;

    let hideTimeout: number | null = null;

    button.addEventListener('mouseenter', () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }

      // Obtener posición del botón relativa al contenedor
      const buttonRect = button.getBoundingClientRect();
      const containerRect = sidebarContainer.getBoundingClientRect();
      
      const tooltip = tooltipElement;
      
      tooltip.textContent = tooltipText;
      tooltip.style.visibility = 'hidden'; // Ocultar temporalmente para calcular dimensiones
      tooltip.style.display = 'block';
      tooltip.classList.add('show');
      
      // Usar doble requestAnimationFrame para asegurar que el tooltip esté completamente renderizado
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const tooltipRect = tooltip.getBoundingClientRect();
          const tooltipHeight = tooltipRect.height;
          
          // Calcular posición relativa al contenedor (position: absolute)
          const left = buttonRect.right - containerRect.left + 12;
          const top = buttonRect.top - containerRect.top + (buttonRect.height / 2) - (tooltipHeight / 2);
          
          // Aplicar posición relativa al contenedor
          tooltip.style.left = `${left}px`;
          tooltip.style.top = `${top}px`;
          tooltip.style.visibility = 'visible';
        });
      });
    });

    button.addEventListener('mouseleave', () => {
      tooltipElement.classList.remove('show');
      tooltipElement.style.visibility = 'hidden';
    });
  });
}

/**
 * Inicializa el menú de perfil
 */
function initProfileMenu(sidebarElement: HTMLElement, options: SidebarOptions): void {
  const avatarElement = sidebarElement.querySelector('.ubits-sidebar-user-avatar');
  const menuElement = document.getElementById('ubits-sidebar-profile-menu');
  
  if (!avatarElement || !menuElement) return;

  // Encontrar el contenedor del sidebar para posicionar el menú relativo a él
  const containerId = options.containerId;
  const sidebarContainer = containerId ? document.getElementById(containerId) : sidebarElement.parentElement;
  
  // Función para calcular posición del menú relativa al contenedor
  const updateMenuPosition = () => {
    if (!sidebarContainer || sidebarContainer === document.body) return;
    
    const sidebarRect = sidebarElement.getBoundingClientRect();
    const containerRect = sidebarContainer.getBoundingClientRect();
    
    // Posicionar el menú justo al lado del sidebar (96px, completamente pegado)
    const menuLeft = sidebarRect.left - containerRect.left + 96;
    // Alinear con el avatar en la parte inferior
    const menuBottom = 27;
    
    menuElement.style.position = 'absolute';
    menuElement.style.left = `${menuLeft}px`;
    menuElement.style.bottom = `${menuBottom}px`;
  };
  
  // Si hay contenedor, usar position absolute y calcular posición relativa
  if (sidebarContainer && sidebarContainer !== document.body) {
    // Asegurar que el contenedor tenga position relative
    const containerStyle = window.getComputedStyle(sidebarContainer);
    if (containerStyle.position === 'static') {
      sidebarContainer.style.position = 'relative';
    }
    
    // Calcular y aplicar posición inicial
    updateMenuPosition();
    
    // Actualizar posición en caso de resize
    window.addEventListener('resize', updateMenuPosition);
  } else {
    // Fallback a position fixed para cuando no hay contenedor específico
    menuElement.style.position = 'fixed';
    menuElement.style.left = '96px';
    menuElement.style.bottom = '27px';
  }

  let showTimeout: number | null = null;
  let hideTimeout: number | null = null;

  const showMenu = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    if (showTimeout) {
      clearTimeout(showTimeout);
    }
    // Actualizar posición antes de mostrar (por si cambió el scroll o resize)
    if (sidebarContainer && sidebarContainer !== document.body) {
      updateMenuPosition();
    }
    showTimeout = window.setTimeout(() => {
      menuElement.classList.add('show');
      menuElement.style.display = 'block';
    }, 100);
  };

  const hideMenu = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }
    hideTimeout = window.setTimeout(() => {
      menuElement.classList.remove('show');
      menuElement.style.display = 'none';
    }, 200);
  };

  avatarElement.addEventListener('mouseenter', showMenu);
  avatarElement.addEventListener('mouseleave', hideMenu);
  menuElement.addEventListener('mouseenter', showMenu);
  menuElement.addEventListener('mouseleave', hideMenu);

  // Click en avatar
  if (options.onAvatarClick) {
    avatarElement.addEventListener('click', (e) => {
      e.preventDefault();
      options.onAvatarClick?.();
    });
  } else {
    const href = avatarElement.getAttribute('data-href');
    if (href) {
      avatarElement.addEventListener('click', () => {
        window.location.href = href;
      });
    }
  }

  // Click en items del menú
  const menuItems = menuElement.querySelectorAll('.ubits-sidebar-profile-menu-item');
  menuItems.forEach((item, index) => {
    const menuItem = options.profileMenuItems?.[index];
    if (!menuItem || menuItem.divider) return;

    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (menuItem.onClick) {
        menuItem.onClick();
      } else if (menuItem.href) {
        window.location.href = menuItem.href;
      }
      hideMenu();
    });
  });
}

/**
 * Inicializa el dark mode toggle
 */
function initDarkModeToggle(sidebarElement: HTMLElement, options: SidebarOptions): void {
  const darkModeButton = sidebarElement.querySelector('#ubits-darkmode-toggle');
  if (!darkModeButton) return;

  // Encontrar el contenedor del sidebar - buscar el contenedor padre que tiene el ID del containerId
  const containerId = options.containerId;
  let sidebarContainer: HTMLElement | null = null;
  
  if (containerId) {
    sidebarContainer = document.getElementById(containerId);
  }
  
  // Si no se encuentra por ID, usar el padre del sidebar
  if (!sidebarContainer) {
    sidebarContainer = sidebarElement.parentElement;
  }
  
  // Función para actualizar el icono según el tema con animación
  const updateIcon = (theme: string) => {
    const iconElement = darkModeButton.querySelector('i');
    if (iconElement) {
      // Remover todas las clases de iconos anteriores
      iconElement.classList.remove('fa-moon', 'fa-sun', 'fa-sun-bright', 'far', 'fas', 'fa-solid', 'fa-regular');
      
      // Agregar clase de animación
      iconElement.classList.add('ubits-icon-transition');
      
      // Agregar la clase del icono correspondiente después de un pequeño delay para asegurar que se aplique la animación
      requestAnimationFrame(() => {
        if (theme === 'dark') {
          iconElement.classList.add('fa-solid', 'fa-sun-bright');
        } else {
          iconElement.classList.add('far', 'fa-moon');
        }
      });
      
      // Remover clase de animación después de la transición (ajustado a 400ms para coincidir con la duración de la animación)
      setTimeout(() => {
        iconElement.classList.remove('ubits-icon-transition');
      }, 400);
    }
  };

  darkModeButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentTheme = darkModeButton.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Actualizar atributo del botón
    darkModeButton.setAttribute('data-theme', newTheme);
    
    // Actualizar el icono
    updateIcon(newTheme);
    
    // Actualizar atributo SOLO en el contenedor del sidebar, no en todo el documento
    if (sidebarContainer) {
      sidebarContainer.setAttribute('data-theme', newTheme);
    }

    // Llamar callback si existe
    if (options.onDarkModeToggle) {
      options.onDarkModeToggle(newTheme === 'dark');
    }
  });
}

/**
 * Crea un sidebar interactivo en el DOM
 */
export function createSidebar(options: SidebarOptions): HTMLElement {
  const {
    containerId,
    bodyButtons,
    height
  } = options;

  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id "${containerId}" not found`);
  }

  // Asegurar que el contenedor tenga position relative para el menú de perfil
  const containerStyle = window.getComputedStyle(container);
  if (containerStyle.position === 'static') {
    container.style.position = 'relative';
  }

  const sidebarHTML = renderSidebar(options);
  container.innerHTML = sidebarHTML;

  const sidebarElement = container.querySelector('.ubits-sidebar') as HTMLElement;
  
  // Asegurar que el menú de perfil esté dentro del contenedor si existe
  const menuElement = document.getElementById('ubits-sidebar-profile-menu');
  if (menuElement && !container.contains(menuElement)) {
    container.appendChild(menuElement);
  }
  
  // Asegurar que el tooltip esté dentro del contenedor
  const tooltipElement = document.getElementById('ubits-sidebar-tooltip');
  if (tooltipElement && !container.contains(tooltipElement)) {
    container.appendChild(tooltipElement);
  }
  
  if (!sidebarElement) {
    throw new Error('Failed to create sidebar element');
  }

  // Ajustar altura
  if (height) {
    sidebarElement.style.height = typeof height === 'number' ? `${height}px` : height;
  } else {
    adjustSidebarHeight(sidebarElement);
    window.addEventListener('resize', () => adjustSidebarHeight(sidebarElement));
  }

  // Inicializar funcionalidades
  initTooltips(sidebarElement);
  initProfileMenu(sidebarElement, options);
  
  if (options.darkModeEnabled !== false) {
    initDarkModeToggle(sidebarElement, options);
  }

  // Agregar event listeners para botones del body
  const bodyButtonsElements = sidebarElement.querySelectorAll('.ubits-sidebar-body .ubits-sidebar-nav-button');
  bodyButtonsElements.forEach((button, index) => {
    const buttonConfig = bodyButtons[index];
    if (!buttonConfig) return;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (buttonConfig.state === 'disabled') return;

      // Remover active de todos los botones
      bodyButtonsElements.forEach(btn => btn.classList.remove('active'));
      
      // Agregar active al botón clickeado
      button.classList.add('active');

      // Llamar callback si existe
      if (options.onActiveButtonChange) {
        options.onActiveButtonChange(buttonConfig.section);
      }

      // Ejecutar onClick o href
      if (buttonConfig.onClick) {
        buttonConfig.onClick(e as MouseEvent);
      } else if (buttonConfig.href) {
        window.location.href = buttonConfig.href;
      }
    });
  });

  // Agregar event listeners para botones del footer
  const footerButtonsElements = sidebarElement.querySelectorAll('.ubits-sidebar-footer .ubits-sidebar-nav-button');
  footerButtonsElements.forEach((button, index) => {
    const buttonConfig = options.footerButtons?.[index];
    if (!buttonConfig) return;

    // Dark mode toggle ya tiene su propio handler
    if (button.id === 'ubits-darkmode-toggle') return;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (buttonConfig.state === 'disabled') return;

      if (buttonConfig.onClick) {
        buttonConfig.onClick(e as MouseEvent);
      } else if (buttonConfig.href) {
        window.location.href = buttonConfig.href;
      }
    });
  });

  // Click en logo
  const logoElement = sidebarElement.querySelector('.ubits-sidebar-logo');
  if (logoElement) {
    const logoHref = logoElement.getAttribute('data-href');
    if (logoHref) {
      logoElement.addEventListener('click', () => {
        window.location.href = logoHref;
      });
    }
  }

  return sidebarElement;
}

/**
 * Actualiza el botón activo del sidebar
 */
export function updateActiveSidebarButton(containerId: string, section: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const sidebarElement = container.querySelector('.ubits-sidebar');
  if (!sidebarElement) return;

  // Remover active de todos los botones
  const allButtons = sidebarElement.querySelectorAll('.ubits-sidebar-nav-button');
  allButtons.forEach(btn => btn.classList.remove('active'));

  // Agregar active al botón especificado
  const targetButton = sidebarElement.querySelector(`[data-section="${section}"]`);
  if (targetButton) {
    targetButton.classList.add('active');
  }
}

