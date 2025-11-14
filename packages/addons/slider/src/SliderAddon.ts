/**
 * SliderAddon
 * Add-on para el componente Slider UBITS
 */

interface ComponentAddon {
  name: string;
  version: string;
  initialize(context?: any): Promise<void>;
  destroy(): void;
  getComponents(): Array<{ name: string; tag: string; documentation?: string }>;
  getStyles(): string[];
}

interface AppContext {
  [key: string]: any;
}

import { UBITSSlider } from './SliderComponent';
import './styles/slider.css';

export class SliderAddon implements ComponentAddon {
  name = '@ubits/slider';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component (opcional)
    if (!customElements.get('ubits-slider')) {
      customElements.define('ubits-slider', UBITSSlider);
    }

    // Exponer API global
    if (typeof window !== 'undefined') {
      window.UBITS = window.UBITS || {};
      window.UBITS.Slider = {
        create: (options: any) => {
          const { createSlider } = require('./SliderProvider');
          return createSlider(options);
        },
        render: (options: any) => {
          const { renderSlider } = require('./SliderProvider');
          return renderSlider(options);
        }
      };

      // Exponer función global createSlider() para compatibilidad
      if (!window.createSlider) {
        window.createSlider = (options: any) => {
          const { createSlider } = require('./SliderProvider');
          return createSlider(options);
        };
      }
    }

    console.log('✅ Slider add-on initialized');
  }

  destroy(): void {
    if (typeof window !== 'undefined' && window.UBITS?.Slider) {
      delete window.UBITS.Slider;
      delete window.createSlider;
    }
  }

  getComponents() {
    return [{
      name: 'ubits-slider',
      tag: 'ubits-slider',
      documentation: 'https://ubits.design/components/slider' // Placeholder
    }];
  }

  getStyles(): string[] {
    return ['./styles/slider.css'];
  }
}

