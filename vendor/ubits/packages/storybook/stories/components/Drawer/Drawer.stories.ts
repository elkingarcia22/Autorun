/**
 * Drawer Component Stories
 *
 * ⭐ CONTRATO COMPLETO PARA AUTORUN
 * Este archivo incluye el contrato `parameters.ubits` completo que Autorun necesita
 * para implementar el componente de manera determinística.
 */

import type { Meta, StoryObj } from '@storybook/html';
import { createDrawer } from '../../../../components/drawer/src/DrawerProvider';
import type { DrawerOptions } from '../../../../components/drawer/src/types/DrawerOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/drawer/src/styles/drawer.css';
import '../../../../components/button/src/styles/button.css';

const meta: Meta<DrawerOptions> = {
	title: 'Feedback/Drawer Navigation',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Drawer Navigation UBITS que se desliza desde la derecha de la pantalla. Ideal para formularios, filtros o vistas de detalle. Soporta diferentes anchos, un header con título y texto complementario, un body con contenido scrollable y un footer con botones de acción.',
			},
		},
		layout: 'fullscreen',
		// ⭐ CONTRATO UBITS PARA AUTORUN
		ubits: createUBITSContract({
			componentId: '⚙️-functional-drawer',
			api: {
				create: 'window.UBITS.Drawer.create',
				tag: '<ubits-drawer>',
			},
			dependsOn: {
				required: ['🧩-ux-button'], // Footer buttons son requeridos si se usan
				optional: [], // No hay componentes opcionales adicionales
			},
			internals: ['⚙️-functional-scroll', '⚙️-functional-overlay'], // Scrollbar y overlay son privados
			slots: {
				header: [], // Header es interno (título + botón cerrar)
				body: [], // Body es interno
				footer: ['🧩-ux-button'], // Footer buttons son dependsOn
			},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'rgba(', 'hsl(', 'hsla(', '#'],
				requiredProps: ['title'],
			},
		}),
	},
	args: {
		title: 'Crear dato demográfico',
		complementaryText: '',
		width: 40,
		bodyContent: '<p>Contenido del drawer</p>',
		footerButtons: undefined,
		closeOnOverlayClick: true,
		open: false,
	},
	argTypes: {
		title: {
			control: { type: 'text' },
			description: 'Título principal del drawer (requerido).',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		complementaryText: {
			control: { type: 'text' },
			description: 'Texto secundario opcional que aparece debajo del título.',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		width: {
			control: { type: 'select' },
			options: [100, 80, 60, 50, 40, 30],
			description: 'Ancho del drawer como porcentaje del viewport.',
			table: {
				type: { summary: '100 | 80 | 60 | 50 | 40 | 30' },
				defaultValue: { summary: 40 },
				category: 'Apariencia',
			},
		},
		bodyContent: {
			control: { type: 'text' },
			description: 'Contenido HTML del cuerpo del drawer.',
			table: {
				type: { summary: 'string | (() => string)' },
				category: 'Contenido',
			},
		},
		footerButtons: {
			control: { type: 'object' },
			description: 'Configuración de botones del footer.',
			table: {
				type: {
					summary: `{
  tertiary?: { label: string; onClick?: (event: MouseEvent) => void };
  secondary?: { label: string; onClick?: (event: MouseEvent) => void };
  primary?: { label: string; onClick?: (event: MouseEvent) => void };
}`,
				},
				category: 'Footer',
			},
		},
		closeOnOverlayClick: {
			control: { type: 'boolean' },
			description: 'Si el drawer se cierra al hacer clic fuera de él.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: true },
				category: 'Comportamiento',
			},
		},
		onClose: {
			action: 'closed',
			description: 'Callback que se ejecuta cuando el drawer se cierra.',
			table: {
				disable: true,
			},
		},
		open: {
			control: { type: 'boolean' },
			description: 'Si el drawer está abierto inicialmente.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
				category: 'Comportamiento',
			},
		},
	},
};

