/**
 * AddonLoader
 *
 * Cargador de add-ons desde rutas del sistema de archivos.
 * Lee el manifest.json (o package.json como fallback) y carga el módulo del add-on.
 */

import { IAddon } from './interfaces/IAddon';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

export class AddonLoader {
	/**
	 * Carga un add-on desde una ruta
	 * @param addonPath Ruta al directorio del add-on (absoluta o relativa)
	 * @returns Instancia del add-on
	 * @throws Error si no se puede cargar el add-on
	 */
	async load(addonPath: string): Promise<IAddon> {
		// Resolver ruta absoluta
		const resolvedPath = path.isAbsolute(addonPath)
			? addonPath
			: path.resolve(process.cwd(), addonPath);

		// Verificar que el directorio existe
		try {
			const stats = await fs.stat(resolvedPath);
			if (!stats.isDirectory()) {
				throw new Error(`La ruta ${resolvedPath} no es un directorio`);
			}
		} catch (error) {
			throw new Error(`No se puede acceder al directorio ${resolvedPath}: ${error}`);
		}

		// Intentar cargar manifest.json primero, luego package.json como fallback
		let manifest: any = null;
		const manifestPath = path.join(resolvedPath, 'dist', 'manifest.json');
		const packageJsonPath = path.join(resolvedPath, 'package.json');

		try {
			// Intentar cargar manifest.json desde dist/
			const manifestContent = await fs.readFile(manifestPath, 'utf-8');
			manifest = JSON.parse(manifestContent);
		} catch {
			// Si no existe manifest.json, usar package.json como fallback
			try {
				const packageContent = await fs.readFile(packageJsonPath, 'utf-8');
				const packageJson = JSON.parse(packageContent);

				// Crear manifest desde package.json
				manifest = {
					name: packageJson.name,
					version: packageJson.version,
					description: packageJson.description || '',
					type: this.inferAddonType(packageJson.name),
					main: packageJson.main || './dist/index.js',
					types: packageJson.types || './dist/index.d.ts',
				};
			} catch (error) {
				throw new Error(`No se puede leer manifest.json ni package.json de ${resolvedPath}`);
			}
		}

		// Determinar ruta del módulo principal
		const mainPath = manifest.main || './dist/index.js';
		const modulePath = path.isAbsolute(mainPath) ? mainPath : path.join(resolvedPath, mainPath);

		// Cargar módulo
		let addonModule: any;
		try {
			// En Node.js, usar import dinámico
			// Nota: Esto requiere que el archivo sea un módulo ES
			addonModule = await import(modulePath);
		} catch (error) {
			throw new Error(`No se puede cargar el módulo desde ${modulePath}: ${error}`);
		}

		// Obtener la clase del add-on
		// Puede ser export default o export con nombre
		const AddonClass =
			addonModule.default ||
			addonModule[manifest.export] ||
			addonModule[Object.keys(addonModule)[0]];

		if (!AddonClass) {
			throw new Error(`No se encontró la clase del add-on en ${modulePath}`);
		}

		// Instanciar add-on
		const addon = new AddonClass();

		// Validar que implementa IAddon
		if (!this.isValidAddon(addon)) {
			throw new Error(`El add-on en ${resolvedPath} no implementa IAddon correctamente`);
		}

		return addon;
	}

	/**
	 * Infiere el tipo de add-on desde el nombre del package
	 * @param packageName Nombre del package
	 * @returns Tipo de add-on inferido
	 */
	private inferAddonType(packageName: string): 'component' | 'functional' | 'design' | 'testing' {
		const name = packageName.toLowerCase();

		if (name.includes('token') || name.includes('template') || name.includes('typography')) {
			return 'design';
		}
		if (name.includes('test') || name.includes('jest') || name.includes('spec')) {
			return 'testing';
		}
		if (
			name.includes('github') ||
			name.includes('clarity') ||
			name.includes('vercel') ||
			name.includes('functional')
		) {
			return 'functional';
		}

		// Por defecto, asumir que es un componente
		return 'component';
	}

	/**
	 * Valida que un objeto implementa IAddon
	 * @param obj Objeto a validar
	 * @returns true si implementa IAddon correctamente
	 */
	private isValidAddon(obj: any): obj is IAddon {
		return (
			typeof obj.id === 'string' &&
			typeof obj.name === 'string' &&
			typeof obj.version === 'string' &&
			typeof obj.type === 'string' &&
			typeof obj.description === 'string' &&
			typeof obj.initialize === 'function' &&
			typeof obj.destroy === 'function' &&
			typeof obj.isActive === 'function' &&
			typeof obj.getStatus === 'function'
		);
	}
}
