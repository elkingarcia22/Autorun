import type { Meta, StoryObj } from '@storybook/html';
import {
	renderScoreCardMetrics,
	createScoreCardMetrics,
} from '../../../../components/score-card-metrics/src/ScoreCardMetricsProvider';
import type { ScoreCardMetricsOptions } from '../../../../components/score-card-metrics/src/types/ScoreCardMetricsOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
import '../../../../components/score-card-metrics/src/styles/score-card-metrics.css';
import '../../../../components/button/src/styles/button.css';

const meta: Meta<ScoreCardMetricsOptions> = {
	title: 'Charts/Score Card Metrics',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente ScoreCardMetrics UBITS para mostrar métricas de calificación con estrellas. Incluye título, estadísticas (respuestas y promedio), gráfico de 5 estrellas, etiquetas y descripción. Usa tokens UBITS para colores, tipografía y espaciado.',
			},
		},
		ubits: createUBITSContract({
			componentId: '🧩-ux-score-card-metrics',
			api: {
				create: 'createScoreCardMetrics', // Función importada directamente, requiere containerId
				render: 'renderScoreCardMetrics', // Función importada directamente
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
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-border-2',
				'--modifiers-normal-color-light-feedback-chart-warning-bold',
				'--ubits-spacing-sm',
				'--ubits-spacing-md',
				'--ubits-spacing-lg',
				'--ubits-spacing-xl',
				'--ubits-spacing-5',
				'--ubits-spacing-6',
				'--ubits-border-radius-sm',
				'--font-family-noto-sans-font-family',
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
			description: 'Score actual (0-5) para mostrar en las estrellas',
			table: {
				type: { summary: 'number (0-5)' },
				defaultValue: { summary: '0' },
				category: 'Contenido',
			},
		},
		leftLabel: {
			control: { type: 'text' },
			description: 'Etiqueta izquierda del gráfico',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '0' },
				category: 'Contenido',
			},
		},
		rightLabel: {
			control: { type: 'text' },
			description: 'Etiqueta derecha del gráfico',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '5' },
				category: 'Contenido',
			},
		},
		chartDescription: {
			control: { type: 'text' },
			description: 'Texto descriptivo debajo del gráfico',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '0 a 5 del gráfico' },
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
type Story = StoryObj<ScoreCardMetricsOptions>;

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
		leftLabel: '0',
		rightLabel: '5',
		chartDescription: '0 a 5 del gráfico',
		showInfoIcon: true,
		showActionButton: true,
		size: 'md',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Importar funciones (si usas módulos)
// import { createScoreCardMetrics, renderScoreCardMetrics } from '@ubits/score-card-metrics';

// 2. Crear contenedor HTML
<div id="score-card-metrics-container"></div>

// 3. Crear ScoreCardMetrics
const scoreCardMetricsElement = createScoreCardMetrics({
  containerId: 'score-card-metrics-container', // ⚠️ REQUERIDO para createScoreCardMetrics
  title: 'Califica el producto',
  totalResponses: 7,
  responsesLabel: 'respuestas',
  average: 4.0, // Promedio de calificación (0-5)
  averageLabel: 'Promedio:',
  score: 3, // Score actual (0-5) para mostrar en las estrellas
  leftLabel: '0', // Etiqueta izquierda del gráfico
  rightLabel: '5', // Etiqueta derecha del gráfico
  chartDescription: '0 a 5 del gráfico', // Texto descriptivo debajo del gráfico
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

// Nota: createScoreCardMetrics retorna HTMLElement | null
// Requiere containerId y el contenedor debe existir en el DOM

// Alternativa: Usar renderScoreCardMetrics para obtener HTML string
const scoreCardMetricsHTML = renderScoreCardMetrics({
  title: 'Califica el producto',
  totalResponses: 7,
  responsesLabel: 'respuestas',
  average: 4.0,
  averageLabel: 'Promedio:',
  score: 3,
  leftLabel: '0',
  rightLabel: '5',
  chartDescription: '0 a 5 del gráfico',
  showInfoIcon: true,
  showActionButton: true,
  size: 'md'
});

// Insertar HTML
const container = document.getElementById('score-card-metrics-container');
if (container) {
  container.innerHTML = scoreCardMetricsHTML;
  
  // Agregar event listener manualmente si es necesario
  const cardElement = container.querySelector('.ubits-score-card-metrics');
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
		container.setAttribute('data-ubits-id', '🧩-ux-score-card-metrics');
		container.setAttribute('data-ubits-component', 'ScoreCardMetrics');
		container.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: flex-start;
      background: var(--modifiers-normal-color-light-bg-2);
      min-height: 200px;
      padding: 24px;
    `;

		// Crear wrapper para la card (max-width 400px)
		const wrapper = document.createElement('div');
		wrapper.style.maxWidth = '400px';
		wrapper.style.width = '100%';

		// Crear contenedor para la card
		const cardContainer = document.createElement('div');
		cardContainer.id = `score-card-metrics-container-${Date.now()}`;

		// Crear card usando createScoreCardMetrics
		try {
			const cardElement = createScoreCardMetrics({
				containerId: cardContainer.id,
				...args,
			});

			if (cardElement) {
				wrapper.appendChild(cardContainer);
			} else {
				// Fallback: usar renderScoreCardMetrics
				const cardHTML = renderScoreCardMetrics(args);
				cardContainer.innerHTML = cardHTML;
				wrapper.appendChild(cardContainer);
			}
		} catch (error) {
			console.error('Error creando ScoreCardMetrics:', error);
			// Fallback: usar renderScoreCardMetrics
			const cardHTML = renderScoreCardMetrics(args);
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
		leftLabel: '0',
		rightLabel: '5',
		chartDescription: '0 a 5 del gráfico',
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
		container.style.background = 'var(--modifiers-normal-color-light-bg-2)';
		container.style.minHeight = '200px';
		container.style.padding = '24px';

		// Crear wrapper para la card (max-width 400px)
		const wrapper = document.createElement('div');
		wrapper.style.maxWidth = '400px';
		wrapper.style.width = '100%';

		// Renderizar card
		const cardHTML = renderScoreCardMetrics(args);
		wrapper.innerHTML = cardHTML;
		container.appendChild(wrapper);

		return container;
	},
};
