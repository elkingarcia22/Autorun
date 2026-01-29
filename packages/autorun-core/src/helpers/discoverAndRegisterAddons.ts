/**
 * Helper para descubrir y registrar add-ons automáticamente
 *
 * Este helper busca add-ons en packages/addons/functional/ y los registra
 * automáticamente en AutorunHub antes de activarlos.
 *
 * ⭐ MEJORADO: Ahora detecta add-ons en runtime sin necesidad de compilar
 */

import * as path from 'path';
import * as fs from 'fs/promises';
import { AutorunHub } from '../AutorunHub';

/**
 * Descubre add-ons disponibles en packages/addons/functional/
 */
export async function discoverAvailableAddons(): Promise<
	Array<{ id: string; name: string; description: string; path: string }>
> {
	const addons: Array<{ id: string; name: string; description: string; path: string }> = [];
	const addonsPath = 'packages/addons/functional';

	try {
		const functionalPath = path.resolve(process.cwd(), addonsPath);

		try {
			const entries = await fs.readdir(functionalPath, { withFileTypes: true });

			for (const entry of entries) {
				if (entry.isDirectory()) {
					const addonPath = path.join(functionalPath, entry.name);
					const manifestPath = path.join(addonPath, 'manifest.json');

					try {
						const manifestContent = await fs.readFile(manifestPath, 'utf-8');
						const manifest = JSON.parse(manifestContent);

						addons.push({
							id: manifest.id || entry.name,
							name: manifest.name || entry.name,
							description: manifest.description || '',
							path: addonPath,
						});
					} catch {
						// Si no hay manifest, usar el nombre del directorio
						addons.push({
							id: entry.name,
							name: entry.name,
							description: '',
							path: addonPath,
						});
					}
				}
			}
		} catch {
			// Si no existe el directorio, retornar lista vacía
		}
	} catch {
		// Si no se puede acceder, retornar lista vacía
	}

	return addons;
}

/**
 * Registra automáticamente todos los add-ons disponibles en AutorunHub
 *
 * @param hub Instancia de AutorunHub donde registrar los add-ons
 * @returns Número de add-ons registrados
 */
export async function registerAvailableAddons(hub: AutorunHub): Promise<number> {
	const addons = await discoverAvailableAddons();
	let registeredCount = 0;

	for (const addon of addons) {
		try {
			// Verificar si el add-on ya está registrado
			if (hub.getAvailableAddons().some((a) => a.id === addon.id)) {
				continue; // Ya está registrado, saltar
			}

			// ⭐ MEJORADO: Intentar registrar incluso si no tiene dist/ compilado
			// (detectar en runtime desde src/)
			const distPath = path.join(addon.path, 'dist');
			const srcPath = path.join(addon.path, 'src');

			let canRegister = false;

			// Opción 1: Tiene dist/ compilado (preferido)
			try {
				await fs.access(distPath);
				const indexJsPath = path.join(distPath, 'index.js');
				const indexDtsPath = path.join(distPath, 'index.d.ts');

				try {
					await fs.access(indexJsPath);
					canRegister = true;
				} catch {
					try {
						await fs.access(indexDtsPath);
						canRegister = true;
					} catch {
						// No tiene dist/, intentar src/
					}
				}
			} catch {
				// No tiene dist/, intentar src/
			}

			// Opción 2: Tiene src/ (runtime detection)
			if (!canRegister) {
				try {
					await fs.access(srcPath);
					const srcIndexPath = path.join(srcPath, 'index.ts');
					const srcAddonPath = path.join(
						srcPath,
						`${addon.id.charAt(0).toUpperCase() + addon.id.slice(1)}Addon.ts`,
					);

					// Verificar que tenga archivo principal
					try {
						await fs.access(srcIndexPath);
						canRegister = true;
					} catch {
						try {
							await fs.access(srcAddonPath);
							canRegister = true;
						} catch {
							// No tiene archivos fuente reconocibles
						}
					}
				} catch {
					// No tiene src/
				}
			}

			if (canRegister) {
				// Registrar el add-on
				await hub.registerAddon(addon.path);
				registeredCount++;
			} else {
				// No tiene estructura reconocible, saltar
				continue;
			}
		} catch (error: any) {
			// Si ya está registrado, continuar sin error
			if (error.message?.includes('ya está registrado')) {
				continue;
			}
			// Otros errores se ignoran silenciosamente
		}
	}

	return registeredCount;
}
