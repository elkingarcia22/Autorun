/**
 * @autorun/bundle-analyzer
 * Export público del add-on Bundle Analyzer
 *
 * @description
 * Add-on para análisis visual de bundles y optimización.
 * Proporciona análisis detallado de bundles de Storybook, componentes
 * extraídos y tokens, con reportes visuales y recomendaciones.
 *
 * @features
 * - Análisis de bundles de Storybook
 * - Análisis de componentes extraídos
 * - Análisis de tokens (opcional)
 * - Identificación de dependencias grandes
 * - Detección de código duplicado
 * - Generación de reportes visuales (HTML, JSON)
 * - Recomendaciones de optimización
 * - Thresholds configurables
 * - Integración automática con el Hub
 *
 * @example
 * ```typescript
 * import { BundleAnalyzerAddon } from '@autorun/bundle-analyzer';
 *
 * const addon = new BundleAnalyzerAddon();
 * await addon.initialize(context);
 *
 * // Ejecutar análisis
 * const analyze = hub.getService('bundle-analyzer', 'analyze');
 * const result = await analyze({
 *   analyzeStorybook: true,
 *   analyzeComponents: true,
 *   generateReport: true
 * });
 * ```
 */

export { BundleAnalyzerAddon } from './BundleAnalyzerAddon';
export {
	BundleAnalyzerService,
	BundleAnalyzerConfig,
	BundleAnalysisResult,
	BundleInfo,
	ChunkInfo,
	ModuleInfo,
} from './BundleAnalyzerService';

// Export default para que AddonLoader pueda cargarlo
export { BundleAnalyzerAddon as default } from './BundleAnalyzerAddon';
