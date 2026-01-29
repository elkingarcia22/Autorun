#!/usr/bin/env tsx
/**
 * Script de Verificación del Estado de Autorun
 * 
 * Verifica que todos los sistemas de Autorun estén funcionando correctamente:
 * - FileWatcher está activo
 * - AutoReloadAddon está activo
 * - AutorunHub está inicializado
 */

import { getAutorunHub } from '../packages/autorun-core/src/AutorunAgent.js';

async function verifyAutorunStatus() {
  console.log('\n🔍 [Verificación Autorun] ========================================');
  console.log('🔍 [Verificación Autorun] Verificando estado de Autorun...\n');

  try {
    const hub = await getAutorunHub();

    if (!hub) {
      console.error('❌ [Verificación Autorun] AutorunHub no está inicializado');
      console.log('💡 Ejecutar: npm run autorun:init-hub');
      process.exit(1);
    }

    console.log('✅ [Verificación Autorun] AutorunHub está inicializado\n');

    // Verificar FileWatcher
    console.log('🔍 [Verificación Autorun] Verificando FileWatcher...');
    const fileWatchingStatus = hub.getFileWatchingStatus();
    if (fileWatchingStatus.active) {
      console.log('✅ [Verificación Autorun] FileWatcher está activo');
      console.log(`   Rutas observadas: ${fileWatchingStatus.watchedPaths?.join(', ') || 'N/A'}`);
    } else {
      console.error('❌ [Verificación Autorun] FileWatcher NO está activo');
      console.log('💡 El file watching debe iniciarse automáticamente al inicializar AutorunHub');
    }
    console.log('');

    // Verificar AutoReloadAddon
    console.log('🔍 [Verificación Autorun] Verificando AutoReloadAddon...');
    const autoReloadAddon = hub.getAddon('auto-reload');
    if (autoReloadAddon) {
      const isActive = autoReloadAddon.isActive();
      if (isActive) {
        console.log('✅ [Verificación Autorun] AutoReloadAddon está activo');
      } else {
        console.error('❌ [Verificación Autorun] AutoReloadAddon NO está activo');
        console.log('💡 Intentar activar: await hub.activateAddon("auto-reload")');
      }
    } else {
      console.error('❌ [Verificación Autorun] AutoReloadAddon NO está registrado');
      console.log('💡 Verificar que el add-on esté instalado correctamente');
    }
    console.log('');

    // Verificar add-ons activos
    console.log('🔍 [Verificación Autorun] Add-ons activos:');
    const activeAddons = hub.getActiveAddons();
    if (activeAddons.length > 0) {
      activeAddons.forEach((addon) => {
        console.log(`   ✅ ${addon.id} (${addon.name}) - ${addon.getStatus()}`);
      });
    } else {
      console.warn('⚠️ [Verificación Autorun] No hay add-ons activos');
    }
    console.log('');

    // Resumen
    console.log('📊 [Verificación Autorun] ========================================');
    console.log('📊 [Verificación Autorun] RESUMEN:');
    console.log(`   - AutorunHub: ✅ Inicializado`);
    console.log(`   - FileWatcher: ${fileWatchingStatus.active ? '✅' : '❌'} ${fileWatchingStatus.active ? 'Activo' : 'Inactivo'}`);
    console.log(`   - AutoReloadAddon: ${autoReloadAddon?.isActive() ? '✅' : '❌'} ${autoReloadAddon?.isActive() ? 'Activo' : 'Inactivo'}`);
    console.log(`   - Add-ons activos: ${activeAddons.length}`);
    console.log('📊 [Verificación Autorun] ========================================\n');

    if (!fileWatchingStatus.active || !autoReloadAddon?.isActive()) {
      console.error('❌ [Verificación Autorun] Hay problemas que deben resolverse');
      process.exit(1);
    } else {
      console.log('✅ [Verificación Autorun] Todo está funcionando correctamente');
      process.exit(0);
    }
  } catch (error: any) {
    console.error('\n❌ [Verificación Autorun] ========================================');
    console.error('❌ [Verificación Autorun] Error verificando estado:', error.message);
    console.error('❌ [Verificación Autorun] ========================================\n');
    process.exit(1);
  }
}

verifyAutorunStatus();

