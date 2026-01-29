/**
 * SliderProvider
 * Lógica de renderizado y gestión del componente Slider
 * Incluye todas las variantes: horizontal/vertical, single/range, con/sin inputs
 */
import type { SliderOptions } from './types/SliderOptions';
/**
 * Renderiza un slider UBITS como HTML string
 */
export declare function renderSlider(options: SliderOptions): string;
/**
 * Crea un elemento slider programáticamente
 */
export declare function createSlider(options: SliderOptions): {
	element: HTMLDivElement;
	getValue: () => number | [number, number];
	setValue: (value: number | [number, number]) => void;
	disable: () => void;
	enable: () => void;
	setState: (newState: 'default' | 'disabled') => void;
} | null;
//# sourceMappingURL=SliderProvider.d.ts.map
