/**
 * ConfigManager
 *
 * Gestor de configuración del proyecto.
 * Lee y escribe la configuración desde .ubits/project-config.json
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { ConfigValidator, ValidationError } from './validation/ConfigValidator';
import { InvalidConfigError, ConfigFileError } from './errors/AutorunErrors';

export class ConfigManager {
	private configPath: string;
	private config: any = null;
	private validator: ConfigValidator;

	/**
	 * Crea una instancia de ConfigManager
	 * @param configPath Ruta al archivo de configuración (por defecto: .ubits/project-config.json)
	 */
	constructor(configPath: string = '.ubits/project-config.json') {
		this.configPath = configPath;
		this.validator = new ConfigValidator();
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

			// Validar configuración
			const validation = this.validator.validate(this.config);
			if (!validation.valid) {
				const errorMessage = this.validator.generateErrorMessage(validation.errors);
				throw new InvalidConfigError(
					'La configuración no cumple con el schema',
					this.configPath,
					validation.errors.map((e) => e.message),
				);
			}

			return this.config;
		} catch (error: any) {
			// Si es error de archivo no encontrado, crear configuración por defecto
			if (error.code === 'ENOENT') {
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

			// Si es error de validación, re-lanzar
			if (error instanceof InvalidConfigError) {
				throw error;
			}

			// Si es error de JSON, lanzar error de archivo
			if (error instanceof SyntaxError) {
				throw new ConfigFileError(this.configPath, `JSON inválido: ${error.message}`);
			}

			// Otros errores de archivo
			throw new ConfigFileError(
				this.configPath,
				error.message || 'Error desconocido al leer archivo',
			);
		}
	}

	/**
	 * Guarda la configuración en el archivo
	 */
	async save(): Promise<void> {
		// Validar antes de guardar
		if (this.config) {
			const validation = this.validator.validate(this.config);
			if (!validation.valid) {
				const errorMessage = this.validator.generateErrorMessage(validation.errors);
				throw new InvalidConfigError(
					'No se puede guardar: la configuración no cumple con el schema',
					this.configPath,
					validation.errors.map((e) => e.message),
				);
			}
		}

		try {
			const dir = path.dirname(this.configPath);
			await fs.mkdir(dir, { recursive: true });
			await fs.writeFile(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
		} catch (error: any) {
			throw new ConfigFileError(
				this.configPath,
				error.message || 'Error desconocido al escribir archivo',
			);
		}
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
