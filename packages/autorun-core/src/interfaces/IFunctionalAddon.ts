/**
 * Interfaz para add-ons funcionales
 *
 * Los add-ons funcionales (GitHub, Clarity, Vercel, JEST, etc.) implementan
 * esta interfaz que extiende IAddon con hooks de eventos del proyecto.
 */

import { IAddon } from './IAddon';

/**
 * Interfaz para add-ons funcionales
 *
 * Los add-ons funcionales pueden reaccionar a eventos del proyecto
 * como cambios de archivos, commits, deploys, etc.
 */
export interface IFunctionalAddon extends IAddon {
	type: 'functional';

	/**
	 * Se llama cuando un archivo cambia
	 * @param filePath Ruta del archivo que cambió
	 * @param content Contenido del archivo (opcional)
	 */
	onFileChange?(filePath: string, content?: string): Promise<void>;

	/**
	 * Se llama antes de hacer commit
	 * @param files Lista de archivos que se van a commitear
	 */
	onBeforeCommit?(files: string[]): Promise<void>;

	/**
	 * Se llama después de hacer commit
	 * @param commitHash Hash del commit realizado
	 */
	onAfterCommit?(commitHash: string): Promise<void>;

	/**
	 * Se llama antes de hacer deploy
	 */
	onBeforeDeploy?(): Promise<void>;

	/**
	 * Se llama después de hacer deploy
	 * @param url URL del deployment
	 */
	onAfterDeploy?(url: string): Promise<void>;

	/**
	 * Se llama cuando se ejecutan tests
	 * @param results Resultados de los tests
	 */
	onTestRun?(results: any): Promise<void>;

	/**
	 * Obtiene los servicios que este add-on proporciona
	 * Útil para que otros add-ons o la aplicación usen funcionalidades del add-on
	 */
	getServices?(): Record<string, (...args: any[]) => any>;
}
