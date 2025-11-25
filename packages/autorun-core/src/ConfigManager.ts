/**
 * ConfigManager
 *
 * Gestor de configuración del proyecto.
 * Lee y escribe la configuración desde .ubits/project-config.json
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export class ConfigManager {
	private configPath: string;
	private config: any = null;

	/**
	 * Crea una instancia de ConfigManager
	 * @param configPath Ruta al archivo de configuración (por defecto: .ubits/project-config.json)
	 */
	constructor(configPath: string = '.ubits/project-config.json') {
		this.configPath = configPath;
	}

	/**
	 * Carga la configuración desde el archivo
	 * @returns Configuración del proyecto
	 */
	async load(): Promise<any> {
		if (this.config) {
			return this.config;
		}

		try {
			const content = await fs.readFile(this.configPath, 'utf-8');
			this.config = JSON.parse(content);
			return this.config;
		} catch (error) {
			// Si no existe, crear configuración por defecto
			this.config = {
				autorun: {
					version: '1.0.0',
					addons: {
						active: [],
						config: {},
					},
				},
			};
			await this.save();
			return this.config;
		}
	}

	/**
	 * Guarda la configuración en el archivo
	 */
	async save(): Promise<void> {
		const dir = path.dirname(this.configPath);
		await fs.mkdir(dir, { recursive: true });
		await fs.writeFile(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
	}

	/**
	 * Agrega un add-on a la lista de activos
	 * @param addonId ID del add-on
	 */
	async addAddon(addonId: string): Promise<void> {
		await this.load();

		if (!this.config.autorun) {
			this.config.autorun = {
				version: '1.0.0',
				addons: { active: [], config: {} },
			};
		}

		if (!this.config.autorun.addons.active.includes(addonId)) {
			this.config.autorun.addons.active.push(addonId);
			await this.save();
		}
	}

	/**
	 * Remueve un add-on de la lista de activos
	 * @param addonId ID del add-on
	 */
	async removeAddon(addonId: string): Promise<void> {
		await this.load();

		if (this.config.autorun?.addons?.active) {
			const index = this.config.autorun.addons.active.indexOf(addonId);
			if (index > -1) {
				this.config.autorun.addons.active.splice(index, 1);
				await this.save();
			}
		}
	}

	/**
	 * Obtiene la configuración de un add-on específico
	 * @param addonId ID del add-on
	 * @returns Configuración del add-on o objeto vacío
	 */
	getAddonConfig(addonId: string): any {
		return this.config?.autorun?.addons?.config?.[addonId] || {};
	}

	/**
	 * Establece la configuración de un add-on
	 * @param addonId ID del add-on
	 * @param config Configuración del add-on
	 */
	async setAddonConfig(addonId: string, config: any): Promise<void> {
		await this.load();

		if (!this.config.autorun) {
			this.config.autorun = {
				version: '1.0.0',
				addons: { active: [], config: {} },
			};
		}

		if (!this.config.autorun.addons.config) {
			this.config.autorun.addons.config = {};
		}

		this.config.autorun.addons.config[addonId] = config;
		await this.save();
	}
}
