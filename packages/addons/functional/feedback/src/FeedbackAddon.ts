/**
 * FeedbackAddon
 *
 * Add-on funcional de Feedback Automatizado que implementa IFunctionalAddon.
 * Proporciona sistema completo de recopilación de feedback con:
 * - Overlay de bienvenida
 * - Botón flotante de feedback
 * - Modal de feedback
 * - Sistema de mask/onboarding
 * - Tracking de sección automático
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { FeedbackService, FeedbackConfig } from './FeedbackService';

export class FeedbackAddon implements IFunctionalAddon {
	readonly id = 'feedback-automatizado';
	readonly name = 'Feedback Automatizado';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description =
		'Sistema completo de recopilación de feedback con bienvenida, botón flotante, modal y mask';

	private service?: FeedbackService;
	private active = false;
	private config: FeedbackConfig = {
		webhookUrl: '',
		enabled: true,
		showWelcome: true,
		showFeedbackButton: true,
		showSectionIndicator: true,
		enableOnboarding: false,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.['feedback-automatizado'] || {};
		this.config = {
			webhookUrl: addonConfig.webhookUrl || '',
			enabled: addonConfig.enabled !== false,
			showWelcome: addonConfig.showWelcome !== false,
			showFeedbackButton: addonConfig.showFeedbackButton !== false,
			showSectionIndicator: addonConfig.showSectionIndicator !== false,
			enableOnboarding: addonConfig.enableOnboarding === true,
			welcomeTitle: addonConfig.welcomeTitle || '¡Bienvenido!',
			welcomeSubtitle:
				addonConfig.welcomeSubtitle ||
				'Estás a punto de probar esta aplicación. Usa el botón de feedback (💬) para dejar tus comentarios.',
			welcomeFeatures: addonConfig.welcomeFeatures || [],
			feedbackButtonPosition: addonConfig.feedbackButtonPosition || 'bottom-right',
			feedbackButtonIcon: addonConfig.feedbackButtonIcon || '💬',
			// Por defecto genérico: solo "Inicio" y "Otra"
			// El usuario debe configurar sectionOptions según su proyecto
			sectionOptions: addonConfig.sectionOptions || ['Inicio', 'Otra'],
			autoDetectSection: addonConfig.autoDetectSection !== false,
			collectMetadata: addonConfig.collectMetadata !== false,
			persistLocally: addonConfig.persistLocally !== false,
		};

		// Inicializar servicio
		this.service = new FeedbackService(this.config);

		try {
			await this.service.initialize();
			// Hacer disponible globalmente para callbacks
			this.service.makeGlobal();
			console.log('✅ Feedback Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Feedback Add-on: Error al inicializar - ${error}`);
			// No lanzar error, permitir que el add-on funcione sin inicialización completa
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			// Intentar inicializar si no está inicializado
			this.service = new FeedbackService(this.config);
			await this.service.initialize();
			this.service.makeGlobal();
		}

		this.service.setEnabled(true);
		this.active = true;
		console.log('✅ Feedback Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		this.service?.setEnabled(false);
		console.log('🔌 Feedback Add-on: Desactivado');
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
		const feedbackConfig: Partial<FeedbackConfig> = {};

		if (config.webhookUrl) feedbackConfig.webhookUrl = config.webhookUrl;
		if (config.enabled !== undefined) feedbackConfig.enabled = config.enabled;
		if (config.showWelcome !== undefined) feedbackConfig.showWelcome = config.showWelcome;
		if (config.showFeedbackButton !== undefined)
			feedbackConfig.showFeedbackButton = config.showFeedbackButton;
		if (config.showSectionIndicator !== undefined)
			feedbackConfig.showSectionIndicator = config.showSectionIndicator;
		if (config.enableOnboarding !== undefined)
			feedbackConfig.enableOnboarding = config.enableOnboarding;
		if (config.welcomeTitle) feedbackConfig.welcomeTitle = config.welcomeTitle;
		if (config.welcomeSubtitle) feedbackConfig.welcomeSubtitle = config.welcomeSubtitle;
		if (config.welcomeFeatures) feedbackConfig.welcomeFeatures = config.welcomeFeatures;
		if (config.feedbackButtonPosition)
			feedbackConfig.feedbackButtonPosition = config.feedbackButtonPosition;
		if (config.feedbackButtonIcon) feedbackConfig.feedbackButtonIcon = config.feedbackButtonIcon;
		if (config.sectionOptions) feedbackConfig.sectionOptions = config.sectionOptions;
		if (config.autoDetectSection !== undefined)
			feedbackConfig.autoDetectSection = config.autoDetectSection;
		if (config.collectMetadata !== undefined)
			feedbackConfig.collectMetadata = config.collectMetadata;
		if (config.persistLocally !== undefined) feedbackConfig.persistLocally = config.persistLocally;

		this.config = { ...this.config, ...feedbackConfig };

		if (this.service) {
			this.service.updateConfig(feedbackConfig);
		} else {
			// Si no hay servicio, inicializar con la nueva configuración
			this.service = new FeedbackService(this.config);
			await this.service.initialize();
			this.service.makeGlobal();
		}
	}

	/**
	 * Hook llamado cuando un archivo cambia
	 */
	async onFileChange(filePath: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Log de cambios de archivos
		console.log(`📝 Feedback: Archivo cambiado - ${filePath}`);
	}

	/**
	 * Hook llamado después de hacer deploy
	 */
	async onAfterDeploy(url: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		console.log(`📝 Feedback: Deploy completado - ${url}`);
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Abrir modal de feedback
			openFeedbackModal: () => {
				if (!this.service) {
					throw new Error('Feedback service no está inicializado');
				}
				return this.service.openFeedbackModal();
			},

			// Cerrar modal de feedback
			closeFeedbackModal: () => {
				if (!this.service) {
					throw new Error('Feedback service no está inicializado');
				}
				return this.service.closeFeedbackModal();
			},

			// Actualizar sección actual
			updateCurrentSection: (sectionName: string) => {
				if (!this.service) {
					throw new Error('Feedback service no está inicializado');
				}
				return this.service.updateCurrentSection(sectionName);
			},

			// Obtener estado
			getStatus: () => {
				if (!this.service) {
					return {
						initialized: false,
						enabled: false,
						webhookUrl: '',
						currentSection: '',
						pendingFeedback: 0,
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
			updateConfig: (config: Partial<FeedbackConfig>) => {
				if (!this.service) {
					throw new Error('Feedback service no está inicializado');
				}
				return this.service.updateConfig(config);
			},

			// Habilitar/deshabilitar
			setEnabled: (enabled: boolean) => {
				if (!this.service) {
					throw new Error('Feedback service no está inicializado');
				}
				return this.service.setEnabled(enabled);
			},
		};
	}
}

