/**
 * Input Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { renderInput, createInput } from '../../../../components/input/src/InputProvider';
import type {
	InputOptions,
	InputType,
	InputSize,
	InputState,
	SelectOption,
	AutocompleteOption,
} from '../../../../components/input/src/types/InputOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/input/src/styles/input.css';
import '../../../../components/calendar/src/styles/calendar.css';

const meta: Meta<InputOptions> = {
	title: 'Formularios/Input',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Input UBITS con soporte para múltiples tipos (text, email, password, number, tel, url, select, textarea, search, autocomplete, calendar), 4 tamaños (xs, sm, md, lg), 6 estados (default, hover, focus, active, invalid, disabled), iconos, helpers, contadores, y opciones mandatory/optional.',
			},
		},
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '🧩-ux-input',
			api: {
				create: 'window.UBITS.Input.create',
				tag: '<ubits-input>',
			},
			dependsOn: {
				required: [], // Input no depende de otros componentes
				optional: ['🧩-ux-icon'], // Iconos son opcionales
			},
			internals: [
				'⚙️-functional-dropdown', // Dropdown para select/autocomplete
				'⚙️-functional-calendar', // Calendar picker
				'⚙️-functional-password-toggle', // Password toggle
			],
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--ubits-spacing-md',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['containerId'],
				// Notas sobre variaciones:
				// - type='calendar' requiere dependsOn.optional: ['🧩-ux-calendar']
				// - type='select' requiere selectOptions: SelectOption[]
				// - type='autocomplete' requiere autocompleteOptions: AutocompleteOption[]
			},
		}),
	},
	args: {
		containerId: 'input-storybook-container',
		label: 'Label',
		placeholder: 'Placeholder',
		helperText: '',
		type: 'text',
		size: 'md',
		state: 'default',
		showLabel: true,
		showHelper: false,
		showCounter: false,
		maxLength: 50,
		mandatory: false,
		mandatoryType: 'obligatorio',
		leftIcon: undefined,
		rightIcon: undefined,
		value: '',
	},
	argTypes: {
		containerId: {
			control: { type: 'text' },
			description: 'ID del contenedor donde se renderizará el input (REQUERIDO).',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
		label: {
			control: { type: 'text' },
			description: 'Texto del label',
			table: {
				type: { summary: 'string' },
			},
		},
		placeholder: {
			control: { type: 'text' },
			description: 'Texto del placeholder',
			table: {
				type: { summary: 'string' },
			},
		},
		helperText: {
			control: { type: 'text' },
			description: 'Texto de ayuda (helper text)',
			table: {
				type: { summary: 'string' },
			},
		},
		type: {
			control: { type: 'select' },
			options: [
				'text',
				'email',
				'password',
				'number',
				'tel',
				'url',
				'select',
				'textarea',
				'search',
				'autocomplete',
				'calendar',
			],
			description: 'Tipo de input',
			table: {
				type: {
					summary:
						'text | email | password | number | tel | url | select | textarea | search | autocomplete | calendar',
				},
				defaultValue: { summary: 'text' },
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño del input',
			table: {
				type: { summary: 'xs | sm | md | lg' },
				defaultValue: { summary: 'md' },
			},
		},
		state: {
			control: { type: 'select' },
			options: ['default', 'hover', 'focus', 'active', 'invalid', 'disabled'],
			description: 'Estado del input',
			table: {
				type: { summary: 'default | hover | focus | active | invalid | disabled' },
				defaultValue: { summary: 'default' },
			},
		},
		showLabel: {
			control: { type: 'boolean' },
			description: 'Mostrar/ocultar label',
			table: {
				defaultValue: { summary: 'true' },
			},
		},
		showHelper: {
			control: { type: 'boolean' },
			description: 'Mostrar/ocultar helper text',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		showCounter: {
			control: { type: 'boolean' },
			description: 'Mostrar/ocultar contador de caracteres',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		maxLength: {
			control: { type: 'number' },
			description: 'Máximo de caracteres para el contador',
			table: {
				defaultValue: { summary: '50' },
			},
		},
		mandatory: {
			control: { type: 'boolean' },
			description: 'Mostrar texto mandatory/optional',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		mandatoryType: {
			control: { type: 'select' },
			options: ['obligatorio', 'opcional'],
			description: 'Tipo de mandatory',
			table: {
				type: { summary: 'obligatorio | opcional' },
				defaultValue: { summary: 'obligatorio' },
			},
		},
		leftIcon: {
			control: { type: 'text' },
			description: 'Icono izquierdo (nombre FontAwesome sin prefijo)',
		},
		rightIcon: {
			control: { type: 'text' },
			description: 'Icono derecho (nombre FontAwesome sin prefijo)',
		},
		value: {
			control: { type: 'text' },
			description: 'Valor inicial del input',
		},
		selectOptions: {
			control: { type: 'object' },
			description: 'Opciones para SELECT',
			table: {
				type: { summary: 'SelectOption[]' },
			},
		},
		autocompleteOptions: {
			control: { type: 'object' },
			description: 'Opciones para AUTOCOMPLETE',
			table: {
				type: { summary: 'AutocompleteOption[]' },
			},
		},
	},
};

export default meta;
type Story = StoryObj<InputOptions>;

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
		containerId: 'input-implementation-container',
		label: 'Nombre',
		placeholder: 'Escribe tu nombre',
		type: 'text',
		size: 'md',
		state: 'default',
		showLabel: true,
		showHelper: false,
		showCounter: false,
		value: '',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="input-implementation-container"></div>

// 2. Crear input (tipo text - ejemplo básico)
window.UBITS.Input.create({
  containerId: 'input-implementation-container',
  label: 'Nombre',
  placeholder: 'Escribe tu nombre',
  type: 'text',
  size: 'md',
  state: 'default',
  showLabel: true,
  showHelper: false,
  showCounter: false,
  value: ''
});

// 3. Ejemplo con tipo calendar (requiere componente Calendar)
window.UBITS.Input.create({
  containerId: 'input-calendar-container',
  label: 'Fecha',
  placeholder: 'Selecciona una fecha',
  type: 'calendar',
  size: 'md',
  state: 'default',
  showLabel: true
});

// 4. Ejemplo con tipo select (requiere selectOptions)
window.UBITS.Input.create({
  containerId: 'input-select-container',
  label: 'País',
  placeholder: 'Selecciona un país',
  type: 'select',
  size: 'md',
  selectOptions: [
    { value: 'co', text: 'Colombia' },
    { value: 'mx', text: 'México' },
    { value: 'ar', text: 'Argentina' }
  ]
});

// 5. Ejemplo con tipo autocomplete (requiere autocompleteOptions)
window.UBITS.Input.create({
  containerId: 'input-autocomplete-container',
  label: 'Ciudad',
  placeholder: 'Busca una ciudad',
  type: 'autocomplete',
  size: 'md',
  autocompleteOptions: [
    { value: 'bogota', text: 'Bogotá' },
    { value: 'medellin', text: 'Medellín' },
    { value: 'cali', text: 'Cali' }
  ]
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-input');
		container.setAttribute('data-ubits-component', 'Input');
		container.style.padding = '20px';
		container.style.maxWidth = '400px';

		// Crear contenedor para el input
		const inputContainer = document.createElement('div');
		inputContainer.id = args.containerId;
		inputContainer.style.position = 'relative';
		container.appendChild(inputContainer);

		// Crear input
		const inputInstance = createInput(args);

		if (inputInstance) {
			// El input ya está renderizado en inputContainer
		}

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		containerId: 'input-storybook-container',
		label: 'Label',
		placeholder: 'Placeholder',
		helperText: '',
		type: 'text',
		size: 'md',
		state: 'default',
		showLabel: true,
		showHelper: false,
		showCounter: false,
		maxLength: 50,
		mandatory: false,
		mandatoryType: 'obligatorio',
		leftIcon: undefined,
		rightIcon: undefined,
		value: '',
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '20px';
		container.style.maxWidth = '400px';

		const inputContainer = document.createElement('div');
		inputContainer.id = args.containerId;
		inputContainer.style.position = 'relative';
		container.appendChild(inputContainer);

		const inputInstance = createInput(args);

		return container;
	},
};
