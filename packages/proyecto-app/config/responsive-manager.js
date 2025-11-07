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

      console.log(`📱 Breakpoint cambiado: ${previousBreakpoint} → ${newBreakpoint}`);
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

