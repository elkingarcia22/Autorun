/**
 * UBITS Slider Component
 * Componente de slider con todas las variantes y funcionalidades
 */

export { SliderAddon } from './SliderAddon';
export { renderSlider, createSlider } from './SliderProvider';

// NO exportar UBITSSlider directamente desde index para evitar errores en Node.js
// Los usuarios pueden importarlo directamente desde './SliderComponent' si lo necesitan
// export { UBITSSlider } from './SliderComponent';

export type {
  SliderOptions,
  SliderOrientation,
  SliderSize,
  SliderState,
  SliderMode
} from './types/SliderOptions';

