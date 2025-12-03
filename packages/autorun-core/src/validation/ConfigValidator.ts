/**
 * ConfigValidator
 *
 * Valida la configuración del proyecto contra un schema
 */

export interface ConfigSchema {
	autorun?: {
		version?: string;
		projectType?: 'ubits' | 'independent';
		addons?: {
			active?: string[];
			config?: Record<string, any>;
		};
		ubits?: {
			template?: string;
			module?: string;
			product?: string;
			canvasPath?: string;
		};
	};
}

export interface ValidationError {
	path: string;
	message: string;
	value?: any;
}

export class ConfigValidator {
	private schema: ConfigSchema;

	constructor(schema?: ConfigSchema) {
		this.schema = schema || this.getDefaultSchema();
	}

	/**
	 * Valida una configuración contra el schema
	 */
	validate(config: any): { valid: boolean; errors: ValidationError[] } {
		const errors: ValidationError[] = [];

		// Validar estructura básica
		if (!config || typeof config !== 'object') {
			errors.push({
				path: 'root',
				message: 'La configuración debe ser un objeto',
			});
			return { valid: false, errors };
		}

		// Validar sección autorun
		if (config.autorun) {
			const autorunErrors = this.validateAutorun(config.autorun);
			errors.push(...autorunErrors);
		}

		return {
			valid: errors.length === 0,
			errors,
		};
	}

	/**
	 * Valida la sección autorun
	 */
	private validateAutorun(autorun: any): ValidationError[] {
		const errors: ValidationError[] = [];

		// Validar version
		if (autorun.version !== undefined) {
			if (typeof autorun.version !== 'string') {
				errors.push({
					path: 'autorun.version',
					message: 'Debe ser una cadena de texto',
					value: autorun.version,
				});
			}
		}

		// Validar projectType
		if (autorun.projectType !== undefined) {
			if (!['ubits', 'independent'].includes(autorun.projectType)) {
				errors.push({
					path: 'autorun.projectType',
					message: 'Debe ser "ubits" o "independent"',
					value: autorun.projectType,
				});
			}
		}

		// Validar addons
		if (autorun.addons) {
			const addonsErrors = this.validateAddons(autorun.addons);
			errors.push(...addonsErrors);
		}

		// Validar ubits (si es proyecto UBITS)
		if (autorun.ubits) {
			const ubitsErrors = this.validateUBITS(autorun.ubits);
			errors.push(...ubitsErrors);
		}

		return errors;
	}

	/**
	 * Valida la sección addons
	 */
	private validateAddons(addons: any): ValidationError[] {
		const errors: ValidationError[] = [];

		if (typeof addons !== 'object') {
			errors.push({
				path: 'autorun.addons',
				message: 'Debe ser un objeto',
				value: addons,
			});
			return errors;
		}

		// Validar active
		if (addons.active !== undefined) {
			if (!Array.isArray(addons.active)) {
				errors.push({
					path: 'autorun.addons.active',
					message: 'Debe ser un array de strings',
					value: addons.active,
				});
			} else {
				// Validar que todos los elementos sean strings
				addons.active.forEach((item: any, index: number) => {
					if (typeof item !== 'string') {
						errors.push({
							path: `autorun.addons.active[${index}]`,
							message: 'Debe ser una cadena de texto',
							value: item,
						});
					}
				});
			}
		}

		// Validar config
		if (addons.config !== undefined) {
			if (typeof addons.config !== 'object' || Array.isArray(addons.config)) {
				errors.push({
					path: 'autorun.addons.config',
					message: 'Debe ser un objeto',
					value: addons.config,
				});
			}
		}

		return errors;
	}

	/**
	 * Valida la sección ubits
	 */
	private validateUBITS(ubits: any): ValidationError[] {
		const errors: ValidationError[] = [];

		if (typeof ubits !== 'object') {
			errors.push({
				path: 'autorun.ubits',
				message: 'Debe ser un objeto',
				value: ubits,
			});
			return errors;
		}

		// Validar template
		if (ubits.template !== undefined) {
			if (typeof ubits.template !== 'string') {
				errors.push({
					path: 'autorun.ubits.template',
					message: 'Debe ser una cadena de texto',
					value: ubits.template,
				});
			}
		}

		// Validar module
		if (ubits.module !== undefined) {
			if (typeof ubits.module !== 'string') {
				errors.push({
					path: 'autorun.ubits.module',
					message: 'Debe ser una cadena de texto',
					value: ubits.module,
				});
			}
		}

		// Validar product
		if (ubits.product !== undefined) {
			if (typeof ubits.product !== 'string') {
				errors.push({
					path: 'autorun.ubits.product',
					message: 'Debe ser una cadena de texto',
					value: ubits.product,
				});
			}
		}

		// Validar canvasPath
		if (ubits.canvasPath !== undefined) {
			if (typeof ubits.canvasPath !== 'string') {
				errors.push({
					path: 'autorun.ubits.canvasPath',
					message: 'Debe ser una cadena de texto',
					value: ubits.canvasPath,
				});
			}
		}

		return errors;
	}

	/**
	 * Obtiene el schema por defecto
	 */
	private getDefaultSchema(): ConfigSchema {
		return {
			autorun: {
				version: 'string',
				projectType: 'ubits' as 'ubits' | 'independent', // Tipo específico
				addons: {
					active: ['string'],
					config: {},
				},
				ubits: {
					template: 'string',
					module: 'string',
					product: 'string',
					canvasPath: 'string',
				},
			},
		};
	}

	/**
	 * Genera un mensaje de error formateado
	 */
	generateErrorMessage(errors: ValidationError[]): string {
		if (errors.length === 0) {
			return 'Configuración válida';
		}

		let message = `Se encontraron ${errors.length} error(es) en la configuración:\n\n`;

		errors.forEach((error, index) => {
			message += `${index + 1}. [${error.path}]\n`;
			message += `   ${error.message}\n`;
			if (error.value !== undefined) {
				message += `   Valor: ${JSON.stringify(error.value)}\n`;
			}
			message += '\n';
		});

		return message;
	}
}
