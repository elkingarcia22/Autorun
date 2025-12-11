/**
 * @autorun/n8n
 * Export público del add-on n8n
 *
 * @description
 * Add-on para integración con n8n que permite automatizar workflows,
 * gestionar nodos y ejecutar flujos de trabajo desde Autorun.
 *
 * @features
 * - Acceso a 525+ nodos de n8n con 99% de cobertura de propiedades
 * - Creación y gestión de workflows
 * - Ejecución de workflows
 * - Validación de configuración
 * - Integración con MCP para mejor experiencia
 *
 * @mcp
 * Este add-on soporta integración con MCP (Model Context Protocol) para mejorar
 * la experiencia y acceso a funcionalidades avanzadas:
 * - Detección automática de servidor MCP n8n disponible
 * - Instalación guiada de MCP si el usuario lo desea
 * - Acceso a 525+ nodos de n8n con documentación completa
 * - Validación automática de workflows
 * - Gestión de ejecuciones en tiempo real
 *
 * El add-on detectará automáticamente si hay un servidor MCP configurado
 * y ofrecerá instalarlo durante la inicialización si está disponible pero
 * no configurado. Si el usuario acepta, se configurará automáticamente.
 *
 * @example
 * ```typescript
 * import { N8nAddon } from '@autorun/n8n';
 *
 * const addon = new N8nAddon();
 * await addon.initialize(context);
 * // El add-on preguntará automáticamente sobre MCP si está disponible
 * ```
 *
 * @configuration
 * ```json
 * {
 *   "autorun": {
 *     "addons": {
 *       "config": {
 *         "n8n": {
 *           "n8nApiUrl": "https://your-n8n-instance.com",
 *           "n8nApiKey": "your-api-key",
 *           "mode": "stdio",
 *           "logLevel": "error",
 *           "disableConsoleOutput": true
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 */

export { N8nAddon } from './N8nAddon';
export { N8nService } from './N8nService';
export type { N8nConfig, WorkflowInfo } from './N8nService';

// Export default para que AddonLoader pueda cargarlo
export { N8nAddon as default } from './N8nAddon';



