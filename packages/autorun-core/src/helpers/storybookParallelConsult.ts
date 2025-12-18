/**
 * Storybook Parallel Consult
 *
 * Consulta Storybook en paralelo (MCP, Vercel, exactCode, API, composition)
 * Optimiza tiempos de implementación consultando todo simultáneamente
 */

import {
  getStorybookInfoCached,
  setStorybookInfoCached,
  StorybookInfo,
} from './storybookCache';
import { extractExactCodeFromStorybook } from './storybookExactCodeExtractor';
import { extractAPIFromStorybook } from './storybookAPIExtractor';
import { extractCompositionFromStorybook } from './storybookCompositionExtractor';
import { extractBestPracticesFromStorybook } from './storybookBestPracticesExtractor';
import { extractRealWorldExamplesFromStorybook } from './storybookRealWorldExamplesExtractor';
import { getComponentPropsWithFallback } from './mcpWithFallback';
import { extractInteractionInfo } from './storybookInteractionExtractor';

export interface ParallelConsultResult {
  success: boolean;
  info: StorybookInfo;
  errors: string[];
  warnings: string[];
  fromCache: boolean;
}

/**
 * Consulta Storybook en paralelo para obtener toda la información necesaria
 *
 * @param componentId - ID del componente
 * @param componentName - Nombre del componente (opcional, para consultas adicionales)
 * @param useCache - Si debe usar caché (default: true)
 * @returns Información completa de Storybook
 */
