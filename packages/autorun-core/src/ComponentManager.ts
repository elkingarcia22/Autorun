/**
 * ComponentManager
 *
 * Manager global para cargar y gestionar componentes desde Storybook.
 * Expone API en window.AUTORUN.Components
 */

import { ComponentLoader, ComponentManifest, LoadedComponent } from './ComponentLoader.js';

export class ComponentManager {
	private loader: ComponentLoader;

	constructor() {
		this.loader = new ComponentLoader();
	}

	/**
	 * Carga un componente desde Storybook
	 */
	async loadFromStorybook(options: {
		manifestUrl: string;
		replaceExisting?: boolean;
	}): Promise<LoadedComponent> {
		return this.loader.loadFromStorybook(options);
	}

	/**
	 * Reemplaza un componente existente
	 */
	async replaceComponent(
		componentName: string,
		options: {
			manifestUrl: string;
		},
	): Promise<LoadedComponent> {
		return this.loader.loadFromStorybook({
			manifestUrl: options.manifestUrl,
			replaceExisting: true,
		});
	}

	/**
	 * Obtiene todos los componentes cargados
	 */
	getLoadedComponents(): LoadedComponent[] {
		return this.loader.getLoadedComponents();
	}

	/**
	 * Verifica si un componente está cargado
	 */
	isLoaded(componentName: string): boolean {
		return this.loader.isLoaded(componentName);
	}

	/**
	 * Obtiene información de un componente
	 */
	getComponent(componentName: string): LoadedComponent | undefined {
		return this.loader.getComponent(componentName);
	}

	/**
	 * Descarga un componente
	 */
	async unloadComponent(componentName: string): Promise<void> {
		return this.loader.unloadComponent(componentName);
	}

	/**
	 * Limpia todos los componentes
	 */
	clear(): void {
		this.loader.clear();
	}

	/**
	 * Obtiene el loader interno (para casos avanzados)
	 */
	getLoader(): ComponentLoader {
		return this.loader;
	}
}
