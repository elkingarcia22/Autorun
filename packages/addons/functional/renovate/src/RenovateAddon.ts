/**
 * RenovateAddon
 *
 * Add-on funcional de Renovate que implementa IFunctionalAddon.
 * Proporciona actualización automática de dependencias.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import {
	RenovateService,
	RenovateConfig,
	RenovateResult,
	UpdateInfo,
} from './RenovateService';

export class RenovateAddon implements IFunctionalAddon {
	readonly id = 'renovate';
	readonly name = 'Renovate';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Actualización automática de dependencias';

	private service?: RenovateService;
	private active = false;
	private config: RenovateConfig = {
		enabled: true,
		autoUpdate: false,
		createPRs: true,
		schedule: 'at any time',
		labels: ['renovate', 'dependencies'],
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.renovate || {};
		this.config = {
			enabled: addonConfig.enabled !== false,
			autoUpdate: addonConfig.autoUpdate === true,
			createPRs: addonConfig.createPRs !== false,
			schedule: addonConfig.schedule || 'at any time',
			labels: addonConfig.labels || ['renovate', 'dependencies'],
			assignees: addonConfig.assignees || [],
			reviewers: addonConfig.reviewers || [],
			packageRules: addonConfig.packageRules || [],
			extends: addonConfig.extends || ['config:recommended'],
			projectPath: process.cwd(),
		};

		// Inicializar servicio
		this.service = new RenovateService(this.config, this.config.projectPath);

		try {
			await this.service.initialize();
			console.log('✅ Renovate Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Renovate Add-on: Error al inicializar - ${error}`);
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new RenovateService(this.config, this.config.projectPath);
			await this.service.initialize();
		}

		this.active = true;
		console.log('✅ Renovate Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Renovate Add-on: Desactivado');
	}

	isActive(): boolean {
		return this.active;
	}

	getStatus(): 'active' | 'inactive' {
		return this.active ? 'active' : 'inactive';
	}

	destroy(): void {
		this.active = false;
		this.service = undefined;
	}

	async configure(config: Record<string, any>): Promise<void> {
		const renovateConfig: Partial<RenovateConfig> = {};

		if (config.enabled !== undefined) renovateConfig.enabled = config.enabled;
		if (config.autoUpdate !== undefined) renovateConfig.autoUpdate = config.autoUpdate;
		if (config.createPRs !== undefined) renovateConfig.createPRs = config.createPRs;
		if (config.schedule !== undefined) renovateConfig.schedule = config.schedule;
		if (config.labels !== undefined) renovateConfig.labels = config.labels;
		if (config.assignees !== undefined) renovateConfig.assignees = config.assignees;
		if (config.reviewers !== undefined) renovateConfig.reviewers = config.reviewers;
		if (config.packageRules !== undefined)
			renovateConfig.packageRules = config.packageRules;
		if (config.extends !== undefined) renovateConfig.extends = config.extends;

		this.config = { ...this.config, ...renovateConfig };

		if (this.service) {
			this.service.updateConfig(renovateConfig);
			await this.service.updateRenovateConfig(renovateConfig);
		} else {
			this.service = new RenovateService(this.config, this.config.projectPath);
		}
	}

	/**
	 * Hook llamado periódicamente (si está configurado)
	 */
	async onSchedule(): Promise<void> {
		if (!this.active || !this.service || !this.config.autoUpdate) {
			return;
		}

		try {
			console.log('🔄 Renovate: Ejecutando verificación de actualizaciones...');
			const result = await this.service.checkUpdates();

			if (result.success && result.updatesFound && result.updatesFound > 0) {
				console.log(`✅ Renovate: ${result.updatesFound} actualizaciones encontradas`);

				if (this.config.createPRs) {
					console.log('📦 Renovate: Creando PRs automáticamente...');
					await this.service.run();
				}
			} else {
				console.log('ℹ️  Renovate: No hay actualizaciones disponibles');
			}
		} catch (error) {
			console.error('❌ Renovate: Error al verificar actualizaciones:', error);
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Verificar actualizaciones
			checkUpdates: async () => {
				if (!this.service) {
					throw new Error('Renovate service no está inicializado');
				}
				return await this.service.checkUpdates();
			},

			// Ejecutar Renovate
			run: async () => {
				if (!this.service) {
					throw new Error('Renovate service no está inicializado');
				}
				return await this.service.run();
			},

			// Obtener configuración de Renovate
			getRenovateConfig: async () => {
				if (!this.service) {
					throw new Error('Renovate service no está inicializado');
				}
				return await this.service.getRenovateConfig();
			},

			// Actualizar configuración de Renovate
			updateRenovateConfig: async (config: Partial<RenovateConfig>) => {
				if (!this.service) {
					throw new Error('Renovate service no está inicializado');
				}
				return await this.service.updateRenovateConfig(config);
			},

			// Obtener configuración del add-on
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},

			// Actualizar configuración del add-on
			updateConfig: (config: Partial<RenovateConfig>) => {
				if (!this.service) {
					throw new Error('Renovate service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}

