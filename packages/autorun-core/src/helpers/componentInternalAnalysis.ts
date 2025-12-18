/**
 * Component Internal Analysis
 *
 * ⭐ NUEVO: Analiza componentes internos (drawer→botones, select→list, etc.)
 * Crea plan de implementación según el análisis de componentes internos
 */

import { getSourceCode } from './storybookExactCodeExtractor.js';
import { extractExactCodeFromStorybookWithBrowser } from './storybookExactCodeExtractorWithBrowser.js';
import {
  extractMetadataFromStory,
  normalizeComponentId,
} from './storybookMetadataExtractor.js';

export interface InternalComponent {
  name: string;
  type: 'button' | 'input' | 'list' | 'scroll' | 'icon' | 'text' | 'other';
  required: boolean;
  classes: string[];
  structure: string;
  props?: Record<string, any>;
}

export interface ComponentAnalysis {
  componentId: string;
  mainComponent: {
    classes: string[];
    structure: string;
    requiredElements: string[];
  };
  internalComponents: InternalComponent[];
  dependencies: string[]; // IDs de otros componentes necesarios
  dependsOn: {
    required: string[]; // Componentes que el consumidor DEBE componer (Button, Input, etc.)
    optional: string[]; // Componentes opcionales que el consumidor puede componer
  };
  internals: string[]; // Componentes privados que existen dentro pero NO debes re-implementar
  implementationPlan: ImplementationStep[];
}

export interface ImplementationStep {
  step: number;
  component: string; // 'main' o ID de componente interno
  description: string;
  code: string;
  dependencies: string[];
}

/**
 * Analiza un componente y sus componentes internos
 */
export async function analyzeComponentInternals(
  componentId: string,
  storyName: string = 'default'
): Promise<ComponentAnalysis> {
  console.log(`🔍 [Component Internal Analysis] Analizando: ${componentId}`);

  // 1. Obtener código exacto desde Storybook
  const exactCode = await extractExactCodeFromStorybookWithBrowser(
    componentId,
    storyName
  );

  // 2. Obtener código fuente
  const sourceCode = await getSourceCode(componentId);

  // 3. Analizar estructura principal
  const mainComponent = analyzeMainComponent(exactCode.html, componentId);

  // 4. Detectar componentes internos
  const internalComponents = detectInternalComponents(
    exactCode.html,
    sourceCode,
    componentId
  );

  // 5. Detectar dependencias (mejorado: separa dependsOn vs internals)
  const dependencies = detectDependencies(internalComponents, exactCode.html);
  
  // 5.1 Nivel A: Intentar extraer metadata declarativa desde la story
  let declarativeMetadata = null;
  try {
    declarativeMetadata = await extractMetadataFromStory(componentId, storyName);
  } catch (error: any) {
    console.warn(
      `   ⚠️ Error extrayendo metadata declarativa: ${error.message}`
    );
  }
  
  const { dependsOn, internals } = detectDependsOnAndInternals(
    exactCode.html,
    sourceCode,
    componentId,
    dependencies,
    declarativeMetadata
  );

  // 6. Crear plan de implementación
  const implementationPlan = createImplementationPlan(
    componentId,
    mainComponent,
    internalComponents,
    dependencies,
    dependsOn
  );

  return {
    componentId,
    mainComponent,
    internalComponents,
    dependencies,
    dependsOn,
    internals,
    implementationPlan,
  };
}

/**
 * Analiza el componente principal
 */
function analyzeMainComponent(
  html: string,
  componentId: string
): ComponentAnalysis['mainComponent'] {
  const classes = extractClasses(html);
  const componentPrefix = getComponentPrefix(componentId);
  const componentClasses = classes.filter((cls) =>
    cls.startsWith(componentPrefix)
  );

  // Extraer estructura principal
  const structure = extractMainStructure(html, componentPrefix);

  // Extraer elementos requeridos
  const requiredElements = extractRequiredElements(html, componentPrefix);

  return {
    classes: componentClasses,
    structure,
    requiredElements,
  };
}

/**
 * Detecta componentes internos en el HTML y código fuente
 */
