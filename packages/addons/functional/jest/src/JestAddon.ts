/**
 * JestAddon
 *
 * Add-on funcional de Jest que implementa IFunctionalAddon.
 * Proporciona testing unitario con Jest.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { JestService, JestConfig, JestResult } from './JestService';

export class JestAddon implements IFunctionalAddon {
	readonly id = 'jest';
	readonly name = 'Jest Testing';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Testing unitario con Jest';

	private service?: JestService;
	private active = false;
	private config: JestConfig = {
		testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
		testEnvironment: 'node',
		coverage: false,
		coverageDirectory: 'coverage',
		verbose: true,
		watch: false,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.jest || {};
		this.config = {
			testMatch: addonConfig.testMatch || [
				'**/__tests__/**/*.[jt]s?(x)',
				'**/?(*.)+(spec|test).[jt]s?(x)',
			],
			testEnvironment: addonConfig.testEnvironment || 'node',
			coverage: addonConfig.coverage || false,
			coverageDirectory: addonConfig.coverageDirectory || 'coverage',
			coverageThreshold: addonConfig.coverageThreshold,
			watch: addonConfig.watch || false,
			verbose: addonConfig.verbose !== false,
			bail: addonConfig.bail || false,
			maxWorkers: addonConfig.maxWorkers,
			setupFilesAfterEnv: addonConfig.setupFilesAfterEnv,
			moduleNameMapper: addonConfig.moduleNameMapper,
			transform: addonConfig.transform,
			collectCoverageFrom: addonConfig.collectCoverageFrom,
			testTimeout: addonConfig.testTimeout || 5000,
		};

		// Inicializar servicio
		this.service = new JestService(this.config, process.cwd());

		try {
			await this.service.initialize();
			console.log('✅ Jest Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Jest Add-on: Error al inicializar - ${error}`);
			// No lanzar error, permitir que el add-on funcione sin inicialización completa
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new JestService(this.config, process.cwd());
			await this.service.initialize();
		}

		this.active = true;
		console.log('✅ Jest Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		this.service?.stop();
		console.log('🔌 Jest Add-on: Desactivado');
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
		const jestConfig: Partial<JestConfig> = {};

		if (config.testMatch) jestConfig.testMatch = config.testMatch;
		if (config.testEnvironment) jestConfig.testEnvironment = config.testEnvironment;
		if (config.coverage !== undefined) jestConfig.coverage = config.coverage;
		if (config.coverageDirectory) jestConfig.coverageDirectory = config.coverageDirectory;
		if (config.coverageThreshold) jestConfig.coverageThreshold = config.coverageThreshold;
		if (config.watch !== undefined) jestConfig.watch = config.watch;
		if (config.verbose !== undefined) jestConfig.verbose = config.verbose;
		if (config.bail !== undefined) jestConfig.bail = config.bail;
		if (config.maxWorkers !== undefined) jestConfig.maxWorkers = config.maxWorkers;
		if (config.setupFilesAfterEnv) jestConfig.setupFilesAfterEnv = config.setupFilesAfterEnv;
		if (config.moduleNameMapper) jestConfig.moduleNameMapper = config.moduleNameMapper;
		if (config.transform) jestConfig.transform = config.transform;
		if (config.collectCoverageFrom) jestConfig.collectCoverageFrom = config.collectCoverageFrom;
		if (config.testTimeout !== undefined) jestConfig.testTimeout = config.testTimeout;

		this.config = { ...this.config, ...jestConfig };

		if (this.service) {
			this.service.updateConfig(jestConfig);
		} else {
			this.service = new JestService(this.config, process.cwd());
			await this.service.initialize();
		}
	}

	/**
	 * Hook llamado cuando se ejecutan tests
	 */
	async onTestRun(results: any): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Trackear resultados en Clarity si está disponible
		if (this.context) {
			const clarityService = this.context.hub?.getService?.('clarity', 'trackEvent');
			if (clarityService) {
				clarityService('jest_test_run', {
					passed: results.numPassedTests,
					failed: results.numFailedTests,
					total: results.numTotalTests,
					success: results.success,
					timestamp: new Date().toISOString(),
				});
			}
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Ejecutar tests
			run: async (options?: Partial<JestConfig>) => {
				if (!this.service) {
					throw new Error('Jest service no está inicializado');
				}
				const result = await this.service.run(options);
				await this.onTestRun(result);
				return result;
			},

			// Ejecutar test específico
			runTest: async (testPath: string, options?: Partial<JestConfig>) => {
				if (!this.service) {
					throw new Error('Jest service no está inicializado');
				}
				const result = await this.service.runTest(testPath, options);
				await this.onTestRun(result);
				return result;
			},

			// Modo watch
			watch: async () => {
				if (!this.service) {
					throw new Error('Jest service no está inicializado');
				}
				return await this.service.watch();
			},

			// Detener watch
			stop: () => {
				if (!this.service) {
					throw new Error('Jest service no está inicializado');
				}
				return this.service.stop();
			},

			// Obtener estado
			getStatus: () => {
				if (!this.service) {
					return {
						initialized: false,
						jestInstalled: false,
						watching: false,
						coverageEnabled: false,
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
			updateConfig: (config: Partial<JestConfig>) => {
				if (!this.service) {
					throw new Error('Jest service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}
