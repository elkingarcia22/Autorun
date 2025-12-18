/**
 * Storybook Fallback Helper
 *
 * ⚠️ CRÍTICO: Este módulo NO usa fallbacks de UBITS.
 * Usa SOLO el Storybook activo del StorybookManager.
 * Si el Storybook activo no está disponible, lanza error en lugar de usar fallback.
 */

/**
 * Verifica si una URL está disponible
 */
async function isUrlAvailable(
  url: string,
  timeout: number = 5000
): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      mode: 'no-cors', // Para evitar CORS en verificación
    });

    clearTimeout(timeoutId);
    return true; // Si no hay error, asumimos que está disponible
  } catch (error) {
    return false;
  }
}

/**
 * Obtiene la URL de Storybook usando SOLO el Storybook activo
 *
 * ⚠️ CRÍTICO: NO usa fallback de UBITS. Usa SOLO el Storybook activo del StorybookManager.
 * Si el Storybook activo no está disponible, lanza error en lugar de usar fallback.
 *
 * @param path - Ruta adicional (ej: '/index.json', '/components/button/manifest.json')
 * @param options - Opciones
 * @returns URL del Storybook activo
 * @throws Error si no hay Storybook activo configurado o no está disponible
 */
export async function getStorybookUrlWithFallback(
  path: string = '',
  options: {
    checkAvailability?: boolean;
    timeout?: number;
    forceFallback?: boolean;
  } = {}
): Promise<{
  url: string;
  source: 'vercel' | 'github' | 'custom';
  usedFallback: boolean;
}> {
  const {
    checkAvailability = true,
    timeout = 5000,
    forceFallback = false,
  } = options;

  // ⭐ NUEVO: Intentar usar StorybookManager primero (Storybook dinámico)
  try {
    const { StorybookManager } = await import('./storybookManager');
    const manager = StorybookManager.getInstance();
    const activeConfig = await manager.getActiveConfig();

    if (activeConfig) {
      // Usar Storybook activo del manager
      const url = await manager.buildStorybookUrl(path);

      if (!checkAvailability) {
        return {
          url,
          source: 'custom',
          usedFallback: false,
        };
      }

      // Verificar disponibilidad
      const isAvailable = await isUrlAvailable(url, timeout);
      if (isAvailable) {
        return {
          url,
          source: 'custom',
          usedFallback: false,
        };
      }

      // ⚠️ CRÍTICO: NO usar fallback de UBITS
      // Si el Storybook activo no está disponible, lanzar error
      // Solo usar fallback si el Storybook activo tiene un fallback configurado específicamente
      if (activeConfig.fallbackUrl && activeConfig.getFallbackUrl) {
        // Este fallback es del Storybook activo mismo, no de UBITS
        const fallbackUrl = activeConfig.getFallbackUrl(path);
        console.warn(
          `⚠️ [Storybook Fallback] Storybook activo no disponible, usando fallback del Storybook activo: ${fallbackUrl}`
        );
        return {
          url: fallbackUrl,
          source: 'custom',
          usedFallback: true,
        };
      }

      // Si no hay fallback configurado en el Storybook activo, lanzar error
      throw new Error(
        `❌ El Storybook activo (${activeConfig.name}) no está disponible en: ${activeConfig.url}`
      );
    }
  } catch (error) {
    // ⚠️ CRÍTICO: NO usar fallback de UBITS si StorybookManager no está disponible
    // En su lugar, lanzar error para que el usuario sepa que debe configurar el Storybook
    console.error(
      `❌ [Storybook Fallback] StorybookManager no disponible y NO se usará fallback de UBITS`
    );
    throw new Error(
      `❌ No hay Storybook configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`
    );
  }

  // ⚠️ CRÍTICO: NO usar fallback de UBITS
  // Si llegamos aquí, significa que activeConfig es null o undefined
  // Esta línea nunca debería ejecutarse porque el catch anterior ya lanza error
  // Pero la dejamos como seguridad adicional
  throw new Error(
    `❌ No hay Storybook configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`
  );
}

