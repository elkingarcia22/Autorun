/**
 * Parser Inteligente de Componentes
 *
 * ⭐ OBJETIVO: Separar inteligentemente el nombre del componente base
 * de las variantes y propiedades para buscar correctamente en Storybook.
 *
 * ⭐ MEJORADO: Ahora usa componentes dinámicos desde Storybook (no hardcodeados)
 *
 * Ejemplos:
 * - "button terciario solo icono" → Componente: "Button", Variante: "terciario", Prop: "solo icono"
 * - "input calendar" → Componente: "Input", Tipo: "calendar"
 * - "input select" → Componente: "Input", Tipo: "select"
 * - "button primario" → Componente: "Button", Variante: "primario"
 */

export interface ParsedComponent {
  componentName: string; // Nombre base del componente (Button, Input, etc.)
  variant?: string; // Variante del componente (terciario, primario, secundario, etc.)
  type?: string; // Tipo específico (calendar, select, autocomplete, etc.)
  properties: string[]; // Propiedades adicionales (solo icono, con texto, etc.)
  originalMessage: string; // Mensaje original para referencia
}

/**
 * ⭐ MEJORADO: Variantes ahora se extraen dinámicamente desde Storybook
 * Este objeto se mantiene como fallback temporal hasta que se complete la extracción dinámica
 */
const COMPONENT_VARIANTS_FALLBACK: Record<string, string[]> = {
  Button: [
    'primario',
    'secundario',
    'terciario',
    'primary',
    'secondary',
    'tertiary',
  ],
  Input: [
    'text',
    'email',
    'password',
    'number',
    'calendar',
    'select',
    'autocomplete',
    'search',
    'tel',
    'url',
  ],
  Select: ['single', 'multiple', 'simple', 'multiple'],
  RadioButton: ['default', 'checked', 'disabled'],
  Checkbox: ['default', 'checked', 'indeterminate'],
  Toggle: ['on', 'off', 'checked', 'unchecked'],
  Switch: ['on', 'off', 'checked', 'unchecked'],
};

/**
 * ⭐ MEJORADO: Propiedades ahora se extraen dinámicamente desde Storybook
 * Este objeto se mantiene como fallback temporal hasta que se complete la extracción dinámica
 */
const COMPONENT_PROPERTIES_FALLBACK: Record<string, string[]> = {
  Button: [
    'solo icono',
    'solo icon',
    'icon only',
    'icon-only',
    'con texto',
    'with text',
    'text',
    'loading',
    'cargando',
    'disabled',
    'deshabilitado',
    'full width',
    'ancho completo',
  ],
  Input: [
    'placeholder',
    'etiqueta',
    'label',
    'required',
    'requerido',
    'disabled',
    'deshabilitado',
    'error',
    'errores',
    'helper text',
    'texto de ayuda',
  ],
};

/**
 * Parser inteligente de componentes
 * ⭐ MEJORADO: Usa componentes dinámicos desde Storybook
 */
export class IntelligentComponentParser {
  private static componentCache: Map<
    string,
    Array<{ name: string; patterns: RegExp[] }>
  > | null = null;

  /**
   * Parsear mensaje del usuario para extraer componente, variante y propiedades
   * ⭐ MEJORADO: Ahora es async para usar componentes dinámicos
   */
  static async parse(userMessage: string): Promise<ParsedComponent> {
    const lowerMessage = userMessage.toLowerCase().trim();

    // 1. Detectar componente base (dinámico desde Storybook)
    const componentName = await this.detectComponentBase(lowerMessage);

    if (!componentName) {
      // Si no se detecta componente, retornar mensaje original como componente
      return {
        componentName: userMessage,
        properties: [],
        originalMessage: userMessage,
      };
    }

    // 2. Obtener ID de Storybook para extracción dinámica de variantes
    let componentId: string | undefined;
    try {
      const { StorybookDynamicMapper } = await import(
        './storybookDynamicMapper.js'
      );
      componentId =
        (await StorybookDynamicMapper.componentNameToStorybookId(
          componentName
        )) || undefined;
    } catch (error) {
      // Continuar sin componentId
    }

    // 3. Extraer variante/tipo (ahora con extracción dinámica)
    const variant = await this.extractVariant(
      lowerMessage,
      componentName,
      componentId
    );
    const type = await this.extractType(
      lowerMessage,
      componentName,
      componentId
    );

    // 4. Extraer propiedades (ahora con extracción dinámica)
    const properties = await this.extractProperties(
      lowerMessage,
      componentName,
      componentId
    );

    return {
      componentName,
      variant,
      type,
      properties,
      originalMessage: userMessage,
    };
  }

