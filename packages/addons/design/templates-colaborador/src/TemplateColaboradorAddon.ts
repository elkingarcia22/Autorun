/**
 * TemplateColaboradorAddon
 * 
 * Add-on de diseño que proporciona el template de colaborador
 */

import { IDesignAddon } from '../../../../autoframe-core/dist/interfaces/IDesignAddon';
import type { AutoframeContext } from '../../../../autoframe-core/dist/interfaces/IAddon';
import { TemplateColaboradorService, TemplateColaboradorConfig } from './TemplateColaboradorService';

export class TemplateColaboradorAddon implements IDesignAddon {
  readonly id = 'templates-colaborador';
  readonly name = 'Template Colaborador';
  readonly version = '1.0.0';
  readonly type = 'design';
  readonly description = 'Template de diseño para perfil colaborador';
  
  private service?: TemplateColaboradorService;
  private active = false;
  private config: TemplateColaboradorConfig = {};
  private context?: AutoframeContext;

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.['templates-colaborador'] || {};
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
    this.service = new TemplateColaboradorService(this.config);
    
    try {
      await this.service.initialize();
      console.log('✅ Template Colaborador Add-on: Inicializado');
    } catch (error) {
      console.warn(`⚠️  Template Colaborador Add-on: ${error}`);
    }
  }

  async activate(): Promise<void> {
    if (!this.service && this.config.enabled) {
      await this.setupService();
    }

    this.active = true;
    console.log('✅ Template Colaborador Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    this.service?.stop();
    console.log('🔌 Template Colaborador Add-on: Desactivado');
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
        type: 'colaborador',
        path: this.service?.getTemplatePath() || 'template-colaborador.html',
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
          throw new Error('Template Colaborador service no está inicializado');
        }
        return this.service.getTemplatePath();
      },
      
      // Obtener HTML del template
      getTemplateHTML: async () => {
        if (!this.service) {
          throw new Error('Template Colaborador service no está inicializado');
        }
        return await this.service.getTemplateHTML();
      },
      
      // Obtener estado
      getStatus: () => {
        if (!this.service) {
          throw new Error('Template Colaborador service no está inicializado');
        }
        return this.service.getStatus();
      }
    };
  }
}

