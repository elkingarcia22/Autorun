/**
 * Active File Detector
 *
 * Detecta automáticamente qué archivo está abierto en el browser de Cursor
 * y lo guarda para referencia futura
 */

import * as path from 'path';
import * as fs from 'fs/promises';

const ACTIVE_FILE_STATE_PATH = path.join(
  process.cwd(),
  '.autorun',
  'active-file.json'
);

export interface ActiveFileState {
  filePath: string;
  fileName: string;
  url: string;
  lastDetected: string;
}

/**
 * Obtiene el archivo activo desde el browser
 * ⚠️ IMPORTANTE: Esta función debe ser llamada por el agente usando browser_snapshot
 */
export async function detectActiveFileFromBrowser(
  browserUrl: string | null
): Promise<ActiveFileState | null> {
  if (!browserUrl) {
    return null;
  }

  // Extraer nombre del archivo de la URL
  // Ejemplo: http://localhost:3000/canvas-administrador-encuestas-2025-12-22.html
  const urlMatch = browserUrl.match(/\/([^\/]+\.html)$/);
  if (!urlMatch) {
    return null;
  }

  const fileName = urlMatch[1];
  const filePath = path.join(process.cwd(), 'prototypes', fileName);

  // Verificar que el archivo existe
  try {
    await fs.access(filePath);
  } catch {
    return null;
  }

  const state: ActiveFileState = {
    filePath,
    fileName,
    url: browserUrl,
    lastDetected: new Date().toISOString(),
  };

  // Guardar estado
  await saveActiveFileState(state);

  return state;
}

/**
 * Guarda el estado del archivo activo
 */
async function saveActiveFileState(state: ActiveFileState): Promise<void> {
  try {
    const dir = path.dirname(ACTIVE_FILE_STATE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      ACTIVE_FILE_STATE_PATH,
      JSON.stringify(state, null, 2),
      'utf-8'
    );
    console.log(
      `✅ [Active File Detector] Archivo activo guardado: ${state.fileName}`
    );
  } catch (error) {
    console.error(`❌ [Active File Detector] Error guardando estado:`, error);
  }
}

/**
 * Lee el estado del archivo activo
 */
export async function getActiveFileState(): Promise<ActiveFileState | null> {
  try {
    const content = await fs.readFile(ACTIVE_FILE_STATE_PATH, 'utf-8');
    return JSON.parse(content) as ActiveFileState;
  } catch {
    return null;
  }
}

/**
 * Verifica si un archivo es el archivo activo
 */
export async function isActiveFile(filePath: string): Promise<boolean> {
  const state = await getActiveFileState();
  if (!state) {
    return false;
  }

  const normalizedPath = path.normalize(filePath);
  const normalizedStatePath = path.normalize(state.filePath);

  return normalizedPath === normalizedStatePath;
}
