/**
 * FeedbackService
 *
 * Servicio que maneja todas las operaciones del sistema de feedback automatizado:
 * - Overlay de bienvenida
 * - Botón flotante de feedback
 * - Modal de feedback
 * - Sistema de mask/onboarding
 * - Tracking de sección actual
 * - Envío de feedback a webhook
 */

export interface FeedbackConfig {
	webhookUrl?: string;
	enabled?: boolean;
	showWelcome?: boolean;
	showFeedbackButton?: boolean;
	showSectionIndicator?: boolean;
	enableOnboarding?: boolean;
	welcomeTitle?: string;
	welcomeSubtitle?: string;
	welcomeFeatures?: string[];
	feedbackButtonPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
	feedbackButtonIcon?: string;
	sectionOptions?: string[];
	autoDetectSection?: boolean;
	collectMetadata?: boolean;
	persistLocally?: boolean;
	storybookUrl?: string; // URL base del Storybook para cargar componentes
	useStorybookComponents?: boolean; // Si debe intentar usar componentes del Storybook
}

export interface FeedbackData {
	user?: string;
	section: string;
	comment: string;
	timestamp: string;
	url: string;
	userAgent?: string;
	screenResolution?: string;
	viewport?: string;
	referrer?: string;
	sessionId?: string;
}

export class FeedbackService {
	private config: FeedbackConfig;
	private initialized = false;
	private currentSection = 'Inicio';
	private currentUser = '';
	private feedbackQueue: FeedbackData[] = [];
	private welcomeOverlay?: HTMLElement;
	private feedbackButton?: HTMLElement;
	private feedbackModal?: HTMLElement;
	private sectionIndicator?: HTMLElement;
	private onboardingOverlay?: HTMLElement;
	private storybookComponentsLoaded = false; // Flag para saber si los componentes del Storybook están cargados

	constructor(config: FeedbackConfig) {
		this.config = {
			enabled: true,
			showWelcome: true,
			showFeedbackButton: true,
			showSectionIndicator: true,
			enableOnboarding: false,
			welcomeTitle: '¡Bienvenido!',
			welcomeSubtitle:
				'Estás a punto de probar esta aplicación. Usa el botón de feedback (💬) para dejar tus comentarios.',
			welcomeFeatures: [],
			feedbackButtonPosition: 'bottom-right',
			feedbackButtonIcon: '💬',
			sectionOptions: ['Inicio', 'Otra'],
			autoDetectSection: true,
			collectMetadata: true,
			persistLocally: true,
			...config,
		};

		// Si hay sectionOptions configuradas, usar la primera como sección inicial
		if (this.config.sectionOptions && this.config.sectionOptions.length > 0) {
			this.currentSection = this.config.sectionOptions[0];
		}
	}

