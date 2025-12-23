/**
 * PreImplementationCheckAddon
 *
 * Add-on que verifica automáticamente que se sigan todos los pasos obligatorios
 * antes de implementar cualquier componente UBITS.
 *
 * Bloquea la implementación si no se completan los pasos obligatorios:
 * 1. Consultar Storybook en Vercel (PRIMERO)
 * 2. Consultar Storybook MCP
 * 3. Consultar documentación específica
 */

import { IFunctionalAddon, AutorunContext, AddonStatus } from '@autorun/core';
import * as fs from 'fs/promises';
import * as path from 'path';

// ⚠️ CRÍTICO: Variable global para detectar cuando estamos en modo autorun.apply()
// Esto permite que canImplement() y verifyOnDetection() siempre permitan cuando viene de autorun.apply()
declare global {
  var __AUTORUN_APPLY_MODE__: boolean | undefined;
}

interface ComponentChecklist {
  componentName: string;
  storybookVercel: boolean;
  storybookMCP: boolean;
  documentation: boolean;
  comparison: boolean;
  timestamp: number;
}

interface ImplementationAttempt {
  componentName: string;
  timestamp: number;
  checklist: ComponentChecklist | null;
  blocked: boolean;
  reason?: string;
}

export class PreImplementationCheckAddon implements IFunctionalAddon {
  readonly id = 'pre-implementation-check';
  readonly name = 'Pre-Implementation Check';
  readonly version = '1.0.0';
  readonly type = 'functional';
  readonly description =
    'Verifica automáticamente que se sigan todos los pasos obligatorios antes de implementar componentes';

  private active = false;
  private context?: AutorunContext;
  private checklists: Map<string, ComponentChecklist> = new Map();
  private implementationAttempts: ImplementationAttempt[] = [];
  private problemTrackerAddon: any = null;
  private componentDocumentation: Map<string, any> = new Map();
  private storybookData: Map<string, any> = new Map();
  private storyBasedPlans: Map<string, any> = new Map(); // ⭐ NUEVO: Planes basados en historias

  /**
   * ⭐ MEJORADO: Detectar intención de implementar componente del mensaje del usuario
   *
   * Esta función se debe llamar ANTES de escribir código para detectar proactivamente
   * si el usuario quiere implementar un componente.
   *
   * Ahora usa el sistema mejorado de detección proactiva.
   */
  static detectComponentFromMessage(message: string): string[] {
    // Usar sistema mejorado de detección proactiva
    try {
      const {
        detectComponentsProactively,
      } = require('@autorun/core/helpers/proactiveDetection');
      const result = detectComponentsProactively(message);
      return result.components.map((c: { name: string }) => c.name);
    } catch (error) {
      // Fallback a detección básica si el sistema mejorado no está disponible
      const patterns = [
        {
          pattern: /implementar.*data.?table|crear.*tabla|data.?table/i,
          component: 'DataTable',
        },
        { pattern: /implementar.*tabs?|crear.*tabs?/i, component: 'Tabs' },
        { pattern: /implementar.*modal|crear.*modal/i, component: 'Modal' },
        { pattern: /implementar.*button|crear.*botón/i, component: 'Button' },
        {
          pattern: /implementar.*sidebar|crear.*sidebar/i,
          component: 'Sidebar',
        },
        { pattern: /implementar.*subnav|crear.*subnav/i, component: 'SubNav' },
        { pattern: /implementar.*tabbar|crear.*tabbar/i, component: 'TabBar' },
      ];

      const detected: string[] = [];
      patterns.forEach(({ pattern, component }) => {
        if (pattern.test(message)) {
          detected.push(component);
        }
      });

      return detected;
    }
  }

  /**
   * ⭐ NUEVO: Obtener checklist contextual inteligente para un componente
   *
   * Muestra solo items relevantes basados en el contexto (imagen, historias, etc.)
   */
  async getContextualChecklist(
    componentName: string,
    context?: {
      hasImage?: boolean;
      hasStories?: boolean;
      complexity?: 'simple' | 'medium' | 'complex';
    }
  ): Promise<string[]> {
    try {
      const {
        getContextualChecklist,
      } = require('@autorun/core/helpers/proactiveDetection');
      return getContextualChecklist(componentName, context);
    } catch (error) {
      // Fallback a checklist básico
      return [
        'Consultar Storybook en Vercel',
        'Consultar Storybook MCP',
        'Consultar documentación específica',
      ];
    }
  }

  /**
   * ⭐ NUEVO: Sugerir siguiente paso basado en contexto
   */
  async suggestNextStep(
    componentName: string,
    completedSteps: string[],
    context?: {
      hasImage?: boolean;
      hasStories?: boolean;
    }
  ): Promise<{
    step: string;
    priority: 'high' | 'medium' | 'low';
    instructions: string;
  } | null> {
    try {
      const {
        suggestNextStep,
      } = require('@autorun/core/helpers/proactiveDetection');
      return suggestNextStep(componentName, completedSteps, context);
    } catch (error) {
      return null;
    }
  }

