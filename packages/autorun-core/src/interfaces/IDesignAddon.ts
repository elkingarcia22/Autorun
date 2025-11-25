/**
 * Interfaz para add-ons de diseño
 *
 * Los add-ons de diseño (tokens, templates, tipografía) implementan
 * esta interfaz que extiende IAddon con funcionalidades específicas
 * de diseño.
 */

import { IAddon } from './IAddon';

/**
 * Interfaz para add-ons de diseño
 *
 * Los add-ons de diseño proporcionan tokens, templates, tipografía, etc.
 */
export interface IDesignAddon extends IAddon {
	type: 'design';

	/**
	 * Obtiene los tokens CSS que este add-on proporciona
	 */
	getTokens?(): Record<string, string>;

	/**
	 * Obtiene las rutas a los archivos CSS de tokens
	 */
	getTokenFiles?(): string[];

	/**
	 * Obtiene los templates disponibles
	 */
	getTemplates?(): string[];

	/**
	 * Obtiene la configuración de tipografía
	 */
	getTypography?(): Record<string, any>;

	/**
	 * Aplica los estilos de diseño al proyecto
	 */
	applyStyles?(): Promise<void>;
}
