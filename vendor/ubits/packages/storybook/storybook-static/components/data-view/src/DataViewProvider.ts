/**
 * DataViewProvider
 * Lógica de renderizado del componente DataView
 * Genera HTML según las opciones proporcionadas usando tokens y componentes UBITS
 */


import type { DataViewOptions, ProductData, StockStatus } from './types/DataViewOptions';
import { renderButton } from '../../button/src/ButtonProvider';

// Importar estilos - Vite procesará estas importaciones durante el build
import './styles/data-view.css';

// Importar estilos del botón para que funcionen los botones de compra
import '../../button/src/styles/button.css';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

// Helper para renderizar el badge de stock
function renderStockBadge(status: StockStatus = 'INSTOCK'): string {
  const statusConfig = {
    INSTOCK: { text: 'INSTOCK', class: 'ubits-data-view__stock-badge--instock' },
    LOWSTOCK: { text: 'LOWSTOCK', class: 'ubits-data-view__stock-badge--lowstock' },
    OUTOFSTOCK: { text: 'OUTOFSTOCK', class: 'ubits-data-view__stock-badge--outofstock' }
  };

  const config = statusConfig[status] || statusConfig.INSTOCK;
  return `<span class="ubits-data-view__stock-badge ${config.class}">${config.text}</span>`;
}

// Helper para renderizar el rating con estrellas
function renderRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsHTML = '';
  
  // Estrellas llenas
  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<i class="fas fa-star ubits-data-view__star ubits-data-view__star--filled"></i>`;
  }
  
  // Media estrella
  if (hasHalfStar) {
    starsHTML += `<i class="fas fa-star-half-alt ubits-data-view__star ubits-data-view__star--half"></i>`;
  }
  
  // Estrellas vacías
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += `<i class="far fa-star ubits-data-view__star ubits-data-view__star--empty"></i>`;
  }
  
  return `
    <div class="ubits-data-view__rating">
      ${starsHTML}
      <span class="ubits-body-sm-regular ubits-data-view__rating-number">${rating}</span>
    </div>
  `;
}

// Helper para formatear precio
function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Renderiza un producto individual como HTML string
 */
function renderProduct(product: ProductData, index: number, options: DataViewOptions): string {
  const {
    showCategory = true,
    showRating = true,
    showPrice = true,
    showWishlist = true,
    showBuyButton = true,
    buyButtonText = 'Buy Now',
    buyButtonIcon = 'shopping-cart',
    wishlistIcon = 'heart'
  } = options;

  const productId = product.id || `product-${index}`;
  const stockStatus = product.stockStatus || 'INSTOCK';
  const inWishlist = product.inWishlist || false;

  return `
    <div class="ubits-data-view__item" data-product-id="${productId}" data-index="${index}">
      <div class="ubits-data-view__image-wrapper">
        <img 
          src="${product.image}" 
          alt="${product.imageAlt || product.name}" 
          class="ubits-data-view__image"
        />
        ${renderStockBadge(stockStatus)}
      </div>
      <div class="ubits-data-view__content">
        <div class="ubits-data-view__main">
          ${showCategory ? `<div class="ubits-body-sm-regular ubits-data-view__category">${product.category}</div>` : ''}
          <h3 class="ubits-body-md-semibold ubits-data-view__name">${product.name}</h3>
          ${showRating ? renderRating(product.rating) : ''}
        </div>
        <div class="ubits-data-view__right">
          ${showPrice ? `<span class="ubits-body-md-bold ubits-data-view__price">${formatPrice(product.price)}</span>` : ''}
          <div class="ubits-data-view__actions">
            ${showWishlist ? renderButton({
              variant: 'secondary',
              size: 'sm',
              icon: wishlistIcon,
              iconStyle: inWishlist ? 'solid' : 'regular',
              iconOnly: true,
              className: `ubits-data-view__wishlist-button ${inWishlist ? 'ubits-data-view__wishlist-button--active' : ''}`,
              attributes: {
                'data-action': 'wishlist',
                'aria-label': inWishlist ? 'Remover de favoritos' : 'Agregar a favoritos'
              }
            }) : ''}
            ${showBuyButton ? renderButton({
              variant: 'primary',
              size: 'sm',
              text: buyButtonText,
              icon: buyButtonIcon,
              iconStyle: 'solid',
              className: 'ubits-data-view__buy-button',
              attributes: {
                'data-action': 'buy'
              }
            }) : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renderiza el componente DataView como HTML string
 */
export function renderDataView(options: DataViewOptions): string {
  const {
    products = [],
    containerId,
    size = 'md',
    className = '',
    attributes = {}
  } = options;

  const sizeClass = `ubits-data-view--${size}`;
  const containerClasses = ['ubits-data-view', sizeClass, className].filter(Boolean).join(' ');
  const containerAttrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const idAttr = containerId ? `id="${containerId}"` : '';

  let html = `<div class="${containerClasses}" ${idAttr} ${containerAttrs}>`;

  products.forEach((product, index) => {
    html += renderProduct(product, index, options);
  });

  html += '</div>';

  return html;
}

/**
 * Crea un elemento DataView programáticamente
 */
export function createDataView(options: DataViewOptions): HTMLElement {
  if (typeof document === 'undefined') {
    throw new Error('createDataView requiere un entorno con DOM (navegador)');
  }
  
  const {
    container,
    containerId,
    products = [],
    size = 'md',
    onProductClick,
    onBuyClick,
    onWishlistClick,
    className = '',
    attributes = {}
  } = options;

  // Crear contenedor
  const element = container || document.createElement('div');
  const sizeClass = `ubits-data-view--${size}`;
  element.className = ['ubits-data-view', sizeClass, className].filter(Boolean).join(' ');
  
  if (containerId) {
    element.id = containerId;
  }

  // Aplicar atributos
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  // Renderizar productos
  element.innerHTML = renderDataView(options);

  // Agregar event listeners
  const items = element.querySelectorAll('.ubits-data-view__item');
  items.forEach((item, index) => {
    const product = products[index];
    if (!product) return;

    // Click en el producto
    if (onProductClick) {
      item.addEventListener('click', (e) => {
        // No disparar si se hace click en un botón
        const target = e.target as HTMLElement;
        if (!target.closest('button')) {
          onProductClick(product, index, item as HTMLElement);
        }
      });
    }

    // Click en botón de compra
    const buyButton = item.querySelector('[data-action="buy"]');
    if (buyButton && onBuyClick) {
      buyButton.addEventListener('click', (e) => {
        e.stopPropagation();
        onBuyClick(product, index, item as HTMLElement);
      });
    }

    // Click en botón de wishlist
    const wishlistButton = item.querySelector('[data-action="wishlist"]');
    if (wishlistButton && onWishlistClick) {
      wishlistButton.addEventListener('click', (e) => {
        e.stopPropagation();
        onWishlistClick(product, index, item as HTMLElement);
      });
    }
  });

  return element;
}

