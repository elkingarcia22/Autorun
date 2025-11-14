/**
 * Tipos para el componente Gallery UBITS
 */

export interface GalleryItem {
  id: string | number;
  image: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  alt?: string;
  [key: string]: any; // Para propiedades adicionales
}

export type GalleryLayout = 'grid' | 'masonry' | 'list';
export type GallerySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GalleryOptions {
  items: GalleryItem[];
  layout?: GalleryLayout;
  size?: GallerySize;
  columns?: number; // Número de columnas (solo para grid)
  gap?: number; // Espacio entre items en px
  showThumbnails?: boolean; // Mostrar thumbnails en lugar de imágenes completas
  lazyLoad?: boolean; // Cargar imágenes de forma diferida
  lightbox?: boolean; // Activar lightbox al hacer click
  aspectRatio?: string; // Aspect ratio para las imágenes (ej: '16/9', '1/1')
  className?: string;
  onItemClick?: (item: GalleryItem, index: number) => void;
  onImageLoad?: (item: GalleryItem, index: number) => void;
  onImageError?: (item: GalleryItem, index: number) => void;
}

