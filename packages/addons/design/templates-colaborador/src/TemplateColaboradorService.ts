/**
 * TemplateColaboradorService
 * 
 * Servicio que maneja el template de colaborador
 */

export interface TemplateColaboradorConfig {
  enabled?: boolean;
  templatePath?: string;
}

export class TemplateColaboradorService {
  private config: TemplateColaboradorConfig;
  private initialized = false;

  constructor(config: TemplateColaboradorConfig) {
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
    console.log('✅ Template Colaborador Service: Inicializado');
  }

  /**
   * Obtiene la ruta del template
   */
  getTemplatePath(): string {
    return this.config.templatePath || 'template-colaborador.html';
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

