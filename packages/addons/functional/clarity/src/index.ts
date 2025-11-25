/**
 * @autorun/clarity
 * Export público del add-on Clarity
 *
 * @description
 * Add-on para integración con Microsoft Clarity que permite analizar el
 * comportamiento de usuarios, sesiones y métricas de rendimiento.
 *
 * @features
 * - Analytics dashboard y métricas
 * - Session recordings (grabaciones de sesiones)
 * - Heatmaps (mapas de calor)
 * - Filtros y segmentos avanzados
 * - Smart events y conversiones
 * - Performance insights
 *
 * @mcp
 * Este add-on soporta integración con MCP (Model Context Protocol) para mejorar
 * la experiencia y funcionalidad:
 * - Detección automática de servidor MCP Clarity disponible
 * - Instalación guiada de MCP si el usuario lo desea
 * - Acceso a APIs avanzadas de Clarity sin necesidad de tokens locales
 * - Consultas de analytics mediante lenguaje natural
 * - Acceso a documentación y recursos de Clarity
 * - Mejor gestión de credenciales y seguridad
 *
 * El add-on detectará automáticamente si hay un servidor MCP configurado
 * y ofrecerá instalarlo durante la inicialización si está disponible pero
 * no configurado. Si el usuario acepta, se configurará automáticamente.
 *
 * Con MCP habilitado, podrás hacer consultas como:
 * - "Top browsers last 3 days"
 * - "Average session duration for mobile users this week"
 * - "Top pages for desktop in the last month"
 *
 * @example
 * ```typescript
 * import { ClarityAddon } from '@autorun/clarity';
 *
 * const addon = new ClarityAddon();
 * await addon.initialize(context);
 * // El add-on preguntará automáticamente sobre MCP si está disponible
 * ```
 */

export { ClarityAddon } from './ClarityAddon';
export { ClarityService, ClarityConfig, ClarityEvent } from './ClarityService';

// Export default para que AddonLoader pueda cargarlo
export { ClarityAddon as default } from './ClarityAddon';