function detectInternalComponents(
  html: string,
  sourceCode: string | null,
  componentId: string
): InternalComponent[] {
  const internalComponents: InternalComponent[] = [];

  // Mapeo de componentes conocidos y sus componentes internos
  const componentInternalMap: Record<
    string,
    Array<{ name: string; type: InternalComponent['type']; required: boolean }>
  > = {
    drawer: [
      { name: 'close-button', type: 'button', required: true },
      { name: 'header-title', type: 'text', required: true },
      { name: 'header-complementary', type: 'text', required: false },
      { name: 'footer-buttons', type: 'button', required: false },
      { name: 'scrollbar', type: 'scroll', required: true },
    ],
    'radio-button': [
      { name: 'input', type: 'input', required: true },
      { name: 'circle', type: 'other', required: true },
      { name: 'dot', type: 'other', required: true },
      { name: 'label', type: 'text', required: true },
    ],
    select: [
      { name: 'trigger', type: 'button', required: true },
      { name: 'list', type: 'list', required: true },
      { name: 'option', type: 'other', required: true },
    ],
    modal: [
      { name: 'overlay', type: 'other', required: true },
      { name: 'close-button', type: 'button', required: true },
      { name: 'header', type: 'text', required: false },
      { name: 'footer-buttons', type: 'button', required: false },
    ],
  };

  const normalizedId = componentId
    .replace(/^[🧩⚙️]/g, '')
    .replace(/^functional-/, '')
    .replace(/^ux-/, '')
    .toLowerCase();

  const knownInternals = componentInternalMap[normalizedId] || [];

  // Para cada componente interno conocido, verificar si está en el HTML
  for (const known of knownInternals) {
    const component = detectInternalComponentInHTML(
      html,
      sourceCode,
      componentId,
      known
    );
    if (component) {
      internalComponents.push(component);
    }
  }

  // Detectar componentes internos adicionales desde el HTML
  const additionalInternals = detectAdditionalInternals(html, componentId);
  internalComponents.push(...additionalInternals);

  return internalComponents;
}

/**
 * Detecta un componente interno específico en el HTML
 */
function detectInternalComponentInHTML(
  html: string,
  sourceCode: string | null,
  componentId: string,
  known: { name: string; type: InternalComponent['type']; required: boolean }
): InternalComponent | null {
  const componentPrefix = getComponentPrefix(componentId);
  const internalClassPatterns: Record<string, string[]> = {
    'close-button': [`${componentPrefix}__close`, 'ubits-button'],
    'header-title': [`${componentPrefix}__header-title`, 'ubits-heading'],
    'header-complementary': [
      `${componentPrefix}__header-complementary`,
      'ubits-text',
    ],
    'footer-buttons': [`${componentPrefix}__footer`, 'ubits-button'],
    scrollbar: [`${componentPrefix}__scrollbar`],
    input: [`${componentPrefix}__input`, 'ubits-radio-button__input'],
    circle: [`${componentPrefix}__circle`, 'ubits-radio-button__circle'],
    dot: [`${componentPrefix}__dot`, 'ubits-radio-button__dot'],
    label: [`${componentPrefix}__label`, 'ubits-radio-button__label'],
    trigger: [`${componentPrefix}__trigger`, 'ubits-select__trigger'],
    list: [`${componentPrefix}__list`, 'ubits-select__list'],
    option: [`${componentPrefix}__option`, 'ubits-select__option'],
    overlay: [`${componentPrefix}__overlay`, 'ubits-modal__overlay'],
  };

  const patterns = internalClassPatterns[known.name] || [];
  const found = patterns.some((pattern) => html.includes(pattern));

  if (!found && known.required) {
    // Si es requerido pero no se encontró, retornar null para que se marque como faltante
    return null;
  }

  if (!found) {
    return null;
  }

  // Extraer clases y estructura del componente interno
  const classes = patterns.filter((pattern) => html.includes(pattern));
  const structure = extractInternalComponentStructure(html, patterns[0]);

  return {
    name: known.name,
    type: known.type,
    required: known.required,
    classes,
    structure,
  };
}

/**
 * Detecta componentes internos adicionales no mapeados
 */
