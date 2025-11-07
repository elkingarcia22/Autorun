/**
 * @autoframe/tokens
 * Add-on de tokens Autoframe genéricos
 */

// Exportar el add-on principal para el Hub
export { TokensDesignAddon } from './TokensDesignAddon';

// Exportar también el add-on de tokens base (para uso directo)
export { AutoframeTokensAddon } from './TokensAddon';
export type { TokensAddon, AppContext } from './types/TokensAddon';

// TokensManager para gestión centralizada
export { 
  TokensManager, 
  getTokensManager, 
  initializeTokensManager 
} from './TokensManager';
export type { TokensManagerOptions } from './TokensManager';

// Integración con sistema global
export { 
  initializeTokensIntegration 
} from './TokensAddonIntegration';
export type { AutoframeTokensAPI } from './TokensAddonIntegration';

// Utilidades para crear add-ons desde fuentes externas
export {
  createTokensAddonFromSource,
  applyTokensFromStorybook,
  convertTokensJSONToCSS
} from './utils/createTokensAddon';
export type { TokensSource } from './utils/createTokensAddon';

// Exportar función helper global
export { cambiarTokensDesdeStorybook } from './utils/createTokensAddon.example';

// Sistema de componentes desde Storybook
export {
  ComponentManager,
  getComponentManager
} from './utils/ComponentManager';
export type { ComponentAddon, ComponentSource } from './utils/ComponentManager';

export {
  loadComponentFromStorybook,
  cambiarComponenteDesdeStorybook,
  loadComponentsFromStorybook
} from './utils/loadComponentFromStorybook';

export {
  initializeComponentsIntegration
} from './ComponentsIntegration';
export type { AutoframeComponentsAPI } from './ComponentsIntegration';

// Auto-inicializar integración si estamos en navegador
if (typeof window !== 'undefined') {
  import('./TokensAddonIntegration').then(module => {
    module.initializeTokensIntegration();
  });
}

// Default export para carga dinámica del Hub
export default TokensDesignAddon;

