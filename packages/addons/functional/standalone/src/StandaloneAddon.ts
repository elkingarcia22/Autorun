/**
 * StandaloneAddon
 *
 * Add-on funcional de Standalone Mode que implementa IFunctionalAddon.
 * Proporciona builds optimizados y extracción de componentes desde Storybook.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { StandaloneService, StandaloneConfig, StandaloneBuildResult } from './StandaloneService';

export class StandaloneAddon implements IFunctionalAddon {
	readonly id = 'standalone';
	readonly name = 'Standalone Mode';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Builds optimizados y extracción de componentes desde Storybook';

	private service?: StandaloneService;
	private active = false;
	private config: StandaloneConfig = {
		optimizeStorybookBuild: true,
		extractComponents: false,
		componentsOutputDir: 'dist/components',
		generateManifest: true,
		minify: true,
		compress: true,
		treeShake: true,
		targets: ['storybook'],
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.standalone || {};
		this.config = {
			optimizeStorybookBuild: addonConfig.optimizeStorybookBuild !== false,
			extractComponents: addonConfig.extractComponents === true,
			componentsOutputDir: addonConfig.componentsOutputDir || 'dist/components',
			generateManifest: addonConfig.generateManifest !== false,
			minify: addonConfig.minify !== false,
			compress: addonConfig.compress !== false,
			treeShake: addonConfig.treeShake !== false,
			targets: addonConfig.targets || ['storybook'],
			storybookBuildDir: addonConfig.storybookBuildDir || 'storybook-static',
			tokensOutputDir: addonConfig.tokensOutputDir || 'dist/tokens',
			tokensSourcePath: addonConfig.tokensSourcePath || 'packages/tokens',
			minifier: addonConfig.minifier || 'both',
			imageCompression: addonConfig.imageCompression !== false,
			imageQuality: addonConfig.imageQuality || 80,
			projectPath: process.cwd(),
		};

		// Inicializar servicio
		this.service = new StandaloneService(this.config, this.config.projectPath);

		console.log('✅ Standalone Add-on: Inicializado correctamente');
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new StandaloneService(this.config, this.config.projectPath);
		}

		this.active = true;
		console.log('✅ Standalone Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Standalone Add-on: Desactivado');
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
		const standaloneConfig: Partial<StandaloneConfig> = {};

		if (config.optimizeStorybookBuild !== undefined)
			standaloneConfig.optimizeStorybookBuild = config.optimizeStorybookBuild;
		if (config.extractComponents !== undefined)
			standaloneConfig.extractComponents = config.extractComponents;
		if (config.componentsOutputDir !== undefined)
			standaloneConfig.componentsOutputDir = config.componentsOutputDir;
		if (config.generateManifest !== undefined)
			standaloneConfig.generateManifest = config.generateManifest;
		if (config.minify !== undefined) standaloneConfig.minify = config.minify;
		if (config.compress !== undefined) standaloneConfig.compress = config.compress;
		if (config.treeShake !== undefined) standaloneConfig.treeShake = config.treeShake;
		if (config.targets !== undefined) standaloneConfig.targets = config.targets;
		if (config.storybookBuildDir !== undefined)
			standaloneConfig.storybookBuildDir = config.storybookBuildDir;
		if (config.tokensOutputDir !== undefined)
			standaloneConfig.tokensOutputDir = config.tokensOutputDir;
		if (config.tokensSourcePath !== undefined)
			standaloneConfig.tokensSourcePath = config.tokensSourcePath;
		if (config.minifier !== undefined) standaloneConfig.minifier = config.minifier;
		if (config.imageCompression !== undefined)
			standaloneConfig.imageCompression = config.imageCompression;
		if (config.imageQuality !== undefined) standaloneConfig.imageQuality = config.imageQuality;

		this.config = { ...this.config, ...standaloneConfig };

		if (this.service) {
			this.service.updateConfig(standaloneConfig);
		} else {
			this.service = new StandaloneService(this.config, this.config.projectPath);
		}
	}

	/**
	 * Hook llamado antes de hacer deploy
	 */
	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		try {
			console.log('📦 Standalone Add-on: Ejecutando build standalone antes de deploy...');
			const result = await this.service.build();

			if (result.success) {
				console.log('✅ Standalone Add-on: Build completado exitosamente');
				if (result.optimizations) {
					console.log(
						`   📊 Optimización: ${this.formatBytes(result.optimizations.originalSize || 0)} → ${this.formatBytes(result.optimizations.optimizedSize || 0)}`,
					);
				}
				if (result.components && result.components.length > 0) {
					console.log(`   🔧 ${result.components.length} componentes extraídos`);
				}
			} else {
				console.error('❌ Standalone Add-on: Error en build:', result.error);
			}
		} catch (error) {
			console.error('❌ Standalone Add-on: Error al ejecutar build:', error);
		}
	}

	/**
	 * Hook llamado después de hacer deploy
	 */
	async onAfterDeploy(url: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		console.log(`✅ Standalone Add-on: Deploy completado en ${url}`);
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Ejecutar build standalone
			build: async (options?: Partial<StandaloneConfig>) => {
				if (!this.service) {
					throw new Error('Standalone service no está inicializado');
				}
				return await this.service.build(options);
			},

			// Obtener configuración
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},

			// Actualizar configuración
			updateConfig: (config: Partial<StandaloneConfig>) => {
				if (!this.service) {
					throw new Error('Standalone service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}

	/**
	 * Formatea bytes a formato legible
	 */
	private formatBytes(bytes: number): string {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	}
}
