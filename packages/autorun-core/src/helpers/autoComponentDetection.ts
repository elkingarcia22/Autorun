/**
 * Auto Component Detection
 *
 * Sistema que detecta automáticamente componentes del mensaje del usuario
 * al inicio de cada mensaje y ejecuta el flujo completo automáticamente.
 *
 * ⚠️ CRÍTICO: Este sistema DEBE ejecutarse al inicio de cada mensaje del usuario.
 */

import { getAutorunHub } from '@autorun/core';
import { detectComponentFromMessage } from './implementationHelpers';
import { detectComponentsProactively } from './proactiveDetection';

export interface AutoDetectionResult {
  detected: boolean;
  componentName?: string;
  confidence?: 'high' | 'medium' | 'low';
  shouldExecuteFlow: boolean;
  plan?: any;
  verification?: any;
}

/**
 * ⚠️ CRÍTICO: Detectar componente automáticamente al inicio de cada mensaje
 *
 * Esta función DEBE ejecutarse al inicio de cada mensaje del usuario
 * para detectar proactivamente si quiere implementar un componente.
 *
 * @param userMessage Mensaje completo del usuario
 * @returns Resultado de detección con información del componente
 */
export async function autoDetectComponent(
  userMessage: string
): Promise<AutoDetectionResult> {
  console.log(
    '\n🔍 [Auto Component Detection] ========================================'
  );
  console.log('🔍 [Auto Component Detection] Iniciando detección automática');
  console.log(
    `🔍 [Auto Component Detection] Mensaje: ${userMessage.substring(0, 100)}...`
  );

  // 1. Detección básica con detectComponentFromMessage
  const basicDetection = detectComponentFromMessage(userMessage);
  console.log(
    `🔍 [Auto Component Detection] Detección básica: ${basicDetection || 'NINGUNO'}`
  );

  // 2. Detección proactiva mejorada
  const proactiveDetection = detectComponentsProactively(userMessage);
  console.log(
    `🔍 [Auto Component Detection] Detección proactiva: ${proactiveDetection.detected ? 'SÍ' : 'NO'}`
  );

  // 3. Determinar componente detectado
  let componentName: string | undefined = undefined;
  let confidence: 'high' | 'medium' | 'low' | undefined = undefined;

  // ⚠️ MEJORADO: Priorizar detección básica, pero también considerar proactiva
  if (basicDetection) {
    componentName = basicDetection;
    confidence = 'high';
  } else if (proactiveDetection.components.length > 0) {
    // Usar el componente con mayor confianza
    const sortedComponents = proactiveDetection.components.sort((a, b) => {
      const confidenceOrder = { high: 3, medium: 2, low: 1 };
      return confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
    });
    componentName = sortedComponents[0].name;
    confidence = sortedComponents[0].confidence;
  }

  // ⚠️ NUEVO: Si detectamos Button pero el mensaje también menciona Modal,
  // priorizar Button (porque es el que "abre" el modal)
  if (componentName === 'Modal' && /\bbot[oó]n\b/i.test(userMessage)) {
    // Verificar si hay Button en la detección proactiva
    const buttonComponent = proactiveDetection.components.find(
      (c) => c.name === 'Button'
    );
    if (buttonComponent) {
      // Button tiene prioridad porque es el que "abre" el modal
      componentName = 'Button';
      confidence = buttonComponent.confidence || 'high';
    }
  }

  if (!componentName) {
    console.log(
      '🔍 [Auto Component Detection] No se detectó ningún componente'
    );
    return {
      detected: false,
      shouldExecuteFlow: false,
    };
  }

  console.log(
    `✅ [Auto Component Detection] Componente detectado: ${componentName} (confianza: ${confidence})`
  );

  // 4. Si se detectó un componente, ejecutar verificación automática
  let plan: any = undefined;
  let verification: any = undefined;

  try {
    const hub = await getAutorunHub();
    if (!hub) {
      console.warn(
        '⚠️ [Auto Component Detection] AutorunHub no está inicializado'
      );
      return {
        detected: true,
        componentName,
        confidence,
        shouldExecuteFlow: false,
      };
    }

    const preCheckAddon = hub.getAddon('pre-implementation-check');
    if (!preCheckAddon) {
      console.warn(
        '⚠️ [Auto Component Detection] Pre-Implementation Check add-on no está disponible'
      );
      return {
        detected: true,
        componentName,
        confidence,
        shouldExecuteFlow: false,
      };
    }

    // ⚠️ CRÍTICO: Verificar con Pre-Implementation Check add-on
    console.log(
      `🔍 [Auto Component Detection] Verificando con Pre-Implementation Check...`
    );
    verification = await (preCheckAddon as any).verifyOnDetection?.(
      componentName
    );

    if (verification?.storyBasedPlan) {
      plan = verification.storyBasedPlan;
      console.log(
        `✅ [Auto Component Detection] Plan basado en historias obtenido: ${plan.totalSteps} historias`
      );
    } else {
      // Intentar obtener plan manualmente
      try {
        const {
          getStoryBasedImplementationPlan,
        } = require('./componentHelpers');
        const componentId = (preCheckAddon as any).getStorybookId?.(
          componentName
        );
        if (componentId) {
          const planResult = await getStoryBasedImplementationPlan(
            componentName,
            componentId
          );
          plan = planResult.plan;
          console.log(
            `✅ [Auto Component Detection] Plan obtenido manualmente: ${plan.totalSteps} historias`
          );
        }
      } catch (error) {
        console.warn(
          `⚠️ [Auto Component Detection] No se pudo obtener plan:`,
          error
        );
      }
    }
  } catch (error) {
    console.error(
      `❌ [Auto Component Detection] Error ejecutando verificación:`,
      error
    );
  }

  return {
    detected: true,
    componentName,
    confidence,
    shouldExecuteFlow: true,
    plan,
    verification,
  };
}

/**
 * ⚠️ CRÍTICO: Ejecutar detección automática al inicio de cada mensaje
 *
 * Esta función DEBE llamarse al inicio de cada mensaje del usuario.
 * Detecta automáticamente componentes y ejecuta el flujo completo.
 *
 * @param userMessage Mensaje completo del usuario
 * @returns Resultado de detección
 */
export async function executeAutoDetectionOnMessage(
  userMessage: string
): Promise<AutoDetectionResult> {
  return await autoDetectComponent(userMessage);
}
