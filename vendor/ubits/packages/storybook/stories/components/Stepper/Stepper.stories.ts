import type { Meta, StoryObj } from '@storybook/html';
import { renderStepper, createStepper } from '../../../../components/stepper/src/StepperProvider';
import type {
	StepperOptions,
	StepperStep,
	StepperStepState,
	StepperOrientation,
} from '../../../../components/stepper/src/types/StepperOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/stepper/src/styles/stepper.css';

/**
 * Stepper Component Stories
 *
 * Componente para mostrar el progreso de un proceso multi-paso.
 * Soporta orientación horizontal y vertical, con estados: default, completado, activo, error y warning.
 */
const meta = {
	title: 'Layout/Stepper',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Componente Stepper UBITS para mostrar el progreso de un proceso multi-paso. Soporta orientación horizontal y vertical, con estados: default, completado, activo, error y warning. Cada paso puede tener número, título y descripción.',
			},
		},
		// ⭐ CONTRATO UBITS para Autorun
		ubits: createUBITSContract({
			componentId: '🧩-ux-stepper',
			api: {
				create: 'window.UBITS.Stepper.create',
				tag: '<ubits-stepper>',
			},
			dependsOn: {
				required: [], // Stepper no requiere otros componentes UBITS
				optional: [], // No tiene dependencias opcionales
			},
			internals: [], // Stepper no tiene componentes internos privados
			slots: {}, // Stepper no tiene slots
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
				'--radius-sm',
				'--radius-md',
				'--radius-lg',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['steps'],
			},
		}),
	},
	argTypes: {
		containerId: {
			control: false,
			description: 'ID del contenedor donde se insertará el stepper (opcional)',
			table: {
				type: { summary: 'string' },
			},
		},
		orientation: {
			control: { type: 'select' },
			options: ['horizontal', 'vertical'],
			description: 'Orientación del stepper',
			table: {
				type: { summary: 'horizontal | vertical' },
				defaultValue: { summary: 'horizontal' },
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg'],
			description: 'Tamaño del stepper',
			table: {
				type: { summary: 'xs | sm | md | lg' },
				defaultValue: { summary: 'md' },
			},
		},
		showTitle: {
			control: { type: 'boolean' },
			description: 'Mostrar títulos',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		showDescription: {
			control: { type: 'boolean' },
			description: 'Mostrar descripciones (texto complementario)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		steps: {
			control: { type: 'object' },
			description: 'Array de pasos del stepper (requerido)',
			table: {
				type: { summary: 'StepperStep[]' },
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clases CSS adicionales',
			table: {
				type: { summary: 'string' },
			},
		},
	},
} satisfies Meta<StepperOptions>;

export default meta;
type Story = StoryObj<StepperOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		containerId: 'stepper-implementation-container',
		orientation: 'horizontal',
		size: 'md',
		showTitle: true,
		showDescription: true,
		steps: [
			{
				number: 1,
				title: 'Step One',
				description: 'Desc for step one',
				state: 'completed',
			},
			{
				number: 2,
				title: 'Step Two',
				description: 'Desc for step two',
				state: 'active',
			},
			{
				number: 3,
				title: 'Step Three',
				description: 'Desc for step three',
				state: 'default',
			},
		],
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="stepper-implementation-container"></div>

// 2. Crear Stepper
const stepper = window.UBITS.Stepper.create({
  containerId: 'stepper-implementation-container',
  orientation: 'horizontal',
  size: 'md',
  showTitle: true,
  showDescription: true,
  steps: [
    {
      number: 1,
      title: 'Step One',
      description: 'Desc for step one',
      state: 'completed'
    },
    {
      number: 2,
      title: 'Step Two',
      description: 'Desc for step two',
      state: 'active'
    },
    {
      number: 3,
      title: 'Step Three',
      description: 'Desc for step three',
      state: 'default'
    }
  ]
});

// Nota: createStepper retorna un objeto con:
// - stepper.element: El elemento DOM del stepper
// - stepper.update(newOptions): Método para actualizar el stepper
// - stepper.destroy(): Método para destruir el stepper`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-stepper');
		container.setAttribute('data-ubits-component', 'Stepper');
		container.style.cssText = `
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      min-height: 200px;
    `;

		// Crear contenedor interno para el Stepper
		const stepperContainer = document.createElement('div');
		stepperContainer.id = args.containerId || 'stepper-implementation-container';
		stepperContainer.style.cssText = `
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    `;
		container.appendChild(stepperContainer);

		// Crear Stepper
		try {
			const stepper = createStepper({
				containerId: stepperContainer.id,
				orientation: args.orientation || 'horizontal',
				size: args.size || 'md',
				showTitle: args.showTitle !== undefined ? args.showTitle : true,
				showDescription: args.showDescription !== undefined ? args.showDescription : true,
				steps: args.steps || [],
				className: args.className,
			});
			// El stepper ya se insertó en el contenedor
		} catch (error) {
			console.error('Error creando Stepper:', error);
			stepperContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		return container;
	},
};

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
	args: {
		containerId: 'stepper-story-container',
		orientation: 'horizontal',
		size: 'md',
		showTitle: true,
		showDescription: true,
		steps: [
			{
				number: 1,
				title: 'Step One',
				description: 'Desc for step one',
				state: 'completed',
			},
			{
				number: 2,
				title: 'Step Two',
				description: 'Desc for step two',
				state: 'active',
			},
			{
				number: 3,
				title: 'Step Three',
				description: 'Desc for step three',
				state: 'default',
			},
		],
	},
	render: (args) => {
		// Crear contenedor
		const container = document.createElement('div');
		container.style.cssText = `
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      min-height: 200px;
    `;

		// Contenedor para el stepper
		const stepperContainer = document.createElement('div');
		stepperContainer.id = args.containerId || 'stepper-story-container';
		stepperContainer.style.cssText = `
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    `;

		// Crear Stepper
		try {
			const stepper = createStepper({
				containerId: stepperContainer.id,
				orientation: args.orientation || 'horizontal',
				size: args.size || 'md',
				showTitle: args.showTitle !== undefined ? args.showTitle : true,
				showDescription: args.showDescription !== undefined ? args.showDescription : true,
				steps: args.steps || [],
				className: args.className,
			});
			// El stepper ya se insertó en el contenedor
		} catch (error) {
			console.error('Error creando Stepper:', error);
			stepperContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		container.appendChild(stepperContainer);

		return container;
	},
};
