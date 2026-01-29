/**
 * Tool: autorun.lint
 *
 * Ejecuta ESLint en archivos
 */

import { AutorunLintInput, AutorunLintOutput } from '../types.js';
import { AddonOrchestrator } from '../helpers/addonOrchestrator.js';

/**
 * Ejecuta ESLint
 */
export async function autorunLint(
  input: AutorunLintInput
): Promise<AutorunLintOutput> {
  console.log(`\n🔍 [Autorun MCP] autorun.lint() llamado`);
  // ⚠️ FIX: Verificar que files es array antes de usar .join()
  const filesDisplay = Array.isArray(input.files)
    ? input.files.join(', ')
    : String(input.files || 'ninguno');
  console.log(`   Archivos: ${filesDisplay}`);
  console.log(`   Fix: ${input.fix ? 'Sí' : 'No'}`);

  // ⚠️ FIX: Validar que files es un array
  if (!Array.isArray(input.files) || input.files.length === 0) {
    return {
      success: false,
      errors: 0,
      warnings: 0,
      fixed: 0,
      fixable: 0,
      results: [],
      error: 'input.files debe ser un array no vacío',
    };
  }

  try {
    const orchestrator = new AddonOrchestrator();
    const hub = await orchestrator.getHub();
    const eslintAddon = hub.getAddon('eslint');

    if (!eslintAddon || !eslintAddon.isActive()) {
      return {
        success: false,
        errors: 0,
        warnings: 0,
        fixed: 0,
        fixable: 0,
        results: [],
        error: 'ESLint Add-on no está disponible',
      };
    }

    const services = eslintAddon.getServices();
    if (!services || !services.lint) {
      return {
        success: false,
        errors: 0,
        warnings: 0,
        fixed: 0,
        fixable: 0,
        results: [],
        error: 'Servicio de ESLint no disponible',
      };
    }

    // Ejecutar lint
    console.log(`   Ejecutando ESLint...`);
    const lintResults = await services.lint(input.files);

    let fixed = 0;
    if (
      input.fix &&
      lintResults.fixable &&
      lintResults.fixable > 0 &&
      services.fix
    ) {
      console.log(`   Auto-corrigiendo ${lintResults.fixable} error(es)...`);
      await services.fix(input.files);
      fixed = lintResults.fixable;
    }

    // Formatear resultados
    const results = input.files.map((file) => {
      const fileResults = lintResults.results?.find(
        (r: any) => r.file === file
      ) || {
        errors: 0,
        warnings: 0,
        messages: [],
      };

      return {
        file,
        errors: fileResults.errors || 0,
        warnings: fileResults.warnings || 0,
        fixed: fixed > 0 ? Math.min(fixed, fileResults.errors || 0) : 0,
        messages: fileResults.messages || [],
      };
    });

    const totalErrors = results.reduce((sum, r) => sum + r.errors, 0);
    const totalWarnings = results.reduce((sum, r) => sum + r.warnings, 0);

    console.log(
      `   ✅ ESLint completado: ${totalErrors} error(es), ${totalWarnings} advertencia(s), ${fixed} corregido(s)`
    );

    return {
      success: true,
      errors: totalErrors,
      warnings: totalWarnings,
      fixed,
      fixable: lintResults.fixable || 0,
      results,
    };
  } catch (error: any) {
    console.error(`   ❌ Error ejecutando ESLint: ${error.message}`);
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
