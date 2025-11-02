/**
 * Components Loader
 * Carga y expone los componentes reales como funciones globales
 * Para usar sin servidor HTTP (file:// protocol)
 */

console.log('📦 components-loader.js cargándose...');

// Helper para renderizar iconos
function renderIconHelper(iconName, iconStyle = 'regular') {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  let name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  
  return `<i class="${iconClass} ${name}"></i>`;
}

console.log('✅ renderIconHelper definida');

// ========================================
// SIDEBAR COMPONENT
// ========================================

// Función para ajustar la altura del sidebar dinámicamente
function adjustSidebarHeight(sidebarElement) {
  const windowHeight = window.innerHeight;
  const topMargin = 16;
  const bottomMargin = 16;
  const availableHeight = windowHeight - topMargin - bottomMargin;
  const minHeight = 578;
  const sidebarHeight = Math.max(minHeight, availableHeight);
  
  sidebarElement.style.height = `${sidebarHeight}px`;
  sidebarElement.style.top = `${topMargin}px`;
}

// Renderiza el HTML del sidebar (basado en SidebarProvider.ts)
function renderSidebar(options) {
  const variant = options.variant || 'colaborador';
  const bodyButtons = options.bodyButtons || [];
  const footerButtons = options.footerButtons || [];
  const defaultLogoHref = variant === 'admin' ? 'template-admin.html' : 'index.html';
  const finalLogoHref = options.logoHref || defaultLogoHref;
  
  // Normalizar rutas de imágenes para que funcionen con file://
  const normalizeImagePath = (path) => {
    if (!path) return path;
    // Si la ruta tiene muchos ../, reducirlos
    if (path && path.includes('../../../../')) {
      return path.replace('../../../../', '../../../');
    }
    return path;
  };
  
  const finalLogoImage = normalizeImagePath(options.logoImage) || 'assets/images/Ubits-logo.svg';
  const finalAvatarImage = normalizeImagePath(options.avatarImage) || 'assets/images/Profile-image.jpg';
  const profileMenuItems = options.profileMenuItems || [];
  const darkModeEnabled = options.darkModeEnabled !== false;

  // Renderizar botones del body
  const bodyButtonsHTML = bodyButtons.map((button, index) => {
    
    // Normalizar icono: si viene con 'fa-' ya está bien, si no, agregarlo
    let iconName = button.icon || '';
    if (iconName && !iconName.startsWith('fa-')) {
      iconName = `fa-${iconName}`;
    }
    
    const buttonClasses = [
      'ubits-sidebar-nav-button',
      button.state === 'active' ? 'active' : '',
      button.state === 'disabled' ? 'disabled' : ''
    ].filter(Boolean).join(' ');

    const onClickAttr = button.onClick ? 'data-has-click-handler="true"' : '';
    const hrefAttr = button.href ? `data-href="${button.href}"` : '';
    
    const buttonHTML = `
      <button 
        class="${buttonClasses}" 
        data-section="${button.section || ''}" 
        data-tooltip="${button.tooltip || ''}"
        ${onClickAttr}
        ${hrefAttr}
        ${button.state === 'disabled' ? 'disabled' : ''}
      >
        ${renderIconHelper(iconName)}
      </button>
    `;
    
    return buttonHTML;
  }).join('\n');
  

  // Renderizar botones del footer
  const footerButtonsHTML = footerButtons.map(button => {
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
        ${button.id ? `id="ubits-${button.id}"` : ''}
        data-section="${button.section || ''}" 
        data-tooltip="${button.tooltip || ''}"
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
    <aside class="ubits-sidebar" id="ubits-sidebar">
      <div class="ubits-sidebar-main">
        <div class="ubits-sidebar-header">
          <div class="ubits-sidebar-logo" data-href="${finalLogoHref}">
            <img src="${finalLogoImage}" alt="UBITS Logo" />
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
            <img src="${finalAvatarImage}" alt="Usuario" class="ubits-sidebar-avatar-image" />
          </div>
        </div>
      </div>
    </aside>
    ${profileMenuHTML}
    <div class="ubits-sidebar-tooltip" id="ubits-sidebar-tooltip"></div>
  `.trim();
}

// Inicializa tooltips para el sidebar
function initTooltips(sidebarElement) {
  const tooltipElement = document.getElementById('ubits-sidebar-tooltip');
  if (!tooltipElement) return;

  const buttons = sidebarElement.querySelectorAll('[data-tooltip]');
  
  buttons.forEach(button => {
    const tooltipText = button.getAttribute('data-tooltip');
    if (!tooltipText) return;

    let hideTimeout = null;
    let isTooltipVisible = false;

    const showTooltip = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }

      const rect = button.getBoundingClientRect();
      const tooltip = tooltipElement;
      
      tooltip.textContent = tooltipText;
      tooltip.classList.add('show');
      isTooltipVisible = true;
      
      // Posicionar tooltip a la derecha del botón
      tooltip.style.left = `${rect.right + 12}px`;
      tooltip.style.top = `${rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2)}px`;
    };

    const hideTooltip = () => {
      tooltipElement.classList.remove('show');
      isTooltipVisible = false;
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
    };

    button.addEventListener('mouseenter', showTooltip);

    button.addEventListener('mouseleave', hideTooltip);

    // ⚠️ IMPORTANTE: Ocultar tooltip al hacer clic en el botón
    button.addEventListener('click', () => {
      hideTooltip();
    });

    // También ocultar tooltip cuando el botón pierde el foco
    button.addEventListener('blur', hideTooltip);
  });
}

// Inicializa el menú de perfil
function initProfileMenu(sidebarElement, options) {
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

  menuElement.style.zIndex = '2000';
  menuElement.style.display = 'none';

  let showTimeout = null;
  let hideTimeout = null;

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

  // Manejar hover para mostrar/ocultar el menú
  // CRÍTICO: Aumentar el delay del hideMenu para permitir clicks
  let isClickInProgress = false;
  
  avatarElement.addEventListener('mouseenter', showMenu);
  avatarElement.addEventListener('mouseleave', (e) => {
    // No cerrar si el mouse está sobre el menú O si hay un click en progreso
    const relatedTarget = e.relatedTarget;
    if (relatedTarget && (menuElement.contains(relatedTarget) || relatedTarget.closest('.ubits-sidebar-profile-menu'))) {
      return;
    }
    if (isClickInProgress) {
      return;
    }
    hideMenu();
  });
  menuElement.addEventListener('mouseenter', showMenu);
  menuElement.addEventListener('mouseleave', (e) => {
    // No cerrar si el mouse está sobre el avatar O si hay un click en progreso
    const relatedTarget = e.relatedTarget;
    if (relatedTarget && (avatarElement.contains(relatedTarget) || relatedTarget.closest('.ubits-sidebar-user-avatar'))) {
      return;
    }
    if (isClickInProgress) {
      return;
    }
    hideMenu();
  });
  
  // Cerrar el menú al hacer click fuera
  // IMPORTANTE: Usar capture: false para ejecutar DESPUÉS del listener del item
  // Y verificar si el evento ya fue manejado por stopImmediatePropagation
  document.addEventListener('click', (e) => {
    if (!menuElement.classList.contains('show')) return;
    
    const target = e.target;
    const isInsideMenu = menuElement.contains(target);
    const isAvatar = avatarElement.contains(target) || target === avatarElement;
    
    // Verificar si es un item del menú o cualquier elemento dentro de él
    const isMenuItem = target.closest('.ubits-sidebar-profile-menu-item');
    const isInsideMenuItem = isInsideMenu && (target.closest('.ubits-sidebar-profile-menu-item') || 
                                             target.classList.contains('ubits-sidebar-profile-menu-item'));
    
    // Si es un item del menú O está dentro de un item, ejecutar la lógica aquí
    // porque el listener del item puede no ejecutarse si hay conflictos de timing
    if (isMenuItem || isInsideMenuItem) {
      // Encontrar el item del menú que contiene el click
      const clickedMenuItem = isMenuItem || target.closest('.ubits-sidebar-profile-menu-item');
      if (!clickedMenuItem) {
        return;
      }
      
      // Obtener el href del DOM
      const domHref = clickedMenuItem.getAttribute('data-href');
      const clickedText = clickedMenuItem.innerText?.trim() || clickedMenuItem.textContent?.trim();
      
      // Obtener el índice del item del menú (sin dividers)
      const menuItemsArray = Array.from(menuElement.querySelectorAll('.ubits-sidebar-profile-menu-item'));
      const clickedIndex = menuItemsArray.indexOf(clickedMenuItem);
      
      // Buscar el menuItem en profileMenuItems
      // Primero intentar por href, luego por label, luego por índice
      let menuItem = null;
      
      // 1. Buscar por href (más confiable)
      if (domHref) {
        menuItem = profileMenuItems.find(item => 
          !item.divider && (
            item.href === domHref || 
            (domHref.includes('template-admin.html') && (item.id === 'admin-mode' || item.label === 'Modo Administrador'))
          )
        );
      }
      
      // 2. Buscar por label (texto visible)
      if (!menuItem && clickedText) {
        menuItem = profileMenuItems.find(item => !item.divider && item.label === clickedText);
      }
      
      // 3. Buscar por índice (filtrando dividers)
      if (!menuItem && clickedIndex >= 0) {
        const nonDividerItems = profileMenuItems.filter(item => !item.divider);
        if (clickedIndex < nonDividerItems.length) {
          menuItem = nonDividerItems[clickedIndex];
        }
      }
      
      if (!menuItem || menuItem.divider) {
        return;
      }
      
      // Usar href de la configuración o del DOM
      const hrefToUse = menuItem.href || domHref || clickedMenuItem.getAttribute('data-href');
      
      // Si es "Cambio de contraseña", no hacer nada
      const isPasswordChange = (menuItem.id === 'password' || menuItem.id === 'cambio-contraseña' || 
                               menuItem.label === 'Cambio de contraseña' || clickedText === 'Cambio de contraseña');
      
      if (isPasswordChange) {
        hideMenu();
        return;
      }
      
      // Si es "Ver mi perfil", usar ContentManager
      if ((menuItem.id === 'perfil' || menuItem.id === 'ver-perfil' || menuItem.label === 'Ver mi perfil') && window.UBITS_ContentManager) {
        window.UBITS_ContentManager.handleSectionChange('perfil');
        hideMenu();
        return;
      }
      
      // Si es "Modo Administrador", navegar a template-admin.html
      // IMPORTANTE: Verificar que NO sea "Cambio de contraseña" antes de abrir admin
      const isAdminMode = !isPasswordChange && (menuItem.id === 'admin-mode' || menuItem.label === 'Modo Administrador') && (hrefToUse || domHref);
      
      if (isAdminMode && !isPasswordChange) {
        const urlToOpen = hrefToUse || domHref || 'template-admin.html';
        hideMenu();
        
        setTimeout(() => {
          const newWindow = window.open(urlToOpen, '_blank');
          if (!newWindow) {
            window.location.href = urlToOpen;
          }
        }, 10);
        return;
      }
      
      // Si es "Modo colaborador"
      // IMPORTANTE: Verificar que NO sea "Cambio de contraseña" antes de abrir
      const isColaboradorMode = !isPasswordChange && (menuItem.id === 'modo-colaborador' || menuItem.label === 'Modo colaborador') && (hrefToUse || domHref);
      if (isColaboradorMode) {
        const urlToOpen = hrefToUse || domHref;
        hideMenu();
        
        setTimeout(() => {
          const newWindow = window.open(urlToOpen, '_blank');
          if (!newWindow) {
            window.location.href = urlToOpen;
          }
        }, 10);
        return;
      }
      
      // Otras acciones - PERO NO si es "Cambio de contraseña"
      if (!isPasswordChange) {
        if (menuItem.onClick) {
          menuItem.onClick();
        } else if (menuItem.href || domHref) {
          window.location.href = menuItem.href || domHref;
        }
      }
      hideMenu();
      
      return;
    }
    
    // Solo cerrar si el click es fuera del menú Y no es en el avatar
    if (!isInsideMenu && !isAvatar) {
      hideMenu();
    }
  }, false);

  // Click en avatar
  if (options.onAvatarClick) {
    avatarElement.addEventListener('click', (e) => {
      e.preventDefault();
      options.onAvatarClick();
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
  const profileMenuItems = options.profileMenuItems || [];
  
  // IMPORTANTE: Filtrar dividers una sola vez
  const nonDividerItems = profileMenuItems.filter(i => !i.divider);
  
  menuItems.forEach((item, index) => {
    // Usar el índice del DOM para obtener el menuItem correspondiente (sin dividers)
    const menuItem = nonDividerItems[index];
    
    if (!menuItem) {
      return;
    }

    // También leer el data-href del DOM por si acaso
    const domHref = item.getAttribute('data-href');
    const itemText = item.innerText?.trim() || item.textContent?.trim();
    const itemId = item.getAttribute('data-profile-item-id') || item.getAttribute('id');

    // Asegurarse de que el elemento sea clickeable
    item.style.cursor = 'pointer';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    
    // Función para manejar el click
    const handleItemClick = (e) => {
      // Verificar que el menuItem corresponde al item del DOM clickeado
      const itemText = item.innerText?.trim() || item.textContent?.trim();

      // CRÍTICO: Marcar que hay un click en progreso para evitar que mouseleave cierre el menú
      isClickInProgress = true;
      
      // CRÍTICO: Prevenir default y stopPropagation INMEDIATAMENTE
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); // Detener TODOS los otros listeners en este elemento
      

      // Si es "Cambio de contraseña", no hacer nada
      // Verificar tanto por menuItem como por el texto del elemento DOM y el ID del DOM
      const itemIdFromDOM = item.getAttribute('data-profile-item-id') || item.getAttribute('id');
      const isPasswordChange = (menuItem.id === 'password' || menuItem.id === 'cambio-contraseña' || 
                               menuItem.label === 'Cambio de contraseña' ||
                               itemText === 'Cambio de contraseña' ||
                               itemIdFromDOM === 'password' || itemIdFromDOM === 'cambio-contraseña');
      
      if (isPasswordChange) {
        hideMenu();
        setTimeout(() => {
          isClickInProgress = false;
        }, 300);
        return;
      }

      // Si es "Ver mi perfil", usar ContentManager
      if ((menuItem.id === 'perfil' || menuItem.id === 'ver-perfil' || menuItem.label === 'Ver mi perfil') && window.UBITS_ContentManager) {
        window.UBITS_ContentManager.handleSectionChange('perfil');
        hideMenu();
        setTimeout(() => {
          isClickInProgress = false;
        }, 300);
        return;
      }
      
      // Si es "Modo Administrador", navegar a template-admin.html
      // Usar href de la configuración o del DOM
      const hrefToUse = menuItem.href || domHref;
      const isAdminMode = (menuItem.id === 'admin-mode' || menuItem.label === 'Modo Administrador') && hrefToUse;
      
      if (isAdminMode) {
        hideMenu();
        
        // Abrir en nueva pestaña con timeout para asegurar que se ejecute
        setTimeout(() => {
          const newWindow = window.open(hrefToUse, '_blank');
          if (!newWindow) {
            // Fallback: navegar en la misma pestaña
            window.location.href = hrefToUse;
          }
        }, 10);
        return;
      }
      
      // Si es "Modo colaborador" desde admin, navegar a template-colaborador.html
      const hrefColaborador = menuItem.href || domHref;
      const isColaboradorMode = (menuItem.id === 'modo-colaborador' || menuItem.label === 'Modo colaborador') && hrefColaborador;
      
      if (isColaboradorMode) {
        hideMenu();
        
        // Abrir en nueva pestaña con timeout para asegurar que se ejecute
        setTimeout(() => {
          const newWindow = window.open(hrefColaborador, '_blank');
          if (!newWindow) {
            // Fallback: navegar en la misma pestaña
            window.location.href = hrefColaborador;
          }
        }, 10);
        return;
      }
      
      // Si tiene onClick, ejecutarlo (solo si no es "Cambio de contraseña")
      if (menuItem.onClick) {
        menuItem.onClick();
      // NO navegar si tiene href a menos que sea específicamente "Modo Administrador" o "Modo colaborador"
      // Esto previene que "Cambio de contraseña" navegue accidentalmente
      } else if (menuItem.href && (menuItem.id === 'admin-mode' || menuItem.id === 'modo-colaborador')) {
        window.location.href = menuItem.href;
      }
      
      // Cerrar el menú después de procesar el click
      hideMenu();
      
      // Resetear el flag después de un delay
      setTimeout(() => {
        isClickInProgress = false;
      }, 300);
    };
    
    // Usar mousedown EN LUGAR de click para capturar ANTES que otros eventos
    // mousedown se ejecuta antes que click y antes que mouseleave
    item.addEventListener('mousedown', (e) => {
      // Marcar que hay un click en progreso INMEDIATAMENTE
      isClickInProgress = true;
      // NO prevenir default aquí, dejar que el click normal continúe
    }, true);
    
    // Agregar listener de click con capture: true para ejecutar PRIMERO
    item.addEventListener('click', handleItemClick, true);
    
    // También agregar listener para Enter key por accesibilidad
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleItemClick(e);
      }
    });
  });
}

// Inicializa el dark mode toggle
function initDarkModeToggle(sidebarElement, options) {
  const darkModeButton = sidebarElement.querySelector('#ubits-darkmode-toggle');
  if (!darkModeButton) return;

  // Encontrar el contenedor del sidebar - buscar el contenedor padre que tiene el ID del containerId
  const containerId = options.containerId;
  let sidebarContainer = null;
  
  if (containerId) {
    sidebarContainer = document.getElementById(containerId);
  }
  
  // Si no se encuentra por ID, usar el padre del sidebar
  if (!sidebarContainer) {
    sidebarContainer = sidebarElement.parentElement;
  }
  
  // Función para actualizar el icono según el tema con animación
  const updateIcon = (theme) => {
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
    };
  }

  darkModeButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentTheme = darkModeButton.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Actualizar atributo del botón
    darkModeButton.setAttribute('data-theme', newTheme);
    
    // Actualizar el icono
    updateIcon(newTheme);
    
    // Actualizar atributo en el body completo para que todos los componentes se actualicen
    document.body.setAttribute('data-theme', newTheme);
    
    // También actualizar el contenedor del sidebar
    if (sidebarContainer) {
      sidebarContainer.setAttribute('data-theme', newTheme);
    }

    // Notificar Theme Manager si está disponible
    if (window.UBITS_ThemeManager) {
      window.UBITS_ThemeManager.setTheme(newTheme);
    }
    
    // Llamar callback si existe
    if (options.onDarkModeToggle) {
      options.onDarkModeToggle(newTheme === 'dark');
    }
  });
}

// Crea un sidebar interactivo en el DOM
console.log('📝 Definiendo window.createSidebar...');
window.createSidebar = function(options) {
  console.log('[createSidebar] 🚀 INICIANDO createSidebar');
  console.log('[createSidebar] Opciones recibidas:', JSON.stringify(options, null, 2));
  try {
    const containerId = options.containerId;
    const bodyButtons = options.bodyButtons;
    const height = options.height;
    const variant = options.variant || 'colaborador'; // Guardar variant para uso posterior

    console.log('[createSidebar] Buscando contenedor:', containerId);
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('[createSidebar] ❌ Contenedor no encontrado:', containerId);
      throw new Error(`Container with id "${containerId}" not found`);
    }
    console.log('[createSidebar] ✅ Contenedor encontrado');

  const containerStyle = window.getComputedStyle(container);
  if (containerStyle.position === 'static') {
    container.style.position = 'relative';
  }

    console.log('[createSidebar] Llamando renderSidebar...');
    const sidebarHTML = renderSidebar(options);
    console.log('[createSidebar] HTML generado, longitud:', sidebarHTML.length);
    container.innerHTML = sidebarHTML;

    console.log('[createSidebar] Buscando elemento .ubits-sidebar...');
    const sidebarElement = container.querySelector('.ubits-sidebar');
    console.log('[createSidebar] Elemento encontrado:', !!sidebarElement);
  
  const menuElement = document.getElementById('ubits-sidebar-profile-menu');
  if (menuElement && !container.contains(menuElement)) {
    container.appendChild(menuElement);
  }
  
  if (!sidebarElement) {
    throw new Error('Failed to create sidebar element');
  }

  if (height) {
    sidebarElement.style.height = typeof height === 'number' ? `${height}px` : height;
  } else {
    adjustSidebarHeight(sidebarElement);
    window.addEventListener('resize', () => adjustSidebarHeight(sidebarElement));
  }

  initTooltips(sidebarElement);
  initProfileMenu(sidebarElement, options);
  
  if (options.darkModeEnabled !== false) {
    initDarkModeToggle(sidebarElement, options);
  }

  // ⚠️ ACTIVAR BOTÓN INICIAL si se especifica
  // IMPORTANTE: Hacer esto ANTES de agregar los event listeners para evitar conflictos
  if (options.initialActiveSection) {
    const initialButton = sidebarElement.querySelector(`[data-section="${options.initialActiveSection}"]`);
    if (initialButton) {
      // Remover active de todos los botones primero
      sidebarElement.querySelectorAll('.ubits-sidebar-nav-button').forEach(btn => {
        btn.classList.remove('active');
        btn.blur(); // Remover foco para evitar borde azul
      });
      // Activar el botón inicial (SIN focus para evitar borde azul)
      initialButton.classList.add('active');
      // NO llamar focus() aquí para evitar el borde azul de focus-visible
    }
  }

  const bodyButtonsElements = sidebarElement.querySelectorAll('.ubits-sidebar-body .ubits-sidebar-nav-button');
  bodyButtonsElements.forEach((button, index) => {
    const buttonConfig = bodyButtons[index];
    if (!buttonConfig) return;

    button.addEventListener('click', (e) => {
      if (buttonConfig.state === 'disabled') {
        e.preventDefault();
        return;
      }

      // ⚠️ IMPORTANTE: Si el botón tiene href y es "admin" o tiene isNavigation, navegar directamente
      // El botón "admin" debe navegar a la página template-admin.html, no cargar contenido
      // NO prevenir el comportamiento por defecto aquí para permitir la navegación
      const shouldNavigate = (buttonConfig.section === 'admin' || buttonConfig.isNavigation) && buttonConfig.href;

      if (shouldNavigate) {
        window.open(buttonConfig.href, '_blank');
        return; // Salir inmediatamente sin prevenir default
      }

      // Solo prevenir default si NO es navegación
      e.preventDefault();
      e.stopPropagation(); // Evitar que el evento se propague

      // ⚠️ IMPORTANTE: Actualizar estado activo INMEDIATAMENTE
      // Remover activo de todos los botones primero
      bodyButtonsElements.forEach(btn => {
        btn.classList.remove('active');
        // También remover cualquier estado hover que pueda estar activo
        btn.blur(); // Remover foco del botón
      });

      // Agregar clase active al botón clickeado INMEDIATAMENTE
      button.classList.add('active');
      // ⚠️ NO llamar focus() aquí para evitar el borde azul de focus-visible
      // El estado active es suficiente para el feedback visual

      // Ocultar tooltip si está visible
      const tooltipElement = document.getElementById('ubits-sidebar-tooltip');
      if (tooltipElement) {
        tooltipElement.classList.remove('show');
      }

      // Notificar Content Manager si está disponible
      if (window.UBITS_ContentManager) {
        window.UBITS_ContentManager.handleSectionChange(buttonConfig.section);
      }

      if (options.onActiveButtonChange) {
        options.onActiveButtonChange(buttonConfig.section);
      }

      // NO redirigir a href automáticamente - usar Content Manager en su lugar
      if (buttonConfig.onClick) {
        buttonConfig.onClick(e);
      }
      // Removido: window.location.href para evitar errores 404
    });
  });

  const footerButtonsElements = sidebarElement.querySelectorAll('.ubits-sidebar-footer .ubits-sidebar-nav-button');
  footerButtonsElements.forEach((button, index) => {
    const buttonConfig = options.footerButtons[index];
    if (!buttonConfig) return;

    if (button.id === 'ubits-darkmode-toggle') return;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (buttonConfig.state === 'disabled') return;

      // Si tiene una sección definida, usar ContentManager
      if (buttonConfig.section && window.UBITS_ContentManager) {
        window.UBITS_ContentManager.handleSectionChange(buttonConfig.section);
        return;
      }

      if (buttonConfig.onClick) {
        buttonConfig.onClick(e);
      } else if (buttonConfig.href) {
        window.location.href = buttonConfig.href;
      }
    });
  });

  // Click en logo - debe ir a la primera sección (aprendizaje) en lugar de redirigir
  const logoElement = sidebarElement.querySelector('.ubits-sidebar-logo');
  if (logoElement) {
    logoElement.style.cursor = 'pointer';
    logoElement.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // En lugar de redirigir, activar la primera sección disponible (aprendizaje)
      // Para sidebar colaborador, la primera sección útil es "aprendizaje"
      const sidebarVariant = options.variant || 'colaborador';
      const firstSection = sidebarVariant === 'admin' 
        ? 'inicio' 
        : 'aprendizaje'; // Para colaborador, usar "aprendizaje"
      
      
      // Remover active de todos los botones
      const allButtons = sidebarElement.querySelectorAll('.ubits-sidebar-nav-button');
      allButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.blur();
      });
      
      // Activar el botón correspondiente a la sección
      const targetButton = sidebarElement.querySelector(`[data-section="${firstSection}"]`);
      if (targetButton) {
        targetButton.classList.add('active');
        targetButton.focus();
      }
      
      // Ocultar tooltip si está visible
      const tooltipElement = document.getElementById('ubits-sidebar-tooltip');
      if (tooltipElement) {
        tooltipElement.classList.remove('show');
      }
      
      // Usar ContentManager para cargar la sección
      if (window.UBITS_ContentManager) {
        window.UBITS_ContentManager.handleSectionChange(firstSection);
      }
      
      // Notificar callback si existe
      if (options.onActiveButtonChange) {
        options.onActiveButtonChange(firstSection);
      }
    });
  }

    console.log('[createSidebar] ✅ COMPLETADO, retornando elemento');
    return sidebarElement;
  } catch (error) {
    console.error('[createSidebar] ❌ ERROR:', error);
    console.error('[createSidebar] Stack:', error.stack);
    throw error;
  }
};

// ========================================
// SUBNAV COMPONENT
// ========================================

// Configuraciones de tabs por variante (simplificadas - solo como fallback)
const subNavVariantsConfig = {
  template: [
  ]
};

// Renderiza el HTML del SubNav
function renderSubNav(options) {
  const variant = options.variant || 'template';
  const customTabs = options.tabs;
  const activeTabId = options.activeTabId;

  // ⚠️ IMPORTANTE: Si se pasan tabs explícitos, usarlos SIEMPRE
  // El ContentManager pasa los tabs correctos según la variante
  let tabs;
  if (customTabs && customTabs.length > 0) {
    // Usar tabs pasados directamente (ContentManager los configura correctamente)
    tabs = customTabs;
  } else {
    // Fallback: usar configuración de variante si no se pasan tabs
    const config = subNavVariantsConfig[variant] || subNavVariantsConfig.template;
    tabs = config;
  }

  const activeId = activeTabId || (tabs.length > 0 ? tabs[0].id : '');

  const tabsHTML = tabs.map(tab => {
    const isActive = tab.id === activeId || tab.active;
    const activeClass = isActive ? 'ubits-sub-nav-tab--active' : '';
    
    // Normalizar icono: asegurar que tiene prefijo fa-
    let iconName = tab.icon || '';
    if (iconName && !iconName.startsWith('fa-')) {
      iconName = `fa-${iconName}`;
    }
    
    return `
      <button 
        class="ubits-sub-nav-tab ${activeClass}" 
        data-tab="${tab.id}"
        ${tab.url ? `data-url="${tab.url}"` : ''}
        ${tab.onClick ? 'data-has-click-handler="true"' : ''}
      >
        ${renderIconHelper(iconName)}
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

// Inicializa los event listeners de los tabs
function initTabListeners(subNavElement, options) {
  const tabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
  
  const handleTabClick = (tabElement) => {
    const tabId = tabElement.getAttribute('data-tab');
    const url = tabElement.getAttribute('data-url');
    
    tabs.forEach(t => t.classList.remove('ubits-sub-nav-tab--active'));
    tabElement.classList.add('ubits-sub-nav-tab--active');
    
    if (url) {
      window.location.href = url;
      return;
    }
    
    // Usar tabs pasados en options, o fallback a configuración de variante
    const allTabs = (options.tabs && options.tabs.length > 0)
      ? options.tabs
      : (subNavVariantsConfig[options.variant || 'template'] || subNavVariantsConfig.template);
    const tabConfig = allTabs.find(t => t.id === tabId);
    
    if (tabConfig && tabConfig.onClick) {
      tabConfig.onClick(new MouseEvent('click'));
    }
    
    if (options.onTabChange) {
      options.onTabChange(tabId || '', tabElement);
    }
    
    const event = new CustomEvent('subNavTabClick', {
      detail: { tabId: tabId, tabElement: tabElement }
    });
    document.dispatchEvent(event);
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      handleTabClick(tab);
    });
  });
}

