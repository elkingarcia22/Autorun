/**
 * AutorunHub
 *
 * Hub central que orquestra todos los add-ons del sistema.
 * Es el punto de entrada principal para gestionar add-ons.
 */

import { IAddon, AutorunContext, AddonStatus } from './interfaces/IAddon';
import { IFunctionalAddon } from './interfaces/IFunctionalAddon';
import { AddonRegistry } from './AddonRegistry';
import { AddonLoader } from './AddonLoader';
import { ConfigManager } from './ConfigManager';
import { getConflictDetector, AddonConflictError } from './AddonConflictDetector';
import {
	HubNotInitializedError,
	HubAlreadyInitializedError,
	AddonNotFoundError,
	AddonLoadError,
	MissingDependencyError,
	AddonInitializationError,
	AddonActivationError,
	ServiceNotFoundError,
} from './errors/AutorunErrors';

export class AutorunHub {
	private registry: AddonRegistry;
	private loader: AddonLoader;
	private configManager: ConfigManager;
	private activeAddons: Map<string, IAddon> = new Map();
	private context: AutorunContext;
	private initialized = false;

	/**
	 * Crea una instancia de AutorunHub
	 * @param configPath Ruta al archivo de configuración
	 */
	constructor(configPath: string = '.ubits/project-config.json') {
		this.configManager = new ConfigManager(configPath);
		this.registry = new AddonRegistry();
		this.loader = new AddonLoader();

		// Crear contexto (hub se asignará después para evitar dependencia circular)
		this.context = {
			config: {},
			hub: this as any,
			emit: this.emitEvent.bind(this),
		};
	}

	/**
	 * Inicializa el hub y carga los add-ons configurados
	 * @throws Error si el hub ya está inicializado
	 */
	async initialize(): Promise<void> {
		if (this.initialized) {
			throw new HubAlreadyInitializedError();
		}

		// Cargar configuración
		const config = await this.configManager.load();
		this.context.config = config;

		// Obtener lista de add-ons activos desde la configuración
		const activeAddonIds = config.autorun?.addons?.active || [];

		if (activeAddonIds.length > 0) {
			// Cargar y activar add-ons en orden de dependencias
			await this.loadAddons(activeAddonIds);
		}

		this.initialized = true;
	}

	/**
	 * Carga y activa una lista de add-ons
	 * @param addonIds Lista de IDs de add-ons a cargar
	 * @private
	 */
	private async loadAddons(addonIds: string[]): Promise<void> {
		// Verificar conflictos entre los add-ons a cargar
		const conflictDetector = getConflictDetector();
		const activeAddonIds = Array.from(this.activeAddons.keys());
		const conflicts = conflictDetector.checkMultipleConflicts(addonIds, activeAddonIds);

		if (conflicts.length > 0) {
			// Mostrar todos los conflictos encontrados
			console.error('\n❌ Se detectaron conflictos entre add-ons:\n');
			for (const conflict of conflicts) {
				const errorMessage = conflictDetector.generateErrorMessage(
					conflict.addonId,
					conflict.conflict,
					conflict.conflictingAddon,
				);
				console.error(errorMessage);
			}
			throw new Error(`No se pueden activar add-ons con conflictos. Revisa los mensajes arriba.`);
		}

		// Resolver orden de dependencias
		const orderedIds = this.resolveDependencies(addonIds);

		for (const addonId of orderedIds) {
			try {
				await this.activateAddon(addonId);
			} catch (error) {
				if (error instanceof AddonConflictError) {
					// Re-lanzar errores de conflicto sin modificar
					throw error;
				}
				console.error(`❌ Error cargando add-on ${addonId}:`, error);
				// Continuar con los demás add-ons aunque uno falle (excepto conflictos)
			}
		}
	}

