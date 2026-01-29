#!/usr/bin/env tsx

/**
 * Script de prueba detallado del flujo completo de Autorun
 * 
 * Ejecuta cada paso del flujo de implementación con logs detallados
 * para identificar dónde falla o funciona correctamente.
 */

import { autorunApply } from '../packages/autorun-core/src/mcp-server/tools/autorunApply.js';
import { handleUserMessage } from '../packages/autorun-core/src/helpers/autoMessageHandler.js';
import { getAutorunHub } from '../packages/autorun-core/src/AutorunAgent.js';
import * as path from 'path';
import * as fs from 'fs/promises';

// Colores para logs
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function logStep(step: number, name: string, details?: string) {
  console.log(`\n${colors.cyan}${'='.repeat(80)}${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}[PASO ${step}] ${name}${colors.reset}`);
  if (details) {
    console.log(`${colors.yellow}   ${details}${colors.reset}`);
  }
  console.log(`${colors.cyan}${'='.repeat(80)}${colors.reset}\n`);
}

function logSuccess(message: string) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logError(message: string, error?: any) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
  if (error) {
    console.log(`${colors.red}   Error: ${error.message || error}${colors.reset}`);
    if (error.stack) {
      console.log(`${colors.red}   Stack: ${error.stack}${colors.reset}`);
    }
  }
}

