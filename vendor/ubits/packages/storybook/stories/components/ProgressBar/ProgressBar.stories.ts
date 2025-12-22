import type { Meta, StoryObj } from '@storybook/html';
import { createProgressBar, renderProgressBar } from '../../../../components/progress/src/ProgressProvider';
import type {
	ProgressOptions,
	ProgressSegment,
} from '../../../../components/progress/src/types/ProgressOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/progress/src/styles/progress.css';

interface ExtendedProgressOptions extends ProgressOptions {
	numSegments?: number;
	segment1Value?: number;
	segment1Color?: 'yellow' | 'green' | 'gray' | 'info' | 'error';
	segment2Value?: number;
	segment2Color?: 'yellow' | 'green' | 'gray' | 'info' | 'error';
	segment3Value?: number;
	segment3Color?: 'yellow' | 'green' | 'gray' | 'info' | 'error';
	segment4Value?: number;
	segment4Color?: 'yellow' | 'green' | 'gray' | 'info' | 'error';
	segment5Value?: number;
	segment5Color?: 'yellow' | 'green' | 'gray' | 'info' | 'error';
}

const meta: Meta<ExtendedProgressOptions> = {
	title: 'Charts/Progress Bar',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Progress Bar personalizado UBITS. Se usa para mostrar progreso de tareas o procesos. Soporta 4 tamaños (xs, sm, md, lg) y dos variantes: default (un solo color) y multi-color (múltiples segmentos con diferentes colores). El segmento gris se calcula automáticamente como el resto que falta para llegar a 100%. Incluye indicador opcional de texto o porcentaje.',
			},
		},
		layout: 'fullscreen',
		ubits: createUBITSContract({
			componentId: '🧩-ux-progress-bar',
			api: {
				create: 'window.createProgressBar', // También disponible como función importada directamente
				render: 'window.renderProgressBar', // También disponible como función importada directamente
			},
			dependsOn: {
				required: [],
				optional: [],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-3',
				'--modifiers-normal-color-light-bg-4',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-feedback-accent-success',
				'--modifiers-normal-color-light-feedback-accent-error',
				'--modifiers-normal-color-light-feedback-chart-warning-bold',
				'--modifiers-normal-color-light-feedback-chart-info-bold',
				'--ubits-chart-color-bg-neutral-blue-base',
				'--ubits-spacing-sm',
				'--ubits-border-radius-full',
				'--font-family-noto-sans-font-family',
				'--weight-semibold',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: [],
			},
		}),
	},
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño del progress bar.',
			table: {
				type: { summary: 'xs | sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'multi-color'],
			description:
				'Variante del progress bar. Default muestra un solo color, multi-color muestra múltiples segmentos.',
			table: {
				type: { summary: 'default | multi-color' },
				defaultValue: { summary: 'default' },
				category: 'Apariencia',
			},
		},
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Valor del progreso (0-100). Solo se usa cuando variant es "default".',
			table: {
				type: { summary: 'number (0-100)' },
				defaultValue: { summary: '0' },
				category: 'Comportamiento',
			},
		},
		indicator: {
			control: { type: 'text' },
			description:
				'Si es true, muestra el porcentaje automáticamente. Si es string, muestra ese texto.',
			table: {
				type: { summary: 'boolean | string' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		numSegments: {
			control: { type: 'number', min: 1, max: 5, step: 1 },
			description:
				'Número de segmentos activos (1-5). Solo se usa cuando variant es "multi-color".',
			table: {
				type: { summary: 'number (1-5)' },
				defaultValue: { summary: '4' },
				category: 'Comportamiento',
			},
			if: { arg: 'variant', eq: 'multi-color' },
		},
		segment1Value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Valor del segmento 1 (0-100).',
			table: { category: 'Segmentos Multi-color' },
			if: { arg: 'variant', eq: 'multi-color' },
		},
		segment1Color: {
			control: { type: 'select' },
			options: ['yellow', 'green', 'gray', 'info', 'error'],
			description: 'Color del segmento 1.',
			table: { category: 'Segmentos Multi-color' },
			if: { arg: 'variant', eq: 'multi-color' },
		},
		segment2Value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Valor del segmento 2 (0-100).',
			table: { category: 'Segmentos Multi-color' },
			if: { arg: 'variant', eq: 'multi-color' },
		},
		segment2Color: {
			control: { type: 'select' },
			options: ['yellow', 'green', 'gray', 'info', 'error'],
			description: 'Color del segmento 2.',
			table: { category: 'Segmentos Multi-color' },
			if: { arg: 'variant', eq: 'multi-color' },
		},
		segment3Value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Valor del segmento 3 (0-100).',
			table: { category: 'Segmentos Multi-color' },
			if: { arg: 'variant', eq: 'multi-color' },
		},
		segment3Color: {
			control: { type: 'select' },
			options: ['yellow', 'green', 'gray', 'info', 'error'],
			description: 'Color del segmento 3.',
			table: { category: 'Segmentos Multi-color' },
			if: { arg: 'variant', eq: 'multi-color' },
		},
		segment4Value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Valor del segmento 4 (0-100).',
			table: { category: 'Segmentos Multi-color' },
			if: { arg: 'variant', eq: 'multi-color' },
		},
		segment4Color: {
			control: { type: 'select' },
			options: ['yellow', 'green', 'gray', 'info', 'error'],
			description: 'Color del segmento 4.',
			table: { category: 'Segmentos Multi-color' },
			if: { arg: 'variant', eq: 'multi-color' },
		},
		segment5Value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Valor del segmento 5 (0-100).',
			table: { category: 'Segmentos Multi-color' },
			if: { arg: 'variant', eq: 'multi-color' },
		},
		segment5Color: {
			control: { type: 'select' },
			options: ['yellow', 'green', 'gray', 'info', 'error'],
			description: 'Color del segmento 5.',
			table: { category: 'Segmentos Multi-color' },
			if: { arg: 'variant', eq: 'multi-color' },
		},
		className: {
			control: { type: 'text' },
			description: 'Clase CSS adicional.',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
	},
};

