/**
 * Execute Auto-Reload
 *
 * ⚠️ CRÍTICO: Esta función ejecuta automáticamente el auto-reload después de write() o search_replace()
 *
 * Esta función DEBE ser llamada automáticamente por el agente después de cada
 * write() o search_replace() en archivos de prototypes/
 */

import { interceptAndReload } from './autoReloadAgentHelper.js';
import { getActiveFileState } from './activeFileDetector.js';
import * as path from 'path';

/**
 * ⚠️ CRÍTICO: Ejecuta auto-reload automáticamente después de write() o search_replace()
 *
 * Esta función DEBE ser llamada automáticamente por el agente después de cada
 * write() o search_replace() en archivos de prototypes/
 *
 * @param filePath Ruta del archivo que se modificó
 * @returns true si se ejecutó el auto-reload, false si no
 */
export async function executeAutoReload(filePath: string): Promise<boolean> {
  console.log(
    '\n🔄 [Execute Auto-Reload] ========================================'
  );
  console.log(
    '🔄 [Execute Auto-Reload] Ejecutando auto-reload automáticamente...'
  );
  console.log(`🔄 [Execute Auto-Reload] Archivo: ${filePath}`);

  // Verificar si es un archivo de prototypes/ y es HTML/JS/CSS
  const normalizedPath = path.normalize(filePath);
  const prototypesDir = path.normalize(path.join(process.cwd(), 'prototypes'));

  if (!normalizedPath.startsWith(prototypesDir)) {
    console.log(
      '⏭️ [Execute Auto-Reload] Archivo no está en prototypes/, ignorando'
    );
    console.log(
      '🔄 [Execute Auto-Reload] ========================================\n'
    );
    return false;
  }

  const ext = path.extname(normalizedPath).toLowerCase();
  if (!['.html', '.js', '.css'].includes(ext)) {
    console.log(
      '⏭️ [Execute Auto-Reload] Archivo no es HTML/JS/CSS, ignorando'
    );
    console.log(
      '🔄 [Execute Auto-Reload] ========================================\n'
    );
    return false;
  }

  // Interceptar y verificar si debe recargarse
  const shouldReload = await interceptAndReload(filePath);

  if (!shouldReload) {
    console.log(
      '⏭️ [Execute Auto-Reload] No se requiere recarga (archivo no es activo o no coincide)'
    );
    console.log(
      '🔄 [Execute Auto-Reload] ========================================\n'
    );
    return false;
  }

  // Obtener URL del archivo activo
  const activeState = await getActiveFileState();
  if (!activeState) {
    console.log(
      '⚠️ [Execute Auto-Reload] No hay archivo activo guardado, usando URL por defecto'
    );
    const fileName = path.basename(filePath);
    const defaultUrl = `http://localhost:3000/${fileName}`;
    console.log(`🔄 [Execute Auto-Reload] URL por defecto: ${defaultUrl}`);
    console.log('⚠️ [Execute Auto-Reload] El agente debe ejecutar:');
    console.log('   1. mcp_cursor-ide-browser_browser_snapshot()');
    console.log(
      `   2. mcp_cursor-ide-browser_browser_navigate({ url: "${defaultUrl}" })`
    );
    console.log(
      '   3. setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)'
    );
    console.log(
      '🔄 [Execute Auto-Reload] ========================================\n'
    );
    return true;
  }

  console.log(
    `✅ [Execute Auto-Reload] Auto-reload aprobado - El agente debe recargar ahora`
  );
  console.log(
    `🔄 [Execute Auto-Reload] Archivo activo: ${activeState.fileName}`
  );
  console.log(`🔄 [Execute Auto-Reload] URL: ${activeState.url}`);
  console.log('🔄 [Execute Auto-Reload] INSTRUCCIONES PARA EL AGENTE:');
  console.log(
    '   1. Obtener URL actual: mcp_cursor-ide-browser_browser_snapshot()'
  );
  console.log(
    `   2. Recargar página: mcp_cursor-ide-browser_browser_navigate({ url: "${activeState.url}" })`
  );
  console.log(
    '   3. Verificar: setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)'
  );
  console.log(
    '⚠️ IMPORTANTE: Ejecutar automáticamente SIN preguntar al usuario'
  );
  console.log(
    '🔄 [Execute Auto-Reload] ========================================\n'
  );

  return true;
}

/**
 * Instrucciones para el agente sobre cómo usar esta función
 */
export const EXECUTE_AUTO_RELOAD_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Ejecutar Auto-Reload Automáticamente

DESPUÉS de cada write() o search_replace() en archivos de prototypes/:

1. Llamar automáticamente: await executeAutoReload(filePath)
2. Si la función retorna true:
   a. Obtener URL actual: mcp_cursor-ide-browser_browser_snapshot()
   b. Extraer URL del snapshot (o usar activeState.url si está disponible)
   c. Recargar: mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })
   d. Verificar: setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)

⚠️ IMPORTANTE:
- NO preguntar al usuario
- NO esperar confirmación
- Ejecutar automáticamente después de cada write() o search_replace()
- Solo recargar si executeAutoReload() retorna true
`;
