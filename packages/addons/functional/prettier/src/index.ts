/**
 * @autorun/prettier
 * Export público del add-on Prettier
 *
 * @description
 * Add-on para integración con Prettier que permite formatear código de forma
 * automática y consistente según reglas configurables.
 *
 * @features
 * - Formateo automático de código
 * - Soporte para múltiples lenguajes
 * - Configuración flexible
 * - Integración con editores
 * - Verificación de formato
 *
 * @mcp
 * Este add-on no requiere integración MCP ya que Prettier es una herramienta
 * local que se ejecuta directamente en el código fuente. No necesita APIs externas
 * ni credenciales remotas que se beneficien de MCP.
 */

export { PrettierAddon } from './PrettierAddon';
export { PrettierService, PrettierConfig, PrettierResult } from './PrettierService';

// Export default para que AddonLoader pueda cargarlo
export { PrettierAddon as default } from './PrettierAddon';
