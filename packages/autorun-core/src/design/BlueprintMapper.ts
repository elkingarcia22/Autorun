/**
 * ✅ BlueprintMapper - Mapea Blueprint → UBITS/Widgets
 * 
 * Responsabilidad:
 * - Si viene de Figma con instancias claras → mapear a UBITS directo
 * - Si viene de imagen: mapear a UBITS solo si confidence alto
 * - Si no, usar TokenWidget
 */

import type { Blueprint } from './BlueprintFromDesign.js';
import { ContractStore } from '../ubits/ContractStore.js';

export interface MappedComponent {
  componentId?: string;
  componentName: string;
  useUBITS: boolean; // true = usar componente UBITS, false = usar TokenWidget
  props?: Record<string, any>;
  confidence: number;
}

export interface MappedBlueprint {
  sections: Array<{
    type: Blueprint['sections'][0]['type'];
    intent: string;
    components: MappedComponent[];
  }>;
}

/**
 * ✅ Mapea Blueprint → UBITS/Widgets
 */
export class BlueprintMapper {
  private contractStore: ContractStore;

  constructor(contractStore: ContractStore) {
    this.contractStore = contractStore;
  }

  /**
   * ✅ Mapea Blueprint a componentes UBITS o TokenWidgets
   */
  async map(blueprint: Blueprint, source: 'figma' | 'image'): Promise<MappedBlueprint> {
    console.log(`🔍 [BlueprintMapper] Mapeando Blueprint → UBITS/Widgets...`);
    console.log(`   Fuente: ${source}`);

    const mappedSections: MappedBlueprint['sections'] = [];

    for (const section of blueprint.sections) {
      const mappedComponents: MappedComponent[] = [];

      for (const component of section.components) {
        let useUBITS = false;
        let componentId = component.componentId;

        // Si viene de Figma con componentId, intentar validar que existe
        if (source === 'figma' && componentId) {
          const exists = await this.contractStore.validateExists(componentId);
          if (exists) {
            useUBITS = true;
            console.log(`   ✅ Componente UBITS encontrado: ${componentId}`);
          } else {
            console.warn(`   ⚠️ Componente UBITS no encontrado: ${componentId}, usando TokenWidget`);
          }
        }

        // Si viene de imagen, solo usar UBITS si confidence es alto
        if (source === 'image') {
          if (component.confidence >= 0.8 && componentId) {
            const exists = await this.contractStore.validateExists(componentId);
            if (exists) {
              useUBITS = true;
            }
          }
        }

        // Si no hay componentId, intentar buscar por nombre
        if (!componentId && component.componentName) {
          const found = await this.contractStore.findByNameLike(component.componentName);
          if (found.length > 0) {
            componentId = found[0];
            const exists = await this.contractStore.validateExists(componentId);
            if (exists) {
              useUBITS = true;
            }
          }
        }

        mappedComponents.push({
          componentId,
          componentName: component.componentName,
          useUBITS,
          props: component.props,
          confidence: component.confidence,
        });
      }

      mappedSections.push({
        type: section.type,
        intent: section.intent,
        components: mappedComponents,
      });
    }

    return { sections: mappedSections };
  }
}

