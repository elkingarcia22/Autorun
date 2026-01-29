/**
 * ClarityAddon
 *
 * Add-on funcional de Microsoft Clarity que implementa IFunctionalAddon.
 * Proporciona analytics, heatmaps y session recordings para la aplicación.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { ClarityService, ClarityConfig } from './ClarityService';
import { MCPDetector, MCPPrompt } from '@autorun/core';

export class ClarityAddon implements IFunctionalAddon {
	readonly id = 'clarity';
	readonly name = 'Microsoft Clarity Analytics';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Analytics, heatmaps y session recordings con Microsoft Clarity';

	private service?: ClarityService;
	private active = false;
	private config: ClarityConfig = {
		projectId: '',
	};
	private context?: AutorunContext;
	private useMCP = false;

	/**
	 * Ofrece integración MCP al usuario
	 */
	private async offerMCPIntegration(): Promise<void> {
		try {
			const mcpInfo = await MCPDetector.detectMCPServer('clarity');

			// Si ya está configurado, usar MCP
			if (mcpInfo.configured) {
				console.log(
					'✅ Clarity Add-on: MCP detectado y configurado. Usando MCP para mejor experiencia.',
				);
				this.useMCP = true;
				return;
			}

			// Si MCP está disponible pero no configurado, ofrecer instalación
			if (mcpInfo.available && !mcpInfo.configured) {
				const shouldInstall = await MCPPrompt.promptForMCP({
					serviceName: 'clarity',
					serviceDisplayName: 'Microsoft Clarity',
					credentials: {
						projectId: this.config.projectId,
					},
				});

				if (shouldInstall) {
					const result = await MCPPrompt.installIfAccepted('clarity', {
						projectId: this.config.projectId,
					});

					if (result.installed) {
						this.useMCP = true;
						console.log('✅ Clarity Add-on: MCP instalado y configurado exitosamente');
					}
				}
			}
		} catch (error) {
			// Si hay error, continuar con implementación tradicional
			console.log('ℹ️  Clarity Add-on: Continuando con implementación tradicional');
		}
	}

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.clarity || {};
		this.config = {
			projectId: addonConfig.projectId || '',
			enabled: addonConfig.enabled !== false,
			cookieConsent: addonConfig.cookieConsent || false,
			trackClicks: addonConfig.trackClicks !== false,
			trackScroll: addonConfig.trackScroll !== false,
			trackHeatmaps: addonConfig.trackHeatmaps !== false,
			trackRecordings: addonConfig.trackRecordings !== false,
			maskText: addonConfig.maskText || false,
			maskImages: addonConfig.maskImages || false,
			sampleRate: addonConfig.sampleRate || 1.0,
		};

		// Validar que hay projectId
		if (!this.config.projectId) {
			console.warn('⚠️  Clarity Add-on: No se proporcionó projectId. Clarity no se inicializará.');
			return;
		}

		// Inicializar servicio
		this.service = new ClarityService(this.config);

		try {
			await this.service.initialize();
			console.log('✅ Clarity Add-on: Inicializado correctamente');

			// Detectar y ofrecer MCP si está disponible
			await this.offerMCPIntegration();
		} catch (error) {
			console.error(`❌ Clarity Add-on: Error al inicializar - ${error}`);
			// No lanzar error, permitir que el add-on funcione sin inicialización completa
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			// Intentar inicializar si no está inicializado
			if (this.config.projectId) {
				this.service = new ClarityService(this.config);
				await this.service.initialize();
			} else {
				console.warn('⚠️  Clarity Add-on: No se puede activar sin projectId');
				return;
			}
		}

		this.service.setEnabled(true);
		this.active = true;
		console.log('✅ Clarity Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		this.service?.setEnabled(false);
		console.log('🔌 Clarity Add-on: Desactivado');
	}

	isActive(): boolean {
		return this.active;
	}

	getStatus(): 'active' | 'inactive' {
		return this.active ? 'active' : 'inactive';
	}

	destroy(): void {
		this.service?.destroy();
		this.active = false;
		this.service = undefined;
	}

	async configure(config: Record<string, any>): Promise<void> {
		const clarityConfig: Partial<ClarityConfig> = {};

		if (config.projectId) clarityConfig.projectId = config.projectId;
		if (config.enabled !== undefined) clarityConfig.enabled = config.enabled;
		if (config.cookieConsent !== undefined) clarityConfig.cookieConsent = config.cookieConsent;
		if (config.trackClicks !== undefined) clarityConfig.trackClicks = config.trackClicks;
		if (config.trackScroll !== undefined) clarityConfig.trackScroll = config.trackScroll;
		if (config.trackHeatmaps !== undefined) clarityConfig.trackHeatmaps = config.trackHeatmaps;
		if (config.trackRecordings !== undefined)
			clarityConfig.trackRecordings = config.trackRecordings;
		if (config.maskText !== undefined) clarityConfig.maskText = config.maskText;
		if (config.maskImages !== undefined) clarityConfig.maskImages = config.maskImages;
		if (config.sampleRate !== undefined) clarityConfig.sampleRate = config.sampleRate;

		this.config = { ...this.config, ...clarityConfig };

		if (this.service) {
			this.service.updateConfig(clarityConfig);
		} else if (this.config.projectId) {
			// Si no hay servicio pero ahora hay projectId, inicializar
			this.service = new ClarityService(this.config);
			await this.service.initialize();
		}
	}

	/**
	 * Hook llamado cuando un archivo cambia
	 */
	async onFileChange(filePath: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Trackear cambios de archivos en desarrollo
		if (process.env.NODE_ENV === 'development') {
			this.service.trackEvent('file_changed', {
				filePath,
				timestamp: new Date().toISOString(),
			});
		}
	}

	/**
	 * Hook llamado después de hacer deploy
	 */
	async onAfterDeploy(url: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Trackear deployments
		this.service.trackEvent('deployment', {
			url,
			timestamp: new Date().toISOString(),
		});
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Trackear evento personalizado
			trackEvent: (eventName: string, properties?: Record<string, any>) => {
				if (!this.service) {
					throw new Error('Clarity service no está inicializado');
				}
				return this.service.trackEvent(eventName, properties);
			},

			// Identificar usuario
			identify: (userId: string, properties?: Record<string, any>) => {
				if (!this.service) {
					throw new Error('Clarity service no está inicializado');
				}
				return this.service.identify(userId, properties);
			},

			// Obtener estado
			getStatus: () => {
				if (!this.service) {
					return {
						initialized: false,
						enabled: false,
						projectId: '',
						clarityLoaded: false,
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
			updateConfig: (config: Partial<ClarityConfig>) => {
				if (!this.service) {
					throw new Error('Clarity service no está inicializado');
				}
				return this.service.updateConfig(config);
			},

			// Habilitar/deshabilitar
			setEnabled: (enabled: boolean) => {
				if (!this.service) {
					throw new Error('Clarity service no está inicializado');
				}
				return this.service.setEnabled(enabled);
			},
		};
	}
}
