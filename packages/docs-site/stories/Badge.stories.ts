import type { Meta, StoryObj } from '@storybook/html';
import { renderBadge } from '../../addons/badge/src/BadgeProvider';
import type { BadgeOptions } from '../../addons/badge/src/types/BadgeOptions';

const meta: Meta<BadgeOptions> = {
  title: 'Components/Badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Badge UBITS para mostrar notificaciones, contadores o indicadores. Soporta solo bolita (dot) o con números, múltiples variantes de color y tamaños.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['dot', 'number'],
      description: 'Tipo de badge: solo bolita o con número',
      table: {
        defaultValue: { summary: 'number' },
        type: { summary: 'dot | number' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Variante de color del badge',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | success | warning | error | info' },
      },
    },
    style: {
      control: { type: 'select' },
      options: ['light', 'neutral', 'bold'],
      description: 'Estilo del badge: light (sin borde), neutral (con borde gris) o bold (fondo de color)',
      table: {
        defaultValue: { summary: 'light' },
        type: { summary: 'light | neutral | bold' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del badge',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    content: {
      control: { type: 'text' },
      description: 'Contenido del badge (número o texto, solo para tipo number)',
    },
    absolute: {
      control: { type: 'boolean' },
      description: 'Usar posición absoluta',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Posición cuando es absoluto',
      table: {
        defaultValue: { summary: 'top-right' },
      },
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Mostrar u ocultar el label',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Texto del label que aparece a la derecha del badge',
      table: {
        type: { summary: 'string' },
      },
    },
    labelTypography: {
      control: { type: 'select' },
      options: [
        'ubits-body-sm-regular',
        'ubits-body-sm-semibold',
        'ubits-body-sm-bold',
        'ubits-body-md-regular',
        'ubits-body-md-semibold',
        'ubits-body-md-bold',
        'ubits-heading-h1',
        'ubits-heading-h2'
      ],
      description: 'Clase de tipografía UBITS para el label',
      table: {
        defaultValue: { summary: 'ubits-body-md-regular' },
        type: { summary: 'ubits-body-sm-regular | ubits-body-sm-semibold | ubits-body-sm-bold | ubits-body-md-regular | ubits-body-md-semibold | ubits-body-md-bold | ubits-heading-h1 | ubits-heading-h2' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<BadgeOptions>;

// Una sola story con todos los controles
export const Default: Story = {
  args: {
    type: 'number',
    variant: 'primary',
    style: 'light',
    size: 'md',
    content: '5',
    absolute: false,
    position: 'top-right',
    showLabel: false,
    label: 'Notificaciones',
    labelTypography: 'ubits-body-md-regular',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.background = 'var(--ubits-bg-1, #ffffff)';
    container.style.borderRadius = '8px';
    
    const preview = document.createElement('div');
    preview.style.display = 'flex';
    preview.style.justifyContent = 'center';
    preview.style.alignItems = 'center';
    preview.style.padding = '40px';
    preview.style.minHeight = '120px';
    preview.style.background = 'var(--ubits-bg-2, #f9fafb)';
    preview.style.borderRadius = '8px';
    preview.style.marginBottom = '20px';
    preview.style.position = 'relative';
    
    const badgeContainer = document.createElement('div');
    badgeContainer.style.display = 'inline-flex';
    badgeContainer.style.alignItems = 'center';
    badgeContainer.style.gap = '16px';
    badgeContainer.style.fontSize = '16px';
    badgeContainer.style.color = 'var(--ubits-fg-1-high, #303a47)';
    
    // Mostrar badge standalone
    badgeContainer.innerHTML = renderBadge(args);
    
    // Si es absoluto, necesitamos un contenedor relativo
    if (args.absolute) {
      const relativeContainer = document.createElement('div');
      relativeContainer.style.position = 'relative';
      relativeContainer.style.display = 'inline-block';
      relativeContainer.style.padding = '20px';
      relativeContainer.style.background = 'var(--ubits-bg-1)';
      relativeContainer.style.border = '1px solid var(--ubits-border-1)';
      relativeContainer.style.borderRadius = '8px';
      relativeContainer.innerHTML = '<span style="font-size: 14px;">Elemento con badge</span>';
      relativeContainer.innerHTML += renderBadge(args);
      badgeContainer.innerHTML = '';
      badgeContainer.appendChild(relativeContainer);
    }
    
    preview.appendChild(badgeContainer);
    container.appendChild(preview);
    
    return container;
  },
};