function logWarning(message: string) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function logInfo(message: string) {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

async function testAutorunFlow() {
  console.log(`\n${colors.bright}${colors.magenta}${'='.repeat(80)}${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}🚀 PRUEBA DETALLADA DEL FLUJO DE AUTORUN${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}${'='.repeat(80)}${colors.reset}\n`);

  const testMessage = 'implementar un carousel debajo de la selection card';
  const testFile = 'prototypes/canvas-administrador-encuestas-2025-12-24.html';

  logInfo(`Mensaje de prueba: "${testMessage}"`);
  logInfo(`Archivo objetivo: "${testFile}"`);

  try {
    // ========================================
    // PASO 0: Verificar inicialización de AutorunHub
    // ========================================
    logStep(0, 'Verificación de AutorunHub', 'Verificando que AutorunHub esté inicializado');

    try {
      const hub = await getAutorunHub();
      logSuccess('AutorunHub obtenido correctamente');
      logInfo(`   - Inicializado: ${hub.isInitialized() ? '✅' : '❌'}`);
      logInfo(`   - File Watching: ${hub.isFileWatchingActive() ? '✅ activo' : '❌ inactivo'}`);
      
      const addons = hub.getAvailableAddons();
      logInfo(`   - Add-ons registrados: ${addons.length}`);
      addons.forEach((addon: any) => {
        const addonName = addon.getName ? addon.getName() : addon.name || 'Unknown';
        const isActive = addon.isActive ? addon.isActive() : false;
        logInfo(`      • ${addonName}: ${isActive ? '✅ activo' : '❌ inactivo'}`);
      });
    } catch (error: any) {
      logError('Error obteniendo AutorunHub', error);
      logWarning('Intentando continuar de todas formas...');
    }

    // ========================================
    // PASO 1: handleUserMessage() - Detección
    // ========================================
    logStep(1, 'handleUserMessage() - Detección de Componente', 'Ejecutando detección automática');

    let detectionResult;
    try {
      logInfo('Ejecutando handleUserMessage()...');
      detectionResult = await handleUserMessage(testMessage);
      
      logSuccess('handleUserMessage() completado');
      logInfo(`   - Detectado: ${detectionResult.detected ? '✅' : '❌'}`);
      if (detectionResult.componentName) {
        logInfo(`   - Componente: ${detectionResult.componentName}`);
      }
      if (detectionResult.currentPhase) {
        logInfo(`   - Fase actual: ${detectionResult.currentPhase}`);
      }
      if (detectionResult.nextPhase) {
        logInfo(`   - Siguiente fase: ${detectionResult.nextPhase}`);
      }
      if (detectionResult.blocked) {
        logError(`   - BLOQUEADO: ${detectionResult.reason}`);
        logWarning('El flujo está bloqueado, pero continuaremos para ver qué pasa...');
      }
      if (detectionResult.mcpMessages && detectionResult.mcpMessages.length > 0) {
        logInfo(`   - Mensajes MCP preparados: ${detectionResult.mcpMessages.length}`);
        detectionResult.mcpMessages.forEach((msg: any) => {
          logInfo(`      • ${msg.componentName} → ${msg.storybookId}`);
        });
      }
    } catch (error: any) {
      logError('Error en handleUserMessage()', error);
      throw error;
    }

    // ========================================
    // PASO 2: Verificar archivo objetivo
    // ========================================
    logStep(2, 'Verificación de Archivo Objetivo', 'Verificando que el archivo objetivo existe');

    try {
      const filePath = path.join(process.cwd(), testFile);
      const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
      
      if (fileExists) {
        logSuccess(`Archivo encontrado: ${testFile}`);
        const stats = await fs.stat(filePath);
        logInfo(`   - Tamaño: ${stats.size} bytes`);
        logInfo(`   - Modificado: ${stats.mtime.toISOString()}`);
      } else {
        logError(`Archivo no encontrado: ${testFile}`);
        logWarning('Intentando continuar de todas formas...');
      }
    } catch (error: any) {
      logError('Error verificando archivo', error);
    }

    // ========================================
    // PASO 3: autorun.apply() - Flujo Completo
    // ========================================
    logStep(3, 'autorun.apply() - Flujo Completo', 'Ejecutando el flujo completo de implementación');

    let applyResult;
    try {
      logInfo('Ejecutando autorun.apply()...');
      logInfo('   Esto ejecutará:');
      logInfo('   1. handleUserMessage() → Detección');
      logInfo('   2. Storybook MCP → Props exactas');
      logInfo('   3. Extracción código exacto');
      logInfo('   4. Validación pre-implementación');
      logInfo('   5. Análisis componentes internos');
      logInfo('   6. Escritura con marcas Autorun');
      logInfo('   7. Post-implementación (Prettier, ESLint, Auto-Reload, GitHub)');

      const startTime = Date.now();
      applyResult = await autorunApply({
        message: testMessage,
        targetFiles: [testFile],
        options: {
          skipVerification: false,
          skipFormatting: false,
          skipLinting: false,
          skipAutoReload: true, // Desactivar auto-reload para la prueba
          skipAutoCommit: true, // Desactivar auto-commit para la prueba
        },
      });
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      logSuccess(`autorun.apply() completado en ${duration}s`);
      logInfo(`   - Éxito: ${applyResult.success ? '✅' : '❌'}`);
      if (applyResult.message) {
        logInfo(`   - Mensaje: ${applyResult.message}`);
      }
      if (applyResult.filesWritten && applyResult.filesWritten.length > 0) {
        logSuccess(`   - Archivos escritos: ${applyResult.filesWritten.length}`);
        applyResult.filesWritten.forEach((file: string) => {
          logInfo(`      • ${file}`);
        });
      }
      if (applyResult.errors && applyResult.errors.length > 0) {
        logError(`   - Errores: ${applyResult.errors.length}`);
        applyResult.errors.forEach((error: string) => {
          logError(`      • ${error}`);
        });
      }
      if (applyResult.warnings && applyResult.warnings.length > 0) {
        logWarning(`   - Advertencias: ${applyResult.warnings.length}`);
        applyResult.warnings.forEach((warning: string) => {
          logWarning(`      • ${warning}`);
        });
      }
    } catch (error: any) {
      logError('Error en autorun.apply()', error);
      throw error;
    }

    // ========================================
    // PASO 4: Verificación de Resultados
    // ========================================
    logStep(4, 'Verificación de Resultados', 'Verificando que los cambios se aplicaron correctamente');

    try {
      const filePath = path.join(process.cwd(), testFile);
      const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
      
      if (fileExists) {
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Verificar marcas Autorun
        const hasAutorunMark = content.includes('GENERADO POR AUTORUN') || content.includes('Autorun Component');
        if (hasAutorunMark) {
          logSuccess('Marcas Autorun encontradas en el archivo');
        } else {
          logWarning('No se encontraron marcas Autorun en el archivo');
        }

        // Verificar que el componente esté presente
        const hasSelectionCard = content.includes('selection-card') || content.includes('SelectionCard');
        if (hasSelectionCard) {
          logSuccess('Referencias a SelectionCard encontradas en el archivo');
        } else {
          logWarning('No se encontraron referencias a SelectionCard en el archivo');
        }

        // Contar líneas
        const lines = content.split('\n').length;
        logInfo(`   - Total de líneas: ${lines}`);
      } else {
        logError('Archivo no encontrado después de la implementación');
      }
    } catch (error: any) {
      logError('Error verificando resultados', error);
    }

    // ========================================
    // RESUMEN FINAL
    // ========================================
    console.log(`\n${colors.bright}${colors.magenta}${'='.repeat(80)}${colors.reset}`);
    console.log(`${colors.bright}${colors.magenta}📊 RESUMEN FINAL${colors.reset}`);
    console.log(`${colors.bright}${colors.magenta}${'='.repeat(80)}${colors.reset}\n`);

    if (applyResult && applyResult.success) {
      logSuccess('✅ Flujo completado exitosamente');
    } else {
      logError('❌ Flujo completado con errores');
    }

    if (detectionResult) {
      logInfo(`Detección: ${detectionResult.detected ? '✅' : '❌'}`);
      if (detectionResult.componentName) {
        logInfo(`Componente detectado: ${detectionResult.componentName}`);
      }
    }

    if (applyResult) {
      logInfo(`Implementación: ${applyResult.success ? '✅' : '❌'}`);
      if (applyResult.filesWritten) {
        logInfo(`Archivos escritos: ${applyResult.filesWritten.length}`);
      }
      if (applyResult.errors) {
        logInfo(`Errores: ${applyResult.errors.length}`);
      }
    }

  } catch (error: any) {
    logError('Error fatal en el flujo de prueba', error);
    process.exit(1);
  }
}

// Ejecutar prueba
testAutorunFlow()
  .then(() => {
    console.log(`\n${colors.green}✅ Prueba completada${colors.reset}\n`);
    process.exit(0);
  })
  .catch((error) => {
    console.log(`\n${colors.red}❌ Prueba falló${colors.reset}\n`);
    console.error(error);
    process.exit(1);
  });