function detectAdditionalInternals(
  html: string,
  componentId: string
): InternalComponent[] {
  const additional: InternalComponent[] = [];
  const componentPrefix = getComponentPrefix(componentId);

  // Buscar botones internos
  const buttonMatches = html.matchAll(
    new RegExp(`<button[^>]*class="[^"]*${componentPrefix}[^"]*"`, 'gi')
  );
  for (const match of buttonMatches) {
    const classes = extractClassesFromMatch(match[0]);
    if (
      !additional.some((c) => c.classes.some((cls) => classes.includes(cls)))
    ) {
      additional.push({
        name: `button-${additional.length + 1}`,
        type: 'button',
        required: false,
        classes,
        structure: match[0],
      });
    }
  }

  // Buscar inputs internos
  const inputMatches = html.matchAll(
    new RegExp(`<input[^>]*class="[^"]*${componentPrefix}[^"]*"`, 'gi')
  );
  for (const match of inputMatches) {
    const classes = extractClassesFromMatch(match[0]);
    if (
      !additional.some((c) => c.classes.some((cls) => classes.includes(cls)))
    ) {
      additional.push({
        name: `input-${additional.length + 1}`,
        type: 'input',
        required: false,
        classes,
        structure: match[0],
      });
    }
  }

  return additional;
}

/**
 * Detecta dependencias de otros componentes
 */
function detectDependencies(
  internalComponents: InternalComponent[],
  html: string
): string[] {
  const dependencies: string[] = [];

  // Detectar componentes UBITS usados
  const ubitsComponentPattern =
    /ubits-(button|input|select|checkbox|radio-button|icon)/gi;
  const matches = Array.from(html.matchAll(ubitsComponentPattern));
  const foundComponents = new Set<string>();

  matches.forEach((match) => {
    const componentName = match[1].toLowerCase();
    if (componentName === 'radio-button') {
      foundComponents.add('radio-button');
    } else {
      foundComponents.add(componentName);
    }
  });

  return Array.from(foundComponents);
}

/**
 * Detecta dependsOn (requeridos/opcionales) vs internals (privados)
 *
 * Nivel A: Metadata declarativa (si existe en story) ⭐ IMPLEMENTADO
 * Nivel B: Parse del snippet (window.UBITS.X.create, <ubits-x>)
 * Nivel C: DOM scan (data-ubits-id, <ubits-*>)
 */
