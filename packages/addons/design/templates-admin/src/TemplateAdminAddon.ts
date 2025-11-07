/**
 * TemplateAdminAddon
 * 
 * Add-on de diseño que proporciona el template de administrador
 */

import { IDesignAddon } from '../../../../autoframe-core/dist/interfaces/IDesignAddon';
import type { AutoframeContext } from '../../../../autoframe-core/dist/interfaces/IAddon';
import { TemplateAdminService, TemplateAdminConfig } from './TemplateAdminService';

export class TemplateAdminAddon implements IDesignAddon {
  readonly id = 'templates-admin';
  readonly name = 'Template Administrador';
  readonly version = '1.0.0';
  readonly type = 'design';
  readonly description = 'Template de diseño para perfil administrador';
  
  private service?: TemplateAdminService;
  private active = false;
  private config: TemplateAdminConfig = {};
  private context?: AutoframeContext;

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.['templates-admin'] || {};
    this.config = {
      enabled: addonConfig.enabled !== false,
      templatePath: addonConfig.templatePath
    };

    // Inicializar servicio
    if (this.config.enabled) {
      await this.setupService();
    }
  }

  private async setupService(): Promise<void> {
    this.service = new TemplateAdminService(this.config);
    
    try {
      await this.service.initialize();
      console.log('✅ Template Admin Add-on: Inicializado');
    } catch (error) {
      console.warn(`⚠️  Template Admin Add-on: ${error}`);
    }
  }

  async activate(): Promise<void> {
    if (!this.service && this.config.enabled) {
      await this.setupService();
    }

    this.active = true;
    console.log('✅ Template Admin Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    this.service?.stop();
    console.log('🔌 Template Admin Add-on: Desactivado');
  }

  isActive(): boolean {
    return this.active;
  }

  getStatus(): 'active' | 'inactive' {
    return this.active ? 'active' : 'inactive';
  }

  destroy(): void {
    this.service?.stop();
    this.active = false;
  }

  async configure(config: Record<string, any>): Promise<void> {
    this.config = { ...this.config, ...config };
    
    if (config.enabled !== undefined && config.enabled !== this.config.enabled) {
      this.service?.stop();
      if (config.enabled) {
        await this.setupService();
      }
    }
  }

  /**
   * Obtiene los tokens/recursos de diseño
   */
  getDesignTokens(): Record<string, any> {
    return {
      template: {
        type: 'admin',
        path: this.service?.getTemplatePath() || 'template-admin.html',
        available: true
      }
    };
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Obtener ruta del template
      getTemplatePath: () => {
        if (!this.service) {
          throw new Error('Template Admin service no está inicializado');
        }
        return this.service.getTemplatePath();
      },
      
      // Obtener HTML del template
      getTemplateHTML: async () => {
        if (!this.service) {
          throw new Error('Template Admin service no está inicializado');
        }
        return await this.service.getTemplateHTML();
      },
      
      // Obtener estado
      getStatus: () => {
        if (!this.service) {
          throw new Error('Template Admin service no está inicializado');
        }
        return this.service.getStatus();
      }
    };
  }
}

