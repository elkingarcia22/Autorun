/**
 * AccordionProvider
 * Lógica de renderizado del componente Accordion
 * Genera HTML según las opciones proporcionadas
 */

import type { AccordionOptions, AccordionItem } from './types/AccordionOptions';

// Helper para renderizar iconos FontAwesome
function renderIconHelper(iconName: string, iconStyle: 'regular' | 'solid' = 'regular'): string {
  const iconClass = iconStyle === 'solid' ? 'fas' : 'far';
  const name = iconName.startsWith('fa-') ? iconName : `fa-${iconName}`;
  return `<i class="${iconClass} ${name}"></i>`;
}

/**
 * Renderiza un item de accordion
 */
function renderAccordionItem(
  item: AccordionItem,
  options: AccordionOptions,
  itemId: string
): string {
  const {
    variant = 'list',
    chevronPosition = 'right',
    showIcons = true
  } = options;

  const isBoxed = variant === 'boxed';
  const chevronLeft = chevronPosition === 'left';
  const chevronRight = chevronPosition === 'right';

  // Clases base
  const itemClasses = [
    'ubits-accordion-item',
    isBoxed && 'ubits-accordion-item--boxed'
  ].filter(Boolean).join(' ');

  // Chevron HTML
  const chevronHTML = chevronLeft || chevronRight
    ? `<i class="far fa-chevron-down ubits-accordion-chevron" data-chevron-id="${itemId}"></i>`
    : '';

  // Icono HTML (solo si showIcons es true y el item tiene icono)
  const iconHTML = (showIcons && item.icon)
    ? `<span class="ubits-accordion-icon">${renderIconHelper(item.icon, item.iconStyle || 'regular')}</span>`
    : '';

  // Header content
  const headerContent = chevronLeft
    ? `${chevronHTML}${iconHTML}<div class="ubits-accordion-header-content"><span class="ubits-accordion-title">${item.title}</span>${item.subHeader ? `<span class="ubits-accordion-subheader">${item.subHeader}</span>` : ''}</div>`
    : `${iconHTML}<div class="ubits-accordion-header-content"><span class="ubits-accordion-title">${item.title}</span>${item.subHeader ? `<span class="ubits-accordion-subheader">${item.subHeader}</span>` : ''}</div>${chevronHTML}`;

  // Body content
  const bodyContent = item.content
    ? `<div class="ubits-accordion-body-content">${item.content}</div>`
    : '';

  return `
    <div class="${itemClasses}" data-accordion-id="${itemId}">
      <div class="ubits-accordion-header" data-header-id="${itemId}">
        ${headerContent}
      </div>
      <div class="ubits-accordion-body" data-body-id="${itemId}">
        ${bodyContent}
      </div>
    </div>
  `;
}

/**
 * Renderiza un accordion UBITS como HTML string
 */
export function renderAccordion(options: AccordionOptions): string {
  const {
    items,
    variant = 'list',
    chevronPosition = 'right',
    className = ''
  } = options;

  const accordionClasses = [
    'ubits-accordion',
    `ubits-accordion--${variant}`,
    `ubits-accordion--chevron-${chevronPosition}`,
    className
  ].filter(Boolean).join(' ');

  const itemsHTML = items
    .map(item => renderAccordionItem(item, options, item.id))
    .join('');

  return `<div class="${accordionClasses}" data-allow-multiple="${options.allowMultiple || false}">
    ${itemsHTML}
  </div>`;
}

/**
 * Crea un accordion UBITS y lo inicializa en el DOM
 */
export function createAccordion(
  container: HTMLElement | string,
  options: AccordionOptions
): HTMLElement | null {
  const target = typeof container === 'string'
    ? document.querySelector(container) as HTMLElement
    : container;

  if (!target) {
    console.error('❌ [createAccordion] Container no encontrado:', container);
    return null;
  }

  // Renderizar HTML
  const html = renderAccordion(options);
  target.innerHTML = html;

  const accordionElement = target.querySelector('.ubits-accordion') as HTMLElement;
  if (!accordionElement) {
    console.error('❌ [createAccordion] Accordion no se renderizó correctamente');
    return null;
  }

  // Inicializar funcionalidad
  initAccordion(accordionElement, options);

  return accordionElement;
}

/**
 * Inicializa la funcionalidad de toggle del accordion
 */
function initAccordion(element: HTMLElement, options: AccordionOptions): void {
  const allowMultiple = options.allowMultiple || false;
  const defaultOpen = options.defaultOpen || [];

  // Abrir items por defecto
  defaultOpen.forEach(id => {
    const body = element.querySelector(`[data-body-id="${id}"]`) as HTMLElement;
    const header = element.querySelector(`[data-header-id="${id}"]`) as HTMLElement;
    const chevron = element.querySelector(`[data-chevron-id="${id}"]`) as HTMLElement;
    
    if (body && header && chevron) {
      body.style.display = 'block';
      header.classList.add('ubits-accordion-header--open');
      chevron.style.transform = 'rotate(180deg)';
    }
  });

  // Agregar listeners a los headers
  const headers = element.querySelectorAll('.ubits-accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const headerId = header.getAttribute('data-header-id');
      if (!headerId) return;

      const body = element.querySelector(`[data-body-id="${headerId}"]`) as HTMLElement;
      const chevron = element.querySelector(`[data-chevron-id="${headerId}"]`) as HTMLElement;
      if (!body || !chevron) return;

      const isOpen = body.style.display === 'block';

      if (!allowMultiple && !isOpen) {
        // Cerrar todos los demás
        const allBodies = element.querySelectorAll('.ubits-accordion-body');
        const allHeaders = element.querySelectorAll('.ubits-accordion-header');
        const allChevrons = element.querySelectorAll('.ubits-accordion-chevron');
        
        allBodies.forEach(b => {
          if (b !== body) (b as HTMLElement).style.display = 'none';
        });
        allHeaders.forEach(h => {
          if (h !== header) h.classList.remove('ubits-accordion-header--open');
        });
        allChevrons.forEach(c => {
          if (c !== chevron) (c as HTMLElement).style.transform = 'rotate(0deg)';
        });
      }

      // Toggle del item actual
      if (isOpen) {
        body.style.display = 'none';
        header.classList.remove('ubits-accordion-header--open');
        chevron.style.transform = 'rotate(0deg)';
      } else {
        body.style.display = 'block';
        header.classList.add('ubits-accordion-header--open');
        chevron.style.transform = 'rotate(180deg)';
      }
    });
  });
}

