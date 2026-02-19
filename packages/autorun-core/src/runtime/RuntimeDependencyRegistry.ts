export class RuntimeDependencyError extends Error {
  details: any;
  constructor(message: string, details: any = {}) {
    super(message);
    this.details = details;
    this.name = 'RuntimeDependencyError';
  }
}

export interface DependencyInfo {
  name: string;
  loaded: boolean;
  loading: boolean;
  error: Error | null;
  registeredAt: number;
  loadedAt?: number;
  timeout?: number;
  [key: string]: any;
}

export class RuntimeDependencyRegistry {
  private dependencies: Map<string, DependencyInfo>;
  private listeners: Map<string, Set<(dep: DependencyInfo) => void>>;

  constructor() {
    this.dependencies = new Map();
    this.listeners = new Map();
  }

  /**
   * Register a runtime dependency
   *
   * @param name - Dependency identifier (e.g., 'window.createModal')
   * @param options - Configuration options
   */
  register(name: string, options: any = {}) {
    if (this.dependencies.has(name)) {
      console.warn(`[RuntimeRegistry] Dependency already registered: ${name}`);
      return;
    }
    const dep: DependencyInfo = {
      name,
      loaded: false,
      loading: false,
      error: null,
      registeredAt: Date.now(),
      ...options,
    };
    this.dependencies.set(name, dep);
    console.log(`[RuntimeRegistry] ✅ Registered: ${name}`);
  }

  /**
   * Wait for a dependency to be available
   *
   * @param name - Dependency name
   * @param timeout - Max wait time (ms), defaults to dep timeout or 10s
   * @returns Promise that resolves when dependency is loaded
   * @throws RuntimeDependencyError if timeout or load error
   */
  async wait(name: string, timeout?: number): Promise<void> {
    const dep = this.dependencies.get(name);
    if (!dep) {
      throw new RuntimeDependencyError(
        `Dependency not registered: ${name}. Please register before waiting.`,
        { dependency: name, registered: false }
      );
    }
    if (dep.loaded) {
      console.log(`[RuntimeRegistry] ✅ ${name} already loaded`);
      return;
    }
    if (dep.error) {
      throw new RuntimeDependencyError(
        `Dependency failed to load: ${name} - ${dep.error.message}`,
        { dependency: name, originalError: dep.error }
      );
    }
    const effectiveTimeout = timeout || dep.timeout || 10000;
    console.log(
      `[RuntimeRegistry] ⏳ Waiting for ${name} (timeout: ${effectiveTimeout}ms)...`
    );
    return Promise.race([
      this._waitForLoad(name),
      this._timeout(effectiveTimeout, name),
    ]);
  }

  /**
   * Wait for dependency load event
   * @private
   */
  private _waitForLoad(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const dep = this.dependencies.get(name);
      if (!dep) {
        reject(new Error(`Dependency disappeared: ${name}`));
        return;
      }
      const listener = (updatedDep: DependencyInfo) => {
        if (updatedDep.loaded) {
          this._removeListener(name, listener);
          resolve();
        } else if (updatedDep.error) {
          this._removeListener(name, listener);
          reject(
            new RuntimeDependencyError(
              `Dependency load failed: ${name} - ${updatedDep.error!.message}`,
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
  private _timeout(ms: number, depName: string): Promise<void> {
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
  markLoaded(name: string) {
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
      `[RuntimeRegistry] ✅ ${name} loaded (${loadTime}ms since registration)`
    );
    this._notifyListeners(name);
  }

  /**
   * Mark dependency as failed
   *
   * @param name - Dependency name
   * @param error - Error that occurred
   */
  markFailed(name: string, error: Error) {
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
    console.error(`[RuntimeRegistry] ❌ ${name} failed:`, error.message);
    this._notifyListeners(name);
  }

  /**
   * Mark dependency as loading
   *
   * @param name - Dependency name
   */
  markLoading(name: string) {
    const dep = this.dependencies.get(name);
    if (dep) {
      dep.loading = true;
      console.log(`[RuntimeRegistry] 🔄 ${name} loading...`);
    }
  }

  /**
   * Check if dependency is loaded
   *
   * @param name - Dependency name
   * @returns true if loaded, false otherwise
   */
  isLoaded(name: string): boolean {
    return this.dependencies.get(name)?.loaded || false;
  }

  /**
   * Get dependency info
   *
   * @param name - Dependency name
   * @returns Dependency info or undefined
   */
  get(name: string): DependencyInfo | undefined {
    return this.dependencies.get(name);
  }

  /**
   * Get all registered dependencies
   *
   * @returns Array of all dependency info
   */
  getAll(): DependencyInfo[] {
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
      pending: deps.filter((d) => !d.loaded && !d.loading && !d.error).length,
    };
  }

  /**
   * Add listener for dependency load
   * @private
   */
  private _addListener(name: string, listener: (dep: DependencyInfo) => void) {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, new Set());
    }
    this.listeners.get(name)!.add(listener);
  }

  /**
   * Remove listener
   * @private
   */
  private _removeListener(
    name: string,
    listener: (dep: DependencyInfo) => void
  ) {
    this.listeners.get(name)?.delete(listener);
  }

  /**
   * Notify all listeners for a dependency
   * @private
   */
  private _notifyListeners(name: string) {
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
    console.log('[RuntimeRegistry] Cleared all registrations');
  }
}

let globalRegistry: RuntimeDependencyRegistry | null = null;
export function getRuntimeRegistry(): RuntimeDependencyRegistry {
  if (!globalRegistry) {
    globalRegistry = new RuntimeDependencyRegistry();
  }
  return globalRegistry;
}
