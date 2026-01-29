import { extractStoryWithPlaywright } from '../src/helpers/storybookPlaywrightExtractor.js';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const storybookUrl = 'https://ubits-storybook10.vercel.app';
  const componentId = 'navegación-tabs'; // Based on title 'Navegación/Tabs'
  const storyName = 'implementation'; // Based on story name 'Implementation'

  console.log(`🚀 Iniciando implementación de Tabs desde Storybook...`);
  console.log(`   URL: ${storybookUrl}`);
  console.log(`   Componente: ${componentId}`);
  console.log(`   Historia: ${storyName}`);

  try {
    // 1. Extraer código usando Playwright
    console.log(`\n🔍 Extrayendo código con Playwright...`);
    const result = await extractStoryWithPlaywright({
      storybookUrl,
      componentId,
      storyName,
      includeHeadStyles: true,
    });

    if (result.error) {
      console.error(`❌ Error en extracción: ${result.error}`);
      process.exit(1);
    }

    console.log(`✅ Código extraído (${result.html?.length} caracteres)`);

    // 2. Analizar el HTML extraído para obtener el código JS de implementación
    // El story "Implementation" renderiza el código dentro de un bloque pre/code o similar en la documentación,
    // PERO al usar el iframe renderizado, obtenemos lo que se ve en el Canvas.
    // En Tabs.stories.ts, el render crea:
    // <div id="tabs-implementation-container"></div>
    // Y ejecuta createTabs(...)
    //
    // Necesitamos el código que *hace* eso.
    // EL extractor de Playwright nos da el HTML renderizado (DOM).
    // Para obtener el código de "uso", normalmente extraeríamos de la vista de Docs o del código fuente.
    //
    // Sin embargo, si el objetivo es "implementar", podemos ver que el DOM resultante
    // contiene la estructura HTML de los tabs.
    //
    // Si miramos Tabs.stories.ts, la story "Implementation" tiene:
    // parameters.docs.source.code = `... window.UBITS.Tabs.create(...) ...`
    //
    // El extractor actual de Playwright extrae el *DOM renderizado* del iframe de la historia.
    // No extrae los metadatos de docs (source code text).
    //
    // Por tanto, lo que obtenemos es el HTML *ya generado*.
    // Ejemplo: <div class="ubits-tabs">...</div>
    //
    // Si queremos implementar usando el JS `createTabs`, necesitamos ese JS.
    // Pero si queremos implementar el HTML *estático* (para evitar JS en tiempo de ejecución), usamos el HTML.
    //
    // El template actual usa `window.createTabs(...)`.
    // Si queremos seguir ese patrón, deberíamos extraer los argumentos.
    //
    // Pero espera, el usuario pidió "usando el flujo de autorun".
    // El flujo de Autorun suele preferir componentes nativos (JS) si están disponibles.
    //
    // Vamos a ver qué nos dio el extractor.
    // Si el extractor nos da el HTML renderizado, podemos inyectar ese HTML directamente
    // en #tabs-container en lugar de llamar a `createTabs` en el cliente.
    // Esto es más rápido (Server Side Rendering style) pero pierde interactividad si el JS no se re-hidrata.
    //
    // Dado que `template-admin.html` ya tiene JS para `window.createTabs`,
    // voy a asumir que queremos actualizar ese JS con la configuración "correcta" o simplemente
    // asegurarnos de que el HTML base esté bien.
    //
    // Vamos a imprimir lo que extrajo para decidir.

    // Guardar resultado temporal para inspección
    const debugPath = path.resolve(process.cwd(), 'temp-tabs-extract.html');
    fs.writeFileSync(debugPath, result.html || '');
    console.log(`   📄 Resultado guardado en: ${debugPath}`);
  } catch (error) {
    console.error(`❌ Error fatal:`, error);
    process.exit(1);
  }
}

main();
