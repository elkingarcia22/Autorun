/**
 * Tipos para el componente Alert
 */

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface AlertAction {
  /**
   * Etiqueta del botón de acción
   */
  label: string;

  /**
   * Función callback cuando se hace clic en el botón de acción
   */
  onClick: () => void;
}

export interface AlertOptions {
  /**
   * Tipo de alert (success, info, warning, error)
   * @default 'success'
   */
  type?: AlertType;

  /**
   * Mensaje del alert (puede incluir HTML básico)
   */
  message?: string;

  /**
   * Si el alert tiene botón de cerrar
   * @default true
   */
  closable?: boolean;

  /**
   * Botón de acción opcional dentro del alert
   */
  action?: AlertAction;

  /**
   * Duración en milisegundos antes de cerrar automáticamente (0 = no auto-close)
   * @default 0
   */
  duration?: number;

  /**
   * Callback llamado cuando el alert se cierra
   */
  onClose?: () => void;

  /**
   * Contenedor donde se insertará el alert (HTMLElement)
   */
  container?: HTMLElement;

  /**
   * Clases CSS adicionales
   */
  className?: string;
}

