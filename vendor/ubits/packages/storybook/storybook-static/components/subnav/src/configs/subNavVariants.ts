/**
 * Configuraciones predefinidas para las variantes del SubNav
 */

import type { SubNavTab } from '../types/SubNavOptions';

/**
 * Configuración de variantes del SubNav
 */
export const SUBNAV_VARIANTS: Record<string, { name: string; tabs: SubNavTab[] }> = {
  template: {
    name: 'Plantilla',
    tabs: [
      { id: 'section1', label: 'Sección 1', icon: 'far fa-home' },
      { id: 'section2', label: 'Sección 2', icon: 'far fa-book' },
      { id: 'section3', label: 'Sección 3', icon: 'far fa-chart-line' },
      { id: 'section4', label: 'Sección 4', icon: 'far fa-cog' },
      { id: 'section5', label: 'Sección 5', icon: 'far fa-star' }
    ]
  },
  aprendizaje: {
    name: 'Aprendizaje',
    tabs: [
      { id: 'home', label: 'Inicio', icon: 'far fa-home', url: 'home-learn.html' },
      { id: 'catalog', label: 'Catálogo', icon: 'far fa-book', url: 'catalogo.html' },
      { id: 'corporate', label: 'U. Corporativa', icon: 'far fa-building-columns', url: 'u-corporativa.html' },
      { id: 'study-zone', label: 'Zona de estudio', icon: 'far fa-books', url: 'zona-estudio.html' }
    ]
  },
  desempeno: {
    name: 'Desempeño',
    tabs: [
      { id: 'evaluations', label: 'Evaluaciones 360', icon: 'far fa-chart-pie', url: 'evaluaciones-360.html' },
      { id: 'objectives', label: 'Objetivos', icon: 'far fa-bullseye', url: 'objetivos.html' },
      { id: 'metrics', label: 'Métricas', icon: 'far fa-chart-line', url: 'metricas.html' },
      { id: 'reports', label: 'Reportes', icon: 'far fa-file-chart-line', url: 'reportes.html' }
    ]
  },
  encuestas: {
    name: 'Encuestas',
    tabs: [
      { id: 'encuestas', label: 'Encuestas', icon: 'far fa-clipboard-list-check', url: 'encuestas.html' }
    ]
  },
  tareas: {
    name: 'Tareas',
    tabs: [
      { id: 'plans', label: 'Planes', icon: 'far fa-layer-group', url: 'planes.html' },
      { id: 'tasks', label: 'Tareas', icon: 'far fa-tasks', url: 'tareas.html' }
    ]
  },
  empresa: {
    name: 'Empresa',
    tabs: [
      { id: 'gestion-usuarios', label: 'Gestión de usuarios', icon: 'far fa-users' },
      { id: 'organigrama', label: 'Organigrama', icon: 'far fa-sitemap' },
      { id: 'datos-empresa', label: 'Datos de empresa', icon: 'far fa-building' },
      { id: 'personalizacion', label: 'Personalización', icon: 'far fa-paint-brush' },
      { id: 'roles-permisos', label: 'Roles y permisos', icon: 'far fa-user-shield' },
      { id: 'comunicaciones', label: 'Comunicaciones', icon: 'far fa-envelope' }
    ]
  },
  'admin-aprendizaje': {
    name: 'Aprendizaje',
    tabs: [
      { id: 'lms-cursos', label: 'LMS - Cursos propios', icon: 'far fa-book' },
      { id: 'plan-formacion', label: 'Plan de formación', icon: 'far fa-clipboard-list-check' },
      { id: 'certificados', label: 'Certificados', icon: 'far fa-file-certificate' },
      { id: 'metricas-empresa', label: 'Métricas de empresa', icon: 'far fa-chart-line' }
    ]
  },
  'admin-desempeno': {
    name: 'Desempeño',
    tabs: [
      { id: 'evaluations', label: 'Evaluaciones 360', icon: 'far fa-chart-pie' },
      { id: 'objectives', label: 'Objetivos', icon: 'far fa-bullseye' },
      { id: 'matriz-talento', label: 'Matriz de Talento', icon: 'far fa-sitemap' }
    ]
  }
};

/**
 * Helper para obtener la configuración según la variante
 */
export function getSubNavConfig(variant: string): { name: string; tabs: SubNavTab[] } {
  return SUBNAV_VARIANTS[variant] || SUBNAV_VARIANTS.template;
}