function detectDependsOnAndInternals(
  html: string,
  sourceCode: string | null,
  componentId: string,
  allDependencies: string[],
  declarativeMetadata?: {
    componentId?: string;
    dependsOn?: { required: string[]; optional: string[] };
    internals?: string[];
  } | null
): {
  dependsOn: { required: string[]; optional: string[] };
  internals: string[];
} {
  const dependsOnRequired: string[] = [];
  const dependsOnOptional: string[] = [];
  const internals: string[] = [];

  // ⭐ Nivel A: Metadata declarativa (si existe, tiene prioridad)
  if (declarativeMetadata) {
    console.log(
      `   📋 [Nivel A] Metadata declarativa encontrada en story`
    );
    
    if (declarativeMetadata.dependsOn) {
      // Normalizar IDs y agregar a dependsOn
      declarativeMetadata.dependsOn.required.forEach((id) => {
        const normalized = normalizeComponentId(id);
        if (!dependsOnRequired.includes(normalized)) {
          dependsOnRequired.push(normalized);
        }
      });
      declarativeMetadata.dependsOn.optional.forEach((id) => {
        const normalized = normalizeComponentId(id);
        if (!dependsOnOptional.includes(normalized)) {
          dependsOnOptional.push(normalized);
        }
      });
    }
    
    if (declarativeMetadata.internals) {
      declarativeMetadata.internals.forEach((id) => {
        const normalized = normalizeComponentId(id);
        if (!internals.includes(normalized)) {
          internals.push(normalized);
        }
      });
    }
    
    // Si encontramos metadata declarativa, retornar directamente (tiene prioridad)
    if (dependsOnRequired.length > 0 || dependsOnOptional.length > 0 || internals.length > 0) {
      console.log(
        `   ✅ [Nivel A] Usando metadata declarativa: ${dependsOnRequired.length} requeridos, ${dependsOnOptional.length} opcionales, ${internals.length} internos`
      );
      return {
        dependsOn: {
          required: dependsOnRequired,
          optional: dependsOnOptional,
        },
        internals,
      };
    }
  }
  
  // Si no hay metadata declarativa, continuar con Niveles B y C
  console.log(`   📋 [Nivel A] No hay metadata declarativa, usando Niveles B y C`);

  // Nivel B: Parse del snippet para detectar window.UBITS.X.create()
  const ubitsCreatePattern = /window\.UBITS\.(\w+)\.create\(/gi;
  const createMatches = Array.from(html.matchAll(ubitsCreatePattern));
  createMatches.forEach((match) => {
    const componentName = match[1].toLowerCase();
    // Si es un componente que se crea explícitamente, es dependsOn
    if (!dependsOnRequired.includes(componentName)) {
      dependsOnRequired.push(componentName);
    }
  });

  // Nivel B: Parse del snippet para detectar <ubits-x>
  const ubitsTagPattern = /<ubits-(\w+)[\s>]/gi;
  const tagMatches = Array.from(html.matchAll(ubitsTagPattern));
  tagMatches.forEach((match) => {
    const componentName = match[1].toLowerCase();
    // Si es un tag explícito, es dependsOn
    if (!dependsOnRequired.includes(componentName)) {
      dependsOnRequired.push(componentName);
    }
  });

  // Nivel C: DOM scan - buscar data-ubits-id
  const dataUbitsIdPattern = /data-ubits-id=["']([^"']+)["']/gi;
  const idMatches = Array.from(html.matchAll(dataUbitsIdPattern));
  idMatches.forEach((match) => {
    const id = match[1];
    // Extraer nombre del componente del ID
    const componentMatch = id.match(/🧩-ux-(\w+)|⚙️-functional-(\w+)/);
    if (componentMatch) {
      const componentName = (
        componentMatch[1] || componentMatch[2]
      ).toLowerCase();
      if (
        !dependsOnRequired.includes(componentName) &&
        !dependsOnOptional.includes(componentName)
      ) {
        // Por defecto, si tiene data-ubits-id, es dependsOn (puede ser requerido u opcional)
        dependsOnOptional.push(componentName);
      }
    }
  });

  // Nivel C: DOM scan - buscar clases ubits-* que no sean del componente principal
  const componentPrefix = getComponentPrefix(componentId);
  const allUbitsClasses = html.matchAll(/ubits-(\w+)/gi);
  const foundComponents = new Set<string>();

  for (const match of allUbitsClasses) {
    const className = match[1].toLowerCase();
    // Si no es parte del componente principal, es una dependencia
    if (!className.startsWith(componentPrefix.replace('ubits-', ''))) {
      foundComponents.add(className);
    }
  }

  // Separar en dependsOn vs internals basado en patrones conocidos
  foundComponents.forEach((compName) => {
    // Componentes que típicamente son dependsOn (el consumidor los compone)
    const dependsOnComponents = [
      'button',
      'input',
      'select',
      'checkbox',
      'radio-button',
      'icon',
      'badge',
      'avatar',
    ];
    // Componentes que típicamente son internals (privados del componente)
    const internalComponents = [
      'scroll',
      'scrollbar',
      'overlay',
      'mask',
      'progress',
    ];

    if (dependsOnComponents.includes(compName)) {
      if (
        !dependsOnRequired.includes(compName) &&
        !dependsOnOptional.includes(compName)
      ) {
        // Por defecto, si aparece explícitamente, es required
        dependsOnRequired.push(compName);
      }
    } else if (internalComponents.includes(compName)) {
      if (!internals.includes(compName)) {
        internals.push(compName);
      }
    } else {
      // Componentes desconocidos: por defecto son dependsOn optional
      if (
        !dependsOnRequired.includes(compName) &&
        !dependsOnOptional.includes(compName)
      ) {
        dependsOnOptional.push(compName);
      }
    }
  });

  // Nivel A: Si hay metadata en sourceCode, usarla (futuro)
  // Por ahora, usamos los niveles B y C

  return {
    dependsOn: {
      required: [...new Set(dependsOnRequired)],
      optional: [...new Set(dependsOnOptional)],
    },
    internals: [...new Set(internals)],
  };
}

/**
 * Crea plan de implementación paso a paso
 */
function createImplementationPlan(
  componentId: string,
  mainComponent: ComponentAnalysis['mainComponent'],
  internalComponents: InternalComponent[],
  dependencies: string[],
  dependsOn: { required: string[]; optional: string[] }
): ImplementationStep[] {
  const plan: ImplementationStep[] = [];

  // Paso 0: Obtener snippets de componentes dependsOn.required
  if (dependsOn.required.length > 0) {
    plan.push({
      step: 0,
      component: 'dependencies',
      description: `Obtener snippets de componentes requeridos: ${dependsOn.required.join(', ')}`,
      code: `// Consultar Storybook MCP para: ${dependsOn.required.join(', ')}`,
      dependencies: dependsOn.required,
    });
  }

  // Paso 1: Estructura principal
  plan.push({
    step: 1,
    component: 'main',
    description: `Crear estructura principal de ${componentId}`,
    code: mainComponent.structure,
    dependencies: dependsOn.required,
  });

  // Paso 2: Componentes internos requeridos
  const requiredInternals = internalComponents.filter((c) => c.required);
  requiredInternals.forEach((internal, index) => {
    plan.push({
      step: 2 + index,
      component: internal.name,
      description: `Agregar ${internal.name} (${internal.type})`,
      code: internal.structure,
      dependencies: internal.type === 'button' ? ['button'] : [],
    });
  });

  // Paso 3: Componentes internos opcionales
  const optionalInternals = internalComponents.filter((c) => !c.required);
  optionalInternals.forEach((internal, index) => {
    plan.push({
      step: 2 + requiredInternals.length + index,
      component: internal.name,
      description: `Agregar ${internal.name} (${internal.type}, opcional)`,
      code: internal.structure,
      dependencies: internal.type === 'button' ? ['button'] : [],
    });
  });

  return plan;
}

// Funciones auxiliares

function extractClasses(html: string): string[] {
  const classes: string[] = [];
  const classRegex = /class=["']([^"']+)["']/g;
  let match;
  while ((match = classRegex.exec(html)) !== null) {
    classes.push(...match[1].split(/\s+/).filter(Boolean));
  }
  return [...new Set(classes)];
}

function getComponentPrefix(componentId: string): string {
  const normalized = componentId
    .replace(/^[🧩⚙️]/g, '')
    .replace(/^functional-/, '')
    .replace(/^ux-/, '')
    .toLowerCase();

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

  return specialMappings[normalized] || `ubits-${normalized}`;
}

function extractMainStructure(html: string, prefix: string): string {
  // Buscar el elemento principal del componente
  const mainElementRegex = new RegExp(
    `<[^>]+class="[^"]*${prefix}[^"]*"[^>]*>([\\s\\S]*?)</[^>]+>`,
    'i'
  );
  const match = html.match(mainElementRegex);
  return match ? match[0] : html.substring(0, 200);
}

function extractRequiredElements(html: string, prefix: string): string[] {
  const elements: string[] = [];
  const elementRegex = new RegExp(`<([^>]+)class="[^"]*${prefix}[^"]*"`, 'gi');
  const matches = Array.from(html.matchAll(elementRegex));
  matches.forEach((match) => {
    const tagMatch = match[1].match(/^([a-z]+)/i);
    if (tagMatch) {
      elements.push(tagMatch[1]);
    }
  });
  return [...new Set(elements)];
}

function extractInternalComponentStructure(
  html: string,
  classPattern: string
): string {
  const regex = new RegExp(
    `<[^>]+class="[^"]*${classPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"]*"[^>]*>([\\s\\S]*?)</[^>]+>`,
    'i'
  );
  const match = html.match(regex);
  return match ? match[0] : '';
}

function extractClassesFromMatch(match: string): string[] {
  const classMatch = match.match(/class=["']([^"']+)["']/);
  return classMatch ? classMatch[1].split(/\s+/).filter(Boolean) : [];
}
