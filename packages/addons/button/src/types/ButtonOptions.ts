/**
 * Tipos TypeScript para el componente Button
 */

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';

export interface ButtonOptions {
  /**
   * Variante del botón
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Tamaño del botón
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Texto del botón
   */
  text?: string;

  /**
   * Icono (nombre de FontAwesome sin el prefijo 'fa-')
   * @example 'check' para 'fa-check'
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
   * Estado de carga (muestra spinner)
   * @default false
   */
  loading?: boolean;

  /**
   * Texto durante loading
   */
  loadingText?: string;

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
   * Ancho completo
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Display block
   * @default false
   */
  block?: boolean;

  /**
   * Posición del icono
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';

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

  /**
   * Activar funcionalidad dropdown (muestra lista al hacer click)
   * @default false
   */
  dropdown?: boolean;

  /**
   * Opciones para el dropdown (items de la lista)
   */
  dropdownOptions?: Array<{
    label: string;
    value?: string;
    onClick?: (event: MouseEvent, item: { label: string; value?: string }) => void;
  }>;

  /**
   * Mostrar tooltip al hacer hover (solo para botones icon-only)
   * @default false
   */
  showTooltip?: boolean;

  /**
   * Texto del tooltip (solo para botones icon-only)
   */
  tooltipText?: string;
}

