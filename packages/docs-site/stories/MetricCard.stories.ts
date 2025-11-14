import type { Meta, StoryObj } from '@storybook/html';
import { renderMetricCard, createMetricCard } from '../../addons/metric-card/src/MetricCardProvider';
import type { MetricCardOptions } from '../../addons/metric-card/src/types/MetricCardOptions';
import '../../addons/metric-card/src/styles/metric-card.css';

const meta: Meta<MetricCardOptions> = {
  title: 'Components/Text Metric Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente MetricCard UBITS para mostrar métricas numéricas. Usa tokens UBITS para colores, tipografía y espaciado. Soporta iconos, tamaños y es completamente personalizable.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título de la métrica',
      table: {
        defaultValue: { summary: 'Net confidence score' },
        type: { summary: 'string' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Valor principal (puede ser número o string, ej: "200 / 204")',
      table: {
        defaultValue: { summary: '200 / 204' },
        type: { summary: 'string | number' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Texto descriptivo debajo del valor',
      table: {
        defaultValue: { summary: 'Colaboradores' },
        type: { summary: 'string' },
      },
    },
    titleIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el título (sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        example: { summary: 'user, users, chart-line, etc.' },
      },
    },
    titleIconStyle: {
      control: { type: 'select' },
      options: ['regular', 'solid'],
      description: 'Estilo del icono del título',
      table: {
        defaultValue: { summary: 'regular' },
        type: { summary: 'regular | solid' },
      },
    },
    titleIconColor: {
      control: { type: 'color' },
      description: 'Color del icono del título (puede usar tokens UBITS como var(--ubits-fg-2-medium))',
      table: {
        type: { summary: 'string' },
      },
    },
    showInfoIcon: {
      control: { type: 'boolean' },
      description: 'Mostrar icono de información junto al título',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showActionButton: {
      control: { type: 'boolean' },
      description: 'Mostrar botón de acción con flecha a la derecha en la esquina superior derecha',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de la tarjeta',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<MetricCardOptions>;

export const Default: Story = {
  args: {
    title: 'Net confidence score',
    value: '200 / 204',
    label: 'Colaboradores',
    titleIcon: 'user',
    titleIconStyle: 'regular',
    showInfoIcon: true,
    showActionButton: true,
    size: 'md',
  },
  render: (args) => {
    // Crear contenedor
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start';
    container.style.padding = '48px';
    container.style.background = 'var(--ubits-bg-2)';
    container.style.border = '1px solid var(--ubits-border-1)';
    container.style.borderRadius = '8px';
    container.style.minHeight = '200px';
    
    // Crear wrapper para la card (max-width 400px)
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '400px';
    wrapper.style.width = '100%';
    
    // Renderizar card
    const cardHTML = renderMetricCard(args);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    
    return container;
  },
};

