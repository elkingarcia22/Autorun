import type { Meta, StoryObj } from '@storybook/html';
import { createTabBar } from '../../addons/tabbar/src/TabBarProvider';
import { defaultFloatingMenuSections, defaultProfileMenuItems } from '../../addons/tabbar/src/configs/defaultFloatingMenu';
import type { TabBarOptions, TabBarItem, FloatingMenuSection, ProfileMenuItem } from '../../addons/tabbar/src/types/TabBarOptions';

// Configuraciones de Floating Menu para cada variante
const colaboradorFloatingMenuSections: FloatingMenuSection[] = [
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
    id: 'diagnostico',
    title: 'Diagnóstico',
    icon: 'chart-mixed',
    url: 'diagnostico.html',
    isLink: true,
    clickable: true
  },
  {
    id: 'desempeno',
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
];

const adminFloatingMenuSections: FloatingMenuSection[] = [
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
];

// Items del Profile Menu por variante
const colaboradorProfileMenuItems: ProfileMenuItem[] = [
  {
    id: 'ver-perfil',
    label: 'Ver mi perfil',
    icon: 'user',
    url: 'profile.html'
  },
  {
    id: 'admin-mode',
    label: 'Modo Administrador',
    icon: 'laptop',
    url: 'template-admin.html'
  },
  {
    id: 'cambio-contraseña',
    label: 'Cambio de contraseña',
    icon: 'key',
    onClick: () => {
      // Sin acción
    }
  },
  {
    id: 'cerrar-sesion',
    label: 'Cerrar sesión',
    icon: 'sign-out-alt',
    onClick: () => {
      // Sin acción
    }
  }
];

const adminProfileMenuItems: ProfileMenuItem[] = [
  {
    id: 'ver-perfil',
    label: 'Ver mi perfil',
    icon: 'user',
    url: 'profile.html'
  },
  {
    id: 'modo-colaborador',
    label: 'Modo colaborador',
    icon: 'user-gear',
    url: 'template-colaborador.html'
  },
  {
    id: 'cambio-contraseña',
    label: 'Cambio de contraseña',
    icon: 'key',
    onClick: () => {
      // Sin acción
    }
  },
  {
    id: 'cerrar-sesion',
    label: 'Cerrar sesión',
    icon: 'sign-out-alt',
    onClick: () => {
      // Sin acción
    }
  }
];

/**
 * TabBar Component Stories
 * 
 * Componente de navegación inferior para dispositivos móviles.
 * Reemplaza al sidebar en pantallas pequeñas con items personalizables
 * con iconos o avatares, dark mode toggle, Floating Menu (accordions)
 * y Profile Menu (dropdown).
 */
const meta = {
  title: 'Components/TabBar',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    // Deshabilitar completamente el focus management de Storybook para evitar conflictos
    a11y: {
      config: {
        rules: [
          {
            id: 'focus-order-semantics',
            enabled: false,
          },
          {
            id: 'focusable-content',
            enabled: false,
          },
        ],
      },
      manual: true,
    },
    // Deshabilitar interacciones automáticas que puedan causar problemas de focus
    interactions: {
      disable: true,
    },
    // Deshabilitar completamente el sistema de focus de Storybook
    // Esto previene que Storybook intente hacer focus automáticamente
    actions: {
      disable: true,
    },
    docs: {
      description: {
        component: 'Componente TabBar UBITS de navegación inferior para móviles. Reemplaza al sidebar en pantallas pequeñas (< 1024px) con items personalizables con iconos o avatares, dark mode toggle, y callbacks personalizables por item. Incluye Floating Menu con accordions (se muestra al hacer click en "Módulos") y Profile Menu dropdown (se muestra al hacer click en "Mi perfil"). Soporta 2 variantes: colaborador y admin.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['colaborador', 'admin'],
      description: 'Variante del TabBar: colaborador o admin',
      table: {
        type: { summary: 'colaborador | admin' },
        defaultValue: { summary: 'colaborador' }
      }
    },
    activeTabId: {
      control: { type: 'select' },
      options: ['modulos', 'perfil', 'modo-oscuro'],
      description: 'ID del tab activo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'modulos' }
      }
    },
    darkModeEnabled: {
      control: { type: 'boolean' },
      description: 'Habilitar dark mode toggle',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Mostrar el TabBar (por defecto false, solo visible en móvil)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
  }
} satisfies Meta<TabBarOptions & { variant?: 'colaborador' | 'admin'; activeTabId?: string; darkModeEnabled?: boolean; visible?: boolean }>;

export default meta;
type Story = StoryObj<TabBarOptions & { variant?: 'colaborador' | 'admin'; activeTabId?: string; darkModeEnabled?: boolean; visible?: boolean }>;

