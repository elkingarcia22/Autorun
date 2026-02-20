import { ComponentCatalog } from '../registry/ComponentCatalog';
import { getLogger, Logger } from './Logger';
import { UniversalMount, MountResult } from './UniversalMount';
import { AutorunBoot } from './AutorunBoot';
import { waitForDependencies } from './waitForDependencies';

export interface RegistryEntry {
  component: string;
  props?: any;
  slot: string;
  preset?: any;
  dependencies?: string[];
}

export type SlotMapping = Record<
  string,
  string | ((element: HTMLElement) => void)
>;

export class RegistryLoader {
  private logger: Logger;
  private catalog: ComponentCatalog;
  private mount: UniversalMount;
  private slotMapping: SlotMapping;

  constructor(catalog: ComponentCatalog, slotMapping?: SlotMapping) {
    this.logger = getLogger();
    this.catalog = catalog;
    this.mount = new UniversalMount(catalog);
    this.slotMapping = slotMapping || this.getDefaultSlotMapping();
  }

  /**
   * Load all components from registry in DOM
   *
   * @param selector - Selector for registry element (default: '[data-autorun-registry]')
   * @returns Number of components loaded
   */
  async loadFromDOM(
    selector: string = '[data-autorun-registry]'
  ): Promise<number> {
    try {
      AutorunBoot.requireBoot();
      const report = (window as any).__AUTORUN_BOOT_REPORT__;
      if (report?.status !== 'READY') {
        this.logger.warn(
          `Runtime not READY (${report?.status}). Skipping registry load.`
        );
        return 0;
      }
    } catch (error: any) {
      this.logger.error(
        'Boot required before loading registry:',
        error.message
      );
      return 0;
    }

    this.logger.info('🔍 Scanning for registry...');
    const registryEl = document.querySelector(selector);
    if (!registryEl) {
      this.logger.warn('No registry found');
      return 0;
    }

    let registryData = registryEl.getAttribute('data-autorun-registry');
    if (
      !registryData &&
      registryEl.tagName === 'SCRIPT' &&
      registryEl.getAttribute('type') === 'application/json'
    ) {
      registryData = registryEl.textContent || '';
    }

    if (!registryData) {
      this.logger.warn('Registry attribute is empty');
      return 0;
    }

    try {
      const entries: RegistryEntry[] = JSON.parse(registryData);
      this.logger.info(`Found ${entries.length} entries`);

      let loadedCount = 0;
      for (const entry of entries) {
        const success = await this.loadEntry(entry);
        if (success) {
          loadedCount++;
        }
      }

      this.logger.info(`✅ Loaded ${loadedCount}/${entries.length} components`);
      return loadedCount;
    } catch (error) {
      this.logger.error('Failed to parse registry:', error);
      return 0;
    }
  }

  /**
   * Load single registry entry
   *
   * @param entry - Registry entry
   * @returns True if loaded successfully
   */
  async loadEntry(entry: RegistryEntry): Promise<boolean> {
    console.log(`[RegistryLoader] Loading ${entry.component}...`);
    try {
      if (entry.dependencies && entry.dependencies.length > 0) {
        console.log(
          `[RegistryLoader] Waiting for dependencies: ${entry.dependencies.join(', ')}`
        );
        try {
          await waitForDependencies(entry.dependencies, {
            timeout: 10000,
            checkInterval: 100,
          });
        } catch (depErr: any) {
          console.warn(`[RegistryLoader] ⚠️ Dependency delayed/missing for ${entry.component}: ${depErr.message}. Attempting to mount anyway...`);
        }
      }

      const containerId = this.generateContainerId(entry.component);
      const result = this.mount.mount({
        componentId: entry.component,
        containerId,
        props: entry.props,
        preset: entry.preset,
        slot: entry.slot,
      });

      if (result.element) {
        this.insertIntoSlot(result.element, entry.slot);
      }

      return result.success;
    } catch (error) {
      console.error(
        `[RegistryLoader] ❌ Failed to load ${entry.component}:`,
        error
      );
      return false;
    }
  }

  /**
   * Insert element into slot
   *
   * @param element - Element to insert
   * @param slot - Slot identifier
   */
  insertIntoSlot(element: HTMLElement, slot: string) {
    const mapping = this.slotMapping[slot];
    if (!mapping) {
      console.warn(`[RegistryLoader] Unknown slot: ${slot}, appending to body`);
      document.body.appendChild(element);
      return;
    }

    if (typeof mapping === 'function') {
      mapping(element);
    } else {
      const target = document.querySelector(mapping);
      if (target) {
        target.insertAdjacentElement('afterend', element);
        console.log(
          `[RegistryLoader] Inserted into slot: ${slot} (${mapping})`
        );
      } else {
        console.warn(
          `[RegistryLoader] Slot target not found: ${mapping}, appending to body`
        );
        document.body.appendChild(element);
      }
    }
  }

  /**
   * Generate unique container ID
   *
   * @param componentId - Component ID
   * @returns Unique container ID
   */
  generateContainerId(componentId: string): string {
    const safeName = componentId.replace(/[^a-z0-9]/gi, '-');
    const timestamp = Date.now();
    return `autorun-${safeName}-${timestamp}`;
  }

  /**
   * Get default slot mapping
   *
   * @returns Default slot mapping
   */
  getDefaultSlotMapping(): SlotMapping {
    return {
      'below-subnav': '#top-nav-container',
      'content-area': '.content-area',
      sidebar: '.sidebar',
      header: 'header',
      footer: 'footer',
      main: 'main',
    };
  }

  /**
   * Set custom slot mapping
   *
   * @param mapping - Slot mapping
   */
  setSlotMapping(mapping: SlotMapping) {
    this.slotMapping = { ...this.slotMapping, ...mapping };
  }

  /**
   * Load from JSON string
   *
   * @param json - JSON string with registry entries
   * @returns Number of components loaded
   */
  async loadFromJSON(json: string): Promise<number> {
    try {
      const entries: RegistryEntry[] = JSON.parse(json);
      console.log(
        `[RegistryLoader] Loading ${entries.length} entries from JSON`
      );

      let loadedCount = 0;
      for (const entry of entries) {
        const success = await this.loadEntry(entry);
        if (success) {
          loadedCount++;
        }
      }

      console.log(
        `[RegistryLoader] ✅ Loaded ${loadedCount}/${entries.length} components`
      );
      return loadedCount;
    } catch (error) {
      console.error('[RegistryLoader] ❌ Failed to parse JSON:', error);
      return 0;
    }
  }

  /**
   * Load from array of entries
   *
   * @param entries - Array of registry entries
   * @returns Number of components loaded
   */
  async loadFromArray(entries: RegistryEntry[]): Promise<number> {
    console.log(
      `[RegistryLoader] Loading ${entries.length} entries from array`
    );

    let loadedCount = 0;
    for (const entry of entries) {
      const success = await this.loadEntry(entry);
      if (success) {
        loadedCount++;
      }
    }

    console.log(
      `[RegistryLoader] ✅ Loaded ${loadedCount}/${entries.length} components`
    );
    return loadedCount;
  }
}

export async function initializeRegistry(
  catalog: ComponentCatalog,
  selector?: string
) {
  const loader = new RegistryLoader(catalog);
  return await loader.loadFromDOM(selector);
}
