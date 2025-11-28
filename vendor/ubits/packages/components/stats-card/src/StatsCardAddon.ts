/**
 * StatsCardAddon
 * Clase principal del add-on StatsCard que implementa ComponentAddon
 */

// Declaración de tipos globales
declare global {
  interface Window {
    UBITS?: {
      StatsCard?: {
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

import { UBITSStatsCard } from './StatsCardComponent';
import './styles/stats-card.css';

export class StatsCardAddon implements ComponentAddon {
  name = '@ubits/stats-card';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component
    if (!customElements.get('ubits-stats-card')) {
      customElements.define('ubits-stats-card', UBITSStatsCard);
    }

    // Exponer API global
    if (typeof window !== 'undefined') {
      window.UBITS = window.UBITS || {};
      window.UBITS.StatsCard = {
        render: (options: any) => {
          const { renderStatsCard } = require('./StatsCardProvider');
          return renderStatsCard(options);
        },
        create: (options: any) => {
          const { createStatsCard } = require('./StatsCardProvider');
          return createStatsCard(options);
        }
      };
    }

    console.log('✅ StatsCard add-on initialized');
  }

  destroy(): void {
    // Limpiar recursos si es necesario
    if (typeof window !== 'undefined' && window.UBITS?.StatsCard) {
      delete window.UBITS.StatsCard;
    }
  }

  getComponents() {
    return [{
      name: 'ubits-stats-card',
      tag: 'ubits-stats-card',
      documentation: 'https://ubits.design/components/stats-card'
    }];
  }

  getStyles(): string[] {
    return ['./styles/stats-card.css'];
  }
}

