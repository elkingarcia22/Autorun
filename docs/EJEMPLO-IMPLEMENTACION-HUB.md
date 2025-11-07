# 💻 Ejemplo de Implementación: Autoframe Hub

Este documento muestra ejemplos prácticos de cómo implementar el Autoframe Hub basado en tu estructura actual.

## 📁 Estructura de Archivos a Crear

```
packages/
└── autoframe-core/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── index.ts                    # Export principal
        ├── AutoframeHub.ts             # Hub principal
        ├── AddonRegistry.ts            # Registro de add-ons
        ├── AddonLoader.ts              # Cargador de add-ons
        ├── ConfigManager.ts            # Gestor de configuración
        └── interfaces/
            ├── IAddon.ts               # Interfaz base
            ├── IComponentAddon.ts      # Para componentes UI
            ├── IFunctionalAddon.ts     # Para add-ons funcionales
            └── IDesignAddon.ts         # Para tokens, templates, etc.
```

---

## 🔌 Interfaces Base

### **IAddon.ts**

```typescript
// packages/autoframe-core/src/interfaces/IAddon.ts

export interface AutoframeContext {
  config: Record<string, any>;
  hub: AutoframeHub;
  emit(event: string, data?: any): Promise<void>;
}

export type AddonType = 'component' | 'functional' | 'design' | 'testing';
export type AddonStatus = 'installed' | 'active' | 'inactive' | 'error';

export interface IAddon {
  // Identificación
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly type: AddonType;
  readonly description: string;
  
  // Dependencias
  readonly dependencies?: string[];
  
  // Ciclo de vida
  initialize(context: AutoframeContext): Promise<void>;
  activate?(): Promise<void>;
  deactivate?(): Promise<void>;
  destroy(): void;
  
  // Configuración
  getConfigSchema?(): Record<string, any>;
  configure(config: Record<string, any>): Promise<void>;
  
  // Estado
  isActive(): boolean;
  getStatus(): AddonStatus;
}
```

### **IFunctionalAddon.ts**

```typescript
// packages/autoframe-core/src/interfaces/IFunctionalAddon.ts

import { IAddon } from './IAddon';

export interface IFunctionalAddon extends IAddon {
  type: 'functional';
  
  // Hooks de eventos
  onFileChange?(filePath: string, content?: string): Promise<void>;
  onBeforeCommit?(files: string[]): Promise<void>;
  onAfterCommit?(commitHash: string): Promise<void>;
  onBeforeDeploy?(): Promise<void>;
  onAfterDeploy?(url: string): Promise<void>;
  onTestRun?(results: any): Promise<void>;
  
  // Servicios que proporciona
  getServices?(): Record<string, (...args: any[]) => any>;
}
```

---

## 🎛️ AutoframeHub.ts