export default meta;
type Story = StoryObj<ExtendedProgressOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		size: 'md',
		variant: 'default',
		value: 75,
		indicator: true,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear ProgressBar (variante default)
const progressBarInstance = window.createProgressBar({
  containerId: 'progress-bar-container',
  size: 'md', // 'xs' | 'sm' | 'md' | 'lg'
  variant: 'default', // 'default' | 'multi-color'
  value: 75, // 0-100
  indicator: true, // true muestra porcentaje, string muestra texto personalizado
  className: ''
});

// Nota: createProgressBar retorna un objeto con:
// - progressBarInstance.element: El elemento DOM del progress bar
// - progressBarInstance.update(newOptions): Actualizar el progress bar
// - progressBarInstance.destroy(): Destruir el progress bar y limpiar recursos

// Ejemplo: Actualizar el progress bar
progressBarInstance.update({
  value: 90,
  indicator: '90% completado'
});

// Ejemplo: Variante multi-color con múltiples segmentos
const multiColorProgressBar = window.createProgressBar({
  containerId: 'multi-color-progress-container',
  size: 'md',
  variant: 'multi-color',
  segments: [
    { value: 30, color: 'info' },    // 30% azul
    { value: 25, color: 'yellow' }, // 25% amarillo
    { value: 20, color: 'green' },  // 20% verde
    { value: 25, color: 'error' }   // 25% rojo
    // El resto (0%) se calcula automáticamente como gris
  ],
  indicator: true
});

// Alternativa: Usar renderProgressBar para obtener HTML string
const progressBarHTML = window.renderProgressBar({
  size: 'md',
  variant: 'default',
  value: 75,
  indicator: true
});

// Insertar HTML
const container = document.getElementById('progress-bar-container');
if (container) {
  container.innerHTML = progressBarHTML;
}`,
			},
		},
	},
	render: (args) => {
		// Crear contenedor
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-progress-bar');
		container.setAttribute('data-ubits-component', 'ProgressBar');
		container.style.cssText = `
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--modifiers-normal-color-light-bg-2);
      padding: 40px;
    `;

		// Contenedor principal
		const wrapper = document.createElement('div');
		wrapper.style.cssText = `
      width: 100%;
      max-width: 600px;
      background: var(--modifiers-normal-color-light-bg-1);
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;

		// Contenedor para el progress bar
		const progressContainer = document.createElement('div');
		progressContainer.id = `progress-bar-container-${Date.now()}`;
		progressContainer.style.cssText = `
      width: 100%;
      max-width: 500px;
    `;

		// Preparar opciones
		let options: ProgressOptions = {
			containerId: progressContainer.id,
			size: args.size || 'md',
			variant: args.variant || 'default',
			value: args.value !== undefined ? args.value : args.variant === 'default' ? 75 : 0,
			indicator: args.indicator !== undefined ? args.indicator : false,
			className: args.className,
		};

		// Si es multi-color, construir segmentos
		if (args.variant === 'multi-color') {
			const numSegments = args.numSegments || 4;
			const segments: ProgressSegment[] = [];

			if (numSegments >= 1) {
				segments.push({
					value: args.segment1Value !== undefined ? args.segment1Value : 30,
					color: args.segment1Color || 'info',
				});
			}
			if (numSegments >= 2) {
				segments.push({
					value: args.segment2Value !== undefined ? args.segment2Value : 25,
					color: args.segment2Color || 'yellow',
				});
			}
			if (numSegments >= 3) {
				segments.push({
					value: args.segment3Value !== undefined ? args.segment3Value : 20,
					color: args.segment3Color || 'green',
				});
			}
			if (numSegments >= 4) {
				segments.push({
					value: args.segment4Value !== undefined ? args.segment4Value : 25,
					color: args.segment4Color || 'error',
				});
			}
			if (numSegments >= 5) {
				segments.push({
					value: args.segment5Value !== undefined ? args.segment5Value : 0,
					color: args.segment5Color || 'gray',
				});
			}

			options.segments = segments;
			options.value = undefined;
		}

		// Crear progress bar
		try {
			const progressBarInstance = createProgressBar(options);
			// El elemento ya está insertado en el DOM por createProgressBar
		} catch (error) {
			console.error('Error creando ProgressBar:', error);
			const errorDiv = document.createElement('div');
			errorDiv.textContent = `Error: ${error}`;
			errorDiv.style.color = 'red';
			progressContainer.appendChild(errorDiv);
		}

		wrapper.appendChild(progressContainer);
		container.appendChild(wrapper);
		return container;
	},
};