// Crea un SubNav interactivo en el DOM
window.createSubNav = function(options) {
  const containerId = options.containerId;

  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id "${containerId}" not found`);
  }

  const subNavHTML = renderSubNav(options);
  container.innerHTML = subNavHTML;

  const subNavElement = container.querySelector('.ubits-sub-nav');
  if (!subNavElement) {
    throw new Error('Failed to create sub-nav element');
  }

  initTabListeners(subNavElement, options);

  return subNavElement;
};

// ========================================
// TABBAR COMPONENT
// ========================================

// Configuración por defecto del Floating Menu (ya no se usa - cada producto tiene su propia configuración)
window.defaultFloatingMenuSections = [];

window.defaultProfileMenuItems = [];

// Renderiza el HTML del TabBar
function renderTabBar(options) {
  const items = options.items;
  const activeTabId = options.activeTabId;
  const visible = options.visible || false;
  const className = options.className || '';

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

// Renderiza el Floating Menu
function renderFloatingMenu(sections) {
  const sectionsHTML = sections.map(section => {
    // Si es un link directo (isLink = true)
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
    
    // Si NO tiene subitems o el array está vacío, renderizar como link directo
    const hasSubitems = section.subitems && section.subitems.length > 0;
    if (!hasSubitems) {
      return `
        <a href="#" class="ubits-accordion-link ubits-accordion-link--direct" data-section-id="${section.id}">
          <div class="ubits-accordion-icon-circle" data-circle-id="${section.id}">
            ${renderIconHelper(section.icon)}
          </div>
          <span>${section.title}</span>
          <i class="far fa-chevron-right ubits-accordion-chevron"></i>
        </a>
      `;
    }
    
    // Si tiene subitems, renderizar como accordion
    const subitemsHTML = section.subitems.map(subitem => `
      <a href="${subitem.url || '#'}" class="ubits-accordion-link" data-section-id="${section.id}" data-subitem-id="${subitem.id}">
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

// Renderiza el Profile Menu
function renderProfileMenu(items) {
  const itemsHTML = items.map((item, index) => {
    // Usar url o href (soporta ambos)
    const url = item.url || item.href || '';
    
    const html = `
    <div class="ubits-profile-menu-item" data-profile-item-id="${item.id}" ${url ? `data-href="${url}"` : ''}>
      <i class="far fa-${item.icon} ubits-profile-menu-icon"></i>
      <span class="ubits-profile-menu-text">${item.label}</span>
    </div>
  `;
    return html;
  }).join('');

  return `
    <div class="ubits-profile-menu" id="ubits-profile-menu">
      ${itemsHTML}
    </div>
  `;
}

// Toggle de dark mode para TabBar
function toggleDarkMode(tabBarElement, onDarkModeToggle) {
  const currentTheme = tabBarElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  tabBarElement.setAttribute('data-theme', newTheme);
  
  // Notificar Theme Manager si está disponible
  if (window.UBITS_ThemeManager) {
    window.UBITS_ThemeManager.setTheme(newTheme);
  }
  
  // Actualizar body también
  document.body.setAttribute('data-theme', newTheme);
  
  const darkModeItem = tabBarElement.querySelector('[data-tab-id="modo-oscuro"]');
  if (darkModeItem) {
    const iconElement = darkModeItem.querySelector('.ubits-tabbar-icon i');
    if (iconElement) {
      iconElement.classList.remove('fa-moon', 'fa-sun', 'fa-sun-bright', 'fa-solid', 'fa-regular', 'far');
      if (newTheme === 'dark') {
        iconElement.classList.add('fa-solid', 'fa-sun-bright');
      } else {
        iconElement.classList.add('far', 'fa-moon');
      }
    }
  }

  if (onDarkModeToggle) {
    onDarkModeToggle(newTheme === 'dark');
  }
}

// Actualiza el tab activo
function updateActiveTab(tabBarElement, tabId) {
  const tabItems = tabBarElement.querySelectorAll('.ubits-tabbar-item');
  tabItems.forEach(item => {
    item.classList.remove('ubits-tabbar-item--active');
  });
  const activeItem = tabBarElement.querySelector(`[data-tab-id="${tabId}"]`);
  if (activeItem) {
    activeItem.classList.add('ubits-tabbar-item--active');
  }
}

// Toggle de accordion
function toggleAccordion(sectionId, container) {
  const body = container.querySelector(`[data-body-id="${sectionId}"]`);
  const chevron = container.querySelector(`[data-chevron-id="${sectionId}"]`);
  const circle = container.querySelector(`[data-circle-id="${sectionId}"]`);
  const title = container.querySelector(`[data-accordion-id="${sectionId}"] .ubits-accordion-title`);

  if (!body || !chevron || !circle || !title) return;

  const isCurrentlyOpen = body.style.display === 'block';

  // Cerrar todos los accordions primero
  container.querySelectorAll('.ubits-accordion-body').forEach(b => b.style.display = 'none');
  container.querySelectorAll('.ubits-accordion-chevron').forEach(c => c.style.transform = 'rotate(0deg)');
  container.querySelectorAll('.ubits-accordion-icon-circle').forEach(c => c.classList.remove('active'));
  container.querySelectorAll('.ubits-accordion-title').forEach(t => t.classList.remove('active'));

  if (!isCurrentlyOpen) {
    body.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
    title.classList.add('active');
    circle.classList.add('active');
  }
}

// Inicializa listeners del Floating Menu
function initFloatingMenuListeners(container, onFloatingMenuItemClick) {
  const floatingMenu = container.querySelector('.ubits-floating-menu');
  if (!floatingMenu) return;

  const closeButton = floatingMenu.querySelector('#ubits-floating-menu-close');
  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      container.style.display = 'none';
      floatingMenu.classList.remove('ubits-floating-menu--show');
    });
  }

  const accordionHeaders = floatingMenu.querySelectorAll('.ubits-accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      const accordionId = header.getAttribute('data-accordion-id');
      if (accordionId) {
        // Verificar si tiene subitems antes de toggle
        const accordionBody = floatingMenu.querySelector(`[data-body-id="${accordionId}"]`);
        const hasSubitems = accordionBody && accordionBody.querySelectorAll('.ubits-accordion-link').length > 0;
        
        if (hasSubitems) {
          // Tiene subitems: hacer toggle del accordion
          toggleAccordion(accordionId, floatingMenu);
        } else {
          // No tiene subitems: navegar directamente a la sección
          e.preventDefault();
          e.stopPropagation();
          
          if (onFloatingMenuItemClick) {
            onFloatingMenuItemClick(accordionId, undefined, undefined);
            // Cerrar el menú
            container.style.display = 'none';
            floatingMenu.classList.remove('ubits-floating-menu--show');
          }
        }
      }
    });
  });

  const links = floatingMenu.querySelectorAll('.ubits-accordion-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // ⚠️ Prevenir navegación por defecto
      e.stopPropagation(); // Evitar que se propague el evento
      
      const sectionId = link.getAttribute('data-section-id');
      const subitemId = link.getAttribute('data-subitem-id');
      const url = link.getAttribute('href');
      
      // Detectar si es un link directo (sin subsecciones)
      const isDirectLink = link.classList.contains('ubits-accordion-link--direct');

      if (onFloatingMenuItemClick) {
        // Para links directos, solo pasar sectionId (sin subitemId)
        // Para subitems, pasar ambos
        if (isDirectLink) {
          // Link directo: solo sectionId, no subitemId
          onFloatingMenuItemClick(sectionId || '', undefined, url || undefined);
        } else {
          // Subitem dentro de un accordion
          onFloatingMenuItemClick(sectionId || '', subitemId || undefined, url || undefined);
        }
      }
      
      // Cerrar el menú inmediatamente después del click
      container.style.display = 'none';
      floatingMenu.classList.remove('ubits-floating-menu--show');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && floatingMenu.classList.contains('ubits-floating-menu--show')) {
      container.style.display = 'none';
      floatingMenu.classList.remove('ubits-floating-menu--show');
    }
  });

  document.addEventListener('click', (e) => {
    if (floatingMenu.classList.contains('ubits-floating-menu--show')) {
      const target = e.target;
      if (!floatingMenu.contains(target) && !target.closest('[data-tab-id="modulos"]')) {
        container.style.display = 'none';
        floatingMenu.classList.remove('ubits-floating-menu--show');
      }
    }
  });
}

