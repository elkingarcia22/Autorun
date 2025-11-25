/**
 * @autorun/figma-sync
 * Export público del add-on Figma Sync
 *
 * @description
 * Add-on para sincronización con Figma que permite importar design tokens
 * desde archivos de Figma y mantenerlos sincronizados con el proyecto.
 *
 * @features
 * - Sincronización de design tokens desde Figma
 * - Comparación y detección de cambios
 * - Actualización automática de tokens
 * - Resolución de referencias
 * - Validación de tokens
 *
 * @mcp
 * Este add-on soporta integración con MCP (Model Context Protocol) para mejorar
 * la funcionalidad y acceso a Figma:
 * - Detección automática de servidores MCP disponibles (figma y talk-to-figma)
 * - Instalación guiada de MCP si el usuario lo desea
 * - Uso de APIs avanzadas de Figma sin necesidad de tokens locales
 * - Mejor gestión de credenciales y seguridad
 *
 * ⚠️ IMPORTANTE: Ni MCP ni la API de Figma pueden acceder directamente a las
 * Variables de Figma. Para que MCP funcione correctamente, necesitas descargar
 * el JSON de tokens usando el plugin de Figma Tokens. Ver el README para
 * instrucciones detalladas.
 */

export { FigmaSyncAddon } from './FigmaSyncAddon';
export { FigmaSyncService, FigmaSyncConfig, SyncResult, TokenComparison } from './FigmaSyncService';

// Export default para que AddonLoader pueda cargarlo
export { FigmaSyncAddon as default } from './FigmaSyncAddon';
