/**
 * Script de Prueba - POC Storybook V2 - RadioButton
 *
 * Prueba el nuevo sistema de extracción de componentes con RadioButton
 */

import { parseStorybookFile } from '../packages/autorun-core/src/poc/storybook-v2/storybookParser.js';
import { findComponentFiles } from '../packages/autorun-core/src/poc/storybook-v2/fileExtractor.js';

async function testRadioButton() {
  console.log('🧪 Probando POC Storybook V2 con RadioButton...\n');

  const componentId = 'radio-button';

  try {
    // Test 1: Buscar archivos
    console.log(`\n${'='.repeat(60)}`);
    console.log(`[1] Buscando archivos del componente: ${componentId}`);
    console.log('='.repeat(60));
    
    const files = await findComponentFiles(componentId);
    
    if (files.stories) {
      console.log(`   ✅ .stories.ts encontrado: ${files.stories.filePath}`);
    } else {
      console.log(`   ⚠️ .stories.ts no encontrado`);
    }
    
    if (files.provider) {
      console.log(`   ✅ Provider encontrado: ${files.provider.filePath}`);
    }
    
    if (files.options) {
      console.log(`   ✅ Options encontrado: ${files.options.filePath}`);
    }
    
    if (files.readme) {
      console.log(`   ✅ README encontrado: ${files.readme.filePath}`);
    }

    // Test 2: Parsear archivo .stories.ts
    console.log(`\n${'='.repeat(60)}`);
    console.log(`[2] Parseando archivo .stories.ts`);
    console.log('='.repeat(60));
    
    const parsed = await parseStorybookFile(componentId);
    
    if (parsed) {
      console.log(`   ✅ Componente parseado: ${parsed.componentId}`);
      console.log(`   ✅ Título: ${parsed.title}`);
      console.log(`   ✅ Descripción: ${parsed.description?.substring(0, 80)}...`);
      
      console.log(`\n   📋 Contrato UBITS:`);
      console.log(`      - ComponentId: ${parsed.contract.componentId}`);
      console.log(`      - API Create: ${parsed.contract.api?.create}`);
      console.log(`      - API Tag: ${parsed.contract.api?.tag}`);
      console.log(`      - Props Requeridas: ${parsed.contract.rules?.requiredProps?.join(', ')}`);
      console.log(`      - Tokens Usados: ${parsed.contract.tokensUsed?.length || 0} tokens`);
      
      console.log(`\n   📋 Props (${parsed.props.length}):`);
      parsed.props.forEach((prop) => {
        console.log(`      - ${prop.name}: ${prop.type}${prop.required ? ' (requerido)' : ''}`);
        if (prop.options) {
          console.log(`        Opciones: ${prop.options.join(', ')}`);
        }
        if (prop.defaultValue) {
          console.log(`        Default: ${prop.defaultValue}`);
        }
      });
      
      console.log(`\n   📋 Defaults:`);
      Object.entries(parsed.defaults).forEach(([key, value]) => {
        console.log(`      - ${key}: ${value}`);
      });
      
      console.log(`\n   📋 Historias (${parsed.stories.length}):`);
      parsed.stories.forEach((story) => {
        console.log(`      - ${story.name}`);
      });
      
      if (parsed.implementationCode) {
        console.log(`\n   ✅ Código de Implementation:`);
        console.log(`   ${'─'.repeat(60)}`);
        console.log(parsed.implementationCode);
        console.log(`   ${'─'.repeat(60)}`);
      } else {
        console.log(`\n   ⚠️ Código de Implementation no encontrado`);
      }
    } else {
      console.log(`   ❌ No se pudo parsear el componente`);
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log('✅ Pruebas completadas');
    console.log('='.repeat(60));
  } catch (error: any) {
    console.error(`\n❌ Error ejecutando pruebas:`, error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Ejecutar pruebas
testRadioButton().catch((error) => {
  console.error('❌ Error ejecutando pruebas:', error);
  process.exit(1);
});

