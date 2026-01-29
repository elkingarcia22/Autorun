/**
 * ✅ Tool: autorun.github.commit v2
 * 
 * Hace commit manual de archivos en GitHub
 * Integra con función existente
 */

import type { AutorunGitHubCommitInput, AutorunGitHubCommitOutput } from '../types.js';

/**
 * ✅ Hace commit manual
 */
export async function autorunGitHubCommit(
  input: AutorunGitHubCommitInput
): Promise<AutorunGitHubCommitOutput> {
  console.error('🔧 [autorun.github.commit v2] Haciendo commit...');
  console.error(`   Archivos: ${input.files.join(', ')}`);
  console.error(`   Mensaje: ${input.message}`);

  try {
    // ⚠️ CRÍTICO: Usar la función existente
    const { autorunGitHubCommit: autorunGitHubCommitOriginal } = await import(
      '../../mcp-server/tools/autorunGitHubCommit.js'
    );

    return await autorunGitHubCommitOriginal(input);
  } catch (error: any) {
    console.error(`❌ [autorun.github.commit v2] Error: ${error.message}`);
    
    return {
      success: false,
      error: error.message,
      message: `Error haciendo commit: ${error.message}`,
    };
  }
}

