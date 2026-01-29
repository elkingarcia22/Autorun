/**
 * Extractor Dinámico de Variantes
 * 
 * ⭐ OBJETIVO: Extraer variantes de componentes dinámicamente desde las props de Storybook
 * 
 * Ejemplos:
 * - Button con prop variant: 'primary' | 'secondary' | 'tertiary' → ['primary', 'secondary', 'tertiary']
 * - Input con prop variant: 'default' | 'filled' | 'outlined' → ['default', 'filled', 'outlined']
 */

import { StorybookManager } from './storybookManager';

export interface VariantInfo {
  propName: string; // Nombre de la prop (ej: 'variant', 'type', 'size')
  values: string[]; // Valores posibles (ej: ['primary', 'secondary', 'tertiary'])
  description?: string; // Descripción de la variante
}

export interface ComponentVariants {
  componentId: string;
  componentName: string;
  variants: VariantInfo[]; // Todas las variantes encontradas
  primaryVariant?: VariantInfo; // Variante principal (generalmente 'variant')
}

/**
 * Extractor dinámico de variantes desde Storybook
 * ⭐ MEJORADO: Ahora usa ComponentMetadataCache para caché persistente
 */
export class DynamicVariantExtractor {
  private static cache: Map<string, ComponentVariants> = new Map();
  private static readonly CACHE_DURATION = 3600000; // 1 hora

