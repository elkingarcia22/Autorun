import type { Meta, StoryObj } from '@storybook/html';
import { renderStatusTag } from '../../addons/status-tag/src/StatusTagProvider';
import type { StatusTagOptions } from '../../addons/status-tag/src/types/StatusTagOptions';
import '../../addons/status-tag/src/styles/status-tag.css';

const meta: Meta<StatusTagOptions> = {
  title: 'Básicos/Status Tag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Status Tag UBITS para mostrar estados con icono izquierdo opcional, texto y icono derecho opcional. Múltiples estados con colores diferenciados usando tokens UBITS. Border-radius de 4px, padding 4px vertical y 8px horizontal.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del estado',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Completado' },
        category: 'Contenido',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md'],
      description: 'Tamaño del tag (XS: body-xs 11px, SM: body-sm 13px, MD: body-md 16px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md' },
        category: 'Apariencia',
      },
    },
    status: {
      control: { type: 'select' },
      options: [
        'completed', 'published', 'fulfilled', 'created', 'active',
        'not-fulfilled', 'denied',
        'draft', 'in-progress', 'syncing',
        'pending', 'pending-approval',
        'not-started', 'finished', 'archived', 'disabled', 'paused', 'hidden'
      ],
      description: 'Estado/variante del tag (determina el color según Figma)',
      table: {
        defaultValue: { summary: 'completed' },
        type: { summary: 'completed | published | fulfilled | created | active | not-fulfilled | denied | draft | in-progress | syncing | pending | pending-approval | not-started | finished | archived | disabled | paused | hidden' },
        category: 'Estado',
      },
    },
    leftIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome izquierdo (ej: "grid-2"). Dejar vacío para ocultar el icono izquierdo.',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'grid-2' },
        category: 'Iconos',
      },
    },
    rightIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome derecho (ej: "chevron-down"). Dejar vacío para ocultar el icono derecho.',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'chevron-down' },
        category: 'Iconos',
      },
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Si el tag es clickeable (añade estilos hover/active y cursor pointer)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Comportamiento',
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Función a ejecutar cuando se hace clic (solo si clickable es true)',
      table: {
        disable: true,
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Avanzado',
      },
    },
  },
};

export default meta;
type Story = StoryObj<StatusTagOptions>;

export const Default: Story = {
  args: {
    label: 'Completado',
    size: 'md',
    status: 'completed',
    leftIcon: 'grid-2',
    rightIcon: 'chevron-down',
    clickable: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--modifiers-normal-color-light-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '48px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--modifiers-normal-color-light-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    
    const statusTagContainer = document.createElement('div');
    // Manejar leftIcon y rightIcon: si están vacíos o son null, usar undefined
    const leftIconValue = args.leftIcon && args.leftIcon.trim() !== '' ? args.leftIcon : undefined;
    const rightIconValue = args.rightIcon && args.rightIcon.trim() !== '' ? args.rightIcon : undefined;
    
    statusTagContainer.innerHTML = renderStatusTag({
      ...args,
      leftIcon: leftIconValue,
      rightIcon: rightIconValue,
    });
    
    // Agregar event listener si es clickeable
    if (args.clickable) {
      const tag = statusTagContainer.querySelector('.ubits-status-tag') as HTMLElement;
      if (tag) {
        tag.setAttribute('role', 'button');
        tag.setAttribute('tabindex', '0');
        tag.addEventListener('click', (e) => {
          e.preventDefault();
          if (args.onClick) {
            args.onClick(e as any);
          } else {
            // Status Tag clicked
          }
        });
        tag.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (args.onClick) {
              args.onClick(e as any);
            } else {
              // Status Tag clicked
            }
          }
        });
      }
    }
    
    preview.appendChild(statusTagContainer);
    container.appendChild(preview);
    
    return container;
  },
};

