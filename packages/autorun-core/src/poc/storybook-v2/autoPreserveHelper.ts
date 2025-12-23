/**
 * Auto Preserve Helper - POC Storybook V2
 *
 * Función helper que automáticamente preserva componentes y configura event listeners
 */

import ComponentPreserver from './componentPreserver.js';
import EventListenerManager from './eventListenerManager.js';
import DependencyChecker from './dependencyChecker.js';

export interface AutoPreserveOptions {
  componentId: string;
  containerId: string;
  handlers?: Record<string, Function>;
  options?: Record<string, any>;
  waitForDependencies?: boolean;
  dependencyTimeout?: number;
}

/**
 * Preserva automáticamente un componente y configura sus event listeners
 */
export async function autoPreserveComponent(
  config: AutoPreserveOptions
): Promise<boolean> {
  const {
    componentId,
    containerId,
    handlers = {},
    options = {},
    waitForDependencies = true,
    dependencyTimeout = 5000,
  } = config;

  console.log(
    `🚀 [AutoPreserve] Configurando preservación automática para: ${componentId}`
  );

  // 1. Verificar dependencias si es necesario
  if (waitForDependencies) {
    console.log(
      `⏳ [AutoPreserve] Esperando dependencias para: ${componentId}`
    );
    const dependencyCheck = await DependencyChecker.waitForDependencies(
      componentId,
      dependencyTimeout
    );

    if (!dependencyCheck.cssLoaded) {
      console.warn(
        `⚠️ [AutoPreserve] CSS no cargado para: ${componentId} - continuando de todas formas`
      );
    }

    if (!dependencyCheck.componentRegistered) {
      console.warn(
        `⚠️ [AutoPreserve] Componente no registrado: ${componentId} - puede requerir registro manual`
      );
    }
  }

  // 2. Registrar event listeners si se proporcionan
  if (Object.keys(handlers).length > 0) {
    const listenerConfigs = Object.entries(handlers).map(([event, handler]) => {
      // Determinar selector basado en el componente
      let selector = '';
      if (componentId === 'radio-button') {
        if (event === 'onChange' || event === 'change') {
          selector = `.ubits-radio-button__input`;
        } else if (event === 'onLabelClick' || event === 'labelClick') {
          selector = `.ubits-radio-button`;
        } else {
          selector = `#${containerId} .ubits-radio-button`;
        }
      } else {
        // Selector genérico
        selector = `#${containerId} [data-component="${componentId}"]`;
      }

      return {
        selector,
        event: event.replace(/^on/, '').toLowerCase(), // "onChange" -> "change"
        handler: handler as (event: Event) => void,
      };
    });

    EventListenerManager.register(componentId, listenerConfigs);
  }

  // 3. Preservar el componente
  ComponentPreserver.preserve(componentId, containerId, handlers, options);

  console.log(
    `✅ [AutoPreserve] Preservación automática configurada para: ${componentId}`
  );
  return true;
}

/**
 * Helper específico para RadioButton
 */
export async function autoPreserveRadioButton(
  containerId: string,
  onChangeHandler?: (event: Event) => void
): Promise<boolean> {
  const handlers: Record<string, Function> = {};

  if (onChangeHandler) {
    handlers.onChange = onChangeHandler;

    // También agregar handler para clic en label
    handlers.onLabelClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const input = target
        .closest('.ubits-radio-button')
        ?.querySelector('.ubits-radio-button__input') as HTMLInputElement;
      if (input && !input.disabled) {
        setTimeout(() => {
          if (input.checked) {
            onChangeHandler({ target: input } as Event);
          }
        }, 10);
      }
    };
  }

  return autoPreserveComponent({
    componentId: 'radio-button',
    containerId,
    handlers,
    waitForDependencies: true,
  });
}
