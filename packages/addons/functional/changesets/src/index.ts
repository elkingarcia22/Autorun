/**
 * @autorun/changesets
 * Export público del add-on Changesets
 *
 * @description
 * Add-on para versionado semántico automático y generación de changelog
 * usando Changesets. Proporciona gestión de versiones, creación de
 * changesets, y generación automática de CHANGELOG.md.
 *
 * @features
 * - Versionado semántico automático
 * - Creación de changesets
 * - Generación de CHANGELOG.md
 * - Gestión de releases
 * - Integración con GitHub releases
 * - Versionado automático antes de deploy
 * - Release automático después de deploy
 *
 * @example
 * ```typescript
 * import { ChangesetsAddon } from '@autorun/changesets';
 *
 * const addon = new ChangesetsAddon();
 * await addon.initialize(context);
 *
 * // Crear changeset
 * const createChangeset = hub.getService('changesets', 'createChangeset');
 * await createChangeset('Nueva funcionalidad agregada', 'minor');
 *
 * // Versionar
 * const version = hub.getService('changesets', 'version');
 * await version();
 * ```
 */

export { ChangesetsAddon } from './ChangesetsAddon';
export {
	ChangesetsService,
	ChangesetsConfig,
	Changeset,
	ChangesetResult,
	VersionInfo,
} from './ChangesetsService';

// Export default para que AddonLoader pueda cargarlo
export { ChangesetsAddon as default } from './ChangesetsAddon';
