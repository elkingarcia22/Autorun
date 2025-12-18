/**
 * Storybook Manager
 *
 * Sistema de gestión dinámica de Storybooks que permite conectar/desconectar
 * cualquier Storybook y adaptarse automáticamente a su estructura.
 */

export interface StorybookConfig {
  id: string; // ID único del Storybook (ej: 'ubits', 'libraries-ui')
  name: string; // Nombre descriptivo
  url: string; // URL base del Storybook (ej: 'https://ubits-storybook10.vercel.app')
  indexJsonUrl?: string; // URL del index.json (ej: 'https://ubits-storybook10.vercel.app/index.json')
  bypassToken?: string; // Token de bypass si está protegido
  fallbackUrl?: string; // URL de fallback
  mcpEnabled?: boolean; // Si el MCP está habilitado para este Storybook
  componentMapping?: Record<string, string>; // Mapeo de nombres de componentes a IDs de Storybook
  getUrl?: (path?: string) => string; // Función para construir URLs
  getFallbackUrl?: (path?: string) => string; // Función para construir URLs de fallback
}

export interface StorybookConnection {
  config: StorybookConfig;
  connected: boolean;
  connectedAt?: Date;
  lastUsed?: Date;
}

/**
 * Gestor de Storybooks
 * Permite conectar/desconectar múltiples Storybooks y cambiar entre ellos
 */
export class StorybookManager {
  private static instance: StorybookManager;
  private connections: Map<string, StorybookConnection> = new Map();
  private activeStorybookId: string | null = null;
  private configPath: string = '.autorun/storybooks.json';
  private connectionsLoaded: boolean = false;

  private constructor() {
    // Cargar conexiones de forma asíncrona
    this.loadConnections().catch((error) => {
      console.warn(`⚠️ [Storybook Manager] Error cargando conexiones:`, error);
    });
  }

  /**
   * Asegurar que las conexiones estén cargadas
   */
  private async ensureConnectionsLoaded(): Promise<void> {
    // Si no se han cargado aún, cargar
    if (!this.connectionsLoaded) {
      await this.loadConnections();
      this.connectionsLoaded = true;
    }
  }

  /**
   * Obtener instancia singleton
   */
  static getInstance(): StorybookManager {
    if (!StorybookManager.instance) {
      StorybookManager.instance = new StorybookManager();
    }
    return StorybookManager.instance;
  }

  /**
   * Conectar un Storybook
   */
  async connectStorybook(
    config: StorybookConfig,
    options: { setAsActive?: boolean } = {}
  ): Promise<StorybookConnection> {
    const { setAsActive = false } = options;

    // Validar que la URL sea accesible
    const indexUrl = config.indexJsonUrl || `${config.url}/index.json`;
    const isAccessible = await this.checkStorybookAccessibility(indexUrl);

    if (!isAccessible) {
      throw new Error(
        `❌ No se pudo acceder al Storybook en ${indexUrl}. Verifica que la URL sea correcta y esté accesible.`
      );
    }

    // Detectar estructura del Storybook automáticamente
    const detectedStructure = await this.detectStorybookStructure(config.url);

    // Crear conexión
    const connection: StorybookConnection = {
      config: {
        ...config,
        indexJsonUrl: indexUrl,
        componentMapping:
          detectedStructure.componentMapping || config.componentMapping,
      },
      connected: true,
      connectedAt: new Date(),
      lastUsed: new Date(),
    };

    this.connections.set(config.id, connection);

    // Si se debe establecer como activo
    if (setAsActive || this.activeStorybookId === null) {
      this.activeStorybookId = config.id;
    }

    // Guardar conexiones
    await this.saveConnections();

    // Configurar MCP automáticamente si está habilitado
    if (config.mcpEnabled !== false) {
      await this.configureMCP(config);
    }

    console.log(
      `✅ [Storybook Manager] Storybook "${config.name}" conectado exitosamente`
    );
    console.log(`   ID: ${config.id}`);
    console.log(`   URL: ${config.url}`);
    console.log(
      `   Componentes detectados: ${Object.keys(detectedStructure.componentMapping || {}).length}`
    );

    return connection;
  }

  /**
   * Desconectar un Storybook
   */
  async disconnectStorybook(storybookId: string): Promise<void> {
    const connection = this.connections.get(storybookId);

    if (!connection) {
      throw new Error(`❌ Storybook "${storybookId}" no está conectado`);
    }

    // Si es el Storybook activo, cambiar a otro o desactivar
    if (this.activeStorybookId === storybookId) {
      const otherConnections = Array.from(this.connections.entries()).filter(
        ([id]) => id !== storybookId && this.connections.get(id)?.connected
      );

      if (otherConnections.length > 0) {
        this.activeStorybookId = otherConnections[0][0];
        console.log(
          `🔄 [Storybook Manager] Cambiando Storybook activo a: ${this.connections.get(this.activeStorybookId)?.config.name}`
        );
      } else {
        this.activeStorybookId = null;
        console.log(`⚠️ [Storybook Manager] No hay Storybooks conectados`);
      }
    }

    connection.connected = false;
    connection.lastUsed = new Date();

    await this.saveConnections();

    console.log(
      `✅ [Storybook Manager] Storybook "${connection.config.name}" desconectado`
    );
  }

