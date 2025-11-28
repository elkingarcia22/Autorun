import type { Meta, StoryObj } from '@storybook/html';
import { createSubNav } from '../../addons/subnav/src/SubNavProvider';
import { getSubNavConfig } from '../../addons/subnav/src/configs/subNavVariants';
import type { SubNavOptions, SubNavVariant } from '../../addons/subnav/src/types/SubNavOptions';
// Importar estilos del componente
import '../../addons/subnav/src/styles/subnav.css';

/**
 * SubNav Component Stories
 * 
 * Componente de navegación superior horizontal con 8 variantes.
 * Muestra sub-navegaciones de los módulos principales con tabs
 * y navegación por URL o callbacks.
 */
const meta = {
  title: 'Navegación/SubNav',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente SubNav UBITS de navegación superior horizontal con 8 variantes predefinidas. Muestra sub-navegaciones de los módulos principales con tabs personalizables, navegación por URL o callbacks, y soporte completo para dark mode. Se oculta en móvil y se reemplaza por tab-bar.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'template',
        'aprendizaje',
        'desempeno',
        'encuestas',
        'tareas',
        'empresa',
        'admin-aprendizaje',
        'admin-desempeno'
      ],
      description: 'Variante del SubNav',
      table: {
        type: { summary: 'SubNavVariant' },
        defaultValue: { summary: 'template' }
      }
    },
    activeTabId: {
      control: { type: 'text' },
      description: 'ID del tab activo (se actualiza automáticamente al cambiar la variante)',
      table: {
        type: { summary: 'string' }
      }
    },
    showIcons: {
      control: { type: 'boolean' },
      description: 'Mostrar iconos en los tabs del SubNav',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    containerId: {
      control: false,
      description: 'ID del contenedor (asignado automáticamente)'
    }
  }
} satisfies Meta<SubNavOptions & { variant?: SubNavVariant; activeTabId?: string; showIcons?: boolean }>;

export default meta;
type Story = StoryObj<SubNavOptions & { variant?: SubNavVariant; activeTabId?: string; showIcons?: boolean }>;

// Helper para obtener tabs disponibles según la variante
function getTabsForVariant(variant: SubNavVariant): string[] {
  const config = getSubNavConfig(variant);
  return config.tabs.map(tab => tab.id);
}

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
  args: {
    containerId: 'subnav-story-container',
    variant: 'template',
    activeTabId: 'section1',
    showIcons: false
  } as SubNavOptions & { variant?: SubNavVariant; activeTabId?: string; showIcons?: boolean },
  render: (args) => {
    // Limpiar contenedor previo si existe
    const existingContainer = document.getElementById(args.containerId || 'subnav-story-container');
    if (existingContainer) {
      existingContainer.innerHTML = '';
    }

    const variant = args.variant || 'template';
    const config = getSubNavConfig(variant);
    // Determinar tab activo: usar el especificado, o el primero disponible si no está en la lista
    let activeTabId = args.activeTabId;
    if (!activeTabId || !config.tabs.find(tab => tab.id === activeTabId)) {
      activeTabId = config.tabs.length > 0 ? config.tabs[0].id : '';
    }

    // Wrapper principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

    // Contenedor para el SubNav
    const container = document.createElement('div');
    container.id = args.containerId || 'subnav-story-container';
    container.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `;

    const activeTab = config.tabs.find(tab => tab.id === activeTabId);

    infoPanel.innerHTML = `
      <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del SubNav</h3>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Variante:</strong> ${config.name}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tab Activo:</strong> ${activeTab ? activeTab.label : activeTabId}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tabs disponibles:</strong> ${config.tabs.length}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Iconos:</strong> ${args.showIcons ? 'Mostrados' : 'Ocultos'}</div>
        <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${config.tabs.map(t => t.id).join(', ')}</div>
      </div>
    `;

    wrapper.appendChild(infoPanel);

    // Crear el SubNav usando requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      try {
        createSubNav({
          containerId: container.id,
          variant: variant,
          activeTabId: activeTabId,
          showIcons: args.showIcons ?? false,
          onTabChange: (tabId, tabElement) => {
            // Tab cambiado
            // Actualizar info
            const config = getSubNavConfig(variant);
            const tab = config.tabs.find(t => t.id === tabId);
            // Actualizar panel de información
            const infoContent = infoPanel.querySelector('div[style*="grid"]');
            if (infoContent && tab) {
              const activeTabDiv = infoContent.querySelector('div:nth-child(2)');
              if (activeTabDiv) {
                activeTabDiv.innerHTML = `<strong>Tab Activo:</strong> ${tab.label}`;
              }
            }
          }
        });
      } catch (error) {
        console.error('Error creando SubNav:', error);
        container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
      }
    });

    return wrapper;
  }
};

