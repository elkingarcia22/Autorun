/**
 * Storybook Metadata Extractor
 *
 * ⭐ NUEVO: Extrae metadata declarativa desde stories de Storybook
 * Nivel A: Metadata declarativa (parameters.ubits.dependsOn, parameters.ubits.internals)
 *
 * Formato esperado en stories:
 * ```typescript
 * export default {
 *   parameters: {
 *     ubits: {
 *       componentId: "⚙️-functional-modal",
 *       dependsOn: {
 *         required: ["🧩-ux-button"],
 *         optional: ["🧩-ux-input"]
 *       },
 *       internals: ["⚙️-functional-scroll", "⚙️-functional-progress"]
 *     }
 *   }
 * }
 * ```
 */

import { getSourceCode } from './storybookExactCodeExtractor.js';
import { StorybookManager } from './storybookManager.js';

export interface StorybookMetadata {
  componentId?: string;
  dependsOn?: {
    required: string[];
    optional: string[];
  };
  internals?: string[];
}

/**
 * Extrae metadata declarativa desde el código fuente de la story
 */
export async function extractMetadataFromStory(
  componentId: string,
  storyName: string = 'default'
): Promise<StorybookMetadata | null> {
  console.log(
    `🔍 [Storybook Metadata Extractor] Extrayendo metadata para: ${componentId}--${storyName}`
  );

  try {
    // 1. Obtener código fuente de la story
    const sourceCode = await getSourceCode(componentId);
    if (!sourceCode) {
      console.warn(
        `   ⚠️ No se pudo obtener código fuente para ${componentId}`
      );
      return null;
    }

    // 2. Buscar metadata en parameters.ubits
    const metadata = parseMetadataFromSourceCode(sourceCode, componentId);

    if (metadata) {
      console.log(
        `   ✅ Metadata extraída: ${metadata.dependsOn?.required.length || 0} requeridos, ${metadata.dependsOn?.optional.length || 0} opcionales, ${metadata.internals?.length || 0} internos`
      );
    } else {
      console.log(`   ℹ️ No se encontró metadata declarativa en la story`);
    }

    return metadata;
  } catch (error: any) {
    console.warn(
      `   ⚠️ Error extrayendo metadata: ${error.message}`
    );
    return null;
  }
}

/**
 * Parsea metadata desde el código fuente de la story
 */
function parseMetadataFromSourceCode(
  sourceCode: string,
  componentId: string
): StorybookMetadata | null {
  // Buscar parameters.ubits en el código
  // Patrones posibles:
  // 1. parameters: { ubits: { ... } }
  // 2. parameters.ubits = { ... }
  // 3. export default { parameters: { ubits: { ... } } }

  const patterns = [
    // Patrón 1: parameters: { ubits: { ... } }
    /parameters\s*:\s*\{[^}]*ubits\s*:\s*\{([^}]+)\}/s,
    // Patrón 2: parameters.ubits = { ... }
    /parameters\.ubits\s*=\s*\{([^}]+)\}/s,
    // Patrón 3: export default { parameters: { ubits: { ... } } }
    /export\s+default\s+\{[^}]*parameters\s*:\s*\{[^}]*ubits\s*:\s*\{([^}]+)\}/s,
  ];

  for (const pattern of patterns) {
    const match = sourceCode.match(pattern);
    if (match) {
      const ubitsBlock = match[1];
      return parseUbitsBlock(ubitsBlock);
    }
  }

  return null;
}

/**
 * Parsea el bloque ubits desde el código
 */
function parseUbitsBlock(ubitsBlock: string): StorybookMetadata | null {
  const metadata: StorybookMetadata = {};

  // Extraer componentId
  const componentIdMatch = ubitsBlock.match(/componentId\s*:\s*["']([^"']+)["']/);
  if (componentIdMatch) {
    metadata.componentId = componentIdMatch[1];
  }

  // Extraer dependsOn
  const dependsOnMatch = ubitsBlock.match(/dependsOn\s*:\s*\{([^}]+)\}/s);
  if (dependsOnMatch) {
    const dependsOnBlock = dependsOnMatch[1];
    metadata.dependsOn = {
      required: extractArrayFromBlock(dependsOnBlock, 'required'),
      optional: extractArrayFromBlock(dependsOnBlock, 'optional'),
    };
  }

  // Extraer internals
  const internalsMatch = ubitsBlock.match(/internals\s*:\s*\[([^\]]+)\]/);
  if (internalsMatch) {
    metadata.internals = extractArrayFromBlock(internalsMatch[1], '');
  }

  // Si no hay nada, retornar null
  if (!metadata.componentId && !metadata.dependsOn && !metadata.internals) {
    return null;
  }

  return metadata;
}

/**
 * Extrae array desde un bloque de código
 */
function extractArrayFromBlock(
  block: string,
  key: string
): string[] {
  let arrayBlock = block;

  // Si hay una key, buscar el array dentro de esa key
  if (key) {
    const keyMatch = block.match(
      new RegExp(`${key}\\s*:\\s*\\[([^\\]]+)\\]`, 's')
    );
    if (keyMatch) {
      arrayBlock = keyMatch[1];
    } else {
      return [];
    }
  }

  // Extraer strings del array
  const stringMatches = arrayBlock.matchAll(/["']([^"']+)["']/g);
  const items: string[] = [];

  for (const match of stringMatches) {
    items.push(match[1]);
  }

  return items;
}

/**
 * Normaliza IDs de componentes (remueve emojis y prefijos)
 */
export function normalizeComponentId(id: string): string {
  return id
    .replace(/^[🧩⚙️]/g, '')
    .replace(/^functional-/, '')
    .replace(/^ux-/, '')
    .toLowerCase();
}
