/**
 * Components Loader
 * Carga y expone los componentes reales como funciones globales
 * Para usar sin servidor HTTP (file:// protocol)
 */

// Helper para renderizar iconos
function renderIconHelper(iconName, iconStyle = 'regular') {
  const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
  let name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  
  return `<i class="${iconClass} ${name}"></i>`;
}

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

// Renderiza el HTML del sidebar (CÓDIGO EXACTO DEL PROVIDER OFICIAL)
function renderSidebar(options) {
  const variant = options.variant || 'colaborador';
  const bodyButtons = options.bodyButtons || [];
  const footerButtons = options.footerButtons || [];
  const logoHref = options.logoHref || (variant === 'admin' ? 'admin.html' : 'index.html');
  const logoImage = options.logoImage || 'images/Ubits-logo.svg';
  const profileMenuItems = options.profileMenuItems || [];
  const avatarImage = options.avatarImage || 'images/Profile-image.jpg';
  const darkModeEnabled = options.darkModeEnabled !== false;
  const className = options.className || '';
  const attributes = options.attributes || {};

  const containerClasses = ['ubits-sidebar', className].filter(Boolean).join(' ');
  const containerAttrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

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
        data-tooltip="${button.tooltip || ''}"
        ${onClickAttr}
        ${hrefAttr}
        ${button.state === 'disabled' ? 'disabled' : ''}
      >
        ${renderIconHelper(button.icon)}
      </button>
    `;
  }).join('\n');
  

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
        data-section="${button.section}" 
        data-tooltip="${button.tooltip || ''}"
        ${button.id === 'darkmode-toggle' ? 'data-theme="light"' : ''}
        ${onClickAttr}
        ${hrefAttr}
        ${button.state === 'disabled' ? 'disabled' : ''}
      >
        ${renderIconHelper(button.icon)}
      </button>
    `;
  }).join('\n');

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
          <div class="ubits-sidebar-logo" data-href="${logoHref}">
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