  /**
   * Extraer variantes de un componente desde Storybook
   */
  static async extractVariants(
    componentId: string,
    componentName: string
  ): Promise<ComponentVariants> {
    // ⭐ NUEVO: Verificar caché persistente primero
    try {
      const { ComponentMetadataCache } = await import('./componentMetadataCache.js');
      await ComponentMetadataCache.initialize();
      
      const cachedVariants = await ComponentMetadataCache.getVariants(
        componentId,
        componentName
      );
      
      if (cachedVariants && cachedVariants.length > 0) {
        console.log(
          `   ✅ [Variant Extractor] Variantes obtenidas desde caché persistente para: ${componentName}`
        );
        
        // Construir resultado desde caché
        const result: ComponentVariants = {
          componentId,
          componentName,
          variants: cachedVariants,
          primaryVariant: cachedVariants.find(
            (v) => v.propName.toLowerCase() === 'variant'
          ) || cachedVariants[0],
        };
        
        // También cachear en memoria
        const cacheKey = `${componentId}-${componentName}`;
        this.cache.set(cacheKey, result);
        
        return result;
      }
    } catch (error: any) {
      console.warn(
        `⚠️ [Variant Extractor] Error consultando caché persistente: ${error.message}`
      );
      // Continuar con caché en memoria
    }

    // Verificar cache en memoria
    const cacheKey = `${componentId}-${componentName}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      console.log(
        `   ✅ [Variant Extractor] Variantes obtenidas desde cache en memoria para: ${componentName}`
      );
      return cached;
    }

    console.log(
      `🔍 [Variant Extractor] Extrayendo variantes para: ${componentName} (${componentId})`
    );

    const result: ComponentVariants = {
      componentId,
      componentName,
      variants: [],
    };

    try {
      // ESTRATEGIA 1: Consultar Storybook MCP para obtener props
      const mcpVariants = await this.extractFromMCP(componentId, componentName);
      if (mcpVariants.length > 0) {
        result.variants.push(...mcpVariants);
        console.log(
          `   ✅ [Variant Extractor] ${mcpVariants.length} variante(s) encontrada(s) desde MCP`
        );
      }

      // ESTRATEGIA 2: Consultar código fuente TypeScript como fallback
      if (result.variants.length === 0) {
        const sourceVariants = await this.extractFromSource(componentId, componentName);
        if (sourceVariants.length > 0) {
          result.variants.push(...sourceVariants);
          console.log(
            `   ✅ [Variant Extractor] ${sourceVariants.length} variante(s) encontrada(s) desde código fuente`
          );
        }
      }

      // Identificar variante principal (generalmente 'variant')
      result.primaryVariant = result.variants.find(
        (v) => v.propName.toLowerCase() === 'variant'
      ) || result.variants[0];

      // ⭐ NUEVO: Cachear en caché persistente
      try {
        const { ComponentMetadataCache } = await import('./componentMetadataCache.js');
        await ComponentMetadataCache.setVariants(
          componentId,
          componentName,
          result.variants
        );
      } catch (error: any) {
        console.warn(
          `⚠️ [Variant Extractor] Error guardando en caché persistente: ${error.message}`
        );
      }

      // Cachear resultado en memoria
      this.cache.set(cacheKey, result);

      console.log(
        `✅ [Variant Extractor] Total variantes encontradas: ${result.variants.length}`
      );

      return result;
    } catch (error: any) {
      console.warn(
        `⚠️ [Variant Extractor] Error extrayendo variantes: ${error.message}`
      );
      // Retornar resultado vacío en caso de error
      return result;
    }
  }

  /**
   * Extraer variantes desde Storybook MCP
   */
  private static async extractFromMCP(
    componentId: string,
    componentName: string
  ): Promise<VariantInfo[]> {
    const variants: VariantInfo[] = [];

    try {
      // ESTRATEGIA 1: Usar StorybookPropsExtractorRobust para obtener props completas
      try {
        const { StorybookPropsExtractorRobust } = await import(
          './storybookPropsExtractorRobust.js'
        );
        const propsResult = await StorybookPropsExtractorRobust.extractPropsRobust(
          componentName
        );

        if (propsResult.success && propsResult.props.length > 0) {
          // Buscar prop "variant"
          const variantProp = propsResult.props.find(
            (p) => p.name.toLowerCase() === 'variant'
          );
          if (variantProp && variantProp.options && variantProp.options.length > 0) {
            variants.push({
              propName: 'variant',
              values: variantProp.options,
              description: variantProp.description || 'Variante del componente',
            });
          }

          // Buscar prop "type" (especialmente para Input)
          const typeProp = propsResult.props.find(
            (p) => p.name.toLowerCase() === 'type'
          );
          if (typeProp && typeProp.options && typeProp.options.length > 0) {
            variants.push({
              propName: 'type',
              values: typeProp.options,
              description: typeProp.description || 'Tipo del componente',
            });
          }

          // Buscar prop "size"
          const sizeProp = propsResult.props.find(
            (p) => p.name.toLowerCase() === 'size'
          );
          if (sizeProp && sizeProp.options && sizeProp.options.length > 0) {
            variants.push({
              propName: 'size',
              values: sizeProp.options,
              description: sizeProp.description || 'Tamaño del componente',
            });
          }

          if (variants.length > 0) {
            console.log(
              `   ✅ [Variant Extractor] Variantes extraídas desde props robustas: ${variants.length}`
            );
            return variants;
          }
        }
      } catch (error: any) {
        console.warn(
          `⚠️ [Variant Extractor] Error usando extractor robusto: ${error.message}`
        );
      }

      // ESTRATEGIA 2: Extraer desde documentación HTML (fallback)
      const manager = StorybookManager.getInstance();
      const activeConfig = await manager.getActiveConfig();

      if (!activeConfig) {
        console.warn(
          '⚠️ [Variant Extractor] No hay Storybook activo configurado'
        );
        return variants;
      }

      const docsUrl = `${activeConfig.url}/?path=/docs/${encodeURIComponent(componentId)}--docs`;
      
      console.log(
        `   🔍 [Variant Extractor] Consultando documentación: ${docsUrl}`
      );

      // Intentar obtener props desde la documentación
      const response = await fetch(docsUrl);
      if (!response.ok) {
        console.warn(
          `⚠️ [Variant Extractor] No se pudo obtener documentación: HTTP ${response.status}`
        );
        return variants;
      }

      const html = await response.text();

      // Buscar tabla de props en el HTML
      const propsTableMatch = html.match(
        /<table[^>]*>[\s\S]*?<\/table>/i
      );

      if (propsTableMatch) {
        const tableHTML = propsTableMatch[0];
        
        // Buscar prop "variant" o similar
        const variantMatch = tableHTML.match(
          /<tr[^>]*>[\s\S]*?variant[\s\S]*?<\/tr>/i
        );

        if (variantMatch) {
          // Extraer valores posibles de la prop variant
          const valuesMatch = variantMatch[0].match(
            /(?:primary|secondary|tertiary|default|filled|outlined|small|medium|large|text|email|password|number|calendar|select|autocomplete|search|tel|url)/gi
          );

          if (valuesMatch) {
            const uniqueValues = [...new Set(valuesMatch.map((v) => v.toLowerCase()))];
            variants.push({
              propName: 'variant',
              values: uniqueValues,
              description: 'Variante del componente',
            });
          }
        }

        // Buscar prop "type" (especialmente para Input)
        const typeMatch = tableHTML.match(
          /<tr[^>]*>[\s\S]*?type[\s\S]*?<\/tr>/i
        );

        if (typeMatch) {
          // Extraer valores posibles de la prop type
          const valuesMatch = typeMatch[0].match(
            /(?:text|email|password|number|calendar|select|autocomplete|search|tel|url)/gi
          );

          if (valuesMatch) {
            const uniqueValues = [...new Set(valuesMatch.map((v) => v.toLowerCase()))];
            variants.push({
              propName: 'type',
              values: uniqueValues,
              description: 'Tipo del componente',
            });
          }
        }

        // Buscar prop "size"
        const sizeMatch = tableHTML.match(
          /<tr[^>]*>[\s\S]*?size[\s\S]*?<\/tr>/i
        );

        if (sizeMatch) {
          // Extraer valores posibles de la prop size
          const valuesMatch = sizeMatch[0].match(
            /(?:small|medium|large|sm|md|lg|xs|xl)/gi
          );

          if (valuesMatch) {
            const uniqueValues = [...new Set(valuesMatch.map((v) => v.toLowerCase()))];
            variants.push({
              propName: 'size',
              values: uniqueValues,
              description: 'Tamaño del componente',
            });
          }
        }
      }
    } catch (error: any) {
      console.warn(
        `⚠️ [Variant Extractor] Error extrayendo desde MCP: ${error.message}`
      );
    }

    return variants;
  }

  /**
   * Extraer variantes desde código fuente TypeScript
   */
  private static async extractFromSource(
    componentId: string,
    componentName: string
  ): Promise<VariantInfo[]> {
    const variants: VariantInfo[] = [];

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
          
          // Buscar definición de tipo variant
          // Ejemplo: variant?: 'primary' | 'secondary' | 'tertiary'
          const variantTypeRegex =
            /variant\??\s*:\s*['"]([^'"]+)['"]\s*\|\s*['"]([^'"]+)['"](?:\s*\|\s*['"]([^'"]+)['"])*/gi;
          let match;
          
          while ((match = variantTypeRegex.exec(content)) !== null) {
            const values: string[] = [];
            for (let i = 1; i < match.length; i++) {
              if (match[i]) {
                values.push(match[i].toLowerCase());
              }
            }
            
            if (values.length > 0) {
              variants.push({
                propName: 'variant',
                values: [...new Set(values)],
                description: 'Variante del componente',
              });
              break; // Solo tomar la primera definición
            }
          }

          // Buscar definición de tipo type (especialmente para Input)
          const typeTypeRegex =
            /type\??\s*:\s*['"]([^'"]+)['"]\s*\|\s*['"]([^'"]+)['"](?:\s*\|\s*['"]([^'"]+)['"])*/gi;
          
          while ((match = typeTypeRegex.exec(content)) !== null) {
            const values: string[] = [];
            for (let i = 1; i < match.length; i++) {
              if (match[i]) {
                values.push(match[i].toLowerCase());
              }
            }
            
            if (values.length > 0) {
              variants.push({
                propName: 'type',
                values: [...new Set(values)],
                description: 'Tipo del componente',
              });
              break;
            }
          }

          // Buscar definición de tipo size
          const sizeTypeRegex =
            /size\??\s*:\s*['"]([^'"]+)['"]\s*\|\s*['"]([^'"]+)['"](?:\s*\|\s*['"]([^'"]+)['"])*/gi;
          
          while ((match = sizeTypeRegex.exec(content)) !== null) {
            const values: string[] = [];
            for (let i = 1; i < match.length; i++) {
              if (match[i]) {
                values.push(match[i].toLowerCase());
              }
            }
            
            if (values.length > 0) {
              variants.push({
                propName: 'size',
                values: [...new Set(values)],
                description: 'Tamaño del componente',
              });
              break;
            }
          }

          // Si encontramos algo, no buscar en otros archivos
          if (variants.length > 0) {
            break;
          }
        } catch (error) {
          // Continuar con siguiente archivo
        }
      }
    } catch (error: any) {
      console.warn(
        `⚠️ [Variant Extractor] Error extrayendo desde código fuente: ${error.message}`
      );
    }

    return variants;
  }

  /**
   * Obtener valores de variante para un componente
   * (método de conveniencia)
   */
  static async getVariantValues(
    componentId: string,
    componentName: string,
    propName: string = 'variant'
  ): Promise<string[]> {
    const variants = await this.extractVariants(componentId, componentName);
    const variant = variants.variants.find(
      (v) => v.propName.toLowerCase() === propName.toLowerCase()
    );
    return variant?.values || [];
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
        `⚠️ [Variant Extractor] Error invalidando caché persistente: ${error.message}`
      );
    }

    // Invalidar caché en memoria
    if (componentId && componentName) {
      const cacheKey = `${componentId}-${componentName}`;
      this.cache.delete(cacheKey);
      console.log(
        `🔄 [Variant Extractor] Cache invalidado para: ${componentName}`
      );
    } else {
      this.cache.clear();
      console.log('🔄 [Variant Extractor] Cache completamente invalidado');
    }
  }
}

