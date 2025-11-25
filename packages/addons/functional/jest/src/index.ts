/**
 * @autorun/jest
 * Export público del add-on Jest
 *
 * @description
 * Add-on para integración con Jest que permite ejecutar tests unitarios,
 * de integración y de snapshot en proyectos JavaScript/TypeScript.
 *
 * @features
 * - Testing unitario y de integración
 * - Snapshot testing
 * - Code coverage
 * - Mocking y stubs
 * - Reportes detallados
 *
 * @mcp
 * Este add-on no requiere integración MCP ya que Jest es una herramienta
 * local que se ejecuta directamente en el entorno de desarrollo. No necesita
 * APIs externas ni credenciales remotas que se beneficien de MCP.
 */

export { JestAddon } from './JestAddon';
export { JestService, JestConfig, JestResult } from './JestService';

// Export default para que AddonLoader pueda cargarlo
export { JestAddon as default } from './JestAddon';