  /**
   * ⭐ NUEVO: Verificar inmediatamente cuando se detecta intención de implementar
   *
   * Esta función se debe llamar cuando se detecta que el usuario quiere implementar
   * un componente, ANTES de escribir código.
   *
   * ⚠️ AUTOMÁTICO: Obtiene plan basado en historias de Storybook y lo muestra al agente
   */
  async verifyOnDetection(
    componentName: string,
    options?: { skipCheck?: boolean }
  ): Promise<{
    blocked: boolean;
    reason?: string;
    missingSteps?: string[];
    storyBasedPlan?: any; // ⭐ NUEVO: Plan basado en historias
  }> {
    console.log(
      `\n🔍 [verifyOnDetection] ========================================`
    );
    console.log(`🔍 [verifyOnDetection] Componente: ${componentName}`);
    console.log(`🔍 [verifyOnDetection] Opciones:`, options);
    console.log(`🔍 [verifyOnDetection] Add-on activo: ${this.active}`);

    if (!this.active) {
      return { blocked: false };
    }

    // ✅ MEJORA: Si skipCheck=true (desde autorun.apply()), permitir automáticamente
    const skipCheckValue = options?.skipCheck === true;
    console.log(
      `   🔍 [verifyOnDetection] Verificando skipCheck: options=${JSON.stringify(options)}, options?.skipCheck=${options?.skipCheck}, skipCheckValue=${skipCheckValue}, typeof=${typeof options?.skipCheck}`
    );
    if (skipCheckValue) {
      console.log(
        `   ✅ [verifyOnDetection] skipCheck=true, permitiendo automáticamente - RETORNANDO INMEDIATAMENTE`
      );
      // Marcar pasos automáticamente
      await this.markStepCompleted(componentName, 'storybookMCP');
      await this.markStepCompleted(componentName, 'storybookVercel');
      await this.markStepCompleted(componentName, 'documentation');
      console.log(
        `   ✅ [verifyOnDetection] Pasos marcados, retornando { blocked: false }`
      );
      console.log(
        `🔍 [verifyOnDetection] ========================================\n`
      );
      // ⚠️ CRÍTICO: Retornar INMEDIATAMENTE sin continuar con ninguna verificación
      return { blocked: false };
    }
    console.log(
      `   ⚠️ [verifyOnDetection] skipCheck=false o undefined, continuando con verificación normal`
    );

    // ⭐ NUEVO: Obtener automáticamente plan basado en historias de Storybook
    let storyBasedPlan = null;
    try {
      const {
        getStoryBasedImplementationPlan,
      } = require('@autorun/core/helpers/componentHelpers');
      console.log(
        `\n📚 [Pre-Implementation Check] Obteniendo plan basado en historias para: ${componentName}`
      );

      const componentId = this.getStorybookId(componentName);
      const planResult = await getStoryBasedImplementationPlan(
        componentName,
        componentId
      );
      storyBasedPlan = planResult.plan;

      console.log(
        `\n✅ [Pre-Implementation Check] Plan obtenido: ${storyBasedPlan.totalSteps} historias encontradas`
      );
      console.log(
        `\n📋 [Pre-Implementation Check] Plan de implementación basado en historias:`
      );
      console.log(planResult.summary);
      console.log(
        `\n💡 [Pre-Implementation Check] Instrucciones: ${planResult.instructions}`
      );
      console.log(
        `\n⚠️ [Pre-Implementation Check] Implementar UNA historia a la vez, completando TODO el checklist antes de continuar.\n`
      );
    } catch (error) {
      console.warn(
        `⚠️ [Pre-Implementation Check] No se pudo obtener plan basado en historias:`,
        error
      );
      // Continuar con verificación normal si falla
    }

    // ✅ MEJORA: Pasar skipCheck si viene de autorun.apply()
    // ⚠️ CRÍTICO: Si ya marcamos los pasos arriba cuando skipCheck=true, no deberíamos llegar aquí
    // Pero por si acaso, también pasar skipCheck a canImplement()
    console.log(
      `   🔍 [verifyOnDetection] Llamando canImplement con options?.skipCheck=${options?.skipCheck}`
    );
    const check = await this.canImplement(
      componentName,
      options?.skipCheck ? { skipCheck: true } : undefined
    );
    console.log(`   🔍 [verifyOnDetection] Resultado de canImplement:`, {
      allowed: check.allowed,
      reason: check.reason,
      missingSteps: check.missingSteps,
    });

    if (!check.allowed) {
      const errorMessage = `
🚨🚨🚨 PRE-IMPLEMENTATION CHECK: IMPLEMENTACIÓN BLOQUEADA 🚨🚨🚨

Componente: ${componentName}
Razón: ${check.reason || 'Faltan pasos obligatorios'}

📋 Pasos faltantes:
${check.missingSteps.map((step) => `  - ${step}`).join('\n')}

${storyBasedPlan ? `\n📚 Plan basado en historias obtenido: ${storyBasedPlan.totalSteps} historias\n` : ''}

⚠️ NO puedes usar write() o search_replace() hasta completar estos pasos.

📚 Pasos obligatorios:
1. Consultar Storybook en Vercel (PRIMERO)
   - URL: https://ubits-storybook10.vercel.app/
   - Buscar componente: ${this.getStorybookId(componentName)}
   - Revisar pestaña "Code" y "Controls"
   - Volver al template después de consultar

2. Consultar Storybook MCP
   - Usar mcp_storybook_getComponentList
   - Usar mcp_storybook_getComponentsProps(['${componentName}'])

3. Consultar documentación específica
   - Leer docs/referencia/componentes/${this.getDocFileName(componentName)}
   - Leer docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md

4. Comparar versiones
   - Comparar Storybook Vercel vs código local
   - Usar versión del Storybook si hay diferencias

${storyBasedPlan ? `\n📖 Plan basado en historias disponible. Implementar UNA historia a la vez.\n` : ''}

📖 Ver guía completa: docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md

💡 Para completar el checklist automáticamente:
   - Usar ensureImplementationReady('${componentName}') antes de escribir
   - Completar cada paso y marcar como completado
   - Verificar nuevamente antes de implementar
			`.trim();

      console.error(errorMessage);

      // Registrar en Problem Tracker
      if (this.problemTrackerAddon) {
        try {
          await this.problemTrackerAddon.service?.detectProblem?.(
            `Intento de implementar ${componentName} sin completar checklist obligatorio`,
            {
              category: 'implementacion',
              severity: 'high',
              missingSteps: check.missingSteps,
              checklist: check.checklist,
              storyBasedPlan: storyBasedPlan
                ? {
                    totalSteps: storyBasedPlan.totalSteps,
                    estimatedTime: storyBasedPlan.estimatedTotalTime,
                  }
                : null,
            }
          );
        } catch (error) {
          // Ignorar errores de Problem Tracker
        }
      }

      return {
        blocked: true,
        reason: check.reason,
        missingSteps: check.missingSteps,
        storyBasedPlan, // ⭐ NUEVO: Incluir plan en la respuesta
      };
    }

    // ⭐ NUEVO: Si el checklist está completo, mostrar plan basado en historias para guiar implementación
    if (storyBasedPlan) {
      console.log(
        `\n✅ [Pre-Implementation Check] Checklist completo. Plan basado en historias disponible para guiar implementación.`
      );
      console.log(
        `📋 Implementar ${storyBasedPlan.totalSteps} historias, UNA a la vez.\n`
      );
    }

    return {
      blocked: false,
      storyBasedPlan, // ⭐ NUEVO: Incluir plan incluso si no está bloqueado
    };
  }

