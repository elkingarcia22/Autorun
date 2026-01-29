/**
 * SentryAddon
 *
 * Add-on funcional de Sentry que implementa IFunctionalAddon.
 * Proporciona monitoreo de errores y performance para la aplicación.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { SentryService, SentryConfig } from './SentryService';

export class SentryAddon implements IFunctionalAddon {
	readonly id = 'sentry';
	readonly name = 'Sentry Error Monitoring';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Monitoreo de errores y performance con Sentry';

	private service?: SentryService;
	private active = false;
	private config: SentryConfig = {
		dsn: '',
		enabled: true,
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.sentry || {};
		this.config = {
			dsn: addonConfig.dsn || process.env.SENTRY_DSN || '',
			environment: addonConfig.environment || process.env.NODE_ENV || 'production',
			release: addonConfig.release || process.env.SENTRY_RELEASE,
			tracesSampleRate: addonConfig.tracesSampleRate ?? 1.0,
			sampleRate: addonConfig.sampleRate ?? 1.0,
			beforeSend: addonConfig.beforeSend,
			integrations: addonConfig.integrations,
			enabled: addonConfig.enabled !== false,
			debug: addonConfig.debug || false,
			attachStacktrace: addonConfig.attachStacktrace !== false,
			maxBreadcrumbs: addonConfig.maxBreadcrumbs || 50,
			user: addonConfig.user,
			tags: addonConfig.tags,
			extra: addonConfig.extra,
		};

		// Validar que hay DSN
		if (!this.config.dsn) {
			console.warn('⚠️  Sentry Add-on: No se proporcionó DSN. Sentry no se inicializará.');
			console.warn('ℹ️  Configura SENTRY_DSN en variables de entorno o en autorun.config.json');
			return;
		}

		// Inicializar servicio
		this.service = new SentryService(this.config);

		try {
			await this.service.initialize();
			console.log('✅ Sentry Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Sentry Add-on: Error al inicializar - ${error}`);
			// No lanzar error, permitir que el add-on funcione sin inicialización completa
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new SentryService(this.config);
			await this.service.initialize();
		}

		this.active = true;
		console.log('✅ Sentry Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Sentry Add-on: Desactivado');
	}

	isActive(): boolean {
		return this.active;
	}

	getStatus(): 'active' | 'inactive' {
		return this.active ? 'active' : 'inactive';
	}

	destroy(): void {
		this.active = false;
		if (this.service) {
			this.service.close(2000).catch(() => {
				// Ignorar errores al cerrar
			});
		}
		this.service = undefined;
	}

	async configure(config: Record<string, any>): Promise<void> {
		const sentryConfig: Partial<SentryConfig> = {};

		if (config.dsn !== undefined) sentryConfig.dsn = config.dsn;
		if (config.environment !== undefined) sentryConfig.environment = config.environment;
		if (config.release !== undefined) sentryConfig.release = config.release;
		if (config.tracesSampleRate !== undefined)
			sentryConfig.tracesSampleRate = config.tracesSampleRate;
		if (config.sampleRate !== undefined) sentryConfig.sampleRate = config.sampleRate;
		if (config.beforeSend !== undefined) sentryConfig.beforeSend = config.beforeSend;
		if (config.integrations !== undefined) sentryConfig.integrations = config.integrations;
		if (config.enabled !== undefined) sentryConfig.enabled = config.enabled;
		if (config.debug !== undefined) sentryConfig.debug = config.debug;
		if (config.attachStacktrace !== undefined)
			sentryConfig.attachStacktrace = config.attachStacktrace;
		if (config.maxBreadcrumbs !== undefined) sentryConfig.maxBreadcrumbs = config.maxBreadcrumbs;
		if (config.user !== undefined) sentryConfig.user = config.user;
		if (config.tags !== undefined) sentryConfig.tags = config.tags;
		if (config.extra !== undefined) sentryConfig.extra = config.extra;

		this.config = { ...this.config, ...sentryConfig };

		if (this.service) {
			this.service.updateConfig(sentryConfig);
		} else {
			this.service = new SentryService(this.config);
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

		// Agregar breadcrumb para cambios de archivos
		this.service.addBreadcrumb({
			message: `Archivo modificado: ${filePath}`,
			category: 'file',
			level: 'info',
			data: { filePath },
		});
	}

	/**
	 * Hook llamado antes de un deploy
	 */
	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		this.service.addBreadcrumb({
			message: 'Deploy iniciado',
			category: 'deploy',
			level: 'info',
		});
	}

	/**
	 * Hook llamado después de un deploy
	 */
	async onAfterDeploy(url: string): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		this.service.addBreadcrumb({
			message: 'Deploy completado',
			category: 'deploy',
			level: 'info',
			data: { url },
		});

		// Establecer tag con la URL del deploy
		this.service.setTag('deploy_url', url);
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Capturar excepción
			captureException: (error: Error, context?: Record<string, any>) => {
				if (!this.service) {
					throw new Error('Sentry service no está inicializado');
				}
				return this.service.captureException(error, context);
			},

			// Capturar mensaje
			captureMessage: (
				message: string,
				level: 'info' | 'warning' | 'error' = 'info',
				context?: Record<string, any>,
			) => {
				if (!this.service) {
					throw new Error('Sentry service no está inicializado');
				}
				return this.service.captureMessage(message, level, context);
			},

			// Agregar breadcrumb
			addBreadcrumb: (breadcrumb: {
				message?: string;
				category?: string;
				level?: 'info' | 'warning' | 'error';
				data?: Record<string, any>;
			}) => {
				if (!this.service) {
					throw new Error('Sentry service no está inicializado');
				}
				return this.service.addBreadcrumb(breadcrumb);
			},

			// Establecer usuario
			setUser: (user: { id?: string; email?: string; username?: string; [key: string]: any }) => {
				if (!this.service) {
					throw new Error('Sentry service no está inicializado');
				}
				return this.service.setUser(user);
			},

			// Establecer tag
			setTag: (key: string, value: string) => {
				if (!this.service) {
					throw new Error('Sentry service no está inicializado');
				}
				return this.service.setTag(key, value);
			},

			// Establecer contexto
			setContext: (name: string, context: Record<string, any>) => {
				if (!this.service) {
					throw new Error('Sentry service no está inicializado');
				}
				return this.service.setContext(name, context);
			},

			// Iniciar transacción de performance
			startTransaction: (name: string, op: string) => {
				if (!this.service) {
					throw new Error('Sentry service no está inicializado');
				}
				return this.service.startTransaction(name, op);
			},

			// Obtener estado
			getStatus: () => {
				if (!this.service) {
					return {
						initialized: false,
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
			updateConfig: (config: Partial<SentryConfig>) => {
				if (!this.service) {
					throw new Error('Sentry service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}
