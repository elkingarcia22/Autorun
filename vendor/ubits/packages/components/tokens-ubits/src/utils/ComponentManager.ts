/**
 * ComponentManager
 * 
 * Gestor centralizado de componentes que permite cargar y cambiar
 * componentes desde Storybook u otras fuentes, similar a TokensManager
 */

export interface ComponentAddon {
  name: string;
  version: string;
  initialize(context?: any): Promise<void>;
  destroy(): void;
  getComponents(): Array<{ name: string; tag: string; documentation?: string }>;
  getStyles(): string[];
}

export interface ComponentSource {
  /**
   * URL al manifest del componente
   */
  manifestUrl?: string;
  
  /**
   * Manifest JSON directo
   */
  manifest?: {
    name: string;
    version: string;
    type: 'component';
    components: Array<{
      name: string;
      tag: string;
      path: string;
    }>;
    styles: string[];
    dependencies?: Record<string, string>;
  };
  
  /**
   * URL al bundle JS del componente
   */
  jsUrl?: string;
  
  /**
   * URLs a los estilos CSS
   */
  cssUrls?: string[];
}

export class ComponentManager {
  private loadedComponents = new Map<string, ComponentAddon>();
  private loadedStyles = new Set<string>();

  /**
   * Carga un componente desde una fuente (Storybook, manifest, etc.)
   */
  async loadComponent(
    source: ComponentSource,
    context: any = {}
  ): Promise<ComponentAddon> {
    let manifest: ComponentSource['manifest'];

    // Obtener manifest
    if (source.manifest) {
      manifest = source.manifest;
    } else if (source.manifestUrl) {
      const response = await fetch(source.manifestUrl);
      manifest = await response.json();
    } else {
      throw new Error('Debe proporcionar manifest o manifestUrl');
    }

    // Verificar si ya está cargado
    if (this.loadedComponents.has(manifest.name)) {
      console.warn(`Componente ${manifest.name} ya está cargado`);
      return this.loadedComponents.get(manifest.name)!;
    }

    // Cargar estilos
    if (manifest.styles && manifest.styles.length > 0) {
      await this.loadStyles(manifest.styles, source.manifestUrl);
    } else if (source.cssUrls && source.cssUrls.length > 0) {
      await this.loadStyles(source.cssUrls);
    }

    // Cargar código del componente
    const componentAddon = await this.loadComponentCode(
      manifest,
      source.jsUrl,
      context
    );

    // Guardar referencia
    this.loadedComponents.set(manifest.name, componentAddon);

    console.log(`✅ Componente ${manifest.name} cargado exitosamente`);
    return componentAddon;
  }

  /**
   * Carga estilos CSS
   */
  private async loadStyles(
    styles: string[],
    baseUrl?: string
  ): Promise<void> {
    for (const stylePath of styles) {
      // Resolver URL completa
      const fullUrl = baseUrl
        ? new URL(stylePath, baseUrl).href
        : stylePath;

      // Evitar cargar duplicados
      if (this.loadedStyles.has(fullUrl)) {
        continue;
      }

      // Cargar CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fullUrl;
      link.id = `ubits-component-style-${fullUrl.replace(/[^a-z0-9]/gi, '-')}`;

      await new Promise<void>((resolve, reject) => {
        link.onload = () => {
          this.loadedStyles.add(fullUrl);
          resolve();
        };
        link.onerror = () => reject(new Error(`Error cargando CSS: ${fullUrl}`));
        document.head.appendChild(link);
      });
    }
  }

  /**
   * Carga el código del componente
   */
  private async loadComponentCode(
    manifest: ComponentSource['manifest'],
    jsUrl?: string,
    context: any = {}
  ): Promise<ComponentAddon> {
    if (!manifest) {
      throw new Error('Manifest requerido');
    }

    // Determinar URL del JS
    const componentPath = jsUrl || manifest.components[0]?.path;
    if (!componentPath) {
      throw new Error('No se pudo determinar la ruta del componente');
    }

    // Resolver URL completa si es relativa
    const fullJsUrl = componentPath.startsWith('http')
      ? componentPath
      : new URL(componentPath, window.location.href).href;

    try {
      // Dynamic import del componente
      const module = await import(/* @vite-ignore */ fullJsUrl);
      
      // Obtener la clase del add-on (puede ser default export o named export)
      const AddonClass = module.default || module[manifest.name] || module.ComponentAddon;
      
      if (!AddonClass) {
        throw new Error(`No se pudo encontrar la clase del add-on en ${fullJsUrl}`);
      }

      // Instanciar y inicializar
      const addon = new AddonClass();
      await addon.initialize(context);

      return addon;
    } catch (error) {
      console.error(`Error cargando componente ${manifest.name}:`, error);
      throw error;
    }
  }

  /**
   * Reemplaza un componente existente con uno nuevo
   */
  async replaceComponent(
    componentName: string,
    source: ComponentSource,
    context: any = {}
  ): Promise<ComponentAddon> {
    // Destruir componente anterior si existe
    const existing = this.loadedComponents.get(componentName);
    if (existing) {
      existing.destroy();
      this.loadedComponents.delete(componentName);
    }

    // Cargar nuevo componente
    return await this.loadComponent(source, context);
  }

  /**
   * Obtiene información de componentes cargados
   */
  getLoadedComponents(): Array<{
    name: string;
    version: string;
    components: Array<{ name: string; tag: string }>;
  }> {
    return Array.from(this.loadedComponents.values()).map(addon => ({
      name: addon.name,
      version: addon.version,
      components: addon.getComponents()
    }));
  }

  /**
   * Verifica si un componente está cargado
   */
  isComponentLoaded(name: string): boolean {
    return this.loadedComponents.has(name);
  }

  /**
   * Limpia todos los componentes
   */
  destroy(): void {
    for (const addon of this.loadedComponents.values()) {
      addon.destroy();
    }
    this.loadedComponents.clear();
    this.loadedStyles.clear();
  }
}

/**
 * Instancia global del ComponentManager
 */
let globalComponentManager: ComponentManager | null = null;

/**
 * Obtiene o crea la instancia global del ComponentManager
 */
export function getComponentManager(): ComponentManager {
  if (!globalComponentManager) {
    globalComponentManager = new ComponentManager();
  }
  return globalComponentManager;
}

