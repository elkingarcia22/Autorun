import type { Meta, StoryObj } from '@storybook/html';
import { renderButtonAI, createButtonAI } from '../../components/button-ai/src/ButtonAIProvider';
import type { ButtonAIOptions } from '../../components/button-ai/src/types/ButtonAIOptions';
import '../../components/button-ai/src/styles/button-ai.css';

const meta: Meta<ButtonAIOptions> = {
  title: 'Básicos/ButtonAI',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Button AI UBITS con estilo redondeado y gradación. Basado en Button de UBITS pero con bordes más redondeados y gradientes. Solo incluye variantes primary y secondary.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Variante del botón AI',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del botón',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg | xl' },
      },
    },
    text: {
      control: { type: 'text' },
      description: 'Texto del botón',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Button text' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome (sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        example: { summary: 'sparkles, check, plus, etc.' },
      },
    },
    iconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono FontAwesome',
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | solid' },
      },
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Mostrar solo el icono, sin texto',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilitar el botón',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    badge: {
      control: { type: 'boolean' },
      description: 'Mostrar badge de notificación',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    active: {
      control: { type: 'boolean' },
      description: 'Modificador active/outline',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clases CSS adicionales',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonAIOptions>;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    text: 'AI button',
    icon: 'sparkles',
    iconStyle: 'regular',
    iconOnly: false,
    disabled: false,
    badge: false,
    active: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      min-height: 200px;
      background: var(--modifiers-normal-color-light-bg-2, #f9fafb);
      border-radius: 8px;
    `;

    requestAnimationFrame(() => {
      try {
        const button = createButtonAI({
          ...args,
          onClick: (e) => {
            // Button AI clicked
          },
        });

        if (button) {
          container.appendChild(button);
        }
      } catch (error) {
        console.error('Error creating ButtonAI:', error);
        container.innerHTML = `<div style="color: var(--modifiers-normal-color-light-feedback-fg-error-subtle-default); padding: 16px;">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
      }
    });

    return container;
  },
};

