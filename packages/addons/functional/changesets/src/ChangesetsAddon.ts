/**
 * ChangesetsAddon
 *
 * Add-on funcional de Changesets que implementa IFunctionalAddon.
 * Proporciona versionado semántico automático y generación de changelog.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import {
	ChangesetsService,
	ChangesetsConfig,
	ChangesetResult,
	VersionInfo,
} from './ChangesetsService';

export class ChangesetsAddon implements IFunctionalAddon {
	readonly id = 'changesets';
	readonly name = 'Changesets';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Versionado semántico y changelog automático';

	private service?: ChangesetsService;
	private active = false;
	private config: ChangesetsConfig = {
		enabled: true,
		autoVersion: true,
		autoRelease: false,
		commitChangesets: true,
		createGitHubRelease: false,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.changesets || {};
		this.config = {
			enabled: addonConfig.enabled !== false,
			autoVersion: addonConfig.autoVersion !== false,
			autoRelease: addonConfig.autoRelease === true,
			commitChangesets: addonConfig.commitChangesets !== false,
			createGitHubRelease: addonConfig.createGitHubRelease === true,
			releaseType: addonConfig.releaseType || 'auto',
			changelogPath: addonConfig.changelogPath || 'CHANGELOG.md',
			changesetsPath: addonConfig.changesetsPath || '.changeset',
			projectPath: process.cwd(),
		};

		// Inicializar servicio
		this.service = new ChangesetsService(this.config, this.config.projectPath);

		try {
			await this.service.initialize();
			console.log('✅ Changesets Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Changesets Add-on: Error al inicializar - ${error}`);
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new ChangesetsService(this.config, this.config.projectPath);
			await this.service.initialize();
		}

		this.active = true;
		console.log('✅ Changesets Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Changesets Add-on: Desactivado');
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
		const changesetsConfig: Partial<ChangesetsConfig> = {};

		if (config.enabled !== undefined) changesetsConfig.enabled = config.enabled;
		if (config.autoVersion !== undefined) changesetsConfig.autoVersion = config.autoVersion;
		if (config.autoRelease !== undefined) changesetsConfig.autoRelease = config.autoRelease;
		if (config.commitChangesets !== undefined)
			changesetsConfig.commitChangesets = config.commitChangesets;
		if (config.createGitHubRelease !== undefined)
			changesetsConfig.createGitHubRelease = config.createGitHubRelease;
		if (config.releaseType !== undefined) changesetsConfig.releaseType = config.releaseType;
		if (config.changelogPath !== undefined) changesetsConfig.changelogPath = config.changelogPath;
		if (config.changesetsPath !== undefined)
			changesetsConfig.changesetsPath = config.changesetsPath;

		this.config = { ...this.config, ...changesetsConfig };

		if (this.service) {
			this.service.updateConfig(changesetsConfig);
		} else {
			this.service = new ChangesetsService(this.config, this.config.projectPath);
		}
	}

	/**
	 * Hook llamado después de hacer commit
	 */
	async onAfterCommit(commitHash: string): Promise<void> {
		if (!this.active || !this.service || !this.config.autoVersion) {
			return;
		}

		// Verificar si hay changesets pendientes y versionar automáticamente
		try {
			const hasChangesets = await this.service.hasPendingChangesets();
			if (hasChangesets) {
				console.log('📦 Changesets: Changesets pendientes detectados, versionando...');
				const result = await this.service.version();

				if (result.success && result.version) {
					console.log(`✅ Changesets: Versión actualizada a ${result.version}`);
				}
			}
		} catch (error) {
			console.error('❌ Changesets: Error al versionar automáticamente:', error);
		}
	}

	/**
	 * Hook llamado antes de hacer deploy
	 */
	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Versionar antes de deploy si hay changesets pendientes
		try {
			const hasChangesets = await this.service.hasPendingChangesets();
			if (hasChangesets) {
				console.log('📦 Changesets: Versionando antes de deploy...');
				await this.service.version();
			}
		} catch (error) {
			console.error('❌ Changesets: Error al versionar antes de deploy:', error);
		}
	}

	/**
	 * Hook llamado después de hacer deploy
	 */
	async onAfterDeploy(url: string): Promise<void> {
		if (!this.active || !this.service || !this.config.autoRelease) {
			return;
		}

		// Release si autoRelease está habilitado, hacer release
		try {
			console.log('📦 Changesets: Ejecutando release después de deploy...');
			const result = await this.service.release();

			if (result.success) {
				console.log(`✅ Changesets: Release completado`);
				if (result.version) {
					console.log(`   📦 Versión: ${result.version}`);
				}
				if (result.gitHubReleaseCreated) {
					console.log(`   ✅ GitHub release creado`);
				}
			}
		} catch (error) {
			console.error('❌ Changesets: Error al hacer release:', error);
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Crear changeset
			createChangeset: async (summary: string, type: 'major' | 'minor' | 'patch' = 'patch') => {
				if (!this.service) {
					throw new Error('Changesets service no está inicializado');
				}
				return await this.service.createChangeset(summary, type);
			},

			// Versionar
			version: async () => {
				if (!this.service) {
					throw new Error('Changesets service no está inicializado');
				}
				return await this.service.version();
			},

			// Release
			release: async () => {
				if (!this.service) {
					throw new Error('Changesets service no está inicializado');
				}
				return await this.service.release();
			},

			// Obtener versión actual
			getCurrentVersion: async () => {
				if (!this.service) {
					throw new Error('Changesets service no está inicializado');
				}
				return await this.service.getCurrentVersion();
			},

			// Obtener información de versión
			getVersionInfo: async () => {
				if (!this.service) {
					throw new Error('Changesets service no está inicializado');
				}
				return await this.service.getVersionInfo();
			},

			// Verificar si hay changesets pendientes
			hasPendingChangesets: async () => {
				if (!this.service) {
					throw new Error('Changesets service no está inicializado');
				}
				return await this.service.hasPendingChangesets();
			},

			// Obtener configuración
			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},

			// Actualizar configuración
			updateConfig: (config: Partial<ChangesetsConfig>) => {
				if (!this.service) {
					throw new Error('Changesets service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}
