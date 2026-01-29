/**
 * InputComponent
 * Web Component para el componente Input UBITS
 */
import type { InputState } from './types/InputOptions';
export declare class UBITSInput extends HTMLElement {
	private options;
	private inputInstance;
	static get observedAttributes(): string[];
	connectedCallback(): void;
	attributeChangedCallback(): void;
	private updateOptions;
	private render;
	getValue(): string;
	setValue(value: string): void;
	focus(): void;
	blur(): void;
	disable(): void;
	enable(): void;
	setState(newState: InputState): void;
}
//# sourceMappingURL=InputComponent.d.ts.map
