/**
 * Storybook URL Builder
 *
 * Sistema que construye URLs de Storybook con validación y corrección automática
 * de IDs, intentando variaciones si falla la búsqueda inicial.
 *
 * ⚠️ CRÍTICO: Previene errores "Couldn't find story matching"
 */

import { StorybookManager } from './storybookManager';
import {
  validateAndCorrectStorybookId,
  buildValidatedStorybookUrl,
} from './storybookIdValidator';

/**
 * Construir URL de Storybook con validación automática y corrección de IDs
 *
 * @param componentName - Nombre del componente (ej: "Button")
 * @param componentId - ID mapeado (ej: "🧩-ux-button")
 * @param storyName - Nombre de la historia (default: "default")
 * @returns URL validada y corregida
 */
export async function buildValidatedStorybookUrlForComponent(
  componentName: string,
  componentId: string,
  storyName: string = 'default'
): Promise<{
  url: string;
  componentId: string;
  valid: boolean;
  corrected: boolean;
  error?: string;
}> {
  console.log(
    `🔍 [Storybook URL Builder] Construyendo URL para: ${componentName} (ID: ${componentId})`
  );

  try {
    // 1. Validar y corregir ID
    const validation = await validateAndCorrectStorybookId(
      componentName,
      componentId
    );

    if (!validation.valid) {
      const errorMessage = `ID no válido: ${validation.originalId || componentId}`;
      console.error(
        `❌ [Storybook URL Builder] No se pudo validar ID: ${errorMessage}`
      );
      // Retornar URL con el ID original como último recurso
      const manager = StorybookManager.getInstance();
      const activeConfig = await manager.getActiveConfig();
      const fallbackUrl = activeConfig
        ? await manager.buildStorybookUrl(
            `?path=/story/${componentId}--${storyName}`
          )
        : `https://libraries-ui.ubitslearning.com/index.html?path=/story/${componentId}--${storyName}`;

      return {
        url: fallbackUrl,
        componentId: componentId,
        valid: false,
        corrected: false,
        error: errorMessage,
      };
    }

    // 2. Construir URL con ID validado/corregido
    const urlResult = await buildValidatedStorybookUrl(
      componentName,
      validation.componentId,
      storyName
    );

    if (validation.corrected) {
      console.log(
        `✅ [Storybook URL Builder] URL construida con ID corregido: ${validation.originalId} → ${validation.componentId}`
      );
    }

    return {
      url: urlResult.url,
      componentId: validation.componentId,
      valid: true,
      corrected: validation.corrected,
    };
  } catch (error: any) {
    console.error(
      `❌ [Storybook URL Builder] Error construyendo URL: ${error.message}`
    );

    // Fallback: construir URL manualmente
    const manager = StorybookManager.getInstance();
    const activeConfig = await manager.getActiveConfig();
    const fallbackUrl = activeConfig
      ? await manager.buildStorybookUrl(
          `?path=/story/${componentId}--${storyName}`
        )
      : `https://libraries-ui.ubitslearning.com/index.html?path=/story/${componentId}--${storyName}`;

    return {
      url: fallbackUrl,
      componentId: componentId,
      valid: false,
      corrected: false,
      error: error.message,
    };
  }
}

/**
 * Construir URL de Storybook con múltiples intentos y variaciones
 *
 * @param componentName - Nombre del componente
 * @param componentId - ID inicial
 * @param storyName - Nombre de la historia
 * @returns URL que funciona o null si todas las variaciones fallan
 */
export async function buildStorybookUrlWithRetry(
  componentName: string,
  componentId: string,
  storyName: string = 'default'
): Promise<string | null> {
  // 1. Intentar con ID original
  const firstAttempt = await buildValidatedStorybookUrlForComponent(
    componentName,
    componentId,
    storyName
  );

  if (firstAttempt.valid) {
    return firstAttempt.url;
  }

  // 2. Si falla, intentar variaciones comunes
  const commonVariations = [
    componentName.toLowerCase(),
    componentName.toLowerCase().replace(/\s+/g, '-'),
    componentName.toLowerCase().replace(/\s+/g, '_'),
    componentName,
  ];

  for (const variation of commonVariations) {
    if (variation === componentId) continue; // Ya se intentó

    const attempt = await buildValidatedStorybookUrlForComponent(
      componentName,
      variation,
      storyName
    );

    if (attempt.valid) {
      console.log(
        `✅ [Storybook URL Builder] URL encontrada con variación: ${variation}`
      );
      return attempt.url;
    }
  }

  // 3. Si todo falla, retornar null
  console.error(
    `❌ [Storybook URL Builder] No se pudo construir URL válida después de ${commonVariations.length + 1} intentos`
  );
  return null;
}
