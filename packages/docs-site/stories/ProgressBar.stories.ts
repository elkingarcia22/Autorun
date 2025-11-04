import type { Meta, StoryObj } from '@storybook/html';
import { createProgressBar } from '../../addons/progress/src/ProgressProvider';
import type { ProgressOptions } from '../../addons/progress/src/types/ProgressOptions';
import '../../addons/progress/src/styles/progress.css';

const meta: Meta<ProgressOptions> = {
  title: 'Components/Progress Bar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Progress Bar personalizado UBITS. Se usa para mostrar progreso de tareas o procesos. Soporta 4 tamaños (xs, sm, md, lg) y dos variantes: default (un solo color) y multi-color (múltiples segmentos con diferentes colores). Incluye indicador opcional de texto o porcentaje.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño del progress bar.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: 'Apariencia',
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'multi-color'],
      description: 'Variante del progress bar. Default muestra un solo color, multi-color muestra múltiples segmentos.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Apariencia',
      },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor del progreso (0-100). Solo se usa cuando variant es "default".',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
        category: 'Comportamiento',
      },
    },
    segments: {
      control: { type: 'object' },
      description: 'Array de segmentos para la variante multi-color. Cada segmento tiene value (porcentaje) y color (yellow, green, gray, info, error).',
      table: {
        type: { summary: 'Array<ProgressSegment>' },
        category: 'Comportamiento',
      },
    },
    indicator: {
      control: { type: 'boolean' },
      description: 'Si es true, muestra el porcentaje automáticamente. Si es string, muestra ese texto.',
      table: {
        type: { summary: 'boolean | string' },
        defaultValue: { summary: false },
        category: 'Apariencia',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ProgressOptions>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'default',
    value: 75,
    indicator: true,
  },
  render: (args) => {
    // Crear contenedor fullscreen
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: var(--ubits-bg-2, #f3f3f4);
    `;

    // Contenedor principal
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 100%;
      max-width: 800px;
      background: var(--ubits-bg-1, #ffffff);
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;

    // Título
    const title = document.createElement('h2');
    title.textContent = 'Progress Bar';
    title.style.cssText = `
      margin: 0 0 24px 0;
      color: var(--ubits-fg-1-high, #303a47);
      font-size: var(--font-heading-h2-size, 24px);
      font-weight: var(--weight-bold, 700);
    `;

    // Descripción
    const description = document.createElement('p');
    description.textContent = 'Componente para mostrar el progreso de una tarea o proceso. Puede mostrar un solo valor o múltiples segmentos con diferentes colores.';
    description.style.cssText = `
      margin: 0 0 32px 0;
      color: var(--ubits-fg-1-medium, #5c646f);
      font-size: var(--font-body-md-size, 16px);
      line-height: var(--font-body-md-line, 24px);
    `;

    // Contenedor para el progress bar
    const progressContainer = document.createElement('div');
    progressContainer.id = `progress-bar-container-${Date.now()}`;
    progressContainer.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

    let progressBarInstance: any = null;

    const createProgressBarContent = () => {
      // Limpiar instancia anterior
      if (progressBarInstance) {
        progressBarInstance.destroy();
        progressBarInstance = null;
      }

      // Preparar opciones
      let options: ProgressOptions = {
        size: args.size || 'md',
        variant: args.variant || 'default',
        value: args.value || 0,
        indicator: args.indicator !== undefined ? args.indicator : false,
        containerId: progressContainer.id,
      };

      // Si es multi-color, usar segmentos de ejemplo si no se proporcionan
      if (args.variant === 'multi-color') {
        options.segments = args.segments || [
          { value: 30, color: 'green' },
          { value: 25, color: 'info' },
          { value: 20, color: 'yellow' },
          { value: 15, color: 'error' },
          { value: 10, color: 'gray' }
        ];
        options.value = undefined;
      }

      // Crear progress bar
      try {
        progressBarInstance = createProgressBar(options);
      } catch (error) {
        console.error('Error al crear progress bar:', error);
      }
    };

    // Crear contenido inicial
    createProgressBarContent();

    // Observar cambios en args
    let lastArgs = JSON.stringify(args);
    const checkInterval = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        createProgressBarContent();
      }
    }, 100);

    // Limpiar al desmontar
    container.addEventListener('DOMNodeRemoved', () => {
      clearInterval(checkInterval);
      if (progressBarInstance) {
        progressBarInstance.destroy();
      }
    });

    wrapper.appendChild(title);
    wrapper.appendChild(description);
    wrapper.appendChild(progressContainer);
    container.appendChild(wrapper);

    return container;
  },
};

