/**
 * Tool: autorun.problems.list
 *
 * Lista problemas detectados por Problem Tracker
 */

import { AutorunProblemsListInput, AutorunProblemsListOutput } from '../types.js';
import { AddonOrchestrator } from '../helpers/addonOrchestrator.js';

/**
 * Lista problemas detectados
 */
export async function autorunProblemsList(
  input: AutorunProblemsListInput = {}
): Promise<AutorunProblemsListOutput> {
  console.log(`\n📋 [Autorun MCP] autorun.problems.list() llamado`);

  try {
    const orchestrator = new AddonOrchestrator();
    const hub = await orchestrator.getHub();
    const problemTrackerAddon = hub.getAddon('problem-tracker');

    if (!problemTrackerAddon || !problemTrackerAddon.isActive()) {
      return {
        problems: [],
        total: 0,
        unresolved: 0,
      };
    }

    const services = problemTrackerAddon.getServices();
    if (!services || !services.getProblems) {
      return {
        problems: [],
        total: 0,
        unresolved: 0,
      };
    }

    // Obtener problemas
    const problems = await services.getProblems({
      category: input.category,
      severity: input.severity,
      limit: input.limit,
    });

    const unresolved = (problems || []).filter((p: any) => !p.resolved).length;

    console.log(`   ✅ ${problems.length} problema(s) encontrado(s) (${unresolved} sin resolver)`);

    return {
      problems: (problems || []).map((p: any) => ({
        id: p.id || `problem-${Date.now()}`,
        description: p.description || 'Problema sin descripción',
        category: p.category || 'unknown',
        severity: ((p.severity as 'low' | 'medium' | 'high' | 'critical') || 'medium') as 'low' | 'medium' | 'high' | 'critical',
        detectedAt: p.detectedAt || new Date().toISOString(),
        resolved: p.resolved || false,
        metadata: p.metadata,
      })),
      total: problems.length,
      unresolved,
    };
  } catch (error: any) {
    console.error(`   ❌ Error listando problemas: ${error.message}`);
    return {
      problems: [],
      total: 0,
      unresolved: 0,
    };
  }
}
