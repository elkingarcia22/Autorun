/**
 * AIAddon
 * 
 * Add-on funcional de AI que implementa IFunctionalAddon.
 * Proporciona asistencia de IA con Ollama o Gemini.
 */

import { IFunctionalAddon, AutoframeContext } from '@autoframe/core';
import { AIService, AIConfig, AICompletion, AICodeAnalysis } from './AIService';

export class AIAddon implements IFunctionalAddon {
  readonly id = 'ai';
  readonly name = 'AI Assistant';
  readonly version = '1.0.0';
  readonly type = 'functional';
  readonly description = 'Asistente de IA con Ollama o Gemini para generación y análisis de código';
  
  private service?: AIService;
  private active = false;
  private config: AIConfig = {
    provider: 'ollama',
    ollama: {
      baseUrl: 'http://localhost:11434',
      model: 'llama2'
    },
    gemini: {
      model: 'gemini-pro'
    },
    autoSuggest: false,
    maxTokens: 1000,
    temperature: 0.7
  };
  private context?: AutoframeContext;

  async initialize(context: AutoframeContext): Promise<void> {
    this.context = context;
    
    // Obtener configuración
    const addonConfig = context.config.autoframe?.addons?.config?.ai || {};
    this.config = {
      provider: addonConfig.provider || 'ollama',
      ollama: {
        baseUrl: addonConfig.ollama?.baseUrl || process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
        model: addonConfig.ollama?.model || process.env.OLLAMA_MODEL || 'llama2'
      },
      gemini: {
        apiKey: addonConfig.gemini?.apiKey || process.env.GEMINI_API_KEY,
        model: addonConfig.gemini?.model || 'gemini-pro'
      },
      autoSuggest: addonConfig.autoSuggest || false,
      maxTokens: addonConfig.maxTokens || 1000,
      temperature: addonConfig.temperature || 0.7
    };

    // Inicializar servicio
    this.service = new AIService(this.config);
    
    try {
      await this.service.initialize();
      console.log('✅ AI Add-on: Inicializado correctamente');
    } catch (error) {
      console.error(`❌ AI Add-on: Error al inicializar - ${error}`);
      // No lanzar error, permitir que el add-on funcione sin inicialización completa
    }
  }

  async activate(): Promise<void> {
    if (!this.service) {
      this.service = new AIService(this.config);
      await this.service.initialize();
    }

    this.active = true;
    console.log('✅ AI Add-on: Activado');
  }

  async deactivate(): Promise<void> {
    this.active = false;
    console.log('🔌 AI Add-on: Desactivado');
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
    const aiConfig: Partial<AIConfig> = {};
    
    if (config.provider) aiConfig.provider = config.provider;
    if (config.ollama) aiConfig.ollama = config.ollama;
    if (config.gemini) aiConfig.gemini = config.gemini;
    if (config.autoSuggest !== undefined) aiConfig.autoSuggest = config.autoSuggest;
    if (config.maxTokens !== undefined) aiConfig.maxTokens = config.maxTokens;
    if (config.temperature !== undefined) aiConfig.temperature = config.temperature;

    this.config = { ...this.config, ...aiConfig };

    if (this.service) {
      this.service.updateConfig(aiConfig);
    } else {
      this.service = new AIService(this.config);
      await this.service.initialize();
    }
  }

  /**
   * Hook llamado cuando un archivo cambia
   */
  async onFileChange(filePath: string, content?: string): Promise<void> {
    if (!this.active || !this.service || !this.config.autoSuggest) {
      return;
    }

    // Si auto-suggest está habilitado, analizar código automáticamente
    if (content && (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.js'))) {
      try {
        const analysis = await this.service.analyzeCode(content);
        if (analysis.suggestions.length > 0) {
          console.log(`💡 AI: ${analysis.suggestions.length} sugerencias para ${filePath}`);
        }
      } catch (error) {
        // Ignorar errores en auto-suggest
      }
    }
  }

  /**
   * Obtiene los servicios que este add-on proporciona
   */
  getServices() {
    return {
      // Completar texto
      complete: async (prompt: string, options?: {
        maxTokens?: number;
        temperature?: number;
        stop?: string[];
      }) => {
        if (!this.service) {
          throw new Error('AI service no está inicializado');
        }
        return await this.service.complete(prompt, options);
      },
      
      // Analizar código
      analyzeCode: async (code: string, language?: string) => {
        if (!this.service) {
          throw new Error('AI service no está inicializado');
        }
        return await this.service.analyzeCode(code, language);
      },
      
      // Generar código
      generateCode: async (description: string, language?: string) => {
        if (!this.service) {
          throw new Error('AI service no está inicializado');
        }
        return await this.service.generateCode(description, language);
      },
      
      // Refactorizar código
      refactorCode: async (code: string, instructions: string, language?: string) => {
        if (!this.service) {
          throw new Error('AI service no está inicializado');
        }
        return await this.service.refactorCode(code, instructions, language);
      },
      
      // Generar documentación
      generateDocumentation: async (code: string, language?: string) => {
        if (!this.service) {
          throw new Error('AI service no está inicializado');
        }
        return await this.service.generateDocumentation(code, language);
      },
      
      // Obtener estado
      getStatus: () => {
        if (!this.service) {
          return {
            initialized: false,
            provider: 'none',
            available: false
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
      updateConfig: (config: Partial<AIConfig>) => {
        if (!this.service) {
          throw new Error('AI service no está inicializado');
        }
        return this.service.updateConfig(config);
      }
    };
  }
}

