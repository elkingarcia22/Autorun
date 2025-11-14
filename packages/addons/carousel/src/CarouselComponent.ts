/**
 * Web Component: ubits-carousel
 * Componente de carrusel UBITS como Web Component nativo
 */

import { CarouselOptions } from './types/CarouselOptions';
import { renderCarousel, createCarousel } from './CarouselProvider';

export class UBITSCarousel extends HTMLElement {
  private options: CarouselOptions = { items: [] };

  static get observedAttributes() {
    return [
      'items-per-view',
      'show-arrows',
      'show-dots',
      'autoplay',
      'autoplay-interval',
      'loop',
      'gap',
      'arrow-position',
      'dot-position',
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
    // Parsear items desde atributo data-items o desde slots
    let items: CarouselOptions['items'] = [];
    const itemsData = this.getAttribute('data-items');
    if (itemsData) {
      try {
        items = JSON.parse(itemsData);
      } catch (e) {
        console.error('Error parsing carousel items:', e);
      }
    }

    this.options = {
      items,
      itemsPerView: parseInt(this.getAttribute('items-per-view') || '3'),
      showArrows: this.getAttribute('show-arrows') !== 'false',
      showDots: this.getAttribute('show-dots') !== 'false',
      autoplay: this.getAttribute('autoplay') === 'true',
      autoplayInterval: parseInt(this.getAttribute('autoplay-interval') || '3000'),
      loop: this.getAttribute('loop') === 'true',
      gap: parseInt(this.getAttribute('gap') || '16'),
      arrowPosition: (this.getAttribute('arrow-position') as 'inside' | 'outside') || 'outside',
      dotPosition: (this.getAttribute('dot-position') as 'bottom' | 'top') || 'bottom',
      className: this.getAttribute('class') || ''
    };
  }

  private render() {
    this.innerHTML = renderCarousel(this.options);
    
    // Inicializar funcionalidad JavaScript
    const carouselElement = this.querySelector('.ubits-carousel') as HTMLElement;
    if (carouselElement) {
      const { initializeCarousel } = require('./CarouselProvider');
      initializeCarousel(carouselElement, this.options);
    }
  }

  // Métodos públicos para actualizar el carrusel
  public setItems(items: CarouselOptions['items']) {
    this.options.items = items;
    this.setAttribute('data-items', JSON.stringify(items));
    this.render();
  }

  public next() {
    const nextButton = this.querySelector('[data-action="next"]') as HTMLElement;
    if (nextButton) {
      nextButton.click();
    }
  }

  public prev() {
    const prevButton = this.querySelector('[data-action="prev"]') as HTMLElement;
    if (prevButton) {
      prevButton.click();
    }
  }

  public goTo(index: number) {
    const dot = this.querySelector(`[data-dot-index="${index}"]`) as HTMLElement;
    if (dot) {
      dot.click();
    }
  }
}

