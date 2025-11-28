/**
 * Opciones para crear un Radio Button
 */
export interface RadioButtonOptions {
  /**
   * Texto del label del radio button
   */
  label: string;
  
  /**
   * Texto complementario opcional (se muestra debajo del label)
   */
  complementaryText?: string;
  
  /**
   * Valor del radio button (para agrupar radio buttons)
   */
  value: string;
  
  /**
   * Nombre del grupo de radio buttons (para agrupar)
   */
  name: string;
  
  /**
   * Si el radio button está seleccionado
   */
  checked?: boolean;
  
  /**
   * Tamaño del radio button
   */
  size?: 'sm' | 'md';
  
  /**
   * Estado del radio button
   */
  state?: 'default' | 'hover' | 'active' | 'disabled';
  
  /**
   * Si el radio button está deshabilitado
   */
  disabled?: boolean;
  
  /**
   * Callback cuando cambia el estado del radio button
   */
  onChange?: (event: Event) => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * ID del contenedor donde se renderizará el radio button
   */
  containerId?: string;
}