  async initialize(context: AutorunContext): Promise<void> {
    this.context = context;

    // Obtener configuración
    const addonConfig =
      context.config.autorun?.addons?.config?.['pre-implementation-check'] ||
      {};
    const enabled = addonConfig.enabled !== false;

    if (!enabled) {
      console.log(
        '⚠️ Pre-Implementation Check Add-on: Deshabilitado en configuración'
      );
      return;
    }

    // Buscar Problem Tracker Add-on para registrar intentos bloqueados
    if (context.hub) {
      const activeAddons = (context.hub as any).getActiveAddons?.() || [];
      this.problemTrackerAddon = activeAddons.find(
        (addon: any) => addon.id === 'problem-tracker'
      );
    }

    this.active = true;
    console.log('✅ Pre-Implementation Check Add-on: Inicializado');
  }

  async activate(): Promise<void> {
    if (!this.active) {
      this.active = true;
      console.log('✅ Pre-Implementation Check Add-on: Activado');
    }
  }

  async deactivate(): Promise<void> {
    this.active = false;
    console.log('🔄 Pre-Implementation Check Add-on: Desactivado');
  }

  async configure(config: Record<string, any>): Promise<void> {
    // Configuración se maneja en initialize
  }

  isActive(): boolean {
    return this.active;
  }

  getStatus(): AddonStatus {
    return this.active ? 'active' : 'inactive';
  }

  /**
   * Verifica si se puede implementar un componente
   * @param componentName Nombre del componente a implementar
   * @returns true si se puede implementar, false si está bloqueado
   */
  async canImplement(
    componentName: string,
    options?: { skipCheck?: boolean }
  ): Promise<{
    allowed: boolean;
    checklist: ComponentChecklist;
    missingSteps: string[];
    reason?: string;
  }> {
    console.log(`\n🔍 [canImplement] ========================================`);
    console.log(
      `🔍 [canImplement] Verificando si se puede implementar: ${componentName}`
    );
    console.log(`🔍 [canImplement] Add-on activo: ${this.active}`);
    console.log(`🔍 [canImplement] Opciones:`, options);

    // ⚠️ CRÍTICO: Verificar si estamos en modo autorun.apply() usando variable global
    const isAutorunApplyMode =
      typeof globalThis !== 'undefined' &&
      globalThis.__AUTORUN_APPLY_MODE__ === true;
    console.log(
      `   🔍 [canImplement] Modo autorun.apply(): ${isAutorunApplyMode}`
    );

    // ⚠️ CRÍTICO: Si estamos en modo autorun.apply(), SIEMPRE permitir automáticamente
    // Esto garantiza que autorun.apply() nunca se bloquee
    if (isAutorunApplyMode) {
      console.log(
        `   ✅ [canImplement] Modo autorun.apply() detectado, permitiendo implementación automáticamente`
      );
      // Marcar pasos automáticamente
      await this.markStepCompleted(componentName, 'storybookMCP');
      await this.markStepCompleted(componentName, 'storybookVercel');
      await this.markStepCompleted(componentName, 'documentation');
      const finalChecklist =
        this.checklists.get(componentName) ||
        this.createEmptyChecklist(componentName);
      console.log(
        `   ✅ [canImplement] Pasos marcados, retornando allowed=true con checklist:`,
        {
          storybookVercel: finalChecklist.storybookVercel,
          storybookMCP: finalChecklist.storybookMCP,
          documentation: finalChecklist.documentation,
        }
      );
      return {
        allowed: true,
        checklist: finalChecklist,
        missingSteps: [],
      };
    }

    if (!this.active) {
      console.log(
        `⚠️  [canImplement] Add-on no está activo, permitiendo implementación`
      );
      return {
        allowed: true,
        checklist: this.createEmptyChecklist(componentName),
        missingSteps: [],
      };
    }

    // ✅ MEJORA: Si skipCheck=true (desde autorun.apply()), permitir automáticamente
    const skipCheckValue = options?.skipCheck === true;
    console.log(
      `   🔍 [canImplement] Verificando skipCheck: options=${JSON.stringify(options)}, options?.skipCheck=${options?.skipCheck}, skipCheckValue=${skipCheckValue}`
    );
    if (skipCheckValue) {
      console.log(
        `   ✅ [canImplement] skipCheck=true, permitiendo implementación automáticamente`
      );
      // Marcar pasos automáticamente
      await this.markStepCompleted(componentName, 'storybookMCP');
      await this.markStepCompleted(componentName, 'storybookVercel');
      await this.markStepCompleted(componentName, 'documentation');
      const finalChecklist =
        this.checklists.get(componentName) ||
        this.createEmptyChecklist(componentName);
      console.log(
        `   ✅ [canImplement] Pasos marcados, retornando allowed=true con checklist:`,
        {
          storybookVercel: finalChecklist.storybookVercel,
          storybookMCP: finalChecklist.storybookMCP,
          documentation: finalChecklist.documentation,
        }
      );
      return {
        allowed: true,
        checklist: finalChecklist,
        missingSteps: [],
      };
    }
    console.log(
      `   ⚠️ [canImplement] skipCheck=false o undefined, continuando con verificación normal`
    );

    // Obtener o crear checklist
    const checklist =
      this.checklists.get(componentName) ||
      this.createEmptyChecklist(componentName);

    console.log(`🔍 [canImplement] Checklist obtenido:`, {
      storybookVercel: checklist.storybookVercel,
      storybookMCP: checklist.storybookMCP,
      documentation: checklist.documentation,
      comparison: checklist.comparison,
    });

    // Verificar pasos obligatorios
    const missingSteps: string[] = [];

    if (!checklist.storybookVercel) {
      missingSteps.push('Consultar Storybook en Vercel (PRIMERO)');
    }

    if (!checklist.storybookMCP) {
      missingSteps.push('Consultar Storybook MCP');
    }

    if (!checklist.documentation) {
      missingSteps.push('Consultar documentación específica');
    }

    console.log(`🔍 [canImplement] Pasos faltantes: ${missingSteps.length}`);
    if (missingSteps.length > 0) {
      console.log(`🔍 [canImplement] Pasos faltantes:`, missingSteps);
    }

    const allowed = missingSteps.length === 0;
    console.log(`🔍 [canImplement] ¿Permitido?: ${allowed}`);

    // Registrar intento
    const attempt: ImplementationAttempt = {
      componentName,
      timestamp: Date.now(),
      checklist,
      blocked: !allowed,
      reason: allowed
        ? undefined
        : `Faltan pasos obligatorios: ${missingSteps.join(', ')}`,
    };

    this.implementationAttempts.push(attempt);

    // Si está bloqueado, registrar en Problem Tracker
    if (!allowed && this.problemTrackerAddon) {
      try {
        await this.problemTrackerAddon.service?.detectProblem?.(
          `Intento de implementar ${componentName} sin completar checklist obligatorio`,
          {
            category: 'implementacion',
            severity: 'high',
            missingSteps,
            checklist,
          }
        );
      } catch (error) {
        // Ignorar errores de Problem Tracker
      }
    }

    // ⚠️ CRÍTICO: Si está bloqueado, mostrar mensaje de error más claro
    if (!allowed) {
      // ⭐ MEJORADO: Usar sistema de mensajes de error mejorados
      try {
        const {
          generateContextualErrorMessage,
        } = require('@autorun/core/helpers/errorMessages');
        const errorMessage = await generateContextualErrorMessage(
          'checklist-incomplete',
          {
            componentName,
            missingSteps: missingSteps,
            checklist: checklist,
            problemTracker: this.problemTrackerAddon?.service,
          }
        );
        console.error(errorMessage);
      } catch (error) {
        // Fallback a mensaje básico si el sistema mejorado no está disponible
        const errorMessage = `
🚨🚨🚨 PRE-IMPLEMENTATION CHECK: IMPLEMENTACIÓN BLOQUEADA 🚨🚨🚨

Componente: ${componentName}
Razón: ${attempt.reason || 'Faltan pasos obligatorios'}

📋 Pasos faltantes:
${missingSteps.map((step) => `  - ${step}`).join('\n')}

⚠️ NO puedes usar write() o search_replace() hasta completar estos pasos.

📚 Pasos obligatorios:
1. Consultar Storybook en Vercel (PRIMERO)
   - URL: https://ubits-storybook10.vercel.app/
   - Buscar componente: ${this.getStorybookId(componentName)}
   - Revisar pestaña "Code" y "Controls"
   - Volver al template después de consultar

2. Consultar Storybook MCP
   - Usar mcp_storybook_getComponentList
   - Usar mcp_storybook_getComponentsProps(['${componentName}'])

3. Consultar documentación específica
   - Leer docs/referencia/componentes/${this.getDocFileName(componentName)}
   - Leer docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md

4. Comparar versiones
   - Comparar Storybook Vercel vs código local
   - Usar versión del Storybook si hay diferencias

📖 Ver guía completa: docs/guias/implementacion/CHECKLIST-ANTES-IMPLEMENTAR-COMPONENTE.md

💡 Para completar el checklist automáticamente:
   - Usar ensureImplementationReady('${componentName}') antes de escribir
   - Completar cada paso y marcar como completado
   - Verificar nuevamente antes de implementar
				`.trim();
        console.error(errorMessage);
      }
    }

    const result = {
      allowed,
      checklist,
      missingSteps,
      reason: attempt.reason,
    };

    console.log(`🔍 [canImplement] Resultado final:`, {
      allowed: result.allowed,
      missingStepsCount: result.missingSteps.length,
      reason: result.reason || 'N/A',
    });
    console.log(`🔍 [canImplement] ========================================\n`);

    return result;
  }

