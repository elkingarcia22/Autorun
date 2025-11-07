/**
 * AddonRegistry
 * 
 * Registro central de todos los add-ons disponibles en el sistema.
 * Permite registrar, obtener y listar add-ons.
 */

import { IAddon } from './interfaces/IAddon';

export class AddonRegistry {
  private addons: Map<string, IAddon> = new Map();

  /**
   * Registra un add-on en el registro
   * @param addon Add-on a registrar
   * @throws Error si el add-on ya está registrado
   */
  register(addon: IAddon): void {
    if (this.addons.has(addon.id)) {
      throw new Error(`Add-on ${addon.id} ya está registrado`);
    }
    this.addons.set(addon.id, addon);
  }

  /**
   * Obtiene un add-on por su ID
   * @param addonId ID del add-on
   * @returns Add-on encontrado o undefined
   */
  get(addonId: string): IAddon | undefined {
    return this.addons.get(addonId);
  }

  /**
   * Obtiene todos los add-ons registrados
   * @returns Array de todos los add-ons
   */
  getAll(): IAddon[] {
    return Array.from(this.addons.values());
  }

  /**
   * Verifica si un add-on está registrado
   * @param addonId ID del add-on
   * @returns true si está registrado, false en caso contrario
   */
  has(addonId: string): boolean {
    return this.addons.has(addonId);
  }

  /**
   * Remueve un add-on del registro
   * @param addonId ID del add-on a remover
   */
  unregister(addonId: string): void {
    this.addons.delete(addonId);
  }

  /**
   * Limpia el registro (remueve todos los add-ons)
   */
  clear(): void {
    this.addons.clear();
  }

  /**
   * Obtiene el número de add-ons registrados
   * @returns Número de add-ons
   */
  size(): number {
    return this.addons.size;
  }
}

