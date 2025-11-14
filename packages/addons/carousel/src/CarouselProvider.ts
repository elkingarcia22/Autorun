/**
 * CarouselProvider
 * Lógica de renderizado del componente Carousel
 * Genera HTML según las opciones proporcionadas
 */

import { CarouselOptions, CarouselItem } from './types/CarouselOptions';
import { renderSimpleCard } from '../../card/src/SimpleCardProvider';

/**
 * Renderiza un carrusel UBITS como HTML string
 */
export function renderCarousel(options: CarouselOptions): string {
  const {
    items = [],
    itemsPerView = 3,
    showArrows = true,
    showDots = true,
    autoplay = false,
    autoplayInterval = 3000,
    loop = false,
    gap = 16,
    arrowPosition = 'outside',
    dotPosition = 'bottom',
    className = '',
    onItemClick,
    onSlideChange
  } = options;

  if (items.length === 0) {
    return '<div class="ubits-carousel ubits-carousel--empty">No hay items para mostrar</div>';
  }

  // Construir clases CSS
  const classes = [
    'ubits-carousel',
    arrowPosition === 'inside' && 'ubits-carousel--arrows-inside',
    dotPosition === 'top' && 'ubits-carousel--dots-top',
    className
  ].filter(Boolean).join(' ');

  // Renderizar items
  const itemsHTML = items.map((item, index) => renderCarouselItem(item, index, onItemClick)).join('');

  // Renderizar dots
  const dotsHTML = showDots ? renderDots(items.length, itemsPerView) : '';

  // Atributos de datos para JavaScript
  const dataAttrs = [
    `data-items-per-view="${itemsPerView}"`,
    autoplay && `data-autoplay="true"`,
    autoplay && `data-autoplay-interval="${autoplayInterval}"`,
    loop && `data-loop="true"`,
    `data-gap="${gap}"`
  ].filter(Boolean).join(' ');

  return `
    <div class="${classes}" ${dataAttrs} style="--carousel-gap: ${gap}px;">
      <div class="ubits-carousel__content-wrapper">
        ${showArrows ? renderPrevArrow() : ''}
        <div class="ubits-carousel__container">
          <div class="ubits-carousel__track">
            ${itemsHTML}
          </div>
        </div>
        ${showArrows ? renderNextArrow() : ''}
      </div>
      ${dotsHTML}
    </div>
  `;
}

/**
 * Renderiza un item del carrusel usando Simple Card
 */
function renderCarouselItem(
  item: CarouselItem,
  index: number,
  onItemClick?: (item: CarouselItem) => void
): string {
  const { id } = item;
  
  // Extraer propiedades específicas del carrusel
  const { id: _, onItemClick: __, ...simpleCardOptions } = item;
  
  // Asegurar que la card tenga maxWidth undefined para que use sus propias variantes de tamaño
  // Las Simple Cards ya tienen max-width definidos según su tamaño (sm, md, lg, xl)
  const cardOptions = {
    ...simpleCardOptions,
    maxWidth: undefined // No forzar maxWidth, dejar que la variante lo maneje
  };
  
  // Renderizar la Simple Card tal como es (con todos sus botones si los tiene)
  const cardHTML = renderSimpleCard(cardOptions);
  
  // Envolver en un contenedor del carrusel con atributos de datos
  return `
    <div class="ubits-carousel-item" data-item-id="${id}" data-item-index="${index}">
      ${cardHTML}
    </div>
  `;
}

/**
 * Renderiza la flecha anterior
 */
function renderPrevArrow(): string {
  return `
    <button class="ubits-carousel__arrow ubits-carousel__arrow--prev" 
            data-action="prev" 
            aria-label="Anterior">
      <i class="fas fa-chevron-left"></i>
    </button>
  `;
}

/**
 * Renderiza la flecha siguiente
 */
function renderNextArrow(): string {
  return `
    <button class="ubits-carousel__arrow ubits-carousel__arrow--next" 
            data-action="next" 
            aria-label="Siguiente">
      <i class="fas fa-chevron-right"></i>
    </button>
  `;
}

/**
 * Renderiza los indicadores de paginación (dots)
 */
function renderDots(totalItems: number, itemsPerView: number): string {
  const totalPages = Math.ceil(totalItems / itemsPerView);
  const dots = Array.from({ length: totalPages }, (_, index) => {
    const isActive = index === 0 ? 'ubits-carousel__dot--active' : '';
    return `
      <button class="ubits-carousel__dot ${isActive}" 
              data-dot-index="${index}" 
              aria-label="Ir a página ${index + 1}">
      </button>
    `;
  }).join('');

  return `<div class="ubits-carousel__dots">${dots}</div>`;
}

/**
 * Crea un elemento DOM del carrusel y lo inicializa
 */
export function createCarousel(options: CarouselOptions): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = renderCarousel(options);
  const carousel = container.firstElementChild as HTMLElement;

  if (carousel) {
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    // Esto es más compatible con Storybook que setTimeout
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initializeCarousel(carousel, options);
      });
    });
  }

  return carousel || container;
}

/**
 * Inicializa la funcionalidad JavaScript del carrusel
 */
