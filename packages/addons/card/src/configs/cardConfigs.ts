/**
 * Configuraciones del componente Card Content
 * Todas las opciones disponibles: tipos, competencias, niveles, proveedores, etc.
 */

import type { ContentType, Level, Competency, Language } from '../types/CardContentOptions';

// TIPOS DE CONTENIDO DISPONIBLES (11 tipos)
export const CONTENT_TYPES: ContentType[] = [
  'Curso',
  'Cápsula',
  'Charla',
  'Artículo',
  'Podcast',
  'Libro',
  'Ideas de libro',
  'Caso de estudio',
  'Documento técnico',
  'Ejercicios de práctica',
  'Ruta de aprendizaje'
];

// COMPETENCIAS OFICIALES UBITS (35 competencias)
export const COMPETENCIES: Competency[] = [
  'Accountability',
  'Administración de negocios',
  'Agilidad',
  'Comunicación',
  'Cumplimiento (Compliance)',
  'Data skills',
  'Desarrollo de software',
  'Desarrollo web',
  'Digital skills',
  'e-Commerce',
  'Emprendimiento',
  'Experiencia del cliente',
  'Gestión de procesos y operaciones',
  'Gestión de proyectos',
  'Gestión de recursos tecnológicos',
  'Gestión del cambio',
  'Gestión del riesgo',
  'Gestión financiera',
  'Herramientas tecnológicas',
  'Inglés',
  'Innovación',
  'Inteligencia emocional',
  'Lenguajes de Programación',
  'Liderazgo',
  'Marketing',
  'Marketing digital',
  'Negociación',
  'People management',
  'Product design',
  'Productividad',
  'Resolución de problemas',
  'Trabajo en equipo',
  'Ventas',
  'Wellness'
];

// NIVELES DISPONIBLES (3 niveles con iconos FontAwesome)
export const LEVELS: Record<Level, string> = {
  'Básico': 'far fa-gauge-min',
  'Intermedio': 'far fa-gauge',
  'Avanzado': 'far fa-gauge-max'
};

// TIEMPOS OFICIALES (9 duraciones)
export const DURATIONS: string[] = [
  '15 min',
  '30 min',
  '45 min',
  '60 min',
  '75 min',
  '90 min',
  '120 min',
  '180 min',
  '240 min'
];

// IDIOMAS DISPONIBLES (3 idiomas)
export const LANGUAGES: Language[] = ['Español', 'Inglés', 'Portugués'];

// ESTADOS DISPONIBLES (3 estados)
export interface StatusConfig {
  class: string;
  text: string;
}

export const STATUSES: Record<'default' | 'progress' | 'completed', StatusConfig> = {
  default: { class: '', text: '' },
  progress: { class: 'course-status--progress', text: 'En progreso' },
  completed: { class: 'course-status--completed', text: 'Completado' }
};

// ALIADOS OFICIALES (18 proveedores)
export const PROVIDERS: Record<string, string> = {
  'UBITS': 'assets/images/Favicons/UBITS.jpg',
  'Microsoft': 'assets/images/Favicons/Microsoft.jpg',
  'Hubspot': 'assets/images/Favicons/Hubspot.jpg',
  'Harvard Business Publishing': 'assets/images/Favicons/Harvard-Business-Publishing.jpg',
  'TED': 'assets/images/Favicons/TED.jpg',
  'AWS': 'assets/images/Favicons/AWS.jpg',
  'Universidad de Los Andes': 'assets/images/Favicons/Universidad-de-Los Andes.jpg',
  'Advanced English': 'assets/images/Favicons/Advanced-English.jpg',
  'IE University': 'assets/images/Favicons/IE-University-Publishing.jpg',
  'Código Facilito': 'assets/images/Favicons/Código-Facilito.jpg',
  'Hackers del Talento': 'assets/images/Favicons/Hackers-del-Talento.jpg',
  'All Ears English': 'assets/images/Favicons/All Ears English.jpg',
  'American & British Academy': 'assets/images/Favicons/American & British Academy.jpg',
  'Bureau Veritas': 'assets/images/Favicons/Bureau-Veritas.jpg',
  'Welu': 'assets/images/Favicons/Welu.jpg',
  'Figsha Smart Consulting': 'assets/images/Favicons/Figsha Smart Consulting.jpg',
  'Instafit': 'assets/images/Favicons/Instafit.jpg',
  'WOBI': 'assets/images/Favicons/WOBI.jpg'
};

/**
 * Reglas de negocio: Duraciones recomendadas según tipo
 */
export function getRecommendedDuration(type: ContentType): string {
  if (type === 'Cápsula') return '15 min';
  if (type === 'Artículo') return '15 min';
  if (type === 'Ruta de aprendizaje') return '120 min';
  return '60 min';
}

/**
 * Validación de datos de card
 */
export function validateCardData(cardData: {
  type: string;
  competency: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!CONTENT_TYPES.includes(cardData.type as ContentType)) {
    errors.push(`Tipo de contenido no válido: ${cardData.type}`);
  }

  if (!COMPETENCIES.includes(cardData.competency as Competency)) {
    errors.push(`Competencia no válida: ${cardData.competency}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

