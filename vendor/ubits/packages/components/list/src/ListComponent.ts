/**
 * ListComponent: Web Component para el componente List
 */

import type { ListOptions, ListItem } from './types/ListOptions';
import { renderList, createList } from './ListProvider';

export class UBITSList extends HTMLElement {
  private options: ListOptions | null = null;

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['max-height', 'multiple'];
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const containerId = this.id || 'ubits-list-container';
    
    // Si no existe el contenedor, crear uno
    if (!document.getElementById(containerId)) {
      this.id = containerId;
    }

    // Obtener items desde atributos o contenido
    const items: ListItem[] = this.getItemsFromAttributes();

    if (items.length === 0) {
      this.innerHTML = '<div class="ubits-list">No hay items</div>';
      return;
    }

    const maxHeight = this.getAttribute('max-height') || '400px';
    const multiple = this.hasAttribute('multiple');

    const options: ListOptions = {
      containerId,
      items,
      maxHeight,
      multiple,
      onSelectionChange: (item, index) => {
        this.dispatchEvent(new CustomEvent('selection-change', {
          detail: { item, index },
          bubbles: true
        }));
      }
    };

    this.options = options;
    createList(options);
  }

  private getItemsFromAttributes(): ListItem[] {
    const itemsJson = this.getAttribute('items');
    if (itemsJson) {
      try {
        return JSON.parse(itemsJson);
      } catch {
        return [];
      }
    }

    // Si no hay atributo, leer desde slots o contenido
    const slots = this.querySelectorAll('ubits-list-item');
    if (slots.length > 0) {
      return Array.from(slots).map((slot, index) => ({
        label: slot.textContent || '',
        state: (slot.getAttribute('state') as any) || 'default',
        value: slot.getAttribute('value') || `item-${index}`,
        selected: slot.hasAttribute('selected')
      }));
    }

    return [];
  }

  // Métodos públicos para actualizar la lista
  public updateItems(items: ListItem[]) {
    if (this.options) {
      this.options.items = items;
      createList(this.options);
    }
  }

  public selectItem(index: number) {
    if (this.options && this.options.items[index]) {
      const item = this.options.items[index];
      if (item.state !== 'disabled') {
        item.selected = true;
        this.render();
      }
    }
  }

  public getSelectedItems(): ListItem[] {
    if (!this.options) return [];
    return this.options.items.filter(item => item.selected);
  }
}

customElements.define('ubits-list', UBITSList);

