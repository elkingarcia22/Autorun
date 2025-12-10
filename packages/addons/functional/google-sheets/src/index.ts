/**
 * @autorun/google-sheets
 * Export público del add-on Google Sheets
 *
 * @description
 * Add-on para integración con Google Sheets que permite crear, leer, escribir
 * y gestionar hojas de cálculo directamente desde Autorun.
 *
 * @features
 * - Creación de hojas de cálculo nuevas
 * - Lectura y escritura de datos
 * - Formateo de celdas (colores, fuentes, bordes)
 * - Creación de gráficos
 * - Operaciones batch para mejor rendimiento
 * - Integración con MCP para mejor experiencia
 *
 * @mcp
 * Este add-on soporta integración con MCP (Model Context Protocol) para mejorar
 * la experiencia y acceso a funcionalidades avanzadas:
 * - Detección automática de servidor MCP Google Sheets disponible
 * - Instalación guiada de MCP si el usuario lo desea
 * - Acceso completo a la API de Google Sheets
 * - Operaciones avanzadas (formato, gráficos, fórmulas)
 * - Autenticación flexible (Service Account, OAuth)
 *
 * El add-on detectará automáticamente si hay un servidor MCP configurado
 * y ofrecerá instalarlo durante la inicialización si está disponible pero
 * no configurado. Si el usuario acepta, se configurará automáticamente.
 *
 * @example
 * ```typescript
 * import { GoogleSheetsAddon } from '@autorun/google-sheets';
 *
 * const addon = new GoogleSheetsAddon();
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
 *         "google-sheets": {
 *           "googleProjectId": "your-project-id",
 *           "googleApplicationCredentials": "/path/to/service-account-key.json",
 *           "googleServiceAccountKey": "{\"type\":\"service_account\",...}",
 *           "googlePrivateKey": "-----BEGIN PRIVATE KEY-----\\n...",
 *           "googleClientEmail": "service-account@project.iam.gserviceaccount.com"
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @api-limits
 * La API de Google Sheets es completamente gratuita con los siguientes límites:
 * - 300 requests/min por proyecto
 * - 60 requests/min por usuario
 * - Sin límite diario (respetando límites por minuto)
 * - Sin costos adicionales
 */

export { GoogleSheetsAddon } from './GoogleSheetsAddon';
export { GoogleSheetsService } from './GoogleSheetsService';
export type {
	GoogleSheetsConfig,
	SpreadsheetInfo,
	CellRange,
	CellFormat,
} from './GoogleSheetsService';

// Export default para que AddonLoader pueda cargarlo
export { GoogleSheetsAddon as default } from './GoogleSheetsAddon';