```typescript
// packages/autoframe-core/src/AutoframeHub.ts

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

  constructor(configPath: string = '.ubits/project-config.json') {
    this.configManager = new ConfigManager(configPath);
    this.registry = new AddonRegistry();
    this.loader = new AddonLoader();
    
    // Crear contexto
    this.context = {
      config: {},
      hub: this,
      emit: this.emitEvent.bind(this)
    };
  }

  /**
   * Inicializa el hub y carga los add-ons configurados
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      throw new Error('Hub ya está inicializado');
    }

    const config = await this.configManager.load();
    this.context.config = config;
    
    const activeAddonIds = config.autoframe?.addons?.active || [];
    
    console.log(`🚀 Inicializando Autoframe Hub...`);
    console.log(`📦 Add-ons a cargar: ${activeAddonIds.length}`);

    // Cargar add-ons en orden de dependencias
    await this.loadAddons(activeAddonIds);
    
    this.initialized = true;
    console.log(`✅ Autoframe Hub inicializado`);
  }

  /**
   * Carga y activa una lista de add-ons
   */
  private async loadAddons(addonIds: string[]): Promise<void> {
    // Resolver orden de dependencias
    const orderedIds = this.resolveDependencies(addonIds);
    
    for (const addonId of orderedIds) {
      try {
        await this.activateAddon(addonId);
      } catch (error) {
        console.error(`❌ Error cargando add-on ${addonId}:`, error);
      }
    }
  }

  /**
   * Resuelve el orden de carga basado en dependencias
   */
  private resolveDependencies(addonIds: string[]): string[] {
    const ordered: string[] = [];
    const visited = new Set<string>();
    
    const visit = (id: string) => {
      if (visited.has(id)) return;
      
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
   */
  async registerAddon(addonPath: string): Promise<void> {
    const addon = await this.loader.load(addonPath);
    this.registry.register(addon);
    console.log(`📦 Add-on registrado: ${addon.name} (${addon.id})`);
  }

  /**
   * Activa un add-on
   */
  async activateAddon(addonId: string): Promise<void> {
    if (this.activeAddons.has(addonId)) {
      console.log(`⚠️  Add-on ${addonId} ya está activo`);
      return;
    }

    let addon = this.registry.get(addonId);
    
    // Si no está registrado, intentar cargarlo
    if (!addon) {
      const addonPath = this.getAddonPath(addonId);
      if (addonPath) {
        addon = await this.loader.load(addonPath);
        this.registry.register(addon);
      } else {
        throw new Error(`Add-on ${addonId} no encontrado`);
      }
    }

    // Verificar dependencias
    await this.checkDependencies(addon);

    // Inicializar
    await addon.initialize(this.context);

    // Activar
    if (addon.activate) {
      await addon.activate();
    }

    this.activeAddons.set(addonId, addon);
    
    // Guardar en configuración
    await this.configManager.addAddon(addonId);
    
    console.log(`✅ Add-on activado: ${addon.name}`);
  }

  /**
   * Desactiva un add-on
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
   * Verifica que las dependencias estén satisfechas
   */
  private async checkDependencies(addon: IAddon): Promise<void> {
    if (!addon.dependencies || addon.dependencies.length === 0) {
      return;
    }

    for (const depId of addon.dependencies) {
      const depAddon = this.activeAddons.get(depId);
      if (!depAddon || !depAddon.isActive()) {
        throw new Error(
          `Add-on ${addon.id} requiere ${depId} pero no está activo`
        );
      }
    }
  }

  /**
   * Obtiene la ruta de un add-on desde la configuración
   */
  private getAddonPath(addonId: string): string | null {
    const config = this.context.config;
    const addonConfig = config.autoframe?.addons?.config?.[addonId];
    return addonConfig?.source || null;
  }

  /**
   * Emite un evento a todos los add-ons funcionales activos
   */
  async emitEvent(event: string, data?: any): Promise<void> {
    const eventMethod = `on${event.charAt(0).toUpperCase() + event.slice(1)}`;
    
    for (const addon of this.activeAddons.values()) {
      if (addon.type === 'functional') {
        const functionalAddon = addon as IFunctionalAddon;
        const handler = (functionalAddon as any)[eventMethod];
        
        if (typeof handler === 'function') {
          try {
            await handler.call(functionalAddon, data);
          } catch (error) {
            console.error(
              `Error en add-on ${addon.id} manejando evento ${event}:`,
              error
            );
          }
        }
      }
    }
  }

  /**
   * Obtiene todos los add-ons disponibles
   */
  getAvailableAddons(): IAddon[] {
    return this.registry.getAll();
  }

  /**
   * Obtiene los add-ons activos
   */
  getActiveAddons(): IAddon[] {
    return Array.from(this.activeAddons.values());
  }

  /**
   * Obtiene un add-on activo por ID
   */
  getAddon(addonId: string): IAddon | undefined {
    return this.activeAddons.get(addonId);
  }

  /**
   * Obtiene un servicio de un add-on funcional
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
}
```

---

## 📦 AddonRegistry.ts

