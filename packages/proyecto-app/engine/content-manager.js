/**
 * Content Manager
 * Gestiona el contenido dinámico por sección
 * Actualiza SubNav y content-area cuando cambia la sección del Sidebar
 */

class ContentManager {
  constructor() {
    this.currentSection = null;
    this.contentCache = new Map();
    this.isAdminMode = false; // Detecta si estamos en modo admin
  }

  /**
   * Detecta el modo (admin o colaborador) basándose en el variant del sidebar
   */
  detectMode() {
    const sidebarElement = document.querySelector('.ubits-sidebar');
    if (sidebarElement) {
      // El variant se pasa en la configuración, pero podemos detectarlo por los botones
      const hasAdminButtons = sidebarElement.querySelector('[data-section="inicio"]');
      const hasColaboradorButtons = sidebarElement.querySelector('[data-section="admin"]');
      
      if (hasAdminButtons && !hasColaboradorButtons) {
        this.isAdminMode = true;
      } else {
        this.isAdminMode = false;
      }
    }
    return this.isAdminMode;
  }

  /**
   * Mapeo de secciones del Sidebar a configuraciones de SubNav
   * IMPORTANTE: Algunas secciones tienen el mismo nombre en colaborador y admin,
   * pero activan SubNav diferentes. El variant del Sidebar determina qué SubNav usar.
   */
  getSubNavForSection(section) {
    // Detectar modo antes de retornar la configuración
    this.detectMode();
    
    // ⚠️ IMPORTANTE: Secciones sin SubNav
    // En modo admin: inicio y diagnóstico no tienen SubNav
    if (this.isAdminMode && (section === 'inicio' || section === 'diagnóstico')) {
      return null;
    }
    
    // En modo colaborador: diagnóstico no tiene SubNav
    if (!this.isAdminMode && section === 'diagnóstico') {
      return null;
    }
    
    // Centro de ayuda nunca tiene SubNav (en cualquier modo)
    if (section === 'centro-ayuda' || section === 'centro-de-ayuda') {
      return null;
    }
    
    const subNavMap = {
      // === SIDEBAR COLABORADOR ===
      'admin': {
        variant: 'template',
        tabs: [
          { id: 'admin-inicio', label: 'Inicio', icon: 'home', active: true },
          { id: 'admin-empresa', label: 'Empresa', icon: 'building' },
          { id: 'admin-config', label: 'Configuración', icon: 'cog' }
        ],
        activeTabId: 'admin-inicio'
      },
      // === SIDEBAR ADMIN ===
      // 'inicio' en modo admin NO debe mostrar SubNav
      // Por lo tanto, no se define aquí - getSubNavForSection retornará null
      // 'inicio': null, // No SubNav para inicio en modo admin
      'empresa': {
        // En modo admin, empresa usa variant 'empresa'
        variant: this.isAdminMode ? 'empresa' : 'template',
        tabs: this.isAdminMode ? [
          { id: 'gestion-usuarios', label: 'Gestión de usuarios', icon: 'users', active: true },
          { id: 'organigrama', label: 'Organigrama', icon: 'sitemap' },
          { id: 'datos-empresa', label: 'Datos de empresa', icon: 'building' },
          { id: 'personalizacion', label: 'Personalización', icon: 'paint-brush' },
          { id: 'roles-permisos', label: 'Roles y permisos', icon: 'user-shield' },
          { id: 'comunicaciones', label: 'Comunicaciones', icon: 'envelope' }
        ] : [
          { id: 'section1', label: 'Sección 1', icon: 'home', active: true },
          { id: 'section2', label: 'Sección 2', icon: 'chart-line' },
          { id: 'section3', label: 'Sección 3', icon: 'settings' }
        ],
        activeTabId: this.isAdminMode ? 'gestion-usuarios' : 'section1'
      },
      'aprendizaje': {
        // En modo admin, aprendizaje usa variant 'admin-aprendizaje'
        variant: this.isAdminMode ? 'admin-aprendizaje' : 'aprendizaje',
        tabs: this.isAdminMode ? [
          { id: 'lms-cursos', label: 'LMS - Cursos propios', icon: 'book', active: true },
          { id: 'plan-formacion', label: 'Plan de formación', icon: 'clipboard-list-check' },
          { id: 'certificados', label: 'Certificados', icon: 'file-certificate' },
          { id: 'metricas-empresa', label: 'Métricas de empresa', icon: 'chart-line' }
        ] : [
          { id: 'home', label: 'Inicio', icon: 'home', active: true },
          { id: 'catalog', label: 'Catálogo', icon: 'book' },
          { id: 'corporate', label: 'U. Corporativa', icon: 'building-columns' },
          { id: 'study-zone', label: 'Zona de estudio', icon: 'books' }
        ],
        activeTabId: this.isAdminMode ? 'lms-cursos' : 'home'
      },
      // 'diagnóstico' NO tiene SubNav en modo admin
      // 'diagnóstico': {
      //   variant: 'template',
      //   tabs: [
      //     { id: 'diagnostico-general', label: 'General', icon: 'chart-mixed', active: true },
      //     { id: 'diagnostico-resultados', label: 'Resultados', icon: 'file-chart-line' }
      //   ],
      //   activeTabId: 'diagnostico-general'
      // },
      'desempeño': {
        // En modo admin, desempeño usa variant 'admin-desempeno'
        variant: this.isAdminMode ? 'admin-desempeno' : 'desempeno',
        tabs: this.isAdminMode ? [
          { id: 'evaluations', label: 'Evaluaciones 360', icon: 'chart-pie', active: true },
          { id: 'objectives', label: 'Objetivos', icon: 'bullseye' },
          { id: 'matriz-talento', label: 'Matriz de Talento', icon: 'sitemap' }
        ] : [
          { id: 'evaluations', label: 'Evaluaciones 360', icon: 'chart-pie', active: true },
          { id: 'objectives', label: 'Objetivos', icon: 'bullseye' },
          { id: 'metrics', label: 'Métricas', icon: 'chart-line' },
          { id: 'reports', label: 'Reportes', icon: 'file-chart-line' }
        ],
        activeTabId: 'evaluations'
      },
      'encuestas': {
        variant: 'template',
        tabs: [
          { id: 'encuestas-general', label: 'Encuestas', icon: 'clipboard-list-check', active: true }
        ],
        activeTabId: 'encuestas-general'
      },
      'reclutamiento': {
        variant: 'template',
        tabs: [
          { id: 'reclutamiento-general', label: 'Reclutamiento', icon: 'users', active: true }
        ],
        activeTabId: 'reclutamiento-general'
      },
      'tareas': {
        variant: 'template',
        tabs: [
          { id: 'planes', label: 'Planes', icon: 'calendar', active: true },
          { id: 'tasks', label: 'Tareas', icon: 'tasks' }
        ],
        activeTabId: 'planes'
      },
      'ubits-ai': {
        variant: null, // No mostrar SubNav para UBITS AI
        tabs: [],
        activeTabId: null
      },
      'perfil': {
        variant: null, // No mostrar SubNav para Perfil
        tabs: [],
        activeTabId: null
      },
      // Secciones del footer admin (sin SubNav)
      // Nota: 'api', 'centro-ayuda' y 'centro-de-ayuda' se manejan con return null antes del subNavMap
      'api': {
        variant: null,
        tabs: [],
        activeTabId: null
      }
    };

    const subNavConfig = subNavMap[section];
    if (subNavConfig) {
      return subNavConfig;
    }

    // Configuración por defecto
    return {
      variant: 'template',
      tabs: [
        { id: 'section1', label: 'Sección 1', icon: 'home', active: true },
        { id: 'section2', label: 'Sección 2', icon: 'chart-line' },
        { id: 'section3', label: 'Sección 3', icon: 'settings' }
      ],
      activeTabId: 'section1'
    };
  }

