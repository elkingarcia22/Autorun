/**
 * PlaywrightAddon
 *
 * Add-on funcional de Playwright que implementa IFunctionalAddon.
 * Proporciona testing end-to-end (E2E).
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import {
	PlaywrightService,
	PlaywrightConfig,
	TestResult,
} from './PlaywrightService';

export class PlaywrightAddon implements IFunctionalAddon {
	readonly id = 'playwright';
	readonly name = 'Playwright';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Testing end-to-end (E2E)';

	private service?: PlaywrightService;
	private active = false;
	private config: PlaywrightConfig = {
		enabled: true,
		testDir: 'tests/e2e',
		outputDir: 'test-results',
		timeout: 30000,
		retries: 0,
		workers: 1,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.playwright || {};
		this.config = {
			enabled: addonConfig.enabled !== false,
			testDir: addonConfig.testDir || 'tests/e2e',
			outputDir: addonConfig.outputDir || 'test-results',
			timeout: addonConfig.timeout || 30000,
			retries: addonConfig.retries !== undefined ? addonConfig.retries : 0,
			workers: addonConfig.workers || 1,
			projects: addonConfig.projects || [],
			use: {
				baseURL: addonConfig.use?.baseURL || 'http://localhost:3000',
				viewport: addonConfig.use?.viewport || { width: 1280, height: 720 },
				screenshot: addonConfig.use?.screenshot || 'only-on-failure',
				video: addonConfig.use?.video || 'retain-on-failure',
				trace: addonConfig.use?.trace || 'on-first-retry',
			},
			projectPath: process.cwd(),
		};

		// Inicializar servicio
		this.service = new PlaywrightService(this.config, this.config.projectPath);

		try {
			await this.service.initialize();
			console.log('✅ Playwright Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Playwright Add-on: Error al inicializar - ${error}`);
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new PlaywrightService(this.config, this.config.projectPath);
			await this.service.initialize();
		}

		this.active = true;
		console.log('✅ Playwright Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Playwright Add-on: Desactivado');
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
		const playwrightConfig: Partial<PlaywrightConfig> = {};

		if (config.enabled !== undefined) playwrightConfig.enabled = config.enabled;
		if (config.testDir !== undefined) playwrightConfig.testDir = config.testDir;
		if (config.outputDir !== undefined)
			playwrightConfig.outputDir = config.outputDir;
		if (config.timeout !== undefined) playwrightConfig.timeout = config.timeout;
		if (config.retries !== undefined) playwrightConfig.retries = config.retries;
		if (config.workers !== undefined) playwrightConfig.workers = config.workers;
		if (config.projects !== undefined) playwrightConfig.projects = config.projects;
		if (config.use !== undefined) playwrightConfig.use = config.use;

		this.config = { ...this.config, ...playwrightConfig };

		if (this.service) {
			this.service.updateConfig(playwrightConfig);
		} else {
			this.service = new PlaywrightService(this.config, this.config.projectPath);
		}
	}

	/**
	 * Hook llamado antes de hacer deploy
	 */
	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Ejecutar tests antes de deploy
		try {
			console.log('🧪 Playwright: Ejecutando tests antes de deploy...');
			const result = await this.service.runTests();

			if (!result.success) {
				console.error('❌ Playwright: Tests fallaron, deploy cancelado');
				throw new Error('Tests E2E fallaron');
			}

			console.log('✅ Playwright: Todos los tests pasaron');
		} catch (error) {
			console.error('❌ Playwright: Error al ejecutar tests:', error);
			throw error;
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Ejecutar tests
			runTests: async (options?: {
				headed?: boolean;
				ui?: boolean;
				project?: string;
				workers?: number;
			}) => {
				if (!this.service) {
					throw new Error('Playwright service no está inicializado');
				}
				return await this.service.runTests(options);
			},

			// Generar reporte
			generateReport: async () => {
				if (!this.service) {
					throw new Error('Playwright service no está inicializado');
				}
				return await this.service.generateReport();
			},

			// Instalar navegadores
			installBrowsers: async () => {
				if (!this.service) {
					throw new Error('Playwright service no está inicializado');
				}
				return await this.service.installBrowsers();
			},

			// Obtener configuración
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},

			// Actualizar configuración
			updateConfig: (config: Partial<PlaywrightConfig>) => {
				if (!this.service) {
					throw new Error('Playwright service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}

