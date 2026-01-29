/**
 * Script de prueba para verificar skipCheck en autorun.apply()
 */

import { autorunApply } from '../packages/autorun-core/src/mcp-server/tools/autorunApply.js';
import * as fs from 'fs/promises';
import * as path from 'path';

async function testSkipCheck() {
  console.log('🧪 Test: autorun.apply() con skipCheck\n');
  console.log('═'.repeat(60));

  const testFile = path.join(process.cwd(), 'prototypes', 'canvas-administrador-encuestas-2025-12-23.html');

  console.log(`📁 Archivo de prueba: ${testFile}\n`);

  try {
    console.log('📦 Probando autorun.apply() con Radio Button...\n');
    console.log('🔍 Capturando logs detallados...\n');

    const result = await autorunApply({
      message: 'implementar radio button debajo del header section con opciones para tipo de encuesta: satisfacción, feedback y evaluación',
      targetFiles: [testFile],
    });

    console.log('\n📊 Resultado de autorun.apply():');
    console.log('═'.repeat(60));
    console.log(`✅ Éxito: ${result.success}`);
    console.log(`📁 Archivos escritos: ${result.filesWritten.length}`);

    if (result.verification) {
      console.log(`\n✅ Verificación pre-implementación: ${result.verification.preImplementation ? '✅' : '❌'}`);
      console.log(`✅ Verificación post-implementación: ${result.verification.postImplementation ? '✅' : '❌'}`);
      
      if (result.verification.errors && result.verification.errors.length > 0) {
        console.log(`\n❌ Errores:`);
        result.verification.errors.forEach(err => {
          console.log(`   - ${err}`);
        });
      }
    }

    if (result.errors && result.errors.length > 0) {
      console.log(`\n❌ Errores generales:`);
      result.errors.forEach(err => {
        console.log(`   - ${err}`);
      });
    }

  } catch (error: any) {
    console.error('\n❌ Error en la prueba:');
    console.error(error.message);
    console.error(error.stack);
  }
}

testSkipCheck().catch(console.error);

