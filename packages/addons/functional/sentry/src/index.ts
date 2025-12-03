/**
 * @autorun/sentry
 * Export público del add-on Sentry
 *
 * @description
 * Add-on para monitoreo de errores y performance usando Sentry.
 * Proporciona captura automática de errores, breadcrumbs, contexto de usuario
 * y monitoreo de performance.
 *
 * @features
 * - Captura automática de errores y excepciones
 * - Monitoreo de performance y transacciones
 * - Breadcrumbs para debugging
 * - Contexto de usuario y tags personalizados
 * - Compatible con navegador y Node.js
 * - Soporte para React (opcional)
 * - Integración automática con el Hub
 *
 * @installation
 * Este add-on requiere instalar el SDK de Sentry correspondiente:
 *
 * Para navegador (vanilla JS):
 * ```bash
 * npm install @sentry/browser
 * ```
 *
 * Para React:
 * ```bash
 * npm install @sentry/react
 * ```
 *
 * Para Node.js:
 * ```bash
 * npm install @sentry/node
 * ```
 *
 * @example
 * ```typescript
 * import { SentryAddon } from '@autorun/sentry';
 *
 * const addon = new SentryAddon();
 * await addon.initialize(context);
 *
 * // Capturar un error manualmente
 * const captureException = hub.getService('sentry', 'captureException');
 * captureException(new Error('Algo salió mal'), { userId: '123' });
 * ```
 */

export { SentryAddon } from './SentryAddon';
export { SentryService, SentryConfig, SentryStatus } from './SentryService';

// Export default para que AddonLoader pueda cargarlo
export { SentryAddon as default } from './SentryAddon';
