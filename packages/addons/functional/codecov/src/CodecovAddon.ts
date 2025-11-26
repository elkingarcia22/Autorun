/**
 * CodecovAddon
 *
 * Add-on funcional de Codecov que implementa IFunctionalAddon.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { CodecovService, CodecovConfig, CoverageResult } from './CodecovService';

export class CodecovAddon implements IFunctionalAddon {
	readonly id = 'codecov';
	readonly name = 'Codecov';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Code coverage tracking';

	private service?: CodecovService;
	private active = false;
	private config: CodecovConfig = {
		enabled: true,
		coverageDir: 'coverage',
		failOnError: false,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;
		const addonConfig = context.config.autorun?.addons?.config?.codecov || {};
		this.config = {
			enabled: addonConfig.enabled !== false,
			token: addonConfig.token,
			coverageDir: addonConfig.coverageDir || 'coverage',
			flags: addonConfig.flags || [],
			failOnError: addonConfig.failOnError === true,
			projectPath: process.cwd(),
		};

		this.service = new CodecovService(this.config, this.config.projectPath);

		try {
			await this.service.initialize();
			console.log('✅ Codecov Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Codecov Add-on: Error al inicializar - ${error}`);
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new CodecovService(this.config, this.config.projectPath);
			await this.service.initialize();
		}
		this.active = true;
		console.log('✅ Codecov Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Codecov Add-on: Desactivado');
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
		const codecovConfig: Partial<CodecovConfig> = {};
		if (config.enabled !== undefined) codecovConfig.enabled = config.enabled;
		if (config.token !== undefined) codecovConfig.token = config.token;
		if (config.coverageDir !== undefined)
			codecovConfig.coverageDir = config.coverageDir;
		if (config.flags !== undefined) codecovConfig.flags = config.flags;
		if (config.failOnError !== undefined)
			codecovConfig.failOnError = config.failOnError;

		this.config = { ...this.config, ...codecovConfig };
		if (this.service) {
			this.service.updateConfig(codecovConfig);
		} else {
			this.service = new CodecovService(this.config, this.config.projectPath);
		}
	}

	async onAfterDeploy(url: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		try {
			console.log('📊 Codecov: Subiendo coverage después de deploy...');
			await this.service.uploadCoverage();
		} catch (error) {
			console.error('❌ Codecov: Error al subir coverage:', error);
		}
	}

	getServices() {
		return {
			uploadCoverage: async () => {
				if (!this.service) {
					throw new Error('Codecov service no está inicializado');
				}
				return await this.service.uploadCoverage();
			},
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},
			updateConfig: (config: Partial<CodecovConfig>) => {
				if (!this.service) {
					throw new Error('Codecov service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}

