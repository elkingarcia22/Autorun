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

    try {
      const result = await extractExactCodeFromStorybookWithBrowser(
        componentId,
        storyName
      );

      if (result.html || result.js) {
        console.log(`   ✅ Código extraído exitosamente`);
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
            url: `https://ubits-storybook10.vercel.app/?path=/docs/${componentId}--docs`,
            storyName,
            steps: [
              'Navegar a la URL de Docs',
              'Esperar 2 segundos para que se cargue el contenido',
              'Si el código no es visible, buscar un botón "Show code" y hacer clic',
              'Tomar un snapshot con browser_snapshot()',
              'Llamar a extractCodeFromBrowserSnapshot con el snapshot',
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
        console.log(`   ⚠️ Error requiere Browser MCP`);
        return {
          success: false,
          error: error.message,
          code: null,
          requiresBrowserMCP: true,
          browserMCPInstructions: {
            url:
              error.docsUrl ||
              `https://ubits-storybook10.vercel.app/?path=/docs/${componentId}--docs`,
            storyName: error.storyName || storyName,
            steps: [
              `1. Navegar a: ${error.docsUrl || `https://ubits-storybook10.vercel.app/?path=/docs/${componentId}--docs`}`,
              '2. Esperar 2 segundos para que se cargue el contenido',
              '3. Si el código no es visible, buscar un botón "Show code" o "Copy" y hacer clic',
              '4. Tomar un snapshot: browser_snapshot()',
              '5. Llamar a extractCodeFromBrowserSnapshot con el snapshot para continuar',
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
