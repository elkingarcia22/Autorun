/**
 * @autorun/storybook
 * Export público del add-on Storybook
 *
 * @description
 * Add-on para integración con Storybook que permite desarrollar, probar
 * y documentar componentes de UI de forma aislada.
 *
 * @features
 * - Desarrollo de componentes aislados
 * - Documentación interactiva de componentes
 * - Testing visual y de accesibilidad
 * - Build y deploy de Storybook
 * - Addons y extensiones
 *
 * @mcp
 * Este add-on no requiere integración MCP ya que Storybook es una herramienta
 * local que se ejecuta en el entorno de desarrollo. No necesita APIs externas
 * ni credenciales remotas que se beneficien de MCP.
 */

export { StorybookAddon } from './StorybookAddon';
export { StorybookService, StorybookConfig, StorybookProcess } from './StorybookService';

// Export default para que AddonLoader pueda cargarlo
export { StorybookAddon as default } from './StorybookAddon';
