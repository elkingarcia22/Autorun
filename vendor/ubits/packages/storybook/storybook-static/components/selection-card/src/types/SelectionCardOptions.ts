/**
 * Tipos para el componente SelectionCard
 */

export type SelectionCardState = 'default' | 'selected' | 'disabled';
export type SelectionCardSize = 'sm' | 'md' | 'lg';

export interface SelectionCardData {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  iconStyle?: 'regular' | 'solid';
  image?: string;
  selectionCount?: {
    current: number;
    total: number;
  };
  value?: string | number;
  state?: SelectionCardState;
  size?: SelectionCardSize;
}

export interface SelectionCardOptions {
  containerId: string;
  cards: SelectionCardData[];
  multiple?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedCards: SelectionCardData[], selectedIds: string[]) => void;
  onClick?: (card: SelectionCardData, index: number, element: HTMLElement) => void;
}

