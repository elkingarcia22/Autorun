/**
 * CSS Class Validator
 *
 * Valida que las clases CSS usadas en el HTML existan en el CSS del componente.
 * Sugiere clases correctas si se encuentran incorrectas.
 */

export interface CSSValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  missingClasses: string[];
  validClasses: string[];
}

export interface ClassSuggestion {
  incorrect: string;
  correct: string;
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Extrae todas las clases CSS del HTML
 */
export function extractCSSClasses(html: string): string[] {
  const classes = new Set<string>();

  // Buscar todas las clases en atributos class="..."
  const classRegex = /class="([^"]+)"/g;
  const matches = Array.from(html.matchAll(classRegex));

  matches.forEach((match) => {
    const classList = match[1].split(/\s+/).filter(Boolean);
    classList.forEach((cls) => classes.add(cls));
  });

  return Array.from(classes);
}

/**
 * Obtiene el prefijo de clase esperado para un componente
 */
export function getComponentClassPrefix(componentId: string): string {
  // Normalizar componentId para obtener prefijo
  // Ej: "⚙️-functional-drawer" → "ubits-drawer"
  // Ej: "🧩-ux-button" → "ubits-button"
  // Ej: "🧩-ux-radio" → "ubits-radio-button"

  const normalized = componentId
    .replace(/^[🧩⚙️]/g, '') // Remover emojis
    .replace(/^functional-/, '')
    .replace(/^ux-/, '')
    .toLowerCase();

  // Mapeo especial para componentes conocidos
  const specialMappings: Record<string, string> = {
    radio: 'ubits-radio-button',
    'radio-button': 'ubits-radio-button',
    drawer: 'ubits-drawer',
    button: 'ubits-button',
    input: 'ubits-input',
    modal: 'ubits-modal',
    select: 'ubits-select',
    checkbox: 'ubits-checkbox',
  };

  if (specialMappings[normalized]) {
    return specialMappings[normalized];
  }

  return `ubits-${normalized}`;
}

/**
 * Obtiene el contenido CSS del componente
 */
export async function getComponentCSS(componentId: string): Promise<string> {
  try {
    const { StorybookManager } = await import('./storybookManager');
    const manager = StorybookManager.getInstance();
    const activeConfig = await manager.getActiveConfig();

    if (!activeConfig) {
      throw new Error('❌ No hay Storybook activo configurado');
    }

    // Construir URL del CSS del componente
    const baseUrl = activeConfig.url;
    const normalizedId = componentId
      .replace(/^[🧩⚙️]/g, '')
      .replace(/^functional-/, '')
      .replace(/^ux-/, '')
      .toLowerCase();

    // Intentar diferentes rutas posibles
    const possiblePaths = [
      `${baseUrl}/components/${normalizedId}/src/styles/${normalizedId}.css`,
      `${baseUrl}/components/${normalizedId}/dist/${normalizedId}.css`,
      // ⚠️ TEMPORALMENTE DESHABILITADO: Solo usando UBITS Storybook
      // Para Libraries UI, puede estar en otra estructura
      `${baseUrl}/assets/${normalizedId}.css`,
    ];

    // Intentar obtener CSS desde cada ruta
    for (const cssUrl of possiblePaths) {
      try {
        const response = await fetch(cssUrl);
        if (response.ok) {
          const css = await response.text();
          console.log(`✅ [CSS Validator] CSS encontrado en: ${cssUrl}`);
          return css;
        }
      } catch (error) {
        // Continuar con siguiente ruta
      }
    }

    // Si no se encuentra, intentar desde UBITS (fallback solo para lectura)
    const ubitsPaths = [
      `https://ubits-storybook10.vercel.app/components/${normalizedId}/src/styles/${normalizedId}.css`,
      `https://ubits-storybook10.vercel.app/components/${normalizedId}/dist/${normalizedId}.css`,
    ];

    for (const cssUrl of ubitsPaths) {
      try {
        const response = await fetch(cssUrl);
        if (response.ok) {
          const css = await response.text();
          console.log(
            `⚠️ [CSS Validator] CSS encontrado en UBITS (fallback): ${cssUrl}`
          );
          return css;
        }
      } catch (error) {
        // Continuar
      }
    }

    throw new Error(`No se pudo obtener CSS para ${componentId}`);
  } catch (error: any) {
    throw new Error(`Error obteniendo CSS: ${error.message}`);
  }
}

/**
 * Valida que las clases CSS usadas existan en el CSS del componente
 */
