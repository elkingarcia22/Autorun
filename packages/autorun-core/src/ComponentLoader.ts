/**
 * ComponentLoader
 *
 * Cargador de componentes desde URLs públicas (Storybook, CDN, etc.)
 * Permite cargar componentes dinámicamente sin necesidad del repositorio.
 */

export interface ComponentManifest {
	name: string;
	version: string;
	type: 'component';
	components: Array<{
		name: string;
		tag: string;
		path: string; // Ruta relativa o absoluta al JS
	}>;
	styles?: string[]; // Rutas a CSS
	dependencies?: Record<string, string>;
}

export interface LoadedComponent {
	manifest: ComponentManifest;
	instance?: any; // Instancia del add-on si se carga
	stylesLoaded: Set<string>; // URLs de CSS ya cargadas
	scriptsLoaded: Set<string>; // URLs de JS ya cargadas
}

export class ComponentLoader {
	private loadedComponents: Map<string, LoadedComponent> = new Map();
	private loadingPromises: Map<string, Promise<LoadedComponent>> = new Map();

	/**
	 * Carga un componente desde una URL de Storybook
	 * @param options Opciones de carga
	 * @returns Promise que se resuelve cuando el componente está cargado
	 */
	async loadFromStorybook(options: {
		manifestUrl: string;
		replaceExisting?: boolean; // Si reemplazar componente existente
	}): Promise<LoadedComponent> {
		const { manifestUrl, replaceExisting = false } = options;

		// Verificar si ya está cargando
		if (this.loadingPromises.has(manifestUrl)) {
			return this.loadingPromises.get(manifestUrl)!;
		}

		// Crear promesa de carga
		const loadPromise = this._loadFromStorybook(manifestUrl, replaceExisting);
		this.loadingPromises.set(manifestUrl, loadPromise);

		try {
			const result = await loadPromise;
			return result;
		} finally {
			this.loadingPromises.delete(manifestUrl);
		}
	}

	/**
	 * Implementación interna de carga
	 */
	private async _loadFromStorybook(
		manifestUrl: string,
		replaceExisting: boolean,
	): Promise<LoadedComponent> {
		// 1. Fetch del manifest
		let manifest: ComponentManifest;
		try {
			const response = await fetch(manifestUrl);
			if (!response.ok) {
				throw new Error(`Error al cargar manifest: ${response.statusText}`);
			}
			manifest = await response.json();
		} catch (error) {
			throw new Error(`No se puede cargar manifest desde ${manifestUrl}: ${error}`);
		}

		// 2. Verificar si ya está cargado
		const existing = this.loadedComponents.get(manifest.name);
		if (existing && !replaceExisting) {
			console.log(`✅ Componente ${manifest.name} ya está cargado`);
			return existing;
		}

		// 3. Si existe y se debe reemplazar, destruir el anterior
		if (existing && replaceExisting) {
			await this.unloadComponent(manifest.name);
		}

		// 4. Resolver base URL
		const baseUrl = new URL(manifestUrl).origin;
		const manifestDir = manifestUrl.substring(0, manifestUrl.lastIndexOf('/'));

		// 5. Cargar CSS (evitar duplicados)
		const stylesLoaded = new Set<string>();
		if (manifest.styles && manifest.styles.length > 0) {
			for (const stylePath of manifest.styles) {
				const styleUrl = this.resolveUrl(stylePath, manifestDir, baseUrl);
				
				// Verificar si ya está cargado
				if (!this.isStyleLoaded(styleUrl)) {
					await this.loadCSS(styleUrl);
					stylesLoaded.add(styleUrl);
				}
			}
		}

		// 6. Cargar JavaScript de cada componente
		const scriptsLoaded = new Set<string>();
		for (const component of manifest.components) {
			const jsUrl = this.resolveUrl(component.path, manifestDir, baseUrl);
			
			// Verificar si ya está cargado
			if (!this.isScriptLoaded(jsUrl)) {
				await this.loadJS(jsUrl);
				scriptsLoaded.add(jsUrl);
			}
		}

		// 7. Registrar componente
		const loadedComponent: LoadedComponent = {
			manifest,
			stylesLoaded,
			scriptsLoaded,
		};

		this.loadedComponents.set(manifest.name, loadedComponent);

		console.log(`✅ Componente ${manifest.name} cargado desde Storybook`);
		return loadedComponent;
	}

