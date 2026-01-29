/**
 * @autorun/lighthouse
 * Export público del add-on Lighthouse
 *
 * @description
 * Add-on para integración con Lighthouse que permite realizar auditorías
 * de performance, accesibilidad, SEO y mejores prácticas web.
 *
 * @features
 * - Auditorías de performance (Core Web Vitals)
 * - Auditorías de accesibilidad
 * - Auditorías de SEO
 * - Auditorías de mejores prácticas
 * - Reportes detallados y exportables
 *
 * @mcp
 * Este add-on no requiere integración MCP ya que Lighthouse es una herramienta
 * local que se ejecuta directamente en el entorno. No necesita APIs externas
 * ni credenciales remotas que se beneficien de MCP.
 */

export { LighthouseAddon } from './LighthouseAddon';
export { LighthouseService, LighthouseConfig, LighthouseResult } from './LighthouseService';

// Export default para que AddonLoader pueda cargarlo
export { LighthouseAddon as default } from './LighthouseAddon';
