/**
 * Component Availability Detector
 *
 * Detecta automáticamente qué componentes están disponibles en components-loader.js
 * y cuáles faltan, verificando si las APIs están expuestas en window.
 */

export interface ComponentAvailability {
  available: boolean;
  apiName: string; // ej: "window.UBITS.Gallery.create"
  needsLoad: boolean;
  addonName?: string; // ej: "@ubits/gallery"
}

/**
 * Mapeo de nombres de componentes a sus APIs en window
 */
const COMPONENT_API_MAP: Record<
  string,
  {
    apiName: string;
    addonName: string;
    storybookId?: string;
  }
> = {
  gallery: {
    apiName: 'window.UBITS.Gallery.create',
    addonName: '@ubits/gallery',
    storybookId: 'layout-gallery',
  },
  tabs: {
    apiName: 'window.createTabs',
    addonName: '@ubits/tabs',
    storybookId: 'navegación-tabs',
  },
  card: {
    apiName: 'window.createCard',
    addonName: '@ubits/card',
    storybookId: 'layout-card',
  },
  'simple-card': {
    apiName: 'window.createSimpleCard',
    addonName: '@ubits/simple-card',
    storybookId: 'layout-simple-card',
  },
  button: {
    apiName: 'window.createButton',
    addonName: '@ubits/button',
    storybookId: 'básicos-button',
  },
  input: {
    apiName: 'window.createInput',
    addonName: '@ubits/input',
    storybookId: 'básicos-input',
  },
  checkbox: {
    apiName: 'window.createCheckbox',
    addonName: '@ubits/checkbox',
    storybookId: 'básicos-checkbox',
  },
  radio: {
    apiName: 'window.createRadio',
    addonName: '@ubits/radio',
    storybookId: 'básicos-radio',
  },
  select: {
    apiName: 'window.createSelect',
    addonName: '@ubits/select',
    storybookId: 'básicos-select',
  },
  modal: {
    apiName: 'window.createModal',
    addonName: '@ubits/modal',
    storybookId: 'feedback-modal',
  },
  'data-table': {
    apiName: 'window.createDataTable',
    addonName: '@ubits/data-table',
    storybookId: 'datos-data-table',
  },
  // Agregar más componentes según sea necesario
};

/**
 * Detecta si un componente está disponible en window
 */
export async function detectComponentAvailability(
  componentName: string
): Promise<ComponentAvailability> {
  // 1. Normalizar nombre del componente
  const normalized = componentName.toLowerCase().replace(/[^a-z0-9-]/g, '-');

  // 2. Buscar en el mapeo
  const componentInfo = COMPONENT_API_MAP[normalized];
  if (!componentInfo) {
    console.warn(
      `⚠️ [Availability Detector] Componente "${componentName}" no encontrado en mapeo`
    );
    return {
      available: false,
      apiName: '',
      needsLoad: true,
    };
  }

  // 3. Verificar si la API existe en window (solo en navegador)
  if (typeof window !== 'undefined') {
    const apiPath = componentInfo.apiName.split('.');
    let current: any = window;

    for (const part of apiPath) {
      if (current[part] === undefined) {
        console.log(
          `⚠️ [Availability Detector] ${componentInfo.apiName} no está disponible`
        );
        return {
          available: false,
          apiName: componentInfo.apiName,
          needsLoad: true,
          addonName: componentInfo.addonName,
        };
      }
      current = current[part];
    }

    console.log(
      `✅ [Availability Detector] ${componentInfo.apiName} está disponible`
    );
    return {
      available: true,
      apiName: componentInfo.apiName,
      needsLoad: false,
      addonName: componentInfo.addonName,
    };
  }

  // 4. Si no estamos en navegador, asumir que necesita carga
  return {
    available: false,
    apiName: componentInfo.apiName,
    needsLoad: true,
    addonName: componentInfo.addonName,
  };
}

/**
 * Obtiene información de API para un componente
 */
export function getComponentAPIInfo(componentName: string): {
  apiName: string;
  addonName: string;
  storybookId?: string;
} | null {
  const normalized = componentName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const info = COMPONENT_API_MAP[normalized];
  return info || null;
}

/**
 * Lista todos los componentes disponibles en el mapeo
 */
export function getAllMappedComponents(): string[] {
  return Object.keys(COMPONENT_API_MAP);
}
