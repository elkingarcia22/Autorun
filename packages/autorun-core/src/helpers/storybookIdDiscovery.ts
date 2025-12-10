/**
 * Storybook ID Discovery
 *
 * Sistema que descubre automáticamente los IDs correctos de componentes en Storybook
 * consultando index.json para evitar errores de "Couldn't find story matching".
 *
 * ⚠️ CRÍTICO: Este sistema garantiza que siempre se usen IDs correctos de Storybook.
 */

import { getStorybookUrlWithFallback } from './storybookFallback';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface DiscoveredComponent {
  componentId: string; // ID real en Storybook (ej: "navegacion-tabs")
  title: string; // Título del componente (ej: "Navegación/Tabs")
  stories: string[]; // Nombres de historias disponibles (ej: ["default", "with-icons"])
  firstStoryId: string; // ID completo de la primera historia (ej: "navegacion-tabs--default")
}

export interface DiscoveryResult {
  components: DiscoveredComponent[];
  totalComponents: number;
  errors: string[];
}

/**
 * Descubrir componentes desde archivos .stories.ts locales (fallback)
 */
async function discoverFromLocalStories(): Promise<DiscoveryResult> {
  console.log(
    '📚 [Storybook ID Discovery] Descubriendo desde archivos locales...'
  );

  const result: DiscoveryResult = {
    components: [],
    totalComponents: 0,
    errors: [],
  };

  try {
    const verifyModule = await import('./verifyStorybookStories');
    const verifyAvailableStories = verifyModule.verifyAvailableStories;
    const COMPONENT_STORIES_PATH_MAP = verifyModule.COMPONENT_STORIES_PATH_MAP;

    // Obtener componentes únicos del mapeo
    // Usar solo los nombres base de componentes (sin alias)
    const baseComponents = [
      'DataTable',
      'Tabs',
      'Button',
      'Modal',
      'Sidebar',
      'SubNav',
      'TabBar',
      'Input',
      'Checkbox',
      'Radio',
      'Select',
      'Alert',
      'Toast',
      'Drawer',
      'Popover',
      'Tooltip',
      'Chip',
    ];

    // Filtrar componentes que tienen archivos .stories.ts
    const componentIdentifiers: string[] = [];
    for (const comp of baseComponents) {
      // Buscar cualquier clave que contenga el nombre del componente
      const hasStories = Object.keys(COMPONENT_STORIES_PATH_MAP).some(
        (key) => key === comp || key.toLowerCase().includes(comp.toLowerCase())
      );
      if (hasStories) {
        componentIdentifiers.push(comp);
      }
    }

    for (const identifier of componentIdentifiers) {
      try {
        const storyInfo = await verifyAvailableStories(identifier);
        if (storyInfo) {
          result.components.push({
            componentId: storyInfo.componentId,
            title: storyInfo.componentTitle,
            stories: storyInfo.availableStories.map((s) => s.name),
            firstStoryId: `${storyInfo.componentId}--${storyInfo.availableStories[0]?.name || 'default'}`,
          });
        }
      } catch (error: any) {
        console.warn(
          `⚠️ [Storybook ID Discovery] Error verificando ${identifier}: ${error.message}`
        );
      }
    }

    result.totalComponents = result.components.length;
    console.log(
      `✅ [Storybook ID Discovery] ${result.totalComponents} componentes descubiertos desde archivos locales`
    );

    return result;
  } catch (error: any) {
    const errorMsg = `Error descubriendo desde archivos locales: ${error.message}`;
    console.error(`❌ [Storybook ID Discovery] ${errorMsg}`);
    result.errors.push(errorMsg);
    return result;
  }
}

/**
 * Descubrir todos los componentes disponibles en Storybook
 * consultando index.json
 */
