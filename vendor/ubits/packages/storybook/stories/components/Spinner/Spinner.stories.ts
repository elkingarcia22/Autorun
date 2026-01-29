import type { Meta, StoryObj } from '@storybook/html';
import { renderSpinner, createSpinner } from '../../../../components/spinner/src/SpinnerProvider';
import type { SpinnerOptions } from '../../../../components/spinner/src/types/SpinnerOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/spinner/src/styles/spinner.css';

/**
 * Spinner Component Stories
 *
 * Componente Spinner/Loader UBITS para mostrar estados de carga.
 * Soporta múltiples tamaños, variantes de color y puede mostrarse con o sin etiqueta.
 */
const meta = {
	title: 'Básicos/Spinner',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Componente Spinner/Loader UBITS para mostrar estados de carga. Soporta múltiples tamaños, variantes de color y puede mostrarse con o sin etiqueta.',
			},
		},
		// ⭐ CONTRATO UBITS para Autorun
		ubits: createUBITSContract({
			componentId: '🧩-ux-spinner',
			api: {
				create: 'window.UBITS.Spinner.create',
				tag: '<ubits-spinner>',
			},
			dependsOn: {
				required: [], // Spinner no requiere otros componentes UBITS
				optional: [], // No tiene dependencias opcionales
			},
			internals: [], // Spinner no tiene componentes internos privados
			slots: {}, // Spinner no tiene slots
			tokensUsed: [
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-feedback-accent-primary',
				'--modifiers-normal-color-light-feedback-accent-secondary',
				'--modifiers-normal-color-light-feedback-accent-success',
				'--modifiers-normal-color-light-feedback-accent-warning',
				'--modifiers-normal-color-light-feedback-accent-error',
				'--modifiers-normal-color-light-feedback-accent-info',
				'--font-family-noto-sans-font-family',
				'--modifiers-normal-body-xs-regular-fontsize',
				'--modifiers-normal-body-xs-regular-lineheight',
				'--modifiers-normal-body-sm-regular-fontsize',
				'--modifiers-normal-body-sm-regular-lineheight',
				'--modifiers-normal-body-md-regular-fontsize',
				'--modifiers-normal-body-md-regular-lineheight',
				'--p-spacing-mode-1-sm',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: [], // Spinner no tiene props requeridas (todos son opcionales)
			},
		}),
	},
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: 'Tamaño del spinner',
			table: {
				defaultValue: { summary: 'md' },
				type: { summary: 'xs | sm | md | lg | xl' },
			},
		},
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
			description: 'Variante de color del spinner',
			table: {
				defaultValue: { summary: 'primary' },
				type: { summary: 'primary | secondary | success | warning | error | info' },
			},
		},
		animated: {
			control: { type: 'boolean' },
			description: 'Si el spinner está animado',
			table: {
				defaultValue: { summary: 'true' },
			},
		},
		label: {
			control: { type: 'text' },
			description: 'Texto a mostrar debajo del spinner (opcional)',
			table: {
				type: { summary: 'string' },
			},
		},
		fullScreen: {
			control: { type: 'boolean' },
			description: 'Si el spinner debe ocupar toda la pantalla (centrado)',
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clases CSS adicionales',
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
} satisfies Meta<SpinnerOptions>;

export default meta;
type Story = StoryObj<SpinnerOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		size: 'md',
		variant: 'primary',
		animated: true,
		label: '',
		fullScreen: false,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// Opción 1: Usar createSpinner (retorna elemento)
const spinnerElement = window.UBITS.Spinner.create({
  size: 'md',
  variant: 'primary',
  animated: true,
  label: 'Cargando...',
  fullScreen: false
});
document.getElementById('container').appendChild(spinnerElement);

// Opción 2: Usar renderSpinner (retorna HTML string)
const spinnerHTML = window.UBITS.Spinner.render({
  size: 'md',
  variant: 'primary',
  animated: true,
  label: 'Cargando...',
  fullScreen: false
});
document.getElementById('container').innerHTML = spinnerHTML;`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-spinner');
		container.setAttribute('data-ubits-component', 'Spinner');
		container.style.padding = '40px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		container.style.borderRadius = '8px';
		container.style.width = '100%';
		container.style.minHeight = '300px';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';
		container.style.boxSizing = 'border-box';

		// Crear Spinner
		try {
			const spinnerElement = createSpinner({
				size: args.size || 'md',
				variant: args.variant || 'primary',
				animated: args.animated !== undefined ? args.animated : true,
				label: args.label,
				fullScreen: args.fullScreen || false,
				className: args.className,
				style: args.style,
			});
			container.appendChild(spinnerElement);
		} catch (error) {
			console.error('Error creando Spinner:', error);
			container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		return container;
	},
};

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
	args: {
		size: 'md',
		variant: 'primary',
		animated: true,
		label: '',
		fullScreen: false,
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.padding = '40px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		container.style.borderRadius = '8px';
		container.style.width = '100%';
		container.style.minHeight = '300px';
		container.style.boxSizing = 'border-box';

		// Contenedor de preview
		const preview = document.createElement('div');
		preview.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		preview.style.padding = '48px';
		preview.style.borderRadius = '8px';
		preview.style.border = 'none';
		preview.style.marginBottom = '24px';
		preview.style.minHeight = '200px';
		preview.style.display = 'flex';
		preview.style.alignItems = 'center';
		preview.style.justifyContent = 'center';
		preview.style.boxSizing = 'border-box';

		// Renderizar el spinner
		const spinnerHTML = renderSpinner(args);
		preview.innerHTML = spinnerHTML;

		container.appendChild(preview);
		return container;
	},
};