// Función helper para obtener configuración según variante
function getTabBarConfig(variant: 'colaborador' | 'admin') {
  return {
    floatingMenuSections: variant === 'admin' ? adminFloatingMenuSections : colaboradorFloatingMenuSections,
    profileMenuItems: variant === 'admin' ? adminProfileMenuItems : colaboradorProfileMenuItems
  };
}

// Items estándar del TabBar
const defaultItems: TabBarItem[] = [
  {
    id: 'modulos',
    label: 'Módulos',
    icon: 'th-large',
    onClick: (item, event) => {
      console.log('Módulos clicked:', item);
    }
  },
  {
    id: 'perfil',
    label: 'Mi perfil',
    avatar: '/images/Profile-image.jpg',
    avatarAlt: 'Mi perfil',
    onClick: (item, event) => {
      console.log('Perfil clicked:', item);
    }
  },
  {
    id: 'modo-oscuro',
    label: 'Modo oscuro',
    icon: 'moon',
    onClick: (item, event) => {
      console.log('Dark mode clicked:', item);
    }
  }
];

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
  args: {
    containerId: 'tabbar-story-container',
    variant: 'colaborador' as 'colaborador' | 'admin',
    items: defaultItems,
    activeTabId: 'modulos',
    darkModeEnabled: true,
    visible: true,
    // No incluir floatingMenuSections y profileMenuItems en args iniciales
    // para que se calculen dinámicamente según el variant
    onTabChange: (tabId, item, element) => {
      console.log('Tab changed:', tabId, item);
    },
    onDarkModeToggle: (isDark) => {
      console.log('Dark mode toggled:', isDark);
    },
    onFloatingMenuItemClick: (sectionId, subitemId, url) => {
      console.log('Floating menu item clicked:', { sectionId, subitemId, url });
    },
    onProfileMenuItemClick: (itemId, item) => {
      console.log('Profile menu item clicked:', { itemId, item });
    }
  } as TabBarOptions & { variant?: 'colaborador' | 'admin'; activeTabId?: string; darkModeEnabled?: boolean; visible?: boolean },
  render: (args) => {
    // Suprimir errores de Storybook relacionados con focus
    const originalError = window.console.error;
    window.console.error = (...args: any[]) => {
      const errorMessage = args.join(' ');
      // Ignorar errores específicos de Storybook relacionados con focus
      if (
        errorMessage.includes('Could not determine window of node') ||
        errorMessage.includes('HTMLBodyElement') ||
        errorMessage.includes('Minified React error') ||
        errorMessage.includes('deferred DOM Node')
      ) {
        return; // No mostrar estos errores
      }
      // Mostrar otros errores normalmente
      originalError.apply(window.console, args);
    };
    
    // Restaurar console.error después de un tiempo
    setTimeout(() => {
      window.console.error = originalError;
    }, 5000);
    
    // Limpiar contenedor previo si existe - pero solo el contenido, no el elemento
    const existingContainer = document.getElementById(args.containerId || 'tabbar-story-container');
    if (existingContainer && existingContainer.parentElement) {
      // Solo limpiar contenido interno, no remover el elemento
      existingContainer.innerHTML = '';
    }

    // Obtener configuraciones según la variante - SIEMPRE usar las configuraciones del variant, ignorar args si variant está presente
    const variant = args.variant || 'colaborador';
    const config = getTabBarConfig(variant);
    // SIEMPRE usar las configuraciones del variant actual, ignorar cualquier valor en args
    const floatingMenuSections = config.floatingMenuSections;
    const profileMenuItems = config.profileMenuItems;

    // Wrapper principal - tamaño móvil adecuado para preview
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 375px;
      margin: 0 auto;
      padding: 16px;
      background: var(--ubits-bg-2);
      border-radius: 8px;
      border: 1px solid var(--ubits-border-1);
      position: relative;
      display: flex;
      flex-direction: column;
      isolation: isolate;
    `;

    // Panel de información - pequeño y arriba
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      margin-bottom: 16px;
      padding: 12px;
      background: var(--ubits-bg-2);
      border-radius: 6px;
      font-family: var(--font-sans);
      font-size: 12px;
      order: 1;
    `;

    const activeItem = args.items?.find(item => item.id === args.activeTabId) || args.items?.[0];

    infoPanel.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-size: 11px; color: var(--ubits-fg-1-medium);">
        <div><strong>Variante:</strong> ${variant === 'colaborador' ? 'Colaborador' : 'Admin'}</div>
        <div><strong>Items:</strong> ${args.items?.length || 0}</div>
        <div><strong>Tab Activo:</strong> ${activeItem?.label || args.activeTabId || 'Ninguno'}</div>
        <div><strong>Dark Mode:</strong> ${args.darkModeEnabled ? 'Sí' : 'No'}</div>
        <div><strong>Menús:</strong> ${(floatingMenuSections && floatingMenuSections.length > 0) || (profileMenuItems && profileMenuItems.length > 0) ? 'Sí' : 'No'}</div>
      </div>
    `;

    wrapper.appendChild(infoPanel);

    // Contenedor del TabBar y menús - DENTRO del wrapper con el mismo ancho
    // Este contenedor contendrá TODO: TabBar, Floating Menu y Profile Menu
    // Debe tener la clase ubits-tabbar-preview-container para que el provider detecte modo preview
    // IMPORTANTE: position: relative es necesario para que los elementos absolute dentro sean relativos a este contenedor
    const container = document.createElement('div');
    container.id = args.containerId || 'tabbar-story-container';
    container.classList.add('ubits-tabbar-preview-container');
    container.style.cssText = `
      position: relative !important;
      width: 100%;
      min-height: 576px;
      margin-top: auto;
      order: 2;
      overflow: visible;
      box-sizing: border-box;
      isolation: isolate;
      background: var(--ubits-bg-2);
      border-radius: 8px;
    `;

    wrapper.appendChild(container);

    // Interceptar eventos de focus SOLO en el body para evitar conflictos con Storybook
    // No interceptamos eventos en el contenedor del TabBar para que funcione correctamente
    const preventBodyFocus = (e: Event) => {
      // Solo prevenir focus si el target es el body o un elemento fuera del wrapper
      const target = e.target as HTMLElement;
      if (target === document.body || (!wrapper.contains(target) && target.tagName === 'BODY')) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
      }
    };
    
    // Agregar listeners en fase de captura ANTES de que Storybook los procese
    document.addEventListener('focusin', preventBodyFocus, { capture: true });
    document.addEventListener('focus', preventBodyFocus, { capture: true });
    document.body.addEventListener('focusin', preventBodyFocus, { capture: true });
    document.body.addEventListener('focus', preventBodyFocus, { capture: true });

    // Crear el TabBar usando requestAnimationFrame y setTimeout anidados
    // para asegurar que Storybook termine de procesar antes de crear el componente
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            // Deshabilitar temporalmente el método focus del body
            const originalBodyFocus = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'focus')?.value;
            
            // Override temporal del método focus SOLO para el body
            if (originalBodyFocus) {
              Object.defineProperty(document.body, 'focus', {
                value: function() {
                  // No hacer nada cuando Storybook intenta hacer focus en el body
                  return;
                },
                writable: true,
                configurable: true
              });
            }
            
            const tabBarElement = createTabBar({
              ...args,
              container: container,
              visible: args.visible !== false,
              darkModeEnabled: args.darkModeEnabled !== false,
              // SIEMPRE usar las configuraciones del variant actual, ignorar cualquier valor en args
              floatingMenuSections: config.floatingMenuSections,
              profileMenuItems: config.profileMenuItems,
              onTabChange: (tabId, item, element) => {
                // Actualizar panel de información sin usar querySelector que pueda causar problemas
                try {
                  const infoContent = infoPanel.querySelector('div[style*="grid"]');
                  if (infoContent) {
                    const activeTabDiv = infoContent.querySelector('div:nth-child(3)');
                    if (activeTabDiv) {
                      activeTabDiv.innerHTML = `<strong>Tab Activo:</strong> ${item.label}`;
                    }
                  }
                } catch (e) {
                  // Ignorar errores de querySelector en Storybook
                }
                
                if (args.onTabChange) {
                  args.onTabChange(tabId, item, element);
                }
              },
              onDarkModeToggle: args.onDarkModeToggle,
              onFloatingMenuItemClick: args.onFloatingMenuItemClick,
              onProfileMenuItemClick: args.onProfileMenuItemClick
            });

            if (!tabBarElement) {
              console.error('Error: createTabBar retornó null');
              container.innerHTML = `<p style="color: var(--ubits-feedback-border-error); padding: 16px; font-size: 12px;">Error: No se pudo crear el TabBar</p>`;
            }
            
            // Restaurar focus después de un tiempo
            setTimeout(() => {
              if (originalBodyFocus) {
                try {
                  Object.defineProperty(document.body, 'focus', {
                    value: originalBodyFocus,
                    writable: true,
                    configurable: true
                  });
                } catch (e) {
                  // Ignorar errores al restaurar
                }
              }
            }, 2000);
          } catch (error) {
            console.error('Error creando TabBar:', error);
            container.innerHTML = `<p style="color: var(--ubits-feedback-border-error); padding: 16px; font-size: 12px;">Error: ${error}</p>`;
          }
        }, 500);
      });
    });
    
    // Remover listeners después de que el componente se haya creado
    setTimeout(() => {
      document.removeEventListener('focusin', preventBodyFocus, { capture: true });
      document.removeEventListener('focus', preventBodyFocus, { capture: true });
      document.body.removeEventListener('focusin', preventBodyFocus, { capture: true });
      document.body.removeEventListener('focus', preventBodyFocus, { capture: true });
    }, 3000);

    return wrapper;
  },
};

