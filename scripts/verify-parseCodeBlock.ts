import { parseCodeBlock } from '../packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.js';

const snippet = `// 1. Importar funciones (si usas módulos)
// import { createBarMetricCard, renderBarMetricCard } from '@ubits/bar-metric-card';

// 2. Crear contenedor HTML
<div id="bar-metric-card-container"></div>

// 3. Crear BarMetricCard
const barMetricCardElement = createBarMetricCard({
  containerId: 'bar-metric-card-container',
  title: 'Nombre',
  value: 10
});`;

console.log('--- TEST: parseCodeBlock ---');
const result = parseCodeBlock(snippet);
console.log('RESULTADO:', JSON.stringify(result, null, 2));

if (result.js && result.js.includes('createBarMetricCard')) {
    console.log('✅ JS detectado correctamente');
} else {
    console.log('❌ Error: JS NO detectado o mal separado');
}

if (result.html && result.html.includes('<div')) {
    console.log('✅ HTML detectado correctamente');
} else {
    console.log('❌ Error: HTML NO detectado');
}
