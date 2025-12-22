/**
 * Tooltip Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createTooltip, renderTooltip } from '../../../../components/tooltip/src/TooltipProvider';
import type { TooltipOptions } from '../../../../components/tooltip/src/types/TooltipOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/tooltip/src/styles/tooltip.css';
import '../../../../components/button/src/styles/button.css';

const meta: Meta<TooltipOptions> = {
	title: 'Feedback/Tooltip',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Tooltip UBITS con tail (flecha) para mostrar información contextual. Similar al Popover pero más simple, con título, descripción y botones de acción.',
			},
		},
		layout: 'fullscreen',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-tooltip',
			api: {
				create: 'window.UBITS.Tooltip.create',
				tag: '<ubits-tooltip>',
			},
			dependsOn: {
				required: [], // Tooltip no requiere otros componentes
				optional: ['🧩-ux-button'], // Botones de acción son opcionales
			},
			internals: [], // Tooltip no tiene componentes internos privados
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: [],
			},
		}),
	},
	args: {
		title: 'Título del tooltip',
		showTitle: true,
		description: 'Descripción o mensaje del tooltip',
		showDescription: true,
		width: 'md',
		tailPosition: 'top',
		tailOffset: 0,
		showPrimaryButton: false,
		showSecondaryButton: false,
		showTertiaryButton: false,
		open: false,
	},
	argTypes: {
		title: {
			control: { type: 'text' },
			description: 'Título del tooltip (opcional)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		showTitle: {
			control: { type: 'boolean' },
			description: 'Mostrar título',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Contenido',
			},
		},
		description: {
			control: { type: 'text' },
			description: 'Descripción o mensaje del tooltip (opcional)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		showDescription: {
			control: { type: 'boolean' },
			description: 'Mostrar descripción',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Contenido',
			},
		},
		width: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Tamaño del tooltip (sm: 120-240px, md: 160-320px, lg: 200-400px)',
			table: {
				type: { summary: 'sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		tailPosition: {
			control: { type: 'select' },
			options: ['top', 'bottom', 'left', 'right'],
			description: 'Posición del tail (flecha) del tooltip',
			table: {
				type: { summary: 'top | bottom | left | right' },
				defaultValue: { summary: 'top' },
				category: 'Apariencia',
			},
		},
		tailOffset: {
			control: { type: 'number' },
			description: 'Offset del tail desde el centro (en píxeles)',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '0' },
				category: 'Apariencia',
			},
		},
		showPrimaryButton: {
			control: { type: 'boolean' },
			description: 'Mostrar botón primario',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Botones',
			},
		},
		primaryButtonLabel: {
			control: { type: 'text' },
			description: 'Texto del botón primario',
			table: {
				type: { summary: 'string' },
				category: 'Botones',
			},
		},
		onClose: {
			action: 'closed',
			description: 'Callback cuando se cierra el tooltip',
			table: {
				disable: true,
			},
		},
	},
};

export default meta;
type Story = StoryObj<TooltipOptions>;

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
		title: 'Información útil',
		showTitle: true,
		description: 'Este es un tooltip con información contextual.',
		showDescription: true,
		width: 'md',
		tailPosition: 'top',
		tailOffset: 0,
		showPrimaryButton: false,
		open: true,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `const tooltipInstance = window.UBITS.Tooltip.create({
  title: 'Información útil',
  showTitle: true,
  description: 'Este es un tooltip con información contextual.',
  showDescription: true,
  width: 'md',
  tailPosition: 'top',
  tailOffset: 0,
  showPrimaryButton: false,
  open: true
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-tooltip');
		container.setAttribute('data-ubits-component', 'Tooltip');
		container.style.width = '100vw';
		container.style.height = '100vh';
		container.style.position = 'relative';
		container.style.overflow = 'hidden';
		container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';

		// Crear tooltip directamente
		const tooltipInstance = createTooltip({
			...args,
			position: {
				top: 100,
				left: '50%',
			} as any,
		});

		if (args.open) {
			tooltipInstance.open();
		}

		// Indicador
		const indicator = document.createElement('div');
		indicator.style.padding = '20px';
		indicator.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
		indicator.textContent = 'Tooltip abierto (ver overlay)';
		container.appendChild(indicator);

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		title: 'Título del tooltip',
		showTitle: true,
		description: 'Descripción o mensaje del tooltip',
		showDescription: true,
		width: 'md',
		tailPosition: 'top',
		tailOffset: 0,
		showPrimaryButton: false,
		open: false,
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.width = '100vw';
		container.style.height = '100vh';
		container.style.position = 'relative';
		container.style.overflow = 'hidden';
		container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';

		const button = document.createElement('button');
		button.className = 'ubits-button ubits-button--primary ubits-button--md';
		button.innerHTML = '<span>Mostrar Tooltip</span>';

		let tooltipInstance: ReturnType<typeof createTooltip> | null = null;

		button.addEventListener('click', () => {
			if (!tooltipInstance) {
				tooltipInstance = createTooltip({
					...args,
					referenceElement: button,
					onClose: () => {
						tooltipInstance = null;
						button.style.display = 'flex';
					},
				});
				tooltipInstance.open();
				button.style.display = 'none';
			}
		});

		container.appendChild(button);
		return container;
	},
};
