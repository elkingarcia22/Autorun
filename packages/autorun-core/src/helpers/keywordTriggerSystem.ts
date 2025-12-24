/**
 * Keyword Trigger System
 *
 * Sistema que detecta palabras clave en mensajes del usuario para activar
 * automáticamente el flujo paso a paso de Autorun.
 *
 * ⚠️ CRÍTICO: Este sistema se ejecuta automáticamente y activa el flujo
 * completo cuando detecta intención de implementar componentes.
 */

import { executeOnMessageStart } from './executeOnMessageStart';
import { getAutorunHub } from '../AutorunAgent';

export interface KeywordTrigger {
  keywords: string[];
  patterns: RegExp[];
  componentName?: string;
  priority: 'high' | 'medium' | 'low';
  action:
    | 'activate-step-by-step'
    | 'verify-checklist'
    | 'load-guides'
    | 'block-implementation';
  context?: Record<string, any>;
}

export interface TriggerResult {
  triggered: boolean;
  triggers: KeywordTrigger[];
  componentName?: string;
  shouldActivateFlow: boolean;
  action: string;
  confidence: 'high' | 'medium' | 'low';
}

export class KeywordTriggerSystem {
  private static readonly TRIGGERS: KeywordTrigger[] = [
    // Triggers de implementación (ALTA PRIORIDAD)
    {
      keywords: ['implementar', 'crear', 'agregar', 'añadir', 'hacer'],
      patterns: [
        /implementar.*(?:data.?table|tabla|data-table)/i,
        /crear.*(?:data.?table|tabla|data-table)/i,
        /agregar.*(?:data.?table|tabla|data-table)/i,
        /hacer.*(?:data.?table|tabla|data-table)/i,
      ],
      componentName: 'DataTable',
      priority: 'high',
      action: 'activate-step-by-step',
    },
    {
      keywords: ['implementar', 'crear', 'agregar'],
      patterns: [/implementar.*tabs?/i, /crear.*tabs?/i, /agregar.*tabs?/i],
      componentName: 'Tabs',
      priority: 'high',
      action: 'activate-step-by-step',
    },
    {
      keywords: ['implementar', 'crear', 'agregar'],
      patterns: [/implementar.*modal/i, /crear.*modal/i, /agregar.*modal/i],
      componentName: 'Modal',
      priority: 'high',
      action: 'activate-step-by-step',
    },
    {
      keywords: ['implementar', 'crear', 'agregar'],
      patterns: [
        /implementar.*button|botón/i,
        /crear.*button|botón/i,
        /agregar.*button|botón/i,
      ],
      componentName: 'Button',
      priority: 'high',
      action: 'activate-step-by-step',
    },
    {
      keywords: ['implementar', 'crear', 'agregar'],
      patterns: [/implementar.*subnav/i, /crear.*subnav/i, /agregar.*subnav/i],
      componentName: 'SubNav',
      priority: 'high',
      action: 'activate-step-by-step',
    },

    // Triggers de verificación (MEDIA PRIORIDAD)
    {
      keywords: ['verificar', 'revisar', 'comprobar', 'chequear'],
      patterns: [
        /verificar.*(?:componente|implementación|checklist)/i,
        /revisar.*(?:componente|implementación|checklist)/i,
        /comprobar.*(?:componente|implementación|checklist)/i,
      ],
      priority: 'medium',
      action: 'verify-checklist',
    },

    // Triggers de documentación (BAJA PRIORIDAD)
    {
      keywords: ['documentación', 'guía', 'docs', 'ayuda'],
      patterns: [
        /(?:ver|mostrar|consultar).*(?:documentación|guía|docs)/i,
        /(?:necesito|quiero).*(?:documentación|guía|docs)/i,
      ],
      priority: 'low',
      action: 'load-guides',
    },

    // Triggers de bloqueo (ALTA PRIORIDAD)
    // ⚠️ CRÍTICO: Usar solo patterns para evitar falsos positivos (ej: "subnav" contiene "no")
    {
      keywords: [], // Vacío - solo usar patterns
      patterns: [
        /\bno\s+implementar/i, // "no implementar" como palabras separadas
        /\bno\s+crear/i, // "no crear" como palabras separadas
        /\bno\s+hacer/i, // "no hacer" como palabras separadas
        /\besperar\s+.*implementar/i, // "esperar ... implementar"
        /\bparar\s+.*implementación/i, // "parar ... implementación"
        /\bno\s+implementes/i, // "no implementes"
        /\bno\s+implemente/i, // "no implemente"
      ],
      priority: 'high',
      action: 'block-implementation',
    },
  ];

