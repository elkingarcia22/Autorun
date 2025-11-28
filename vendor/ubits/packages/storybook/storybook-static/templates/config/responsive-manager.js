/**
 * Responsive Manager
 * Gestor de responsive design que adapta componentes según viewport
 */

class ResponsiveManager {
  constructor() {
    this.breakpoints = {
      mobile: 480,
      tablet: 768,
      desktop: 1024,
      wide: 1440
    };
    
    this.currentBreakpoint = this.detectBreakpoint();
    this.listeners = new Set();
    this.initialized = false;

    // Throttle para resize events
    this.resizeTimeout = null;
  }

  /**
   * Inicializa el Responsive Manager
   */
  init() {
    if (this.initialized) return;

    // Detectar breakpoint inicial
    this.updateBreakpoint();

    // Escuchar cambios de viewport
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.updateBreakpoint();
      }, 150);
    });

    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.updateBreakpoint();
      }, 100);
    });

    this.initialized = true;
    console.log('✅ Responsive Manager inicializado');
  }

  /**
   * Detecta el breakpoint actual
   * @returns {string} Nombre del breakpoint
   */
  detectBreakpoint() {
    const width = window.innerWidth;
    
    if (width < this.breakpoints.mobile) {
      return 'mobile';
    } else if (width < this.breakpoints.tablet) {
      return 'tablet';
    } else if (width < this.breakpoints.desktop) {
      return 'desktop';
    } else {
      return 'wide';
    }
  }

  /**
   * Actualiza el breakpoint y notifica cambios
   */
  updateBreakpoint() {
    const newBreakpoint = this.detectBreakpoint();
    
    if (newBreakpoint !== this.currentBreakpoint) {
      const previousBreakpoint = this.currentBreakpoint;
      const wasMobile = ['mobile', 'tablet'].includes(previousBreakpoint);
      const isNowDesktop = ['desktop', 'wide'].includes(newBreakpoint);
      
      this.currentBreakpoint = newBreakpoint;

      // Disparar evento personalizado
      const event = new CustomEvent('ubits-breakpoint-change', {
        detail: { 
          breakpoint: newBreakpoint, 
          previousBreakpoint,
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
      document.dispatchEvent(event);

      // Notificar listeners
      this.notifyListeners(newBreakpoint, previousBreakpoint);

      console.log(`📱 [ResponsiveManager.updateBreakpoint] ════════════════════════════════════════`);
      console.log(`📱 [ResponsiveManager.updateBreakpoint] Breakpoint cambiado: ${previousBreakpoint} → ${newBreakpoint}`);
      console.log(`📱 [ResponsiveManager.updateBreakpoint] wasMobile: ${wasMobile}, isNowDesktop: ${isNowDesktop}`);
      console.log(`📱 [ResponsiveManager.updateBreakpoint] window.UBITS_ContentManager existe: ${!!window.UBITS_ContentManager}`);
      console.log(`📱 [ResponsiveManager.updateBreakpoint] currentSection: ${window.UBITS_ContentManager?.currentSection || 'null/undefined'}`);
      
      // ⚠️ CRÍTICO: Si cambiamos de móvil a desktop, actualizar SubNav
      if (wasMobile && isNowDesktop) {
        console.log('📱 [ResponsiveManager.updateBreakpoint] ════════════════════════════════════════');
        console.log('📱 [ResponsiveManager.updateBreakpoint] 🔍 DETECTADO: Cambio de móvil a desktop');
        console.log('📱 [ResponsiveManager.updateBreakpoint] ContentManager existe:', !!window.UBITS_ContentManager);
        console.log('📱 [ResponsiveManager.updateBreakpoint] currentSection:', window.UBITS_ContentManager?.currentSection);
        
        if (window.UBITS_ContentManager && window.UBITS_ContentManager.currentSection) {
          const sectionToUpdate = window.UBITS_ContentManager.currentSection;
          console.log('   📱 [ResponsiveManager.updateBreakpoint] ✅ Condiciones cumplidas, programando actualización del SubNav');
          console.log('   📱 [ResponsiveManager.updateBreakpoint] Sección a actualizar:', sectionToUpdate);
          
          // Delay más largo para asegurar que el DOM esté completamente listo después del cambio de breakpoint
          // y que adaptComponents() haya terminado de ejecutarse
          setTimeout(() => {
            console.log('   📱 [ResponsiveManager.updateBreakpoint] ════════════════════════════════════════');
            console.log('   📱 [ResponsiveManager.updateBreakpoint] ⏰ TIMEOUT EJECUTADO (300ms después)');
            console.log('   📱 [ResponsiveManager.updateBreakpoint] ContentManager existe:', !!window.UBITS_ContentManager);
            console.log('   📱 [ResponsiveManager.updateBreakpoint] currentSection:', window.UBITS_ContentManager?.currentSection);
            
            if (window.UBITS_ContentManager && window.UBITS_ContentManager.currentSection) {
              const section = window.UBITS_ContentManager.currentSection;
              console.log('   📱 [ResponsiveManager.updateBreakpoint] ✅ Ejecutando updateSubNav para sección:', section);
              console.log('   📱 [ResponsiveManager.updateBreakpoint] Tipo de updateSubNav:', typeof window.UBITS_ContentManager.updateSubNav);
              
              try {
                window.UBITS_ContentManager.updateSubNav(section);
                console.log('   📱 [ResponsiveManager.updateBreakpoint] ✅ updateSubNav ejecutado correctamente');
              } catch (error) {
                console.error('   📱 [ResponsiveManager.updateBreakpoint] ❌ ERROR al ejecutar updateSubNav:', error);
              }
            } else {
              console.warn('   📱 [ResponsiveManager.updateBreakpoint] ⚠️ ContentManager o currentSection no disponible después del timeout');
            }
            console.log('   📱 [ResponsiveManager.updateBreakpoint] ════════════════════════════════════════');
          }, 300);
        } else {
          console.warn('   📱 [ResponsiveManager.updateBreakpoint] ⚠️ NO se actualizará SubNav porque:');
          console.warn('      - ContentManager existe:', !!window.UBITS_ContentManager);
          console.warn('      - currentSection existe:', !!window.UBITS_ContentManager?.currentSection);
        }
        console.log('📱 [ResponsiveManager.updateBreakpoint] ════════════════════════════════════════');
      }
    }
  }

  /**
   * Obtiene el breakpoint actual
   * @returns {string} Nombre del breakpoint
   */
  getBreakpoint() {
    return this.currentBreakpoint;
  }

  /**
   * Verifica si el viewport es mobile
   * @returns {boolean}
   */
  isMobile() {
    return this.currentBreakpoint === 'mobile';
  }

  /**
   * Verifica si el viewport es tablet o menor
   * @returns {boolean}
   */
  isTabletOrLess() {
    return ['mobile', 'tablet'].includes(this.currentBreakpoint);
  }

  /**
   * Verifica si el viewport es desktop o mayor
   * @returns {boolean}
   */
  isDesktopOrMore() {
    return ['desktop', 'wide'].includes(this.currentBreakpoint);
  }

  /**
   * Notifica a los listeners
   */
  notifyListeners(newBreakpoint, previousBreakpoint) {
    this.listeners.forEach(listener => {
      try {
        listener(newBreakpoint, previousBreakpoint);
      } catch (error) {
        console.error('Error en listener responsive:', error);
      }
    });
  }

  /**
   * Registra un listener para cambios de breakpoint
   * @param {Function} callback - Función que se ejecuta cuando cambia el breakpoint
   * @returns {Function} Función para desregistrar el listener
   */
  onBreakpointChange(callback) {
    if (typeof callback !== 'function') {
      console.warn('⚠️ ResponsiveManager.onBreakpointChange requiere una función');
      return () => {};
    }

    this.listeners.add(callback);
    
    // Ejecutar inmediatamente con el breakpoint actual
    callback(this.currentBreakpoint, null);

    // Retornar función para desregistrar
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Adapta componentes según el breakpoint
   */
  adaptComponents() {
    const width = window.innerWidth;
    const isMobile = this.isMobile();
    const isTabletOrLess = this.isTabletOrLess();
    const isDesktopOrMore = this.isDesktopOrMore();

    // ⚠️ CRÍTICO: Sidebar y TabBar NUNCA deben estar visibles al mismo tiempo
    // Usar el mismo breakpoint: 1024px (1023px y menor = TabBar, 1024px y mayor = Sidebar)
    const showSidebar = width >= 1024;
    const showTabBar = width < 1024;

    // ⚠️ CRÍTICO: El CSS ya maneja la visibilidad con @media queries
    // NO aplicar estilos inline aquí - dejar que el CSS haga su trabajo
    // Solo remover estilos inline si existen (para que el CSS funcione correctamente)
    
    // Sidebar: El CSS en sidebar.css y template-colaborador.html ya oculta #sidebar-container
    // Solo remover estilos inline si existen
    const sidebarContainers = document.querySelectorAll('#sidebar-container');
    sidebarContainers.forEach(container => {
      container.style.display = ''; // Dejar que el CSS maneje con @media queries
      container.style.visibility = '';
    });
    
    const sidebars = document.querySelectorAll('.ubits-sidebar');
    sidebars.forEach(sidebar => {
      sidebar.style.display = ''; // Dejar que el CSS maneje con @media queries
      sidebar.style.visibility = '';
    });

    // TabBar: El CSS ahora maneja TODO con !important en media queries
    // Solo remover estilos inline para que el CSS funcione correctamente
    const tabBars = document.querySelectorAll('.ubits-tabbar');
    const tabBarContainers = document.querySelectorAll('#tab-bar-container, .tab-bar-container');
    
    tabBars.forEach(tabBar => {
      if (!tabBar.classList.contains('ubits-tabbar--preview')) {
        // Remover TODOS los estilos inline - el CSS con !important maneja la visibilidad
        tabBar.style.removeProperty('display');
        tabBar.style.removeProperty('visibility');
      }
      // Los previews siempre se muestran según sus propias reglas CSS
    });
    
    // También remover estilos inline de los contenedores
    tabBarContainers.forEach(container => {
      container.style.removeProperty('display');
      container.style.removeProperty('visibility');
    });

    // SubNav: ajustar layout
    const subNavs = document.querySelectorAll('.ubits-sub-nav');
    subNavs.forEach(subNav => {
      if (isMobile) {
        subNav.classList.add('ubits-sub-nav--mobile');
      } else {
        subNav.classList.remove('ubits-sub-nav--mobile');
      }
    });

    // ⚠️ CRÍTICO: Main content - NO aplicar estilos inline NUNCA
    // Dejar que el CSS del template maneje TODO el layout
    // Solo remover estilos inline si existen (para que el CSS funcione)
    const mainContents = document.querySelectorAll('.main-content');
    mainContents.forEach(mainContent => {
      // Remover TODOS los estilos inline para que el CSS maneje todo
      mainContent.style.marginLeft = '';
      mainContent.style.marginRight = '';
      mainContent.style.marginTop = '';
      mainContent.style.marginBottom = '';
      mainContent.style.width = '';
      mainContent.style.maxWidth = '';
      mainContent.style.paddingLeft = '';
      mainContent.style.paddingRight = '';
      mainContent.style.flex = '';
    });

    // ⚠️ CRÍTICO: Actualizar SubNav cuando cambia de móvil a desktop
    // Si cambiamos a desktop y hay una sección activa, actualizar el SubNav
    // Esto asegura que el SubNav muestre las secciones correctas y no "section 1", "section 2", etc.
    // NOTA: Esta lógica también está en updateBreakpoint(), pero la mantenemos aquí como respaldo
    console.log('📱 [ResponsiveManager.adaptComponents] ════════════════════════════════════════');
    console.log('📱 [ResponsiveManager.adaptComponents] isDesktopOrMore:', isDesktopOrMore);
    console.log('📱 [ResponsiveManager.adaptComponents] ContentManager existe:', !!window.UBITS_ContentManager);
    console.log('📱 [ResponsiveManager.adaptComponents] currentSection:', window.UBITS_ContentManager?.currentSection || 'null/undefined');
    
    if (isDesktopOrMore && window.UBITS_ContentManager && window.UBITS_ContentManager.currentSection) {
      const section = window.UBITS_ContentManager.currentSection;
      console.log('📱 [ResponsiveManager.adaptComponents] ✅ Condiciones cumplidas, programando actualización del SubNav');
      console.log('📱 [ResponsiveManager.adaptComponents] Sección a actualizar:', section);
      
      // Delay para asegurar que el DOM esté listo después de adaptComponents
      setTimeout(() => {
        console.log('📱 [ResponsiveManager.adaptComponents] ════════════════════════════════════════');
        console.log('📱 [ResponsiveManager.adaptComponents] ⏰ TIMEOUT EJECUTADO (250ms después)');
        console.log('📱 [ResponsiveManager.adaptComponents] ContentManager existe:', !!window.UBITS_ContentManager);
        console.log('📱 [ResponsiveManager.adaptComponents] currentSection:', window.UBITS_ContentManager?.currentSection);
        
        if (window.UBITS_ContentManager && window.UBITS_ContentManager.currentSection) {
          const sectionToUpdate = window.UBITS_ContentManager.currentSection;
          console.log('📱 [ResponsiveManager.adaptComponents] ✅ Ejecutando updateSubNav para sección:', sectionToUpdate);
          console.log('📱 [ResponsiveManager.adaptComponents] Tipo de updateSubNav:', typeof window.UBITS_ContentManager.updateSubNav);
          
          try {
            window.UBITS_ContentManager.updateSubNav(sectionToUpdate);
            console.log('📱 [ResponsiveManager.adaptComponents] ✅ updateSubNav ejecutado correctamente');
          } catch (error) {
            console.error('📱 [ResponsiveManager.adaptComponents] ❌ ERROR al ejecutar updateSubNav:', error);
          }
        } else {
          console.warn('📱 [ResponsiveManager.adaptComponents] ⚠️ ContentManager o currentSection no disponible después del timeout');
        }
        console.log('📱 [ResponsiveManager.adaptComponents] ════════════════════════════════════════');
      }, 250);
    } else {
      console.log('📱 [ResponsiveManager.adaptComponents] ⚠️ NO se actualizará SubNav porque:');
      console.log('   - isDesktopOrMore:', isDesktopOrMore);
      console.log('   - ContentManager existe:', !!window.UBITS_ContentManager);
      console.log('   - currentSection existe:', !!window.UBITS_ContentManager?.currentSection);
    }
    console.log('📱 [ResponsiveManager.adaptComponents] ════════════════════════════════════════');

    // Logs específicos para debug
    console.log(`📱 [ResponsiveManager] Width: ${width}px | Breakpoint: ${this.currentBreakpoint}`);
    console.log(`   → Sidebar: ${showSidebar ? '✅ VISIBLE' : '❌ OCULTO'}`);
    console.log(`   → TabBar: ${showTabBar ? '✅ VISIBLE' : '❌ OCULTO'}`);
  }
}

// Crear instancia global
window.UBITS_ResponsiveManager = new ResponsiveManager();

// Auto-adaptar componentes cuando cambia el breakpoint
// ⚠️ IMPORTANTE: Solo ejecutar adaptComponents() cuando los componentes ya estén creados
window.UBITS_ResponsiveManager.onBreakpointChange(() => {
  // Solo adaptar si los componentes existen
  const sidebars = document.querySelectorAll('.ubits-sidebar');
  const tabBars = document.querySelectorAll('.ubits-tabbar');
  if (sidebars.length > 0 || tabBars.length > 0) {
    window.UBITS_ResponsiveManager.adaptComponents();
  }
});

// ⚠️ NO inicializar automáticamente
// La inicialización se hará manualmente después de que los componentes se creen
// Esto evita que adaptComponents() se ejecute antes de que existan los componentes

console.log('✅ Responsive Manager cargado');

