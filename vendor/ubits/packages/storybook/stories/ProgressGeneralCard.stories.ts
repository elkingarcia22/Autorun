import type { Meta, StoryObj } from '@storybook/html';
import { renderProgressGeneralCard, createProgressGeneralCard } from '../../addons/progress-general-card/src/ProgressGeneralCardProvider';
import type { ProgressGeneralCardOptions, ProgressCategory } from '../../addons/progress-general-card/src/types/ProgressGeneralCardOptions';
import '../../addons/progress-general-card/src/styles/progress-general-card.css';
import '../../addons/button/src/styles/button.css';

const meta: Meta<ProgressGeneralCardOptions & {
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
  title: 'Charts/Circle Metric Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente ProgressGeneralCard UBITS para mostrar progreso general con indicador circular (donut chart) y categorías de progreso. Soporta layout vertical y horizontal, múltiples tamaños y controles completos para personalización. Usa tokens UBITS para colores, tipografía y espaciado.'
      }
    }
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del componente',
      table: {
        defaultValue: { summary: 'Progreso general' },
        type: { summary: 'string' }
      }
    },
    mainPercentage: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Porcentaje principal mostrado en el círculo',
      table: {
        defaultValue: { summary: '50' },
        type: { summary: 'number' }
}
},
    mainLabel: {
      control: { type: 'text' },
      description: 'Etiqueta del porcentaje principal (ej: "Ciclos")',
      table: {
        defaultValue: { summary: 'Ciclos' },
        type: { summary: 'string' }
      }
    },
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout del componente',
      table: {
        defaultValue: { summary: 'vertical' },
        type: { summary: 'vertical | horizontal' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del componente',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' }
      }
    },
    showTitle: {
      control: { type: 'boolean' },
      description: 'Mostrar el título',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    showCircularProgress: {
      control: { type: 'boolean' },
      description: 'Mostrar el indicador circular',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    showCategories: {
      control: { type: 'boolean' },
      description: 'Mostrar las categorías',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    showInfoIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono de información junto al título',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    showActionButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de acción con flecha a la derecha en la esquina superior derecha',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    progressColor: {
      control: { type: 'text' },
      description: 'Color del progreso circular (token UBITS o color hexadecimal)',
      table: {
        defaultValue: { summary: 'var(--ubits-chart-color-bg-neutral-blue-base)' },
        type: { summary: 'string' }
      }
    },
    circleBackgroundColor: {
      control: { type: 'text' },
      description: 'Color de fondo del círculo (token UBITS o color hexadecimal)',
      table: {
        defaultValue: { summary: 'var(--modifiers-normal-color-light-bg-3)' },
        type: { summary: 'string' }
      }
    },
    // Controles para categoría 1
    category1Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 1',
      table: {
        defaultValue: { summary: 'Área' },
        type: { summary: 'string' }
      }
    },
    category1Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 1',
      table: {
        defaultValue: { summary: '3' },
        type: { summary: 'number' }
      }
    },
    category1Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 1',
      table: {
        defaultValue: { summary: '20' },
        type: { summary: 'number' }
      }
    },
    // Controles para categoría 2
    category2Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 2',
      table: {
        defaultValue: { summary: 'Equipo' },
        type: { summary: 'string' }
      }
    },
    category2Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 2',
      table: {
        defaultValue: { summary: '8' },
        type: { summary: 'number' }
      }
    },
    category2Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 2',
      table: {
        defaultValue: { summary: '50' },
        type: { summary: 'number' }
}
},
    // Controles para categoría 3
    category3Label: {
      control: { type: 'text' },
      description: 'Etiqueta de la categoría 3',
      table: {
        defaultValue: { summary: 'Propio' },
        type: { summary: 'string' }
      }
    },
    category3Current: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Valor actual de la categoría 3',
      table: {
        defaultValue: { summary: '5' },
        type: { summary: 'number' }
      }
    },
    category3Total: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Valor total de la categoría 3',
      table: {
        defaultValue: { summary: '30' },
        type: { summary: 'number' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<ProgressGeneralCardOptions & {
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

// Helper para construir las categorías desde los args
function buildCategories(args: Story['args']): ProgressCategory[] {
  if (!args) return [];
  
  const categories: ProgressCategory[] = [];
  
  if (args.category1Label !== undefined) {
    categories.push({
      label: args.category1Label || 'Área',
      current: args.category1Current ?? 3,
      total: args.category1Total ?? 20
    });
  }
  
  if (args.category2Label !== undefined) {
    categories.push({
      label: args.category2Label || 'Equipo',
      current: args.category2Current ?? 8,
      total: args.category2Total ?? 50
    });
  }
  
  if (args.category3Label !== undefined) {
    categories.push({
      label: args.category3Label || 'Propio',
      current: args.category3Current ?? 5,
      total: args.category3Total ?? 30
    });
  }
  
  return categories;
}

export const Default: Story = {
  args: {
    title: 'Progreso general',
    mainPercentage: 50,
    mainLabel: 'Ciclos',
    layout: 'horizontal',
    size: 'md',
    showTitle: true,
    showCircularProgress: true,
    showCategories: true,
    showInfoIcon: true,
    showActionButton: true,
    progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)',
    circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
    category1Label: 'Área',
    category1Current: 3,
    category1Total: 20,
    category2Label: 'Equipo',
    category2Current: 8,
    category2Total: 50,
    category3Label: 'Propio',
    category3Current: 5,
    category3Total: 30
},
  render: (args) => {
    // Construir las categorías desde los args
    const categories = buildCategories(args);
    
    // Construir las opciones del componente
    const options: ProgressGeneralCardOptions = {
      title: args.title,
      mainPercentage: args.mainPercentage ?? 50,
      mainLabel: args.mainLabel,
      categories,
      layout: args.layout,
      size: args.size,
      showTitle: args.showTitle,
      showCircularProgress: args.showCircularProgress,
      showCategories: args.showCategories,
      showInfoIcon: args.showInfoIcon,
      showActionButton: args.showActionButton,
      progressColor: args.progressColor,
      circleBackgroundColor: args.circleBackgroundColor
    };
    
    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.padding = '48px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
    container.style.borderRadius = '8px';
    container.style.minHeight = '400px';
    
    // Crear wrapper para la card
    const wrapper = document.createElement('div');
    // Ajustar ancho según el layout
    if (options.layout === 'horizontal') {
      wrapper.style.maxWidth = '800px';
      wrapper.style.width = '100%';
    } else {
      wrapper.style.maxWidth = '500px';
      wrapper.style.width = '100%';
    }
    
    // Renderizar card
    const cardHTML = renderProgressGeneralCard(options);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    
    
    return container;
  }
};

