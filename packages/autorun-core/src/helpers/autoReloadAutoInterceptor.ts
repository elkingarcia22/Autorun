/**
 * Auto-Reload Auto Interceptor
 *
 * ⚠️ CRÍTICO: Sistema que intercepta automáticamente mensajes [AUTORUN_AUTO_RELOAD]
 * y recarga el browser automáticamente sin intervención del usuario.
 *
 * Este sistema DEBE ejecutarse automáticamente cuando se detecta [AUTORUN_AUTO_RELOAD]
 */

import { getActiveFileState, isActiveFile } from './activeFileDetector.js';
import * as path from 'path';

export interface AutoReloadMessage {
  filePath: string;
  timestamp: string;
}

/**
 * ⚠️ CRÍTICO: Intercepta mensajes [AUTORUN_AUTO_RELOAD] automáticamente
 *
 * Esta función DEBE ser llamada por el agente cuando detecta [AUTORUN_AUTO_RELOAD]
 * en los logs o mensajes del sistema.
 *
 * @param changedFilePath Ruta del archivo que cambió (extraída del mensaje)
 * @param browserUrl URL actual del browser (obtenida de browser_snapshot)
 * @returns true si se debe recargar, false si no
 */
export async function interceptAutoReloadMessage(
  changedFilePath: string,
  browserUrl: string | null
): Promise<boolean> {
  console.log(
    '\n🔄 [Auto-Reload Interceptor] ========================================'
  );
  console.log(
    '🔄 [Auto-Reload Interceptor] Interceptando mensaje de auto-reload...'
  );
  console.log(
    `🔄 [Auto-Reload Interceptor] Archivo cambiado: ${changedFilePath}`
  );
  console.log(
    `🔄 [Auto-Reload Interceptor] URL del browser: ${browserUrl || 'No disponible'}`
  );

  // Normalizar rutas
  const normalizedChanged = path.normalize(changedFilePath);

  // Verificar que el archivo cambiado es el archivo activo
  const activeState = await getActiveFileState();
  if (activeState) {
    const normalizedActive = path.normalize(activeState.filePath);

    if (normalizedChanged !== normalizedActive) {
      console.log(
        `⏭️ [Auto-Reload Interceptor] Archivo cambiado NO es el archivo activo, ignorando`
      );
      console.log(`   Cambiado: ${normalizedChanged}`);
      console.log(`   Activo: ${normalizedActive}`);
      console.log(
        '🔄 [Auto-Reload Interceptor] ========================================\n'
      );
      return false;
    }

    console.log(
      `✅ [Auto-Reload Interceptor] Archivo cambiado ES el archivo activo`
    );
    console.log(`   Archivo: ${activeState.fileName}`);
    console.log(`   URL: ${activeState.url}`);
  } else {
    console.log(`⚠️ [Auto-Reload Interceptor] No hay archivo activo detectado`);
    console.log(`   Intentando detectar desde URL del browser...`);

    if (browserUrl) {
      const { detectActiveFileFromBrowser } = await import(
        './activeFileDetector.js'
      );
      const detected = await detectActiveFileFromBrowser(browserUrl);

      if (detected) {
        const normalizedDetected = path.normalize(detected.filePath);
        if (normalizedChanged === normalizedDetected) {
          console.log(
            `✅ [Auto-Reload Interceptor] Archivo detectado y coincide con el cambiado`
          );
          console.log(`   Archivo: ${detected.fileName}`);
        } else {
          console.log(
            `⏭️ [Auto-Reload Interceptor] Archivo detectado NO coincide con el cambiado`
          );
          console.log(`   Cambiado: ${normalizedChanged}`);
          console.log(`   Detectado: ${normalizedDetected}`);
          console.log(
            '🔄 [Auto-Reload Interceptor] ========================================\n'
          );
          return false;
        }
      } else {
        console.log(
          `⚠️ [Auto-Reload Interceptor] No se pudo detectar archivo desde URL`
        );
        console.log(
          '🔄 [Auto-Reload Interceptor] ========================================\n'
        );
        return false;
      }
    } else {
      console.log(
        `⚠️ [Auto-Reload Interceptor] No hay URL del browser disponible`
      );
      console.log(
        '🔄 [Auto-Reload Interceptor] ========================================\n'
      );
      return false;
    }
  }

  console.log(`✅ [Auto-Reload Interceptor] Auto-reload aprobado`);
  console.log(`⚠️ [Auto-Reload Interceptor] INSTRUCCIONES PARA EL AGENTE:`);
  console.log(
    `   1. Obtener URL actual: mcp_cursor-ide-browser_browser_snapshot()`
  );
  console.log(
    `   2. Recargar página: mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })`
  );
  console.log(
    `   3. Verificar: setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)`
  );
  console.log(
    `⚠️ IMPORTANTE: Ejecutar automáticamente SIN preguntar al usuario`
  );
  console.log(
    '🔄 [Auto-Reload Interceptor] ========================================\n'
  );

  return true;
}

/**
 * Instrucciones para el agente sobre cómo interceptar auto-reload automáticamente
 */
export const AUTO_RELOAD_AUTO_INTERCEPTOR_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Interceptar Auto-Reload Automáticamente

CUANDO veas en los logs o mensajes:
[AUTORUN_AUTO_RELOAD]/path/to/file[/AUTORUN_AUTO_RELOAD]

DEBES ejecutar automáticamente (SIN preguntar):
1. Extraer ruta del archivo del mensaje: /path/to/file
2. Obtener URL actual: mcp_cursor-ide-browser_browser_snapshot()
3. Interceptar: interceptAutoReloadMessage(filePath, browserUrl)
4. Si retorna true, recargar: mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })
5. Verificar: setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)

⚠️ IMPORTANTE:
- NO preguntar al usuario
- NO esperar confirmación
- Ejecutar inmediatamente cuando veas el mensaje
- Solo recargar si el archivo cambiado es el archivo activo
- El sistema verifica automáticamente que el archivo cambiado sea el archivo activo
`;
