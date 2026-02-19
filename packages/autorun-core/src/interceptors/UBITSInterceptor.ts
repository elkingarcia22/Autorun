export class UBITSInterceptor {
  static initialized = false;
  static sidebarPatched = false;

  /**
   * Initialize the interceptor
   * Should be called as early as possible in the boot sequence
   */
  static initialize() {
    if (this.initialized) return;
    this.initialized = true;
    this.interceptContentManager();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () =>
        this.applyDOMPatches()
      );
    } else {
      this.applyDOMPatches();
    }
  }

  /**
   * Intercept UBITS_ContentManager to customize rendering
   * Specifically prevents the default HeaderSection and allows custom SubNav
   */
  static interceptContentManager() {
    let contentManagerInstance: any = null;
    Object.defineProperty(window, 'UBITS_ContentManager', {
      configurable: true,
      enumerable: true,
      get: () => contentManagerInstance,
      set: (value) => {
        contentManagerInstance = value;
        if (value && typeof value.render === 'function') {
          const originalRender = value.render;
          value.render = function (...args: any[]) {
            if (!document.getElementById('top-nav-container')) {
              return originalRender.apply(this, args);
            }
            console.log(
              '[UBITSInterceptor] Intercepting ContentManager.render'
            );
            UBITSInterceptor.injectSubNav();
            const result = originalRender.apply(this, args);
            const unwantedHeader = document.querySelector(
              '.content-area > header:not(#top-nav-container)'
            );
            if (unwantedHeader) {
              unwantedHeader.remove();
            }
            return result;
          };
        }
      },
    });
  }

  /**
   * Inject the custom SubNav into the top container
   */
  static injectSubNav() {
    const container = document.getElementById('top-nav-container');
    if (!container) return;
    if (container.querySelector('.sub-nav')) return;
    if (typeof (window as any).createSubNav === 'function') {
      (window as any).createSubNav(container);
    } else {
      this.createDefaultSubNav(container);
    }
  }

  /**
   * Default SubNav creation logic (extracted from ad-hoc script)
   */
  static createDefaultSubNav(container: HTMLElement) {
    const subNavHTML = `
    <div class="sub-nav">
        <div class="sub-nav-content">
            <h1>Administrador</h1>
            <div class="breadcrumbs">
                <span>Inicio</span>
                <i class="fa-solid fa-chevron-right"></i>
                <span class="current">Encuestas</span>
            </div>
        </div>
        <div class="sub-nav-actions">
             <button class="ubits-btn secondary" id="btn-config">
                <i class="fa-solid fa-cog"></i> Configurar
            </button>
            <button class="ubits-btn primary" id="btn-nueva-encuesta">
                <i class="fa-solid fa-plus"></i> Nueva Encuesta
            </button>
        </div>
    </div>
    <style>
      .sub-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: white;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 2rem;
      }
      .sub-nav-content h1 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
      }
      .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
      }
      .breadcrumbs .current {
          color: var(--primary-color);
          font-weight: 500;
      }
      .sub-nav-actions {
          display: flex;
          gap: 1rem;
      }
    </style>
    `;
    container.innerHTML = subNavHTML;
  }

  /**
   * Apply patches that require the DOM to be ready
   */
  static applyDOMPatches() {
    this.patchSidebarLinks();
  }

  /**
   * Patch sidebar links to use Ajax-like loading instead of full navigation
   */
  static patchSidebarLinks() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    if ((window as any).__AUTORUN_SIDEBAR_PATCHED__) return;
    (window as any).__AUTORUN_SIDEBAR_PATCHED__ = true;
    const links = sidebar.querySelectorAll('a[href]');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          return;
        }
        if (href && !href.startsWith('http')) {
          e.preventDefault();
          console.log(`[UBITSInterceptor] Prevented navigation to ${href}`);
        }
      });
    });
  }
}
