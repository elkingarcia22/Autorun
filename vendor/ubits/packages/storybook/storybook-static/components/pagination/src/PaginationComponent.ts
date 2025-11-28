/**
 * PaginationComponent
 * Web Component para Pagination usando Custom Elements API
 */

import { renderPagination, createPagination } from './PaginationProvider';
import type { PaginationOptions } from './types/PaginationOptions';
import './styles/pagination.css';

export class UBITSPagination extends HTMLElement {
  private options: PaginationOptions = {
    totalPages: 1
  };

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'current-page', 'total-pages'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  setOptions(options: PaginationOptions) {
    this.options = { ...this.options, ...options };
    this.render();
  }

  getOptions(): PaginationOptions {
    return { ...this.options };
  }

  private render() {
    // Obtener atributos del elemento
    const variant = this.getAttribute('variant') as PaginationOptions['variant'] || this.options.variant;
    const size = this.getAttribute('size') as PaginationOptions['size'] || this.options.size;
    const currentPage = parseInt(this.getAttribute('current-page') || String(this.options.currentPage || 1));
    const totalPages = parseInt(this.getAttribute('total-pages') || String(this.options.totalPages || 1));

    // Combinar opciones
    const finalOptions: PaginationOptions = {
      ...this.options,
      variant,
      size,
      currentPage,
      totalPages
    };

    // Renderizar
    this.innerHTML = renderPagination(finalOptions);

    // Agregar event listeners si existen
    if (this.options.onPageChange) {
      const buttons = this.querySelectorAll('button');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const page = parseInt(button.getAttribute('data-page') || '1');
          this.options.onPageChange?.(page);
        });
      });
    }
  }
}

// Registrar el componente si no está registrado
if (typeof window !== 'undefined' && !customElements.get('ubits-pagination')) {
  customElements.define('ubits-pagination', UBITSPagination);
}

