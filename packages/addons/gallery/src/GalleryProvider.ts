/**
 * GalleryProvider
 * Lógica de renderizado del componente Gallery
 * Genera HTML según las opciones proporcionadas
 */

import { GalleryOptions, GalleryItem, GalleryLayout, GallerySize } from './types/GalleryOptions';

/**
 * Renderiza una galería UBITS como HTML string
 */
export function renderGallery(options: GalleryOptions): string {
  const {
    items = [],
    layout = 'grid',
    size = 'md',
    columns = 3,
    gap = 16,
    showThumbnails = false,
    lazyLoad = false,
    lightbox = false,
    aspectRatio,
    className = '',
    onItemClick,
    onImageLoad,
    onImageError
  } = options;

  if (items.length === 0) {
    return '<div class="ubits-gallery ubits-gallery--empty">No hay imágenes para mostrar</div>';
  }

  // Construir clases CSS
  const classes = [
    'ubits-gallery',
    `ubits-gallery--${layout}`,
    `ubits-gallery--${size}`,
    showThumbnails && 'ubits-gallery--thumbnails',
    lazyLoad && 'ubits-gallery--lazy',
    lightbox && 'ubits-gallery--lightbox',
    className
  ].filter(Boolean).join(' ');

  // Renderizar items
  const itemsHTML = items.map((item, index) => 
    renderGalleryItem(item, index, { showThumbnails, lazyLoad, lightbox, aspectRatio, onItemClick, onImageLoad, onImageError })
  ).join('');

  // Atributos de datos para JavaScript
  const dataAttrs = [
    `data-layout="${layout}"`,
    `data-size="${size}"`,
    `data-columns="${columns}"`,
    `data-gap="${gap}"`,
    lightbox && 'data-lightbox="true"',
    lazyLoad && 'data-lazy="true"'
  ].filter(Boolean).join(' ');

  // Estilos inline para grid columns y gap
  const style = `--gallery-gap: ${gap}px; --gallery-columns: ${columns};`;

  return `
    <div class="${classes}" ${dataAttrs} style="${style}">
      <div class="ubits-gallery__container">
        ${itemsHTML}
      </div>
    </div>
  `;
}

/**
 * Renderiza un item de la galería
 */
function renderGalleryItem(
  item: GalleryItem,
  index: number,
  options: {
    showThumbnails: boolean;
    lazyLoad: boolean;
    lightbox: boolean;
    aspectRatio?: string;
    onItemClick?: (item: GalleryItem, index: number) => void;
    onImageLoad?: (item: GalleryItem, index: number) => void;
    onImageError?: (item: GalleryItem, index: number) => void;
  }
): string {
  const {
    id,
    image,
    thumbnail,
    title,
    description,
    alt
  } = item;

  const imageSrc = options.showThumbnails && thumbnail ? thumbnail : image;
  const imageAlt = alt || title || `Imagen ${index + 1}`;
  const loadingAttr = options.lazyLoad ? 'loading="lazy"' : '';
  const lightboxAttr = options.lightbox ? 'data-lightbox-item="true"' : '';
  const aspectRatioStyle = options.aspectRatio ? `style="aspect-ratio: ${options.aspectRatio};"` : '';

  return `
    <div class="ubits-gallery-item" 
         data-item-id="${id}" 
         data-item-index="${index}"
         ${lightboxAttr}
         ${aspectRatioStyle}>
      <div class="ubits-gallery-item__image-wrapper">
        <img src="${imageSrc}" 
             alt="${imageAlt}" 
             class="ubits-gallery-item__image"
             ${loadingAttr}
             data-full-image="${image}" />
        ${options.lightbox ? '<div class="ubits-gallery-item__overlay"><i class="fas fa-expand"></i></div>' : ''}
      </div>
    </div>
  `;
}

/**
 * Crea un elemento DOM de la galería y lo inicializa
 */
export function createGallery(options: GalleryOptions): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = renderGallery(options);
  const gallery = container.firstElementChild as HTMLElement;

  if (gallery) {
    // Usar setTimeout para asegurar que el DOM esté listo
    setTimeout(() => {
      initializeGallery(gallery, options);
    }, 0);
  }

  return gallery || container;
}

/**
 * Inicializa la funcionalidad JavaScript de la galería
 */
