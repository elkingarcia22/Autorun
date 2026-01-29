/**
 * ✅ Tool: autorun.verify v2
 *
 * Verifica que los archivos fueron generados correctamente por Autorun
 * Creado desde cero - bien estructurado con logs detallados
 *
 * ⚠️ CRÍTICO: Integra con función existente pero mantiene estructura limpia
 */

import type { AutorunVerifyInput, AutorunVerifyOutput } from '../types.js';

/**
 * ✅ Verifica archivos generados por Autorun
 *
 * Esta herramienta verifica que los archivos fueron generados correctamente
 * por Autorun y que cumplen con todas las validaciones:
 *
 * 1. Verifica watermarks (marcas Autorun)
 * 2. Verifica estructura del código
 * 3. Verifica tokens de diseño (no hardcoded colors)
 * 4. Verifica accesibilidad
 * 5. Compara con código fuente de Storybook
 *
 * Puede verificar:
 * - Archivos específicos: targetFiles = ['path/to/file.html']
 * - Cambios en git: targetFiles = 'diff' (verifica todos los cambios)
 */
export async function autorunVerify(
  input: AutorunVerifyInput
): Promise<AutorunVerifyOutput> {
  console.error(
    '🔍 [autorun.verify v2] ========================================'
  );
  console.error('🔍 [autorun.verify v2] Iniciando verificación...');
  console.error(`   ⏰ Timestamp: ${new Date().toISOString()}`);

  try {
    console.error('   ✅ [PASO 1] Validando input...');

    // Normalizar targetFiles
    let targetFiles: string[] | 'diff' = input.targetFiles || 'diff';
    if (
      Array.isArray(targetFiles) &&
      targetFiles.length === 1 &&
      targetFiles[0] === 'diff'
    ) {
      targetFiles = 'diff';
    }

    console.error(`   ✅ [PASO 1] Input válido:`);
    console.error(
      `      - targetFiles: ${typeof targetFiles === 'string' ? targetFiles : `${targetFiles.length} archivo(s)`}`
    );
    console.error(`      - strict: ${input.options?.strict ?? false}`);
    console.error(
      `      - checkAutorunMarks: ${input.options?.checkAutorunMarks ?? true}`
    );
    console.error(
      `      - checkStructure: ${input.options?.checkStructure ?? true}`
    );

    console.error(
      '   ✅ [PASO 2] Importando función original de autorun.verify()...'
    );
    const importStart = Date.now();
    const { autorunVerify: autorunVerifyOriginal } = await import(
      '../../mcp-server/tools/autorunVerify.js'
    );
    const importTime = Date.now() - importStart;
    console.error(`   ✅ [PASO 2] Función importada en ${importTime}ms`);

    console.error('   ✅ [PASO 3] Preparando input para función original...');
    // Convertir input al formato esperado por la función original
    const originalInput = {
      targetFiles,
      options: {
        strict: input.options?.strict ?? false,
        checkAutorunMarks: input.options?.checkAutorunMarks ?? true,
        checkStructure: input.options?.checkStructure ?? true,
        checkAccessibility: input.options?.checkAccessibility ?? true,
        staged: input.options?.staged,
        baseRef: input.options?.baseRef,
        autoRevert: input.options?.autoRevert ?? true,
      },
    };
    console.error(`   ✅ [PASO 3] Input preparado`);

    console.error(
      '   ✅ [PASO 4] Llamando función original de autorun.verify()...'
    );
    const callStart = Date.now();
    const result = await autorunVerifyOriginal(originalInput);
    const callTime = Date.now() - callStart;
    console.error(`   ✅ [PASO 4] Función ejecutada en ${callTime}ms`);

    console.error('   ✅ [PASO 5] Procesando resultado...');

    // Convertir resultado al formato del nuevo MCP
    // El resultado original usa `files` (array de objetos), necesitamos extraer paths
    const files = result.files || [];
    const filesChecked = files.map((f: any) => f.path || f).filter(Boolean);

    const processedResult: AutorunVerifyOutput = {
      valid: result.valid,
      errors: result.errors || [],
      warnings: result.warnings || [],
      filesChecked,
      files: result.files?.map((f: any) => ({
        path: f.path,
        hasAutorunMark: f.hasAutorunMark ?? false,
        isValid: f.isValid ?? false,
        issues: f.issues || [],
      })),
    };

    console.error('   ✅ [PASO 5] Resultado procesado:');
    console.error(
      `      - Válido: ${processedResult.valid ? '✅ SÍ' : '❌ NO'}`
    );
    console.error(
      `      - Archivos verificados: ${processedResult.filesChecked.length}`
    );
    console.error(
      `      - Con watermark: ${processedResult.files?.filter((f) => f.hasAutorunMark).length || 0}`
    );
    console.error(
      `      - Válidos: ${processedResult.files?.filter((f) => f.isValid).length || 0}`
    );
    console.error(`      - Errores: ${processedResult.errors.length}`);
    console.error(`      - Advertencias: ${processedResult.warnings.length}`);

    if (processedResult.errors.length > 0) {
      console.error(`      - Errores encontrados:`);
      processedResult.errors.forEach((error, index) => {
        console.error(`         ${index + 1}. ${error}`);
      });
    }

    if (processedResult.warnings.length > 0) {
      console.error(`      - Advertencias encontradas:`);
      processedResult.warnings.forEach((warning, index) => {
        console.error(`         ${index + 1}. ${warning}`);
      });
    }

    console.error(
      '🔍 [autorun.verify v2] ========================================'
    );
    return processedResult;
  } catch (error: any) {
    console.error('❌ [autorun.verify v2] ERROR:', error);
    console.error(`   📋 Mensaje: ${error.message}`);
    console.error(
      `   📋 Stack: ${error.stack ? error.stack.substring(0, 500) : 'N/A'}`
    );
    console.error(`   ⏰ Timestamp del error: ${new Date().toISOString()}`);
    console.error(
      '🔍 [autorun.verify v2] ========================================'
    );

    return {
      valid: false,
      errors: [error.message || 'Error desconocido al verificar archivos'],
      warnings: [],
      filesChecked: [],
      files: [],
    };
  }
}
