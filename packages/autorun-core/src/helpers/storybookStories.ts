/**
 * Storybook Stories Helper
 *
 * Sistema para obtener historias de componentes desde Storybook
 * y dividir la implementación por historias
 */

import { getStorybookUrlWithFallback } from './storybookFallback';
import {
  buildSafeStorybookUrl,
  verifyAvailableStories,
} from './verifyStorybookStories';

export interface StorybookStory {
  id: string; // ID completo (ej: "data-data-table--default")
  name: string; // Nombre de la historia (ej: "default")
  title: string; // Título completo (ej: "Data/Data Table")
  url: string; // URL completa de la historia
  description?: string; // Descripción de la historia
}

export interface ComponentStories {
  componentName: string;
  componentId: string; // ID del componente en Storybook (ej: "data-data-table")
  stories: StorybookStory[];
  totalStories: number;
}

/**
 * Obtiene todas las historias de un componente desde Storybook
 *
 * @param componentName - Nombre del componente (ej: "DataTable")
 * @param componentId - ID del componente en Storybook (ej: "data-data-table")
 * @returns Lista de historias del componente
 */
export async function getComponentStories(
  componentName: string,
  componentId?: string
): Promise<ComponentStories> {
  try {
    // Si no se proporciona componentId, intentar mapearlo
    if (!componentId) {
      componentId = mapComponentNameToStorybookId(componentName);
    }

    // Obtener URL base de Storybook con fallback
    const baseUrlResult = await getStorybookUrlWithFallback('', {
      checkAvailability: false,
    });
    const baseUrl = baseUrlResult.url.replace(/\/$/, '');

    // Intentar obtener historias desde index.json de Storybook
    let stories: StorybookStory[] = [];

    try {
      // Intentar obtener desde index.json
      const indexUrl = `${baseUrl}/index.json`;
      const indexResponse = await fetch(indexUrl);

      if (indexResponse.ok) {
        const indexData = await indexResponse.json();
        stories = await extractStoriesFromIndex(indexData, componentId);
      }
    } catch (error) {
      console.warn(
        `⚠️ [Storybook Stories] No se pudo obtener index.json, usando método alternativo:`,
        error
      );
    }

    // Si no se obtuvieron historias, usar método alternativo (navegación en navegador)
    if (stories.length === 0) {
      console.log(
        `📚 [Storybook Stories] Usando método alternativo para obtener historias de ${componentName}`
      );
      stories = await getStoriesFromBrowser(componentId, baseUrl);
    }

    return {
      componentName,
      componentId,
      stories,
      totalStories: stories.length,
    };
  } catch (error) {
    console.error(
      `❌ [Storybook Stories] Error obteniendo historias de ${componentName}:`,
      error
    );
    throw error;
  }
}

/**
 * Extrae historias desde el index.json de Storybook
 */
async function extractStoriesFromIndex(
  indexData: any,
  componentId: string
): Promise<StorybookStory[]> {
  const stories: StorybookStory[] = [];

  if (!indexData.entries) {
    return stories;
  }

  // Buscar todas las entradas que correspondan al componente
  for (const [storyId, entry] of Object.entries(indexData.entries)) {
    if (typeof entry === 'object' && entry !== null) {
      const entryObj = entry as any;

      // Verificar si la historia pertenece al componente
      if (storyId.startsWith(componentId + '--')) {
        const storyName = storyId.split('--')[1] || 'default';
        const title = entryObj.title || componentId;

        stories.push({
          id: storyId,
          name: storyName,
          title: title,
          url: `?path=/story/${storyId}`,
          description: entryObj.parameters?.docs?.description || undefined,
        });
      }
    }
  }

  // ⚠️ FILTRAR historia "default" - tiene todo mezclado, no usar
  const filteredStories = stories.filter((story) => story.name !== 'default');

  // Si no hay historias específicas, crear historias basadas en funcionalidades
  if (filteredStories.length === 0) {
    return await createFunctionalStories(componentId);
  }

  return filteredStories.sort((a, b) => {
    // Ordenar alfabéticamente
    return a.name.localeCompare(b.name);
  });
}

/**
 * Crea historias específicas basadas en funcionalidades del componente
 * ⚠️ NO usa "default" porque tiene todo mezclado
 * ⚠️ CRÍTICO: Verifica que 'default' existe antes de construir URLs
 */
