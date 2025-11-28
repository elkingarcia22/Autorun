/**
 * Opciones para crear un empty state
 */
export interface EmptyStateOptions {
  /**
   * Título del empty state
   */
  title: string;
  
  /**
   * Descripción o mensaje del empty state
   */
  description?: string;
  
  /**
   * URL de la imagen/ilustración (opcional)
   */
  imageUrl?: string;
  
  /**
   * Nombre del icono FontAwesome a mostrar (opcional, si no hay imagen)
   */
  icon?: string;
  
  /**
   * Tamaño del icono
   */
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Texto del botón de acción principal (opcional)
   */
  actionLabel?: string;
  
  /**
   * Callback cuando se hace clic en el botón de acción
   */
  onAction?: () => void;
  
  /**
   * Mostrar botón primario
   */
  showPrimaryButton?: boolean;
  
  /**
   * Icono del botón primario (opcional)
   */
  primaryButtonIcon?: string;
  
  /**
   * Mostrar icono en el botón primario
   */
  showPrimaryButtonIcon?: boolean;
  
  /**
   * Texto del botón secundario (opcional)
   */
  secondaryActionLabel?: string;
  
  /**
   * Callback cuando se hace clic en el botón secundario
   */
  onSecondaryAction?: () => void;
  
  /**
   * Mostrar botón secundario
   */
  showSecondaryButton?: boolean;
  
  /**
   * Icono del botón secundario (opcional)
   */
  secondaryButtonIcon?: string;
  
  /**
   * Mostrar icono en el botón secundario
   */
  showSecondaryButtonIcon?: boolean;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Estilos inline adicionales
   */
  style?: string;
}

