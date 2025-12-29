/**
 * ✅ Tool: autorun.apply v2
 *
 * Tool más crítico del MCP - ejecuta TODO el flujo de implementación
 * Creado desde cero - bien estructurado con logs detallados
 *
 * ⚠️ CRÍTICO: Integra con función existente pero mantiene estructura limpia
 *
 * Flujo completo:
 * 1. handleUserMessage() → Detección automática
 * 2. Storybook MCP → Props exactas
 * 3. Extracción código exacto desde Storybook
 * 4. Validación pre-implementación
 * 5. Análisis componentes internos
 * 6. Escritura con marcas Autorun
 * 7. Post-implementación (Prettier, ESLint, Auto-Reload, GitHub)
 */

import type { AutorunApplyInput, AutorunApplyOutput } from '../types.js';

/**
 * ✅ Ejecuta el flujo completo de implementación
 *
 * Esta es la herramienta más importante del MCP. Ejecuta TODO el flujo
 * automático de implementación de componentes desde Storybook.
 *
 * ⚠️ CRÍTICO: Esta herramienta SIEMPRE consulta Storybook MCP automáticamente,
 * por lo que NO debe ser bloqueada por Pre-Implementation Check.
 */
export async function autorunApply(
  input: AutorunApplyInput
): Promise<AutorunApplyOutput> {
  console.error(
    '🚀 [autorun.apply v2] ========================================'
  );
  console.error('🚀 [autorun.apply v2] Iniciando implementación...');
  console.error(`   ⏰ Timestamp: ${new Date().toISOString()}`);
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
    if (!input.message || input.message.trim().length === 0) {
      console.error('   ❌ [PASO 1] Error: Mensaje vacío');
      return {
        success: false,
        filesWritten: [],
        errors: ['El mensaje no puede estar vacío'],
        verification: {
          preImplementation: false,
          postImplementation: false,
          errors: ['El mensaje no puede estar vacío'],
          warnings: [],
        },
        components: [],
      };
    }
    console.error('   ✅ [PASO 1] Input válido');

    console.error(
      '   ✅ [PASO 2] Activando modo autorun.apply() globalmente...'
    );
    // ⚠️ CRÍTICO: Activar modo autorun.apply() globalmente
    // Esto permite que las validaciones no bloqueen el flujo
    // autorun.apply() SIEMPRE consulta Storybook automáticamente
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).__AUTORUN_APPLY_MODE__ = true;
    }
    if (typeof global !== 'undefined') {
      (global as any).__AUTORUN_APPLY_MODE__ = true;
    }
    console.error(`   ✅ [PASO 2] Modo autorun.apply() activado globalmente`);

    console.error(
      '   ✅ [PASO 3] Importando función original de autorun.apply()...'
    );
    const importStart = Date.now();
    const { autorunApply: autorunApplyOriginal } = await import(
      '../../mcp-server/tools/autorunApply.js'
    );
    const importTime = Date.now() - importStart;
    console.error(`   ✅ [PASO 3] Función importada en ${importTime}ms`);

    console.error('   ✅ [PASO 4] Preparando input para función original...');
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
        mode: input.options?.mode,
        requireStorybookMcp: input.options?.requireStorybookMcp ?? true,
        allowPrototypeTokens: input.options?.allowPrototypeTokens,
        anchors: input.options?.anchors,
      },
      design: input.design,
    };
    console.error(`   ✅ [PASO 4] Input preparado`);

    console.error(
      '   ✅ [PASO 5] Llamando función original de autorun.apply()...'
    );
    console.error(
      `   ⏰ Timestamp antes de llamar: ${new Date().toISOString()}`
    );
    const callStart = Date.now();

    let result: any = null;
    try {
      result = await autorunApplyOriginal(originalInput);
      const callTime = Date.now() - callStart;
      console.error(`   ✅ [PASO 5] Función ejecutada en ${callTime}ms`);
      console.error(
        `   ⏰ Timestamp después de llamar: ${new Date().toISOString()}`
      );
      console.error(`   📊 Resultado:`);
      console.error(`      - success: ${result?.success ? '✅ SÍ' : '❌ NO'}`);
      console.error(
        `      - filesWritten: ${result?.filesWritten?.length || 0} archivo(s)`
      );
      console.error(`      - errors: ${result?.errors?.length || 0}`);
      console.error(`      - warnings: ${result?.warnings?.length || 0}`);
      if (result?.filesWritten && result.filesWritten.length > 0) {
        console.error(`      - Archivos escritos:`);
        result.filesWritten.forEach((file: string, index: number) => {
          console.error(`         ${index + 1}. ${file}`);
        });
      }
      if (result?.errors && result.errors.length > 0) {
        console.error(`      - Errores:`);
        result.errors.forEach((error: string, index: number) => {
          console.error(`         ${index + 1}. ${error}`);
        });
      }
      if (result?.warnings && result.warnings.length > 0) {
        console.error(`      - Advertencias:`);
        result.warnings.forEach((warning: string, index: number) => {
          console.error(`         ${index + 1}. ${warning}`);
        });
      }
    } catch (originalError: any) {
      const callTime = Date.now() - callStart;
      console.error(
        `   ❌ [PASO 5] ERROR en función original después de ${callTime}ms:`
      );
      console.error(`      - Mensaje: ${originalError.message}`);
      console.error(`      - Tipo: ${originalError.constructor.name}`);
      console.error(
        `      - Stack: ${originalError.stack ? originalError.stack.substring(0, 500) : 'N/A'}`
      );
      console.error(`   ⏰ Timestamp del error: ${new Date().toISOString()}`);

      // Retornar error en lugar de propagarlo
      return {
        success: false,
        filesWritten: [],
        errors: [`Error en autorun.apply() original: ${originalError.message}`],
        warnings: [],
        verification: {
          preImplementation: false,
          postImplementation: false,
        },
      };
    }

    console.error('   ✅ [PASO 6] Procesando resultado...');
    // Convertir resultado al formato del nuevo MCP
    const processedResult: AutorunApplyOutput = {
      success: result.success ?? false,
      filesWritten: result.filesWritten || [],
      errors: result.errors,
      warnings: result.warnings,
      verification: {
        preImplementation: result.verification?.preImplementation ?? false,
        postImplementation: result.verification?.postImplementation ?? false,
        prettier: result.verification?.prettier,
        eslint: result.verification?.eslint,
        autoReload: result.verification?.autoReload,
        github: result.verification?.github,
        visual: result.verification?.visual,
        errors: result.verification?.errors || [],
        warnings: result.verification?.warnings || [],
      },
      components: result.components || [],
      plan: result.plan,
    };

    console.error('   ✅ [PASO 6] Resultado procesado:');
    console.error(
      `      - success: ${processedResult.success ? '✅ SÍ' : '❌ NO'}`
    );
    console.error(
      `      - filesWritten: ${processedResult.filesWritten.length} archivo(s)`
    );
    console.error(`      - verification:`);
    console.error(
      `        • preImplementation: ${processedResult.verification.preImplementation ? '✅' : '❌'}`
    );
    console.error(
      `        • postImplementation: ${processedResult.verification.postImplementation ? '✅' : '❌'}`
    );
    if (processedResult.components && processedResult.components.length > 0) {
      console.error(
        `      - components: ${processedResult.components.length} componente(s)`
      );
      processedResult.components.forEach((comp: any, index: number) => {
        console.error(
          `         ${index + 1}. ${comp.name} (${comp.storybookId}) - ${comp.implemented ? '✅' : '❌'}`
        );
      });
    }

    console.error(
      '🚀 [autorun.apply v2] ========================================'
    );
    return processedResult;
  } catch (error: any) {
    console.error('❌ [autorun.apply v2] ERROR EN CATCH PRINCIPAL:', error);
    console.error(`   📋 Mensaje: ${error.message}`);
    console.error(`   📋 Tipo: ${error.constructor.name}`);
    console.error(
      `   📋 Stack: ${error.stack ? error.stack.substring(0, 500) : 'N/A'}`
    );
    console.error(`   ⏰ Timestamp del error: ${new Date().toISOString()}`);
    console.error(
      '🚀 [autorun.apply v2] ========================================'
    );

    return {
      success: false,
      filesWritten: [],
      errors: [
        error.message || 'Error desconocido al ejecutar autorun.apply()',
      ],
      warnings: [],
      verification: {
        preImplementation: false,
        postImplementation: false,
        errors: [
          error.message || 'Error desconocido al ejecutar autorun.apply()',
        ],
        warnings: [],
      },
      components: [],
    };
  }
}
