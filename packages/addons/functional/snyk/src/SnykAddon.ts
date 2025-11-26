/**
 * SnykAddon
 *
 * Add-on funcional de Snyk que implementa IFunctionalAddon.
 * Proporciona security scanning y detección de vulnerabilidades.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import {
	SnykService,
	SnykConfig,
	SnykResult,
	Vulnerability,
} from './SnykService';

export class SnykAddon implements IFunctionalAddon {
	readonly id = 'snyk';
	readonly name = 'Snyk';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Security scanning y vulnerabilidades';

	private service?: SnykService;
	private active = false;
	private config: SnykConfig = {
		enabled: true,
		severityThreshold: 'medium',
		failOnError: false,
		monitor: true,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.snyk || {};
		this.config = {
			enabled: addonConfig.enabled !== false,
			token: addonConfig.token,
			org: addonConfig.org,
			severityThreshold: addonConfig.severityThreshold || 'medium',
			failOnError: addonConfig.failOnError === true,
			monitor: addonConfig.monitor !== false,
			projectPath: process.cwd(),
		};

		// Inicializar servicio
		this.service = new SnykService(this.config, this.config.projectPath);

		try {
			await this.service.initialize();
			console.log('✅ Snyk Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Snyk Add-on: Error al inicializar - ${error}`);
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new SnykService(this.config, this.config.projectPath);
			await this.service.initialize();
		}

		this.active = true;
		console.log('✅ Snyk Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Snyk Add-on: Desactivado');
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
		const snykConfig: Partial<SnykConfig> = {};

		if (config.enabled !== undefined) snykConfig.enabled = config.enabled;
		if (config.token !== undefined) snykConfig.token = config.token;
		if (config.org !== undefined) snykConfig.org = config.org;
		if (config.severityThreshold !== undefined)
			snykConfig.severityThreshold = config.severityThreshold;
		if (config.failOnError !== undefined)
			snykConfig.failOnError = config.failOnError;
		if (config.monitor !== undefined) snykConfig.monitor = config.monitor;

		this.config = { ...this.config, ...snykConfig };

		if (this.service) {
			this.service.updateConfig(snykConfig);
		} else {
			this.service = new SnykService(this.config, this.config.projectPath);
		}
	}

	/**
	 * Hook llamado antes de hacer deploy
	 */
	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Escanear vulnerabilidades antes de deploy
		try {
			console.log('🔒 Snyk: Escaneando vulnerabilidades antes de deploy...');
			const result = await this.service.scan({
				severityThreshold: this.config.severityThreshold,
				failOnError: this.config.failOnError,
			});

			if (!result.success && this.config.failOnError) {
				console.error('❌ Snyk: Vulnerabilidades encontradas, deploy cancelado');
				throw new Error(`Snyk encontró ${result.vulnerabilitiesFound} vulnerabilidades`);
			}

			if (result.vulnerabilitiesFound && result.vulnerabilitiesFound > 0) {
				console.warn(`⚠️  Snyk: ${result.vulnerabilitiesFound} vulnerabilidades encontradas`);
				if (result.vulnerabilities) {
					result.vulnerabilities.forEach((vuln) => {
						console.warn(`   ${vuln.severity.toUpperCase()}: ${vuln.package} - ${vuln.title}`);
					});
				}
			} else {
				console.log('✅ Snyk: No se encontraron vulnerabilidades');
			}
		} catch (error) {
			console.error('❌ Snyk: Error al escanear vulnerabilidades:', error);
			if (this.config.failOnError) {
				throw error;
			}
		}
	}

	/**
	 * Hook llamado después de hacer deploy
	 */
	async onAfterDeploy(url: string): Promise<void> {
		if (!this.active || !this.service || !this.config.monitor) {
			return;
		}

		// Monitorear después de deploy
		try {
			console.log('🔒 Snyk: Monitoreando dependencias después de deploy...');
			await this.service.monitor();
		} catch (error) {
			console.error('❌ Snyk: Error al monitorear:', error);
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Escanear vulnerabilidades
			scan: async (options?: {
				severityThreshold?: 'low' | 'medium' | 'high' | 'critical';
				failOnError?: boolean;
			}) => {
				if (!this.service) {
					throw new Error('Snyk service no está inicializado');
				}
				return await this.service.scan(options);
			},

			// Monitorear dependencias
			monitor: async () => {
				if (!this.service) {
					throw new Error('Snyk service no está inicializado');
				}
				return await this.service.monitor();
			},

			// Obtener configuración
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},

			// Actualizar configuración
			updateConfig: (config: Partial<SnykConfig>) => {
				if (!this.service) {
					throw new Error('Snyk service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}

