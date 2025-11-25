/**
 * StorybookAddon
 *
 * Add-on funcional de Storybook que implementa IFunctionalAddon.
 * Proporciona gestión de Storybook, generación de stories y build.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { StorybookService, StorybookConfig, StorybookProcess } from './StorybookService';

export class StorybookAddon implements IFunctionalAddon {
	readonly id = 'storybook';
	readonly name = 'Storybook Development';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Desarrollo y documentación de componentes con Storybook';

	private service?: StorybookService;
	private active = false;
	private config: StorybookConfig = {
		port: 6006,
		host: 'localhost',
		buildDir: 'storybook-static',
		configDir: '.storybook',
		storiesDir: 'stories',
		autoStart: false,
		framework: 'react',
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.storybook || {};
		this.config = {
			port: addonConfig.port || 6006,
			host: addonConfig.host || 'localhost',
			buildDir: addonConfig.buildDir || 'storybook-static',
			configDir: addonConfig.configDir || '.storybook',
			storiesDir: addonConfig.storiesDir || 'stories',
			autoStart: addonConfig.autoStart || false,
			framework: addonConfig.framework || 'react',
			staticDirs: addonConfig.staticDirs || [],
			addons: addonConfig.addons || [],
		};

		// Inicializar servicio
		this.service = new StorybookService(this.config, process.cwd());

		try {
			await this.service.initialize();
			console.log('✅ Storybook Add-on: Inicializado correctamente');

			// Auto-start si está configurado
			if (this.config.autoStart) {
				await this.activate();
			}
		} catch (error) {
			console.error(`❌ Storybook Add-on: Error al inicializar - ${error}`);
			// No lanzar error, permitir que el add-on funcione sin inicialización completa
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new StorybookService(this.config, process.cwd());
			await this.service.initialize();
		}

		// Iniciar servidor de desarrollo si no está corriendo
		const status = this.service.getStatus();
		if (!status.running) {
			try {
				const process = await this.service.start();
				console.log(`✅ Storybook Add-on: Servidor iniciado en ${process.url}`);
			} catch (error) {
				console.error(`❌ Storybook Add-on: Error al iniciar servidor - ${error}`);
			}
		}

		this.active = true;
		console.log('✅ Storybook Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		this.service?.stop();
		console.log('🔌 Storybook Add-on: Desactivado');
	}

	isActive(): boolean {
		return this.active;
	}

	getStatus(): 'active' | 'inactive' {
		return this.active ? 'active' : 'inactive';
	}

	destroy(): void {
		this.service?.stop();
		this.active = false;
		this.service = undefined;
	}

	async configure(config: Record<string, any>): Promise<void> {
		const storybookConfig: Partial<StorybookConfig> = {};

		if (config.port !== undefined) storybookConfig.port = config.port;
		if (config.host) storybookConfig.host = config.host;
		if (config.buildDir) storybookConfig.buildDir = config.buildDir;
		if (config.configDir) storybookConfig.configDir = config.configDir;
		if (config.storiesDir) storybookConfig.storiesDir = config.storiesDir;
		if (config.autoStart !== undefined) storybookConfig.autoStart = config.autoStart;
		if (config.framework) storybookConfig.framework = config.framework;
		if (config.staticDirs) storybookConfig.staticDirs = config.staticDirs;
		if (config.addons) storybookConfig.addons = config.addons;

		this.config = { ...this.config, ...storybookConfig };

		if (this.service) {
			this.service.updateConfig(storybookConfig);
		} else {
			this.service = new StorybookService(this.config, process.cwd());
			await this.service.initialize();
		}
	}

	/**
	 * Hook llamado cuando un archivo cambia
	 */
	async onFileChange(filePath: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Storybook tiene hot reload automático, no necesitamos hacer nada
		// pero podemos trackear cambios si Clarity está disponible
		if (this.context) {
			const clarityService = this.context.hub?.getService?.('clarity', 'trackEvent');
			if (clarityService && filePath.includes('stories')) {
				clarityService('storybook_story_changed', {
					filePath,
					timestamp: new Date().toISOString(),
				});
			}
		}
	}

	/**
	 * Hook llamado antes de hacer deploy
	 */
	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Build de Storybook antes de deploy
		try {
			console.log('📦 Storybook Add-on: Haciendo build antes de deploy...');
			await this.service.build();
		} catch (error) {
			console.error('❌ Storybook Add-on: Error al hacer build:', error);
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Iniciar servidor de desarrollo
			start: async () => {
				if (!this.service) {
					throw new Error('Storybook service no está inicializado');
				}
				return await this.service.start();
			},

			// Detener servidor
			stop: () => {
				if (!this.service) {
					throw new Error('Storybook service no está inicializado');
				}
				return this.service.stop();
			},

			// Build estático
			build: async () => {
				if (!this.service) {
					throw new Error('Storybook service no está inicializado');
				}
				return await this.service.build();
			},

			// Generar story
			generateStory: async (
				componentName: string,
				options?: {
					componentPath?: string;
					category?: string;
					args?: Record<string, any>;
				},
			) => {
				if (!this.service) {
					throw new Error('Storybook service no está inicializado');
				}
				return await this.service.generateStory(componentName, options);
			},

			// Generar configuración
			generateConfig: async () => {
				if (!this.service) {
					throw new Error('Storybook service no está inicializado');
				}
				return await this.service.generateConfig();
			},

			// Obtener estado
			getStatus: () => {
				if (!this.service) {
					return {
						initialized: false,
						running: false,
					};
				}
				return this.service.getStatus();
			},

			// Obtener configuración
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},

			// Actualizar configuración
			updateConfig: (config: Partial<StorybookConfig>) => {
				if (!this.service) {
					throw new Error('Storybook service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}