  /**
   * ⭐ NUEVO: Cargar componentes dinámicamente desde Storybook
   */
  private static async loadDynamicComponents(): Promise<
    Array<{ name: string; patterns: RegExp[] }>
  > {
    // Si hay cache, usar cache
    if (this.componentCache) {
      return this.componentCache;
    }

    try {
      console.log(
        '🔍 [Intelligent Parser] Cargando componentes dinámicamente desde Storybook...'
      );

      // Obtener todos los componentes desde Storybook
      const { StorybookDynamicMapper } = await import(
        './storybookDynamicMapper.js'
      );
      const mappings = await StorybookDynamicMapper.getAllMappings();

      console.log(
        `   ✅ ${mappings.length} componentes encontrados en Storybook`
      );

      // Generar patrones para cada componente
      const componentPatterns: Array<{ name: string; patterns: RegExp[] }> = [];

      for (const mapping of mappings) {
        const patterns: RegExp[] = [];

        // Patrón 1: Nombre corto (ej: "Button")
        patterns.push(
          new RegExp(`\\b${mapping.shortName.toLowerCase()}\\b`, 'i')
        );

        // Patrón 2: PascalCase (ej: "Button")
        patterns.push(new RegExp(`\\b${mapping.pascalCase}\\b`, 'i'));

        // Patrón 3: camelCase (ej: "button")
        patterns.push(new RegExp(`\\b${mapping.camelCase}\\b`, 'i'));

        // Patrón 4: kebab-case (ej: "button")
        patterns.push(
          new RegExp(`\\b${mapping.kebabCase.replace(/-/g, '[-\\s]')}\\b`, 'i')
        );

        // Patrón 5: Nombre completo sin categoría (ej: "Button" de "Básicos/Button")
        const nameWithoutCategory =
          mapping.fullName.split('/').pop() || mapping.shortName;
        patterns.push(
          new RegExp(`\\b${nameWithoutCategory.toLowerCase()}\\b`, 'i')
        );

        // Patrón 6: Traducciones comunes al español
        const spanishPatterns = this.generateSpanishPatterns(mapping.shortName);
        patterns.push(...spanishPatterns);

        componentPatterns.push({
          name: mapping.shortName, // Usar nombre corto como identificador
          patterns,
        });
      }

      // Cachear para próximas consultas
      this.componentCache = componentPatterns;

      console.log(
        `   ✅ ${componentPatterns.length} patrones generados dinámicamente`
      );

      return componentPatterns;
    } catch (error: any) {
      console.warn(
        `⚠️ [Intelligent Parser] Error cargando componentes dinámicos: ${error.message}`
      );
      console.warn(`   ⚠️ Usando componentes hardcodeados como fallback`);

      // Fallback a componentes hardcodeados si falla
      return this.getHardcodedComponents();
    }
  }

  /**
   * ⭐ NUEVO: Generar patrones en español para un componente
   */
  private static generateSpanishPatterns(componentName: string): RegExp[] {
    const patterns: RegExp[] = [];
    const nameLower = componentName.toLowerCase();

    // Traducciones comunes
    const translations: Record<string, string[]> = {
      button: ['botón', 'botones'],
      input: ['entrada', 'campo de texto', 'campo de entrada'],
      select: ['seleccionar', 'desplegable', 'dropdown'],
      radio: ['radio'],
      checkbox: ['casilla', 'casilla de verificación'],
      toggle: ['interruptor'],
      switch: ['interruptor'],
      calendar: ['calendario'],
      list: ['lista'],
      table: ['tabla'],
      card: ['tarjeta'],
      modal: ['modal', 'ventana'],
      dialog: ['diálogo', 'dialogo'],
      alert: ['alerta'],
      toast: ['notificación', 'notificacion'],
      badge: ['etiqueta', 'insignia'],
      avatar: ['avatar', 'foto de perfil'],
      skeleton: ['esqueleto', 'placeholder'],
      spinner: ['cargador', 'loading'],
    };

    // Buscar traducciones para el componente
    for (const [key, values] of Object.entries(translations)) {
      if (nameLower.includes(key)) {
        for (const translation of values) {
          patterns.push(new RegExp(`\\b${translation}\\b`, 'i'));
        }
      }
    }

    return patterns;
  }

