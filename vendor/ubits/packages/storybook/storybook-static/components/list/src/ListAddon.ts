/**
 * ListAddon
 * Clase principal del add-on List que implementa ComponentAddon
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

import { UBITSList } from './ListComponent';
import './styles/list.css';

export class ListAddon implements ComponentAddon {
  name = '@ubits/list';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component
    if (!customElements.get('ubits-list')) {
      customElements.define('ubits-list', UBITSList);
    }

    // Exponer API global
    if (typeof window !== 'undefined') {
      window.UBITS = window.UBITS || {};
      window.UBITS.List = {
        render: (options: any) => {
          const { renderList } = require('./ListProvider');
          return renderList(options);
        },
        create: (options: any) => {
          const { createList } = require('./ListProvider');
          return createList(options);
        }
      };
    }

    console.log('✅ List add-on initialized');
  }

  destroy(): void {
    // Limpiar recursos si es necesario
    console.log('List add-on destroyed');
  }

  getComponents(): Array<{ name: string; tag: string; documentation?: string }> {
    return [
      {
        name: 'List',
        tag: 'ubits-list',
        documentation: 'Componente de lista con estados (default, hover, active, disabled)'
      }
    ];
  }

  getStyles(): string[] {
    return ['./styles/list.css'];
  }
}

