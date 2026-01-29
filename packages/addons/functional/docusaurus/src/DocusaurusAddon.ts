/**
 * DocusaurusAddon
 *
 * Add-on funcional de Docusaurus que implementa IFunctionalAddon.
 * Proporciona generación y gestión de documentación.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { DocusaurusService, DocusaurusConfig, DocusaurusProcess } from './DocusaurusService';

export class DocusaurusAddon implements IFunctionalAddon {
	readonly id = 'docusaurus';
	readonly name = 'Docusaurus';
	readonly version = '1.0.0';
	readonly type = 'functional';
	readonly description = 'Generación y gestión de documentación con Docusaurus';

	private service?: DocusaurusService;
	private active = false;
	private config: DocusaurusConfig = {
		port: 3000,
		host: 'localhost',
		buildDir: 'build',
		configFile: 'docusaurus.config.js',
		autoStart: false,
		theme: 'classic',
		docsDir: 'docs',
		blogDir: 'blog',
		staticDir: 'static',
	};
	private context?: AutorunContext;

	async initialize(context: AutorunContext): Promise<void> {
		this.context = context;

		// Obtener configuración
		const addonConfig = context.config.autorun?.addons?.config?.docusaurus || {};
		this.config = {
			port: addonConfig.port || 3000,
			host: addonConfig.host || 'localhost',
			buildDir: addonConfig.buildDir || 'build',
			configFile: addonConfig.configFile || 'docusaurus.config.js',
			autoStart: addonConfig.autoStart || false,
			theme: addonConfig.theme || 'classic',
			docsDir: addonConfig.docsDir || 'docs',
			blogDir: addonConfig.blogDir || 'blog',
			staticDir: addonConfig.staticDir || 'static',
		};

		// Inicializar servicio
		this.service = new DocusaurusService(this.config, process.cwd());

		try {
			await this.service.initialize();
			console.log('✅ Docusaurus Add-on: Inicializado correctamente');

			// Auto-start si está configurado
			if (this.config.autoStart) {
				await this.activate();
			}
		} catch (error) {
			console.error(`❌ Docusaurus Add-on: Error al inicializar - ${error}`);
			// No lanzar error, permitir que el add-on funcione sin inicialización completa
		}
	}

	async activate(): Promise<void> {
		if (!this.service) {
			this.service = new DocusaurusService(this.config, process.cwd());
			await this.service.initialize();
		}

		// Iniciar servidor de desarrollo si no está corriendo
		const status = this.service.getStatus();
		if (!status.running) {
			try {
				const process = await this.service.start();
				console.log(`✅ Docusaurus Add-on: Servidor iniciado en ${process.url}`);
			} catch (error) {
				console.error(`❌ Docusaurus Add-on: Error al iniciar servidor - ${error}`);
			}
		}

		this.active = true;
		console.log('✅ Docusaurus Add-on: Activado');
	}

	async deactivate(): Promise<void> {
		this.active = false;
		this.service?.stop();
		console.log('🔌 Docusaurus Add-on: Desactivado');
	}

	isActive(): boolean {
		return this.active;
	}

	getStatus(): 'active' | 'inactive' {
		return this.active ? 'active' : 'inactive';
	}

	destroy(): void {
		this.service?.stop();
		this.active = false;
		this.service = undefined;
	}

	async configure(config: Record<string, any>): Promise<void> {
		const docusaurusConfig: Partial<DocusaurusConfig> = {};

		if (config.port !== undefined) docusaurusConfig.port = config.port;
		if (config.host) docusaurusConfig.host = config.host;
		if (config.buildDir) docusaurusConfig.buildDir = config.buildDir;
		if (config.configFile) docusaurusConfig.configFile = config.configFile;
		if (config.autoStart !== undefined) docusaurusConfig.autoStart = config.autoStart;
		if (config.theme) docusaurusConfig.theme = config.theme;
		if (config.docsDir) docusaurusConfig.docsDir = config.docsDir;
		if (config.blogDir) docusaurusConfig.blogDir = config.blogDir;
		if (config.staticDir) docusaurusConfig.staticDir = config.staticDir;

		this.config = { ...this.config, ...docusaurusConfig };

		if (this.service) {
			this.service.updateConfig(docusaurusConfig);
		} else {
			this.service = new DocusaurusService(this.config, process.cwd());
			await this.service.initialize();
		}
	}

	/**
	 * Hook llamado antes de hacer deploy
	 */
	async onBeforeDeploy(): Promise<void> {
		if (!this.active || !this.service) {
			return;
		}

		// Build de Docusaurus antes de deploy
		try {
			console.log('📚 Docusaurus Add-on: Haciendo build antes de deploy...');
			await this.service.build();
		} catch (error) {
			console.error('❌ Docusaurus Add-on: Error al hacer build:', error);
		}
	}

	/**
	 * Obtiene los servicios que este add-on proporciona
	 */
	getServices() {
		return {
			// Iniciar servidor de desarrollo
			start: async () => {
				if (!this.service) {
					throw new Error('Docusaurus service no está inicializado');
				}
				return await this.service.start();
			},

			// Detener servidor
			stop: () => {
				if (!this.service) {
					throw new Error('Docusaurus service no está inicializado');
				}
				return this.service.stop();
			},

			// Build estático
			build: async () => {
				if (!this.service) {
					throw new Error('Docusaurus service no está inicializado');
				}
				return await this.service.build();
			},

			// Generar documento
			generateDoc: async (title: string, content: string, id?: string) => {
				if (!this.service) {
					throw new Error('Docusaurus service no está inicializado');
				}
				return await this.service.generateDoc(title, content, id);
			},

			// Generar configuración
			generateConfig: async () => {
				if (!this.service) {
					throw new Error('Docusaurus service no está inicializado');
				}
				return await this.service.generateConfig();
			},

			// Obtener estado
			getStatus: () => {
				if (!this.service) {
					return {
						initialized: false,
						running: false,
						docusaurusInstalled: false,
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
			updateConfig: (config: Partial<DocusaurusConfig>) => {
				if (!this.service) {
					throw new Error('Docusaurus service no está inicializado');
				}
				return this.service.updateConfig(config);
			},
		};
	}
}
