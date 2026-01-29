import type { Meta, StoryObj } from '@storybook/html';
import { createHeaderSection } from '../../../../components/header-section/src/HeaderSectionProvider';
import type {
	HeaderSectionOptions,
	HeaderSectionAction,
} from '../../../../components/header-section/src/types/HeaderSectionOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/button-ai/src/styles/button-ai.css';
import '../../../../components/list/src/styles/list.css';
import '../../../../components/breadcrumb/src/styles/breadcrumb.css';
import '../../../../components/header-section/src/styles/header-section.css';

/**
 * HeaderSection Component Stories
 *
 * Componente de encabezado de sección con título y acciones.
 * Incluye título (heading h2), botón de información con tooltip (sm),
 * y acciones (botones md). Todo es apagable/prendible con controladores.
 */
const meta = {
	title: 'Layout/HeaderSection',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Componente HeaderSection UBITS para encabezados de sección con título (heading h2, fg-1-high), botón de información con tooltip (sm), y acciones (botones md). Todos los elementos son apagables/prendibles con controladores.',
			},
		},
		// ⭐ CONTRATO UBITS para Autorun
		ubits: createUBITSContract({
			componentId: '🧩-ux-header-section',
			api: {
				create: 'window.UBITS.HeaderSection.create',
				tag: '<ubits-header-section>',
			},
			dependsOn: {
				required: ['🧩-ux-button'], // HeaderSection requiere Button para todas las acciones
				optional: [
					'🧩-ux-button-ai', // Botón AI opcional
					'🧩-ux-status-tag', // Status tag opcional
					'🧩-ux-tooltip', // Tooltip para botón de información opcional
					'🧩-ux-list', // List para menú dropdown de opciones opcional
					'🧩-ux-breadcrumb', // Breadcrumb opcional
				],
			},
			internals: [], // HeaderSection no tiene componentes internos privados (usa componentes públicos)
			slots: {}, // HeaderSection no tiene slots
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-fg-1-low',
				'--modifiers-normal-color-light-fg-1-disabled',
				'--font-family-noto-sans-font-family',
				'--modifiers-normal-heading-h2-regular-fontsize',
				'--modifiers-normal-heading-h2-regular-lineheight',
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
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: [], // HeaderSection no tiene props requeridas (todos son opcionales)
			},
		}),
	},
	argTypes: {
		containerId: {
			control: false,
			description: 'ID del contenedor donde se renderizará el header (opcional)',
			table: {
				type: { summary: 'string' },
			},
		},
		title: {
			control: { type: 'text' },
			description: 'Título de la sección (heading h2)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' },
			},
		},
		showTitle: {
			control: { type: 'boolean' },
			description: 'Mostrar el título',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		showBackButton: {
			control: { type: 'boolean' },
			description: 'Mostrar el botón de atrás (secundario md)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		onBackClick: {
			control: false,
			description: 'Handler cuando se hace click en el botón de atrás',
			table: {
				type: { summary: '(event: MouseEvent) => void' },
			},
		},
		showInfoButton: {
			control: { type: 'boolean' },
			description: 'Mostrar el botón de información (sm, tertiary)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		infoTooltipText: {
			control: { type: 'text' },
			description: 'Texto del tooltip del botón de información',
			table: {
				type: { summary: 'string' },
			},
		},
		onInfoClick: {
			control: false,
			description: 'Handler cuando se hace click en el botón de información',
			table: {
				type: { summary: '(event: MouseEvent) => void' },
			},
		},
		showStatusTag: {
			control: { type: 'boolean' },
			description: 'Mostrar el status tag (al lado del botón de información)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		statusTag: {
			control: { type: 'object' },
			description: 'Opciones del status tag',
			table: {
				type: { summary: 'StatusTagOptions' },
			},
		},
		actions: {
			control: { type: 'object' },
			description: 'Acciones (botones) a mostrar en el header',
			table: {
				type: { summary: 'HeaderSectionAction[]' },
			},
		},
		showActions: {
			control: { type: 'boolean' },
			description: 'Mostrar las acciones',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
		},
		showOptionsButton: {
			control: { type: 'boolean' },
			description: 'Mostrar botón de opciones (secundario md, 3 puntos horizontales)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		optionsMenuItems: {
			control: { type: 'object' },
			description: 'Opciones del menú dropdown del botón de opciones',
			table: {
				type: { summary: 'HeaderSectionOptionsMenuItem[]' },
			},
		},
		showBreadcrumb: {
			control: { type: 'boolean' },
			description: 'Mostrar breadcrumb (debajo del header, 16px de distancia)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		breadcrumb: {
			control: { type: 'object' },
			description: 'Opciones del breadcrumb',
			table: {
				type: { summary: 'BreadcrumbOptions' },
			},
		},
	},
} satisfies Meta<HeaderSectionOptions>;

export default meta;
type Story = StoryObj<HeaderSectionOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		containerId: 'header-section-implementation-container',
		title: 'Name product',
		showTitle: true,
		showBackButton: true,
		showInfoButton: true,
		infoTooltipText: 'Información adicional sobre el producto',
		showStatusTag: true,
		statusTag: {
			label: 'Active',
			status: 'active',
			size: 'sm',
		},
		actions: [
			{
				id: 'action-1',
				text: 'Button text',
				variant: 'secondary',
				size: 'md',
			},
			{
				id: 'action-2',
				text: 'Primary action',
				variant: 'primary',
				size: 'md',
			},
		],
		showActions: true,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="header-section-implementation-container"></div>