// Inicializa tooltips para el sidebar
function initTooltips(sidebarElement) {
  const tooltipElement = document.getElementById('ubits-sidebar-tooltip');
  if (!tooltipElement) {
    return;
  }

  // Verificar estilos CSS del tooltip
  const computedStyle = window.getComputedStyle(tooltipElement);

  // Verificar si el CSS del sidebar está cargado
  const sidebarStylesheet = Array.from(document.styleSheets).find(sheet => {
    try {
      return sheet.href && sheet.href.includes('sidebar.css');
    } catch (e) {
      return false;
    }
  });

  // ⚠️ CRÍTICO: Función global para ocultar tooltip (compartida por todos los botones)
  const hideTooltipGlobal = () => {
    if (tooltipElement) {
      tooltipElement.classList.remove('show');
      tooltipElement.style.opacity = '0';
      tooltipElement.style.visibility = 'hidden';
    }
  };

  const buttons = sidebarElement.querySelectorAll('[data-tooltip]');
  
  // ⚠️ CRÍTICO: Observar TODOS los botones para detectar cuando CUALQUIERA se vuelve activo
  // Solo ocultar el tooltip si el tooltip visible pertenece al botón que se volvió activo
  const allButtons = sidebarElement.querySelectorAll('.ubits-sidebar-nav-button');
  
  allButtons.forEach((btn, idx) => {
    const globalObserver = new MutationObserver(() => {
      if (btn.classList.contains('active')) {
        // Verificar si el tooltip está mostrando el texto de este botón específico
        const btnTooltipText = btn.getAttribute('data-tooltip');
        const tooltipText = tooltipElement.textContent;
        const isTooltipVisible = tooltipElement.classList.contains('show');
        
        if (btnTooltipText && tooltipText === btnTooltipText && isTooltipVisible) {
          // Solo ocultar si el tooltip visible pertenece al botón que se volvió activo
          hideTooltipGlobal();
        }
      }
    });
    
    globalObserver.observe(btn, {
      attributes: true,
      attributeFilter: ['class']
    });
  });
  
  buttons.forEach((button, buttonIdx) => {
    const tooltipText = button.getAttribute('data-tooltip');
    if (!tooltipText) {
      return;
    }

    let hideTimeout = null;
    let isTooltipVisible = false;

    const showTooltip = () => {
      // ⚠️ CRÍTICO: Solo verificar si ESTE botón específico está activo
      // NO bloquear si otros botones están activos, solo si este botón está activo
      const isThisButtonActive = button.classList.contains('active');
      
      if (isThisButtonActive) {
        hideTooltipGlobal();
        return; // NO mostrar tooltip si este botón está activo
      }

      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }

      const rect = button.getBoundingClientRect();
      const tooltip = tooltipElement;
      
      tooltip.textContent = tooltipText;
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
      tooltip.classList.add('show');
      isTooltipVisible = true;
      
      // Posicionar tooltip a la derecha del botón
      const leftPos = `${rect.right + 12}px`;
      const topPos = `${rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2)}px`;
      tooltip.style.left = leftPos;
      tooltip.style.top = topPos;
    };

    const hideTooltip = () => {
      hideTooltipGlobal(); // Usar función global para asegurar que se oculte
      isTooltipVisible = false;
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
    };

    button.addEventListener('mouseenter', () => {
      // Solo mostrar tooltip si este botón NO está activo
      if (!button.classList.contains('active')) {
        showTooltip();
      } else {
        hideTooltip();
      }
    });

    button.addEventListener('mouseleave', () => {
      hideTooltip();
    });

    // ⚠️ IMPORTANTE: Ocultar tooltip al hacer clic en el botón
    button.addEventListener('click', () => {
      hideTooltip();
    });

    // También ocultar tooltip cuando el botón pierde el foco
    button.addEventListener('blur', () => {
      hideTooltip();
  });
    
    // ⚠️ IMPORTANTE: Observar cambios en la clase 'active' de ESTE botón específico
    const observer = new MutationObserver(() => {
      const isActive = button.classList.contains('active');
      
      // Si este botón específico se vuelve activo, ocultar tooltip inmediatamente
      if (isActive) {
        hideTooltipGlobal();
      }
    });
    
    observer.observe(button, {
      attributes: true,
      attributeFilter: ['class']
    });
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
window.createSidebar = function(options) {
  try {
    const containerId = options.containerId;
    const bodyButtons = options.bodyButtons;
    const height = options.height;
    const variant = options.variant || 'colaborador'; // Guardar variant para uso posterior

    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

  const containerStyle = window.getComputedStyle(container);
  if (containerStyle.position === 'static') {
    container.style.position = 'relative';
  }

    const sidebarHTML = renderSidebar(options);
    
    container.innerHTML = sidebarHTML;

    const sidebarElement = container.querySelector('.ubits-sidebar');
  
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
      
      // ⚠️ IMPORTANTE: Ocultar tooltip cuando se activa el botón inicial
      const tooltipElement = document.getElementById('ubits-sidebar-tooltip');
      if (tooltipElement) {
        tooltipElement.classList.remove('show');
      }
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

      // ⚠️ IMPORTANTE: Ocultar tooltip cuando el botón se vuelve activo
      const tooltipElement = document.getElementById('ubits-sidebar-tooltip');
      if (tooltipElement) {
        tooltipElement.classList.remove('show');
      }
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

    // Verificación final de estilos antes de retornar
    if (sidebarElement) {
      const finalStyle = window.getComputedStyle(sidebarElement);
    }
    
    return sidebarElement;
  } catch (error) {
    throw error;
  }
};

// ========================================
// SUBNAV COMPONENT - CÓDIGO EXACTO DEL PROVIDER OFICIAL
// ========================================

// Configuración de variantes del SubNav (del provider oficial)
function getSubNavConfig(variant) {
  const SUBNAV_VARIANTS = {
    template: {
      name: 'Plantilla',
      tabs: [
        { id: 'section1', label: 'Sección 1', icon: 'home' },
        { id: 'section2', label: 'Sección 2', icon: 'book' },
        { id: 'section3', label: 'Sección 3', icon: 'chart-line' },
        { id: 'section4', label: 'Sección 4', icon: 'cog' },
        { id: 'section5', label: 'Sección 5', icon: 'star' }
      ]
    },
    aprendizaje: {
      name: 'Aprendizaje',
      tabs: [
        { id: 'home', label: 'Inicio', icon: 'home', url: 'home-learn.html' },
        { id: 'catalog', label: 'Catálogo', icon: 'book', url: 'catalogo.html' },
        { id: 'corporate', label: 'U. Corporativa', icon: 'building-columns', url: 'u-corporativa.html' },
        { id: 'study-zone', label: 'Zona de estudio', icon: 'books', url: 'zona-estudio.html' }
      ]
    },
    desempeno: {
      name: 'Desempeño',
      tabs: [
        { id: 'evaluations', label: 'Evaluaciones 360', icon: 'chart-pie', url: 'evaluaciones-360.html' },
        { id: 'objectives', label: 'Objetivos', icon: 'bullseye', url: 'objetivos.html' },
        { id: 'metrics', label: 'Métricas', icon: 'chart-line', url: 'metricas.html' },
        { id: 'reports', label: 'Reportes', icon: 'file-chart-line', url: 'reportes.html' }
      ]
    },
    encuestas: {
      name: 'Encuestas',
      tabs: [
        { id: 'encuestas', label: 'Encuestas', icon: 'clipboard-list-check', url: 'encuestas.html' }
      ]
    },
    tareas: {
      name: 'Tareas',
      tabs: [
        { id: 'plans', label: 'Planes', icon: 'layer-group', url: 'planes.html' },
        { id: 'tasks', label: 'Tareas', icon: 'tasks', url: 'tareas.html' }
      ]
    },
    empresa: {
      name: 'Empresa',
      tabs: [
        { id: 'gestion-usuarios', label: 'Gestión de usuarios', icon: 'users' },
        { id: 'organigrama', label: 'Organigrama', icon: 'sitemap' },
        { id: 'datos-empresa', label: 'Datos de empresa', icon: 'building' },
        { id: 'personalizacion', label: 'Personalización', icon: 'paint-brush' },
        { id: 'roles-permisos', label: 'Roles y permisos', icon: 'user-shield' },
        { id: 'comunicaciones', label: 'Comunicaciones', icon: 'envelope' }
      ]
    },
    'admin-aprendizaje': {
      name: 'Aprendizaje',
      tabs: [
        { id: 'lms-cursos', label: 'LMS - Cursos propios', icon: 'book' },
        { id: 'plan-formacion', label: 'Plan de formación', icon: 'clipboard-list-check' },
        { id: 'certificados', label: 'Certificados', icon: 'file-certificate' },
        { id: 'metricas-empresa', label: 'Métricas de empresa', icon: 'chart-line' }
      ]
    },
    'admin-desempeno': {
      name: 'Desempeño',
      tabs: [
        { id: 'evaluations', label: 'Evaluaciones 360', icon: 'chart-pie' },
        { id: 'objectives', label: 'Objetivos', icon: 'bullseye' },
        { id: 'matriz-talento', label: 'Matriz de Talento', icon: 'sitemap' }
      ]
    }
  };
  
  return SUBNAV_VARIANTS[variant] || SUBNAV_VARIANTS.template;
}

// Renderiza el HTML del SubNav (CÓDIGO EXACTO DEL PROVIDER OFICIAL)
function renderSubNav(options) {
  
  const variant = options.variant || 'template';
  const customTabs = options.tabs;
  const activeTabId = options.activeTabId;
  const showIcons = options.showIcons || false;

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
    
    // Renderizar icono solo si showIcons es true
    const iconHTML = showIcons ? renderIconHelper(tab.icon) : '';
    
    return `
      <button 
        class="ubits-sub-nav-tab ${activeClass}" 
        data-tab="${tab.id}"
        ${tab.url ? `data-url="${tab.url}"` : ''}
        ${tab.onClick ? 'data-has-click-handler="true"' : ''}
      >
        ${iconHTML}
        <span>${tab.label}</span>
      </button>
    `;
  }).join('');

  const html = `
    <nav class="ubits-sub-nav" data-variant="${variant}">
      <div class="ubits-sub-nav-tabs">
        ${tabsHTML}
      </div>
    </nav>
  `.trim();
  
  return html;
}

