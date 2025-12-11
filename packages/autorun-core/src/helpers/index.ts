/**
 * Helpers Index
 *
 * Exporta todos los helpers para uso fácil
 */

// Detección proactiva
export {
	detectComponentsProactively,
	getContextualChecklist,
	suggestNextStep,
	type DetectedComponent,
	type DetectionResult,
} from './proactiveDetection';

// Dashboard de progreso
export {
	createProgressDashboard,
	updateStoryProgress,
	generateProgressDashboard,
	generateProgressSummary,
	saveStateSnapshot,
	restoreStateSnapshot,
	cleanupSnapshots,
	type ImplementationProgress,
	type ProgressDashboard,
	type StoryProgress,
} from './implementationProgress';

// Dashboard class
export { ImplementationDashboard } from './implementationDashboard';

// Mensajes de error
export {
	generateClearErrorMessage,
	formatErrorMessage,
	generateContextualErrorMessage,
	type ErrorMessage,
} from './errorMessages';

// Detección de estado del wizard
export {
	readWizardState,
	hasWizardState,
	clearWizardState,
	detectWizardProblemInMessage,
	type WizardState,
} from './wizardStateDetector';
