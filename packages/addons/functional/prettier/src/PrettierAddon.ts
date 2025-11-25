/**
 * PrettierAddon
 * 
 * Add-on funcional de Prettier que implementa IFunctionalAddon.
 * Proporciona formateo automático de código.
 */

import { IFunctionalAddon, AutoframeContext } from '@autoframe/core';
import { PrettierService, PrettierConfig, PrettierResult } from './PrettierService';

export class PrettierAddon implements IFunctionalAddon {
  readonly id = 'prettier';
  readonly name = 'Prettier';
  readonly version = '1.0.0';
  readonly type = 'functional';
  readonly description = 'Formateo automático de código con Prettier';
  
  private service?: PrettierService;
  private active = false;
  private config: PrettierConfig = {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
    printWidth: 80,
    useTabs: false,
    arrowParens: 'always',
    endOfLine: 'lf'
  };
  private context?: AutoframeContext;

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.prettier || {};
    this.config = {
      configFile: addonConfig.configFile,
      ignorePath: addonConfig.ignorePath,
      semi: addonConfig.semi !== undefined ? addonConfig.semi : true,
      singleQuote: addonConfig.singleQuote !== undefined ? addonConfig.singleQuote : true,
      tabWidth: addonConfig.tabWidth || 2,
      trailingComma: addonConfig.trailingComma || 'es5',
      printWidth: addonConfig.printWidth || 80,
      useTabs: addonConfig.useTabs || false,
      arrowParens: addonConfig.arrowParens || 'always',
      endOfLine: addonConfig.endOfLine || 'lf',
      plugins: addonConfig.plugins
    };

    // Inicializar servicio
    this.service = new PrettierService(this.config, process.cwd());
    
    try {
      await this.service.initialize();
      console.log('✅ Prettier Add-on: Inicializado correctamente');
    } catch (error) {
      console.error(`❌ Prettier Add-on: Error al inicializar - ${error}`);
      // No lanzar error, permitir que el add-on funcione sin inicialización completa
    }
  }

  async activate(): Promise<void> {
    if (!this.service) {
      this.service = new PrettierService(this.config, process.cwd());
      await this.service.initialize();
    }

    this.active = true;
    console.log('✅ Prettier Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    console.log('🔌 Prettier Add-on: Desactivado');
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
    const prettierConfig: Partial<PrettierConfig> = {};
    
    if (config.configFile) prettierConfig.configFile = config.configFile;
    if (config.ignorePath) prettierConfig.ignorePath = config.ignorePath;
    if (config.semi !== undefined) prettierConfig.semi = config.semi;
    if (config.singleQuote !== undefined) prettierConfig.singleQuote = config.singleQuote;
    if (config.tabWidth !== undefined) prettierConfig.tabWidth = config.tabWidth;
    if (config.trailingComma) prettierConfig.trailingComma = config.trailingComma;
    if (config.printWidth !== undefined) prettierConfig.printWidth = config.printWidth;
    if (config.useTabs !== undefined) prettierConfig.useTabs = config.useTabs;
    if (config.arrowParens) prettierConfig.arrowParens = config.arrowParens;
    if (config.endOfLine) prettierConfig.endOfLine = config.endOfLine;
    if (config.plugins) prettierConfig.plugins = config.plugins;

    this.config = { ...this.config, ...prettierConfig };

    if (this.service) {
      this.service.updateConfig(prettierConfig);
    } else {
      this.service = new PrettierService(this.config, process.cwd());
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

    // Formatear archivo automáticamente si está habilitado
    const ext = filePath.substring(filePath.lastIndexOf('.'));
    const supportedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.md'];

    if (supportedExtensions.includes(ext)) {
      try {
        await this.service.format([filePath]);
      } catch (error) {
        // Ignorar errores en formateo automático
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

    // Formatear archivos antes de commit
    try {
      await this.service.format(files);
    } catch (error) {
      // No bloquear commit por errores de formateo
    }
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Formatear archivos
      format: async (files: string[], options?: Partial<PrettierConfig>) => {
        if (!this.service) {
          throw new Error('Prettier service no está inicializado');
        }
        return await this.service.format(files, options);
      },
      
      // Verificar formato
      check: async (files: string[], options?: Partial<PrettierConfig>) => {
        if (!this.service) {
          throw new Error('Prettier service no está inicializado');
        }
        return await this.service.check(files, options);
      },
      
      // Obtener estado
      getStatus: () => {
        if (!this.service) {
          return {
            initialized: false,
            prettierInstalled: false,
            hasConfig: false
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
      updateConfig: (config: Partial<PrettierConfig>) => {
        if (!this.service) {
          throw new Error('Prettier service no está inicializado');
        }
        return this.service.updateConfig(config);
      }
    };
  }
}

