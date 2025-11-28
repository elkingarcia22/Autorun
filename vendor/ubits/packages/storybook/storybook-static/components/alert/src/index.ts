/**
 * @ubits/alert
 * Export público del add-on Alert
 */

export { AlertAddon } from './AlertAddon';
export { renderAlert, createAlert, showAlert } from './AlertProvider';
export { UBITSAlert } from './AlertComponent';
export type {
  AlertOptions,
  AlertType,
  AlertAction
} from './types/AlertOptions';

// Auto-inicializar si se importa directamente
if (typeof window !== 'undefined') {
  import('./AlertComponent').then(() => {
    console.log('✅ UBITS Alert component registered');
  });
}

