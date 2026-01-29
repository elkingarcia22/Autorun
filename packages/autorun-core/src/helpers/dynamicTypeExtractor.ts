/**
 * Extractor Dinámico de Tipos
 * 
 * ⭐ OBJETIVO: Extraer tipos de componentes dinámicamente desde las props de Storybook
 * 
 * Especialmente útil para componentes como Input que tienen prop "type"
 * con valores como: 'text' | 'email' | 'password' | 'calendar' | 'select' | 'autocomplete'
 * 
 * Ejemplos:
 * - Input con prop type: 'text' | 'email' | 'calendar' → ['text', 'email', 'calendar']
 * - Select con prop type: 'single' | 'multiple' → ['single', 'multiple']
 */

import { StorybookManager } from './storybookManager';

export interface TypeInfo {
  propName: string; // Nombre de la prop (generalmente 'type')
  values: string[]; // Valores posibles (ej: ['text', 'email', 'calendar', 'select'])
  description?: string; // Descripción del tipo
  componentSpecific?: boolean; // Si es específico del componente (true) o genérico (false)
}

export interface ComponentTypes {
  componentId: string;
  componentName: string;
  types: TypeInfo[]; // Todos los tipos encontrados
  primaryType?: TypeInfo; // Tipo principal (generalmente 'type')
}

/**
 * Extractor dinámico de tipos desde Storybook
 * ⭐ MEJORADO: Ahora usa ComponentMetadataCache para caché persistente
 */
export class DynamicTypeExtractor {
  private static cache: Map<string, ComponentTypes> = new Map();
  private static readonly CACHE_DURATION = 3600000; // 1 hora

