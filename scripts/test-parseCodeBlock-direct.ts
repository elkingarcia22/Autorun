/**
 * Script de prueba directo para verificar parseCodeBlock
 * Ejecuta directamente desde TypeScript sin necesidad de compilar
 */

import { parseCodeBlock } from '../packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.js';

// Código de ejemplo extraído de BarMetricCard.stories.ts
const mixedCode = `// 1. Importar funciones (si usas módulos)
// import { createBarMetricCard, renderBarMetricCard } from '@ubits/bar-metric-card';

// 2. Crear contenedor HTML
<div id="bar-metric-card-container"></div>

// 3. Crear BarMetricCard
const barMetricCardElement = createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Nombre de la pregunta',
  responseCount: 7,
  showResponseCount: true
});`;

console.log('=== PRUEBA DE parseCodeBlock ===\n');
console.log('Código de entrada:');
console.log(mixedCode);
console.log('\n--- Resultado ---\n');

const result = parseCodeBlock(mixedCode);

console.log('HTML extraído:');
console.log(result.html);
console.log('\nJavaScript extraído:');
console.log(result.js);

// Verificar que el JS se detectó correctamente
if (result.js && result.js.includes('createBarMetricCard')) {
    console.log('\n✅ JavaScript detectado correctamente');
} else {
    console.log('\n❌ ERROR: JavaScript NO detectado');
}

// Verificar que el HTML se detectó correctamente
if (result.html && result.html.includes('<div')) {
    console.log('✅ HTML detectado correctamente');
} else {
    console.log('❌ ERROR: HTML NO detectado');
}
