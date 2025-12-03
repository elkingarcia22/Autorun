export { renderMask, createMask } from './MaskProvider';
export type { MaskOptions } from './types/MaskOptions';

// Exponer globalmente para UMD
if (typeof window !== 'undefined') {
	(window as any).createMask = createMask;
	(window as any).renderMask = renderMask;

	// También exponer en UBITSMask para compatibilidad
	if (!(window as any).UBITSMask) {
		(window as any).UBITSMask = {};
	}
	(window as any).UBITSMask.createMask = createMask;
	(window as any).UBITSMask.renderMask = renderMask;
}
