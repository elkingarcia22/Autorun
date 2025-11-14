/**
 * Tipos TypeScript para el componente Simple Card
 */

export interface SimpleCardButton {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export interface SimpleCardOptions {
  // Contenido
  title: string;
  subtitle?: string;
  content?: string;
  
  // Header
  showHeader?: boolean;
  headerBackground?: string; // Token CSS o color
  headerDecorations?: boolean; // Mostrar burbujas decorativas
  
  // Tokens
  backgroundColor?: string; // Token CSS
  borderColor?: string; // Token CSS
  borderRadius?: string; // Token CSS
  padding?: string; // Token CSS
  
  // Tipografía
  titleTypography?: 'ubits-heading-h1' | 'ubits-heading-h2' | 'ubits-body-lg' | 'ubits-body-md' | 'ubits-body-sm';
  subtitleTypography?: 'ubits-body-lg' | 'ubits-body-md' | 'ubits-body-sm';
  contentTypography?: 'ubits-body-md' | 'ubits-body-sm';
  
  // Botones
  buttons?: SimpleCardButton[];
  showButtons?: boolean;
  
  // Variantes
  variant?: 'default' | 'elevated' | 'bordered' | 'flat';
  
  // Tamaño
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  // Ancho máximo (opcional, se deriva del size si no se proporciona)
  maxWidth?: string;
  
  // Clases adicionales
  className?: string;
}