  /**
   * ⭐ NUEVO: Componentes hardcodeados como fallback
   */
  private static getHardcodedComponents(): Array<{
    name: string;
    patterns: RegExp[];
  }> {
    return [
      {
        name: 'Button',
        patterns: [
          /\bbutton\b/i,
          /\bbot[oó]n\b(?!\s*radio)/i,
          /\bbotones?\b(?!.*radio)/i,
        ],
      },
      {
        name: 'Input',
        patterns: [
          /\binput\b/i,
          /\bentrada\b/i,
          /\bcampo\s+de\s+texto\b/i,
          /\bcampo\s+de\s+entrada\b/i,
        ],
      },
      {
        name: 'Select',
        patterns: [
          /\bselect\b/i,
          /\bseleccionar\b/i,
          /\bdesplegable\b/i,
          /\bdropdown\b/i,
        ],
      },
    ];
  }

  /**
   * Detectar componente base (Button, Input, etc.)
   * ⭐ MEJORADO: Usa componentes dinámicos desde Storybook
   */
  private static async detectComponentBase(
    message: string
  ): Promise<string | null> {
    console.log(`\n🔍 [Intelligent Parser] detectComponentBase() iniciado`);
    console.log(`   📝 Mensaje: "${message}"`);

    // Cargar componentes dinámicamente desde Storybook
    console.log(`   📦 Cargando componentes dinámicos...`);
    const componentPatterns = await this.loadDynamicComponents();
    console.log(`   ✅ ${componentPatterns.length} componentes cargados`);

    // Buscar componente con mayor prioridad (orden importa)
    console.log(`   🔍 Buscando componente en mensaje...`);
    let matchCount = 0;
    for (const { name, patterns } of componentPatterns) {
      for (const pattern of patterns) {
        if (pattern.test(message)) {
          matchCount++;
          console.log(
            `   ✅ [${matchCount}] Componente detectado dinámicamente: ${name}`
          );
          console.log(`      Patrón que coincidió: ${pattern}`);
          return name;
        }
      }
    }

    console.log(`   ❌ No se detectó ningún componente`);
    console.log(
      `   🔍 Intentando con componentes hardcodeados como fallback...`
    );

    // Fallback: usar componentes hardcodeados
    const hardcodedComponents = this.getHardcodedComponents();
    for (const { name, patterns } of hardcodedComponents) {
      for (const pattern of patterns) {
        if (pattern.test(message)) {
          console.log(`   ✅ Componente detectado (hardcoded): ${name}`);
          return name;
        }
      }
    }

    console.log(`   ❌ No se detectó componente ni con hardcoded`);
    return null;
  }

  /**
   * Extraer variante del componente (terciario, primario, etc.)
   * ⭐ MEJORADO: Ahora usa extracción dinámica desde Storybook
   */
  private static async extractVariant(
    message: string,
    componentName: string,
    componentId?: string
  ): Promise<string | undefined> {
    // ⭐ NUEVO: Intentar extraer variantes dinámicamente desde Storybook
    if (componentId) {
      try {
        const { DynamicVariantExtractor } = await import(
          './dynamicVariantExtractor.js'
        );
        const variantValues = await DynamicVariantExtractor.getVariantValues(
          componentId,
          componentName,
          'variant'
        );

        // Buscar variante en el mensaje usando valores dinámicos
        for (const variant of variantValues) {
          const variantLower = variant.toLowerCase();
          // Buscar variante en el mensaje (con traducciones)
          if (
            message.includes(variantLower) ||
            message.includes(this.translateVariant(variantLower))
          ) {
            console.log(`   ✅ Variante detectada dinámicamente: ${variant}`);
            return variant;
          }
        }
      } catch (error: any) {
        console.warn(
          `⚠️ [Intelligent Parser] Error extrayendo variantes dinámicamente: ${error.message}`
        );
        // Continuar con fallback
      }
    }

    // Fallback: usar variantes hardcodeadas
    const variants = COMPONENT_VARIANTS_FALLBACK[componentName] || [];

    for (const variant of variants) {
      const variantLower = variant.toLowerCase();
      if (message.includes(variantLower)) {
        return variant;
      }
    }

    return undefined;
  }

