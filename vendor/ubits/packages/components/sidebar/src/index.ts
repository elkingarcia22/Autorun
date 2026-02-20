/**
 * @ubits/sidebar
 * Export público del add-on Sidebar
 */

import { renderSidebar, createSidebar, updateActiveSidebarButton } from './SidebarProvider';

export { renderSidebar, createSidebar, updateActiveSidebarButton };
export type {
	SidebarOptions,
	SidebarButton,
	SidebarFooterButton,
	ProfileMenuItem,
	SidebarVariant,
	SidebarButtonState,
} from './types/SidebarOptions';

// Auto-inicializar si se importa directamente
if (typeof window !== 'undefined') {
	let w = window as any;
	w.UBITS = w.UBITS || {};
	w.UBITS.Sidebar = { ...(w.UBITS.Sidebar || {}), renderSidebar, createSidebar, updateActiveSidebarButton };

	// Exponer globalmente para compatibilidad
	w.createSidebar = createSidebar;
	w.renderSidebar = renderSidebar;
	w.updateActiveSidebarButton = updateActiveSidebarButton;

	console.log('✅ [DEBUG] UBITS Sidebar component ready');
	window.dispatchEvent(new Event('ubits:ready'));
}