  /**
   * Marca un paso del checklist como completado
   */
  async markStepCompleted(
    componentName: string,
    step: 'storybookVercel' | 'storybookMCP' | 'documentation' | 'comparison'
  ): Promise<void> {
    if (!this.active) {
      return;
    }

    const checklist =
      this.checklists.get(componentName) ||
      this.createEmptyChecklist(componentName);
    checklist[step] = true;
    checklist.timestamp = Date.now();
    this.checklists.set(componentName, checklist);

    console.log(
      `✅ Pre-Implementation Check: Paso "${step}" completado para ${componentName}`
    );
  }

  /**
   * Obtiene el ID de Storybook para un componente
   */
  private getStorybookId(componentName: string): string {
    // ⚠️ CRÍTICO: Usar mapComponentNameToStorybookId del core para consistencia
    try {
      const {
        mapComponentNameToStorybookId,
      } = require('@autorun/core/helpers/storybookStories');
      return mapComponentNameToStorybookId(componentName);
    } catch (error) {
      // Fallback si no está disponible
      const componentIdMap: Record<string, string> = {
        DataTable: 'data-data-table',
        Tabs: 'navegacion-tabs', // ⚠️ CORREGIDO: era 'navegacin-tabs'
        Button: 'bsicos-button',
        Modal: 'feedback-modal',
        Sidebar: 'navegacion-sidebar', // ⚠️ CORREGIDO: era 'navegacin-sidebar'
        SubNav: 'navegacion-sub-nav', // ⚠️ CORREGIDO: era 'navegacin-subnav'
        TabBar: 'navegacion-tab-bar', // ⚠️ CORREGIDO: era 'navegacin-tab-bar'
        Drawer: 'feedback-drawer-navigation', // ⚠️ CORREGIDO: era 'feedback-drawer'
        Chip: 'bsicos-chip',
        Tooltip: 'feedback-tooltip',
      };
      return componentIdMap[componentName] || componentName.toLowerCase();
    }
  }

  /**
   * Obtiene el nombre del archivo de documentación para un componente
   */
  private getDocFileName(componentName: string): string {
    // ⚠️ CRÍTICO: Usar mapComponentNameToDocFile del core para consistencia
    try {
      const {
        mapComponentNameToDocFile,
      } = require('@autorun/core/helpers/componentHelpers');
      return mapComponentNameToDocFile(componentName) + '.md';
    } catch (error) {
      // Fallback si no está disponible
      const docFileMap: Record<string, string> = {
        DataTable: 'data-data-table.md',
        Tabs: 'navegacin-tabs.md', // ⚠️ NOTA: El archivo real se llama 'navegacin-tabs.md' (sin 'o'), pero el ID de Storybook es 'navegacion-tabs' (con 'o')
        Button: 'bsicos-button.md',
        Modal: 'feedback-modal.md',
        Sidebar: 'navegacin-sidebar.md', // ⚠️ NOTA: El archivo real se llama 'navegacin-sidebar.md' (sin 'o')
        SubNav: 'navegacin-subnav.md', // ⚠️ NOTA: El archivo real se llama 'navegacin-subnav.md' (sin 'o')
        TabBar: 'navegacin-tab-bar.md', // ⚠️ NOTA: El archivo real se llama 'navegacin-tab-bar.md' (sin 'o')
        Drawer: 'feedback-drawer-navigation.md',
        Chip: 'bsicos-chip.md',
        Tooltip: 'feedback-tooltip.md',
      };
      return docFileMap[componentName] || `${componentName.toLowerCase()}.md`;
    }
  }