  /**
   * Cambiar Storybook activo
   */
  async setActiveStorybook(storybookId: string): Promise<void> {
    const connection = this.connections.get(storybookId);

    if (!connection) {
      throw new Error(`❌ Storybook "${storybookId}" no está conectado`);
    }

    if (!connection.connected) {
      throw new Error(`❌ Storybook "${storybookId}" está desconectado`);
    }

    this.activeStorybookId = storybookId;
    connection.lastUsed = new Date();

    await this.saveConnections();

    // Configurar MCP para el nuevo Storybook activo
    if (connection.config.mcpEnabled !== false) {
      await this.configureMCP(connection.config);
    }

    console.log(
      `✅ [Storybook Manager] Storybook activo cambiado a: "${connection.config.name}"`
    );
  }

  /**
   * Obtener Storybook activo
   */
  getActiveStorybook(): StorybookConnection | null {
    if (!this.activeStorybookId) {
      return null;
    }

    const connection = this.connections.get(this.activeStorybookId);
    return connection?.connected ? connection : null;
  }

  /**
   * Obtener configuración del Storybook activo
   */
  async getActiveConfig(): Promise<StorybookConfig | null> {
    await this.ensureConnectionsLoaded();
    const active = await this.getActiveStorybook();
    return active?.config || null;
  }

  /**
   * Listar todos los Storybooks conectados
   */
  async listConnections(): Promise<StorybookConnection[]> {
    await this.ensureConnectionsLoaded();
    return Array.from(this.connections.values()).filter(
      (conn) => conn.connected
    );
  }

  /**
   * Obtener conexión por ID
   */
  getConnection(storybookId: string): StorybookConnection | null {
    return this.connections.get(storybookId) || null;
  }

