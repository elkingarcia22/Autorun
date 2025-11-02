/**
 * TabBar Add-on
 * Componente de navegación inferior para móviles
 * Incluye Floating Menu (accordions) y Profile Menu como subcomponentes
 */

export { renderTabBar, createTabBar } from './TabBarProvider';
export { defaultFloatingMenuSections, defaultProfileMenuItems } from './configs/defaultFloatingMenu';
export type { 
  TabBarOptions, 
  TabBarItem, 
  FloatingMenuSection, 
  ProfileMenuItem 
} from './types/TabBarOptions';

