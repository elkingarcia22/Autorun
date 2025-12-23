/**
 * Code Parser - POC Storybook V2
 *
 * Parsea código de historias desde archivos .stories.ts
 */

export interface ParsedStory {
  name: string;
  code: string;
  props?: Record<string, any>;
  imports?: string[];
  html?: string;
  js?: string;
  type: 'html' | 'jsx' | 'javascript';
}

/**
 * Extrae imports del código TypeScript
 */
function extractImports(content: string): string[] {
  const imports: string[] = [];
  const importRegex = /^import\s+.*?from\s+['"](.+?)['"];?$/gm;

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

/**
 * Busca historia específica en el código
 */
function findStoryInCode(content: string, storyName: string): string | null {
  // Buscar export const StoryName
  const storyRegex = new RegExp(
    `export\\s+const\\s+${storyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*[:=]\\s*({[\\s\\S]*?});`,
    'm'
  );

  const match = content.match(storyRegex);
  if (match) {
    return match[1];
  }

  // Buscar en formato Story = { ... }
  const altRegex = new RegExp(
    `(?:export\\s+)?const\\s+${storyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*[:=]\\s*({[\\s\\S]*?});`,
    'm'
  );

  const altMatch = content.match(altRegex);
  if (altMatch) {
    return altMatch[1];
  }

  return null;
}

/**
 * Extrae código de implementación desde parámetros de la historia
 */
function extractCodeFromStoryParams(storyContent: string): string | null {
  // Buscar parameters.docs.source.code
  const codeRegex =
    /parameters:\s*\{[^}]*docs:\s*\{[^}]*source:\s*\{[^}]*code:\s*['"`]([\s\S]*?)['"`]/;
  const match = storyContent.match(codeRegex);

  if (match) {
    return match[1].trim();
  }

  // Buscar render function
  const renderRegex = /render:\s*(?:\([^)]*\)\s*=>\s*)?([\s\S]*?)(?:,|\})/;
  const renderMatch = storyContent.match(renderRegex);

  if (renderMatch) {
    return renderMatch[1].trim();
  }

  return null;
}

/**
 * Extrae props desde args de la historia
 */
function extractPropsFromStory(storyContent: string): Record<string, any> {
  const props: Record<string, any> = {};

  // Buscar args: { ... }
  const argsRegex = /args:\s*\{([^}]*)\}/;
  const argsMatch = storyContent.match(argsRegex);

  if (argsMatch) {
    const argsContent = argsMatch[1];
    // Parsear propiedades básicas (simplificado)
    const propRegex = /(\w+):\s*([^,}]+)/g;
    let propMatch;

    while ((propMatch = propRegex.exec(argsContent)) !== null) {
      const key = propMatch[1].trim();
      const value = propMatch[2].trim();
      props[key] = value;
    }
  }

  return props;
}

/**
 * Identifica el tipo de código (HTML, JSX, JavaScript)
 */
function identifyCodeType(code: string): 'html' | 'jsx' | 'javascript' {
  if (code.includes('<') && code.includes('>')) {
    return code.includes('className') || code.includes('onClick')
      ? 'jsx'
      : 'html';
  }
  return 'javascript';
}

/**
 * Parsea código de una historia específica
 */
export function parseStoryCode(
  storyContent: string,
  storyName: string
): ParsedStory | null {
  console.log(`📝 [Code Parser] Parseando historia: ${storyName}`);

  // Buscar historia en el código
  const storyCode = findStoryInCode(storyContent, storyName);

  if (!storyCode) {
    console.warn(`   ⚠️ Historia "${storyName}" no encontrada`);
    return null;
  }

  // Extraer código de implementación
  const code = extractCodeFromStoryParams(storyCode) || storyCode;

  if (!code) {
    console.warn(`   ⚠️ No se pudo extraer código de la historia`);
    return null;
  }

  // Extraer props
  const props = extractPropsFromStory(storyCode);

  // Extraer imports
  const imports = extractImports(storyContent);

  // Identificar tipo de código
  const type = identifyCodeType(code);

  // Separar HTML y JS si es necesario
  let html: string | undefined;
  let js: string | undefined;

  if (type === 'html' || type === 'jsx') {
    html = code;
  } else {
    js = code;
  }

  console.log(
    `   ✅ Código parseado: ${code.length} caracteres, tipo: ${type}`
  );

  return {
    name: storyName,
    code,
    props,
    imports,
    html,
    js,
    type,
  };
}
