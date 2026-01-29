/**
 * Auto-Reload Agent Helper
 *
 * Helper para que el agente de Cursor ejecute auto-reload automáticamente
 * cuando detecta mensajes [AUTORUN_AUTO_RELOAD] en los logs.
 */

import { getActiveFileState, isActiveFile } from './activeFileDetector.js';
import * as path from 'path';

/**
 * ⚠️ CRÍTICO: Intercepta y ejecuta auto-reload automáticamente
 *
 * Esta función DEBE ser llamada por el agente cuando detecta [AUTORUN_AUTO_RELOAD]
 * en los logs o mensajes del sistema.
 *
 * @param changedFilePath Ruta del archivo que cambió (extraída del mensaje)
 * @returns true si se debe recargar, false si no
 */
export async function interceptAndReload(
  changedFilePath: string
): Promise<boolean> {
  console.log(
    '\n🔄 [Auto-Reload Agent Helper] ========================================'
  );
  console.log(
    '🔄 [Auto-Reload Agent Helper] Interceptando auto-reload automáticamente...'
  );
  console.log(
    `🔄 [Auto-Reload Agent Helper] Archivo cambiado: ${changedFilePath}`
  );

  // Normalizar rutas
  const normalizedChanged = path.normalize(changedFilePath);

  // Verificar que el archivo cambiado es el archivo activo
  const activeState = await getActiveFileState();
  if (activeState) {
    const normalizedActive = path.normalize(activeState.filePath);

    if (normalizedChanged !== normalizedActive) {
      console.log(
        `⏭️ [Auto-Reload Agent Helper] Archivo cambiado no es el archivo activo, ignorando`
      );
      console.log(`   Cambiado: ${normalizedChanged}`);
      console.log(`   Activo: ${normalizedActive}`);
      console.log(
        '🔄 [Auto-Reload Agent Helper] ========================================\n'
      );
      return false;
    }

    console.log(
      `✅ [Auto-Reload Agent Helper] Archivo cambiado coincide con archivo activo`
    );
    console.log(`   Archivo: ${normalizedChanged}`);
    console.log(`   URL: ${activeState.url}`);
  } else {
    console.log(
      `⚠️ [Auto-Reload Agent Helper] No hay archivo activo guardado, pero continuando...`
    );
  }

  console.log(
    `✅ [Auto-Reload Agent Helper] Auto-reload aprobado - El agente debe recargar ahora`
  );
  console.log('🔄 [Auto-Reload Agent Helper] INSTRUCCIONES PARA EL AGENTE:');
  console.log(
    '   1. Obtener URL actual: mcp_cursor-ide-browser_browser_snapshot()'
  );
  console.log(
    '   2. Extraer URL del snapshot (o usar activeState.url si está disponible)'
  );
  console.log(
    '   3. Recargar página: mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })'
  );
  console.log(
    '   4. Verificar: setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)'
  );
  console.log(
    '🔄 [Auto-Reload Agent Helper] ========================================\n'
  );

  return true;
}

/**
 * Instrucciones para el agente sobre cómo usar esta función
 */
export const AUTO_RELOAD_AGENT_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Interceptar Auto-Reload Automáticamente

CUANDO veas en los logs:
[AUTORUN_AUTO_RELOAD]/path/to/file[/AUTORUN_AUTO_RELOAD]

DEBES ejecutar automáticamente (SIN preguntar) en este orden:

1. Extraer ruta del archivo del mensaje
2. Llamar: interceptAndReload(filePath)
3. Si retorna true:
   a. Obtener URL actual: mcp_cursor-ide-browser_browser_snapshot()
   b. Extraer URL del snapshot
   c. Recargar: mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })
   d. Verificar: setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)

⚠️ IMPORTANTE:
- NO preguntar al usuario
- NO esperar confirmación
- Ejecutar inmediatamente cuando veas el mensaje
- Solo recargar si interceptAndReload() retorna true
`;
