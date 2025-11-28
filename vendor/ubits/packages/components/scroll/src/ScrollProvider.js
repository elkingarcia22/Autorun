/**
 * Scrollbar Provider
 * Componente scrollbar personalizado UBITS
 */
/**
 * Renderiza el HTML de un Scrollbar
 */
export function renderScrollbar(options) {
    const { orientation = 'vertical', state = 'default', className = '' } = options;
    // Construir clases
    const classes = [
        'ubits-scrollbar',
        `ubits-scrollbar--${orientation}`,
        state ? `ubits-scrollbar--${state}` : '',
        className
    ].filter(Boolean).join(' ');
    return `
    <div class="${classes}">
      <div class="ubits-scrollbar__bar"></div>
    </div>
  `.trim();
}
/**
 * Crea y renderiza un Scrollbar en el DOM y lo sincroniza con un elemento scrollable
 */
export function createScrollbar(options) {
    const { containerId, targetId, orientation = 'vertical', state = 'default', className = '' } = options;
    // Crear contenedor si no existe
    let container;
    if (containerId) {
        container = document.getElementById(containerId) || document.body;
    }
    else {
        container = document.body;
    }
    // Crear elemento del scrollbar
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderScrollbar({ orientation, state, className });
    const scrollbarElement = wrapper.firstElementChild;
    if (!scrollbarElement) {
        throw new Error('No se pudo crear el scrollbar');
    }
    const barElement = scrollbarElement.querySelector('.ubits-scrollbar__bar');
    if (!barElement) {
        throw new Error('No se pudo encontrar la barra del scrollbar');
    }
    // Obtener el elemento target (scrollable)
    let targetElement = null;
    if (targetId) {
        targetElement = document.getElementById(targetId);
    }
    else if (containerId) {
        // Si no hay targetId, buscar el primer elemento scrollable en el contenedor
        const scrollable = container.querySelector('[data-scrollable]');
        if (scrollable) {
            targetElement = scrollable;
        }
    }
    // Función para actualizar el scrollbar basado en el scroll del target
    const updateScrollbar = () => {
        if (!targetElement || !barElement)
            return;
        const isVertical = orientation === 'vertical';
        const scrollProperty = isVertical ? 'scrollTop' : 'scrollLeft';
        const clientProperty = isVertical ? 'clientHeight' : 'clientWidth';
        const scrollSizeProperty = isVertical ? 'scrollHeight' : 'scrollWidth';
        const scroll = targetElement[scrollProperty];
        const clientSize = targetElement[clientProperty];
        const scrollSize = targetElement[scrollSizeProperty];
        if (scrollSize <= clientSize) {
            // No hay scroll necesario
            barElement.style.opacity = '0';
            return;
        }
        // Calcular posición y tamaño del thumb
        const scrollbarSize = isVertical ? scrollbarElement.clientHeight : scrollbarElement.clientWidth;
        const thumbSize = Math.max((clientSize / scrollSize) * scrollbarSize, 20); // Mínimo 20px
        const maxThumbPosition = scrollbarSize - thumbSize;
        const thumbPosition = (scroll / (scrollSize - clientSize)) * maxThumbPosition;
        if (isVertical) {
            barElement.style.height = `${thumbSize}px`;
            barElement.style.transform = `translateY(${thumbPosition}px)`;
        }
        else {
            barElement.style.width = `${thumbSize}px`;
            barElement.style.transform = `translateX(${thumbPosition}px)`;
        }
        barElement.style.opacity = '1';
    };
    // Función para hacer scroll al hacer clic en el scrollbar
    const handleScrollbarClick = (e) => {
        if (!targetElement || !barElement)
            return;
        // Prevenir que el clic en la barra misma active el scroll
        if (e.target === barElement) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        const isVertical = orientation === 'vertical';
        const rect = scrollbarElement.getBoundingClientRect();
        const clickPosition = isVertical
            ? e.clientY - rect.top
            : e.clientX - rect.left;
        const scrollbarSize = isVertical ? scrollbarElement.clientHeight : scrollbarElement.clientWidth;
        const percentage = clickPosition / scrollbarSize;
        const clientProperty = isVertical ? 'clientHeight' : 'clientWidth';
        const scrollSizeProperty = isVertical ? 'scrollHeight' : 'scrollWidth';
        const scrollProperty = isVertical ? 'scrollTop' : 'scrollLeft';
        const clientSize = targetElement[clientProperty];
        const scrollSize = targetElement[scrollSizeProperty];
        const maxScroll = scrollSize - clientSize;
        targetElement[scrollProperty] = percentage * maxScroll;
    };
    // Función para arrastrar el scrollbar
    let isDragging = false;
    let startPosition = 0;
    let startScroll = 0;
    const handleMouseDown = (e) => {
        if (!targetElement || !barElement)
            return;
        if (e.target !== barElement)
            return;
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        const isVertical = orientation === 'vertical';
        startPosition = isVertical ? e.clientY : e.clientX;
        startScroll = isVertical ? targetElement.scrollTop : targetElement.scrollLeft;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    const handleMouseMove = (e) => {
        if (!isDragging || !targetElement || !barElement)
            return;
        const isVertical = orientation === 'vertical';
        const currentPosition = isVertical ? e.clientY : e.clientX;
        const delta = currentPosition - startPosition;
        const scrollbarSize = isVertical ? scrollbarElement.clientHeight : scrollbarElement.clientWidth;
        const clientSize = isVertical ? targetElement.clientHeight : targetElement.clientWidth;
        const scrollSize = isVertical ? targetElement.scrollHeight : targetElement.scrollWidth;
        const maxScroll = scrollSize - clientSize;
        const scrollRatio = maxScroll / scrollbarSize;
        const newScroll = startScroll + (delta * scrollRatio);
        if (isVertical) {
            targetElement.scrollTop = Math.max(0, Math.min(maxScroll, newScroll));
        }
        else {
            targetElement.scrollLeft = Math.max(0, Math.min(maxScroll, newScroll));
        }
    };
    const handleMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    // Event listeners
    if (targetElement) {
        targetElement.addEventListener('scroll', updateScrollbar);
        targetElement.addEventListener('resize', updateScrollbar);
        // Observar cambios en el contenido
        const resizeObserver = new ResizeObserver(() => {
            updateScrollbar();
        });
        resizeObserver.observe(targetElement);
        // Guardar referencia al observer para poder desconectarlo
        scrollbarElement.__resizeObserver = resizeObserver;
    }
    // Eventos del scrollbar
    scrollbarElement.addEventListener('click', handleScrollbarClick);
    barElement.addEventListener('mousedown', handleMouseDown);
    // Guardar funciones para poder limpiarlas después
    scrollbarElement.__handleMouseUp = handleMouseUp;
    scrollbarElement.__handleMouseMove = handleMouseMove;
    // Agregar al DOM
    container.appendChild(scrollbarElement);
    // Actualizar inicialmente
    setTimeout(() => {
        updateScrollbar();
    }, 100);
    return {
        element: scrollbarElement,
        update: updateScrollbar,
        destroy: () => {
            if (targetElement) {
                targetElement.removeEventListener('scroll', updateScrollbar);
                targetElement.removeEventListener('resize', updateScrollbar);
                const resizeObserver = scrollbarElement.__resizeObserver;
                if (resizeObserver) {
                    resizeObserver.disconnect();
                }
            }
            scrollbarElement.removeEventListener('click', handleScrollbarClick);
            barElement.removeEventListener('mousedown', handleMouseDown);
            // Limpiar listeners de drag si existen
            if (scrollbarElement.__handleMouseUp) {
                document.removeEventListener('mousemove', scrollbarElement.__handleMouseMove);
                document.removeEventListener('mouseup', scrollbarElement.__handleMouseUp);
            }
            scrollbarElement.remove();
        }
    };
}
