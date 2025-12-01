/**
 * @ubits/button
 * Export público del add-on Button
 */
export { ButtonAddon } from './ButtonAddon';
export { renderButton, createButton } from './ButtonProvider';
export { UBITSButton } from './ButtonComponent';
// Auto-inicializar si se importa directamente
if (typeof window !== 'undefined') {
    import('./ButtonComponent').then(() => {
        console.log('✅ UBITS Button component registered');
    });
}
