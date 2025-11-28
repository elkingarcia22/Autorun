/**
 * PaginationAddon
 * Clase principal del add-on Pagination que implementa ComponentAddon
 */

// Declaración de tipos globales
declare global {
  interface Window {
    UBITS?: {
      Pagination?: {
        render: (options: any) => string;
        create: (options: any) => HTMLElement | null;
      };
      [key: string]: any;
    };
  }
}

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

import { UBITSPagination } from './PaginationComponent';
import './styles/pagination.css';

export class PaginationAddon implements ComponentAddon {
  name = '@ubits/pagination';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component
    if (!customElements.get('ubits-pagination')) {
      customElements.define('ubits-pagination', UBITSPagination);
    }

    // Exponer API global
    if (typeof window !== 'undefined') {
      window.UBITS = window.UBITS || {};
      window.UBITS.Pagination = {
        render: (options: any) => {
          const { renderPagination } = require('./PaginationProvider');
          return renderPagination(options);
        },
        create: (options: any) => {
          const { createPagination } = require('./PaginationProvider');
          return createPagination(options);
        }
      };
    }

    console.log('✅ Pagination add-on initialized');
  }

  destroy(): void {
    // Limpiar recursos si es necesario
    if (typeof window !== 'undefined' && window.UBITS?.Pagination) {
      delete window.UBITS.Pagination;
    }
  }

  getComponents() {
    return [{
      name: 'ubits-pagination',
      tag: 'ubits-pagination',
      documentation: 'https://ubits.design/components/pagination'
    }];
  }

  getStyles(): string[] {
    return ['./styles/pagination.css'];
  }
}

