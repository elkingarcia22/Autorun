/**
 * ✅ Tool: autorun.checklist v2
 * 
 * Obtiene checklist de implementación para un componente específico
 * Creado desde cero - bien estructurado con logs detallados
 * 
 * ⚠️ CRÍTICO: Integra con función existente pero mantiene estructura limpia
 */

import type { AutorunChecklistInput, AutorunChecklistOutput } from '../types.js';

/**
 * ✅ Obtiene checklist de implementación
 * 
 * Esta herramienta verifica qué pasos del checklist de implementación
 * se han completado para un componente específico.
 * 
 * El checklist incluye 4 pasos obligatorios:
 * 1. Consultar Storybook en Vercel (versión más reciente)
 * 2. Consultar Storybook MCP (props exactas)
 * 3. Consultar documentación del componente
 * 4. Comparar versiones (local vs Storybook)
 */
export async function autorunChecklist(
  input: AutorunChecklistInput
): Promise<AutorunChecklistOutput> {
  console.error('✅ [autorun.checklist v2] ========================================');
  console.error('✅ [autorun.checklist v2] Iniciando obtención de checklist...');
  console.error(`   ⏰ Timestamp: ${new Date().toISOString()}`);
  console.error(`   📦 Componente: ${input.componentName}`);

  try {
    console.error('   ✅ [PASO 1] Validando input...');
    if (!input.componentName || input.componentName.trim().length === 0) {
      console.error('   ❌ [PASO 1] Error: Nombre de componente vacío');
      return {
        componentName: input.componentName || 'Unknown',
        checklist: {
          storybookVercel: false,
          storybookMCP: false,
          documentation: false,
          comparison: false,
        },
        missingSteps: ['El nombre del componente no puede estar vacío'],
        completedSteps: [],
        canImplement: false,
        reason: 'El nombre del componente no puede estar vacío',
      };
    }
    console.error('   ✅ [PASO 1] Input válido');

    console.error('   ✅ [PASO 2] Importando función original de autorun.checklist()...');
    const importStart = Date.now();
    const { autorunChecklist: autorunChecklistOriginal } = await import(
      '../../mcp-server/tools/autorunChecklist.js'
    );
    const importTime = Date.now() - importStart;
    console.error(`   ✅ [PASO 2] Función importada en ${importTime}ms`);

    console.error('   ✅ [PASO 3] Llamando función original de autorun.checklist()...');
    const callStart = Date.now();
    const result = await autorunChecklistOriginal(input);
    const callTime = Date.now() - callStart;
    console.error(`   ✅ [PASO 3] Función ejecutada en ${callTime}ms`);

    console.error('   ✅ [PASO 4] Procesando resultado...');
    console.error('   ✅ [PASO 4] Resultado procesado:');
    console.error(`      - Componente: ${result.componentName}`);
    console.error(`      - Checklist:`);
    console.error(`        • Storybook Vercel: ${result.checklist.storybookVercel ? '✅' : '❌'}`);
    console.error(`        • Storybook MCP: ${result.checklist.storybookMCP ? '✅' : '❌'}`);
    console.error(`        • Documentación: ${result.checklist.documentation ? '✅' : '❌'}`);
    console.error(`        • Comparación: ${result.checklist.comparison ? '✅' : '❌'}`);
    console.error(`      - Pasos completados: ${result.completedSteps.length}`);
    console.error(`      - Pasos faltantes: ${result.missingSteps.length}`);
    console.error(`      - Puede implementar: ${result.canImplement ? '✅ SÍ' : '❌ NO'}`);
    if (result.reason) {
      console.error(`      - Razón: ${result.reason}`);
    }
    if (result.plan) {
      console.error(`      - Plan disponible: ✅ (${result.plan.totalSteps || 0} historias)`);
    }

    console.error('✅ [autorun.checklist v2] ========================================');
    return result;
  } catch (error: any) {
    console.error('❌ [autorun.checklist v2] ERROR:', error);
    console.error(`   📋 Mensaje: ${error.message}`);
    console.error(`   📋 Stack: ${error.stack ? error.stack.substring(0, 500) : 'N/A'}`);
    console.error(`   ⏰ Timestamp del error: ${new Date().toISOString()}`);
    console.error('✅ [autorun.checklist v2] ========================================');

    return {
      componentName: input.componentName,
      checklist: {
        storybookVercel: false,
        storybookMCP: false,
        documentation: false,
        comparison: false,
      },
      missingSteps: ['Error obteniendo checklist'],
      completedSteps: [],
      canImplement: false,
      reason: error.message || 'Error desconocido al obtener el checklist',
    };
  }
}

