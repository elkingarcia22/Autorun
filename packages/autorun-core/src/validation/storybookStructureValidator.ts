/**
 * Storybook Structure Validator
 *
 * Valida que la implementación coincide con la estructura esperada desde Storybook
 * Compara HTML, props y CSS
 */

import {
  extractStructureFromStorybook,
  type StorybookStructure,
} from '../helpers/storybookStructureExtractor';
import { parsePropsFromComponent } from '../helpers/storybookPropsParser';
import { extractBestPracticesFromStorybook } from '../helpers/storybookBestPracticesExtractor';
import { extractAPIFromStorybook } from '../helpers/storybookAPIExtractor';

export interface StructureValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  structureMatch: boolean;
  propsMatch: boolean;
  cssMatch: boolean;
  differences: Array<{
    type: 'missing' | 'extra' | 'different';
    element: string;
    expected?: string;
    actual?: string;
    location?: string;
  }>;
}

export interface ValidationOptions {
  componentId: string;
  implementation: string;
  storyName?: string;
  strict?: boolean; // Si true, falla en warnings
}

/**
 * Valida estructura de implementación vs Storybook
 *
 * @param options - Opciones de validación
 * @returns Resultado de validación
 */
export async function validateImplementationStructure(
  options: ValidationOptions
): Promise<StructureValidation> {
  console.log(
    `🔍 [Storybook Structure Validator] Validando implementación para: ${options.componentId}`
  );

  const result: StructureValidation = {
    valid: true,
    errors: [],
    warnings: [],
    structureMatch: false,
    propsMatch: false,
    cssMatch: false,
    differences: [],
  };

  try {
    // 1. Obtener estructura esperada desde Storybook
    const expectedStructure = await extractStructureFromStorybook({
      componentId: options.componentId,
      storyName: options.storyName,
      includeContext: false,
    });

    // 2. Obtener props esperadas
    const expectedProps = await parsePropsFromComponent(
      options.componentId,
      true
    );

    // 3. Validar estructura HTML
    const structureValidation = validateHTMLStructure(
      options.implementation,
      expectedStructure.componentHTML
    );
    result.structureMatch = structureValidation.match;
    result.differences.push(...structureValidation.differences);

    // 4. Validar props
    const propsValidation = validateProps(
      options.implementation,
      expectedProps.props
    );
    result.propsMatch = propsValidation.match;
    result.differences.push(...propsValidation.differences);

    // 5. Validar CSS
    const cssValidation = validateCSS(
      options.implementation,
      expectedStructure.relatedStyles
    );
    result.cssMatch = cssValidation.match;
    result.differences.push(...cssValidation.differences);

    // 6. ⭐ NUEVO: Validar contra best practices
    try {
      const bestPractices = await extractBestPracticesFromStorybook(
        options.componentId
      );
      if (bestPractices) {
        const practicesValidation = validateAgainstBestPractices(
          options.implementation,
          bestPractices
        );
        result.warnings.push(...practicesValidation.warnings);
        if (practicesValidation.errors.length > 0) {
          result.errors.push(...practicesValidation.errors);
        }
      }
    } catch (error: any) {
      // Si no se pueden obtener best practices, continuar sin validar
      console.warn(
        `⚠️ No se pudieron obtener best practices: ${error.message}`
      );
    }

    // 7. ⭐ NUEVO: Validar contra API
    try {
      const api = await extractAPIFromStorybook(options.componentId);
      if (api) {
        const apiValidation = validateAgainstAPI(options.implementation, api);
        result.warnings.push(...apiValidation.warnings);
        if (apiValidation.errors.length > 0) {
          result.errors.push(...apiValidation.errors);
        }
      }
    } catch (error: any) {
      // Si no se puede obtener API, continuar sin validar
      console.warn(`⚠️ No se pudo obtener API: ${error.message}`);
    }

    // 8. Clasificar diferencias como errores o warnings
    for (const diff of result.differences) {
      if (diff.type === 'missing' && options.strict) {
        result.errors.push(
          `Elemento faltante: ${diff.element}${diff.expected ? ` (esperado: ${diff.expected})` : ''}`
        );
      } else if (diff.type === 'extra') {
        result.warnings.push(
          `Elemento extra: ${diff.element}${diff.actual ? ` (actual: ${diff.actual})` : ''}`
        );
      } else if (diff.type === 'different') {
        result.errors.push(
          `Diferencia en ${diff.element}: esperado "${diff.expected}", actual "${diff.actual}"`
        );
      }
    }

    // 7. Determinar si es válido
    result.valid =
      result.structureMatch &&
      result.propsMatch &&
      (result.cssMatch || !options.strict) &&
      result.errors.length === 0;

    console.log(
      `✅ [Storybook Structure Validator] Validación completada: ${result.valid ? 'VÁLIDA' : 'INVÁLIDA'}`
    );
    if (result.errors.length > 0) {
      console.log(`  Errores: ${result.errors.length}`);
    }
    if (result.warnings.length > 0) {
      console.log(`  Advertencias: ${result.warnings.length}`);
    }

    return result;
  } catch (error: any) {
    console.error(
      `❌ [Storybook Structure Validator] Error validando:`,
      error.message
    );
    result.valid = false;
    result.errors.push(`Error de validación: ${error.message}`);
    return result;
  }
}

