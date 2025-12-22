import type { Meta, StoryObj } from '@storybook/html';
import { renderGallery, createGallery } from '../../../../components/gallery/src/GalleryProvider';
import type { GalleryOptions, GalleryItem } from '../../../../components/gallery/src/types/GalleryOptions';
import { createUBITSContract } from '../../_shared/ubitsContract';
// Importar estilos del componente y dependencias
import '../../../../components/gallery/src/styles/gallery.css';
import '../../../../components/button/src/styles/button.css';

// Datos de ejemplo para la galería
const sampleItems: GalleryItem[] = [
	{
		id: 1,
		image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
		thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
		title: 'Paisaje Montañoso',
		description: 'Hermoso paisaje montañoso con cielo despejado',
		alt: 'Paisaje montañoso',
	},
	{
		id: 2,
		image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
		thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop',
		title: 'Océano Azul',
		description: 'Vista del océano con olas suaves',
		alt: 'Océano azul',
	},
	{
		id: 3,
		image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
		thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop',
		title: 'Bosque Verde',
		description: 'Sendero a través de un bosque frondoso',
		alt: 'Bosque verde',
	},
	{
		id: 4,
		image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
		thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=200&fit=crop',
		title: 'Ciudad al Atardecer',
		description: 'Skyline de la ciudad durante el atardecer',
		alt: 'Ciudad al atardecer',
	},
	{
		id: 5,
		image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
		thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop',
		title: 'Lago Sereno',
		description: 'Lago tranquilo rodeado de montañas',
		alt: 'Lago sereno',
	},
	{
		id: 6,
		image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
		thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop',
		title: 'Naturaleza Salvaje',
		description: 'Paisaje natural con vegetación diversa',
		alt: 'Naturaleza salvaje',
	},
];

const meta: Meta<GalleryOptions> = {
	title: 'Layout/Gallery',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Componente Gallery UBITS para mostrar imágenes en diferentes layouts (grid, masonry, list) con múltiples tamaños, soporte para lightbox, lazy loading y thumbnails.',
			},
		},
		layout: 'padded',
		ubits: createUBITSContract({
			componentId: '🧩-ux-gallery',
			api: {
				create: 'window.UBITS.Gallery.create',
				tag: '<ubits-gallery>',
			},
			dependsOn: {
				required: [],
				optional: [
					'🧩-ux-button', // Button usado opcionalmente en lightbox o acciones
				],
			},
			internals: [],
			slots: {},
			tokensUsed: [
				'--modifiers-normal-color-light-bg-1',
				'--modifiers-normal-color-light-bg-2',
				'--modifiers-normal-color-light-bg-dim',
				'--modifiers-normal-color-light-fg-1-high',
				'--modifiers-normal-color-light-fg-1-medium',
				'--modifiers-normal-color-light-fg-1-low',
				'--modifiers-normal-color-light-fg-bold',
				'--modifiers-normal-color-light-accent-brand',
				'--modifiers-normal-color-light-border-1',
				'--modifiers-normal-color-light-border-2',
				'--ubits-spacing-none',
				'--ubits-spacing-xs',
				'--ubits-spacing-sm',
				'--ubits-spacing-md',
				'--ubits-spacing-lg',
				'--ubits-spacing-xl',
				'--ubits-spacing-15',
				'--ubits-spacing-20',
				'--ubits-border-radius-xs',
				'--ubits-border-radius-md',
				'--font-family-noto-sans-font-family',
				'--weight-semibold',
				'--gallery-gap',
				'--gallery-columns',
			],
			rules: {
				forbidHardcodedColors: true,
				forbiddenPatterns: ['rgb(', 'hsl(', '#'],
				requiredProps: ['items'],
			},
		}),
	},
	argTypes: {
		items: {
			control: { type: 'object' },
			description: 'Array de items a mostrar en la galería',
			table: {
				type: { summary: 'GalleryItem[]' },
				category: 'Contenido',
			},
		},
		layout: {
			control: { type: 'select' },
			options: ['grid', 'masonry', 'list'],
			description: 'Layout de la galería',
			table: {
				type: { summary: 'grid | masonry | list' },
				defaultValue: { summary: 'grid' },
				category: 'Configuración',
			},
		},
		size: {
			control: { type: 'select' },
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: 'Tamaño de la galería',
			table: {
				type: { summary: 'xs | sm | md | lg | xl' },
				defaultValue: { summary: 'md' },
				category: 'Apariencia',
			},
		},
		columns: {
			control: { type: 'number', min: 1, max: 12, step: 1 },
			description: 'Número de columnas (solo para layout grid)',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '3' },
				category: 'Configuración',
			},
		},
		gap: {
			control: { type: 'number', min: 0, max: 48, step: 4 },
			description: 'Espacio entre items en píxeles',
			table: {
				type: { summary: 'number (px)' },
				defaultValue: { summary: '16' },
				category: 'Configuración',
			},
		},
		showThumbnails: {
			control: { type: 'boolean' },
			description: 'Mostrar thumbnails en lugar de imágenes completas',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Apariencia',
			},
		},
		lazyLoad: {
			control: { type: 'boolean' },
			description: 'Cargar imágenes de forma diferida (lazy loading)',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Funcionalidad',
			},
		},
		lightbox: {
			control: { type: 'boolean' },
			description: 'Activar lightbox al hacer click en las imágenes',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
				category: 'Funcionalidad',
			},
		},
		aspectRatio: {
			control: { type: 'text' },
			description: 'Aspect ratio para las imágenes (ej: 16/9, 1/1, 4/3)',
			table: {
				type: { summary: 'string' },
				category: 'Configuración',
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
		onItemClick: {
			control: false,
			description: 'Callback cuando se hace click en un item',
			table: {
				type: { summary: '(item: GalleryItem, index: number) => void' },
				category: 'Eventos',
			},
		},
		onImageLoad: {
			control: false,
			description: 'Callback cuando una imagen se carga',
			table: {
				type: { summary: '(item: GalleryItem, index: number) => void' },
				category: 'Eventos',
			},
		},
		onImageError: {
			control: false,
			description: 'Callback cuando hay un error al cargar una imagen',
			table: {
				type: { summary: '(item: GalleryItem, index: number) => void' },
				category: 'Eventos',
			},
		},
	},
};

