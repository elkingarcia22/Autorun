import type { Meta, StoryObj } from '@storybook/html';
import { renderScoreCardMetrics, createScoreCardMetrics } from '../../addons/score-card-metrics/src/ScoreCardMetricsProvider';
import type { ScoreCardMetricsOptions } from '../../addons/score-card-metrics/src/types/ScoreCardMetricsOptions';
import '../../addons/score-card-metrics/src/styles/score-card-metrics.css';
import '../../addons/button/src/styles/button.css';

const meta: Meta<ScoreCardMetricsOptions> = {
  title: 'Components/Score Card Metrics',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente ScoreCardMetrics UBITS para mostrar métricas de calificación con estrellas. Incluye título, estadísticas (respuestas y promedio), gráfico de 5 estrellas, etiquetas y descripción. Usa tokens UBITS para colores, tipografía y espaciado.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título de la métrica',
      table: {
        defaultValue: { summary: 'Califica el producto' },
        type: { summary: 'string' },
      },
    },
    totalResponses: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Número total de respuestas',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    responsesLabel: {
      control: { type: 'text' },
      description: 'Etiqueta para las respuestas',
      table: {
        defaultValue: { summary: 'respuestas' },
        type: { summary: 'string' },
      },
    },
    average: {
      control: { type: 'number', min: 0, max: 5, step: 0.01 },
      description: 'Promedio de calificación (0-5)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    averageLabel: {
      control: { type: 'text' },
      description: 'Etiqueta para el promedio',
      table: {
        defaultValue: { summary: 'Promedio:' },
        type: { summary: 'string' },
      },
    },
    score: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Score actual (0-5) para mostrar en las estrellas',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    leftLabel: {
      control: { type: 'text' },
      description: 'Etiqueta izquierda del gráfico',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'string' },
      },
    },
    rightLabel: {
      control: { type: 'text' },
      description: 'Etiqueta derecha del gráfico',
      table: {
        defaultValue: { summary: '5' },
        type: { summary: 'string' },
      },
    },
    titleIcon: {
      control: { type: 'text' },
      description: 'Nombre del icono FontAwesome para el título (sin prefijo fa-)',
      table: {
        type: { summary: 'string' },
        example: { summary: 'star, chart-line, thumbs-up, etc.' },
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
type Story = StoryObj<ScoreCardMetricsOptions>;

export const Default: Story = {
  args: {
    title: 'Califica el producto',
    totalResponses: 7,
    responsesLabel: 'respuestas',
    average: 4.00,
    averageLabel: 'Promedio:',
    score: 3,
    leftLabel: '0',
    rightLabel: '5',
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
    const cardHTML = renderScoreCardMetrics(args);
    wrapper.innerHTML = cardHTML;
    container.appendChild(wrapper);
    
    return container;
  },
};

