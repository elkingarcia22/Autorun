export { renderTooltip, createTooltip } from './TooltipProvider';
export type { TooltipOptions } from './types/TooltipOptions';

// Exponer globalmente si estamos en un entorno de navegador
if (typeof window !== 'undefined') {
  (window as any).createTooltip = createTooltip;
  (window as any).renderTooltip = renderTooltip;

  // También exponer en UBITSTooltip para compatibilidad
  if (!(window as any).UBITSTooltip) {
    (window as any).UBITSTooltip = {};
  }
  (window as any).UBITSTooltip.createTooltip = createTooltip;
  (window as any).UBITSTooltip.renderTooltip = renderTooltip;
}

