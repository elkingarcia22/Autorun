/**
 * SentryService
 *
 * Servicio que maneja todas las operaciones de Sentry:
 * - Inicialización de Sentry
 * - Captura de errores
 * - Monitoreo de performance
 * - Contexto de usuario
 * - Breadcrumbs
 */

export interface SentryConfig {
	dsn?: string;
	environment?: string;
	release?: string;
	tracesSampleRate?: number;
	sampleRate?: number;
	beforeSend?: (event: any) => any | null;
	integrations?: any[];
	enabled?: boolean;
	debug?: boolean;
	attachStacktrace?: boolean;
	maxBreadcrumbs?: number;
	user?: {
		id?: string;
		email?: string;
		username?: string;
		[key: string]: any;
	};
	tags?: Record<string, string>;
	extra?: Record<string, any>;
}

export interface SentryStatus {
	initialized: boolean;
	dsn?: string;
	environment?: string;
	release?: string;
}

export class SentryService {
	private config: SentryConfig;
	private initialized = false;
	private sentryInstance: any = null;

	constructor(config: SentryConfig) {
		this.config = {
			dsn: config.dsn,
			environment: config.environment || 'production',
			release: config.release,
			tracesSampleRate: config.tracesSampleRate ?? 1.0,
			sampleRate: config.sampleRate ?? 1.0,
			beforeSend: config.beforeSend,
			integrations: config.integrations,
			enabled: config.enabled !== false,
			debug: config.debug || false,
			attachStacktrace: config.attachStacktrace !== false,
			maxBreadcrumbs: config.maxBreadcrumbs || 50,
			user: config.user,
			tags: config.tags,
			extra: config.extra,
		};
	}

	/**
	 * Inicializa Sentry
	 */
	async initialize(): Promise<void> {
		if (!this.config.enabled) {
			console.log('ℹ️  Sentry está deshabilitado en la configuración');
			return;
		}

		if (!this.config.dsn) {
			console.warn('⚠️  Sentry: No se proporcionó DSN. Sentry no se inicializará.');
			return;
		}

		// Detectar si estamos en navegador o Node.js
		const isBrowser = typeof window !== 'undefined';
		const isReact = this.detectReact();

			try {
				if (isBrowser) {
					if (isReact) {
						// Intentar usar @sentry/react si está disponible
						try {
							// @ts-ignore - Peer dependency, puede no estar instalado
							const Sentry = await import('@sentry/react');
						Sentry.init({
							dsn: this.config.dsn,
							environment: this.config.environment,
							release: this.config.release,
							tracesSampleRate: this.config.tracesSampleRate,
							sampleRate: this.config.sampleRate,
							beforeSend: this.config.beforeSend,
							integrations: this.config.integrations,
							debug: this.config.debug,
							attachStacktrace: this.config.attachStacktrace,
							maxBreadcrumbs: this.config.maxBreadcrumbs,
						});

						// Configurar usuario si está disponible
						if (this.config.user) {
							Sentry.setUser(this.config.user);
						}

						// Configurar tags si están disponibles
						if (this.config.tags) {
							Object.entries(this.config.tags).forEach(([key, value]) => {
								Sentry.setTag(key, value);
							});
						}

						// Configurar contexto extra si está disponible
						if (this.config.extra) {
							Sentry.setContext('extra', this.config.extra);
						}

						this.sentryInstance = Sentry;
						this.initialized = true;
						console.log('✅ Sentry Service: Inicializado con @sentry/react');
						return;
					} catch {
						// Si @sentry/react no está disponible, usar @sentry/browser
					}
				}

				// Usar @sentry/browser como fallback o por defecto
				// @ts-ignore - Peer dependency, puede no estar instalado
				const Sentry = await import('@sentry/browser');
				Sentry.init({
					dsn: this.config.dsn,
					environment: this.config.environment,
					release: this.config.release,
					tracesSampleRate: this.config.tracesSampleRate,
					sampleRate: this.config.sampleRate,
					beforeSend: this.config.beforeSend,
					integrations: this.config.integrations,
					debug: this.config.debug,
					attachStacktrace: this.config.attachStacktrace,
					maxBreadcrumbs: this.config.maxBreadcrumbs,
				});

				// Configurar usuario si está disponible
				if (this.config.user) {
					Sentry.setUser(this.config.user);
				}

				// Configurar tags si están disponibles
				if (this.config.tags) {
					Object.entries(this.config.tags).forEach(([key, value]) => {
						Sentry.setTag(key, value);
					});
				}

				// Configurar contexto extra si está disponible
				if (this.config.extra) {
					Sentry.setContext('extra', this.config.extra);
				}

				this.sentryInstance = Sentry;
				this.initialized = true;
				console.log('✅ Sentry Service: Inicializado con @sentry/browser');
			} else {
				// Node.js environment
				// @ts-ignore - Peer dependency, puede no estar instalado
				const Sentry = await import('@sentry/node');
				Sentry.init({
					dsn: this.config.dsn,
					environment: this.config.environment,
					release: this.config.release,
					tracesSampleRate: this.config.tracesSampleRate,
					sampleRate: this.config.sampleRate,
					beforeSend: this.config.beforeSend,
					integrations: this.config.integrations,
					debug: this.config.debug,
					attachStacktrace: this.config.attachStacktrace,
					maxBreadcrumbs: this.config.maxBreadcrumbs,
				});

				// Configurar usuario si está disponible
				if (this.config.user) {
					Sentry.setUser(this.config.user);
				}

				// Configurar tags si están disponibles
				if (this.config.tags) {
					Object.entries(this.config.tags).forEach(([key, value]) => {
						Sentry.setTag(key, value);
					});
				}

				// Configurar contexto extra si está disponible
				if (this.config.extra) {
					Sentry.setContext('extra', this.config.extra);
				}

				this.sentryInstance = Sentry;
				this.initialized = true;
				console.log('✅ Sentry Service: Inicializado con @sentry/node');
			}
		} catch (error: any) {
			console.error('❌ Sentry Service: Error al inicializar:', error.message);
			console.warn('ℹ️  Asegúrate de instalar @sentry/browser o @sentry/react para navegador');
			console.warn('ℹ️  O @sentry/node para Node.js');
		}
	}

