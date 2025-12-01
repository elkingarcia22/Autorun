/**
 * UBITS Input Component
 * Componente de input con todas las variantes y funcionalidades
 */
export { InputAddon } from './InputAddon';
export { renderInput, createInput } from './InputProvider';
export { UBITSInput } from './InputComponent';
if (typeof window !== 'undefined') {
    import('./InputComponent').then(() => {
        console.log('✅ UBITS Input component registered');
    });
}
