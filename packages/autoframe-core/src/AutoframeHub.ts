/**
 * AutoframeHub
 * 
 * Hub central que orquestra todos los add-ons del sistema.
 * Es el punto de entrada principal para gestionar add-ons.
 */

import { IAddon, AutoframeContext, AddonStatus } from './interfaces/IAddon';
import { IFunctionalAddon } from './interfaces/IFunctionalAddon';
import { AddonRegistry } from './AddonRegistry';
import { AddonLoader } from './AddonLoader';
import { ConfigManager } from './ConfigManager';

export class AutoframeHub {
  private registry: AddonRegistry;
  private loader: AddonLoader;
  private configManager: ConfigManager;
  private activeAddons: Map<string, IAddon> = new Map();
  private context: AutoframeContext;
  private initialized = false;

  /**
   * Crea una instancia de AutoframeHub
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
      emit: this.emitEvent.bind(this)
    };
  }

  /**
   * Inicializa el hub y carga los add-ons configurados
   * @throws Error si el hub ya está inicializado
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      throw new Error('Hub ya está inicializado');
    }

    // TODO: Implementar inicialización
    // Por ahora solo estructura vacía
    
    this.initialized = true;
  }

  /**
   * Registra un add-on disponible (descubrimiento)
   * @param addonPath Ruta al directorio del add-on
   */
  async registerAddon(addonPath: string): Promise<void> {
    // TODO: Implementar registro
    throw new Error('AutoframeHub.registerAddon() no implementado todavía');
  }

  /**
   * Activa un add-on
   * @param addonId ID del add-on a activar
   * @throws Error si el add-on no se encuentra o no se puede activar
   */
  async activateAddon(addonId: string): Promise<void> {
    // TODO: Implementar activación
    throw new Error('AutoframeHub.activateAddon() no implementado todavía');
  }

  /**
   * Desactiva un add-on
   * @param addonId ID del add-on a desactivar
   */
  async deactivateAddon(addonId: string): Promise<void> {
    // TODO: Implementar desactivación
    throw new Error('AutoframeHub.deactivateAddon() no implementado todavía');
  }

  /**
   * Emite un evento a todos los add-ons funcionales activos
   * @param event Nombre del evento
   * @param data Datos del evento (opcional)
   */
  async emitEvent(event: string, data?: any): Promise<void> {
    // TODO: Implementar sistema de eventos
    // Por ahora solo estructura vacía
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
    const addon = this.activeAddons.get(addonId);
    if (!addon || addon.type !== 'functional') {
      return null;
    }

    const functionalAddon = addon as IFunctionalAddon;
    const services = functionalAddon.getServices?.() || {};
    return services[serviceName] || null;
  }

  /**
   * Verifica si el hub está inicializado
   * @returns true si está inicializado
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

