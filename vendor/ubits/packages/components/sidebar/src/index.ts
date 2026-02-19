/**
 * @ubits/sidebar
 * Export público del add-on Sidebar
 */

export { renderSidebar, createSidebar, updateActiveSidebarButton } from './SidebarProvider';
export type {
	SidebarOptions,
	SidebarButton,
	SidebarFooterButton,
	ProfileMenuItem,
	SidebarVariant,
	SidebarButtonState,
} from './types/SidebarOptions';

// Auto-inicializar si se importa directamente
// Auto-inicializar si se importa directamente
// if (typeof window !== 'undefined') {
// 	window.UBITS = window.UBITS || {};
// 	window.UBITS.Sidebar = { renderSidebar, createSidebar, updateActiveSidebarButton };
// 
// 	// Exponer globalmente para compatibilidad
// 	(window as any).createSidebar = createSidebar;
// 	(window as any).renderSidebar = renderSidebar;
// 	(window as any).updateActiveSidebarButton = updateActiveSidebarButton;
// 
// 	console.log('✅ [DEBUG] UBITS Sidebar component ready (IIFE executed)');
// 	console.log('✅ [DEBUG] window.UBITS.Sidebar exists:', !!window.UBITS.Sidebar);
// 	console.log('✅ [DEBUG] window.createSidebar exists:', !!(window as any).createSidebar);
// }