/**
 * Valida estructura HTML
 */
function validateHTMLStructure(
  implementation: string,
  expectedHTML: string
): {
  match: boolean;
  differences: StructureValidation['differences'];
} {
  const differences: StructureValidation['differences'] = [];

  // Extraer elementos principales del HTML esperado
  const expectedElements = extractHTMLElements(expectedHTML);
  const actualElements = extractHTMLElements(implementation);

  // Comparar elementos
  for (const expectedEl of expectedElements) {
    const actualEl = actualElements.find(
      (el) => el.tag === expectedEl.tag && el.id === expectedEl.id
    );

    if (!actualEl) {
      differences.push({
        type: 'missing',
        element: expectedEl.tag,
        expected: expectedEl.outerHTML,
      });
    } else if (expectedEl.classes && actualEl.classes) {
      // Comparar clases
      const missingClasses = expectedEl.classes.filter(
        (cls) => !actualEl.classes?.includes(cls)
      );
      if (missingClasses.length > 0) {
        differences.push({
          type: 'missing',
          element: `${expectedEl.tag}.${missingClasses.join('.')}`,
          expected: missingClasses.join(' '),
        });
      }
    }
  }

  // Buscar elementos extra
  for (const actualEl of actualElements) {
    const expectedEl = expectedElements.find(
      (el) => el.tag === actualEl.tag && el.id === actualEl.id
    );
    if (!expectedEl) {
      differences.push({
        type: 'extra',
        element: actualEl.tag,
        actual: actualEl.outerHTML,
      });
    }
  }

  return {
    match: differences.filter((d) => d.type === 'missing').length === 0,
    differences,
  };
}

/**
 * Extrae elementos HTML principales
 */
function extractHTMLElements(html: string): Array<{
  tag: string;
  id?: string;
  classes?: string[];
  outerHTML: string;
}> {
  const elements: Array<{
    tag: string;
    id?: string;
    classes?: string[];
    outerHTML: string;
  }> = [];

  // Buscar elementos principales (div, section, article, etc.)
  const elementPattern =
    /<([a-z][a-z0-9]*)[^>]*(?:id=["']([^"']+)["'])?[^>]*(?:class=["']([^"']+)["'])?[^>]*>/gi;

  let match;
  while ((match = elementPattern.exec(html)) !== null) {
    const tag = match[1];
    const id = match[2];
    const classes = match[3]?.split(' ').filter((c) => c.trim()) || [];

    // Solo incluir elementos con id o clases significativas
    if (id || classes.length > 0) {
      elements.push({
        tag,
        id,
        classes,
        outerHTML: match[0],
      });
    }
  }

  return elements;
}

/**
 * Valida props
 */
function validateProps(
  implementation: string,
  expectedProps: any[]
): {
  match: boolean;
  differences: StructureValidation['differences'];
} {
  const differences: StructureValidation['differences'] = [];

  // Extraer props de la implementación
  const actualProps = extractPropsFromImplementation(implementation);

  // Validar props requeridas
  const requiredProps = expectedProps.filter((p) => p.required);
  for (const requiredProp of requiredProps) {
    if (!actualProps[requiredProp.name]) {
      differences.push({
        type: 'missing',
        element: `prop:${requiredProp.name}`,
        expected: requiredProp.defaultValue || 'required',
      });
    }
  }

  // Validar valores de props
  for (const expectedProp of expectedProps) {
    if (actualProps[expectedProp.name]) {
      // Por ahora, solo verificar que existe
      // En una implementación más completa, validaríamos el tipo y valor
    }
  }

  return {
    match: differences.length === 0,
    differences,
  };
}

