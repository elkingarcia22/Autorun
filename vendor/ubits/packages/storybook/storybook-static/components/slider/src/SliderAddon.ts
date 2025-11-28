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

// Declarar tipos globales para window
declare global {
  interface Window {
    UBITS?: {
      Slider?: {
        create: (options: any) => any;
        render: (options: any) => string;
      };
      [key: string]: any;
    };
    createSlider?: (options: any) => any;
  }
}

// NO importar UBITSSlider directamente para evitar errores en Node.js
// import { UBITSSlider } from './SliderComponent';
import './styles/slider.css';

export class SliderAddon implements ComponentAddon {
  name = '@ubits/slider';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component (opcional) - solo en navegador
    if (typeof window !== 'undefined' && typeof HTMLElement !== 'undefined') {
      if (!customElements.get('ubits-slider')) {
        // Lazy import del componente solo cuando se necesite
        const { UBITSSlider } = await import('./SliderComponent');
        customElements.define('ubits-slider', UBITSSlider);
        console.log('✅ [SliderAddon] Web Component ubits-slider registrado');
      }
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