// 2. Crear HeaderSection
window.UBITS.HeaderSection.create({
  containerId: 'header-section-implementation-container',
  title: 'Name product',
  showTitle: true,
  showBackButton: true,
  onBackClick: (event) => {
    console.log('Botón de atrás clickeado');
  },
  showInfoButton: true,
  infoTooltipText: 'Información adicional sobre el producto',
  onInfoClick: (event) => {
    console.log('Botón de información clickeado');
  },
  showStatusTag: true,
  statusTag: {
    label: 'Active',
    status: 'active',
    size: 'sm'
  },
  actions: [
    {
      id: 'action-1',
      text: 'Button text',
      variant: 'secondary',
      size: 'md',
      onClick: (event) => {
        console.log('Acción 1 clickeada');
      }
    },
    {
      id: 'action-2',
      text: 'Primary action',
      variant: 'primary',
      size: 'md',
      onClick: (event) => {
        console.log('Acción 2 clickeada');
      }
    }
  ],
  showActions: true,
  showBreadcrumb: false
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-header-section');
		container.setAttribute('data-ubits-component', 'HeaderSection');
		container.style.padding = '20px';
		container.style.width = '100%';
		container.style.maxWidth = '1200px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		container.style.borderRadius = '12px';
		container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';

		// Crear contenedor interno para el HeaderSection
		const headerContainer = document.createElement('div');
		headerContainer.id = args.containerId || 'header-section-implementation-container';
		headerContainer.style.width = '100%';
		container.appendChild(headerContainer);

		// Crear HeaderSection
		try {
			createHeaderSection({
				containerId: headerContainer.id,
				title: args.title,
				showTitle: args.showTitle,
				showBackButton: args.showBackButton,
				onBackClick: args.onBackClick,
				showInfoButton: args.showInfoButton,
				infoTooltipText: args.infoTooltipText,
				onInfoClick: args.onInfoClick,
				showStatusTag: args.showStatusTag,
				statusTag: args.statusTag,
				actions: args.actions,
				showActions: args.showActions,
				showOptionsButton: args.showOptionsButton,
				optionsMenuItems: args.optionsMenuItems,
				onOptionsClick: args.onOptionsClick,
				showSecondaryButton: args.showSecondaryButton,
				secondaryButtonText: args.secondaryButtonText,
				secondaryButtonIcon: args.secondaryButtonIcon,
				onSecondaryButtonClick: args.onSecondaryButtonClick,
				showBreadcrumb: args.showBreadcrumb,
				breadcrumb: args.breadcrumb,
				className: args.className,
			});
		} catch (error) {
			console.error('Error creando HeaderSection:', error);
			headerContainer.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		return container;
	},
};

/**
 * Story por defecto con todos los controles
 */
export const Default: Story = {
	args: {
		containerId: 'header-section-story-container',
		title: 'Name product',
		showTitle: true,
		showBackButton: true,
		showInfoButton: true,
		infoTooltipText: 'Información adicional sobre el producto',
		showStatusTag: true,
		statusTag: {
			label: 'Active',
			status: 'active',
			size: 'sm',
		},
		actions: [
			{
				id: 'action-1',
				text: 'Button text',
				variant: 'secondary',
				size: 'md',
			},
			{
				id: 'action-2',
				text: 'Primary action',
				variant: 'primary',
				size: 'md',
			},
		],
		showActions: true,
		showBreadcrumb: false,
	},
	render: (args) => {
		// Wrapper principal
		const wrapper = document.createElement('div');
		wrapper.style.cssText = `
      width: 100%;
      max-width: 1200px;
      padding: 24px;
      background: var(--modifiers-normal-color-light-bg-1);
      border-radius: 12px;
      border: 1px solid var(--modifiers-normal-color-light-border-1);
    `;

		// Contenedor para el HeaderSection
		const container = document.createElement('div');
		container.id = args.containerId || 'header-section-story-container';
		container.style.cssText = `
      width: 100%;
      margin-bottom: 24px;
    `;

		wrapper.appendChild(container);

		// Crear HeaderSection
		try {
			createHeaderSection({
				containerId: container.id,
				title: args.title,
				showTitle: args.showTitle,
				showBackButton: args.showBackButton,
				onBackClick: (event) => {
					console.log('Botón de atrás clickeado');
				},
				showInfoButton: args.showInfoButton,
				infoTooltipText: args.infoTooltipText,
				onInfoClick: (event) => {
					console.log('Botón de información clickeado');
				},
				showStatusTag: args.showStatusTag,
				statusTag: args.statusTag,
				actions: args.actions,
				showActions: args.showActions,
				showOptionsButton: args.showOptionsButton,
				optionsMenuItems: args.optionsMenuItems,
				onOptionsClick: args.onOptionsClick,
				showSecondaryButton: args.showSecondaryButton,
				secondaryButtonText: args.secondaryButtonText,
				secondaryButtonIcon: args.secondaryButtonIcon,
				onSecondaryButtonClick: args.onSecondaryButtonClick,
				showBreadcrumb: args.showBreadcrumb,
				breadcrumb: args.breadcrumb,
				className: args.className,
			});
		} catch (error) {
			console.error('Error creando HeaderSection:', error);
			container.innerHTML = `<p style="color: var(--modifiers-normal-color-light-feedback-border-error); padding: 16px;">Error: ${error}</p>`;
		}

		return wrapper;
	},
};
