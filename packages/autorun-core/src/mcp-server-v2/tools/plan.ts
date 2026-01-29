/**
 * ✅ Tool: autorun.plan v2
 * 
 * Genera un plan de implementación sin ejecutar
 * Creado desde cero - bien estructurado con logs detallados
 * 
 * ⚠️ CRÍTICO: Integra con función existente pero mantiene estructura limpia
 */

import type { AutorunPlanInput, AutorunPlanOutput } from '../types.js';

/**
 * ✅ Genera plan de implementación
 */
export async function autorunPlan(
  input: AutorunPlanInput
): Promise<AutorunPlanOutput> {
  console.error('📋 [autorun.plan v2] ========================================');
  console.error('📋 [autorun.plan v2] Iniciando generación de plan...');
  console.error(`   ⏰ Timestamp: ${new Date().toISOString()}`);
  console.error(`   📝 Mensaje recibido: ${input.message.substring(0, 100)}${input.message.length > 100 ? '...' : ''}`);
  console.error(`   📏 Longitud del mensaje: ${input.message.length} caracteres`);

  try {
    console.error('   ✅ [PASO 1] Validando input...');
    if (!input.message || input.message.trim().length === 0) {
      console.error('   ❌ [PASO 1] Error: Mensaje vacío');
      return {
        plan: {
          components: [],
          steps: [],
          totalSteps: 0,
        },
        blocked: true,
        reason: 'El mensaje no puede estar vacío',
      };
    }
    console.error('   ✅ [PASO 1] Input válido');

    console.error('   ✅ [PASO 2] Importando función original de autorun.plan()...');
    const importStart = Date.now();
    const { autorunPlan: autorunPlanOriginal } = await import(
      '../../mcp-server/tools/autorunPlan.js'
    );
    const importTime = Date.now() - importStart;
    console.error(`   ✅ [PASO 2] Función importada en ${importTime}ms`);

    console.error('   ✅ [PASO 3] Llamando función original de autorun.plan()...');
    const callStart = Date.now();
    const result = await autorunPlanOriginal({ message: input.message });
    const callTime = Date.now() - callStart;
    console.error(`   ✅ [PASO 3] Función ejecutada en ${callTime}ms`);

    console.error('   ✅ [PASO 4] Procesando resultado...');
    const processedResult: AutorunPlanOutput = {
      plan: {
        components: result.plan?.components || [],
        steps: result.plan?.steps || [],
        totalSteps: result.plan?.totalSteps || 0,
      },
      blocked: result.blocked ?? false,
      reason: result.reason,
    };

    console.error('   ✅ [PASO 4] Resultado procesado:');
    console.error(`      - Componentes detectados: ${processedResult.plan.components.length}`);
    console.error(`      - Pasos del plan: ${processedResult.plan.totalSteps}`);
    console.error(`      - Bloqueado: ${processedResult.blocked}`);
    if (processedResult.blocked) {
      console.error(`      - Razón: ${processedResult.reason}`);
    }

    console.error('📋 [autorun.plan v2] ========================================');
    return processedResult;
  } catch (error: any) {
    console.error('❌ [autorun.plan v2] ERROR:', error);
    console.error(`   📋 Mensaje: ${error.message}`);
    console.error(`   📋 Stack: ${error.stack ? error.stack.substring(0, 500) : 'N/A'}`);
    console.error(`   ⏰ Timestamp del error: ${new Date().toISOString()}`);
    console.error('📋 [autorun.plan v2] ========================================');

    return {
      plan: {
        components: [],
        steps: [],
        totalSteps: 0,
      },
      blocked: true,
      reason: error.message || 'Error desconocido al generar el plan',
    };
  }
}

