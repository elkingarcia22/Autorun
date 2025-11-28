/**
 * Tipos TypeScript para el componente Button AI
 */

export type ButtonAIVariant = 'primary' | 'secondary';

export type ButtonAISize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonAIOptions {
  /**
   * Variante del botón
   * @default 'primary'
   */
  variant?: ButtonAIVariant;

  /**
   * Tamaño del botón
   * @default 'md'
   */
  size?: ButtonAISize;

  /**
   * Texto del botón
   */
  text?: string;

  /**
   * Icono (nombre de FontAwesome sin el prefijo 'fa-')
   * @example 'sparkles' para 'fa-sparkles'
   */
  icon?: string;

  /**
   * Estilo del icono FontAwesome
   * @default 'regular' (far)
   */
  iconStyle?: 'regular' | 'solid';

  /**
   * Solo icono, sin texto
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Botón deshabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * Mostrar badge de notificación
   * @default false
   */
  badge?: boolean;

  /**
   * Modificador active/outline
   * @default false
   */
  active?: boolean;

  /**
   * Atributos HTML adicionales
   */
  attributes?: Record<string, string>;

  /**
   * Clases CSS adicionales
   */
  className?: string;

  /**
   * Handler de click
   */
  onClick?: (event: MouseEvent) => void;
}

