#!/usr/bin/env tsx
/**
 * Script de prueba para executeOnMessageStart
 * Verifica que funciona correctamente con el Storybook activo
 */

import { executeOnMessageStart } from '../packages/autorun-core/src/helpers/executeOnMessageStart';
import { StorybookManager } from '../packages/autorun-core/src/helpers/storybookManager';

async function test() {
  console.log('🧪 Probando executeOnMessageStart con Storybook activo...\n');

  // 1. Verificar Storybook activo
  const manager = StorybookManager.getInstance();
  const active = await manager.getActiveStorybook();
  const activeConfig = await manager.getActiveConfig();

  if (active) {
    console.log(`✅ Storybook activo: ${active.config.name}`);
    console.log(`   URL: ${active.config.url}`);
    console.log(`   Componentes mapeados: ${Object.keys(active.config.componentMapping || {}).length}\n`);
  } else {
    console.log('⚠️ No hay Storybook activo\n');
  }

  // 2. Probar detección de componente
  const testMessages = [
    'implementa un modal',
    'crea un botón',
    'agrega una tabla',
  ];

  for (const message of testMessages) {
    console.log(`\n📝 Mensaje: "${message}"`);
    console.log('─'.repeat(50));
    
    try {
      const result = await executeOnMessageStart(message);
      
      console.log(`✅ Detección: ${result.detected ? 'SÍ' : 'NO'}`);
      if (result.detected) {
        console.log(`   Componente: ${result.componentName}`);
        if (activeConfig) {
          const mappedId = await manager.mapComponentToStorybookId(result.componentName || '');
          console.log(`   ID Storybook: ${mappedId || 'No mapeado'}`);
        }
      }
      console.log(`   Bloqueado: ${result.blocked ? 'SÍ' : 'NO'}`);
      if (result.blocked) {
        console.log(`   Razón: ${result.reason}`);
      }
    } catch (error: any) {
      console.error(`❌ Error:`, error.message);
    }
  }

  console.log('\n✅ Prueba completada');
}

test().catch(console.error);
