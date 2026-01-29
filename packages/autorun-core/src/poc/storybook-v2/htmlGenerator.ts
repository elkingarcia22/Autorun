/**
 * HTML Generator - POC Storybook V2
 *
 * Genera HTML completo desde código parseado de componentes
 */

import type { ParsedStory } from './codeParser.js';
import type { ComponentFiles } from './fileExtractor.js';
import type { ParsedStorybook } from './storybookParser.js';

export interface GeneratedHTML {
  html: string;
  scripts: string[];
  styles: string[];
  complete: string; // HTML completo listo para usar
}

/**
 * Extrae ejemplos de código del README
 */
function extractExamplesFromReadme(readmeContent: string): string[] {
  const examples: string[] = [];

  // Buscar bloques de código HTML
  const htmlCodeRegex = /```html\n([\s\S]*?)```/g;
  let match;

  while ((match = htmlCodeRegex.exec(readmeContent)) !== null) {
    examples.push(match[1].trim());
  }

  // Buscar bloques de código sin especificar tipo (pueden ser HTML)
  const codeBlockRegex = /```\n([\s\S]*?)```/g;
  while ((match = codeBlockRegex.exec(readmeContent)) !== null) {
    const code = match[1].trim();
    // Si parece HTML (contiene tags), agregarlo
    if (code.includes('<') && code.includes('>')) {
      examples.push(code);
    }
  }

  return examples;
}

/**
 * Extrae información de dependencias del README
 */
function extractDependenciesFromReadme(readmeContent: string): {
  scripts: string[];
  styles: string[];
} {
  const scripts: string[] = [];
  const styles: string[] = [];

  // Buscar links de CSS
  const cssRegex = /<link[^>]*href=["']([^"']*\.css[^"']*)["'][^>]*>/gi;
  let match;
  while ((match = cssRegex.exec(readmeContent)) !== null) {
    styles.push(match[1]);
  }

  // Buscar scripts
  const scriptRegex = /<script[^>]*src=["']([^"']*)["'][^>]*>/gi;
  while ((match = scriptRegex.exec(readmeContent)) !== null) {
    scripts.push(match[1]);
  }

  return { scripts, styles };
}

/**
 * Identifica el nombre de la función de renderizado desde el Provider
 */
function extractRenderFunctionName(providerContent: string): string | null {
  // Buscar export function render*
  const renderFunctionRegex = /export\s+function\s+(render\w+)\s*\(/;
  const match = providerContent.match(renderFunctionRegex);

  if (match) {
    return match[1];
  }

  // Buscar export const render* =
  const renderConstRegex =
    /export\s+const\s+(render\w+)\s*=\s*(?:\([^)]*\)\s*=>|function)/;
  const constMatch = providerContent.match(renderConstRegex);

  if (constMatch) {
    return constMatch[1];
  }

  return null;
}

/**
 * Extrae ejemplo de uso desde el Provider (comentarios o código)
 */
