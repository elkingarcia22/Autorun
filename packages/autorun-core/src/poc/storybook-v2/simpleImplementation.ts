/**
 * Simple Implementation - POC Storybook V2
 *
 * Flujo simplificado para implementar componentes
 */

import { findComponentFiles, type ComponentFiles } from './fileExtractor.js';
import {
  generateHTMLFromComponentFiles,
  type GeneratedHTML,
} from './htmlGenerator.js';
import { writeFile } from 'fs/promises';
import { dirname } from 'path';
import { mkdir } from 'fs/promises';

export interface ImplementationResult {
  success: boolean;
  html?: string;
  error?: string;
  warnings?: string[];
  files?: {
    provider?: string;
    readme?: string;
  };
}

/**
 * Implementa componente de forma simple y directa
 */
export async function implementComponentSimple(
  componentId: string,
  options: Record<string, any> = {},
  targetFile: string
): Promise<ImplementationResult> {
  console.log(`🚀 [Simple Implementation] Implementando: ${componentId}`);
  console.log(`   Archivo destino: ${targetFile}`);

  try {
    // 1. Buscar archivos del componente
    const files = await findComponentFiles(componentId);

    if (!files.provider && !files.readme) {
      return {
        success: false,
        error: `No se encontraron archivos para el componente ${componentId}`,
        warnings: [
          'No se encontró Provider ni README',
          'Verifica que el componente existe en vendor/ubits/packages/components/',
        ],
      };
    }

    // 2. Generar HTML desde los archivos encontrados
    const generated = generateHTMLFromComponentFiles(
      files,
      componentId,
      options
    );

    // 3. Crear directorio si no existe
    const targetDir = dirname(targetFile);
    try {
      await mkdir(targetDir, { recursive: true });
    } catch (error: any) {
      // Ignorar si ya existe
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }

    // 4. Escribir archivo HTML
    await writeFile(targetFile, generated.complete, 'utf-8');

    console.log(`   ✅ Archivo escrito: ${targetFile}`);
    console.log(`   📊 Tamaño: ${generated.complete.length} caracteres`);

    const warnings: string[] = [];
    if (!files.provider) {
      warnings.push('No se encontró Provider.ts - usando solo README');
    }
    if (!files.readme) {
      warnings.push('No se encontró README.md - usando solo Provider');
    }

    return {
      success: true,
      html: generated.complete,
      warnings: warnings.length > 0 ? warnings : undefined,
      files: {
        provider: files.provider?.filePath,
        readme: files.readme?.filePath,
      },
    };
  } catch (error: any) {
    console.error(`   ❌ Error: ${error.message}`);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Implementa componente y retorna solo el HTML (sin escribir archivo)
 */
export async function generateComponentHTML(
  componentId: string,
  options: Record<string, any> = {}
): Promise<ImplementationResult> {
  console.log(`🔧 [Simple Implementation] Generando HTML para: ${componentId}`);

  try {
    // 1. Buscar archivos del componente
    const files = await findComponentFiles(componentId);

    if (!files.provider && !files.readme) {
      return {
        success: false,
        error: `No se encontraron archivos para el componente ${componentId}`,
      };
    }

    // 2. Generar HTML desde los archivos encontrados
    const generated = generateHTMLFromComponentFiles(
      files,
      componentId,
      options
    );

    return {
      success: true,
      html: generated.complete,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