export function initializeGallery(element: HTMLElement, options: GalleryOptions): void {
  const items = element.querySelectorAll('.ubits-gallery-item');
  const lightbox = element.getAttribute('data-lightbox') === 'true';
  const lazyLoad = element.getAttribute('data-lazy') === 'true';

  if (items.length === 0) return;

  // Click en items
  items.forEach((item, index) => {
    const itemElement = item as HTMLElement;
    const itemId = itemElement.getAttribute('data-item-id');
    const galleryItem = options.items.find(i => String(i.id) === itemId);

    if (!galleryItem) return;

    // Click handler
    itemElement.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (options.onItemClick) {
        options.onItemClick(galleryItem, index);
      }

      // Lightbox
      if (lightbox) {
        openLightbox(galleryItem, options.items, index);
      }
    });

    // Image load handler
    const img = itemElement.querySelector('img') as HTMLImageElement;
    if (img) {
      img.addEventListener('load', () => {
        if (options.onImageLoad) {
          options.onImageLoad(galleryItem, index);
        }
      });

      img.addEventListener('error', () => {
        if (options.onImageError) {
          options.onImageError(galleryItem, index);
        }
        // Mostrar placeholder de error
        img.style.display = 'none';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'ubits-gallery-item__error';
        errorDiv.innerHTML = '<i class="fas fa-image"></i><span>Error al cargar imagen</span>';
        itemElement.querySelector('.ubits-gallery-item__image-wrapper')?.appendChild(errorDiv);
      });
    }
  });

  // Lazy loading con Intersection Observer
  if (lazyLoad && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const fullImage = img.getAttribute('data-full-image');
          if (fullImage && img.src !== fullImage) {
            img.src = fullImage;
          }
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    items.forEach(item => {
      const img = item.querySelector('img');
      if (img) {
        imageObserver.observe(img);
      }
    });
  }
}

/**
 * Abre el lightbox con la imagen seleccionada
 */
function openLightbox(item: GalleryItem, allItems: GalleryItem[], currentIndex: number): void {
  // Crear overlay del lightbox
  const overlay = document.createElement('div');
  overlay.className = 'ubits-gallery-lightbox';
  
  // Generar thumbnails
  const thumbnailsHTML = allItems.map((thumbItem, idx) => {
    const isActive = idx === currentIndex ? 'ubits-gallery-lightbox__thumbnail--active' : '';
    const thumbSrc = thumbItem.thumbnail || thumbItem.image;
    return `
      <div class="ubits-gallery-lightbox__thumbnail ${isActive}" 
           data-thumb-index="${idx}"
           data-item-id="${thumbItem.id}">
        <img src="${thumbSrc}" alt="${thumbItem.alt || thumbItem.title || `Thumbnail ${idx + 1}`}" />
      </div>
    `;
  }).join('');
  
  overlay.innerHTML = `
    <div class="ubits-gallery-lightbox__content">
      <button class="ubits-gallery-lightbox__close" aria-label="Cerrar">
        <i class="fas fa-times"></i>
      </button>
      <div class="ubits-gallery-lightbox__main">
        <button class="ubits-gallery-lightbox__prev" aria-label="Anterior">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="ubits-gallery-lightbox__image-wrapper">
          <img src="${item.image}" alt="${item.alt || item.title || 'Imagen'}" class="ubits-gallery-lightbox__image" />
        </div>
        <button class="ubits-gallery-lightbox__next" aria-label="Siguiente">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div class="ubits-gallery-lightbox__thumbnails">
        ${thumbnailsHTML}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  let currentIdx = currentIndex;

  // Cerrar lightbox
  const closeBtn = overlay.querySelector('.ubits-gallery-lightbox__close') as HTMLElement;
  const closeLightbox = () => {
    overlay.remove();
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeLightbox();
    }
  });

  // Navegación
  const prevBtn = overlay.querySelector('.ubits-gallery-lightbox__prev') as HTMLElement;
  const nextBtn = overlay.querySelector('.ubits-gallery-lightbox__next') as HTMLElement;
  const lightboxImage = overlay.querySelector('.ubits-gallery-lightbox__image') as HTMLImageElement;
  const thumbnails = overlay.querySelectorAll('.ubits-gallery-lightbox__thumbnail') as NodeListOf<HTMLElement>;

  const updateLightbox = () => {
    const currentItem = allItems[currentIdx];
    if (currentItem && lightboxImage) {
      lightboxImage.src = currentItem.image;
      lightboxImage.alt = currentItem.alt || currentItem.title || 'Imagen';
      
      // Actualizar thumbnails activos
      thumbnails.forEach((thumb, idx) => {
        if (idx === currentIdx) {
          thumb.classList.add('ubits-gallery-lightbox__thumbnail--active');
          // Scroll al thumbnail activo
          thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          thumb.classList.remove('ubits-gallery-lightbox__thumbnail--active');
        }
      });
    }
  };
  
  // Click en thumbnails
  thumbnails.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => {
      currentIdx = idx;
      updateLightbox();
    });
  });

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = currentIdx > 0 ? currentIdx - 1 : allItems.length - 1;
    updateLightbox();
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = currentIdx < allItems.length - 1 ? currentIdx + 1 : 0;
    updateLightbox();
  });

  // Navegación con teclado
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
      document.removeEventListener('keydown', handleKeyDown);
    } else if (e.key === 'ArrowLeft') {
      currentIdx = currentIdx > 0 ? currentIdx - 1 : allItems.length - 1;
      updateLightbox();
    } else if (e.key === 'ArrowRight') {
      currentIdx = currentIdx < allItems.length - 1 ? currentIdx + 1 : 0;
      updateLightbox();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
}

