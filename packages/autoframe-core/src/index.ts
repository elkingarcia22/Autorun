/**
 * @autoframe/core
 * 
 * Autoframe Hub - Orquestador central de add-ons
 * 
 * Este módulo proporciona el núcleo del sistema Autoframe que actúa como
 * un hub central para orquestar todos los add-ons (componentes, funcionales,
 * diseño, testing, etc.)
 */

// Exportar clases principales
export { AutoframeHub } from './AutoframeHub';
export { AddonRegistry } from './AddonRegistry';
export { AddonLoader } from './AddonLoader';
export { ConfigManager } from './ConfigManager';

// Exportar interfaces
export * from './interfaces';

// Exportar adaptadores
export * from './adapters';

// Exportar helpers
export * from './helpers/registerLegacyComponent';

// Placeholder - estructura base creada
export const VERSION = '1.0.0';

