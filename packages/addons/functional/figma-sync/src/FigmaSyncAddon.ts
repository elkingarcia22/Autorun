/**
 * FigmaSyncAddon
 *
 * Add-on funcional de Figma Sync que implementa IFunctionalAddon.
 * Proporciona sincronización de tokens y componentes desde Figma.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { FigmaSyncService, FigmaSyncConfig, SyncResult, TokenComparison } from './FigmaSyncService';
import { MCPDetector, MCPPrompt } from '@autorun/core';

export class FigmaSyncAddon implements IFunctionalAddon {
	readonly id = 'figma-sync';
	readonly name = 'Figma Sync';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Sincronización de tokens y componentes desde Figma';

	private service?: FigmaSyncService;
	private active = false;
	private config: FigmaSyncConfig = {
		figmaTokensPath: '../tokens',
		projectTokensPath: 'packages/tokens/tokens.json',
		autoSync: false,
		backupBeforeSync: true,
		syncMode: 'selective',
		tokenMapping: {},
	};
	private context?: AutorunContext;
	private useMCP = false;
	private figmaTokensJsonPath?: string;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.['figma-sync'] || {};
		this.config = {
			figmaTokensPath: addonConfig.figmaTokensPath || '../tokens',
			projectTokensPath: addonConfig.projectTokensPath || 'packages/tokens/tokens.json',
			figmaTokensJsonPath: addonConfig.figmaTokensJsonPath, // Ruta explícita al JSON (opcional)
			autoSync: addonConfig.autoSync || false,
			backupBeforeSync: addonConfig.backupBeforeSync !== false,
			syncMode: addonConfig.syncMode || 'selective',
			tokenMapping: addonConfig.tokenMapping || {},
			accessToken: addonConfig.accessToken || process.env.FIGMA_ACCESS_TOKEN,
			fileKey: addonConfig.fileKey,
		};

		// Buscar JSON de tokens de Figma en el proyecto (si no está configurado explícitamente)
		if (!this.config.figmaTokensJsonPath) {
			await this.findFigmaTokensJson();
			if (this.figmaTokensJsonPath) {
				this.config.figmaTokensJsonPath = this.figmaTokensJsonPath;
			}
		}

		// Inicializar servicio
		this.service = new FigmaSyncService(this.config, process.cwd());

		try {
			await this.service.initialize();
			console.log('✅ Figma Sync Add-on: Inicializado correctamente');

			// Ofrecer integración MCP después de inicializar
			await this.offerMCPIntegration();
		} catch (error) {
			console.error(`❌ Figma Sync Add-on: Error al inicializar - ${error}`);
			// No lanzar error, permitir que el add-on funcione sin inicialización completa
		}
	}

	/**
	 * Busca el JSON de tokens de Figma en el proyecto
	 * Este archivo es necesario porque ni MCP ni la API pueden acceder directamente a las variables de Figma
	 */
	private async findFigmaTokensJson(): Promise<void> {
		const fs = await import('fs/promises');
		const path = await import('path');

		// Rutas comunes donde puede estar el JSON de tokens de Figma
		const possiblePaths = [
			'figma-tokens.json',
			'tokens/figma-tokens.json',
			'tokens/figma.json',
			'figma/variables.json',
			'design-tokens/figma-tokens.json',
			'.figma/tokens.json',
			'packages/tokens/figma-tokens.json',
		];

		for (const relativePath of possiblePaths) {
			const fullPath = path.resolve(process.cwd(), relativePath);
			try {
				await fs.access(fullPath);
				this.figmaTokensJsonPath = fullPath;
				console.log(`✅ Figma Sync: JSON de tokens encontrado en ${relativePath}`);
				console.log(
					`ℹ️  Este archivo permite que MCP y la API funcionen mejor con las variables de Figma`,
				);
				return;
			} catch {
				// Continuar buscando
			}
		}

		console.log(`⚠️  Figma Sync: No se encontró JSON de tokens de Figma en el proyecto`);
		console.log(
			`ℹ️  Para mejor funcionamiento con MCP, descarga el JSON usando el plugin de Figma Tokens`,
		);
		console.log(`ℹ️  Ver instrucciones en el README del add-on`);
	}

	/**
	 * Ofrece integración MCP al usuario
	 * Soporta múltiples MCPs: 'figma' y 'talk-to-figma'
	 */
	private async offerMCPIntegration(): Promise<void> {
		try {
			// Detectar MCP de Figma (puede haber múltiples)
			const figmaMCPs = ['figma', 'talk-to-figma'];
			let mcpConfigured = false;

			for (const mcpName of figmaMCPs) {
				try {
					const mcpInfo = await MCPDetector.detectMCPServer(mcpName);

					if (mcpInfo.configured) {
						console.log(
							`✅ Figma Sync: MCP '${mcpName}' detectado y configurado. Usando MCP para mejor experiencia.`,
						);
						this.useMCP = true;
						mcpConfigured = true;
						continue;
					}

					if (mcpInfo.available && !mcpInfo.configured) {
						const addonConfig = this.context?.config.autorun?.addons?.config?.['figma-sync'] || {};
						const accessToken = addonConfig.accessToken || process.env.FIGMA_ACCESS_TOKEN;

						if (accessToken) {
							const shouldInstall = await MCPPrompt.promptForMCP({
								serviceName: mcpName,
								serviceDisplayName: mcpName === 'figma' ? 'Figma' : 'Talk to Figma',
								credentials: {
									accessToken: accessToken,
									fileKey: addonConfig.fileKey,
									figmaTokensJsonPath: this.figmaTokensJsonPath,
								},
								additionalInfo: this.figmaTokensJsonPath
									? `✅ JSON de tokens encontrado en: ${this.figmaTokensJsonPath}\n   Esto mejorará significativamente el funcionamiento de MCP.`
									: `⚠️  No se encontró JSON de tokens de Figma.\n   Se recomienda descargarlo usando el plugin de Figma Tokens para mejor funcionamiento.\n   Ver instrucciones en el README del add-on.`,
							});

							if (shouldInstall) {
								const result = await MCPPrompt.installIfAccepted(mcpName, {
									accessToken: accessToken,
									fileKey: addonConfig.fileKey,
									figmaTokensJsonPath: this.figmaTokensJsonPath,
								});

								if (result.installed) {
									this.useMCP = true;
									mcpConfigured = true;
									console.log(
										`✅ Figma Sync: MCP '${mcpName}' instalado y configurado exitosamente`,
									);

									if (this.figmaTokensJsonPath) {
										console.log(`✅ Usando JSON de tokens en: ${this.figmaTokensJsonPath}`);
									}
								}
							}
						}
					}
				} catch (error) {
					// Continuar con el siguiente MCP
					continue;
				}
			}

			if (!mcpConfigured) {
				console.log('ℹ️  Figma Sync: Continuando con implementación tradicional');
				if (!this.figmaTokensJsonPath) {
					console.log(
						'⚠️  Importante: Para mejor funcionamiento, descarga el JSON de tokens usando el plugin de Figma Tokens',
					);
				}
			}
		} catch (error) {
			console.log('ℹ️  Figma Sync: Continuando con implementación tradicional');
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new FigmaSyncService(this.config, process.cwd());
			await this.service.initialize();
		}

		this.active = true;
		console.log('✅ Figma Sync Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Figma Sync Add-on: Desactivado');
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
		const figmaSyncConfig: Partial<FigmaSyncConfig> = {};

		if (config.figmaTokensPath) figmaSyncConfig.figmaTokensPath = config.figmaTokensPath;
		if (config.projectTokensPath) figmaSyncConfig.projectTokensPath = config.projectTokensPath;
		if (config.autoSync !== undefined) figmaSyncConfig.autoSync = config.autoSync;
		if (config.backupBeforeSync !== undefined)
			figmaSyncConfig.backupBeforeSync = config.backupBeforeSync;
		if (config.syncMode) figmaSyncConfig.syncMode = config.syncMode;
		if (config.tokenMapping) figmaSyncConfig.tokenMapping = config.tokenMapping;

		this.config = { ...this.config, ...figmaSyncConfig };

		if (this.service) {
			this.service.updateConfig(figmaSyncConfig);
		} else {
			this.service = new FigmaSyncService(this.config, process.cwd());
			await this.service.initialize();
		}
	}

	/**
	 * Hook llamado cuando un archivo cambia
	 */
	async onFileChange(filePath: string): Promise<void> {
		if (!this.active || !this.service || !this.config.autoSync) {
			return;
		}

		// Si cambia un archivo de tokens de Figma, sincronizar automáticamente
		if (filePath.includes('tokens') && (filePath.includes('figma') || filePath.includes('Figma'))) {
			try {
				console.log('🔄 Figma Sync: Detectado cambio en tokens de Figma, sincronizando...');
				await this.service.sync({ mode: 'selective' });
			} catch (error) {
				console.error('❌ Figma Sync: Error en auto-sync:', error);
			}
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Comparar tokens
			compare: async () => {
				if (!this.service) {
					throw new Error('Figma Sync service no está inicializado');
				}
				return await this.service.compare();
			},

			// Sincronizar tokens
			sync: async (options?: {
				mode?: 'full' | 'selective' | 'manual';
				updateDifferent?: boolean;
				addMissing?: boolean;
				removeExtra?: boolean;
			}) => {
				if (!this.service) {
					throw new Error('Figma Sync service no está inicializado');
				}
				const result = await this.service.sync(options);

				// Trackear sincronización en Clarity si está disponible
				if (this.context) {
					const clarityService = this.context.hub?.getService?.('clarity', 'trackEvent');
					if (clarityService) {
						clarityService('figma_sync', {
							tokensUpdated: result.tokensUpdated,
							tokensAdded: result.tokensAdded,
							tokensRemoved: result.tokensRemoved,
							timestamp: new Date().toISOString(),
						});
					}
				}

				return result;
			},

			// Obtener estado
			getStatus: () => {
				if (!this.service) {
					return {
						initialized: false,
						figmaTokensExists: false,
						projectTokensExists: false,
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
			updateConfig: (config: Partial<FigmaSyncConfig>) => {
				if (!this.service) {
					throw new Error('Figma Sync service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}
