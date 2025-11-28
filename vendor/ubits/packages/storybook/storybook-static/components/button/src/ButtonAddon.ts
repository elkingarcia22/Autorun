/**
 * ButtonAddon
 * Clase principal del add-on Button que implementa ComponentAddon
 */

// Nota: Los tipos ComponentAddon y AppContext se pueden definir localmente
// o importar desde @ubits/core si existe
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
import { UBITSButton } from './ButtonComponent';
import './styles/button.css';

export class ButtonAddon implements ComponentAddon {
  name = '@ubits/button';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component
    if (!customElements.get('ubits-button')) {
      customElements.define('ubits-button', UBITSButton);
    }

    // Exponer API global
    if (typeof window !== 'undefined') {
      window.UBITS = window.UBITS || {};
      window.UBITS.Button = {
        render: (options: any) => {
          const { renderButton } = require('./ButtonProvider');
          return renderButton(options);
        },
        create: (options: any) => {
          const { createButton } = require('./ButtonProvider');
          return createButton(options);
        }
      };
    }

    console.log('✅ Button add-on initialized');
  }

  destroy(): void {
    // Limpiar recursos si es necesario
    if (typeof window !== 'undefined' && window.UBITS?.Button) {
      delete window.UBITS.Button;
    }
  }

  getComponents() {
    return [{
      name: 'ubits-button',
      tag: 'ubits-button',
      documentation: 'https://ubits.design/components/button'
    }];
  }

  getStyles(): string[] {
    return ['./styles/button.css'];
  }
}

