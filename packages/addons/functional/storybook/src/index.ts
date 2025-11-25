/**
 * @autoframe/storybook
 * Export público del add-on Storybook
 */

export { StorybookAddon } from './StorybookAddon';
export { StorybookService, StorybookConfig, StorybookProcess } from './StorybookService';

// Export default para que AddonLoader pueda cargarlo
export { StorybookAddon as default } from './StorybookAddon';

