/**
 * Feedback Automatizado Add-on
 *
 * Exporta el add-on principal y sus tipos
 */

export { FeedbackAddon } from './FeedbackAddon';
export { FeedbackService } from './FeedbackService';
export { FeedbackSetupService } from './FeedbackSetupService';
export type { FeedbackConfig, FeedbackData } from './FeedbackService';
export type { SetupOptions } from './FeedbackSetupService';

// Export default para que AddonLoader pueda cargarlo
export { FeedbackAddon as default } from './FeedbackAddon';

