import type { Meta, StoryObj } from '@storybook/html';
import { renderSpinner } from '../../addons/spinner/src/SpinnerProvider';
import type { SpinnerOptions } from '../../addons/spinner/src/types/SpinnerOptions';
import '../../addons/spinner/src/styles/spinner.css';

const meta: Meta<SpinnerOptions> = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Spinner/Loader UBITS para mostrar estados de carga. Soporta múltiples tamaños, variantes de color y puede mostrarse con o sin etiqueta.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del spinner',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg | xl' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Variante de color del spinner',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | success | warning | error | info' },
      },
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Si el spinner está animado',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Texto a mostrar debajo del spinner (opcional)',
    },
    fullScreen: {
      control: { type: 'boolean' },
      description: 'Si el spinner debe ocupar toda la pantalla (centrado)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SpinnerOptions>;

// Story por defecto con todos los controladores
export const Default: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    animated: true,
    label: '',
    fullScreen: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.background = 'var(--ubits-bg-1)';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.minHeight = '300px';
    container.style.boxSizing = 'border-box';
    
    // Contenedor de preview - igual que en la web
    const preview = document.createElement('div');
    preview.style.background = 'var(--ubits-bg-1)';
    preview.style.padding = '48px';
    preview.style.borderRadius = '8px';
    preview.style.border = 'none';
    preview.style.marginBottom = '24px';
    preview.style.minHeight = '200px';
    preview.style.display = 'flex';
    preview.style.alignItems = 'center';
    preview.style.justifyContent = 'center';
    preview.style.boxSizing = 'border-box';
    
    // Renderizar el spinner
    const spinnerHTML = renderSpinner(args);
    preview.innerHTML = spinnerHTML;
    
    container.appendChild(preview);
    return container;
  },
};

