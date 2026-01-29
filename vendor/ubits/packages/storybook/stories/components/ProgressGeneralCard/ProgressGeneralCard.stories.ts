import type { Meta, StoryObj } from '@storybook/html';
import {
	renderProgressGeneralCard,
	createProgressGeneralCard,
} from '../../../../components/progress-general-card/src/ProgressGeneralCardProvider';
import type {
	ProgressGeneralCardOptions,
	ProgressCategory,
} from '../../../../components/progress-general-card/src/types/ProgressGeneralCardOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/progress-general-card/src/styles/progress-general-card.css';
import '../../../../components/button/src/styles/button.css';

const meta: Meta<
	ProgressGeneralCardOptions & {
		category1Label?: string;
		category1Current?: number;
		category1Total?: number;
		category2Label?: string;
		category2Current?: number;
		category2Total?: number;
		category3Label?: string;
		category3Current?: number;
		category3Total?: number;
	}
> = {
	title: 'Charts/Circle Metric Card',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente ProgressGeneralCard UBITS para mostrar progreso general con indicador circular (donut chart) y categorías de progreso. Soporta layout vertical y horizontal, múltiples tamaños y controles completos para personalización. Usa tokens UBITS para colores, tipografía y espaciado.',
			},
		},
		ubits: createUBITSContract({
			componentId: '🧩-ux-progress-general-card',
			api: {
				create: 'createProgressGeneralCard', // Función importada directamente, requiere containerId
				render: 'renderProgressGeneralCard', // Función importada directamente
			},
			dependsOn: {
				required: [],
				optional: [
					'🧩-ux-button', // Botones de información y acción
					'🧩-ux-progress-bar', // Progress bars en las categorías
				],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-bg-3',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-2-medium',
				'--modifiers-normal-color-light-border-2',
				'--ubits-chart-color-bg-neutral-blue-base',
				'--ubits-spacing-xs',
				'--ubits-spacing-sm',
				'--ubits-spacing-md',
				'--ubits-spacing-lg',
				'--ubits-border-radius-sm',
				'--font-family-noto-sans-font-family',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['mainPercentage', 'categories'],
			},
		}),
	},
	argTypes: {
		title: {
			control: { type: 'text' },
			description: 'Título del componente',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Progreso general' },
				category: 'Contenido',
			},
		},
		mainPercentage: {
			control: { type: 'number', min: 0, max: 100, step: 1 },
			description: 'Porcentaje principal mostrado en el círculo',
			table: {
				type: { summary: 'number (0-100)' },
				defaultValue: { summary: '50' },
				category: 'Contenido',
			},
		},
		mainLabel: {
			control: { type: 'text' },
			description: 'Etiqueta del porcentaje principal (ej: "Ciclos")',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Ciclos' },
				category: 'Contenido',
			},
		},
		layout: {
			control: { type: 'select' },
			options: ['vertical', 'horizontal'],
			description: 'Layout del componente',
			table: {
				type: { summary: 'vertical | horizontal' },
				defaultValue: { summary: 'vertical' },
				category: 'Apariencia',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Tamaño del componente',
			table: {
				type: { summary: 'sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		showTitle: {
			control: { type: 'boolean' },
			description: 'Mostrar el título',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Visibilidad',
			},
		},
		showCircularProgress: {
			control: { type: 'boolean' },
			description: 'Mostrar el indicador circular',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Visibilidad',
			},
		},
		showCategories: {
			control: { type: 'boolean' },
			description: 'Mostrar las categorías',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
				category: 'Visibilidad',
			},
		},
		showInfoIcon: {
			control: { type: 'boolean' },
			description: 'Mostrar icono de información junto al título',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Visibilidad',
			},
		},
		showActionButton: {
			control: { type: 'boolean' },
			description: 'Mostrar botón de acción con flecha a la derecha en la esquina superior derecha',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Visibilidad',
			},
		},
		progressColor: {
			control: { type: 'text' },
			description: 'Color del progreso circular (token UBITS)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--ubits-chart-color-bg-neutral-blue-base)' },
				category: 'Estilo',
			},
		},
		circleBackgroundColor: {
			control: { type: 'text' },
			description: 'Color de fondo del círculo (token UBITS)',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--modifiers-normal-color-light-bg-3)' },
				category: 'Estilo',
			},
		},
		category1Label: {
			control: { type: 'text' },
			description: 'Etiqueta de la categoría 1',
			table: {
				category: 'Categorías',
			},
		},
		category1Current: {
			control: { type: 'number' },
			description: 'Valor actual de la categoría 1',
			table: {
				category: 'Categorías',
			},
		},
		category1Total: {
			control: { type: 'number' },
			description: 'Valor total de la categoría 1',
			table: {
				category: 'Categorías',
			},
		},
		category2Label: {
			control: { type: 'text' },
			description: 'Etiqueta de la categoría 2',
			table: {
				category: 'Categorías',
			},
		},
		category2Current: {
			control: { type: 'number' },
			description: 'Valor actual de la categoría 2',
			table: {
				category: 'Categorías',
			},
		},
		category2Total: {
			control: { type: 'number' },
			description: 'Valor total de la categoría 2',
			table: {
				category: 'Categorías',
			},
		},
		category3Label: {
			control: { type: 'text' },
			description: 'Etiqueta de la categoría 3',
			table: {
				category: 'Categorías',
			},
		},
		category3Current: {
			control: { type: 'number' },
			description: 'Valor actual de la categoría 3',
			table: {
				category: 'Categorías',
			},
		},
		category3Total: {
			control: { type: 'number' },
			description: 'Valor total de la categoría 3',
			table: {
				category: 'Categorías',
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
			description: 'Handler de click en la tarjeta',
			table: {
				type: { summary: '(event: MouseEvent) => void' },
				category: 'Eventos',
			},
		},
		onAction: {
			control: false,
			description: 'Handler de click en el botón de acción',
			table: {
				type: { summary: '(event: MouseEvent) => void' },
				category: 'Eventos',
			},
		},
	},
};

