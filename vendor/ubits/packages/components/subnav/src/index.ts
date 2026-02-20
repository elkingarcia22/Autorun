/**
 * @ubits/subnav
 * Export público del add-on SubNav
 */

import { renderSubNav, createSubNav, updateActiveSubNavTab } from './SubNavProvider';
import { getSubNavConfig, SUBNAV_VARIANTS } from './configs/subNavVariants';

export { renderSubNav, createSubNav, updateActiveSubNavTab };
export { getSubNavConfig, SUBNAV_VARIANTS };
export type {
	SubNavOptions,
	SubNavTab,
	SubNavVariant,
} from './types/SubNavOptions';

// Auto-inicializar si se importa directamente
if (typeof window !== 'undefined') {
	let w = window as any;
	w.UBITS = w.UBITS || {};
	w.UBITS.SubNav = { ...(w.UBITS.SubNav || {}), renderSubNav, createSubNav, updateActiveSubNavTab };

	// Exponer globalmente para compatibilidad
	w.createSubNav = createSubNav;
	w.renderSubNav = renderSubNav;
	w.updateActiveSubNavTab = updateActiveSubNavTab;

	console.log('✅ UBITS SubNav component ready');
	window.dispatchEvent(new Event('ubits:ready'));
}
