/**
 * Generador dinámico de mapeos desde Storybook index.json
 *
 * ⭐ OBJETIVO: Eliminar TODO el hardcodeo de mapeos
 * Todo se extrae dinámicamente desde index.json de Storybook
 */

import { StorybookManager } from './storybookManager';

export interface ComponentMapping {
  componentId: string; // ID en Storybook (ej: "formularios-radio-button")
  fullName: string; // Nombre completo (ej: "Formularios/Radio Button")
  shortName: string; // Nombre corto (ej: "Radio Button")
  pascalCase: string; // PascalCase (ej: "RadioButton")
  camelCase: string; // camelCase (ej: "radioButton")
  kebabCase: string; // kebab-case (ej: "radio-button")
}

interface MappingCache {
  mappings: ComponentMapping[];
  idToName: Record<string, string>;
  nameToId: Record<string, string>;
  shortNameToFullName: Record<string, string>;
  pascalCaseToFullName: Record<string, string>;
  camelCaseToFullName: Record<string, string>;
  kebabCaseToFullName: Record<string, string>;
  lastUpdate: number;
}

/**
 * Generador dinámico de mapeos desde Storybook
 */
export class StorybookDynamicMapper {
  private static cache: MappingCache | null = null;
  private static readonly CACHE_DURATION = 3600000; // 1 hora

  /**
   * Obtener todos los mapeos desde index.json de Storybook
   */
  static async getMappingsFromStorybook(): Promise<MappingCache> {
    // Si hay cache válido, usar cache
    if (
      this.cache &&
      Date.now() - this.cache.lastUpdate < this.CACHE_DURATION
    ) {
      return this.cache;
    }

    console.log(
      '📚 [Dynamic Mapper] Extrayendo mapeos desde Storybook index.json...'
    );

    // Obtener Storybook activo
    const manager = StorybookManager.getInstance();
    const activeConfig = await manager.getActiveConfig();

    if (!activeConfig) {
      throw new Error(
        '❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect'
      );
    }

    // Obtener index.json
    const indexUrl =
      activeConfig.indexJsonUrl || `${activeConfig.url}/index.json`;
    console.log(`📚 [Dynamic Mapper] Consultando: ${indexUrl}`);

    const response = await fetch(indexUrl);
    if (!response.ok) {
      throw new Error(
        `❌ No se pudo obtener index.json: HTTP ${response.status}`
      );
    }

    const indexData = await response.json();

    if (!indexData.entries) {
      throw new Error('❌ index.json no tiene "entries"');
    }

    // Extraer mapeos desde index.json
    const mappings: ComponentMapping[] = [];
    const idToName: Record<string, string> = {};
    const nameToId: Record<string, string> = {};
    const shortNameToFullName: Record<string, string> = {};
    const pascalCaseToFullName: Record<string, string> = {};
    const camelCaseToFullName: Record<string, string> = {};
    const kebabCaseToFullName: Record<string, string> = {};

    const processedComponents = new Set<string>();

    for (const [storyId, entry] of Object.entries(indexData.entries)) {
      if (typeof entry === 'object' && entry !== null) {
        const entryObj = entry as any;

        // Solo procesar historias (no docs)
        if (entryObj.type === 'docs') {
          continue;
        }

        const title = entryObj.title || '';
        const componentId = storyId.split('--')[0];

        // Solo procesar cada componente una vez
        if (!title || !componentId || processedComponents.has(componentId)) {
          continue;
        }

        processedComponents.add(componentId);

        // Extraer nombre corto (última parte del título)
        const parts = title.split('/');
        const shortName = parts[parts.length - 1] || title;

        // Generar variaciones del nombre
        const pascalCase = shortName.replace(/\s+/g, '');
        const camelCase =
          pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
        const kebabCase = shortName.toLowerCase().replace(/\s+/g, '-');

        // Crear mapeo
        const mapping: ComponentMapping = {
          componentId,
          fullName: title,
          shortName,
          pascalCase,
          camelCase,
          kebabCase,
        };

        mappings.push(mapping);

        // Mapeo: ID → Nombre completo
        idToName[componentId] = title;

        // Mapeo: Nombre completo → ID
        nameToId[title] = componentId;

        // Mapeo: Nombre corto → Nombre completo
        if (shortName && !shortNameToFullName[shortName]) {
          shortNameToFullName[shortName] = title;
        }

        // Mapeo: PascalCase → Nombre completo
        if (pascalCase && pascalCase !== shortName) {
          pascalCaseToFullName[pascalCase] = title;
        }

        // Mapeo: camelCase → Nombre completo
        if (camelCase && camelCase !== pascalCase) {
          camelCaseToFullName[camelCase] = title;
        }

        // Mapeo: kebab-case → Nombre completo
        if (kebabCase && kebabCase !== shortName.toLowerCase()) {
          kebabCaseToFullName[kebabCase] = title;
        }
      }
    }

    console.log(
      `✅ [Dynamic Mapper] ${mappings.length} componentes mapeados desde Storybook`
    );

    // Actualizar cache
    this.cache = {
      mappings,
      idToName,
      nameToId,
      shortNameToFullName,
      pascalCaseToFullName,
      camelCaseToFullName,
      kebabCaseToFullName,
      lastUpdate: Date.now(),
    };

    return this.cache;
  }