  /**
   * Obtiene el contenido HTML para una sección
   * Retorna solo el HTML interno de .content-sections (sin el wrapper)
   */
  getContentForSection(section, subSection = null) {
    const sectionContent = {
      'admin': {
        default: `
          <div class="section-single">
            <div class="widget-admin-dashboard">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Panel de Administración</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Contenido de administración</p>
            </div>
          </div>
        `
      },
      'aprendizaje': {
        default: `
          <div class="section-single">
            <div class="widget-aprendizaje-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">${this.isAdminMode ? 'LMS' : 'Aprendizaje'}</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">${this.isAdminMode ? 'LMS' : 'Bienvenido al módulo de Aprendizaje'}</p>
            </div>
          </div>
        `,
        // Tabs para modo admin (aprendizaje)
        'lms-cursos': `
          <div class="section-single">
            <div class="widget-lms-cursos">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">LMS - Cursos propios</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Gestión de cursos propios del sistema de aprendizaje</p>
            </div>
          </div>
        `,
        'plan-formacion': `
          <div class="section-single">
            <div class="widget-plan-formacion">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Plan de formación</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Configuración y gestión de planes de formación corporativa</p>
            </div>
          </div>
        `,
        'certificados': `
          <div class="section-single">
            <div class="widget-certificados">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Certificados</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Gestión y emisión de certificados de capacitación</p>
            </div>
          </div>
        `,
        'metricas-empresa': `
          <div class="section-single">
            <div class="widget-metricas-empresa">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Métricas de empresa</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Análisis y métricas de aprendizaje a nivel organizacional</p>
            </div>
          </div>
        `,
        'home': `
          <div class="section-single">
            <div class="widget-aprendizaje-inicio">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Inicio - Aprendizaje</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Tu contenido de aprendizaje aquí</p>
            </div>
          </div>
        `,
        'catalog': `
          <div class="section-single">
            <div class="widget-aprendizaje-catalogo">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Catálogo</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Explora nuestro catálogo de cursos</p>
            </div>
          </div>
        `,
        'corporate': `
          <div class="section-single">
            <div class="widget-aprendizaje-corporativa">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Universidad Corporativa</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Contenido de la universidad corporativa</p>
            </div>
          </div>
        `,
        'study-zone': `
          <div class="section-single">
            <div class="widget-aprendizaje-zona-estudio">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Zona de Estudio</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Tu zona personal de estudio</p>
              <p class="ubits-body-md-regular" style="margin-top: 16px; color: var(--ubits-fg-1-medium);">
                Aquí puedes gestionar tus cursos, tareas y progreso de aprendizaje.
              </p>
            </div>
          </div>
        `
      },
      'empresa': {
        default: `
          <div class="section-single">
            <div class="widget-empresa-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">${this.isAdminMode ? 'Gestión de usuarios' : 'Empresa'}</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">${this.isAdminMode ? 'Gestión de usuarios' : 'Información y configuración de la empresa'}</p>
            </div>
          </div>
        `,
        // Tabs para modo admin (empresa)
        'gestion-usuarios': `
          <div class="section-single">
            <div class="widget-gestion-usuarios">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Gestión de usuarios</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Administración y gestión de usuarios del sistema</p>
            </div>
          </div>
        `,
        'organigrama': `
          <div class="section-single">
            <div class="widget-organigrama">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Organigrama</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Estructura organizacional de la empresa</p>
            </div>
          </div>
        `,
        'datos-empresa': `
          <div class="section-single">
            <div class="widget-datos-empresa">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Datos de empresa</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Información general y datos corporativos</p>
            </div>
          </div>
        `,
        'personalizacion': `
          <div class="section-single">
            <div class="widget-personalizacion">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Personalización</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Configuración de personalización y branding</p>
            </div>
          </div>
        `,
        'roles-permisos': `
          <div class="section-single">
            <div class="widget-roles-permisos">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Roles y permisos</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Gestión de roles y permisos del sistema</p>
            </div>
          </div>
        `,
        'comunicaciones': `
          <div class="section-single">
            <div class="widget-comunicaciones">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Comunicaciones</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Configuración de comunicaciones y notificaciones</p>
            </div>
          </div>
        `
      },
      'diagnóstico': {
        default: `
          <div class="section-single">
            <div class="widget-diagnostico-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Diagnóstico</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Herramientas y análisis de diagnóstico organizacional</p>
            </div>
          </div>
        `
      },
      'desempeño': {
        default: `
          <div class="section-single">
            <div class="widget-desempeno-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">${this.isAdminMode ? 'Evaluaciones 360' : 'Desempeño'}</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">${this.isAdminMode ? 'Gestión de evaluaciones 360°' : 'Módulo de evaluación de desempeño'}</p>
            </div>
          </div>
        `,
        'evaluations': `
          <div class="section-single">
            <div class="widget-desempeno-evaluaciones">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Evaluaciones 360</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Gestión de evaluaciones 360°</p>
            </div>
          </div>
        `,
        'matriz-talento': `
          <div class="section-single">
            <div class="widget-matriz-talento">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Matriz de Talento</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Visualización y gestión de la matriz de talento organizacional</p>
            </div>
          </div>
        `,
        'objectives': `
          <div class="section-single">
            <div class="widget-desempeno-objetivos">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Objetivos</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Gestión de objetivos</p>
            </div>
          </div>
        `,
        'metrics': `
          <div class="section-single">
            <div class="widget-desempeno-metricas">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Métricas</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Métricas de desempeño</p>
            </div>
          </div>
        `,
        'reports': `
          <div class="section-single">
            <div class="widget-desempeno-reportes">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Reportes</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Reportes de desempeño</p>
            </div>
          </div>
        `
      },
      'encuestas': {
        default: `
          <div class="section-single">
            <div class="widget-encuestas-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Encuestas</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Gestión de encuestas</p>
            </div>
          </div>
        `
      },
      'reclutamiento': {
        default: `
          <div class="section-single">
            <div class="widget-reclutamiento-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Reclutamiento</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Módulo de reclutamiento</p>
            </div>
          </div>
        `
      },
      'tareas': {
        default: `
          <div class="section-single">
            <div class="widget-tareas-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Tareas</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Gestión de tareas y planes</p>
            </div>
          </div>
        `,
        'planes': `
          <div class="section-single">
            <div class="widget-tareas-planes">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Planes</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Gestión de planes</p>
            </div>
          </div>
        `,
        'tasks': `
          <div class="section-single">
            <div class="widget-tareas-tasks">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Tareas</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Lista de tareas</p>
            </div>
          </div>
        `
      },
      'ubits-ai': {
        default: `
          <div class="section-single">
            <div class="widget-ubits-ai-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">UBITS AI</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Asistente de inteligencia artificial</p>
            </div>
          </div>
        `
      },
      'perfil': {
        default: `
          <div class="section-single">
            <div class="widget-perfil-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Mi Perfil</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Gestiona tu información personal y preferencias</p>
            </div>
          </div>
        `
      },
      'api': {
        default: `
          <div class="section-single">
            <div class="widget-api-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">API</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Documentación y acceso a la API de UBITS</p>
            </div>
          </div>
        `
      },
      'centro-ayuda': {
        default: `
          <div class="section-single">
            <div class="widget-centro-ayuda-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Centro de Ayuda</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Encuentra ayuda, documentación y soporte para usar UBITS</p>
            </div>
          </div>
        `
      },
      'centro-de-ayuda': {
        default: `
          <div class="section-single">
            <div class="widget-centro-ayuda-main">
              <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Centro de Ayuda</h2>
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Encuentra ayuda, documentación y soporte para usar UBITS</p>
            </div>
          </div>
        `
      }
    };

    const sectionData = sectionContent[section];
    if (!sectionData) {
      return `
        <div class="section-single">
          <div class="widget-default">
            <h2 class="ubits-heading-h1" style="margin-bottom: 16px; color: var(--ubits-fg-1-high);">Sección: ${section}</h2>
            <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Contenido de la sección ${section}</p>
          </div>
        </div>
      `;
    }

    // Si hay subsección específica, retornarla, sino usar default
    const contentKey = subSection && sectionData[subSection] ? subSection : 'default';
    const content = sectionData[contentKey] || sectionData.default;
    
    return content;
  }