export const Default: Story = {
	args: {
		size: 'md',
		variant: 'default',
		value: 75,
		indicator: true,
		numSegments: 4,
		segment1Value: 30,
		segment1Color: 'info',
		segment2Value: 25,
		segment2Color: 'yellow',
		segment3Value: 20,
		segment3Color: 'green',
		segment4Value: 25,
		segment4Color: 'error',
		segment5Value: 0,
		segment5Color: 'gray',
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
      background: var(--modifiers-normal-color-light-bg-2);
    `;

		// Contenedor principal
		const wrapper = document.createElement('div');
		wrapper.style.cssText = `
      width: 100%;
      max-width: 600px;
      background: var(--modifiers-normal-color-light-bg-1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `;

		// Título
		const title = document.createElement('h2');
		title.textContent = 'Progress Bar';
		title.style.cssText = `
      color: var(--modifiers-normal-color-light-fg-1-high);
      font-size: var(--modifiers-normal-heading-h2-fontsize);
      font-weight: var(--weight-bold, 700);
    `;

		// Descripción
		const description = document.createElement('p');
		description.textContent =
			'Componente para mostrar el progreso de una tarea o proceso. Puede mostrar un solo valor o múltiples segmentos con diferentes colores.';
		description.style.cssText = `
      color: var(--modifiers-normal-color-light-fg-1-medium);
      font-size: var(--modifiers-normal-body-md-regular-fontsize);
      line-height: var(--modifiers-normal-body-md-regular-lineheight);
    `;

		// Contenedor para el progress bar
		const progressContainer = document.createElement('div');
		progressContainer.id = `progress-bar-container-${Date.now()}`;
		progressContainer.style.cssText = `
      width: 100%;
      max-width: 500px;
    `;

		let progressBarInstance: any = null;

		const createProgressBarContent = () => {
			progressContainer.innerHTML = '';

			if (progressBarInstance) {
				try {
					progressBarInstance.destroy();
				} catch (e) {
					// Ignorar errores
				}
				progressBarInstance = null;
			}

			let options: ProgressOptions = {
				containerId: progressContainer.id,
				size: args.size || 'md',
				variant: args.variant || 'default',
				value: args.value !== undefined ? args.value : args.variant === 'default' ? 75 : 0,
				indicator: args.indicator !== undefined ? args.indicator : false,
			};

			if (args.variant === 'multi-color') {
				const numSegments = args.numSegments || 4;
				const segments: ProgressSegment[] = [];

				if (numSegments >= 1) {
					segments.push({
						value: args.segment1Value !== undefined ? args.segment1Value : 30,
						color: args.segment1Color || 'info',
					});
				}
				if (numSegments >= 2) {
					segments.push({
						value: args.segment2Value !== undefined ? args.segment2Value : 25,
						color: args.segment2Color || 'yellow',
					});
				}
				if (numSegments >= 3) {
					segments.push({
						value: args.segment3Value !== undefined ? args.segment3Value : 20,
						color: args.segment3Color || 'green',
					});
				}
				if (numSegments >= 4) {
					segments.push({
						value: args.segment4Value !== undefined ? args.segment4Value : 25,
						color: args.segment4Color || 'error',
					});
				}
				if (numSegments >= 5) {
					segments.push({
						value: args.segment5Value !== undefined ? args.segment5Value : 0,
						color: args.segment5Color || 'gray',
					});
				}

				options.segments = segments;
				options.value = undefined;
			}

			try {
				progressBarInstance = createProgressBar(options);
			} catch (error) {
				console.error('Error al crear progress bar:', error);
			}
		};

		createProgressBarContent();

		wrapper.appendChild(title);
		wrapper.appendChild(description);
		wrapper.appendChild(progressContainer);
		container.appendChild(wrapper);

		return container;
	},
};

