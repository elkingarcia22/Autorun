/**
 * Opciones para crear un Avatar
 */
export interface AvatarOptions {
  /**
   * URL de la imagen del avatar (para variante Photo)
   */
  imageUrl?: string;
  
  /**
   * Texto para mostrar como iniciales (para variante Initials)
   * Ej: "JD" para "John Doe"
   */
  initials?: string;
  
  /**
   * Nombre del icono FontAwesome (para variante Icon)
   * Ej: "user", "user-circle"
   */
  icon?: string;
  
  /**
   * Tamaño del avatar
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  
  /**
   * Color del badge (si se proporciona, se muestra el badge)
   * Opciones válidas: colores semánticos que se mapean a variantes del componente Badge
   * Ej: valores semánticos que se convierten a variantes success, error, info, warning, primary
   */
  badgeColor?: string | null;
  
  /**
   * Contenido del badge (número o texto). Si no se proporciona, se muestra solo el punto (dot)
   * Ej: "5", "99+", "Nuevo"
   */
  badgeContent?: string | number | null;
  
  /**
   * Texto alternativo para accesibilidad
   */
  alt?: string;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
  
  /**
   * Callback cuando se hace click en el avatar
   */
  onClick?: (event: MouseEvent) => void;
}