```typescript
// packages/autoframe-core/src/AddonRegistry.ts

import { IAddon } from './interfaces/IAddon';

export class AddonRegistry {
  private addons: Map<string, IAddon> = new Map();

  /**
   * Registra un add-on
   */
  register(addon: IAddon): void {
    if (this.addons.has(addon.id)) {
      throw new Error(`Add-on ${addon.id} ya está registrado`);
    }
    this.addons.set(addon.id, addon);
  }

  /**
   * Obtiene un add-on por ID
   */
  get(addonId: string): IAddon | undefined {
    return this.addons.get(addonId);
  }

  /**
   * Obtiene todos los add-ons registrados
   */
  getAll(): IAddon[] {
    return Array.from(this.addons.values());
  }

  /**
   * Verifica si un add-on está registrado
   */
  has(addonId: string): boolean {
    return this.addons.has(addonId);
  }

  /**
   * Remueve un add-on del registro
   */
  unregister(addonId: string): void {
    this.addons.delete(addonId);
  }
}
```

---

## 🔄 AddonLoader.ts

```typescript
// packages/autoframe-core/src/AddonLoader.ts

import { IAddon } from './interfaces/IAddon';
import * as fs from 'fs/promises';
import * as path from 'path';

export class AddonLoader {
  /**
   * Carga un add-on desde una ruta
   */
  async load(addonPath: string): Promise<IAddon> {
    // Leer manifest
    const manifestPath = path.join(addonPath, 'manifest.json');
    const manifest = JSON.parse(
      await fs.readFile(manifestPath, 'utf-8')
    );

    // Cargar módulo principal
    const modulePath = path.join(addonPath, manifest.main || 'dist/index.js');
    
    // Dynamic import (en Node.js o bundler)
    const module = await import(modulePath);
    
    // Instanciar add-on
    const AddonClass = module.default || module[manifest.export || 'default'];
    if (!AddonClass) {
      throw new Error(`No se pudo encontrar la clase del add-on en ${modulePath}`);
    }

    const addon = new AddonClass();
    
    // Validar que implementa IAddon
    if (!this.isValidAddon(addon)) {
      throw new Error(`Add-on en ${addonPath} no implementa IAddon correctamente`);
    }

    return addon;
  }

  /**
   * Valida que un objeto implementa IAddon
   */
  private isValidAddon(obj: any): obj is IAddon {
    return (
      typeof obj.id === 'string' &&
      typeof obj.name === 'string' &&
      typeof obj.version === 'string' &&
      typeof obj.type === 'string' &&
      typeof obj.initialize === 'function' &&
      typeof obj.destroy === 'function' &&
      typeof obj.isActive === 'function'
    );
  }
}
```

---

## ⚙️ ConfigManager.ts

```typescript
// packages/autoframe-core/src/ConfigManager.ts

import * as fs from 'fs/promises';
import * as path from 'path';

export class ConfigManager {
  private configPath: string;
  private config: any = null;

  constructor(configPath: string) {
    this.configPath = configPath;
  }

  /**
   * Carga la configuración desde el archivo
   */
  async load(): Promise<any> {
    if (this.config) {
      return this.config;
    }

    try {
      const content = await fs.readFile(this.configPath, 'utf-8');
      this.config = JSON.parse(content);
      return this.config;
    } catch (error) {
      // Si no existe, crear configuración por defecto
      this.config = {
        autoframe: {
          version: '1.0.0',
          addons: {
            active: [],
            config: {}
          }
        }
      };
      await this.save();
      return this.config;
    }
  }

  /**
   * Guarda la configuración
   */
  async save(): Promise<void> {
    const dir = path.dirname(this.configPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      this.configPath,
      JSON.stringify(this.config, null, 2),
      'utf-8'
    );
  }

  /**
   * Agrega un add-on a la lista de activos
   */
  async addAddon(addonId: string): Promise<void> {
    await this.load();
    
    if (!this.config.autoframe) {
      this.config.autoframe = {
        version: '1.0.0',
        addons: { active: [], config: {} }
      };
    }
    
    if (!this.config.autoframe.addons.active.includes(addonId)) {
      this.config.autoframe.addons.active.push(addonId);
      await this.save();
    }
  }

  /**
   * Remueve un add-on de la lista de activos
   */
  async removeAddon(addonId: string): Promise<void> {
    await this.load();
    
    if (this.config.autoframe?.addons?.active) {
      const index = this.config.autoframe.addons.active.indexOf(addonId);
      if (index > -1) {
        this.config.autoframe.addons.active.splice(index, 1);
        await this.save();
      }
    }
  }

  /**
   * Obtiene la configuración de un add-on específico
   */
  getAddonConfig(addonId: string): any {
    return this.config?.autoframe?.addons?.config?.[addonId] || {};
  }
}
```