export async function validateCSSClasses(
  html: string,
  componentId: string
): Promise<CSSValidationResult> {
  console.log(`🔍 [CSS Validator] Validando clases CSS para: ${componentId}`);

  // 1. Extraer todas las clases del HTML
  const allClasses = extractCSSClasses(html);
  console.log(`   📋 Clases encontradas: ${allClasses.length}`);

  // 2. Obtener prefijo del componente
  const componentPrefix = getComponentClassPrefix(componentId);
  console.log(`   🎯 Prefijo del componente: ${componentPrefix}`);

  // 3. Filtrar solo clases del componente
  const componentClasses = allClasses.filter(
    (cls) => cls.startsWith(componentPrefix) || cls.startsWith('ubits-') // También validar clases UBITS generales
  );

  if (componentClasses.length === 0) {
    console.warn(`   ⚠️ No se encontraron clases del componente en el HTML`);
    return {
      valid: true, // No hay clases del componente, no se puede validar
      errors: [],
      warnings: ['No se encontraron clases del componente para validar'],
      suggestions: [],
      missingClasses: [],
      validClasses: [],
    };
  }

  // 4. Obtener CSS del componente
  let componentCSS: string;
  try {
    componentCSS = await getComponentCSS(componentId);
  } catch (error: any) {
    console.warn(`   ⚠️ No se pudo obtener CSS: ${error.message}`);
    return {
      valid: false,
      errors: [`No se pudo obtener CSS del componente: ${error.message}`],
      warnings: ['No se puede validar clases sin CSS del componente'],
      suggestions: [],
      missingClasses: componentClasses,
      validClasses: [],
    };
  }

  // 5. Validar cada clase
  const missingClasses: string[] = [];
  const validClasses: string[] = [];

  componentClasses.forEach((cls) => {
    // Buscar la clase en el CSS (con punto para selector CSS)
    const cssSelector = `.${cls}`;
    if (componentCSS.includes(cssSelector) || componentCSS.includes(cls)) {
      validClasses.push(cls);
    } else {
      missingClasses.push(cls);
    }
  });

  // 6. Generar sugerencias para clases incorrectas
  const suggestions = await suggestCorrectClasses(
    missingClasses,
    componentId,
    componentCSS
  );

  const result: CSSValidationResult = {
    valid: missingClasses.length === 0,
    errors:
      missingClasses.length > 0
        ? [`Clases CSS no encontradas: ${missingClasses.join(', ')}`]
        : [],
    warnings:
      suggestions.length > 0
        ? [
            `Se encontraron ${suggestions.length} clase(s) incorrecta(s) con sugerencias`,
          ]
        : [],
    suggestions: suggestions.map(
      (s) => `${s.incorrect} → ${s.correct} (${s.confidence})`
    ),
    missingClasses,
    validClasses,
  };

  if (result.valid) {
    console.log(`✅ [CSS Validator] Todas las clases CSS son válidas`);
  } else {
    console.error(
      `❌ [CSS Validator] ${missingClasses.length} clase(s) no encontrada(s)`
    );
    if (suggestions.length > 0) {
      console.log(
        `   💡 Sugerencias: ${suggestions.map((s) => `${s.incorrect} → ${s.correct}`).join(', ')}`
      );
    }
  }

  return result;
}

/**
 * Sugiere clases correctas basándose en el CSS disponible y mapeos conocidos
 */
async function suggestCorrectClasses(
  incorrectClasses: string[],
  componentId: string,
  componentCSS: string
): Promise<ClassSuggestion[]> {
  const suggestions: ClassSuggestion[] = [];

  // Mapeo de clases incorrectas comunes a correctas
  const classMappings: Record<string, string> = {
    // Radio buttons
    'ubits-radio': 'ubits-radio-button',
    'ubits-radio__input': 'ubits-radio-button__input',
    'ubits-radio__label': 'ubits-radio-button__label',
    'ubits-radio__circle': 'ubits-radio-button__circle',
    'ubits-radio__dot': 'ubits-radio-button__dot',

    // Drawer
    'ubits-drawer__header-content': 'ubits-drawer__header-text',
    'ubits-drawer--right': 'ubits-drawer--width-40', // o el ancho apropiado

    // Otros comunes
    'ubits-text-body-md': 'ubits-body-md-regular',
    'ubits-text--secondary': 'ubits-text-secondary', // o usar clase de color directamente
  };

  incorrectClasses.forEach((incorrect) => {
    // 1. Verificar mapeo directo
    if (classMappings[incorrect]) {
      suggestions.push({
        incorrect,
        correct: classMappings[incorrect],
        confidence: 'high',
      });
      return;
    }

    // 2. Buscar clases similares en el CSS
    const similar = findSimilarClassInCSS(incorrect, componentCSS);
    if (similar) {
      suggestions.push({
        incorrect,
        correct: similar,
        confidence: 'medium',
      });
      return;
    }

    // 3. Intentar corregir basándose en patrones comunes
    const corrected = tryCorrectClassPattern(incorrect, componentId);
    if (corrected && componentCSS.includes(`.${corrected}`)) {
      suggestions.push({
        incorrect,
        correct: corrected,
        confidence: 'low',
      });
    }
  });

  return suggestions;
}

/**
 * Busca una clase similar en el CSS
 */
function findSimilarClassInCSS(incorrect: string, css: string): string | null {
  // Extraer la parte base de la clase (sin modificadores)
  const base = incorrect.split('--')[0];

  // Buscar todas las clases que empiecen con la misma base
  const classRegex = new RegExp(
    `\\.(${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^\\s,{]+)`,
    'g'
  );
  const matches = Array.from(css.matchAll(classRegex));

  if (matches.length > 0) {
    // Retornar la primera clase similar encontrada
    return matches[0][1];
  }

  return null;
}

/**
 * Intenta corregir una clase basándose en patrones comunes
 */
function tryCorrectClassPattern(
  incorrect: string,
  componentId: string
): string | null {
  const prefix = getComponentClassPrefix(componentId);

  // Patrón 1: Cambiar __ por -- (modificadores)
  if (incorrect.includes('__')) {
    const corrected = incorrect.replace(/__/g, '--');
    return corrected;
  }

  // Patrón 2: Agregar sufijo faltante
  if (
    incorrect.startsWith(prefix) &&
    !incorrect.includes('--') &&
    !incorrect.includes('__')
  ) {
    // Podría ser que falte el modificador
    return null; // No intentar adivinar modificadores
  }

  return null;
}

/**
 * Valida clases CSS y retorna resultado simplificado para uso en verificaciones
 */
export async function validateCSSClassesSimple(
  html: string,
  componentId: string
): Promise<{ valid: boolean; errors: string[]; suggestions: string[] }> {
  const result = await validateCSSClasses(html, componentId);
  return {
    valid: result.valid,
    errors: result.errors,
    suggestions: result.suggestions,
  };
}
