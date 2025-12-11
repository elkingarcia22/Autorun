/**
 * Script de prueba para ejecutar PreWriteValidator y ver los logs
 * 
 * Este script simula lo que debería pasar cuando se intenta escribir código
 */

import { PreWriteValidator } from '@autorun/core';
import * as path from 'path';
import * as fs from 'fs/promises';

const PROJECT_ROOT = process.cwd();

async function testPreWriteValidator() {
  console.log('🧪 [TEST] Iniciando prueba de PreWriteValidator...\n');
  console.log('='.repeat(60));

  // Inicializar AutorunHub primero
  console.log('🔧 [TEST] Inicializando AutorunHub...\n');
  try {
    const { ensureAutorunHubInitialized } = await import('@autorun/core');
    await ensureAutorunHubInitialized();
    console.log('✅ [TEST] AutorunHub inicializado\n');
  } catch (error) {
    console.error('❌ [TEST] Error inicializando AutorunHub:', error);
    return;
  }

  // Simular contenido con componente Tabs
  const testFilePath = path.join(PROJECT_ROOT, 'prototypes', 'canvas-administrador-encuestas-2025-12-10.html');
  
  // Leer el archivo actual para obtener contenido real
  let testContent = '';
  try {
    testContent = await fs.readFile(testFilePath, 'utf-8');
    console.log(`✅ [TEST] Archivo leído: ${testFilePath}`);
    console.log(`📊 [TEST] Tamaño del archivo: ${testContent.length} caracteres\n`);
  } catch (error) {
    console.error(`❌ [TEST] Error leyendo archivo:`, error);
    // Usar contenido de prueba
    testContent = '<ubits-tabs><ubits-tab-list><ubits-tab>Test</ubits-tab></ubits-tab-list></ubits-tabs>';
  }

  // Extraer una porción del contenido que contiene componentes
  const contentSnippet = testContent.substring(
    testContent.indexOf('<!-- 🧪 COMPONENTE DE PRUEBA'),
    testContent.indexOf('</ubits-tabs>') + 12
  ) || testContent.substring(0, 500);

  console.log('🔍 [TEST] Contenido a validar (primeros 500 chars):');
  console.log(contentSnippet.substring(0, 500));
  console.log('\n' + '='.repeat(60) + '\n');

  // Probar validación con componente Tabs
  console.log('📋 [TEST] Probando validación con componente Tabs...\n');
  const result1 = await PreWriteValidator.validateBeforeWrite(
    testFilePath,
    contentSnippet,
    {
      componentName: 'Tabs',
      userMessage: 'Implementar componente Tabs en el template',
    }
  );

  console.log('\n' + '='.repeat(60));
  console.log('📊 [TEST] Resultado de la validación:');
  console.log(`   - Válido: ${result1.valid}`);
  console.log(`   - Componente: ${result1.componentName || 'NINGUNO'}`);
  console.log(`   - Errores: ${result1.errors.length}`);
  console.log(`   - Warnings: ${result1.warnings.length}`);
  
  if (result1.errors.length > 0) {
    console.log('\n❌ [TEST] Errores encontrados:');
    result1.errors.forEach((error, i) => {
      console.log(`   ${i + 1}. ${error}`);
    });
  }

  if (result1.warnings.length > 0) {
    console.log('\n⚠️  [TEST] Warnings encontrados:');
    result1.warnings.forEach((warning, i) => {
      console.log(`   ${i + 1}. ${warning}`);
    });
  }

  if (result1.missingSteps && result1.missingSteps.length > 0) {
    console.log('\n📋 [TEST] Pasos faltantes:');
    result1.missingSteps.forEach((step, i) => {
      console.log(`   ${i + 1}. ${step}`);
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ [TEST] Prueba completada\n');
}

// Ejecutar prueba
testPreWriteValidator().catch((error) => {
  console.error('❌ [TEST] Error en la prueba:', error);
  process.exit(1);
});

