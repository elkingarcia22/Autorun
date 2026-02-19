import {
  readFileSync,
  existsSync,
  readdirSync,
  statSync,
} from '../runtime/browser-stubs/fs';
import { join } from '../runtime/browser-stubs/path';

export interface ComponentManifest {
  id: string;
  provider: string;
  name: string;
  displayName: string;
  description?: string;
  category?: string;
  tags: string[];
  version?: string;
  manifestPath: string;
  lastModified: number;
  metadata: any;
  [key: string]: any;
}

export interface CatalogStats {
  totalComponents: number;
  byProvider: Record<string, number>;
  byCategory: Record<string, number>;
}

export class ComponentCatalog {
  private components: Map<string, ComponentManifest>;
  private byProvider: Map<string, ComponentManifest[]>;
  private byCategory: Map<string, ComponentManifest[]>;

  constructor() {
    this.components = new Map();
    this.byProvider = new Map();
    this.byCategory = new Map();
  }

  /**
   * Load catalog from registry providers
   *
   * @param registryPath - Path to registry-providers directory
   */
  async loadFromRegistry(registryPath: string) {
    console.log(`[Catalog] 🔍 Scanning registry: ${registryPath}...`);
    const manifests = await this.scanManifests(registryPath);
    console.log(`[Catalog] Found ${manifests.length} manifests`);
    for (const manifest of manifests) {
      this.registerComponent(manifest);
    }
    console.log(`[Catalog] ✅ Loaded ${this.components.size} components`);
    console.log(`[Catalog] Providers: ${this.byProvider.size}`);
    console.log(`[Catalog] Categories: ${this.byCategory.size}`);
  }

  /**
   * Register a component in the catalog
   *
   * @param manifest - Component manifest
   */
  registerComponent(manifest: ComponentManifest) {
    this.components.set(manifest.id, manifest);
    const providerComponents = this.byProvider.get(manifest.provider) || [];
    if (!providerComponents.find((c) => c.id === manifest.id)) {
      providerComponents.push(manifest);
      this.byProvider.set(manifest.provider, providerComponents);
    }
    if (manifest.category) {
      const categoryComponents = this.byCategory.get(manifest.category) || [];
      if (!categoryComponents.find((c) => c.id === manifest.id)) {
        categoryComponents.push(manifest);
        this.byCategory.set(manifest.category, categoryComponents);
      }
    }
    console.log(`[Catalog] ✅ Registered: ${manifest.id}`);
  }

  /**
   * Get component by ID
   */
  getComponent(id: string): ComponentManifest | undefined {
    return this.components.get(id);
  }

  /**
   * Get all components
   */
  getAllComponents(): ComponentManifest[] {
    return Array.from(this.components.values());
  }

  /**
   * Get components by provider
   */
  getComponentsByProvider(provider: string): ComponentManifest[] {
    return this.byProvider.get(provider) || [];
  }

  /**
   * Get components by category
   */
  getComponentsByCategory(category: string): ComponentManifest[] {
    return this.byCategory.get(category) || [];
  }

  /**
   * Get all providers
   */
  getProviders(): string[] {
    return Array.from(this.byProvider.keys());
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return Array.from(this.byCategory.keys());
  }

  /**
   * Search components by name, tags, or description
   *
   * @param query - Search query
   * @returns Matching components
   */
  search(query: string): ComponentManifest[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllComponents().filter((component) => {
      return (
        component.name.toLowerCase().includes(lowerQuery) ||
        component.displayName?.toLowerCase().includes(lowerQuery) ||
        component.description?.toLowerCase().includes(lowerQuery) ||
        component.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        component.id.toLowerCase().includes(lowerQuery)
      );
    });
  }

  /**
   * Get catalog statistics
   */
  getStats(): CatalogStats {
    const byProvider: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    for (const [provider, components] of this.byProvider.entries()) {
      byProvider[provider] = components.length;
    }
    for (const [category, components] of this.byCategory.entries()) {
      byCategory[category] = components.length;
    }
    return {
      totalComponents: this.components.size,
      byProvider,
      byCategory,
    };
  }

  /**
   * Clear catalog
   */
  clear() {
    this.components.clear();
    this.byProvider.clear();
    this.byCategory.clear();
  }

