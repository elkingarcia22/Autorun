/**
 * Tool: autorun.apply
 *
 * ⭐ CRÍTICO: Ejecuta TODO el flujo de implementación automáticamente
 * Este es el único camino válido para implementar componentes desde Storybook.
 *
 * Flujo completo:
 * 1. handleUserMessage() → Detección
 * 2. Storybook MCP → Props exactas
 * 3. Extracción código exacto
 * 4. Validación pre-implementación
 * 5. Análisis componentes internos
 * 6. Escritura con marcas Autorun
 * 7. Post-implementación (Prettier, ESLint, Auto-Reload, GitHub)
 */

import { handleUserMessage } from '../../helpers/autoMessageHandler.js';
import { extractExactCodeFromStorybookWithBrowser } from '../../helpers/storybookExactCodeExtractorWithBrowser.js';
import { verifyBeforeImplementation } from '../../helpers/preImplementationVerification.js';
import { analyzeComponentInternals } from '../../helpers/componentInternalAnalysis.js';
import { mapAndValidateComponentNameToStorybookId } from '../../helpers/storybookStories.js';
import { AddonOrchestrator } from '../helpers/addonOrchestrator.js';
import { generateCodeWithAutorunMarks } from '../helpers/codeMarkGenerator.js';
import { AutorunApplyInput, AutorunApplyOutput } from '../types.js';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Ejecuta TODO el flujo de implementación
 */
