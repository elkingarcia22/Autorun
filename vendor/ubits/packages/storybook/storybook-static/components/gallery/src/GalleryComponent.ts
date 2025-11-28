/**
 * Web Component: ubits-gallery
 * Componente de galería UBITS como Web Component nativo
 */

import { GalleryOptions, GalleryLayout, GallerySize } from './types/GalleryOptions';
import { renderGallery, createGallery } from './GalleryProvider';

export class UBITSGallery extends HTMLElement {
  private options: GalleryOptions = { items: [] };

  static get observedAttributes() {
    return [
      'layout',
      'size',
      'columns',
      'gap',
      'show-thumbnails',
      'lazy-load',
      'lightbox',
      'aspect-ratio',
      'class'
    ];
  }

  connectedCallback() {
    this.updateOptions();
    this.render();
  }

  attributeChangedCallback() {
    this.updateOptions();
    this.render();
  }

  disconnectedCallback() {
    // Cleanup si es necesario
  }

  private updateOptions() {
    // Parsear items desde atributo data-items
    let items: GalleryOptions['items'] = [];
    const itemsData = this.getAttribute('data-items');
    if (itemsData) {
      try {
        items = JSON.parse(itemsData);
      } catch (e) {
        console.error('Error parsing gallery items:', e);
      }
    }

    this.options = {
      items,
      layout: (this.getAttribute('layout') as GalleryLayout) || 'grid',
      size: (this.getAttribute('size') as GallerySize) || 'md',
      columns: parseInt(this.getAttribute('columns') || '3'),
      gap: parseInt(this.getAttribute('gap') || '16'),
      showThumbnails: this.getAttribute('show-thumbnails') === 'true',
      lazyLoad: this.getAttribute('lazy-load') === 'true',
      lightbox: this.getAttribute('lightbox') === 'true',
      aspectRatio: this.getAttribute('aspect-ratio') || undefined,
      className: this.getAttribute('class') || ''
    };
  }

  private render() {
    this.innerHTML = renderGallery(this.options);
    
    // Inicializar funcionalidad JavaScript
    const galleryElement = this.querySelector('.ubits-gallery') as HTMLElement;
    if (galleryElement) {
      const { initializeGallery } = require('./GalleryProvider');
      initializeGallery(galleryElement, this.options);
    }
  }

  // Métodos públicos para actualizar la galería
  public setItems(items: GalleryOptions['items']) {
    this.options.items = items;
    this.setAttribute('data-items', JSON.stringify(items));
    this.render();
  }

  public setLayout(layout: GalleryLayout) {
    this.options.layout = layout;
    this.setAttribute('layout', layout || 'grid');
    this.render();
  }

  public setSize(size: GallerySize) {
    this.options.size = size;
    this.setAttribute('size', size || 'md');
    this.render();
  }
}

