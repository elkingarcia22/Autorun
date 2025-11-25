/**
 * @autoframe/jest
 * Export público del add-on Jest
 */

export { JestAddon } from './JestAddon';
export { JestService, JestConfig, JestResult } from './JestService';

// Export default para que AddonLoader pueda cargarlo
export { JestAddon as default } from './JestAddon';

