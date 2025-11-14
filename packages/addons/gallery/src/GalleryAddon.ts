/**
 * GalleryAddon - Add-on del componente Gallery UBITS
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

import { UBITSGallery } from './GalleryComponent';
import './styles/gallery.css';

export class GalleryAddon implements ComponentAddon {
  name = '@ubits/gallery';
  version = '1.0.0';

  async initialize(context: AppContext): Promise<void> {
    // Registrar el Web Component
    if (!customElements.get('ubits-gallery')) {
      customElements.define('ubits-gallery', UBITSGallery);
    }

    // Exponer API global
    if (typeof window !== 'undefined') {
      window.UBITS = window.UBITS || {};
      window.UBITS.Gallery = {
        render: (options: any) => {
          const { renderGallery } = require('./GalleryProvider');
          return renderGallery(options);
        },
        create: (options: any) => {
          const { createGallery } = require('./GalleryProvider');
          return createGallery(options);
        }
      };

      // Exponer función global createGallery() para compatibilidad
      if (!window.createGallery) {
        window.createGallery = (options: any) => {
          const { createGallery } = require('./GalleryProvider');
          return createGallery(options);
        };
      }
    }

    console.log('✅ Gallery add-on initialized');
  }

  destroy(): void {
    // Limpiar recursos si es necesario
    if (typeof window !== 'undefined' && window.UBITS?.Gallery) {
      delete window.UBITS.Gallery;
      delete window.createGallery;
    }
  }

  getComponents() {
    return [{
      name: 'ubits-gallery',
      tag: 'ubits-gallery',
      documentation: 'https://ubits.design/components/gallery'
    }];
  }

  getStyles(): string[] {
    return ['./styles/gallery.css'];
  }
}

