import { createDrawer, renderDrawer } from './DrawerProvider';
import type { DrawerOptions } from './types/DrawerOptions';
import './styles/drawer.css';

export { createDrawer, renderDrawer };
export type { DrawerOptions };

// Exponer globalmente para el playground y otros usos directos
if (typeof window !== 'undefined') {
  (window as any).createDrawer = createDrawer;
  (window as any).renderDrawer = renderDrawer;
}

