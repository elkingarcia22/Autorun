/**
 * Tipos TypeScript para el componente DataView
 */

// Estado de stock del producto
export type StockStatus = 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';

// Datos de un producto individual
export interface ProductData {
  id?: string;
  image: string;
  imageAlt?: string;
  category: string;
  name: string;
  rating: number; // 0-5
  price: number;
  stockStatus?: StockStatus;
  inWishlist?: boolean;
}

// Opciones para el componente DataView
export interface DataViewOptions {
  containerId?: string;
  container?: HTMLElement;
  products: ProductData[];
  size?: 'sm' | 'md' | 'lg';
  showCategory?: boolean;
  showRating?: boolean;
  showPrice?: boolean;
  showWishlist?: boolean;
  showBuyButton?: boolean;
  buyButtonText?: string;
  buyButtonIcon?: string;
  wishlistIcon?: string;
  onProductClick?: (product: ProductData, index: number, element: HTMLElement) => void;
  onBuyClick?: (product: ProductData, index: number, element: HTMLElement) => void;
  onWishlistClick?: (product: ProductData, index: number, element: HTMLElement) => void;
  className?: string;
  attributes?: Record<string, string>;
}

