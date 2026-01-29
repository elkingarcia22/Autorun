/**
 * ✅ Tool: autorun.problems.list v2
 *
 * Lista problemas detectados por Problem Tracker
 * Integra con función existente
 */

import type {
  AutorunProblemsListInput,
  AutorunProblemsListOutput,
} from '../types.js';

/**
 * ✅ Lista problemas detectados
 */
export async function autorunProblemsList(
  input: AutorunProblemsListInput = {}
): Promise<AutorunProblemsListOutput> {
  console.error('📋 [autorun.problems.list v2] Listando problemas...');

  try {
    // ⚠️ CRÍTICO: Usar la función existente
    const { autorunProblemsList: autorunProblemsListOriginal } = await import(
      '../../mcp-server/tools/autorunProblemsList.js'
    );

    const result = await autorunProblemsListOriginal(input);

    // Convertir al formato esperado
    return {
      problems: (result.problems || []).map((p: any) => ({
        id: p.id,
        category: p.category,
        severity: p.severity,
        message: p.message || p.description || 'Problema sin descripción',
        description: p.description,
        detectedAt: p.detectedAt,
        metadata: p.metadata,
        resolved: p.resolved || false,
      })),
      total: result.total || 0,
      unresolved: result.unresolved || 0,
    };
  } catch (error: any) {
    console.error(`❌ [autorun.problems.list v2] Error: ${error.message}`);

    return {
      problems: [],
      total: 0,
      unresolved: 0,
    };
  }
}