// Inicializa listeners del Profile Menu
function initProfileMenuListeners(container, items, onProfileMenuItemClick) {
  
  const profileMenu = container.querySelector('.ubits-profile-menu');
  if (!profileMenu) {
    return;
  }

  const menuItems = profileMenu.querySelectorAll('.ubits-profile-menu-item');
  
  menuItems.forEach((menuItem, index) => {
    const domItemId = menuItem.getAttribute('data-profile-item-id');
    const domHref = menuItem.getAttribute('data-href');
    
    // Buscar el item correspondiente en la configuración
    const configItem = items.find(i => i.id === domItemId);
    
    // Usar mousedown en lugar de click para capturar ANTES que otros listeners
    // O usar click pero SIN capture para que se ejecute después del bubbling normal
    menuItem.addEventListener('click', (e) => {
      
      // CRÍTICO: Prevenir default y stopPropagation INMEDIATAMENTE
      // para evitar que el listener de "click fuera" interfiera
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); // Detener TODOS los otros listeners en este elemento
      
      
      const itemId = menuItem.getAttribute('data-profile-item-id');
      
      if (itemId) {
        const item = items.find(i => i.id === itemId);
        
        if (item) {
          // Usar url o href (soporta ambos)
          const itemUrl = item.url || item.href;
          
          // Si es "Cambio de contraseña", no hacer nada
          const isPasswordChange = (itemId === 'password' || itemId === 'cambio-contraseña' || 
                                   item.label === 'Cambio de contraseña');
          if (isPasswordChange) {
            container.style.display = 'none';
            profileMenu.classList.remove('ubits-profile-menu--show');
            return;
          }
          
          // Si es "Modo Administrador" o "Modo colaborador", abrir en nueva pestaña
          const isModeSwitch = (itemId === 'admin-mode' || itemId === 'modo-colaborador' || 
                               item.label === 'Modo Administrador' || item.label === 'Modo colaborador') && itemUrl;
          
          if (isModeSwitch) {
            // Cerrar el menú primero
            container.style.display = 'none';
            profileMenu.classList.remove('ubits-profile-menu--show');
            
            // Abrir en nueva pestaña con timeout para asegurar que se ejecute
            setTimeout(() => {
              const newWindow = window.open(itemUrl, '_blank');
              if (!newWindow) {
                // Fallback: navegar en la misma pestaña
                window.location.href = itemUrl;
              }
            }, 10);
            
            // Llamar al callback si existe
            if (onProfileMenuItemClick) {
              onProfileMenuItemClick(itemId, item);
            }
            return;
          }
          
          // Si tiene onClick, ejecutarlo
          if (item.onClick) {
            item.onClick();
          // Si tiene url/href y no tiene onClick, navegar directamente
          } else if (itemUrl) {
            window.location.href = itemUrl;
          }
          
          // Llamar al callback si existe
          if (onProfileMenuItemClick) {
            onProfileMenuItemClick(itemId, item);
          }
          
          container.style.display = 'none';
          profileMenu.classList.remove('ubits-profile-menu--show');
        }
      }
    }, false); // Usar bubbling normal (false) pero con stopImmediatePropagation
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profileMenu.classList.contains('ubits-profile-menu--show')) {
      container.style.display = 'none';
      profileMenu.classList.remove('ubits-profile-menu--show');
    }
  });

  document.addEventListener('click', (e) => {
    if (profileMenu.classList.contains('ubits-profile-menu--show')) {
      const target = e.target;
      const isInsideMenu = profileMenu.contains(target);
      const isProfileTab = target.closest('[data-tab-id="perfil"]');
      const isMenuItem = target.closest('.ubits-profile-menu-item');
      
      // IMPORTANTE: Si es un item del menú, NO hacer nada aquí
      // El listener del item ya manejará el click con stopImmediatePropagation
      if (isMenuItem) {
        return;
      }
      // Solo cerrar si el click es fuera del menú Y no es en el tab de perfil
      if (!isInsideMenu && !isProfileTab) {
        container.style.display = 'none';
        profileMenu.classList.remove('ubits-profile-menu--show');
      }
    }
  }, { capture: false }); // Usar capture: false para ejecutar DESPUÉS del listener del item
}

