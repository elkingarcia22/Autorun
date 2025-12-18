/**
 * GoogleSheetsAddon
 *
 * Add-on funcional de Google Sheets que implementa IFunctionalAddon.
 * Instala y configura automáticamente el MCP de Google Sheets para crear y gestionar hojas de cálculo.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { GoogleSheetsService, GoogleSheetsConfig } from './GoogleSheetsService';
import { MCPDetector, MCPPrompt, MCPInstaller } from '@autorun/core';

export class GoogleSheetsAddon implements IFunctionalAddon {
	readonly id = 'google-sheets';
	readonly name = 'Google Sheets Integration';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description =
		'Creación y gestión de hojas de cálculo de Google Sheets con MCP - API gratuita con 300 requests/min';

	private service?: GoogleSheetsService;
	private active = false;
	private config: GoogleSheetsConfig = {};
	private context?: AutorunContext;
	private useMCP = false;

	async initialize(context: AutorunContext): Promise<void> {
		console.log(`🔍 [Google Sheets Add-on] initialize() llamado`);
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.['google-sheets'] || {};
		console.log(
			`🔍 [Google Sheets Add-on] Configuración obtenida:`,
			JSON.stringify(addonConfig, null, 2),
		);

		this.config = {
			googleProjectId:
				addonConfig.googleProjectId ||
				process.env.GOOGLE_PROJECT_ID ||
				process.env.GOOGLE_CLOUD_PROJECT,
			googleApplicationCredentials:
				addonConfig.googleApplicationCredentials || process.env.GOOGLE_APPLICATION_CREDENTIALS,
			googleServiceAccountKey:
				addonConfig.googleServiceAccountKey || process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
			googlePrivateKey: addonConfig.googlePrivateKey || process.env.GOOGLE_PRIVATE_KEY,
			googleClientEmail: addonConfig.googleClientEmail || process.env.GOOGLE_CLIENT_EMAIL,
		};

		console.log(
			`🔍 [Google Sheets Add-on] Configuración final:`,
			JSON.stringify(this.config, null, 2),
		);

		// Inicializar servicio
		await this.setupService();

		// Detectar y ofrecer MCP si está disponible
		await this.offerMCPIntegration();
	}

	/**
	 * Ofrece integración MCP al usuario
	 */
	private async offerMCPIntegration(): Promise<void> {
		try {
			const mcpInfo = await MCPDetector.detectMCPServer('google-sheets');

			// Si ya está configurado, usar MCP
			if (mcpInfo.configured) {
				console.log(
					'✅ Google Sheets Add-on: MCP detectado y configurado. Usando MCP para mejor experiencia.',
				);
				this.useMCP = true;
				return;
			}

			// Si MCP está disponible pero no configurado, ofrecer instalación
			if (mcpInfo.available && !mcpInfo.configured) {
				const shouldInstall = await MCPPrompt.promptForMCP({
					serviceName: 'google-sheets',
					serviceDisplayName: 'Google Sheets MCP',
					credentials: {
						googleProjectId: this.config.googleProjectId,
						googleApplicationCredentials: this.config.googleApplicationCredentials,
						googleServiceAccountKey: this.config.googleServiceAccountKey,
						googlePrivateKey: this.config.googlePrivateKey,
						googleClientEmail: this.config.googleClientEmail,
					},
				});

				if (shouldInstall) {
					const result = await MCPPrompt.installIfAccepted('google-sheets', {
						googleProjectId: this.config.googleProjectId,
						googleApplicationCredentials: this.config.googleApplicationCredentials,
						googleServiceAccountKey: this.config.googleServiceAccountKey,
						googlePrivateKey: this.config.googlePrivateKey,
						googleClientEmail: this.config.googleClientEmail,
					});

					if (result.installed) {
						this.useMCP = true;
						console.log('✅ Google Sheets Add-on: MCP instalado y configurado exitosamente');
					}
				}
			} else {
				// Intentar instalar automáticamente si hay configuración
				if (
					this.config.googleProjectId ||
					this.config.googleApplicationCredentials ||
					this.config.googleServiceAccountKey ||
					this.config.googlePrivateKey
				) {
					console.log('🔧 Google Sheets Add-on: Instalando MCP automáticamente...');
					const result = await MCPInstaller.installMCPServer('google-sheets', {
						googleProjectId: this.config.googleProjectId,
						googleApplicationCredentials: this.config.googleApplicationCredentials,
						googleServiceAccountKey: this.config.googleServiceAccountKey,
						googlePrivateKey: this.config.googlePrivateKey,
						googleClientEmail: this.config.googleClientEmail,
					});

					if (result.success) {
						this.useMCP = true;
						console.log(`✅ Google Sheets Add-on: ${result.message}`);
					} else {
						console.warn(`⚠️ Google Sheets Add-on: ${result.message}`);
					}
				}
			}
		} catch (error) {
			// Si hay error, continuar con implementación tradicional
			console.log('ℹ️  Google Sheets Add-on: Continuando sin MCP');
		}
	}

	/**
	 * Configura el servicio de Google Sheets
	 */
	private async setupService(): Promise<void> {
		console.log(`🔍 [Google Sheets Add-on] setupService() llamado`);

		this.service = new GoogleSheetsService(this.config);

		try {
			console.log(`🔍 [Google Sheets Add-on] Inicializando servicio de Google Sheets...`);
			await this.service.initialize();
			console.log('✅ [Google Sheets Add-on] Servicio inicializado exitosamente');
		} catch (error: any) {
			console.warn(`⚠️ [Google Sheets Add-on] Error al inicializar servicio: ${error.message}`);
			// No lanzar error, permitir que el add-on funcione sin conexión inicial
		}
	}

	async activate(): Promise<void> {
		console.log(`🔍 [Google Sheets Add-on] activate() llamado`);

		// Si no hay servicio, configurarlo
		if (!this.service) {
			console.log(`🔍 [Google Sheets Add-on] Configurando servicio...`);
			await this.setupService();
		}

		this.active = true;
		console.log(`✅ [Google Sheets Add-on] Add-on activado`);
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Google Sheets Add-on: Desactivado');
	}

	isActive(): boolean {
		return this.active;
	}

	getStatus(): 'active' | 'inactive' {
		return this.active ? 'active' : 'inactive';
	}

	destroy(): void {
		this.active = false;
	}

	async configure(config: Record<string, any>): Promise<void> {
		this.config = { ...this.config, ...config };

		// Si se cambió la configuración, reinicializar servicio
		if (
			config.googleProjectId ||
			config.googleApplicationCredentials ||
			config.googleServiceAccountKey ||
			config.googlePrivateKey
		) {
			await this.setupService();
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Crear hoja de cálculo
			createSpreadsheet: async (
				title: string,
				sheets?: Array<{ name: string; headers?: string[] }>,
			) => {
				if (!this.service) {
					throw new Error('Google Sheets service no está inicializado');
				}
				return await this.service.createSpreadsheet(title, sheets);
			},

			// Leer datos
			readRange: async (spreadsheetId: string, range: string) => {
				if (!this.service) {
					throw new Error('Google Sheets service no está inicializado');
				}
				return await this.service.readRange(spreadsheetId, range);
			},

			// Escribir datos
			writeRange: async (spreadsheetId: string, range: string, values: any[][]) => {
				if (!this.service) {
					throw new Error('Google Sheets service no está inicializado');
				}
				return await this.service.writeRange(spreadsheetId, range, values);
			},

			// Formatear celdas
			formatCells: async (spreadsheetId: string, range: string, format: any) => {
				if (!this.service) {
					throw new Error('Google Sheets service no está inicializado');
				}
				return await this.service.formatCells(spreadsheetId, range, format);
			},

			// Verificar conexión
			verifyConnection: async () => {
				if (!this.service) {
					throw new Error('Google Sheets service no está inicializado');
				}
				await this.service.initialize();
			},

			// Obtener configuración
			getConfig: () => {
				if (!this.service) {
					throw new Error('Google Sheets service no está inicializado');
				}
				return this.service.getConfig();
			},
		};
	}
}
