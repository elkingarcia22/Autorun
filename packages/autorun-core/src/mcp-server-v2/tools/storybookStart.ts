/**
 * ✅ Tool: autorun.storybook.start v2
 * 
 * Inicia servidor de Storybook local
 * Integra con función existente
 */

import type { AutorunStorybookStartInput, AutorunStorybookStartOutput } from '../types.js';

/**
 * ✅ Inicia servidor de Storybook
 */
export async function autorunStorybookStart(
  input: AutorunStorybookStartInput = {}
): Promise<AutorunStorybookStartOutput> {
  console.error('📚 [autorun.storybook.start v2] Iniciando Storybook...');

  try {
    // ⚠️ CRÍTICO: Usar la función existente
    const { autorunStorybookStart: autorunStorybookStartOriginal } = await import(
      '../../mcp-server/tools/autorunStorybookStart.js'
    );

    return await autorunStorybookStartOriginal(input);
  } catch (error: any) {
    console.error(`❌ [autorun.storybook.start v2] Error: ${error.message}`);
    
    return {
      success: false,
      error: error.message,
      message: `Error iniciando Storybook: ${error.message}`,
    };
  }
}

