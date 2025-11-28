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
    console.log('🔍 [ContentManager] detectMode() llamado');
    const sidebarElement = document.querySelector('.ubits-sidebar');
    if (sidebarElement) {
      // El variant se pasa en la configuración, pero podemos detectarlo por los botones
      const hasAdminButtons = sidebarElement.querySelector('[data-section="inicio"]');
      const hasColaboradorButtons = sidebarElement.querySelector('[data-section="admin"]');
      
      console.log('🔍 [ContentManager] Detección de modo:');
      console.log('   - hasAdminButtons (inicio):', !!hasAdminButtons);
      console.log('   - hasColaboradorButtons (admin):', !!hasColaboradorButtons);
      
      if (hasAdminButtons && !hasColaboradorButtons) {
        this.isAdminMode = true;
        console.log('✅ [ContentManager] Modo detectado: ADMIN');
      } else {
        this.isAdminMode = false;
        console.log('✅ [ContentManager] Modo detectado: COLABORADOR');
      }
    } else {
      console.warn('⚠️ [ContentManager] .ubits-sidebar NO encontrado para detectar modo');
    }
    return this.isAdminMode;
  }

  /**
   * Mapeo de secciones del Sidebar a configuraciones de SubNav
   * IMPORTANTE: Algunas secciones tienen el mismo nombre en colaborador y admin,
   * pero activan SubNav diferentes. El variant del Sidebar determina qué SubNav usar.
   */
  getSubNavForSection(section) {
    console.log('🔍 [ContentManager] getSubNavForSection() llamado para sección:', section);
    // Detectar modo antes de retornar la configuración
    this.detectMode();
    
    console.log('🔍 [ContentManager] isAdminMode:', this.isAdminMode);
    
    // Normalizar el nombre de la sección (manejar variaciones con/sin tilde)
    const normalizedSection = section === 'diagnostico' ? 'diagnóstico' : section;
    
    // ⚠️ IMPORTANTE: Secciones sin SubNav
    // En modo admin: inicio y diagnóstico no tienen SubNav
    if (this.isAdminMode && (normalizedSection === 'inicio' || normalizedSection === 'diagnóstico')) {
      console.log('⚠️ [ContentManager] Sección sin SubNav (modo admin):', normalizedSection);
      return null;
    }
    
    // En modo colaborador: diagnóstico no tiene SubNav
    if (!this.isAdminMode && normalizedSection === 'diagnóstico') {
      console.log('⚠️ [ContentManager] Sección sin SubNav (modo colaborador):', normalizedSection);
      return null;
    }
    
    // Centro de ayuda nunca tiene SubNav (en cualquier modo)
    if (section === 'centro-ayuda' || section === 'centro-de-ayuda') {
      console.log('⚠️ [ContentManager] Sección sin SubNav (centro de ayuda):', section);
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

    // Usar la sección normalizada para buscar en el mapa
    const subNavConfig = subNavMap[normalizedSection] || subNavMap[section];
    if (subNavConfig) {
      console.log('✅ [ContentManager] Configuración de SubNav encontrada para:', normalizedSection);
      console.log('   - Variant:', subNavConfig.variant);
      console.log('   - Tabs count:', subNavConfig.tabs?.length);
      console.log('   - ActiveTabId:', subNavConfig.activeTabId);
      return subNavConfig;
    }

    console.warn(`⚠️ [ContentManager] No hay configuración de SubNav para la sección: ${normalizedSection}`);
    console.log('🔍 [ContentManager] Secciones disponibles en subNavMap:', Object.keys(subNavMap));

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
   * Obtiene el título de una sección basándose en el contenido o configuración
   */
  getSectionTitle(section, subSection = null) {
    // Mapeo de títulos para cada sección y subsección
    const titleMap = {
      'admin': 'Panel de Administración',
      'aprendizaje': {
        default: this.isAdminMode ? 'LMS' : 'Aprendizaje',
        'lms-cursos': 'LMS - Cursos propios',
        'plan-formacion': 'Plan de formación',
        'certificados': 'Certificados',
        'metricas-empresa': 'Métricas de empresa',
        'home': 'Inicio - Aprendizaje',
        'catalog': 'Catálogo',
        'corporate': 'Universidad Corporativa',
        'study-zone': 'Zona de Estudio'
      },
      'empresa': {
        default: this.isAdminMode ? 'Gestión de usuarios' : 'Empresa',
        'gestion-usuarios': 'Gestión de usuarios',
        'organigrama': 'Organigrama',
        'datos-empresa': 'Datos de empresa',
        'personalizacion': 'Personalización',
        'roles-permisos': 'Roles y permisos',
        'comunicaciones': 'Comunicaciones'
      },
      'diagnóstico': 'Diagnóstico',
      'desempeño': {
        default: this.isAdminMode ? 'Evaluaciones 360' : 'Desempeño',
        'evaluations': 'Evaluaciones 360',
        'matriz-talento': 'Matriz de Talento',
        'objectives': 'Objetivos',
        'metrics': 'Métricas',
        'reports': 'Reportes'
      },
      'encuestas': 'Encuestas',
      'reclutamiento': 'Reclutamiento',
      'tareas': {
        default: 'Tareas',
        'planes': 'Planes',
        'tasks': 'Tareas'
      },
      'ubits-ai': 'UBITS AI',
      'perfil': 'Mi Perfil',
      'api': 'API',
      'centro-ayuda': 'Centro de Ayuda',
      'centro-de-ayuda': 'Centro de Ayuda'
    };

    const sectionTitle = titleMap[section];
    if (!sectionTitle) {
      // Fallback: usar el nombre de la sección capitalizado
      return section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
    }

    // Si es un objeto (tiene subsecciones), obtener el título de la subsección o default
    if (typeof sectionTitle === 'object') {
      return sectionTitle[subSection] || sectionTitle.default || section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
    }

    // Si es un string directo, retornarlo
    return sectionTitle;
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
              <p class="ubits-body-md-regular" style="color: var(--ubits-fg-1-medium);">Contenido de administración</p>
            </div>
          </div>
        `
      },
      'aprendizaje': {
        default: `
          <div class="section-single">
            <div class="widget-aprendizaje-main">
            </div>
          </div>
        `,
        // Tabs para modo admin (aprendizaje)
        'lms-cursos': `
          <div class="section-single">
            <div class="widget-lms-cursos">
            </div>
          </div>
        `,
        'plan-formacion': `
          <div class="section-single">
            <div class="widget-plan-formacion">
            </div>
          </div>
        `,
        'certificados': `
          <div class="section-single">
            <div class="widget-certificados">
            </div>
          </div>
        `,
        'metricas-empresa': `
          <div class="section-single">
            <div class="widget-metricas-empresa">
            </div>
          </div>
        `,
        'home': `
          <div class="section-single">
            <div class="widget-aprendizaje-inicio">
            </div>
          </div>
        `,
        'catalog': `
          <div class="section-single">
            <div class="widget-aprendizaje-catalogo">
            </div>
          </div>
        `,
        'corporate': `
          <div class="section-single">
            <div class="widget-aprendizaje-corporativa">
            </div>
          </div>
        `,
        'study-zone': `
          <div class="section-single">
            <div class="widget-aprendizaje-zona-estudio">
            </div>
          </div>
        `
      },
      'empresa': {
        default: `
          <div class="section-single">
            <div class="widget-empresa-main">
            </div>
          </div>
        `,
        // Tabs para modo admin (empresa)
        'gestion-usuarios': `
          <div class="section-single">
            <div class="widget-gestion-usuarios">
            </div>
          </div>
        `,
        'organigrama': `
          <div class="section-single">
            <div class="widget-organigrama">
            </div>
          </div>
        `,
        'datos-empresa': `
          <div class="section-single">
            <div class="widget-datos-empresa">
            </div>
          </div>
        `,
        'personalizacion': `
          <div class="section-single">
            <div class="widget-personalizacion">
            </div>
          </div>
        `,
        'roles-permisos': `
          <div class="section-single">
            <div class="widget-roles-permisos">
            </div>
          </div>
        `,
        'comunicaciones': `
          <div class="section-single">
            <div class="widget-comunicaciones">
            </div>
          </div>
        `
      },
      'diagnóstico': {
        default: `
          <div class="section-single">
            <div class="widget-diagnostico-main">
            </div>
          </div>
        `
      },
      'desempeño': {
        default: `
          <div class="section-single">
            <div class="widget-desempeno-main">
            </div>
          </div>
        `,
        'evaluations': `
          <div class="section-single">
            <div class="widget-desempeno-evaluaciones">
            </div>
          </div>
        `,
        'matriz-talento': `
          <div class="section-single">
            <div class="widget-matriz-talento">
            </div>
          </div>
        `,
        'objectives': `
          <div class="section-single">
            <div class="widget-desempeno-objetivos">
            </div>
          </div>
        `,
        'metrics': `
          <div class="section-single">
            <div class="widget-desempeno-metricas">
            </div>
          </div>
        `,
        'reports': `
          <div class="section-single">
            <div class="widget-desempeno-reportes">
            </div>
          </div>
        `
      },
      'encuestas': {
        default: `
          <div class="section-single">
            <div class="widget-encuestas-main">
            </div>
          </div>
        `
      },
      'reclutamiento': {
        default: `
          <div class="section-single">
            <div class="widget-reclutamiento-main">
            </div>
          </div>
        `
      },
      'tareas': {
        default: `
          <div class="section-single">
            <div class="widget-tareas-main">
            </div>
          </div>
        `,
        'planes': `
          <div class="section-single">
            <div class="widget-tareas-planes">
            </div>
          </div>
        `,
        'tasks': `
          <div class="section-single">
            <div class="widget-tareas-tasks">
            </div>
          </div>
        `
      },
      'ubits-ai': {
        default: `
          <div class="section-single">
            <div class="widget-ubits-ai-main">
            </div>
          </div>
        `
      },
      'perfil': {
        default: `
          <div class="section-single">
            <div class="widget-perfil-main">
            </div>
          </div>
        `
      },
      'api': {
        default: `
          <div class="section-single">
            <div class="widget-api-main">
            </div>
          </div>
        `
      },
      'centro-ayuda': {
        default: `
          <div class="section-single">
            <div class="widget-centro-ayuda-main">
            </div>
          </div>
        `
      },
      'centro-de-ayuda': {
        default: `
          <div class="section-single">
            <div class="widget-centro-ayuda-main">
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
  updateSubNav(section, activeTabId = null) {
    console.log('🔍 [ContentManager.updateSubNav] ════════════════════════════════════════');
    console.log('🔍 [ContentManager.updateSubNav] updateSubNav llamado para sección:', section);
    console.log('🔍 [ContentManager.updateSubNav] activeTabId proporcionado:', activeTabId);
    console.log('🔍 [ContentManager.updateSubNav] currentSection actual:', this.currentSection);
    const subNavConfig = this.getSubNavForSection(section);
    console.log('🔍 [ContentManager.updateSubNav] SubNav config obtenida:', subNavConfig);
    console.log('🔍 [ContentManager.updateSubNav] SubNav config variant:', subNavConfig?.variant);
    console.log('🔍 [ContentManager.updateSubNav] SubNav config tabs count:', subNavConfig?.tabs?.length);
    
    // Si se proporciona activeTabId, usarlo en lugar del de la configuración
    const finalActiveTabId = activeTabId || (subNavConfig && subNavConfig.activeTabId);
    console.log('🔍 [ContentManager.updateSubNav] Tab activo final:', finalActiveTabId);
    
    // Si la sección no tiene SubNav (ej: inicio en admin, ubits-ai, perfil), ocultarlo
    const topNavContainer = document.getElementById('top-nav-container');
    if (!topNavContainer) {
      console.error('❌ [ContentManager.updateSubNav] top-nav-container NO encontrado');
      return;
    }
    console.log('✅ [ContentManager.updateSubNav] top-nav-container encontrado');
    
    // ⚠️ PREVENIR actualizaciones múltiples si el SubNav ya está actualizado con la misma configuración
    // Esto evita el "titilante" cuando updateSubNav se llama varias veces desde ResponsiveManager
    const existingSubNav = topNavContainer.querySelector('.ubits-sub-nav');
    if (existingSubNav && subNavConfig) {
      const existingVariant = existingSubNav.getAttribute('data-variant');
      const existingTabs = existingSubNav.querySelectorAll('.ubits-sub-nav-tab');
      const existingTabIds = Array.from(existingTabs).map(t => t.getAttribute('data-tab')).filter(Boolean);
      const expectedTabIds = subNavConfig.tabs?.map(t => t.id).filter(Boolean) || [];
      
      if (existingVariant === subNavConfig.variant && 
          existingTabIds.length === expectedTabIds.length &&
          existingTabIds.every((id, idx) => id === expectedTabIds[idx])) {
        console.log('🔍 [ContentManager.updateSubNav] ⚠️ SubNav ya está actualizado con la misma configuración, evitando recarga');
        console.log('   - Variant existente:', existingVariant);
        console.log('   - Variant esperado:', subNavConfig.variant);
        console.log('   - Tabs existentes:', existingTabIds);
        console.log('   - Tabs esperados:', expectedTabIds);
        return;
      }
    }

    // Si getSubNavForSection retorna null, ocultar SubNav
    if (!subNavConfig) {
      console.log('⚠️ [ContentManager] SubNav config es null, ocultando contenedor');
      topNavContainer.style.display = 'none';
      return;
    }

    if (!subNavConfig.variant || subNavConfig.tabs.length === 0) {
      // Ocultar SubNav si no hay variant o tabs
      console.log('⚠️ [ContentManager] SubNav no tiene variant o tabs, ocultando contenedor');
      topNavContainer.style.display = 'none';
      return;
    }

    // Mostrar SubNav
    console.log('✅ [ContentManager] Mostrando SubNav con variant:', subNavConfig.variant);
    topNavContainer.style.display = 'block';

    // Recargar SubNav con la nueva configuración
    if (typeof window.createSubNav === 'function') {
      console.log('🔍 [ContentManager] Llamando createSubNav con:', {
        containerId: 'top-nav-container',
        variant: subNavConfig.variant,
        tabs: subNavConfig.tabs,
        activeTabId: subNavConfig.activeTabId
      });
      window.createSubNav({
        containerId: 'top-nav-container',
        variant: subNavConfig.variant,
        tabs: subNavConfig.tabs,
        activeTabId: finalActiveTabId, // Usar el tab activo final (proporcionado o de la config)
        showIcons: true, // Activar iconos en el SubNav
        onTabChange: (tabId, element) => {
          // Actualizar contenido según subsección
          // IMPORTANTE: Mantener la sección actual y solo cambiar la subsección
          if (this.currentSection !== section) {
            return;
          }
          this.updateContent(this.currentSection || section, tabId);
        }
      });
      console.log('✅ [ContentManager.updateSubNav] createSubNav llamado correctamente');
      
      // Verificar que el SubNav se haya creado
      setTimeout(() => {
        const subNavElement = document.querySelector('.ubits-sub-nav');
        const tabs = subNavElement?.querySelectorAll('.ubits-sub-nav-tab');
        console.log('🔍 [ContentManager.updateSubNav] Verificación después de createSubNav:');
        console.log('   - SubNav existe:', !!subNavElement);
        console.log('   - Tabs encontrados:', tabs?.length || 0);
        if (tabs && tabs.length > 0) {
          console.log('   - Labels de tabs:', Array.from(tabs).map(t => t.textContent?.trim()));
        }
      }, 100);
    } else {
      console.error('❌ [ContentManager.updateSubNav] window.createSubNav NO es una función');
      console.error('   - Tipo de window.createSubNav:', typeof window.createSubNav);
    }
    console.log('🔍 [ContentManager.updateSubNav] ════════════════════════════════════════');
  }

  /**
   * Actualiza el contenido del área principal
   */
  updateContent(section, subSection = null) {
    console.log('🔍 [ContentManager.updateContent] ════════════════════════════════════════');
    console.log('🔍 [ContentManager.updateContent] updateContent llamado para sección:', section, 'subSection:', subSection);
    console.log('🔍 [ContentManager.updateContent] currentSection actual:', this.currentSection);
    
    // Buscar el content-area (puede estar en .content-area o dentro de .content-sections)
    let contentArea = document.querySelector('.content-area');
    if (!contentArea) {
      // Fallback: buscar por contenido existente
      contentArea = document.querySelector('.content-sections')?.parentElement;
    }
    if (!contentArea) {
      console.warn('⚠️ [ContentManager.updateContent] content-area no encontrado');
      return;
    }
    
    // ⚠️ PREVENIR actualizaciones múltiples si ya estamos en la misma sección y subsección
    // Esto evita el "titilante" cuando updateSubNav se llama varias veces
    const expectedTitle = this.getSectionTitle(section, subSection);
    const existingHeader = contentArea.querySelector('#header-section-container');
    const existingContent = contentArea.querySelector('.content-sections');
    
    if (existingHeader && existingContent) {
      const existingTitle = existingHeader.querySelector('.ubits-heading-h2')?.textContent?.trim();
      if (existingTitle === expectedTitle) {
        console.log('🔍 [ContentManager.updateContent] ⚠️ Contenido ya está actualizado, evitando recarga');
        console.log('   - Título existente:', existingTitle);
        console.log('   - Título esperado:', expectedTitle);
        return;
      }
    }

    // Limpiar contentArea solo si es necesario
    contentArea.innerHTML = '';
    
    // Obtener título de la sección
    const sectionTitle = this.getSectionTitle(section, subSection);
    
    // NO mostrar header-section en el home del administrador (sección 'admin')
    if (section !== 'admin') {
      console.log('🔍 [ContentManager] ════════════════════════════════════════');
      console.log('🔍 [ContentManager] Creando HeaderSection para sección:', section);
      console.log('🔍 [ContentManager] Título:', sectionTitle);
      
      // Crear contenedor para header-section (al inicio del content-area, sin espacio superior)
      const headerContainer = document.createElement('div');
      headerContainer.id = 'header-section-container';
      headerContainer.style.cssText = 'margin-top: 0; margin-bottom: 0; width: 100%;';
      
      // Crear header-section con solo título y botón primario
      // HTML directo usando la estructura correcta del componente HeaderSection
      const headerHTML = `
        <div class="ubits-header-section">
          <div class="ubits-header-section__content">
            <div class="ubits-header-section__title-wrapper">
              <div class="ubits-header-section__title-group">
                <h2 class="ubits-heading-h2">${sectionTitle}</h2>
              </div>
            </div>
            <div class="ubits-header-section__actions">
              <button class="ubits-button ubits-button--primary ubits-button--md">
                <i class="far fa-plus"></i>
                <span>Acción</span>
              </button>
            </div>
          </div>
        </div>
      `;
      
      headerContainer.innerHTML = headerHTML;
      contentArea.appendChild(headerContainer);
      
      // ⚠️ DIAGNÓSTICO: Verificar estilos del botón después de insertar
      setTimeout(() => {
        const button = headerContainer.querySelector('.ubits-button');
        if (button) {
          console.log('🔍 [ContentManager] Botón encontrado:', button);
          console.log('🔍 [ContentManager] Clases del botón:', button.className);
          
          const computedStyle = window.getComputedStyle(button);
          console.log('🔍 [ContentManager] Estilos computados del botón:');
          console.log('   - background:', computedStyle.backgroundColor);
          console.log('   - color:', computedStyle.color);
          console.log('   - padding:', computedStyle.padding);
          console.log('   - border-radius:', computedStyle.borderRadius);
          console.log('   - font-family:', computedStyle.fontFamily);
          console.log('   - font-size:', computedStyle.fontSize);
          console.log('   - font-weight:', computedStyle.fontWeight);
          console.log('   - border:', computedStyle.border);
          console.log('   - display:', computedStyle.display);
          console.log('   - width:', computedStyle.width);
          console.log('   - height:', computedStyle.height);
          
          // Verificar si el CSS del botón está cargado
          const buttonStylesheets = Array.from(document.styleSheets).filter(sheet => {
            try {
              return sheet.href && (sheet.href.includes('button.css') || sheet.href.includes('button'));
            } catch (e) {
              return false;
            }
          });
          console.log('🔍 [ContentManager] CSS de botón encontrado:', buttonStylesheets.length);
          buttonStylesheets.forEach((sheet, idx) => {
            console.log(`   - Stylesheet ${idx + 1}:`, sheet.href);
            try {
              const rules = Array.from(sheet.cssRules || []);
              const buttonRules = rules.filter(rule => 
                rule.selectorText && rule.selectorText.includes('.ubits-button')
              );
              console.log(`   - Reglas para .ubits-button:`, buttonRules.length);
              if (buttonRules.length > 0) {
                console.log(`   - Primera regla:`, buttonRules[0].selectorText);
                console.log(`   - CSS:`, buttonRules[0].cssText.substring(0, 200));
              }
            } catch (e) {
              console.error(`   - Error al leer reglas:`, e.message);
            }
          });
          
          // Verificar tokens CSS disponibles
          const root = document.documentElement;
          const computedRootStyle = getComputedStyle(root);
          const tokens = {
            '--ubits-button-primary-bg-default': computedRootStyle.getPropertyValue('--ubits-button-primary-bg-default'),
            '--ubits-btn-primary-fg': computedRootStyle.getPropertyValue('--ubits-btn-primary-fg'),
            '--ubits-button-primary-hover': computedRootStyle.getPropertyValue('--ubits-button-primary-hover'),
            '--ubits-button-primary-pressed': computedRootStyle.getPropertyValue('--ubits-button-primary-pressed'),
            '--ubits-spacing-md': computedRootStyle.getPropertyValue('--ubits-spacing-md'),
            '--ubits-spacing-lg': computedRootStyle.getPropertyValue('--ubits-spacing-lg'),
            '--ubits-border-radius-md': computedRootStyle.getPropertyValue('--ubits-border-radius-md'),
            '--ubits-border-radius-sm': computedRootStyle.getPropertyValue('--ubits-border-radius-sm'),
            '--weight-semibold': computedRootStyle.getPropertyValue('--weight-semibold'),
          };
          console.log('🔍 [ContentManager] Tokens CSS disponibles:');
          Object.entries(tokens).forEach(([key, value]) => {
            console.log(`   - ${key}:`, value || '❌ NO DEFINIDO');
          });
          
          // Verificar si el CSS del botón está aplicando los estilos correctamente
          console.log('🔍 [ContentManager] Verificando aplicación de estilos CSS:');
          const buttonStylesheet = Array.from(document.styleSheets).find(sheet => {
            try {
              return sheet.href && sheet.href.includes('button.css');
            } catch (e) {
              return false;
            }
          });
          if (buttonStylesheet) {
            console.log('   - Stylesheet de botón encontrado:', buttonStylesheet.href);
            try {
              const rules = Array.from(buttonStylesheet.cssRules || []);
              const primaryButtonRule = rules.find(rule => 
                rule.selectorText && rule.selectorText.includes('.ubits-button--primary') && !rule.selectorText.includes(':')
              );
              if (primaryButtonRule) {
                console.log('   - Regla .ubits-button--primary encontrada');
                console.log('   - Selector:', primaryButtonRule.selectorText);
                console.log('   - CSS completo:', primaryButtonRule.cssText);
              } else {
                console.log('   - ⚠️ Regla .ubits-button--primary NO encontrada');
              }
            } catch (e) {
              console.error('   - ❌ Error al leer reglas CSS:', e.message);
            }
          } else {
            console.log('   - ⚠️ Stylesheet de botón NO encontrado');
          }
          
          // Verificar estructura del botón
          const icon = button.querySelector('i');
          const span = button.querySelector('span');
          console.log('🔍 [ContentManager] Estructura del botón:');
          console.log('   - Icon encontrado:', !!icon, icon ? icon.className : '');
          console.log('   - Span encontrado:', !!span, span ? span.textContent : '');
          
          // Verificar si hay estilos inline o conflictos
          console.log('🔍 [ContentManager] Estilos inline del botón:', button.style.cssText || '(ninguno)');
          
          // Verificar si el botón tiene el estilo esperado del componente
          const expectedBg = getComputedStyle(root).getPropertyValue('--ubits-button-primary-bg-default');
          const actualBg = computedStyle.backgroundColor;
          console.log('🔍 [ContentManager] Comparación de background:');
          console.log('   - Esperado (token):', expectedBg || 'NO DEFINIDO');
          console.log('   - Actual (computado):', actualBg);
          console.log('   - ¿Coincide?:', expectedBg ? actualBg.includes('rgb(12, 91, 239)') || actualBg.includes('#0c5bef') : false);
        } else {
          console.error('❌ [ContentManager] Botón NO encontrado en el header');
        }
        
        // Verificar estilos del header-section
        const headerSection = headerContainer.querySelector('.ubits-header-section');
        if (headerSection) {
          const headerComputedStyle = window.getComputedStyle(headerSection);
          console.log('🔍 [ContentManager] Estilos del header-section:');
          console.log('   - display:', headerComputedStyle.display);
          console.log('   - padding:', headerComputedStyle.padding);
          console.log('   - gap:', headerComputedStyle.gap);
          console.log('   - width:', headerComputedStyle.width);
        }
        
        // Verificar si el CSS del header-section está cargado
        const headerStylesheets = Array.from(document.styleSheets).filter(sheet => {
          try {
            return sheet.href && sheet.href.includes('header-section.css');
          } catch (e) {
            return false;
          }
        });
        console.log('🔍 [ContentManager] CSS de header-section encontrado:', headerStylesheets.length);
        headerStylesheets.forEach((sheet, idx) => {
          console.log(`   - Stylesheet ${idx + 1}:`, sheet.href);
        });
        
        console.log('🔍 [ContentManager] ════════════════════════════════════════');
      }, 100);
    }
    
    // Crear .content-sections y agregar el contenido
    const content = this.getContentForSection(section, subSection);
    const contentSections = document.createElement('div');
    contentSections.className = 'content-sections';
    contentSections.innerHTML = content;
    contentArea.appendChild(contentSections);
    
    // NO actualizar currentSection aquí - ya se actualiza en handleSectionChange
    // this.currentSection = section;
    
    console.log('🔍 [ContentManager.updateContent] ✅ Contenido actualizado para sección:', section, 'subSection:', subSection);
  }

  /**
   * Maneja el cambio de sección del Sidebar
   * @param {string} section - ID de la sección
   * @param {string|null} activeTabId - ID del tab activo (opcional, sobrescribe el de la configuración)
   */
  handleSectionChange(section, activeTabId = null) {
    console.log('🔍 [ContentManager.handleSectionChange] ════════════════════════════════════════');
    console.log('🔍 [ContentManager.handleSectionChange] Nueva sección:', section);
    console.log('🔍 [ContentManager.handleSectionChange] activeTabId proporcionado:', activeTabId);
    console.log('🔍 [ContentManager.handleSectionChange] Sección anterior:', this.currentSection);
    
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
    console.log('🔍 [ContentManager.handleSectionChange] ✅ currentSection actualizado a:', this.currentSection);
    
    // Actualizar SubNav primero (esto creará el SubNav con el callback correcto)
    // Si se proporciona activeTabId, pasarlo para que el SubNav se cree con el tab correcto activo
    console.log('🔍 [ContentManager.handleSectionChange] Llamando updateSubNav...');
    this.updateSubNav(section, activeTabId);
    console.log('🔍 [ContentManager.handleSectionChange] ✅ updateSubNav llamado');
    
    // Actualizar contenido con la subsección proporcionada o la por defecto
    const subNavConfig = this.getSubNavForSection(section);
    // Si se proporciona activeTabId, usarlo; si no, usar el de la configuración
    const defaultSubSection = activeTabId || (subNavConfig && subNavConfig.activeTabId) || null;
    this.updateContent(section, defaultSubSection);
  }
}

// Crear instancia global
window.UBITS_ContentManager = new ContentManager();



