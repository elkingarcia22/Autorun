
import { autorunApply } from '../packages/autorun-core/src/mcp-server-v2/tools/apply.js';

console.log('=== MANUAL AUTORUN IMPLEMENTATION: TABS ===\n');

async function runTest() {
    try {
        console.log('1. Iniciando autorunApply...');

        const input = {
            message: 'Implementar el componente de tabs debajo del subnav sin nada hardcoreado',
            options: {
                requireStorybookMcp: false, // Permitir fallback local si no hay servidor MCP corriendo
                skipVerification: false,
                mode: 'strict'
            },
            targetFiles: ['/Users/elkinmac/Desktop/Autorun/prototypes/canvas-administrador-encuestas-2026-01-13.html']
        };

        const result = await autorunApply(input);

        console.log('\n--- Resultado ---\n');
        console.log(JSON.stringify(result, null, 2));

        if (result.success) {
            console.log('✅ EXITO: Implementación completada');
        } else {
            console.log('❌ FALLO: Implementación fallida');
            if (result.errors) {
                console.error('Errors:', result.errors);
            }
        }

    } catch (e) {
        console.error('❌ EXCEPCION NO CONTROLADA:', e);
    }
}

runTest();
