
/**
 * Components Bridge
 * Conecta los componentes del bundle (window.UBITS.*) con las funciones globales
 * que espera el template (para compatibilidad hacia atrás).
 */

(function () {
    console.log('🔌 Inicializando Components Bridge...');

    // Asegurar que UBITS existe
    window.UBITS = window.UBITS || {};

    // ========================================
    // TABS
    // ========================================
    if (window.UBITS.Tabs) {
        window.createTabs = window.UBITS.Tabs.createTabs;
        window.renderTabs = window.UBITS.Tabs.renderTabs;
        console.log('✅ Bridge: Tabs conectado');
    }

    // ========================================
    // SIDEBAR
    // ========================================
    if (window.UBITS.Sidebar) {
        window.renderSidebar = window.UBITS.Sidebar.renderSidebar;

        // Glue Code: Adjust Sidebar Height
        // (Copiado de components-loader.js original)
        window.adjustSidebarHeight = function (sidebarElement) {
            if (!sidebarElement) return;
            const windowHeight = window.innerHeight;
            const topMargin = 16;
            const bottomMargin = 16;
            const availableHeight = windowHeight - topMargin - bottomMargin;
            const minHeight = 578;
            const sidebarHeight = Math.max(minHeight, availableHeight);

            sidebarElement.style.height = `${sidebarHeight}px`;
            sidebarElement.style.top = `${topMargin}px`;
        };

        // Init Sidebar logic
        function initSidebar() {
            const sidebar = document.getElementById('ubits-sidebar');
            if (sidebar) {
                window.adjustSidebarHeight(sidebar);
                window.addEventListener('resize', () => window.adjustSidebarHeight(sidebar));
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSidebar);
        } else {
            initSidebar();
        }

        console.log('✅ Bridge: Sidebar conectado');
    }

    // ========================================
    // HEADER SECTION
    // ========================================
    if (window.UBITS.HeaderSection) {
        window.renderHeaderSection = window.UBITS.HeaderSection.renderHeaderSection;
        console.log('✅ Bridge: HeaderSection conectado');
    }

    // ========================================
    // SUBNAV
    // ========================================
    if (window.UBITS.Subnav) {
        window.createSubNav = window.UBITS.Subnav.createSubNav;
        console.log('✅ Bridge: SubNav conectado');
    }

    // ========================================
    // TOAST
    // ========================================
    if (window.UBITS.Toast) {
        window.showToast = window.UBITS.Toast.showToast;
        console.log('✅ Bridge: Toast conectado');
    }

    // ========================================
    // CAROUSEL & VISUAL HELPERS
    // ========================================
    // Render icon helper (utilizado por varios componentes manualmente en el HTML a veces)
    window.renderIconHelper = function (iconName, iconStyle = 'regular') {
        const iconClass = iconStyle === 'regular' ? 'far' : 'fas';
        let name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
        return `<i class="${iconClass} ${name}"></i>`;
    };

})();
