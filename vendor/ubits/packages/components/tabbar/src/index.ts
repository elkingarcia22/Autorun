/**
 * TabBar Add-on
 * Componente de navegación inferior para móviles
 * Incluye Floating Menu (accordions) y Profile Menu como subcomponentes
 */

export { renderTabBar, createTabBar } from './TabBarProvider';
export {
	defaultFloatingMenuSections,
	defaultProfileMenuItems,
} from './configs/defaultFloatingMenu';
export type {
	TabBarOptions,
	TabBarItem,
	FloatingMenuSection,
	ProfileMenuItem,
} from './types/TabBarOptions';

// Auto-inicializar si se importa directamente
// if (typeof window !== 'undefined') {
// 	window.UBITS = window.UBITS || {};
// 	window.UBITS.TabBar = { renderTabBar, createTabBar };
// 
// 	// Exponer globalmente para compatibilidad
// 	(window as any).createTabBar = createTabBar;
// 	(window as any).renderTabBar = renderTabBar;
// 
// 	console.log('✅ UBITS TabBar component ready');
// }
