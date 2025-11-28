/**
 * Product Configurations
 * Configuraciones centralizadas para cada producto/módulo
 * Cambios aquí se reflejan automáticamente en todos los templates
 */

// Configuración base para Sidebar - USANDO CONFIGURACIONES REALES DEL SISTEMA
// Basado en: packages/components/sidebar/src/configs/sidebarVariants.ts
const defaultSidebarConfig = {
  variant: 'colaborador',
  bodyButtons: [
    // ⚠️ IMPORTANTE: Primer botón es fa-laptop para "Administrador", NO user-shield
    // Este botón debe navegar a admin.html (no usar ContentManager)
    { section: 'admin', icon: 'fa-laptop', tooltip: 'Administrador', href: 'template-admin.html', isNavigation: true },
    { section: 'aprendizaje', icon: 'fa-graduation-cap', tooltip: 'Aprendizaje', href: 'home-learn.html' },
    { section: 'diagnóstico', icon: 'fa-chart-mixed', tooltip: 'Diagnóstico', href: 'diagnostico.html' },
    { section: 'desempeño', icon: 'fa-bars-progress', tooltip: 'Desempeño', href: 'evaluaciones-360.html' },
    { section: 'encuestas', icon: 'fa-clipboard', tooltip: 'Encuestas', href: 'encuestas.html' },
    { section: 'reclutamiento', icon: 'fa-users', tooltip: 'Reclutamiento', href: 'reclutamiento.html' },
    { section: 'tareas', icon: 'fa-layer-group', tooltip: 'Tareas', href: 'planes.html' },
    { section: 'ubits-ai', icon: 'fa-sparkles', tooltip: 'UBITS AI', href: 'ubits-ai.html' }
  ],
  footerButtons: [],
  profileMenuItems: [
    { id: 'perfil', icon: 'fa-user', label: 'Ver mi perfil' },
    { divider: true },
    { id: 'admin-mode', icon: 'fa-laptop', label: 'Modo Administrador', href: 'template-admin.html' },
    { divider: true },
    { id: 'password', icon: 'fa-key', label: 'Cambio de contraseña', onClick: () => {
      // Sin acción
    }},
    { id: 'logout', icon: 'fa-sign-out', label: 'Cerrar sesión', onClick: () => {
      // Sin acción
    }}
  ],
  avatarImage: 'assets/images/Profile-image.jpg',
  logoImage: 'assets/images/Ubits-logo.svg',
  logoHref: 'index.html',
  darkModeEnabled: true
};

// Configuración para SubNav - Template
const templateSubNavConfig = {
  variant: 'template',
  tabs: [
    { id: 'section1', label: 'Sección 1', icon: 'home', active: true },
    { id: 'section2', label: 'Sección 2', icon: 'chart-line' },
    { id: 'section3', label: 'Sección 3', icon: 'settings' }
  ],
  activeTabId: 'section1'
};

// Configuración para SubNav - Aprendizaje
const aprendizajeSubNavConfig = {
  variant: 'aprendizaje',
  tabs: [
    { id: 'home', label: 'Inicio', icon: 'home', active: true },
    { id: 'catalog', label: 'Catálogo', icon: 'book' },
    { id: 'corporate', label: 'U. Corporativa', icon: 'building-columns' },
    { id: 'study-zone', label: 'Zona de estudio', icon: 'books' }
  ],
  activeTabId: 'home'
};

// Configuración para SubNav - Desempeño
const desempenoSubNavConfig = {
  variant: 'desempeno',
  tabs: [
    { id: 'evaluations', label: 'Evaluaciones 360', icon: 'chart-pie', active: true },
    { id: 'objectives', label: 'Objetivos', icon: 'bullseye' },
    { id: 'metrics', label: 'Métricas', icon: 'chart-line' },
    { id: 'reports', label: 'Reportes', icon: 'file-chart-line' }
  ],
  activeTabId: 'evaluations'
};

