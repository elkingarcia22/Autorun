/**
 * Generador dinámico de patrones de detección desde nombres de componentes
 * 
 * ⭐ OBJETIVO: Eliminar TODO el hardcodeo de patrones
 * Todo se genera dinámicamente desde nombres de componentes de Storybook
 */

import { StorybookDynamicMapper, ComponentMapping } from './storybookDynamicMapper';

export interface ComponentPattern {
  componentName: string;
  fullName: string;
  patterns: RegExp[];
  priority: number; // Mayor número = mayor prioridad (RadioButton antes que Button)
  lastUpdate?: number; // Para cache
}

/**
 * Generador dinámico de patrones de detección
 */
export class DynamicPatternGenerator {
  private static cache: ComponentPattern[] | null = null;
  private static cacheTimestamp: number = 0;
  private static readonly CACHE_DURATION = 3600000; // 1 hora

  /**
   * Generar todos los patrones desde componentes de Storybook
   */
  static async generateAllPatterns(): Promise<ComponentPattern[]> {
    // Si hay cache válido, usar cache
    if (
      this.cache &&
      Date.now() - this.cacheTimestamp < this.CACHE_DURATION
    ) {
      return this.cache;
    }

    console.log(
      '📚 [Dynamic Pattern Generator] Generando patrones desde Storybook...'
    );

    // Obtener todos los mapeos de componentes
    const mappings = await StorybookDynamicMapper.getAllMappings();

    // Generar patrones para cada componente
    const patterns: ComponentPattern[] = [];

    for (const mapping of mappings) {
      const componentPatterns = this.generatePatternsForComponent(mapping);
      patterns.push(componentPatterns);
    }

    // Ordenar por prioridad (componentes más específicos primero)
    patterns.sort((a, b) => b.priority - a.priority);

    console.log(
      `✅ [Dynamic Pattern Generator] ${patterns.length} patrones generados`
    );

    // Actualizar cache
    this.cache = patterns;
    this.cacheTimestamp = Date.now();

    return patterns;
  }

  /**
   * Generar patrones para un componente específico
   */
  private static generatePatternsForComponent(
    mapping: ComponentMapping
  ): ComponentPattern {
    const patterns: RegExp[] = [];

    // Patrón 1: Nombre completo (ej: "Formularios/Radio Button")
    patterns.push(
      new RegExp(`\\b${this.escapeRegex(mapping.fullName)}\\b`, 'i')
    );

    // Patrón 2: Nombre corto con espacios (ej: "Radio Button")
    if (mapping.shortName.includes(' ')) {
      const words = mapping.shortName.split(' ');
      // Patrón exacto con espacios
      patterns.push(
        new RegExp(`\\b${words.map(this.escapeRegex).join('\\s+')}\\b`, 'i')
      );
      // Patrón flexible con espacios opcionales
      patterns.push(
        new RegExp(`\\b${words.map(this.escapeRegex).join('\\s*')}\\b`, 'i')
      );
      // Variación en español
      patterns.push(
        new RegExp(
          `\\b${words[0]}\\s*${this.translateToSpanish(words[1])}\\b`,
          'i'
        )
      );
    }

    // Patrón 3: PascalCase (ej: "RadioButton")
    patterns.push(new RegExp(`\\b${mapping.pascalCase}\\b`, 'i'));

    // Patrón 4: camelCase (ej: "radioButton")
    patterns.push(new RegExp(`\\b${mapping.camelCase}\\b`, 'i'));

    // Patrón 5: kebab-case (ej: "radio-button")
    patterns.push(new RegExp(`\\b${mapping.kebabCase}\\b`, 'i'));

    // Patrón 6: Con palabras clave de acción
    const actionKeywords = [
      'implementar',
      'crear',
      'agregar',
      'poner',
      'hacer',
      'añadir',
      'insertar',
    ];
    for (const keyword of actionKeywords) {
      // Con nombre corto
      patterns.push(
        new RegExp(
          `(?:${keyword}).*${this.escapeRegex(mapping.shortName)}`,
          'i'
        )
      );
      // Con PascalCase
      patterns.push(
        new RegExp(`(?:${keyword}).*${mapping.pascalCase}`, 'i')
      );
      // Con kebab-case
      patterns.push(
        new RegExp(`(?:${keyword}).*${mapping.kebabCase}`, 'i')
      );
    }

    // Calcular prioridad (componentes más específicos tienen mayor prioridad)
    const priority = this.calculatePriority(mapping);

    return {
      componentName: mapping.pascalCase,
      fullName: mapping.fullName,
      patterns,
      priority,
    };
  }

  /**
   * Calcular prioridad de un componente
   * Componentes más específicos tienen mayor prioridad
   */
  private static calculatePriority(mapping: ComponentMapping): number {
    let priority = 0;

    // Componentes con múltiples palabras tienen mayor prioridad
    if (mapping.shortName.includes(' ')) {
      priority += 10;
    }

    // Componentes específicos tienen mayor prioridad
    const specificComponents = [
      'RadioButton',
      'ButtonAI',
      'ButtonFeedback',
      'DataTable',
      'FileUpload',
      'SearchButton',
    ];
    if (specificComponents.includes(mapping.pascalCase)) {
      priority += 20;
    }

    // Componentes genéricos tienen menor prioridad
    const genericComponents = ['Button', 'Input', 'Select', 'Card'];
    if (genericComponents.includes(mapping.pascalCase)) {
      priority -= 10;
    }

    return priority;
  }

  /**
   * Escapar caracteres especiales de regex
   */
  private static escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Traducir palabras comunes al español
   */
  private static translateToSpanish(word: string): string {
    const translations: Record<string, string> = {
      Button: 'bot[oó]n',
      Input: 'entrada',
      Select: 'selecci[oó]n',
      Checkbox: 'casilla|checkbox',
      Radio: 'radio',
      Modal: 'modal|ventana',
      Alert: 'alerta',
      Toast: 'notificaci[oó]n|toast',
      Tooltip: 'tooltip|informaci[oó]n',
      Table: 'tabla',
      Card: 'tarjeta',
      Menu: 'men[úu]',
      Sidebar: 'barra lateral|sidebar',
      Tabs: 'pesta[ñn]as|tabs',
    };

    return translations[word] || word;
  }

  /**
   * Detectar componente desde mensaje usando patrones dinámicos
   */
  static async detectComponentFromMessage(
    message: string
  ): Promise<string | null> {
    const patterns = await this.generateAllPatterns();
    const lowerMessage = message.toLowerCase();

    // Buscar coincidencias, priorizando componentes con mayor prioridad
    for (const componentPattern of patterns) {
      for (const pattern of componentPattern.patterns) {
        if (pattern.test(message)) {
          console.log(
            `✅ [Dynamic Pattern Generator] Componente detectado: ${componentPattern.fullName} (prioridad: ${componentPattern.priority})`
          );
          return componentPattern.componentName;
        }
      }
    }

    return null;
  }

  /**
   * Invalidar cache (forzar actualización)
   */
  static invalidateCache(): void {
    this.cache = null;
    console.log('🔄 [Dynamic Pattern Generator] Cache invalidado');
  }
}

