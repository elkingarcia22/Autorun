/**
 * List Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createList, renderList } from '../../../../components/list/src/ListProvider';
import type { ListOptions, ListItem } from '../../../../components/list/src/types/ListOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/list/src/styles/list.css';
import '../../../../components/scroll/src/styles/scroll.css';

const meta: Meta<ListOptions> = {
	title: 'Data/List',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente List UBITS para mostrar listas de items con estados (default, hover, active, disabled). Soporta 4 tamaños (xs, sm, md, lg), scrollbar personalizado UBITS, navegación por teclado y selección simple o múltiple.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-list',
			api: {
				create: 'window.UBITS.List.create',
				tag: '<ubits-list>',
			},
			dependsOn: {
				required: [], // List no requiere otros componentes
				optional: ['⚙️-functional-scroll'], // Scrollbar es opcional
			},
			internals: ['⚙️-functional-scroll'], // Scrollbar interno
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['containerId', 'items'],
			},
		}),
	},
	args: {
		containerId: 'list-storybook-container',
		items: [
			{ label: 'Item 1', state: 'default' },
			{ label: 'Item 2', state: 'active' },
			{ label: 'Item 3', state: 'disabled' },
			{ label: 'Item 4', state: 'default' },
		],
		size: 'md',
		maxHeight: '400px',
		multiple: false,
		className: '',
	},
	argTypes: {
		containerId: {
			control: { type: 'text' },
			description: 'ID del contenedor donde se renderizará la lista (requerido).',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
		items: {
			control: { type: 'object' },
			description: 'Array de items de la lista (requerido).',
			table: {
				type: { summary: 'ListItem[]' },
				category: 'Contenido',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño de los items de la lista',
			table: {
				type: { summary: 'xs | sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		maxHeight: {
			control: { type: 'text' },
			description: 'Altura máxima de la lista (para scroll)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '400px' },
				category: 'Apariencia',
			},
		},
		multiple: {
			control: { type: 'boolean' },
			description: 'Si la lista permite selección múltiple',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Comportamiento',
			},
		},
		onSelectionChange: {
			action: 'selection-changed',
			description: 'Callback cuando cambia la selección',
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
type Story = StoryObj<ListOptions>;

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
		containerId: 'list-implementation-container',
		items: [
			{ label: 'Opción 1', state: 'default', value: 'option1' },
			{ label: 'Opción 2', state: 'active', value: 'option2' },
			{ label: 'Opción 3', state: 'default', value: 'option3' },
		],
		size: 'md',
		maxHeight: '400px',
		multiple: false,
		className: '',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="list-implementation-container"></div>

// 2. Crear lista
window.UBITS.List.create({
  containerId: 'list-implementation-container',
  items: [
    { label: 'Opción 1', state: 'default', value: 'option1' },
    { label: 'Opción 2', state: 'active', value: 'option2' },
    { label: 'Opción 3', state: 'default', value: 'option3' }
  ],
  size: 'md',
  maxHeight: '400px',
  multiple: false
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-list');
		container.setAttribute('data-ubits-component', 'List');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '400px';

		// Crear contenedor para la lista
		const listContainer = document.createElement('div');
		listContainer.id = args.containerId;
		listContainer.style.width = '100%';
		container.appendChild(listContainer);

		// Crear lista
		const listElement = createList(args);

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		containerId: 'list-storybook-container',
		items: [
			{ label: 'Item 1', state: 'default' },
			{ label: 'Item 2', state: 'active' },
			{ label: 'Item 3', state: 'disabled' },
			{ label: 'Item 4', state: 'default' },
		],
		size: 'md',
		maxHeight: '400px',
		multiple: false,
		className: '',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '400px';

		const listContainer = document.createElement('div');
		listContainer.id = args.containerId;
		listContainer.style.width = '100%';
		container.appendChild(listContainer);

		const listElement = createList(args);

		return container;
	},
};
