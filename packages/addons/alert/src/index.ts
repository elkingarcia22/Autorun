/**
 * @autorun/alert
 * Export público del add-on Alert
 */

export { AlertAddon } from './AlertAddon';
export { renderAlert, createAlert, showAlert } from './AlertProvider';
export { AUTORUNAlert } from './AlertComponent';
export type {
  AlertOptions,
  AlertType,
  AlertAction
} from './types/AlertOptions';

// Auto-inicializar si se importa directamente
if (typeof window !== 'undefined') {
  import('./AlertComponent').then(() => {
    console.log('✅ AUTORUN Alert component registered');
  });
}