  /**
   * ⭐ NUEVO: Traducir variante al español
   */
  private static translateVariant(variant: string): string {
    const translations: Record<string, string> = {
      primary: 'primario',
      secondary: 'secundario',
      tertiary: 'terciario',
      default: 'por defecto',
      filled: 'relleno',
      outlined: 'contorno',
      small: 'pequeño',
      medium: 'mediano',
      large: 'grande',
    };

    return translations[variant] || variant;
  }

  /**
   * Extraer tipo del componente (calendar, select, etc.)
   * ⭐ MEJORADO: Ahora usa extracción dinámica desde Storybook
   */
  private static async extractType(
    message: string,
    componentName: string,
    componentId?: string
  ): Promise<string | undefined> {
    // ⭐ NUEVO: Intentar extraer tipos dinámicamente desde Storybook
    if (componentId) {
      try {
        const { DynamicTypeExtractor } = await import(
          './dynamicTypeExtractor.js'
        );
        const typeValues = await DynamicTypeExtractor.getTypeValues(
          componentId,
          componentName,
          'type'
        );

        // Buscar tipo en el mensaje usando valores dinámicos
        for (const type of typeValues) {
          const typeLower = type.toLowerCase();
          // Buscar tipo en el mensaje
          if (message.includes(typeLower)) {
            console.log(`   ✅ Tipo detectado dinámicamente: ${type}`);
            return type;
          }
        }
      } catch (error: any) {
        console.warn(
          `⚠️ [Intelligent Parser] Error extrayendo tipos dinámicamente: ${error.message}`
        );
        // Continuar con fallback
      }
    }

    // Fallback: tipos hardcodeados (especialmente para Input)
    if (componentName === 'Input') {
      const inputTypes = [
        'calendar',
        'select',
        'autocomplete',
        'search',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'text',
      ];

      for (const type of inputTypes) {
        if (message.includes(type)) {
          return type;
        }
      }
    }

    return undefined;
  }

