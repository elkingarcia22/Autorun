export interface AdapterOptions {
  description?: string;
  wrapsApi?: string;
  [key: string]: any;
}

export type AdapterFn = (
  container: HTMLElement,
  props: any
) => HTMLElement | void;

interface AdapterInfo {
  name: string;
  adapter: AdapterFn;
  [key: string]: any;
}

export class AdapterRegistry {
  private adapters: Map<string, AdapterInfo>;

  constructor() {
    this.adapters = new Map();
  }

  /**
   * Register an adapter
   *
   * @param name - Adapter name (usually component name)
   * @param adapter - Adapter function
   * @param options - Additional options
   */
  register(name: string, adapter: AdapterFn, options: AdapterOptions = {}) {
    this.adapters.set(name, {
      name,
      adapter,
      ...options,
    });
  }

  /**
   * Get an adapter by name
   *
   * @param name - Adapter name
   * @returns Adapter function or undefined
   */
  get(name: string): AdapterFn | undefined {
    return this.adapters.get(name)?.adapter;
  }

  /**
   * Check if an adapter exists
   *
   * @param name - Adapter name
   * @returns True if adapter exists
   */
  has(name: string): boolean {
    return this.adapters.has(name);
  }

  /**
   * Get all registered adapter names
   *
   * @returns Array of adapter names
   */
  getNames(): string[] {
    return Array.from(this.adapters.keys());
  }

  /**
   * Get adapter definition (includes metadata)
   *
   * @param name - Adapter name
   * @returns Adapter definition or undefined
   */
  getDefinition(name: string): AdapterInfo | undefined {
    return this.adapters.get(name);
  }

  /**
   * Remove an adapter
   *
   * @param name - Adapter name
   * @returns True if adapter was removed
   */
  remove(name: string): boolean {
    return this.adapters.delete(name);
  }

  /**
   * Clear all adapters
   */
  clear() {
    this.adapters.clear();
  }

  /**
   * Register built-in adapters
   *
   * Registers common adapters for UBITS components with non-standard APIs.
   */
  registerBuiltIns() {
    this.register(
      'accordion',
      (container: HTMLElement, props: any) => {
        if (!(window as any).UBITS?.Accordion?.createAccordion) {
          throw new Error(
            'window.UBITS.Accordion.createAccordion not available'
          );
        }
        return (window as any).UBITS.Accordion.createAccordion(
          container,
          props
        );
      },
      {
        description: 'Adapter for Accordion component (uses createAccordion)',
        wrapsApi: 'window.UBITS.Accordion.createAccordion',
      }
    );
  }
}

let globalRegistry: AdapterRegistry | null = null;
export function getAdapterRegistry(): AdapterRegistry {
  if (!globalRegistry) {
    globalRegistry = new AdapterRegistry();
    globalRegistry.registerBuiltIns();
  }
  return globalRegistry;
}

export function registerAdapter(
  name: string,
  adapter: AdapterFn,
  options?: AdapterOptions
) {
  getAdapterRegistry().register(name, adapter, options);
}

export function getAdapter(name: string): AdapterFn | undefined {
  return getAdapterRegistry().get(name);
}
