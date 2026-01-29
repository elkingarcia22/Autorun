/**
 * Helper de Integración del Sistema Dinámico
 * 
 * ⭐ OBJETIVO: Unificar y optimizar el flujo completo de detección y extracción
 * 
 * Este helper asegura que:
 * 1. Todos los extractores usen componentId correctamente
 * 2. El flujo completo esté optimizado
 * 3. El caché se use eficientemente
 * 4. Los errores se manejen correctamente
 */

import { IntelligentComponentParser } from './intelligentComponentParser';
import { ComponentMetadataCache } from './componentMetadataCache';
import { mapComponentNameToStorybookId } from './storybookStories.js';
import { StorybookManager } from './storybookManager';
import { storybookIdToComponentName } from './storybookMCPNameMapper.js';

export interface ComponentDetectionResult {
  success: boolean;
  componentName?: string;
  componentId?: string;
  variant?: string;
  type?: string;
  properties?: string[];
  error?: string;
}

/**
 * Detectar y extraer información completa de un componente desde un mensaje
 * 
 * ⭐ Este es el punto de entrada principal para la detección inteligente
 */
export async function detectComponentFromMessage(
  userMessage: string
): Promise<ComponentDetectionResult> {
  try {
    console.log('\n🔍 [Integration Helper] Detectando componente desde mensaje...');
    console.log(`   Mensaje: "${userMessage}"`);

    // 1. Parsear mensaje usando IntelligentComponentParser
    const parsed = await IntelligentComponentParser.parse(userMessage);
    
    if (!parsed.componentName) {
      return {
        success: false,
        error: 'No se detectó ningún componente en el mensaje',
      };
    }

    console.log(`   ✅ Componente detectado: ${parsed.componentName}`);

    // 2. Obtener componentId desde StorybookDynamicMapper
    let componentId: string | null = null;
    try {
      const { StorybookDynamicMapper } = await import('./storybookDynamicMapper.js');
      componentId = await StorybookDynamicMapper.componentNameToStorybookId(
        parsed.componentName
      );
      
      if (!componentId) {
        console.warn(
          `   ⚠️ No se encontró componentId para: ${parsed.componentName}`
        );
        return {
          success: false,
          componentName: parsed.componentName,
          error: `No se encontró componentId para: ${parsed.componentName}`,
        };
      }
      
      console.log(`   ✅ ComponentId obtenido: ${componentId}`);
    } catch (error: any) {
      console.warn(
        `   ⚠️ Error obteniendo componentId: ${error.message}`
      );
      return {
        success: false,
        componentName: parsed.componentName,
        error: `Error obteniendo componentId: ${error.message}`,
      };
    }

    // 3. Inicializar caché (si no está inicializado)
    await ComponentMetadataCache.initialize();

    // 4. Construir resultado completo
    const result: ComponentDetectionResult = {
      success: true,
      componentName: parsed.componentName,
      componentId,
      variant: parsed.variant,
      type: parsed.type,
      properties: parsed.properties,
    };

    console.log(`   ✅ Detección completa:`);
    console.log(`      - Componente: ${result.componentName}`);
    console.log(`      - ID: ${result.componentId}`);
    if (result.variant) {
      console.log(`      - Variante: ${result.variant}`);
    }
    if (result.type) {
      console.log(`      - Tipo: ${result.type}`);
    }
    if (result.properties && result.properties.length > 0) {
      console.log(`      - Propiedades: ${result.properties.join(', ')}`);
    }

    return result;
  } catch (error: any) {
    console.error(
      `❌ [Integration Helper] Error detectando componente: ${error.message}`
    );
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Pre-cargar metadatos de un componente en caché
 * 
 * Útil para optimizar consultas futuras
 */
export async function preloadComponentMetadata(
  componentId: string,
  componentName: string
): Promise<void> {
  try {
    console.log(
      `🔄 [Integration Helper] Pre-cargando metadatos para: ${componentName} (${componentId})`
    );

    // Inicializar caché
    await ComponentMetadataCache.initialize();

    // Verificar si ya está en caché
    const cached = await ComponentMetadataCache.get(componentId, componentName);
    if (cached) {
      console.log(
        `   ✅ Metadatos ya están en caché para: ${componentName}`
      );
      return;
    }

    // Pre-cargar variantes, propiedades y tipos en paralelo
    const [
      { DynamicVariantExtractor },
      { DynamicPropertyExtractor },
      { DynamicTypeExtractor },
    ] = await Promise.all([
      import('./dynamicVariantExtractor.js'),
      import('./dynamicPropertyExtractor.js'),
      import('./dynamicTypeExtractor.js'),
    ]);

    await Promise.all([
      DynamicVariantExtractor.extractVariants(componentId, componentName),
      DynamicPropertyExtractor.extractProperties(componentId, componentName),
      DynamicTypeExtractor.extractTypes(componentId, componentName),
    ]);

    console.log(
      `   ✅ Metadatos pre-cargados para: ${componentName}`
    );
  } catch (error: any) {
    console.warn(
      `⚠️ [Integration Helper] Error pre-cargando metadatos: ${error.message}`
    );
  }
}

/**
 * Obtener información completa de un componente (desde caché o extracción)
 */
export async function getComponentMetadata(
  componentId: string,
  componentName: string
): Promise<{
  variants?: ComponentMetadataCache['components'][string]['variants'];
  properties?: ComponentMetadataCache['components'][string]['properties'];
  types?: ComponentMetadataCache['components'][string]['types'];
}> {
  try {
    // Inicializar caché
    await ComponentMetadataCache.initialize();

    // Obtener desde caché
    const cached = await ComponentMetadataCache.get(componentId, componentName);
    
    if (cached) {
      return {
        variants: cached.variants,
        properties: cached.properties,
        types: cached.types,
      };
    }

    // Si no está en caché, extraer y cachear
    const [
      { DynamicVariantExtractor },
      { DynamicPropertyExtractor },
      { DynamicTypeExtractor },
    ] = await Promise.all([
      import('./dynamicVariantExtractor.js'),
      import('./dynamicPropertyExtractor.js'),
      import('./dynamicTypeExtractor.js'),
    ]);

    const [variantsResult, propertiesResult, typesResult] = await Promise.all([
      DynamicVariantExtractor.extractVariants(componentId, componentName),
      DynamicPropertyExtractor.extractProperties(componentId, componentName),
      DynamicTypeExtractor.extractTypes(componentId, componentName),
    ]);

    return {
      variants: variantsResult.variants.map(v => ({
        propName: v.propName,
        values: v.values,
        description: v.description,
      })),
      properties: propertiesResult.properties.map(p => ({
        name: p.propName,
        alias: p.aliases,
        type: p.type === 'boolean' ? 'boolean' : p.type === 'string' ? 'text' : p.type === 'number' ? 'number' : 'enum',
        description: p.description,
        possibleValues: p.values,
      })),
      types: typesResult.types.map(t => ({
        propName: t.propName,
        values: t.values,
        description: t.description,
        componentSpecific: t.componentSpecific,
      })),
    };
  } catch (error: any) {
    console.warn(
      `⚠️ [Integration Helper] Error obteniendo metadatos: ${error.message}`
    );
    return {};
  }
}

/**
 * Invalidar caché de un componente específico
 */
export async function invalidateComponentCache(
  componentId?: string,
  componentName?: string
): Promise<void> {
  try {
    await ComponentMetadataCache.invalidate(componentId, componentName);
    
    // También invalidar caché de extractores individuales
    if (componentId && componentName) {
      const [
        { DynamicVariantExtractor },
        { DynamicPropertyExtractor },
        { DynamicTypeExtractor },
      ] = await Promise.all([
        import('./dynamicVariantExtractor.js'),
        import('./dynamicPropertyExtractor.js'),
        import('./dynamicTypeExtractor.js'),
      ]);

      await Promise.all([
        DynamicVariantExtractor.invalidateCache(componentId, componentName),
        DynamicPropertyExtractor.invalidateCache(componentId, componentName),
        DynamicTypeExtractor.invalidateCache(componentId, componentName),
      ]);
    }
  } catch (error: any) {
    console.warn(
      `⚠️ [Integration Helper] Error invalidando caché: ${error.message}`
    );
  }
}

/**
 * Obtener estadísticas del sistema de caché
 */
export async function getCacheStats(): Promise<{
  total: number;
  valid: number;
  expired: number;
}> {
  try {
    await ComponentMetadataCache.initialize();
    return await ComponentMetadataCache.getStats();
  } catch (error: any) {
    console.warn(
      `⚠️ [Integration Helper] Error obteniendo estadísticas: ${error.message}`
    );
    return { total: 0, valid: 0, expired: 0 };
  }
}

/**
 * Helper de integración centralizado
 */
export class IntegrationHelper {
  /**
   * Llama automáticamente al sistema de MCP para los componentes dados.
   * Centraliza la lógica de llamada a MCP.
   */
  static async autoCallStorybookMCP(
    componentNames: string[]
  ): Promise<Array<{ componentName: string; storybookId: string; success: boolean; message?: string }>> {
    const results: Array<{ componentName: string; storybookId: string; success: boolean; message?: string }> = [];

    for (const componentName of componentNames) {
      try {
        const storybookId = await mapComponentNameToStorybookId(componentName);

        if (storybookId) {
          const mcpServer = await this.getMcpServerName();
          const actualComponentName = (await storybookIdToComponentName(storybookId)) || componentName;

          console.log(
            `📚 [Integration Helper] ⚠️ OBLIGATORIO: El agente DEBE ejecutar automáticamente:`
          );
          console.log(`   call_mcp_tool({`);
          console.log(`     server: "${mcpServer}",`);
          console.log(`     toolName: "getComponentsProps",`);
          console.log(
            `     arguments: { componentNames: ["${actualComponentName}"] }`
          );
          console.log(`   })`);
          console.log(
            `📚 [Integration Helper] ⚠️ CRÍTICO: NO continuar con implementación hasta obtener props`
          );

          results.push({
            componentName,
            storybookId,
            success: true,
          });
        } else {
          console.warn(
            `⚠️ [Integration Helper] No se pudo obtener ID de Storybook para: ${componentName}`
          );
          results.push({
            componentName,
            storybookId: 'N/A',
            success: false,
            message: `No se pudo obtener ID de Storybook para: ${componentName}`,
          });
        }
      } catch (error: any) {
        console.error(
          `❌ [Integration Helper] Error procesando componente ${componentName} para MCP: ${error.message}`
        );
        results.push({
          componentName,
          storybookId: 'N/A',
          success: false,
          message: `Error: ${error.message}`,
        });
      }
    }
    return results;
  }

  /**
   * Obtiene el nombre del servidor MCP a usar (siempre "storybook" unificado).
   */
  private static async getMcpServerName(): Promise<string> {
    try {
      const manager = StorybookManager.getInstance();
      const activeConfig = await manager.getActiveConfig();
      if (activeConfig) {
        console.log(
          `📚 [Integration Helper] Storybook activo: ${activeConfig.name} (${activeConfig.url})`
        );
        console.log(
          `📚 [Integration Helper] ⚠️ IMPORTANTE: El servidor MCP debe estar configurado con STORYBOOK_URL=${activeConfig.url}/index.json`
        );
      }
    } catch (error) {
      console.warn(
        `⚠️ [Integration Helper] No se pudo obtener la configuración activa de Storybook: ${error.message}`
      );
    }
    return 'storybook'; // Siempre usar "storybook" como nombre del servidor (unificado)
  }
}
