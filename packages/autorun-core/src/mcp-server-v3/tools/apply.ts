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
  const timestamp = new Date().toISOString();
  console.error(
    '🚀 [autorun.apply v3] ========================================'
  );
  console.error('🚀 [autorun.apply v3] Iniciando implementación...');
  console.error(`   ⏰ Timestamp: ${timestamp}`);
  console.error(
    `   📝 Mensaje: ${input.message.substring(0, 100)}${input.message.length > 100 ? '...' : ''}`
  );
  console.error(
    `   📏 Longitud del mensaje: ${input.message.length} caracteres`
  );

  const targetFilesDisplay =
    input.targetFiles && Array.isArray(input.targetFiles)
      ? input.targetFiles.join(', ')
      : input.targetFiles
        ? String(input.targetFiles)
        : 'auto-detect';
  console.error(`   📁 Archivos objetivo: ${targetFilesDisplay}`);
  console.error(
    `   ⚙️ Opciones: ${JSON.stringify(input.options || {}, null, 2)}`
  );

  try {
    console.error('   ✅ [PASO 1] Validando input...');
    // Validar input
    if (!input.message || input.message.trim().length === 0) {
      console.error('   ❌ [PASO 1] Input inválido: mensaje vacío');
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
    console.error('   ✅ [PASO 1] Input válido');

    console.error(
      '   ✅ [PASO 2] Activando modo autorun.apply() globalmente...'
    );
    // Activar modo autorun.apply() globalmente
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).__AUTORUN_APPLY_MODE__ = true;
      console.error(
        `   ✅ [PASO 2] Modo activado en globalThis: ${(globalThis as any).__AUTORUN_APPLY_MODE__}`
      );
    }
    if (typeof global !== 'undefined') {
      (global as any).__AUTORUN_APPLY_MODE__ = true;
      console.error(
        `   ✅ [PASO 2] Modo activado en global: ${(global as any).__AUTORUN_APPLY_MODE__}`
      );
    }
    console.error(`   ✅ [PASO 2] Modo autorun.apply() activado globalmente`);

    console.error(
      '   ✅ [PASO 3] Importando función original de autorun.apply()...'
    );
    // Importar función original de autorun.apply()
    const { autorunApply: autorunApplyOriginal } = await import(
      '../../mcp-server/tools/autorunApply.js'
    );
    console.error(`   ✅ [PASO 3] Función importada`);

    console.error('   ✅ [PASO 4] Preparando input para función original...');
    // Preparar input
    const originalInput = {
      message: input.message,
      targetFiles: input.targetFiles,
      options: input.options || {},
      design: input.design,
    };
    console.error('   ✅ [PASO 4] Input preparado');
    console.error(
      `   🔍 [PASO 4] Input completo:`,
      JSON.stringify(originalInput, null, 2).substring(0, 500)
    );

    console.error('   ✅ [PASO 5] Ejecutando autorunApplyOriginal...');
    // Ejecutar implementación
    const result = await autorunApplyOriginal(originalInput);
    console.error('   ✅ [PASO 5] Ejecución completada');

    console.error('🎉 [autorun.apply v3] Implementación finalizada.');
    console.error(`   📊 Success: ${result.success}`);
    console.error(`   📁 Archivos escritos: ${result.filesWritten.length}`);
    if (result.filesWritten.length > 0) {
      console.error(`   📁 Archivos:`, result.filesWritten.join(', '));
    }
    if (result.errors && result.errors.length > 0) {
      console.error(`   ❌ Errores: ${result.errors.length}`);
      result.errors.forEach((error, index) => {
        console.error(`      ${index + 1}. ${error}`);
      });
    }
    if (result.warnings && result.warnings.length > 0) {
      console.error(`   ⚠️ Advertencias: ${result.warnings.length}`);
      result.warnings.forEach((warning, index) => {
        console.error(`      ${index + 1}. ${warning}`);
      });
    }
    console.error(
      `   🔍 Verificación pre-implementación: ${result.verification?.preImplementation ? '✅' : '❌'}`
    );
    console.error(
      `   🔍 Verificación post-implementación: ${result.verification?.postImplementation ? '✅' : '❌'}`
    );

    return result;
  } catch (error: any) {
    console.error(`❌ [autorun.apply v3] Error durante la implementación:`);
    console.error(`   Mensaje: ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    console.error(`   Tipo: ${error.constructor.name}`);
    if (error.cause) {
      console.error(`   Causa: ${error.cause}`);
    }

    return {
      success: false,
      filesWritten: [],
      errors: [`Error en autorun.apply: ${error.message}`],
      verification: {
        preImplementation: false,
        postImplementation: false,
      },
    };
  } finally {
    // Limpiar el modo global al finalizar
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).__AUTORUN_APPLY_MODE__ = false;
    }
    if (typeof global !== 'undefined') {
      (global as any).__AUTORUN_APPLY_MODE__ = false;
    }
    console.error('   ✅ [FINAL] Modo autorun.apply() desactivado globalmente');
    console.error(
      '🚀 [autorun.apply v3] ========================================'
    );
  }
}
