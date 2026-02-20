(() => {
  // packages/autorun-core/src/runtime/TemplateGlobalsBridge.ts
  function get(obj, path) {
    return path.split(".").reduce((acc, k) => acc ? acc[k] : void 0, obj);
  }
  function resolveFactory(globalName) {
    const w = window;
    if (typeof w[globalName] === "function" && !w[globalName].__isStub) {
      return w[globalName];
    }
    const map = {
      createSidebar: [
        "UBITS.Sidebar.createSidebar",
        "UBITS.Sidebar.create",
        "UBITS.LayoutSidebar.createSidebar",
        "UBITS.LayoutSidebar.create",
        "UBITS.SidebarProvider.createSidebar"
      ],
      createTabBar: [
        "UBITS.TabBar.createTabBar",
        "UBITS.TabBar.create",
        "UBITS.Tabs.createTabBar",
        "UBITS.Tabs.create",
        "UBITS.TabBarProvider.createTabBar"
      ],
      createSubNav: [
        "UBITS.SubNav.createSubNav",
        "UBITS.SubNav.create"
      ]
    };
    for (const p of map[globalName] || []) {
      const fn = get(w, p);
      if (typeof fn === "function") return fn;
    }
    const ubits = w.UBITS;
    if (ubits && typeof ubits === "object") {
      for (const mod of Object.values(ubits)) {
        if (mod && typeof mod[globalName] === "function") {
          return mod[globalName];
        }
      }
    }
    return null;
  }
  function waitForUbitsReady(timeoutMs = 15e3) {
    return new Promise((resolve) => {
      const t = setTimeout(() => resolve(false), timeoutMs);
      window.addEventListener("ubits:ready", () => {
        clearTimeout(t);
        resolve(true);
      }, { once: true });
    });
  }
  function makeStub(globalName, debug = false) {
    const stub = (...args) => {
      const fn = resolveFactory(globalName);
      if (fn) {
        if (debug) console.log(`[Autorun] Bridge -> ${globalName} (sync)`, { args });
        return fn(...args);
      }
      if (debug) console.log(`[Autorun] Bridge -> ${globalName} missing! Waiting for 'ubits:ready' handshake...`);
      waitForUbitsReady(15e3).then((isReady) => {
        if (isReady) {
          const deferredFn = resolveFactory(globalName);
          if (deferredFn) {
            if (debug) console.log(`[Autorun] Bridge -> ${globalName} resolved after handshake!`);
            return deferredFn(...args);
          } else {
            console.warn(`[Autorun] WARN: 'ubits:ready' fired, but generic missing factory '${globalName}'.`);
          }
        } else {
          console.warn(`[Autorun] WARN: Timeout waiting for template global '${globalName}' after deferring.`);
        }
      });
      return void 0;
    };
    stub.__isStub = true;
    return stub;
  }
  function initTemplateGlobalsBridge(opts) {
    const w = window;
    const debug = !!opts?.debug;
    if (typeof w.createSidebar !== "function") {
      w.createSidebar = makeStub("createSidebar", debug);
      if (debug) console.log("[Autorun] Stubbed createSidebar");
    }
    if (typeof w.createTabBar !== "function") {
      w.createTabBar = makeStub("createTabBar", debug);
      if (debug) console.log("[Autorun] Stubbed createTabBar");
    }
    if (typeof w.createSubNav !== "function") {
      w.createSubNav = makeStub("createSubNav", debug);
      if (debug) console.log("[Autorun] Stubbed createSubNav");
    }
    if (debug) {
      console.log("[Autorun] TemplateGlobalsBridge ready", {
        createSidebar: typeof w.createSidebar,
        createTabBar: typeof w.createTabBar,
        createSubNav: typeof w.createSubNav
      });
    }
  }

  // packages/autorun-core/src/interceptors/UBITSInterceptor.ts
  var _UBITSInterceptor = class _UBITSInterceptor {
    /**
     * Initialize the interceptor
     * Should be called as early as possible in the boot sequence
     */
    static initialize() {
      if (this.initialized) return;
      this.initialized = true;
      this.interceptContentManager();
      if (document.readyState === "loading") {
        document.addEventListener(
          "DOMContentLoaded",
          () => this.applyDOMPatches()
        );
      } else {
        this.applyDOMPatches();
      }
    }
    /**
     * Intercept UBITS_ContentManager to customize rendering
     * Specifically prevents the default HeaderSection and allows custom SubNav
     */
    static interceptContentManager() {
      let contentManagerInstance = null;
      Object.defineProperty(window, "UBITS_ContentManager", {
        configurable: true,
        enumerable: true,
        get: () => contentManagerInstance,
        set: (value) => {
          contentManagerInstance = value;
          if (value && typeof value.render === "function") {
            const originalRender = value.render;
            value.render = function(...args) {
              if (!document.getElementById("top-nav-container")) {
                return originalRender.apply(this, args);
              }
              console.log(
                "[UBITSInterceptor] Intercepting ContentManager.render"
              );
              _UBITSInterceptor.injectSubNav();
              const result = originalRender.apply(this, args);
              const unwantedHeader = document.querySelector(
                ".content-area > header:not(#top-nav-container)"
              );
              if (unwantedHeader) {
                unwantedHeader.remove();
              }
              return result;
            };
          }
        }
      });
    }
    /**
     * Inject the custom SubNav into the top container
     */
    static injectSubNav() {
      const container = document.getElementById("top-nav-container");
      if (!container) return;
      if (container.querySelector(".sub-nav")) return;
      if (typeof window.createSubNav === "function") {
        window.createSubNav(container);
      } else {
        this.createDefaultSubNav(container);
      }
    }
    /**
     * Default SubNav creation logic (extracted from ad-hoc script)
     */
    static createDefaultSubNav(container) {
      const subNavHTML = `
    <div class="sub-nav">
        <div class="sub-nav-content">
            <h1>Administrador</h1>
            <div class="breadcrumbs">
                <span>Inicio</span>
                <i class="fa-solid fa-chevron-right"></i>
                <span class="current">Encuestas</span>
            </div>
        </div>
        <div class="sub-nav-actions">
             <button class="ubits-btn secondary" id="btn-config">
                <i class="fa-solid fa-cog"></i> Configurar
            </button>
            <button class="ubits-btn primary" id="btn-nueva-encuesta">
                <i class="fa-solid fa-plus"></i> Nueva Encuesta
            </button>
        </div>
    </div>
    <style>
      .sub-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: white;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 2rem;
      }
      .sub-nav-content h1 {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
      }
      .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
      }
      .breadcrumbs .current {
          color: var(--primary-color);
          font-weight: 500;
      }
      .sub-nav-actions {
          display: flex;
          gap: 1rem;
      }
    </style>
    `;
      container.innerHTML = subNavHTML;
    }
    /**
     * Apply patches that require the DOM to be ready
     */
    static applyDOMPatches() {
      this.patchSidebarLinks();
    }
    /**
     * Patch sidebar links to use Ajax-like loading instead of full navigation
     */
    static patchSidebarLinks() {
      const sidebar = document.querySelector(".sidebar");
      if (!sidebar) return;
      if (window.__AUTORUN_SIDEBAR_PATCHED__) return;
      window.__AUTORUN_SIDEBAR_PATCHED__ = true;
      const links = sidebar.querySelectorAll("a[href]");
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (href && href.startsWith("#")) {
            return;
          }
          if (href && !href.startsWith("http")) {
            e.preventDefault();
            console.log(`[UBITSInterceptor] Prevented navigation to ${href}`);
          }
        });
      });
    }
  };
  _UBITSInterceptor.initialized = false;
  _UBITSInterceptor.sidebarPatched = false;
  var UBITSInterceptor = _UBITSInterceptor;

  // packages/autorun-core/src/runtime/browser-stubs/fs.ts
  var readFileSync = () => {
    throw new Error("fs.readFileSync is not available in browser");
  };
  var existsSync = () => false;
  var readdirSync = () => {
    throw new Error("fs.readdirSync is not available in browser");
  };
  var statSync = () => {
    throw new Error("fs.statSync is not available in browser");
  };

  // packages/autorun-core/src/runtime/browser-stubs/path.ts
  var join = (...args) => args.join("/");

  // packages/autorun-core/src/registry/ComponentCatalog.ts
  var ComponentCatalog = class {
    constructor() {
      this.components = /* @__PURE__ */ new Map();
      this.byProvider = /* @__PURE__ */ new Map();
      this.byCategory = /* @__PURE__ */ new Map();
    }
    /**
     * Load catalog from registry providers
     *
     * @param registryPath - Path to registry-providers directory
     */
    async loadFromRegistry(registryPath) {
      console.log(`[Catalog] \u{1F50D} Scanning registry: ${registryPath}...`);
      const manifests = await this.scanManifests(registryPath);
      console.log(`[Catalog] Found ${manifests.length} manifests`);
      for (const manifest of manifests) {
        this.registerComponent(manifest);
      }
      console.log(`[Catalog] \u2705 Loaded ${this.components.size} components`);
      console.log(`[Catalog] Providers: ${this.byProvider.size}`);
      console.log(`[Catalog] Categories: ${this.byCategory.size}`);
    }
    /**
     * Register a component in the catalog
     *
     * @param manifest - Component manifest
     */
    registerComponent(manifest) {
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
      console.log(`[Catalog] \u2705 Registered: ${manifest.id}`);
    }
    /**
     * Get component by ID
     */
    getComponent(id) {
      return this.components.get(id);
    }
    /**
     * Get all components
     */
    getAllComponents() {
      return Array.from(this.components.values());
    }
    /**
     * Get components by provider
     */
    getComponentsByProvider(provider) {
      return this.byProvider.get(provider) || [];
    }
    /**
     * Get components by category
     */
    getComponentsByCategory(category) {
      return this.byCategory.get(category) || [];
    }
    /**
     * Get all providers
     */
    getProviders() {
      return Array.from(this.byProvider.keys());
    }
    /**
     * Get all categories
     */
    getCategories() {
      return Array.from(this.byCategory.keys());
    }
    /**
     * Search components by name, tags, or description
     *
     * @param query - Search query
     * @returns Matching components
     */
    search(query) {
      const lowerQuery = query.toLowerCase();
      return this.getAllComponents().filter((component) => {
        return component.name.toLowerCase().includes(lowerQuery) || component.displayName?.toLowerCase().includes(lowerQuery) || component.description?.toLowerCase().includes(lowerQuery) || component.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) || component.id.toLowerCase().includes(lowerQuery);
      });
    }
    /**
     * Get catalog statistics
     */
    getStats() {
      const byProvider = {};
      const byCategory = {};
      for (const [provider, components] of this.byProvider.entries()) {
        byProvider[provider] = components.length;
      }
      for (const [category, components] of this.byCategory.entries()) {
        byCategory[category] = components.length;
      }
      return {
        totalComponents: this.components.size,
        byProvider,
        byCategory
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
    async scanManifests(registryPath) {
      const manifests = [];
      const isBrowser = typeof window !== "undefined" && typeof fetch !== "undefined";
      if (isBrowser) {
        return await this.scanManifestsHTTP(registryPath);
      }
      try {
        if (!existsSync(registryPath)) {
          console.warn(`[Catalog] Registry path not found: ${registryPath}`);
          return manifests;
        }
        const providers = readdirSync(registryPath, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
        for (const provider of providers) {
          const providerPath = join(registryPath, provider);
          const componentsPath = join(providerPath, "components");
          if (!existsSync(componentsPath)) continue;
          const components = readdirSync(componentsPath, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
          for (const component of components) {
            const manifestPath = join(componentsPath, component, "manifest.json");
            if (existsSync(manifestPath)) {
              try {
                const manifestData = JSON.parse(
                  // @ts-ignore
                  readFileSync(manifestPath, "utf-8")
                );
                const stats = statSync(manifestPath);
                const manifest = {
                  id: `${provider}/${component}`,
                  provider,
                  name: manifestData.component || component,
                  displayName: manifestData.displayName || manifestData.component || component,
                  description: manifestData.description,
                  category: manifestData.category,
                  tags: manifestData.tags || [],
                  version: manifestData.version,
                  manifestPath,
                  lastModified: stats.mtimeMs,
                  metadata: manifestData
                };
                manifests.push(manifest);
              } catch (error) {
                console.warn(
                  `[Catalog] Failed to load manifest: ${manifestPath}`,
                  error.message
                );
              }
            }
          }
        }
      } catch (error) {
        console.error(`[Catalog] Error scanning manifests:`, error.message);
      }
      return manifests;
    }
    /**
     * Scan for manifests via HTTP (browser environment)
     * @private
     */
    async scanManifestsHTTP(registryBaseUrl) {
      const manifests = [];
      try {
        const providers = ["ubits"];
        const componentsMap = {
          ubits: [
            "accordion",
            "alert",
            "button",
            "calendar",
            "card",
            "carousel",
            "data-table",
            "input",
            "list",
            "sidebar",
            "subnav",
            "tabbar",
            "toast",
            "tokens-ubits"
          ]
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
              const manifest = {
                id: `${provider}/${component}`,
                provider,
                name: manifestData.component || component,
                displayName: manifestData.displayName || manifestData.component || component,
                description: manifestData.description,
                category: manifestData.category,
                tags: manifestData.tags || [],
                version: manifestData.version,
                manifestPath: manifestUrl,
                lastModified: Date.now(),
                metadata: manifestData
              };
              manifests.push(manifest);
              console.log(`[Catalog] \u2705 Loaded manifest: ${manifest.id}`);
            } catch (error) {
              console.warn(
                `[Catalog] Failed to fetch manifest: ${manifestUrl}`,
                error.message
              );
            }
          }
        }
      } catch (error) {
        console.error(`[Catalog] Error scanning HTTP manifests:`, error.message);
      }
      return manifests;
    }
  };
  var globalCatalog = null;
  function getComponentCatalog() {
    if (!globalCatalog) {
      globalCatalog = new ComponentCatalog();
    }
    return globalCatalog;
  }

  // packages/autorun-core/src/runtime/Logger.ts
  var Logger = class {
    constructor(config = {}) {
      this.config = {
        debug: config.debug ?? false,
        prefix: config.prefix ?? "[Autorun]",
        timestamps: config.timestamps ?? false
      };
    }
    /**
     * Log a message at the specified level
     *
     * @param level - Log level
     * @param message - Message to log
     * @param args - Additional arguments
     */
    log(level, message, ...args) {
      if (level === "debug" && !this.config.debug) {
        return;
      }
      const prefix = this.config.prefix;
      const timestamp = this.config.timestamps ? `[${(/* @__PURE__ */ new Date()).toISOString()}]` : "";
      const fullMessage = `${timestamp}${prefix} ${message}`.trim();
      switch (level) {
        case "error":
          console.error(fullMessage, ...args);
          break;
        case "warn":
          console.warn(fullMessage, ...args);
          break;
        case "info":
          console.log(fullMessage, ...args);
          break;
        case "debug":
          console.log(fullMessage, ...args);
          break;
      }
    }
    /**
     * Log debug message (only if debug enabled)
     *
     * @param message - Message to log
     * @param args - Additional arguments
     */
    debug(message, ...args) {
      this.log("debug", message, ...args);
    }
    /**
     * Log info message
     *
     * @param message - Message to log
     * @param args - Additional arguments
     */
    info(message, ...args) {
      this.log("info", message, ...args);
    }
    /**
     * Log warning message
     *
     * @param message - Message to log
     * @param args - Additional arguments
     */
    warn(message, ...args) {
      this.log("warn", message, ...args);
    }
    /**
     * Log error message
     *
     * @param message - Message to log
     * @param args - Additional arguments
     */
    error(message, ...args) {
      this.log("error", message, ...args);
    }
    /**
     * Enable debug logging
     */
    enableDebug() {
      this.config.debug = true;
    }
    /**
     * Disable debug logging
     */
    disableDebug() {
      this.config.debug = false;
    }
    /**
     * Check if debug is enabled
     */
    isDebugEnabled() {
      return this.config.debug;
    }
    /**
     * Update configuration
     *
     * @param config - Partial configuration to update
     */
    configure(config) {
      this.config = { ...this.config, ...config };
    }
  };
  var globalLogger = null;
  function getLogger() {
    if (!globalLogger) {
      const debug = typeof window !== "undefined" ? !!window.AUTORUN_DEBUG : false;
      globalLogger = new Logger({ debug });
    }
    return globalLogger;
  }
  function configureLogger(config) {
    getLogger().configure(config);
  }

  // packages/autorun-core/src/runtime/PreflightValidator.ts
  var PreflightValidator = class {
    constructor(catalog) {
      this.catalog = catalog;
    }
    /**
     * Validate component before mount
     *
     * @param componentId - Component ID (e.g., 'ubits/accordion')
     * @param props - Component props
     * @returns Validation result
     */
    validate(componentId, props = {}) {
      const result = {
        valid: true,
        errors: [],
        warnings: [],
        componentId
      };
      console.log(`[PreflightValidator] Validating ${componentId}...`);
      const manifest = this.catalog.getComponent(componentId);
      if (!manifest) {
        result.valid = false;
        result.errors.push(`Component "${componentId}" not found in catalog`);
        result.errors.push(
          `Available components: ${this.catalog.getAllComponents().map((c) => c.id).join(", ")}`
        );
        return result;
      }
      const factoryPath = manifest.metadata?.factoryPath;
      if (!factoryPath) {
        result.valid = false;
        result.errors.push(
          `No factoryPath defined in manifest for "${componentId}"`
        );
        result.errors.push(`Manifest location: ${manifest.manifestPath}`);
        return result;
      }
      result.factoryPath = factoryPath;
      const factory = this.resolveFactory(factoryPath);
      if (typeof factory !== "function") {
        result.valid = false;
        result.errors.push(`Factory not found: ${factoryPath}`);
        result.errors.push(
          `Ensure UBITS bundle is loaded before mounting components`
        );
        const parts = factoryPath.split(".");
        let current = typeof window !== "undefined" ? window : globalThis;
        const path = [];
        for (const part of parts) {
          path.push(part);
          if (current && part in current) {
            current = current[part];
          } else {
            result.errors.push(
              `Path broken at: ${path.join(".")} (${part} not found)`
            );
            break;
          }
        }
        return result;
      }
      result.factory = factory;
      const schema = manifest.metadata?.propsSchema || {};
      const requiredProps = Object.keys(schema).filter(
        (key) => schema[key].required === true
      );
      for (const prop of requiredProps) {
        if (!(prop in props)) {
          result.valid = false;
          result.errors.push(`Missing required prop: "${prop}"`);
        }
      }
      for (const [propName, propValue] of Object.entries(props)) {
        if (schema[propName]) {
          const expectedType = schema[propName].type;
          const actualType = typeof propValue;
          if (expectedType === "string" && actualType !== "string") {
            result.warnings.push(
              `Prop "${propName}" expected string, got ${actualType}`
            );
          } else if (expectedType === "boolean" && actualType !== "boolean") {
            result.warnings.push(
              `Prop "${propName}" expected boolean, got ${actualType}`
            );
          } else if (expectedType === "object" && (actualType !== "object" || propValue === null)) {
            result.warnings.push(
              `Prop "${propName}" expected object, got ${actualType}`
            );
          }
        }
      }
      if (result.valid) {
        console.log(
          `[PreflightValidator] \u2705 Validation passed for ${componentId}`
        );
        if (result.warnings.length > 0) {
          console.warn(
            `[PreflightValidator] \u26A0\uFE0F ${result.warnings.length} warning(s):`,
            result.warnings
          );
        }
      } else {
        console.error(
          `[PreflightValidator] \u274C Validation failed for ${componentId}:`,
          result.errors
        );
      }
      return result;
    }
    /**
     * Resolve factory path (e.g., "window.UBITS.Modal.createModal")
     *
     * @param path - Dot-separated path to factory
     * @returns Factory function or undefined
     */
    resolveFactory(path) {
      const parts = path.split(".");
      let current = typeof window !== "undefined" ? window : globalThis;
      for (const part of parts) {
        if (current && part in current) {
          current = current[part];
        } else {
          return void 0;
        }
      }
      return current;
    }
    /**
     * Check if a component is ready to mount
     *
     * @param componentId - Component ID
     * @returns True if component can be mounted
     */
    isReady(componentId) {
      const result = this.validate(componentId, {});
      return result.valid || result.errors.every((e) => e.includes("Missing required prop"));
    }
    /**
     * Get factory for a component
     *
     * @param componentId - Component ID
     * @returns Factory function or undefined
     */
    getFactory(componentId) {
      const manifest = this.catalog.getComponent(componentId);
      if (!manifest?.metadata?.factoryPath) {
        return void 0;
      }
      return this.resolveFactory(manifest.metadata.factoryPath);
    }
  };

  // packages/autorun-core/src/runtime/RuntimeNormalizer.ts
  var RuntimeNormalizer = class {
    /**
     * Check if a key name suggests it contains a URL
     *
     * @param key - Property key to check
     * @returns True if key suggests URL content
     */
    isUrlLikeKey(key) {
      if (!key) return false;
      const k = String(key).toLowerCase();
      return k.includes("url") || k.includes("href") || k.includes("src") || k.includes("logo") || k.includes("image") || k.includes("avatar") || k.includes("icon") || k.includes("background") || k.includes("poster") || k.includes("thumbnail");
    }
    /**
     * Sanitize a URL value
     *
     * Removes dangerous or invalid values:
     * - Empty strings
     * - "undefined" or "null" strings
     * - javascript: URLs (XSS)
     *
     * @param value - URL value to sanitize
     * @returns Sanitized URL or null if invalid
     */
    sanitizeUrlValue(value) {
      if (value == null) return null;
      if (typeof value !== "string") return value;
      const s = value.trim();
      if (s === "" || s === "undefined" || s === "null") {
        return null;
      }
      if (/^javascript:/i.test(s)) {
        console.warn("[RuntimeNormalizer] Blocked javascript: URL (XSS attempt)");
        return null;
      }
      if (/^data:text\/html/i.test(s)) {
        console.warn("[RuntimeNormalizer] Blocked suspicious data: URL");
        return null;
      }
      return s;
    }
    /**
     * Resolve asset URL to absolute path
     *
     * Converts relative paths to absolute URLs using document.baseURI.
     * Leaves absolute URLs (http://, https://, file://, data:) unchanged.
     *
     * @param value - URL to resolve
     * @returns Absolute URL or original value if already absolute
     *
     * @example
     * ```typescript
     * normalizer.resolveAssetUrl('../../assets/logo.png')
     * // → "file:///Users/project/assets/logo.png"
     *
     * normalizer.resolveAssetUrl('https://example.com/logo.png')
     * // → "https://example.com/logo.png" (unchanged)
     * ```
     */
    resolveAssetUrl(value) {
      if (value == null) return null;
      if (typeof value !== "string") return value;
      const s = value.trim();
      if (s === "" || s === "undefined" || s === "null") {
        return null;
      }
      if (/^(https?:|file:|data:)/i.test(s)) {
        return s;
      }
      try {
        const baseURI = typeof document !== "undefined" ? document.baseURI : typeof window !== "undefined" && window.location ? window.location.href : "file:///";
        return new URL(s, baseURI).toString();
      } catch (error) {
        console.warn("[RuntimeNormalizer] Failed to resolve URL:", s, error);
        return s;
      }
    }
    /**
     * Sanitize URLs deep in an object/array structure
     *
     * Recursively traverses objects and arrays, sanitizing and resolving
     * any URL-like values found in properties with URL-like names.
     *
     * @param obj - Object to sanitize
     * @returns Sanitized copy of object
     */
    sanitizeUrlsDeep(obj) {
      if (Array.isArray(obj)) {
        return obj.map((item) => this.sanitizeUrlsDeep(item));
      }
      if (obj && typeof obj === "object") {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          if (this.isUrlLikeKey(key)) {
            const sanitized = this.sanitizeUrlValue(value);
            result[key] = this.resolveAssetUrl(sanitized);
          } else {
            result[key] = this.sanitizeUrlsDeep(value);
          }
        }
        return result;
      }
      return obj;
    }
    /**
     * Validate that all URLs in props are accessible
     *
     * Useful for preflight checks to warn about potentially broken assets.
     *
     * @param props - Props to validate
     * @returns Array of warnings for potentially broken URLs
     */
    validateUrls(props) {
      const warnings = [];
      const check = (obj, path = "") => {
        if (Array.isArray(obj)) {
          obj.forEach((item, i) => check(item, `${path}[${i}]`));
        } else if (obj && typeof obj === "object") {
          for (const [key, value] of Object.entries(obj)) {
            const fullPath = path ? `${path}.${key}` : key;
            if (this.isUrlLikeKey(key) && typeof value === "string") {
              if (value === null || value === "undefined" || value === "") {
                warnings.push(`Empty URL at ${fullPath}`);
              }
            } else {
              check(value, fullPath);
            }
          }
        }
      };
      check(props);
      return warnings;
    }
  };
  var globalNormalizer = null;
  function getRuntimeNormalizer() {
    if (!globalNormalizer) {
      globalNormalizer = new RuntimeNormalizer();
    }
    return globalNormalizer;
  }

  // packages/autorun-core/src/runtime/AdapterRegistry.ts
  var AdapterRegistry = class {
    constructor() {
      this.adapters = /* @__PURE__ */ new Map();
    }
    /**
     * Register an adapter
     *
     * @param name - Adapter name (usually component name)
     * @param adapter - Adapter function
     * @param options - Additional options
     */
    register(name, adapter, options = {}) {
      this.adapters.set(name, {
        name,
        adapter,
        ...options
      });
    }
    /**
     * Get an adapter by name
     *
     * @param name - Adapter name
     * @returns Adapter function or undefined
     */
    get(name) {
      return this.adapters.get(name)?.adapter;
    }
    /**
     * Check if an adapter exists
     *
     * @param name - Adapter name
     * @returns True if adapter exists
     */
    has(name) {
      return this.adapters.has(name);
    }
    /**
     * Get all registered adapter names
     *
     * @returns Array of adapter names
     */
    getNames() {
      return Array.from(this.adapters.keys());
    }
    /**
     * Get adapter definition (includes metadata)
     *
     * @param name - Adapter name
     * @returns Adapter definition or undefined
     */
    getDefinition(name) {
      return this.adapters.get(name);
    }
    /**
     * Remove an adapter
     *
     * @param name - Adapter name
     * @returns True if adapter was removed
     */
    remove(name) {
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
        "accordion",
        (container, props) => {
          if (!window.UBITS?.Accordion?.createAccordion) {
            throw new Error(
              "window.UBITS.Accordion.createAccordion not available"
            );
          }
          return window.UBITS.Accordion.createAccordion(
            container,
            props
          );
        },
        {
          description: "Adapter for Accordion component (uses createAccordion)",
          wrapsApi: "window.UBITS.Accordion.createAccordion"
        }
      );
    }
  };
  var globalRegistry = null;
  function getAdapterRegistry() {
    if (!globalRegistry) {
      globalRegistry = new AdapterRegistry();
      globalRegistry.registerBuiltIns();
    }
    return globalRegistry;
  }
  function registerAdapter(name, adapter, options) {
    getAdapterRegistry().register(name, adapter, options);
  }
  function getAdapter(name) {
    return getAdapterRegistry().get(name);
  }

  // packages/autorun-core/src/runtime/WrapperPresets.ts
  var WRAPPER_PRESETS = {
    /**
     * Card column layout (380px max width)
     * Used for: Card, Badge, small components
     */
    cardColumn: {
      maxWidth: "380px",
      margin: "0",
      display: "block"
    },
    /**
     * Full width layout
     * Used for: Accordion, Table, DataView, wide components
     */
    fullWidth: {
      maxWidth: "none",
      width: "100%",
      display: "block"
    },
    /**
     * Centered layout (800px max width)
     * Used for: Modal, forms, centered content
     */
    centered: {
      maxWidth: "800px",
      margin: "0 auto",
      display: "block"
    },
    /**
     * Inline layout
     * Used for: Button, Chip, inline components
     */
    inline: {
      display: "inline-block",
      maxWidth: "none"
    }
  };
  function createWrapper(containerId, preset = "fullWidth", componentId) {
    const wrapper = document.createElement("div");
    wrapper.className = "autorun-mount";
    wrapper.dataset.preset = preset;
    if (componentId) {
      wrapper.dataset.componentId = componentId;
    }
    const container = document.createElement("div");
    container.id = containerId;
    wrapper.appendChild(container);
    return wrapper;
  }
  function getWrapperPresetsCSS() {
    return `
/* Autorun Mount Wrappers */
.autorun-mount {
  position: relative;
  box-sizing: border-box;
}

.autorun-mount[data-preset="cardColumn"] {
  max-width: 380px;
  margin: 0;
  display: block;
}

.autorun-mount[data-preset="fullWidth"] {
  max-width: none;
  width: 100%;
  display: block;
}

.autorun-mount[data-preset="centered"] {
  max-width: 800px;
  margin: 0 auto;
  display: block;
}

.autorun-mount[data-preset="inline"] {
  display: inline-block;
  max-width: none;
}

/* Placeholder for failed mounts */
.autorun-mount-failed {
  padding: 16px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  color: #856404;
  font-family: monospace;
  font-size: 12px;
  margin: 8px 0;
}

.autorun-mount-failed strong {
  display: block;
  margin-bottom: 4px;
}
  `.trim();
  }
  function injectWrapperPresetsCSS(doc = document) {
    if (doc.getElementById("autorun-wrapper-presets")) {
      return;
    }
    const style = doc.createElement("style");
    style.id = "autorun-wrapper-presets";
    style.textContent = getWrapperPresetsCSS();
    doc.head.appendChild(style);
    console.log("[WrapperPresets] \u2705 CSS injected");
  }
  function getRecommendedPreset(componentId) {
    const componentName = componentId.split("/")[1]?.toLowerCase() || "";
    if (["accordion", "table", "dataview", "tabs", "subnav"].includes(componentName)) {
      return "fullWidth";
    }
    if (["card", "simplecard", "selectioncard", "badge", "avatar"].includes(
      componentName
    )) {
      return "cardColumn";
    }
    if (["button", "chip", "statustag", "spinner"].includes(componentName)) {
      return "inline";
    }
    if (["modal", "drawer"].includes(componentName)) {
      return "centered";
    }
    return "fullWidth";
  }

  // packages/autorun-core/src/runtime/AutorunBoot.ts
  var AutorunBoot = class _AutorunBoot {
    constructor() {
      this.catalog = getComponentCatalog();
      this.logger = getLogger();
    }
    /**
     * Check if running on file protocol
     */
    isFileProtocol() {
      try {
        return window.location?.protocol === "file:";
      } catch {
        return false;
      }
    }
    /**
     * Show file protocol blocking overlay
     */
    showFileProtocolOverlay() {
      if (document.getElementById("autorun-file-overlay")) return;
      const html = `
    <div id="autorun-file-overlay" style="
      position:fixed; inset:0; z-index:999999;
      background:#0b0b0c; color:#fff; font-family:ui-sans-serif,system-ui,sans-serif;
      display:flex; align-items:center; justify-content:center; padding:24px;">
      <div style="max-width:880px; width:100%; border:1px solid rgba(255,255,255,.15); border-radius:14px; padding:32px; background:#1a1a1c; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
        <div style="font-size:24px; font-weight:700; margin-bottom:16px; color: #ef4444;">\u26A0\uFE0F Autorun V2: Requires HTTP Server</div>
        
        <div style="font-size:16px; opacity:.9; margin-bottom:24px; line-height:1.6;">
          You are opening this template via <b>file://</b> protocol.<br>
          Modern browsers block <b>fetch()</b> requests to local files due to CORS security policies.<br>
          The <b>Component Registry</b> and <b>Catalog</b> cannot function in this environment.
        </div>

        <div style="margin:16px 0; font-weight:700; font-size:14px; text-transform:uppercase; letter-spacing:0.05em; opacity:0.7;">Solution: Run this command</div>
        
        <pre style="background:rgba(0,0,0,.3); padding:20px; border-radius:8px; overflow:auto; border:1px solid rgba(255,255,255,0.1); font-family:monospace; font-size:14px; color:#a5f3fc;">
# Start the official preview server
npm run autorun:preview -- ./prototypes/${window.location.pathname.split("/").pop() || "YOUR_TEMPLATE.html"}
</pre>
        
        <div style="opacity:.7; margin-top:20px; font-size:14px;">
          Then open the URL shown in your terminal (usually <b>http://localhost:3000/...</b>).
        </div>
      </div>
    </div>`;
      document.documentElement.insertAdjacentHTML("beforeend", html);
    }
    /**
     * Execute boot sequence
     *
     * @param options - Boot options
     * @returns Boot report
     */
    async boot(options = {}) {
      const {
        ubitsTimeout = 1e4,
        debug = false,
        skipUbitsWait = false,
        registryBaseUrl = "/registry-providers"
      } = options;
      if (this.isFileProtocol()) {
        this.showFileProtocolOverlay();
        window.__AUTORUN_BOOTED__ = false;
        const report2 = {
          timestamp: Date.now(),
          status: "FAILED",
          // Using FAILED to ensure it's treated as an error
          catalogSize: 0,
          schemaVersion: "2.0",
          ubitsReady: false,
          validatorActive: false,
          normalizerActive: false,
          loggerActive: true,
          presetsAvailable: [],
          adaptersAvailable: [],
          prohibitionActive: false,
          rules: {
            noAdHocScripts: true,
            noStorybookAPIs: true,
            registryOnly: true
          },
          errors: [
            "FILE_PROTOCOL_BLOCKED: Golden Path requires HTTP server (CORS)"
          ],
          warnings: []
        };
        this.logger.error(
          "[Autorun] \u274C BOOT ABORTED: file:// protocol blocked. Use preview server."
        );
        window.__AUTORUN_BOOT_REPORT__ = report2;
        return report2;
      }
      this.logger.info("\u{1F680} Starting Autorun V2 boot sequence...");
      const report = {
        timestamp: Date.now(),
        status: "INCOMPLETE",
        catalogSize: 0,
        schemaVersion: "2.0",
        ubitsReady: false,
        validatorActive: false,
        normalizerActive: false,
        loggerActive: false,
        presetsAvailable: [],
        adaptersAvailable: [],
        prohibitionActive: false,
        rules: {
          noAdHocScripts: false,
          noStorybookAPIs: false,
          registryOnly: false
        },
        errors: [],
        warnings: []
      };
      if (debug) {
        this.logger.enableDebug();
      }
      report.loggerActive = true;
      if (!skipUbitsWait) {
        try {
          this.logger.debug("Waiting for UBITS...");
          await this.waitForUBITS(ubitsTimeout);
          report.ubitsReady = true;
          this.logger.info("\u2705 UBITS ready");
        } catch (error) {
          report.errors.push(`UBITS not ready: ${error.message}`);
          this.logger.error("\u274C UBITS not ready:", error);
        }
      } else {
        report.ubitsReady = true;
        report.warnings.push("Skipped UBITS wait (testing mode)");
      }
      try {
        this.logger.debug("Loading component catalog...");
        this.logger.debug(`Registry base URL: ${registryBaseUrl}`);
        await this.catalog.loadFromRegistry(registryBaseUrl);
        report.catalogSize = this.catalog.getAllComponents().length;
        this.logger.info(`\u2705 Catalog loaded: ${report.catalogSize} components`);
      } catch (error) {
        report.errors.push(`Catalog load failed: ${error.message}`);
        this.logger.error("\u274C Catalog load failed:", error);
      }
      try {
        const validator = new PreflightValidator(this.catalog);
        window.__AUTORUN_VALIDATOR__ = validator;
        report.validatorActive = true;
        this.logger.info("\u2705 Preflight validator activated");
      } catch (error) {
        report.errors.push(`Validator activation failed: ${error.message}`);
        this.logger.error("\u274C Validator activation failed:", error);
      }
      try {
        const normalizer = getRuntimeNormalizer();
        window.__AUTORUN_NORMALIZER__ = normalizer;
        report.normalizerActive = true;
        this.logger.info("\u2705 Runtime normalizer activated");
      } catch (error) {
        report.errors.push(`Normalizer activation failed: ${error.message}`);
        this.logger.error("\u274C Normalizer activation failed:", error);
      }
      try {
        report.presetsAvailable = Object.keys(WRAPPER_PRESETS);
        this.logger.info(
          `\u2705 Wrapper presets available: ${report.presetsAvailable.join(", ")}`
        );
      } catch (error) {
        report.errors.push(`Presets verification failed: ${error.message}`);
        this.logger.error("\u274C Presets verification failed:", error);
      }
      try {
        const registry = getAdapterRegistry();
        window.__AUTORUN_ADAPTERS__ = registry;
        report.adaptersAvailable = registry.getNames();
        this.logger.info(
          `\u2705 Adapters available: ${report.adaptersAvailable.join(", ")}`
        );
      } catch (error) {
        report.errors.push(`Adapters activation failed: ${error.message}`);
        this.logger.error("\u274C Adapters activation failed:", error);
      }
      try {
        report.prohibitionActive = true;
        this.logger.info("\u2705 Script prohibition active (build-time)");
      } catch (error) {
        report.warnings.push(`Script prohibition not active: ${error.message}`);
      }
      report.rules.noAdHocScripts = true;
      report.rules.noStorybookAPIs = true;
      report.rules.registryOnly = true;
      if (report.errors.length === 0 && report.ubitsReady && report.catalogSize > 0 && report.validatorActive && report.normalizerActive) {
        report.status = "READY";
        window.__AUTORUN_CATALOG__ = this.catalog;
        window.__AUTORUN_BOOTED__ = true;
        window.__AUTORUN_BOOT_STATE__ = { ready: true, ts: Date.now(), version: "v2" };
        window.__AUTORUN_BOOT_REPORT__ = report;
        this.logger.info("\u{1F389} Boot complete - System READY");
      } else if (report.errors.length > 0) {
        report.status = "FAILED";
        window.__AUTORUN_BOOT_REPORT__ = report;
        this.logger.error("\u274C Boot FAILED");
      } else {
        report.status = "INCOMPLETE";
        window.__AUTORUN_BOOT_REPORT__ = report;
        this.logger.warn("\u26A0\uFE0F  Boot INCOMPLETE");
      }
      return report;
    }
    /**
     * Wait for UBITS to be available
     *
     * @param timeout - Timeout in milliseconds
     */
    async waitForUBITS(timeout) {
      const isReady = () => {
        const w = window;
        const ubits = w.UBITS;
        const isUbitsPopulated = ubits && (Object.keys(ubits).length > 0 || ubits.Accordion || ubits.Card);
        const areGlobalsExposed = typeof w.createSidebar === "function" && typeof w.createTabBar === "function";
        return isUbitsPopulated || areGlobalsExposed;
      };
      const startTime = Date.now();
      return new Promise((resolve, reject) => {
        const check = () => {
          if (isReady()) {
            resolve();
            return;
          }
          if (Date.now() - startTime > timeout) {
            reject(new Error(`UBITS or globals not ready after ${timeout}ms`));
            return;
          }
          setTimeout(check, 100);
        };
        check();
      });
    }
    /**
     * Print boot report to console
     *
     * @param report - Boot report
     */
    printReport(report) {
      const statusIcon = report.status === "READY" ? "\u2705" : report.status === "FAILED" ? "\u274C" : "\u26A0\uFE0F";
      console.log(`
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F680} AUTORUN V2 BOOT REPORT
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

Status: ${statusIcon} ${report.status}
Time: ${new Date(report.timestamp).toISOString()}
Schema Version: ${report.schemaVersion}

\u{1F4E6} Component Catalog
  - Size: ${report.catalogSize} components

\u{1F527} Runtime Components
  - UBITS ready: ${report.ubitsReady ? "\u2705" : "\u274C"}
  - Preflight Validator: ${report.validatorActive ? "\u2705" : "\u274C"}
  - Runtime Normalizer: ${report.normalizerActive ? "\u2705" : "\u274C"}
  - Logger: ${report.loggerActive ? "\u2705" : "\u274C"}
  - Script Prohibition: ${report.prohibitionActive ? "\u2705" : "\u274C"}

\u{1F3A8} Wrapper Presets
  - Available: ${report.presetsAvailable.join(", ")}

\u{1F50C} Adapters
  - Available: ${report.adaptersAvailable.join(", ")}

\u{1F4CB} Rules
  - No ad-hoc scripts: ${report.rules.noAdHocScripts ? "\u2705 ON" : "\u274C OFF"}
  - No Storybook APIs: ${report.rules.noStorybookAPIs ? "\u2705 ON" : "\u274C OFF"}
  - Registry only: ${report.rules.registryOnly ? "\u2705 ON" : "\u274C OFF"}

${report.warnings.length > 0 ? `
\u26A0\uFE0F  Warnings:
${report.warnings.map((w) => `  \u2022 ${w}`).join("\n")}
` : ""}

${report.errors.length > 0 ? `
\u274C Errors:
${report.errors.map((e) => `  \u2022 ${e}`).join("\n")}
` : ""}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
    `);
    }
    /**
     * Check if system is booted
     *
     * @returns True if booted
     */
    static isBooted() {
      return !!window.__AUTORUN_BOOTED__;
    }
    /**
     * Require boot before proceeding
     *
     * Throws error if not booted and boot is required.
     */
    static requireBoot() {
      const required = window.AUTORUN_BOOT_REQUIRED;
      const booted = _AutorunBoot.isBooted();
      if (required && !booted) {
        throw new Error(
          "BOOT REQUIRED: Autorun V2 requires boot before loading components. Run: await AutorunBoot.boot()"
        );
      }
    }
  };
  var globalBoot = null;
  function getAutorunBoot() {
    if (!globalBoot) {
      globalBoot = new AutorunBoot();
    }
    return globalBoot;
  }
  async function boot(options) {
    return getAutorunBoot().boot(options);
  }

  // packages/autorun-core/src/runtime/RuntimeDependencyRegistry.ts
  var RuntimeDependencyError = class extends Error {
    constructor(message, details = {}) {
      super(message);
      this.details = details;
      this.name = "RuntimeDependencyError";
    }
  };
  var RuntimeDependencyRegistry = class {
    constructor() {
      this.dependencies = /* @__PURE__ */ new Map();
      this.listeners = /* @__PURE__ */ new Map();
    }
    /**
     * Register a runtime dependency
     *
     * @param name - Dependency identifier (e.g., 'window.createModal')
     * @param options - Configuration options
     */
    register(name, options = {}) {
      if (this.dependencies.has(name)) {
        console.warn(`[RuntimeRegistry] Dependency already registered: ${name}`);
        return;
      }
      const dep = {
        name,
        loaded: false,
        loading: false,
        error: null,
        registeredAt: Date.now(),
        ...options
      };
      this.dependencies.set(name, dep);
      console.log(`[RuntimeRegistry] \u2705 Registered: ${name}`);
    }
    /**
     * Wait for a dependency to be available
     *
     * @param name - Dependency name
     * @param timeout - Max wait time (ms), defaults to dep timeout or 10s
     * @returns Promise that resolves when dependency is loaded
     * @throws RuntimeDependencyError if timeout or load error
     */
    async wait(name, timeout) {
      const dep = this.dependencies.get(name);
      if (!dep) {
        throw new RuntimeDependencyError(
          `Dependency not registered: ${name}. Please register before waiting.`,
          { dependency: name, registered: false }
        );
      }
      if (dep.loaded) {
        console.log(`[RuntimeRegistry] \u2705 ${name} already loaded`);
        return;
      }
      if (dep.error) {
        throw new RuntimeDependencyError(
          `Dependency failed to load: ${name} - ${dep.error.message}`,
          { dependency: name, originalError: dep.error }
        );
      }
      const effectiveTimeout = timeout || dep.timeout || 1e4;
      console.log(
        `[RuntimeRegistry] \u23F3 Waiting for ${name} (timeout: ${effectiveTimeout}ms)...`
      );
      return Promise.race([
        this._waitForLoad(name),
        this._timeout(effectiveTimeout, name)
      ]);
    }
    /**
     * Wait for dependency load event
     * @private
     */
    _waitForLoad(name) {
      return new Promise((resolve, reject) => {
        const dep = this.dependencies.get(name);
        if (!dep) {
          reject(new Error(`Dependency disappeared: ${name}`));
          return;
        }
        const listener = (updatedDep) => {
          if (updatedDep.loaded) {
            this._removeListener(name, listener);
            resolve();
          } else if (updatedDep.error) {
            this._removeListener(name, listener);
            reject(
              new RuntimeDependencyError(
                `Dependency load failed: ${name} - ${updatedDep.error.message}`,
                { dependency: name, originalError: updatedDep.error }
              )
            );
          }
        };
        this._addListener(name, listener);
      });
    }
    /**
     * Timeout promise
     * @private
     */
    _timeout(ms, depName) {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(
            new RuntimeDependencyError(
              `Timeout waiting for dependency: ${depName} (${ms}ms exceeded)`,
              { dependency: depName, timeout: ms }
            )
          );
        }, ms);
      });
    }
    /**
     * Mark dependency as loaded
     *
     * @param name - Dependency name
     */
    markLoaded(name) {
      const dep = this.dependencies.get(name);
      if (!dep) {
        console.warn(
          `[RuntimeRegistry] Cannot mark unknown dependency as loaded: ${name}`
        );
        return;
      }
      dep.loaded = true;
      dep.loading = false;
      dep.loadedAt = Date.now();
      const loadTime = dep.loadedAt - dep.registeredAt;
      console.log(
        `[RuntimeRegistry] \u2705 ${name} loaded (${loadTime}ms since registration)`
      );
      this._notifyListeners(name);
    }
    /**
     * Mark dependency as failed
     *
     * @param name - Dependency name
     * @param error - Error that occurred
     */
    markFailed(name, error) {
      const dep = this.dependencies.get(name);
      if (!dep) {
        console.warn(
          `[RuntimeRegistry] Cannot mark unknown dependency as failed: ${name}`
        );
        return;
      }
      dep.loaded = false;
      dep.loading = false;
      dep.error = error;
      console.error(`[RuntimeRegistry] \u274C ${name} failed:`, error.message);
      this._notifyListeners(name);
    }
    /**
     * Mark dependency as loading
     *
     * @param name - Dependency name
     */
    markLoading(name) {
      const dep = this.dependencies.get(name);
      if (dep) {
        dep.loading = true;
        console.log(`[RuntimeRegistry] \u{1F504} ${name} loading...`);
      }
    }
    /**
     * Check if dependency is loaded
     *
     * @param name - Dependency name
     * @returns true if loaded, false otherwise
     */
    isLoaded(name) {
      return this.dependencies.get(name)?.loaded || false;
    }
    /**
     * Get dependency info
     *
     * @param name - Dependency name
     * @returns Dependency info or undefined
     */
    get(name) {
      return this.dependencies.get(name);
    }
    /**
     * Get all registered dependencies
     *
     * @returns Array of all dependency info
     */
    getAll() {
      return Array.from(this.dependencies.values());
    }
    /**
     * Get load statistics
     */
    getStats() {
      const deps = this.getAll();
      return {
        total: deps.length,
        loaded: deps.filter((d) => d.loaded).length,
        loading: deps.filter((d) => d.loading).length,
        failed: deps.filter((d) => d.error !== null).length,
        pending: deps.filter((d) => !d.loaded && !d.loading && !d.error).length
      };
    }
    /**
     * Add listener for dependency load
     * @private
     */
    _addListener(name, listener) {
      if (!this.listeners.has(name)) {
        this.listeners.set(name, /* @__PURE__ */ new Set());
      }
      this.listeners.get(name).add(listener);
    }
    /**
     * Remove listener
     * @private
     */
    _removeListener(name, listener) {
      this.listeners.get(name)?.delete(listener);
    }
    /**
     * Notify all listeners for a dependency
     * @private
     */
    _notifyListeners(name) {
      const dep = this.dependencies.get(name);
      const listeners = this.listeners.get(name);
      if (dep && listeners) {
        for (const listener of listeners) {
          try {
            listener(dep);
          } catch (error) {
            console.error(
              `[RuntimeRegistry] Error in listener for ${name}:`,
              error
            );
          }
        }
      }
    }
    /**
     * Clear all registrations (for testing)
     */
    clear() {
      this.dependencies.clear();
      this.listeners.clear();
      console.log("[RuntimeRegistry] Cleared all registrations");
    }
  };
  var globalRegistry2 = null;
  function getRuntimeRegistry() {
    if (!globalRegistry2) {
      globalRegistry2 = new RuntimeDependencyRegistry();
    }
    return globalRegistry2;
  }

  // packages/autorun-core/src/runtime/UniversalMount.ts
  var UniversalMount = class {
    constructor(catalog) {
      this.normalizer = getRuntimeNormalizer();
      this.logger = getLogger();
      this.catalog = catalog;
      this.validator = new PreflightValidator(catalog);
    }
    /**
     * Mount component with preflight validation
     *
     * @param options - Mount options
     * @returns Mount result
     */
    mount(options) {
      this.logger.debug(`Mounting ${options.componentId}...`);
      const normalizedProps = this.normalizer.sanitizeUrlsDeep(
        options.props || {}
      );
      this.logger.debug("Props normalized");
      const preflight = this.validator.validate(
        options.componentId,
        normalizedProps
      );
      if (!preflight.valid) {
        this.logger.error(
          `Preflight failed for ${options.componentId}:`,
          preflight.errors
        );
        return this.createPlaceholder(options, preflight);
      }
      const mode = this.determineMode(options, preflight);
      this.logger.debug(`Using mode: ${mode}`);
      const preset = options.preset || getRecommendedPreset(options.componentId);
      this.logger.debug(`Using preset: ${preset}`);
      const wrapper = createWrapper(
        options.containerId,
        preset,
        options.componentId
      );
      const container = wrapper.querySelector(
        `#${options.containerId}`
      );
      if (!container) {
        this.logger.error(`Container not found in wrapper`);
        return this.createPlaceholder(options, preflight, [
          "Container element not created"
        ]);
      }
      try {
        this.mountByMode(mode, container, normalizedProps, preflight, options);
        this.logger.info(`\u2705 Successfully mounted ${options.componentId}`);
        return {
          success: true,
          element: wrapper,
          preflight,
          mode
        };
      } catch (error) {
        this.logger.error(`Mount failed for ${options.componentId}:`, error);
        return this.createPlaceholder(options, preflight, [
          error.message || String(error)
        ]);
      }
    }
    /**
     * Determine component mode
     *
     * @param options - Mount options
     * @param preflight - Preflight result
     * @returns Component mode
     */
    determineMode(options, preflight) {
      if (options.mode) {
        return options.mode;
      }
      const componentName = options.componentId.split("/")[1];
      if (getAdapter(componentName)) {
        return "adapter";
      }
      const component = this.catalog.getComponent(options.componentId);
      if (component?.metadata?.mode) {
        return component.metadata.mode;
      }
      return "container";
    }
    /**
     * Mount component by mode
     *
     * @param mode - Component mode
     * @param container - Container element
     * @param props - Normalized props
     * @param preflight - Preflight result
     * @param options - Mount options
     */
    mountByMode(mode, container, props, preflight, options) {
      const factory = preflight.factory;
      const componentName = options.componentId.split("/")[1];
      switch (mode) {
        case "pure":
          this.logger.debug(
            `Calling factory (pure mode): ${preflight.factoryPath}`
          );
          const element = factory(props);
          if (element && element instanceof HTMLElement) {
            container.appendChild(element);
          } else {
            throw new Error("Pure mode factory did not return HTMLElement");
          }
          break;
        case "container":
          this.logger.debug(
            `Calling factory (container mode): ${preflight.factoryPath}`
          );
          const result = factory(container, props);
          if (result && result.element) {
            if (!container.contains(result.element)) {
              container.appendChild(result.element);
            }
          } else if (result && result instanceof HTMLElement) {
            if (!container.contains(result)) {
              container.appendChild(result);
            }
          }
          break;
        case "legacy-id":
          this.logger.debug(
            `Calling factory (legacy-id mode): ${preflight.factoryPath}`
          );
          const propsWithId = { ...props, containerId: container.id };
          factory(propsWithId);
          break;
        case "adapter":
          const adapter = getAdapter(componentName);
          if (!adapter) {
            throw new Error(`Adapter not found for ${componentName}`);
          }
          this.logger.debug(`Calling adapter for ${componentName}`);
          adapter(container, props);
          break;
        default:
          throw new Error(`Unknown mode: ${mode}`);
      }
    }
    /**
     * Create placeholder for failed mount
     *
     * @param options - Mount options
     * @param preflight - Preflight result
     * @param runtimeErrors - Additional runtime errors
     * @returns Mount result with placeholder
     */
    createPlaceholder(options, preflight, runtimeErrors = []) {
      const wrapper = document.createElement("div");
      wrapper.className = "autorun-mount autorun-mount-failed";
      wrapper.dataset.componentId = options.componentId;
      wrapper.dataset.containerId = options.containerId;
      const allErrors = [...preflight.errors, ...runtimeErrors];
      wrapper.innerHTML = `
      <strong>\u26A0\uFE0F Component Mount Failed</strong>
      <strong>Component:</strong> ${options.componentId}
      <strong>Container:</strong> ${options.containerId}
      ${preflight.factoryPath ? `<strong>Factory:</strong> ${preflight.factoryPath}` : ""}
      <strong>Errors:</strong>
      ${allErrors.map((e) => `\u2022 ${this.escapeHtml(e)}`).join("<br>")}
      ${preflight.warnings.length > 0 ? `
        <strong>Warnings:</strong>
        ${preflight.warnings.map((w) => `\u2022 ${this.escapeHtml(w)}`).join("<br>")}
      ` : ""}
    `;
      this.logger.debug(`Created placeholder for ${options.componentId}`);
      return {
        success: false,
        element: wrapper,
        error: allErrors.join("; "),
        preflight
      };
    }
    /**
     * Escape HTML to prevent XSS in error messages
     */
    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }
    /**
     * Mount multiple components
     *
     * @param optionsArray - Array of mount options
     * @returns Array of mount results
     */
    mountAll(optionsArray) {
      this.logger.info(`Mounting ${optionsArray.length} components...`);
      const results = [];
      for (const options of optionsArray) {
        const result = this.mount(options);
        results.push(result);
      }
      const successCount = results.filter((r) => r.success).length;
      const failCount = results.filter((r) => !r.success).length;
      this.logger.info(`\u2705 ${successCount} succeeded, \u274C ${failCount} failed`);
      return results;
    }
  };

  // packages/autorun-core/src/runtime/waitForDependencies.ts
  async function waitForDependencies(deps, options = {}) {
    const {
      timeout = 1e4,
      checkInterval = 100,
      failLoud = true,
      useRegistry = true
    } = options;
    if (deps.length === 0) {
      return;
    }
    console.log(
      `[waitForDependencies] Waiting for ${deps.length} dependencies...`
    );
    console.log(`[waitForDependencies] Dependencies: ${deps.join(", ")}`);
    console.log(
      `[waitForDependencies] Timeout: ${timeout}ms, Interval: ${checkInterval}ms`
    );
    if (useRegistry) {
      try {
        const registry = getRuntimeRegistry();
        const allRegistered = deps.every(
          (dep) => registry.get(dep) !== void 0
        );
        if (allRegistered) {
          console.log("[waitForDependencies] Using RuntimeRegistry...");
          await Promise.all(deps.map((dep) => registry.wait(dep, timeout)));
          console.log(
            "[waitForDependencies] \u2705 All dependencies ready (via registry)"
          );
          return;
        }
      } catch (error) {
        console.warn(
          "[waitForDependencies] Registry not available, using polling"
        );
      }
    }
    const startTime = Date.now();
    const missingDeps = new Set(deps);
    while (missingDeps.size > 0) {
      for (const dep of Array.from(missingDeps)) {
        if (checkDependencyAvailable(dep)) {
          missingDeps.delete(dep);
          console.log(`[waitForDependencies] \u2705 ${dep} available`);
        }
      }
      if (missingDeps.size === 0) {
        const elapsed2 = Date.now() - startTime;
        console.log(
          `[waitForDependencies] \u2705 All dependencies ready (${elapsed2}ms)`
        );
        return;
      }
      const elapsed = Date.now() - startTime;
      if (elapsed > timeout) {
        const missing = Array.from(missingDeps);
        if (failLoud) {
          throw new RuntimeDependencyError(
            `Timeout waiting for dependencies (${timeout}ms):
${missing.map((d) => `  - ${d}`).join("\n")}`,
            {
              missingDependencies: missing,
              timeout,
              elapsed,
              serviceDiagnostic: generateDiagnostic(missing)
            }
          );
        } else {
          console.warn(
            `[waitForDependencies] \u26A0\uFE0F Timeout waiting for: ${missing.join(", ")} (${elapsed}ms)`
          );
          return;
        }
      }
      await sleep(checkInterval);
    }
  }
  function checkDependencyAvailable(path) {
    try {
      const value = evalPath(path);
      return value !== void 0 && value !== null;
    } catch {
      return false;
    }
  }
  function evalPath(path) {
    try {
      if (path.startsWith("window.")) {
        path = path.substring(7);
      }
      const parts = path.split(".");
      let current = window;
      for (const part of parts) {
        if (current === void 0 || current === null) {
          return void 0;
        }
        current = current[part];
      }
      return current;
    } catch {
      return void 0;
    }
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function generateDiagnostic(missingDeps) {
    const suggestions = [];
    for (const dep of missingDeps) {
      if (dep.includes("createModal")) {
        suggestions.push(`\u2022 ${dep}: Load modal.umd.js from Storybook`);
      } else if (dep.includes("createTabs") || dep.includes("Tabs")) {
        suggestions.push(`\u2022 ${dep}: Load tabs.umd.js from Storybook`);
      } else if (dep.includes("createDataTable") || dep.includes("DataTable")) {
        suggestions.push(`\u2022 ${dep}: Load data-table.umd.js from Storybook`);
      } else if (dep.includes("Card")) {
        suggestions.push(`\u2022 ${dep}: Load card.umd.js from Storybook`);
      } else {
        suggestions.push(`\u2022 ${dep}: Check if UMD bundle is loaded`);
      }
    }
    return suggestions.join("\n");
  }
  async function waitForDependency(dep, timeout) {
    return waitForDependencies([dep], { timeout });
  }

  // packages/autorun-core/src/runtime/RegistryLoader.ts
  var RegistryLoader = class {
    constructor(catalog, slotMapping) {
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
    async loadFromDOM(selector = "[data-autorun-registry]") {
      try {
        AutorunBoot.requireBoot();
        const report = window.__AUTORUN_BOOT_REPORT__;
        if (report?.status !== "READY") {
          this.logger.warn(
            `Runtime not READY (${report?.status}). Skipping registry load.`
          );
          return 0;
        }
      } catch (error) {
        this.logger.error(
          "Boot required before loading registry:",
          error.message
        );
        return 0;
      }
      this.logger.info("\u{1F50D} Scanning for registry...");
      const registryEl = document.querySelector(selector);
      if (!registryEl) {
        this.logger.warn("No registry found");
        return 0;
      }
      let registryData = registryEl.getAttribute("data-autorun-registry");
      if (!registryData && registryEl.tagName === "SCRIPT" && registryEl.getAttribute("type") === "application/json") {
        registryData = registryEl.textContent || "";
      }
      if (!registryData) {
        this.logger.warn("Registry attribute is empty");
        return 0;
      }
      try {
        const entries = JSON.parse(registryData);
        this.logger.info(`Found ${entries.length} entries`);
        let loadedCount = 0;
        for (const entry of entries) {
          const success = await this.loadEntry(entry);
          if (success) {
            loadedCount++;
          }
        }
        this.logger.info(`\u2705 Loaded ${loadedCount}/${entries.length} components`);
        return loadedCount;
      } catch (error) {
        this.logger.error("Failed to parse registry:", error);
        return 0;
      }
    }
    /**
     * Load single registry entry
     *
     * @param entry - Registry entry
     * @returns True if loaded successfully
     */
    async loadEntry(entry) {
      console.log(`[RegistryLoader] Loading ${entry.component}...`);
      try {
        if (entry.dependencies && entry.dependencies.length > 0) {
          console.log(
            `[RegistryLoader] Waiting for dependencies: ${entry.dependencies.join(", ")}`
          );
          try {
            await waitForDependencies(entry.dependencies, {
              timeout: 1e4,
              checkInterval: 100
            });
          } catch (depErr) {
            console.warn(`[RegistryLoader] \u26A0\uFE0F Dependency delayed/missing for ${entry.component}: ${depErr.message}. Attempting to mount anyway...`);
          }
        }
        const containerId = this.generateContainerId(entry.component);
        const result = this.mount.mount({
          componentId: entry.component,
          containerId,
          props: entry.props,
          preset: entry.preset,
          slot: entry.slot
        });
        if (result.element) {
          this.insertIntoSlot(result.element, entry.slot);
        }
        return result.success;
      } catch (error) {
        console.error(
          `[RegistryLoader] \u274C Failed to load ${entry.component}:`,
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
    insertIntoSlot(element, slot) {
      const mapping = this.slotMapping[slot];
      if (!mapping) {
        console.warn(`[RegistryLoader] Unknown slot: ${slot}, appending to body`);
        document.body.appendChild(element);
        return;
      }
      if (typeof mapping === "function") {
        mapping(element);
      } else {
        const target = document.querySelector(mapping);
        if (target) {
          target.insertAdjacentElement("afterend", element);
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
    generateContainerId(componentId) {
      const safeName = componentId.replace(/[^a-z0-9]/gi, "-");
      const timestamp = Date.now();
      return `autorun-${safeName}-${timestamp}`;
    }
    /**
     * Get default slot mapping
     *
     * @returns Default slot mapping
     */
    getDefaultSlotMapping() {
      return {
        "below-subnav": "#top-nav-container",
        "content-area": ".content-area",
        sidebar: ".sidebar",
        header: "header",
        footer: "footer",
        main: "main"
      };
    }
    /**
     * Set custom slot mapping
     *
     * @param mapping - Slot mapping
     */
    setSlotMapping(mapping) {
      this.slotMapping = { ...this.slotMapping, ...mapping };
    }
    /**
     * Load from JSON string
     *
     * @param json - JSON string with registry entries
     * @returns Number of components loaded
     */
    async loadFromJSON(json) {
      try {
        const entries = JSON.parse(json);
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
          `[RegistryLoader] \u2705 Loaded ${loadedCount}/${entries.length} components`
        );
        return loadedCount;
      } catch (error) {
        console.error("[RegistryLoader] \u274C Failed to parse JSON:", error);
        return 0;
      }
    }
    /**
     * Load from array of entries
     *
     * @param entries - Array of registry entries
     * @returns Number of components loaded
     */
    async loadFromArray(entries) {
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
        `[RegistryLoader] \u2705 Loaded ${loadedCount}/${entries.length} components`
      );
      return loadedCount;
    }
  };
  async function initializeRegistry(catalog, selector) {
    const loader = new RegistryLoader(catalog);
    return await loader.loadFromDOM(selector);
  }

  // packages/autorun-core/src/runtime/browser-entry.ts
  initTemplateGlobalsBridge({ debug: window.AUTORUN_DEBUG === true });
  try {
    UBITSInterceptor.initialize();
  } catch (error) {
    console.error("\u274C Failed to initialize UBITS Interceptor:", error);
  }
  if (typeof window !== "undefined") {
    const initAutorun = async () => {
      console.log("\u{1F680} Autorun V2 Runtime initializing...");
      try {
        const config = window.__AUTORUN_CONFIG__ || {};
        const report = await boot({
          debug: true,
          ubitsTimeout: config.ubitsTimeout || 1e4
        });
        window.__AUTORUN_BOOT_REPORT__ = report;
        if (report.status !== "READY") {
          console.error("\u274C Autorun V2 Runtime failed to initialize");
          console.error("Boot report:", report);
        } else {
          console.log("\u2705 Autorun V2 Runtime initialized successfully");
        }
      } catch (error) {
        console.error(
          "\u274C Fatal error during Autorun V2 Runtime initialization:",
          error
        );
        window.__AUTORUN_BOOT_ERROR__ = error;
      }
    };
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", initAutorun);
    } else {
      initAutorun();
    }
  }
})();
//# sourceMappingURL=runtime-bundle.js.map