async function createFunctionalStories(
  componentId: string
): Promise<StorybookStory[]> {
  const functionalStories: Record<
    string,
    Record<string, { name: string; description: string; urlParams: string }>
  > = {
    'data-data-table': {
      // Historias específicas del DataTable (una funcionalidad por historia)
      'columnas-reordenables': {
        name: 'Columnas Reordenables',
        description:
          'Implementar funcionalidad de reordenamiento de columnas mediante drag & drop',
        urlParams:
          'columnReorderable=true&columnSortable=false&showCheckbox=false&rowReorderable=false&rowExpandable=false',
      },
      'filas-reordenables': {
        name: 'Filas Reordenables',
        description:
          'Implementar funcionalidad de reordenamiento de filas mediante drag & drop',
        urlParams:
          'rowReorderable=true&columnReorderable=false&columnSortable=false&showCheckbox=false&rowExpandable=false',
      },
      'filas-expandibles': {
        name: 'Filas Expandibles',
        description:
          'Implementar funcionalidad de expandir/colapsar filas para mostrar contenido adicional',
        urlParams:
          'rowExpandable=true&columnReorderable=false&columnSortable=false&showCheckbox=false&rowReorderable=false',
      },
      'ordenamiento-columnas': {
        name: 'Ordenamiento de Columnas',
        description:
          'Implementar funcionalidad de ordenamiento (ascendente/descendente) en columnas',
        urlParams:
          'columnSortable=true&columnReorderable=false&showCheckbox=false&rowReorderable=false&rowExpandable=false',
      },
      'seleccion-multiple': {
        name: 'Selección Múltiple',
        description:
          'Implementar funcionalidad de selección múltiple con checkboxes y Action Bar',
        urlParams:
          'showCheckbox=true&columnReorderable=false&columnSortable=false&rowReorderable=false&rowExpandable=false',
      },
      paginacion: {
        name: 'Paginación',
        description:
          'Implementar funcionalidad de paginación con controles de página e items por página',
        urlParams:
          'showPagination=true&columnReorderable=false&columnSortable=false&showCheckbox=false&rowReorderable=false&rowExpandable=false',
      },
      'busqueda-filtros': {
        name: 'Búsqueda y Filtros',
        description:
          'Implementar funcionalidad de búsqueda y filtros en el header del DataTable',
        urlParams:
          'showHeaderSearchButton=true&showHeaderFilterButton=true&columnReorderable=false&columnSortable=false&showCheckbox=false',
      },
      'columnas-sticky': {
        name: 'Columnas Sticky (Fijas)',
        description:
          'Implementar funcionalidad de columnas fijas (sticky) al hacer scroll horizontal',
        urlParams:
          'checkboxSticky=true&dragHandleSticky=false&expandSticky=false&showCheckbox=true&columnReorderable=false',
      },
    },
  };

  const componentStories = functionalStories[componentId];
  if (!componentStories) {
    console.warn(
      `⚠️ [Storybook Stories] No hay historias funcionales definidas para ${componentId}`
    );
    return [];
  }

  // ⚠️ CRÍTICO: Verificar que 'default' existe antes de construir URLs
  // Si no existe, usar la primera historia disponible
  const verifiedStories = await verifyAvailableStories(componentId);
  const defaultExists =
    verifiedStories?.availableStories.some((s) => s.name === 'default') ??
    false;

  const baseUrl = 'https://ubits-storybook10.vercel.app';
  const storyName = defaultExists
    ? 'default'
    : verifiedStories?.availableStories[0]?.kebabName || 'default';

  // ⚠️ CRÍTICO: Construir URLs usando buildSafeStorybookUrl para verificar que existen
  const stories: StorybookStory[] = [];
  for (const [key, story] of Object.entries(componentStories)) {
    // Verificar que la historia base existe antes de construir URL
    const urlResult = await buildSafeStorybookUrl(componentId, storyName);
    if (urlResult.warning) {
      console.warn(`⚠️ [Functional Stories] ${urlResult.warning}`);
    }

    stories.push({
      id: `${componentId}--${key}`,
      name: story.name,
      title: componentId,
      url: `${urlResult.url}&args=${story.urlParams}`,
      description: story.description,
    });
  }

  return stories;
}

/**
 * Obtiene historias navegando en el navegador (método alternativo)
 * Nota: Esto requiere que el agente use Browser MCP
 */
async function getStoriesFromBrowser(
  componentId: string,
  baseUrl: string
): Promise<StorybookStory[]> {
  // Este método requiere que el agente navegue manualmente
  // Por ahora, retornamos historias funcionales específicas
  console.log(
    `💡 [Storybook Stories] Usando historias funcionales para ${componentId}`
  );

  return createFunctionalStories(componentId);
}

/**
 * Mapea nombre de componente a ID de Storybook
 *
 * ⚠️ IMPORTANTE: Este mapeo debe estar sincronizado con:
 * - verifyStorybookStories.ts (COMPONENT_TITLE_TO_ID_MAP)
 * - La documentación en docs/referencia/componentes/
 *
 * Para validar que un ID existe, usar buildSafeStorybookUrl() después de mapear.
 */
export function mapComponentNameToStorybookId(componentName: string): string {
  const mapping: Record<string, string> = {
    DataTable: 'data-data-table',
    Tabs: 'navegación-tabs',
    Button: 'bsicos-button',
    Modal: 'feedback-modal',
    Sidebar: 'navegacion-sidebar',
    SubNav: 'navegacion-sub-nav',
    TabBar: 'navegacion-tab-bar',
    Input: 'formularios-input',
    Checkbox: 'formularios-checkbox',
    Radio: 'formularios-radio-button',
    Select: 'formularios-select',
    Alert: 'feedback-alert',
    Toast: 'feedback-toast',
    Drawer: 'feedback-drawer-navigation', // ⚠️ CORREGIDO: era 'feedback-drawer'
    Popover: 'feedback-popover',
    Tooltip: 'feedback-tooltip',
    Chip: 'bsicos-chip',
  };

  return (
    mapping[componentName] || componentName.toLowerCase().replace(/\s+/g, '-')
  );
}