---

## 🔧 Ejemplo: GitHub Add-on

```typescript
// packages/addons/functional/github/src/GitHubAddon.ts

import { IFunctionalAddon, AutoframeContext } from '@autoframe/core';
import { AutoCommitService } from './AutoCommitService';

export class GitHubAddon implements IFunctionalAddon {
  readonly id = 'github';
  readonly name = 'GitHub Integration';
  readonly version = '1.0.0';
  readonly type = 'functional';
  readonly description = 'Auto-commit y gestión de repositorio GitHub';
  
  private autoCommitService?: AutoCommitService;
  private active = false;
  private config: any = {};

  async initialize(context: AutoframeContext): Promise<void> {
    this.config = context.config.autoframe?.addons?.config?.github || {};
    
    if (this.config.enabled !== false) {
      this.autoCommitService = new AutoCommitService({
        branch: this.config.branch || 'main',
        commitMessage: this.config.commitMessage || 'Auto-commit: {file}',
        autoCommit: this.config.autoCommit !== false
      });
    }
  }

  async activate(): Promise<void> {
    if (this.config.enabled === false) {
      return;
    }

    this.active = true;
    
    if (this.autoCommitService) {
      await this.autoCommitService.start();
      console.log('✅ GitHub Add-on: Auto-commit activado');
    }
  }

  async deactivate(): Promise<void> {
    this.active = false;
    
    if (this.autoCommitService) {
      await this.autoCommitService.stop();
      console.log('🔌 GitHub Add-on: Auto-commit desactivado');
    }
  }

  async onFileChange(filePath: string): Promise<void> {
    if (!this.active || !this.autoCommitService) {
      return;
    }

    // Esperar un poco para agrupar cambios
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await this.autoCommitService.handleFileChange(filePath);
  }

  async onBeforeCommit(files: string[]): Promise<void> {
    // Validar archivos antes de commit
    console.log(`📝 GitHub Add-on: Preparando commit de ${files.length} archivos`);
  }

  async onAfterCommit(commitHash: string): Promise<void> {
    console.log(`✅ GitHub Add-on: Commit realizado: ${commitHash}`);
  }

  isActive(): boolean {
    return this.active;
  }

  getStatus(): 'active' | 'inactive' {
    return this.active ? 'active' : 'inactive';
  }

  destroy(): void {
    this.autoCommitService?.stop();
    this.active = false;
  }

  getServices() {
    return {
      commit: async (message: string) => {
        return this.autoCommitService?.commit(message);
      },
      push: async () => {
        return this.autoCommitService?.push();
      }
    };
  }
}
```

---

## 🚀 Uso en la Aplicación

```typescript
// packages/playground-app/autoframe-init.js

import { AutoframeHub } from '@autoframe/core';

// Inicializar hub
const hub = new AutoframeHub('.ubits/project-config.json');
await hub.initialize();

// El hub ahora está orquestando todos los add-ons activos
// Los eventos se manejan automáticamente

// Ejemplo: Detectar cambios de archivos
import chokidar from 'chokidar';

const watcher = chokidar.watch('packages/**/*.{ts,tsx,js,jsx}', {
  ignored: /node_modules|dist/
});

watcher.on('change', async (filePath) => {
  // Emitir evento - todos los add-ons funcionales lo reciben
  await hub.emitEvent('fileChange', filePath);
});

// Obtener servicio de un add-on
const commitService = hub.getService('github', 'commit');
if (commitService) {
  await commitService('Commit manual desde la app');
}
```

---

## ✅ Resumen

Este ejemplo muestra cómo:

1. ✅ **AutoframeHub** orquesta todos los add-ons
2. ✅ **Interfaces unificadas** para diferentes tipos de add-ons
3. ✅ **Sistema de eventos** para comunicación entre add-ons
4. ✅ **Gestión de dependencias** automática
5. ✅ **Configuración centralizada** pero flexible

**Tu estructura actual puede evolucionar a esto sin romper nada existente.**

