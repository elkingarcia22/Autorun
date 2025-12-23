/**
 * Storybook Parser - POC Storybook V2
 *
 * Parsea archivos .stories.ts del Storybook UBITS para extraer toda la información:
 * - Contrato UBITS completo (tokens, dependencias, reglas)
 * - Props con tipos, defaults, descripciones
 * - Código exacto de implementación
 * - Documentación completa
 */

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';

export interface UBITSContract {
  componentId: string;
  api?: {
    create?: string;
    tag?: string;
  };
  dependsOn?: {
    required: string[];
    optional: string[];
  };
  internals?: string[];
  tokensUsed?: string[];
  rules?: {
    forbidHardcodedColors?: boolean;
    forbiddenPatterns?: string[];
    requiredProps?: string[];
  };
}

export interface PropInfo {
  name: string;
  type: 'string' | 'boolean' | 'number' | 'object' | 'array' | 'enum';
  controlType: 'text' | 'boolean' | 'select' | 'object' | 'number';
  options?: string[]; // Para enums
  defaultValue?: any;
  description?: string;
  required: boolean;
  category?: string;
}

export interface StoryInfo {
  name: string;
  args: Record<string, any>;
  code?: string; // Código exacto de parameters.docs.source.code
}

export interface ParsedStorybook {
  componentId: string;
  title: string;
  description?: string;
  contract: UBITSContract;
  props: PropInfo[];
  defaults: Record<string, any>;
  stories: StoryInfo[];
  implementationCode?: string; // Código de Implementation story
}

/**
 * Busca archivo .stories.ts para un componente
 */
