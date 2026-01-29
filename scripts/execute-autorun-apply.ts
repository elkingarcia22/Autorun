import { autorunApply } from '../packages/autorun-core/src/mcp-server/tools/autorunApply.js';

async function main() {
  const message = 'implementa unos tabs debajo del submenu con 3 pestañas: General, Preguntas, Resultados. Usa el componente Navegación/Tabs de UBITS.';
  const targetFile = 'prototypes/canvas-administrador-encuestas-2026-01-02.html';
  
  console.log('🚀 [Test Puente] Iniciando implementación de Tabs...');
  console.log(`📝 Mensaje: ${message}`);
  console.log(`📁 Archivo: ${targetFile}`);

  // Habilitar logs globales para ver el puente
  process.env.DEBUG = 'autorun:*'; 

  try {
    const result = await autorunApply({
      message,
      targetFiles: [targetFile],
      options: {
        requireStorybookMcp: true,
        skipVerification: false
      }
    });

    console.log('---RESULT_START---');
    console.log(JSON.stringify(result, null, 2));
    console.log('---RESULT_END---');
    
    if (!result.success) {
      console.error('❌ La implementación falló. Revisa los errores arriba.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error crítico en el puente:', error);
    process.exit(1);
  }
}

main();
