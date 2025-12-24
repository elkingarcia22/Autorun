/**
 * Tool: autorun.verify
 *
 * Verifica que los archivos fueron generados correctamente por Autorun
 * y que cumplen con todas las validaciones.
 */

import { AutorunVerifyInput, AutorunVerifyOutput } from '../types.js';
import {
  hasAutorunMark,
  parseAutorunMarks,
  validateAutorunMark,
} from '../helpers/codeMarkGenerator.js';
import { verifyDiff, type VerifyDiffOptions } from '../../verify/VerifyDiff.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Verifica archivos generados por Autorun
 */
export async function autorunVerify(
  input: AutorunVerifyInput
): Promise<AutorunVerifyOutput> {
  console.log(`\n✅ [Autorun MCP] autorun.verify() llamado`);

  // ⚠️ FIX: Manejar caso donde targetFiles viene como array ['diff'] en lugar de string 'diff'
  // También manejar caso donde viene directamente como string 'diff'
  let targetFiles: string[] | 'diff';

  if (typeof input.targetFiles === 'string' && input.targetFiles === 'diff') {
    targetFiles = 'diff';
  } else if (Array.isArray(input.targetFiles)) {
    if (input.targetFiles.length === 1 && input.targetFiles[0] === 'diff') {
      targetFiles = 'diff';
    } else {
      targetFiles = input.targetFiles;
    }
  } else {
    // Fallback: tratar como array vacío
    targetFiles = [];
  }

  console.log(
    `   Archivos: ${targetFiles === 'diff' ? 'diff (git)' : Array.isArray(targetFiles) ? targetFiles.join(', ') : String(targetFiles)}`
  );

  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  const files: AutorunVerifyOutput['files'] = [];

  try {
    // ✅ Paso 4: Si targetFiles es "diff", usar VerifyDiff
    if (targetFiles === 'diff') {
      console.log(
        `   [1/1] Verificando cambios usando git diff (diff-based)...`
      );

      const verifyOptions: VerifyDiffOptions = {
        strict: input.options?.strict ?? true,
        checkWatermarks: input.options?.checkAutorunMarks !== false,
        checkHash: true,
        checkHardcodedColors: true,
        checkTokens: true,
        // ✅ Soporte para staged y baseRef desde options
        staged: input.options?.staged,
        baseRef: input.options?.baseRef,
      };

      const diffResult = await verifyDiff(verifyOptions);

      // Convertir resultado de VerifyDiff a formato AutorunVerifyOutput
      const diffFiles = diffResult.files.map((f) => ({
        path: f.path,
        hasAutorunMark: f.hasWatermark,
        isValid: f.isValid,
        issues: f.issues,
        metadata: undefined,
      }));

      const valid = diffResult.valid;
      console.log(
        `   ${valid ? '✅' : '❌'} Verificación diff completada: ${valid ? 'VÁLIDO' : 'INVÁLIDO'}`
      );
      console.log(`   - Archivos verificados: ${diffFiles.length}`);
      console.log(
        `   - Con watermark: ${diffFiles.filter((f) => f.hasAutorunMark).length}`
      );
      console.log(`   - Válidos: ${diffFiles.filter((f) => f.isValid).length}`);
      console.log(`   - Errores: ${diffResult.errors.length}`);
      console.log(`   - Advertencias: ${diffResult.warnings.length}`);

      // ⚠️ CRÍTICO: Si hay cambios sin watermark, revertir automáticamente
      if (!valid) {
        const filesWithoutWatermark = diffFiles.filter(
          (f) => !f.hasAutorunMark && !f.isValid
        );

        if (
          filesWithoutWatermark.length > 0 &&
          input.options?.autoRevert !== false
        ) {
          console.error(
            '\n🚨 [Autorun Verify] Cambios sin watermark detectados. Revirtiendo automáticamente...'
          );

          try {
            for (const file of filesWithoutWatermark) {
              console.log(`   🔄 Revirtiendo: ${file.path}`);
              await execAsync(`git checkout -- ${file.path}`);
              console.log(`   ✅ Archivo revertido: ${file.path}`);
            }

            console.error(
              '\n❌ [Autorun Verify] Cambios revertidos automáticamente.'
            );
            console.error(
              '❌ [Autorun Verify] Debes usar autorun.apply() para implementar componentes UBITS.'
            );
            console.error(
              '❌ [Autorun Verify] Los cambios sin watermark NO son permitidos.'
            );
          } catch (revertError: any) {
            console.error(
              `❌ [Autorun Verify] Error revirtiendo cambios: ${revertError.message}`
            );
            console.error(
              '⚠️ [Autorun Verify] Revisa manualmente los archivos y usa autorun.apply() para corregirlos.'
            );
          }
        }
      }

      return {
        valid,
        errors: diffResult.errors,
        warnings: diffResult.warnings,
        suggestions:
          diffResult.errors.length > 0
            ? [
                'Revisa los errores reportados y corrige las violaciones de Autorun',
                'Usa autorun.apply() para implementar componentes UBITS correctamente',
              ]
            : [],
        files: diffFiles,
      };
    }

    // ✅ Flujo existente para otros casos (se mantiene intacto)
    let filesToVerify: string[] = Array.isArray(targetFiles) ? targetFiles : [];

    if (filesToVerify.length === 0) {
      console.warn(`   ⚠️ No hay archivos para verificar`);
      return {
        valid: true,
        errors: [],
        warnings: ['No hay archivos para verificar'],
        suggestions: [],
        files: [],
      };
    }

    // Verificar cada archivo
    console.log(`   [2/3] Verificando ${filesToVerify.length} archivo(s)...`);
    for (const filePath of filesToVerify) {
      const fileIssues: string[] = [];
      let hasAutorunMarkValue = false;
      let isValid = true;
      let metadata;

      try {
        const content = await fs.readFile(filePath, 'utf-8');

        // Verificar marca Autorun
        if (input.options?.checkAutorunMarks !== false) {
          hasAutorunMarkValue = hasAutorunMark(content);
          if (!hasAutorunMarkValue) {
            fileIssues.push('No tiene marca AUTORUN-GENERATED');
            isValid = false;
            if (input.options?.strict) {
              errors.push(`${filePath}: No fue generado por Autorun`);
            } else {
              warnings.push(
                `${filePath}: No tiene marca Autorun (puede ser manual)`
              );
            }
          } else {
            // Validar marca
            const markValidation = validateAutorunMark(content);
            if (!markValidation.valid) {
              fileIssues.push(
                `Marca Autorun inválida: ${markValidation.reason}`
              );
              isValid = false;

              // ⚠️ CRÍTICO: Si el hash no coincide, el código fue modificado manualmente
              if (markValidation.reason?.includes('Hash')) {
                errors.push(
                  `${filePath}: Código fue modificado manualmente (hash no coincide)`
                );
              }
              if (input.options?.strict) {
                errors.push(`${filePath}: ${markValidation.reason}`);
              } else {
                warnings.push(`${filePath}: ${markValidation.reason}`);
              }
            } else {
              metadata = markValidation.metadata;
              console.log(
                `   ✅ ${path.basename(filePath)}: Marca Autorun válida`
              );
            }
          }
        }

        // Verificar estructura básica (si está habilitado)
        if (input.options?.checkStructure && hasAutorunMarkValue) {
          const structureIssues = await validateFileStructure(
            content,
            filePath
          );
          if (structureIssues.length > 0) {
            fileIssues.push(...structureIssues);
            isValid = false;
            warnings.push(`${filePath}: Problemas de estructura detectados`);
          }
        }

        // Verificar accesibilidad básica (si está habilitado)
        if (input.options?.checkAccessibility && hasAutorunMarkValue) {
          const a11yIssues = await validateAccessibility(content);
          if (a11yIssues.length > 0) {
            fileIssues.push(...a11yIssues);
            warnings.push(`${filePath}: Problemas de accesibilidad detectados`);
          }
        }

        // Verificar marca de cierre
        if (hasAutorunMarkValue && !/<!--\s*\/AUTORUN\s*-->/i.test(content)) {
          fileIssues.push('Falta marca de cierre </AUTORUN>');
          warnings.push(`${filePath}: Falta marca de cierre Autorun`);
        }

        files.push({
          path: filePath,
          hasAutorunMark: hasAutorunMarkValue,
          isValid,
          issues: fileIssues,
          metadata,
        });
      } catch (error: any) {
        const errorMsg = `Error leyendo archivo ${filePath}: ${error.message}`;
        console.error(`   ❌ ${errorMsg}`);
        errors.push(errorMsg);
        files.push({
          path: filePath,
          hasAutorunMark: false,
          isValid: false,
          issues: [error.message],
        });
      }
    }

    // Generar sugerencias
    console.log(`   [3/3] Generando sugerencias...`);
    const filesWithoutMarks = files.filter((f) => !f.hasAutorunMark);
    if (filesWithoutMarks.length > 0) {
      suggestions.push(
        `${filesWithoutMarks.length} archivo(s) sin marca Autorun. Considera regenerarlos con autorun.apply()`
      );
    }

    const invalidFiles = files.filter((f) => !f.isValid);
    if (invalidFiles.length > 0) {
      suggestions.push(
        `${invalidFiles.length} archivo(s) con problemas. Revisa los issues reportados`
      );
    }

    const valid = errors.length === 0;
    console.log(
      `   ${valid ? '✅' : '❌'} Verificación completada: ${valid ? 'VÁLIDO' : 'INVÁLIDO'}`
    );
    console.log(`   - Archivos verificados: ${files.length}`);
    console.log(
      `   - Con marca Autorun: ${files.filter((f) => f.hasAutorunMark).length}`
    );
    console.log(`   - Válidos: ${files.filter((f) => f.isValid).length}`);
    console.log(`   - Errores: ${errors.length}`);
    console.log(`   - Advertencias: ${warnings.length}`);

    return {
      valid,
      errors,
      warnings,
      suggestions,
      files,
    };
  } catch (error: any) {
    console.error(`   ❌ Error en autorun.verify(): ${error.message}`);
    return {
      valid: false,
      errors: [error.message],
      warnings,
      suggestions,
      files,
    };
  }
}

