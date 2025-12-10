/**
 * Helper para recarga automática de página después de guardar archivos
 * 
 * Este helper permite que el agente de Cursor recargue automáticamente
 * la página cuando guarda archivos en prototypes/
 */

import * as path from 'path';

/**
 * Verifica si un archivo debe activar recarga automática
 * @param filePath Ruta del archivo
 * @returns true si debe recargarse
 */
export function shouldAutoReload(filePath: string): boolean {
	// Solo recargar si es un archivo HTML, JS o CSS en prototypes/
	if (!filePath.includes('prototypes/')) {
		return false;
	}

	const ext = path.extname(filePath).toLowerCase();
	return ext === '.html' || ext === '.js' || ext === '.css';
}

/**
 * Obtiene la URL del template desde la ruta del archivo
 * @param filePath Ruta del archivo (ej: /Users/.../prototypes/canvas-encuestas.html)
 * @returns URL del template (ej: http://localhost:3000/canvas-encuestas.html)
 */
export function getTemplateUrlFromPath(filePath: string): string {
	const fileName = path.basename(filePath);
	return `http://localhost:3000/${fileName}`;
}

/**
 * Instrucciones para que el agente recargue automáticamente
 * 
 * ⚠️ IMPORTANTE: El agente debe usar estas instrucciones después de guardar archivos
 * 
 * Ejemplo de uso:
 * ```typescript
 * // Después de usar write() o search_replace() en prototypes/
 * if (shouldAutoReload(filePath)) {
 *   // 1. Obtener URL actual del navegador
 *   const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
 *   const currentUrl = snapshot?.url || getTemplateUrlFromPath(filePath);
 *   
 *   // 2. Recargar la página
 *   await mcp_cursor-ide-browser_browser_navigate({ url: currentUrl });
 *   
 *   // 3. Esperar un momento y tomar snapshot para verificar
 *   setTimeout(async () => {
 *     await mcp_cursor-ide-browser_browser_snapshot();
 *   }, 1000);
 * }
 * ```
 */
export const AUTO_RELOAD_INSTRUCTIONS = `
⚠️ REGLA CRÍTICA: Recarga Automática después de Guardar Archivos

Cuando guardes un archivo en prototypes/ (HTML, JS o CSS), DEBES:

1. Verificar si debe recargarse:
   - Si el archivo está en prototypes/
   - Si es .html, .js o .css
   - Usar: shouldAutoReload(filePath)

2. Obtener URL actual del navegador:
   const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
   const currentUrl = snapshot?.url || getTemplateUrlFromPath(filePath);

3. Recargar la página:
   await mcp_cursor-ide-browser_browser_navigate({ url: currentUrl });

4. Esperar y verificar:
   setTimeout(async () => {
     await mcp_cursor-ide-browser_browser_snapshot();
   }, 1000);

⚠️ IMPORTANTE:
- NO preguntes al usuario si debe recargarse
- NO esperes confirmación
- Ejecuta automáticamente después de guardar archivos en prototypes/
- Esto permite ver los cambios inmediatamente sin recargar manualmente
`;




