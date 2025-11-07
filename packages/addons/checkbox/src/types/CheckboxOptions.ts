/**
 * Opciones para crear un Checkbox
 */
export interface CheckboxOptions {
  /**
   * Texto del label del checkbox
   */
  label: string;
  
  /**
   * Texto complementario opcional (se muestra debajo del label)
   */
  complementaryText?: string;
  
  /**
   * Valor del checkbox
   */
  value?: string;
  
  /**
   * Nombre del checkbox (para agrupar checkboxes)
   */
  name?: string;
  
  /**
   * Si el checkbox está seleccionado
   */
  checked?: boolean;
  
  /**
   * Si el checkbox está en estado indeterminado (muestra línea horizontal en vez de check)
   */
  indeterminate?: boolean;
  
  /**
   * Tamaño del checkbox
   */
  size?: 'sm' | 'md';
  
  /**
   * Estado del checkbox
   */
  state?: 'default' | 'hover' | 'active' | 'disabled';
  
  /**
   * Si el checkbox está deshabilitado
   */
  disabled?: boolean;
  
  /**
   * Callback cuando cambia el estado del checkbox
   */
  onChange?: (event: Event) => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * ID del contenedor donde se renderizará el checkbox
   */
  containerId?: string;
}

