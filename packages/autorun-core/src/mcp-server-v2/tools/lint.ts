/**
 * ✅ Tool: autorun.lint v2
 * 
 * Ejecuta ESLint en archivos
 * Integra con función existente
 */

import type { AutorunLintInput, AutorunLintOutput } from '../types.js';

/**
 * ✅ Ejecuta ESLint
 */
export async function autorunLint(
  input: AutorunLintInput
): Promise<AutorunLintOutput> {
  console.error('🔍 [autorun.lint v2] Ejecutando ESLint...');
  console.error(`   Archivos: ${input.files.join(', ')}`);
  console.error(`   Fix: ${input.fix ? 'Sí' : 'No'}`);

  try {
    // ⚠️ CRÍTICO: Usar la función existente
    const { autorunLint: autorunLintOriginal } = await import(
      '../../mcp-server/tools/autorunLint.js'
    );

    return await autorunLintOriginal(input);
  } catch (error: any) {
    console.error(`❌ [autorun.lint v2] Error: ${error.message}`);
    
    return {
      success: false,
      errors: 0,
      warnings: 0,
      fixed: 0,
      fixable: 0,
      results: [],
      error: error.message,
    };
  }
}

