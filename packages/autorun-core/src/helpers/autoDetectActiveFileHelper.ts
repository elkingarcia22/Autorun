/**
 * Auto Detect Active File Helper
 *
 * Helper para que el agente pueda detectar automáticamente el archivo activo
 * desde el browser de Cursor usando MCP tools
 */

import { detectActiveFileFromBrowser } from './activeFileDetector.js';

/**
 * ⚠️ CRÍTICO: Instrucciones para el agente
 *
 * Cuando veas [AUTORUN_DETECT_ACTIVE_FILE]true[/AUTORUN_DETECT_ACTIVE_FILE],
 * ejecuta automáticamente esta función usando las herramientas MCP disponibles.
 */
export const AUTO_DETECT_ACTIVE_FILE_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Detectar Archivo Activo Automáticamente

CUANDO veas en los logs:
[AUTORUN_DETECT_ACTIVE_FILE]true[/AUTORUN_DETECT_ACTIVE_FILE]

DEBES ejecutar automáticamente (SIN preguntar):

1. Obtener URL del browser:
   const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
   const browserUrl = snapshot?.url || null;

2. Si browserUrl existe, detectar archivo activo:
   import { detectActiveFileFromBrowser } from '@autorun/core/helpers/activeFileDetector';
   const activeState = await detectActiveFileFromBrowser(browserUrl);
   
   if (activeState) {
     console.log('✅ Archivo activo detectado:', activeState.fileName);
   }

3. Si browserUrl es null, intentar obtener desde estado guardado:
   import { getActiveFileState } from '@autorun/core/helpers/activeFileDetector';
   const savedState = await getActiveFileState();
   
   if (savedState) {
     console.log('✅ Usando estado guardado:', savedState.fileName);
   }

⚠️ IMPORTANTE:
- NO preguntar al usuario
- NO esperar confirmación
- Ejecutar inmediatamente cuando veas el mensaje
- Esto garantiza que el auto-reload funcione correctamente
`;

/**
 * Función helper que el agente puede llamar para detectar archivo activo
 *
 * ⚠️ NOTA: Esta función requiere que el agente proporcione browserUrl
 * usando mcp_cursor-ide-browser_browser_snapshot()
 */
export async function autoDetectActiveFileHelper(
  browserUrl: string | null
): Promise<{
  success: boolean;
  activeState?: any;
  error?: string;
}> {
  console.log(
    '\n🔍 [Auto Detect Active File Helper] ========================================'
  );
  console.log(
    '🔍 [Auto Detect Active File Helper] Detectando archivo activo...'
  );
  console.log(
    `🔍 [Auto Detect Active File Helper] Browser URL: ${browserUrl || 'No disponible'}`
  );

  try {
    if (!browserUrl) {
      // Intentar usar estado guardado
      const { getActiveFileState } = await import('./activeFileDetector.js');
      const savedState = await getActiveFileState();

      if (savedState) {
        console.log(
          `✅ [Auto Detect Active File Helper] Usando estado guardado: ${savedState.fileName}`
        );
        console.log(
          '🔍 [Auto Detect Active File Helper] ========================================\n'
        );
        return {
          success: true,
          activeState: savedState,
        };
      }

      console.warn(
        '⚠️ [Auto Detect Active File Helper] No hay URL del browser ni estado guardado'
      );
      console.log(
        '🔍 [Auto Detect Active File Helper] ========================================\n'
      );
      return {
        success: false,
        error: 'No hay URL del browser ni estado guardado',
      };
    }

    // Detectar desde browser URL
    const activeState = await detectActiveFileFromBrowser(browserUrl);

    if (activeState) {
      console.log(
        `✅ [Auto Detect Active File Helper] Archivo activo detectado: ${activeState.fileName}`
      );
      console.log(
        `✅ [Auto Detect Active File Helper] Ruta: ${activeState.filePath}`
      );
      console.log(
        '🔍 [Auto Detect Active File Helper] ========================================\n'
      );
      return {
        success: true,
        activeState,
      };
    }

    console.warn(
      '⚠️ [Auto Detect Active File Helper] No se pudo detectar archivo activo'
    );
    console.log(
      '🔍 [Auto Detect Active File Helper] ========================================\n'
    );
    return {
      success: false,
      error: 'No se pudo detectar archivo activo desde la URL',
    };
  } catch (error: any) {
    console.error(
      '❌ [Auto Detect Active File Helper] Error detectando archivo activo:',
      error.message
    );
    console.log(
      '🔍 [Auto Detect Active File Helper] ========================================\n'
    );
    return {
      success: false,
      error: error.message,
    };
  }
}
