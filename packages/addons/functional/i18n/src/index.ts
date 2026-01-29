/**
 * @autorun/i18n
 * Export público del add-on i18n
 *
 * @description
 * Add-on para internacionalización (i18n) que permite gestionar traducciones
 * y soporte multiidioma en aplicaciones.
 *
 * @features
 * - Gestión de traducciones
 * - Soporte multiidioma
 * - Interpolación de variables
 * - Pluralización
 * - Carga dinámica de traducciones
 *
 * @mcp
 * Este add-on no requiere integración MCP ya que la internacionalización
 * se gestiona localmente con archivos de traducción. No necesita APIs externas
 * ni credenciales remotas que se beneficien de MCP.
 */

export { I18nAddon } from './I18nAddon';
export { I18nService, I18nConfig, TranslationData, I18nTranslations } from './I18nService';

// Export default para que AddonLoader pueda cargarlo
export { I18nAddon as default } from './I18nAddon';
