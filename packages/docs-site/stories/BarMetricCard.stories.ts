import type { Meta, StoryObj } from '@storybook/html';
import { renderBarMetricCard, createBarMetricCard } from '../../addons/bar-metric-card/src/BarMetricCardProvider';
import type { BarMetricCardOptions, BarCategory } from '../../addons/bar-metric-card/src/types/BarMetricCardOptions';
import '../../addons/bar-metric-card/src/styles/bar-metric-card.css';
import '../../addons/button/src/styles/button.css';
import '../../addons/progress/src/styles/progress.css';

const meta: Meta<BarMetricCardOptions & {
  category1Label?: string;
  category1Current?: number;
  category1Total?: number;
  category2Label?: string;
  category2Current?: number;
  category2Total?: number;
  category3Label?: string;
  category3Current?: number;
  category3Total?: number;
}> = {
  title: 'Components/Bar Metric Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente BarMetricCard UBITS para mostrar métricas con gráfico de barras y categorías. Soporta layout vertical y horizontal, múltiples tamaños y controles completos para personalización. Usa tokens UBITS para colores, tipografía y espaciado.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del componente',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Métricas' },
        category: 'Contenido',
      },
    },
    responseCount: {
      control: { type: 'number' },
      description: 'Cantidad de respuestas',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Contenido',
      },
    },
    showResponseCount: {
      control: { type: 'boolean' },
      description: 'Mostrar la cantidad de respuestas',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Visibilidad',
      },
    },
    barData: {
      control: { type: 'object' },
      description: 'Array de valores para las barras (pueden ser positivos o negativos)',
      table: {
        type: { summary: 'number[]' },
        category: 'Gráfico',
      },
    },
    barLabels: {
      control: { type: 'object' },
      description: 'Etiquetas para las barras (opcional)',
      table: {
        type: { summary: 'string[]' },
        category: 'Gráfico',
      },
    },
    maxValue: {
      control: { type: 'number' },
      description: 'Valor máximo para el eje Y (opcional, se calcula automáticamente si no se proporciona)',
      table: {
        type: { summary: 'number' },
        category: 'Gráfico',
      },
    },
    minValue: {
      control: { type: 'number' },
      description: 'Valor mínimo para el eje Y (opcional, se calcula automáticamente si no se proporciona)',
      table: {
        type: { summary: 'number' },
        category: 'Gráfico',
      },
    },
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout del componente',
      table: {
        type: { summary: 'vertical | horizontal' },
        defaultValue: { summary: 'vertical' },
        category: 'Apariencia',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del componente',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar el título',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Visibilidad',
      },
    },
    showBarChart: {
      control: { type: 'boolean' },
      description: 'Mostrar el gráfico de barras',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Visibilidad',
      },
    },
    showCategories: {
      control: { type: 'boolean' },
      description: 'Mostrar las categorías',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Visibilidad',
      },
    },
    showInfoIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono de información junto al título',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Visibilidad',
      },
    },
    showActionButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de acción con flecha a la derecha',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Visibilidad',
      },
    },
    showNegativeValues: {
      control: { type: 'boolean' },
      description: 'Mostrar valores negativos (barras hacia abajo)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Visibilidad',
      },
    },
    showGridLines: {
      control: { type: 'boolean' },
      description: 'Mostrar líneas de guía (grid lines)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Visibilidad',
      },
    },
    barColor: {
      control: { type: 'text' },
      description: 'Color de las barras (token UBITS)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--ubits-chart-color-bg-neutral-blue-base)' },
        category: 'Estilo',
      },
    },
    chartBackgroundColor: {
      control: { type: 'text' },
      description: 'Color de fondo del gráfico (token UBITS)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--ubits-bg-1)' },
        category: 'Estilo',
      },
    },
    gridLineColor: {
      control: { type: 'text' },
      description: 'Color de las líneas de la grilla (token UBITS)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--ubits-border-1)' },
        category: 'Estilo',
      },
    },
    category1Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 1',
      table: {
        category: 'Categorías',
      },
    },
    category1Current: {
      control: { type: 'number' },
      description: 'Valor actual de la categoría 1',
      table: {
        category: 'Categorías',
      },
    },
    category1Total: {
      control: { type: 'number' },
      description: 'Valor total de la categoría 1',
      table: {
        category: 'Categorías',
      },
    },
    category2Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 2',
      table: {
        category: 'Categorías',
      },
    },
    category2Current: {
      control: { type: 'number' },
      description: 'Valor actual de la categoría 2',
      table: {
        category: 'Categorías',
      },
    },
    category2Total: {
      control: { type: 'number' },
      description: 'Valor total de la categoría 2',
      table: {
        category: 'Categorías',
      },
    },
    category3Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 3',
      table: {
        category: 'Categorías',
      },
    },
    category3Current: {
      control: { type: 'number' },
      description: 'Valor actual de la categoría 3',
      table: {
        category: 'Categorías',
      },
    },
    category3Total: {
      control: { type: 'number' },
      description: 'Valor total de la categoría 3',
      table: {
        category: 'Categorías',
      },
    },
  },
};

