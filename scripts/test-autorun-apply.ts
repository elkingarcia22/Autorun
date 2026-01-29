/**
 * Script de prueba para autorun.apply()
 * 
 * Este script prueba si autorun.apply() funciona correctamente
 * sin ser bloqueado por el Pre-Implementation Check
 */

import { autorunApply } from '../packages/autorun-core/src/mcp-server/tools/autorunApply.js';
import { AutorunApplyInput } from '../packages/autorun-core/src/mcp-server/types.js';

async function testAutorunApply() {
  console.log('🧪 [Test] Iniciando prueba de autorun.apply()...\n');

  const input: AutorunApplyInput = {
    message: 'implementar un botón',
    targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-23.html'],
    options: {
      skipVerification: false,
    },
  };

  try {
    console.log('📝 [Test] Mensaje:', input.message);
    console.log('📁 [Test] Archivo objetivo:', input.targetFiles?.[0]);
    console.log('⚙️ [Test] Opciones:', JSON.stringify(input.options, null, 2));
    console.log('\n🚀 [Test] Ejecutando autorun.apply()...\n');

    const result = await autorunApply(input);

    console.log('\n✅ [Test] Resultado de autorun.apply():');
    console.log('   - success:', result.success);
    console.log('   - filesWritten:', result.filesWritten?.length || 0);
    console.log('   - components:', result.components?.length || 0);
    
    if (result.verification) {
      console.log('   - verification.preImplementation:', result.verification.preImplementation);
      console.log('   - verification.errors:', result.verification.errors?.length || 0);
      if (result.verification.errors && result.verification.errors.length > 0) {
        console.log('   - verification.errors:', result.verification.errors);
      }
      console.log('   - verification.warnings:', result.verification.warnings?.length || 0);
      if (result.verification.warnings && result.verification.warnings.length > 0) {
        console.log('   - verification.warnings:', result.verification.warnings.slice(0, 3));
      }
    }

    if (result.errors && result.errors.length > 0) {
      console.log('\n❌ [Test] Errores encontrados:');
      result.errors.forEach((err, i) => {
        console.log(`   ${i + 1}. ${err}`);
      });
    }

    if (result.warnings && result.warnings.length > 0) {
      console.log('\n⚠️ [Test] Advertencias:');
      result.warnings.slice(0, 5).forEach((warn, i) => {
        console.log(`   ${i + 1}. ${warn}`);
      });
    }

    if (result.success) {
      console.log('\n✅ [Test] ¡ÉXITO! autorun.apply() completó sin errores bloqueantes.');
    } else {
      console.log('\n❌ [Test] FALLO: autorun.apply() retornó success=false');
      
      // Verificar si el error es de checklist
      const hasChecklistError = 
        (result.verification?.errors?.some(err => err.includes('Faltan pasos obligatorios')) ||
         result.errors?.some(err => err.includes('Faltan pasos obligatorios')));
      
      if (hasChecklistError) {
        console.log('\n⚠️ [Test] ERROR DE CHECKLIST DETECTADO:');
        console.log('   Esto NO debería pasar porque autorun.apply() debe consultar Storybook automáticamente.');
        console.log('   Revisar logs anteriores para identificar dónde se generó el error.');
      }
    }

    process.exit(result.success ? 0 : 1);
  } catch (error: any) {
    console.error('\n❌ [Test] EXCEPCIÓN capturada:');
    console.error('   - Mensaje:', error.message);
    console.error('   - Stack:', error.stack?.split('\n').slice(0, 5).join('\n'));
    
    // Verificar si el error es de checklist
    const hasChecklistError = 
      error.message?.includes('Faltan pasos obligatorios') ||
      error.message?.includes('Checklist incompleto');
    
    if (hasChecklistError) {
      console.error('\n⚠️ [Test] ERROR DE CHECKLIST EN EXCEPCIÓN:');
      console.error('   Esto NO debería pasar porque autorun.apply() debe consultar Storybook automáticamente.');
      console.error('   Revisar logs anteriores para identificar dónde se lanzó la excepción.');
    }
    
    process.exit(1);
  }
}

testAutorunApply();


