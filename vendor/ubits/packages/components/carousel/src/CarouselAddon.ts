/**
 * CarouselAddon - Add-on del componente Carousel UBITS
 */

interface ComponentAddon {
  name: string;
  version: string;
  initialize(context: AppContext): Promise<void>;
  destroy(): void;
  getComponents(): Array<{ name: string; tag: string; documentation?: string }>;
  getStyles(): string[];
}

interface AppContext {
  [key: string]: any;
}

import { UBITSCarousel } from './CarouselComponent';
import './styles/carousel.css';
import '../../card/src/styles/simple-card.css';
import '../../button/src/styles/button.css';

export class CarouselAddon implements ComponentAddon {
  name = '@ubits/carousel';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component
    if (!customElements.get('ubits-carousel')) {
      customElements.define('ubits-carousel', UBITSCarousel);
    }

    // Exponer API global
    if (typeof window !== 'undefined') {
      window.UBITS = window.UBITS || {};
      window.UBITS.Carousel = {
        render: (options: any) => {
          const { renderCarousel } = require('./CarouselProvider');
          return renderCarousel(options);
        },
        create: (options: any) => {
          const { createCarousel } = require('./CarouselProvider');
          return createCarousel(options);
        }
      };

      // Exponer función global createCarousel() para compatibilidad
      if (!window.createCarousel) {
        window.createCarousel = (options: any) => {
          const { createCarousel } = require('./CarouselProvider');
          return createCarousel(options);
        };
      }
    }

    console.log('✅ Carousel add-on initialized');
  }

  destroy(): void {
    // Limpiar recursos si es necesario
    if (typeof window !== 'undefined' && window.UBITS?.Carousel) {
      delete window.UBITS.Carousel;
      delete window.createCarousel;
    }
  }

  getComponents() {
    return [{
      name: 'ubits-carousel',
      tag: 'ubits-carousel',
      documentation: 'https://ubits.design/components/carousel'
    }];
  }

  getStyles(): string[] {
    return ['./styles/carousel.css'];
  }
}

