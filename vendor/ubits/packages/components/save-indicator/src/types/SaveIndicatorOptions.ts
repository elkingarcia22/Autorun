/**
 * Tipos TypeScript para el componente SaveIndicator
 */

export type SaveIndicatorState = 'saved' | 'saving' | 'failed' | 'recently-saved';

export interface SaveIndicatorOptions {
	/**
	 * Estado del indicador de guardado
	 * @default 'saved'
	 */
	state?: SaveIndicatorState;

	/**
	 * Texto personalizado para el estado "saving"
	 * @default 'Guardando...'
	 */
	savingText?: string;

	/**
	 * Texto personalizado para el estado "recently-saved"
	 * @default 'Cambios guardados'
	 */
	recentlySavedText?: string;

	/**
	 * Clases CSS adicionales
	 */
	className?: string;

	/**
	 * Atributos HTML adicionales
	 */
	attributes?: Record<string, string>;

	/**
	 * Handler de click (opcional, para estados interactivos)
	 */
	onClick?: (event: MouseEvent) => void;
}
