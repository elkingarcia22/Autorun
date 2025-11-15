import type { Meta, StoryObj } from '@storybook/html';
import { renderCarousel, createCarousel, initializeCarousel } from '../../addons/carousel/src/CarouselProvider';
import type { CarouselOptions, CarouselItem } from '../../addons/carousel/src/types/CarouselOptions';
import '../../addons/carousel/src/styles/carousel.css';
import '../../addons/card/src/styles/simple-card.css';
import '../../addons/button/src/styles/button.css';

// Datos de ejemplo para el carrusel usando Simple Cards
const sampleItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Bamboo Watch',
    subtitle: 'Reloj de madera elegante',
    content: 'Diseño minimalista con correa de cuero genuino. Perfecto para ocasiones formales e informales.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 2,
    title: 'Black Watch',
    subtitle: 'Reloj clásico negro',
    content: 'Diseño atemporal con esfera blanca y correa negra. Ideal para el uso diario.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 3,
    title: 'Blue Band',
    subtitle: 'Pulsera fitness azul',
    content: 'Pulsera inteligente con seguimiento de actividad física y monitoreo de salud.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 4,
    title: 'Smart Watch',
    subtitle: 'Reloj inteligente premium',
    content: 'Tecnología avanzada con pantalla táctil, GPS integrado y resistencia al agua.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 5,
    title: 'Classic Watch',
    subtitle: 'Reloj clásico tradicional',
    content: 'Diseño elegante y sofisticado para ocasiones especiales. Movimiento automático.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 6,
    title: 'Sport Watch',
    subtitle: 'Reloj deportivo',
    content: 'Resistente al agua y diseñado para atletas. Cronómetro y múltiples funciones deportivas.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 7,
    title: 'Luxury Watch',
    subtitle: 'Reloj de lujo',
    content: 'Edición limitada con materiales premium. Diseño exclusivo para coleccionistas.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 8,
    title: 'Digital Watch',
    subtitle: 'Reloj digital moderno',
    content: 'Pantalla LED de alta resolución con múltiples funciones y conectividad Bluetooth.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 9,
    title: 'Vintage Watch',
    subtitle: 'Reloj vintage',
    content: 'Diseño retro con mecanismo de cuerda manual. Perfecto para amantes de lo clásico.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 10,
    title: 'Fitness Tracker',
    subtitle: 'Monitor de actividad',
    content: 'Seguimiento completo de actividad física, sueño y salud cardiovascular.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 11,
    title: 'Diving Watch',
    subtitle: 'Reloj de buceo',
    content: 'Resistente hasta 300 metros de profundidad. Ideal para deportes acuáticos.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  },
  {
    id: 12,
    title: 'Chronograph Watch',
    subtitle: 'Cronógrafo profesional',
    content: 'Precisión milimétrica con funciones de cronometraje avanzadas para profesionales.',
    showHeader: true,
    headerDecorations: true,
    variant: 'elevated',
    size: 'md',
    showButtons: true,
    buttons: [
      { label: 'Ver más', variant: 'primary', size: 'md' },
      { label: 'Favorito', variant: 'secondary', size: 'md' }
    ]
  }
];

