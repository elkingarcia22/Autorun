/**
 * TurborepoAddon
 *
 * Add-on funcional de Turborepo que implementa IFunctionalAddon.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { TurborepoService, TurborepoConfig, BuildResult } from './TurborepoService';

export class TurborepoAddon implements IFunctionalAddon {
	readonly id = 'turborepo';
	readonly name = 'Turborepo';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Monorepo management';

	private service?: TurborepoService;
	private active = false;
	private config: TurborepoConfig = {
		enabled: true,
		cache: true,
		parallel: true,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;
		const addonConfig = context.config.autorun?.addons?.config?.turborepo || {};
		this.config = {
			enabled: addonConfig.enabled !== false,
			cache: addonConfig.cache !== false,
			parallel: addonConfig.parallel !== false,
			filter: addonConfig.filter,
			projectPath: process.cwd(),
		};

		this.service = new TurborepoService(this.config, this.config.projectPath);

		try {
			await this.service.initialize();
			console.log('✅ Turborepo Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Turborepo Add-on: Error al inicializar - ${error}`);
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new TurborepoService(this.config, this.config.projectPath);
			await this.service.initialize();
		}
		this.active = true;
		console.log('✅ Turborepo Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Turborepo Add-on: Desactivado');
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
		const turborepoConfig: Partial<TurborepoConfig> = {};
		if (config.enabled !== undefined) turborepoConfig.enabled = config.enabled;
		if (config.cache !== undefined) turborepoConfig.cache = config.cache;
		if (config.parallel !== undefined) turborepoConfig.parallel = config.parallel;
		if (config.filter !== undefined) turborepoConfig.filter = config.filter;

		this.config = { ...this.config, ...turborepoConfig };
		if (this.service) {
			this.service.updateConfig(turborepoConfig);
		} else {
			this.service = new TurborepoService(this.config, this.config.projectPath);
		}
	}

	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		try {
			console.log('⚡ Turborepo: Ejecutando build antes de deploy...');
			await this.service.run('build');
		} catch (error) {
			console.error('❌ Turborepo: Error al ejecutar build:', error);
		}
	}

	getServices() {
		return {
			run: async (
				task: string,
				options?: { filter?: string; cache?: boolean; parallel?: boolean },
			) => {
				if (!this.service) {
					throw new Error('Turborepo service no está inicializado');
				}
				return await this.service.run(task, options);
			},
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},
			updateConfig: (config: Partial<TurborepoConfig>) => {
				if (!this.service) {
					throw new Error('Turborepo service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}

