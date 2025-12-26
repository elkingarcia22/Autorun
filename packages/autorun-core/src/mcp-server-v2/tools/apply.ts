/**
 * ✅ Tool: autorun.apply v2
 *
 * Tool más crítico del MCP - ejecuta TODO el flujo de implementación
 * Creado desde cero - bien estructurado y robusto
 *
 * ⚠️ CRÍTICO: Integra con funciones existentes de Autorun pero mantiene estructura limpia
 */

import type { AutorunApplyInput, AutorunApplyOutput } from '../types.js';

/**
 * ✅ Ejecuta el flujo completo de implementación
 *
 * ⚠️ CRÍTICO: Usa las funciones existentes de Autorun pero con estructura limpia
 */
export async function autorunApply(
  input: AutorunApplyInput
): Promise<AutorunApplyOutput> {
  console.error('🚀 [autorun.apply v2] Iniciando implementación...');
  console.error(`   📝 Mensaje: ${input.message}`);
  console.error(
    `   📁 Archivos objetivo: ${input.targetFiles?.join(', ') || 'auto-detect'}`
  );

  try {
    // ⚠️ PASO 1: Validar input
    if (!input.message || input.message.trim().length === 0) {
      // ⚠️ CRÍTICO: NO usar throw - retornar error directamente
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

    // ⚠️ PASO 2: Activar modo autorun.apply() globalmente
    // Esto permite que las validaciones no bloqueen el flujo
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).__AUTORUN_APPLY_MODE__ = true;
    }
    if (typeof global !== 'undefined') {
      (global as any).__AUTORUN_APPLY_MODE__ = true;
    }
    console.error(`   ✅ Modo autorun.apply() activado globalmente`);

    // ⚠️ PASO 3: Usar la función existente de autorun.apply() del MCP anterior
    // Pero con estructura limpia y manejo de errores mejorado
    const { autorunApply: autorunApplyOriginal } = await import(
      '../../mcp-server/tools/autorunApply.js'
    );

    // Convertir input al formato esperado por la función original
    const originalInput = {
      message: input.message,
      targetFiles: input.targetFiles,
      options: {
        ...input.options,
        // Asegurar que las opciones estén bien definidas
        skipVerification: input.options?.skipVerification ?? false,
        dryRun: input.options?.dryRun ?? false,
        skipFormatting: input.options?.skipFormatting ?? false,
        skipLinting: input.options?.skipLinting ?? false,
        skipAutoReload: input.options?.skipAutoReload ?? false,
        skipAutoCommit: input.options?.skipAutoCommit ?? false,
      },
    };

    console.error(
      `   🔄 [PASO 3] Llamando función original de autorun.apply()...`
    );
    console.error(
      `   ⏰ Timestamp antes de llamar: ${new Date().toISOString()}`
    );

    let result: any = null;
    try {
      result = await autorunApplyOriginal(originalInput);
      console.error(`   ✅ [PASO 3] Función original completada exitosamente`);
      console.error(
        `   ⏰ Timestamp después de llamar: ${new Date().toISOString()}`
      );
      console.error(
        `   📊 Resultado: success=${result?.success}, errors=${result?.errors?.length || 0}, warnings=${result?.warnings?.length || 0}`
      );
    } catch (originalError: any) {
      console.error(
        `   ❌ [PASO 3] ERROR en función original: ${originalError.message}`
      );
      console.error(`   📋 Stack: ${originalError.stack}`);
      console.error(`   ⏰ Timestamp del error: ${new Date().toISOString()}`);

      // Retornar error en lugar de propagarlo
      return {
        success: false,
        filesWritten: [],
        errors: [`Error en autorun.apply() original: ${originalError.message}`],
        verification: {
          preImplementation: false,
          postImplementation: false,
        },
      };
    }

    // Convertir resultado al formato del nuevo MCP
    console.error(
      `   ✅ [PASO 4] Convirtiendo resultado al formato del nuevo MCP...`
    );
    const finalResult = {
      success: result.success,
      filesWritten: result.filesWritten || [],
      errors: result.errors,
      warnings: result.warnings,
      verification: {
        preImplementation: result.verification?.preImplementation ?? false,
        postImplementation: result.verification?.postImplementation ?? false,
      },
    };
    console.error(
      `   ✅ [PASO 4] Resultado convertido: success=${finalResult.success}`
    );
    console.error(`   ⏰ Timestamp final: ${new Date().toISOString()}`);
    console.error(
      '🚀 [autorun.apply v2] ========================================'
    );
    return finalResult;
  } catch (error: any) {
    console.error(
      `❌ [autorun.apply v2] ========================================`
    );
    console.error(
      `❌ [autorun.apply v2] ERROR EN CATCH PRINCIPAL: ${error.message}`
    );
    console.error(`   📋 Tipo de error: ${error.constructor.name}`);
    console.error(`   📋 Stack completo:`);
    console.error(error.stack);
    console.error(`   ⏰ Timestamp del error: ${new Date().toISOString()}`);
    console.error(
      `❌ [autorun.apply v2] ========================================`
    );

    return {
      success: false,
      filesWritten: [],
      errors: [error.message],
      verification: {
        preImplementation: false,
        postImplementation: false,
      },
    };
  }
}
