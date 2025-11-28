/**
 * Tipos TypeScript para el componente Segment Control
 */

export interface SegmentItem {
  /**
   * ID único del segmento
   */
  id: string;

  /**
   * Label/texto del segmento
   */
  label: string;

  /**
   * Icono FontAwesome (clase completa, ej: "far fa-home" o "fas fa-grid")
   * Opcional: si no se proporciona, el segmento se renderiza sin icono
   */
  icon?: string;

  /**
   * Si el segmento está activo
   */
  active?: boolean;

  /**
   * URL a la que redirige al hacer click (opcional)
   */
  url?: string;

  /**
   * Callback cuando se hace click (opcional, usado si no hay URL)
   */
  onClick?: (event: MouseEvent) => void;

  /**
   * Si el segmento está deshabilitado
   */
  disabled?: boolean;
}

export interface SegmentControlOptions {
  /**
   * Array de segmentos a mostrar
   */
  segments: SegmentItem[];

  /**
   * ID del segmento activo (opcional, si no se proporciona se usa el primer segmento con active: true)
   */
  activeSegmentId?: string;

  /**
   * Callback cuando cambia el segmento activo
   */
  onSegmentChange?: (segmentId: string, segmentElement: HTMLElement) => void;

  /**
   * Clases CSS adicionales para el contenedor
   */
  className?: string;
}

