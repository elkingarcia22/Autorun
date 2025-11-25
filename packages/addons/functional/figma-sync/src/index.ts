/**
 * @autoframe/figma-sync
 * Export público del add-on Figma Sync
 */

export { FigmaSyncAddon } from './FigmaSyncAddon';
export { FigmaSyncService, FigmaSyncConfig, SyncResult, TokenComparison } from './FigmaSyncService';

// Export default para que AddonLoader pueda cargarlo
export { FigmaSyncAddon as default } from './FigmaSyncAddon';

