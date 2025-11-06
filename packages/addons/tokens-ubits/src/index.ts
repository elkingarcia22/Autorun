/**
 * @ubits/tokens-ubits
 * Add-on de tokens UBITS oficiales
 */

export { UBITSTokensAddon } from './TokensAddon';
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
export type { UBITSTokensAPI } from './TokensAddonIntegration';

// Utilidades para crear add-ons desde fuentes externas
export {
  createTokensAddonFromSource,
  applyTokensFromStorybook,
  convertTokensJSONToCSS
} from './utils/createTokensAddon';
export type { TokensSource } from './utils/createTokensAddon';

// Exportar función helper global
export { cambiarTokensDesdeStorybook } from './utils/createTokensAddon.example';

// Auto-inicializar integración si estamos en navegador
if (typeof window !== 'undefined') {
  import('./TokensAddonIntegration').then(module => {
    module.initializeTokensIntegration();
  });
}

