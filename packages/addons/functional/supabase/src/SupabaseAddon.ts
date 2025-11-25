/**
 * SupabaseAddon
 *
 * Add-on funcional de Supabase que implementa IFunctionalAddon.
 * Proporciona base de datos, autenticación y storage con Supabase.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { SupabaseService, SupabaseConfig, SupabaseUser, SupabaseSession } from './SupabaseService';

export class SupabaseAddon implements IFunctionalAddon {
	readonly id = 'supabase';
	readonly name = 'Supabase';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Base de datos, autenticación y storage con Supabase';

	private service?: SupabaseService;
	private active = false;
	private config: SupabaseConfig = {
		url: '',
		anonKey: '',
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.supabase || {};
		this.config = {
			url: addonConfig.url || process.env.SUPABASE_URL || '',
			anonKey: addonConfig.anonKey || process.env.SUPABASE_ANON_KEY || '',
			serviceRoleKey: addonConfig.serviceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY,
			autoConnect: addonConfig.autoConnect !== false,
			auth: {
				persistSession: addonConfig.auth?.persistSession !== false,
				autoRefreshToken: addonConfig.auth?.autoRefreshToken !== false,
				detectSessionInUrl: addonConfig.auth?.detectSessionInUrl !== false,
			},
		};

		// Validar que hay URL y anonKey
		if (!this.config.url || !this.config.anonKey) {
			console.warn(
				'⚠️  Supabase Add-on: URL o anonKey no configurados. Configura SUPABASE_URL y SUPABASE_ANON_KEY.',
			);
			return;
		}

		// Inicializar servicio
		this.service = new SupabaseService(this.config);

		try {
			await this.service.initialize();
			console.log('✅ Supabase Add-on: Inicializado correctamente');
		} catch (error) {
			console.error(`❌ Supabase Add-on: Error al inicializar - ${error}`);
			// No lanzar error, permitir que el add-on funcione sin inicialización completa
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			if (this.config.url && this.config.anonKey) {
				this.service = new SupabaseService(this.config);
				await this.service.initialize();
			} else {
				console.warn('⚠️  Supabase Add-on: No se puede activar sin URL y anonKey');
				return;
			}
		}

		this.active = true;
		console.log('✅ Supabase Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		console.log('🔌 Supabase Add-on: Desactivado');
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
		const supabaseConfig: Partial<SupabaseConfig> = {};

		if (config.url) supabaseConfig.url = config.url;
		if (config.anonKey) supabaseConfig.anonKey = config.anonKey;
		if (config.serviceRoleKey) supabaseConfig.serviceRoleKey = config.serviceRoleKey;
		if (config.autoConnect !== undefined) supabaseConfig.autoConnect = config.autoConnect;
		if (config.auth) supabaseConfig.auth = config.auth;

		this.config = { ...this.config, ...supabaseConfig };

		if (this.service) {
			this.service.updateConfig(supabaseConfig);
		} else if (this.config.url && this.config.anonKey) {
			this.service = new SupabaseService(this.config);
			await this.service.initialize();
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Autenticación
			signUp: async (
				email: string,
				password: string,
				options?: {
					data?: Record<string, any>;
					redirectTo?: string;
				},
			) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return await this.service.signUp(email, password, options);
			},

			signIn: async (email: string, password: string) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return await this.service.signIn(email, password);
			},

			signOut: async () => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return await this.service.signOut();
			},

			getUser: async () => {
				if (!this.service) {
					return null;
				}
				return await this.service.getUser();
			},

			getSession: () => {
				if (!this.service) {
					return null;
				}
				return this.service.getSession();
			},

			// Base de datos
			query: async (table: string, options?: any) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return await this.service.query(table, options);
			},

			insert: async (table: string, data: Record<string, any> | Record<string, any>[]) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return await this.service.insert(table, data);
			},

			update: async (table: string, data: Record<string, any>, filter: Record<string, any>) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return await this.service.update(table, data, filter);
			},

			delete: async (table: string, filter: Record<string, any>) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return await this.service.delete(table, filter);
			},

			// Storage
			uploadFile: async (bucket: string, path: string, file: File | Blob) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return await this.service.uploadFile(bucket, path, file);
			},

			downloadFile: async (bucket: string, path: string) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return await this.service.downloadFile(bucket, path);
			},

			getPublicUrl: (bucket: string, path: string) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return this.service.getPublicUrl(bucket, path);
			},

			// Real-time
			subscribe: (table: string, callback: (payload: any) => void, filter?: string) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return this.service.subscribe(table, callback, filter);
			},

			// Estado y configuración
			getStatus: () => {
				if (!this.service) {
					return {
						initialized: false,
						connected: false,
						authenticated: false,
						hasClient: false,
					};
				}
				return this.service.getStatus();
			},

			getConfig: () => {
				if (!this.service) {
					return this.config;
				}
				return this.service.getConfig();
			},

			updateConfig: (config: Partial<SupabaseConfig>) => {
				if (!this.service) {
					throw new Error('Supabase service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}
