/**
 * Opciones para crear un Status Tag
 */
export interface StatusTagOptions {
  /**
   * Texto del estado
   */
  label: string;
  
  /**
   * Tamaño del tag
   */
  size?: 'xs' | 'sm' | 'md';
  
  /**
   * Estado/variante del tag (determina el color)
   */
  status?: 
    | 'completed' | 'published' | 'fulfilled' | 'created' | 'active' // Verde
    | 'not-fulfilled' | 'denied' // Rojo
    | 'draft' | 'in-progress' | 'syncing' // Azul
    | 'pending' | 'pending-approval' // Naranja/Amarillo
    | 'not-started' | 'finished' | 'archived' | 'disabled' | 'paused' | 'hidden'; // Gris
  
  /**
   * Icono izquierdo (punto de color)
   * Si no se especifica, usa el icono por defecto del estado
   */
  leftIcon?: string;
  
  /**
   * Icono derecho (chevron por defecto)
   * Si es null o undefined, no se muestra icono derecho
   */
  rightIcon?: string | null;
  
  /**
   * Si el tag es clickeable (muestra cursor pointer)
   */
  clickable?: boolean;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Callback cuando se hace click en el tag
   */
  onClick?: (event: MouseEvent) => void;
}