	/**
	 * Resuelve el orden de carga basado en dependencias
	 * @param addonIds Lista de IDs de add-ons
	 * @returns Lista ordenada por dependencias
	 * @private
	 */
	private resolveDependencies(addonIds: string[]): string[] {
		const ordered: string[] = [];
		const visited = new Set<string>();

		const visit = (id: string) => {
			if (visited.has(id)) return;

			// Buscar add-on en el registro (si ya está registrado)
			const addon = this.registry.get(id);
			if (addon?.dependencies) {
				for (const dep of addon.dependencies) {
					if (addonIds.includes(dep)) {
						visit(dep);
					}
				}
			}

			visited.add(id);
			if (addonIds.includes(id)) {
				ordered.push(id);
			}
		};

		for (const id of addonIds) {
			visit(id);
		}

		return ordered;
	}

	/**
	 * Registra un add-on disponible (descubrimiento)
	 * @param addonPath Ruta al directorio del add-on
	 */
	async registerAddon(addonPath: string): Promise<void> {
		const addon = await this.loader.load(addonPath);
		this.registry.register(addon);
		console.log(`📦 Add-on registrado: ${addon.name} (${addon.id})`);
	}

	/**
	 * Activa un add-on
	 * @param addonId ID del add-on a activar
	 * @throws Error si el add-on no se encuentra, hay conflictos o no se puede activar
	 */
	async activateAddon(addonId: string): Promise<void> {
		if (this.activeAddons.has(addonId)) {
			console.log(`⚠️  Add-on ${addonId} ya está activo`);
			return;
		}

		// Verificar conflictos con add-ons ya activos
		const activeAddonIds = Array.from(this.activeAddons.keys());
		const conflictDetector = getConflictDetector();
		const conflict = conflictDetector.checkConflict(addonId, activeAddonIds);

		if (conflict) {
			const errorMessage = conflictDetector.generateErrorMessage(
				addonId,
				conflict.conflict,
				conflict.conflictingAddon,
			);
			throw new AddonConflictError(errorMessage, {
				addonId,
				conflictingAddon: conflict.conflictingAddon,
				conflictGroup: conflict.conflict,
			});
		}

		let addon = this.registry.get(addonId);

		// Si no está registrado, intentar cargarlo desde la configuración
		if (!addon) {
			const addonPath = this.getAddonPath(addonId);
			if (addonPath) {
				try {
					addon = await this.loader.load(addonPath);
					this.registry.register(addon);
				} catch (error: any) {
					throw new AddonLoadError(
						addonId,
						addonPath,
						error.message || 'Error desconocido al cargar',
					);
				}
			} else {
				const availableAddons = this.registry.getAll().map((a) => a.id);
				throw new AddonNotFoundError(addonId, availableAddons);
			}
		}

		// Verificar dependencias
		await this.checkDependencies(addon);

		// Inicializar
		try {
			await addon.initialize(this.context);
		} catch (error: any) {
			throw new AddonInitializationError(
				addonId,
				error.message || 'Error desconocido al inicializar',
			);
		}

		// Configurar si hay configuración específica
		const addonConfig = this.configManager.getAddonConfig(addonId);
		if (addonConfig && Object.keys(addonConfig).length > 0) {
			await addon.configure(addonConfig);
		}

		// Activar
		if (addon.activate) {
			try {
				await addon.activate();
			} catch (error: any) {
				throw new AddonActivationError(addonId, error.message || 'Error desconocido al activar');
			}
		}

		this.activeAddons.set(addonId, addon);

		// Guardar en configuración
		await this.configManager.addAddon(addonId);

		console.log(`✅ Add-on activado: ${addon.name}`);
	}

	/**
	 * Verifica que las dependencias estén satisfechas
	 * @param addon Add-on a verificar
	 * @throws Error si faltan dependencias
	 * @private
	 */
	private async checkDependencies(addon: IAddon): Promise<void> {
		if (!addon.dependencies || addon.dependencies.length === 0) {
			return;
		}

		const missingDeps: string[] = [];
		for (const depId of addon.dependencies) {
			const depAddon = this.activeAddons.get(depId);
			if (!depAddon || !depAddon.isActive()) {
				missingDeps.push(depId);
			}
		}

		if (missingDeps.length > 0) {
			throw new MissingDependencyError(addon.id, missingDeps);
		}
	}