// Inicializa los event listeners del TabBar
function initTabBarListeners(
  tabBarElement,
  items,
  onTabChange,
  darkModeEnabled,
  onDarkModeToggle,
  floatingMenuSections,
  profileMenuItems,
  onFloatingMenuItemClick,
  onProfileMenuItemClick,
  container
) {
  const tabItems = tabBarElement.querySelectorAll('.ubits-tabbar-item');
  
  const tabBarContainer = container || tabBarElement.parentElement;

  let floatingMenuContainer = null;
  let profileMenuContainer = null;

  if (floatingMenuSections && floatingMenuSections.length > 0) {
    floatingMenuContainer = document.getElementById('ubits-floating-menu-container') || document.createElement('div');
    floatingMenuContainer.id = 'ubits-floating-menu-container';
    floatingMenuContainer.style.cssText = 'position: fixed; top: 16px; left: 16px; right: 16px; bottom: 76px; display: none; z-index: 2000; overflow: hidden;';
    
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
    profileMenuContainer.style.cssText = 'position: fixed; bottom: 76px; left: 16px; right: 16px; max-width: 300px; display: none; z-index: 2001;';
    
    if (!document.getElementById('ubits-profile-menu-container')) {
      if (tabBarContainer) {
        tabBarContainer.appendChild(profileMenuContainer);
      } else {
        document.body.appendChild(profileMenuContainer);
      }
    }
    
    profileMenuContainer.innerHTML = renderProfileMenu(profileMenuItems);
    
    initProfileMenuListeners(profileMenuContainer, profileMenuItems, onProfileMenuItemClick);
  }

  
  tabItems.forEach((tabItemElement, tabIndex) => {
    const itemElement = tabItemElement;
    const tabId = itemElement.getAttribute('data-tab-id');
    
    if (!tabId) {
      return;
    }

    const item = items.find(i => i.id === tabId);
    if (!item) {
      return;
    }

    itemElement.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (tabId === 'modo-oscuro' && darkModeEnabled) {
        toggleDarkMode(tabBarElement, onDarkModeToggle);
        if (floatingMenuContainer) {
          floatingMenuContainer.style.display = 'none';
          const floatingMenu = floatingMenuContainer.querySelector('.ubits-floating-menu');
          if (floatingMenu) {
            floatingMenu.classList.remove('ubits-floating-menu--show');
          }
        }
        if (profileMenuContainer) {
          profileMenuContainer.style.display = 'none';
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenu.classList.remove('ubits-profile-menu--show');
          }
        }
        return;
      }

      if (tabId === 'modulos' && floatingMenuContainer) {
        const floatingMenu = floatingMenuContainer.querySelector('.ubits-floating-menu');
        if (floatingMenu) {
          if (floatingMenu.classList.contains('ubits-floating-menu--show')) {
            floatingMenu.classList.remove('ubits-floating-menu--show');
            floatingMenuContainer.style.display = 'none';
          } else {
            floatingMenu.classList.add('ubits-floating-menu--show');
            floatingMenuContainer.style.display = 'block';
            if (profileMenuContainer) {
              profileMenuContainer.style.display = 'none';
              const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
              if (profileMenu) {
                profileMenu.classList.remove('ubits-profile-menu--show');
              }
            }
          }
        }
        return;
      }

      if (tabId === 'perfil' && profileMenuContainer) {
        const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
        if (profileMenu) {
          const wasVisible = profileMenu.classList.contains('ubits-profile-menu--show');
          
          if (wasVisible) {
            profileMenu.classList.remove('ubits-profile-menu--show');
            profileMenuContainer.style.display = 'none';
          } else {
            profileMenu.classList.add('ubits-profile-menu--show');
            profileMenuContainer.style.display = 'block';
            
            if (floatingMenuContainer) {
              floatingMenuContainer.style.display = 'none';
              const floatingMenu = floatingMenuContainer.querySelector('.ubits-floating-menu');
              if (floatingMenu) {
                floatingMenu.classList.remove('ubits-floating-menu--show');
              }
            }
          }
        }
        return;
      }

      if (item.onClick) {
        item.onClick(item, event);
      }

      updateActiveTab(tabBarElement, tabId);

      if (onTabChange) {
        onTabChange(tabId, item, itemElement);
      }
    });
  });
}