  /**
   * Scan for manifest files
   * @private
   */
  private async scanManifests(
    registryPath: string
  ): Promise<ComponentManifest[]> {
    const manifests: ComponentManifest[] = [];
    const isBrowser =
      typeof window !== 'undefined' && typeof fetch !== 'undefined';
    if (isBrowser) {
      return await this.scanManifestsHTTP(registryPath);
    }
    try {
      if (!existsSync(registryPath)) {
        console.warn(`[Catalog] Registry path not found: ${registryPath}`);
        return manifests;
      }
      // @ts-ignore
      const providers = readdirSync(registryPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
      for (const provider of providers) {
        const providerPath = join(registryPath, provider);
        const componentsPath = join(providerPath, 'components');
        if (!existsSync(componentsPath)) continue;
        // @ts-ignore
        const components = readdirSync(componentsPath, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);
        for (const component of components) {
          const manifestPath = join(componentsPath, component, 'manifest.json');
          if (existsSync(manifestPath)) {
            try {
              const manifestData = JSON.parse(
                // @ts-ignore
                readFileSync(manifestPath, 'utf-8')
              );
              // @ts-ignore
              const stats = statSync(manifestPath);
              const manifest: ComponentManifest = {
                id: `${provider}/${component}`,
                provider,
                name: manifestData.component || component,
                displayName:
                  manifestData.displayName ||
                  manifestData.component ||
                  component,
                description: manifestData.description,
                category: manifestData.category,
                tags: manifestData.tags || [],
                version: manifestData.version,
                manifestPath,
                lastModified: stats.mtimeMs,
                metadata: manifestData,
              };
              manifests.push(manifest);
            } catch (error: any) {
              console.warn(
                `[Catalog] Failed to load manifest: ${manifestPath}`,
                error.message
              );
            }
          }
        }
      }
    } catch (error: any) {
      console.error(`[Catalog] Error scanning manifests:`, error.message);
    }
    return manifests;
  }

  /**
   * Scan for manifests via HTTP (browser environment)
   * @private
   */
  private async scanManifestsHTTP(
    registryBaseUrl: string
  ): Promise<ComponentManifest[]> {
    const manifests: ComponentManifest[] = [];
    try {
      // Hardcoded list for now as directory listing is not possible over HTTP easily without index
      const providers = ['ubits'];
      const componentsMap: Record<string, string[]> = {
        ubits: [
          'accordion',
          'alert',
          'button',
          'calendar',
          'card',
          'carousel',
          'data-table',
          'input',
          'list',
          'sidebar',
          'subnav',
          'tabbar',
          'toast',
          'tokens-ubits',
        ],
      };
      for (const provider of providers) {
        const components = componentsMap[provider] || [];
        for (const component of components) {
          const manifestUrl = `${registryBaseUrl}/${provider}/components/${component}/manifest.json`;
          try {
            console.log(`[Catalog] Fetching: ${manifestUrl}`);
            const response = await fetch(manifestUrl);
            if (!response.ok) {
              console.warn(
                `[Catalog] Manifest not found: ${manifestUrl} (${response.status})`
              );
              continue;
            }
            const manifestData = await response.json();
            const manifest: ComponentManifest = {
              id: `${provider}/${component}`,
              provider,
              name: manifestData.component || component,
              displayName:
                manifestData.displayName || manifestData.component || component,
              description: manifestData.description,
              category: manifestData.category,
              tags: manifestData.tags || [],
              version: manifestData.version,
              manifestPath: manifestUrl,
              lastModified: Date.now(),
              metadata: manifestData,
            };
            manifests.push(manifest);
            console.log(`[Catalog] ✅ Loaded manifest: ${manifest.id}`);
          } catch (error: any) {
            console.warn(
              `[Catalog] Failed to fetch manifest: ${manifestUrl}`,
              error.message
            );
          }
        }
      }
    } catch (error: any) {
      console.error(`[Catalog] Error scanning HTTP manifests:`, error.message);
    }
    return manifests;
  }
}

let globalCatalog: ComponentCatalog | null = null;
export function getComponentCatalog(): ComponentCatalog {
  if (!globalCatalog) {
    globalCatalog = new ComponentCatalog();
  }
  return globalCatalog;
}
