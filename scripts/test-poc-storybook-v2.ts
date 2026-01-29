/**
 * Script de Prueba - POC Storybook V2
 *
 * Prueba el nuevo sistema de extracción de componentes
 */

import { implementComponentSimple, generateComponentHTML } from '../packages/autorun-core/src/poc/storybook-v2/simpleImplementation.js';
import { findComponentFiles } from '../packages/autorun-core/src/poc/storybook-v2/fileExtractor.js';

async function testPOC() {
  console.log('🧪 Probando POC Storybook V2...\n');

  const components = [
    { id: 'button', name: 'Button' },
    { id: 'data-table', name: 'DataTable' },
    { id: 'modal', name: 'Modal' },
  ];

  for (const component of components) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Test: ${component.name} (${component.id})`);
    console.log('='.repeat(60));

    try {
      // Test 1: Buscar archivos
      console.log('\n[1] Buscando archivos del componente...');
      const files = await findComponentFiles(component.id);
      
      if (files.provider) {
        console.log(`   ✅ Provider encontrado: ${files.provider.filePath}`);
      } else {
        console.log(`   ⚠️ Provider no encontrado`);
      }
      
      if (files.readme) {
        console.log(`   ✅ README encontrado: ${files.readme.filePath}`);
      } else {
        console.log(`   ⚠️ README no encontrado`);
      }

      // Test 2: Generar HTML
      console.log('\n[2] Generando HTML...');
      const htmlResult = await generateComponentHTML(component.id, {
        variant: 'primary',
        size: 'md',
        text: 'Test Button',
      });

      if (htmlResult.success) {
        console.log(`   ✅ HTML generado: ${htmlResult.html?.length || 0} caracteres`);
        console.log(`   📄 Preview (primeros 200 caracteres):`);
        console.log(`   ${htmlResult.html?.substring(0, 200)}...`);
      } else {
        console.log(`   ❌ Error: ${htmlResult.error}`);
      }

      // Test 3: Implementar en archivo
      console.log('\n[3] Implementando en archivo...');
      const targetFile = `test-output/${component.id}-test.html`;
      const result = await implementComponentSimple(
        component.id,
        {
          variant: 'primary',
          size: 'md',
          text: 'Test Button',
        },
        targetFile
      );

      if (result.success) {
        console.log(`   ✅ Archivo creado: ${targetFile}`);
        if (result.warnings && result.warnings.length > 0) {
          console.log(`   ⚠️ Advertencias:`);
          result.warnings.forEach((w) => console.log(`      - ${w}`));
        }
      } else {
        console.log(`   ❌ Error: ${result.error}`);
      }
    } catch (error: any) {
      console.error(`   ❌ Error inesperado: ${error.message}`);
      console.error(error.stack);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('✅ Pruebas completadas');
  console.log('='.repeat(60));
}

// Ejecutar pruebas
testPOC().catch((error) => {
  console.error('❌ Error ejecutando pruebas:', error);
  process.exit(1);
});

