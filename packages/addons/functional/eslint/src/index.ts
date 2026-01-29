/**
 * @autorun/eslint
 * Export público del add-on ESLint
 *
 * @description
 * Add-on para integración con ESLint que permite analizar código JavaScript/TypeScript
 * para encontrar problemas, errores y aplicar reglas de estilo.
 *
 * @features
 * - Linting de código JavaScript/TypeScript
 * - Reglas personalizables
 * - Auto-fix de problemas comunes
 * - Integración con editores
 * - Reportes detallados
 *
 * @mcp
 * Este add-on no requiere integración MCP ya que ESLint es una herramienta
 * local que se ejecuta directamente en el código fuente. No necesita APIs externas
 * ni credenciales remotas que se beneficien de MCP.
 */

export { ESLintAddon } from './ESLintAddon';
export { ESLintService, ESLintConfig, ESLintResult, ESLintReport } from './ESLintService';

// Export default para que AddonLoader pueda cargarlo
export { ESLintAddon as default } from './ESLintAddon';
