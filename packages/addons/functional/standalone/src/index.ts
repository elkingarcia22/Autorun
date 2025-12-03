/**
 * @autorun/standalone
 * Export público del add-on Standalone Mode
 *
 * @description
 * Add-on para builds optimizados y extracción de componentes desde Storybook.
 * Proporciona builds standalone completamente independientes que se pueden
 * deployar en cualquier hosting estático.
 *
 * @features
 * - Build optimizado de Storybook
 * - Extracción de componentes individuales
 * - Generación de manifest de componentes
 * - Optimización de assets (minificación, compresión)
 * - Multi-target builds (Storybook, componentes, tokens)
 * - Integración automática con el Hub
 *
 * @example
 * ```typescript
 * import { StandaloneAddon } from '@autorun/standalone';
 *
 * const addon = new StandaloneAddon();
 * await addon.initialize(context);
 *
 * // Ejecutar build standalone
 * const build = hub.getService('standalone', 'build');
 * const result = await build({
 *   optimizeStorybookBuild: true,
 *   extractComponents: true,
 *   generateManifest: true
 * });
 * ```
 */

export { StandaloneAddon } from './StandaloneAddon';
export {
	StandaloneService,
	StandaloneConfig,
	StandaloneBuildResult,
	ComponentManifest,
	ComponentInfo,
} from './StandaloneService';

// Export default para que AddonLoader pueda cargarlo
export { StandaloneAddon as default } from './StandaloneAddon';
