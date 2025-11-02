/**
 * Configuraciones predefinidas para las variantes del Sidebar
 */

import type { SidebarButton, SidebarFooterButton, ProfileMenuItem } from '../types/SidebarOptions';

/**
 * Botones del body para variante Default (Colaborador)
 */
export const DEFAULT_BODY_BUTTONS: SidebarButton[] = [
  {
    section: 'admin',
    icon: 'fa-laptop',
    tooltip: 'Administrador',
    href: 'admin.html'
  },
  {
    section: 'aprendizaje',
    icon: 'fa-graduation-cap',
    tooltip: 'Aprendizaje',
    href: 'home-learn.html'
  },
  {
    section: 'diagnóstico',
    icon: 'fa-chart-mixed',
    tooltip: 'Diagnóstico',
    href: 'diagnostico.html'
  },
  {
    section: 'desempeño',
    icon: 'fa-bars-progress',
    tooltip: 'Desempeño',
    href: 'evaluaciones-360.html'
  },
  {
    section: 'encuestas',
    icon: 'fa-clipboard',
    tooltip: 'Encuestas',
    href: 'encuestas.html'
  },
  {
    section: 'reclutamiento',
    icon: 'fa-users',
    tooltip: 'Reclutamiento',
    href: 'reclutamiento.html'
  },
  {
    section: 'tareas',
    icon: 'fa-layer-group',
    tooltip: 'Tareas',
    href: 'planes.html'
  },
  {
    section: 'ubits-ai',
    icon: 'fa-sparkles',
    tooltip: 'UBITS AI',
    href: 'ubits-ai.html'
  }
];

/**
 * Botones del body para variante Admin
 */
export const ADMIN_BODY_BUTTONS: SidebarButton[] = [
  {
    section: 'inicio',
    icon: 'fa-house',
    tooltip: 'Inicio',
    href: 'admin.html'
  },
  {
    section: 'empresa',
    icon: 'fa-building',
    tooltip: 'Empresa',
    href: 'admin-empresa.html'
  },
  {
    section: 'aprendizaje',
    icon: 'fa-graduation-cap',
    tooltip: 'Aprendizaje',
    href: 'admin-aprendizaje.html'
  },
  {
    section: 'diagnóstico',
    icon: 'fa-chart-mixed',
    tooltip: 'Diagnóstico',
    href: 'admin-diagnostico.html'
  },
  {
    section: 'desempeño',
    icon: 'fa-bars-progress',
    tooltip: 'Desempeño',
    href: 'admin-desempeño.html'
  },
  {
    section: 'encuestas',
    icon: 'fa-clipboard',
    tooltip: 'Encuestas',
    href: 'admin-encuestas.html'
  }
];

/**
 * Botones del footer para variante Admin
 */
export const ADMIN_FOOTER_BUTTONS: SidebarFooterButton[] = [
  {
    section: 'api',
    icon: 'fa-code',
    tooltip: 'API',
    href: 'admin-api.html',
    id: 'api-button'
  },
  {
    section: 'centro-de-ayuda',
    icon: 'fa-circle-question',
    tooltip: 'Centro de ayuda',
    href: 'admin-help-center.html',
    id: 'help-center-button'
  }
];

/**
 * Items del menú de perfil para variante Default (Colaborador)
 */
export const DEFAULT_PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  {
    icon: 'fa-user',
    label: 'Ver mi perfil',
    href: 'profile.html'
  },
  {
    divider: true
  },
  {
    icon: 'fa-laptop',
    label: 'Modo Administrador',
    href: 'admin.html'
  },
  {
    divider: true
  },
  {
    icon: 'fa-key',
    label: 'Cambio de contraseña',
    onClick: () => {
      // Sin acción
    }
  },
  {
    icon: 'fa-sign-out',
    label: 'Cerrar sesión',
    onClick: () => {
      // Sin acción
    }
  }
];

/**
 * Items del menú de perfil para variante Admin
 */
export const ADMIN_PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  {
    icon: 'fa-user',
    label: 'Ver mi perfil',
    href: 'profile.html'
  },
  {
    divider: true
  },
  {
    icon: 'fa-user-gear',
    label: 'Modo colaborador',
    href: 'profile.html'
  },
  {
    divider: true
  },
  {
    icon: 'fa-key',
    label: 'Cambio de contraseña',
    onClick: () => {
      // Sin acción
    }
  },
  {
    icon: 'fa-sign-out',
    label: 'Cerrar sesión',
    onClick: () => {
      // Sin acción
    }
  }
];

/**
 * Helper para obtener la configuración según la variante
 */
export function getSidebarConfig(variant: 'colaborador' | 'admin') {
  if (variant === 'admin') {
    return {
      bodyButtons: ADMIN_BODY_BUTTONS,
      footerButtons: ADMIN_FOOTER_BUTTONS,
      profileMenuItems: ADMIN_PROFILE_MENU_ITEMS
    };
  }
  
  // Variante colaborador (antes default)
  return {
    bodyButtons: DEFAULT_BODY_BUTTONS,
    footerButtons: [],
    profileMenuItems: DEFAULT_PROFILE_MENU_ITEMS
  };
}

