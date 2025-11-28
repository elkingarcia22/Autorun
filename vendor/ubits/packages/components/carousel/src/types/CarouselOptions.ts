/**
 * Tipos para el componente Carousel UBITS
 */

import type { SimpleCardOptions } from '../../card/src/types/SimpleCardOptions';

export interface CarouselItem extends SimpleCardOptions {
  id: string | number;
  onItemClick?: (item: CarouselItem) => void;
  [key: string]: any; // Para propiedades adicionales
}

export interface CarouselOptions {
  items: CarouselItem[];
  itemsPerView?: number; // Número de items visibles a la vez
  showArrows?: boolean; // Mostrar flechas de navegación
  showDots?: boolean; // Mostrar indicadores de paginación
  autoplay?: boolean; // Auto-reproducir
  autoplayInterval?: number; // Intervalo en ms para autoplay
  loop?: boolean; // Loop infinito
  gap?: number; // Espacio entre items en px
  arrowPosition?: 'inside' | 'outside'; // Posición de las flechas
  dotPosition?: 'bottom' | 'top'; // Posición de los dots
  className?: string;
  onItemClick?: (item: CarouselItem) => void;
  onSlideChange?: (currentIndex: number) => void;
}

