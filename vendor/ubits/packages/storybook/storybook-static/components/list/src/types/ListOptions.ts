/**
 * Tipos TypeScript para el componente List
 */

export type ListItemState = 'default' | 'hover' | 'active' | 'disabled';
export type ListSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ListItem {
  /**
   * Texto del item
   */
  label: string;

  /**
   * Estado del item
   * @default 'default'
   */
  state?: ListItemState;

  /**
   * Valor único del item
   */
  value?: string;

  /**
   * Si el item está seleccionado
   * @default false
   */
  selected?: boolean;

  /**
   * Callback cuando se hace clic en el item
   */
  onClick?: (item: ListItem, index: number) => void;

  /**
   * Atributos HTML adicionales
   */
  attributes?: { [key: string]: string };
}

export interface ListOptions {
  /**
   * ID del contenedor donde se renderizará la lista
   */
  containerId: string;

  /**
   * Items de la lista
   */
  items: ListItem[];

  /**
   * Tamaño de la lista (xs, sm, md, lg)
   * @default 'md'
   */
  size?: ListSize;

  /**
   * Altura máxima de la lista (para scroll)
   * @default '400px'
   */
  maxHeight?: string;

  /**
   * Callback cuando cambia la selección
   */
  onSelectionChange?: (selectedItem: ListItem | null, index: number | null) => void;

  /**
   * Si la lista permite selección múltiple
   * @default false
   */
  multiple?: boolean;

  /**
   * Clases CSS adicionales
   */
  className?: string;

  /**
   * Atributos HTML adicionales
   */
  attributes?: { [key: string]: string };
}

