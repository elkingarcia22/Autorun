/**
 * Extractor Dinámico de Propiedades
 * 
 * ⭐ OBJETIVO: Extraer propiedades de componentes dinámicamente desde las props de Storybook
 * 
 * Ejemplos:
 * - Button con prop iconOnly: boolean → detecta "solo icono", "icon only"
 * - Button con prop disabled: boolean → detecta "disabled", "deshabilitado"
 * - Input con prop required: boolean → detecta "required", "requerido"
 * - Input con prop label: string → detecta "label", "etiqueta"
 */

import { StorybookManager } from './storybookManager';

export interface PropertyInfo {
  propName: string; // Nombre de la prop (ej: 'iconOnly', 'disabled', 'loading')
  type: 'boolean' | 'string' | 'number' | 'enum'; // Tipo de la propiedad
  values?: string[]; // Valores posibles (para enums)
  description?: string; // Descripción de la propiedad
  aliases: string[]; // Alias en español/inglés (ej: ['solo icono', 'icon only', 'icon-only'])
}

export interface ComponentProperties {
  componentId: string;
  componentName: string;
  properties: PropertyInfo[]; // Todas las propiedades encontradas
  booleanProperties: PropertyInfo[]; // Propiedades booleanas (iconOnly, disabled, etc.)
  stringProperties: PropertyInfo[]; // Propiedades de texto (label, placeholder, etc.)
}

/**
 * Extractor dinámico de propiedades desde Storybook
 */
export class DynamicPropertyExtractor {
  private static cache: Map<string, ComponentProperties> = new Map();
  private static readonly CACHE_DURATION = 3600000; // 1 hora

  /**
   * Mapeo de nombres de props a alias comunes
   */
  private static readonly PROP_ALIASES: Record<string, string[]> = {
    // Propiedades booleanas comunes
    iconOnly: ['solo icono', 'solo icon', 'icon only', 'icon-only', 'only icon'],
    disabled: ['disabled', 'deshabilitado', 'inhabilitado'],
    loading: ['loading', 'cargando', 'carga'],
    required: ['required', 'requerido', 'obligatorio'],
    fullWidth: ['full width', 'ancho completo', 'ancho total'],
    readOnly: ['read only', 'solo lectura', 'readonly'],
    clearable: ['clearable', 'limpiable', 'puede limpiar'],
    searchable: ['searchable', 'buscable', 'puede buscar'],
    
    // Propiedades de texto comunes
    label: ['label', 'etiqueta', 'nombre'],
    placeholder: ['placeholder', 'texto de ejemplo', 'ejemplo'],
    helperText: ['helper text', 'texto de ayuda', 'ayuda', 'mensaje de ayuda'],
    error: ['error', 'errores', 'mensaje de error'],
    description: ['description', 'descripción'],
  };

