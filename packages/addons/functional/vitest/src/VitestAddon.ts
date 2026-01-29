/**
 * VitestAddon
 *
 * Add-on funcional de Vitest que implementa IFunctionalAddon.
 * Proporciona testing rápido con Vite.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { VitestService, VitestConfig, TestResult } from './VitestService';

export class VitestAddon implements IFunctionalAddon {
	readonly id = 'vitest';
	readonly name = 'Vitest';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Testing rápido con Vite';

	private service?: VitestService;
	private active = false;
	private config: VitestConfig = {
		enabled: true,
		testDir: 'src',
		coverage: false,
		watch: false,
		ui: false,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;
		const addonConfig = context.config.autorun?.addons?.config?.vitest || {};
		this.config = {
			enabled: addonConfig.enabled !== false,
			testDir: addonConfig.testDir || 'src',
			coverage: addonConfig.coverage === true,
			coverageDir: addonConfig.coverageDir || 'coverage',
			watch: addonConfig.watch === true,
			ui: addonConfig.ui === true,
			reporter: addonConfig.reporter || ['verbose'],
			projectPath: process.cwd(),
		};

		this.service = new VitestService(this.config, this.config.projectPath);

		try {
			await this.service.initialize();
			console.log('✅ Vitest Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Vitest Add-on: Error al inicializar - ${error}`);
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new VitestService(this.config, this.config.projectPath);
			await this.service.initialize();
		}
		this.active = true;
		console.log('✅ Vitest Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Vitest Add-on: Desactivado');
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
		const vitestConfig: Partial<VitestConfig> = {};
		if (config.enabled !== undefined) vitestConfig.enabled = config.enabled;
		if (config.testDir !== undefined) vitestConfig.testDir = config.testDir;
		if (config.coverage !== undefined) vitestConfig.coverage = config.coverage;
		if (config.watch !== undefined) vitestConfig.watch = config.watch;
		if (config.ui !== undefined) vitestConfig.ui = config.ui;

		this.config = { ...this.config, ...vitestConfig };
		if (this.service) {
			this.service.updateConfig(vitestConfig);
		} else {
			this.service = new VitestService(this.config, this.config.projectPath);
		}
	}

	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		try {
			console.log('⚡ Vitest: Ejecutando tests antes de deploy...');
			const result = await this.service.runTests({ coverage: this.config.coverage });

			if (!result.success) {
				console.error('❌ Vitest: Tests fallaron, deploy cancelado');
				throw new Error('Tests fallaron');
			}

			console.log('✅ Vitest: Todos los tests pasaron');
		} catch (error) {
			console.error('❌ Vitest: Error al ejecutar tests:', error);
			throw error;
		}
	}

	getServices() {
		return {
			runTests: async (options?: { watch?: boolean; ui?: boolean; coverage?: boolean }) => {
				if (!this.service) {
					throw new Error('Vitest service no está inicializado');
				}
				return await this.service.runTests(options);
			},
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},
			updateConfig: (config: Partial<VitestConfig>) => {
				if (!this.service) {
					throw new Error('Vitest service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}
