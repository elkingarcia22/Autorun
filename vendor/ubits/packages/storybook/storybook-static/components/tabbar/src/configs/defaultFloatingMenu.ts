/**
 * Configuración por defecto del Floating Menu
 * Basada en la configuración del playground anterior
 */

import type { FloatingMenuSection, ProfileMenuItem } from '../types/TabBarOptions';

export const defaultFloatingMenuSections: FloatingMenuSection[] = [
  {
    id: 'aprendizaje',
    title: 'Aprendizaje',
    icon: 'graduation-cap',
    subitems: [
      { id: 'inicio', title: 'Inicio', icon: 'home', url: 'home-learn.html' },
      { id: 'catalogo', title: 'Catálogo', icon: 'book', url: 'catalogo.html' },
      { id: 'corporativa', title: 'U. Corporativa', icon: 'building-columns', url: 'u-corporativa.html' },
      { id: 'zona-estudio', title: 'Zona de estudio', icon: 'books', url: 'zona-estudio.html' }
    ]
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico',
    icon: 'chart-mixed',
    url: 'diagnostico.html',
    isLink: true,
    clickable: true
  },
  {
    id: 'desempeno',
    title: 'Desempeño',
    icon: 'bars-progress',
    subitems: [
      { id: 'evaluaciones-360', title: 'Evaluaciones 360', icon: 'chart-pie', url: 'evaluaciones-360.html' },
      { id: 'objetivos', title: 'Objetivos', icon: 'bullseye', url: 'objetivos.html' },
      { id: 'metricas', title: 'Métricas', icon: 'chart-line', url: 'metricas.html' },
      { id: 'reportes', title: 'Reportes', icon: 'file-chart-line', url: 'reportes.html' }
    ]
  },
  {
    id: 'encuestas',
    title: 'Encuestas',
    icon: 'clipboard-list-check',
    url: 'encuestas.html',
    isLink: true,
    clickable: false
  },
  {
    id: 'reclutamiento',
    title: 'Reclutamiento',
    icon: 'users',
    url: 'reclutamiento.html',
    isLink: true,
    clickable: true
  },
  {
    id: 'tareas',
    title: 'Tareas',
    icon: 'layer-group',
    subitems: [
      { id: 'planes', title: 'Planes', icon: 'calendar', url: 'planes.html' },
      { id: 'tareas', title: 'Tareas', icon: 'tasks', url: 'tareas.html' }
    ]
  },
  {
    id: 'ubits-ai',
    title: 'UBITS AI',
    icon: 'sparkles',
    url: 'ubits-ai.html',
    isLink: true,
    clickable: true
  }
];

export const defaultProfileMenuItems: ProfileMenuItem[] = [
  {
    id: 'ver-perfil',
    label: 'Ver mi perfil',
    icon: 'user',
    url: 'profile.html'
  },
  {
    id: 'cambio-contraseña',
    label: 'Cambio de contraseña',
    icon: 'key',
    onClick: () => {
      // Sin acción
    }
  },
  {
    id: 'cerrar-sesion',
    label: 'Cerrar sesión',
    icon: 'sign-out-alt',
    onClick: () => {
      // Sin acción
    }
  }
];

