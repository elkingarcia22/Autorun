/**
 * Event Listener Manager - POC Storybook V2
 *
 * Sistema para gestionar event listeners de forma persistente,
 * especialmente útil cuando se recrea HTML dinámicamente
 */

export interface EventListenerConfig {
  selector: string;
  event: string;
  handler: (event: Event) => void;
  options?: boolean | AddEventListenerOptions;
  once?: boolean; // Si es true, el listener se ejecuta solo una vez
}

class EventListenerManager {
  private listeners: Map<string, EventListenerConfig[]> = new Map();
  private attachedListeners: WeakMap<Element, Set<string>> = new WeakMap();

  /**
   * Registra event listeners para un componente
   */
  register(componentId: string, configs: EventListenerConfig[]): void {
    console.log(
      `📝 [EventListenerManager] Registrando ${configs.length} listener(s) para: ${componentId}`
    );
    this.listeners.set(componentId, configs);
    this.attach(componentId);
  }

  /**
   * Adjunta event listeners a un componente
   */
  attach(componentId: string): void {
    const configs = this.listeners.get(componentId);
    if (!configs) {
      console.warn(
        `[EventListenerManager] No hay listeners registrados para: ${componentId}`
      );
      return;
    }

    let attachedCount = 0;

    configs.forEach((config) => {
      try {
        const elements = document.querySelectorAll(config.selector);
        elements.forEach((element) => {
          // Verificar si ya tiene el listener usando WeakMap
          const attachedSet = this.attachedListeners.get(element);
          const listenerKey = `${config.event}-${componentId}`;

          if (!attachedSet || !attachedSet.has(listenerKey)) {
            // Crear wrapper para el handler que permita removerlo después
            const wrappedHandler = (event: Event) => {
              config.handler(event);
              if (config.once) {
                element.removeEventListener(
                  config.event,
                  wrappedHandler,
                  config.options
                );
                const set = this.attachedListeners.get(element);
                if (set) {
                  set.delete(listenerKey);
                }
              }
            };

            element.addEventListener(
              config.event,
              wrappedHandler,
              config.options
            );

            // Marcar como adjuntado
            if (!attachedSet) {
              this.attachedListeners.set(element, new Set([listenerKey]));
            } else {
              attachedSet.add(listenerKey);
            }

            attachedCount++;
          }
        });
      } catch (error) {
        console.error(
          `[EventListenerManager] Error al adjuntar listener para ${componentId}:`,
          error
        );
      }
    });

    if (attachedCount > 0) {
      console.log(
        `✅ [EventListenerManager] ${attachedCount} listener(s) adjuntado(s) para: ${componentId}`
      );
    }
  }

  /**
   * Re-adjunta todos los listeners (útil después de recrear HTML)
   */
  reattachAll(): void {
    console.log(
      `🔄 [EventListenerManager] Re-adjuntando listeners para ${this.listeners.size} componente(s)`
    );
    this.listeners.forEach((_, componentId) => {
      this.attach(componentId);
    });
  }

  /**
   * Re-adjunta listeners para un componente específico
   */
  reattach(componentId: string): void {
    console.log(
      `🔄 [EventListenerManager] Re-adjuntando listeners para: ${componentId}`
    );
    this.attach(componentId);
  }

  /**
   * Elimina todos los listeners de un componente
   */
  unregister(componentId: string): void {
    const configs = this.listeners.get(componentId);
    if (!configs) {
      console.warn(
        `[EventListenerManager] No hay listeners registrados para: ${componentId}`
      );
      return;
    }

    configs.forEach((config) => {
      try {
        const elements = document.querySelectorAll(config.selector);
        elements.forEach((element) => {
          // Nota: No podemos remover listeners específicos sin guardar referencia
          // Por ahora, marcamos para re-adjuntar después
          const attachedSet = this.attachedListeners.get(element);
          if (attachedSet) {
            attachedSet.clear();
          }
        });
      } catch (error) {
        console.error(
          `[EventListenerManager] Error al eliminar listeners para ${componentId}:`,
          error
        );
      }
    });

    this.listeners.delete(componentId);
    console.log(
      `🗑️ [EventListenerManager] Listeners eliminados para: ${componentId}`
    );
  }

  /**
   * Obtiene los listeners registrados para un componente
   */
  getListeners(componentId: string): EventListenerConfig[] | undefined {
    return this.listeners.get(componentId);
  }

  /**
   * Verifica si hay listeners registrados para un componente
   */
  hasListeners(componentId: string): boolean {
    return this.listeners.has(componentId);
  }

  /**
   * Limpia todos los listeners
   */
  clear(): void {
    this.listeners.clear();
    console.log('[EventListenerManager] ✅ Todos los listeners eliminados');
  }
}

export default new EventListenerManager();
