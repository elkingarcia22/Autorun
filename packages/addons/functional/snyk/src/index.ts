/**
 * @autorun/snyk
 * Export público del add-on Snyk
 *
 * @description
 * Add-on para security scanning y detección de vulnerabilidades usando Snyk.
 * Escanea dependencias, detecta vulnerabilidades y monitorea seguridad.
 *
 * @features
 * - Escaneo de vulnerabilidades
 * - Monitoreo de dependencias
 * - Integración con CI/CD
 * - Reportes de seguridad
 * - Thresholds configurables
 *
 * @example
 * ```typescript
 * import { SnykAddon } from '@autorun/snyk';
 *
 * const addon = new SnykAddon();
 * await addon.initialize(context);
 *
 * // Escanear vulnerabilidades
 * const scan = hub.getService('snyk', 'scan');
 * const result = await scan();
 * ```
 */

export { SnykAddon } from './SnykAddon';
export {
	SnykService,
	SnykConfig,
	Vulnerability,
	SnykResult,
} from './SnykService';

// Export default para que AddonLoader pueda cargarlo
export { SnykAddon as default } from './SnykAddon';
