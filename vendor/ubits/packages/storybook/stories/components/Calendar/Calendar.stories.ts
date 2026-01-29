import type { Meta, StoryObj } from '@storybook/html';
import { createCalendar } from '../../../../components/calendar/src/index';
import type { CalendarOptions } from '../../../../components/calendar/src/index';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos
import '../../../../components/calendar/src/styles/calendar.css';
import '../../../../components/button/src/styles/button.css';
import '../../../../components/input/src/styles/input.css';
import '../../../../components/list/src/styles/list.css';

/**
 * Calendar Component Stories
 *
 * Componente Calendar UBITS con selección única y por rango de fechas.
 * Usa tokens UBITS, componentes Button, Input y List para una experiencia consistente.
 */
const meta = {
	title: 'Formularios/Calendar',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'transparent',
			disable: true,
		},
		docs: {
			description: {
				component:
					'Componente Calendar UBITS con selección única y por rango de fechas. Usa tokens UBITS, componentes Button, Input y List para una experiencia consistente.',
			},
		},
		// ⭐ CONTRATO UBITS para Autorun
		ubits: createUBITSContract({
			componentId: '🧩-ux-calendar',
			api: {
				create: 'window.UBITS.Calendar.create',
				tag: '<ubits-calendar>',
			},
			dependsOn: {
				required: ['🧩-ux-button', '🧩-ux-input', '🧩-ux-list'], // Calendar requiere Button, Input y List
				optional: [], // No tiene dependencias opcionales adicionales
			},
			internals: [], // Calendar no tiene componentes internos privados (usa componentes públicos)
			slots: {}, // Calendar no tiene slots
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-fg-1-low',
				'--modifiers-normal-color-light-fg-1-disabled',
				'--modifiers-normal-color-light-feedback-bg-success',
				'--modifiers-normal-color-light-feedback-bg-warning',
				'--modifiers-normal-color-light-feedback-bg-error',
				'--modifiers-normal-color-light-feedback-border-success',
				'--modifiers-normal-color-light-feedback-border-warning',
				'--modifiers-normal-color-light-feedback-border-error',
				'--modifiers-normal-color-light-feedback-accent-info',
				'--font-family-noto-sans-font-family',
				'--modifiers-normal-body-sm-regular-fontsize',
				'--modifiers-normal-body-sm-regular-lineheight',
				'--modifiers-normal-body-md-regular-fontsize',
				'--modifiers-normal-body-md-regular-lineheight',
				'--weight-semibold',
				'--weight-medium',
				'--weight-regular',
				'--p-spacing-mode-1-xs',
				'--p-spacing-mode-1-sm',
				'--p-spacing-mode-1-md',
				'--p-spacing-mode-1-lg',
				'--radius-sm',
				'--radius-md',
				'--radius-lg',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: [], // Calendar no tiene props requeridas (todos son opcionales)
			},
		}),
	},
	argTypes: {
		mode: {
			control: { type: 'select' },
			options: ['single', 'range'],
			description: 'Modo de selección: single para fecha única, range para rango de fechas',
			table: {
				defaultValue: { summary: 'single' },
				type: { summary: 'single | range' },
			},
		},
		selectedDate: {
			control: { type: 'date' },
			description: 'Fecha seleccionada (modo single) o fecha de inicio (modo range)',
			table: {
				type: { summary: 'Date | null' },
			},
		},
		endDate: {
			control: { type: 'date' },
			description: 'Fecha de fin (solo para modo range)',
			table: {
				type: { summary: 'Date | null' },
			},
		},
		minDate: {
			control: { type: 'date' },
			description: 'Fecha mínima permitida',
			table: {
				type: { summary: 'Date | null' },
			},
		},
		maxDate: {
			control: { type: 'date' },
			description: 'Fecha máxima permitida',
			table: {
				type: { summary: 'Date | null' },
			},
		},
		initialDate: {
			control: { type: 'date' },
			description: 'Fecha inicial a mostrar (por defecto: fecha actual)',
			table: {
				type: { summary: 'Date' },
			},
		},
		onDateSelect: {
			control: false,
			description: 'Callback cuando se selecciona una fecha (modo single)',
			table: {
				type: { summary: '(date: Date) => void' },
			},
		},
		onRangeSelect: {
			control: false,
			description: 'Callback cuando se selecciona un rango (modo range)',
			table: {
				type: { summary: '(startDate: Date, endDate: Date) => void' },
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clase CSS adicional para el contenedor',
			table: {
				type: { summary: 'string' },
			},
		},
		style: {
			control: { type: 'text' },
			description: 'Estilos inline adicionales',
			table: {
				type: { summary: 'string' },
			},
		},
	},
} satisfies Meta<CalendarOptions>;

