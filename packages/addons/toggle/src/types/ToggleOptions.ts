/**
 * Opciones para crear un Toggle/Switch
 */
export interface ToggleOptions {
  /**
   * Texto del label del toggle
   */
  label?: string;
  
  /**
   * Texto complementario opcional (se muestra debajo del label)
   */
  complementaryText?: string;
  
  /**
   * Valor del toggle
   */
  value?: string;
  
  /**
   * Nombre del toggle (para agrupar toggles)
   */
  name?: string;
  
  /**
   * Si el toggle está activado (checked)
   */
  checked?: boolean;
  
  /**
   * Tamaño del toggle
   */
  size?: 'sm' | 'md';
  
  /**
   * Estado del toggle
   */
  state?: 'default' | 'hover' | 'active' | 'disabled';
  
  /**
   * Si el toggle está deshabilitado
   */
  disabled?: boolean;
  
  /**
   * Callback cuando cambia el estado del toggle
   */
  onChange?: (event: Event) => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * ID del contenedor donde se renderizará el toggle
   */
  containerId?: string;
}

