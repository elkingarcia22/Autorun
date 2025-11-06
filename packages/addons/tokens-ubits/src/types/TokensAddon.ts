/**
 * Interfaz base para add-ons de tokens
 * Todos los add-ons de tokens deben implementar esta interfaz
 */

export interface AppContext {
  [key: string]: any;
}

/**
 * Interfaz para add-ons de tokens
 */
export interface TokensAddon {
  /**
   * Nombre del add-on
   */
  name: string;

  /**
   * Versión del add-on
   */
  version: string;

  /**
   * Inicializa el add-on (carga tokens CSS en el DOM)
   */
  initialize(context: AppContext): Promise<void>;

  /**
   * Limpia recursos del add-on
   */
  destroy(): void;

  /**
   * Obtiene los tokens CSS que este add-on proporciona
   */
  getTokensCSS(): string;

  /**
   * Obtiene los tokens como objeto JS
   */
  getTokensJS(): Record<string, any>;

  /**
   * Valida que los tokens tengan todas las propiedades requeridas
   */
  validate(): boolean;

  /**
   * Obtiene la lista de tokens disponibles
   */
  getTokenList(): string[];

  /**
   * Verifica si un token específico existe
   */
  hasToken(tokenName: string): boolean;
}

