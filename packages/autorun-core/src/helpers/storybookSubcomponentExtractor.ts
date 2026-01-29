/**
 * Extractor de Subcomponentes y Subfuncionalidades desde Storybook
 * 
 * ⭐ OBJETIVO: Extraer información completa de subcomponentes y funcionalidades interactivas
 * 
 * Ejemplos:
 * - Input tipo "calendar" → Componente Calendar (se muestra al hacer clic)
 * - Input tipo "select" → Componente List (usado para mostrar opciones)
 * - Input tipo "autocomplete" → Componente List (usado para mostrar sugerencias)
 */

import { StorybookManager } from './storybookManager';

export interface SubcomponentInfo {
  name: string;
  type: 'external' | 'internal' | 'functional';
  componentId?: string; // ID del componente en Storybook (si es externo)
  trigger: 'click' | 'focus' | 'hover' | 'load' | 'none';
  description?: string;
  props?: Record<string, any>;
  dependencies?: string[];
}

export interface ComponentSubcomponents {
  componentId: string;
  componentName: string;
  subcomponents: SubcomponentInfo[];
  interactiveFeatures: Array<{
    name: string;
    description: string;
    trigger: string;
    requiredProps?: string[];
  }>;
}

/**
 * Extractor de subcomponentes y subfuncionalidades
 */
export class StorybookSubcomponentExtractor {
  /**
   * Extraer subcomponentes y subfuncionalidades de un componente
   * ⭐ MEJORADO: Ahora usa análisis profundo automático
   */
  static async extractSubcomponents(
    componentId: string,
    componentName: string
  ): Promise<ComponentSubcomponents> {
    console.log(
      `🔍 [Subcomponent Extractor] Extrayendo subcomponentes para: ${componentName} (${componentId})`
    );

    const result: ComponentSubcomponents = {
      componentId,
      componentName,
      subcomponents: [],
      interactiveFeatures: [],
    };

    // ⭐ NUEVO: ESTRATEGIA 0 - Análisis profundo automático (PRIMERO)
    try {
      const { DeepComponentAnalyzer } = await import('./deepComponentAnalyzer');
      const deepAnalysis = await DeepComponentAnalyzer.analyzeComponent(
        componentId,
        componentName
      );
      
      // Convertir análisis profundo a formato de subcomponentes
      result.subcomponents.push(...deepAnalysis.subcomponents.map((sub) => ({
        name: sub.name,
        type: sub.type,
        componentId: sub.componentId,
        trigger: sub.trigger,
        description: sub.description,
        props: sub.dependencies?.reduce((acc, dep) => {
          acc[dep.name] = dep.importPath;
          return acc;
        }, {} as Record<string, any>),
      })));
      
      result.interactiveFeatures.push(...deepAnalysis.interactions.map((interaction) => ({
        name: interaction.name,
        description: interaction.description,
        trigger: interaction.trigger,
        requiredProps: interaction.createsSubcomponent ? ['type'] : undefined,
      })));
      
      console.log(
        `   ✅ [Deep Analysis] ${deepAnalysis.subcomponents.length} subcomponentes, ${deepAnalysis.dependencies.length} dependencias, ${deepAnalysis.interactions.length} interacciones`
      );
    } catch (error: any) {
      console.warn(`⚠️ Error en análisis profundo: ${error.message}`);
      // Continuar con otras estrategias
    }

    // ESTRATEGIA 1: Consultar código fuente TypeScript (fallback)
    const sourceSubcomponents = await this.extractFromSourceCode(
      componentId,
      componentName
    );
    result.subcomponents.push(...sourceSubcomponents);

    // ESTRATEGIA 2: Consultar Storybook Docs para información de dependencias
    const docsSubcomponents = await this.extractFromDocs(
      componentId,
      componentName
    );
    result.subcomponents.push(...docsSubcomponents);

    // ESTRATEGIA 3: Interactuar con Storybook para detectar componentes dinámicos
    const interactiveSubcomponents = await this.extractFromInteraction(
      componentId,
      componentName
    );
    result.subcomponents.push(...interactiveSubcomponents);
    result.interactiveFeatures.push(...interactiveSubcomponents.map((sub) => ({
      name: sub.name,
      description: sub.description || '',
      trigger: sub.trigger,
      requiredProps: sub.props ? Object.keys(sub.props) : undefined,
    })));

    // Eliminar duplicados
    result.subcomponents = this.deduplicateSubcomponents(result.subcomponents);

    console.log(
      `✅ [Subcomponent Extractor] ${result.subcomponents.length} subcomponentes encontrados para ${componentName}`
    );

    return result;
  }

