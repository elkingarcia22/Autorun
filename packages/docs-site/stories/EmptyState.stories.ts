import type { Meta, StoryObj } from '@storybook/html';
import { renderEmptyState } from '../../addons/empty-state/src/EmptyStateProvider';
import type { EmptyStateOptions } from '../../addons/empty-state/src/types/EmptyStateOptions';

const meta: Meta<EmptyStateOptions> = {
  title: 'Components/Empty State',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Empty State UBITS para mostrar estados vacíos en la interfaz. Soporta imagen o icono, título, descripción y botones de acción.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título del empty state',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Descripción o mensaje del empty state',
      table: {
        type: { summary: 'string' },
      },
    },
    imageUrl: {
      control: { type: 'text' },
      description: 'URL de la imagen/ilustración (opcional)',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome a mostrar (opcional, si no hay imagen)',
      table: {
        type: { summary: 'string' },
      },
    },
    actionLabel: {
      control: { type: 'text' },
      description: 'Texto del botón de acción principal (opcional)',
      table: {
        type: { summary: 'string' },
      },
    },
    showPrimaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón primario',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    primaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón primario (opcional)',
      table: {
        type: { summary: 'string' },
      },
    },
    showPrimaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón primario',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    secondaryActionLabel: {
      control: { type: 'text' },
      description: 'Texto del botón secundario (opcional)',
      table: {
        type: { summary: 'string' },
      },
    },
    showSecondaryButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón secundario',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    secondaryButtonIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el botón secundario (opcional)',
      table: {
        type: { summary: 'string' },
      },
    },
    showSecondaryButtonIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono en el botón secundario',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<EmptyStateOptions>;

// Story por defecto con todos los controladores
export const Default: Story = {
  args: {
    title: 'No hay resultados',
    description: 'Intenta ajustar tus filtros de búsqueda',
    icon: 'inbox',
    actionLabel: 'Buscar',
    showPrimaryButton: false,
    primaryButtonIcon: 'search',
    showPrimaryButtonIcon: false,
    secondaryActionLabel: 'Cancelar',
    showSecondaryButton: false,
    secondaryButtonIcon: 'times',
    showSecondaryButtonIcon: false,
  },
  render: (args) => {
    // Contenedor principal
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    
    // Contenedor de preview - igual que en la web
    const preview = document.createElement('div');
    preview.style.background = 'var(--ubits-bg-1)';
    preview.style.padding = '48px';
    preview.style.borderRadius = '8px';
    preview.style.border = 'none';
    preview.style.minHeight = '400px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    preview.style.width = '100%';
    
    // Renderizar el empty state directamente en el preview
    preview.innerHTML = renderEmptyState(args);
    
    // Asegurar que el componente empty-state tenga los estilos correctos
    const emptyStateElement = preview.querySelector('.ubits-empty-state') as HTMLElement;
    if (emptyStateElement) {
      emptyStateElement.style.width = '100%';
      emptyStateElement.style.maxWidth = '100%';
      emptyStateElement.style.display = 'flex';
      emptyStateElement.style.flexDirection = 'column';
      emptyStateElement.style.alignItems = 'center';
      emptyStateElement.style.justifyContent = 'center';
      emptyStateElement.style.textAlign = 'center';
    }
    
    // Asegurar que el contenido también esté centrado
    const contentElement = preview.querySelector('.ubits-empty-state__content') as HTMLElement;
    if (contentElement) {
      contentElement.style.display = 'flex';
      contentElement.style.flexDirection = 'column';
      contentElement.style.alignItems = 'center';
      contentElement.style.textAlign = 'center';
      contentElement.style.width = '100%';
    }
    
    // Asegurar que las acciones estén centradas
    const actionsElement = preview.querySelector('.ubits-empty-state__actions') as HTMLElement;
    if (actionsElement) {
      actionsElement.style.display = 'flex';
      actionsElement.style.justifyContent = 'center';
      actionsElement.style.alignItems = 'center';
    }
    
    container.appendChild(preview);
    
    return container;
  },
};

