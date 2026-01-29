/**
 * ✅ Tool: autorun.storybook.build v2
 * 
 * Construye Storybook estático
 * Integra con función existente
 */

import type { AutorunStorybookBuildInput, AutorunStorybookBuildOutput } from '../types.js';

/**
 * ✅ Construye Storybook estático
 */
export async function autorunStorybookBuild(
  input: AutorunStorybookBuildInput = {}
): Promise<AutorunStorybookBuildOutput> {
  console.error('📚 [autorun.storybook.build v2] Construyendo Storybook...');

  try {
    // ⚠️ CRÍTICO: Usar la función existente
    const { autorunStorybookBuild: autorunStorybookBuildOriginal } = await import(
      '../../mcp-server/tools/autorunStorybookBuild.js'
    );

    return await autorunStorybookBuildOriginal(input);
  } catch (error: any) {
    console.error(`❌ [autorun.storybook.build v2] Error: ${error.message}`);
    
    return {
      success: false,
      error: error.message,
      message: `Error construyendo Storybook: ${error.message}`,
    };
  }
}

