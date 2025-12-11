/**
 * ESLintAddon
 *
 * Add-on funcional de ESLint que implementa IFunctionalAddon.
 * Proporciona linting automático de código.
 */

import { IFunctionalAddon, AutorunContext } from '@autorun/core';
import { ESLintService, ESLintConfig, ESLintReport } from './ESLintService';

export class ESLintAddon implements IFunctionalAddon {
  readonly id = 'eslint';
  readonly name = 'ESLint';
  readonly version = '1.0.0';
  readonly type = 'functional';
  readonly description = 'Linting automático de código con ESLint';

  private service?: ESLintService;
  private active = false;
  private config: ESLintConfig = {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fix: false,
    format: 'stylish',
    maxWarnings: 0,
  };
  private context?: AutorunContext;

  async initialize(context: AutorunContext): Promise<void> {
    this.context = context;

    // Obtener configuración
    const addonConfig = context.config.autorun?.addons?.config?.eslint || {};
    this.config = {
      configFile: addonConfig.configFile,
      extensions: addonConfig.extensions || ['.js', '.jsx', '.ts', '.tsx'],
      fix: addonConfig.fix || false,
      format: addonConfig.format || 'stylish',
      maxWarnings: addonConfig.maxWarnings || 0,
      ignorePath: addonConfig.ignorePath,
      rules: addonConfig.rules,
    };

    // Inicializar servicio
    this.service = new ESLintService(this.config, process.cwd());

    try {
      await this.service.initialize();
      // Solo mostrar mensaje si se inicializó correctamente (ESLint instalado)
      if (this.service.getStatus().initialized) {
        console.log('✅ ESLint Add-on: Inicializado correctamente');
      }
    } catch (error) {
      console.error(`❌ ESLint Add-on: Error al inicializar - ${error}`);
      // No lanzar error, permitir que el add-on funcione sin inicialización completa
    }
  }

  async activate(): Promise<void> {
    if (!this.service) {
      this.service = new ESLintService(this.config, process.cwd());
      await this.service.initialize();
    }

    this.active = true;
    console.log('✅ ESLint Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    console.log('🔌 ESLint Add-on: Desactivado');
  }

  isActive(): boolean {
    return this.active;
  }

  getStatus(): 'active' | 'inactive' {
    return this.active ? 'active' : 'inactive';
  }

  destroy(): void {
    this.active = false;
    this.service = undefined;
  }

  async configure(config: Record<string, any>): Promise<void> {
    const eslintConfig: Partial<ESLintConfig> = {};

    if (config.configFile) eslintConfig.configFile = config.configFile;
    if (config.extensions) eslintConfig.extensions = config.extensions;
    if (config.fix !== undefined) eslintConfig.fix = config.fix;
    if (config.format) eslintConfig.format = config.format;
    if (config.maxWarnings !== undefined)
      eslintConfig.maxWarnings = config.maxWarnings;
    if (config.ignorePath) eslintConfig.ignorePath = config.ignorePath;
    if (config.rules) eslintConfig.rules = config.rules;

    this.config = { ...this.config, ...eslintConfig };

    if (this.service) {
      this.service.updateConfig(eslintConfig);
    } else {
      this.service = new ESLintService(this.config, process.cwd());
      await this.service.initialize();
    }
  }

  /**
   * Hook llamado cuando un archivo cambia
   */
  async onFileChange(filePath: string, content?: string): Promise<void> {
    if (!this.active || !this.service) {
      return;
    }

    // Lintear archivo automáticamente si es un archivo soportado
    const ext = filePath.substring(filePath.lastIndexOf('.'));
    if (this.config.extensions?.includes(ext)) {
      try {
        const report = await this.service.lint([filePath]);
        if (report.errorCount > 0) {
          console.warn(
            `⚠️  ESLint: ${report.errorCount} errores encontrados en ${filePath}`
          );
        }
      } catch (error) {
        // Ignorar errores en linting automático
      }
    }
  }

  /**
   * Hook llamado antes de hacer commit
   */
  async onBeforeCommit(files: string[]): Promise<void> {
    if (!this.active || !this.service) {
      return;
    }

    // Lintear archivos antes de commit
    try {
      const report = await this.service.lint(files);
      if (report.errorCount > 0) {
        console.warn(
          `⚠️  ESLint: ${report.errorCount} errores encontrados. Considera ejecutar --fix`
        );
      }
    } catch (error) {
      // No bloquear commit por errores de linting
    }
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Lintear archivos
      lint: async (files: string[], options?: Partial<ESLintConfig>) => {
        if (!this.service) {
          throw new Error('ESLint service no está inicializado');
        }
        return await this.service.lint(files, options);
      },

      // Auto-fix
      fix: async (files: string[], options?: Partial<ESLintConfig>) => {
        if (!this.service) {
          throw new Error('ESLint service no está inicializado');
        }
        return await this.service.fix(files, options);
      },

      // Obtener estado
      getStatus: () => {
        if (!this.service) {
          return {
            initialized: false,
            eslintInstalled: false,
            hasConfig: false,
          };
        }
        return this.service.getStatus();
      },

      // Obtener configuración
      getConfig: () => {
        if (!this.service) {
          return this.config;
        }
        return this.service.getConfig();
      },

      // Actualizar configuración
      updateConfig: (config: Partial<ESLintConfig>) => {
        if (!this.service) {
          throw new Error('ESLint service no está inicializado');
        }
        return this.service.updateConfig(config);
      },
    };
  }
}
