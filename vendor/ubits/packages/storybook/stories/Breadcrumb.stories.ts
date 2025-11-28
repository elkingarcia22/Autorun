import type { Meta, StoryObj } from '@storybook/html';
import { renderBreadcrumb, createBreadcrumb } from '../../addons/breadcrumb/src/BreadcrumbProvider';
import type { BreadcrumbOptions, BreadcrumbItem } from '../../addons/breadcrumb/src/types/BreadcrumbOptions';
import '../../addons/breadcrumb/src/styles/breadcrumb.css';

/**
 * Breadcrumb Component Stories
 * 
 * Componente de breadcrumb para navegación jerárquica.
 * El último item está en estado activo (bold) y los demás en estado default (regular).
 */
const meta = {
  title: 'Navegación/Breadcrumb',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Breadcrumb UBITS para navegación jerárquica. El último item muestra texto en bold (active), los demás en regular (default). Usa body-sm con tokens UBITS.',
      },
    },
  },
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array de items del breadcrumb',
      table: {
        type: { summary: 'BreadcrumbItem[]' },
      },
    },
    separator: {
      control: { type: 'text' },
      description: 'Separador entre items (por defecto: ">")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '">"' },
      },
    },
    itemCount: {
      control: { type: 'number', min: 2, max: 8, step: 1 },
      description: 'Número de items a mostrar',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
  },
} satisfies Meta<BreadcrumbOptions & { itemCount?: number }>;

export default meta;
type Story = StoryObj<BreadcrumbOptions & { itemCount?: number }>;

/**
 * Helper para generar items de breadcrumb de ejemplo
 */
function generateBreadcrumbItems(count: number = 5): BreadcrumbItem[] {
  const labels = ['Home', 'Categoría', 'Subcategoría', 'Página', 'Detalle', 'Elemento', 'Vista', 'Final'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    label: labels[i] || `Item ${i + 1}`,
    url: i < count - 1 ? `#${labels[i]?.toLowerCase() || `item-${i + 1}`}` : undefined,
    active: i === count - 1,
  }));
}

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
  args: {
    items: generateBreadcrumbItems(5),
    separator: '>',
    itemCount: 5,
  },
  render: (args) => {
    // Generar items según los controles
    const items = generateBreadcrumbItems(args.itemCount || 5);
    
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

    // Contenedor para el Breadcrumb
    const container = document.createElement('div');
    container.id = 'breadcrumb-story-container';
    container.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

    wrapper.appendChild(container);

    // Panel de información
    const infoPanel = document.createElement('div');
    infoPanel.id = 'breadcrumb-info-panel';
    infoPanel.style.cssText = `
      margin-top: 20px;
      padding: 16px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      font-family: var(--font-family-noto-sans-font-family, 'Noto Sans', sans-serif);
      font-size: 14px;
      color: var(--modifiers-normal-color-light-fg-1-medium);
    `;

    const activeItem = items[items.length - 1];

    const updateInfoPanel = () => {
      infoPanel.innerHTML = `
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: var(--weight-semibold, 600); color: var(--modifiers-normal-color-light-fg-1-high);">Información del Breadcrumb</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; color: var(--modifiers-normal-color-light-fg-1-medium);">
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Item Activo:</strong> ${activeItem ? activeItem.label : 'N/A'}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Items totales:</strong> ${items.length}</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">Separador:</strong> "${args.separator || '>'}"</div>
          <div><strong style="color: var(--modifiers-normal-color-light-fg-1-high);">IDs:</strong> ${items.map(i => i.id).join(', ')}</div>
        </div>
      `;
    };

    updateInfoPanel();
    wrapper.appendChild(infoPanel);

    // Crear el Breadcrumb usando createBreadcrumb para que los listeners funcionen
    requestAnimationFrame(() => {
      try {
        // Limpiar contenedor previo
        container.innerHTML = '';
        
        // Crear breadcrumb con listeners
        createBreadcrumb({
          items: items,
          separator: args.separator || '>',
          onItemClick: (itemId, itemElement) => {
            // Item clickeado
            // Actualizar panel de información si es necesario
            updateInfoPanel();
          }
        }, container.id);
      } catch (error) {
        console.error('Error creando Breadcrumb:', error);
        container.innerHTML = `<p style="color: #ef4444); padding: 16px;">Error: ${error}</p>`;
      }
    });

    return wrapper;
  }
};

