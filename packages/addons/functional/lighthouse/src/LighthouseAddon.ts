/**
 * LighthouseAddon
 * 
 * Add-on funcional de Lighthouse que implementa IFunctionalAddon.
 * Proporciona auditorías de performance, accesibilidad, SEO y best practices.
 */

import { IFunctionalAddon, AutoframeContext } from '@autoframe/core';
import { LighthouseService, LighthouseConfig, LighthouseResult } from './LighthouseService';

export class LighthouseAddon implements IFunctionalAddon {
  readonly id = 'lighthouse';
  readonly name = 'Lighthouse Audit';
  readonly version = '1.0.0';
  readonly type = 'functional';
  readonly description = 'Auditoría de performance, accesibilidad, SEO y best practices con Lighthouse';
  
  private service?: LighthouseService;
  private active = false;
  private config: LighthouseConfig = {
    port: 9222,
    chromeFlags: ['--headless', '--no-sandbox'],
    output: 'html',
    outputPath: 'lighthouse-reports',
    categories: ['performance', 'accessibility', 'best-practices', 'seo'],
    emulatedFormFactor: 'mobile',
    locale: 'es'
  };
  private context?: AutoframeContext;

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.lighthouse || {};
    this.config = {
      port: addonConfig.port || 9222,
      chromeFlags: addonConfig.chromeFlags || ['--headless', '--no-sandbox'],
      output: addonConfig.output || 'html',
      outputPath: addonConfig.outputPath || 'lighthouse-reports',
      categories: addonConfig.categories || ['performance', 'accessibility', 'best-practices', 'seo'],
      emulatedFormFactor: addonConfig.emulatedFormFactor || 'mobile',
      locale: addonConfig.locale || 'es',
      throttling: addonConfig.throttling
    };

    // Inicializar servicio
    this.service = new LighthouseService(this.config);
    
    try {
      await this.service.initialize();
      console.log('✅ Lighthouse Add-on: Inicializado correctamente');
    } catch (error) {
      console.error(`❌ Lighthouse Add-on: Error al inicializar - ${error}`);
      // No lanzar error, permitir que el add-on funcione sin inicialización completa
    }
  }

  async activate(): Promise<void> {
    if (!this.service) {
      this.service = new LighthouseService(this.config);
      await this.service.initialize();
    }

    this.active = true;
    console.log('✅ Lighthouse Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    console.log('🔌 Lighthouse Add-on: Desactivado');
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
    const lighthouseConfig: Partial<LighthouseConfig> = {};
    
    if (config.port !== undefined) lighthouseConfig.port = config.port;
    if (config.chromeFlags) lighthouseConfig.chromeFlags = config.chromeFlags;
    if (config.output) lighthouseConfig.output = config.output;
    if (config.outputPath) lighthouseConfig.outputPath = config.outputPath;
    if (config.categories) lighthouseConfig.categories = config.categories;
    if (config.emulatedFormFactor) lighthouseConfig.emulatedFormFactor = config.emulatedFormFactor;
    if (config.locale) lighthouseConfig.locale = config.locale;
    if (config.throttling) lighthouseConfig.throttling = config.throttling;

    this.config = { ...this.config, ...lighthouseConfig };

    if (this.service) {
      this.service.updateConfig(lighthouseConfig);
    } else {
      this.service = new LighthouseService(this.config);
      await this.service.initialize();
    }
  }

  /**
   * Hook llamado después de hacer deploy
   */
  async onAfterDeploy(url: string): Promise<void> {
    if (!this.active || !this.service) {
      return;
    }

    // Ejecutar auditoría después de deploy si está configurado
    try {
      console.log(`🔍 Lighthouse Add-on: Ejecutando auditoría en ${url}...`);
      const result = await this.service.audit(url);
      
      // Trackear resultado en Clarity si está disponible
      if (this.context) {
        const clarityService = this.context.hub?.getService?.('clarity', 'trackEvent');
        if (clarityService) {
          clarityService('lighthouse_audit', {
            url,
            performance: result.performance,
            accessibility: result.accessibility,
            seo: result.seo,
            timestamp: result.timestamp
          });
        }
      }
    } catch (error) {
      console.error('❌ Lighthouse Add-on: Error al ejecutar auditoría:', error);
    }
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Ejecutar auditoría
      audit: async (url: string, options?: Partial<LighthouseConfig>) => {
        if (!this.service) {
          throw new Error('Lighthouse service no está inicializado');
        }
        return await this.service.audit(url, options);
      },
      
      // Auditoría múltiple
      auditMultiple: async (urls: string[], options?: Partial<LighthouseConfig>) => {
        if (!this.service) {
          throw new Error('Lighthouse service no está inicializado');
        }
        return await this.service.auditMultiple(urls, options);
      },
      
      // Comparar resultados
      compareResults: (before: LighthouseResult, after: LighthouseResult) => {
        if (!this.service) {
          throw new Error('Lighthouse service no está inicializado');
        }
        return this.service.compareResults(before, after);
      },
      
      // Obtener estado
      getStatus: () => {
        if (!this.service) {
          return {
            initialized: false,
            lighthouseInstalled: false
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
      updateConfig: (config: Partial<LighthouseConfig>) => {
        if (!this.service) {
          throw new Error('Lighthouse service no está inicializado');
        }
        return this.service.updateConfig(config);
      }
    };
  }
}

