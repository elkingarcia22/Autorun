/**
 * ComponentAddonAdapter
 *
 * Adaptador que envuelve componentes existentes (que implementan la interfaz
 * local ComponentAddon) para que funcionen con el nuevo sistema IComponentAddon
 * del Autorun Hub.
 *
 * Este adaptador permite integrar componentes existentes sin modificar su código.
 */

import { IComponentAddon, ComponentDefinition } from '../interfaces/IComponentAddon';
import { AutorunContext, AddonStatus } from '../interfaces/IAddon';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Interfaz local que usan los componentes existentes
 */
interface LegacyComponentAddon {
	name: string;
	version: string;
	initialize(context?: any): Promise<void>;
	destroy(): void;
	getComponents(): Array<{ name: string; tag: string; documentation?: string }>;
	getStyles(): string[];
}

/**
 * Adaptador que convierte un componente existente en IComponentAddon
 */
export class ComponentAddonAdapter implements IComponentAddon {
	readonly id: string;
	readonly name: string;
	readonly version: string;
	readonly type = 'component' as const;
	readonly description: string;
	readonly dependencies?: string[];

	private legacyAddon: LegacyComponentAddon;
	private addonPath: string;
	private active = false;
	private initialized = false;
	private packageInfoLoaded = false;

	/**
	 * Crea un adaptador para un componente existente
	 * @param legacyAddon Instancia del componente existente
	 * @param addonPath Ruta al directorio del add-on (para leer package.json)
	 */
	constructor(legacyAddon: LegacyComponentAddon, addonPath: string) {
		this.legacyAddon = legacyAddon;
		this.addonPath = addonPath;

		// Extraer información del componente existente
		this.name = legacyAddon.name;
		this.version = legacyAddon.version;

		// Generar ID desde el nombre (ej: '@ubits/button' -> 'button')
		this.id = this.extractIdFromName(legacyAddon.name);

		// Inicializar description por defecto (se cargará del package.json después)
		this.description = `${this.name} component`;
	}

	/**
	 * Extrae el ID del nombre del package
	 * @param packageName Nombre del package (ej: '@ubits/button')
	 * @returns ID del add-on (ej: 'button')
	 */
	private extractIdFromName(packageName: string): string {
		// Si tiene scope (ej: '@ubits/button'), tomar la parte después de /
		if (packageName.includes('/')) {
			return packageName.split('/')[1];
		}
		// Si no tiene scope, usar el nombre completo
		return packageName;
	}

	/**
	 * Carga información adicional del package.json
	 */
	private async loadPackageInfo(): Promise<void> {
		if (this.packageInfoLoaded) {
			return;
		}

		try {
			const packageJsonPath = path.join(this.addonPath, 'package.json');
			const packageContent = await fs.readFile(packageJsonPath, 'utf-8');
			const packageJson = JSON.parse(packageContent);

			// Description ya se inicializa en el constructor
			// No se puede modificar porque es readonly

			this.packageInfoLoaded = true;
		} catch (error) {
			// Si no se puede leer package.json, usar valor por defecto
			this.packageInfoLoaded = true;
		}
	}

	/**
	 * Inicializa el add-on adaptado
	 */
	async initialize(context: AutorunContext): Promise<void> {
		if (this.initialized) {
			return;
		}

		// Cargar información del package.json si no se ha cargado
		await this.loadPackageInfo();

		// Llamar al método initialize del componente existente
		await this.legacyAddon.initialize(context);

		this.initialized = true;
	}

	/**
	 * Activa el add-on
	 */
	async activate(): Promise<void> {
		this.active = true;
	}

	/**
	 * Desactiva el add-on
	 */
	async deactivate(): Promise<void> {
		this.active = false;
	}

	/**
	 * Destruye el add-on
	 */
	destroy(): void {
		this.legacyAddon.destroy();
		this.active = false;
		this.initialized = false;
	}

	/**
	 * Configura el add-on
	 */
	async configure(config: Record<string, any>): Promise<void> {
		// Los componentes existentes no tienen método configure
		// Por ahora, no hacemos nada
		// Se puede extender en el futuro si es necesario
	}

	/**
	 * Verifica si el add-on está activo
	 */
	isActive(): boolean {
		return this.active;
	}

	/**
	 * Obtiene el estado del add-on
	 */
	getStatus(): AddonStatus {
		if (!this.initialized) {
			return 'installed';
		}
		if (this.active) {
			return 'active';
		}
		return 'inactive';
	}

	/**
	 * Obtiene los componentes que este add-on proporciona
	 */
	getComponents(): ComponentDefinition[] {
		const legacyComponents = this.legacyAddon.getComponents();

		return legacyComponents.map((comp) => ({
			name: comp.name,
			tag: comp.tag,
			path: undefined, // Los componentes existentes no tienen path
			styles: this.getStyles(),
		}));
	}

	/**
	 * Obtiene los estilos que este add-on requiere
	 */
	getStyles(): string[] {
		return this.legacyAddon.getStyles();
	}

	/**
	 * Registra los componentes en el sistema (opcional)
	 */
	async registerComponents(): Promise<void> {
		// Los componentes existentes ya se registran en initialize()
		// Este método es para compatibilidad con IComponentAddon
	}

	/**
	 * Obtiene el componente legacy original (para acceso directo si es necesario)
	 */
	getLegacyAddon(): LegacyComponentAddon {
		return this.legacyAddon;
	}
}
