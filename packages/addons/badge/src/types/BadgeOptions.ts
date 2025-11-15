/**
 * Opciones para crear un badge
 */
export interface BadgeOptions {
  /**
   * Contenido del badge (número, texto, o undefined/null para solo el punto)
   */
  content?: string | number | null;
  
  /**
   * Tamaño del badge
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  
  /**
   * Tipo de badge: 'dot' (solo bolita sin número) o 'number' (con contenido)
   */
  type?: 'dot' | 'number';
  
  /**
   * Variante de color
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  
  /**
   * Estilo del badge: 'light' (badge y label sin borde), 'neutral' (con borde gris) o 'bold' (fondo de color y texto blanco)
   */
  style?: 'light' | 'neutral' | 'bold';
  
  /**
   * Si el badge debe usar posición absoluta
   */
  absolute?: boolean;
  
  /**
   * Posición cuando es absoluto
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Texto del label que aparece junto al badge
   */
  label?: string;
  
  /**
   * Mostrar u ocultar el label
   */
  showLabel?: boolean;
  
  /**
   * Clase de tipografía UBITS para el label
   */
  labelTypography?: 'ubits-body-sm-regular' | 'ubits-body-sm-semibold' | 'ubits-body-sm-bold' | 
                    'ubits-body-md-regular' | 'ubits-body-md-semibold' | 'ubits-body-md-bold' |
                    'ubits-heading-h1' | 'ubits-heading-h2';
}