export default meta;
type Story = StoryObj<
	ProgressGeneralCardOptions & {
		category1Label?: string;
		category1Current?: number;
		category1Total?: number;
		category2Label?: string;
		category2Current?: number;
		category2Total?: number;
		category3Label?: string;
		category3Current?: number;
		category3Total?: number;
	}
>;

// Helper para construir las categorías desde los args
function buildCategories(args: Story['args']): ProgressCategory[] {
	if (!args) return [];

	const categories: ProgressCategory[] = [];

	if (args.category1Label !== undefined) {
		categories.push({
			label: args.category1Label || 'Área',
			current: args.category1Current ?? 3,
			total: args.category1Total ?? 20,
		});
	}

	if (args.category2Label !== undefined) {
		categories.push({
			label: args.category2Label || 'Equipo',
			current: args.category2Current ?? 8,
			total: args.category2Total ?? 50,
		});
	}

	if (args.category3Label !== undefined) {
		categories.push({
			label: args.category3Label || 'Propio',
			current: args.category3Current ?? 5,
			total: args.category3Total ?? 30,
		});
	}

	return categories;
}

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		title: 'Progreso general',
		mainPercentage: 50,
		mainLabel: 'Ciclos',
		layout: 'horizontal',
		size: 'md',
		showTitle: true,
		showCircularProgress: true,
		showCategories: true,
		showInfoIcon: true,
		showActionButton: true,
		progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)',
		circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
		category1Label: 'Área',
		category1Current: 3,
		category1Total: 20,
		category2Label: 'Equipo',
		category2Current: 8,
		category2Total: 50,
		category3Label: 'Propio',
		category3Current: 5,
		category3Total: 30,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Importar funciones (si usas módulos)
// import { createProgressGeneralCard, renderProgressGeneralCard } from '@ubits/progress-general-card';

// 2. Crear contenedor HTML
<div id="progress-general-card-container"></div>

// 3. Crear ProgressGeneralCard
const progressGeneralCardElement = createProgressGeneralCard({
  containerId: 'progress-general-card-container', // ⚠️ REQUERIDO para createProgressGeneralCard
  title: 'Progreso general',
  mainPercentage: 50, // Porcentaje principal (0-100)
  mainLabel: 'Ciclos', // Etiqueta del porcentaje principal
  categories: [
    {
      label: 'Área',
      current: 3,
      total: 20
    },
    {
      label: 'Equipo',
      current: 8,
      total: 50
    },
    {
      label: 'Propio',
      current: 5,
      total: 30
    }
  ],
  layout: 'horizontal', // 'vertical' | 'horizontal'
  size: 'md', // 'sm' | 'md' | 'lg'
  showTitle: true,
  showCircularProgress: true, // Indicador circular (donut chart)
  showCategories: true,
  showInfoIcon: true,
  showActionButton: true,
  progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)', // Token UBITS
  circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)', // Token UBITS
  onClick: (event) => {
    console.log('Card clickeada');
  },
  onAction: (event) => {
    console.log('Botón de acción clickeado');
  }
});

// Nota: createProgressGeneralCard retorna HTMLElement | null
// Requiere containerId y el contenedor debe existir en el DOM

// Alternativa: Usar renderProgressGeneralCard para obtener HTML string
const progressGeneralCardHTML = renderProgressGeneralCard({
  title: 'Progreso general',
  mainPercentage: 50,
  mainLabel: 'Ciclos',
  categories: [
    { label: 'Área', current: 3, total: 20 },
    { label: 'Equipo', current: 8, total: 50 },
    { label: 'Propio', current: 5, total: 30 }
  ],
  layout: 'horizontal',
  size: 'md',
  showTitle: true,
  showCircularProgress: true,
  showCategories: true
});