export function initializeCarousel(element: HTMLElement, options: CarouselOptions): void {
  const track = element.querySelector('.ubits-carousel__track') as HTMLElement;
  const items = element.querySelectorAll('.ubits-carousel-item');
  const prevButton = element.querySelector('.ubits-carousel__arrow--prev') as HTMLElement;
  const nextButton = element.querySelector('.ubits-carousel__arrow--next') as HTMLElement;
  const dots = element.querySelectorAll('.ubits-carousel__dot') as NodeListOf<HTMLElement>;
  
  if (!track || items.length === 0) return;

  const itemsPerView = parseInt(element.getAttribute('data-items-per-view') || '3');
  const gap = parseInt(element.getAttribute('data-gap') || '16');
  const autoplay = element.getAttribute('data-autoplay') === 'true';
  const autoplayInterval = parseInt(element.getAttribute('data-autoplay-interval') || '3000');
  const loop = element.getAttribute('data-loop') === 'true';

  let currentIndex = 0;
  let autoplayTimer: number | null = null;

  // No forzar ancho de los items - dejar que las Simple Cards usen sus propios max-width
  // según su variante de tamaño (sm, md, lg, xl)
  // El carrusel se adaptará al tamaño natural de las cards
  // Esperar a que el DOM esté completamente renderizado antes de calcular anchos
  const setupItems = () => {
    // Primero, encontrar la altura máxima de todas las cards
    let maxHeight = 0;
    items.forEach((item) => {
      const simpleCard = item.querySelector('.ubits-simple-card') as HTMLElement;
      if (simpleCard) {
        // Asegurar que el item contenedor no fuerce el ancho
        (item as HTMLElement).style.width = 'auto';
        (item as HTMLElement).style.minWidth = '0';
        (item as HTMLElement).style.flexShrink = '0';
        // Calcular altura después de que el layout esté listo
        const cardHeight = simpleCard.offsetHeight || simpleCard.getBoundingClientRect().height;
        if (cardHeight > maxHeight) {
          maxHeight = cardHeight;
        }
      }
    });
    
    // Aplicar la altura máxima a todas las cards para que tengan la misma altura
    if (maxHeight > 0) {
      items.forEach((item) => {
        const simpleCard = item.querySelector('.ubits-simple-card') as HTMLElement;
        if (simpleCard) {
          simpleCard.style.height = `${maxHeight}px`;
        }
      });
    }
  };
  
  // Ejecutar setup después de que el DOM esté listo
  // Usar múltiples requestAnimationFrame para asegurar que el layout esté completo
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setupItems();
      });
    });
  });

  // Calcular el ancho de cada card para la navegación
  // Usar el ancho real de la primera card visible como referencia
  const getCardWidth = (): number => {
    if (items.length === 0) return 0;
    const firstItem = items[0] as HTMLElement;
    const firstCard = firstItem.querySelector('.ubits-simple-card') as HTMLElement;
    if (firstCard && firstCard.offsetWidth > 0) {
      // Usar offsetWidth que incluye padding y border
      return firstCard.offsetWidth + gap;
    }
    // Si aún no tiene ancho, usar getBoundingClientRect
    if (firstCard) {
      const cardRect = firstCard.getBoundingClientRect();
      if (cardRect.width > 0) {
        return cardRect.width + gap;
      }
    }
    // Fallback: usar el ancho del contenedor dividido por itemsPerView
    const container = element.querySelector('.ubits-carousel__container') as HTMLElement;
    if (container && container.offsetWidth > 0) {
      return container.offsetWidth / itemsPerView;
    }
    return 300; // Fallback por defecto
  };

  // Función para actualizar posición
  const updatePosition = () => {
    const cardWidth = getCardWidth();
    const translateX = -currentIndex * cardWidth;
    track.style.transform = `translateX(${translateX}px)`;
    
    // Actualizar dots
    dots.forEach((dot, index) => {
      const pageIndex = Math.floor(currentIndex / itemsPerView);
      if (index === pageIndex) {
        dot.classList.add('ubits-carousel__dot--active');
      } else {
        dot.classList.remove('ubits-carousel__dot--active');
      }
    });

    // Callback
    if (options.onSlideChange) {
      options.onSlideChange(currentIndex);
    }
  };

  // Navegación anterior
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else if (loop) {
        currentIndex = items.length - itemsPerView;
      }
      updatePosition();
      resetAutoplay();
    });
  }

  // Navegación siguiente
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      const maxIndex = Math.max(0, items.length - itemsPerView);
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else if (loop) {
        currentIndex = 0;
      }
      updatePosition();
      resetAutoplay();
    });
  }

  // Click en dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index * itemsPerView;
      updatePosition();
      resetAutoplay();
    });
  });

  // Click en items (solo si no es un botón)
  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      // No activar si se hace click en botones
      if (target.closest('button') || target.closest('.ubits-button')) return;
      
      const itemId = item.getAttribute('data-item-id');
      const carouselItem = options.items.find(i => String(i.id) === itemId);
      if (carouselItem && carouselItem.onItemClick) {
        carouselItem.onItemClick(carouselItem);
      } else if (carouselItem && options.onItemClick) {
        options.onItemClick(carouselItem);
      }
    });
  });

  // Autoplay
  const startAutoplay = () => {
    if (autoplay) {
      autoplayTimer = window.setInterval(() => {
        const maxIndex = Math.max(0, items.length - itemsPerView);
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else if (loop) {
          currentIndex = 0;
        } else {
          currentIndex = 0; // Reiniciar
        }
        updatePosition();
      }, autoplayInterval);
    }
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  // Pausar autoplay al hacer hover
  element.addEventListener('mouseenter', stopAutoplay);
  element.addEventListener('mouseleave', startAutoplay);

  // Inicializar después de que las cards tengan su tamaño real
  // Usar requestAnimationFrame para asegurar que el layout esté completo
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      updatePosition();
      startAutoplay();
    });
  });
}