  /**
   * Actualiza el SubNav según la sección actual
   */
  updateSubNav(section) {
    const subNavConfig = this.getSubNavForSection(section);
    
    // Si la sección no tiene SubNav (ej: inicio en admin, ubits-ai, perfil), ocultarlo
    const topNavContainer = document.getElementById('top-nav-container');
    if (!topNavContainer) {
      return;
    }

    // Si getSubNavForSection retorna null, ocultar SubNav
    if (!subNavConfig) {
      topNavContainer.style.display = 'none';
      return;
    }

    if (!subNavConfig.variant || subNavConfig.tabs.length === 0) {
      // Ocultar SubNav si no hay variant o tabs
      topNavContainer.style.display = 'none';
      return;
    }

    // Mostrar SubNav
    topNavContainer.style.display = 'block';

    // Recargar SubNav con la nueva configuración
    if (typeof window.createSubNav === 'function') {
      window.createSubNav({
        containerId: 'top-nav-container',
        variant: subNavConfig.variant,
        tabs: subNavConfig.tabs,
        activeTabId: subNavConfig.activeTabId,
        onTabChange: (tabId, element) => {
          // Actualizar contenido según subsección
          // IMPORTANTE: Mantener la sección actual y solo cambiar la subsección
          if (this.currentSection !== section) {
            return;
          }
          this.updateContent(this.currentSection || section, tabId);
        }
      });
    }
  }

