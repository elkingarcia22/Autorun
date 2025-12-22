/**
 * Chip Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderChip, createChip } from '../../../../components/chip/src/ChipProvider';
import type { ChipOptions } from '../../../../components/chip/src/types/ChipOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/chip/src/styles/chip.css';

const meta: Meta<ChipOptions> = {
	title: 'Básicos/Chip',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Chip UBITS para mostrar etiquetas o tags interactivas. Múltiples tamaños, estados y soporte para iconos izquierdo y derecho (botón de cerrar). Usa tokens UBITS exclusivamente.',
			},
		},
		layout: 'centered',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-chip',
			api: {
				create: 'window.UBITS.Chip.create',
				tag: '<ubits-chip>',
			},
			dependsOn: {
				required: [], // Chip no requiere otros componentes
				optional: ['🧩-ux-icon'], // Iconos son opcionales
			},
			internals: [], // Chip no tiene componentes internos privados
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-border-radius-sm',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['label'],
			},
		}),
	},
	args: {
		label: 'Chip',
		size: 'md',
		state: 'default',
		leftIcon: undefined,
		rightIcon: undefined,
		clickable: false,
		closable: false,
		className: '',
	},
	argTypes: {
		label: {
			control: { type: 'text' },
			description: 'Texto del chip (requerido).',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño del chip (xs: 20px, sm: 24px, md: 28px, lg: 36px)',
			table: {
				type: { summary: 'xs | sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		state: {
			control: { type: 'select' },
			options: ['default', 'hover', 'active', 'pressed', 'focus', 'disabled'],
			description: 'Estado del chip',
			table: {
				type: { summary: 'default | hover | active | pressed | focus | disabled' },
				defaultValue: { summary: 'default' },
				category: 'Estado',
			},
		},
		leftIcon: {
			control: { type: 'text' },
			description: 'Icono FontAwesome izquierdo (ej: "tag", "user"). Dejar vacío para ocultar.',
			table: {
				type: { summary: 'string | null' },
				category: 'Iconos',
			},
		},
		rightIcon: {
			control: { type: 'text' },
			description: 'Icono FontAwesome derecho para el botón de cerrar (ej: "xmark"). Se usa si closable es true.',
			table: {
				type: { summary: 'string | null' },
				defaultValue: { summary: 'xmark' },
				category: 'Iconos',
			},
		},
		closable: {
			control: { type: 'boolean' },
			description: 'Si el chip tiene botón de cerrar',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Comportamiento',
			},
		},
		clickable: {
			control: { type: 'boolean' },
			description: 'Si el chip es clickeable (añade estilos hover/active y cursor pointer)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Comportamiento',
			},
		},
		onClick: {
			action: 'clicked',
			description: 'Función a ejecutar cuando se hace clic en el chip (solo si clickable es true)',
			table: {
				disable: true,
			},
		},
		onClose: {
			action: 'closed',
			description: 'Función a ejecutar cuando se hace clic en el botón de cerrar',
			table: {
				disable: true,
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
type Story = StoryObj<ChipOptions>;

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
		label: 'Etiqueta',
		size: 'md',
		state: 'default',
		leftIcon: undefined,
		rightIcon: undefined,
		clickable: false,
		closable: false,
		className: '',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// Opción 1: Usar createChip (retorna elemento)
const chipElement = window.UBITS.Chip.create({
  label: 'Etiqueta',
  size: 'md',
  state: 'default',
  clickable: false,
  closable: false
});
document.getElementById('container').appendChild(chipElement);

// Opción 2: Usar renderChip (retorna HTML string)
const chipHTML = window.UBITS.Chip.render({
  label: 'Etiqueta',
  size: 'md',
  state: 'default',
  clickable: false,
  closable: false
});
document.getElementById('container').innerHTML = chipHTML;`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-chip');
		container.setAttribute('data-ubits-component', 'Chip');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';

		// Crear chip
		const chipElement = createChip(args);
		container.appendChild(chipElement);

		// Agregar event listeners
		if (args.onClick && chipElement) {
			chipElement.addEventListener('click', args.onClick);
		}
		if (args.onClose && chipElement) {
			const closeButton = chipElement.querySelector('.ubits-chip__close');
			if (closeButton) {
				closeButton.addEventListener('click', args.onClose);
			}
		}

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		label: 'Chip',
		size: 'md',
		state: 'default',
		leftIcon: undefined,
		rightIcon: undefined,
		clickable: false,
		closable: false,
		className: '',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';

		const chipElement = createChip(args);
		container.appendChild(chipElement);

		if (args.onClick && chipElement) {
			chipElement.addEventListener('click', args.onClick);
		}
		if (args.onClose && chipElement) {
			const closeButton = chipElement.querySelector('.ubits-chip__close');
			if (closeButton) {
				closeButton.addEventListener('click', args.onClose);
			}
		}

		return container;
	},
};
