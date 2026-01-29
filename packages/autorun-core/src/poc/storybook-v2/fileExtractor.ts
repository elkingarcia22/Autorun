/**
 * File Extractor - POC Storybook V2
 *
 * Busca y lee archivos .stories.ts desde Storybook local
 */

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, resolve } from 'path';

export interface StoryFile {
  componentId: string;
  filePath: string;
  content: string;
  found: boolean;
  type: 'stories' | 'provider' | 'options' | 'readme' | 'component';
}

export interface ComponentFiles {
  componentId: string;
  stories?: StoryFile; // ⭐ PRIORIDAD: Archivo .stories.ts
  provider?: StoryFile;
  options?: StoryFile; // Tipos TypeScript
  readme?: StoryFile;
  component?: StoryFile;
}

/**
 * Normaliza el ID del componente para buscar archivos
 * Ej: "data-data-table" -> "data-table"
 */
function normalizeComponentId(componentId: string): string[] {
  const variations: string[] = [componentId];

  // Remover prefijos comunes
  if (componentId.startsWith('data-')) {
    variations.push(componentId.replace('data-', ''));
  }
  if (componentId.startsWith('basicos-')) {
    variations.push(componentId.replace('basicos-', ''));
  }
  if (componentId.startsWith('navegacion-')) {
    variations.push(componentId.replace('navegacion-', ''));
  }

  // Agregar variaciones con guiones
  variations.push(componentId.replace(/-/g, ''));
  variations.push(componentId.replace(/-/g, '_'));

  return [...new Set(variations)]; // Eliminar duplicados
}

/**
 * Genera rutas posibles para buscar archivos del componente
 * Busca: Storybook stories, Provider, Options types, README
 */
function generatePossiblePaths(componentId: string): string[] {
  const normalized = normalizeComponentId(componentId);
  const paths: string[] = [];

  // Normalizar para Storybook (ej: "data-data-table" -> "DataTable")
  const storybookName = normalized
    .split('-')
    .map((w) => capitalizeFirst(w))
    .join('');

  for (const id of normalized) {
    // ⭐ PRIORIDAD 1: Archivo .stories.ts (más completo)
    paths.push(
      `vendor/ubits/packages/storybook/stories/components/${storybookName}/${storybookName}.stories.ts`
    );
    paths.push(
      `vendor/ubits/packages/storybook/stories/components/${capitalizeFirst(id)}/${capitalizeFirst(id)}.stories.ts`
    );
    paths.push(
      `vendor/ubits/packages/storybook/stories/components/${id}/${id}.stories.ts`
    );

    // Rutas en vendor/ubits/packages/components/
    // Provider (función de renderizado)
    paths.push(
      `vendor/ubits/packages/components/${id}/src/${capitalizeFirst(id)}Provider.ts`
    );
    paths.push(`vendor/ubits/packages/components/${id}/src/${id}Provider.ts`);

    // Options types (tipos TypeScript)
    paths.push(
      `vendor/ubits/packages/components/${id}/src/types/${capitalizeFirst(id)}Options.ts`
    );
    paths.push(
      `vendor/ubits/packages/components/${id}/src/types/${id}Options.ts`
    );

    // README (documentación con ejemplos)
    paths.push(`vendor/ubits/packages/components/${id}/README.md`);

    // Rutas en vendor/ubits/packages/addons/
    paths.push(
      `vendor/ubits/packages/addons/${id}/src/${capitalizeFirst(id)}Provider.ts`
    );
    paths.push(`vendor/ubits/packages/addons/${id}/src/${id}Provider.ts`);
    paths.push(`vendor/ubits/packages/addons/${id}/README.md`);

    // Rutas con ID original
    paths.push(
      `vendor/ubits/packages/components/${componentId}/src/${capitalizeFirst(componentId)}Provider.ts`
    );
    paths.push(
      `vendor/ubits/packages/components/${componentId}/src/${componentId}Provider.ts`
    );
    paths.push(`vendor/ubits/packages/components/${componentId}/README.md`);
  }

  return paths;
}

/**
 * Capitaliza la primera letra
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Determina el tipo de archivo según su ruta
 */
function getFileType(filePath: string): StoryFile['type'] {
  if (filePath.includes('.stories.ts')) return 'stories'; // ⭐ PRIORIDAD
  if (filePath.includes('Options.ts') || filePath.includes('Options.js'))
    return 'options';
  if (filePath.includes('README.md')) return 'readme';
  if (filePath.includes('Provider.ts') || filePath.includes('Provider.js'))
    return 'provider';
  if (filePath.includes('Component.ts') || filePath.includes('Component.js'))
    return 'component';
  return 'provider'; // Default
}

/**
 * Busca archivos del componente (Provider, README, Component)
 */
export async function findComponentFiles(
  componentId: string
): Promise<ComponentFiles> {
  console.log(`🔍 [File Extractor] Buscando archivos para: ${componentId}`);

  const possiblePaths = generatePossiblePaths(componentId);
  const projectRoot = process.cwd();
  const result: ComponentFiles = { componentId };

  for (const relativePath of possiblePaths) {
    const fullPath = resolve(projectRoot, relativePath);

    try {
      if (existsSync(fullPath)) {
        const fileType = getFileType(relativePath);
        const content = await readFile(fullPath, 'utf-8');

        const file: StoryFile = {
          componentId,
          filePath: fullPath,
          content,
          found: true,
          type: fileType,
        };

        console.log(`   ✅ ${fileType} encontrado: ${relativePath}`);

        // Guardar según tipo (prioridad: stories > options > provider > readme > component)
        if (fileType === 'stories' && !result.stories) {
          result.stories = file;
        } else if (fileType === 'options' && !result.options) {
          result.options = file;
        } else if (fileType === 'provider' && !result.provider) {
          result.provider = file;
        } else if (fileType === 'readme' && !result.readme) {
          result.readme = file;
        } else if (fileType === 'component' && !result.component) {
          result.component = file;
        }
      }
    } catch (error: any) {
      // Continuar con siguiente ruta
      continue;
    }
  }

  if (!result.provider && !result.readme) {
    console.warn(`   ⚠️ Archivos no encontrados para: ${componentId}`);
    console.warn(
      `   Rutas probadas: ${possiblePaths.slice(0, 5).join(', ')}...`
    );
  }

  return result;
}

/**
 * Busca archivo específico (mantiene compatibilidad)
 * Prioridad: stories > provider > readme
 */
export async function findStoryFile(
  componentId: string
): Promise<StoryFile | null> {
  const files = await findComponentFiles(componentId);
  return files.stories || files.provider || files.readme || null;
}

/**
 * Mapea nombre de componente a ID de Storybook
 * TODO: Mejorar con descubrimiento automático desde index.json
 */
export function mapComponentNameToId(componentName: string): string {
  const mapping: Record<string, string> = {
    Button: 'basicos-button',
    DataTable: 'data-data-table',
    Modal: 'feedback-modal',
    Tabs: 'navegacion-tabs',
    // Agregar más mapeos según sea necesario
  };

  return (
    mapping[componentName] || componentName.toLowerCase().replace(/\s+/g, '-')
  );
}