export default meta;
type Story = StoryObj<GalleryOptions>;

/**
 * ⭐ Story "Implementation (Copy/Paste)" - Para Autorun
 * Esta story proporciona un snippet exacto y funcional que Autorun puede copiar/pegar
 */
export const Implementation: Story = {
	name: 'Implementation (Copy/Paste)',
	args: {
		items: sampleItems.slice(0, 6),
		layout: 'grid',
		size: 'md',
		columns: 3,
		gap: 16,
		showThumbnails: false,
		lazyLoad: false,
		lightbox: true,
		aspectRatio: undefined,
	},
	parameters: {
		docs: {
			source: {
				// ⭐ SNIPPET EXACTO para Autorun
				code: `// 1. Crear contenedor HTML
<div id="gallery-implementation-container"></div>

// 2. Crear Gallery
const galleryElement = window.UBITS.Gallery.create({
  items: [
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
    }
  ],
  layout: 'grid',
  size: 'md',
  columns: 3,
  gap: 16,
  showThumbnails: false,
  lazyLoad: false,
  lightbox: true,
  aspectRatio: undefined,
  onItemClick: (item, index) => {
    console.log('Item clickeado:', item, index);
  },
  onImageLoad: (item, index) => {
    console.log('Imagen cargada:', item, index);
  },
  onImageError: (item, index) => {
    console.error('Error cargando imagen:', item, index);
  }
});

// 3. Insertar en el contenedor
const container = document.getElementById('gallery-implementation-container');
if (container) {
  container.appendChild(galleryElement);
}

// Nota: createGallery retorna un HTMLElement directamente
// Ejemplo con layout masonry:
const galleryMasonry = window.UBITS.Gallery.create({
  items: sampleItems,
  layout: 'masonry',
  size: 'lg',
  columns: 4,
  gap: 20,
  lightbox: true
});

// Ejemplo con layout list:
const galleryList = window.UBITS.Gallery.create({
  items: sampleItems,
  layout: 'list',
  size: 'md',
  gap: 12
});`,
			},
		},
	},
	render: (args) => {
		const container = document.createElement('div');
		container.setAttribute('data-ubits-id', '🧩-ux-gallery');
		container.setAttribute('data-ubits-component', 'Gallery');
		container.style.cssText = `
      width: 100%;
      padding: 40px;
      background: var(--modifiers-normal-color-light-bg-1);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    `;

		// Crear galería
		try {
			const galleryElement = createGallery({
				items: args.items || sampleItems.slice(0, 6),
				layout: args.layout || 'grid',
				size: args.size || 'md',
				columns: args.columns ?? 3,
				gap: args.gap ?? 16,
				showThumbnails: args.showThumbnails ?? false,
				lazyLoad: args.lazyLoad ?? false,
				lightbox: args.lightbox ?? false,
				aspectRatio: args.aspectRatio,
				className: args.className,
				onItemClick: args.onItemClick,
				onImageLoad: args.onImageLoad,
				onImageError: args.onImageError,
			});
			container.appendChild(galleryElement);
		} catch (error) {
			console.error('Error creando Gallery:', error);
			const errorDiv = document.createElement('div');
			errorDiv.textContent = `Error: ${error}`;
			errorDiv.style.color = 'red';
			container.appendChild(errorDiv);
		}

		return container;
	},
};

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
		container.style.margin = '0 auto';
		container.appendChild(gallery);
		return container;
	},
};



