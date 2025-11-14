/**
 * Tipos para el componente Accordion UBITS
 */

export type AccordionVariant = 'list' | 'boxed';
export type ChevronPosition = 'left' | 'right';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  subHeader?: string;
  icon?: string;
  iconStyle?: 'regular' | 'solid';
}

export interface AccordionOptions {
  items: AccordionItem[];
  variant?: AccordionVariant;
  chevronPosition?: ChevronPosition;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  showIcons?: boolean;
  className?: string;
}

