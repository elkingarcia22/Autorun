/**
 * ✅ verifyDiffRunner - Script para ejecutar verifyDiff desde CLI
 *
 * Usado por:
 * - npm run prototypes:verify
 * - Husky pre-commit hooks
 * - CI workflows
 *
 * ✅ Ajuste 1: Usa tsx directamente (no depende de dist/)
 */

import { verifyDiff } from './VerifyDiff.js';

(async () => {
  try {
    console.log('🔍 Verificando cambios en prototypes/...\n');

    const result = await verifyDiff({
      checkWatermarks: true,
      checkHash: true,
      checkHardcodedColors: true,
      checkTokens: true,
      // ✅ Soporte para staged (pre-commit)
      staged: process.argv.includes('--staged'),
      // ✅ Soporte para baseRef (CI)
      baseRef: process.argv
        .find((arg) => arg.startsWith('--base='))
        ?.split('=')[1],
    });

    if (!result.valid) {
      // ✅ MEJORA: Usar mensajes de error mejorados
      const { generateErrorMessage } = await import('./errorMessages.js');
      const errorMessage = generateErrorMessage(
        result.errors,
        result.warnings,
        result.files.map((f) => ({ path: f.path, issues: f.issues }))
      );

      console.error(errorMessage);
      process.exit(1);
    }

    console.log('✅ Verificación de prototypes pasó');
    console.log(`   - Archivos verificados: ${result.files.length}`);
    console.log(
      `   - Con watermark: ${result.files.filter((f) => f.hasWatermark).length}`
    );
    console.log(
      `   - Válidos: ${result.files.filter((f) => f.isValid).length}`
    );

    if (result.warnings.length > 0) {
      console.warn('\n⚠️ Advertencias:');
      result.warnings.forEach((warning) => console.warn(`   - ${warning}`));
    }

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error ejecutando verificación:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
})();