  /**
   * Extraer propiedades de un componente desde Storybook
   */
  static async extractProperties(
    componentId: string,
    componentName: string
  ): Promise<ComponentProperties> {
    // Verificar cache
    const cacheKey = `${componentId}-${componentName}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      console.log(
        `   ✅ [Property Extractor] Propiedades obtenidas desde cache para: ${componentName}`
      );
      return cached;
    }

    console.log(
      `🔍 [Property Extractor] Extrayendo propiedades para: ${componentName} (${componentId})`
    );

    const result: ComponentProperties = {
      componentId,
      componentName,
      properties: [],
      booleanProperties: [],
      stringProperties: [],
    };

    try {
      // ESTRATEGIA 1: Consultar StorybookPropsExtractorRobust para obtener props completas
      const robustProps = await this.extractFromRobustExtractor(componentName);
      if (robustProps.length > 0) {
        result.properties.push(...robustProps);
        console.log(
          `   ✅ [Property Extractor] ${robustProps.length} propiedad(es) encontrada(s) desde extractor robusto`
        );
      }

      // ESTRATEGIA 2: Consultar código fuente TypeScript como fallback
      if (result.properties.length === 0) {
        const sourceProps = await this.extractFromSource(componentId, componentName);
        if (sourceProps.length > 0) {
          result.properties.push(...sourceProps);
          console.log(
            `   ✅ [Property Extractor] ${sourceProps.length} propiedad(es) encontrada(s) desde código fuente`
          );
        }
      }

      // Separar propiedades por tipo
      result.booleanProperties = result.properties.filter(
        (p) => p.type === 'boolean'
      );
      result.stringProperties = result.properties.filter(
        (p) => p.type === 'string'
      );

      // ⭐ NUEVO: Cachear en caché persistente
      try {
        const { ComponentMetadataCache } = await import('./componentMetadataCache.js');
        await ComponentMetadataCache.setProperties(
          componentId,
          componentName,
          result.properties.map(p => ({
            name: p.propName,
            alias: p.aliases,
            type: p.type === 'boolean' ? 'boolean' : p.type === 'string' ? 'text' : p.type === 'number' ? 'number' : 'enum',
            description: p.description,
            possibleValues: p.values,
          }))
        );
      } catch (error: any) {
        console.warn(
          `⚠️ [Property Extractor] Error guardando en caché persistente: ${error.message}`
        );
      }

      // Cachear resultado en memoria
      this.cache.set(cacheKey, result);

      console.log(
        `✅ [Property Extractor] Total propiedades encontradas: ${result.properties.length} (${result.booleanProperties.length} booleanas, ${result.stringProperties.length} de texto)`
      );

      return result;
    } catch (error: any) {
      console.warn(
        `⚠️ [Property Extractor] Error extrayendo propiedades: ${error.message}`
      );
      // Retornar resultado vacío en caso de error
      return result;
    }
  }

  /**
   * Extraer propiedades desde StorybookPropsExtractorRobust
   */
  private static async extractFromRobustExtractor(
    componentName: string
  ): Promise<PropertyInfo[]> {
    const properties: PropertyInfo[] = [];

    try {
      const { StorybookPropsExtractorRobust } = await import(
        './storybookPropsExtractorRobust.js'
      );
      const propsResult = await StorybookPropsExtractorRobust.extractPropsRobust(
        componentName
      );

      if (propsResult.success && propsResult.props.length > 0) {
        for (const prop of propsResult.props) {
          // Determinar tipo de propiedad
          let propType: PropertyInfo['type'] = 'string';
          if (prop.type?.toLowerCase().includes('boolean')) {
            propType = 'boolean';
          } else if (prop.type?.toLowerCase().includes('number')) {
            propType = 'number';
          } else if (prop.options && prop.options.length > 0) {
            propType = 'enum';
          }

          // Obtener alias para la propiedad
          const aliases = this.getAliasesForProp(prop.name);

          // Crear PropertyInfo
          const propertyInfo: PropertyInfo = {
            propName: prop.name,
            type: propType,
            values: prop.options,
            description: prop.description,
            aliases,
          };

          properties.push(propertyInfo);
        }
      }
    } catch (error: any) {
      console.warn(
        `⚠️ [Property Extractor] Error usando extractor robusto: ${error.message}`
      );
    }

    return properties;
  }

  /**
   * Extraer propiedades desde código fuente TypeScript
   */
  private static async extractFromSource(
    componentId: string,
    componentName: string
  ): Promise<PropertyInfo[]> {
    const properties: PropertyInfo[] = [];

    try {
      // Buscar archivo de tipos del componente
      const normalizedId = componentId.replace(/-/g, '-');
      const possibleFiles = [
        `vendor/ubits/packages/components/${normalizedId}/src/types/${normalizedId}Options.ts`,
        `vendor/ubits/packages/components/${normalizedId}/src/types/index.ts`,
        `vendor/ubits/packages/components/${normalizedId}/src/${normalizedId}Options.ts`,
      ];

      const fs = await import('fs/promises');
      
      for (const filePath of possibleFiles) {
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          
          // Buscar propiedades booleanas
          // Ejemplo: iconOnly?: boolean
          const booleanPropRegex = /(\w+)\??\s*:\s*boolean/gi;
          let match;
          
          while ((match = booleanPropRegex.exec(content)) !== null) {
            const propName = match[1];
            const aliases = this.getAliasesForProp(propName);
            
            properties.push({
              propName,
              type: 'boolean',
              aliases,
              description: `Propiedad booleana: ${propName}`,
            });
          }

          // Buscar propiedades de texto
          // Ejemplo: label?: string
          const stringPropRegex = /(\w+)\??\s*:\s*string/gi;
          
          while ((match = stringPropRegex.exec(content)) !== null) {
            const propName = match[1];
            const aliases = this.getAliasesForProp(propName);
            
            properties.push({
              propName,
              type: 'string',
              aliases,
              description: `Propiedad de texto: ${propName}`,
            });
          }

          // Si encontramos algo, no buscar en otros archivos
          if (properties.length > 0) {
            break;
          }
        } catch (error) {
          // Continuar con siguiente archivo
        }
      }
    } catch (error: any) {
      console.warn(
        `⚠️ [Property Extractor] Error extrayendo desde código fuente: ${error.message}`
      );
    }

    return properties;
  }

  /**
   * Obtener alias para una propiedad
   */
  private static getAliasesForProp(propName: string): string[] {
    const aliases: string[] = [propName]; // Incluir el nombre original
    
    // Buscar en mapeo de alias conocidos
    const knownAliases = this.PROP_ALIASES[propName];
    if (knownAliases) {
      aliases.push(...knownAliases);
    }

    // Generar alias comunes basados en el nombre
    const nameLower = propName.toLowerCase();
    
    // camelCase a palabras separadas
    const words = nameLower.replace(/([A-Z])/g, ' $1').toLowerCase().trim().split(/\s+/);
    const wordsJoined = words.join(' ');
    aliases.push(wordsJoined);

    // Generar variaciones comunes
    if (nameLower.includes('icon') && nameLower.includes('only')) {
      aliases.push('solo icono', 'solo icon', 'icon only', 'icon-only');
    }
    if (nameLower.includes('full') && nameLower.includes('width')) {
      aliases.push('full width', 'ancho completo', 'ancho total');
    }
    if (nameLower.includes('helper') && nameLower.includes('text')) {
      aliases.push('helper text', 'texto de ayuda', 'ayuda');
    }

    // Eliminar duplicados
    return [...new Set(aliases)];
  }

  /**
   * Obtener propiedades booleanas para un componente
   * (método de conveniencia)
   */
  static async getBooleanProperties(
    componentId: string,
    componentName: string
  ): Promise<PropertyInfo[]> {
    const properties = await this.extractProperties(componentId, componentName);
    return properties.booleanProperties;
  }

  /**
   * Obtener propiedades de texto para un componente
   * (método de conveniencia)
   */
  static async getStringProperties(
    componentId: string,
    componentName: string
  ): Promise<PropertyInfo[]> {
    const properties = await this.extractProperties(componentId, componentName);
    return properties.stringProperties;
  }

  /**
   * Buscar propiedad por alias en el mensaje
   */
  static async findPropertyInMessage(
    message: string,
    componentId: string,
    componentName: string
  ): Promise<PropertyInfo[]> {
    const lowerMessage = message.toLowerCase();
    const properties = await this.extractProperties(componentId, componentName);
    const found: PropertyInfo[] = [];

    for (const prop of properties.properties) {
      // Buscar en todos los alias
      for (const alias of prop.aliases) {
        if (lowerMessage.includes(alias.toLowerCase())) {
          found.push(prop);
          break; // Solo agregar una vez
        }
      }
    }

    return found;
  }

  /**
   * Invalidar cache (forzar recarga)
   */
  /**
   * Invalidar cache para un componente específico o todos
   * ⭐ MEJORADO: Ahora también invalida caché persistente
   */
  static async invalidateCache(
    componentId?: string,
    componentName?: string
  ): Promise<void> {
    // Invalidar caché persistente
    if (componentId && componentName) {
      try {
        const { ComponentMetadataCache } = await import('./componentMetadataCache.js');
        await ComponentMetadataCache.invalidate(componentId, componentName);
      } catch (error: any) {
        console.warn(
          `⚠️ [Property Extractor] Error invalidando caché persistente: ${error.message}`
        );
      }
    }

    // Invalidar caché en memoria
    if (componentId && componentName) {
      const cacheKey = `${componentId}-${componentName}`;
      this.cache.delete(cacheKey);
      console.log(
        `🔄 [Property Extractor] Cache invalidado para: ${componentName}`
      );
    } else {
      this.cache.clear();
      console.log('🔄 [Property Extractor] Cache completamente invalidado');
    }
  }
}