/**
 * Mapea y valida nombre de componente a ID de Storybook
 *
 * Usa descubrimiento automático para encontrar el ID correcto si el mapeo falla.
 * Si el ID mapeado no existe, intenta descubrirlo automáticamente desde Storybook.
 *
 * @param componentName - Nombre del componente (ej: "Drawer", "DataTable", "Tabs")
 * @returns ID de Storybook validado, o el ID descubierto automáticamente
 */
export async function mapAndValidateComponentNameToStorybookId(
  componentName: string
): Promise<string> {
  // Obtener ID mapeado
  const mappedId = mapComponentNameToStorybookId(componentName);

  try {
    // ⭐ NUEVO: Intentar descubrir el ID correcto automáticamente
    const { getCorrectStorybookId } = await import('./storybookIdDiscovery');
    const discoveryResult = await getCorrectStorybookId(
      componentName,
      mappedId
    );

    if (discoveryResult.found) {
      console.log(
        `✅ [Map & Validate] ID descubierto para ${componentName}: ${discoveryResult.componentId} (${discoveryResult.title})`
      );
      if (discoveryResult.availableStories) {
        console.log(
          `  📚 Historias disponibles: ${discoveryResult.availableStories.join(', ')}`
        );
      }
      return discoveryResult.componentId;
    }

    // Si no se encontró, intentar validar usando buildSafeStorybookUrl
    const { buildSafeStorybookUrl } = await import('./verifyStorybookStories');
    const urlResult = await buildSafeStorybookUrl(mappedId, 'default');

    // Si hay warning, el ID podría no ser correcto
    if (urlResult.warning) {
      console.warn(
        `⚠️ [Map & Validate] Advertencia para ${componentName} (ID: ${mappedId}): ${urlResult.warning}`
      );
    }

    // Extraer el ID real usado de la URL
    const urlMatch = urlResult.url.match(/\/story\/([^--]+)--/);
    if (urlMatch && urlMatch[1] !== mappedId) {
      console.log(
        `🔄 [Map & Validate] ID corregido para ${componentName}: ${mappedId} → ${urlMatch[1]}`
      );
      return urlMatch[1];
    }

    return mappedId;
  } catch (error) {
    // Si falla la validación, retornar el ID mapeado como fallback
    console.warn(
      `⚠️ [Map & Validate] No se pudo validar ID para ${componentName}, usando mapeo: ${mappedId}`,
      error
    );
    return mappedId;
  }
}

/**
 * Genera un plan de implementación basado en historias de Storybook
 *
 * @param componentStories - Historias del componente
 * @returns Plan de implementación dividido por historias
 */
export function generateImplementationPlanFromStories(
  componentStories: ComponentStories
): {
  componentName: string;
  steps: Array<{
    id: string;
    name: string;
    description: string;
    story: StorybookStory;
    dependencies?: string[];
    estimatedTime?: string;
  }>;
  totalSteps: number;
} {
  const steps = componentStories.stories.map((story, index) => {
    const stepId = `${componentStories.componentId}-story-${index + 1}`;
    const previousStepId =
      index > 0 ? `${componentStories.componentId}-story-${index}` : undefined;

    return {
      id: stepId,
      name: `Historia: ${story.name === 'default' ? 'Implementación Base' : story.name}`,
      description: `Implementar funcionalidad de la historia "${story.name}" del componente ${componentStories.componentName}`,
      story,
      dependencies: previousStepId ? [previousStepId] : undefined,
      estimatedTime:
        story.name === 'default' ? '10-15 minutos' : '5-10 minutos',
    };
  });

  return {
    componentName: componentStories.componentName,
    steps,
    totalSteps: steps.length,
  };
}

/**
 * Obtiene información detallada de una historia específica
 * Requiere que el agente navegue a la historia en Storybook
 *
 * @param story - Historia a consultar
 * @returns Instrucciones para el agente
 */
export function getStoryDetailsInstructions(story: StorybookStory): {
  instructions: string;
  url: string;
  steps: string[];
} {
  return {
    instructions: `Consultar historia "${story.name}" en Storybook antes de implementar`,
    url: story.url,
    steps: [
      `1. Navegar a la historia: ${story.url}`,
      `2. Revisar la pestaña "Code" para ver el código exacto`,
      `3. Revisar la pestaña "Controls" para ver todas las opciones`,
      `4. Revisar la pestaña "Docs" para ver documentación`,
      `5. Implementar la funcionalidad basándose en la historia consultada`,
    ],
  };
}