/**
 * Extrae props de la implementación
 */
function extractPropsFromImplementation(
  implementation: string
): Record<string, string> {
  const props: Record<string, string> = {};

  // Buscar atributos en elementos HTML
  const attrPattern = /(\w+(?:-\w+)*)=["']([^"']+)["']/gi;
  let match;
  while ((match = attrPattern.exec(implementation)) !== null) {
    const propName = match[1];
    const propValue = match[2];
    props[propName] = propValue;
  }

  // Buscar en código JavaScript
  const jsPattern = /(\w+):\s*["']?([^"',\s}]+)["']?/g;
  while ((match = jsPattern.exec(implementation)) !== null) {
    const propName = match[1];
    const propValue = match[2];
    if (!props[propName]) {
      props[propName] = propValue;
    }
  }

  return props;
}

/**
 * Valida CSS
 */
function validateCSS(
  implementation: string,
  expectedStyles: string[]
): {
  match: boolean;
  differences: StructureValidation['differences'];
} {
  const differences: StructureValidation['differences'] = [];

  // Extraer clases CSS de la implementación
  const actualClasses = extractCSSClasses(implementation);

  // Extraer clases de estilos esperados
  const expectedClasses = new Set<string>();
  for (const style of expectedStyles) {
    const classes = extractCSSClassesFromStyle(style);
    classes.forEach((cls) => expectedClasses.add(cls));
  }

  // Comparar clases
  for (const expectedClass of expectedClasses) {
    if (!actualClasses.has(expectedClass)) {
      differences.push({
        type: 'missing',
        element: `class:${expectedClass}`,
        expected: expectedClass,
      });
    }
  }

  return {
    match: differences.length === 0,
    differences,
  };
}

/**
 * Extrae clases CSS de HTML
 */
function extractCSSClasses(html: string): Set<string> {
  const classes = new Set<string>();
  const classPattern = /class=["']([^"']+)["']/gi;

  let match;
  while ((match = classPattern.exec(html)) !== null) {
    match[1]
      .split(' ')
      .filter((c) => c.trim())
      .forEach((cls) => classes.add(cls.trim()));
  }

  return classes;
}

/**
 * Extrae clases CSS desde CSS
 */
function extractCSSClassesFromStyle(css: string): string[] {
  const classes: string[] = [];
  const classPattern = /\.([a-z][a-z0-9_-]*)/gi;

  let match;
  while ((match = classPattern.exec(css)) !== null) {
    classes.push(match[1]);
  }

  return classes;
}

/**
 * ⭐ NUEVO: Valida contra best practices
 */
function validateAgainstBestPractices(
  implementation: string,
  bestPractices: any
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validar contra prácticas
  if (bestPractices.practices) {
    for (const practice of bestPractices.practices) {
      // Por ahora, solo advertencias (no errores estrictos)
      // En una implementación más completa, validaríamos cada práctica
    }
  }

  // Validar valores por defecto
  if (bestPractices.defaults) {
    for (const [key, value] of Object.entries(bestPractices.defaults)) {
      // Verificar si se usa el valor por defecto recomendado
      // Por ahora, solo advertencia
    }
  }

  // Validar advertencias
  if (bestPractices.warnings) {
    for (const warning of bestPractices.warnings) {
      warnings.push(`⚠️ Best Practice: ${warning}`);
    }
  }

  return { errors, warnings };
}

/**
 * ⭐ NUEVO: Valida contra API
 */
function validateAgainstAPI(
  implementation: string,
  api: any
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validar que se usa la API correcta
  if (api.methods) {
    for (const method of api.methods) {
      // Verificar si se usa el método en la implementación
      const methodPattern = new RegExp(`\\b${method.name}\\s*\\(`, 'i');
      if (!methodPattern.test(implementation)) {
        // No es error, solo advertencia si es un método común
        if (['success', 'error', 'info', 'warning'].includes(method.name)) {
          warnings.push(
            `⚠️ Método común "${method.name}" no encontrado en implementación`
          );
        }
      } else {
        // Validar que los parámetros coinciden
        // Por ahora, solo verificar que existe
      }
    }
  }

  // Validar setup requerido
  if (api.setup?.required) {
    const setupPattern = new RegExp(
      api.setup.code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').substring(0, 50),
      'i'
    );
    if (!setupPattern.test(implementation)) {
      warnings.push(
        `⚠️ Setup requerido no encontrado: ${api.setup.description}`
      );
    }
  }

  return { errors, warnings };
}
