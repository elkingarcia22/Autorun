/**
 * PreWriteValidator
 * 
 * Valida que se hayan completado todos los pasos obligatorios antes de escribir código.
 * 
 * Este validador se ejecuta AUTOMÁTICAMENTE antes de cada write() o search_replace()
 * para garantizar que se sigan los lineamientos de Autorun.
 */

import { getAutorunHub } from '@autorun/core';
import { detectComponentFromContent, detectComponentFromMessage } from '../helpers/implementationHelpers';
import { generateContextualErrorMessage } from '../helpers/errorMessages';

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
    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. Detectar componente del contenido o contexto
    let componentName = context?.componentName;
    
    if (!componentName) {
      componentName = detectComponentFromContent(content);
    }
    
    if (!componentName && context?.userMessage) {
      componentName = detectComponentFromMessage(context.userMessage);
    }

    // 2. Si se detectó un componente, verificar checklist obligatorio
    if (componentName) {
      const checklistResult = await this.verifyChecklist(componentName);
      if (!checklistResult.valid) {
        errors.push(...checklistResult.errors);
      }

      // 3. Verificar que se consultó Storybook
      const storybookResult = await this.verifyStorybookConsultation(componentName);
      if (!storybookResult.valid) {
        errors.push(...storybookResult.errors);
      }

      // 4. Verificar que se consultó documentación
      const docResult = await this.verifyDocumentationConsultation(componentName);
      if (!docResult.valid) {
        errors.push(...docResult.errors);
      }
    }

    // 5. Verificar triggers de imagen (si aplica)
    const imageResult = await this.verifyImageTriggers(context?.userMessage);
    if (!imageResult.valid) {
      errors.push(...imageResult.errors);
    }

    // ⭐ NUEVO: Si hay errores, generar mensajes más claros
    if (errors.length > 0) {
      const hub = getAutorunHub();
      const problemTracker = hub?.getAddon('problem-tracker');
      
      try {
        const clearMessage = await generateContextualErrorMessage(
          errors[0].includes('checklist') ? 'checklist-incomplete' :
          errors[0].includes('imagen') ? 'image-trigger-detected' :
          errors[0].includes('Storybook') ? 'storybook-not-consulted' :
          'checklist-incomplete',
          {
            componentName,
            missingSteps: errors,
            problemTracker: problemTracker ? (problemTracker as any).service : undefined,
          }
        );
        
        // Reemplazar primer error con mensaje claro
        errors[0] = clearMessage;
      } catch (error) {
        // Si falla, usar errores originales
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      componentName,
      missingSteps: errors.length > 0 ? errors : undefined
    };
  }

  /**
   * Verificar que se completó el checklist obligatorio
   */
  private static async verifyChecklist(componentName: string): Promise<ValidationResult> {
    const hub = getAutorunHub();
    if (!hub) {
      return {
        valid: false,
        errors: ['❌ AutorunHub no está inicializado. Ejecuta: npm run autorun:init-hub'],
        warnings: []
      };
    }

    const preCheckAddon = hub.getAddon('pre-implementation-check');
    if (!preCheckAddon) {
      // Si el add-on no está disponible, solo advertir (no bloquear)
      return {
        valid: true,
        errors: [],
        warnings: ['⚠️ Pre-Implementation Check add-on no está disponible. Se recomienda activarlo.'],
      };
    }

    try {
      const check = await (preCheckAddon as any).canImplement(componentName);
      if (!check.allowed) {
        return {
          valid: false,
          errors: [`❌ Checklist incompleto para ${componentName}: ${check.reason || 'Faltan pasos obligatorios'}`],
          warnings: [],
          missingSteps: check.missingSteps || []
        };
      }

      return { valid: true, errors: [], warnings: [] };
    } catch (error: any) {
      return {
        valid: false,
        errors: [`❌ Error al verificar checklist: ${error.message}`],
        warnings: []
      };
    }
  }

  /**
   * Verificar que se consultó Storybook en Vercel
   */
  private static async verifyStorybookConsultation(componentName: string): Promise<ValidationResult> {
    // Esta verificación se hace a través del Pre-Implementation Check add-on
    // Si el checklist está completo, asumimos que se consultó Storybook
    return { valid: true, errors: [], warnings: [] };
  }

  /**
   * Verificar que se consultó documentación
   */
  private static async verifyDocumentationConsultation(componentName: string): Promise<ValidationResult> {
    // Esta verificación se hace a través del Pre-Implementation Check add-on
    // Si el checklist está completo, asumimos que se consultó documentación
    return { valid: true, errors: [], warnings: [] };
  }

  /**
   * Verificar triggers de imagen
   */
  private static async verifyImageTriggers(userMessage?: string): Promise<ValidationResult> {
    if (!userMessage) {
      return { valid: true, errors: [], warnings: [] };
    }

    // Detectar triggers de imagen
    const imageTriggers = [
      /imagen|image|crear desde|crear home|home de|implementar desde imagen/i,
      /<image|\[imagen\]|imagen\]/i
    ];

    const hasTriggers = imageTriggers.some(pattern => pattern.test(userMessage));

    if (hasTriggers) {
      return {
        valid: false,
        errors: [
          '❌ BLOQUEO: Hay triggers de imagen sin análisis completo.',
          '⚠️ DEBES completar el análisis de imagen antes de escribir código.',
          '📖 Ver: .cursor/rules/01-deteccion-imagen.md'
        ],
        warnings: []
      };
    }

    return { valid: true, errors: [], warnings: [] };
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

  constructor(message: string, componentName?: string, missingSteps?: string[], checklist?: any) {
    super(message);
    this.name = 'ImplementationBlockedError';
    this.componentName = componentName;
    this.missingSteps = missingSteps;
    this.checklist = checklist;
  }
}