async function findStoryFile(componentId: string): Promise<string | null> {
  // Normalizar componentId (ej: "data-data-table" -> "DataTable")
  const normalized = normalizeComponentId(componentId);
  const projectRoot = process.cwd();

  const possiblePaths = [
    `vendor/ubits/packages/storybook/stories/components/${normalized}/${normalized}.stories.ts`,
    `vendor/ubits/packages/storybook/stories/components/${componentId}/${componentId}.stories.ts`,
    // Buscar por nombre de componente (ej: "Button" -> "Button/Button.stories.ts")
    `vendor/ubits/packages/storybook/stories/components/${capitalizeFirst(normalized)}/${capitalizeFirst(normalized)}.stories.ts`,
  ];

  for (const relativePath of possiblePaths) {
    const fullPath = resolve(projectRoot, relativePath);
    if (existsSync(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

function normalizeComponentId(componentId: string): string {
  // Remover prefijos comunes
  let normalized = componentId
    .replace(/^data-/, '')
    .replace(/^basicos-/, '')
    .replace(/^navegacion-/, '')
    .replace(/^feedback-/, '');

  // Convertir a PascalCase
  normalized = normalized
    .split('-')
    .map((word) => capitalizeFirst(word))
    .join('');

  return normalized;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Extrae el contrato UBITS desde el código
 */
function extractUBITSContract(content: string): UBITSContract | null {
  // Buscar createUBITSContract({...})
  const contractRegex = /createUBITSContract\s*\(\s*\{([\s\S]*?)\}\s*\)/;
  const match = content.match(contractRegex);

  if (!match) {
    return null;
  }

  const contractContent = match[1];

  // Extraer componentId
  const componentIdMatch = contractContent.match(
    /componentId:\s*['"]([^'"]+)['"]/
  );
  const componentId = componentIdMatch ? componentIdMatch[1] : '';

  // Extraer api
  const apiMatch = contractContent.match(/api:\s*\{([^}]*)\}/);
  let api: UBITSContract['api'] = undefined;
  if (apiMatch) {
    const apiContent = apiMatch[1];
    const createMatch = apiContent.match(/create:\s*['"]([^'"]+)['"]/);
    const tagMatch = apiContent.match(/tag:\s*['"]([^'"]+)['"]/);
    api = {
      create: createMatch ? createMatch[1] : undefined,
      tag: tagMatch ? tagMatch[1] : undefined,
    };
  }

  // Extraer dependsOn
  const dependsOnMatch = contractContent.match(/dependsOn:\s*\{([^}]*)\}/);
  let dependsOn: UBITSContract['dependsOn'] = undefined;
  if (dependsOnMatch) {
    const dependsOnContent = dependsOnMatch[1];
    const requiredMatch = dependsOnContent.match(/required:\s*\[([^\]]*)\]/);
    const optionalMatch = dependsOnContent.match(/optional:\s*\[([^\]]*)\]/);
    dependsOn = {
      required: requiredMatch
        ? requiredMatch[1]
            .split(',')
            .map((s) => s.trim().replace(/['"]/g, ''))
            .filter(Boolean)
        : [],
      optional: optionalMatch
        ? optionalMatch[1]
            .split(',')
            .map((s) => s.trim().replace(/['"]/g, ''))
            .filter(Boolean)
        : [],
    };
  }

  // Extraer tokensUsed
  const tokensMatch = contractContent.match(/tokensUsed:\s*\[([^\]]*)\]/);
  const tokensUsed = tokensMatch
    ? tokensMatch[1]
        .split(',')
        .map((s) => s.trim().replace(/['"]/g, ''))
        .filter(Boolean)
    : [];

  // Extraer rules
  const rulesMatch = contractContent.match(/rules:\s*\{([^}]*)\}/);
  let rules: UBITSContract['rules'] = undefined;
  if (rulesMatch) {
    const rulesContent = rulesMatch[1];
    const requiredPropsMatch = rulesContent.match(
      /requiredProps:\s*\[([^\]]*)\]/
    );
    const forbiddenPatternsMatch = rulesContent.match(
      /forbiddenPatterns:\s*\[([^\]]*)\]/
    );
    rules = {
      requiredProps: requiredPropsMatch
        ? requiredPropsMatch[1]
            .split(',')
            .map((s) => s.trim().replace(/['"]/g, ''))
            .filter(Boolean)
        : [],
      forbiddenPatterns: forbiddenPatternsMatch
        ? forbiddenPatternsMatch[1]
            .split(',')
            .map((s) => s.trim().replace(/['"]/g, ''))
            .filter(Boolean)
        : [],
      forbidHardcodedColors: rulesContent.includes(
        'forbidHardcodedColors: true'
      ),
    };
  }

  return {
    componentId,
    api,
    dependsOn,
    tokensUsed: tokensUsed.length > 0 ? tokensUsed : undefined,
    rules,
  };
}

/**
 * Extrae args (valores por defecto) desde el código
 */
function extractArgs(content: string): Record<string, any> {
  const args: Record<string, any> = {};

  // Buscar args: { ... }
  const argsMatch = content.match(/args:\s*\{([^}]*)\}/);
  if (!argsMatch) {
    return args;
  }

  const argsContent = argsMatch[1];

  // Parsear propiedades básicas
  const propRegex = /(\w+):\s*([^,}]+)/g;
  let propMatch;

  while ((propMatch = propRegex.exec(argsContent)) !== null) {
    const key = propMatch[1].trim();
    let value = propMatch[2].trim();

    // Parsear valores
    if (value === 'undefined') {
      value = undefined;
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (value.match(/^\d+$/)) {
      value = Number(value);
    } else if (value.startsWith("'") || value.startsWith('"')) {
      value = value.slice(1, -1);
    }

    args[key] = value;
  }

  return args;
}

/**
 * Extrae argTypes desde el código
 */
function extractArgTypes(content: string): PropInfo[] {
  const props: PropInfo[] = [];

  // Buscar argTypes: { ... }
  const argTypesMatch = content.match(/argTypes:\s*\{([\s\S]*?)\}\s*,?\s*\};/);
  if (!argTypesMatch) {
    return props;
  }

  const argTypesContent = argTypesMatch[1];

  // Buscar cada propiedad en argTypes
  const propRegex = /(\w+):\s*\{([^}]*)\}/g;
  let propMatch;

  while ((propMatch = propRegex.exec(argTypesContent)) !== null) {
    const propName = propMatch[1].trim();
    const propContent = propMatch[2];

    // Extraer control type
    const controlMatch = propContent.match(
      /control:\s*\{\s*type:\s*['"]([^'"]+)['"]/
    );
    const controlType = controlMatch ? controlMatch[1] : 'text';

    // Extraer options (para enums)
    const optionsMatch = propContent.match(/options:\s*\[([^\]]*)\]/);
    const options = optionsMatch
      ? optionsMatch[1]
          .split(',')
          .map((s) => s.trim().replace(/['"]/g, ''))
          .filter(Boolean)
      : undefined;

    // Extraer description
    const descMatch = propContent.match(/description:\s*['"]([^'"]+)['"]/);
    const description = descMatch ? descMatch[1] : undefined;

    // Extraer defaultValue desde table
    const defaultValueMatch = propContent.match(
      /defaultValue:\s*\{\s*summary:\s*['"]([^'"]+)['"]/
    );
    const defaultValue = defaultValueMatch ? defaultValueMatch[1] : undefined;

    // Extraer type desde table
    const typeMatch = propContent.match(
      /type:\s*\{\s*summary:\s*['"]([^'"]+)['"]/
    );
    const typeSummary = typeMatch ? typeMatch[1] : undefined;

    // Determinar tipo
    let type: PropInfo['type'] = 'string';
    if (controlType === 'boolean') {
      type = 'boolean';
    } else if (controlType === 'number') {
      type = 'number';
    } else if (controlType === 'object') {
      type = 'object';
    } else if (options) {
      type = 'enum';
    }

    // Extraer category
    const categoryMatch = propContent.match(/category:\s*['"]([^'"]+)['"]/);
    const category = categoryMatch ? categoryMatch[1] : undefined;

    props.push({
      name: propName,
      type,
      controlType: controlType as PropInfo['controlType'],
      options,
      defaultValue,
      description,
      required: false, // Se determinará desde rules.requiredProps
      category,
    });
  }

  return props;
}

/**
 * Extrae historias desde el código
 */
function extractStories(content: string): StoryInfo[] {
  const stories: StoryInfo[] = [];

  // Buscar todas las historias export const
  const storyRegex = /export\s+const\s+(\w+):\s*Story\s*=\s*\{([\s\S]*?)\};/g;
  let storyMatch;

  while ((storyMatch = storyRegex.exec(content)) !== null) {
    const storyName = storyMatch[1];
    const storyContent = storyMatch[2];

    // Extraer name si existe
    const nameMatch = storyContent.match(/name:\s*['"]([^'"]+)['"]/);
    const name = nameMatch ? nameMatch[1] : storyName;

    // Extraer args
    const args = extractArgs(storyContent);

    // Extraer código de parameters.docs.source.code
    const codeMatch = storyContent.match(/code:\s*[`'"]([\s\S]*?)[`'"]/);
    const code = codeMatch ? codeMatch[1].trim() : undefined;

    stories.push({
      name,
      args,
      code,
    });
  }

  return stories;
}

/**
 * Extrae descripción desde parameters.docs
 */
function extractDescription(content: string): string | undefined {
  const descMatch = content.match(
    /description:\s*\{\s*component:\s*['"]([^'"]+)['"]/
  );
  return descMatch ? descMatch[1] : undefined;
}

/**
 * Extrae título desde meta
 */
function extractTitle(content: string): string {
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  return titleMatch ? titleMatch[1] : '';
}

/**
 * Parsea archivo .stories.ts completo
 */
export async function parseStorybookFile(
  componentId: string
): Promise<ParsedStorybook | null> {
  console.log(`📚 [Storybook Parser] Parseando: ${componentId}`);

  // 1. Buscar archivo .stories.ts
  const filePath = await findStoryFile(componentId);
  if (!filePath) {
    console.warn(
      `   ⚠️ Archivo .stories.ts no encontrado para: ${componentId}`
    );
    return null;
  }

  console.log(`   ✅ Archivo encontrado: ${filePath}`);

  // 2. Leer archivo
  const content = await readFile(filePath, 'utf-8');

  // 3. Extraer información
  const contract = extractUBITSContract(content);
  if (!contract) {
    console.warn(`   ⚠️ Contrato UBITS no encontrado`);
    return null;
  }

  const title = extractTitle(content);
  const description = extractDescription(content);
  const defaults = extractArgs(content);
  const props = extractArgTypes(content);
  const stories = extractStories(content);

  // 4. Marcar props requeridas
  if (contract.rules?.requiredProps) {
    props.forEach((prop) => {
      prop.required = contract.rules!.requiredProps!.includes(prop.name);
    });
  }

  // 5. Encontrar código de Implementation story
  const implementationStory = stories.find(
    (s) =>
      s.name === 'Implementation (Copy/Paste)' || s.name === 'Implementation'
  );
  const implementationCode = implementationStory?.code;

  console.log(
    `   ✅ Parseado: ${props.length} props, ${stories.length} historias`
  );

  return {
    componentId: contract.componentId || componentId,
    title,
    description,
    contract,
    props,
    defaults,
    stories,
    implementationCode,
  };
}
