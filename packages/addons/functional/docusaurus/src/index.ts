/**
 * @autorun/docusaurus
 * Export público del add-on Docusaurus
 *
 * @description
 * Add-on para integración con Docusaurus que permite generar y gestionar
 * documentación estática para proyectos.
 *
 * @features
 * - Generación de documentación estática
 * - Búsqueda integrada
 * - Temas y personalización
 * - Blog y páginas
 * - Build y deploy
 *
 * @mcp
 * Este add-on no requiere integración MCP ya que Docusaurus es una herramienta
 * local que genera documentación estática. No necesita APIs externas
 * ni credenciales remotas que se beneficien de MCP.
 */

export { DocusaurusAddon } from './DocusaurusAddon';
export { DocusaurusService, DocusaurusConfig, DocusaurusProcess } from './DocusaurusService';

// Export default para que AddonLoader pueda cargarlo
export { DocusaurusAddon as default } from './DocusaurusAddon';
