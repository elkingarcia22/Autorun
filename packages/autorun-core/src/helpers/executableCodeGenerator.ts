/**
 * Executable Code Generator
 *
 * Convierte snippets de Storybook en código ejecutable completo
 * con lógica de espera, integración con flujo de inicialización, etc.
 */

export interface ExecutableCodeOptions {
  snippet: string;
  componentName: string;
  containerId: string;
  apiName: string;
  storybookId?: string;
}

/**
 * Convierte un snippet de Storybook en código ejecutable completo
 */
export function generateExecutableCode(options: ExecutableCodeOptions): {
  containerHTML: string;
  executableScript: string;
} {
  const { snippet, componentName, containerId, apiName } = options;

  // 1. Extraer contenedor HTML del snippet
  const containerMatch = snippet.match(/<div[^>]*id=["']([^"']+)["'][^>]*>/);
  const extractedContainerId = containerMatch ? containerMatch[1] : containerId;

  // 2. Generar HTML del contenedor
  const containerHTML = containerMatch
    ? containerMatch[0]
    : `<div id="${extractedContainerId}" style="padding: var(--ubits-spacing-xl, 20px) 0;"></div>`;

  // 3. Extraer código JavaScript del snippet
  // Remover comentarios de pasos numerados y contenedor HTML
  let jsCode = snippet
    .replace(/\/\/\s*[0-9]+\.\s*Crear contenedor HTML[\s\S]*?<\/div>/g, '')
    .replace(
      /\/\/\s*[0-9]+\.\s*Crear\s+[A-Z][a-z]+[\s\S]*?\/\/\s*[0-9]+\.\s*/g,
      ''
    )
    .replace(/\/\/\s*[0-9]+\.\s*/g, '')
    .replace(/<div[^>]*id=["'][^"']+["'][^>]*>[\s\S]*?<\/div>/g, '')
    .trim();

  // 4. Limpiar código JavaScript adicional (ejemplos, notas)
  jsCode = jsCode
    .replace(/\/\/\s*Nota:[\s\S]*$/gm, '')
    .replace(/\/\/\s*Ejemplo[\s\S]*$/gm, '')
    .trim();

  // 5. Generar función de inicialización automática
  const functionName = `create${componentName.charAt(0).toUpperCase() + componentName.slice(1).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}`;

  // 6. Construir código ejecutable completo
  const executableScript = `
// ========================================
// CREAR ${componentName.toUpperCase()} - GENERADO AUTOMÁTICAMENTE POR AUTORUN
// ========================================
function ${functionName}() {
  const container = document.getElementById('${extractedContainerId}');
  if (!container) {
    console.warn('⚠️ [${componentName}] Contenedor no encontrado: ${extractedContainerId}');
    return;
  }
  
  // Verificar que la API esté disponible
  const apiPath = '${apiName}'.split('.');
  let api = window;
  for (const part of apiPath) {
    if (api[part] === undefined) {
      console.warn('⚠️ [${componentName}] ${apiName} no está disponible, esperando...');
      setTimeout(${functionName}, 500);
      return;
    }
    api = api[part];
  }
  
  try {
    // Código extraído de Storybook
    ${jsCode}
    
    console.log('✅ [${componentName}] ${componentName} creado exitosamente usando ${apiName}');
    
    // Registrar para preservación automática
    if (window.AUTORUN_PRESERVE_COMPONENTS) {
      window.AUTORUN_PRESERVE_COMPONENTS.register('${componentName}', '${extractedContainerId}', {
        onClick: (e) => {
          console.log('📋 [${componentName}] ${componentName} clickeado');
        }
      });
    }
  } catch (error) {
    console.error('❌ [${componentName}] Error al crear ${componentName}:', error);
    console.error('   Stack:', error.stack);
  }
}

// Ejecutar después de que los componentes estén cargados
setTimeout(${functionName}, 500);
`;

  return {
    containerHTML,
    executableScript: executableScript.trim(),
  };
}

/**
 * Extrae el contenedor HTML del snippet
 */
export function extractContainerFromSnippet(snippet: string): {
  containerId: string;
  containerHTML: string;
} {
  const containerMatch = snippet.match(/<div[^>]*id=["']([^"']+)["'][^>]*>/);

  if (containerMatch) {
    return {
      containerId: containerMatch[1],
      containerHTML: containerMatch[0],
    };
  }

  // Si no hay contenedor, generar uno por defecto
  const defaultId = 'component-implementation-container';
  return {
    containerId: defaultId,
    containerHTML: `<div id="${defaultId}"></div>`,
  };
}

/**
 * Limpia el snippet de Storybook para extraer solo el código JavaScript
 */
export function cleanSnippetForExecution(snippet: string): string {
  return (
    snippet
      // Remover comentarios de pasos
      .replace(/\/\/\s*[0-9]+\.\s*/g, '')
      // Remover contenedor HTML
      .replace(/<div[^>]*>[\s\S]*?<\/div>/g, '')
      // Remover notas y ejemplos
      .replace(/\/\/\s*Nota:[\s\S]*$/gm, '')
      .replace(/\/\/\s*Ejemplo[\s\S]*$/gm, '')
      .trim()
  );
}