/**
 * Valida estructura básica del archivo
 */
async function validateFileStructure(
  content: string,
  filePath: string
): Promise<string[]> {
  const issues: string[] = [];

  // Verificar que es HTML válido
  if (filePath.endsWith('.html')) {
    if (!content.includes('<!DOCTYPE') && !content.includes('<html')) {
      issues.push('No parece ser un archivo HTML válido');
    }

    // Verificar que tiene estructura básica
    if (!content.includes('<body') && !content.includes('</body>')) {
      issues.push('Falta estructura básica de HTML (body)');
    }
  }

  // Verificar que no tiene errores obvios
  if (content.includes('undefined') || content.includes('null')) {
    issues.push('Contiene valores undefined o null (posible error)');
  }

  return issues;
}

/**
 * Valida accesibilidad básica
 */
async function validateAccessibility(content: string): Promise<string[]> {
  const issues: string[] = [];

  // Verificar que los botones tienen aria-label o texto
  const buttonMatches = content.matchAll(/<button[^>]*>/gi);
  for (const match of buttonMatches) {
    const buttonHtml = match[0];
    const hasAriaLabel = /aria-label\s*=/i.test(buttonHtml);
    const hasText = />[^<]+</.test(
      content.substring(match.index || 0, (match.index || 0) + 200)
    );

    if (!hasAriaLabel && !hasText) {
      issues.push('Botón sin aria-label ni texto visible');
    }
  }

  // Verificar que las imágenes tienen alt
  const imgMatches = content.matchAll(/<img[^>]*>/gi);
  for (const match of imgMatches) {
    const imgHtml = match[0];
    const hasAlt = /alt\s*=/i.test(imgHtml);

    if (!hasAlt) {
      issues.push('Imagen sin atributo alt');
    }
  }

  return issues;
}
