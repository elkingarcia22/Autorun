import { executeCompleteImplementationFlow } from '../packages/autorun-core/src/helpers/callAutorunMCPTool.js';

async function implementMetrics() {
    console.log('🚀 [Automated Implementation] Re-intentando implementación de Metric Cards...');

    // Usando IDs exactos de Storybook para evitar ambigüedades
    const message = 'Implementar un grid con exactamente 3 componentes de tipo "charts-text-metric-card". Es CRÍTICO que el código de inicialización de JavaScript esté envuelto en tags <script> o se coloque en el ancla de scripts. \n\n' +
        'Datos:\n' +
        '1. Metric Card: title "Total Encuestas", value "2.543", label "Registradas", titleIcon "clipboard-list-check".\n' +
        '2. Metric Card: title "Tasa de Respuesta", value "85%", label "+5% este mes", titleIcon "chart-line-up".\n' +
        '3. Metric Card: title "Satisfacción", value "4.8/5", label "Promedio CSAT", titleIcon "star".';

    const targetFiles = [
        '/Users/elkinmac/Desktop/Autorun/prototypes/canvas-administrador-encuestas-2025-12-30.html'
    ];

    const options = {
        mode: 'prototypeTokens' as const,
        requireStorybookMcp: true,
        allowPrototypeTokens: true
    };

    try {
        const result = await executeCompleteImplementationFlow(message, targetFiles, options);

        if (result.success) {
            console.log('✅ Implementación completada con éxito.');
            console.log('Resultado:', JSON.stringify(result.applyResult, null, 2));
        } else {
            console.error('❌ Error en la implementación:', result.errors.join(', '));
            process.exit(1);
        }
    } catch (error: any) {
        console.error('❌ Error fatal:', error.message);
        process.exit(1);
    }
}

implementMetrics();