  /**
   * Verificar accesibilidad de un Storybook
   */
  private async checkStorybookAccessibility(
    url: string,
    timeout: number = 5000
  ): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Detectar estructura del Storybook automáticamente
   */
  private async detectStorybookStructure(baseUrl: string): Promise<{
    componentMapping: Record<string, string>;
    hasIndexJson: boolean;
  }> {
    const componentMapping: Record<string, string> = {};
    let hasIndexJson = false;

    try {
      // Intentar obtener index.json
      const indexUrl = `${baseUrl.replace(/\/$/, '')}/index.json`;
      const response = await fetch(indexUrl);

      if (response.ok) {
        hasIndexJson = true;
        const indexData = await response.json();

        // Extraer mapeo de componentes desde index.json
        if (indexData.entries) {
          for (const [storyId, entry] of Object.entries(indexData.entries)) {
            if (typeof entry === 'object' && entry !== null) {
              const entryObj = entry as any;
              const title = entryObj.title || '';
              const componentId = storyId.split('--')[0];

              // Extraer nombre del componente del título (ej: "Básicos/Button" -> "Button")
              if (title) {
                const parts = title.split('/');
                const componentName = parts[parts.length - 1];
                if (componentName && !componentMapping[componentName]) {
                  componentMapping[componentName] = componentId;
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.warn(
        `⚠️ [Storybook Manager] No se pudo detectar estructura automáticamente:`,
        error
      );
    }

    return {
      componentMapping,
      hasIndexJson,
    };
  }

  /**
   * Configurar MCP para un Storybook
   */
  private async configureMCP(config: StorybookConfig): Promise<void> {
    try {
      const { MCPInstaller } = await import('../MCPInstaller');
      const indexJsonUrl = config.indexJsonUrl || `${config.url}/index.json`;

      // Configurar MCP de Storybook
      await MCPInstaller.installMCPServer('storybook', {
        storybookUrl: indexJsonUrl,
      });

      console.log(
        `✅ [Storybook Manager] MCP configurado para "${config.name}"`
      );
    } catch (error) {
      console.warn(`⚠️ [Storybook Manager] No se pudo configurar MCP:`, error);
    }
  }

  /**
   * Cargar conexiones desde archivo
   */
  private async loadConnections(): Promise<void> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');

      const configFile = path.join(process.cwd(), this.configPath);
      const content = await fs.readFile(configFile, 'utf-8');
      const data = JSON.parse(content);

      // Restaurar conexiones
      if (data.connections) {
        for (const [id, connData] of Object.entries(data.connections)) {
          const conn = connData as any;
          this.connections.set(id, {
            config: conn.config,
            connected: conn.connected || false,
            connectedAt: conn.connectedAt
              ? new Date(conn.connectedAt)
              : undefined,
            lastUsed: conn.lastUsed ? new Date(conn.lastUsed) : undefined,
          });
        }
      }

      // Restaurar Storybook activo
      if (data.activeStorybookId) {
        const activeConn = this.connections.get(data.activeStorybookId);
        if (activeConn?.connected) {
          this.activeStorybookId = data.activeStorybookId;
        }
      }

      this.connectionsLoaded = true;
      console.log(
        `✅ [Storybook Manager] ${this.connections.size} conexión(es) cargada(s)`
      );
    } catch (error: any) {
      // Si no existe el archivo, empezar con conexiones vacías
      if (error.code !== 'ENOENT') {
        console.warn(
          `⚠️ [Storybook Manager] Error cargando conexiones:`,
          error.message
        );
      } else {
        console.log(
          `ℹ️ [Storybook Manager] No se encontró archivo de configuración, empezando con conexiones vacías`
        );
      }
      this.connectionsLoaded = true;
    }
  }

  /**
   * Guardar conexiones en archivo
   */
  private async saveConnections(): Promise<void> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');

      const configDir = path.join(process.cwd(), '.autorun');
      await fs.mkdir(configDir, { recursive: true });

      const configFile = path.join(configDir, 'storybooks.json');
      const data = {
        activeStorybookId: this.activeStorybookId,
        connections: Object.fromEntries(
          Array.from(this.connections.entries()).map(([id, conn]) => [
            id,
            {
              config: conn.config,
              connected: conn.connected,
              connectedAt: conn.connectedAt?.toISOString(),
              lastUsed: conn.lastUsed?.toISOString(),
            },
          ])
        ),
      };

      await fs.writeFile(configFile, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error(
        `❌ [Storybook Manager] Error guardando conexiones:`,
        error
      );
    }
  }

  /**
   * Construir URL de Storybook con verificación de historia
   *
   * Si la historia especificada no existe, usa la primera historia disponible
   */
  async buildStorybookUrl(
    path: string = '',
    storybookId?: string
  ): Promise<string> {
    await this.ensureConnectionsLoaded();

    const config = storybookId
      ? this.connections.get(storybookId)?.config
      : await this.getActiveConfig();

    if (!config) {
      throw new Error('❌ No hay Storybook configurado');
    }

    // ⚠️ CRÍTICO: Si el path es /story/, convertir automáticamente a /docs/ para obtener documentación completa
    // La pestaña Docs contiene props, ejemplos, código y toda la información necesaria para implementar
    if (path.includes('/story/')) {
      // Extraer componentId del path
      const storyMatch = path.match(/(?:\?path=)?\/story\/(.+?)--/);
      if (storyMatch) {
        const componentId = storyMatch[1];
        // Convertir /story/ a /docs/ automáticamente
        path = path.replace('/story/', '/docs/');
        // Reemplazar cualquier historia con "docs"
        path = path.replace(/--[^?&]+/, '--docs');
        console.log(
          `📚 [Storybook Manager] Path convertido a Docs para documentación completa: ${path}`
        );
        console.log(
          `📚 [Storybook Manager] La pestaña Docs contiene props, ejemplos y código necesario para implementar ${componentId}`
        );
      }
    }

    // ⚠️ IMPORTANTE: Si el path ya es /docs/--docs, NO verificar si existe
    // "docs" es un tipo especial en Storybook (type: "docs" en index.json) y siempre está disponible
    // Solo verificar historias si es /story/ y necesita corrección
    const docsMatch = path.match(/(?:\?path=)?\/docs\/(.+?)--docs/);
    if (docsMatch) {
      const componentId = docsMatch[1];
      console.log(
        `📚 [Storybook Manager] Usando /docs/ para ${componentId} (docs siempre existe en Storybook)`
      );
      // No verificar, simplemente usar /docs/--docs
    } else {
      // Si no es /docs/--docs, verificar si es /story/ y convertir
      const storyMatch = path.match(/(?:\?path=)?\/story\/(.+?)--([^?&]+)/);
      if (storyMatch) {
        const [, componentId, storyName] = storyMatch;
        console.log(
          `📚 [Storybook Manager] Convirtiendo /story/ a /docs/ para componente "${componentId}"`
        );
        path = path.replace('/story/', '/docs/');
        path = path.replace(`--${storyName}`, '--docs');
        console.log(`✅ [Storybook Manager] Path convertido a docs: ${path}`);
      }
    }

    if (config.getUrl) {
      return config.getUrl(path);
    }

    const baseUrl = config.url.replace(/\/$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    // Si hay token de bypass, agregarlo
    if (config.bypassToken && !path.includes('x-vercel-protection-bypass')) {
      const separator = cleanPath.includes('?') ? '&' : '?';
      return `${baseUrl}${cleanPath}${separator}x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=${config.bypassToken}`;
    }

    return `${baseUrl}${cleanPath}`;
  }

  /**
   * Mapear nombre de componente a ID de Storybook con validación automática
   */
  async mapComponentToStorybookId(
    componentName: string,
    storybookId?: string
  ): Promise<string | null> {
    await this.ensureConnectionsLoaded();

    const config = storybookId
      ? this.connections.get(storybookId)?.config
      : await this.getActiveConfig();

    if (!config) {
      return null;
    }

    // Buscar en el mapeo del Storybook
    let mappedId: string | undefined;
    if (config.componentMapping) {
      // Búsqueda exacta
      mappedId = config.componentMapping[componentName];

      // Si no se encuentra, intentar búsqueda case-insensitive
      if (!mappedId) {
        const lowerComponentName = componentName.toLowerCase();
        for (const [key, value] of Object.entries(config.componentMapping)) {
          if (key.toLowerCase() === lowerComponentName) {
            mappedId = value;
            console.log(
              `✅ [Storybook Manager] Mapeo encontrado (case-insensitive): ${componentName} → ${mappedId}`
            );
            break;
          }
        }
      }
    }

    // ⚠️ CRÍTICO: NO usar fallback genérico aquí
    // Si no se encuentra en el mapeo, retornar null y dejar que el sistema de validación lo descubra
    if (!mappedId) {
      console.warn(
        `⚠️ [Storybook Manager] No se encontró mapeo para: ${componentName}. El sistema de validación lo descubrirá automáticamente.`
      );
      // NO usar fallback genérico - dejar que la validación lo maneje
    }

    // ⚠️ CRÍTICO: Si no hay mappedId, usar descubrimiento automático directamente
    if (!mappedId) {
      try {
        const { getCorrectStorybookId } = await import(
          './storybookIdDiscovery'
        );
        const discoveryResult = await getCorrectStorybookId(
          componentName,
          undefined
        );

        if (discoveryResult.found) {
          console.log(
            `✅ [Storybook Manager] ID descubierto automáticamente: ${componentName} → ${discoveryResult.componentId}`
          );
          return discoveryResult.componentId;
        }
      } catch (discoveryError: any) {
        console.warn(
          `⚠️ [Storybook Manager] Error en descubrimiento automático:`,
          discoveryError.message
        );
      }

      // Si todo falla, retornar null
      return null;
    }

    // ⚠️ NUEVO: Validar y corregir el ID automáticamente
    try {
      const { validateAndCorrectStorybookId, getCorrectStorybookIdWithRetry } =
        await import('./storybookIdValidator');

      // Intentar validar y corregir
      const validation = await validateAndCorrectStorybookId(
        componentName,
        mappedId
      );

      if (validation.valid) {
        // Si se corrigió, actualizar el mapeo
        if (validation.corrected && validation.componentId !== mappedId) {
          console.log(
            `✅ [Storybook Manager] ID corregido: ${mappedId} → ${validation.componentId} (método: ${validation.foundBy})`
          );

          // Actualizar el mapeo con el ID correcto
          if (config.componentMapping) {
            config.componentMapping[componentName] = validation.componentId;
            // Guardar el mapeo actualizado
            await this.saveConnections();
          }
        } else {
          console.log(
            `✅ [Storybook Manager] ID válido: ${validation.componentId}`
          );
        }

        return validation.componentId;
      }

      // Si la validación falló, intentar con retry
      console.warn(
        `⚠️ [Storybook Manager] Validación falló, intentando con retry...`
      );
      const retryResult = await getCorrectStorybookIdWithRetry(
        componentName,
        mappedId
      );

      if (retryResult.found) {
        console.log(
          `✅ [Storybook Manager] ID encontrado con retry: ${retryResult.componentId} (método: ${retryResult.method})`
        );

        // Actualizar mapeo
        if (config.componentMapping) {
          config.componentMapping[componentName] = retryResult.componentId;
          await this.saveConnections();
        }

        return retryResult.componentId;
      }

      // Si todo falla, retornar el mapeado original
      console.warn(
        `⚠️ [Storybook Manager] No se pudo validar/corregir ID, usando mapeo directo: ${mappedId}`
      );
      return mappedId;
    } catch (error: any) {
      console.warn(
        `⚠️ [Storybook Manager] Error en validación, usando mapeo directo:`,
        error.message
      );
      return mappedId; // Fallback al ID mapeado
    }
  }
}
