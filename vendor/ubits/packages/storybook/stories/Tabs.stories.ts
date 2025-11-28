import type { Meta, StoryObj } from '@storybook/html';
import { renderTabs, createTabs } from '../../addons/tabs/src/TabsProvider';
import type { TabsOptions, TabItem } from '../../addons/tabs/src/types/TabsOptions';
import '../../addons/tabs/src/styles/tabs.css';

/**
 * Tabs Component Stories
 * 
 * Componente de tabs horizontal con soporte para iconos opcionales.
 * El tab activo muestra fondo blanco, icono oscuro, texto en negrita
 * y una línea vertical rosa a la izquierda.
 */
const meta = {
  title: 'Navegación/Tabs',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Tabs UBITS de navegación horizontal con soporte para iconos opcionales. El tab activo muestra fondo blanco, icono oscuro, texto en negrita y una línea vertical rosa a la izquierda. Los tabs inactivos muestran icono y texto en gris claro sin fondo.',
      },
    },
  },
  argTypes: {
    tabs: {
      control: { type: 'object' },
      description: 'Array de tabs a mostrar',
      table: {
        type: { summary: 'TabItem[]' },
      },
    },
    activeTabId: {
      control: { type: 'text' },
      description: 'ID del tab activo',
      table: {
        type: { summary: 'string' },
      },
    },
    showIcons: {
      control: { type: 'boolean' },
      description: 'Mostrar iconos en los tabs',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    tabCount: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Número de tabs a mostrar',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
  },
} satisfies Meta<TabsOptions & { showIcons?: boolean; tabCount?: number }>;

export default meta;
type Story = StoryObj<TabsOptions & { showIcons?: boolean; tabCount?: number }>;

/**
 * Helper para generar tabs de ejemplo
 */
function generateTabs(count: number = 5, withIcons: boolean = true): TabItem[] {
  const icons = ['fa-th', 'fa-chart-line', 'fa-cog', 'fa-star', 'fa-book', 'fa-home', 'fa-user', 'fa-bell', 'fa-envelope', 'fa-calendar'];
  const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9', 'Label 10'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `tab-${i + 1}`,
    label: labels[i] || `Label ${i + 1}`,
    icon: withIcons ? `far ${icons[i] || 'fa-th'}` : undefined,
    active: i === 0,
  }));
}

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
  args: {
    tabs: generateTabs(5, true),
    activeTabId: 'tab-1',
    showIcons: true,
    tabCount: 5,
  },
  render: (args) => {
    // Generar tabs según los controles - SIEMPRE regenerar basándose en showIcons
    const shouldShowIcons = args.showIcons !== false;
    const tabs = generateTabs(args.tabCount || 5, shouldShowIcons);
    
    // Asegurar que el tab activo esté correctamente marcado
    const activeId = args.activeTabId || tabs[0]?.id;
    tabs.forEach(tab => {
      tab.active = tab.id === activeId;
    });

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

    // Contenedor para el Tabs
    const container = document.createElement('div');
    container.id = 'tabs-story-container';
    container.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.id = 'tabs-info-panel';
    infoPanel.style.cssText = `
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `;

    const activeTab = tabs.find(tab => tab.id === activeId);

    const updateInfoPanel = (currentActiveId: string) => {
      const currentTab = tabs.find(tab => tab.id === currentActiveId);
      infoPanel.innerHTML = `
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Tabs</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tab Activo:</strong> ${currentTab ? currentTab.label : currentActiveId}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Tabs totales:</strong> ${tabs.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Con iconos:</strong> ${shouldShowIcons ? 'Sí' : 'No'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${tabs.map(t => t.id).join(', ')}</div>
        </div>
      `;
    };

    updateInfoPanel(activeId);
    wrapper.appendChild(infoPanel);

    // Crear el Tabs usando createTabs para que los listeners funcionen
    requestAnimationFrame(() => {
      try {
        // Limpiar contenedor previo
        container.innerHTML = '';
        
        // Crear tabs con listeners
        createTabs({
          tabs: tabs,
          activeTabId: activeId,
          onTabChange: (tabId, tabElement) => {
            // Tab cambiado
            // Actualizar panel de información
            updateInfoPanel(tabId);
          }
        }, container.id);
      } catch (error) {
        console.error('Error creando Tabs:', error);
        container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: var(--p-spacing-mode-1-lg, 16px);">Error: ${error}</p>`;
      }
    });

    return wrapper;
  }
};