// Inicializa los event listeners de los tabs (CÓDIGO EXACTO DEL PROVIDER OFICIAL)
function initTabListeners(subNavElement, options) {
  // ⚠️ IMPORTANTE: Remover listeners anteriores antes de agregar nuevos
  // Esto previene que se agreguen múltiples listeners cuando updateSubNav se llama varias veces
  const existingTabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
  existingTabs.forEach((tab) => {
    // Remover todos los event listeners clonando el elemento
    const newTab = tab.cloneNode(true);
    tab.parentNode?.replaceChild(newTab, tab);
  });
  
  // Obtener los tabs actualizados después del clonado
  const tabs = subNavElement.querySelectorAll('.ubits-sub-nav-tab');
  
  const handleTabClick = (tabElement) => {
    const tabId = tabElement.getAttribute('data-tab');
    const url = tabElement.getAttribute('data-url');
    
    // Remover active de todos los tabs
    tabs.forEach(t => t.classList.remove('ubits-sub-nav-tab--active'));
    
    // Agregar active al tab clickeado
    tabElement.classList.add('ubits-sub-nav-tab--active');
    
    // ⚠️ IMPORTANTE: Si hay un callback onTabChange, usarlo en lugar de navegar directamente
    // Esto permite que el ContentManager maneje el cambio de contenido dinámicamente
    if (options.onTabChange) {
      options.onTabChange(tabId || '', tabElement);
      // Disparar evento personalizado
      const event = new CustomEvent('subNavTabClick', {
        detail: { tabId: tabId, tabElement: tabElement }
      });
      document.dispatchEvent(event);
      return;
    }
    
    // Solo navegar a URL si NO hay callback onTabChange
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
    
    // Disparar evento personalizado
    const event = new CustomEvent('subNavTabClick', {
      detail: { tabId: tabId, tabElement: tabElement }
    });
    document.dispatchEvent(event);
  };

  // Event listeners para tabs
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleTabClick(tab);
    });
  });
}

