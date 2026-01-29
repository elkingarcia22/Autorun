/**
 * Servicio central para gestión de proveedores de iconos
 * Implementa patrón Factory para permitir cambiar proveedores fácilmente
 */

import { IconProvider } from './IconProvider';

type ProviderType = 'fontawesome' | 'lucide' | 'material';

export class IconService {
	private static instance: IconService;
	private currentProvider: IconProvider | null = null;
	private providers: Map<ProviderType, () => IconProvider> = new Map();
	private initialized = false;

	private constructor() {
		// Los proveedores se registran dinámicamente al importarlos
	}

	static getInstance(): IconService {
		if (!IconService.instance) {
			IconService.instance = new IconService();
		}
		return IconService.instance;
	}

	/**
	 * Registra un proveedor (llamado internamente por los providers)
	 */
	registerProvider(type: ProviderType, factory: () => IconProvider): void {
		this.providers.set(type, factory);
	}

	/**
	 * Inicializa el servicio con un proveedor específico
	 */
	async initialize(providerType: ProviderType = 'fontawesome'): Promise<void> {
		const providerFactory = this.providers.get(providerType);

		if (!providerFactory) {
			throw new Error(
				`Provider ${providerType} not available. Registered providers: ${Array.from(this.providers.keys()).join(', ')}`,
			);
		}

		// Limpiar proveedor anterior
		if (this.currentProvider) {
			this.currentProvider.destroy();
		}

		// Crear nuevo proveedor
		this.currentProvider = providerFactory();
		await this.currentProvider.initialize();
		this.initialized = true;
	}

	/**
	 * Cambia el proveedor en tiempo de ejecución
	 */
	async switchProvider(providerType: ProviderType): Promise<void> {
		await this.initialize(providerType);
	}

	/**
	 * Obtiene el proveedor actual
	 */
	getProvider(): IconProvider {
		if (!this.initialized || !this.currentProvider) {
			throw new Error('IconService not initialized. Call initialize() first.');
		}
		return this.currentProvider;
	}

	/**
	 * Métodos de conveniencia que delegan al proveedor actual
	 */
	renderIcon(
		iconName: string,
		options?: IconProvider['renderIcon'] extends (name: string, opts?: infer O) => string
			? O
			: never,
	): string {
		return this.getProvider().renderIcon(iconName, options);
	}

	searchIcons(query: string) {
		return this.getProvider().searchIcons(query);
	}

	hasIcon(iconName: string): boolean {
		return this.getProvider().hasIcon(iconName);
	}

	getCatalog() {
		return this.getProvider().getCatalog();
	}

	/**
	 * Verifica si el servicio está inicializado
	 */
	isInitialized(): boolean {
		return this.initialized && this.currentProvider !== null;
	}
}

// Exportar instancia singleton
export const iconService = IconService.getInstance();
