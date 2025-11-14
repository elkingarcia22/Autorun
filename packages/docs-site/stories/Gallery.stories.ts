import type { Meta, StoryObj } from '@storybook/html';
import { renderGallery, createGallery } from '../../addons/gallery/src/GalleryProvider';
import type { GalleryOptions, GalleryItem } from '../../addons/gallery/src/types/GalleryOptions';
import '../../addons/gallery/src/styles/gallery.css';

// Datos de ejemplo para la galería
const sampleItems: GalleryItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    title: 'Paisaje Montañoso',
    description: 'Hermoso paisaje montañoso con cielo despejado',
    alt: 'Paisaje montañoso'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop',
    title: 'Océano Azul',
    description: 'Vista del océano con olas suaves',
    alt: 'Océano azul'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop',
    title: 'Bosque Verde',
    description: 'Sendero a través de un bosque frondoso',
    alt: 'Bosque verde'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=200&fit=crop',
    title: 'Ciudad al Atardecer',
    description: 'Skyline de la ciudad durante el atardecer',
    alt: 'Ciudad al atardecer'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop',
    title: 'Lago Sereno',
    description: 'Lago tranquilo rodeado de montañas',
    alt: 'Lago sereno'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop',
    title: 'Naturaleza Salvaje',
    description: 'Paisaje natural con vegetación diversa',
    alt: 'Naturaleza salvaje'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200&h=200&fit=crop',
    title: 'Cascada',
    description: 'Cascada en medio del bosque',
    alt: 'Cascada'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop',
    title: 'Aurora Boreal',
    description: 'Aurora boreal en el cielo nocturno',
    alt: 'Aurora boreal'
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    title: 'Montañas Nevadas',
    description: 'Cumbres nevadas bajo un cielo azul',
    alt: 'Montañas nevadas'
  }
];

const meta: Meta<GalleryOptions> = {
  title: 'Components/Gallery',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Componente Gallery UBITS para mostrar imágenes en diferentes layouts (grid, masonry, list) con múltiples tamaños, soporte para lightbox, lazy loading y thumbnails.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array de items a mostrar en la galería',
      table: {
        type: { summary: 'GalleryItem[]' },
      },
    },
    layout: {
      control: { type: 'select' },
      options: ['grid', 'masonry', 'list'],
      description: 'Layout de la galería',
      table: {
        defaultValue: { summary: 'grid' },
        type: { summary: 'grid | masonry | list' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño de la galería',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg | xl' },
      },
    },
    columns: {
      control: { type: 'number', min: 1, max: 12, step: 1 },
      description: 'Número de columnas (solo para layout grid)',
      table: {
        defaultValue: { summary: '3' },
        type: { summary: 'number' },
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
    showThumbnails: {
      control: { type: 'boolean' },
      description: 'Mostrar thumbnails en lugar de imágenes completas',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    lazyLoad: {
      control: { type: 'boolean' },
      description: 'Cargar imágenes de forma diferida (lazy loading)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    lightbox: {
      control: { type: 'boolean' },
      description: 'Activar lightbox al hacer click en las imágenes',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    aspectRatio: {
      control: { type: 'text' },
      description: 'Aspect ratio para las imágenes (ej: 16/9, 1/1, 4/3)',
      table: {
        type: { summary: 'string' },
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
type Story = StoryObj<GalleryOptions>;

/**
 * Galería única con todos los controladores y tamaños
 */
export const Default: Story = {
  args: {
    items: sampleItems,
    layout: 'grid',
    size: 'md',
    columns: 3,
    gap: 16,
    showThumbnails: false,
    lazyLoad: false,
    lightbox: true,
    aspectRatio: undefined,
    className: '',
  },
  render: (args) => {
    // Usar createGallery que ya incluye la inicialización
    const gallery = createGallery(args);
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';
    container.appendChild(gallery);
    return container;
  },
};

