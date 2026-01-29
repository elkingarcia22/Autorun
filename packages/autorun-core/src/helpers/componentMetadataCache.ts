/**
 * Sistema de Caché Inteligente para Metadatos de Componentes
 * 
 * ⭐ OBJETIVO: Unificar y persistir el caché de todos los extractores dinámicos
 * 
 * Este sistema cachea:
 * - Componentes (desde StorybookDynamicMapper)
 * - Variantes (desde DynamicVariantExtractor)
 * - Propiedades (desde DynamicPropertyExtractor)
 * - Tipos (desde DynamicTypeExtractor)
 * 
 * El caché es persistente en archivo para reutilizar entre sesiones.
 */

import { promises as fs } from 'fs';
import { join } from 'path';

export interface ComponentMetadata {
  componentId: string;
  componentName: string;
  variants?: {
    propName: string;
    values: string[];
    description?: string;
  }[];
  properties?: {
    name: string;
    alias: string[];
    type: 'boolean' | 'text' | 'number' | 'enum';
    description?: string;
    defaultValue?: any;
    possibleValues?: string[];
  }[];
  types?: {
    propName: string;
    values: string[];
    description?: string;
    componentSpecific?: boolean;
  }[];
  lastUpdate: number;
}

export interface CacheMetadata {
  version: string;
  lastUpdate: number;
  components: Record<string, ComponentMetadata>;
}

/**
 * Sistema de caché inteligente y persistente
 */
export class ComponentMetadataCache {
  private static memoryCache: Map<string, ComponentMetadata> = new Map();
  private static cacheDir: string = join(process.cwd(), '.autorun', 'cache');
  private static cacheFile: string = join(
    this.cacheDir,
    'component-metadata.json'
  );
  private static readonly CACHE_VERSION = '1.0.0';
  private static readonly CACHE_DURATION = 3600000; // 1 hora
  private static initialized: boolean = false;

  /**
   * Inicializar el sistema de caché
   */
  static async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Crear directorio de caché si no existe
      await fs.mkdir(this.cacheDir, { recursive: true });

      // Cargar caché desde archivo
      await this.loadFromFile();

