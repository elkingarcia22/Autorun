/**
 * AlertAddon
 * Clase principal del add-on Alert que implementa ComponentAddon
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

import { UBITSAlert } from './AlertComponent';
import './styles/alert.css';

export class AlertAddon implements ComponentAddon {
  name = '@ubits/alert';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component
    if (!customElements.get('ubits-alert')) {
      customElements.define('ubits-alert', UBITSAlert);
    }

    // Exponer API global
    if (typeof window !== 'undefined') {
      window.UBITS = window.UBITS || {};
      window.UBITS.Alert = {
        render: (options: any) => {
          const { renderAlert } = require('./AlertProvider');
          return renderAlert(options);
        },
        create: (options: any) => {
          const { createAlert } = require('./AlertProvider');
          return createAlert(options);
        },
        show: (type: string, message: string, options: any) => {
          const { showAlert } = require('./AlertProvider');
          return showAlert(type, message, options);
        }
      };
    }

    console.log('✅ Alert add-on initialized');
  }

  destroy(): void {
    // Limpiar recursos si es necesario
    if (typeof window !== 'undefined' && window.UBITS?.Alert) {
      delete window.UBITS.Alert;
    }
  }

  getComponents() {
    return [{
      name: 'ubits-alert',
      tag: 'ubits-alert',
      documentation: 'https://ubits.design/components/alert'
    }];
  }

  getStyles(): string[] {
    return ['./styles/alert.css'];
  }
}

