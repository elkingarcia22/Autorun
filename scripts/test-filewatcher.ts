#!/usr/bin/env tsx
/**
 * Script de Prueba: FileWatcher
 * 
 * Prueba que el FileWatcher detecta cambios en archivos
 */

import { getAutorunHub } from '../packages/autorun-core/src/AutorunAgent.js';
import * as fs from 'fs';
import * as path from 'path';

async function testFileWatcher() {
  console.log('\n🧪 [Test FileWatcher] ========================================');
  console.log('🧪 [Test FileWatcher] Iniciando prueba de FileWatcher...\n');

  try {
    const hub = await getAutorunHub();

    if (!hub) {
      console.error('❌ [Test FileWatcher] AutorunHub no está inicializado');
      process.exit(1);
    }

    // Verificar estado
    const status = hub.getFileWatchingStatus();
    console.log('📊 [Test FileWatcher] Estado del FileWatcher:');
    console.log(`   - Activo: ${status.active}`);
    console.log(`   - Rutas observadas: ${status.watchedPaths?.join(', ') || 'N/A'}\n`);

    if (!status.active) {
      console.error('❌ [Test FileWatcher] FileWatcher NO está activo');
      process.exit(1);
    }

    // Crear archivo de prueba
    const testFilePath = path.join(process.cwd(), 'prototypes', 'test-filewatcher.txt');
    const testContent = `Test FileWatcher - ${new Date().toISOString()}\n`;

    console.log('📝 [Test FileWatcher] Creando archivo de prueba...');
    console.log(`   Ruta: ${testFilePath}`);

    // Escribir archivo
    fs.writeFileSync(testFilePath, testContent, 'utf-8');
    console.log('✅ [Test FileWatcher] Archivo creado\n');

    // Esperar 1 segundo para que FileWatcher detecte el cambio
    console.log('⏳ [Test FileWatcher] Esperando 1 segundo para que FileWatcher detecte el cambio...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verificar que el archivo existe
    if (fs.existsSync(testFilePath)) {
      console.log('✅ [Test FileWatcher] Archivo existe');
    } else {
      console.error('❌ [Test FileWatcher] Archivo no existe');
    }

    // Limpiar archivo de prueba
    console.log('\n🧹 [Test FileWatcher] Limpiando archivo de prueba...');
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
      console.log('✅ [Test FileWatcher] Archivo eliminado');
    }

    console.log('\n📋 [Test FileWatcher] ========================================');
    console.log('📋 [Test FileWatcher] INSTRUCCIONES:');
    console.log('   1. Revisa los logs anteriores para ver si FileWatcher detectó el cambio');
    console.log('   2. Deberías ver mensajes como:');
    console.log('      - "📥 [AutorunHub] FileWatcher callback recibido para: ..."');
    console.log('      - "🔄 [AutoReload Add-on] onFileChange llamado para: ..."');
    console.log('      - "[AUTORUN_AUTO_RELOAD]..."');
    console.log('   3. Si NO ves estos mensajes, el FileWatcher no está detectando cambios');
    console.log('📋 [Test FileWatcher] ========================================\n');

    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ [Test FileWatcher] ========================================');
    console.error('❌ [Test FileWatcher] Error en la prueba:', error.message);
    console.error('❌ [Test FileWatcher] ========================================\n');
    process.exit(1);
  }
}

testFileWatcher();

