/**
 * SliderComponent
 * Web Component para el componente Slider UBITS
 */
import type { SliderState } from './types/SliderOptions';
export declare class UBITSSlider extends HTMLElement {
    private options;
    private sliderInstance;
    static get observedAttributes(): string[];
    connectedCallback(): void;
    attributeChangedCallback(): void;
    private updateOptions;
    private render;
    getValue(): number | [number, number];
    setValue(value: number | [number, number]): void;
    disable(): void;
    enable(): void;
    setState(newState: SliderState): void;
}
//# sourceMappingURL=SliderComponent.d.ts.map