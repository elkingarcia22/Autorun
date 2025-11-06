export { renderPopover, createPopover } from './PopoverProvider';
export type { PopoverOptions } from './types/PopoverOptions';

// Exponer globalmente para UMD
if (typeof window !== 'undefined') {
  (window as any).createPopover = createPopover;
  (window as any).renderPopover = renderPopover;
  
  // También exponer en UBITSPopover para compatibilidad
  if (!(window as any).UBITSPopover) {
    (window as any).UBITSPopover = {};
  }
  (window as any).UBITSPopover.createPopover = createPopover;
  (window as any).UBITSPopover.renderPopover = renderPopover;
}