	/**
	 * Inicializa el servicio de feedback
	 */
	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('📝 Feedback: Deshabilitado por configuración');
			return;
		}

		if (this.initialized) {
			console.warn('⚠️  Feedback ya está inicializado');
			return;
		}

		// Verificar si estamos en un entorno de navegador
		if (typeof window === 'undefined' || typeof document === 'undefined') {
			console.warn('⚠️  Feedback solo puede inicializarse en el navegador');
			return;
		}

		// Generar ID único para el usuario
		this.currentUser = `Usuario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

		// Si hay storybookUrl configurado, cargar componentes desde Storybook
		if (this.config.storybookUrl && this.config.useStorybookComponents) {
			await this.loadComponentsFromStorybook();
		}

		// Verificar si los componentes están disponibles (del Storybook o locales)
		if (typeof window !== 'undefined') {
			this.storybookComponentsLoaded = !!(
				(window as any).AUTORUN?.Welcome?.create ||
				(window as any).AUTORUN?.Button?.create ||
				(window as any).AUTORUN?.Alert?.create ||
				(window as any).AUTORUN?.Mask?.create ||
				(window as any).AUTORUN?.ButtonFeedback?.create ||
				(window as any).createWelcome ||
				(window as any).createButton ||
				(window as any).createAlert ||
				(window as any).createMask ||
				(window as any).createButtonFeedback
			);
		}

		// Cargar estilos
		this.injectStyles();

		// Inicializar componentes (usarán Storybook si están cargados, sino los actuales)
		if (this.config.showWelcome) {
			await this.createWelcomeOverlay();
		}

		if (this.config.showFeedbackButton) {
			await this.createFeedbackButton();
		}

		if (this.config.showSectionIndicator) {
			this.createSectionIndicator();
		}

		await this.createFeedbackModal();

		if (this.config.enableOnboarding) {
			await this.createOnboardingSystem();
		}

		// Configurar tracking de sección
		if (this.config.autoDetectSection) {
			this.setupSectionTracking();
		}

		// Cargar feedback pendiente del localStorage
		if (this.config.persistLocally) {
			this.loadPendingFeedback();
		}

		this.initialized = true;
		console.log('✅ Feedback Service: Inicializado correctamente');
	}

	/**
	 * Inyecta los estilos CSS necesarios
	 */
	private injectStyles(): void {
		if (typeof document === 'undefined') return;

		const styleId = 'autorun-feedback-styles';
		if (document.getElementById(styleId)) {
			return; // Ya están inyectados
		}

		const style = document.createElement('style');
		style.id = styleId;
		style.textContent = this.getStyles();
		document.head.appendChild(style);
	}

	/**
	 * Retorna los estilos CSS del sistema de feedback
	 */
	private getStyles(): string {
		return `
			/* ===== SISTEMA DE FEEDBACK AUTOMATIZADO ===== */
			
			/* Overlay de bienvenida */
			.autorun-feedback-welcome-overlay {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5);
				backdrop-filter: blur(10px);
				z-index: 10000;
				display: flex;
				align-items: center;
				justify-content: center;
				font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
			}
			
			.autorun-feedback-welcome-container {
				background: white;
				border-radius: 20px;
				padding: 40px;
				max-width: 600px;
				width: 90%;
				box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
				text-align: center;
				animation: slideInUp 0.6s ease-out;
			}
			
			@keyframes slideInUp {
				from {
					opacity: 0;
					transform: translateY(30px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}
			
			.autorun-feedback-welcome-title {
				font-size: 28px;
				font-weight: 700;
				color: #1f2937;
				margin-bottom: 16px;
			}
			
			.autorun-feedback-welcome-subtitle {
				font-size: 18px;
				color: #6b7280;
				margin-bottom: 32px;
				line-height: 1.6;
			}
			
			.autorun-feedback-start-button {
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				color: white;
				border: none;
				padding: 16px 32px;
				border-radius: 12px;
				font-size: 16px;
				font-weight: 600;
				cursor: pointer;
				transition: all 0.3s ease;
				margin-top: 24px;
			}
			
			.autorun-feedback-start-button:hover {
				transform: translateY(-2px);
				box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
			}
			
			/* Botón flotante de feedback */
			.autorun-feedback-trigger {
				position: fixed;
				bottom: 20px;
				right: 20px;
				width: 60px;
				height: 60px;
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				border: none;
				border-radius: 50%;
				color: white;
				font-size: 24px;
				cursor: pointer;
				box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
				z-index: 9998;
				transition: all 0.3s ease;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
			.autorun-feedback-trigger:hover {
				transform: scale(1.1);
				box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
			}
			
			.autorun-feedback-trigger.bottom-left {
				right: auto;
				left: 20px;
			}
			
			.autorun-feedback-trigger.top-right {
				bottom: auto;
				top: 20px;
			}
			
			.autorun-feedback-trigger.top-left {
				bottom: auto;
				top: 20px;
				right: auto;
				left: 20px;
			}
			
			/* Indicador de sección */
			.autorun-feedback-section-indicator {
				position: fixed;
				top: 20px;
				left: 50%;
				transform: translateX(-50%);
				background: rgba(102, 126, 234, 0.9);
				color: white;
				padding: 8px 16px;
				border-radius: 20px;
				font-size: 14px;
				font-weight: 600;
				z-index: 9997;
				backdrop-filter: blur(10px);
			}
			
			/* Modal de feedback */
			.autorun-feedback-modal {
				position: fixed;
				bottom: 90px;
				right: 20px;
				width: 400px;
				max-width: 90vw;
				background: white;
				border-radius: 12px;
				box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
				z-index: 1001;
				opacity: 0;
				visibility: hidden;
				transform: translateY(20px) scale(0.95);
				transition: all 0.3s ease;
				overflow-x: hidden;
				box-sizing: border-box;
			}
			
			.autorun-feedback-modal.show {
				opacity: 1;
				visibility: visible;
				transform: translateY(0) scale(1);
			}
			
			.autorun-feedback-modal-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20px;
				border-bottom: 1px solid #e5e7eb;
			}
			
			.autorun-feedback-modal-header h3 {
				margin: 0;
				color: #1f2937;
				font-size: 18px;
			}
			
			.autorun-feedback-modal-close {
				background: none;
				border: none;
				font-size: 24px;
				cursor: pointer;
				color: #6b7280;
			}
			
			.autorun-feedback-modal-body {
				padding: 20px;
			}
			
			.autorun-feedback-form-group {
				margin-bottom: 20px;
			}
			
			.autorun-feedback-form-group label {
				display: block;
				margin-bottom: 8px;
				color: #374151;
				font-weight: 500;
			}
			
			.autorun-feedback-form-group select,
			.autorun-feedback-form-group textarea {
				width: 100%;
				padding: 12px;
				border: 1px solid #e5e7eb;
				border-radius: 8px;
				font-size: 14px;
				font-family: inherit;
				box-sizing: border-box;
			}
			
			.autorun-feedback-form-group textarea {
				height: 100px;
				resize: vertical;
			}
			
			.autorun-feedback-form-actions {
				display: flex;
				gap: 12px;
				justify-content: flex-end;
			}
			
			.autorun-feedback-cancel,
			.autorun-feedback-submit {
				padding: 10px 20px;
				border: none;
				border-radius: 8px;
				cursor: pointer;
				font-size: 14px;
				font-weight: 500;
			}
			
			.autorun-feedback-cancel {
				background: #f3f4f6;
				color: #374151;
			}
			
			.autorun-feedback-submit {
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				color: white;
			}
			
			.autorun-feedback-submit:hover {
				opacity: 0.9;
			}
			
			/* Sistema de onboarding/mask */
			.autorun-feedback-onboarding-overlay {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5);
				z-index: 10001;
				display: none;
			}
			
			.autorun-feedback-onboarding-overlay.show {
				display: block;
			}
			
			.autorun-feedback-onboarding-spotlight {
				position: absolute;
				border: 3px solid #667eea;
				border-radius: 8px;
				box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
				z-index: 10002;
				animation: pulse 2s infinite;
			}
			
			@keyframes pulse {
				0% { box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(102, 126, 234, 0.5); }
				50% { box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 0 10px rgba(102, 126, 234, 0.3); }
				100% { box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(102, 126, 234, 0.5); }
			}
			
			.autorun-feedback-onboarding-tooltip {
				position: absolute;
				background: white;
				border-radius: 12px;
				padding: 20px;
				box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
				z-index: 10003;
				max-width: 350px;
				animation: slideInTooltip 0.3s ease-out;
			}
			
			@keyframes slideInTooltip {
				from {
					opacity: 0;
					transform: scale(0.9);
				}
				to {
					opacity: 1;
					transform: scale(1);
				}
			}
		`;
	}

	/**
	 * Carga componentes desde Storybook usando la URL configurada
	 * Solo carga si useStorybookComponents es true y storybookUrl está configurado
	 */
	private async loadComponentsFromStorybook(): Promise<void> {
		if (!this.config.storybookUrl || !this.config.useStorybookComponents) return;
		if (typeof window === 'undefined') return;

		const baseUrl = this.config.storybookUrl.replace(/\/$/, ''); // Remover trailing slash
		const components = ['welcome', 'button-feedback', 'alert', 'mask'];

		try {
			// Verificar si window.AUTORUN.Components está disponible
			const ComponentsAPI = (window as any).AUTORUN?.Components;
			if (!ComponentsAPI) {
				console.warn(
					'⚠️  window.AUTORUN.Components no está disponible. Asegúrate de inicializar el sistema de componentes.',
				);
				return;
			}

			// Cargar cada componente desde Storybook
			for (const component of components) {
				try {
					const manifestUrl = `${baseUrl}/components/${component}/manifest.json`;

					// Verificar si ya está cargado para evitar duplicados
					const componentName = `@autorun/${component}`;
					if (ComponentsAPI.isLoaded && ComponentsAPI.isLoaded(componentName)) {
						console.log(`✅ Componente ${component} ya está cargado desde Storybook`);
						continue;
					}

					// Cargar componente desde Storybook
					await ComponentsAPI.loadFromStorybook({
						manifestUrl,
						replaceExisting: false, // No reemplazar si ya existe
					});
					console.log(`✅ Componente ${component} cargado desde Storybook`);
				} catch (error) {
					console.warn(`⚠️  No se pudo cargar ${component} desde Storybook:`, error);
					// Continuar con los demás componentes
				}
			}

			// Esperar un momento para que los scripts se ejecuten
			await new Promise((resolve) => setTimeout(resolve, 100));
		} catch (error) {
			console.warn('⚠️  Error al cargar componentes del Storybook:', error);
		}
	}

	/**
	 * Verifica si los componentes AUTORUN están disponibles
	 * Los componentes se exponen globalmente cuando se inicializan los add-ons
	 */
	private checkComponentsAvailability(): boolean {
		if (typeof window === 'undefined') return false;

		return !!(
			(window as any).AUTORUN?.Welcome?.create ||
			(window as any).AUTORUN?.Button?.create ||
			(window as any).AUTORUN?.Alert?.create ||
			(window as any).AUTORUN?.Mask?.create ||
			(window as any).AUTORUN?.ButtonFeedback?.create ||
			(window as any).createWelcome ||
			(window as any).createButton ||
			(window as any).createAlert ||
			(window as any).createMask ||
			(window as any).createButtonFeedback
		);
	}

	/**
	 * Crea el overlay de bienvenida (intenta usar componente del Storybook primero)
	 */
	private async createWelcomeOverlay(): Promise<void> {
		if (typeof document === 'undefined') return;

		// Intentar usar componente Welcome local si está disponible
		if (this.storybookComponentsLoaded && typeof window !== 'undefined') {
			try {
				// Verificar si hay una función global para crear Welcome
				const createWelcome =
					(window as any).createWelcome || (window as any).AUTORUN?.Welcome?.create;
				if (createWelcome) {
					const welcomeFeatures = (this.config.welcomeFeatures || []).map((text) => ({
						text,
						icon: 'fa-check',
					}));

					const welcomeElement = createWelcome({
						title: this.config.welcomeTitle || '¡Bienvenido!',
						subtitle: this.config.welcomeSubtitle || 'Estás a punto de probar esta aplicación.',
						features: welcomeFeatures,
						buttonText: 'Comenzar',
						buttonIcon: 'fa-rocket',
						buttonVariant: 'primary',
						buttonSize: 'lg',
						onStart: () => this.hideWelcomeOverlay(),
						layout: 'no-image',
						textAlignment: 'center',
						buttonAlignment: 'center',
						showBanner: true,
						showInfoBox: true,
					});
					if (welcomeElement) {
						document.body.appendChild(welcomeElement);
						this.welcomeOverlay = welcomeElement;
						return;
					}
				}
			} catch (error) {
				console.warn('⚠️  Error al usar componente Welcome, usando fallback:', error);
			}
		}

		// Fallback: usar componente actual
		const overlay = document.createElement('div');
		overlay.className = 'autorun-feedback-welcome-overlay';
		overlay.id = 'autorun-feedback-welcome-overlay';

		const container = document.createElement('div');
		container.className = 'autorun-feedback-welcome-container';

		const title = document.createElement('h1');
		title.className = 'autorun-feedback-welcome-title';
		title.textContent = this.config.welcomeTitle || '¡Bienvenido!';

		const subtitle = document.createElement('p');
		subtitle.className = 'autorun-feedback-welcome-subtitle';
		subtitle.textContent =
			this.config.welcomeSubtitle || 'Estás a punto de probar esta aplicación.';

		const featuresList = document.createElement('ul');
		featuresList.style.cssText =
			'text-align: left; margin: 24px 0; padding: 0 20px; list-style: none;';
		if (this.config.welcomeFeatures && this.config.welcomeFeatures.length > 0) {
			this.config.welcomeFeatures.forEach((feature) => {
				const li = document.createElement('li');
				li.textContent = feature;
				li.style.cssText = 'margin: 12px 0; color: #374151; font-size: 16px;';
				featuresList.appendChild(li);
			});
		}

		const startButton = document.createElement('button');
		startButton.className = 'autorun-feedback-start-button';
		startButton.textContent = 'Comenzar';
		startButton.onclick = () => this.hideWelcomeOverlay();

		container.appendChild(title);
		container.appendChild(subtitle);
		if (this.config.welcomeFeatures && this.config.welcomeFeatures.length > 0) {
			container.appendChild(featuresList);
		}
		container.appendChild(startButton);

		overlay.appendChild(container);
		document.body.appendChild(overlay);

		this.welcomeOverlay = overlay;
	}

	/**
	 * Oculta el overlay de bienvenida
	 */
	private hideWelcomeOverlay(): void {
		if (this.welcomeOverlay) {
			this.welcomeOverlay.style.display = 'none';
		}
		if (this.feedbackButton) {
			// Usar instancia de button-feedback si está disponible
			const instance = (this.feedbackButton as any)?.__buttonFeedbackInstance;
			if (instance && instance.show) {
				instance.show();
			} else {
				this.feedbackButton.style.display = 'flex';
			}
		}
		if (this.sectionIndicator) {
			this.sectionIndicator.style.display = 'block';
		}
	}

	/**
	 * Crea el botón flotante de feedback usando ButtonFeedback component
	 */
	private async createFeedbackButton(): Promise<void> {
		if (typeof document === 'undefined') return;

		// Intentar usar componente ButtonFeedback si está disponible
		if (typeof window !== 'undefined') {
			try {
				const createButtonFeedback =
					(window as any).createButtonFeedback || (window as any).AUTORUN?.ButtonFeedback?.create;
				if (createButtonFeedback) {
					const buttonFeedbackInstance = createButtonFeedback({
						text: '',
						icon: this.config.feedbackButtonIcon || 'comment-dots',
						position: this.config.feedbackButtonPosition || 'bottom-right',
						offset: 24,
						modalTitle: 'Deja tu Feedback',
						sectionOptions:
							this.config.sectionOptions?.map((opt) => ({
								value: opt,
								text: opt,
							})) || [],
						defaultSection: this.config.sectionOptions?.[0] || '',
						commentPlaceholder: '¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?',
						n8nWebhookUrl: this.config.webhookUrl,
						onFeedbackSent: (data) => {
							this.handleFeedbackSubmit(data.section, data.comment);
						},
						onCancel: () => {
							// Callback opcional
						},
						onClose: () => {
							// Callback opcional
						},
						visible: false, // Oculto inicialmente hasta que se cierre el welcome
					});

					if (buttonFeedbackInstance && buttonFeedbackInstance.element) {
						this.feedbackButton = buttonFeedbackInstance.element;
						// Guardar referencia a la instancia para controlar visibilidad
						(this.feedbackButton as any).__buttonFeedbackInstance = buttonFeedbackInstance;
						return;
					}
				}
			} catch (error) {
				console.warn('⚠️  Error al usar componente ButtonFeedback, usando fallback:', error);
			}
		}

		// Fallback: usar componente actual
		const button = document.createElement('button');
		button.className = `autorun-feedback-trigger ${this.config.feedbackButtonPosition || 'bottom-right'}`;
		button.id = 'autorun-feedback-trigger';
		button.textContent = this.config.feedbackButtonIcon || '💬';
		button.title = 'Dejar feedback';
		button.style.display = 'none'; // Oculto inicialmente hasta que se cierre el welcome
		button.onclick = () => this.openFeedbackModal();

		document.body.appendChild(button);
		this.feedbackButton = button;
	}

	/**
	 * Crea el indicador de sección
	 */
	private createSectionIndicator(): void {
		if (typeof document === 'undefined') return;

		const indicator = document.createElement('div');
		indicator.className = 'autorun-feedback-section-indicator';
		indicator.id = 'autorun-feedback-section-indicator';
		indicator.textContent = `📊 ${this.currentSection}`;
		indicator.style.display = 'none'; // Oculto inicialmente

		document.body.appendChild(indicator);
		this.sectionIndicator = indicator;
	}

	/**
	 * Crea el modal de feedback (intenta usar componente Alert del Storybook para confirmaciones)
	 */
	private async createFeedbackModal(): Promise<void> {
		if (typeof document === 'undefined') return;

		const modal = document.createElement('div');
		modal.className = 'autorun-feedback-modal';
		modal.id = 'autorun-feedback-modal';

		const header = document.createElement('div');
		header.className = 'autorun-feedback-modal-header';
		header.innerHTML = `
			<h3>💬 Deja tu Feedback</h3>
			<button class="autorun-feedback-modal-close" onclick="window.autorunFeedbackService?.closeFeedbackModal()">&times;</button>
		`;

		const body = document.createElement('div');
		body.className = 'autorun-feedback-modal-body';
		body.innerHTML = `
			<form id="autorun-feedback-form">
				<div class="autorun-feedback-form-group">
					<label for="autorun-feedback-section">Sección actual:</label>
					<select id="autorun-feedback-section" name="section" required>
						${this.config.sectionOptions?.map((opt) => `<option value="${opt}">${opt}</option>`).join('') || ''}
					</select>
				</div>
				<div class="autorun-feedback-form-group">
					<label for="autorun-feedback-comment">Tu comentario:</label>
					<textarea id="autorun-feedback-comment" name="comment" placeholder="¿Qué funciona bien? ¿Qué falta? ¿Qué mejorarías?" required></textarea>
				</div>
				<div class="autorun-feedback-form-actions">
					<button type="button" class="autorun-feedback-cancel" onclick="window.autorunFeedbackService?.closeFeedbackModal()">Cancelar</button>
					<button type="submit" class="autorun-feedback-submit">Enviar Feedback</button>
				</div>
			</form>
		`;

		modal.appendChild(header);
		modal.appendChild(body);
		document.body.appendChild(modal);

		// Configurar submit del formulario
		const form = modal.querySelector('#autorun-feedback-form') as HTMLFormElement;
		if (form) {
			form.onsubmit = (e) => {
				e.preventDefault();
				this.handleFeedbackSubmit();
			};
		}

		this.feedbackModal = modal;
	}

	/**
	 * Abre el modal de feedback
	 */
	openFeedbackModal(): void {
		if (!this.feedbackModal) return;

		// Detectar sección actual
		const sectionSelect = document.getElementById('autorun-feedback-section') as HTMLSelectElement;
		if (sectionSelect) {
			sectionSelect.value = this.currentSection;
		}

		this.feedbackModal.classList.add('show');
		const commentTextarea = document.getElementById(
			'autorun-feedback-comment',
		) as HTMLTextAreaElement;
		if (commentTextarea) {
			commentTextarea.focus();
		}
	}

	/**
	 * Cierra el modal de feedback
	 */
	closeFeedbackModal(): void {
		if (!this.feedbackModal) return;

		this.feedbackModal.classList.remove('show');
		const form = document.getElementById('autorun-feedback-form') as HTMLFormElement;
		if (form) {
			form.reset();
		}
	}

	/**
	 * Maneja el envío del feedback
	 * @param section Sección del feedback (opcional, se obtiene del DOM si no se proporciona)
	 * @param comment Comentario del feedback (opcional, se obtiene del DOM si no se proporciona)
	 */
	private async handleFeedbackSubmit(section?: string, comment?: string): Promise<void> {
		// Si no se proporcionan parámetros, obtener del DOM (modal antiguo)
		if (!section || !comment) {
			const sectionSelect = document.getElementById(
				'autorun-feedback-section',
			) as HTMLSelectElement;
			const commentTextarea = document.getElementById(
				'autorun-feedback-comment',
			) as HTMLTextAreaElement;

			if (sectionSelect) {
				section = sectionSelect.value;
			}
			if (commentTextarea) {
				comment = commentTextarea.value.trim();
			}
		}

		if (!comment || !comment.trim()) {
			this.showNotification('Por favor, escribe un comentario antes de enviar.', 'error');
			return;
		}

		// Crear objeto de feedback
		// Nota: n8n espera user, section, comment, timestamp en el body
		// n8n agregará ts_recibido automáticamente
		const feedback: FeedbackData = {
			user: this.currentUser || 'Anónimo',
			section,
			comment,
			timestamp: new Date().toISOString(),
			url: window.location.href,
		};

		// Agregar metadata si está habilitado
		if (this.config.collectMetadata) {
			feedback.userAgent = navigator.userAgent;
			feedback.screenResolution = `${screen.width}x${screen.height}`;
			feedback.viewport = `${window.innerWidth}x${window.innerHeight}`;
			feedback.referrer = document.referrer;
			feedback.sessionId = this.getSessionId();
		}

		// Agregar a la cola local
		this.feedbackQueue.push(feedback);

		// Guardar localmente si está habilitado
		if (this.config.persistLocally) {
			this.saveFeedbackLocally(feedback);
		}

		// Enviar a webhook
		if (this.config.webhookUrl) {
			await this.sendToWebhook(feedback);
		}

		// Cerrar modal y mostrar confirmación
		this.closeFeedbackModal();
		await this.showNotification(
			'¡Gracias por tu feedback! Se ha guardado correctamente.',
			'success',
		);
	}

	/**
	 * Envía feedback al webhook
	 */
	private async sendToWebhook(feedback: FeedbackData): Promise<void> {
		if (!this.config.webhookUrl) return;

		try {
			const response = await fetch(this.config.webhookUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(feedback),
			});

			if (response.ok) {
				console.log('✅ Feedback enviado al webhook:', feedback);
				// Remover de la cola local si se envió exitosamente
				this.feedbackQueue = this.feedbackQueue.filter((f) => f !== feedback);
			} else {
				console.error('❌ Error al enviar feedback:', response.statusText);
			}
		} catch (error) {
			console.error('❌ Error de conexión al enviar feedback:', error);
			// El feedback ya está guardado localmente, se reintentará más tarde
		}
	}

	/**
	 * Guarda feedback en localStorage
	 */
	private saveFeedbackLocally(feedback: FeedbackData): void {
		if (typeof localStorage === 'undefined') return;

		try {
			const stored = JSON.parse(localStorage.getItem('autorun_feedback_queue') || '[]');
			stored.push(feedback);
			localStorage.setItem('autorun_feedback_queue', JSON.stringify(stored));
		} catch (error) {
			console.error('❌ Error al guardar feedback localmente:', error);
		}
	}

	/**
	 * Carga feedback pendiente del localStorage
	 */
	private loadPendingFeedback(): void {
		if (typeof localStorage === 'undefined') return;

		try {
			const stored = JSON.parse(localStorage.getItem('autorun_feedback_queue') || '[]');
			if (stored.length > 0 && this.config.webhookUrl) {
				// Reintentar envío de feedback pendiente
				stored.forEach((feedback: FeedbackData) => {
					this.sendToWebhook(feedback);
				});
			}
		} catch (error) {
			console.error('❌ Error al cargar feedback pendiente:', error);
		}
	}

	/**
	 * Configura el tracking de sección
	 */
	private setupSectionTracking(): void {
		if (typeof window === 'undefined') return;

		// Detectar sección por URL
		this.updateSectionFromURL();

		// Interceptar clicks en elementos de navegación
		document.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.closest('.nav-tab, .nav-link, [data-section]')) {
				const sectionName = target.textContent?.trim() || target.getAttribute('data-section') || '';
				if (sectionName) {
					this.updateCurrentSection(sectionName);
				}
			}
		});

		// Usar Intersection Observer para detectar secciones visibles
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionName = entry.target.getAttribute('data-section') || entry.target.id || '';
						if (sectionName) {
							this.updateCurrentSection(sectionName);
						}
					}
				});
			},
			{ threshold: 0.5 },
		);

		// Observar elementos con data-section
		document.querySelectorAll('[data-section]').forEach((el) => {
			observer.observe(el);
		});
	}

	/**
	 * Actualiza la sección desde la URL
	 * Genérico: detecta secciones basándose en la URL o elementos con data-section
	 */
	private updateSectionFromURL(): void {
		if (typeof window === 'undefined') return;

		const url = window.location.pathname;
		const pathname = url.toLowerCase();

		// Buscar en las opciones de sección configuradas si alguna coincide con la URL
		if (this.config.sectionOptions) {
			for (const section of this.config.sectionOptions) {
				const sectionLower = section.toLowerCase().replace(/\s+/g, '-');
				if (pathname.includes(sectionLower) || pathname.includes(section.toLowerCase())) {
					this.updateCurrentSection(section);
					return;
				}
			}
		}

		// Si no hay coincidencia, usar el hash o pathname como sección
		const hash = window.location.hash.replace('#', '');
		if (hash) {
			this.updateCurrentSection(hash.charAt(0).toUpperCase() + hash.slice(1));
		} else if (url !== '/') {
			const pathParts = url.split('/').filter(Boolean);
			if (pathParts.length > 0) {
				const lastPart = pathParts[pathParts.length - 1];
				this.updateCurrentSection(
					lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, ' '),
				);
			}
		}
	}

	/**
	 * Actualiza la sección actual
	 */
	updateCurrentSection(sectionName: string): void {
		this.currentSection = sectionName;
		if (this.sectionIndicator) {
			this.sectionIndicator.textContent = `📊 ${sectionName}`;
		}
	}

	/**
	 * Muestra una notificación
	 */
	private async showNotification(
		message: string,
		type: 'success' | 'error' | 'info' = 'info',
	): Promise<void> {
		if (typeof document === 'undefined') return;

		// Intentar usar componente Alert local si está disponible
		if (this.storybookComponentsLoaded && typeof window !== 'undefined') {
			try {
				const showAlert = (window as any).showAlert || (window as any).AUTORUN?.Alert?.show;
				const createAlert = (window as any).createAlert || (window as any).AUTORUN?.Alert?.create;

				if (showAlert) {
					showAlert(type === 'success' ? 'success' : type === 'error' ? 'error' : 'info', message, {
						duration: 5000,
						closable: true,
					});
					return;
				} else if (createAlert) {
					const alertElement = createAlert({
						type: type === 'success' ? 'success' : type === 'error' ? 'error' : 'info',
						message: message,
						duration: 5000,
						closable: true,
					});
					if (alertElement) {
						// Posicionar en la esquina superior derecha
						alertElement.style.cssText = `
							position: fixed;
							top: 20px;
							right: 20px;
							z-index: 10001;
							max-width: 400px;
						`;
						document.body.appendChild(alertElement);
						return;
					}
				}
			} catch (error) {
				console.warn('⚠️  Error al usar componente Alert, usando fallback:', error);
			}
		}

		// Fallback: usar componente actual
		const notification = document.createElement('div');
		notification.style.cssText = `
			position: fixed;
			top: 20px;
			right: 20px;
			background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
			color: white;
			padding: 16px 20px;
			border-radius: 8px;
			box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
			z-index: 10001;
			font-weight: 600;
			max-width: 300px;
			animation: slideInRight 0.3s ease-out;
		`;
		notification.textContent = message;

		document.body.appendChild(notification);

		setTimeout(() => {
			notification.style.animation = 'slideOutRight 0.3s ease-out';
			setTimeout(() => {
				if (notification.parentNode) {
					notification.parentNode.removeChild(notification);
				}
			}, 300);
		}, 4000);
	}

	/**
	 * Crea el sistema de onboarding/mask (intenta usar componente del Storybook primero)
	 */
	private async createOnboardingSystem(): Promise<void> {
		if (typeof document === 'undefined') return;

		// Intentar usar componente Mask local si está disponible
		if (this.storybookComponentsLoaded && typeof window !== 'undefined') {
			try {
				const createMask = (window as any).createMask || (window as any).AUTORUN?.Mask?.create;
				if (createMask) {
					// Buscar el primer elemento interactivo para destacar
					const firstInteractive = document.querySelector(
						'button, a, input, select, textarea',
					) as HTMLElement;
					if (firstInteractive) {
						const maskInstance = createMask({
							targetElement: firstInteractive,
							popover: {
								title: 'Bienvenido',
								content:
									'Este es el sistema de feedback. Usa el botón flotante para dejar comentarios.',
								onClose: () => {},
							},
							padding: 8,
							closeOnOverlayClick: true,
							open: false,
						});
						if (maskInstance && maskInstance.element) {
							this.onboardingOverlay = maskInstance.element;
							return;
						}
					}
				}
			} catch (error) {
				console.warn('⚠️  Error al usar componente Mask, usando fallback:', error);
			}
		}

		// Fallback: usar componente actual
		const overlay = document.createElement('div');
		overlay.className = 'autorun-feedback-onboarding-overlay';
		overlay.id = 'autorun-feedback-onboarding-overlay';

		const spotlight = document.createElement('div');
		spotlight.className = 'autorun-feedback-onboarding-spotlight';
		spotlight.id = 'autorun-feedback-onboarding-spotlight';

		overlay.appendChild(spotlight);
		document.body.appendChild(overlay);

		this.onboardingOverlay = overlay;
	}

	/**
	 * Obtiene el ID de sesión
	 */
	private getSessionId(): string {
		if (typeof sessionStorage === 'undefined') {
			return `session_${Date.now()}`;
		}

		let sessionId = sessionStorage.getItem('autorun_feedback_session_id');
		if (!sessionId) {
			sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
			sessionStorage.setItem('autorun_feedback_session_id', sessionId);
		}
		return sessionId;
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<FeedbackConfig>): void {
		this.config = { ...this.config, ...config };
	}

	/**
	 * Habilita o deshabilita el servicio
	 */
	setEnabled(enabled: boolean): void {
		this.config.enabled = enabled;

		if (this.feedbackButton) {
			// Usar instancia de button-feedback si está disponible
			const instance = (this.feedbackButton as any)?.__buttonFeedbackInstance;
			if (instance) {
				if (enabled) {
					instance.show();
				} else {
					instance.hide();
				}
			} else {
				this.feedbackButton.style.display = enabled ? 'flex' : 'none';
			}
		}
		if (this.sectionIndicator) {
			this.sectionIndicator.style.display = enabled ? 'block' : 'none';
		}
	}

	/**
	 * Obtiene el estado actual del servicio
	 */
	getStatus(): {
		initialized: boolean;
		enabled: boolean;
		webhookUrl?: string;
		currentSection: string;
		pendingFeedback: number;
	} {
		return {
			initialized: this.initialized,
			enabled: this.config.enabled || false,
			webhookUrl: this.config.webhookUrl,
			currentSection: this.currentSection,
			pendingFeedback: this.feedbackQueue.length,
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): FeedbackConfig {
		return { ...this.config };
	}

	/**
	 * Destruye el servicio y limpia recursos
	 */
	destroy(): void {
		if (this.welcomeOverlay && this.welcomeOverlay.parentNode) {
			this.welcomeOverlay.parentNode.removeChild(this.welcomeOverlay);
		}
		if (this.feedbackButton && this.feedbackButton.parentNode) {
			this.feedbackButton.parentNode.removeChild(this.feedbackButton);
		}
		if (this.feedbackModal && this.feedbackModal.parentNode) {
			this.feedbackModal.parentNode.removeChild(this.feedbackModal);
		}
		if (this.sectionIndicator && this.sectionIndicator.parentNode) {
			this.sectionIndicator.parentNode.removeChild(this.sectionIndicator);
		}
		if (this.onboardingOverlay && this.onboardingOverlay.parentNode) {
			this.onboardingOverlay.parentNode.removeChild(this.onboardingOverlay);
		}

		// Remover estilos
		const styles = document.getElementById('autorun-feedback-styles');
		if (styles && styles.parentNode) {
			styles.parentNode.removeChild(styles);
		}

		this.initialized = false;
	}

	/**
	 * Hace disponible el servicio globalmente para callbacks
	 */
	makeGlobal(): void {
		if (typeof window !== 'undefined') {
			(window as any).autorunFeedbackService = this;
		}
	}
}