function extractUsageExample(providerContent: string): string | null {
  // Buscar comentarios con ejemplos
  const exampleCommentRegex = /\/\*\*[\s\S]*?@example[\s\S]*?\*\//;
  const match = providerContent.match(exampleCommentRegex);

  if (match) {
    // Extraer código del ejemplo
    const codeMatch = match[0].match(/```[\s\S]*?```/);
    if (codeMatch) {
      return codeMatch[0].replace(/```/g, '').trim();
    }
  }

  return null;
}

/**
 * Genera HTML completo desde archivos del componente
 */
export function generateHTMLFromComponentFiles(
  files: ComponentFiles,
  componentId: string,
  options?: Record<string, any>
): GeneratedHTML {
  console.log(`🔧 [HTML Generator] Generando HTML para: ${componentId}`);

  const scripts: string[] = [];
  const styles: string[] = [];
  let html = '';

  // 1. Intentar obtener HTML desde README (ejemplos)
  if (files.readme) {
    const examples = extractExamplesFromReadme(files.readme.content);
    if (examples.length > 0) {
      html = examples[0]; // Usar el primer ejemplo
      console.log(`   ✅ HTML obtenido desde README`);
    }

    // Extraer dependencias del README
    const deps = extractDependenciesFromReadme(files.readme.content);
    scripts.push(...deps.scripts);
    styles.push(...deps.styles);
  }

  // 2. Si no hay HTML desde README, intentar generar desde Provider
  if (!html && files.provider) {
    const renderFunctionName = extractRenderFunctionName(
      files.provider.content
    );

    if (renderFunctionName) {
      // Generar código JavaScript que llama a la función de renderizado
      const exampleUsage = extractUsageExample(files.provider.content);

      if (exampleUsage) {
        html = exampleUsage;
      } else {
        // Generar HTML básico usando la función de renderizado
        html = generateHTMLFromRenderFunction(
          renderFunctionName,
          options || {}
        );
      }

      console.log(`   ✅ HTML generado desde Provider (${renderFunctionName})`);
    }
  }

  // 3. Si aún no hay HTML, generar HTML básico del componente
  if (!html) {
    html = generateBasicHTML(componentId, options || {});
    console.log(`   ⚠️ HTML básico generado (sin ejemplos encontrados)`);
  }

  // 4. Agregar dependencias comunes de UBITS si no están
  if (styles.length === 0) {
    styles.push(
      '@ubits/tokens/dist/figma-tokens.css',
      '@ubits/tokens/dist/tokens.css',
      `@ubits/${componentId}/styles/${componentId}.css`
    );
  }

  // 5. Generar HTML completo
  const complete = generateCompleteHTML(html, scripts, styles);

  return {
    html,
    scripts,
    styles,
    complete,
  };
}

/**
 * Genera HTML desde función de renderizado
 */
function generateHTMLFromRenderFunction(
  functionName: string,
  options: Record<string, any>
): string {
  // Generar código JavaScript que llama a la función
  const optionsStr = JSON.stringify(options, null, 2);

  return `
<script type="module">
  import { ${functionName} } from '@ubits/${functionName.replace('render', '').toLowerCase()}';
  
  const html = ${functionName}(${optionsStr});
  document.body.innerHTML = html;
</script>
  `.trim();
}

/**
 * Genera HTML básico del componente
 */
function generateBasicHTML(
  componentId: string,
  options: Record<string, any>
): string {
  // Normalizar componentId para tag (ej: "data-data-table" -> "ubits-data-table")
  const tagName = componentId.startsWith('ubits-')
    ? componentId
    : `ubits-${componentId.replace(/^(data-|basicos-|navegacion-)/, '')}`;

  // Generar atributos desde options
  const attributes = Object.entries(options)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? key : '';
      }
      return `${key}="${value}"`;
    })
    .filter(Boolean)
    .join(' ');

  return `<${tagName} ${attributes}></${tagName}>`;
}

/**
 * Genera HTML completo con todas las dependencias
 */
function generateCompleteHTML(
  componentHTML: string,
  scripts: string[],
  styles: string[]
): string {
  const stylesHTML = styles
    .map((style) => `<link rel="stylesheet" href="${style}">`)
    .join('\n  ');

  const scriptsHTML = scripts
    .map((script) => `<script src="${script}"></script>`)
    .join('\n  ');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component Preview</title>
  ${stylesHTML}
</head>
<body>
  ${componentHTML}
  ${scriptsHTML}
</body>
</html>`;
}

/**
 * Genera HTML desde código parseado (compatibilidad con parser anterior)
 */
export function generateHTMLFromStory(
  parsedStory: ParsedStory,
  componentId: string
): GeneratedHTML {
  // Si ya tiene HTML, usarlo directamente
  if (parsedStory.html) {
    return {
      html: parsedStory.html,
      scripts: parsedStory.imports || [],
      styles: [],
      complete: generateCompleteHTML(
        parsedStory.html,
        parsedStory.imports || [],
        []
      ),
    };
  }

  // Si tiene código JavaScript, generar HTML que lo ejecute
  if (parsedStory.js) {
    const html = `<script type="module">\n${parsedStory.js}\n</script>`;
    return {
      html,
      scripts: parsedStory.imports || [],
      styles: [],
      complete: generateCompleteHTML(html, parsedStory.imports || [], []),
    };
  }

  // Fallback: HTML básico
  return {
    html: generateBasicHTML(componentId, parsedStory.props || {}),
    scripts: [],
    styles: [],
    complete: generateCompleteHTML(
      generateBasicHTML(componentId, parsedStory.props || {}),
      [],
      []
    ),
  };
}
