import type { Meta, StoryObj } from '@storybook/html';
import { renderCardContent, createCard } from '../../../../components/card/src/CardContentProvider';
import type { CardData } from '../../../../components/card/src/types/CardContentOptions';
import {
	CONTENT_TYPES,
	COMPETENCIES,
	LANGUAGES,
	LEVELS,
	PROVIDERS,
} from '../../../../components/card/src/configs/cardConfigs';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente
import '../../../../components/card/src/styles/card.css';

const meta: Meta<CardData> = {
	title: 'Layout/Card Content',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Card Content UBITS para mostrar contenido de aprendizaje. Soporta 11 tipos de contenido, 35 competencias oficiales, 18 proveedores, 3 niveles, 3 idiomas, y 3 estados (default, progress, completed).',
			},
		},
		ubits: createUBITSContract({
			componentId: '🧩-ux-card-content',
			api: {
				create: 'createCard', // Función importada directamente
				render: 'renderCardContent', // Función importada directamente
			},
			dependsOn: {
				required: [],
				optional: [],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-4',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-fg-bold',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-accent-brand',
				'--modifiers-normal-color-light-feedback-accent-success',
				'--font-family-noto-sans-font-family',
				'--weight-bold',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['type', 'title', 'provider', 'image', 'competency'],
			},
		}),
	},
	argTypes: {
		type: {
			control: { type: 'select' },
			options: CONTENT_TYPES,
			description: 'Tipo de contenido',
			table: {
				type: { summary: CONTENT_TYPES.join(' | ') },
				defaultValue: { summary: 'Curso' },
				category: 'Contenido',
			},
		},
		title: {
			control: { type: 'text' },
			description: 'Título del contenido',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'Segmenta la experiencia del cliente' },
				category: 'Contenido',
			},
		},
		provider: {
			control: { type: 'select' },
			options: Object.keys(PROVIDERS),
			description: 'Proveedor/Aliado del contenido',
			table: {
				type: { summary: Object.keys(PROVIDERS).join(' | ') },
				defaultValue: { summary: 'UBITS' },
				category: 'Contenido',
			},
		},
		providerLogo: {
			control: { type: 'text' },
			description:
				'Ruta al logo del proveedor (se deriva automáticamente del provider si no se proporciona)',
			table: {
				type: { summary: 'string' },
				category: 'Contenido',
			},
		},
		duration: {
			control: { type: 'select' },
			options: [
				'15 min',
				'30 min',
				'45 min',
				'60 min',
				'75 min',
				'90 min',
				'120 min',
				'180 min',
				'240 min',
			],
			description: 'Duración del contenido',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '60 min' },
				category: 'Contenido',
			},
		},
		level: {
			control: { type: 'select' },
			options: ['Básico', 'Intermedio', 'Avanzado'],
			description: 'Nivel del contenido',
			table: {
				type: { summary: 'Básico | Intermedio | Avanzado' },
				defaultValue: { summary: 'Básico' },
				category: 'Contenido',
			},
		},
		status: {
			control: { type: 'select' },
			options: ['default', 'progress', 'completed'],
			description: 'Estado de la card',
			table: {
				type: { summary: 'default | progress | completed' },
				defaultValue: { summary: 'default' },
				category: 'Estado',
			},
		},
		progress: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Progreso del contenido (0-100)',
			table: {
				type: { summary: 'number (0-100)' },
				defaultValue: { summary: '0' },
				category: 'Estado',
			},
		},
		image: {
			control: { type: 'text' },
			description: 'Ruta a la imagen del contenido',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'images/cards-learn/segmenta-la-experiencia-del-cliente.jpg' },
				category: 'Contenido',
			},
		},
		competency: {
			control: { type: 'select' },
			options: COMPETENCIES,
			description: 'Competencia oficial UBITS',
			table: {
				type: { summary: COMPETENCIES.join(' | ') },
				defaultValue: { summary: 'Product design' },
				category: 'Contenido',
			},
		},
		language: {
			control: { type: 'select' },
			options: LANGUAGES,
			description: 'Idioma del contenido',
			table: {
				type: { summary: LANGUAGES.join(' | ') },
				defaultValue: { summary: 'Español' },
				category: 'Contenido',
			},
		},
	},
};

export default meta;
type Story = StoryObj<CardData>;

// Función helper para obtener la ruta del logo del proveedor
function getProviderLogo(provider: string): string {
	const logoPath = PROVIDERS[provider];
	if (!logoPath) {
		return PROVIDERS['UBITS']; // Fallback a UBITS
	}
	// En Storybook, las imágenes están en staticDirs (mapeadas a /images)
	// Las rutas en PROVIDERS ahora usan 'assets/images/', así que necesitamos ajustar
	return logoPath.replace('assets/images/', '/images/');
}

