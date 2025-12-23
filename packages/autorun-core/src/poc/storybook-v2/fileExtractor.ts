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
 * Genera rutas posibles para buscar archivo .stories.ts
 */
function generatePossiblePaths(componentId: string): string[] {
  const normalized = normalizeComponentId(componentId);
  const paths: string[] = [];

  for (const id of normalized) {
    // Rutas en vendor/ubits/packages/components/
    paths.push(`vendor/ubits/packages/components/${id}/src/${id}.stories.ts`);
    paths.push(`vendor/ubits/packages/components/${id}/src/${id}.stories.tsx`);

    // Rutas en vendor/ubits/packages/addons/
    paths.push(`vendor/ubits/packages/addons/${id}/src/${id}.stories.ts`);
    paths.push(`vendor/ubits/packages/addons/${id}/src/${id}.stories.tsx`);

    // Rutas con ID original
    paths.push(
      `vendor/ubits/packages/components/${componentId}/src/${componentId}.stories.ts`
    );
    paths.push(
      `vendor/ubits/packages/components/${componentId}/src/${componentId}.stories.tsx`
    );
  }

  return paths;
}

/**
 * Busca archivo .stories.ts para un componente
 */
export async function findStoryFile(
  componentId: string
): Promise<StoryFile | null> {
  console.log(`🔍 [File Extractor] Buscando archivo para: ${componentId}`);

  const possiblePaths = generatePossiblePaths(componentId);
  const projectRoot = process.cwd();

  for (const relativePath of possiblePaths) {
    const fullPath = resolve(projectRoot, relativePath);

    try {
      if (existsSync(fullPath)) {
        console.log(`   ✅ Archivo encontrado: ${relativePath}`);
        const content = await readFile(fullPath, 'utf-8');

        return {
          componentId,
          filePath: fullPath,
          content,
          found: true,
        };
      }
    } catch (error: any) {
      // Continuar con siguiente ruta
      continue;
    }
  }

  console.warn(`   ⚠️ Archivo no encontrado para: ${componentId}`);
  console.warn(`   Rutas probadas: ${possiblePaths.slice(0, 5).join(', ')}...`);

  return null;
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