	/**
	 * Obtiene la ruta de un add-on desde la configuración
	 * @param addonId ID del add-on
	 * @returns Ruta del add-on o null
	 * @private
	 */
	private getAddonPath(addonId: string): string | null {
		const config = this.context.config;
		const addonConfig = config.autorun?.addons?.config?.[addonId];
		return addonConfig?.source || null;
	}

	/**
	 * Desactiva un add-on
	 * @param addonId ID del add-on a desactivar
	 */
	async deactivateAddon(addonId: string): Promise<void> {
		const addon = this.activeAddons.get(addonId);
		if (!addon) {
			console.log(`⚠️  Add-on ${addonId} no está activo`);
			return;
		}

		if (addon.deactivate) {
			await addon.deactivate();
		}

		this.activeAddons.delete(addonId);
		await this.configManager.removeAddon(addonId);

		console.log(`🔌 Add-on desactivado: ${addon.name}`);
	}

	/**
	 * Emite un evento a todos los add-ons funcionales activos
	 * @param event Nombre del evento (ej: 'fileChange', 'beforeCommit')
	 * @param data Datos del evento (opcional)
	 */
	async emitEvent(event: string, data?: any): Promise<void> {
		// Convertir nombre del evento a nombre del método
		// Ej: 'fileChange' -> 'onFileChange'
		const eventMethod = `on${event.charAt(0).toUpperCase() + event.slice(1)}`;

		for (const addon of this.activeAddons.values()) {
			if (addon.type === 'functional') {
				const functionalAddon = addon as IFunctionalAddon;
				const handler = (functionalAddon as any)[eventMethod];

				if (typeof handler === 'function') {
					try {
						await handler.call(functionalAddon, data);
					} catch (error) {
						console.error(`Error en add-on ${addon.id} manejando evento ${event}:`, error);
					}
				}
			}
		}
	}

	/**
	 * Obtiene todos los add-ons disponibles
	 * @returns Array de add-ons registrados
	 */
	getAvailableAddons(): IAddon[] {
		return this.registry.getAll();
	}

	/**
	 * Obtiene los add-ons activos
	 * @returns Array de add-ons activos
	 */
	getActiveAddons(): IAddon[] {
		return Array.from(this.activeAddons.values());
	}

	/**
	 * Obtiene un add-on activo por ID
	 * @param addonId ID del add-on
	 * @returns Add-on encontrado o undefined
	 */
	getAddon(addonId: string): IAddon | undefined {
		return this.activeAddons.get(addonId);
	}

	/**
	 * Obtiene un servicio de un add-on funcional
	 * @param addonId ID del add-on
	 * @param serviceName Nombre del servicio
	 * @returns Función del servicio o null
	 */
	getService(addonId: string, serviceName: string): Function | null {
		if (!this.initialized) {
			throw new HubNotInitializedError(`getService('${addonId}', '${serviceName}')`);
		}

		const addon = this.activeAddons.get(addonId);
		if (!addon) {
			throw new AddonNotFoundError(addonId);
		}

		if (addon.type !== 'functional') {
			throw new ServiceNotFoundError(addonId, serviceName);
		}

		const functionalAddon = addon as IFunctionalAddon;
		const services = functionalAddon.getServices?.() || {};
		const service = services[serviceName];

		if (!service) {
			const availableServices = Object.keys(services);
			throw new ServiceNotFoundError(addonId, serviceName);
		}

		return service;
	}

	/**
	 * Verifica si el hub está inicializado
	 * @returns true si está inicializado
	 */
	isInitialized(): boolean {
		return this.initialized;
	}
}