  /**
   * Convertir ID de Storybook a nombre de componente
   */
  static async storybookIdToComponentName(
    storybookId: string
  ): Promise<string | null> {
    try {
      const { idToName } = await this.getMappingsFromStorybook();
      return idToName[storybookId] || null;
    } catch (error: any) {
      console.warn(
        `⚠️ [Dynamic Mapper] Error obteniendo nombre para ${storybookId}: ${error.message}`
      );
      return null;
    }
  }

  /**
   * Convertir nombre de componente a ID de Storybook
   */
  static async componentNameToStorybookId(
    componentName: string
  ): Promise<string | null> {
    try {
      const {
        nameToId,
        shortNameToFullName,
        pascalCaseToFullName,
        camelCaseToFullName,
        kebabCaseToFullName,
      } = await this.getMappingsFromStorybook();

      // Intentar nombre completo primero
      if (nameToId[componentName]) {
        return nameToId[componentName];
      }

      // Intentar nombre corto
      const fullNameFromShort = shortNameToFullName[componentName];
      if (fullNameFromShort && nameToId[fullNameFromShort]) {
        return nameToId[fullNameFromShort];
      }

      // Intentar PascalCase
      const fullNameFromPascal = pascalCaseToFullName[componentName];
      if (fullNameFromPascal && nameToId[fullNameFromPascal]) {
        return nameToId[fullNameFromPascal];
      }

      // Intentar camelCase
      const fullNameFromCamel = camelCaseToFullName[componentName];
      if (fullNameFromCamel && nameToId[fullNameFromCamel]) {
        return nameToId[fullNameFromCamel];
      }

      // Intentar kebab-case
      const fullNameFromKebab = kebabCaseToFullName[componentName];
      if (fullNameFromKebab && nameToId[fullNameFromKebab]) {
        return nameToId[fullNameFromKebab];
      }

      return null;
    } catch (error: any) {
      console.warn(
        `⚠️ [Dynamic Mapper] Error obteniendo ID para ${componentName}: ${error.message}`
      );
      return null;
    }
  }

  /**
   * Obtener todos los mapeos de componentes
   */
  static async getAllMappings(): Promise<ComponentMapping[]> {
    const { mappings } = await this.getMappingsFromStorybook();
    return mappings;
  }

  /**
   * Obtener todos los nombres de componentes (método de conveniencia)
   * ⭐ NUEVO: Método agregado para compatibilidad con análisis y scripts
   */
  static async getAllComponentNames(): Promise<string[]> {
    const mappings = await this.getAllMappings();
    return mappings.map((m) => m.fullName);
  }

  /**
   * Invalidar cache (forzar actualización)
   */
  static invalidateCache(): void {
    this.cache = null;
    console.log('🔄 [Dynamic Mapper] Cache invalidado');
  }

  /**
   * Obtener información de un componente específico
   */
  static async getComponentInfo(
    identifier: string
  ): Promise<ComponentMapping | null> {
    const mappings = await this.getAllMappings();

    // Buscar por ID
    let mapping = mappings.find((m) => m.componentId === identifier);
    if (mapping) {
      return mapping;
    }

    // Buscar por nombre completo
    mapping = mappings.find((m) => m.fullName === identifier);
    if (mapping) {
      return mapping;
    }

    // Buscar por nombre corto
    mapping = mappings.find((m) => m.shortName === identifier);
    if (mapping) {
      return mapping;
    }

    // Buscar por PascalCase
    mapping = mappings.find((m) => m.pascalCase === identifier);
    if (mapping) {
      return mapping;
    }

    // Buscar por camelCase
    mapping = mappings.find((m) => m.camelCase === identifier);
    if (mapping) {
      return mapping;
    }

    // Buscar por kebab-case
    mapping = mappings.find((m) => m.kebabCase === identifier);
    if (mapping) {
      return mapping;
    }

    return null;
  }
}
