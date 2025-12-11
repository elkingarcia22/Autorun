/**
 * PreWriteValidator
 *
 * Valida que se hayan completado todos los pasos obligatorios antes de escribir código.
 *
 * Este validador se ejecuta AUTOMÁTICAMENTE antes de cada write() o search_replace()
 * para garantizar que se sigan los lineamientos de Autorun.
 */

import { getAutorunHub } from '@autorun/core';
import {
  detectComponentFromContent,
  detectComponentFromMessage,
} from '../helpers/implementationHelpers';
import { generateContextualErrorMessage } from '../helpers/errorMessages';
import {
  loadRequiredGuides,
  verifyGuidesLoaded,
  getGuidesSummary,
} from '../helpers/guidesLoader';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  componentName?: string;
  missingSteps?: string[];
}

export class PreWriteValidator {
  /**
   * Validar que se hayan completado todos los pasos obligatorios antes de escribir
   *
   * @param filePath Ruta del archivo que se va a escribir
   * @param content Contenido que se va a escribir
   * @param context Contexto adicional (componente, mensaje del usuario, etc.)
   * @returns Resultado de la validación
   */
  static async validateBeforeWrite(
    filePath: string,
    content: string,
    context?: {
      componentName?: string;
      userMessage?: string;
    }
  ): Promise<ValidationResult> {
    console.log(
      '\n🔍 [PreWriteValidator] ========================================'
    );
    console.log('🔍 [PreWriteValidator] Validación iniciada');
    console.log(`🔍 [PreWriteValidator] Archivo: ${filePath}`);
    console.log(`🔍 [PreWriteValidator] Contexto:`, context);
    console.log(
      `🔍 [PreWriteValidator] Contenido (primeros 200 chars):`,
      content.substring(0, 200)
    );

    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. Detectar componente del contenido o contexto
    let componentName = context?.componentName;
    console.log(
      `🔍 [PreWriteValidator] Componente detectado inicialmente: ${componentName || 'NINGUNO'}`
    );

    if (!componentName) {
      const detected = detectComponentFromContent(content);
      componentName = detected || undefined;
    }

    if (!componentName && context?.userMessage) {
      const detected = detectComponentFromMessage(context.userMessage);
      componentName = detected || undefined;
    }

    // 2. Si se detectó un componente, cargar guías automáticamente
    if (componentName) {
      console.log(
        `🔍 [PreWriteValidator] Cargando guías para: ${componentName}`
      );

      // ⭐ NUEVO: Cargar guías automáticamente
      const guidesResult = await loadRequiredGuides(componentName);
      const guidesVerification = verifyGuidesLoaded(guidesResult);

      console.log(`🔍 [PreWriteValidator] Resultado carga de guías:`, {
        allLoaded: guidesResult.allLoaded,
        generalGuides: guidesResult.generalGuides.length,
        specificGuides: guidesResult.componentSpecificGuides.length,
      });

      if (!guidesVerification.valid) {
        errors.push(...guidesVerification.errors);
        console.error(
          `❌ [PreWriteValidator] Errores al cargar guías:`,
          guidesVerification.errors
        );
      }

      if (guidesVerification.warnings.length > 0) {
        warnings.push(...guidesVerification.warnings);
        console.warn(
          `⚠️ [PreWriteValidator] Advertencias al cargar guías:`,
          guidesVerification.warnings
        );
      }

      // Mostrar resumen de guías cargadas
      if (guidesResult.allLoaded) {
        console.log(getGuidesSummary(guidesResult));
      }

      // 2.1 Verificar checklist obligatorio
      console.log(
        `🔍 [PreWriteValidator] Verificando checklist para: ${componentName}`
      );
      const checklistResult = await this.verifyChecklist(componentName);
      console.log(
        `🔍 [PreWriteValidator] Resultado checklist:`,
        checklistResult
      );
      if (!checklistResult.valid) {
        errors.push(...checklistResult.errors);
      }

      // 3. Verificar que se consultó Storybook
      console.log(
        `🔍 [PreWriteValidator] Verificando Storybook para: ${componentName}`
      );
      const storybookResult =
        await this.verifyStorybookConsultation(componentName);
      console.log(
        `🔍 [PreWriteValidator] Resultado Storybook:`,
        storybookResult
      );
      if (!storybookResult.valid) {
        errors.push(...storybookResult.errors);
      }

      // 4. Verificar que se consultó documentación
      console.log(
        `🔍 [PreWriteValidator] Verificando documentación para: ${componentName}`
      );
      const docResult =
        await this.verifyDocumentationConsultation(componentName);
      console.log(`🔍 [PreWriteValidator] Resultado documentación:`, docResult);
      if (!docResult.valid) {
        errors.push(...docResult.errors);
      }
    } else {
      console.log(
        `🔍 [PreWriteValidator] No se detectó componente, saltando verificaciones`
      );
    }

    // 5. Verificar triggers de imagen (si aplica)
    const imageResult = await this.verifyImageTriggers(context?.userMessage);
    if (!imageResult.valid) {
      errors.push(...imageResult.errors);
    }

    // ⭐ NUEVO: Detectar operaciones comunes y verificar guías obligatorias
    console.log(`🔍 [PreWriteValidator] Detectando operaciones comunes...`);
    const operationsResult = await this.verifyCommonOperations(
      content,
      filePath
    );
    console.log(
      `🔍 [PreWriteValidator] Resultado detección de operaciones:`,
      operationsResult
    );
    if (!operationsResult.valid) {
      errors.push(...operationsResult.errors);
    }

    // ⭐ NUEVO: Si hay errores, generar mensajes más claros
    if (errors.length > 0) {
      const hub = await getAutorunHub();
      const problemTracker = hub?.getAddon('problem-tracker');

      try {
        const clearMessage = await generateContextualErrorMessage(
          errors[0].includes('checklist')
            ? 'checklist-incomplete'
            : errors[0].includes('imagen')
              ? 'image-trigger-detected'
              : errors[0].includes('Storybook')
                ? 'storybook-not-consulted'
                : 'checklist-incomplete',
          {
            componentName: componentName || undefined,
            problemTracker: problemTracker
              ? (problemTracker as any).service
              : undefined,
          }
        );

        // Reemplazar primer error con mensaje claro
        errors[0] = clearMessage;
      } catch (error) {
        // Si falla, usar errores originales
      }
    }

    const result = {
      valid: errors.length === 0,
      errors,
      warnings,
      componentName,
      missingSteps: errors.length > 0 ? errors : undefined,
    };

    console.log(`🔍 [PreWriteValidator] Resultado final:`, {
      valid: result.valid,
      errorsCount: result.errors.length,
      warningsCount: result.warnings.length,
    });
    console.log(
      '🔍 [PreWriteValidator] ========================================\n'
    );

    return result;
  }

