import type { Meta, StoryObj } from '@storybook/html';
import { renderSkeleton } from '../../addons/skeleton/src/SkeletonProvider';
import type { SkeletonOptions } from '../../addons/skeleton/src/types/SkeletonOptions';
import '../../addons/skeleton/src/styles/skeleton.css';

const meta: Meta<SkeletonOptions> = {
  title: 'Components/Skeleton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Skeleton UBITS para mostrar placeholders de carga. Soporta múltiples variantes (text, circle, rectangle, custom), tamaños y animaciones.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'circle', 'rectangle', 'custom'],
      description: 'Variante del skeleton',
      table: {
        defaultValue: { summary: 'text' },
        type: { summary: 'text | circle | rectangle | custom' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del skeleton',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg | xl' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Ancho del skeleton (número en px, porcentaje, o "full")',
      table: {
        defaultValue: { summary: 'full' },
      },
    },
    height: {
      control: { type: 'text' },
      description: 'Alto del skeleton (número en px o porcentaje)',
    },
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Número de líneas de texto (solo para variant="text")',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Si el skeleton debe tener animación de pulso',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SkeletonOptions>;

// Story por defecto con todos los controladores
export const Default: Story = {
  args: {
    variant: 'text',
    size: 'md',
    width: 'full',
    height: '',
    lines: 3,
    animated: true,
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
    
    // Contenedor interno con width 100% - igual que en la web
    const innerContainer = document.createElement('div');
    innerContainer.style.width = '100%';
    innerContainer.style.boxSizing = 'border-box';

    // Renderizar el skeleton
    const skeletonHTML = renderSkeleton(args);
    innerContainer.innerHTML = skeletonHTML;
    
    // Ajustar el skeleton según la variante para que se vea bien
    const skeletonElement = innerContainer.querySelector('.ubits-skeleton');
    if (skeletonElement) {
      if (args.variant === 'text') {
        // Para text, asegurar que ocupe todo el ancho disponible
        skeletonElement.style.width = '100%';
        skeletonElement.style.maxWidth = '100%';
      } else if (args.variant === 'circle') {
        // Para circle, asegurar que siempre sea circular
        // No aplicar width/height desde args, usar solo los del CSS
        skeletonElement.style.width = '';
        skeletonElement.style.height = '';
        skeletonElement.style.margin = '0 auto';
        skeletonElement.style.display = 'inline-block';
      } else if (args.variant === 'rectangle' || args.variant === 'custom') {
        // Para rectangle y custom, usar el width especificado o full
        if (args.width === 'full' || !args.width) {
          skeletonElement.style.width = '100%';
        } else if (args.width) {
          skeletonElement.style.width = typeof args.width === 'number' ? `${args.width}px` : args.width;
        }
        if (args.height) {
          skeletonElement.style.height = typeof args.height === 'number' ? `${args.height}px` : args.height;
        }
      }
    }
    
    preview.appendChild(innerContainer);
    container.appendChild(preview);
    return container;
  },
};

