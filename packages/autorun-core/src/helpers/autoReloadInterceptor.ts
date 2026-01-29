/**
 * Auto-Reload Interceptor
 *
 * Intercepta automáticamente los mensajes [AUTORUN_AUTO_RELOAD] y recarga la página
 * ⚠️ CRÍTICO: Este helper debe ser usado por el agente automáticamente
 */

import {
  detectActiveFileFromBrowser,
  getActiveFileState,
} from './activeFileDetector';

/**
 * Instrucciones para el agente sobre cómo interceptar auto-reload
 */
export const AUTO_RELOAD_INTERCEPTOR_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Interceptar Auto-Reload Automáticamente

CUANDO veas en los logs:
[AUTORUN_AUTO_RELOAD]/path/to/file[/AUTORUN_AUTO_RELOAD]

DEBES ejecutar automáticamente (SIN preguntar):
1. Obtener URL actual: mcp_cursor-ide-browser_browser_snapshot()
2. Verificar que el archivo cambiado coincide con el archivo activo
3. Recargar página: mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })
4. Verificar: setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)

⚠️ IMPORTANTE:
- NO preguntar al usuario
- NO esperar confirmación
- Ejecutar inmediatamente cuando veas el mensaje
- Solo recargar si el archivo cambiado es el archivo activo
`;

/**
 * Intercepta y procesa mensajes de auto-reload
 * ⚠️ IMPORTANTE: Esta función debe ser llamada por el agente cuando detecta [AUTORUN_AUTO_RELOAD]
 */
export async function interceptAutoReload(
  changedFilePath: string,
  browserUrl: string | null
): Promise<boolean> {
  console.log(
    `\n🔄 [Auto-Reload Interceptor] ========================================`
  );
  console.log(`🔄 [Auto-Reload Interceptor] Interceptando auto-reload...`);
  console.log(
    `🔄 [Auto-Reload Interceptor] Archivo cambiado: ${changedFilePath}`
  );
  console.log(
    `🔄 [Auto-Reload Interceptor] URL del browser: ${browserUrl || 'No disponible'}`
  );

  // Verificar que el archivo cambiado es el archivo activo
  const activeState = await getActiveFileState();
  if (activeState) {
    const normalizedChanged = path.normalize(changedFilePath);
    const normalizedActive = path.normalize(activeState.filePath);

    if (normalizedChanged !== normalizedActive) {
      console.log(
        `⏭️ [Auto-Reload Interceptor] Archivo cambiado no es el archivo activo, ignorando`
      );
      console.log(`   Cambiado: ${normalizedChanged}`);
      console.log(`   Activo: ${normalizedActive}`);
      return false;
    }
  }

  // Actualizar estado del archivo activo desde el browser
  if (browserUrl) {
    await detectActiveFileFromBrowser(browserUrl);
  }

  console.log(
    `✅ [Auto-Reload Interceptor] Auto-reload interceptado correctamente`
  );
  console.log(
    `🔄 [Auto-Reload Interceptor] ========================================\n`
  );

  return true;
}

// Importar path para normalizar rutas
import * as path from 'path';