  /**
   * Extraer subcomponentes desde código fuente TypeScript
   */
  private static async extractFromSourceCode(
    componentId: string,
    componentName: string
  ): Promise<SubcomponentInfo[]> {
    const subcomponents: SubcomponentInfo[] = [];

    try {
      // Buscar archivo del componente
      const normalizedId = componentId.replace(/-/g, '-');
      const possiblePaths = [
        `vendor/ubits/packages/components/${normalizedId}/src/${normalizedId}Provider.ts`,
        `vendor/ubits/packages/components/${normalizedId}/src/${normalizedId}Provider.js`,
        `vendor/ubits/packages/components/${normalizedId}/src/index.ts`,
        `vendor/ubits/packages/components/${normalizedId}/src/index.js`,
      ];

      for (const filePath of possiblePaths) {
        try {
          const fs = await import('fs/promises');
          const content = await fs.readFile(filePath, 'utf-8');

          // Buscar imports de componentes externos
          const externalImports = this.findExternalComponentImports(content);
          subcomponents.push(...externalImports);

          // Buscar funcionalidades internas
          const internalFeatures = this.findInternalFeatures(content, componentName);
          subcomponents.push(...internalFeatures);

          break; // Si encontramos el archivo, no buscar más
        } catch (error) {
          // Continuar con siguiente path
        }
      }
    } catch (error: any) {
      console.warn(
        `⚠️ Error extrayendo desde código fuente: ${error.message}`
      );
    }

    return subcomponents;
  }

