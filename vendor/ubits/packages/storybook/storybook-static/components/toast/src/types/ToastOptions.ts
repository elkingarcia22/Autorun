/**
 * Tipos para el componente Toast
 */

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastAction {
  /**
   * Etiqueta del botón de acción
   */
  label: string;

  /**
   * Función callback cuando se hace clic en el botón de acción
   */
  onClick: () => void;
}

export interface ToastOptions {
  /**
   * Tipo de toast (success, info, warning, error)
   * @default 'info'
   */
  type?: ToastType;

  /**
   * Título del toast (opcional, se muestra arriba alineado con el botón X)
   */
  title?: string;

  /**
   * Mensaje del toast (cuerpo)
   */
  message: string;

  /**
   * Duración en milisegundos antes de cerrar automáticamente (0 = persistente)
   * Por defecto: success/info (3500ms), warning (5000ms), error (6500ms)
   */
  duration?: number;

  /**
   * Si el toast tiene botón de cerrar
   * @default true
   */
  noClose?: boolean;

  /**
   * Si el timer se pausa cuando el usuario hace hover o focus
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Botón de acción opcional dentro del toast
   */
  action?: ToastAction;

  /**
   * ID del contenedor donde se mostrará el toast
   * @default 'ubits-toast-container'
   */
  containerId?: string;

  /**
   * Callback llamado cuando el toast se cierra
   */
  onClose?: () => void;

  /**
   * Clases CSS adicionales
   */
  className?: string;

  /**
   * Atributos HTML adicionales
   */
  attributes?: { [key: string]: string };
}