export default meta;
type Story = StoryObj<BarMetricCardOptions & {
  category1Label?: string;
  category1Current?: number;
  category1Total?: number;
  category2Label?: string;
  category2Current?: number;
  category2Total?: number;
  category3Label?: string;
  category3Current?: number;
  category3Total?: number;
}>;

export const Default: Story = {
  args: {
    title: 'Nombre de la pregunta',
    responseCount: 7,
    showResponseCount: true,
    barData: [-25, -15, 15, 25, 35, 45, 55, 5, 25, -15, -30, -50],
    barLabels: ['Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago'],
    maxValue: 60,
    minValue: -60,
    categories: [
      {
        label: 'Área',
        current: 3,
        total: 20
      },
      {
        label: 'Equipo',
        current: 5,
        total: 15
      },
      {
        label: 'Propio',
        current: 2,
        total: 10
      }
    ],
    layout: 'vertical',
    size: 'md',
    showTitle: true,
    showBarChart: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    showNegativeValues: true,
    showGridLines: true,
    barColor: 'var(--ubits-chart-color-bg-neutral-blue-base, #557593)',
    chartBackgroundColor: 'var(--ubits-bg-1)',
    gridLineColor: 'var(--ubits-border-1)',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      padding: 20px;
      background: var(--ubits-bg-2, #f5f5f5);
      border-radius: 8px;
      width: 100%;
      max-width: 100%;
      min-height: auto;
      height: auto;
      overflow: visible !important;
      max-height: none !important;
    `;
    
    const cardContainer = document.createElement('div');
    const containerId = `bar-metric-card-container-${Date.now()}`;
    cardContainer.id = containerId;
    cardContainer.style.cssText = `
      width: 100%;
      overflow: visible !important;
      min-height: auto;
      height: auto;
      max-height: none !important;
    `;
    
    container.appendChild(cardContainer);
    
    // Construir categorías desde los args
    const categories: BarCategory[] = [];
    
    if (args.category1Label && args.category1Current !== undefined && args.category1Total !== undefined) {
      categories.push({
        label: args.category1Label,
        current: args.category1Current,
        total: args.category1Total
      });
    }
    
    if (args.category2Label && args.category2Current !== undefined && args.category2Total !== undefined) {
      categories.push({
        label: args.category2Label,
        current: args.category2Current,
        total: args.category2Total
      });
    }
    
    if (args.category3Label && args.category3Current !== undefined && args.category3Total !== undefined) {
      categories.push({
        label: args.category3Label,
        current: args.category3Current,
        total: args.category3Total
      });
    }
    
    // Si no hay categorías en args, usar las del default
    const finalCategories = categories.length > 0 ? categories : args.categories || [];
    
    const options: BarMetricCardOptions = {
      title: args.title || 'Métricas',
      responseCount: args.responseCount !== undefined ? args.responseCount : 0,
      showResponseCount: args.showResponseCount !== undefined ? args.showResponseCount : false,
      barData: args.barData || [],
      barLabels: args.barLabels,
      maxValue: args.maxValue,
      minValue: args.minValue,
      categories: finalCategories,
      layout: args.layout || 'vertical',
      size: args.size || 'md',
      showTitle: args.showTitle !== undefined ? args.showTitle : true,
      showBarChart: args.showBarChart !== undefined ? args.showBarChart : true,
      showCategories: args.showCategories !== undefined ? args.showCategories : true,
      showInfoIcon: args.showInfoIcon !== undefined ? args.showInfoIcon : true,
      showActionButton: args.showActionButton !== undefined ? args.showActionButton : true,
      showNegativeValues: args.showNegativeValues !== undefined ? args.showNegativeValues : true,
      showGridLines: args.showGridLines !== undefined ? args.showGridLines : true,
      barColor: args.barColor || 'var(--ubits-chart-color-bg-neutral-blue-base, #557593)',
      chartBackgroundColor: args.chartBackgroundColor || 'var(--ubits-bg-1)',
      gridLineColor: args.gridLineColor || 'var(--ubits-border-1)',
      onClick: args.onClick,
      onAction: args.onAction
    };
    
    const cardHTML = renderBarMetricCard(options);
    cardContainer.innerHTML = cardHTML;
    
    return container;
  },
};

// Solo una historia con todos los controles

