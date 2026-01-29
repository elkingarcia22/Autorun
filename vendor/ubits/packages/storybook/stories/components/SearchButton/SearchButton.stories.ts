/**
 * SearchButton Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import {
	createSearchButton,
	renderSearchButton,
} from '../../../../components/search-button/src/SearchButtonProvider';
import type { SearchButtonOptions } from '../../../../components/search-button/src/types/SearchButtonOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/search-button/src/styles/search-button.css';
import '../../../../components/button/src/styles/button.css';
import '../../../../components/input/src/styles/input.css';

const meta: Meta<SearchButtonOptions> = {
	title: 'Formularios/Search Button',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Search Button UBITS con modo botón e input. Cuando está activo, muestra un campo de búsqueda con icono. Cuando no está activo, muestra solo un botón con icono de lupa. Usa tokens UBITS exclusivamente.',
			},
		},
		layout: 'centered',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-search-button',
			api: {
				create: 'window.UBITS.SearchButton.create',
				tag: '<ubits-search-button>',
			},
			dependsOn: {
				required: ['🧩-ux-button'], // Botón es requerido
				optional: ['🧩-ux-input'], // Input es opcional (solo cuando está activo)
			},
			internals: [], // SearchButton no tiene componentes internos privados
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--ubits-border-radius-sm',
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
		active: false,
		size: 'md',
		state: 'default',
		disabled: false,
		placeholder: 'Buscar...',
		value: '',
		width: 248,
		className: '',
	},
	argTypes: {
		active: {
			control: { type: 'boolean' },
			description: 'Si el botón está en modo activo (muestra input)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md'],
			description: 'Tamaño del botón (sm: 32px, md: 40px)',
			table: {
				type: { summary: 'sm | md' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		state: {
			control: { type: 'select' },
			options: ['default', 'hover', 'active', 'disabled'],
			description: 'Estado del botón',
			table: {
				type: { summary: 'default | hover | active | disabled' },
				defaultValue: { summary: 'default' },
				category: 'Estado',
			},
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Si el botón está deshabilitado',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		placeholder: {
			control: { type: 'text' },
			description: 'Placeholder del input cuando está activo',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Buscar...' },
				category: 'Contenido',
			},
		},
		value: {
			control: { type: 'text' },
			description: 'Valor del input cuando está activo',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		width: {
			control: { type: 'number' },
			description: 'Ancho del input cuando está activo (en px)',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '248' },
				category: 'Apariencia',
			},
		},
		onChange: {
			action: 'changed',
			description: 'Función a ejecutar cuando cambia el valor del input',
			table: {
				disable: true,
			},
		},
		onClick: {
			action: 'clicked',
			description: 'Función a ejecutar cuando se hace click en el botón',
			table: {
				disable: true,
			},
		},
		onFocus: {
			action: 'focused',
			description: 'Función a ejecutar cuando el input recibe focus',
			table: {
				disable: true,
			},
		},
		onBlur: {
			action: 'blurred',
			description: 'Función a ejecutar cuando el input pierde focus',
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
type Story = StoryObj<SearchButtonOptions>;

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
		active: false,
		size: 'md',
		state: 'default',
		disabled: false,
		placeholder: 'Buscar...',
		value: '',
		width: 248,
		className: '',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="searchbutton-implementation-container"></div>

// 2. Crear search button
window.UBITS.SearchButton.create({
  containerId: 'searchbutton-implementation-container',
  active: false,
  size: 'md',
  state: 'default',
  disabled: false,
  placeholder: 'Buscar...',
  value: '',
  width: 248
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-search-button');
		container.setAttribute('data-ubits-component', 'SearchButton');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';

		// Crear contenedor para el search button
		const searchButtonContainer = document.createElement('div');
		searchButtonContainer.id = args.containerId || 'searchbutton-container';
		searchButtonContainer.style.position = 'relative';
		container.appendChild(searchButtonContainer);

		// Crear search button
		const searchButtonInstance = createSearchButton({
			...args,
			containerId: searchButtonContainer.id,
		});

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		active: false,
		size: 'md',
		state: 'default',
		disabled: false,
		placeholder: 'Buscar...',
		value: '',
		width: 248,
		className: '',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.minHeight = '100px';

		const searchButtonContainer = document.createElement('div');
		searchButtonContainer.id = args.containerId || 'searchbutton-container';
		searchButtonContainer.style.position = 'relative';
		container.appendChild(searchButtonContainer);

		const searchButtonInstance = createSearchButton({
			...args,
			containerId: searchButtonContainer.id,
		});

		return container;
	},
};
