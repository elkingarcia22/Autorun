/**
 * Progress Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import {
	createProgressBar,
	renderProgressBar,
} from '../../../../components/progress/src/ProgressProvider';
import type { ProgressOptions } from '../../../../components/progress/src/types/ProgressOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/progress/src/styles/progress.css';

const meta: Meta<ProgressOptions> = {
	title: 'Feedback/Progress',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Progress Bar UBITS para mostrar progreso. Soporta variante simple (un color) y multi-color (múltiples segmentos), múltiples tamaños y indicador de texto opcional.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-progress',
			api: {
				create: 'window.UBITS.Progress.create',
				tag: '<ubits-progress>',
			},
			dependsOn: {
				required: [], // Progress no requiere otros componentes
				optional: [], // No hay componentes opcionales
			},
			internals: [], // Progress no tiene componentes internos privados
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-border-radius-sm',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: [],
			},
		}),
	},
	args: {
		size: 'md',
		value: 50,
		variant: 'default',
		segments: undefined,
		indicator: false,
		className: '',
	},
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño del progress bar',
			table: {
				type: { summary: 'xs | sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		value: {
			control: { type: 'number', min: 0, max: 100 },
			description: 'Valor del progreso (0-100) - solo para variante default',
			table: {
				type: { summary: 'number' },
				category: 'Contenido',
			},
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'multi-color'],
			description: 'Variante del progress bar',
			table: {
				type: { summary: 'default | multi-color' },
				defaultValue: { summary: 'default' },
				category: 'Apariencia',
			},
		},
		segments: {
			control: { type: 'object' },
			description: 'Segmentos para la variante multi-color',
			table: {
				type: {
					summary: `Array<{
  value: number;
  color: 'yellow' | 'green' | 'gray' | 'info' | 'error';
}>`,
				},
				category: 'Contenido',
			},
		},
		indicator: {
			control: { type: 'text' },
			description: 'Indicador de texto (true = porcentaje, string = texto personalizado)',
			table: {
				type: { summary: 'boolean | string' },
				category: 'Contenido',
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clases CSS adicionales',
			table: {
				type: { summary: 'string' },
				category: 'Avanzado',
			},
		},
	},
};

export default meta;
type Story = StoryObj<ProgressOptions>;

/**
 * ⭐ STORY CANÓNICA: Implementation (Copy/Paste)
 *
 * Esta story es el punto de anclaje para Autorun.
 * - Args explícitos (no depende de defaults)
 * - Estado estable (sin datos aleatorios)
 * - Snippet exacto controlado
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		size: 'md',
		value: 75,
		variant: 'default',
		segments: undefined,
		indicator: true,
		className: '',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// Opción 1: Usar createProgressBar (retorna elemento)
const progressElement = window.UBITS.Progress.create({
  size: 'md',
  value: 75,
  variant: 'default',
  indicator: true
});
document.getElementById('container').appendChild(progressElement);

// Opción 2: Usar renderProgressBar (retorna HTML string)
const progressHTML = window.UBITS.Progress.render({
  size: 'md',
  value: 75,
  variant: 'default',
  indicator: true
});
document.getElementById('container').innerHTML = progressHTML;`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-progress');
		container.setAttribute('data-ubits-component', 'Progress');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '600px';

		// Crear contenedor para el progress bar
		const progressContainer = document.createElement('div');
		progressContainer.id = args.containerId || 'progress-container';
		progressContainer.style.width = '100%';
		container.appendChild(progressContainer);

		// Crear progress bar
		const progressElement = createProgressBar({
			...args,
			containerId: progressContainer.id,
		});

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		size: 'md',
		value: 50,
		variant: 'default',
		segments: undefined,
		indicator: false,
		className: '',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '600px';

		const progressContainer = document.createElement('div');
		progressContainer.id = args.containerId || 'progress-container';
		progressContainer.style.width = '100%';
		container.appendChild(progressContainer);

		const progressElement = createProgressBar({
			...args,
			containerId: progressContainer.id,
		});

		return container;
	},
};
