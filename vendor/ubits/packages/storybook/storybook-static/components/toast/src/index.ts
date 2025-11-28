/**
 * @ubits/toast
 * Componente Toast UBITS como add-on intercambiable
 */

export { ToastAddon } from './ToastAddon';
export { renderToast, createToast, showToast, showToastHelper } from './ToastProvider';
export { UBITSToast } from './ToastComponent';
export type {
  ToastOptions,
  ToastType,
  ToastAction
} from './types/ToastOptions';

// Registrar el Web Component automáticamente si estamos en el navegador
if (typeof window !== 'undefined') {
  import('./ToastComponent').then(() => {
    console.log('✅ UBITS Toast component registered');
  });
}