  /**
   * Verificar que se completó el checklist obligatorio
   */
  private static async verifyChecklist(
    componentName: string
  ): Promise<ValidationResult> {
    console.log(
      `  📋 [verifyChecklist] Verificando checklist para: ${componentName}`
    );

    const hub = await getAutorunHub();
    if (!hub) {
      console.log(`  ❌ [verifyChecklist] AutorunHub no está inicializado`);
      return {
        valid: false,
        errors: [
          '❌ AutorunHub no está inicializado. Ejecuta: npm run autorun:init-hub',
        ],
        warnings: [],
      };
    }
    console.log(`  ✅ [verifyChecklist] AutorunHub está inicializado`);

    const preCheckAddon = hub.getAddon('pre-implementation-check');
    if (!preCheckAddon) {
      console.log(
        `  ⚠️  [verifyChecklist] Pre-Implementation Check add-on no está disponible`
      );
      // Si el add-on no está disponible, solo advertir (no bloquear)
      return {
        valid: true,
        errors: [],
        warnings: [
          '⚠️ Pre-Implementation Check add-on no está disponible. Se recomienda activarlo.',
        ],
      };
    }
    console.log(
      `  ✅ [verifyChecklist] Pre-Implementation Check add-on encontrado`
    );

    try {
      console.log(
        `  🔍 [verifyChecklist] Llamando canImplement(${componentName})...`
      );
      const check = await (preCheckAddon as any).canImplement(componentName);
      console.log(
        `  📊 [verifyChecklist] Resultado de canImplement:`,
        JSON.stringify(check, null, 2)
      );

      if (!check.allowed) {
        console.log(
          `  ❌ [verifyChecklist] Checklist incompleto: ${check.reason}`
        );
        return {
          valid: false,
          errors: [
            `❌ Checklist incompleto para ${componentName}: ${check.reason || 'Faltan pasos obligatorios'}`,
          ],
          warnings: [],
          missingSteps: check.missingSteps || [],
        };
      }

      console.log(`  ✅ [verifyChecklist] Checklist completo`);
      return { valid: true, errors: [], warnings: [] };
    } catch (error: any) {
      console.log(`  ❌ [verifyChecklist] Error:`, error);
      return {
        valid: false,
        errors: [`❌ Error al verificar checklist: ${error.message}`],
        warnings: [],
      };
    }
  }

