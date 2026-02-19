/**
 * @ubits/subnav
 * Export público del add-on SubNav
 */

export { renderSubNav, createSubNav, updateActiveSubNavTab } from './SubNavProvider';
export type {
	SubNavOptions,
	SubNavTab,
	SubNavVariant,
} from './types/SubNavOptions';
export { getSubNavConfig, SUBNAV_VARIANTS } from './configs/subNavVariants';

// Auto-inicializar si se importa directamente
// if (typeof window !== 'undefined') {
// 	window.UBITS = window.UBITS || {};
// 	window.UBITS.SubNav = { renderSubNav, createSubNav, updateActiveSubNavTab };
// 
// 	// Exponer globalmente para compatibilidad
// 	(window as any).createSubNav = createSubNav;
// 	(window as any).renderSubNav = renderSubNav;
// 	(window as any).updateActiveSubNavTab = updateActiveSubNavTab;
// 
// 	console.log('✅ UBITS SubNav component ready');
// }