// Crea e inicializa el componente TabBar en el DOM
window.createTabBar = function(options) {
  console.log('[createTabBar] 🚀 INICIANDO createTabBar');
  console.log('[createTabBar] Opciones recibidas:', JSON.stringify(options, null, 2));
  try {
    const containerId = options.containerId;
    const container = options.container;
    const items = options.items;
    const activeTabId = options.activeTabId;
    const onTabChange = options.onTabChange;
    const visible = options.visible || false;
    const darkModeEnabled = options.darkModeEnabled || false;
    const onDarkModeToggle = options.onDarkModeToggle;

    console.log('[createTabBar] Buscando contenedor...');
    let targetContainer = null;
    if (container) {
      targetContainer = container;
      console.log('[createTabBar] ✅ Usando contenedor pasado como parámetro');
    } else if (containerId) {
      targetContainer = document.getElementById(containerId);
      console.log('[createTabBar] Buscando por ID:', containerId, 'Encontrado:', !!targetContainer);
    }

    if (!targetContainer) {
      console.error('[createTabBar] ❌ Contenedor no encontrado');
      return null;
    }
    console.log('[createTabBar] ✅ Contenedor encontrado');

    console.log('[createTabBar] Llamando renderTabBar...');
    const html = renderTabBar({
      items,
      activeTabId,
      visible,
    });
    console.log('[createTabBar] HTML generado, longitud:', html.length);
    targetContainer.innerHTML = html;

    console.log('[createTabBar] Buscando elemento .ubits-tabbar...');
    const tabBarElement = targetContainer.querySelector('.ubits-tabbar');
    if (!tabBarElement) {
      console.error('[createTabBar] ❌ Elemento .ubits-tabbar no encontrado después de renderizar');
      return null;
    }
    console.log('[createTabBar] ✅ Elemento encontrado');

    console.log('[createTabBar] Inicializando listeners...');
    initTabBarListeners(
      tabBarElement,
      items,
      onTabChange,
      darkModeEnabled,
      onDarkModeToggle,
      options.floatingMenuSections,
      options.profileMenuItems,
      options.onFloatingMenuItemClick,
      options.onProfileMenuItemClick,
      targetContainer
    );
    console.log('[createTabBar] ✅ Listeners inicializados');

    console.log('[createTabBar] ✅ COMPLETADO, retornando elemento');
    return tabBarElement;
  } catch (error) {
    console.error('[createTabBar] ❌ ERROR:', error);
    console.error('[createTabBar] Stack:', error.stack);
    throw error;
  }
};



console.log('✅ window.createSidebar definido:', typeof window.createSidebar);
console.log('✅ window.createTabBar definido:', typeof window.createTabBar);
console.log('✅ window.createSubNav definido:', typeof window.createSubNav);
