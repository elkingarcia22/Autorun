/**
 * @autoframe/prettier
 * Export público del add-on Prettier
 */

export { PrettierAddon } from './PrettierAddon';
export { PrettierService, PrettierConfig, PrettierResult } from './PrettierService';

// Export default para que AddonLoader pueda cargarlo
export { PrettierAddon as default } from './PrettierAddon';