  /**
   * Buscar imports de componentes externos
   */
  private static findExternalComponentImports(
    content: string
  ): SubcomponentInfo[] {
    const subcomponents: SubcomponentInfo[] = [];

    // Buscar imports dinámicos: import('../../calendar/src/CalendarProvider')
    const dynamicImportRegex =
      /import\(['"]([^'"]+)\/([^/]+)\/src\/([^'"]+)['"]\)/g;
    let match;
    while ((match = dynamicImportRegex.exec(content)) !== null) {
      const [, path, componentName, providerName] = match;
      
      // Extraer nombre del componente desde la ruta
      const componentId = componentName.toLowerCase().replace(/\s+/g, '-');
      
      subcomponents.push({
        name: componentName,
        type: 'external',
        componentId,
        trigger: 'click', // Por defecto, se activa con click
        description: `Componente externo cargado dinámicamente: ${componentName}`,
      });
    }

    // Buscar imports estáticos: import { createList, renderList } from '../../list/src/ListProvider'
    const staticImportRegex =
      /import\s+.*?\s+from\s+['"]([^'"]+)\/([^/]+)\/src\/([^'"]+)['"]/g;
    while ((match = staticImportRegex.exec(content)) !== null) {
      const [, path, componentName, providerName] = match;
      
      const componentId = componentName.toLowerCase().replace(/\s+/g, '-');
      
      // ⭐ MEJORADO: Detectar si es List (usado por Input tipo select y autocomplete)
      const isList = componentName.toLowerCase() === 'list';
      const isCalendar = componentName.toLowerCase() === 'calendar';
      
      subcomponents.push({
        name: componentName,
        type: isList ? 'external' : 'external', // List es un componente externo
        componentId,
        trigger: isList ? 'click' : 'load', // List se activa con click (en select/autocomplete)
        description: isList 
          ? `Componente List usado por Input tipo select y autocomplete para mostrar opciones`
          : `Componente externo importado: ${componentName}`,
      });
    }

    return subcomponents;
  }

  /**
   * Buscar funcionalidades internas
   */
  private static findInternalFeatures(
    content: string,
    componentName: string
  ): SubcomponentInfo[] {
    const features: SubcomponentInfo[] = [];

    // Buscar funciones que crean elementos funcionales
    // Ejemplo: createCalendarPicker, createDropdown, etc.
    const functionalFeatureRegex =
      /function\s+create(\w+)\s*\(/g;
    let match;
    while ((match = functionalFeatureRegex.exec(content)) !== null) {
      const featureName = match[1];
      const featureNameLower = featureName.toLowerCase();

      // Determinar tipo y trigger según el nombre
      let type: 'internal' | 'functional' = 'functional';
      let trigger: 'click' | 'focus' | 'hover' | 'load' | 'none' = 'click';

      if (featureNameLower.includes('calendar')) {
        type = 'external';
        trigger = 'click';
      } else if (featureNameLower.includes('selectdropdown') || featureNameLower.includes('selectdropdown')) {
        // ⭐ MEJORADO: createSelectDropdown usa el componente List
        type = 'external';
        trigger = 'click';
        // Buscar si usa createList en el código
        if (content.includes('createList') || content.includes('renderList')) {
          features.push({
            name: 'List',
            type: 'external',
            trigger: 'click',
            description: 'Componente List usado por Input tipo select para mostrar opciones en dropdown',
          });
        }
      } else if (featureNameLower.includes('autocompletedropdown') || featureNameLower.includes('autocomplete')) {
        // ⭐ MEJORADO: createAutocompleteDropdown también usa el componente List
        type = 'external';
        trigger = 'click';
        // Buscar si usa createList en el código
        if (content.includes('createList') || content.includes('renderList')) {
          features.push({
            name: 'List',
            type: 'external',
            trigger: 'click',
            description: 'Componente List usado por Input tipo autocomplete para mostrar sugerencias',
          });
        }
      } else if (featureNameLower.includes('dropdown')) {
        type = 'functional';
        trigger = 'click';
      } else if (featureNameLower.includes('toggle')) {
        type = 'functional';
        trigger = 'click';
      } else if (featureNameLower.includes('search')) {
        type = 'functional';
        trigger = 'focus';
      }

      features.push({
        name: featureName,
        type,
        trigger,
        description: `Funcionalidad interna: ${featureName}`,
      });
    }

    return features;
  }

  /**
   * Extraer subcomponentes desde Docs de Storybook
   */
  private static async extractFromDocs(
    componentId: string,
    componentName: string
  ): Promise<SubcomponentInfo[]> {
    const subcomponents: SubcomponentInfo[] = [];

    try {
      const manager = StorybookManager.getInstance();
      const activeConfig = await manager.getActiveConfig();

      if (!activeConfig) {
        return subcomponents;
      }

      // Construir URL de Docs
      const encodedComponentId = encodeURIComponent(componentId);
      const docsUrl = `${activeConfig.url}/?path=/docs/${encodedComponentId}--docs`;

      // Obtener HTML de Docs
      const response = await fetch(docsUrl);
      if (!response.ok) {
        return subcomponents;
      }

      const html = await response.text();

      // Buscar información de dependencias en el HTML
      // Storybook puede mostrar dependencias en secciones especiales
      const dependencyRegex = /Dependencias?[:\s]*([^<]+)/i;
      const dependencyMatch = html.match(dependencyRegex);
      if (dependencyMatch) {
        const dependencies = dependencyMatch[1]
          .split(',')
          .map((d) => d.trim())
          .filter(Boolean);

        dependencies.forEach((dep) => {
          subcomponents.push({
            name: dep,
            type: 'external',
            trigger: 'load',
            description: `Dependencia mencionada en Docs: ${dep}`,
          });
        });
      }
    } catch (error: any) {
      console.warn(`⚠️ Error extrayendo desde Docs: ${error.message}`);
    }

    return subcomponents;
  }

  /**
   * Extraer subcomponentes interactuando con Storybook
   */
  private static async extractFromInteraction(
    componentId: string,
    componentName: string
  ): Promise<SubcomponentInfo[]> {
    const subcomponents: SubcomponentInfo[] = [];

    // ⚠️ NOTA: Esta función requiere Browser MCP, que debe ser llamado por el agente
    // Por ahora, retornamos información basada en patrones conocidos

    // Patrones conocidos de subcomponentes por tipo de componente
    const knownPatterns: Record<string, SubcomponentInfo[]> = {
      'formularios-input': [
        {
          name: 'Calendar',
          type: 'external',
          componentId: 'formularios-calendar',
          trigger: 'click',
          description:
            'Componente Calendar que se muestra al hacer clic en input tipo calendar',
        },
        {
          name: 'List', // ⭐ CORREGIDO: Es List, no "Dropdown"
          type: 'external',
          componentId: 'formularios-list', // ⭐ NUEVO: ID del componente List
          trigger: 'click',
          description:
            'Componente List usado por Input tipo select y autocomplete para mostrar opciones en dropdown',
          dependencies: ['createList', 'renderList'], // ⭐ NUEVO: Dependencias
        },
        {
          name: 'Password Toggle',
          type: 'functional',
          trigger: 'click',
          description: 'Toggle para mostrar/ocultar contraseña',
        },
        {
          name: 'Search Clear',
          type: 'functional',
          trigger: 'click',
          description: 'Botón para limpiar búsqueda',
        },
      ],
    };

    if (knownPatterns[componentId]) {
      subcomponents.push(...knownPatterns[componentId]);
    }

    return subcomponents;
  }

  /**
   * Eliminar subcomponentes duplicados
   */
  private static deduplicateSubcomponents(
    subcomponents: SubcomponentInfo[]
  ): SubcomponentInfo[] {
    const seen = new Set<string>();
    const unique: SubcomponentInfo[] = [];

    for (const sub of subcomponents) {
      const key = `${sub.name}-${sub.type}-${sub.trigger}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(sub);
      }
    }

    return unique;
  }

  /**
   * Detectar si un componente tiene subcomponentes interactivos
   */
  static async hasInteractiveSubcomponents(
    componentId: string
  ): Promise<boolean> {
    const { StorybookDynamicMapper } = await import('./storybookDynamicMapper');
    const componentName =
      (await StorybookDynamicMapper.storybookIdToComponentName(componentId)) ||
      componentId;

    const subcomponents = await this.extractSubcomponents(
      componentId,
      componentName
    );

    return (
      subcomponents.subcomponents.some((sub) => sub.trigger !== 'none') ||
      subcomponents.interactiveFeatures.length > 0
    );
  }
}

