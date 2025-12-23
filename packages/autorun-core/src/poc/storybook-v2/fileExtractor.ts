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
  type: 'provider' | 'readme' | 'component';
}

export interface ComponentFiles {
  componentId: string;
  provider?: StoryFile;
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
 * Busca Provider, Component y README
 */
function generatePossiblePaths(componentId: string): string[] {
  const normalized = normalizeComponentId(componentId);
  const paths: string[] = [];

  for (const id of normalized) {
    // Rutas en vendor/ubits/packages/components/
    // Provider (función de renderizado)
    paths.push(
      `vendor/ubits/packages/components/${id}/src/${capitalizeFirst(id)}Provider.ts`
    );
    paths.push(`vendor/ubits/packages/components/${id}/src/${id}Provider.ts`);

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
function getFileType(filePath: string): 'provider' | 'readme' | 'component' {
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

        // Guardar según tipo
        if (fileType === 'provider' && !result.provider) {
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
 */
export async function findStoryFile(
  componentId: string
): Promise<StoryFile | null> {
  const files = await findComponentFiles(componentId);
  return files.provider || files.readme || null;
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
