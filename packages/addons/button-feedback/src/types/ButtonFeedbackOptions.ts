/**
 * Opciones para crear un ButtonFeedback
 */
export interface ButtonFeedbackOptions {
  /**
   * ID del contenedor donde se renderizará el botón flotante
   */
  containerId?: string;

  /**
   * Texto del botón flotante (opcional)
   */
  text?: string;

  /**
   * Icono del botón flotante
   * @default 'comment-dots'
   */
  icon?: string;

  /**
   * Posición del botón flotante
   * @default 'bottom-right'
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

  /**
   * Offset desde el borde (en píxeles)
   * @default 24
   */
  offset?: number;

  /**
   * Título del modal de feedback
   * @default 'Deja tu Feedback'
   */
  modalTitle?: string;

  /**
   * Opciones para el select de sección
   */
  sectionOptions?: Array<{
    value: string;
    text: string;
  }>;

  /**
   * Valor por defecto del select de sección
   */
  defaultSection?: string;

  /**
   * Placeholder del textarea de comentarios
   */
  commentPlaceholder?: string;

  /**
   * URL del endpoint de n8n para enviar el feedback
   */
  n8nWebhookUrl?: string;

  /**
   * Callback cuando se envía el feedback exitosamente
   */
  onFeedbackSent?: (data: {
    section: string;
    comment: string;
  }) => void;

  /**
   * Callback cuando se cancela el feedback
   */
  onCancel?: () => void;

  /**
   * Callback cuando se cierra el modal
   */
  onClose?: () => void;

  /**
   * Si el botón está visible inicialmente
   * @default true
   */
  visible?: boolean;

  /**
   * Clases CSS adicionales
   */
  className?: string;
}

