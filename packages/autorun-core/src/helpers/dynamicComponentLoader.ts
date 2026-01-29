/**
 * Dynamic Component Loader
 *
 * Carga dinámicamente componentes desde Storybook si no están disponibles
 * en components-loader.js
 */

import { ComponentAvailability } from './componentAvailabilityDetector.js';

/**
 * Carga dinámicamente un componente desde Storybook si no está disponible
 */
export async function loadComponentDynamically(
  componentName: string,
  storybookId: string,
  availability: ComponentAvailability
): Promise<boolean> {
  if (typeof window === 'undefined') {
    console.warn('⚠️ [Dynamic Loader] Solo disponible en navegador');
    return false;
  }

  if (!availability.needsLoad) {
    console.log(
      `✅ [Dynamic Loader] Componente ${componentName} ya está disponible`
    );
    return true;
  }

  console.log(
    `📦 [Dynamic Loader] Cargando componente ${componentName} dinámicamente...`
  );

  try {
    // Opción 1: Intentar cargar desde manifest.json de Storybook
    const storybookBaseUrl = 'https://ubits-storybook10.vercel.app';
    const manifestUrl = `${storybookBaseUrl}/components/${storybookId}/manifest.json`;

    let manifest: any = null;
    try {
      const manifestResponse = await fetch(manifestUrl);
      if (manifestResponse.ok) {
        manifest = await manifestResponse.json();
        console.log(
          `✅ [Dynamic Loader] Manifest encontrado para ${componentName}`
        );
      }
    } catch (error) {
      console.warn(`⚠️ [Dynamic Loader] No se pudo cargar manifest: ${error}`);
    }

    // Opción 2: Cargar directamente el add-on desde el código fuente
    // Buscar el add-on en vendor/ubits/packages/components/
    const addonPath = `../vendor/ubits/packages/components/${componentName}/src/${componentName.charAt(0).toUpperCase() + componentName.slice(1)}Addon.ts`;

    // Opción 3: Cargar desde CDN/Storybook si está disponible
    const addonUrl =
      manifest?.addonUrl ||
      `${storybookBaseUrl}/components/${storybookId}/addon.js`;

    // Intentar cargar el script dinámicamente
    return await new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = addonUrl;
      script.async = true;

      script.onload = () => {
        console.log(
          `✅ [Dynamic Loader] Componente ${componentName} cargado desde ${addonUrl}`
        );

        // Verificar que la API esté disponible después de cargar
        setTimeout(() => {
          const apiPath = availability.apiName.split('.');
          let api = window as any;
          let available = true;

          for (const part of apiPath) {
            if (api[part] === undefined) {
              available = false;
              break;
            }
            api = api[part];
          }

          if (available) {
            console.log(
              `✅ [Dynamic Loader] API ${availability.apiName} verificada después de cargar`
            );
            resolve(true);
          } else {
            console.warn(
              `⚠️ [Dynamic Loader] API ${availability.apiName} no disponible después de cargar`
            );
            resolve(false);
          }
        }, 500);
      };

      script.onerror = () => {
        console.warn(
          `⚠️ [Dynamic Loader] Error cargando ${componentName} desde ${addonUrl}`
        );
        // Intentar fallback: cargar desde código fuente local
        loadFromLocalSource(componentName, availability).then(resolve);
      };

      document.head.appendChild(script);
    });
  } catch (error) {
    console.error(`❌ [Dynamic Loader] Error cargando componente:`, error);
    return false;
  }
}

/**
 * Carga componente desde código fuente local como fallback
 */
async function loadFromLocalSource(
  componentName: string,
  availability: ComponentAvailability
): Promise<boolean> {
  console.log(
    `📦 [Dynamic Loader] Intentando cargar ${componentName} desde código fuente local...`
  );

  // Por ahora, retornar false ya que requiere acceso al sistema de archivos
  // En el futuro, se podría implementar usando import dinámico o fetch local
  console.warn(
    `⚠️ [Dynamic Loader] Carga desde código fuente local no implementada aún`
  );
  return false;
}

/**
 * Verifica si un componente necesita ser cargado
 */
export async function ensureComponentLoaded(
  componentName: string,
  storybookId: string,
  availability: ComponentAvailability
): Promise<boolean> {
  if (!availability.needsLoad) {
    return true;
  }

  console.log(
    `📦 [Dynamic Loader] Asegurando que ${componentName} esté cargado...`
  );
  return await loadComponentDynamically(
    componentName,
    storybookId,
    availability
  );
}
