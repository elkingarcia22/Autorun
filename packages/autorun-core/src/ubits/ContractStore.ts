/**
 * ✅ ContractStore - Acceso a contratos UBITS desde stories
 * 
 * Usa extractMetadataFromStory existente para leer parameters.ubits
 */

import { extractMetadataFromStory } from '../helpers/storybookMetadataExtractor.js';

// ✅ Tipo UBITSContract (definido localmente para evitar dependencia externa)
export interface UBITSContract {
  componentId: string;
  api?: {
    create?: string;
    tag?: string;
    apply?: string;
    templatePath?: string;
  };
  dependsOn?: {
    required: string[];
    optional: string[];
  };
  internals?: string[];
  slots?: {
    [key: string]: string[];
  };
  tokensUsed?: string[];
  rules?: {
    forbidHardcodedColors?: boolean;
    forbiddenPatterns?: string[];
    requiredProps?: string[];
  };
  isTemplate?: boolean;
  templateComponents?: string[];
}

/**
 * ✅ ContractStore - Proporciona acceso a contratos UBITS
 */
export class ContractStore {
  private cache: Map<string, UBITSContract | null> = new Map();

  /**
   * ✅ Obtiene contrato por componentId (desde stories)
   */
  async getById(componentId: string): Promise<UBITSContract | null> {
    // Verificar cache
    if (this.cache.has(componentId)) {
      return this.cache.get(componentId) || null;
    }

    // Intentar extraer desde story
    try {
      const metadata = await extractMetadataFromStory(componentId, 'default');
      
      if (metadata && metadata.componentId) {
        // Convertir StorybookMetadata a UBITSContract
        const contract: UBITSContract = {
          componentId: metadata.componentId || componentId,
          dependsOn: metadata.dependsOn || { required: [], optional: [] },
          internals: metadata.internals || [],
          tokensUsed: metadata.tokensUsed || [],
          slots: metadata.slots || {},
        };

        this.cache.set(componentId, contract);
        return contract;
      }
    } catch (error: any) {
      console.warn(`⚠️ Error obteniendo contrato para ${componentId}: ${error.message}`);
    }

    // Si no se encuentra, cachear null
    this.cache.set(componentId, null);
    return null;
  }

  /**
   * ✅ Valida que un componente existe
   */
  async validateExists(componentId: string): Promise<boolean> {
    const contract = await this.getById(componentId);
    return contract !== null;
  }

  /**
   * ✅ Busca componentes por nombre (fuzzy)
   * 
   * Busca en todas las stories disponibles usando storybookStories
   */
  async findByNameLike(searchName: string): Promise<string[]> {
    const normalizedSearch = searchName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const results: string[] = [];

    try {
      // Obtener lista de todos los componentes disponibles
      const { discoverStorybookComponents } = await import('../helpers/storybookIdDiscovery.js');
      const discoveryResult = await discoverStorybookComponents();
      const allComponents = discoveryResult.components.map(c => c.componentId);

      // Buscar coincidencias parciales
      for (const componentId of allComponents) {
        const normalizedId = componentId.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Coincidencia exacta
        if (normalizedId === normalizedSearch) {
          results.push(componentId);
          continue;
        }

        // Coincidencia parcial (contiene el término de búsqueda)
        if (normalizedId.includes(normalizedSearch) || normalizedSearch.includes(normalizedId)) {
          results.push(componentId);
          continue;
        }

        // Buscar en el contrato si existe
        const contract = await this.getById(componentId);
        if (contract) {
          const contractName = (contract.componentId || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          if (contractName.includes(normalizedSearch)) {
            results.push(componentId);
          }
        }
      }

      // Si no hay resultados, intentar búsqueda directa
      if (results.length === 0) {
        const directContract = await this.getById(searchName);
        if (directContract) {
          results.push(directContract.componentId);
        }
      }

      return [...new Set(results)]; // Eliminar duplicados
    } catch (error: any) {
      console.warn(`⚠️ Error en búsqueda de componentes: ${error.message}`);
      // Fallback: búsqueda directa
      const contract = await this.getById(searchName);
      return contract ? [contract.componentId] : [];
    }
  }
}
