/**
 * @autorun/renovate
 * Export público del add-on Renovate
 *
 * @description
 * Add-on para actualización automática de dependencias usando Renovate.
 * Detecta actualizaciones disponibles, crea PRs automáticos y gestiona
 * la configuración de Renovate.
 *
 * @features
 * - Detección de actualizaciones disponibles
 * - Creación de PRs automáticos
 * - Configuración de Renovate
 * - Gestión de dependencias
 * - Integración con GitHub
 * - Verificación periódica de actualizaciones
 *
 * @example
 * ```typescript
 * import { RenovateAddon } from '@autorun/renovate';
 *
 * const addon = new RenovateAddon();
 * await addon.initialize(context);
 *
 * // Verificar actualizaciones
 * const checkUpdates = hub.getService('renovate', 'checkUpdates');
 * const result = await checkUpdates();
 * ```
 */

export { RenovateAddon } from './RenovateAddon';
export {
	RenovateService,
	RenovateConfig,
	PackageRule,
	UpdateInfo,
	RenovateResult,
} from './RenovateService';

// Export default para que AddonLoader pueda cargarlo
export { RenovateAddon as default } from './RenovateAddon';

