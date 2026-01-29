#!/usr/bin/env tsx
/**
 * Script de Monitoreo y Pruebas del MCP Server de Autorun
 * 
 * Este script prueba todas las funciones del MCP Server para verificar
 * que funcionan correctamente y no causan errores.
 * 
 * Uso:
 *   tsx scripts/test-mcp-monitoring.ts
 */

import { autorunVerify } from '../packages/autorun-core/src/mcp-server/tools/autorunVerify.js';
import { autorunPlan } from '../packages/autorun-core/src/mcp-server/tools/autorunPlan.js';
import { autorunChecklist } from '../packages/autorun-core/src/mcp-server/tools/autorunChecklist.js';
import type { AutorunVerifyInput } from '../packages/autorun-core/src/mcp-server/types.js';

interface TestResult {
  name: string;
  success: boolean;
  error?: string;
  duration: number;
}

const results: TestResult[] = [];

async function runTest(name: string, testFn: () => Promise<any>): Promise<void> {
  const startTime = Date.now();
  console.log(`\n🧪 [Test] Ejecutando: ${name}...`);
  
  try {
    await testFn();
    const duration = Date.now() - startTime;
    results.push({ name, success: true, duration });
    console.log(`   ✅ [Test] ${name} completado exitosamente (${duration}ms)`);
  } catch (error: any) {
    const duration = Date.now() - startTime;
    results.push({ name, success: false, error: error.message, duration });
    console.error(`   ❌ [Test] ${name} falló: ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
  }
}

async function testAutorunVerify() {
  console.log('\n📋 [Test Suite] Probando autorun.verify()...');
  
  // Test 1: targetFiles como string 'diff'
  await runTest('autorun.verify con targetFiles="diff"', async () => {
    const result = await autorunVerify({
      targetFiles: 'diff',
      options: {
        strict: false,
        checkAutorunMarks: true,
        autoRevert: false
      }
    });
    if (!result.valid && result.errors.length > 0) {
      // Permitir errores si no hay archivos para verificar
      if (!result.errors.some(e => e.includes('No hay archivos'))) {
        throw new Error(`Verificación falló: ${result.errors.join(', ')}`);
      }
    }
  });
  
  // Test 2: targetFiles como array ['diff']
  await runTest('autorun.verify con targetFiles=["diff"]', async () => {
    const result = await autorunVerify({
      targetFiles: ['diff'] as any,
      options: {
        strict: false,
        checkAutorunMarks: true,
        autoRevert: false
      }
    });
    if (!result.valid && result.errors.length > 0) {
      if (!result.errors.some(e => e.includes('No hay archivos'))) {
        throw new Error(`Verificación falló: ${result.errors.join(', ')}`);
      }
    }
  });
  
  // Test 3: targetFiles como array de archivos
  await runTest('autorun.verify con targetFiles=["archivo.html"]', async () => {
    const result = await autorunVerify({
      targetFiles: ['prototypes/test.html'],
      options: {
        strict: false,
        checkAutorunMarks: false
      }
    });
    // Permitir que falle si el archivo no existe
  });
  
  // Test 4: targetFiles undefined
  await runTest('autorun.verify con targetFiles undefined', async () => {
    const result = await autorunVerify({
      targetFiles: undefined as any,
      options: {}
    });
    // Debe manejar gracefully
  });
  
  // Test 5: targetFiles tipo inesperado
  await runTest('autorun.verify con targetFiles tipo inesperado', async () => {
    const result = await autorunVerify({
      targetFiles: 123 as any,
      options: {}
    });
    // Debe manejar gracefully
  });
}

async function testAutorunPlan() {
  console.log('\n📋 [Test Suite] Probando autorun.plan()...');
  
  await runTest('autorun.plan con mensaje simple', async () => {
    const result = await autorunPlan({
      message: 'crear un botón'
    });
    if (!result.success && result.errors && result.errors.length > 0) {
      // Permitir errores si no hay componente detectado
      if (!result.errors.some(e => e.includes('No se detectó componente'))) {
        throw new Error(`Plan falló: ${result.errors.join(', ')}`);
      }
    }
  });
}

async function testAutorunChecklist() {
  console.log('\n📋 [Test Suite] Probando autorun.checklist()...');
  
  await runTest('autorun.checklist con componente Button', async () => {
    const result = await autorunChecklist({
      componentName: 'Button'
    });
    if (!result.success && result.errors && result.errors.length > 0) {
      // Permitir errores si el componente no existe
      if (!result.errors.some(e => e.includes('no encontrado'))) {
        throw new Error(`Checklist falló: ${result.errors.join(', ')}`);
      }
    }
  });
}

async function main() {
  console.log('🚀 [MCP Monitoring] Iniciando pruebas del MCP Server...\n');
  console.log('=' .repeat(60));
  
  try {
    await testAutorunVerify();
    await testAutorunPlan();
    await testAutorunChecklist();
  } catch (error: any) {
    console.error(`\n❌ [MCP Monitoring] Error en suite de pruebas: ${error.message}`);
    console.error(error.stack);
  }
  
  // Resumen
  console.log('\n' + '='.repeat(60));
  console.log('📊 [MCP Monitoring] Resumen de Pruebas:\n');
  
  const total = results.length;
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / total;
  
  console.log(`   Total de pruebas: ${total}`);
  console.log(`   ✅ Exitosas: ${passed}`);
  console.log(`   ❌ Fallidas: ${failed}`);
  console.log(`   ⏱️  Duración promedio: ${avgDuration.toFixed(2)}ms`);
  
  if (failed > 0) {
    console.log('\n❌ [MCP Monitoring] Pruebas fallidas:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.name}: ${r.error}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  
  if (failed === 0) {
    console.log('✅ [MCP Monitoring] ¡Todas las pruebas pasaron!');
    process.exit(0);
  } else {
    console.log('⚠️ [MCP Monitoring] Algunas pruebas fallaron');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ [MCP Monitoring] Error fatal:', error);
  process.exit(1);
});

