/**
 * Component Preserver - POC Storybook V2
 *
 * Sistema automático para preservar componentes cuando ContentManager.updateContent() limpia el contenido
 */

export interface PreservedComponent {
  componentId: string;
  containerId: string;
  html: string;
  handlers: Record<string, Function>;
  recreate: () => void;
  options?: Record<string, any>;
}

class ComponentPreserver {
  private preservedComponents: Map<string, PreservedComponent> = new Map();
  private isIntercepted = false;
  private originalUpdateContent:
    | ((section: string, subSection?: string | null) => any)
    | null = null;

  /**
   * Preserva un componente automáticamente
   */
  preserve(
    componentId: string,
    containerId: string,
    handlers: Record<string, Function> = {},
    options: Record<string, any> = {}
  ): void {
    const key = `${componentId}-${containerId}`;

    console.log(
      `🔒 [ComponentPreserver] Preservando componente: ${componentId} en ${containerId}`
    );

    // Guardar información del componente
    this.preservedComponents.set(key, {
      componentId,
      containerId,
      html: '',
      handlers,
      options,
      recreate: () => {
        console.log(
          `🔄 [ComponentPreserver] Recreando componente: ${componentId} en ${containerId}`
        );
        this.recreateComponent(key);
      },
    });

    // Interceptar ContentManager si aún no se ha hecho
    if (!this.isIntercepted) {
      this.interceptContentManager();
      this.isIntercepted = true;
    }

    // Guardar HTML inicial después de un pequeño delay
    setTimeout(() => {
      this.saveComponentHTML(containerId);
    }, 100);
  }

  /**
   * Intercepta ContentManager.updateContent automáticamente
   */
  private interceptContentManager(): void {
    if (typeof window === 'undefined') {
      console.warn(
        '[ComponentPreserver] window no disponible (entorno Node.js)'
      );
      return;
    }

    const windowAny = window as any;
    if (!windowAny.UBITS_ContentManager) {
      console.warn('[ComponentPreserver] ContentManager no encontrado');
      return;
    }

    const originalUpdateContent = windowAny.UBITS_ContentManager.updateContent;
    if (!originalUpdateContent) {
      console.warn('[ComponentPreserver] updateContent no encontrado');
      return;
    }

    // Guardar referencia al método original
    this.originalUpdateContent = originalUpdateContent;

    // Interceptar el método
    windowAny.UBITS_ContentManager.updateContent = (
      section: string,
      subSection?: string | null
    ) => {
      console.log(
        `🔒 [ComponentPreserver] updateContent interceptado - sección: ${section}, subSection: ${subSection}`
      );

      // Guardar HTML de todos los componentes preservados ANTES de que se limpie
      this.saveAllComponentsHTML();

      // Llamar al método original
      const result = originalUpdateContent.call(
        windowAny.UBITS_ContentManager,
        section,
        subSection
      );

      // Restaurar componentes después de updateContent
      setTimeout(() => {
        this.restoreAllComponents();
      }, 500);

      return result;
    };

    console.log(
      '[ComponentPreserver] ✅ ContentManager.updateContent interceptado automáticamente'
    );
  }

  /**
   * Guarda el HTML de un componente
   */
  private saveComponentHTML(containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(
        `[ComponentPreserver] Contenedor no encontrado: ${containerId}`
      );
      return;
    }

    // Buscar el bloque completo (div padre con estilos o el contenedor mismo)
    const block =
      container.closest('div[style*="margin-top"]') ||
      container.closest('div[style*="padding"]') ||
      container.parentElement ||
      container;

