/**
 * ✅ CompositionPlanner - Planifica composición completa con profundidad real
 * 
 * Usa contract.slots, dependsOn.required recursivo, e internals
 */

import { ContractStore } from './ContractStore.js';
import { DependencyResolver } from './DependencyResolver.js';

export interface CompositionPlan {
  root: string;
  slots: Record<string, Array<{
    componentId: string;
    props: any;
    children?: CompositionPlan;
  }>>;
  deps: string[];
}

/**
 * ✅ CompositionPlanner - Planifica composición completa
 */
export class CompositionPlanner {
  private contractStore: ContractStore;
  private dependencyResolver: DependencyResolver;

  constructor(contractStore: ContractStore, dependencyResolver: DependencyResolver) {
    this.contractStore = contractStore;
    this.dependencyResolver = dependencyResolver;
  }

  /**
   * ✅ Planifica composición completa
   * 
   * Input: rootComponentId, intent, maxDepth
   * Output: CompositionPlan con árbol de slots y deps
   */
  async planComposition(
    rootComponentId: string,
    intent: string,
    maxDepth: number = 3
  ): Promise<CompositionPlan> {
    const contract = await this.contractStore.getById(rootComponentId);
    const graph = await this.dependencyResolver.resolveGraph(rootComponentId);
    
    const slots: Record<string, Array<{
      componentId: string;
      props: any;
      children?: CompositionPlan;
    }>> = {};

    if (contract && contract.slots) {
      for (const [slotName, slotComponents] of Object.entries(contract.slots)) {
        slots[slotName] = [];
        
        // ✅ Type assertion: slotComponents es string[]
        const componentIds = (slotComponents as string[]) || [];
        
        for (const slotComponentId of componentIds) {
          let children: CompositionPlan | undefined;
          
          // ✅ Recursión con maxDepth
          if (maxDepth > 0) {
            try {
              children = await this.planComposition(slotComponentId, intent, maxDepth - 1);
            } catch (error: any) {
              console.warn(`⚠️ Error planificando hijo ${slotComponentId}: ${error.message}`);
              // Continuar sin hijos
            }
          }
          
          // Inferir props básicas desde intent
          const props: Record<string, any> = {};
          
          // Inferir props comunes desde palabras clave en el intent
          if (intent.toLowerCase().includes('primary') || intent.toLowerCase().includes('principal')) {
            props.variant = 'primary';
          } else if (intent.toLowerCase().includes('secondary') || intent.toLowerCase().includes('secundario')) {
            props.variant = 'secondary';
          }
          
          if (intent.toLowerCase().includes('large') || intent.toLowerCase().includes('grande')) {
            props.size = 'large';
          } else if (intent.toLowerCase().includes('small') || intent.toLowerCase().includes('pequeño')) {
            props.size = 'small';
          }

          slots[slotName].push({
            componentId: slotComponentId,
            props,
            children
          });
        }
      }
    }

    return {
      root: rootComponentId,
      slots,
      deps: graph.publicDeps
    };
  }
}