      this.initialized = true;
      console.log(
        `✅ [Metadata Cache] Sistema de caché inicializado (${this.memoryCache.size} componentes en memoria)`
      );
    } catch (error: any) {
      console.warn(
        `⚠️ [Metadata Cache] Error inicializando caché: ${error.message}`
      );
      // Continuar sin caché persistente
      this.initialized = true;
    }
  }

  /**
   * Cargar caché desde archivo
   */
  private static async loadFromFile(): Promise<void> {
    try {
      const content = await fs.readFile(this.cacheFile, 'utf-8');
      const cacheData: CacheMetadata = JSON.parse(content);

      // Validar versión
      if (cacheData.version !== this.CACHE_VERSION) {
        console.log(
          `🔄 [Metadata Cache] Versión de caché diferente, limpiando...`
        );
        return;
      }

      // Validar antigüedad
      const now = Date.now();
      if (now - cacheData.lastUpdate > this.CACHE_DURATION) {
        console.log(
          `🔄 [Metadata Cache] Caché expirado, limpiando...`
        );
        return;
      }

      // Cargar componentes en memoria
      for (const [key, metadata] of Object.entries(cacheData.components)) {
        // Validar antigüedad de cada componente
        if (now - metadata.lastUpdate <= this.CACHE_DURATION) {
          this.memoryCache.set(key, metadata);
        }
      }

      console.log(
        `📦 [Metadata Cache] Caché cargado desde archivo: ${this.memoryCache.size} componentes válidos`
      );
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        console.warn(
          `⚠️ [Metadata Cache] Error cargando caché: ${error.message}`
        );
      }
      // Archivo no existe, empezar con caché vacío
    }
  }

  /**
   * Guardar caché en archivo
   */
  private static async saveToFile(): Promise<void> {
    try {
      const cacheData: CacheMetadata = {
        version: this.CACHE_VERSION,
        lastUpdate: Date.now(),
        components: {},
      };

      // Convertir Map a objeto
      for (const [key, metadata] of this.memoryCache.entries()) {
        cacheData.components[key] = metadata;
      }

      // Guardar en archivo
      await fs.writeFile(
        this.cacheFile,
        JSON.stringify(cacheData, null, 2),
        'utf-8'
      );

      console.log(
        `💾 [Metadata Cache] Caché guardado en archivo: ${this.memoryCache.size} componentes`
      );
    } catch (error: any) {
      console.warn(
        `⚠️ [Metadata Cache] Error guardando caché: ${error.message}`
      );
    }
  }

  /**
   * Obtener metadatos de un componente
   */
  static async get(
    componentId: string,
    componentName: string
  ): Promise<ComponentMetadata | null> {
    await this.initialize();

    const key = this.getCacheKey(componentId, componentName);
    const cached = this.memoryCache.get(key);

    if (cached) {
      // Validar antigüedad
      const now = Date.now();
      if (now - cached.lastUpdate <= this.CACHE_DURATION) {
        return cached;
      } else {
        // Cache expirado, eliminar
        this.memoryCache.delete(key);
      }
    }

    return null;
  }

  /**
   * Guardar metadatos de un componente
   */
  static async set(
    componentId: string,
    componentName: string,
    metadata: Partial<ComponentMetadata>
  ): Promise<void> {
    await this.initialize();

    const key = this.getCacheKey(componentId, componentName);
    const existing = this.memoryCache.get(key) || {
      componentId,
      componentName,
      lastUpdate: 0,
    };

    // Actualizar metadatos
    const updated: ComponentMetadata = {
      ...existing,
      ...metadata,
      componentId,
      componentName,
      lastUpdate: Date.now(),
    };

    this.memoryCache.set(key, updated);

    // Guardar en archivo (debounced - solo cada 5 segundos)
    this.debouncedSave();
  }

  /**
   * Guardar variantes de un componente
   */
  static async setVariants(
    componentId: string,
    componentName: string,
    variants: ComponentMetadata['variants']
  ): Promise<void> {
    await this.set(componentId, componentName, { variants });
  }

  /**
   * Guardar propiedades de un componente
   */
  static async setProperties(
    componentId: string,
    componentName: string,
    properties: ComponentMetadata['properties']
  ): Promise<void> {
    await this.set(componentId, componentName, { properties });
  }

  /**
   * Guardar tipos de un componente
   */
  static async setTypes(
    componentId: string,
    componentName: string,
    types: ComponentMetadata['types']
  ): Promise<void> {
    await this.set(componentId, componentName, { types });
  }

  /**
   * Obtener variantes desde caché
   */
  static async getVariants(
    componentId: string,
    componentName: string
  ): Promise<ComponentMetadata['variants'] | null> {
    const metadata = await this.get(componentId, componentName);
    return metadata?.variants || null;
  }

  /**
   * Obtener propiedades desde caché
   */
  static async getProperties(
    componentId: string,
    componentName: string
  ): Promise<ComponentMetadata['properties'] | null> {
    const metadata = await this.get(componentId, componentName);
    return metadata?.properties || null;
  }

  /**
   * Obtener tipos desde caché
   */
  static async getTypes(
    componentId: string,
    componentName: string
  ): Promise<ComponentMetadata['types'] | null> {
    const metadata = await this.get(componentId, componentName);
    return metadata?.types || null;
  }

  /**
   * Invalidar caché de un componente específico
   */
  static async invalidate(
    componentId?: string,
    componentName?: string
  ): Promise<void> {
    await this.initialize();

    if (componentId && componentName) {
      const key = this.getCacheKey(componentId, componentName);
      this.memoryCache.delete(key);
      console.log(
        `🔄 [Metadata Cache] Caché invalidado para: ${componentName}`
      );
    } else {
      this.memoryCache.clear();
      console.log('🔄 [Metadata Cache] Caché completamente invalidado');
    }

    // Guardar cambios
    await this.saveToFile();
  }

  /**
   * Limpiar caché expirado
   */
  static async cleanExpired(): Promise<void> {
    await this.initialize();

    const now = Date.now();
    let cleaned = 0;

    for (const [key, metadata] of this.memoryCache.entries()) {
      if (now - metadata.lastUpdate > this.CACHE_DURATION) {
        this.memoryCache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(
        `🧹 [Metadata Cache] ${cleaned} componente(s) expirado(s) eliminado(s)`
      );
      await this.saveToFile();
    }
  }

  /**
   * Obtener estadísticas del caché
   */
  static async getStats(): Promise<{
    total: number;
    valid: number;
    expired: number;
  }> {
    await this.initialize();

    const now = Date.now();
    let valid = 0;
    let expired = 0;

    for (const metadata of this.memoryCache.values()) {
      if (now - metadata.lastUpdate <= this.CACHE_DURATION) {
        valid++;
      } else {
        expired++;
      }
    }

    return {
      total: this.memoryCache.size,
      valid,
      expired,
    };
  }

  /**
   * Generar clave de caché
   */
  private static getCacheKey(
    componentId: string,
    componentName: string
  ): string {
    return `${componentId}-${componentName}`.toLowerCase();
  }

  /**
   * Debounced save (guardar solo cada 5 segundos)
   */
  private static saveTimeout: NodeJS.Timeout | null = null;
  private static debouncedSave(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(async () => {
      await this.saveToFile();
      this.saveTimeout = null;
    }, 5000); // 5 segundos
  }

  /**
   * Forzar guardado inmediato
   */
  static async forceSave(): Promise<void> {
    await this.saveToFile();
  }
}
