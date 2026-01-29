/**
 * Checkbox Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderCheckbox, createCheckbox } from '../../../../components/checkbox/src/CheckboxProvider';
import type { CheckboxOptions } from '../../../../components/checkbox/src/types/CheckboxOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/checkbox/src/styles/checkbox.css';

const meta: Meta<CheckboxOptions> = {
	title: 'Formularios/Checkbox',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Checkbox UBITS para selección múltiple. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.',
			},
		},
		layout: 'centered',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-checkbox',
			api: {
				create: 'window.UBITS.Checkbox.create',
				tag: '<ubits-checkbox>',
			},
			dependsOn: {
				required: [], // Checkbox no depende de otros componentes
				optional: [], // No hay componentes opcionales
			},
			internals: [], // Checkbox no tiene componentes internos privados
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-border-radius-sm',
				'--p-spacing-mode-1-sm',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['label'],
			},
		}),
	},
	args: {
		label: 'Label',
		complementaryText: undefined,
		value: '',
		name: '',
		checked: false,
		indeterminate: false,
		size: 'md',
		state: 'default',
		disabled: false,
		className: '',
	},
	argTypes: {
		label: {
			control: { type: 'text' },
			description: 'Texto del label del checkbox (requerido).',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		complementaryText: {
			control: { type: 'text' },
			description: 'Texto complementario opcional (se muestra debajo del label)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		value: {
			control: { type: 'text' },
			description: 'Valor del checkbox',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		name: {
			control: { type: 'text' },
			description: 'Nombre del checkbox (para agrupar checkboxes)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		checked: {
			control: { type: 'boolean' },
			description: 'Si el checkbox está seleccionado',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		indeterminate: {
			control: { type: 'boolean' },
			description:
				'Si el checkbox está en estado indeterminado (muestra línea horizontal en vez de check)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md'],
			description: 'Tamaño del checkbox (sm: 16px, md: 20px)',
			table: {
				type: { summary: 'sm | md' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		state: {
			control: { type: 'select' },
			options: ['default', 'hover', 'active', 'disabled', 'indeterminate'],
			description: 'Estado del checkbox',
			table: {
				type: { summary: 'default | hover | active | disabled | indeterminate' },
				defaultValue: { summary: 'default' },
				category: 'Estado',
			},
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Si el checkbox está deshabilitado',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		onChange: {
			action: 'changed',
			description: 'Función a ejecutar cuando cambia el estado del checkbox',
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
type Story = StoryObj<CheckboxOptions>;

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
		label: 'Acepto los términos y condiciones',
		complementaryText: undefined,
		value: 'terms',
		name: 'agreement',
		checked: false,
		indeterminate: false,
		size: 'md',
		state: 'default',
		disabled: false,
		className: '',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="checkbox-implementation-container"></div>

// 2. Crear checkbox
window.UBITS.Checkbox.create({
  containerId: 'checkbox-implementation-container',
  label: 'Acepto los términos y condiciones',
  value: 'terms',
  name: 'agreement',
  checked: false,
  indeterminate: false,
  size: 'md',
  state: 'default',
  disabled: false
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-checkbox');
		container.setAttribute('data-ubits-component', 'Checkbox');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';

		// Crear contenedor para el checkbox
		const checkboxContainer = document.createElement('div');
		checkboxContainer.id = args.containerId || 'checkbox-container';
		container.appendChild(checkboxContainer);

		// Crear checkbox
		const checkboxInstance = createCheckbox({
			...args,
			containerId: checkboxContainer.id,
		});

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		label: 'Label',
		complementaryText: undefined,
		value: '',
		name: '',
		checked: false,
		indeterminate: false,
		size: 'md',
		state: 'default',
		disabled: false,
		className: '',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';

		const checkboxContainer = document.createElement('div');
		checkboxContainer.id = args.containerId || 'checkbox-container';
		container.appendChild(checkboxContainer);

		const checkboxInstance = createCheckbox({
			...args,
			containerId: checkboxContainer.id,
		});

		return container;
	},
};
