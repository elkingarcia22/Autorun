import { autorunApply } from './packages/autorun-core/src/mcp-server-v2/tools/apply.ts';

const message = `Implementa el componente Navegación/Tabs. 
Configuración:
- 3 tabs: General, Configuración, Resultados.
- Iconos: far fa-list, far fa-cog, far fa-chart-bar.
- activeTabId: general.
- Contenedor: <div id="tabs-container"></div>
- Asegura que el código JavaScript esté dentro de una etiqueta <script>.
- Ubicación: Justo debajo de #top-nav-container.`;

async function run() {
  console.log('🚀 Iniciando implementación optimizada v2...');
  try {
    const result = await autorunApply({
      message,
      targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-31.html'],
      options: {
        skipFormatting: false,
        skipLinting: true,
        skipAutoReload: false,
        skipAutoCommit: true,
        requireStorybookMcp: true,
        // Forzar ubicación después del SubNav
        anchors: {
          content: '<div id="top-nav-container"></div>'
        }
      } as any
    });
    console.log('\n--- RESULTADO ---');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error fatal:', error);
    process.exit(1);
  }
}

run();
