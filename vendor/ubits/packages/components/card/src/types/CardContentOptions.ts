/**
 * Tipos TypeScript para el componente Card Content
 */

// Tipos de contenido disponibles (11 tipos)
export type ContentType =
  | 'Curso'
  | 'Cápsula'
  | 'Charla'
  | 'Artículo'
  | 'Podcast'
  | 'Libro'
  | 'Ideas de libro'
  | 'Caso de estudio'
  | 'Documento técnico'
  | 'Ejercicios de práctica'
  | 'Ruta de aprendizaje';

// Niveles disponibles
export type Level = 'Básico' | 'Intermedio' | 'Avanzado';

// Estados disponibles
export type CardStatus = 'default' | 'progress' | 'completed';

// Idiomas disponibles
export type Language = 'Español' | 'Inglés' | 'Portugués';

// Competencias oficiales UBITS (35 competencias)
export type Competency =
  | 'Accountability'
  | 'Administración de negocios'
  | 'Agilidad'
  | 'Comunicación'
  | 'Cumplimiento (Compliance)'
  | 'Data skills'
  | 'Desarrollo de software'
  | 'Desarrollo web'
  | 'Digital skills'
  | 'e-Commerce'
  | 'Emprendimiento'
  | 'Experiencia del cliente'
  | 'Gestión de procesos y operaciones'
  | 'Gestión de proyectos'
  | 'Gestión de recursos tecnológicos'
  | 'Gestión del cambio'
  | 'Gestión del riesgo'
  | 'Gestión financiera'
  | 'Herramientas tecnológicas'
  | 'Inglés'
  | 'Innovación'
  | 'Inteligencia emocional'
  | 'Lenguajes de Programación'
  | 'Liderazgo'
  | 'Marketing'
  | 'Marketing digital'
  | 'Negociación'
  | 'People management'
  | 'Product design'
  | 'Productividad'
  | 'Resolución de problemas'
  | 'Trabajo en equipo'
  | 'Ventas'
  | 'Wellness';

// Datos de una card individual
export interface CardData {
  type: ContentType;
  title: string;
  provider: string;
  providerLogo: string;
  duration: string;
  level: Level;
  progress: number; // 0-100
  status: CardStatus;
  image: string;
  competency: Competency;
  language: Language;
}

// Opciones para cargar múltiples cards
export interface CardContentOptions {
  containerId?: string;
  container?: HTMLElement;
  cards: CardData[];
  onClick?: (card: CardData, index: number, element: HTMLElement) => void;
}

