import { createScrollbar, renderScrollbar } from './ScrollProvider';
import type { ScrollOptions } from './types/ScrollOptions';
import './styles/scroll.css';

export { createScrollbar, renderScrollbar };
export type { ScrollOptions };

if (typeof window !== 'undefined') {
  (window as any).createScrollbar = createScrollbar;
  (window as any).renderScrollbar = renderScrollbar;
}