// Configuración para TabBar
const defaultTabBarConfig = {
  items: [
    { id: 'modulos', label: 'Módulos', icon: 'grid-2' },
    { id: 'perfil', label: 'Mi perfil', avatar: 'assets/images/Profile-image.jpg', avatarAlt: 'Mi perfil' },
    { id: 'modo-oscuro', label: 'Modo oscuro', icon: 'moon' }
  ],
  activeTabId: 'modulos',
  darkModeEnabled: true,
  floatingMenuSections: [
    {
      id: 'aprendizaje',
      title: 'Aprendizaje',
      icon: 'graduation-cap',
      subitems: [
        { id: 'inicio', title: 'Inicio', icon: 'home', url: 'home-learn.html' },
        { id: 'catalogo', title: 'Catálogo', icon: 'book', url: 'catalogo.html' },
        { id: 'corporativa', title: 'U. Corporativa', icon: 'building-columns', url: 'u-corporativa.html' },
        { id: 'zona-estudio', title: 'Zona de estudio', icon: 'books', url: 'zona-estudio.html' }
      ]
    },
    {
      id: 'diagnóstico', // ⚠️ IMPORTANTE: Usar 'diagnóstico' (con tilde) para que coincida con ContentManager
      title: 'Diagnóstico',
      icon: 'chart-mixed',
      url: 'diagnostico.html',
      isLink: true,
      clickable: true
    },
    {
      id: 'desempeño', // ⚠️ IMPORTANTE: Usar 'desempeño' (con ñ) para que coincida con ContentManager
      title: 'Desempeño',
      icon: 'bars-progress',
      subitems: [
        { id: 'evaluaciones-360', title: 'Evaluaciones 360', icon: 'chart-pie', url: 'evaluaciones-360.html' },
        { id: 'objetivos', title: 'Objetivos', icon: 'bullseye', url: 'objetivos.html' },
        { id: 'metricas', title: 'Métricas', icon: 'chart-line', url: 'metricas.html' },
        { id: 'reportes', title: 'Reportes', icon: 'file-chart-line', url: 'reportes.html' }
      ]
    },
    {
      id: 'encuestas',
      title: 'Encuestas',
      icon: 'clipboard-list-check',
      url: 'encuestas.html',
      isLink: true,
      clickable: false
    },
    {
      id: 'reclutamiento',
      title: 'Reclutamiento',
      icon: 'users',
      url: 'reclutamiento.html',
      isLink: true,
      clickable: true
    },
    {
      id: 'tareas',
      title: 'Tareas',
      icon: 'layer-group',
      subitems: [
        { id: 'planes', title: 'Planes', icon: 'calendar', url: 'planes.html' },
        { id: 'tareas', title: 'Tareas', icon: 'tasks', url: 'tareas.html' }
      ]
    },
    {
      id: 'ubits-ai',
      title: 'UBITS AI',
      icon: 'sparkles',
      url: 'ubits-ai.html',
      isLink: true,
      clickable: true
    }
  ],
  profileMenuItems: [
    { id: 'ver-perfil', label: 'Ver mi perfil', icon: 'user' },
    { id: 'admin-mode', label: 'Modo Administrador', icon: 'laptop', url: 'template-admin.html' },
    { id: 'cambio-contraseña', label: 'Cambio de contraseña', icon: 'key', onClick: () => {
      // Sin acción
    }},
    { id: 'cerrar-sesion', label: 'Cerrar sesión', icon: 'sign-out-alt', onClick: () => {
      // Sin acción
    }}
  ]
};

/**
 * Configuraciones por producto
 * Cada producto tiene su propia configuración de Sidebar, SubNav, TabBar
 */