// Insertar HTML
const container = document.getElementById('progress-general-card-container');
if (container) {
  container.innerHTML = progressGeneralCardHTML;
  
  // Agregar event listeners manualmente si es necesario
  const cardElement = container.querySelector('.ubits-progress-general-card');
  if (cardElement && onClick) {
    cardElement.addEventListener('click', onClick);
  }
}`,
			},
		},
	},
	render: (args) => {
		// Construir las categorías desde los args
		const categories = buildCategories(args);

		// Construir las opciones del componente
		const options: ProgressGeneralCardOptions = {
			title: args.title || 'Progreso general',
			mainPercentage: args.mainPercentage ?? 50,
			mainLabel: args.mainLabel || 'Ciclos',
			categories,
			layout: args.layout || 'vertical',
			size: args.size || 'md',
			showTitle: args.showTitle !== undefined ? args.showTitle : true,
			showCircularProgress: args.showCircularProgress !== undefined ? args.showCircularProgress : true,
			showCategories: args.showCategories !== undefined ? args.showCategories : true,
			showInfoIcon: args.showInfoIcon !== undefined ? args.showInfoIcon : false,
			showActionButton: args.showActionButton !== undefined ? args.showActionButton : false,
			progressColor: args.progressColor || 'var(--ubits-chart-color-bg-neutral-blue-base)',
			circleBackgroundColor: args.circleBackgroundColor || 'var(--modifiers-normal-color-light-bg-3)',
			className: args.className,
			attributes: args.attributes,
			onClick: args.onClick,
			onAction: args.onAction,
		};

		// Crear contenedor
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-progress-general-card');
		container.setAttribute('data-ubits-component', 'ProgressGeneralCard');
		container.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 48px;
      background: var(--modifiers-normal-color-light-bg-2);
      border-radius: 8px;
      min-height: 400px;
    `;

		// Crear wrapper para la card
		const wrapper = document.createElement('div');
		// Ajustar ancho según el layout
		if (options.layout === 'horizontal') {
			wrapper.style.maxWidth = '800px';
			wrapper.style.width = '100%';
		} else {
			wrapper.style.maxWidth = '500px';
			wrapper.style.width = '100%';
		}

		// Crear contenedor para la card
		const cardContainer = document.createElement('div');
		cardContainer.id = `progress-general-card-container-${Date.now()}`;

		// Crear card usando createProgressGeneralCard
		try {
			const cardElement = createProgressGeneralCard({
				containerId: cardContainer.id,
				...options,
			});

			if (cardElement) {
				wrapper.appendChild(cardContainer);
			} else {
				// Fallback: usar renderProgressGeneralCard
				const cardHTML = renderProgressGeneralCard(options);
				cardContainer.innerHTML = cardHTML;
				wrapper.appendChild(cardContainer);
			}
		} catch (error) {
			console.error('Error creando ProgressGeneralCard:', error);
			// Fallback: usar renderProgressGeneralCard
			const cardHTML = renderProgressGeneralCard(options);
			cardContainer.innerHTML = cardHTML;
			wrapper.appendChild(cardContainer);
		}

		container.appendChild(wrapper);
		return container;
	},
};

export const Default: Story = {
	args: {
		title: 'Progreso general',
		mainPercentage: 50,
		mainLabel: 'Ciclos',
		layout: 'horizontal',
		size: 'md',
		showTitle: true,
		showCircularProgress: true,
		showCategories: true,
		showInfoIcon: true,
		showActionButton: true,
		progressColor: 'var(--ubits-chart-color-bg-neutral-blue-base)',
		circleBackgroundColor: 'var(--modifiers-normal-color-light-bg-3)',
		category1Label: 'Área',
		category1Current: 3,
		category1Total: 20,
		category2Label: 'Equipo',
		category2Current: 8,
		category2Total: 50,
		category3Label: 'Propio',
		category3Current: 5,
		category3Total: 30,
	},
	render: (args) => {
		// Construir las categorías desde los args
		const categories = buildCategories(args);

		// Construir las opciones del componente
		const options: ProgressGeneralCardOptions = {
			title: args.title,
			mainPercentage: args.mainPercentage ?? 50,
			mainLabel: args.mainLabel,
			categories,
			layout: args.layout,
			size: args.size,
			showTitle: args.showTitle,
			showCircularProgress: args.showCircularProgress,
			showCategories: args.showCategories,
			showInfoIcon: args.showInfoIcon,
			showActionButton: args.showActionButton,
			progressColor: args.progressColor,
			circleBackgroundColor: args.circleBackgroundColor,
		};

		// Crear contenedor
		const container = document.createElement('div');
		container.style.display = 'flex';
		container.style.justifyContent = 'center';
		container.style.alignItems = 'flex-start';
		container.style.padding = '48px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		container.style.borderRadius = '8px';
		container.style.minHeight = '400px';

		// Crear wrapper para la card
		const wrapper = document.createElement('div');
		// Ajustar ancho según el layout
		if (options.layout === 'horizontal') {
			wrapper.style.maxWidth = '800px';
			wrapper.style.width = '100%';
		} else {
			wrapper.style.maxWidth = '500px';
			wrapper.style.width = '100%';
		}

		// Renderizar card
		const cardHTML = renderProgressGeneralCard(options);
		wrapper.innerHTML = cardHTML;
		container.appendChild(wrapper);

		return container;
	},
};
