import type { Meta, StoryObj } from '@storybook/html';
import { renderCardContent, createCard } from '../../addons/card/src/CardContentProvider';
import type { CardData } from '../../addons/card/src/types/CardContentOptions';
import { CONTENT_TYPES, COMPETENCIES, LANGUAGES, LEVELS, PROVIDERS } from '../../addons/card/src/configs/cardConfigs';

const meta: Meta<CardData> = {
  title: 'Layout/Card Content',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Card Content UBITS para mostrar contenido de aprendizaje. Soporta 11 tipos de contenido, 35 competencias oficiales, 18 proveedores, 3 niveles, 3 idiomas, y 3 estados (default, progress, completed).',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: CONTENT_TYPES,
      description: 'Tipo de contenido',
      table: {
        defaultValue: { summary: 'Curso' },
        type: { summary: CONTENT_TYPES.join(' | ') },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Título del contenido',
      table: {
        defaultValue: { summary: 'Segmenta la experiencia del cliente' },
      },
    },
    provider: {
      control: { type: 'select' },
      options: Object.keys(PROVIDERS),
      description: 'Proveedor/Aliado del contenido',
      table: {
        defaultValue: { summary: 'UBITS' },
        type: { summary: Object.keys(PROVIDERS).join(' | ') },
      },
    },
    providerLogo: {
      control: { type: 'text' },
      description: 'Ruta al logo del proveedor (se deriva automáticamente del provider si no se proporciona)',
      table: {
        type: { summary: 'string' },
      },
    },
    duration: {
      control: { type: 'select' },
      options: ['15 min', '30 min', '45 min', '60 min', '75 min', '90 min', '120 min', '180 min', '240 min'],
      description: 'Duración del contenido',
      table: {
        defaultValue: { summary: '60 min' },
      },
    },
    level: {
      control: { type: 'select' },
      options: ['Básico', 'Intermedio', 'Avanzado'],
      description: 'Nivel del contenido',
      table: {
        defaultValue: { summary: 'Básico' },
        type: { summary: 'Básico | Intermedio | Avanzado' },
      },
    },
    status: {
      control: { type: 'select' },
      options: ['default', 'progress', 'completed'],
      description: 'Estado de la card',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | progress | completed' },
      },
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progreso del contenido (0-100)',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number (0-100)' },
      },
    },
    image: {
      control: { type: 'text' },
      description: 'Ruta a la imagen del contenido',
      table: {
        defaultValue: { summary: 'images/cards-learn/segmenta-la-experiencia-del-cliente.jpg' },
      },
    },
    competency: {
      control: { type: 'select' },
      options: COMPETENCIES,
      description: 'Competencia oficial UBITS',
      table: {
        defaultValue: { summary: 'Product design' },
        type: { summary: COMPETENCIES.join(' | ') },
      },
    },
    language: {
      control: { type: 'select' },
      options: LANGUAGES,
      description: 'Idioma del contenido',
      table: {
        defaultValue: { summary: 'Español' },
        type: { summary: LANGUAGES.join(' | ') },
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
    image: args.image ? (args.image.startsWith('/') ? args.image : `/${args.image}`) : '/images/cards-learn/segmenta-la-experiencia-del-cliente.jpg',
    competency: args.competency || 'Product design',
    language: args.language || 'Español',
  };
}

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

