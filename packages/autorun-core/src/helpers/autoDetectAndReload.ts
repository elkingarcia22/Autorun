/**
 * Auto Detect and Reload
 *
 * Detecta automáticamente el archivo activo desde el browser y recarga cuando hay cambios
 * ⚠️ CRÍTICO: Esta función debe ser llamada por el agente al inicio de cada mensaje
 */

import {
  detectActiveFileFromBrowser,
  getActiveFileState,
  isActiveFile,
} from './activeFileDetector';
import { interceptAutoReload } from './autoReloadInterceptor';

/**
 * Detecta automáticamente el archivo activo desde el browser
 * ⚠️ IMPORTANTE: El agente debe llamar esto al inicio de cada mensaje
 *
 * @param browserUrl URL actual del browser (obtenida de browser_snapshot)
 */
export async function autoDetectActiveFile(
  browserUrl: string | null
): Promise<void> {
  console.log('\n🔍 [Auto Detect] ========================================');
  console.log('🔍 [Auto Detect] Detectando archivo activo...');

  if (!browserUrl) {
    console.log('⚠️ [Auto Detect] No hay URL del browser disponible');
    return;
  }

  const activeFile = await detectActiveFileFromBrowser(browserUrl);
  if (activeFile) {
    console.log(
      `✅ [Auto Detect] Archivo activo detectado: ${activeFile.fileName}`
    );
    console.log(`   Ruta: ${activeFile.filePath}`);
    console.log(`   URL: ${activeFile.url}`);
  } else {
    console.log('⚠️ [Auto Detect] No se pudo detectar archivo activo');
  }

  console.log('🔍 [Auto Detect] ========================================\n');
}

/**
 * Intercepta y procesa auto-reload automáticamente
 * ⚠️ IMPORTANTE: El agente debe llamar esto cuando detecta [AUTORUN_AUTO_RELOAD]
 *
 * @param changedFilePath Ruta del archivo que cambió
 * @param browserUrl URL actual del browser
 */
export async function autoInterceptAndReload(
  changedFilePath: string,
  browserUrl: string | null
): Promise<boolean> {
  console.log('\n🔄 [Auto Reload] ========================================');
  console.log('🔄 [Auto Reload] Interceptando auto-reload automáticamente...');

  // Verificar que el archivo cambiado es el archivo activo
  const isActive = await isActiveFile(changedFilePath);
  if (!isActive) {
    console.log(
      `⏭️ [Auto Reload] Archivo cambiado no es el archivo activo, ignorando`
    );
    console.log(`   Cambiado: ${changedFilePath}`);
    const activeState = await getActiveFileState();
    if (activeState) {
      console.log(`   Activo: ${activeState.filePath}`);
    }
    return false;
  }

  // Interceptar y procesar
  const intercepted = await interceptAutoReload(changedFilePath, browserUrl);

  if (intercepted) {
    console.log('✅ [Auto Reload] Auto-reload interceptado correctamente');
    console.log(
      '🔄 [Auto Reload] El agente debe recargar automáticamente ahora'
    );
  } else {
    console.log('⚠️ [Auto Reload] No se pudo interceptar auto-reload');
  }

  console.log('🔄 [Auto Reload] ========================================\n');

  return intercepted;
}

/**
 * Instrucciones para el agente sobre cómo usar estas funciones
 */
export const AUTO_DETECT_AND_RELOAD_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Detectar Archivo Activo y Auto-Reload Automático

AL INICIO DE CADA MENSAJE:
1. Obtener URL del browser: mcp_cursor-ide-browser_browser_snapshot()
2. Detectar archivo activo: autoDetectActiveFile(browserUrl)
3. Guardar estado del archivo activo

CUANDO VES [AUTORUN_AUTO_RELOAD]/path/to/file[/AUTORUN_AUTO_RELOAD]:
1. Obtener URL actual: mcp_cursor-ide-browser_browser_snapshot()
2. Interceptar: autoInterceptAndReload(filePath, browserUrl)
3. Si retorna true, recargar: mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })
4. Verificar: setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)

⚠️ IMPORTANTE:
- NO preguntar al usuario
- NO esperar confirmación
- Ejecutar automáticamente
- Solo recargar si el archivo cambiado es el archivo activo
`;
