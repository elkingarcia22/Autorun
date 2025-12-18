/**
 * Component Internal Analysis
 *
 * ⭐ NUEVO: Analiza componentes internos (drawer→botones, select→list, etc.)
 * Crea plan de implementación según el análisis de componentes internos
 */

import { getSourceCode } from './storybookExactCodeExtractor';
import { extractExactCodeFromStorybookWithBrowser } from './storybookExactCodeExtractorWithBrowser';

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

  // 5. Detectar dependencias
  const dependencies = detectDependencies(internalComponents, exactCode.html);

  // 6. Crear plan de implementación
  const implementationPlan = createImplementationPlan(
    componentId,
    mainComponent,
    internalComponents,
    dependencies
  );

  return {
    componentId,
    mainComponent,
    internalComponents,
    dependencies,
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
 * Crea plan de implementación paso a paso
 */
function createImplementationPlan(
  componentId: string,
  mainComponent: ComponentAnalysis['mainComponent'],
  internalComponents: InternalComponent[],
  dependencies: string[]
): ImplementationStep[] {
  const plan: ImplementationStep[] = [];

  // Paso 1: Estructura principal
  plan.push({
    step: 1,
    component: 'main',
    description: `Crear estructura principal de ${componentId}`,
    code: mainComponent.structure,
    dependencies: [],
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