  /**
   * Actualiza el contenido del área principal
   */
  updateContent(section, subSection = null) {
    // Buscar el content-area (puede estar en .content-area o dentro de .content-sections)
    let contentArea = document.querySelector('.content-area');
    if (!contentArea) {
      // Fallback: buscar por contenido existente
      contentArea = document.querySelector('.content-sections')?.parentElement;
    }
    if (!contentArea) {
      return;
    }

    
    const content = this.getContentForSection(section, subSection);
    
    // Buscar .content-sections dentro de contentArea
    let contentSections = contentArea.querySelector('.content-sections');
    
    if (contentSections) {
      // Si existe .content-sections, reemplazar su contenido interno
      contentSections.innerHTML = content;
    } else {
      // Si no existe, crear .content-sections y agregar el contenido
      contentSections = document.createElement('div');
      contentSections.className = 'content-sections';
      contentSections.innerHTML = content;
      contentArea.innerHTML = '';
      contentArea.appendChild(contentSections);
    }
    
    this.currentSection = section;
  }

  /**
   * Maneja el cambio de sección del Sidebar
   */
  handleSectionChange(section) {
    
    // Si es "perfil", desactivar todos los botones del sidebar
    if (section === 'perfil') {
      const sidebarElement = document.querySelector('.ubits-sidebar');
      if (sidebarElement) {
        sidebarElement.querySelectorAll('.ubits-sidebar-nav-button').forEach(btn => {
          btn.classList.remove('active');
          btn.blur();
        });
      }
    }
    
    // Establecer sección actual ANTES de actualizar SubNav
    // Esto asegura que el callback onTabChange tenga acceso a this.currentSection
    this.currentSection = section;
    
    // Actualizar SubNav primero (esto creará el SubNav con el callback correcto)
    this.updateSubNav(section);
    
    // Actualizar contenido con la subsección por defecto
    const subNavConfig = this.getSubNavForSection(section);
    // Si no hay SubNav config (null), usar null como subSection para cargar el contenido default
    const defaultSubSection = subNavConfig && subNavConfig.activeTabId ? subNavConfig.activeTabId : null;
    this.updateContent(section, defaultSubSection);
  }
}

// Crear instancia global
window.UBITS_ContentManager = new ContentManager();


