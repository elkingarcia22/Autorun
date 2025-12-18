#!/usr/bin/env tsx
/**
 * CLI para ejecutar autorun.verify()
 *
 * Este script ejecuta autorun.verify() desde la línea de comandos,
 * útil para pre-commit hooks y CI/CD.
 *
 * Uso:
 *   npm run autorun:verify
 *   npm run autorun:verify -- --targetFiles prototypes/file.html
 *   npm run autorun:verify -- --diff
 */

import { autorunVerify } from '../mcp-server/tools/autorunVerify.js';
import { AutorunVerifyInput } from '../mcp-server/types.js';

async function main() {
  const args = process.argv.slice(2);
  
  // Parsear argumentos
  const diffIndex = args.indexOf('--diff');
  const targetFilesIndex = args.indexOf('--targetFiles');
  const strictIndex = args.indexOf('--strict');
  const skipAutorunMarksIndex = args.indexOf('--skip-autorun-marks');
  const skipStructureIndex = args.indexOf('--skip-structure');
  const skipAccessibilityIndex = args.indexOf('--skip-accessibility');

  // Determinar archivos objetivo
  let targetFiles: string[] | 'diff' = 'diff';
  if (diffIndex !== -1) {
    targetFiles = 'diff';
  } else if (targetFilesIndex !== -1 && args[targetFilesIndex + 1]) {
    const filesArg = args[targetFilesIndex + 1];
    targetFiles = filesArg.split(',').map(f => f.trim());
  }

  // Opciones
  const options: AutorunVerifyInput['options'] = {};
  if (strictIndex !== -1) {
    options.strict = true;
  }
  if (skipAutorunMarksIndex !== -1) {
    options.checkAutorunMarks = false;
  }
  if (skipStructureIndex !== -1) {
    options.checkStructure = false;
  }
  if (skipAccessibilityIndex !== -1) {
    options.checkAccessibility = false;
  }

  const input: AutorunVerifyInput = {
    targetFiles,
    options: Object.keys(options).length > 0 ? options : undefined,
  };

  try {
    console.log('\n🔍 [Autorun Verify CLI] Ejecutando verificación...\n');
    
    const result = await autorunVerify(input);

    if (result.valid) {
      console.log('\n✅ [Autorun Verify CLI] Verificación exitosa');
      if (result.warnings.length > 0) {
        console.log('\n⚠️ Advertencias:');
        result.warnings.forEach(w => console.log(`   - ${w}`));
      }
      if (result.suggestions.length > 0) {
        console.log('\n💡 Sugerencias:');
        result.suggestions.forEach(s => console.log(`   - ${s}`));
      }
      process.exit(0);
    } else {
      console.error('\n❌ [Autorun Verify CLI] Verificación falló');
      console.error('\nErrores:');
      result.errors.forEach(e => console.error(`   - ${e}`));
      if (result.warnings.length > 0) {
        console.error('\nAdvertencias:');
        result.warnings.forEach(w => console.error(`   - ${w}`));
      }
      
      // Mostrar detalles de archivos con problemas
      const invalidFiles = result.files.filter(f => !f.isValid);
      if (invalidFiles.length > 0) {
        console.error('\nArchivos con problemas:');
        invalidFiles.forEach(f => {
          console.error(`   ${f.path}:`);
          f.issues.forEach(i => console.error(`     - ${i}`));
        });
      }
      
      process.exit(1);
    }
  } catch (error: any) {
    console.error('\n❌ [Autorun Verify CLI] Error fatal:');
    console.error(`   ${error.message}`);
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Ejecutar
main();
