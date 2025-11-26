/**
 * @autorun/chromatic
 * Export público del add-on Chromatic
 *
 * @description
 * Add-on para visual testing de componentes usando Chromatic.
 * Integra con Storybook para detectar cambios visuales y generar reportes.
 *
 * @features
 * - Visual testing de componentes
 * - Integración con Storybook
 * - Detección de cambios visuales
 * - Review visual de PRs
 * - Screenshot testing
 *
 * @example
 * ```typescript
 * import { ChromaticAddon } from '@autorun/chromatic';
 *
 * const addon = new ChromaticAddon();
 * await addon.initialize(context);
 *
 * // Ejecutar visual testing
 * const run = hub.getService('chromatic', 'run');
 * const result = await run();
 * ```
 */

export { ChromaticAddon } from './ChromaticAddon';
export {
	ChromaticService,
	ChromaticConfig,
	ChromaticResult,
	VisualChange,
} from './ChromaticService';

// Export default para que AddonLoader pueda cargarlo
export { ChromaticAddon as default } from './ChromaticAddon';