	/**
	 * Resuelve una URL (relativa o absoluta)
	 */
	private resolveUrl(path: string, manifestDir: string, baseUrl: string): string {
		if (path.startsWith('http://') || path.startsWith('https://')) {
			return path; // URL absoluta
		}
		if (path.startsWith('./') || path.startsWith('../')) {
			// Ruta relativa al manifest
			return new URL(path, manifestDir + '/').href;
		}
		// Ruta relativa a baseUrl
		return new URL(path, baseUrl + '/').href;
	}

	/**
	 * Carga un archivo CSS dinámicamente
	 */
	private async loadCSS(url: string): Promise<void> {
		return new Promise((resolve, reject) => {
			// Verificar si ya existe
			const existing = document.querySelector(`link[data-component-style="${url}"]`);
			if (existing) {
				resolve();
				return;
			}

			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = url;
			link.setAttribute('data-component-style', url);
			link.onload = () => resolve();
			link.onerror = () => reject(new Error(`Error al cargar CSS: ${url}`));
			document.head.appendChild(link);
		});
	}

	/**
	 * Carga un archivo JavaScript dinámicamente
	 */
	private async loadJS(url: string): Promise<void> {
		return new Promise((resolve, reject) => {
			// Verificar si ya existe
			const existing = document.querySelector(`script[data-component-script="${url}"]`);
			if (existing) {
				resolve();
				return;
			}

			const script = document.createElement('script');
			script.type = 'module';
			script.src = url;
			script.setAttribute('data-component-script', url);
			script.onload = () => resolve();
			script.onerror = () => reject(new Error(`Error al cargar JS: ${url}`));
			document.head.appendChild(script);
		});
	}

	/**
	 * Verifica si un CSS ya está cargado
	 */
	private isStyleLoaded(url: string): boolean {
		return !!document.querySelector(`link[data-component-style="${url}"]`);
	}

	/**
	 * Verifica si un JS ya está cargado
	 */
	private isScriptLoaded(url: string): boolean {
		return !!document.querySelector(`script[data-component-script="${url}"]`);
	}

	/**
	 * Descarga un componente
	 */
	async unloadComponent(componentName: string): Promise<void> {
		const loaded = this.loadedComponents.get(componentName);
		if (!loaded) return;

		// Remover CSS
		for (const styleUrl of loaded.stylesLoaded) {
			const link = document.querySelector(`link[data-component-style="${styleUrl}"]`);
			if (link) {
				link.remove();
			}
		}

		// Nota: No removemos los scripts porque pueden estar en uso
		// Solo marcamos como descargado

		this.loadedComponents.delete(componentName);
		console.log(`🗑️  Componente ${componentName} descargado`);
	}

	/**
	 * Obtiene todos los componentes cargados
	 */
	getLoadedComponents(): LoadedComponent[] {
		return Array.from(this.loadedComponents.values());
	}

	/**
	 * Verifica si un componente está cargado
	 */
	isLoaded(componentName: string): boolean {
		return this.loadedComponents.has(componentName);
	}

	/**
	 * Obtiene información de un componente cargado
	 */
	getComponent(componentName: string): LoadedComponent | undefined {
		return this.loadedComponents.get(componentName);
	}

	/**
	 * Limpia todos los componentes cargados
	 */
	clear(): void {
		for (const [name] of this.loadedComponents) {
			this.unloadComponent(name);
		}
	}
}

