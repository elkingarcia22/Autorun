/**
 * TemplateAdminService
 * 
 * Servicio que maneja el template de administrador
 */

export interface TemplateAdminConfig {
  enabled?: boolean;
  templatePath?: string;
}

export class TemplateAdminService {
  private config: TemplateAdminConfig;
  private initialized = false;

  constructor(config: TemplateAdminConfig) {
    this.config = {
      enabled: true,
      ...config
    };
  }

  /**
   * Inicializa el servicio
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    console.log('✅ Template Admin Service: Inicializado');
  }

  /**
   * Obtiene la ruta del template
   */
  getTemplatePath(): string {
    return this.config.templatePath || 'template-admin.html';
  }

  /**
   * Obtiene el HTML del template (si está disponible)
   */
  async getTemplateHTML(): Promise<string | null> {
    // En una implementación real, esto cargaría el HTML del template
    // Por ahora retornamos null ya que el HTML está en un archivo separado
    return null;
  }

  /**
   * Obtiene el estado del servicio
   */
  getStatus(): 'initialized' | 'not-initialized' {
    return this.initialized ? 'initialized' : 'not-initialized';
  }

  /**
   * Detiene el servicio
   */
  stop(): void {
    this.initialized = false;
  }
}

