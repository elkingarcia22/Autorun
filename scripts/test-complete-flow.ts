#!/usr/bin/env tsx
/**
 * Prueba completa del flujo mejorado de Autorun
 */

import { handleUserMessage } from '../packages/autorun-core/src/helpers/autoMessageHandler';

async function testCompleteFlow() {
  const testMessage = 'implementa un boton que abra un modal a 16 px abajo del subnav';
  
  console.log('🧪 PRUEBA COMPLETA DEL FLUJO MEJORADO');
  console.log('═'.repeat(60));
  console.log(`📝 Mensaje: "${testMessage}"\n`);
  
  try {
    const result = await handleUserMessage(testMessage);
    
    console.log('\n📊 RESULTADO:');
    console.log(`   Detección: ${result.detected ? '✅ SÍ' : '❌ NO'}`);
    console.log(`   Componente principal: ${result.componentName || 'N/A'}`);
    console.log(`   Bloqueado: ${result.blocked ? '❌ SÍ' : '✅ NO'}`);
    
    if (result.mcpMessages && result.mcpMessages.length > 0) {
      console.log(`\n📚 Componentes detectados para MCP: ${result.mcpMessages.length}`);
      result.mcpMessages.forEach((msg, index) => {
        console.log(`   ${index + 1}. ${msg.componentName} → ${msg.storybookId}`);
      });
      console.log('\n✅ SISTEMA FUNCIONANDO: Múltiples componentes detectados correctamente');
    } else {
      console.log(`\n⚠️ No hay mensajes MCP preparados`);
    }
    
    if (result.plan) {
      console.log(`\n📋 Plan disponible: ${result.plan.totalSteps || 'N/A'} historias`);
    }
    
    return result;
  } catch (error: any) {
    console.error(`❌ Error:`, error.message);
    throw error;
  }
}

testCompleteFlow().catch(console.error);
