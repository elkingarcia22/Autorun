import type { Meta, StoryObj } from '@storybook/html';
import { renderButtonAI, createButtonAI } from '../../../../components/button-ai/src/ButtonAIProvider';
import type { ButtonAIOptions } from '../../../../components/button-ai/src/types/ButtonAIOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/button-ai/src/styles/button-ai.css';

const meta: Meta<ButtonAIOptions> = {
	title: 'Básicos/ButtonAI',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Componente Button AI UBITS con estilo redondeado y gradación. Basado en Button de UBITS pero con bordes más redondeados (pill shape) y gradientes. Solo incluye variantes primary y secondary.',
			},
		},
		ubits: createUBITSContract({
			componentId: '🧩-ux-button-ai',
			api: {
				create: 'createButtonAI', // Función importada directamente
				render: 'renderButtonAI', // Función importada directamente
			},
			dependsOn: {
				required: [],
				optional: [],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-active',
				'--modifiers-normal-color-light-bg-disabled',
				'--modifiers-normal-color-light-fg-bold',
				'--modifiers-normal-color-light-fg-on-disabled',
				'--modifiers-normal-color-light-border-disabled',
				'--modifiers-normal-color-light-accent-brand',
				'--modifiers-normal-ai-button-primary-color-bg',
				'--modifiers-normal-ai-button-color-light-secondary-accent-gradient-end',
				'--modifiers-normal-button-color-light-brand-primary-bg-default',
				'--modifiers-normal-button-color-light-brand-primary-bg-hover',
				'--modifiers-normal-button-color-light-brand-primary-bg-pressed',
				'--modifiers-static-color-light-accent-brand',
				'--modifiers-normal-body-md-regular-fontsize',
				'--modifiers-normal-body-md-regular-lineheight',
				'--modifiers-normal-body-xs-regular-fontsize',
				'--modifiers-normal-body-xs-regular-lineheight',
				'--font-family-noto-sans-font-family',
				'--weight-semibold',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: [],
			},
		}),
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary'],
			description: 'Variante del botón AI',
			table: {
				type: { summary: 'primary | secondary' },
				defaultValue: { summary: 'primary' },
				category: 'Apariencia',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: 'Tamaño del botón',
			table: {
				type: { summary: 'xs | sm | md | lg | xl' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		text: {
			control: { type: 'text' },
			description: 'Texto del botón',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Button text' },
				category: 'Contenido',
			},
		},
		icon: {
			control: { type: 'text' },
			description: 'Nombre del icono FontAwesome (sin prefijo fa-)',
			table: {
				type: { summary: 'string' },
				example: { summary: 'sparkles, check, plus, etc.' },
				category: 'Contenido',
			},
		},
		iconStyle: {
			control: { type: 'select' },
			options: ['regular', 'solid'],
			description: 'Estilo del icono FontAwesome',
			table: {
				type: { summary: 'regular | solid' },
				defaultValue: { summary: 'regular' },
				category: 'Contenido',
			},
		},
		iconOnly: {
			control: { type: 'boolean' },
			description: 'Mostrar solo el icono, sin texto',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Deshabilitar el botón',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		badge: {
			control: { type: 'boolean' },
			description: 'Mostrar badge de notificación',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		active: {
			control: { type: 'boolean' },
			description: 'Modificador active/outline',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Estado',
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Clase CSS adicional',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
			},
		},
		onClick: {
			control: false,
			description: 'Handler de click',
			table: {
				type: { summary: '(event: MouseEvent) => void' },
				category: 'Eventos',
			},
		},
	},
};

export default meta;
type Story = StoryObj<ButtonAIOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		variant: 'primary',
		size: 'md',
		text: 'AI button',
		icon: 'sparkles',
		iconStyle: 'regular',
		iconOnly: false,
		disabled: false,
		badge: false,
		active: false,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Importar funciones (si usas módulos)
// import { createButtonAI, renderButtonAI } from '@ubits/button-ai';

// 2. Crear ButtonAI
const buttonAIElement = createButtonAI({
  variant: 'primary', // 'primary' | 'secondary'
  size: 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  text: 'AI button',
  icon: 'sparkles', // Nombre FontAwesome sin prefijo fa-
  iconStyle: 'regular', // 'regular' | 'solid'
  iconOnly: false, // Mostrar solo icono sin texto
  disabled: false,
  badge: false, // Mostrar badge de notificación
  active: false, // Modificador active/outline
  onClick: (event) => {
    console.log('Button AI clicked');
  }
});

// 3. Insertar en el DOM
const container = document.getElementById('button-ai-container');
if (container) {
  container.appendChild(buttonAIElement);
}

// Nota: createButtonAI retorna HTMLButtonElement | null

// Alternativa: Usar renderButtonAI para obtener HTML string
const buttonAIHTML = renderButtonAI({
  variant: 'primary',
  size: 'md',
  text: 'AI button',
  icon: 'sparkles',
  iconStyle: 'regular',
  iconOnly: false
});

// Insertar HTML
const container = document.getElementById('button-ai-container');
if (container) {
  container.innerHTML = buttonAIHTML;
  
  // Agregar event listener manualmente si es necesario
  const buttonElement = container.querySelector('.ubits-button-ai');
  if (buttonElement && onClick) {
    buttonElement.addEventListener('click', onClick);
  }
}`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-button-ai');
		container.setAttribute('data-ubits-component', 'ButtonAI');
		container.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      min-height: 200px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
    `;

		requestAnimationFrame(() => {
			try {
				const button = createButtonAI({
					...args,
					onClick: args.onClick || (() => {
						console.log('Button AI clicked');
					}),
				});

				if (button) {
					container.appendChild(button);
				} else {
					// Fallback: usar renderButtonAI
					const buttonHTML = renderButtonAI(args);
					container.innerHTML = buttonHTML;
				}
			} catch (error) {
				console.error('Error creando ButtonAI:', error);
				const errorDiv = document.createElement('div');
				errorDiv.textContent = `Error: ${error}`;
				errorDiv.style.color = 'red';
				container.appendChild(errorDiv);
			}
		});

		return container;
	},
};

export const Default: Story = {
	args: {
		variant: 'primary',
		size: 'md',
		text: 'AI button',
		icon: 'sparkles',
		iconStyle: 'regular',
		iconOnly: false,
		disabled: false,
		badge: false,
		active: false,
	},
	render: (args) => {
		const container = document.createElement('div');
		container.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      min-height: 200px;
      background: var(--modifiers-normal-color-light-bg-2, #f9fafb);
      border-radius: 8px;
    `;

		requestAnimationFrame(() => {
			try {
				const button = createButtonAI({
					...args,
					onClick: (e) => {
						// Button AI clicked
					},
				});

				if (button) {
					container.appendChild(button);
				}
			} catch (error) {
				console.error('Error creating ButtonAI:', error);
				container.innerHTML = `<div style="color: var(--modifiers-normal-color-light-feedback-fg-error-subtle-default); padding: 16px;">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
			}
		});

		return container;
	},
};
