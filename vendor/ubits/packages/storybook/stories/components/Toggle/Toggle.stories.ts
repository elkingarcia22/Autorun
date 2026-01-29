/**
 * Toggle Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderToggle, createToggle } from '../../../../components/toggle/src/ToggleProvider';
import type { ToggleOptions } from '../../../../components/toggle/src/types/ToggleOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/toggle/src/styles/toggle.css';

const meta: Meta<ToggleOptions> = {
	title: 'Formularios/Toggle',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Toggle/Switch UBITS para activar/desactivar opciones. Múltiples tamaños, estados y soporte para texto complementario. Usa tokens UBITS exclusivamente.',
			},
		},
		layout: 'centered',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-toggle',
			api: {
				create: 'window.UBITS.Toggle.create',
				tag: '<ubits-toggle>',
			},
			dependsOn: {
				required: [], // Toggle no depende de otros componentes
				optional: [], // No hay componentes opcionales
			},
			internals: [], // Toggle no tiene componentes internos privados
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
				requiredProps: [],
			},
		}),
	},
	args: {
		label: undefined,
		complementaryText: undefined,
		value: '',
		name: '',
		checked: false,
		size: 'md',
		state: 'default',
		disabled: false,
		className: '',
	},
	argTypes: {
		label: {
			control: { type: 'text' },
			description: 'Texto del label del toggle',
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
			description: 'Valor del toggle',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		name: {
			control: { type: 'text' },
			description: 'Nombre del toggle (para agrupar toggles)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		checked: {
			control: { type: 'boolean' },
			description: 'Si el toggle está activado',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md'],
			description: 'Tamaño del toggle (sm: 33x16px, md: 36x20px)',
			table: {
				type: { summary: 'sm | md' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		state: {
			control: { type: 'select' },
			options: ['default', 'hover', 'active', 'disabled'],
			description: 'Estado del toggle',
			table: {
				type: { summary: 'default | hover | active | disabled' },
				defaultValue: { summary: 'default' },
				category: 'Estado',
			},
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Si el toggle está deshabilitado',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		onChange: {
			action: 'changed',
			description: 'Función a ejecutar cuando cambia el estado del toggle',
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
type Story = StoryObj<ToggleOptions>;

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
		label: 'Activar notificaciones',
		complementaryText: undefined,
		value: 'notifications',
		name: 'settings',
		checked: false,
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
<div id="toggle-implementation-container"></div>

// 2. Crear toggle
window.UBITS.Toggle.create({
  containerId: 'toggle-implementation-container',
  label: 'Activar notificaciones',
  value: 'notifications',
  name: 'settings',
  checked: false,
  size: 'md',
  state: 'default',
  disabled: false
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-toggle');
		container.setAttribute('data-ubits-component', 'Toggle');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';

		// Crear contenedor para el toggle
		const toggleContainer = document.createElement('div');
		toggleContainer.id = args.containerId || 'toggle-container';
		container.appendChild(toggleContainer);

		// Crear toggle
		const toggleInstance = createToggle({
			...args,
			containerId: toggleContainer.id,
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

		const toggleContainer = document.createElement('div');
		toggleContainer.id = args.containerId || 'toggle-container';
		container.appendChild(toggleContainer);

		const toggleInstance = createToggle({
			...args,
			containerId: toggleContainer.id,
		});

		return container;
	},
};