// Crea un SubNav interactivo en el DOM (CÓDIGO EXACTO DEL PROVIDER OFICIAL)
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

// Renderiza el HTML del TabBar (CÓDIGO EXACTO DEL PROVIDER OFICIAL)
function renderTabBar(options) {
  const items = options.items || [];
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

// Renderiza un item del tree menu recursivamente usando la estructura del componente TreeMenu de Storybook
function renderTreeMenuItem(item, level = 0, size = 'md', parentSectionId = null) {
  // Verificar si tiene hijos (children o subitems)
  const hasChildren = (item.children && item.children.length > 0) || (item.subitems && item.subitems.length > 0);
  
  // Un item es un link si NO tiene hijos (independientemente de isLink o url)
  // Si tiene hijos, es expandible (con chevron)
  // Si NO tiene hijos, es un link directo (sin chevron)
  const isLink = !hasChildren;
  
  const nodeId = `floating-menu-node-${level}-${item.id}`;
  
  // Si es nivel 0, este item es la sección principal
  const sectionId = level === 0 ? item.id : (parentSectionId || item.id);
  // Si es nivel > 0, es un subitem
  const subitemId = level > 0 ? item.id : null;
  
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
    
    // Para subitems, usar data-section-id de la sección principal y data-subitem-id del subitem
    const dataAttributes = level > 0 && parentSectionId
      ? `data-section-id="${parentSectionId}" data-subitem-id="${item.id}"`
      : `data-section-id="${item.id}"`;
    
    return `
      <div class="ubits-tree-node ubits-tree-node--vertical" data-level="${level}">
        <a 
          href="${item.url || '#'}" 
          class="ubits-tree-node__content" 
          ${dataAttributes}
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
  const children = item.children || item.subitems?.map(sub => ({
    id: sub.id,
    title: sub.title || sub.title,
    icon: sub.icon || sub.icon,
    url: sub.url || sub.url,
    children: undefined
  })) || [];
  
  const childrenHTML = children.map(child => renderTreeMenuItem(child, level + 1, size, sectionId)).join('');
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
        <span class="ubits-tree-node__chevron" style="width: ${chevronSize}; height: ${chevronSize}; display: flex; align-items: center; justify-content: center;">
          <i class="far fa-chevron-right" style="font-size: ${chevronSize}; transition: transform 0.2s ease;"></i>
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

// Renderiza el Floating Menu como Tree Menu usando la estructura del componente TreeMenu de Storybook
function renderFloatingMenu(sections, size = 'md') {
  const treeHTML = sections.map(section => renderTreeMenuItem(section, 0, size)).join('');

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

// Renderiza un item del Profile Menu Tree recursivamente
function renderProfileTreeMenuItem(item, level = 0) {
  const hasChildren = item.children && item.children.length > 0;
  const indent = level * 24; // 24px de indentación por nivel
  const url = item.url || item.href || '';
  
  // Si no tiene hijos, renderizar como enlace simple
  if (!hasChildren) {
    return `
      <div class="ubits-profile-tree-item" data-profile-item-id="${item.id}" data-tree-level="${level}">
        <a href="${url || '#'}" class="ubits-profile-tree-link" ${item.onClick ? 'data-has-onclick="true"' : ''}>
          <i class="far fa-${item.icon} ubits-profile-tree-icon"></i>
          <span class="ubits-profile-tree-text">${item.label}</span>
        </a>
      </div>
    `;
  }
  
  // Si tiene hijos, renderizar como nodo expandible
  const childrenHTML = item.children.map(child => renderProfileTreeMenuItem(child, level + 1)).join('');
  
  return `
    <div class="ubits-profile-tree-item" data-profile-item-id="${item.id}" data-tree-level="${level}">
      <div class="ubits-profile-tree-node" data-tree-node-id="${item.id}">
        <div class="ubits-profile-tree-header">
          <i class="far fa-${item.icon} ubits-profile-tree-icon"></i>
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

// Renderiza el Profile Menu como Tree Menu
function renderProfileMenu(items) {
  const itemsHTML = items.map(item => renderProfileTreeMenuItem(item, 0)).join('');

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

// Toggle de tree menu node (expandir/colapsar) usando la nueva estructura
function toggleTreeMenuNode(container, nodeId) {
  const content = container.querySelector(`[data-node-id="${nodeId}"]`);
  const children = container.querySelector(`[data-children-id="${nodeId}"]`);
  
  if (!content || !children) {
    return;
  }

  const chevron = content.querySelector('.ubits-tree-node__chevron i');
  if (!chevron) {
    return;
  }

  // Verificar si está expandido usando data-expanded y computedStyle
  const isExpanded = content.getAttribute('data-expanded') === 'true';
  const computedStyle = window.getComputedStyle(children);
  const isCurrentlyOpen = computedStyle.display !== 'none';

  if (isCurrentlyOpen || isExpanded) {
    // Cerrar
    children.style.display = 'none';
    content.setAttribute('data-expanded', 'false');
    content.setAttribute('aria-expanded', 'false');
    chevron.style.transform = 'rotate(0deg)';
  } else {
    // Abrir
    children.style.display = 'block';
    content.setAttribute('data-expanded', 'true');
    content.setAttribute('aria-expanded', 'true');
    chevron.style.transform = 'rotate(90deg)';
  }
}

// Toggle de profile tree menu node (expandir/colapsar)
function toggleProfileTreeMenuNode(container, nodeId) {
  const children = container.querySelector(`[data-tree-children-id="${nodeId}"]`);
  const chevron = container.querySelector(`[data-chevron-id="${nodeId}"]`);

  if (!children || !chevron) {
    return;
  }

  // Verificar si está abierto usando computedStyle
  const computedStyle = window.getComputedStyle(children);
  const isCurrentlyOpen = computedStyle.display !== 'none';

  if (isCurrentlyOpen) {
    // Cerrar
    children.style.display = 'none';
    chevron.style.transform = 'rotate(0deg)';
  } else {
    // Abrir
    children.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
  }
}

// Inicializa listeners del Floating Menu usando la nueva estructura del TreeMenu
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

  // Usar un solo event listener en el contenedor del tree menu (matching TabBarProvider.ts)
  const treeMenu = floatingMenu.querySelector('.ubits-tree-menu');
  if (treeMenu) {
    treeMenu.addEventListener('click', (e) => {
      const target = e.target.closest('.ubits-tree-node__content');
      if (!target) return;

      e.preventDefault();
      e.stopPropagation();

      const isExpandable = target.classList.contains('ubits-tree-node__content--expandable');
      const nodeId = target.getAttribute('data-node-id');
      const sectionId = target.getAttribute('data-section-id');
      const subitemId = target.getAttribute('data-subitem-id'); // Para subitems
      const url = target.getAttribute('href');

      // Manejar expandir/colapsar para nodos con hijos (matching TabBarProvider.ts)
      if (isExpandable && nodeId) {
        const children = treeMenu.querySelector(`[data-children-id="${nodeId}"]`);
        const chevron = target.querySelector('.ubits-tree-node__chevron i');
        const isExpanded = target.getAttribute('data-expanded') === 'true';
        
        if (children) {
          if (isExpanded) {
            children.style.display = 'none';
            target.setAttribute('data-expanded', 'false');
            target.setAttribute('aria-expanded', 'false');
            if (chevron) {
              chevron.className = 'far fa-chevron-right';
              chevron.style.fontSize = chevron.style.fontSize || '14px';
            }
          } else {
            children.style.display = 'block';
            target.setAttribute('data-expanded', 'true');
            target.setAttribute('aria-expanded', 'true');
            if (chevron) {
              chevron.className = 'far fa-chevron-down';
              chevron.style.fontSize = chevron.style.fontSize || '14px';
            }
          }
        }
      }
      
      // Manejar selección (active state) para TODOS los nodos (expandibles y links) - matching TabBarProvider.ts
      // Remover active de todos los nodos
      const allContents = treeMenu.querySelectorAll('.ubits-tree-node__content');
      allContents.forEach((node) => {
        node.classList.remove('ubits-tree-node__content--active');
        node.removeAttribute('aria-selected');
      });
      
      // Agregar active al nodo clickeado
      target.classList.add('ubits-tree-node__content--active');
      target.setAttribute('aria-selected', 'true');
      
      // Si es un link directo (no expandible), ejecutar callback y cerrar menú
      if (!isExpandable && (sectionId || url)) {
        if (onFloatingMenuItemClick) {
          // Si hay subitemId, pasar la sección principal y el subitemId
          // Si no hay subitemId, pasar solo la sección (es un link directo de nivel 0)
          onFloatingMenuItemClick(sectionId || '', subitemId || undefined, url || undefined);
        }
        
        // Cerrar el menú inmediatamente después del click
        container.style.display = 'none';
        floatingMenu.classList.remove('ubits-floating-menu--show');
      }
    });

    // Soporte para teclado (Enter/Space)
    treeMenu.addEventListener('keydown', (e) => {
      const target = e.target.closest('.ubits-tree-node__content');
      if (!target) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        target.click();
      }
    });
  }

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

  // Tree menu nodes (expandible/collapsible)
  const treeNodes = profileMenu.querySelectorAll('.ubits-profile-tree-node');
  treeNodes.forEach(node => {
    const header = node.querySelector('.ubits-profile-tree-header');
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
      e.stopImmediatePropagation();
      
      const itemId = link.closest('[data-profile-item-id]')?.getAttribute('data-profile-item-id');
      
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
    }, false);
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
    
    const floatingMenuHTML = renderFloatingMenu(floatingMenuSections, 'md');
    floatingMenuContainer.innerHTML = floatingMenuHTML;
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
  try {
    const containerId = options.containerId;
    const container = options.container;
    const items = options.items;
    const activeTabId = options.activeTabId;
    const onTabChange = options.onTabChange;
    const visible = options.visible || false;
    const darkModeEnabled = options.darkModeEnabled || false;
    const onDarkModeToggle = options.onDarkModeToggle;

    let targetContainer = null;
    if (container) {
      targetContainer = container;
    } else if (containerId) {
      targetContainer = document.getElementById(containerId);
    }

    if (!targetContainer) {
      return null;
    }

    const html = renderTabBar({
      items,
      activeTabId,
      visible,
    });
    
    targetContainer.innerHTML = html;

    const tabBarElement = targetContainer.querySelector('.ubits-tabbar');
    if (!tabBarElement) {
      return null;
    }
    
    // Verificar estilos aplicados
    const computedStyle = window.getComputedStyle(tabBarElement);
    
    // Verificar si los estilos están aplicados
    const hasBackground = computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && computedStyle.backgroundColor !== 'transparent';
    const hasDisplay = computedStyle.display && computedStyle.display !== 'none';
    
    // Verificar items del tabbar
    const tabBarItems = tabBarElement.querySelectorAll('.ubits-tabbar-item');

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

    return tabBarElement;
  } catch (error) {
    throw error;
  }
};



