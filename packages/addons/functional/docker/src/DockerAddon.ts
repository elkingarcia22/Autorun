/**
 * DockerAddon
 *
 * Add-on funcional de Docker que implementa IFunctionalAddon.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { DockerService, DockerConfig, DockerResult } from './DockerService';

export class DockerAddon implements IFunctionalAddon {
	readonly id = 'docker';
	readonly name = 'Docker';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Containerización';

	private service?: DockerService;
	private active = false;
	private config: DockerConfig = {
		enabled: true,
		imageName: 'app',
		tag: 'latest',
		dockerfile: 'Dockerfile',
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;
		const addonConfig = context.config.autorun?.addons?.config?.docker || {};
		this.config = {
			enabled: addonConfig.enabled !== false,
			imageName: addonConfig.imageName || 'app',
			tag: addonConfig.tag || 'latest',
			registry: addonConfig.registry,
			dockerfile: addonConfig.dockerfile || 'Dockerfile',
			context: addonConfig.context || '.',
			projectPath: process.cwd(),
		};

		this.service = new DockerService(this.config, this.config.projectPath);

		try {
			await this.service.initialize();
			console.log('✅ Docker Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Docker Add-on: Error al inicializar - ${error}`);
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new DockerService(this.config, this.config.projectPath);
			await this.service.initialize();
		}
		this.active = true;
		console.log('✅ Docker Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Docker Add-on: Desactivado');
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
		const dockerConfig: Partial<DockerConfig> = {};
		if (config.enabled !== undefined) dockerConfig.enabled = config.enabled;
		if (config.imageName !== undefined) dockerConfig.imageName = config.imageName;
		if (config.tag !== undefined) dockerConfig.tag = config.tag;
		if (config.registry !== undefined) dockerConfig.registry = config.registry;
		if (config.dockerfile !== undefined) dockerConfig.dockerfile = config.dockerfile;
		if (config.context !== undefined) dockerConfig.context = config.context;

		this.config = { ...this.config, ...dockerConfig };
		if (this.service) {
			this.service.updateConfig(dockerConfig);
		} else {
			this.service = new DockerService(this.config, this.config.projectPath);
		}
	}

	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		try {
			console.log('🐳 Docker: Construyendo imagen antes de deploy...');
			await this.service.build();
		} catch (error) {
			console.error('❌ Docker: Error al construir imagen:', error);
		}
	}

	getServices() {
		return {
			build: async (options?: { imageName?: string; tag?: string; dockerfile?: string }) => {
				if (!this.service) {
					throw new Error('Docker service no está inicializado');
				}
				return await this.service.build(options);
			},
			push: async (options?: { imageName?: string; tag?: string; registry?: string }) => {
				if (!this.service) {
					throw new Error('Docker service no está inicializado');
				}
				return await this.service.push(options);
			},
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},
			updateConfig: (config: Partial<DockerConfig>) => {
				if (!this.service) {
					throw new Error('Docker service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}
