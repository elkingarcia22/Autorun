/**
 * @autorun/core
 *
 * Autorun Hub - Orquestador central de add-ons
 *
 * Este módulo proporciona el núcleo del sistema Autorun que actúa como
 * un hub central para orquestar todos los add-ons (componentes, funcionales,
 * diseño, testing, etc.)
 */

// Exportar clases principales
export { AutorunHub } from './AutorunHub';
export { AddonRegistry } from './AddonRegistry';
export {
	AddonConflictDetector,
	getConflictDetector,
	AddonConflictError,
} from './AddonConflictDetector';
export type { ConflictGroup } from './AddonConflictDetector';
export { AddonLoader } from './AddonLoader';
export { ConfigManager } from './ConfigManager';
export { ConfigValidator } from './validation/ConfigValidator';
export type {
	ConfigSchema,
	ValidationError as ConfigValidationError,
} from './validation/ConfigValidator';

// Exportar errores
export {
	AutorunError,
	AddonNotFoundError,
	AddonLoadError,
	MissingDependencyError,
	HubNotInitializedError,
	HubAlreadyInitializedError,
	InvalidConfigError,
	ConfigFileError,
	AddonInitializationError,
	AddonActivationError,
	ServiceNotFoundError,
} from './errors/AutorunErrors';

// Exportar interfaces
export * from './interfaces';

// Exportar adaptadores
export * from './adapters';

// Exportar helpers
export * from './helpers/registerLegacyComponent';

// Exportar utilidades MCP
export { MCPDetector } from './MCPDetector';
export { MCPInstaller } from './MCPInstaller';
export { MCPPrompt } from './MCPPrompt';

// Exportar sistema de componentes
export { ComponentLoader } from './ComponentLoader';
export { ComponentManager } from './ComponentManager';
export { initComponents } from './initComponents';
export type { ComponentManifest, LoadedComponent } from './ComponentLoader';

// Exportar wizard de inicialización
export { InitializationWizard } from './wizard/InitializationWizard';
export { UBITS_PRESET, UBITS_ADDONS_CONFIG, UBITS_MODULES_CONFIG } from './wizard/UBITSPreset';
export { TemplateLoader } from './wizard/TemplateLoader';
export { ModuleManager } from './wizard/ModuleManager';
export { SubNavManager } from './wizard/SubNavManager';
export { CanvasCreator } from './wizard/CanvasCreator';
export { ComponentValidator } from './wizard/ComponentValidator';
export type {
	ProjectType,
	WizardResult,
	UBITSResult,
	IndependentResult,
} from './wizard/InitializationWizard';
export type { UBITSConfig, UBITSTemplate, ModuleConfig, ModuleProduct } from './wizard/UBITSPreset';
export type {
	ValidationResult,
	ValidationError,
	ValidationWarning,
} from './wizard/ComponentValidator';

// Placeholder - estructura base creada
export const VERSION = '1.0.0';
