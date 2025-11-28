/**
 * Galería de imágenes para Welcome Pages
 * 50 imágenes de alta resolución de Unsplash
 */

export interface WelcomeImage {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
}

export const WELCOME_IMAGES: WelcomeImage[] = [
  {
    id: '1',
    name: 'Equipo trabajando',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format',
    category: 'team',
    description: 'Equipo colaborando en proyecto'
  },
  {
    id: '2',
    name: 'Oficina moderna',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format',
    category: 'office',
    description: 'Espacio de trabajo moderno'
  },
  {
    id: '3',
    name: 'Tecnología',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop&auto=format',
    category: 'technology',
    description: 'Tecnología y innovación'
  },
  {
    id: '4',
    name: 'Reunión de trabajo',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
    category: 'meeting',
    description: 'Reunión de equipo'
  },
  {
    id: '5',
    name: 'Desarrollo',
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop&auto=format',
    category: 'development',
    description: 'Desarrollo de software'
  },
  {
    id: '6',
    name: 'Creatividad',
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&h=1080&fit=crop&auto=format',
    category: 'creativity',
    description: 'Espacio creativo'
  },
  {
    id: '7',
    name: 'Colaboración',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&auto=format',
    category: 'collaboration',
    description: 'Trabajo en equipo'
  },
  {
    id: '8',
    name: 'Innovación',
    url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop&auto=format',
    category: 'innovation',
    description: 'Innovación y tecnología'
  },
  {
    id: '9',
    name: 'Presentación',
    url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop&auto=format',
    category: 'presentation',
    description: 'Presentación de ideas'
  },
  {
    id: '10',
    name: 'Estrategia',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
    category: 'strategy',
    description: 'Planificación estratégica'
  },
  {
    id: '11',
    name: 'Startup',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop&auto=format',
    category: 'startup',
    description: 'Ambiente startup'
  },
  {
    id: '12',
    name: 'Diseño',
    url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=1080&fit=crop&auto=format',
    category: 'design',
    description: 'Proceso de diseño'
  },
  {
    id: '13',
    name: 'Productividad',
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&auto=format',
    category: 'productivity',
    description: 'Espacio productivo'
  },
  {
    id: '14',
    name: 'Comunicación',
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&h=1080&fit=crop&auto=format',
    category: 'communication',
    description: 'Comunicación efectiva'
  },
  {
    id: '15',
    name: 'Liderazgo',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
    category: 'leadership',
    description: 'Liderazgo empresarial'
  },
  {
    id: '16',
    name: 'Aprendizaje',
    url: 'https://images.unsplash.com/photo-1503676260721-4d00da4a4da4?w=1920&h=1080&fit=crop&auto=format',
    category: 'learning',
    description: 'Ambiente de aprendizaje'
  },
  {
    id: '17',
    name: 'Networking',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=1080&fit=crop&auto=format',
    category: 'networking',
    description: 'Networking profesional'
  },
  {
    id: '18',
    name: 'Workshop',
    url: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1920&h=1080&fit=crop&auto=format',
    category: 'workshop',
    description: 'Taller de trabajo'
  },
  {
    id: '19',
    name: 'Brainstorming',
    url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1920&h=1080&fit=crop&auto=format',
    category: 'brainstorming',
    description: 'Sesión de lluvia de ideas'
  },
  {
    id: '20',
    name: 'Conferencia',
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&h=1080&fit=crop&auto=format',
    category: 'conference',
    description: 'Evento de conferencia'
  },
  {
    id: '21',
    name: 'Coworking',
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop&auto=format',
    category: 'coworking',
    description: 'Espacio coworking'
  },
  {
    id: '22',
    name: 'Mentoría',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format',
    category: 'mentoring',
    description: 'Sesión de mentoría'
  },
  {
    id: '23',
    name: 'Innovación digital',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format',
    category: 'digital',
    description: 'Transformación digital'
  },
  {
    id: '24',
    name: 'Análisis de datos',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format',
    category: 'data',
    description: 'Análisis y visualización'
  },
  {
    id: '25',
    name: 'Marketing',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&auto=format',
    category: 'marketing',
    description: 'Estrategia de marketing'
  },
  {
    id: '26',
    name: 'Ventas',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
    category: 'sales',
    description: 'Equipo de ventas'
  },
  {
    id: '27',
    name: 'Recursos humanos',
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&auto=format',
    category: 'hr',
    description: 'Gestión de talento'
  },
  {
    id: '28',
    name: 'Finanzas',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format',
    category: 'finance',
    description: 'Análisis financiero'
  },
  {
    id: '29',
    name: 'Proyecto',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&auto=format',
    category: 'project',
    description: 'Gestión de proyectos'
  },
  {
    id: '30',
    name: 'Calidad',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&auto=format',
    category: 'quality',
    description: 'Control de calidad'
  },
  {
    id: '31',
    name: 'Satisfacción',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format',
    category: 'satisfaction',
    description: 'Satisfacción del cliente'
  },
  {
    id: '32',
    name: 'Crecimiento',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop&auto=format',
    category: 'growth',
    description: 'Crecimiento empresarial'
  },
  {
    id: '33',
    name: 'Éxito',
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&auto=format',
    category: 'success',
    description: 'Celebración del éxito'
  },
  {
    id: '34',
    name: 'Motivación',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
    category: 'motivation',
    description: 'Equipo motivado'
  },
  {
    id: '35',
    name: 'Objetivos',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&auto=format',
    category: 'goals',
    description: 'Establecimiento de objetivos'
  },
  {
    id: '36',
    name: 'Resultados',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&auto=format',
    category: 'results',
    description: 'Análisis de resultados'
  },
  {
    id: '37',
    name: 'Eficiencia',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format',
    category: 'efficiency',
    description: 'Optimización de procesos'
  },
  {
    id: '38',
    name: 'Transformación',
    url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop&auto=format',
    category: 'transformation',
    description: 'Transformación empresarial'
  },
  {
    id: '39',
    name: 'Competitividad',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format',
    category: 'competitiveness',
    description: 'Ventaja competitiva'
  },
  {
    id: '40',
    name: 'Sostenibilidad',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format',
    category: 'sustainability',
    description: 'Prácticas sostenibles'
  },
  {
    id: '41',
    name: 'Diversidad',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&auto=format',
    category: 'diversity',
    description: 'Equipo diverso'
  },
  {
    id: '42',
    name: 'Inclusión',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&auto=format',
    category: 'inclusion',
    description: 'Ambiente inclusivo'
  },
  {
    id: '43',
    name: 'Bienestar',
    url: 'https://images.unsplash.com/photo-1503676260721-4d00da4a4da4?w=1920&h=1080&fit=crop&auto=format',
    category: 'wellbeing',
    description: 'Bienestar laboral'
  },
  {
    id: '44',
    name: 'Balance',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=1080&fit=crop&auto=format',
    category: 'balance',
    description: 'Balance vida-trabajo'
  },
  {
    id: '45',
    name: 'Desarrollo profesional',
    url: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1920&h=1080&fit=crop&auto=format',
    category: 'development',
    description: 'Crecimiento profesional'
  },
  {
    id: '46',
    name: 'Capacitación',
    url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1920&h=1080&fit=crop&auto=format',
    category: 'training',
    description: 'Programa de capacitación'
  },
  {
    id: '47',
    name: 'Evaluación',
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&h=1080&fit=crop&auto=format',
    category: 'evaluation',
    description: 'Proceso de evaluación'
  },
  {
    id: '48',
    name: 'Feedback',
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop&auto=format',
    category: 'feedback',
    description: 'Sesión de feedback'
  },
  {
    id: '49',
    name: 'Mejora continua',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format',
    category: 'improvement',
    description: 'Mejora continua'
  },
  {
    id: '50',
    name: 'Excelencia',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&auto=format',
    category: 'excellence',
    description: 'Búsqueda de excelencia'
  }
];

/**
 * Obtiene una imagen por ID
 */
export function getImageById(id: string): WelcomeImage | undefined {
  return WELCOME_IMAGES.find(img => img.id === id);
}

/**
 * Obtiene todas las opciones para el control de Storybook
 */
export function getImageOptions(): string[] {
  return WELCOME_IMAGES.map(img => img.id);
}

/**
 * Obtiene el mapeo de IDs a nombres para mostrar en Storybook
 */
export function getImageLabels(): Record<string, string> {
  const labels: Record<string, string> = {};
  WELCOME_IMAGES.forEach(img => {
    labels[img.id] = `${img.name} - ${img.description}`;
  });
  return labels;
}