    if (block) {
      const key = Array.from(this.preservedComponents.entries()).find(
        ([_, comp]) => comp.containerId === containerId
      )?.[0];

      if (key) {
        const comp = this.preservedComponents.get(key);
        if (comp) {
          comp.html = block.outerHTML;
          console.log(
            `💾 [ComponentPreserver] HTML guardado para: ${comp.componentId} (${comp.html.length} caracteres)`
          );
        }
      }
    }
  }

  /**
   * Guarda el HTML de todos los componentes preservados
   */
  private saveAllComponentsHTML(): void {
    console.log(
      `💾 [ComponentPreserver] Guardando HTML de ${this.preservedComponents.size} componente(s)`
    );
    this.preservedComponents.forEach((comp) => {
      this.saveComponentHTML(comp.containerId);
    });
  }

  /**
   * Restaura todos los componentes preservados
   */
  private restoreAllComponents(): void {
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
      console.warn('[ComponentPreserver] .content-area no encontrado');
      return;
    }

    console.log(
      `🔄 [ComponentPreserver] Restaurando ${this.preservedComponents.size} componente(s)`
    );

    this.preservedComponents.forEach((comp) => {
      // Verificar si el componente ya existe
      const existingContainer = document.getElementById(comp.containerId);

      if (!existingContainer) {
        // Recrear el componente
        console.log(`🔄 [ComponentPreserver] Recreando: ${comp.componentId}`);
        comp.recreate();
      } else {
        // Verificar si necesita reinicialización (por ejemplo, si perdió event listeners)
        console.log(
          `✅ [ComponentPreserver] Componente ya existe: ${comp.componentId}, verificando event listeners...`
        );
        this.reattachHandlers(
          comp.componentId,
          comp.containerId,
          comp.handlers
        );
      }
    });
  }

  /**
   * Recrea un componente específico
   */
  private recreateComponent(key: string): void {
    const comp = this.preservedComponents.get(key);
    if (!comp) {
      console.warn(`[ComponentPreserver] Componente no encontrado: ${key}`);
      return;
    }

    const contentArea = document.querySelector('.content-area');
    if (!contentArea) {
      console.warn('[ComponentPreserver] .content-area no encontrado');
      return;
    }

    // Buscar contenedor objetivo
    let targetContainer = contentArea.querySelector(
      '.widget-contenido-principal'
    );
    if (!targetContainer) {
      targetContainer =
        contentArea.querySelector('.section-single') ||
        contentArea.querySelector('div[class*="widget"]') ||
        contentArea.querySelector('div:not(.header-section)');
    }

    if (!targetContainer) {
      targetContainer = contentArea;
    }

    if (targetContainer && comp.html) {
      // Insertar el HTML guardado
      targetContainer.insertAdjacentHTML('beforeend', comp.html);

      // Re-agregar event listeners después de un pequeño delay
      setTimeout(() => {
        this.reattachHandlers(
          comp.componentId,
          comp.containerId,
          comp.handlers
        );
      }, 100);
    } else {
      console.warn(
        `[ComponentPreserver] No se pudo recrear componente: ${comp.componentId}`
      );
    }
  }

  /**
   * Re-agrega event listeners a un componente
   */
  private reattachHandlers(
    componentId: string,
    containerId: string,
    handlers: Record<string, Function>
  ): void {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(
        `[ComponentPreserver] Contenedor no encontrado para re-attach: ${containerId}`
      );
      return;
    }

    // Implementar lógica específica por componente
    if (componentId === 'radio-button') {
      const inputs = container.querySelectorAll('.ubits-radio-button__input');
      inputs.forEach((input) => {
        // Remover listeners existentes si los hay
        const newInput = input.cloneNode(true) as HTMLInputElement;
        input.parentNode?.replaceChild(newInput, input);

        // Agregar nuevos listeners
        if (handlers.onChange) {
          newInput.addEventListener(
            'change',
            handlers.onChange as EventListener
          );
        }
        if (handlers.onClick) {
          newInput.addEventListener('click', handlers.onClick as EventListener);
        }

        // Agregar listener al label también
        const label = newInput.closest('.ubits-radio-button');
        if (label && handlers.onLabelClick) {
          label.addEventListener(
            'click',
            handlers.onLabelClick as EventListener
          );
        }
      });
      console.log(
        `✅ [ComponentPreserver] Event listeners re-agregados para: ${componentId}`
      );
    } else {
      // Lógica genérica para otros componentes
      Object.keys(handlers).forEach((eventName) => {
        const elements = container.querySelectorAll(
          `[data-component="${componentId}"]`
        );
        elements.forEach((element) => {
          element.addEventListener(
            eventName,
            handlers[eventName] as EventListener
          );
        });
      });
    }
  }

  /**
   * Obtiene información de un componente preservado
   */
  getPreservedComponent(
    componentId: string,
    containerId: string
  ): PreservedComponent | undefined {
    const key = `${componentId}-${containerId}`;
    return this.preservedComponents.get(key);
  }

  /**
   * Elimina la preservación de un componente
   */
  unpreserve(componentId: string, containerId: string): void {
    const key = `${componentId}-${containerId}`;
    this.preservedComponents.delete(key);
    console.log(
      `🔓 [ComponentPreserver] Preservación eliminada para: ${componentId} en ${containerId}`
    );
  }

  /**
   * Restaura la función original de updateContent (útil para testing)
   */
  restoreOriginalUpdateContent(): void {
    if (typeof window === 'undefined') return;

    const windowAny = window as any;
    if (windowAny.UBITS_ContentManager && this.originalUpdateContent) {
      windowAny.UBITS_ContentManager.updateContent = this.originalUpdateContent;
      this.isIntercepted = false;
      console.log(
        '[ComponentPreserver] ✅ Función original de updateContent restaurada'
      );
    }
  }

  private static instance: ComponentPreserver;
  static getInstance(): ComponentPreserver {
    if (!ComponentPreserver.instance) {
      ComponentPreserver.instance = new ComponentPreserver();
    }
    return ComponentPreserver.instance;
  }
}

export default ComponentPreserver.getInstance();