// Función helper para construir CardData completo desde args
function buildCardData(args: Partial<CardData>): CardData {
	const provider = args.provider || 'UBITS';
	const providerLogo = args.providerLogo || getProviderLogo(provider);

	return {
		type: args.type || 'Curso',
		title: args.title || 'Segmenta la experiencia del cliente',
		provider: provider,
		providerLogo: providerLogo,
		duration: args.duration || '60 min',
		level: args.level || 'Básico',
		progress: args.progress ?? 0,
		status: args.status || 'default',
		image: args.image
			? args.image.startsWith('/')
				? args.image
				: `/${args.image}`
			: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
		competency: args.competency || 'Product design',
		language: args.language || 'Español',
	};
}

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		type: 'Curso',
		title: 'Segmenta la experiencia del cliente',
		provider: 'UBITS',
		duration: '60 min',
		level: 'Básico',
		progress: 0,
		status: 'default',
		competency: 'Product design',
		language: 'Español',
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Importar funciones (si usas módulos)
// import { createCard, renderCardContent } from '@ubits/card';

// 2. Crear CardContent
const cardElement = createCard({
  type: 'Curso', // 'Curso' | 'Cápsula' | 'Charla' | 'Artículo' | 'Podcast' | 'Libro' | 'Ideas de libro' | 'Caso de estudio' | 'Documento técnico' | 'Ejercicios de práctica' | 'Ruta de aprendizaje'
  title: 'Segmenta la experiencia del cliente',
  provider: 'UBITS', // Ver PROVIDERS para opciones disponibles
  providerLogo: '/images/providers/ubits-logo.png', // Opcional, se deriva del provider si no se proporciona
  duration: '60 min', // '15 min' | '30 min' | '45 min' | '60 min' | '75 min' | '90 min' | '120 min' | '180 min' | '240 min'
  level: 'Básico', // 'Básico' | 'Intermedio' | 'Avanzado'
  progress: 0, // 0-100
  status: 'default', // 'default' | 'progress' | 'completed'
  image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
  competency: 'Product design', // Ver COMPETENCIES para opciones disponibles (35 competencias)
  language: 'Español' // 'Español' | 'Inglés' | 'Portugués'
});

// 3. Insertar en el DOM
const container = document.getElementById('card-content-container');
if (container) {
  container.appendChild(cardElement);
}

// Nota: createCard retorna un HTMLElement directamente

// Alternativa: Usar renderCardContent para obtener HTML string
const cardHTML = renderCardContent({
  type: 'Curso',
  title: 'Segmenta la experiencia del cliente',
  provider: 'UBITS',
  duration: '60 min',
  level: 'Básico',
  progress: 50,
  status: 'progress',
  image: '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
  competency: 'Product design',
  language: 'Español'
});

// Insertar HTML
const container = document.getElementById('card-content-container');
if (container) {
  container.innerHTML = cardHTML;
}

// Ejemplo: Cargar múltiples cards
// import { loadCardContent } from '@ubits/card';
// loadCardContent({
//   containerId: 'cards-container',
//   cards: [cardData1, cardData2, cardData3],
//   onClick: (card, index, element) => {
//     console.log('Card clickeada:', card);
//   }
// });`,
			},
		},
	},
	render: (args) => {
		const cardData = buildCardData(args);

		// Crear contenedor
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-card-content');
		container.setAttribute('data-ubits-component', 'CardContent');
		container.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 48px;
      background: var(--modifiers-normal-color-light-bg-1);
      border: 1px solid var(--modifiers-normal-color-light-border-1);
      border-radius: 8px;
      min-height: 400px;
    `;

		// Crear wrapper para la card (max-width 360px)
		const wrapper = document.createElement('div');
		wrapper.style.maxWidth = '360px';
		wrapper.style.width = '100%';

		// Crear card
		try {
			const cardElement = createCard(cardData);
			wrapper.appendChild(cardElement);
		} catch (error) {
			console.error('Error creando CardContent:', error);
			const errorDiv = document.createElement('div');
			errorDiv.textContent = `Error: ${error}`;
			errorDiv.style.color = 'red';
			wrapper.appendChild(errorDiv);
		}

		container.appendChild(wrapper);
		return container;
	},
};

export const Default: Story = {
	args: {
		type: 'Curso',
		title: 'Segmenta la experiencia del cliente',
		provider: 'UBITS',
		duration: '60 min',
		level: 'Básico',
		progress: 0,
		status: 'default',
		competency: 'Product design',
		language: 'Español',
	},
	render: (args) => {
		const cardData = buildCardData(args);

		// Crear contenedor
		const container = document.createElement('div');
		container.style.display = 'flex';
		container.style.justifyContent = 'center';
		container.style.alignItems = 'flex-start';
		container.style.padding = '48px';
		container.style.background = 'var(--modifiers-normal-color-light-bg-1)';
		container.style.border = '1px solid var(--modifiers-normal-color-light-border-1)';
		container.style.borderRadius = '8px';
		container.style.minHeight = '400px';

		// Crear wrapper para la card (max-width 360px)
		const wrapper = document.createElement('div');
		wrapper.style.maxWidth = '360px';
		wrapper.style.width = '100%';

		// Crear card
		const cardElement = createCard(cardData);
		wrapper.appendChild(cardElement);
		container.appendChild(wrapper);

		return container;
	},
};


