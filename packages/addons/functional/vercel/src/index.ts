/**
 * @autorun/vercel
 * Export público del add-on Vercel
 *
 * @description
 * Add-on para integración con Vercel que permite gestionar deployments,
 * proyectos, dominios y configuraciones de Vercel.
 *
 * @features
 * - Deploy automático de proyectos
 * - Gestión de proyectos y configuraciones
 * - Gestión de dominios y DNS
 * - Preview deployments
 * - Analytics y logs
 * - Environment variables
 *
 * @mcp
 * Este add-on soporta integración con MCP (Model Context Protocol) para mejorar
 * la experiencia y seguridad:
 * - Detección automática de servidor MCP Vercel disponible
 * - Instalación guiada de MCP si el usuario lo desea
 * - Uso de APIs avanzadas de Vercel sin necesidad de tokens locales
 * - Mejor gestión de credenciales y seguridad
 * - Acceso a funciones avanzadas como documentación, analytics y más
 *
 * El add-on detectará automáticamente si hay un servidor MCP configurado
 * y ofrecerá instalarlo durante la inicialización si está disponible pero
 * no configurado. Si el usuario acepta, se configurará automáticamente.
 *
 * @example
 * ```typescript
 * import { VercelAddon } from '@autorun/vercel';
 *
 * const addon = new VercelAddon();
 * await addon.initialize(context);
 * // El add-on preguntará automáticamente sobre MCP si está disponible
 * ```
 */

export { VercelAddon } from './VercelAddon';
export {
	VercelService,
	VercelConfig,
	VercelProject,
	VercelDeployment,
	VercelDomain,
} from './VercelService';

// Export default para que AddonLoader pueda cargarlo
export { VercelAddon as default } from './VercelAddon';
