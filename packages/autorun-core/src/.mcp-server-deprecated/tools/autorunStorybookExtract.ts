/**
 * Tool: autorun.storybook.extract
 *
 * Extrae código HTML/JS directamente desde Storybook usando Browser MCP internamente.
 * Esta herramienta evita tener que modificar Storybook para crear historias "code".
 *
 * Flujo:
 * 1. Intentar extraer con fetch() (rápido)
 * 2. Si falla, usar Browser MCP para navegar y extraer desde snapshot
 * 3. Retornar código extraído o instrucciones para Browser MCP
 */

import { extractExactCodeFromStorybookWithBrowser } from '../../helpers/storybookExactCodeExtractorWithBrowser.js';
import {
  findCodeStory,
  findImplementationStory,
} from '../../helpers/codePropsCombiner.js';
import { mapAndValidateComponentNameToStorybookId } from '../../helpers/storybookStories.js';
import {
  AutorunStorybookExtractInput,
  AutorunStorybookExtractOutput,
} from '../types.js';

/**
 * Extrae código desde Storybook
 */
export async function autorunStorybookExtract(
  input: AutorunStorybookExtractInput
): Promise<AutorunStorybookExtractOutput> {
  console.log(`\n🔍 [Autorun MCP] autorun.storybook.extract() llamado`);
  console.log(
    `   Componente: ${input.componentId || input.componentName || 'N/A'}`
  );

  try {
    // PASO 1: Obtener componentId
    let componentId: string;

    if (input.componentId) {
      componentId = input.componentId;
    } else if (input.componentName) {
      // Mapear nombre de componente a ID de Storybook
      try {
        componentId = await mapAndValidateComponentNameToStorybookId(
          input.componentName
        );
        console.log(
          `   ✅ Componente mapeado: ${input.componentName} → ${componentId}`
        );
      } catch (error: any) {
        console.error(`   ❌ Error mapeando componente: ${error.message}`);
        return {
          success: false,
          error: `No se pudo mapear el componente "${input.componentName}": ${error.message}`,
          code: null,
          requiresBrowserMCP: false,
        };
      }
    } else {
      return {
        success: false,
        error: 'Se requiere componentId o componentName',
        code: null,
        requiresBrowserMCP: false,
      };
    }

    // PASO 2: Determinar historia a usar
    let storyName = input.storyName || 'default';

    if (storyName === 'default' || storyName === 'auto') {
      // Buscar historia "code" primero, luego "implementation"
      try {
        const codeStory = await findCodeStory(componentId);
        if (codeStory) {
          storyName = codeStory;
          console.log(`   ✅ Historia "code" encontrada: ${storyName}`);
        } else {
          const implementationStory =
            await findImplementationStory(componentId);
          if (implementationStory !== 'default') {
            storyName = implementationStory;
            console.log(
              `   ✅ Historia "implementation" encontrada: ${storyName}`
            );
          }
        }
      } catch (error: any) {
        console.warn(
          `   ⚠️ Error buscando historias: ${error.message}, usando "default"`
        );
      }
    }

    // PASO 3: Extraer código
    console.log(`   📋 Extrayendo código desde Storybook...`);
    console.log(`   📚 Componente: ${componentId}`);
    console.log(`   📖 Historia: ${storyName}`);

    // INTENTO PRINCIPAL: Playwright (más robusto)
    try {
      const { StorybookManager } = await import('../../helpers/storybookManager.js');
      const manager = StorybookManager.getInstance();
      const activeConfig = await manager.getActiveConfig();

      if (activeConfig?.url) {
        console.log(`   🤖 Intentando extracción con Playwright (Headless Browser)...`);

        const { extractStoryWithPlaywright } = await import('../../helpers/storybookPlaywrightExtractor.js');
        const playwrightResult = await extractStoryWithPlaywright({
          storybookUrl: activeConfig.url,
          componentId,
          storyName,
          includeHeadStyles: true
        });

        if (playwrightResult.html && !playwrightResult.error) {
          console.log(`   ✅ Extracción Playwright exitosa`);

          // Extraer CSS links encontrados
          const css = playwrightResult.headStyles?.links || [];

          // Tratar de encontrar algo de JS inicialización en el HTML si existe (opcional)
          // Muchas veces vendrá vacío, pero mantenemos compatibilidad de tipos
          const js = '';

          return {
            success: true,
            code: {
              html: playwrightResult.html,
              js,
              css
            },
            componentId,
            storyName,
            requiresBrowserMCP: false
          };
        } else if (playwrightResult.error) {
          console.warn(`   ⚠️ Error en Playwright: ${playwrightResult.error}. Intentando método fallback...`);
        }
      }
    } catch (pwError: any) {
      console.warn(`   ⚠️ Falló inicialización Playwright: ${pwError.message}. Intentando método fallback...`);
    }

    // FALLBACK: Método original (extractExactCodeFromStorybookWithBrowser)
    try {
      const result = await extractExactCodeFromStorybookWithBrowser(
        componentId,
        storyName
      );

      if (result.html || result.js) {
        console.log(`   ✅ Código extraído exitosamente (Fallback)`);
        console.log(`   📄 HTML: ${result.html?.length || 0} caracteres`);
        console.log(`   📄 JS: ${result.js?.length || 0} caracteres`);

        return {
          success: true,
          code: {
            html: result.html || '',
            js: result.js,
            css: result.css || [],
          },
          componentId,
          storyName,
          requiresBrowserMCP: false,
        };
      } else {
        console.warn(`   ⚠️ No se encontró código en Storybook`);
        return {
          success: false,
          error: 'No se encontró código en Storybook para este componente',
          code: null,
          requiresBrowserMCP: true,
          browserMCPInstructions: {
            url: `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--${storyName}`,
            storyName,
            steps: [
              `1. Navegar a: https://ubits-storybook10.vercel.app/?path=/story/${componentId}--${storyName}`,
              '2. Hacer clic en la pestaña "Code" en el panel lateral',
              '3. Esperar 2 segundos para que se cargue el código',
              '4. Tomar un snapshot: browser_snapshot()',
              '5. Extraer código desde el snapshot',
            ],
          },
        };
      }
    } catch (error: any) {
      console.error(`   ❌ Error extrayendo código: ${error.message}`);

      // Verificar si el error requiere Browser MCP
      const { isBrowserMCPRequiredError } = await import(
        '../../helpers/browserMCPAutoExtractor.js'
      );

      if (isBrowserMCPRequiredError(error)) {
        console.log(`   ⚠️ Error requiere Browser MCP - el código se carga dinámicamente`);
        console.log(`   💡 El agente debe usar Browser MCP para navegar y extraer desde la pestaña "Code"`);

        const storyUrl = error.docsUrl || `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--${storyName}`;

        return {
          success: false,
          error: error.message,
          code: null,
          requiresBrowserMCP: true,
          browserMCPInstructions: {
            url: storyUrl,
            storyName: error.storyName || storyName,
            steps: [
              `1. Navegar a: ${storyUrl}`,
              '2. Buscar la pestaña "Code" en el panel lateral derecho',
              '3. Hacer clic en la pestaña "Code" (ref: buscar "Code" en el snapshot)',
              '4. Esperar 2 segundos para que se cargue el código',
              '5. Tomar un snapshot: browser_snapshot()',
              '6. Usar extractCodeFromBrowserSnapshot() con el snapshot para extraer el código HTML',
            ],
          },
        };
      }

      return {
        success: false,
        error: `Error extrayendo código: ${error.message}`,
        code: null,
        requiresBrowserMCP: false,
      };
    }
  } catch (error: any) {
    console.error(
      `   ❌ Error en autorun.storybook.extract(): ${error.message}`
    );
    return {
      success: false,
      error: `Error: ${error.message}`,
      code: null,
      requiresBrowserMCP: false,
    };
  }
}