  /**
   * Extraer tipos de un componente desde Storybook
   */
  static async extractTypes(
    componentId: string,
    componentName: string
  ): Promise<ComponentTypes> {
    // ⭐ NUEVO: Verificar caché persistente primero
    try {
      const { ComponentMetadataCache } = await import('./componentMetadataCache.js');
      await ComponentMetadataCache.initialize();
      
      const cachedTypes = await ComponentMetadataCache.getTypes(
        componentId,
        componentName
      );
      
      if (cachedTypes && cachedTypes.length > 0) {
        console.log(
          `   ✅ [Type Extractor] Tipos obtenidos desde caché persistente para: ${componentName}`
        );
        
        // Construir resultado desde caché
        const result: ComponentTypes = {
          componentId,
          componentName,
          types: cachedTypes,
          primaryType: cachedTypes.find(
            (t) => t.propName.toLowerCase() === 'type'
          ) || cachedTypes[0],
        };
        
        // También cachear en memoria
        const cacheKey = `${componentId}-${componentName}`;
        this.cache.set(cacheKey, result);
        
        return result;
      }
    } catch (error: any) {
      console.warn(
        `⚠️ [Type Extractor] Error consultando caché persistente: ${error.message}`
      );
      // Continuar con caché en memoria
    }

    // Verificar cache en memoria
    const cacheKey = `${componentId}-${componentName}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      console.log(
        `   ✅ [Type Extractor] Tipos obtenidos desde cache en memoria para: ${componentName}`
      );
      return cached;
    }

    console.log(
      `🔍 [Type Extractor] Extrayendo tipos para: ${componentName} (${componentId})`
    );

    const result: ComponentTypes = {
      componentId,
      componentName,
      types: [],
    };

    try {
      // ESTRATEGIA 1: Consultar StorybookPropsExtractorRobust para obtener props completas
      const robustTypes = await this.extractFromRobustExtractor(componentName);
      if (robustTypes.length > 0) {
        result.types.push(...robustTypes);
        console.log(
          `   ✅ [Type Extractor] ${robustTypes.length} tipo(s) encontrado(s) desde extractor robusto`
        );
      }

      // ESTRATEGIA 2: Consultar código fuente TypeScript como fallback
      if (result.types.length === 0) {
        const sourceTypes = await this.extractFromSource(componentId, componentName);
        if (sourceTypes.length > 0) {
          result.types.push(...sourceTypes);
          console.log(
            `   ✅ [Type Extractor] ${sourceTypes.length} tipo(s) encontrado(s) desde código fuente`
          );
        }
      }

      // Identificar tipo principal (generalmente 'type')
      result.primaryType = result.types.find(
        (t) => t.propName.toLowerCase() === 'type'
      ) || result.types[0];

      // ⭐ NUEVO: Cachear en caché persistente
      try {
        const { ComponentMetadataCache } = await import('./componentMetadataCache.js');
        await ComponentMetadataCache.setTypes(
          componentId,
          componentName,
          result.types
        );
      } catch (error: any) {
        console.warn(
          `⚠️ [Type Extractor] Error guardando en caché persistente: ${error.message}`
        );
      }

      // Cachear resultado en memoria
      this.cache.set(cacheKey, result);

      console.log(
        `✅ [Type Extractor] Total tipos encontrados: ${result.types.length}`
      );

      return result;
    } catch (error: any) {
      console.warn(
        `⚠️ [Type Extractor] Error extrayendo tipos: ${error.message}`
      );
      // Retornar resultado vacío en caso de error
      return result;
    }
  }

  /**
   * Extraer tipos desde StorybookPropsExtractorRobust
   */
  private static async extractFromRobustExtractor(
    componentName: string
  ): Promise<TypeInfo[]> {
    const types: TypeInfo[] = [];

    try {
      const { StorybookPropsExtractorRobust } = await import(
        './storybookPropsExtractorRobust.js'
      );
      const propsResult = await StorybookPropsExtractorRobust.extractPropsRobust(
        componentName
      );

      if (propsResult.success && propsResult.props.length > 0) {
        // Buscar prop "type" (especialmente importante para Input, Select, etc.)
        const typeProp = propsResult.props.find(
          (p) => p.name.toLowerCase() === 'type'
        );
        
        if (typeProp && typeProp.options && typeProp.options.length > 0) {
          types.push({
            propName: 'type',
            values: typeProp.options,
            description: typeProp.description || 'Tipo del componente',
            componentSpecific: true,
          });
        }

        // También buscar otras props que puedan ser tipos
        // Ejemplo: Input puede tener prop "inputType" o similar
        for (const prop of propsResult.props) {
          const propNameLower = prop.name.toLowerCase();
          if (
            (propNameLower.includes('type') || propNameLower.includes('kind')) &&
            prop.options &&
            prop.options.length > 0 &&
            prop.name.toLowerCase() !== 'type' // Ya lo procesamos arriba
          ) {
            types.push({
              propName: prop.name,
              values: prop.options,
              description: prop.description || `Tipo: ${prop.name}`,
              componentSpecific: true,
            });
          }
        }
      }
    } catch (error: any) {
      console.warn(
        `⚠️ [Type Extractor] Error usando extractor robusto: ${error.message}`
      );
    }

    return types;
  }

  /**
   * Extraer tipos desde código fuente TypeScript
   */
  private static async extractFromSource(
    componentId: string,
    componentName: string
  ): Promise<TypeInfo[]> {
    const types: TypeInfo[] = [];

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
          
          // Buscar definición de tipo "type"
          // Ejemplo: type?: 'text' | 'email' | 'password' | 'calendar' | 'select'
          const typeTypeRegex =
            /type\??\s*:\s*['"]([^'"]+)['"]\s*\|\s*['"]([^'"]+)['"](?:\s*\|\s*['"]([^'"]+)['"])*/gi;
          let match;
          
          while ((match = typeTypeRegex.exec(content)) !== null) {
            const values: string[] = [];
            for (let i = 1; i < match.length; i++) {
              if (match[i]) {
                values.push(match[i].toLowerCase());
              }
            }
            
            if (values.length > 0) {
              types.push({
                propName: 'type',
                values: [...new Set(values)],
                description: 'Tipo del componente',
                componentSpecific: true,
              });
              break; // Solo tomar la primera definición
            }
          }

          // Buscar definición de tipo como enum o union type
          // Ejemplo: type InputType = 'text' | 'email' | 'password'
          const typeEnumRegex =
            /(?:type|enum)\s+\w*Type\w*\s*[=:]\s*['"]([^'"]+)['"]\s*\|\s*['"]([^'"]+)['"](?:\s*\|\s*['"]([^'"]+)['"])*/gi;
          
          while ((match = typeEnumRegex.exec(content)) !== null) {
            const values: string[] = [];
            for (let i = 1; i < match.length; i++) {
              if (match[i]) {
                values.push(match[i].toLowerCase());
              }
            }
            
            if (values.length > 0) {
              types.push({
                propName: 'type',
                values: [...new Set(values)],
                description: 'Tipo del componente (desde enum)',
                componentSpecific: true,
              });
              break;
            }
          }

          // Si encontramos algo, no buscar en otros archivos
          if (types.length > 0) {
            break;
          }
        } catch (error) {
          // Continuar con siguiente archivo
        }
      }
    } catch (error: any) {
      console.warn(
        `⚠️ [Type Extractor] Error extrayendo desde código fuente: ${error.message}`
      );
    }

    return types;
  }

  /**
   * Obtener valores de tipo para un componente
   * (método de conveniencia)
   */
  static async getTypeValues(
    componentId: string,
    componentName: string,
    propName: string = 'type'
  ): Promise<string[]> {
    const types = await this.extractTypes(componentId, componentName);
    const type = types.types.find(
      (t) => t.propName.toLowerCase() === propName.toLowerCase()
    );
    return type?.values || [];
  }

  /**
   * Verificar si un componente tiene un tipo específico
   */
  static async hasType(
    componentId: string,
    componentName: string,
    typeValue: string
  ): Promise<boolean> {
    const typeValues = await this.getTypeValues(componentId, componentName);
    return typeValues.includes(typeValue.toLowerCase());
  }

  /**
   * Invalidar cache (forzar recarga)
   * ⭐ MEJORADO: Ahora también invalida caché persistente
   */
  static async invalidateCache(
    componentId?: string,
    componentName?: string
  ): Promise<void> {
    // Invalidar caché persistente
    try {
      const { ComponentMetadataCache } = await import('./componentMetadataCache.js');
      await ComponentMetadataCache.invalidate(componentId, componentName);
    } catch (error: any) {
      console.warn(
        `⚠️ [Type Extractor] Error invalidando caché persistente: ${error.message}`
      );
    }

    // Invalidar caché en memoria
    if (componentId && componentName) {
      const cacheKey = `${componentId}-${componentName}`;
      this.cache.delete(cacheKey);
      console.log(
        `🔄 [Type Extractor] Cache invalidado para: ${componentName}`
      );
    } else {
      this.cache.clear();
      console.log('🔄 [Type Extractor] Cache completamente invalidado');
    }
  }
}


