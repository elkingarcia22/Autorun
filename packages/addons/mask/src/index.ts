/**
 * @autorun/mask
 * Export público del add-on Mask
 */

export { MaskAddon } from './MaskAddon';
export { renderMask, createMask } from './MaskProvider';
export type { MaskOptions } from './types/MaskOptions';

// Exponer globalmente para UMD
if (typeof window !== 'undefined') {
	(window as any).createMask = createMask;
	(window as any).renderMask = renderMask;
	
	// También exponer en AUTORUNMask para compatibilidad
	if (!(window as any).AUTORUNMask) {
		(window as any).AUTORUNMask = {};
	}
	(window as any).AUTORUNMask.createMask = createMask;
	(window as any).AUTORUNMask.renderMask = renderMask;
}

