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
import {
  getConflictDetector,
  AddonConflictError,
} from './AddonConflictDetector';
import { FileWatcher } from './core/FileWatcher';
import * as path from 'path';
import * as fs from 'fs';
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
  private fileWatcher?: FileWatcher;

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
      // ⭐ OPTIMIZACIÓN: Cargar add-ons bajo demanda o solo los esenciales al inicio
      // Para evitar timeouts en implementaciones, solo cargamos los críticos
      const essentialAddons = [
        'storybook',
        'pre-implementation-check',
        'auto-reload',
      ];
      const addonsToLoad =
        process.env.AUTORUN_MINIMAL === 'true'
          ? activeAddonIds.filter((id) => essentialAddons.includes(id))
          : activeAddonIds;

      if (process.env.AUTORUN_MINIMAL === 'true') {
        console.log(
          `🚀 [AutorunHub] Modo MINIMAL activo. Cargando solo ${addonsToLoad.length} add-ons esenciales.`
        );
      }

      await this.loadAddons(addonsToLoad);
    }

    // Inicializar file watching si está habilitado
    const enableFileWatching = config.autorun?.fileWatching?.enabled !== false;
    if (enableFileWatching) {
      this.startFileWatching(config.autorun?.fileWatching);
    }

    // ⭐ NUEVO: Ejecutar pruebas de Storybook Implementation (opcional, no bloquea)
    if (
      config.autorun?.testStorybookImplementation !== false &&
      process.env.AUTORUN_MINIMAL !== 'true'
    ) {
      try {
        const { runQuickTest } = await import(
          './helpers/storybookImplementationTester'
        );
        // Ejecutar en background para no bloquear inicialización
        setTimeout(async () => {
          const testPassed = await runQuickTest();
          if (testPassed) {
            console.log(
              '✅ [AutorunHub] Pruebas de Storybook Implementation: OK'
            );
          } else {
            console.warn(
              '⚠️ [AutorunHub] Pruebas de Storybook Implementation: Algunas fallaron (ver logs arriba)'
            );
          }
        }, 1000); // Esperar 1 segundo para no bloquear
      } catch (error: any) {
        // No bloquear si falla
        console.warn(
          `⚠️ [AutorunHub] No se pudieron ejecutar pruebas de Storybook Implementation: ${error.message}`
        );
      }
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
    const conflicts = conflictDetector.checkMultipleConflicts(
      addonIds,
      activeAddonIds
    );

    if (conflicts.length > 0) {
      // Mostrar todos los conflictos encontrados
      console.error('\n❌ Se detectaron conflictos entre add-ons:\n');
      for (const conflict of conflicts) {
        const errorMessage = conflictDetector.generateErrorMessage(
          conflict.addonId,
          conflict.conflict,
          conflict.conflictingAddon
        );
        console.error(errorMessage);
      }
      throw new Error(
        `No se pueden activar add-ons con conflictos. Revisa los mensajes arriba.`
      );
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
        // ⚠️ Si el add-on no se encuentra, solo mostrar warning (no error)
        // Esto permite que el wizard guarde add-ons que pueden no estar compilados todavía
        if (error instanceof AddonNotFoundError) {
          console.warn(
            `⚠️  Add-on ${addonId} no encontrado (puede no estar compilado o no estar disponible)`
          );
        } else {
          console.error(`❌ Error cargando add-on ${addonId}:`, error);
        }
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
        conflict.conflictingAddon
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
            error.message || 'Error desconocido al cargar'
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
        error.message || 'Error desconocido al inicializar'
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
        throw new AddonActivationError(
          addonId,
          error.message || 'Error desconocido al activar'
        );
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
    console.log('\n📡 [AutorunHub] ========================================');
    console.log(`📡 [AutorunHub] Emitiendo evento '${event}'`);
    console.log(
      `📡 [AutorunHub] Datos: ${typeof data === 'string' ? data : JSON.stringify(data).substring(0, 100)}`
    );
    console.log(`📡 [AutorunHub] Add-ons activos: ${this.activeAddons.size}`);

    // Convertir nombre del evento a nombre del método
    // Ej: 'fileChange' -> 'onFileChange'
    const eventMethod = `on${event.charAt(0).toUpperCase() + event.slice(1)}`;
    console.log(
      `🔍 [AutorunHub] Buscando método '${eventMethod}' en add-ons funcionales`
    );

    let handlersFound = 0;
    for (const addon of this.activeAddons.values()) {
      if (addon.type === 'functional') {
        const functionalAddon = addon as IFunctionalAddon;
        const handler = (functionalAddon as any)[eventMethod];

        if (typeof handler === 'function') {
          handlersFound++;
          console.log(
            `✅ [AutorunHub] Handler encontrado en add-on '${addon.id}' (${addon.name})`
          );
          try {
            // Para fileChange, pasar filePath como primer argumento
            if (event === 'fileChange' && typeof data === 'string') {
              console.log(
                `📞 [AutorunHub] Llamando ${eventMethod} en add-on '${addon.id}' con filePath: ${data}`
              );
              await handler.call(functionalAddon, data);
              console.log(
                `✅ [AutorunHub] Handler ejecutado correctamente en add-on '${addon.id}'`
              );
            } else {
              console.log(
                `📞 AutorunHub: Llamando ${eventMethod} en add-on '${addon.id}'`
              );
              await handler.call(functionalAddon, data);
            }
            console.log(
              `✅ AutorunHub: Handler en add-on '${addon.id}' completado`
            );
          } catch (error) {
            console.error(
              `❌ Error en add-on ${addon.id} manejando evento ${event}:`,
              error
            );
          }
        } else {
          console.log(
            `⏭️ AutorunHub: Add-on '${addon.id}' no tiene método '${eventMethod}'`
          );
        }
      }
    }

    console.log(
      `📊 AutorunHub: Evento '${event}' procesado - ${handlersFound} handler(s) ejecutado(s)`
    );
  }

  /**
   * Inicia el file watching para detectar cambios en archivos
   * @param options Opciones de configuración del file watching
   */
  private startFileWatching(options?: any): void {
    try {
      const watchPaths = options?.paths || ['prototypes/', 'src/'];
      const ignored = options?.ignored || [
        'node_modules/',
        '.git/',
        'dist/',
        '.next/',
      ];
      const debounceMs = options?.debounceMs || 300;

      console.log('\n🔍 [AutorunHub] ========================================');
      console.log('🔍 [AutorunHub] Iniciando file watching...');
      console.log(`🔍 [AutorunHub] Paths a observar: ${watchPaths.join(', ')}`);
      console.log(`🔍 [AutorunHub] Ignorados: ${ignored.join(', ')}`);
      console.log(`🔍 [AutorunHub] Debounce: ${debounceMs}ms`);

      // Resolver rutas absolutas
      const projectRoot = process.cwd();
      const absolutePaths = watchPaths.map((p: string) =>
        path.resolve(projectRoot, p)
      );

      console.log(
        `🔍 [AutorunHub] Rutas absolutas: ${absolutePaths.join(', ')}`
      );

      // Verificar que los directorios existen
      for (const absPath of absolutePaths) {
        if (!fs.existsSync(absPath)) {
          console.warn(`⚠️ [AutorunHub] Directorio no existe: ${absPath}`);
        } else {
          console.log(`✅ [AutorunHub] Directorio existe: ${absPath}`);
        }
      }

      this.fileWatcher = new FileWatcher({
        watchPaths: absolutePaths,
        ignored,
        debounceMs,
      });

      this.fileWatcher.start((filePath: string) => {
        console.log(
          '\n📥 [AutorunHub] ========================================'
        );
        console.log(
          `📥 [AutorunHub] FileWatcher callback recibido para: ${filePath}`
        );
        console.log(
          `📥 [AutorunHub] Emitiendo evento 'fileChange' a todos los add-ons...`
        );

        // Emitir evento fileChange a todos los add-ons
        this.emitEvent('fileChange', filePath);

        console.log(
          `✅ [AutorunHub] Evento 'fileChange' emitido correctamente`
        );
        console.log(
          '📥 [AutorunHub] ========================================\n'
        );
      });

      console.log('✅ [AutorunHub] File watching iniciado correctamente');
      console.log('🔍 [AutorunHub] ========================================\n');
    } catch (error) {
      console.error(
        '\n❌ [AutorunHub] ========================================'
      );
      console.error('❌ [AutorunHub] Error iniciando file watching:', error);
      console.error(
        '❌ [AutorunHub] ========================================\n'
      );
    }
  }

  /**
   * Detiene el file watching
   */
  stopFileWatching(): void {
    if (this.fileWatcher) {
      this.fileWatcher.stop();
      this.fileWatcher = undefined;
      console.log('🛑 AutorunHub: File watching detenido');
    }
  }

  /**
   * Verifica si el file watching está activo
   */
  isFileWatchingActive(): boolean {
    return this.fileWatcher !== undefined;
  }

  /**
   * Obtiene información del estado del file watching
   */
  getFileWatchingStatus(): {
    active: boolean;
    watchedPaths?: string[];
  } {
    if (!this.fileWatcher) {
      return { active: false };
    }

    return {
      active: true,
      watchedPaths: this.fileWatcher.getWatchedPaths?.() || [],
    };
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
      throw new HubNotInitializedError(
        `getService('${addonId}', '${serviceName}')`
      );
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
