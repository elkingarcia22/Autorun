/**
 * Theme Manager
 * Gestor global de temas (dark/light mode)
 * Sincroniza el tema entre todos los componentes
 */

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.listeners = new Set();
    this.initialized = false;
    
    // Cargar tema guardado al iniciar
    this.loadSavedTheme();
  }

  /**
   * Inicializa el Theme Manager
   */
  init() {
    if (this.initialized) return;
    
    // Aplicar tema inicial
    this.setTheme(this.currentTheme, false); // false = no guardar, solo aplicar
    
    // Escuchar cambios del sistema
    if (window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      prefersDark.addEventListener('change', (e) => {
        // Solo aplicar si no hay tema guardado
        if (!localStorage.getItem('ubits-theme')) {
          this.setTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    }
    
    this.initialized = true;
    console.log('✅ Theme Manager inicializado');
  }

  /**
   * Establece el tema
   * @param {string} theme - 'light' o 'dark'
   * @param {boolean} persist - Si debe guardarse en localStorage (default: true)
   */
  setTheme(theme, persist = true) {
    if (theme !== 'light' && theme !== 'dark') {
      console.warn(`⚠️ Tema inválido: ${theme}. Usando 'light'`);
      theme = 'light';
    }

    this.currentTheme = theme;

    // Actualizar data-theme en body y todos los contenedores
    document.body.setAttribute('data-theme', theme);
    
    // Actualizar todos los contenedores con data-theme-container
    document.querySelectorAll('[data-theme-container]').forEach(el => {
      el.setAttribute('data-theme', theme);
    });

    // Persistir en localStorage si se solicita
    if (persist) {
      localStorage.setItem('ubits-theme', theme);
    }

    // Notificar a todos los componentes
    this.notifyComponents(theme);

    console.log(`🌓 Tema cambiado a: ${theme}`);
  }

  /**
   * Obtiene el tema actual
   * @returns {string} 'light' o 'dark'
   */
  getTheme() {
    return this.currentTheme;
  }

  /**
   * Alterna entre light y dark
   * @returns {string} Nuevo tema
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    return newTheme;
  }

  /**
   * Carga el tema guardado en localStorage
   */
  loadSavedTheme() {
    const savedTheme = localStorage.getItem('ubits-theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.currentTheme = savedTheme;
    } else {
      // Detectar preferencia del sistema si no hay tema guardado
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.currentTheme = 'dark';
      } else {
        this.currentTheme = 'light';
      }
    }
  }

  /**
   * Notifica a todos los componentes sobre el cambio de tema
   * @param {string} theme - Nuevo tema
   */
  notifyComponents(theme) {
    // Disparar evento personalizado
    const event = new CustomEvent('ubits-theme-change', {
      detail: { theme, previousTheme: theme === 'light' ? 'dark' : 'light' }
    });
    document.dispatchEvent(event);

    // Notificar listeners registrados
    this.listeners.forEach(listener => {
      try {
        listener(theme);
      } catch (error) {
        console.error('Error en listener de tema:', error);
      }
    });
  }

  /**
   * Registra un listener para cambios de tema
   * @param {Function} callback - Función que se ejecuta cuando cambia el tema
   * @returns {Function} Función para desregistrar el listener
   */
  onThemeChange(callback) {
    if (typeof callback !== 'function') {
      console.warn('⚠️ ThemeManager.onThemeChange requiere una función');
      return () => {};
    }

    this.listeners.add(callback);
    
    // Retornar función para desregistrar
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Actualiza iconos de dark mode toggle en componentes
   * @param {HTMLElement} container - Contenedor donde buscar los toggles
   */
  updateDarkModeIcons(container = document) {
    const toggles = container.querySelectorAll('[id*="darkmode-toggle"], [data-tab-id="modo-oscuro"]');
    
    toggles.forEach(toggle => {
      const iconElement = toggle.querySelector('i');
      if (!iconElement) return;

      iconElement.classList.remove('fa-moon', 'fa-sun', 'fa-sun-bright', 'fa-solid', 'fa-regular', 'far');
      
      if (this.currentTheme === 'dark') {
        iconElement.classList.add('fa-solid', 'fa-sun-bright');
      } else {
        iconElement.classList.add('far', 'fa-moon');
      }

      // Actualizar data-theme del toggle
      toggle.setAttribute('data-theme', this.currentTheme);
    });
  }
}

// Crear instancia global
window.UBITS_ThemeManager = new ThemeManager();

// Inicializar automáticamente cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.UBITS_ThemeManager.init();
  });
} else {
  window.UBITS_ThemeManager.init();
}

// Escuchar eventos de cambio de tema para actualizar iconos
document.addEventListener('ubits-theme-change', (event) => {
  window.UBITS_ThemeManager.updateDarkModeIcons();
});

console.log('✅ Theme Manager cargado');