window.UBITS_PRODUCTS = {
  'template-colaborador': {
    name: 'Template Colaborador',
    description: 'Template para colaboradores',
    sidebar: {
      ...defaultSidebarConfig,
      variant: 'colaborador',
      initialActiveSection: 'aprendizaje' // ⚠️ Activar botón de "Aprendizaje" al cargar
    },
    subnav: templateSubNavConfig,
    tabbar: {
    ...defaultTabBarConfig,
    onTabChange: (tabId, item, element) => {
      // "modulos" y "perfil" no navegan, solo abren menús
      // "modo-oscuro" ya se maneja por separado
    },
    onFloatingMenuItemClick: (sectionId, subitemId, url) => {
      
      // ⚠️ IMPORTANTE: Usar ContentManager en lugar de redirecciones
      if (window.UBITS_ContentManager) {
        // Si hay subitemId, es una subsección (ej: "inicio" dentro de "aprendizaje")
        // Si NO hay subitemId PERO hay sectionId, es un link directo sin subsecciones (ej: "diagnóstico", "encuestas")
        
        if (subitemId) {
          // Es una subsección: cambiar contenido dentro de la sección principal
          
          // Mapear subitemId a los IDs que usa el ContentManager (algunos pueden diferir)
          const subitemMap = {
            'inicio': 'home',
            'catalogo': 'catalog',
            'corporativa': 'corporate',
            'zona-estudio': 'study-zone',
            'evaluaciones-360': 'evaluations',
            'objetivos': 'objectives',
            'metricas': 'metrics',
            'reportes': 'reports',
            'planes': 'planes',
            'tareas': 'tasks'
          };
          
          const mappedSubitemId = subitemMap[subitemId] || subitemId;
          
          // ⚠️ CRÍTICO: Establecer currentSection inmediatamente ANTES de cualquier otra operación
          // Esto asegura que ResponsiveManager pueda acceder a currentSection cuando cambia el tamaño
          window.UBITS_ContentManager.currentSection = sectionId;
          console.log('🔍 [Template Colaborador TabBar] ✅ currentSection establecido a:', sectionId);
          
          // ⚠️ IMPORTANTE: Pasar mappedSubitemId directamente a handleSectionChange
          // Esto asegura que el SubNav se cree con el tab correcto activo desde el inicio
          window.UBITS_ContentManager.handleSectionChange(sectionId, mappedSubitemId);
          
          // Actualizar Sidebar también
          const sidebarElement = document.querySelector('.ubits-sidebar');
          if (sidebarElement) {
            sidebarElement.querySelectorAll('.ubits-sidebar-nav-button').forEach(btn => {
              btn.classList.remove('active');
              btn.blur();
            });
            const targetButton = sidebarElement.querySelector(`[data-section="${sectionId}"]`);
            if (targetButton) {
              targetButton.classList.add('active');
              targetButton.blur();
            }
          }
        } else if (sectionId) {
          // Es una sección principal: cambiar de sección completa
          // ⚠️ CRÍTICO: Establecer currentSection inmediatamente
          window.UBITS_ContentManager.currentSection = sectionId;
          console.log('🔍 [Template Colaborador TabBar] ✅ currentSection establecido a:', sectionId);
          
          // Luego llamar handleSectionChange
          window.UBITS_ContentManager.handleSectionChange(sectionId);
          
          // También actualizar el Sidebar para que muestre el botón activo correspondiente
          const sidebarElement = document.querySelector('.ubits-sidebar');
          if (sidebarElement) {
            // Remover active de todos los botones
            sidebarElement.querySelectorAll('.ubits-sidebar-nav-button').forEach(btn => {
              btn.classList.remove('active');
              btn.blur();
            });
            // Activar el botón correspondiente
            const targetButton = sidebarElement.querySelector(`[data-section="${sectionId}"]`);
            if (targetButton) {
              targetButton.classList.add('active');
              targetButton.blur(); // No dar focus para evitar borde azul
            }
          }
        }
      } else {
        if (url) {
          window.location.href = url;
        }
      }
      // ⚠️ NOTA: El menú ya se cerró en el handler del link en components-loader.js
    },
    onProfileMenuItemClick: (itemId, item) => {
      
      // Si es "Cambio de contraseña", no hacer nada
      if (itemId === 'cambio-contraseña' || itemId === 'password' || item.label === 'Cambio de contraseña') {
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      // Si es "Ver mi perfil", usar ContentManager
      if ((itemId === 'ver-perfil' || itemId === 'perfil' || item.label === 'Ver mi perfil') && window.UBITS_ContentManager) {
        window.UBITS_ContentManager.handleSectionChange('perfil');
        
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      // Si es "Modo Administrador" o "Modo colaborador", abrir en nueva pestaña
      if ((itemId === 'admin-mode' || itemId === 'modo-colaborador' || item.label === 'Modo Administrador' || item.label === 'Modo colaborador') && item.url) {
        window.open(item.url, '_blank');
        
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      // Para otros items, si hay onClick, ejecutarlo, si no, usar url como fallback
      if (item.onClick) {
        item.onClick();
      } else if (item.url) {
        window.location.href = item.url;
      }
      
      // Cerrar el Profile Menu después del click
      const profileMenuContainer = document.getElementById('profile-menu-container');
      if (profileMenuContainer) {
        const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
        if (profileMenu) {
          profileMenuContainer.style.display = 'none';
        }
      }
    }
  },
    theme: {
      default: 'light',
      persist: true
    }
  },
  'aprendizaje': {
    name: 'Aprendizaje',
    description: 'Módulo de aprendizaje y cursos',
    sidebar: {
      ...defaultSidebarConfig,
      variant: 'colaborador',
      // Puedes personalizar botones específicos aquí
    },
    subnav: aprendizajeSubNavConfig,
    tabbar: {
    ...defaultTabBarConfig,
    onTabChange: (tabId, item, element) => {
    },
    onFloatingMenuItemClick: (sectionId, subitemId, url) => {
      console.log('🔍 [Colaborador TabBar.onFloatingMenuItemClick] ════════════════════════════════════════');
      console.log('🔍 [Colaborador TabBar.onFloatingMenuItemClick] sectionId:', sectionId);
      console.log('🔍 [Colaborador TabBar.onFloatingMenuItemClick] subitemId:', subitemId);
      console.log('🔍 [Colaborador TabBar.onFloatingMenuItemClick] url:', url);
      console.log('🔍 [Colaborador TabBar.onFloatingMenuItemClick] ContentManager existe:', !!window.UBITS_ContentManager);
      console.log('🔍 [Colaborador TabBar.onFloatingMenuItemClick] currentSection actual:', window.UBITS_ContentManager?.currentSection);
      
      // ⚠️ IMPORTANTE: Usar ContentManager en lugar de redirecciones
      if (window.UBITS_ContentManager && sectionId) {
        console.log('🔍 [Colaborador TabBar.onFloatingMenuItemClick] ✅ Navegando a sección:', sectionId, 'subitem:', subitemId);
        
        // Mapeo de subitems a IDs de tabs del SubNav
        // ⚠️ IMPORTANTE: Los IDs del TabBar pueden diferir de los IDs del ContentManager
        const subitemMap = {
          'inicio': 'home',
          'catalogo': 'catalog',
          'corporativa': 'corporate',
          'zona-estudio': 'study-zone',
          'evaluaciones-360': 'evaluations',
          'objetivos': 'objectives',
          'metricas': 'metrics',
          'reportes': 'reports',
          'planes': 'planes',
          'tareas': 'tasks',
          // También incluir los IDs directos por si acaso
          'home': 'home',
          'catalog': 'catalog',
          'corporate': 'corporate',
          'study-zone': 'study-zone'
        };
        
        if (subitemId) {
          // Es una subsección: cambiar contenido dentro de la sección principal
          const mappedSubitemId = subitemMap[subitemId] || subitemId;
          
          // ⚠️ CRÍTICO: Siempre establecer currentSection ANTES de cualquier otra operación
          // Esto asegura que ResponsiveManager pueda acceder a currentSection cuando cambia el tamaño
          if (window.UBITS_ContentManager.currentSection !== sectionId) {
            // Establecer currentSection inmediatamente
            window.UBITS_ContentManager.currentSection = sectionId;
            console.log('🔍 [Colaborador TabBar] ✅ currentSection establecido a:', sectionId);
            
            // Luego llamar handleSectionChange para actualizar SubNav y contenido
            window.UBITS_ContentManager.handleSectionChange(sectionId);
            
            // Actualizar Sidebar también
            const sidebarElement = document.querySelector('.ubits-sidebar');
            if (sidebarElement) {
              sidebarElement.querySelectorAll('.ubits-sidebar-nav-button').forEach(btn => {
                btn.classList.remove('active');
                btn.blur();
              });
              const targetButton = sidebarElement.querySelector(`[data-section="${sectionId}"]`);
              if (targetButton) {
                targetButton.classList.add('active');
                targetButton.blur();
              }
            }
            
            // Esperar un momento para que el SubNav se actualice antes de cambiar la subsección
            setTimeout(() => {
              window.UBITS_ContentManager.updateContent(sectionId, mappedSubitemId);
              
              // Actualizar el SubNav para que muestre el tab activo
              const subNavElement = document.querySelector('.ubits-sub-nav');
              if (subNavElement) {
                const targetTab = subNavElement.querySelector(`[data-tab="${mappedSubitemId}"]`);
                if (targetTab) {
                  // Remover active de todos los tabs
                  subNavElement.querySelectorAll('.ubits-sub-nav-tab').forEach(tab => {
                    tab.classList.remove('ubits-sub-nav-tab--active');
                  });
                  // Activar el tab correspondiente
                  targetTab.classList.add('ubits-sub-nav-tab--active');
                }
              }
            }, 100);
          } else {
            // La sección principal ya está activa, solo cambiar la subsección
            // ⚠️ CRÍTICO: Asegurar que currentSection esté establecido (por si acaso es null)
            if (!window.UBITS_ContentManager.currentSection) {
              window.UBITS_ContentManager.currentSection = sectionId;
              console.log('🔍 [Template Colaborador TabBar] ✅ currentSection establecido a (else):', sectionId);
            }
            window.UBITS_ContentManager.updateContent(sectionId, mappedSubitemId);
            
            // Actualizar el SubNav para que muestre el tab activo
            const subNavElement = document.querySelector('.ubits-sub-nav');
            if (subNavElement) {
              const targetTab = subNavElement.querySelector(`[data-tab="${mappedSubitemId}"]`);
              if (targetTab) {
                // Remover active de todos los tabs
                subNavElement.querySelectorAll('.ubits-sub-nav-tab').forEach(tab => {
                  tab.classList.remove('ubits-sub-nav-tab--active');
                });
                // Activar el tab correspondiente
                targetTab.classList.add('ubits-sub-nav-tab--active');
              }
            }
          }
        } else if (sectionId) {
          // Es una sección principal: cambiar de sección completa
          // ⚠️ CRÍTICO: Establecer currentSection inmediatamente
          window.UBITS_ContentManager.currentSection = sectionId;
          console.log('🔍 [TabBar] ✅ currentSection establecido a:', sectionId);
          
          // Luego llamar handleSectionChange
          window.UBITS_ContentManager.handleSectionChange(sectionId);
          
          // También actualizar el Sidebar para que muestre el botón activo correspondiente
          const sidebarElement = document.querySelector('.ubits-sidebar');
          if (sidebarElement) {
            // Remover active de todos los botones
            sidebarElement.querySelectorAll('.ubits-sidebar-nav-button').forEach(btn => {
              btn.classList.remove('active');
              btn.blur();
            });
            // Activar el botón correspondiente
            const targetButton = sidebarElement.querySelector(`[data-section="${sectionId}"]`);
            if (targetButton) {
              targetButton.classList.add('active');
              targetButton.blur(); // No dar focus para evitar borde azul
            }
          }
        }
      } else {
        if (url) {
          window.location.href = url;
        }
      }
    },
    onProfileMenuItemClick: (itemId, item) => {
      
      // Si es "Cambio de contraseña", no hacer nada
      if (itemId === 'cambio-contraseña' || itemId === 'password' || item.label === 'Cambio de contraseña') {
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      // Si es "Ver mi perfil", usar ContentManager
      if ((itemId === 'ver-perfil' || itemId === 'perfil' || item.label === 'Ver mi perfil') && window.UBITS_ContentManager) {
        window.UBITS_ContentManager.handleSectionChange('perfil');
        
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      // Si es "Modo Administrador" o "Modo colaborador", abrir en nueva pestaña
      if ((itemId === 'admin-mode' || itemId === 'modo-colaborador' || item.label === 'Modo Administrador' || item.label === 'Modo colaborador') && item.url) {
        window.open(item.url, '_blank');
        
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      if (item.url) {
        window.location.href = item.url;
      } else if (item.onClick) {
        item.onClick();
      }
      
      // Cerrar el Profile Menu después del click
      const profileMenuContainer = document.getElementById('profile-menu-container');
      if (profileMenuContainer) {
        const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
        if (profileMenu) {
          profileMenuContainer.style.display = 'none';
        }
      }
    }
  },
    theme: {
      default: 'light',
      persist: true
    }
  },
  'desempeno': {
    name: 'Desempeño',
    description: 'Módulo de evaluación de desempeño',
    sidebar: {
      ...defaultSidebarConfig,
      variant: 'colaborador'
    },
    subnav: desempenoSubNavConfig,
    tabbar: {
    ...defaultTabBarConfig,
    onTabChange: (tabId, item, element) => {
    },
    onFloatingMenuItemClick: (sectionId, subitemId, url) => {
      if (url) {
        window.location.href = url;
      }
    },
    onProfileMenuItemClick: (itemId, item) => {
      
      // Si es "Cambio de contraseña", no hacer nada
      if (itemId === 'cambio-contraseña' || itemId === 'password' || item.label === 'Cambio de contraseña') {
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      // Si es "Ver mi perfil", usar ContentManager
      if ((itemId === 'ver-perfil' || itemId === 'perfil' || item.label === 'Ver mi perfil') && window.UBITS_ContentManager) {
        window.UBITS_ContentManager.handleSectionChange('perfil');
        
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      // Si es "Modo Administrador" o "Modo colaborador", abrir en nueva pestaña
      if ((itemId === 'admin-mode' || itemId === 'modo-colaborador' || item.label === 'Modo Administrador' || item.label === 'Modo colaborador') && item.url) {
        window.open(item.url, '_blank');
        
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      if (item.url) {
        window.location.href = item.url;
      } else if (item.onClick) {
        item.onClick();
      }
      
      // Cerrar el Profile Menu después del click
      const profileMenuContainer = document.getElementById('profile-menu-container');
      if (profileMenuContainer) {
        const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
        if (profileMenu) {
          profileMenuContainer.style.display = 'none';
        }
      }
    }
  },
    theme: {
      default: 'light',
      persist: true
    }
  },
  'template-admin': {
    name: 'Template Administrador',
    description: 'Template para administradores',
    sidebar: {
      variant: 'admin',
      initialActiveSection: 'inicio',
      bodyButtons: [
        { section: 'inicio', icon: 'fa-house', tooltip: 'Inicio' },
        { section: 'empresa', icon: 'fa-building', tooltip: 'Empresa' },
        { section: 'aprendizaje', icon: 'fa-graduation-cap', tooltip: 'Aprendizaje' },
        { section: 'diagnóstico', icon: 'fa-chart-mixed', tooltip: 'Diagnóstico' },
        { section: 'desempeño', icon: 'fa-bars-progress', tooltip: 'Desempeño' },
        { section: 'encuestas', icon: 'fa-clipboard', tooltip: 'Encuestas' }
      ],
      footerButtons: [
        { id: 'api', icon: 'code', label: 'API', tooltip: 'API', section: 'api' },
        { id: 'centro-ayuda', icon: 'question-circle', label: 'Centro de ayuda', tooltip: 'Centro de ayuda', section: 'centro-ayuda' }
      ],
      profileMenuItems: [
        { id: 'perfil', icon: 'fa-user', label: 'Ver mi perfil' },
        { divider: true },
        { id: 'modo-colaborador', icon: 'fa-user-gear', label: 'Modo colaborador', href: 'template-colaborador.html' },
        { divider: true },
        { id: 'password', icon: 'fa-key', label: 'Cambio de contraseña', onClick: () => {} },
        { id: 'logout', icon: 'fa-sign-out', label: 'Cerrar sesión', onClick: () => {} }
      ],
      avatarImage: 'assets/images/Profile-image.jpg',
      logoImage: 'assets/images/Ubits-logo.svg',
      logoHref: 'template-admin.html',
      darkModeEnabled: true
    },
    subnav: templateSubNavConfig,
    tabbar: {
      items: [
        { id: 'modulos', label: 'Módulos', icon: 'grid-2' },
        { id: 'perfil', label: 'Mi perfil', avatar: 'assets/images/Profile-image.jpg', avatarAlt: 'Mi perfil' },
        { id: 'modo-oscuro', label: 'Modo oscuro', icon: 'moon' }
      ],
      activeTabId: 'modulos',
      darkModeEnabled: true,
      floatingMenuSections: [
        {
          id: 'inicio',
          title: 'Inicio',
          icon: 'house',
          url: null,
          isLink: false
        },
        {
          id: 'empresa',
          title: 'Empresa',
          icon: 'building',
          subitems: [
            { id: 'gestion-usuarios', title: 'Gestión de usuarios', icon: 'users' },
            { id: 'organigrama', title: 'Organigrama', icon: 'sitemap' },
            { id: 'datos-empresa', title: 'Datos de empresa', icon: 'building' },
            { id: 'personalizacion', title: 'Personalización', icon: 'paint-brush' },
            { id: 'roles-permisos', title: 'Roles y permisos', icon: 'user-shield' },
            { id: 'comunicaciones', title: 'Comunicaciones', icon: 'envelope' }
          ]
        },
        {
          id: 'aprendizaje',
          title: 'Aprendizaje',
          icon: 'graduation-cap',
          subitems: [
            { id: 'lms-cursos', title: 'LMS - Cursos propios', icon: 'book' },
            { id: 'plan-formacion', title: 'Plan de formación', icon: 'clipboard-list-check' },
            { id: 'certificados', title: 'Certificados', icon: 'file-certificate' },
            { id: 'metricas-empresa', title: 'Métricas de empresa', icon: 'chart-line' }
          ]
        },
        {
          id: 'diagnóstico',
          title: 'Diagnóstico',
          icon: 'chart-mixed',
          url: null,
          isLink: false
        },
        {
          id: 'desempeño',
          title: 'Desempeño',
          icon: 'bars-progress',
          subitems: [
            { id: 'evaluations', title: 'Evaluaciones 360', icon: 'chart-pie' },
            { id: 'objectives', title: 'Objetivos', icon: 'bullseye' },
            { id: 'matriz-talento', title: 'Matriz de Talento', icon: 'sitemap' }
          ]
        },
        {
          id: 'encuestas',
          title: 'Encuestas',
          icon: 'clipboard-list-check',
          url: null,
          isLink: false
        }
      ],
      profileMenuItems: [
        { id: 'ver-perfil', label: 'Ver mi perfil', icon: 'user' },
        { id: 'modo-colaborador', label: 'Modo colaborador', icon: 'user-gear', url: 'template-colaborador.html' },
        { id: 'cambio-contraseña', label: 'Cambio de contraseña', icon: 'key', onClick: () => {
          // Sin acción
        }},
        { id: 'cerrar-sesion', label: 'Cerrar sesión', icon: 'sign-out-alt', onClick: () => {
          // Sin acción
        }}
      ],
    onTabChange: (tabId, item, element) => {
    },
    onFloatingMenuItemClick: (sectionId, subitemId, url) => {
      
      // ⚠️ IMPORTANTE: Usar ContentManager en lugar de redirecciones
      if (window.UBITS_ContentManager) {
        // Si hay subitemId, es una subsección (ej: "gestion-usuarios" dentro de "empresa")
        // Si NO hay subitemId PERO hay sectionId, es un link directo sin subsecciones (ej: "inicio", "diagnóstico")
        
        if (subitemId) {
          // Es una subsección: cambiar contenido dentro de la sección principal
          
          // Mapear subitemId a los IDs que usa el ContentManager (algunos pueden diferir)
          const subitemMap = {
            'gestion-usuarios': 'gestion-usuarios',
            'organigrama': 'organigrama',
            'datos-empresa': 'datos-empresa',
            'personalizacion': 'personalizacion',
            'roles-permisos': 'roles-permisos',
            'comunicaciones': 'comunicaciones',
            'lms-cursos': 'lms-cursos',
            'plan-formacion': 'plan-formacion',
            'certificados': 'certificados',
            'metricas-empresa': 'metricas-empresa',
            'evaluations': 'evaluations',
            'objectives': 'objectives',
            'matriz-talento': 'matriz-talento'
          };
          
          const mappedSubitemId = subitemMap[subitemId] || subitemId;
          
          // ⚠️ CRÍTICO: Establecer currentSection inmediatamente ANTES de cualquier otra operación
          // Esto asegura que ResponsiveManager pueda acceder a currentSection cuando cambia el tamaño
          if (window.UBITS_ContentManager.currentSection !== sectionId) {
            // Establecer currentSection inmediatamente
            window.UBITS_ContentManager.currentSection = sectionId;
            console.log('🔍 [Template Colaborador TabBar] ✅ currentSection establecido a:', sectionId);
            
            // Luego llamar handleSectionChange para actualizar SubNav y contenido
            window.UBITS_ContentManager.handleSectionChange(sectionId);
            
            // Actualizar Sidebar también
            const sidebarElement = document.querySelector('.ubits-sidebar');
            if (sidebarElement) {
              sidebarElement.querySelectorAll('.ubits-sidebar-nav-button').forEach(btn => {
                btn.classList.remove('active');
                btn.blur();
              });
              const targetButton = sidebarElement.querySelector(`[data-section="${sectionId}"]`);
              if (targetButton) {
                targetButton.classList.add('active');
                targetButton.blur();
              }
            }
            
            // Esperar un momento para que el SubNav se actualice antes de cambiar la subsección
            setTimeout(() => {
              window.UBITS_ContentManager.updateContent(sectionId, mappedSubitemId);
              
              // Actualizar el SubNav para que muestre el tab activo
              const subNavElement = document.querySelector('.ubits-sub-nav');
              if (subNavElement) {
                const targetTab = subNavElement.querySelector(`[data-tab="${mappedSubitemId}"]`);
                if (targetTab) {
                  // Remover active de todos los tabs
                  subNavElement.querySelectorAll('.ubits-sub-nav-tab').forEach(tab => {
                    tab.classList.remove('ubits-sub-nav-tab--active');
                  });
                  // Activar el tab correspondiente
                  targetTab.classList.add('ubits-sub-nav-tab--active');
                } else {
                }
              }
            }, 100);
          } else {
            // La sección principal ya está activa, solo cambiar la subsección
            // ⚠️ CRÍTICO: Asegurar que currentSection esté establecido (por si acaso es null)
            if (!window.UBITS_ContentManager.currentSection) {
              window.UBITS_ContentManager.currentSection = sectionId;
              console.log('🔍 [Template Colaborador TabBar] ✅ currentSection establecido a (else):', sectionId);
            }
            window.UBITS_ContentManager.updateContent(sectionId, mappedSubitemId);
            
            // Actualizar el SubNav para que muestre el tab activo
            const subNavElement = document.querySelector('.ubits-sub-nav');
            if (subNavElement) {
              const targetTab = subNavElement.querySelector(`[data-tab="${mappedSubitemId}"]`);
              if (targetTab) {
                // Remover active de todos los tabs
                subNavElement.querySelectorAll('.ubits-sub-nav-tab').forEach(tab => {
                  tab.classList.remove('ubits-sub-nav-tab--active');
                });
                // Activar el tab correspondiente
                targetTab.classList.add('ubits-sub-nav-tab--active');
              }
            }
          }
        } else if (sectionId) {
          // Es una sección principal: cambiar de sección completa
          // ⚠️ CRÍTICO: Establecer currentSection inmediatamente
          window.UBITS_ContentManager.currentSection = sectionId;
          console.log('🔍 [TabBar] ✅ currentSection establecido a:', sectionId);
          
          // Luego llamar handleSectionChange
          window.UBITS_ContentManager.handleSectionChange(sectionId);
          
          // También actualizar el Sidebar para que muestre el botón activo correspondiente
          const sidebarElement = document.querySelector('.ubits-sidebar');
          if (sidebarElement) {
            // Remover active de todos los botones
            sidebarElement.querySelectorAll('.ubits-sidebar-nav-button').forEach(btn => {
              btn.classList.remove('active');
              btn.blur();
            });
            // Activar el botón correspondiente
            const targetButton = sidebarElement.querySelector(`[data-section="${sectionId}"]`);
            if (targetButton) {
              targetButton.classList.add('active');
              targetButton.blur(); // No dar focus para evitar borde azul
            }
          }
        }
      } else {
        if (url) {
          window.location.href = url;
        }
      }
    },
    onProfileMenuItemClick: (itemId, item) => {
      
      // Si es "Cambio de contraseña", no hacer nada
      if (itemId === 'cambio-contraseña' || itemId === 'password' || item.label === 'Cambio de contraseña') {
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      // Si es "Ver mi perfil", usar ContentManager
      if ((itemId === 'ver-perfil' || itemId === 'perfil' || item.label === 'Ver mi perfil') && window.UBITS_ContentManager) {
        window.UBITS_ContentManager.handleSectionChange('perfil');
        
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      // Si es "Modo Administrador" o "Modo colaborador", abrir en nueva pestaña
      if ((itemId === 'admin-mode' || itemId === 'modo-colaborador' || item.label === 'Modo Administrador' || item.label === 'Modo colaborador') && item.url) {
        window.open(item.url, '_blank');
        
        // Cerrar el Profile Menu después del click
        const profileMenuContainer = document.getElementById('profile-menu-container');
        if (profileMenuContainer) {
          const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
          if (profileMenu) {
            profileMenuContainer.style.display = 'none';
          }
        }
        return;
      }
      
      if (item.url) {
        window.location.href = item.url;
      } else if (item.onClick) {
        item.onClick();
      }
      
      // Cerrar el Profile Menu después del click
      const profileMenuContainer = document.getElementById('profile-menu-container');
      if (profileMenuContainer) {
        const profileMenu = profileMenuContainer.querySelector('.ubits-profile-menu');
        if (profileMenu) {
          profileMenuContainer.style.display = 'none';
        }
      }
    }
  },
    theme: {
      default: 'light',
      persist: true
    }
  }
};

/**
 * Obtiene la configuración de un producto
 * @param {string} productId - ID del producto
 * @returns {object} Configuración del producto o configuración por defecto
 */
window.getProductConfig = function(productId) {
  const config = window.UBITS_PRODUCTS[productId];
  if (!config) {
    return window.UBITS_PRODUCTS['template-colaborador'];
  }
  return config;
};

/**
 * Detecta el producto actual basándose en la URL o parámetro
 * @returns {string} ID del producto
 */
window.detectCurrentProduct = function() {
  // Intentar obtener de URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const productParam = urlParams.get('product');
  if (productParam && window.UBITS_PRODUCTS[productParam]) {
    return productParam;
  }
  
  // Intentar obtener del nombre del archivo
  const fileName = window.location.pathname.split('/').pop().replace('.html', '');
  if (window.UBITS_PRODUCTS[fileName]) {
    return fileName;
  }
  
  // Por defecto, usar 'template-colaborador'
  return 'template-colaborador';
};


