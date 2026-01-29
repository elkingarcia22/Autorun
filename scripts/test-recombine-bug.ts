
import { parseCodeBlock } from '../packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.js';

console.log('=== PRUEBA DE REGRESION: Re-combining Bug ===\n');

// Simular salida limpia del MCP
const mcpOutput = {
    html: '<div id="test"></div>',
    js: 'createTest({ id: "test" });'
};

// Simular el comportamiento actual de storybookExactCodeExtractorWithBrowser
// parsed.js ? `${parsed.html}\n${parsed.js}` : parsed.html
const combined = `${mcpOutput.html}\n${mcpOutput.js}`;

console.log('Combined Input:', combined);

const result = parseCodeBlock(combined);

console.log('\n--- Resultado ---\n');
console.log('HTML Original:', mcpOutput.html);
console.log('HTML Resultante:', result.html);
console.log('JS Original:', mcpOutput.js);
console.log('JS Resultante:', result.js);

if (result.html.trim() !== mcpOutput.html.trim()) {
    console.log('\n❌ ERROR: El HTML fue modificado durante el proceso de re-parseo.');
} else {
    console.log('\n✅ El HTML se mantuvo intacto.');
}

if (result.js !== undefined && result.js.trim() !== mcpOutput.js.trim()) {
    console.log('\n❌ ERROR: El JS fue modificado durante el proceso de re-parseo.');
} else {
    console.log('\n✅ El JS se mantuvo intacto.');
}
