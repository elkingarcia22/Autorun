/**
 * UBITS Slider Component
 * Componente de slider con todas las variantes y funcionalidades
 */

export { SliderAddon } from './SliderAddon';
export { renderSlider, createSlider } from './SliderProvider';
export { UBITSSlider } from './SliderComponent';
export type {
  SliderOptions,
  SliderOrientation,
  SliderSize,
  SliderState,
  SliderMode
} from './types/SliderOptions';

if (typeof window !== 'undefined') {
  import('./SliderComponent').then(() => {
    console.log('✅ UBITS Slider component registered');
  });
}

