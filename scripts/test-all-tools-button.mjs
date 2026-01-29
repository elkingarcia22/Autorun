#!/usr/bin/env node

/**
 * 🧪 Script de Prueba: Todas las Herramientas MCP con Button
 * 
 * Prueba las 3 herramientas disponibles:
 * 1. autorun.test
 * 2. autorun.plan (con mensaje "implementar un button")
 * 3. autorun.checklist (con componentName "Button")
 */

import { autorunTest } from '../packages/autorun-core/src/mcp-server-v2/tools/test.js';
import { autorunPlan } from '../packages/autorun-core/src/mcp-server-v2/tools/plan.js';
import { autorunChecklist } from '../packages/autorun-core/src/mcp-server-v2/tools/checklist.js';

console.log('🧪 ========================================');
console.log('🧪 PRUEBA DE TODAS LAS HERRAMIENTAS MCP');
console.log('🧪 Componente: Button');
console.log('🧪 ========================================\n');

async function testAllTools() {
  try {
    // ========================================
    // PRUEBA 1: autorun.test
    // ========================================
    console.log('\n📋 [PRUEBA 1/3] autorun.test');
    console.log('────────────────────────────────────────');
    try {
      const testResult = await autorunTest({ message: 'Prueba de Button' });
      console.log('✅ autorun.test EXITOSO:');
      console.log(JSON.stringify(testResult, null, 2));
    } catch (error) {
      console.error('❌ autorun.test FALLÓ:');
      console.error(error.message);
      console.error(error.stack);
    }

    // ========================================
    // PRUEBA 2: autorun.plan
    // ========================================
    console.log('\n📋 [PRUEBA 2/3] autorun.plan');
    console.log('────────────────────────────────────────');
    console.log('📝 Mensaje: "implementar un button"');
    try {
      const planResult = await autorunPlan({ 
        message: 'implementar un button' 
      });
      console.log('✅ autorun.plan EXITOSO:');
      console.log(JSON.stringify(planResult, null, 2));
    } catch (error) {
      console.error('❌ autorun.plan FALLÓ:');
      console.error(error.message);
      console.error(error.stack);
    }

    // ========================================
    // PRUEBA 3: autorun.checklist
    // ========================================
    console.log('\n📋 [PRUEBA 3/3] autorun.checklist');
    console.log('────────────────────────────────────────');
    console.log('📦 Componente: Button');
    try {
      const checklistResult = await autorunChecklist({ 
        componentName: 'Button' 
      });
      console.log('✅ autorun.checklist EXITOSO:');
      console.log(JSON.stringify(checklistResult, null, 2));
    } catch (error) {
      console.error('❌ autorun.checklist FALLÓ:');
      console.error(error.message);
      console.error(error.stack);
    }

    // ========================================
    // RESUMEN
    // ========================================
    console.log('\n✅ ========================================');
    console.log('✅ PRUEBAS COMPLETADAS');
    console.log('✅ ========================================\n');
  } catch (error) {
    console.error('\n❌ ========================================');
    console.error('❌ ERROR GENERAL EN LAS PRUEBAS');
    console.error('❌ ========================================');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testAllTools();

