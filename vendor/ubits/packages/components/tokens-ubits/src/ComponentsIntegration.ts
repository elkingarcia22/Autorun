/**
 * ComponentsIntegration
 * 
 * Integración del sistema de componentes con window.UBITS
 * Similar a TokensAddonIntegration pero para componentes
 */

import { getComponentManager, ComponentManager } from './utils/ComponentManager';
import type { ComponentAddon, ComponentSource } from './utils/ComponentManager';
import { loadComponentFromStorybook } from './utils/loadComponentFromStorybook';

/**
 * Interfaz para el objeto global UBITS.Components
 */
export interface UBITSComponentsAPI {
  /**
   * Carga un componente desde una fuente
   */
  loadComponent(source: ComponentSource, context?: any): Promise<ComponentAddon>;

  /**
   * Carga un componente desde Storybook
   */
  loadFromStorybook(
    source: ComponentSource,
    options?: {
      replaceExisting?: boolean;
      context?: any;
    }
  ): Promise<void>;

  /**
   * Reemplaza un componente existente
   */
  replaceComponent(
    componentName: string,
    source: ComponentSource,
    context?: any
  ): Promise<ComponentAddon>;

  /**
   * Obtiene el gestor de componentes
   */
  getManager(): ComponentManager;

  /**
   * Obtiene lista de componentes cargados
   */
  getLoadedComponents(): Array<{
    name: string;
    version: string;
    components: Array<{ name: string; tag: string }>;
  }>;

  /**
   * Verifica si un componente está cargado
   */
  isLoaded(componentName: string): boolean;
}

/**
 * Inicializa la integración con el sistema global
 */
export function initializeComponentsIntegration(): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Crear objeto global UBITS si no existe
  if (!window.UBITS) {
    (window as any).UBITS = {};
  }

  // Crear API de componentes
  const componentsAPI: UBITSComponentsAPI = {
    async loadComponent(source: ComponentSource, context: any = {}) {
      const manager = getComponentManager();
      return await manager.loadComponent(source, context);
    },

    async loadFromStorybook(
      source: ComponentSource,
      options: {
        replaceExisting?: boolean;
        context?: any;
      } = {}
    ) {
      await loadComponentFromStorybook(source, options);
    },

    async replaceComponent(
      componentName: string,
      source: ComponentSource,
      context: any = {}
    ) {
      const manager = getComponentManager();
      return await manager.replaceComponent(componentName, source, context);
    },

    getManager() {
      return getComponentManager();
    },

    getLoadedComponents() {
      const manager = getComponentManager();
      return manager.getLoadedComponents();
    },

    isLoaded(componentName: string) {
      const manager = getComponentManager();
      return manager.isComponentLoaded(componentName);
    }
  };

  // Exponer API global
  (window as any).UBITS.Components = componentsAPI;

  console.log('✅ Components integration initialized');
}

/**
 * Auto-inicializar si estamos en el navegador
 */
if (typeof window !== 'undefined') {
  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponentsIntegration);
  } else {
    initializeComponentsIntegration();
  }
}

