/**
 * Auto-Reload After Write
 *
 * Helper para que el agente ejecute auto-reload automáticamente
 * después de write() o search_replace() en archivos de prototypes/
 */

import { interceptAndReload } from './autoReloadAgentHelper.js';
import * as path from 'path';

/**
 * Verifica si un archivo debe activar auto-reload
 */
function shouldAutoReload(filePath: string): boolean {
  const normalizedPath = path.normalize(filePath);
  const prototypesDir = path.normalize(path.join(process.cwd(), 'prototypes'));

  // Solo recargar archivos HTML, JS o CSS en prototypes/
  if (!normalizedPath.startsWith(prototypesDir)) {
    return false;
  }

  const ext = path.extname(normalizedPath).toLowerCase();
  return ['.html', '.js', '.css'].includes(ext);
}

/**
 * ⚠️ CRÍTICO: Ejecuta auto-reload automáticamente después de write() o search_replace()
 *
 * Esta función DEBE ser llamada por el agente automáticamente después de cada
 * write() o search_replace() en archivos de prototypes/
 *
 * @param filePath Ruta del archivo que se modificó
 * @param browserUrl URL actual del browser (opcional, se obtiene automáticamente si no se proporciona)
 */
export async function autoReloadAfterWrite(
  filePath: string,
  browserUrl?: string | null
): Promise<void> {
  // Verificar si debe recargarse
  if (!shouldAutoReload(filePath)) {
    return;
  }

  console.log(
    '\n🔄 [Auto-Reload After Write] ========================================'
  );
  console.log(
    '🔄 [Auto-Reload After Write] Archivo modificado, verificando auto-reload...'
  );
  console.log(`🔄 [Auto-Reload After Write] Archivo: ${filePath}`);

  // Interceptar y verificar si debe recargarse
  const shouldReload = await interceptAndReload(filePath);

  if (shouldReload) {
    console.log(
      '✅ [Auto-Reload After Write] Auto-reload aprobado - El agente debe recargar ahora'
    );
    console.log('🔄 [Auto-Reload After Write] INSTRUCCIONES PARA EL AGENTE:');
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
      '⚠️ IMPORTANTE: Ejecutar automáticamente SIN preguntar al usuario'
    );
  } else {
    console.log(
      '⏭️ [Auto-Reload After Write] No se requiere recarga (archivo no es activo o no coincide)'
    );
  }

  console.log(
    '🔄 [Auto-Reload After Write] ========================================\n'
  );
}

/**
 * Instrucciones para el agente sobre cómo usar esta función
 */
export const AUTO_RELOAD_AFTER_WRITE_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Auto-Reload Automático después de write() o search_replace()

DESPUÉS de cada write() o search_replace() en archivos de prototypes/:

1. Llamar automáticamente: await autoReloadAfterWrite(filePath)
2. Si la función indica que debe recargarse:
   a. Obtener URL actual: mcp_cursor-ide-browser_browser_snapshot()
   b. Extraer URL del snapshot
   c. Recargar: mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })
   d. Verificar: setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)

⚠️ IMPORTANTE:
- NO preguntar al usuario
- NO esperar confirmación
- Ejecutar automáticamente después de cada write() o search_replace()
- Solo recargar si autoReloadAfterWrite() indica que debe recargarse
`;
