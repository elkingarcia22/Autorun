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
  SidebarButtonState
} from './types/SidebarOptions';

// Auto-inicializar si se importa directamente
if (typeof window !== 'undefined') {
  console.log('✅ UBITS Sidebar component ready');
}