export default meta;
type Story = StoryObj<CalendarOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		mode: 'single',
		selectedDate: null,
		endDate: null,
		minDate: null,
		maxDate: null,
		initialDate: new Date(),
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="calendar-implementation-container"></div>

// 2. Crear Calendar
const calendar = window.UBITS.Calendar.create({
  mode: 'single',
  selectedDate: null,
  endDate: null,
  minDate: null,
  maxDate: null,
  initialDate: new Date(),
  onDateSelect: (date) => {
    console.log('Fecha seleccionada:', date);
  },
  onRangeSelect: (startDate, endDate) => {
    console.log('Rango seleccionado:', startDate, endDate);
  }
});

// 3. Insertar el calendario en el contenedor
const container = document.getElementById('calendar-implementation-container');
if (container) {
  container.appendChild(calendar.element);
}

// Nota: createCalendar retorna un objeto con:
// - calendar.element: El elemento DOM del calendario
// - calendar.update(newOptions): Método para actualizar el calendario
// - calendar.destroy(): Método para destruir el calendario

// Ejemplo con modo range:
const calendarRange = window.UBITS.Calendar.create({
  mode: 'range',
  selectedDate: null,
  endDate: null,
  onRangeSelect: (startDate, endDate) => {
    console.log('Rango:', startDate, 'a', endDate);
  }
});
container.appendChild(calendarRange.element);`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-calendar');
		container.setAttribute('data-ubits-component', 'Calendar');
		container.style.cssText = `
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 500px;
    `;

		// Crear contenedor interno para el Calendar
		const calendarContainer = document.createElement('div');
		calendarContainer.id = 'calendar-implementation-container';
		calendarContainer.style.cssText = `
      width: 100%;
      max-width: 400px;
    `;
		container.appendChild(calendarContainer);

		// Crear Calendar
		try {
			const calendar = createCalendar({
				mode: args.mode || 'single',
				selectedDate: args.selectedDate,
				endDate: args.endDate,
				minDate: args.minDate,
				maxDate: args.maxDate,
				initialDate: args.initialDate || new Date(),
				onDateSelect: args.onDateSelect,
				onRangeSelect: args.onRangeSelect,
				className: args.className,
				style: args.style,
			});
			// Insertar el calendario en el contenedor
			calendarContainer.appendChild(calendar.element);
		} catch (error) {
			console.error('Error creando Calendar:', error);
			calendarContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		return container;
	},
};

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
	args: {
		mode: 'single',
		selectedDate: null,
		endDate: null,
		minDate: null,
		maxDate: null,
		initialDate: new Date(),
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.cssText = `
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 500px;
    `;

		// Contenedor para el Calendar
		const calendarContainer = document.createElement('div');
		calendarContainer.id = 'calendar-story-container';
		calendarContainer.style.cssText = `
      width: 100%;
      max-width: 400px;
    `;

		// Crear Calendar
		try {
			const calendar = createCalendar({
				mode: args.mode || 'single',
				selectedDate: args.selectedDate,
				endDate: args.endDate,
				minDate: args.minDate,
				maxDate: args.maxDate,
				initialDate: args.initialDate || new Date(),
				onDateSelect: (date) => {
					console.log('Fecha seleccionada:', date);
				},
				onRangeSelect: (startDate, endDate) => {
					console.log('Rango seleccionado:', startDate, 'a', endDate);
				},
				className: args.className,
				style: args.style,
			});
			// Insertar el calendario en el contenedor
			calendarContainer.appendChild(calendar.element);
		} catch (error) {
			console.error('Error creando Calendar:', error);
			calendarContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		container.appendChild(calendarContainer);

		return container;
	},
};
