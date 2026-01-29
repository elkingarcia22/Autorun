
import { autorunStorybookExtract } from '../packages/autorun-core/src/mcp-server/tools/autorunStorybookExtract.js';

console.log('=== PRUEBA DE INTEGRACION MCP ===\n');

async function runTest() {
    try {
        console.log('1. Probando extracción de BarMetricCard...');
        // Simulamos un input válido
        const input = {
            componentName: 'BarMetricCard',
            // O podemos usar componentId: 'charts-bar-metric-card'
            storyName: 'default' // El sistema debería encontrar 'code' automágicamente
        };

        const result = await autorunStorybookExtract(input);

        console.log('\n--- Resultado ---\n');
        if (result.success) {
            console.log('✅ EXITO: MCP retornó success=true');
            if (result.code) {
                console.log(`TYPE HTML: ${typeof result.code.html}`);
                console.log(`HTML Length: ${result.code.html?.length}`);
                console.log(`JS Length: ${result.code.js?.length}`);

                // Verificación simple de contenido
                if (result.code.html.includes('<div') && !result.code.html.includes('import {')) {
                    console.log('✅ HTML parece limpio (contiene div, no contiene imports)');
                } else {
                    console.log('⚠️ ADVERTENCIA: El HTML podría estar sucio o vacío');
                    console.log('Preview HTML:', result.code.html.substring(0, 100));
                }
            }
        } else {
            console.log('❌ FALLO: MCP retornó success=false');
            console.log('Error:', result.error);
            if (result.requiresBrowserMCP) {
                console.log('⚠️ Requiere Browser MCP fallback (esto es esperado si no hay entorno local corriendo)');
            }
        }

    } catch (e) {
        console.error('❌ EXCEPCION NO CONTROLADA:', e);
    }
}

runTest();
