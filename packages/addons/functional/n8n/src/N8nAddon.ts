/**
 * N8nAddon
 *
 * Add-on funcional de n8n que implementa IFunctionalAddon.
 * Instala y configura automáticamente el MCP de n8n para integración con workflows.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { N8nService, N8nConfig } from './N8nService';
import { MCPDetector, MCPPrompt, MCPInstaller } from '@autorun/core';

export class N8nAddon implements IFunctionalAddon {
	readonly id = 'n8n';
	readonly name = 'n8n Integration';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Automatización de workflows con n8n y MCP - Acceso a 525+ nodos de n8n';

	private service?: N8nService;
	private active = false;
	private config: N8nConfig = {};
	private context?: AutorunContext;
	private useMCP = false;

	async initialize(context: AutorunContext): Promise<void> {
		console.log(`🔍 [n8n Add-on] initialize() llamado`);
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.n8n || {};
		console.log(`🔍 [n8n Add-on] Configuración obtenida:`, JSON.stringify(addonConfig, null, 2));

		this.config = {
			n8nApiUrl: addonConfig.n8nApiUrl || process.env.N8N_API_URL,
			n8nApiKey: addonConfig.n8nApiKey || process.env.N8N_API_KEY,
			mode: addonConfig.mode || 'stdio',
			logLevel: addonConfig.logLevel || 'error',
			disableConsoleOutput: addonConfig.disableConsoleOutput !== false,
		};

		console.log(`🔍 [n8n Add-on] Configuración final:`, JSON.stringify(this.config, null, 2));

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
			const mcpInfo = await MCPDetector.detectMCPServer('n8n-mcp');

			// Si ya está configurado, usar MCP
			if (mcpInfo.configured) {
				console.log(
					'✅ n8n Add-on: MCP detectado y configurado. Usando MCP para mejor experiencia.',
				);
				this.useMCP = true;
				return;
			}

			// Si MCP está disponible pero no configurado, ofrecer instalación
			if (mcpInfo.available && !mcpInfo.configured) {
				const shouldInstall = await MCPPrompt.promptForMCP({
					serviceName: 'n8n-mcp',
					serviceDisplayName: 'n8n MCP',
					credentials: {
						n8nApiUrl: this.config.n8nApiUrl,
						n8nApiKey: this.config.n8nApiKey,
					},
				});

				if (shouldInstall) {
					const result = await MCPPrompt.installIfAccepted('n8n-mcp', {
						n8nApiUrl: this.config.n8nApiUrl,
						n8nApiKey: this.config.n8nApiKey,
					});

					if (result.installed) {
						this.useMCP = true;
						console.log('✅ n8n Add-on: MCP instalado y configurado exitosamente');
					}
				}
			} else {
				// Intentar instalar automáticamente si hay configuración
				if (this.config.n8nApiUrl || this.config.n8nApiKey) {
					console.log('🔧 n8n Add-on: Instalando MCP automáticamente...');
					const result = await MCPInstaller.installMCPServer('n8n-mcp', {
						n8nApiUrl: this.config.n8nApiUrl,
						n8nApiKey: this.config.n8nApiKey,
						mode: this.config.mode,
						logLevel: this.config.logLevel,
						disableConsoleOutput: this.config.disableConsoleOutput,
					});

					if (result.success) {
						this.useMCP = true;
						console.log(`✅ n8n Add-on: ${result.message}`);
					} else {
						console.warn(`⚠️ n8n Add-on: ${result.message}`);
					}
				}
			}
		} catch (error) {
			// Si hay error, continuar con implementación tradicional
			console.log('ℹ️  n8n Add-on: Continuando sin MCP');
		}
	}

	/**
	 * Configura el servicio de n8n
	 */
	private async setupService(): Promise<void> {
		console.log(`🔍 [n8n Add-on] setupService() llamado`);

		this.service = new N8nService(this.config);

		try {
			console.log(`🔍 [n8n Add-on] Inicializando servicio de n8n...`);
			await this.service.initialize();
			console.log('✅ [n8n Add-on] Servicio inicializado exitosamente');
		} catch (error: any) {
			console.warn(`⚠️ [n8n Add-on] Error al inicializar servicio: ${error.message}`);
			// No lanzar error, permitir que el add-on funcione sin conexión inicial
		}
	}

	async activate(): Promise<void> {
		console.log(`🔍 [n8n Add-on] activate() llamado`);

		// Si no hay servicio, configurarlo
		if (!this.service) {
			console.log(`🔍 [n8n Add-on] Configurando servicio...`);
			await this.setupService();
		}

		this.active = true;
		console.log(`✅ [n8n Add-on] Add-on activado`);
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 n8n Add-on: Desactivado');
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

		// Si se cambió la configuración de API, reinicializar servicio
		if (config.n8nApiUrl || config.n8nApiKey) {
			await this.setupService();
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Obtener workflows
			getWorkflows: async () => {
				if (!this.service) {
					throw new Error('n8n service no está inicializado');
				}
				return await this.service.getWorkflows();
			},

			// Ejecutar workflow
			executeWorkflow: async (workflowId: string, input?: Record<string, any>) => {
				if (!this.service) {
					throw new Error('n8n service no está inicializado');
				}
				return await this.service.executeWorkflow(workflowId, input);
			},

			// Verificar conexión
			verifyConnection: async () => {
				if (!this.service) {
					throw new Error('n8n service no está inicializado');
				}
				await this.service.initialize();
			},

			// Obtener configuración
			getConfig: () => {
				if (!this.service) {
					throw new Error('n8n service no está inicializado');
				}
				return this.service.getConfig();
			},
		};
	}
}



