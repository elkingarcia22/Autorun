/**
 * ✅ Tool: autorun.storybook.extract v2
 * 
 * Extrae código HTML/JS directamente desde Storybook
 * Integra con función existente
 */

import type { AutorunStorybookExtractInput, AutorunStorybookExtractOutput } from '../types.js';

/**
 * ✅ Extrae código desde Storybook
 */
export async function autorunStorybookExtract(
  input: AutorunStorybookExtractInput
): Promise<AutorunStorybookExtractOutput> {
  console.error('🔍 [autorun.storybook.extract v2] Extrayendo código...');
  console.error(`   Componente: ${input.componentId || input.componentName || 'N/A'}`);

  try {
    // ⚠️ CRÍTICO: Usar la función existente
    const { autorunStorybookExtract: autorunStorybookExtractOriginal } = await import(
      '../../mcp-server/tools/autorunStorybookExtract.js'
    );

    return await autorunStorybookExtractOriginal(input);
  } catch (error: any) {
    console.error(`❌ [autorun.storybook.extract v2] Error: ${error.message}`);
    
    return {
      success: false,
      error: error.message,
      message: `Error extrayendo código: ${error.message}`,
    };
  }
}

