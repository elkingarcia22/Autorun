/**
 * @autorun/playwright
 * Export público del add-on Playwright
 *
 * @description
 * Add-on para testing end-to-end (E2E) usando Playwright.
 * Proporciona ejecución de tests, generación de reportes y
 * integración con CI/CD.
 *
 * @features
 * - Testing E2E con Playwright
 * - Ejecución de tests antes de deploy
 * - Generación de reportes HTML
 * - Instalación automática de navegadores
 * - Configuración flexible
 * - Integración con CI/CD
 *
 * @example
 * ```typescript
 * import { PlaywrightAddon } from '@autorun/playwright';
 *
 * const addon = new PlaywrightAddon();
 * await addon.initialize(context);
 *
 * // Ejecutar tests
 * const runTests = hub.getService('playwright', 'runTests');
 * const result = await runTests();
 * ```
 */

export { PlaywrightAddon } from './PlaywrightAddon';
export {
	PlaywrightService,
	PlaywrightConfig,
	ProjectConfig,
	UseConfig,
	TestResult,
} from './PlaywrightService';

// Export default para que AddonLoader pueda cargarlo
export { PlaywrightAddon as default } from './PlaywrightAddon';
