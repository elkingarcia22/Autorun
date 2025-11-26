/**
 * ChromaticAddon
 *
 * Add-on funcional de Chromatic que implementa IFunctionalAddon.
 * Proporciona visual testing de componentes.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import {
	ChromaticService,
	ChromaticConfig,
	ChromaticResult,
} from './ChromaticService';

export class ChromaticAddon implements IFunctionalAddon {
	readonly id = 'chromatic';
	readonly name = 'Chromatic';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Visual testing de componentes';

	private service?: ChromaticService;
	private active = false;
	private config: ChromaticConfig = {
		enabled: true,
		buildScriptName: 'build-storybook',
		storybookBuildDir: 'storybook-static',
		onlyChanged: false,
		exitZeroOnChanges: false,
		autoAcceptChanges: false,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.chromatic || {};
		this.config = {
			enabled: addonConfig.enabled !== false,
			token: addonConfig.token,
			projectToken: addonConfig.projectToken,
			buildScriptName: addonConfig.buildScriptName || 'build-storybook',
			storybookBuildDir: addonConfig.storybookBuildDir || 'storybook-static',
			onlyChanged: addonConfig.onlyChanged === true,
			exitZeroOnChanges: addonConfig.exitZeroOnChanges === true,
			exitOnceUploaded: addonConfig.exitOnceUploaded === true,
			ignoreLastBuildOnBranch: addonConfig.ignoreLastBuildOnBranch,
			autoAcceptChanges: addonConfig.autoAcceptChanges === true,
			projectPath: process.cwd(),
		};

		// Inicializar servicio
		this.service = new ChromaticService(this.config, this.config.projectPath);

		try {
			await this.service.initialize();
			console.log('✅ Chromatic Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Chromatic Add-on: Error al inicializar - ${error}`);
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new ChromaticService(this.config, this.config.projectPath);
			await this.service.initialize();
		}

		this.active = true;
		console.log('✅ Chromatic Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Chromatic Add-on: Desactivado');
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
		const chromaticConfig: Partial<ChromaticConfig> = {};

		if (config.enabled !== undefined) chromaticConfig.enabled = config.enabled;
		if (config.token !== undefined) chromaticConfig.token = config.token;
		if (config.projectToken !== undefined)
			chromaticConfig.projectToken = config.projectToken;
		if (config.buildScriptName !== undefined)
			chromaticConfig.buildScriptName = config.buildScriptName;
		if (config.storybookBuildDir !== undefined)
			chromaticConfig.storybookBuildDir = config.storybookBuildDir;
		if (config.onlyChanged !== undefined)
			chromaticConfig.onlyChanged = config.onlyChanged;
		if (config.exitZeroOnChanges !== undefined)
			chromaticConfig.exitZeroOnChanges = config.exitZeroOnChanges;
		if (config.exitOnceUploaded !== undefined)
			chromaticConfig.exitOnceUploaded = config.exitOnceUploaded;
		if (config.ignoreLastBuildOnBranch !== undefined)
			chromaticConfig.ignoreLastBuildOnBranch = config.ignoreLastBuildOnBranch;
		if (config.autoAcceptChanges !== undefined)
			chromaticConfig.autoAcceptChanges = config.autoAcceptChanges;

		this.config = { ...this.config, ...chromaticConfig };

		if (this.service) {
			this.service.updateConfig(chromaticConfig);
		} else {
			this.service = new ChromaticService(this.config, this.config.projectPath);
		}
	}

	/**
	 * Hook llamado antes de hacer deploy
	 */
	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Ejecutar visual testing antes de deploy
		try {
			console.log('🎨 Chromatic: Ejecutando visual testing antes de deploy...');
			const result = await this.service.run();

			if (result.success) {
				console.log('✅ Chromatic: Visual testing completado');
				if (result.buildUrl) {
					console.log(`   📊 Build URL: ${result.buildUrl}`);
				}
			} else if (result.changesDetected) {
				console.warn('⚠️  Chromatic: Cambios visuales detectados');
				if (result.buildUrl) {
					console.log(`   📊 Revisar cambios en: ${result.buildUrl}`);
				}
			} else {
				console.error('❌ Chromatic: Error en visual testing:', result.error);
			}
		} catch (error) {
			console.error('❌ Chromatic: Error al ejecutar visual testing:', error);
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Ejecutar visual testing
			run: async (options?: {
				onlyChanged?: boolean;
				exitZeroOnChanges?: boolean;
				autoAcceptChanges?: boolean;
			}) => {
				if (!this.service) {
					throw new Error('Chromatic service no está inicializado');
				}
				return await this.service.run(options);
			},

			// Obtener configuración
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},

			// Actualizar configuración
			updateConfig: (config: Partial<ChromaticConfig>) => {
				if (!this.service) {
					throw new Error('Chromatic service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}

