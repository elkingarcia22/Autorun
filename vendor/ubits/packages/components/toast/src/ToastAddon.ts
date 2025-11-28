/**
 * ToastAddon
 * Clase principal del add-on Toast que implementa ComponentAddon
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

import { UBITSToast } from './ToastComponent';
import './styles/toast.css';

export class ToastAddon implements ComponentAddon {
  name = '@ubits/toast';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component (opcional)
    if (!customElements.get('ubits-toast')) {
      customElements.define('ubits-toast', UBITSToast);
    }

    // Asegurar que el container existe
    if (typeof window !== 'undefined') {
      const containerId = 'ubits-toast-container';
      let container = document.getElementById(containerId);
      
      if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);
      }

      // Exponer API global
      window.UBITS = window.UBITS || {};
      window.UBITS.Toast = {
        render: (options: any) => {
          const { renderToast } = require('./ToastProvider');
          return renderToast(options);
        },
        create: (options: any) => {
          const { createToast } = require('./ToastProvider');
          return createToast(options);
        },
        show: (type: string, message: string, options: any) => {
          const { showToast } = require('./ToastProvider');
          return showToast(type, message, options);
        }
      };

      // Exponer función global showToast() para compatibilidad con el playground anterior
      if (!window.showToast) {
        window.showToast = (type: string, message: string, options: any = {}) => {
          const { showToast } = require('./ToastProvider');
          return showToast(type, message, options);
        };
      }
    }

    console.log('✅ Toast add-on initialized');
  }

  destroy(): void {
    if (typeof window !== 'undefined') {
      if (window.UBITS?.Toast) {
        delete window.UBITS.Toast;
      }
      if (window.showToast) {
        delete window.showToast;
      }
    }
  }

  getComponents() {
    return [{
      name: 'ubits-toast',
      tag: 'ubits-toast',
      documentation: 'https://ubits.design/components/toast'
    }];
  }

  getStyles(): string[] {
    return ['./styles/toast.css'];
  }
}