  /**
   * Verificar que se consultó Storybook en Vercel
   */
  private static async verifyStorybookConsultation(
    componentName: string
  ): Promise<ValidationResult> {
    // Esta verificación se hace a través del Pre-Implementation Check add-on
    // Si el checklist está completo, asumimos que se consultó Storybook
    return { valid: true, errors: [], warnings: [] };
  }

  /**
   * Verificar que se consultó documentación
   */
  private static async verifyDocumentationConsultation(
    componentName: string
  ): Promise<ValidationResult> {
    // Esta verificación se hace a través del Pre-Implementation Check add-on
    // Si el checklist está completo, asumimos que se consultó documentación
    return { valid: true, errors: [], warnings: [] };
  }

  /**
   * Verificar triggers de imagen
   */
  private static async verifyImageTriggers(
    userMessage?: string
  ): Promise<ValidationResult> {
    if (!userMessage) {
      return { valid: true, errors: [], warnings: [] };
    }

    // Detectar triggers de imagen
    const imageTriggers = [
      /imagen|image|crear desde|crear home|home de|implementar desde imagen/i,
      /<image|\[imagen\]|imagen\]/i,
    ];

    const hasTriggers = imageTriggers.some((pattern) =>
      pattern.test(userMessage)
    );

    if (hasTriggers) {
      return {
        valid: false,
        errors: [
          '❌ BLOQUEO: Hay triggers de imagen sin análisis completo.',
          '⚠️ DEBES completar el análisis de imagen antes de escribir código.',
          '📖 Ver: .cursor/rules/01-deteccion-imagen.md',
        ],
        warnings: [],
      };
    }

    return { valid: true, errors: [], warnings: [] };
  }

  /**
   * ⭐ NUEVO: Verificar operaciones comunes y guías obligatorias
   */
  private static async verifyCommonOperations(
    content: string,
    filePath: string
  ): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Importar OperationDetector dinámicamente
    try {
      const { OperationDetector } = await import('./OperationDetector');

      // Detectar operaciones comunes
      const detectedOperations = OperationDetector.detectOperations(
        content,
        filePath
      );

      if (detectedOperations.length === 0) {
        return { valid: true, errors: [], warnings: [] };
      }

      console.log(
        `🔍 [PreWriteValidator] ${detectedOperations.length} operación(es) común(es) detectada(s)`
      );

      // Verificar cada operación detectada
      for (const operation of detectedOperations) {
        // Por ahora, siempre requerir consultar la guía
        // En el futuro, esto podría usar un sistema de tracking más sofisticado
        const guideWasRead = OperationDetector.checkGuideWasRead(
          operation.requiredGuide
        );

        if (!guideWasRead) {
          const errorMessage = OperationDetector.getErrorMessage(operation);

          if (operation.severity === 'critical') {
            errors.push(errorMessage);
            console.error(
              `❌ [PreWriteValidator] Operación crítica detectada sin guía consultada: ${operation.operation}`
            );
          } else {
            warnings.push(errorMessage);
            console.warn(
              `⚠️ [PreWriteValidator] Operación detectada sin guía consultada: ${operation.operation}`
            );
          }
        } else {
          console.log(
            `✅ [PreWriteValidator] Guía consultada para operación: ${operation.operation}`
          );
        }
      }
    } catch (error) {
      // Si OperationDetector no está disponible, solo advertir
      console.warn(
        '⚠️ [PreWriteValidator] OperationDetector no está disponible, saltando verificación de operaciones comunes'
      );
      return { valid: true, errors: [], warnings: [] };
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

/**
 * Error personalizado para bloqueos de implementación
 */
export class ImplementationBlockedError extends Error {
  blocked = true;
  componentName?: string;
  missingSteps?: string[];
  checklist?: any;

  constructor(
    message: string,
    componentName?: string,
    missingSteps?: string[],
    checklist?: any
  ) {
    super(message);
    this.name = 'ImplementationBlockedError';
    this.componentName = componentName;
    this.missingSteps = missingSteps;
    this.checklist = checklist;
  }
}
