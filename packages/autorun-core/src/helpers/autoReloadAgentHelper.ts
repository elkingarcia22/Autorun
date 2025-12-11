/**
 * Helper Automático para Auto-Reload del Agente
 *
 * Este helper proporciona funciones que el agente DEBE usar automáticamente
 * después de write() o search_replace() en archivos de prototypes/
 *
 * ⚠️ CRÍTICO: El agente debe usar estas funciones automáticamente sin preguntar al usuario
 */

import * as path from 'path';
import { shouldAutoReload, getTemplateUrlFromPath } from './autoReloadHelper';

/**
 * Instrucciones automáticas para el agente sobre cómo recargar
 *
 * ⚠️ ESTAS INSTRUCCIONES DEBEN SER SEGUIDAS AUTOMÁTICAMENTE POR EL AGENTE
 */
export const AUTO_RELOAD_AGENT_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Auto-Reload Automático después de write() o search_replace()

CUANDO uses write() o search_replace() en archivos de prototypes/:

1. ✅ Verificar automáticamente si debe recargarse:
   - Usar: shouldAutoReload(filePath)
   - Solo recargar si es .html, .js o .css en prototypes/

2. ✅ Si debe recargarse, ejecutar AUTOMÁTICAMENTE (SIN preguntar):
   await autoReloadBrowser(filePath);

3. ✅ NO preguntar al usuario
4. ✅ NO esperar confirmación
5. ✅ Ejecutar inmediatamente después de guardar

Esto permite ver los cambios inmediatamente sin recargar manualmente.
`;

/**
 * Recarga automáticamente el navegador después de guardar un archivo
 *
 * ⚠️ IMPORTANTE: Esta función debe ser llamada automáticamente por el agente
 * después de write() o search_replace() en archivos de prototypes/
 *
 * @param filePath Ruta del archivo que se guardó
 * @returns Promise que se resuelve cuando se completa la recarga
 *
 * @example
 * // Después de write() o search_replace()
 * if (shouldAutoReload(filePath)) {
 *   await autoReloadBrowser(filePath);
 * }
 */
export async function autoReloadBrowser(filePath: string): Promise<void> {
  // Verificar si debe recargarse
  if (!shouldAutoReload(filePath)) {
    return;
  }

  console.log(
    '\n🔄 [Auto-Reload Helper] ========================================'
  );
  console.log(
    `🔄 [Auto-Reload Helper] Recargando navegador automáticamente...`
  );
  console.log(`🔄 [Auto-Reload Helper] Archivo: ${filePath}`);

  try {
    // ⚠️ NOTA: El agente debe ejecutar estas herramientas MCP directamente
    // Estas son las instrucciones que el agente debe seguir:

    console.log(`🔄 [Auto-Reload Helper] Instrucciones para el agente:`);
    console.log(`   1. mcp_cursor-ide-browser_browser_snapshot()`);
    console.log(`   2. Obtener URL actual del snapshot`);
    console.log(
      `   3. mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })`
    );
    console.log(
      `   4. setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)`
    );

    // Obtener URL del template como fallback
    const templateUrl = getTemplateUrlFromPath(filePath);
    console.log(`🔄 [Auto-Reload Helper] URL del template: ${templateUrl}`);

    console.log(
      `🔄 [Auto-Reload Helper] ========================================\n`
    );

    // ⚠️ IMPORTANTE: El agente debe ejecutar las herramientas MCP aquí
    // No podemos ejecutarlas desde TypeScript, solo proporcionamos las instrucciones
  } catch (error) {
    console.error(`❌ [Auto-Reload Helper] Error:`, error);
  }
}

/**
 * Verifica si un archivo debe activar auto-reload y proporciona instrucciones
 *
 * @param filePath Ruta del archivo
 * @returns Objeto con información sobre si debe recargarse y cómo hacerlo
 */
export function getAutoReloadInfo(filePath: string): {
  shouldReload: boolean;
  templateUrl: string;
  instructions: string;
} {
  const shouldReload = shouldAutoReload(filePath);
  const templateUrl = getTemplateUrlFromPath(filePath);

  const instructions = shouldReload
    ? `Ejecutar automáticamente: await autoReloadBrowser("${filePath}")`
    : `No se requiere recarga (archivo no es HTML/JS/CSS en prototypes/)`;

  return {
    shouldReload,
    templateUrl,
    instructions,
  };
}