export default meta;
type Story = StoryObj<DrawerOptions>;

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
		title: 'Filtros',
		complementaryText: 'Aplica filtros para refinar los resultados',
		width: 40,
		bodyContent: '<p>Contenido del drawer con filtros</p>',
		footerButtons: {
			tertiary: {
				label: 'Limpiar',
				onClick: () => {
					console.log('Limpiar clickeado');
				},
			},
			primary: {
				label: 'Aplicar',
				onClick: () => {
					console.log('Aplicar clickeado');
				},
			},
		},
		closeOnOverlayClick: true,
		open: true,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `window.UBITS.Drawer.create({
  title: 'Filtros',
  complementaryText: 'Aplica filtros para refinar los resultados',
  width: 40,
  bodyContent: '<p>Contenido del drawer con filtros</p>',
  footerButtons: {
    tertiary: {
      label: 'Limpiar',
      onClick: () => {
        console.log('Limpiar clickeado');
      }
    },
    primary: {
      label: 'Aplicar',
      onClick: () => {
        console.log('Aplicar clickeado');
      }
    }
  },
  closeOnOverlayClick: true,
  open: true
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '⚙️-functional-drawer');
		container.setAttribute('data-ubits-component', 'Drawer');
		container.style.width = '100vw';
		container.style.height = '100vh';
		container.style.position = 'relative';
		container.style.overflow = 'hidden';
		container.style.background = 'var(--modifiers-normal-color-light-bg-2)';

		// Crear drawer directamente
		const drawerInstance = createDrawer(args);

		// El drawer se agrega al body, así que solo retornamos el contenedor
		// con un indicador de que el drawer está abierto
		const indicator = document.createElement('div');
		indicator.style.padding = '20px';
		indicator.style.color = 'var(--modifiers-normal-color-light-fg-1-high)';
		indicator.textContent = 'Drawer abierto (ver overlay)';
		container.appendChild(indicator);

		// Limpiar drawer cuando se desmonte
		const cleanup = () => {
			if (drawerInstance && drawerInstance.element) {
				drawerInstance.element.remove();
			}
		};

		// Agregar cleanup al contenedor para que Storybook lo limpie
		(container as any).__cleanup = cleanup;

		return container;
	},
};

// Story con todos los controles (para desarrollo)
export const Default: Story = {
	args: {
		title: 'Crear dato demográfico',
		complementaryText: '',
		width: 40,
		bodyContent: '<p>Contenido del drawer</p>',
		footerButtons: {
			tertiary: {
				label: 'Cancelar',
				onClick: () => {
					console.log('Tertiary clickeado');
				},
			},
			secondary: {
				label: 'Guardar',
				onClick: () => {
					console.log('Secondary clickeado');
				},
			},
			primary: {
				label: 'Aplicar',
				onClick: () => {
					console.log('Primary clickeado');
				},
			},
		},
		closeOnOverlayClick: true,
		open: false,
	},
	render: (args) => {
		const container = document.createElement('div');
		container.id = 'drawer-story-container';
		container.style.width = '100vw';
		container.style.height = '100vh';
		container.style.position = 'relative';
		container.style.overflow = 'hidden';
		container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		container.style.display = 'flex';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'center';

		const openButton = document.createElement('button');
		openButton.className = 'ubits-button ubits-button--primary ubits-button--md';
		openButton.innerHTML = '<span>Abrir Drawer</span>';
		openButton.style.width = 'auto';
		openButton.style.minWidth = 'auto';

		let drawerInstance: ReturnType<typeof createDrawer> | null = null;

		const handleOpenDrawer = () => {
			if (!drawerInstance) {
				drawerInstance = createDrawer({
					title: args.title,
					complementaryText: args.complementaryText,
					width: args.width,
					bodyContent: args.bodyContent,
					footerButtons: args.footerButtons,
					closeOnOverlayClick: args.closeOnOverlayClick,
					onClose: () => {
						if (args.onClose) {
							args.onClose();
						}
						if (drawerInstance && drawerInstance.element) {
							drawerInstance.element.remove();
						}
						drawerInstance = null;
						openButton.style.display = 'flex';
						openButton.style.visibility = 'visible';
					},
					open: true,
				});

				openButton.style.display = 'none';
				openButton.style.visibility = 'hidden';
			}
		};

		openButton.addEventListener('click', handleOpenDrawer);
		container.appendChild(openButton);

		return container;
	},
};
