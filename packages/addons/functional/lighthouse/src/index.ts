/**
 * @autoframe/lighthouse
 * Export público del add-on Lighthouse
 */

export { LighthouseAddon } from './LighthouseAddon';
export { LighthouseService, LighthouseConfig, LighthouseResult } from './LighthouseService';

// Export default para que AddonLoader pueda cargarlo
export { LighthouseAddon as default } from './LighthouseAddon';

