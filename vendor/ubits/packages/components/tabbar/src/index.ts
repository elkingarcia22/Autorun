/**
 * TabBar Add-on
 * Componente de navegación inferior para móviles
 * Incluye Floating Menu (accordions) y Profile Menu como subcomponentes
 */

import { renderTabBar, createTabBar } from './TabBarProvider';
import {
	defaultFloatingMenuSections,
	defaultProfileMenuItems,
} from './configs/defaultFloatingMenu';

export { renderTabBar, createTabBar };
export { defaultFloatingMenuSections, defaultProfileMenuItems };
export type {
	TabBarOptions,
	TabBarItem,
	FloatingMenuSection,
	ProfileMenuItem,
} from './types/TabBarOptions';

// Auto-inicializar si se importa directamente
if (typeof window !== 'undefined') {
	let w = window as any;
	w.UBITS = w.UBITS || {};
	w.UBITS.TabBar = { ...(w.UBITS.TabBar || {}), renderTabBar, createTabBar };

	// Exponer globalmente para compatibilidad
	w.createTabBar = createTabBar;
	w.renderTabBar = renderTabBar;

	console.log('✅ UBITS TabBar component ready');
	window.dispatchEvent(new Event('ubits:ready'));
}
