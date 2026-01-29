
import { parseCodeBlock } from '../packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.js';

const code = `// 1. Importar funciones (si usas módulos)
// import { createBarMetricCard, renderBarMetricCard } from '@ubits/bar-metric-card';

// 2. Crear contenedor HTML
<div id="bar-metric-card-container"></div>

// 3. Crear BarMetricCard
const barMetricCardElement = createBarMetricCard({
  containerId: 'bar-metric-card-container', // ⚠️ REQUERIDO para createBarMetricCard
  title: 'Nombre de la pregunta',
  responseCount: 7,
  showResponseCount: true,
  barData: [-25, -15, 15, 25, 35, 45, 55, 5, 25, -15, -30, -50], // Array de valores (pueden ser positivos o negativos)
  barLabels: ['Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago', 'Ago'], // Opcional
  maxValue: 60, // Opcional, se calcula automáticamente si no se proporciona
  minValue: -60, // Opcional, se calcula automáticamente si no se proporciona
  categories: [
    {
      label: 'Área',
      current: 3,
      total: 20
    }
  ]
});`;

console.log('Code length:', code.length);

console.log('\n--- TESTING REGEX ---');
const regex = /(?:^|[\r\n])\s*((?:\/\/[^\n]*\n\s*)*)(?:window\.UBITS|UBITS|window\.create|create\w+|const\s+\w+\s*=\s*create\w+)/;
const match = code.match(regex);

if (match) {
    console.log('✅ MATCH FOUND!');
    console.log('Index:', match.index);
    console.log('Captured group 1 (comments):', JSON.stringify(match[1]));
    console.log('Full match:', JSON.stringify(match[0]));
} else {
    console.log('❌ NO MATCH!');
}

console.log('\n--- TESTING PARSECODEBLOCK ---');
const result = parseCodeBlock(code);
console.log('HTML length:', result.html.length);
console.log('JS length:', result.js?.length);
console.log('Preview HTML:', result.html.substring(0, 100));
console.log('Preview JS:', result.js?.substring(0, 100));