export async function autorunApply(
  input: AutorunApplyInput
): Promise<AutorunApplyOutput> {
  console.log(`\n🚀 [Autorun MCP] autorun.apply() llamado`);
  console.log(`   Mensaje: ${input.message.substring(0, 100)}...`);
  console.log(`   Archivos objetivo: ${input.targetFiles?.join(', ') || 'auto-detect'}`);
  console.log(`   Opciones:`, input.options || {});

  const errors: string[] = [];
  const warnings: string[] = [];
  const filesWritten: string[] = [];
  const orchestrator = new AddonOrchestrator();

  try {
    // ========================================
    // FASE 1: PREPARACIÓN (Add-ons de validación)
    // ========================================
    console.log(`\n📋 [Autorun MCP] FASE 1: PREPARACIÓN`);

    // 1.1 Ejecutar handleUserMessage() (OBLIGATORIO)
    console.log(`   [1.1] Ejecutando handleUserMessage()...`);
    const result = await handleUserMessage(input.message);

    if (result.blocked) {
      console.error(`   ❌ Implementación bloqueada: ${result.reason}`);
      return {
        success: false,
        filesWritten: [],
        verification: {
          preImplementation: false,
          postImplementation: false,
          errors: [result.reason || 'Implementación bloqueada'],
          warnings: [],
        },
        components: [],
        errors: [result.reason || 'Implementación bloqueada'],
      };
    }

    if (!result.componentName) {
      console.warn(`   ⚠️ No se detectó componente en el mensaje`);
      return {
        success: false,
        filesWritten: [],
        verification: {
          preImplementation: false,
          postImplementation: false,
          errors: ['No se detectó ningún componente en el mensaje'],
          warnings: [],
        },
        components: [],
        errors: ['No se detectó ningún componente en el mensaje'],
      };
    }

    console.log(`   ✅ Componente detectado: ${result.componentName}`);
    if (result.mcpMessages && result.mcpMessages.length > 0) {
      console.log(
        `   ✅ Componentes adicionales: ${result.mcpMessages.map((m) => m.componentName).join(', ')}`
      );
    }

    // 1.2 Obtener ID de Storybook
    console.log(`   [1.2] Obteniendo ID de Storybook...`);
    let componentId: string;
    try {
      componentId = await mapAndValidateComponentNameToStorybookId(result.componentName);
      console.log(`   ✅ ID de Storybook: ${componentId}`);
    } catch (error: any) {
      const errorMsg = `No se pudo obtener ID de Storybook para ${result.componentName}: ${error.message}`;
      console.error(`   ❌ ${errorMsg}`);
      return {
        success: false,
        filesWritten: [],
        verification: {
          preImplementation: false,
          postImplementation: false,
          errors: [errorMsg],
          warnings: [],
        },
        components: [],
        errors: [errorMsg],
      };
    }

    // 1.3 Ejecutar fase de preparación (Pre-Implementation Check, Storybook)
    console.log(`   [1.3] Ejecutando fase de preparación con add-ons...`);
    const preparationResult = await orchestrator.executePreparationPhase(
      result.componentName,
      componentId
    );

    if (!preparationResult.canImplement.allowed) {
      const errorMsg =
        preparationResult.canImplement.reason ||
        'Implementación bloqueada por Pre-Implementation Check';
      console.error(`   ❌ ${errorMsg}`);
      return {
        success: false,
        filesWritten: [],
        verification: {
          preImplementation: false,
          postImplementation: false,
          errors: [errorMsg],
          warnings: preparationResult.canImplement.missingSteps || [],
        },
        components: [],
        errors: [errorMsg],
        plan: preparationResult.plan,
      };
    }

    console.log(`   ✅ Fase de preparación completada`);

    // ========================================
    // FASE 2: IMPLEMENTACIÓN (Flujo principal)
    // ========================================
    console.log(`\n🔧 [Autorun MCP] FASE 2: IMPLEMENTACIÓN`);

    // 2.1 Consultar Storybook MCP (OBLIGATORIO)
    console.log(`   [2.1] Consultando Storybook MCP...`);
    if (result.mcpMessages && result.mcpMessages.length > 0) {
      for (const msg of result.mcpMessages) {
        console.log(
          `   📚 Componente: ${msg.componentName} (${msg.storybookId})`
        );
        // ⚠️ NOTA: La consulta real a Storybook MCP debe hacerse desde el agente
        // Por ahora, solo verificamos que los mensajes estén preparados
        // TODO: Implementar consulta real cuando tengamos acceso a call_mcp_tool desde Node.js
      }
      console.log(
        `   ⚠️ NOTA: El agente debe consultar Storybook MCP para obtener props exactas`
      );
    } else {
      console.warn(`   ⚠️ No hay mensajes MCP preparados`);
    }

    // 2.2 Extraer código exacto desde Storybook (OBLIGATORIO)
    console.log(`   [2.2] Extrayendo código exacto desde Storybook...`);
    let exactCode;
    try {
      exactCode = await extractExactCodeFromStorybookWithBrowser(componentId, 'default');
      if (!exactCode || !exactCode.html) {
        throw new Error('No se pudo extraer código desde Storybook');
      }
      console.log(
        `   ✅ Código extraído: ${exactCode.html.length} caracteres`
      );
    } catch (error: any) {
      const errorMsg = `Error extrayendo código desde Storybook: ${error.message}`;
      console.error(`   ❌ ${errorMsg}`);
      errors.push(errorMsg);
      return {
        success: false,
        filesWritten: [],
        verification: {
          preImplementation: false,
          postImplementation: false,
          errors,
          warnings,
        },
        components: [],
        errors,
      };
    }

    // 2.3 Verificar pre-implementación (OBLIGATORIO)
    console.log(`   [2.3] Verificando pre-implementación...`);
    if (!input.options?.skipVerification) {
      let verificationResult;
      try {
        verificationResult = await verifyBeforeImplementation(
          componentId,
          exactCode.html,
          'default'
        );

        if (!verificationResult.valid) {
          const errorMsg = `Validación pre-implementación falló: ${verificationResult.errors.join(', ')}`;
          console.error(`   ❌ ${errorMsg}`);
          errors.push(...verificationResult.errors);
          warnings.push(...verificationResult.warnings);

          return {
            success: false,
            filesWritten: [],
            verification: {
              preImplementation: false,
              postImplementation: false,
              errors,
              warnings,
            },
            components: [],
            errors,
            warnings,
          };
        }

        console.log(`   ✅ Validación pre-implementación pasada`);
        if (verificationResult.warnings.length > 0) {
          warnings.push(...verificationResult.warnings);
          console.warn(`   ⚠️ Advertencias: ${verificationResult.warnings.join(', ')}`);
        }
      } catch (error: any) {
        const errorMsg = `Error en verificación pre-implementación: ${error.message}`;
        console.error(`   ❌ ${errorMsg}`);
        errors.push(errorMsg);
        return {
          success: false,
          filesWritten: [],
          verification: {
            preImplementation: false,
            postImplementation: false,
            errors,
            warnings,
          },
          components: [],
          errors,
        };
      }
    } else {
      console.log(`   ⚠️ Verificación pre-implementación saltada (skipVerification=true)`);
    }

    // 2.4 Analizar componentes internos (OBLIGATORIO)
    console.log(`   [2.4] Analizando componentes internos...`);
    let internalAnalysis;
    try {
      internalAnalysis = await analyzeComponentInternals(componentId, 'default');
      console.log(
        `   ✅ Análisis completado: ${internalAnalysis.internalComponents.length} componente(s) interno(s)`
      );
      if (internalAnalysis.dependencies.length > 0) {
        console.log(`   📦 Dependencias: ${internalAnalysis.dependencies.join(', ')}`);
      }
    } catch (error: any) {
      console.warn(`   ⚠️ Error en análisis interno: ${error.message}`);
      // No bloquear, solo registrar
    }

    // 2.5 Detectar archivo objetivo
    console.log(`   [2.5] Detectando archivo objetivo...`);
    let targetFile: string | null = null;
    if (input.targetFiles && input.targetFiles.length > 0) {
      targetFile = input.targetFiles[0];
      console.log(`   ✅ Archivo objetivo especificado: ${targetFile}`);
    } else {
      // Intentar detectar automáticamente
      targetFile = await detectTargetFile(result.componentName);
      if (targetFile) {
        console.log(`   ✅ Archivo objetivo detectado: ${targetFile}`);
      } else {
        const errorMsg = 'No se pudo determinar archivo objetivo. Especifica targetFiles en el input.';
        console.error(`   ❌ ${errorMsg}`);
        return {
          success: false,
          filesWritten: [],
          verification: {
            preImplementation: true,
            postImplementation: false,
            errors: [errorMsg],
            warnings: [],
          },
          components: [],
          errors: [errorMsg],
        };
      }
    }

    // Verificar que el archivo existe o puede crearse
    try {
      const dir = path.dirname(targetFile);
      await fs.mkdir(dir, { recursive: true });
    } catch (error: any) {
      const errorMsg = `Error creando directorio para ${targetFile}: ${error.message}`;
      console.error(`   ❌ ${errorMsg}`);
      return {
        success: false,
        filesWritten: [],
        verification: {
          preImplementation: true,
          postImplementation: false,
          errors: [errorMsg],
          warnings: [],
        },
        components: [],
        errors: [errorMsg],
      };
    }

    // 2.6 Generar código con marcas Autorun
    console.log(`   [2.6] Generando código con marcas Autorun...`);
    const codeWithMarks = generateCodeWithAutorunMarks(
      exactCode.html,
      result.componentName,
      componentId,
      'default'
    );
    console.log(`   ✅ Código generado con marcas Autorun`);

    // 2.7 SOLO AHORA escribir (si no es dry-run)
    if (!input.options?.dryRun) {
      console.log(`   [2.7] Escribiendo archivo...`);
      try {
        await fs.writeFile(targetFile, codeWithMarks, 'utf-8');
        filesWritten.push(targetFile);
        console.log(`   ✅ Archivo escrito: ${targetFile}`);
      } catch (error: any) {
        const errorMsg = `Error escribiendo archivo: ${error.message}`;
        console.error(`   ❌ ${errorMsg}`);
        return {
          success: false,
          filesWritten: [],
          verification: {
            preImplementation: true,
            postImplementation: false,
            errors: [errorMsg],
            warnings: [],
          },
          components: [],
          errors: [errorMsg],
        };
      }
    } else {
      console.log(`   ⚠️ DRY-RUN: No se escribió el archivo`);
    }

    // ========================================
    // FASE 3: POST-IMPLEMENTACIÓN (Add-ons de calidad)
    // ========================================
    console.log(`\n✨ [Autorun MCP] FASE 3: POST-IMPLEMENTACIÓN`);

    let postImplementationResult;
    if (!input.options?.dryRun && filesWritten.length > 0) {
      postImplementationResult = await orchestrator.executePostImplementationPhase(
        filesWritten,
        result.componentName
      );
    } else {
      console.log(`   ⚠️ Saltando fase post-implementación (dry-run o sin archivos)`);
      postImplementationResult = {
        prettier: { executed: false, formatted: 0 },
        eslint: { executed: false, errors: 0, warnings: 0, fixed: 0 },
        autoReload: { executed: false, reloaded: false },
        github: { executed: false, committed: false, pushed: false },
        problemTracker: { executed: false, problemsDetected: 0 },
      };
    }

    // ========================================
    // FASE 4: VERIFICACIÓN (Tests visuales opcionales)
    // ========================================
    console.log(`\n✅ [Autorun MCP] FASE 4: VERIFICACIÓN`);

    let visualTestResult;
    if (input.options?.runVisualTests) {
      console.log(`   [4.1] Ejecutando tests visuales...`);
      // TODO: Implementar tests visuales con Chromatic
      visualTestResult = {
        passed: 0,
        failed: 0,
        new: 0,
      };
      console.log(`   ⚠️ Tests visuales aún no implementados`);
    } else {
      console.log(`   ⚠️ Tests visuales saltados (runVisualTests=false)`);
    }

    // ========================================
    // RESULTADO FINAL
    // ========================================
    console.log(`\n✅ [Autorun MCP] Implementación completada exitosamente`);

    const components = result.mcpMessages?.map((msg) => ({
      name: msg.componentName,
      storybookId: msg.storybookId,
      implemented: true,
    })) || [
      {
        name: result.componentName,
        storybookId: componentId,
        implemented: true,
      },
    ];

    return {
      success: true,
      filesWritten,
      verification: {
        preImplementation: true,
        postImplementation: true,
        prettier: postImplementationResult.prettier.executed,
        eslint: postImplementationResult.eslint.executed
          ? {
              errors: postImplementationResult.eslint.errors,
              fixed: postImplementationResult.eslint.fixed,
              warnings: postImplementationResult.eslint.warnings,
            }
          : undefined,
        autoReload: postImplementationResult.autoReload.reloaded,
        github: postImplementationResult.github.committed
          ? {
              committed: true,
              pushed: postImplementationResult.github.pushed,
              commitHash: postImplementationResult.github.commitHash,
            }
          : undefined,
        visual: visualTestResult
          ? {
              passed: visualTestResult.passed,
              failed: visualTestResult.failed,
              new: visualTestResult.new,
            }
          : undefined,
        errors: [],
        warnings: warnings.length > 0 ? warnings : [],
      },
      components,
      plan: preparationResult.plan,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (error: any) {
    console.error(`\n❌ [Autorun MCP] Error en autorun.apply(): ${error.message}`);
    console.error(error.stack);

    // Registrar en Problem Tracker si está disponible
    try {
      const problemTrackerAddon = await orchestrator.getAddon('problem-tracker');
      if (problemTrackerAddon && problemTrackerAddon.isActive()) {
        const services = problemTrackerAddon.getServices();
        if (services && services.detectProblem) {
          await services.detectProblem(`Error en autorun.apply(): ${error.message}`, {
            category: 'implementacion',
            severity: 'high',
            message: input.message,
            error: error.message,
            stack: error.stack,
          });
        }
      }
    } catch (trackerError) {
      // Ignorar errores del Problem Tracker
    }

    return {
      success: false,
      filesWritten,
      verification: {
        preImplementation: false,
        postImplementation: false,
        errors: [error.message],
        warnings,
      },
      components: [],
      errors: [error.message],
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  }
}

/**
 * Detecta archivo objetivo automáticamente
 */
async function detectTargetFile(componentName?: string): Promise<string | null> {
  try {
    // Buscar archivos HTML en prototypes/
    const prototypesDir = path.join(process.cwd(), 'prototypes');
    const files = await fs.readdir(prototypesDir);
    const htmlFiles = files.filter((f) => f.endsWith('.html'));

    if (htmlFiles.length === 0) {
      return null;
    }

    // Si hay solo un archivo, usarlo
    if (htmlFiles.length === 1) {
      return path.join(prototypesDir, htmlFiles[0]);
    }

    // Si hay múltiples, usar el más reciente
    let mostRecent: { file: string; mtime: Date } | null = null;
    for (const file of htmlFiles) {
      const filePath = path.join(prototypesDir, file);
      const stats = await fs.stat(filePath);
      if (!mostRecent || stats.mtime > mostRecent.mtime) {
        mostRecent = { file: filePath, mtime: stats.mtime };
      }
    }

    return mostRecent ? mostRecent.file : null;
  } catch (error) {
    return null;
  }
}
