/**
 * ✅ Tool: autorun.apply v3
 *
 * Versión simplificada y robusta
 * - Manejo claro de errores
 * - Logs útiles
 * - Sin complejidad innecesaria
 */

import type {
  AutorunApplyInput,
  AutorunApplyOutput,
} from '../../mcp-server/types.js';

/**
 * ✅ Ejecuta el flujo completo de implementación
 */
export async function autorunApply(
  input: AutorunApplyInput
): Promise<AutorunApplyOutput> {
  console.error(
    '🚀 [autorun.apply v3] ========================================'
  );
  console.error('🚀 [autorun.apply v3] Iniciando implementación...');
  console.error(
    `   📝 Mensaje: ${input.message.substring(0, 100)}${input.message.length > 100 ? '...' : ''}`
  );

  try {
    // Validar input
    if (!input.message || input.message.trim().length === 0) {
      return {
        success: false,
        filesWritten: [],
        errors: ['El mensaje no puede estar vacío'],
        verification: {
          preImplementation: false,
          postImplementation: false,
        },
      };
    }

    // Activar modo autorun.apply() globalmente
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).__AUTORUN_APPLY_MODE__ = true;
    }
    if (typeof global !== 'undefined') {
      (global as any).__AUTORUN_APPLY_MODE__ = true;
    }

    // Importar función original de autorun.apply()
    console.error('   📦 Importando función de implementación...');
    const { autorunApply: autorunApplyOriginal } = await import(
      '../../mcp-server/tools/autorunApply.js'
    );

    // Preparar input
    const originalInput = {
      message: input.message,
      targetFiles: input.targetFiles,
      options: input.options || {},
    };

    // Ejecutar implementación
    console.error('   ⚙️ Ejecutando implementación...');
    const result = await autorunApplyOriginal(originalInput);

    console.error(`✅ [autorun.apply v3] Implementación completada`);
    console.error(`   📊 Success: ${result.success}`);
    console.error(`   📁 Archivos escritos: ${result.filesWritten.length}`);

    return result;
  } catch (error: any) {
    console.error(`❌ [autorun.apply v3] Error fatal:`);
    console.error(`   Mensaje: ${error.message}`);
    console.error(`   Stack: ${error.stack}`);

    return {
      success: false,
      filesWritten: [],
      errors: [`Error fatal: ${error.message}`],
      verification: {
        preImplementation: false,
        postImplementation: false,
      },
    };
  }
}
