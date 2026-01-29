/**
 * ✅ BlueprintFromDesign - Convierte DesignModel o LayoutModel → Blueprint estándar
 * 
 * Responsabilidad:
 * - Convertir diseño desde Figma o imagen a Blueprint
 * - Mapear secciones: Header, Filters, KPIs, Main(Data), Empty/Loading
 * - Cada nodo con intent + confidence
 */

import type { DesignModel } from './figma/FigmaIngestor.js';
import type { LayoutModel } from './image/ImageIngestor.js';

export interface Blueprint {
  sections: Array<{
    type: 'header' | 'filters' | 'kpis' | 'main' | 'empty' | 'loading';
    intent: string;
    confidence: number;
    components: Array<{
      componentId?: string;
      componentName: string;
      props?: Record<string, any>;
      confidence: number;
    }>;
  }>;
}

/**
 * ✅ Convierte DesignModel (Figma) → Blueprint
 */
export function blueprintFromFigma(design: DesignModel): Blueprint {
  console.log(`🔍 [BlueprintFromDesign] Convirtiendo DesignModel (Figma) → Blueprint...`);

  const sections: Blueprint['sections'] = [];

  // Mapear instancias de Figma a componentes
  for (const instance of design.instances) {
    // Detectar tipo de sección según componente
    let sectionType: Blueprint['sections'][0]['type'] = 'main';
    let intent = instance.componentName;

    if (instance.componentName.toLowerCase().includes('header')) {
      sectionType = 'header';
      intent = 'Mostrar encabezado de página';
    } else if (instance.componentName.toLowerCase().includes('filter')) {
      sectionType = 'filters';
      intent = 'Permitir filtrar datos';
    } else if (instance.componentName.toLowerCase().includes('kpi') || instance.componentName.toLowerCase().includes('card')) {
      sectionType = 'kpis';
      intent = 'Mostrar métricas clave';
    }

    // Buscar sección existente o crear nueva
    let section = sections.find((s) => s.type === sectionType);
    if (!section) {
      section = {
        type: sectionType,
        intent,
        confidence: 0.8, // Alta confianza desde Figma
        components: [],
      };
      sections.push(section);
    }

    section.components.push({
      componentId: instance.componentId,
      componentName: instance.componentName,
      props: instance.props,
      confidence: 0.8,
    });
  }

  return { sections };
}

/**
 * ✅ Convierte LayoutModel (Image) → Blueprint
 */
export function blueprintFromImage(layout: LayoutModel): Blueprint {
  console.log(`🔍 [BlueprintFromDesign] Convirtiendo LayoutModel (Image) → Blueprint...`);

  const sections: Blueprint['sections'] = [];

  // Mapear secciones detectadas desde imagen
  for (const section of layout.sections) {
    // Mapear tipo de sección
    let sectionType: Blueprint['sections'][0]['type'] = 'main';
    let intent = `Sección ${section.type}`;

    if (section.type === 'header') {
      sectionType = 'header';
      intent = 'Mostrar encabezado de página';
    } else if (section.type === 'filters') {
      sectionType = 'filters';
      intent = 'Permitir filtrar datos';
    } else if (section.type === 'kpis') {
      sectionType = 'kpis';
      intent = 'Mostrar métricas clave';
    } else if (section.type === 'empty') {
      sectionType = 'empty';
      intent = 'Mostrar estado vacío';
    } else if (section.type === 'loading') {
      sectionType = 'loading';
      intent = 'Mostrar estado de carga';
    }

    const components = (section.components || []).map((comp) => ({
      componentId: undefined,
      componentName: comp.componentName,
      props: comp.props,
      confidence: comp.confidence,
    }));

    sections.push({
      type: sectionType,
      intent,
      confidence: section.confidence,
      components,
    });
  }

  return { sections };
}

