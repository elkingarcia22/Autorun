import type { Meta, StoryObj } from '@storybook/html';
import { renderChip } from '../../addons/chip/src/ChipProvider';
import type { ChipOptions } from '../../addons/chip/src/types/ChipOptions';
import '../../addons/chip/src/styles/chip.css';

const meta: Meta<ChipOptions> = {
  title: 'Components/Chip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Chip UBITS para mostrar etiquetas o tags interactivas. Múltiples tamaños, estados y soporte para iconos izquierdo y derecho (botón de cerrar). Usa tokens UBITS exclusivamente.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del chip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Chip' },
        category: 'Contenido',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del chip (xs: 20px, sm: 24px, md: 28px, lg: 36px)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
        category: 'Apariencia',
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'pressed', 'focus', 'disabled'],
      description: 'Estado del chip',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | hover | active | pressed | focus | disabled' },
        category: 'Estado',
      },
    },
    leftIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome izquierdo (ej: "tag", "user"). Dejar vacío para ocultar.',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'null' },
        category: 'Iconos',
      },
    },
    rightIcon: {
      control: { type: 'text' },
      description: 'Icono FontAwesome derecho para el botón de cerrar (ej: "xmark"). Se usa si closable es true.',
      table: {
        type: { summary: 'string | null' },
        defaultValue: { summary: 'xmark' },
        category: 'Iconos',
      },
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Si el chip tiene botón de cerrar',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Comportamiento',
      },
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Si el chip es clickeable (añade estilos hover/active y cursor pointer)',
      table: {
        defaultValue: { summary: 'false' },
        category: 'Comportamiento',
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Función a ejecutar cuando se hace clic en el chip (solo si clickable es true)',
      table: {
        disable: true,
      },
    },
    onClose: {
      action: 'closed',
      description: 'Función a ejecutar cuando se hace clic en el botón de cerrar',
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
type Story = StoryObj<ChipOptions>;

export const Default: Story = {
  args: {
    label: 'Chip',
    size: 'md',
    state: 'default',
    leftIcon: undefined,
    rightIcon: undefined,
    closable: false,
    clickable: false,
    className: '',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.minHeight = '100px';

    const chipHTML = renderChip({
      label: args.label || 'Chip',
      size: args.size || 'md',
      state: args.state || 'default',
      leftIcon: args.leftIcon,
      rightIcon: args.rightIcon,
      closable: args.closable !== undefined ? args.closable : false,
      clickable: args.clickable !== undefined ? args.clickable : false,
      className: args.className || '',
    });

    container.innerHTML = chipHTML;

    // Agregar event listeners si son necesarios
    const chipElement = container.querySelector('.ubits-chip') as HTMLElement;
    if (chipElement && args.clickable && args.onClick) {
      chipElement.addEventListener('click', (e) => {
        if (args.onClick) {
          args.onClick(e as any);
        }
      });
    }

    const closeButton = container.querySelector('.ubits-chip__right-icon') as HTMLButtonElement;
    if (closeButton && args.onClose) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (args.onClose) {
          args.onClose(e as any);
        }
      });
    }

    return container;
  },
};