export async function consultStorybookCompleto(
  componentId: string,
  componentName?: string,
  useCache: boolean = true
): Promise<ParallelConsultResult> {
  console.log(
    `\n🚀 [Storybook Parallel Consult] Consultando Storybook completo para: ${componentId}`
  );

  // 1. Verificar caché primero
  if (useCache) {
    const cached = await getStorybookInfoCached(componentId);
    if (cached) {
      console.log(
        `✅ [Storybook Parallel Consult] Usando información en caché`
      );
      return {
        success: true,
        info: cached,
        errors: [],
        warnings: [],
        fromCache: true,
      };
    }
  }

  console.log(
    `📚 [Storybook Parallel Consult] Consultando Storybook en paralelo...`
  );

  const errors: string[] = [];
  const warnings: string[] = [];

  // 2. Consultar todo en paralelo
  const startTime = Date.now();

  try {
    const [
      mcpResult,
      vercelResult,
      exactCodeResult,
      apiResult,
      compositionResult,
      bestPracticesResult,
      realWorldExamplesResult,
      interactionResult,
    ] = await Promise.allSettled([
      // MCP (más rápido)
      getComponentPropsWithFallback(componentId).catch((error) => {
        console.warn(
          `⚠️ [Storybook Parallel Consult] MCP falló: ${error.message}`
        );
        return null;
      }),

      // Vercel (más confiable) - usar buildSafeStorybookUrl directamente
      (async () => {
        try {
          const { buildSafeStorybookUrl } = await import(
            './verifyStorybookStories'
          );
          const urlResult = await buildSafeStorybookUrl(componentId, 'default');
          return {
            url: urlResult.url,
            source: urlResult.url.includes('github')
              ? 'GitHub (fallback)'
              : 'Vercel',
            storyUsed: urlResult.storyUsed,
          };
        } catch (error: any) {
          console.warn(
            `⚠️ [Storybook Parallel Consult] Vercel falló: ${error.message}`
          );
          return null;
        }
      })(),

      // Código exacto
      extractExactCodeFromStorybook(componentId, 'default').catch((error) => {
        console.warn(
          `⚠️ [Storybook Parallel Consult] ExactCode falló: ${error.message}`
        );
        return null;
      }),

      // API
      extractAPIFromStorybook(componentId).catch((error) => {
        console.warn(
          `⚠️ [Storybook Parallel Consult] API falló: ${error.message}`
        );
        return null;
      }),

      // Composition
      extractCompositionFromStorybook(componentId).catch((error) => {
        console.warn(
          `⚠️ [Storybook Parallel Consult] Composition falló: ${error.message}`
        );
        return null;
      }),

      // Best Practices
      extractBestPracticesFromStorybook(componentId).catch((error) => {
        console.warn(
          `⚠️ [Storybook Parallel Consult] Best Practices falló: ${error.message}`
        );
        return null;
      }),

      // Real World Examples
      extractRealWorldExamplesFromStorybook(componentId).catch((error) => {
        console.warn(
          `⚠️ [Storybook Parallel Consult] Real World Examples falló: ${error.message}`
        );
        return null;
      }),

      // Interaction Info (cómo abrir/cerrar)
      extractInteractionInfo(componentId).catch((error) => {
        console.warn(
          `⚠️ [Storybook Parallel Consult] Interaction Info falló: ${error.message}`
        );
        return null;
      }),
    ]);

    const elapsedTime = Date.now() - startTime;
    console.log(
      `✅ [Storybook Parallel Consult] Consultas completadas en ${elapsedTime}ms`
    );

    // 3. Procesar resultados
    const info: StorybookInfo = {};

    if (mcpResult.status === 'fulfilled' && mcpResult.value) {
      if (mcpResult.value.success) {
        info.mcpData = mcpResult.value.props;
      } else {
        warnings.push(`MCP no disponible: ${mcpResult.value.error}`);
      }
    } else {
      warnings.push('MCP falló o no está disponible');
    }

    if (vercelResult.status === 'fulfilled' && vercelResult.value) {
      info.vercelData = vercelResult.value;
    } else {
      warnings.push('Vercel falló o no está disponible');
    }

    if (exactCodeResult.status === 'fulfilled' && exactCodeResult.value) {
      info.exactCode = exactCodeResult.value;
    } else {
      errors.push('No se pudo extraer código exacto desde Storybook');
    }

    if (apiResult.status === 'fulfilled' && apiResult.value) {
      info.api = apiResult.value;
    } else {
      warnings.push('No se pudo extraer API desde Storybook');
    }

    if (compositionResult.status === 'fulfilled' && compositionResult.value) {
      info.composition = compositionResult.value;
    } else {
      warnings.push('No se pudo extraer composición desde Storybook');
    }

    if (
      bestPracticesResult.status === 'fulfilled' &&
      bestPracticesResult.value
    ) {
      info.bestPractices = bestPracticesResult.value;
    } else {
      warnings.push('No se pudieron extraer best practices desde Storybook');
    }

    if (
      realWorldExamplesResult.status === 'fulfilled' &&
      realWorldExamplesResult.value
    ) {
      info.realWorldExamples = realWorldExamplesResult.value;
    } else {
      warnings.push(
        'No se pudieron extraer ejemplos del mundo real desde Storybook'
      );
    }

    if (interactionResult.status === 'fulfilled' && interactionResult.value) {
      info.interactionInfo = interactionResult.value;
    } else {
      warnings.push(
        'No se pudo extraer información de interacción desde Storybook'
      );
    }

    // 4. Validar que tenemos información mínima
    if (!info.exactCode && !info.mcpData && !info.vercelData) {
      errors.push(
        'No se pudo obtener información mínima de Storybook (MCP, Vercel o exactCode)'
      );
    }

    // 5. Guardar en caché si tenemos información
    if (info.exactCode || info.mcpData || info.vercelData) {
      setStorybookInfoCached(componentId, info);
    }

    // 6. Retornar resultado
    const success = errors.length === 0;

    if (!success) {
      console.error(
        `❌ [Storybook Parallel Consult] Errores encontrados:`,
        errors
      );
    }

    if (warnings.length > 0) {
      console.warn(`⚠️ [Storybook Parallel Consult] Advertencias:`, warnings);
    }

    return {
      success,
      info,
      errors,
      warnings,
      fromCache: false,
    };
  } catch (error: any) {
    console.error(
      `❌ [Storybook Parallel Consult] Error crítico: ${error.message}`
    );
    return {
      success: false,
      info: {},
      errors: [error.message],
      warnings: [],
      fromCache: false,
    };
  }
}
