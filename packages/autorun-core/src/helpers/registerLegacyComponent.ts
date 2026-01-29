/**
 * Helper para registrar componentes legacy en el Hub
 *
 * Esta función facilita la integración de componentes existentes
 * con el Autorun Hub usando el ComponentAddonAdapter.
 */

import { AutorunHub } from '../AutorunHub';
import { ComponentAddonAdapter } from '../adapters/ComponentAddonAdapter';
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
 * Registra un componente legacy en el Hub
 *
 * @param hub Instancia del AutorunHub
 * @param legacyAddon Instancia del componente legacy
 * @param addonPath Ruta al directorio del add-on
 * @returns Promise que se resuelve cuando el componente está registrado
 */
export async function registerLegacyComponent(
	hub: AutorunHub,
	legacyAddon: LegacyComponentAddon,
	addonPath: string,
): Promise<void> {
	// Crear adaptador
	const adapter = new ComponentAddonAdapter(legacyAddon, addonPath);

	// Registrar en el Hub
	const registry = (hub as any).registry;
	registry.register(adapter);

	console.log(`📦 Componente legacy registrado: ${adapter.name} (${adapter.id})`);
}

/**
 * Carga y registra un componente legacy desde una ruta
 *
 * @param hub Instancia del AutorunHub
 * @param addonPath Ruta al directorio del add-on
 * @returns Promise que se resuelve cuando el componente está registrado
 */
export async function loadAndRegisterLegacyComponent(
	hub: AutorunHub,
	addonPath: string,
): Promise<void> {
	// Resolver ruta absoluta
	const resolvedPath = path.isAbsolute(addonPath)
		? addonPath
		: path.resolve(process.cwd(), addonPath);

	// Cargar módulo del componente
	const modulePath = path.join(resolvedPath, 'dist', 'index.js');
	const addonModule = await import(modulePath);

	// Buscar la clase del add-on (puede ser export default o con nombre)
	const AddonClass =
		addonModule.default ||
		addonModule.ButtonAddon ||
		addonModule.InputAddon ||
		addonModule[Object.keys(addonModule).find((key) => key.endsWith('Addon')) || ''];

	if (!AddonClass) {
		throw new Error(`No se encontró la clase del add-on en ${modulePath}`);
	}

	// Instanciar componente legacy
	const legacyAddon = new AddonClass();

	// Verificar que es un componente legacy
	if (!isLegacyComponent(legacyAddon)) {
		throw new Error(
			`El componente en ${resolvedPath} no implementa la interfaz legacy ComponentAddon`,
		);
	}

	// Registrar usando el adaptador
	await registerLegacyComponent(hub, legacyAddon, resolvedPath);
}

/**
 * Verifica si un objeto es un componente legacy
 */
function isLegacyComponent(obj: any): obj is LegacyComponentAddon {
	return (
		typeof obj.name === 'string' &&
		typeof obj.version === 'string' &&
		typeof obj.initialize === 'function' &&
		typeof obj.destroy === 'function' &&
		typeof obj.getComponents === 'function' &&
		typeof obj.getStyles === 'function'
	);
}
