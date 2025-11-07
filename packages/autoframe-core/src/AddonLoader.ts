/**
 * AddonLoader
 * 
 * Cargador de add-ons desde rutas del sistema de archivos.
 * Lee el manifest.json y carga el módulo del add-on.
 */

import { IAddon } from './interfaces/IAddon';
import * as fs from 'fs/promises';
import * as path from 'path';

export class AddonLoader {
  /**
   * Carga un add-on desde una ruta
   * @param addonPath Ruta al directorio del add-on
   * @returns Instancia del add-on
   * @throws Error si no se puede cargar el add-on
   */
  async load(addonPath: string): Promise<IAddon> {
    // TODO: Implementar carga de manifest y módulo
    // Por ahora solo estructura vacía
    
    throw new Error('AddonLoader.load() no implementado todavía');
  }

  /**
   * Valida que un objeto implementa IAddon
   * @param obj Objeto a validar
   * @returns true si implementa IAddon correctamente
   */
  private isValidAddon(obj: any): obj is IAddon {
    return (
      typeof obj.id === 'string' &&
      typeof obj.name === 'string' &&
      typeof obj.version === 'string' &&
      typeof obj.type === 'string' &&
      typeof obj.initialize === 'function' &&
      typeof obj.destroy === 'function' &&
      typeof obj.isActive === 'function'
    );
  }
}

