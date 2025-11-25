/**
 * I18nAddon
 * 
 * Add-on funcional de i18n que implementa IFunctionalAddon.
 * Proporciona internacionalización y localización para la aplicación.
 */

import { IFunctionalAddon, AutoframeContext } from '@autoframe/core';
import { I18nService, I18nConfig, TranslationData } from './I18nService';

export class I18nAddon implements IFunctionalAddon {
  readonly id = 'i18n';
  readonly name = 'Internationalization';
  readonly version = '1.0.0';
  readonly type = 'functional';
  readonly description = 'Internacionalización y localización para múltiples idiomas';
  
  private service?: I18nService;
  private active = false;
  private config: I18nConfig = {
    defaultLocale: 'es',
    supportedLocales: ['es', 'en'],
    fallbackLocale: 'es',
    translationsPath: 'locales',
    detectLocale: true,
    storageKey: 'i18n-locale'
  };
  private context?: AutoframeContext;

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.i18n || {};
    this.config = {
      defaultLocale: addonConfig.defaultLocale || 'es',
      supportedLocales: addonConfig.supportedLocales || ['es', 'en'],
      fallbackLocale: addonConfig.fallbackLocale || 'es',
      translationsPath: addonConfig.translationsPath || 'locales',
      detectLocale: addonConfig.detectLocale !== false,
      storageKey: addonConfig.storageKey || 'i18n-locale'
    };

    // Inicializar servicio
    this.service = new I18nService(this.config);
    
    try {
      await this.service.initialize();
      console.log('✅ I18n Add-on: Inicializado correctamente');
    } catch (error) {
      console.error(`❌ I18n Add-on: Error al inicializar - ${error}`);
      // No lanzar error, permitir que el add-on funcione sin inicialización completa
    }
  }

  async activate(): Promise<void> {
    if (!this.service) {
      this.service = new I18nService(this.config);
      await this.service.initialize();
    }

    this.active = true;
    console.log('✅ I18n Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    console.log('🔌 I18n Add-on: Desactivado');
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
    const i18nConfig: Partial<I18nConfig> = {};
    
    if (config.defaultLocale) i18nConfig.defaultLocale = config.defaultLocale;
    if (config.supportedLocales) i18nConfig.supportedLocales = config.supportedLocales;
    if (config.fallbackLocale) i18nConfig.fallbackLocale = config.fallbackLocale;
    if (config.translationsPath) i18nConfig.translationsPath = config.translationsPath;
    if (config.detectLocale !== undefined) i18nConfig.detectLocale = config.detectLocale;
    if (config.storageKey) i18nConfig.storageKey = config.storageKey;

    this.config = { ...this.config, ...i18nConfig };

    if (this.service) {
      this.service.updateConfig(i18nConfig);
    } else {
      this.service = new I18nService(this.config);
      await this.service.initialize();
    }
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Traducir una clave
      t: (key: string, params?: Record<string, any>) => {
        if (!this.service) {
          throw new Error('I18n service no está inicializado');
        }
        return this.service.t(key, params);
      },
      
      // Cambiar locale
      changeLocale: async (locale: string) => {
        if (!this.service) {
          throw new Error('I18n service no está inicializado');
        }
        return await this.service.changeLocale(locale);
      },
      
      // Obtener locale actual
      getCurrentLocale: () => {
        if (!this.service) {
          return this.config.defaultLocale || 'es';
        }
        return this.service.getCurrentLocale();
      },
      
      // Obtener locales soportados
      getSupportedLocales: () => {
        if (!this.service) {
          return this.config.supportedLocales || [];
        }
        return this.service.getSupportedLocales();
      },
      
      // Agregar traducciones
      addTranslations: (locale: string, translations: TranslationData) => {
        if (!this.service) {
          throw new Error('I18n service no está inicializado');
        }
        return this.service.addTranslations(locale, translations);
      },
      
      // Formatear fecha
      formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => {
        if (!this.service) {
          throw new Error('I18n service no está inicializado');
        }
        return this.service.formatDate(date, options);
      },
      
      // Formatear número
      formatNumber: (number: number, options?: Intl.NumberFormatOptions) => {
        if (!this.service) {
          throw new Error('I18n service no está inicializado');
        }
        return this.service.formatNumber(number, options);
      },
      
      // Formatear moneda
      formatCurrency: (amount: number, currency?: string) => {
        if (!this.service) {
          throw new Error('I18n service no está inicializado');
        }
        return this.service.formatCurrency(amount, currency);
      },
      
      // Pluralizar
      plural: (key: string, count: number, params?: Record<string, any>) => {
        if (!this.service) {
          throw new Error('I18n service no está inicializado');
        }
        return this.service.plural(key, count, params);
      },
      
      // Obtener estado
      getStatus: () => {
        if (!this.service) {
          return {
            initialized: false,
            currentLocale: this.config.defaultLocale || 'es',
            supportedLocales: this.config.supportedLocales || [],
            translationsLoaded: []
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
      updateConfig: (config: Partial<I18nConfig>) => {
        if (!this.service) {
          throw new Error('I18n service no está inicializado');
        }
        return this.service.updateConfig(config);
      }
    };
  }
}