  /**
   * Consulta Storybook MCP automáticamente para obtener información del componente
   * ⚠️ NOTA: Las herramientas MCP no están disponibles directamente en Node.js
   * El agente de Cursor debe interceptar esta llamada y usar las herramientas MCP
   */
  async consultStorybookMCP(componentName: string): Promise<any> {
    if (!this.active || !this.context) {
      return null;
    }

    const storybookId = this.getStorybookId(componentName);

    console.log(
      `🔍 Pre-Implementation Check: Intentando consultar Storybook MCP para '${componentName}' (ID: ${storybookId})...`
    );

    try {
      // ⚠️ CRÍTICO: Las herramientas MCP no están disponibles directamente en Node.js
      // El agente de Cursor debe interceptar esta llamada y usar las herramientas MCP
      // Por ahora, emitimos un mensaje especial que el agente puede interceptar

      console.log(
        `[AUTORUN_STORYBOOK_MCP]${componentName}:${storybookId}[/AUTORUN_STORYBOOK_MCP]`
      );
      console.log(
        `💡 Pre-Implementation Check: El agente debe interceptar el mensaje [AUTORUN_STORYBOOK_MCP] y ejecutar:`
      );
      console.log(`   mcp_storybook_getComponentsProps(['${storybookId}'])`);

      // TODO: Implementar consulta real cuando las herramientas MCP estén disponibles en Node.js
      // Por ahora, el agente debe interceptar y ejecutar la consulta
      // Si el agente ejecuta la consulta, debería llamar a markStepCompleted manualmente

      return null;
    } catch (error) {
      console.warn(
        `⚠️ Pre-Implementation Check: Error consultando Storybook MCP:`,
        error
      );
      return null;
    }
  }