/**
 * Fetch con fallback automático
 * Intenta Vercel primero, si falla, intenta GitHub
 *
 * @param path - Ruta adicional (ej: '/index.json', '/components/button/manifest.json')
 * @param options - Opciones de fetch
 * @returns Response del fetch
 */
export async function fetchStorybookWithFallback(
  path: string = '',
  options: RequestInit = {}
): Promise<Response> {
  // ⚠️ CRÍTICO: NO usar fallback de UBITS
  // Usar SOLO el Storybook activo del StorybookManager
  try {
    const { StorybookManager } = await import('./storybookManager');
    const manager = StorybookManager.getInstance();
    const activeConfig = await manager.getActiveConfig();

    if (!activeConfig) {
      throw new Error(
        `❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`
      );
    }

    // Usar URL del Storybook activo
    const url = await manager.buildStorybookUrl(path);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `❌ El Storybook activo (${activeConfig.name}) no está disponible. Verifica que esté accesible en: ${activeConfig.url}`
      );
    }

    return response;
  } catch (error: any) {
    // ⚠️ CRÍTICO: NO usar fallback de UBITS
    // Lanzar error en lugar de usar fallback
    console.error(
      `❌ [Storybook Fallback] Error accediendo al Storybook activo:`,
      error.message
    );
    throw new Error(
      `❌ No se pudo acceder al Storybook activo. ${error.message}`
    );
  }
}

/**
 * Obtiene la URL base del Storybook activo
 *
 * ⚠️ CRÍTICO: NO usa fallback de UBITS. Usa SOLO el Storybook activo del StorybookManager.
 * Útil para navegación en el navegador.
 *
 * @returns URL base del Storybook activo
 * @throws Error si no hay Storybook activo configurado
 */
export function getStorybookBaseUrlWithFallback(): {
  url: string;
  source: 'vercel' | 'github' | 'custom';
} {
  // ⚠️ CRÍTICO: NO usar fallback de UBITS
  // Usar SOLO el Storybook activo del StorybookManager
  try {
    const { StorybookManager } = require('./storybookManager');
    const manager = StorybookManager.getInstance();
    const activeConfig = manager.getActiveConfigSync?.();

    if (activeConfig) {
      return {
        url: activeConfig.url,
        source: 'custom',
      };
    }
  } catch (error) {
    // Si no se puede obtener, lanzar error
  }

  throw new Error(
    `❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`
  );
}

/**
 * Mapea nombre de componente a URL de Storybook con fallback
 *
 * ⚠️ CRÍTICO: NO usa fallback de UBITS. Usa SOLO el Storybook activo.
 */
export async function getComponentStorybookUrlWithFallback(
  componentName: string,
  storyName: string = 'default'
): Promise<{
  url: string;
  source: 'vercel' | 'github' | 'custom';
  usedFallback: boolean;
}> {
  // ⚠️ CRÍTICO: NO usar fallback de UBITS
  // Usar SOLO el Storybook activo del StorybookManager
  try {
    const { StorybookManager } = await import('./storybookManager');
    const { mapComponentNameToStorybookId } = await import(
      './storybookStories'
    );
    const manager = StorybookManager.getInstance();
    const activeConfig = await manager.getActiveConfig();

    if (!activeConfig) {
      throw new Error(
        `❌ No hay Storybook activo configurado. Por favor, conecta un Storybook usando: npm run storybook:connect`
      );
    }

    // Obtener ID del componente desde el Storybook activo
    const componentId = await mapComponentNameToStorybookId(componentName);

    // Construir URL usando el Storybook activo (priorizando /docs/)
    const path = `?path=/docs/${componentId}--docs`;
    const url = await manager.buildStorybookUrl(path);

    return {
      url,
      source: 'custom',
      usedFallback: false,
    };
  } catch (error: any) {
    // ⚠️ CRÍTICO: NO usar fallback de UBITS
    // Lanzar error en lugar de usar fallback
    throw new Error(
      `❌ No se pudo obtener URL del componente ${componentName} desde el Storybook activo. ${error.message}`
    );
  }
}
