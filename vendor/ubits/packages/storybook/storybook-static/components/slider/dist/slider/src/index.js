/**
 * UBITS Slider Component
 * Componente de slider con todas las variantes y funcionalidades
 */
export { SliderAddon } from './SliderAddon';
export { renderSlider, createSlider } from './SliderProvider';
export { UBITSSlider } from './SliderComponent';
// Registrar el componente en el navegador (solo en runtime)
if (typeof window !== 'undefined') {
    import('./SliderComponent').then(() => {
        console.log('✅ UBITS Slider component registered');
    }).catch(() => {
        // Silenciar errores en caso de que el componente no se pueda cargar
    });
}
