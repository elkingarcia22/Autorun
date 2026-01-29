/**
 * ✅ Tool: autorun.visual.test v2
 * 
 * Ejecuta tests visuales con Chromatic
 * Integra con función existente
 */

import type { AutorunVisualTestInput, AutorunVisualTestOutput } from '../types.js';

/**
 * ✅ Ejecuta tests visuales
 */
export async function autorunVisualTest(
  input: AutorunVisualTestInput = {}
): Promise<AutorunVisualTestOutput> {
  console.error('🎨 [autorun.visual.test v2] Ejecutando tests visuales...');

  try {
    // ⚠️ CRÍTICO: Usar la función existente
    const { autorunVisualTest: autorunVisualTestOriginal } = await import(
      '../../mcp-server/tools/autorunVisualTest.js'
    );

    return await autorunVisualTestOriginal(input);
  } catch (error: any) {
    console.error(`❌ [autorun.visual.test v2] Error: ${error.message}`);
    
    return {
      success: false,
      passed: 0,
      failed: 0,
      new: 0,
      changed: 0,
      error: error.message,
    };
  }
}

