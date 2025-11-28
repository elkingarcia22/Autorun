import type { Meta, StoryObj } from '@storybook/html';
import { renderSelectionCard, createSelectionCard, loadSelectionCards } from '../../addons/selection-card/src/SelectionCardProvider';
import type { SelectionCardData, SelectionCardOptions } from '../../addons/selection-card/src/types/SelectionCardOptions';
import '../../addons/selection-card/src/styles/selection-card.css';
import '../../addons/radio-button/src/styles/radio-button.css';

const meta: Meta<SelectionCardData & { showDescription?: boolean; showIcon?: boolean }> = {
  title: 'Layout/Selection Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Selection Card UBITS para mostrar opciones seleccionables. Soporta selección única o múltiple, estados (default, selected, disabled), y tamaños (sm, md, lg). Incluye un radio button visual a la derecha que refleja el estado de selección. La selección se realiza mediante click en toda la card.'
}
}
},
  argTypes: {
    id: {
      control: { type: 'text' },
      description: 'ID único de la card',
      table: {
        defaultValue: { summary: 'card-1' }
}
},
    title: {
      control: { type: 'text' },
      description: 'Título de la card',
      table: {
        defaultValue: { summary: 'Asignar toda la empresa' }
}
},
    description: {
      control: { type: 'text' },
      description: 'Descripción opcional de la card (body-sm-regular)',
      table: {
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'Agregaras a todos los colaboradores...' }
}
},
    showDescription: {
      control: { type: 'boolean' },
      description: 'Mostrar u ocultar la descripción',
      table: {
        defaultValue: { summary: 'true' }
}
},
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome (sin prefijo fa-)',
      table: {
        type: { summary: 'string | undefined' },
        example: { summary: 'building, user, users, etc.' },
        defaultValue: { summary: 'building' }
}
},
    showIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar u ocultar el icono',
      table: {
        defaultValue: { summary: 'true' }
}
},
    iconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono FontAwesome',
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | solid' }
}
},
    'selectionCount.current': {
      control: { type: 'number', min: 0, max: 1000, step: 1 },
      description: 'Número actual de seleccionados',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
}
},
    'selectionCount.total': {
      control: { type: 'number', min: 0, max: 1000, step: 1 },
      description: 'Número total disponible',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '290' }
}
},
    state: {
      control: { type: 'select' },
      options: ['default', 'selected', 'disabled'],
      description: 'Estado de la card',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | selected | disabled' }
}
},
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de la card',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' }
}
},
    value: {
      control: { type: 'text' },
      description: 'Valor asociado a la card',
      table: {
        type: { summary: 'string | number' }
}
}
}
};

export default meta;
type Story = StoryObj<SelectionCardData & { showDescription?: boolean; showIcon?: boolean }>;

// Story única con todos los controladores
export const Default: Story = {
  args: {
    id: 'card-1',
    title: 'Asignar toda la empresa',
    description: 'Agregaras a todos los colaboradores de la empresa que tengas en la plataforma.',
    showDescription: true,
    icon: 'building',
    showIcon: true,
    iconStyle: 'regular',
    selectionCount: { current: 0, total: 290 },
    state: 'default',
    size: 'md'
},
  render: (args) => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
    container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
    container.style.minHeight = '200px';
    
    // Crear wrapper para la card (max-width 500px)
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '500px';
    wrapper.style.width = '100%';
    
    // Preparar datos de la card con los controladores
    const cardData: SelectionCardData = {
      id: args.id,
      title: args.title,
      description: args.showDescription ? args.description : undefined,
      icon: args.showIcon ? args.icon : undefined,
      iconStyle: args.iconStyle,
      selectionCount: args.selectionCount,
      state: args.state,
      size: args.size,
      value: args.value
};
    
    // Crear card
    try {
      const cardElement = createSelectionCard(cardData);
      wrapper.appendChild(cardElement);
      container.appendChild(wrapper);
    } catch (error) {
      console.error('❌ [SelectionCard Story] Error al crear card:', error);
      const errorDiv = document.createElement('div');
      errorDiv.textContent = `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`;
      errorDiv.style.color = 'red';
      errorDiv.style.padding = '20px';
      container.appendChild(errorDiv);
    }
    
    return container;
  }
};

