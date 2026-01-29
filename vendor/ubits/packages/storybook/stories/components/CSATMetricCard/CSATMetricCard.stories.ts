import type { Meta, StoryObj } from '@storybook/html';
import {
	renderCSATMetricCard,
	createCSATMetricCard,
} from '../../../../components/csat-metric-card/src/CSATMetricCardProvider';
import type { CSATMetricCardOptions } from '../../../../components/csat-metric-card/src/types/CSATMetricCardOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/csat-metric-card/src/styles/csat-metric-card.css';
import '../../../../components/button/src/styles/button.css';

const meta: Meta<CSATMetricCardOptions> = {
	title: 'Charts/CSAT Metric Card',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente CSATMetricCard UBITS para mostrar métricas CSAT (Customer Satisfaction) con caritas. Incluye título, estadísticas (respuestas y promedio), gráfico de 5 caritas con textos. Usa tokens UBITS para colores, tipografía y espaciado.',
			},
		},
		ubits: createUBITSContract({
			componentId: '🧩-ux-csat-metric-card',
			api: {
				create: 'createCSATMetricCard', // Función importada directamente, requiere containerId
				render: 'renderCSATMetricCard', // Función importada directamente
			},
			dependsOn: {
				required: [],
				optional: [
					'🧩-ux-button', // Botones de información y acción
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
				'--ubits-border-radius-sm',
				'--font-family-noto-sans-font-family',
				'--weight-regular',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['title', 'totalResponses', 'average', 'score'],
			},
		}),
	},
	argTypes: {
		title: {
			control: { type: 'text' },
			description: 'Título de la métrica',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Califica el producto' },
				category: 'Contenido',
			},
		},
		totalResponses: {
			control: { type: 'number', min: 0, step: 1 },
			description: 'Número total de respuestas',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '0' },
				category: 'Contenido',
			},
		},
		responsesLabel: {
			control: { type: 'text' },
			description: 'Etiqueta para las respuestas',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'respuestas' },
				category: 'Contenido',
			},
		},
		average: {
			control: { type: 'number', min: 0, max: 5, step: 0.01 },
			description: 'Promedio de calificación (0-5)',
			table: {
				type: { summary: 'number (0-5)' },
				defaultValue: { summary: '0' },
				category: 'Contenido',
			},
		},
		averageLabel: {
			control: { type: 'text' },
			description: 'Etiqueta para el promedio',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Promedio:' },
				category: 'Contenido',
			},
		},
		score: {
			control: { type: 'number', min: 0, max: 5, step: 0.5 },
			description: 'Score actual (0-5) para mostrar en las caritas',
			table: {
				type: { summary: 'number (0-5)' },
				defaultValue: { summary: '0' },
				category: 'Contenido',
			},
		},
		titleIcon: {
			control: { type: 'text' },
			description: 'Nombre del icono FontAwesome para el título (sin prefijo fa-)',
			table: {
				type: { summary: 'string' },
				example: { summary: 'star, chart-line, thumbs-up, etc.' },
				category: 'Contenido',
			},
		},
		titleIconStyle: {
			control: { type: 'select' },
			options: ['regular', 'solid'],
			description: 'Estilo del icono del título',
			table: {
				type: { summary: 'regular | solid' },
				defaultValue: { summary: 'regular' },
				category: 'Contenido',
			},
		},
		titleIconColor: {
			control: { type: 'text' },
			description:
				'Color del icono del título (puede usar tokens UBITS como var(--modifiers-normal-color-light-fg-2-medium))',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
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
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
			description: 'Tamaño de la tarjeta',
			table: {
				type: { summary: 'sm | md | lg' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
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
	},
};

export default meta;
type Story = StoryObj<CSATMetricCardOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		title: 'Califica el producto',
		totalResponses: 7,
		responsesLabel: 'respuestas',
		average: 4.0,
		averageLabel: 'Promedio:',
		score: 3,
		showInfoIcon: true,
		showActionButton: true,
		size: 'md',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Importar funciones (si usas módulos)
// import { createCSATMetricCard, renderCSATMetricCard } from '@ubits/csat-metric-card';

// 2. Crear contenedor HTML
<div id="csat-metric-card-container"></div>

// 3. Crear CSATMetricCard
const csatMetricCardElement = createCSATMetricCard({
  containerId: 'csat-metric-card-container', // ⚠️ REQUERIDO para createCSATMetricCard
  title: 'Califica el producto',
  totalResponses: 7,
  responsesLabel: 'respuestas',
  average: 4.0, // Promedio de calificación (0-5)
  averageLabel: 'Promedio:',
  score: 3, // Score actual (0-5) para mostrar en las caritas
  titleIcon: 'star', // Opcional, nombre FontAwesome sin prefijo fa-
  titleIconStyle: 'regular', // 'regular' | 'solid'
  titleIconColor: 'var(--modifiers-normal-color-light-fg-2-medium)', // Opcional, token UBITS
  showInfoIcon: true, // Mostrar icono de información
  showActionButton: true, // Mostrar botón de acción
  size: 'md', // 'sm' | 'md' | 'lg'
  onClick: (event) => {
    console.log('Card clickeada');
  }
});

// Nota: createCSATMetricCard retorna HTMLElement | null
// Requiere containerId y el contenedor debe existir en el DOM

// Alternativa: Usar renderCSATMetricCard para obtener HTML string
const csatMetricCardHTML = renderCSATMetricCard({
  title: 'Califica el producto',
  totalResponses: 7,
  responsesLabel: 'respuestas',
  average: 4.0,
  averageLabel: 'Promedio:',
  score: 3,
  showInfoIcon: true,
  showActionButton: true,
  size: 'md'
});

// Insertar HTML
const container = document.getElementById('csat-metric-card-container');
if (container) {
  container.innerHTML = csatMetricCardHTML;
  
  // Agregar event listener manualmente si es necesario
  const cardElement = container.querySelector('.ubits-csat-metric-card');
  if (cardElement && onClick) {
    cardElement.addEventListener('click', onClick);
  }
}`,
			},
		},
	},
	render: (args) => {
		// Crear contenedor
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-csat-metric-card');
		container.setAttribute('data-ubits-component', 'CSATMetricCard');
		container.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 48px;
      background: var(--modifiers-normal-color-light-bg-2);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      border-radius: 8px;
      min-height: 200px;
    `;

		// Crear wrapper para la card (max-width 400px)
		const wrapper = document.createElement('div');
		wrapper.style.maxWidth = '400px';
		wrapper.style.width = '100%';

		// Crear contenedor para la card
		const cardContainer = document.createElement('div');
		cardContainer.id = `csat-metric-card-container-${Date.now()}`;

		// Crear card usando createCSATMetricCard
		try {
			const cardElement = createCSATMetricCard({
				containerId: cardContainer.id,
				...args,
			});

			if (cardElement) {
				wrapper.appendChild(cardContainer);
			} else {
				// Fallback: usar renderCSATMetricCard
				const cardHTML = renderCSATMetricCard(args);
				cardContainer.innerHTML = cardHTML;
				wrapper.appendChild(cardContainer);
			}
		} catch (error) {
			console.error('Error creando CSATMetricCard:', error);
			// Fallback: usar renderCSATMetricCard
			const cardHTML = renderCSATMetricCard(args);
			cardContainer.innerHTML = cardHTML;
			wrapper.appendChild(cardContainer);
		}

		container.appendChild(wrapper);
		return container;
	},
};

export const Default: Story = {
	args: {
		title: 'Califica el producto',
		totalResponses: 7,
		responsesLabel: 'respuestas',
		average: 4.0,
		averageLabel: 'Promedio:',
		score: 3,
		showInfoIcon: true,
		showActionButton: true,
		size: 'md',
	},
	render: (args) => {
		// Crear contenedor
		const container = document.createElement('div');
		container.style.display = 'flex';
		container.style.justifyContent = 'center';
		container.style.alignItems = 'flex-start';
		container.style.padding = '48px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
		container.style.borderRadius = '8px';
		container.style.minHeight = '200px';

		// Crear wrapper para la card (max-width 400px)
		const wrapper = document.createElement('div');
		wrapper.style.maxWidth = '400px';
		wrapper.style.width = '100%';

		// Renderizar card
		const cardHTML = renderCSATMetricCard(args);
		wrapper.innerHTML = cardHTML;
		container.appendChild(wrapper);

		return container;
	},
};