  /**
   * Extraer propiedades del componente (solo icono, con texto, etc.)
   * ⭐ MEJORADO: Ahora usa extracción dinámica desde Storybook
   */
  private static async extractProperties(
    message: string,
    componentName: string,
    componentId?: string
  ): Promise<string[]> {
    const properties: string[] = [];

    // ⭐ NUEVO: Intentar extraer propiedades dinámicamente desde Storybook
    if (componentId) {
      try {
        const { DynamicPropertyExtractor } = await import(
          './dynamicPropertyExtractor.js'
        );

        // ⭐ MEJORADO: Primero extraer todas las propiedades del componente
        const componentProperties =
          await DynamicPropertyExtractor.extractProperties(
            componentId,
            componentName
          );

        // Buscar propiedades en el mensaje
        const lowerMessage = message.toLowerCase();
        const foundProperties: string[] = [];

        for (const prop of componentProperties.properties) {
          // Buscar por nombre de prop
          if (lowerMessage.includes(prop.propName.toLowerCase())) {
            foundProperties.push(prop.propName);
            continue;
          }

          // Buscar por alias
          for (const alias of prop.aliases) {
            if (lowerMessage.includes(alias.toLowerCase())) {
              foundProperties.push(prop.propName);
              break;
            }
          }
        }

        // Agregar nombres de propiedades encontradas
        for (const propName of foundProperties) {
          // Buscar la propiedad completa para obtener sus alias
          const prop = componentProperties.properties.find(
            (p) => p.propName === propName
          );
          if (prop) {
            // Usar el primer alias que coincida con el mensaje
            for (const alias of prop.aliases) {
              if (lowerMessage.includes(alias.toLowerCase())) {
                properties.push(alias);
                console.log(
                  `   ✅ Propiedad detectada dinámicamente: ${prop.propName} (alias: ${alias})`
                );
                break;
              }
            }
          } else {
            // Si no encontramos la propiedad, usar el nombre directamente
            properties.push(propName);
            console.log(`   ✅ Propiedad detectada dinámicamente: ${propName}`);
          }
        }
      } catch (error: any) {
        console.warn(
          `⚠️ [Intelligent Parser] Error extrayendo propiedades dinámicamente: ${error.message}`
        );
        // Continuar con fallback
      }
    }

    // Fallback: usar propiedades hardcodeadas
    const knownProperties = COMPONENT_PROPERTIES_FALLBACK[componentName] || [];

    for (const prop of knownProperties) {
      const propLower = prop.toLowerCase();
      if (message.includes(propLower) && !properties.includes(prop)) {
        properties.push(prop);
      }
    }

    // Propiedades genéricas que pueden aplicarse a cualquier componente
    const genericProperties = [
      { pattern: /\bsolo\s+icono\b/i, name: 'solo icono' },
      { pattern: /\bsolo\s+icon\b/i, name: 'solo icono' },
      { pattern: /\bicon\s+only\b/i, name: 'solo icono' },
      { pattern: /\bicon-only\b/i, name: 'solo icono' },
      { pattern: /\bcon\s+texto\b/i, name: 'con texto' },
      { pattern: /\bwith\s+text\b/i, name: 'con texto' },
      { pattern: /\bdisabled\b/i, name: 'disabled' },
      { pattern: /\bdeshabilitado\b/i, name: 'disabled' },
      { pattern: /\bloading\b/i, name: 'loading' },
      { pattern: /\bcargando\b/i, name: 'loading' },
    ];

    for (const { pattern, name } of genericProperties) {
      if (pattern.test(message) && !properties.includes(name)) {
        properties.push(name);
      }
    }

    return properties;
  }

  /**
   * Construir búsqueda inteligente para Storybook
   *
   * Retorna el componente base para buscar en Storybook,
   * y las variantes/propiedades para filtrar después
   * ⭐ MEJORADO: Usa mapeo dinámico desde Storybook
   */
  static async buildStorybookSearch(parsed: ParsedComponent): Promise<{
    componentId: string; // ID del componente base para buscar en Storybook
    filters: {
      variant?: string;
      type?: string;
      properties: string[];
    };
  }> {
    // Normalizar nombre del componente a ID de Storybook (dinámico)
    const componentId = await this.normalizeToStorybookId(parsed.componentName);

    return {
      componentId,
      filters: {
        variant: parsed.variant,
        type: parsed.type,
        properties: parsed.properties,
      },
    };
  }

  /**
   * Normalizar nombre del componente a ID de Storybook
   * ⭐ MEJORADO: Usa mapeo dinámico desde Storybook
   */
  private static async normalizeToStorybookId(
    componentName: string
  ): Promise<string> {
    try {
      // Intentar usar mapeo dinámico desde Storybook
      const { StorybookDynamicMapper } = await import(
        './storybookDynamicMapper.js'
      );
      const componentId =
        await StorybookDynamicMapper.componentNameToStorybookId(componentName);

      if (componentId) {
        console.log(
          `   ✅ ID de Storybook obtenido dinámicamente: ${componentName} → ${componentId}`
        );
        return componentId;
      }
    } catch (error: any) {
      console.warn(
        `⚠️ [Intelligent Parser] Error obteniendo ID dinámico: ${error.message}`
      );
    }

    // Fallback: normalizar manualmente
    console.warn(`   ⚠️ Usando fallback para normalizar: ${componentName}`);
    return componentName.toLowerCase().replace(/\s+/g, '-');
  }

  /**
   * Invalidar cache de componentes (forzar recarga desde Storybook)
   */
  static invalidateCache(): void {
    this.componentCache = null;
    console.log('🔄 [Intelligent Parser] Cache de componentes invalidado');
  }
}
