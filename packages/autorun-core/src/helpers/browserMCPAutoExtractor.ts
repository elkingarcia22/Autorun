/**
 * Browser MCP Auto Extractor
 *
 * ⭐ NUEVO: Extrae código desde Storybook Docs usando Browser MCP automáticamente
 * cuando fetch() falla debido a carga dinámica de código.
 *
 * ⚠️ IMPORTANTE: Esta función requiere que el agente ejecute Browser MCP.
 * Si el agente no está disponible, lanza un error descriptivo.
 */

import { SnapshotNode } from './storybookExactCodeExtractorWithBrowser';

export interface BrowserMCPExtractionResult {
  html: string;
  js?: string;
  found: boolean;
  error?: string;
}

/**
 * Extrae código desde Storybook Docs usando Browser MCP
 *
 * ⚠️ CRÍTICO: Esta función requiere que el agente ejecute Browser MCP.
 * Si el agente no está disponible, retorna un error descriptivo.
 *
 * @param docsUrl URL de la página Docs de Storybook
 * @param storyName Nombre de la historia a extraer (opcional)
 * @returns Código extraído o error descriptivo
 */
export async function extractCodeWithBrowserMCP(
  docsUrl: string,
  storyName: string = 'default'
): Promise<BrowserMCPExtractionResult> {
  console.log(
    `🔍 [Browser MCP Auto Extractor] Extrayendo código desde: ${docsUrl}`
  );
  console.log(`   📋 Historia: ${storyName}`);

  // ⚠️ CRÍTICO: Esta función requiere que el agente ejecute Browser MCP
  // No podemos ejecutar Browser MCP directamente desde Node.js
  // En su lugar, lanzamos un error especial que el agente puede detectar
  // y ejecutar Browser MCP automáticamente

  const error = new Error(
    `BROWSER_MCP_REQUIRED:${docsUrl}:${storyName}`
  ) as Error & {
    type: 'BROWSER_MCP_REQUIRED';
    docsUrl: string;
    storyName: string;
  };

  error.type = 'BROWSER_MCP_REQUIRED';
  error.docsUrl = docsUrl;
  error.storyName = storyName;

  throw error;
}

/**
 * Parsea un error de Browser MCP Required
 */
export function isBrowserMCPRequiredError(error: any): error is Error & {
  type: 'BROWSER_MCP_REQUIRED';
  docsUrl: string;
  storyName: string;
} {
  return (
    error?.type === 'BROWSER_MCP_REQUIRED' ||
    (error?.message?.includes('BROWSER_MCP_REQUIRED') &&
      error?.docsUrl &&
      error?.storyName)
  );
}

/**
 * Extrae código desde un snapshot del Browser MCP
 *
 * Esta función se llama DESPUÉS de que el agente ejecuta Browser MCP
 * y obtiene un snapshot.
 *
 * @param snapshot Snapshot del Browser MCP
 * @param storyName Nombre de la historia a extraer (opcional)
 * @returns Código extraído
 */
export async function extractCodeFromBrowserSnapshot(
  snapshot: SnapshotNode | SnapshotNode[],
  storyName: string = 'default'
): Promise<BrowserMCPExtractionResult> {
  console.log(
    `🔍 [Browser MCP Auto Extractor] Extrayendo código desde snapshot...`
  );

  try {
    const { extractCodeFromDocsSnapshot } = await import(
      './extractCodeFromDocsSnapshot.js'
    );
    const result = extractCodeFromDocsSnapshot(snapshot);

    if (result.found) {
      console.log(
        `   ✅ Código extraído: ${result.html.length} caracteres HTML`
      );
      if (result.js) {
        console.log(`   ✅ JavaScript: ${result.js.length} caracteres`);
      }
      return {
        html: result.html,
        js: result.js,
        found: true,
      };
    } else {
      console.warn(`   ⚠️ No se encontró código en el snapshot`);
      return {
        html: '',
        found: false,
        error: 'No se encontró código en el snapshot del Browser MCP',
      };
    }
  } catch (error: any) {
    console.error(
      `   ❌ Error extrayendo código desde snapshot: ${error.message}`
    );
    return {
      html: '',
      found: false,
      error: `Error extrayendo código: ${error.message}`,
    };
  }
}

/**
 * Genera instrucciones para el agente sobre cómo ejecutar Browser MCP
 */
export function generateBrowserMCPInstructions(
  docsUrl: string,
  storyName: string = 'default'
): string {
  return `
⚠️ EXTRACCIÓN REQUIERE BROWSER MCP

El código de Storybook se carga dinámicamente con JavaScript, por lo que fetch() no puede obtenerlo.
Necesitamos usar Browser MCP para navegar y extraer desde el snapshot.

📋 INSTRUCCIONES PARA EL AGENTE:

1. Navegar a Docs:
   call_mcp_tool({
     server: "cursor-ide-browser",
     toolName: "browser_navigate",
     arguments: { url: "${docsUrl}" }
   })

2. Esperar 2 segundos para que se cargue el código dinámicamente

3. Buscar botón "Show code" (si existe) y hacer clic:
   call_mcp_tool({
     server: "cursor-ide-browser",
     toolName: "browser_click",
     arguments: {
       element: "Show code button",
       ref: "button[aria-label*='Show code'], button[aria-label*='show code']"
     }
   })

4. Tomar snapshot:
   call_mcp_tool({
     server: "cursor-ide-browser",
     toolName: "browser_snapshot"
   })

5. Extraer código desde el snapshot usando extractCodeFromBrowserSnapshot()

📋 URL: ${docsUrl}
📋 Historia: ${storyName}
`;
}
