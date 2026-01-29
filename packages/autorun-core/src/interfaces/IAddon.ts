/**
 * Interfaz base para todos los add-ons de Autorun
 *
 * Todos los add-ons (componentes, funcionales, diseño, testing) deben
 * implementar esta interfaz base.
 */

export interface AutorunContext {
	/** Configuración del proyecto */
	config: Record<string, any>;

	/** Referencia al Hub para comunicación */
	hub: any; // AutorunHub (se definirá después para evitar dependencia circular)

	/** Método para emitir eventos a otros add-ons */
	emit(event: string, data?: any): Promise<void>;
}

export type AddonType = 'component' | 'functional' | 'design' | 'testing';
export type AddonStatus = 'installed' | 'active' | 'inactive' | 'error';

/**
 * Interfaz base que todos los add-ons deben implementar
 */
export interface IAddon {
	/** Identificador único del add-on */
	readonly id: string;

	/** Nombre legible del add-on */
	readonly name: string;

	/** Versión del add-on */
	readonly version: string;

	/** Tipo de add-on */
	readonly type: AddonType;

	/** Descripción del add-on */
	readonly description: string;

	/** IDs de otros add-ons que este requiere (dependencias) */
	readonly dependencies?: string[];

	/**
	 * Inicializa el add-on
	 * Se llama una vez cuando el add-on se carga
	 */
	initialize(context: AutorunContext): Promise<void>;

	/**
	 * Activa el add-on
	 * Se llama cuando el add-on se activa (opcional)
	 */
	activate?(): Promise<void>;

	/**
	 * Desactiva el add-on
	 * Se llama cuando el add-on se desactiva (opcional)
	 */
	deactivate?(): Promise<void>;

	/**
	 * Destruye el add-on y limpia recursos
	 * Se llama cuando el add-on se remueve completamente
	 */
	destroy(): void;

	/**
	 * Obtiene el schema de configuración del add-on (opcional)
	 * Útil para validación y generación de UI de configuración
	 */
	getConfigSchema?(): Record<string, any>;

	/**
	 * Configura el add-on con los valores proporcionados
	 */
	configure(config: Record<string, any>): Promise<void>;

	/**
	 * Verifica si el add-on está activo
	 */
	isActive(): boolean;

	/**
	 * Obtiene el estado actual del add-on
	 */
	getStatus(): AddonStatus;
}