  /**
   * Carga documentación del componente automáticamente
   */
  async loadComponentDocumentation(componentName: string): Promise<any> {
    if (!this.active) {
      return null;
    }

    // Si ya está cargada, retornarla
    if (this.componentDocumentation.has(componentName)) {
      return this.componentDocumentation.get(componentName);
    }

    const docFileName = this.getDocFileName(componentName);
    const docPath = path.join(
      process.cwd(),
      'docs/referencia/componentes',
      docFileName
    );

    console.log(
      `📚 Pre-Implementation Check: Cargando documentación para '${componentName}' desde: ${docPath}`
    );

    try {
      const docContent = await fs.readFile(docPath, 'utf-8');

      // Parsear documentación básica (extraer props, ejemplos, etc.)
      const parsedDoc = this.parseDocumentation(docContent, componentName);

      this.componentDocumentation.set(componentName, parsedDoc);

      console.log(
        `✅ Pre-Implementation Check: Documentación cargada para '${componentName}'`
      );

      // Marcar como consultado
      await this.markStepCompleted(componentName, 'documentation');

      return parsedDoc;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.warn(
          `⚠️ Pre-Implementation Check: Documentación no encontrada para '${componentName}' en: ${docPath}`
        );
      } else {
        console.warn(
          `⚠️ Pre-Implementation Check: Error cargando documentación:`,
          error.message
        );
      }
      return null;
    }
  }

  /**
   * Parsea documentación markdown para extraer información útil
   */
  private parseDocumentation(docContent: string, componentName: string): any {
    const doc: any = {
      componentName,
      props: [],
      examples: [],
      tokens: [],
      notes: [],
    };

    // Extraer props (buscar secciones como "## Props" o "### Props")
    const propsMatch = docContent.match(
      /##\s+Props?\s*\n([\s\S]*?)(?=\n##|\n###|$)/i
    );
    if (propsMatch) {
      // Intentar extraer lista de props
      const propsSection = propsMatch[1];
      const propLines = propsSection
        .split('\n')
        .filter(
          (line) =>
            line.trim().startsWith('-') ||
            line.trim().startsWith('*') ||
            line.includes('|')
        );
      doc.props = propLines;
    }

    // Extraer ejemplos (buscar bloques de código)
    const codeBlockMatches = docContent.match(/```[\s\S]*?```/g);
    if (codeBlockMatches) {
      doc.examples = codeBlockMatches.map((block) =>
        block.replace(/```[\w]*\n?/g, '').trim()
      );
    }

    // Extraer tokens mencionados
    const tokenMatches = docContent.match(/--ubits-[\w-]+/g);
    if (tokenMatches) {
      doc.tokens = [...new Set(tokenMatches)];
    }

    // Extraer notas importantes
    const noteMatches = docContent.match(/⚠️|💡|📋|🚨/g);
    if (noteMatches) {
      doc.hasNotes = true;
    }

    return doc;
  }

  /**
   * Verifica automáticamente si se consultó Storybook MCP
   */
  async checkStorybookMCPUsage(componentName: string): Promise<boolean> {
    // Esta función se llamaría después de usar Storybook MCP
    // Por ahora, se marca manualmente
    return false;
  }

  /**
   * Detecta automáticamente intentos de implementación de componentes
   * Escucha eventos de fileChange y analiza el contenido para detectar patrones
   */
  async onFileChange(filePath: string, content?: string): Promise<void> {
    if (!this.active) {
      console.log(
        '⚠️ Pre-Implementation Check: Add-on no está activo, ignorando fileChange'
      );
      return;
    }

    console.log(
      `🔍 Pre-Implementation Check: onFileChange llamado para: ${filePath}`
    );

    // Solo analizar archivos HTML en prototypes/
    if (!filePath.includes('prototypes/') || !filePath.endsWith('.html')) {
      console.log(
        `🔍 Pre-Implementation Check: Archivo ignorado (no es HTML en prototypes/): ${filePath}`
      );
      return;
    }

    console.log(`✅ Pre-Implementation Check: Analizando archivo: ${filePath}`);

    // Leer contenido si no se proporcionó
    if (!content) {
      try {
        const fs = await import('fs/promises');
        content = await fs.readFile(filePath, 'utf-8');
      } catch (error) {
        // Ignorar errores de lectura
        return;
      }
    }

    // ⭐ NUEVO: Detectar archivos HTML de módulo "encuestas" sin interceptación de ContentManager
    const isEncuestasModule = /data-module\s*=\s*["']encuestas["']/i.test(
      content
    );

    if (isEncuestasModule) {
      // Verificar si tiene interceptación de ContentManager
      const hasInterception =
        /ContentManager\.updateContent.*_encuestasIntercepted/i.test(content) ||
        /interceptContentManagerImmediately/i.test(content);

      if (!hasInterception) {
        console.warn(
          `
🚨 PRE-IMPLEMENTATION CHECK: Archivo HTML de módulo "encuestas" detectado

Archivo: ${filePath}
Problema: Falta interceptación de ContentManager para eliminar HeaderSection

⚠️ ACCIÓN REQUERIDA:
1. Aplicar solución de headersection-solution-001
2. Ver guía: docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md
3. Agregar interceptación de ContentManager.updateContent
4. Agregar MutationObserver para limpieza agresiva

📚 Referencias:
- Problema: docs/problems-solutions/headersection/issue-001.md
- Solución: docs/problems-solutions/headersection/solution-001.md
- Guía: docs/guias/implementacion/GUIA-ELIMINAR-HEADERSECTION.md
- Detección automática: docs/guias/implementacion/GUIA-DETECCION-AUTOMATICA-HEADERSECTION.md
				`.trim()
        );

        // Registrar en Problem Tracker
        if (this.problemTrackerAddon) {
          try {
            await this.problemTrackerAddon.service?.detectProblem?.(
              `Archivo HTML de módulo "encuestas" sin interceptación de ContentManager`,
              {
                category: 'ContentManager',
                severity: 'high',
                archivo: filePath,
                suggestedSolution: 'headersection-solution-001',
              }
            );
          } catch (error) {
            // Ignorar errores de Problem Tracker
          }
        }
      } else {
        console.log(
          `✅ Pre-Implementation Check: Archivo de módulo "encuestas" tiene interceptación de ContentManager`
        );
      }
    }

    // Patrones que indican implementación de componentes
    // ⚠️ IMPORTANTE: Detectar tanto llamadas como asignaciones (window.createChip = createChip)
    const componentPatterns: Record<string, RegExp> = {
      Tabs: /window\.createTabs\s*\(|window\.createTabs\s*=/i,
      DataTable: /window\.createDataTable\s*\(|window\.createDataTable\s*=/i,
      Button:
        /window\.UBITS\.Button\.create\s*\(|window\.UBITS\.Button\.create\s*=/i,
      Modal:
        /window\.createModal\s*\(|window\.createModal\s*=|window\.UBITSModal\?\.createModal/i,
      Sidebar: /window\.createSidebar\s*\(|window\.createSidebar\s*=/i,
      SubNav: /window\.createSubNav\s*\(|window\.createSubNav\s*=/i,
      TabBar: /window\.createTabBar\s*\(|window\.createTabBar\s*=/i,
      Drawer:
        /window\.createDrawer\s*\(|window\.createDrawer\s*=|window\.UBITSDrawer\?\.createDrawer/i,
      Chip: /window\.createChip\s*\(|window\.createChip\s*=|window\.UBITSChip\?\.createChip|createChip\s*\(/i,
      Tooltip:
        /window\.createTooltip\s*\(|window\.createTooltip\s*=|window\.UBITSTooltip\?\.createTooltip|createTooltip\s*\(/i,
    };

    // Detectar componentes en el código
    for (const [componentName, pattern] of Object.entries(componentPatterns)) {
      if (pattern.test(content)) {
        console.log(
          `\n🔍 Pre-Implementation Check: Componente '${componentName}' detectado en el código`
        );

        // ⭐ NUEVO: Obtener automáticamente plan basado en historias de Storybook
        let storyBasedPlan = null;
        try {
          const {
            getStoryBasedImplementationPlan,
          } = require('@autorun/core/helpers/componentHelpers');
          console.log(
            `\n📚 Pre-Implementation Check: Obteniendo plan basado en historias para: ${componentName}`
          );

          const componentId = this.getStorybookId(componentName);
          const planResult = await getStoryBasedImplementationPlan(
            componentName,
            componentId
          );
          storyBasedPlan = planResult.plan;

          console.log(
            `\n✅ Pre-Implementation Check: Plan obtenido: ${storyBasedPlan.totalSteps} historias encontradas`
          );
          console.log(
            `\n📋 Pre-Implementation Check: Plan de implementación basado en historias:`
          );
          console.log(planResult.summary);
          console.log(
            `\n💡 Pre-Implementation Check: Instrucciones: ${planResult.instructions}`
          );
          console.log(
            `\n⚠️ Pre-Implementation Check: Implementar UNA historia a la vez, completando TODO el checklist antes de continuar.\n`
          );

          // Guardar plan para uso posterior
          this.storyBasedPlans.set(componentName, storyBasedPlan);
        } catch (error) {
          console.warn(
            `⚠️ Pre-Implementation Check: No se pudo obtener plan basado en historias:`,
            error
          );
          // Continuar con verificación normal si falla
        }

        // ⭐ NUEVO: Consultar Storybook MCP automáticamente
        console.log(
          `\n📡 Pre-Implementation Check: Consultando Storybook MCP automáticamente para '${componentName}'...`
        );
        const storybookData = await this.consultStorybookMCP(componentName);
        if (storybookData) {
          this.storybookData.set(componentName, storybookData);
          await this.markStepCompleted(componentName, 'storybookMCP');
          console.log(
            `✅ Pre-Implementation Check: Storybook MCP consultado automáticamente para '${componentName}'`
          );
        } else {
          console.log(
            `💡 Pre-Implementation Check: Para consultar Storybook MCP automáticamente, el agente debe usar:`
          );
          console.log(
            `   mcp_storybook_getComponentsProps(['${this.getStorybookId(componentName)}'])`
          );
          console.log(
            `   Esto se implementará cuando las herramientas MCP estén disponibles en Node.js`
          );
        }

        // ⭐ NUEVO: Cargar documentación automáticamente
        console.log(
          `\n📚 Pre-Implementation Check: Cargando documentación automáticamente para '${componentName}'...`
        );
        const documentation =
          await this.loadComponentDocumentation(componentName);
        if (documentation) {
          console.log(
            `✅ Pre-Implementation Check: Documentación cargada para '${componentName}'`
          );
          console.log(`   - Props encontradas: ${documentation.props.length}`);
          console.log(
            `   - Ejemplos encontrados: ${documentation.examples.length}`
          );
          console.log(
            `   - Tokens encontrados: ${documentation.tokens.length}`
          );

          // Marcar Storybook Vercel como consultado si tenemos documentación
          // (asumimos que la documentación viene de Storybook)
          await this.markStepCompleted(componentName, 'storybookVercel');
        } else {
          console.log(
            `⚠️ Pre-Implementation Check: No se pudo cargar documentación para '${componentName}'`
          );
          console.log(
            `   Verifica que existe: docs/referencia/componentes/${this.getDocFileName(componentName)}`
          );
        }

        // ⭐ NUEVO: Verificar implementación automáticamente
        if (documentation || storybookData) {
          await this.verifyImplementation(
            componentName,
            content,
            documentation,
            storybookData
          );
        }

        // Verificar si se puede implementar
        const checkResult = await this.canImplement(componentName);

        if (!checkResult.allowed) {
          // Bloquear implementación y mostrar advertencia
          console.warn(
            `\n🚨 PRE-IMPLEMENTATION CHECK: Intento de implementar ${componentName} sin completar checklist`
          );
          console.warn(
            `📋 Pasos faltantes: ${checkResult.missingSteps.join(', ')}`
          );

          if (storyBasedPlan) {
            console.warn(
              `\n📚 Plan basado en historias disponible: ${storyBasedPlan.totalSteps} historias`
            );
            console.warn(
              `   Implementar UNA historia a la vez siguiendo el plan.\n`
            );
          }

          console.warn(`💡 Completa el checklist antes de implementar:\n`);
          console.warn(
            `   1. Consultar Storybook en Vercel: https://ubits-storybook10.vercel.app/`
          );
          console.warn(
            `   2. Consultar Storybook MCP: mcp_storybook_getComponentsProps('${componentName}')`
          );
          console.warn(
            `   3. Consultar documentación: docs/referencia/componentes/`
          );
          console.warn(
            `\n⚠️  IMPLEMENTACIÓN BLOQUEADA hasta completar checklist\n`
          );

          // Para componentes complejos, sugerir implementación por pasos
          if (componentName === 'DataTable') {
            console.warn(
              `\n💡 RECOMENDACIÓN: DataTable es un componente complejo.`
            );
            console.warn(
              `   Considera usar implementación por pasos para asegurar calidad.\n`
            );
          }

          // Registrar en Problem Tracker si está disponible
          if (this.problemTrackerAddon) {
            try {
              await this.problemTrackerAddon.service?.detectProblem?.(
                `Intento de implementar ${componentName} sin completar checklist obligatorio`,
                {
                  category: 'implementacion',
                  severity: 'high',
                  missingSteps: checkResult.missingSteps,
                  checklist: checkResult.checklist,
                  filePath,
                }
              );
            } catch (error) {
              // Ignorar errores de Problem Tracker
            }
          }
        } else {
          // Checklist completo, pero verificar si es componente complejo
          if (componentName === 'DataTable') {
            console.log(
              `\n💡 PRE-IMPLEMENTATION CHECK: DataTable detectado con checklist completo.`
            );
            console.log(
              `   ⚠️ IMPORTANTE: DataTable es un componente complejo.`
            );
            console.log(
              `   📋 RECOMENDACIÓN: Usar implementación por pasos para asegurar calidad.`
            );
            console.log(
              `   📚 Ver guía: docs/guias/implementacion/GUIA-IMPLEMENTACION-POR-PASOS.md\n`
            );

            // Intentar obtener plan de implementación
            // Nota: El sistema de implementación por pasos se implementará en el futuro
            // Por ahora, solo sugerimos usar implementación por pasos
          }
        }
      }
    }
  }

  /**
   * Verifica la implementación comparando con Storybook y documentación
   */
  async verifyImplementation(
    componentName: string,
    code: string,
    documentation: any,
    storybookData: any
  ): Promise<void> {
    if (!this.active) {
      return;
    }

    console.log(
      `\n🔍 Pre-Implementation Check: Verificando implementación de '${componentName}'...`
    );

    const issues: string[] = [];
    const suggestions: string[] = [];

    // Verificar props requeridas si tenemos documentación de Storybook
    if (storybookData && storybookData.props) {
      const requiredProps = storybookData.props.filter((p: any) => p.required);
      for (const prop of requiredProps) {
        const propPattern = new RegExp(`${prop.name}\\s*:`, 'i');
        if (!propPattern.test(code)) {
          issues.push(`⚠️ Prop requerida faltante: '${prop.name}'`);
        }
      }
    }

    // Verificar tokens si tenemos documentación
    if (documentation && documentation.tokens) {
      const usedTokens = code.match(/--ubits-[\w-]+/g) || [];
      const validTokens = documentation.tokens;
      const invalidTokens = usedTokens.filter(
        (token) => !validTokens.includes(token)
      );
      if (invalidTokens.length > 0) {
        suggestions.push(
          `💡 Tokens no documentados encontrados: ${invalidTokens.join(', ')}`
        );
      }
    }

    // ⚠️ CRÍTICO: Verificar error común #55 - Agregar margin-top a tabs
    if (componentName === 'Tabs') {
      // Detectar margin-top inline en contenedor de tabs
      const marginTopInlinePattern =
        /(?:tabsContainer|container|tabs-container)[^}]*style[^}]*margin-top[^}]*16/i;
      // Detectar margin-top en CSS para contenedor de tabs
      const marginTopCSSPattern =
        /#[a-z-]*tabs-container[^}]*\{[^}]*margin-top[^}]*\}/i;
      // Detectar margin-top en style.cssText
      const marginTopStylePattern =
        /\.style\.cssText\s*=\s*['"][^'"]*margin-top[^'"]*16/i;

      if (
        marginTopInlinePattern.test(code) ||
        marginTopCSSPattern.test(code) ||
        marginTopStylePattern.test(code)
      ) {
        issues.push(
          `🚨 ERROR CRÍTICO #55: Se detectó margin-top en el contenedor de tabs`
        );
        issues.push(
          `   ❌ INCORRECTO: margin-top debe venir del gap del contenedor padre (.main-content)`
        );
        issues.push(
          `   ✅ CORRECTO: Ajustar gap del .main-content, NO agregar margin-top al contenedor de tabs`
        );
        issues.push(
          `   📚 Ver: docs/guias/referencia/GUIA-ERRORES-COMUNES-UBITS.md - Error #55`
        );
      }
    }

    // Mostrar resultados
    if (issues.length > 0) {
      console.warn(
        `\n⚠️ Pre-Implementation Check: Problemas encontrados en la implementación de '${componentName}':`
      );
      issues.forEach((issue) => console.warn(`   ${issue}`));
    }

    if (suggestions.length > 0) {
      console.log(
        `\n💡 Pre-Implementation Check: Sugerencias para '${componentName}':`
      );
      suggestions.forEach((suggestion) => console.log(`   ${suggestion}`));
    }

    if (issues.length === 0 && suggestions.length === 0) {
      console.log(
        `✅ Pre-Implementation Check: Implementación de '${componentName}' verificada correctamente`
      );
    }

    // Marcar comparación como completada
    await this.markStepCompleted(componentName, 'comparison');
  }

  /**
   * Verifica automáticamente si se consultó documentación
   */
  async checkDocumentationUsage(componentName: string): Promise<boolean> {
    try {
      const docPath = path.join(
        process.cwd(),
        'docs/referencia/componentes',
        `${this.mapComponentNameToDocFile(componentName)}.md`
      );

      // Verificar si el archivo existe y fue leído recientemente
      // Por ahora, solo verificamos que existe
      try {
        await fs.access(docPath);
        return true;
      } catch {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * Mapea nombre de componente a nombre de archivo de documentación
   */
  private mapComponentNameToDocFile(componentName: string): string {
    const mapping: Record<string, string> = {
      DataTable: 'data-data-table',
      Tabs: 'navegacin-tabs',
      Button: 'bsicos-button',
      Modal: 'feedback-modal',
      // Agregar más mapeos según sea necesario
    };

    return (
      mapping[componentName] || componentName.toLowerCase().replace(/\s+/g, '-')
    );
  }

  /**
   * Crea un checklist vacío
   */
  private createEmptyChecklist(componentName: string): ComponentChecklist {
    return {
      componentName,
      storybookVercel: false,
      storybookMCP: false,
      documentation: false,
      comparison: false,
      timestamp: Date.now(),
    };
  }

  /**
   * Obtiene el checklist de un componente
   */
  getChecklist(componentName: string): ComponentChecklist | null {
    return this.checklists.get(componentName) || null;
  }

  /**
   * Obtiene todos los intentos de implementación
   */
  getImplementationAttempts(): ImplementationAttempt[] {
    return [...this.implementationAttempts];
  }

  /**
   * ⭐ NUEVO: Obtiene el plan basado en historias de Storybook para un componente
   *
   * @param componentName Nombre del componente
   * @returns Plan basado en historias o null si no existe
   */
  getStoryBasedPlan(componentName: string): any | null {
    return this.storyBasedPlans.get(componentName) || null;
  }

  /**
   * ⭐ NUEVO: Obtiene o crea automáticamente el plan basado en historias
   *
   * @param componentName Nombre del componente
   * @param componentId ID del componente en Storybook (opcional)
   * @returns Plan basado en historias
   */
  async getOrCreateStoryBasedPlan(
    componentName: string,
    componentId?: string
  ): Promise<any> {
    // Verificar si ya existe
    const existingPlan = this.storyBasedPlans.get(componentName);
    if (existingPlan) {
      return existingPlan;
    }

    // Crear nuevo plan
    try {
      const {
        getStoryBasedImplementationPlan,
      } = require('@autorun/core/helpers/componentHelpers');
      const componentIdToUse =
        componentId || this.getStorybookId(componentName);
      const planResult = await getStoryBasedImplementationPlan(
        componentName,
        componentIdToUse
      );
      const plan = planResult.plan;

      // Guardar plan
      this.storyBasedPlans.set(componentName, plan);

      return plan;
    } catch (error) {
      console.error(
        `❌ Error obteniendo plan basado en historias para ${componentName}:`,
        error
      );
      return null;
    }
  }

  /**
   * Limpia el checklist de un componente
   */
  clearChecklist(componentName: string): void {
    this.checklists.delete(componentName);
  }

  /**
   * Limpia todos los checklists
   */
  clearAllChecklists(): void {
    this.checklists.clear();
  }

  async destroy(): Promise<void> {
    await this.deactivate();
  }

  /**
   * Obtiene servicios que este add-on proporciona
   */
  getServices(): Record<string, (...args: any[]) => any> {
    return {
      canImplement: async (
        componentName: string,
        options?: { skipCheck?: boolean }
      ) => {
        console.log(
          `   🔍 [getServices.canImplement] Llamando con: componentName=${componentName}, options=${JSON.stringify(options)}`
        );
        console.log(
          `   🔍 [getServices.canImplement] options?.skipCheck=${options?.skipCheck}`
        );
        const result = await this.canImplement(componentName, options);
        console.log(`   🔍 [getServices.canImplement] Resultado:`, {
          allowed: result.allowed,
          reason: result.reason,
        });
        return result;
      },
      markStepCompleted: (componentName: string, step: string) =>
        this.markStepCompleted(componentName, step as any),
      getChecklist: (componentName: string) => this.getChecklist(componentName),
      getImplementationAttempts: () => this.getImplementationAttempts(),
      clearChecklist: (componentName: string) =>
        this.clearChecklist(componentName),
      getStoryBasedPlan: (componentName: string) =>
        this.getStoryBasedPlan(componentName), // ⭐ NUEVO
      getOrCreateStoryBasedPlan: (
        componentName: string,
        componentId?: string
      ) => this.getOrCreateStoryBasedPlan(componentName, componentId), // ⭐ NUEVO
      verifyOnDetection: (
        componentName: string,
        options?: { skipCheck?: boolean }
      ) => this.verifyOnDetection(componentName, options), // ⭐ NUEVO
      getContextualChecklist: (componentName: string, context?: any) =>
        this.getContextualChecklist(componentName, context), // ⭐ NUEVO
      suggestNextStep: (
        componentName: string,
        completedSteps: string[],
        context?: any
      ) => this.suggestNextStep(componentName, completedSteps, context), // ⭐ NUEVO
    };
  }
}
