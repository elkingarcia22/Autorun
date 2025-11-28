/**
 * StatsCardComponent
 * Web Component para StatsCard usando Custom Elements API
 */

import { renderStatsCard, createStatsCard } from './StatsCardProvider';
import type { StatsCardOptions } from './types/StatsCardOptions';
import './styles/stats-card.css';

export class UBITSStatsCard extends HTMLElement {
  private options: StatsCardOptions = {
    stats: []
  };

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'layout', 'columns', 'bordered', 'elevated'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  setOptions(options: StatsCardOptions) {
    this.options = { ...this.options, ...options };
    this.render();
  }

  getOptions(): StatsCardOptions {
    return { ...this.options };
  }

  private render() {
    // Obtener atributos del elemento
    const variant = this.getAttribute('variant') as StatsCardOptions['variant'] || this.options.variant;
    const size = this.getAttribute('size') as StatsCardOptions['size'] || this.options.size;
    const layout = this.getAttribute('layout') as StatsCardOptions['layout'] || this.options.layout;
    const columns = parseInt(this.getAttribute('columns') || '2') as StatsCardOptions['columns'];
    const bordered = this.hasAttribute('bordered') || this.options.bordered;
    const elevated = this.hasAttribute('elevated') || this.options.elevated;

    // Combinar opciones
    const finalOptions: StatsCardOptions = {
      ...this.options,
      variant,
      size,
      layout,
      columns,
      bordered,
      elevated
    };

    // Renderizar
    this.innerHTML = renderStatsCard(finalOptions);

    // Agregar event listeners si existen
    if (this.options.onClick) {
      this.addEventListener('click', this.options.onClick);
    }
  }
}

// Registrar el componente si no está registrado
if (typeof window !== 'undefined' && !customElements.get('ubits-stats-card')) {
  customElements.define('ubits-stats-card', UBITSStatsCard);
}