	/**
	 * Detecta si React está disponible
	 */
	private detectReact(): boolean {
		if (typeof window === 'undefined') {
			return false;
		}

		// Verificar si React está disponible en el contexto global
		return !!(window as any).React || !!(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
	}

	/**
	 * Captura una excepción
	 */
	captureException(error: Error, context?: Record<string, any>): string | undefined {
		if (!this.initialized || !this.sentryInstance) {
			console.warn('⚠️  Sentry no está inicializado. Error no capturado:', error);
			return undefined;
		}

		try {
			if (context) {
				this.sentryInstance.setContext('error_context', context);
			}

			return this.sentryInstance.captureException(error);
		} catch (err) {
			console.error('❌ Error al capturar excepción en Sentry:', err);
			return undefined;
		}
	}

	/**
	 * Captura un mensaje
	 */
	captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: Record<string, any>): string | undefined {
		if (!this.initialized || !this.sentryInstance) {
			console.warn('⚠️  Sentry no está inicializado. Mensaje no capturado:', message);
			return undefined;
		}

		try {
			if (context) {
				this.sentryInstance.setContext('message_context', context);
			}

			return this.sentryInstance.captureMessage(message, level);
		} catch (err) {
			console.error('❌ Error al capturar mensaje en Sentry:', err);
			return undefined;
		}
	}

	/**
	 * Agrega un breadcrumb
	 */
	addBreadcrumb(breadcrumb: {
		message?: string;
		category?: string;
		level?: 'info' | 'warning' | 'error';
		data?: Record<string, any>;
	}): void {
		if (!this.initialized || !this.sentryInstance) {
			return;
		}

		try {
			this.sentryInstance.addBreadcrumb(breadcrumb);
		} catch (err) {
			console.error('❌ Error al agregar breadcrumb en Sentry:', err);
		}
	}

	/**
	 * Establece el usuario actual
	 */
	setUser(user: {
		id?: string;
		email?: string;
		username?: string;
		[key: string]: any;
	}): void {
		if (!this.initialized || !this.sentryInstance) {
			return;
		}

		try {
			this.sentryInstance.setUser(user);
		} catch (err) {
			console.error('❌ Error al establecer usuario en Sentry:', err);
		}
	}

	/**
	 * Establece un tag
	 */
	setTag(key: string, value: string): void {
		if (!this.initialized || !this.sentryInstance) {
			return;
		}

		try {
			this.sentryInstance.setTag(key, value);
		} catch (err) {
			console.error('❌ Error al establecer tag en Sentry:', err);
		}
	}

	/**
	 * Establece contexto adicional
	 */
	setContext(name: string, context: Record<string, any>): void {
		if (!this.initialized || !this.sentryInstance) {
			return;
		}

		try {
			this.sentryInstance.setContext(name, context);
		} catch (err) {
			console.error('❌ Error al establecer contexto en Sentry:', err);
		}
	}

	/**
	 * Inicia una transacción de performance
	 */
	startTransaction(name: string, op: string): any {
		if (!this.initialized || !this.sentryInstance) {
			return null;
		}

		try {
			return this.sentryInstance.startTransaction({ name, op });
		} catch (err) {
			console.error('❌ Error al iniciar transacción en Sentry:', err);
			return null;
		}
	}

	/**
	 * Obtiene el estado actual
	 */
	getStatus(): SentryStatus {
		return {
			initialized: this.initialized,
			dsn: this.config.dsn,
			environment: this.config.environment,
			release: this.config.release,
		};
	}

	/**
	 * Obtiene la configuración actual
	 */
	getConfig(): SentryConfig {
		return { ...this.config };
	}

	/**
	 * Actualiza la configuración
	 */
	updateConfig(config: Partial<SentryConfig>): void {
		this.config = { ...this.config, ...config };
	}

	/**
	 * Cierra Sentry (útil para testing o cleanup)
	 */
	close(timeout?: number): Promise<boolean> {
		if (!this.initialized || !this.sentryInstance) {
			return Promise.resolve(false);
		}

		try {
			return this.sentryInstance.close(timeout);
		} catch (err) {
			console.error('❌ Error al cerrar Sentry:', err);
			return Promise.resolve(false);
		}
	}
}

