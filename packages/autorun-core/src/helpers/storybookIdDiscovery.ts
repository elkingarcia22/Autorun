/**
 * Storybook ID Discovery
 *
 * Sistema que descubre automáticamente los IDs correctos de componentes en Storybook
 * consultando index.json para evitar errores de "Couldn't find story matching".
 *
 * ⚠️ CRÍTICO: Este sistema garantiza que siempre se usen IDs correctos de Storybook.
 */

import { getStorybookUrlWithFallback } from './storybookFallback';

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
    const baseUrl = baseUrlResult.url.replace(/\/$/, '');

    // Intentar obtener index.json
    const indexUrl = `${baseUrl}/index.json`;
    console.log(`🔍 [Storybook ID Discovery] Consultando: ${indexUrl}`);

    const indexResponse = await fetch(indexUrl);

    if (!indexResponse.ok) {
      const error = `No se pudo obtener index.json: ${indexResponse.status} ${indexResponse.statusText}`;
      console.error(`❌ [Storybook ID Discovery] ${error}`);
      result.errors.push(error);
      return result;
    }

    const indexData = await indexResponse.json();

    if (!indexData.entries) {
      const error = 'index.json no tiene campo "entries"';
      console.error(`❌ [Storybook ID Discovery] ${error}`);
      result.errors.push(error);
      return result;
    }

    // Agrupar historias por componente
    const componentsMap = new Map<string, DiscoveredComponent>();

    for (const [storyId, entry] of Object.entries(indexData.entries)) {
      if (typeof entry === 'object' && entry !== null) {
        const entryObj = entry as any;

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
      '🔍 [Storybook ID Discovery] ========================================\n'
    );

    return result;
  } catch (error: any) {
    const errorMsg = `Error descubriendo componentes: ${error.message}`;
    console.error(`❌ [Storybook ID Discovery] ${errorMsg}`);
    result.errors.push(errorMsg);
    return result;
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
