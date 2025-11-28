/**
 * InputAddon
 * Add-on para el componente Input UBITS
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

import { UBITSInput } from './InputComponent';
import './styles/input.css';

export class InputAddon implements ComponentAddon {
  name = '@ubits/input';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component (opcional)
    if (!customElements.get('ubits-input')) {
      customElements.define('ubits-input', UBITSInput);
    }

    // Exponer API global
    if (typeof window !== 'undefined') {
      window.UBITS = window.UBITS || {};
      window.UBITS.Input = {
        create: (options: any) => {
          const { createInput } = require('./InputProvider');
          return createInput(options);
        },
        render: (options: any) => {
          const { renderInput } = require('./InputProvider');
          return renderInput(options);
        }
      };

      // Exponer función global createInput() para compatibilidad con el playground anterior
      if (!window.createInput) {
        window.createInput = (options: any) => {
          const { createInput } = require('./InputProvider');
          return createInput(options);
        };
      }
    }

    console.log('✅ Input add-on initialized');
  }

  destroy(): void {
    if (typeof window !== 'undefined' && window.UBITS?.Input) {
      delete window.UBITS.Input;
      delete window.createInput;
    }
  }

  getComponents() {
    return [{
      name: 'ubits-input',
      tag: 'ubits-input',
      documentation: 'https://ubits.design/components/input' // Placeholder
    }];
  }

  getStyles(): string[] {
    return ['./styles/input.css'];
  }
}

