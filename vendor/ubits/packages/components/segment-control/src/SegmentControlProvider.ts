import type { SegmentControlOptions, SegmentItem } from './types/SegmentControlOptions';

/**
 * Helper para renderizar iconos FontAwesome
 * @param iconName - Nombre del icono (ej: "fa-th" o "th")
 * @param isActive - Si el segmento está activo (usa solid), si no (usa regular)
 */
function renderIconHelper(iconName?: string, isActive: boolean = false): string {
  if (!iconName) return '';
  
  // Normalizar icono: asegurar que tiene prefijo fa-
  let normalizedIcon = iconName;
  if (!normalizedIcon.startsWith('fa-')) {
    normalizedIcon = `fa-${normalizedIcon}`;
  }
  
  // Determinar estilo según estado activo
  // Active: solid (fas), Inactive: regular (far)
  const iconStyle = isActive ? 'fas' : 'far';
  
  // Si ya tiene prefijo far o fas, reemplazarlo según el estado
  if (normalizedIcon.startsWith('far ') || normalizedIcon.startsWith('fas ')) {
    // Extraer solo el nombre del icono sin el prefijo
    const iconNameOnly = normalizedIcon.replace(/^(far|fas)\s+/, '');
    return `<i class="${iconStyle} ${iconNameOnly}"></i>`;
  }
  
  // Si no tiene prefijo, agregar el estilo correspondiente
  return `<i class="${iconStyle} ${normalizedIcon}"></i>`;
}

/**
 * Renderiza el HTML del componente Segment Control
 */
export function renderSegmentControl(options: SegmentControlOptions): string {
  const { segments, activeSegmentId, className = '' } = options;

  if (!segments || segments.length === 0) {
    return '<div class="ubits-segment-control"></div>';
  }

  // Determinar segmento activo
  let activeId = activeSegmentId;
  if (!activeId) {
    const activeSegment = segments.find(segment => segment.active);
    activeId = activeSegment ? activeSegment.id : segments[0].id;
  }

  // Renderizar segmentos
  const segmentsHTML = segments.map(segment => {
    const isActive = segment.id === activeId;
    const activeClass = isActive ? 'ubits-segment--active' : '';
    const disabledClass = segment.disabled ? 'ubits-segment--disabled' : '';
    const classes = ['ubits-segment', activeClass, disabledClass].filter(Boolean).join(' ');
    
    // Pasar isActive para determinar si usa solid (active) o regular (inactive)
    const iconHTML = segment.icon ? renderIconHelper(segment.icon, isActive) : '';
    
    return `
      <button 
        class="${classes}" 
        data-segment-id="${segment.id}"
        ${segment.disabled ? 'disabled' : ''}
        ${segment.url ? `data-url="${segment.url}"` : ''}
        ${segment.onClick ? 'data-has-click-handler="true"' : ''}
      >
        ${iconHTML}
        <span class="ubits-segment__label">${segment.label}</span>
      </button>
    `;
  }).join('');

  const containerClasses = ['ubits-segment-control', className].filter(Boolean).join(' ');

  return `
    <div class="${containerClasses}">
      ${segmentsHTML}
    </div>
  `.trim();
}

/**
 * Inicializa los event listeners de los segmentos
 */
function initSegmentListeners(segmentsElement: HTMLElement, options: SegmentControlOptions): void {
  // Remover listeners anteriores si existen (marcar con data attribute)
  const existingSegments = segmentsElement.querySelectorAll<HTMLElement>('.ubits-segment[data-listener-attached]');
  existingSegments.forEach(segment => {
    const clonedSegment = segment.cloneNode(true) as HTMLElement;
    segment.parentNode?.replaceChild(clonedSegment, segment);
  });
  
  const segments = segmentsElement.querySelectorAll<HTMLElement>('.ubits-segment:not(.ubits-segment--disabled)');
  
  const handleSegmentClick = (segmentElement: HTMLElement) => {
    const segmentId = segmentElement.getAttribute('data-segment-id');
    const url = segmentElement.getAttribute('data-url');
    
    // Remover active de todos los segmentos
    segmentsElement.querySelectorAll('.ubits-segment').forEach(s => {
      s.classList.remove('ubits-segment--active');
    });
    
    // Agregar active al segmento clickeado
    segmentElement.classList.add('ubits-segment--active');
    
    // Actualizar iconos según estado activo
    segmentsElement.querySelectorAll('.ubits-segment').forEach(s => {
      const isActive = s.classList.contains('ubits-segment--active');
      const iconElement = s.querySelector('i');
      if (iconElement) {
        const iconName = iconElement.className.replace(/^(far|fas)\s+/, '').replace(/^fa-/, '');
        const iconStyle = isActive ? 'fas' : 'far';
        iconElement.className = `${iconStyle} fa-${iconName}`;
      }
    });
    
    // Navegar a URL si existe
    if (url) {
      window.location.href = url;
      return;
    }
    
    // Buscar el callback onClick del segmento original
    const segmentConfig = options.segments.find(s => s.id === segmentId);
    
    if (segmentConfig && segmentConfig.onClick) {
      segmentConfig.onClick(new MouseEvent('click'));
    }
    
    // Llamar callback si existe
    if (options.onSegmentChange) {
      options.onSegmentChange(segmentId || '', segmentElement);
    }
    
    // Disparar evento personalizado
    const event = new CustomEvent('segmentControlSegmentClick', {
      detail: { segmentId: segmentId, segmentElement: segmentElement }
    });
    document.dispatchEvent(event);
  };

  // Event listeners para segmentos
  segments.forEach(segment => {
    segment.setAttribute('data-listener-attached', 'true');
    segment.addEventListener('click', (e) => {
      e.preventDefault();
      handleSegmentClick(segment);
    });
  });
}

/**
 * Crea un componente Segment Control interactivo en el DOM
 */
export function createSegmentControl(options: SegmentControlOptions, containerId?: string): HTMLElement {
  const container = containerId 
    ? document.getElementById(containerId) || document.createElement('div')
    : document.createElement('div');
  
  if (containerId && !container.id) {
    container.id = containerId;
  }
  
  container.innerHTML = renderSegmentControl(options);
  
  // Inicializar listeners - buscar el elemento .ubits-segment-control dentro del contenedor
  requestAnimationFrame(() => {
    const segmentsElement = container.querySelector('.ubits-segment-control') as HTMLElement;
    if (segmentsElement) {
      initSegmentListeners(segmentsElement, options);
    } else {
      // Fallback: usar el contenedor directamente si no se encuentra .ubits-segment-control
      initSegmentListeners(container, options);
    }
  });
  
  return container;
}