const meta: Meta<CarouselOptions> = {
  title: 'Components/Carousel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Carousel UBITS para mostrar Simple Cards en un carrusel navegable. Incluye navegación con flechas, indicadores de paginación, autoplay y soporte para diferentes tamaños de cards.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    itemsPerView: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
      description: 'Número de items visibles a la vez',
      table: {
        defaultValue: { summary: '3' },
        type: { summary: 'number' },
      },
    },
    showArrows: {
      control: { type: 'boolean' },
      description: 'Mostrar flechas de navegación',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showDots: {
      control: { type: 'boolean' },
      description: 'Mostrar indicadores de paginación (dots)',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    autoplay: {
      control: { type: 'boolean' },
      description: 'Auto-reproducir el carrusel',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    autoplayInterval: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Intervalo en milisegundos para autoplay',
      table: {
        defaultValue: { summary: '3000' },
        type: { summary: 'number (ms)' },
      },
    },
    loop: {
      control: { type: 'boolean' },
      description: 'Loop infinito (volver al inicio al llegar al final)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    gap: {
      control: { type: 'number', min: 0, max: 48, step: 4 },
      description: 'Espacio entre items en píxeles',
      table: {
        defaultValue: { summary: '16' },
        type: { summary: 'number (px)' },
      },
    },
    arrowPosition: {
      control: { type: 'select' },
      options: ['inside', 'outside'],
      description: 'Posición de las flechas de navegación',
      table: {
        defaultValue: { summary: 'outside' },
        type: { summary: 'inside | outside' },
      },
    },
    dotPosition: {
      control: { type: 'select' },
      options: ['bottom', 'top'],
      description: 'Posición de los indicadores de paginación',
      table: {
        defaultValue: { summary: 'bottom' },
        type: { summary: 'bottom | top' },
      },
    },
    cardSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Tamaño de las Simple Cards',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg | xl' },
      },
    },
    cardVariant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'bordered', 'flat'],
      description: 'Variante de las Simple Cards',
      table: {
        defaultValue: { summary: 'elevated' },
        type: { summary: 'default | elevated | bordered | flat' },
      },
    },
    showCardHeader: {
      control: { type: 'boolean' },
      description: 'Mostrar header en las Simple Cards',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showCardButtons: {
      control: { type: 'boolean' },
      description: 'Mostrar botones en las Simple Cards',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Clase CSS adicional',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CarouselOptions & { cardSize?: 'sm' | 'md' | 'lg' | 'xl'; cardVariant?: 'default' | 'elevated' | 'bordered' | 'flat'; showCardHeader?: boolean; showCardButtons?: boolean }>;

/**
 * Carrusel completo con todos los controles
 */
export const Default: Story = {
  args: {
    itemsPerView: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    autoplayInterval: 3000,
    loop: false,
    gap: 16,
    arrowPosition: 'outside',
    dotPosition: 'bottom',
    cardSize: 'md',
    cardVariant: 'elevated',
    showCardHeader: true,
    showCardButtons: true,
    onItemClick: (item: CarouselItem) => {
      // Handler para click en item
    },
    onSlideChange: (currentIndex: number) => {
      // Handler para cambio de slide
    }
  },
  render: (args) => {
    // Aplicar configuración de cards a todos los items
    const itemsWithConfig = sampleItems.map(item => ({
      ...item,
      size: args.cardSize || 'md',
      variant: args.cardVariant || 'elevated',
      showHeader: args.showCardHeader !== false,
      showButtons: args.showCardButtons !== false,
      onItemClick: (item: CarouselItem) => {
        if (args.onItemClick) {
          args.onItemClick(item);
        }
      }
    }));

    const carouselOptions: CarouselOptions = {
      items: itemsWithConfig,
      itemsPerView: args.itemsPerView,
      showArrows: args.showArrows,
      showDots: args.showDots,
      autoplay: args.autoplay,
      autoplayInterval: args.autoplayInterval,
      loop: args.loop,
      gap: args.gap,
      arrowPosition: args.arrowPosition,
      dotPosition: args.dotPosition,
      className: args.className,
      onItemClick: args.onItemClick,
      onSlideChange: args.onSlideChange
    };

    // Crear contenedor
    const container = document.createElement('div');
    
    // Renderizar HTML primero
    container.innerHTML = renderCarousel(carouselOptions);
    const carouselElement = container.querySelector('.ubits-carousel') as HTMLElement;
    
    // Inicializar después de que el DOM esté listo usando requestAnimationFrame
    if (carouselElement) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initializeCarousel(carouselElement, carouselOptions);
        });
      });
    }
    
    return container;
  },
};