export async function discoverStorybookComponents(): Promise<DiscoveryResult> {
  console.log(
    '\n🔍 [Storybook ID Discovery] ========================================'
  );
  console.log('🔍 [Storybook ID Discovery] Descubriendo componentes...');

  const result: DiscoveryResult = {
    components: [],
    totalComponents: 0,
    errors: [],
  };

  try {
    // Obtener URL base de Storybook
    const baseUrlResult = await getStorybookUrlWithFallback('', {
      checkAvailability: false,
    });
    let baseUrl = baseUrlResult.url.replace(/\/$/, '');

    // ⚠️ CRÍTICO: Remover parámetros de bypass de la URL base para index.json
    // La URL base puede tener parámetros como ?x-vercel-set-bypass-cookie=...
    // Necesitamos solo el dominio para index.json
    const urlObj = new URL(baseUrl);
    baseUrl = `${urlObj.protocol}//${urlObj.host}`;

    // Intentar obtener index.json
    const indexUrl = `${baseUrl}/index.json`;
    console.log(`🔍 [Storybook ID Discovery] Consultando: ${indexUrl}`);

    let indexData: any;

    try {
      const indexResponse = await fetch(indexUrl, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!indexResponse.ok) {
        throw new Error(
          `HTTP ${indexResponse.status}: ${indexResponse.statusText}`
        );
      }

      const contentType = indexResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Respuesta no es JSON: ${contentType}`);
      }

      const text = await indexResponse.text();

      // Verificar que es JSON válido
      try {
        indexData = JSON.parse(text);
      } catch (parseError) {
        throw new Error(
          `Respuesta no es JSON válido: ${text.substring(0, 100)}`
        );
      }

      // Verificar que tiene entries
      if (
        !indexData ||
        !indexData.entries ||
        Object.keys(indexData.entries).length === 0
      ) {
        throw new Error('index.json vacío o sin "entries"');
      }
    } catch (fetchError: any) {
      console.warn(
        `⚠️ [Storybook ID Discovery] No se pudo obtener index.json desde ${indexUrl}: ${fetchError.message}`
      );
      console.log(
        `📚 [Storybook ID Discovery] Usando fallback: descubrir desde archivos .stories.ts locales`
      );

      // Fallback: descubrir desde archivos locales
      return discoverFromLocalStories();
    }

    // Verificar nuevamente antes de procesar (por si acaso)
    if (
      !indexData ||
      !indexData.entries ||
      Object.keys(indexData.entries).length === 0
    ) {
      console.warn(
        `⚠️ [Storybook ID Discovery] index.json vacío después de parsear, usando fallback`
      );
      return discoverFromLocalStories();
    }

    // Agrupar historias por componente
    const componentsMap = new Map<string, DiscoveredComponent>();

    console.log(
      `🔍 [Storybook ID Discovery] Procesando ${Object.keys(indexData.entries).length} entradas...`
    );

    for (const [storyId, entry] of Object.entries(indexData.entries)) {
      if (typeof entry === 'object' && entry !== null) {
        const entryObj = entry as any;

        // ⚠️ CRÍTICO: Filtrar solo historias (no docs)
        // Las entradas con type "docs" no son historias reales
        if (entryObj.type === 'docs') {
          continue;
        }

        // Extraer ID del componente desde el storyId (formato: "component-id--story-name")
        const componentIdMatch = storyId.match(/^([^--]+)--/);
        if (!componentIdMatch) {
          continue;
        }

        const componentId = componentIdMatch[1];
        const storyName = storyId.split('--')[1] || 'default';
        const title = entryObj.title || componentId;

        // Obtener o crear componente
        if (!componentsMap.has(componentId)) {
          componentsMap.set(componentId, {
            componentId,
            title,
            stories: [],
            firstStoryId: storyId,
          });
        }

        const component = componentsMap.get(componentId)!;
        if (!component.stories.includes(storyName)) {
          component.stories.push(storyName);
        }
      }
    }

    // Convertir a array y ordenar
    result.components = Array.from(componentsMap.values()).sort((a, b) =>
      a.componentId.localeCompare(b.componentId)
    );
    result.totalComponents = result.components.length;

    console.log(
      `✅ [Storybook ID Discovery] ${result.totalComponents} componentes descubiertos`
    );
    console.log(
      `📊 [Storybook ID Discovery] Estadísticas: ${processedCount} historias procesadas, ${skippedDocs} docs omitidos`
    );
    console.log(
      '🔍 [Storybook ID Discovery] ========================================\n'
    );

    return result;
  } catch (error: any) {
    const errorMsg = `Error descubriendo componentes: ${error.message}`;
    console.error(`❌ [Storybook ID Discovery] ${errorMsg}`);
    console.log(
      `📚 [Storybook ID Discovery] Usando fallback: descubrir desde archivos .stories.ts locales`
    );

    // Fallback: descubrir desde archivos locales
    return discoverFromLocalStories();
  }
}

/**
 * Buscar componente por nombre o ID aproximado
 *
 * @param searchTerm - Término de búsqueda (ej: "Tabs", "navegacion-tabs", "Navegación/Tabs")
 * @returns Componente encontrado o null
 */
export async function findComponentByIdOrName(
  searchTerm: string
): Promise<DiscoveredComponent | null> {
  const discovery = await discoverStorybookComponents();

  // Buscar por ID exacto
  const byId = discovery.components.find(
    (c) => c.componentId.toLowerCase() === searchTerm.toLowerCase()
  );
  if (byId) {
    return byId;
  }

  // Buscar por título
  const byTitle = discovery.components.find((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (byTitle) {
    return byTitle;
  }

  // Buscar por ID parcial
  const byPartialId = discovery.components.find((c) =>
    c.componentId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (byPartialId) {
    return byPartialId;
  }

  return null;
}

/**
 * Obtener ID correcto de Storybook para un componente
 *
 * @param componentName - Nombre del componente (ej: "Tabs")
 * @param fallbackId - ID de fallback si no se encuentra (ej: "navegacion-tabs")
 * @returns ID correcto de Storybook
 */
export async function getCorrectStorybookId(
  componentName: string,
  fallbackId?: string
): Promise<{
  componentId: string;
  found: boolean;
  title?: string;
  availableStories?: string[];
}> {
  console.log(
    `🔍 [Storybook ID Discovery] Buscando ID correcto para: ${componentName}`
  );

  // Intentar encontrar el componente
  const component = await findComponentByIdOrName(componentName);

  if (component) {
    console.log(
      `✅ [Storybook ID Discovery] Componente encontrado: ${component.componentId} (${component.title})`
    );
    return {
      componentId: component.componentId,
      found: true,
      title: component.title,
      availableStories: component.stories,
    };
  }

  // Si no se encuentra, usar fallback
  const finalId =
    fallbackId || componentName.toLowerCase().replace(/\s+/g, '-');
  console.warn(
    `⚠️ [Storybook ID Discovery] Componente no encontrado, usando fallback: ${finalId}`
  );

  return {
    componentId: finalId,
    found: false,
  };
}

/**
 * Verificar si un ID de Storybook existe
 *
 * @param componentId - ID del componente a verificar (ej: "navegacion-tabs")
 * @returns true si existe, false si no
 */
export async function verifyStorybookIdExists(
  componentId: string
): Promise<boolean> {
  const component = await findComponentByIdOrName(componentId);
  return component !== null;
}

/**
 * Obtener todas las historias disponibles para un componente
 *
 * @param componentId - ID del componente
 * @returns Array de nombres de historias disponibles
 */
export async function getAvailableStoriesForComponent(
  componentId: string
): Promise<string[]> {
  const component = await findComponentByIdOrName(componentId);
  return component?.stories || ['default'];
}

/**
 * Generar inventario completo de componentes
 *
 * @returns Inventario formateado como texto
 */
export async function generateComponentInventory(): Promise<string> {
  const discovery = await discoverStorybookComponents();

  const inventory: string[] = [];

  inventory.push('# 📚 Inventario de Componentes Storybook\n');
  inventory.push(`**Total de componentes:** ${discovery.totalComponents}\n`);
  inventory.push('## Componentes Disponibles\n\n');

  for (const component of discovery.components) {
    inventory.push(`### ${component.title}`);
    inventory.push(`- **ID:** \`${component.componentId}\``);
    inventory.push(
      `- **Historias:** ${component.stories.map((s) => `\`${s}\``).join(', ')}`
    );
    inventory.push(`- **Primera historia:** \`${component.firstStoryId}\``);
    inventory.push(
      `- **URL:** https://ubits-storybook10.vercel.app/?path=/story/${component.firstStoryId}`
    );
    inventory.push('');
  }

  if (discovery.errors.length > 0) {
    inventory.push('## ⚠️ Errores\n\n');
    discovery.errors.forEach((error) => {
      inventory.push(`- ${error}`);
    });
    inventory.push('');
  }

  return inventory.join('\n');
}
