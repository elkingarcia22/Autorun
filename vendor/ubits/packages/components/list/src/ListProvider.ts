/**
 * ListProvider: Lógica para renderizar y gestionar el componente List
 */

import type { ListOptions, ListItem } from './types/ListOptions';
import './styles/list.css';

/**
 * Renderiza el HTML de una lista
 */
export function renderList(options: ListOptions): string {
  const {
    items,
    size = 'md',
    maxHeight = '400px',
    className = '',
    attributes = {}
  } = options;

  const containerClasses = ['ubits-list', className].filter(Boolean).join(' ');
  const containerAttrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  let listHTML = `<div class="${containerClasses}" role="list" style="max-height: ${maxHeight};" ${containerAttrs}>`;

  items.forEach((item, index) => {
    const itemId = item.value || `list-item-${index}`;
    const itemState = item.state || (item.selected ? 'active' : 'default');
    const itemClasses = [
      'ubits-list-item',
      `ubits-list-item--${size}`,
      itemState !== 'default' ? `ubits-list-item--${itemState}` : ''
    ].filter(Boolean).join(' ');

    const itemAttrs: string[] = [];
    if (item.selected) {
      itemAttrs.push('aria-selected="true"');
    }
    if (itemState === 'disabled') {
      itemAttrs.push('aria-disabled="true"');
    } else {
      itemAttrs.push('tabindex="0"');
    }
    itemAttrs.push(`data-value="${itemId}"`);
    itemAttrs.push(`data-index="${index}"`);

    if (item.attributes) {
      Object.entries(item.attributes).forEach(([key, value]) => {
        itemAttrs.push(`${key}="${value}"`);
      });
    }

    listHTML += `
      <div class="${itemClasses}" role="listitem" ${itemAttrs.join(' ')}>
        ${item.label}
      </div>
    `;
  });

  listHTML += '</div>';

  return listHTML;
}

/**
 * Crea una lista interactiva en el DOM
 */
export function createList(options: ListOptions): HTMLElement {
  const {
    containerId,
    items,
    size = 'md',
    onSelectionChange,
    multiple = false
  } = options;

  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id "${containerId}" not found`);
  }

  const listHTML = renderList(options);
  
  // Si el contenedor ya tiene contenido, reemplazarlo
  container.innerHTML = listHTML;

  const listElement = container.querySelector('.ubits-list') as HTMLElement;
  if (!listElement) {
    throw new Error('Failed to create list element');
  }

  // Agregar event listeners
  const listItems = listElement.querySelectorAll('.ubits-list-item');
  let selectedIndex: number | null = null;

  listItems.forEach((itemEl, index) => {
    const item = items[index];
    if (!item) return;

    // Click handler
    if (item.state !== 'disabled') {
      itemEl.addEventListener('click', () => {
        if (item.onClick) {
          item.onClick(item, index);
        }

        if (!multiple) {
          // Deseleccionar anterior
          if (selectedIndex !== null && selectedIndex !== index) {
            const prevItem = listItems[selectedIndex];
            prevItem.classList.remove('ubits-list-item--active');
            prevItem.removeAttribute('aria-selected');
          }

          // Seleccionar nuevo
          if (selectedIndex !== index) {
            itemEl.classList.add('ubits-list-item--active');
            itemEl.setAttribute('aria-selected', 'true');
            selectedIndex = index;

            if (onSelectionChange) {
              onSelectionChange(item, index);
            }
          } else {
            // Deseleccionar si se hace clic en el mismo
            itemEl.classList.remove('ubits-list-item--active');
            itemEl.removeAttribute('aria-selected');
            selectedIndex = null;

            if (onSelectionChange) {
              onSelectionChange(null, null);
            }
          }
        } else {
          // Selección múltiple
          const isSelected = itemEl.classList.contains('ubits-list-item--active');
          if (isSelected) {
            itemEl.classList.remove('ubits-list-item--active');
            itemEl.removeAttribute('aria-selected');
          } else {
            itemEl.classList.add('ubits-list-item--active');
            itemEl.setAttribute('aria-selected', 'true');
          }

          if (onSelectionChange) {
            const selectedItems = Array.from(listItems)
              .map((el, idx) => {
                if (el.classList.contains('ubits-list-item--active')) {
                  return { item: items[idx], index: idx };
                }
                return null;
              })
              .filter(Boolean) as Array<{ item: ListItem; index: number }>;

            // Por ahora, solo pasamos el último seleccionado para compatibilidad
            if (selectedItems.length > 0) {
              const last = selectedItems[selectedItems.length - 1];
              onSelectionChange(last.item, last.index);
            } else {
              onSelectionChange(null, null);
            }
          }
        }
      });
    }

    // Keyboard navigation
    if (item.state !== 'disabled') {
      itemEl.addEventListener('keydown', (e) => {
        const currentIndex = index;
        let targetIndex: number | null = null;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          targetIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          targetIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (itemEl as HTMLElement).click();
          return;
        } else if (e.key === 'Home') {
          e.preventDefault();
          targetIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          targetIndex = items.length - 1;
        }

        if (targetIndex !== null) {
          const targetItem = listItems[targetIndex] as HTMLElement;
          if (targetItem && items[targetIndex]?.state !== 'disabled') {
            targetItem.focus();
            targetItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
      });
    }
  });

  return listElement;
}

