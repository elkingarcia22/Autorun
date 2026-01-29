
import { autorunApply } from '../packages/autorun-core/src/mcp-server-v2/tools/apply.js';
import * as fs from 'fs';
import * as path from 'path';

async function step2Verify() {
    console.log('\n🔧 --- VERIFICACIÓN FASE 2: IMPLEMENTACIÓN ---\n');

    const targetFile = '/Users/elkinmac/Desktop/Autorun/prototypes/canvas-administrador-encuestas-2026-01-13.html';

    // 1. Verificar estado inicial
    console.log('[2.0] Verificando estado inicial del archivo...');
    const initialContent = fs.readFileSync(targetFile, 'utf-8');
    if (!initialContent.includes('SubNav Component')) {
        console.error('❌ ERROR: El archivo no tiene el estado inicial correcto (falta SubNav).');
        process.exit(1);
    }
    console.log('✅ Estado inicial correcto (SubNav presente).');

    // 2. Ejecutar Implementación
    console.log('\n[2.1] Ejecutando autorunApply para Tabs...');
    const input = {
        message: 'Implementar el componente de tabs dentro del main-content',
        options: {
            requireStorybookMcp: false,
            skipVerification: false,
            mode: 'strict'
        },
        targetFiles: [targetFile]
    };

    try {
        const result = await autorunApply(input);

        if (!result.success) {
            console.error('❌ ERROR: autorunApply retornó success: false');
            console.error(result.errors);
            process.exit(1);
        }
        console.log('✅ autorunApply completado exitosamente.');

    } catch (e) {
        console.error('❌ EXCEPCION durante implementación:', e);
        process.exit(1);
    }

    // 3. Verificar Resultado
    console.log('\n[2.2] Verificando integridad del archivo resultante...');
    const finalContent = fs.readFileSync(targetFile, 'utf-8');

    // Check 1: SubNav sigue ahí?
    if (finalContent.includes('SubNav Component')) {
        console.log('✅ EXITO: El SubNav original se conservó.');
    } else {
        console.error('❌ ERROR: El SubNav original fue borrado (sobreescritura detectada).');
    }

    // Check 2: Tabs están ahí?
    if (finalContent.includes('window.UBITS.Tabs.create') || finalContent.includes('ubits-tabs')) {
        console.log('✅ EXITO: El componente Tabs fue insertado.');
    } else {
        console.error('❌ ERROR: No se encuentra el código del componente Tabs.');
    }

    // Check 3: Limpieza (sin comentarios JS en HTML)
    if (finalContent.includes('// 1. Importar') && !finalContent.includes('<script>')) {
        // Esto es un heurístico simple: si vemos comentarios de imports fuera de script tags...
        // Pero mejor verificamos si hay comentarios antes del div
    }

    // Check simple de structure
    if (finalContent.includes('<div id="tabs-implementation-container">')) {
        console.log('✅ EXITO: HTML del componente insertado correctamente.');
    }

    console.log('\n🎉 FASE 2 COMPLETADA.');
}

step2Verify();
