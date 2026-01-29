/**
 * Script de prueba para extraer código desde Docs
 */

import { extractExactCodeFromStorybookWithBrowser } from '../packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser';

async function testExtractFromDocs() {
  try {
    console.log('🔍 Probando extracción desde Docs...');
    console.log('📋 Componente: básicos-button');
    console.log('📋 Historia: implementation');
    console.log('');

    const result = await extractExactCodeFromStorybookWithBrowser(
      'básicos-button',
      'implementation'
    );

    console.log('✅ Éxito!');
    console.log('');
    console.log('📋 Código HTML:');
    console.log(result.html.substring(0, 500) + (result.html.length > 500 ? '...' : ''));
    console.log('');
    console.log('📋 Código JS:');
    console.log(result.js ? result.js.substring(0, 500) + (result.js.length > 500 ? '...' : '') : 'N/A');
    console.log('');
    console.log('📋 Estructura:');
    console.log(JSON.stringify(result.structure, null, 2));
    console.log('');
    console.log('📋 CSS URLs:');
    console.log(result.cssUrls || []);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testExtractFromDocs();

