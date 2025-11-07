/**
 * Interfaz para add-ons de componentes UI
 * 
 * Los add-ons de componentes (button, sidebar, input, etc.) implementan
 * esta interfaz que extiende IAddon con funcionalidades específicas
 * de componentes.
 */

import { IAddon } from './IAddon';

export interface ComponentDefinition {
  /** Nombre del componente */
  name: string;
  
  /** Tag del web component (ej: 'ubits-button') */
  tag?: string;
  
  /** Ruta al archivo del componente */
  path?: string;
  
  /** Estilos asociados al componente */
  styles?: string[];
}

/**
 * Interfaz para add-ons de componentes UI
 */
export interface IComponentAddon extends IAddon {
  type: 'component';
  
  /**
   * Obtiene los componentes que este add-on proporciona
   */
  getComponents(): ComponentDefinition[];
  
  /**
   * Obtiene los estilos que este add-on requiere
   */
  getStyles(): string[];
  
  /**
   * Registra los componentes en el sistema
   * Se llama después de initialize()
   */
  registerComponents?(): Promise<void>;
}

