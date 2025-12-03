/**
 * Web Component: ubits-button
 * Componente de botón UBITS como Web Component nativo
 */
export declare class UBITSButton extends HTMLElement {
	private options;
	static get observedAttributes(): string[];
	connectedCallback(): void;
	attributeChangedCallback(): void;
	disconnectedCallback(): void;
	private updateOptions;
	private render;
	private attachEventListeners;
	setLoading(loading: boolean): void;
	setDisabled(disabled: boolean): void;
	setText(text: string): void;
	setIcon(icon: string): void;
}
//# sourceMappingURL=ButtonComponent.d.ts.map