  /**
   * Detectar triggers en el mensaje del usuario
   */
  static detectTriggers(userMessage: string): TriggerResult {
    console.log(
      '\n🔍 [Keyword Trigger System] ========================================'
    );
    console.log('🔍 [Keyword Trigger System] Detectando triggers...');
    console.log(
      `🔍 [Keyword Trigger System] Mensaje: ${userMessage.substring(0, 100)}...`
    );

    const detectedTriggers: KeywordTrigger[] = [];
    let componentName: string | undefined = undefined;
    let highestPriority: 'high' | 'medium' | 'low' = 'low';
    let primaryAction: string = '';

    // Buscar triggers que coincidan
    for (const trigger of this.TRIGGERS) {
      // Verificar keywords
      const keywordMatch = trigger.keywords.some((keyword) =>
        userMessage.toLowerCase().includes(keyword.toLowerCase())
      );

      // Verificar patterns
      const patternMatch = trigger.patterns.some((pattern) =>
        pattern.test(userMessage)
      );

      if (keywordMatch || patternMatch) {
        detectedTriggers.push(trigger);
        console.log(
          `✅ [Keyword Trigger System] Trigger detectado: ${trigger.action} (prioridad: ${trigger.priority})`
        );

        // Actualizar prioridad más alta
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        if (priorityOrder[trigger.priority] > priorityOrder[highestPriority]) {
          highestPriority = trigger.priority;
          primaryAction = trigger.action;
        }

        // Si tiene componentName, guardarlo
        if (trigger.componentName && !componentName) {
          componentName = trigger.componentName;
        }
      }
    }

    if (detectedTriggers.length === 0) {
      console.log('ℹ️ [Keyword Trigger System] No se detectaron triggers');
      return {
        triggered: false,
        triggers: [],
        shouldActivateFlow: false,
        action: '',
        confidence: 'low',
      };
    }

    console.log(
      `✅ [Keyword Trigger System] ${detectedTriggers.length} trigger(s) detectado(s)`
    );
    console.log(
      `✅ [Keyword Trigger System] Acción principal: ${primaryAction}`
    );
    if (componentName) {
      console.log(
        `✅ [Keyword Trigger System] Componente detectado: ${componentName}`
      );
    }

    return {
      triggered: true,
      triggers: detectedTriggers,
      componentName,
      shouldActivateFlow: primaryAction === 'activate-step-by-step',
      action: primaryAction,
      confidence: highestPriority,
    };
  }

  /**
   * Ejecutar acción basada en trigger detectado
   */
  static async executeTriggerAction(triggerResult: TriggerResult): Promise<{
    executed: boolean;
    result?: any;
    blocked?: boolean;
    reason?: string;
  }> {
    if (!triggerResult.triggered) {
      return { executed: false };
    }

    console.log(
      `\n🚀 [Keyword Trigger System] Ejecutando acción: ${triggerResult.action}`
    );

    switch (triggerResult.action) {
      case 'activate-step-by-step':
        // Activar flujo paso a paso
        // ⚠️ CRÍTICO: NO llamar a executeOnMessageStart() aquí para evitar bucle infinito
        // Solo marcar que el flujo debe activarse - executeOnMessageStart() ya se ejecutará después
        return {
          executed: true,
          blocked: false,
        };

      case 'verify-checklist':
        // Verificar checklist
        try {
          const hub = await getAutorunHub();
          if (hub) {
            const preCheckAddon = hub.getAddon('pre-implementation-check');
            if (preCheckAddon && triggerResult.componentName) {
              const check = await (preCheckAddon as any).canImplement?.(
                triggerResult.componentName
              );
              return {
                executed: true,
                result: check,
                blocked: !check?.allowed,
                reason: check?.reason,
              };
            }
          }
        } catch (error) {
          console.error(
            `❌ [Keyword Trigger System] Error verificando checklist:`,
            error
          );
        }
        break;

      case 'load-guides':
        // Cargar guías
        if (triggerResult.componentName) {
          try {
            const { loadRequiredGuides } = await import('./guidesLoader');
            const guidesResult = await loadRequiredGuides(
              triggerResult.componentName
            );
            return {
              executed: true,
              result: guidesResult,
            };
          } catch (error) {
            console.error(
              `❌ [Keyword Trigger System] Error cargando guías:`,
              error
            );
          }
        }
        break;

      case 'block-implementation':
        // Bloquear implementación
        return {
          executed: true,
          blocked: true,
          reason: 'El usuario solicitó no implementar o esperar',
        };
    }

    return { executed: false };
  }

  /**
   * ⚠️ CRÍTICO: Ejecutar sistema completo de triggers
   *
   * Esta función DEBE llamarse al inicio de cada mensaje para detectar
   * automáticamente triggers y activar el flujo correspondiente.
   */
  static async executeTriggerSystem(userMessage: string): Promise<{
    triggered: boolean;
    componentName?: string;
    shouldActivateFlow: boolean;
    blocked?: boolean;
    reason?: string;
    result?: any;
  }> {
    // 1. Detectar triggers
    const triggerResult = this.detectTriggers(userMessage);

    if (!triggerResult.triggered) {
      return {
        triggered: false,
        shouldActivateFlow: false,
      };
    }

    // 2. Ejecutar acción
    const actionResult = await this.executeTriggerAction(triggerResult);

    return {
      triggered: true,
      componentName: triggerResult.componentName,
      shouldActivateFlow: triggerResult.shouldActivateFlow,
      blocked: actionResult.blocked,
      reason: actionResult.reason,
      result: actionResult.result,
    };
  }
}

/**
 * ⚠️ CRÍTICO: Función de conveniencia para ejecutar el sistema de triggers
 */
export async function executeKeywordTriggerSystem(
  userMessage: string
): Promise<{
  triggered: boolean;
  componentName?: string;
  shouldActivateFlow: boolean;
  blocked?: boolean;
  reason?: string;
  result?: any;
}> {
  return await KeywordTriggerSystem.executeTriggerSystem(userMessage);
}
