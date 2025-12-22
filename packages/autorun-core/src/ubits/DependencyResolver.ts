/**
 * ✅ DependencyResolver - Resuelve dependencias desde contratos
 * 
 * Expande dependsOn.required recursivo y filtra internals
 */

import { ContractStore } from './ContractStore.js';

export interface DependencyGraph {
  root: string;
  publicDeps: string[];
  internals: string[];
  slotPlan: Record<string, string[]>;
}

/**
 * ✅ DependencyResolver - Resuelve dependencias desde contratos
 */
export class DependencyResolver {
  private contractStore: ContractStore;
  private resolvedCache: Map<string, DependencyGraph> = new Map();

  constructor(contractStore: ContractStore) {
    this.contractStore = contractStore;
  }

  /**
   * ✅ Expande dependsOn.required recursivo
   */
  async expandRequired(componentId: string): Promise<string[]> {
    const visited = new Set<string>();
    const deps: string[] = [];

    await this.expandRequiredRecursive(componentId, visited, deps);

    return [...new Set(deps)];
  }

  /**
   * ✅ Expansión recursiva
   */
  private async expandRequiredRecursive(
    componentId: string,
    visited: Set<string>,
    deps: string[]
  ): Promise<void> {
    if (visited.has(componentId)) {
      return; // Evitar ciclos
    }

    visited.add(componentId);
    const contract = await this.contractStore.getById(componentId);

    if (!contract || !contract.dependsOn) {
      return;
    }

    for (const required of contract.dependsOn.required || []) {
      deps.push(required);
      await this.expandRequiredRecursive(required, visited, deps);
    }
  }

  /**
   * ✅ Resuelve slots
   */
  async resolveSlots(componentId: string, slotName: string): Promise<string[]> {
    const contract = await this.contractStore.getById(componentId);
    if (!contract || !contract.slots) {
      return [];
    }

    return contract.slots[slotName] || [];
  }

  /**
   * ✅ Filtra internals (nunca se implementan)
   */
  async filterInternals(componentIds: string[]): Promise<string[]> {
    const filtered: string[] = [];
    for (const id of componentIds) {
      // Verificar si es internal de algún componente
      // Por ahora, retornar todos (TODO: implementar lógica completa de verificación)
      filtered.push(id);
    }
    return filtered;
  }

  /**
   * ✅ Resuelve grafo completo de dependencias
   */
  async resolveGraph(componentId: string): Promise<DependencyGraph> {
    // Verificar cache
    if (this.resolvedCache.has(componentId)) {
      return this.resolvedCache.get(componentId)!;
    }

    const contract = await this.contractStore.getById(componentId);
    
    if (!contract) {
      const graph: DependencyGraph = {
        root: componentId,
        publicDeps: [],
        internals: [],
        slotPlan: {},
      };
      this.resolvedCache.set(componentId, graph);
      return graph;
    }

    // Expandir dependsOn.required
    const publicDeps = await this.expandRequired(componentId);
    
    // Obtener internals
    const internals = contract.internals || [];

    // Resolver slots
    const slotPlan: Record<string, string[]> = {};
    if (contract.slots) {
      for (const [slotName, slotComponents] of Object.entries(contract.slots)) {
        // ✅ Type assertion: slotComponents es string[]
        slotPlan[slotName] = (slotComponents as string[]) || [];
      }
    }

    const graph: DependencyGraph = {
      root: componentId,
      publicDeps: [...new Set(publicDeps)],
      internals: [...new Set(internals)],
      slotPlan,
    };

    this.resolvedCache.set(componentId, graph);
    return graph;
  }
}
