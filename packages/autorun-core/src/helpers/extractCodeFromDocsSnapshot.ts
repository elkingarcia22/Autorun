/**
 * Extrae código desde snapshot del Browser MCP después de navegar a Docs
 *
 * ✅ NUEVO: Implementación de extracción desde snapshot
 */

export interface SnapshotNode {
  role?: string;
  name?: string;
  ref?: string;
  value?: string;
  text?: string;
  children?: SnapshotNode[];
}

/**
 * Extrae código desde snapshot del Browser MCP
 *
 * Busca código en elementos con role="text" que contengan código HTML/JS
 */
export function extractCodeFromDocsSnapshot(
  snapshot: SnapshotNode | SnapshotNode[]
): { html: string; js?: string; found: boolean } {
  const nodes = Array.isArray(snapshot) ? snapshot : [snapshot];

  // Buscar código en el snapshot
  const codeBlocks: string[] = [];

  // Función recursiva para buscar código
  function findCodeInNode(node: SnapshotNode, depth: number = 0): void {
    // Limitar profundidad para evitar bucles infinitos
    if (depth > 30) return;

    // ⚠️ MEJORADO: Buscar en todos los campos posibles
    const allText = [
      node.text,
      node.value,
      node.name,
      // También buscar en atributos si existen
      (node as any).description,
      (node as any).label,
    ]
      .filter(Boolean)
      .join(' ');

    // ⚠️ MEJORADO: Buscar código con patrones más amplios
    const codePatterns = [
      /window\.UBITS\.\w+\.create/,
      /window\.create\w+/,
      /containerId\s*:/,
      /label\s*:/,
      /value\s*:/,
      /name\s*:/,
      /checked\s*:/,
      /size\s*:/,
      /state\s*:/,
      /disabled\s*:/,
      /onChange\s*:/,
      /<div[^>]*id="[^"]*container[^"]*"/,
      /<div[^>]*id="[^"]*radio[^"]*"/,
      /RadioButton/,
      /createRadioButton/,
    ];

    const hasCode = codePatterns.some((pattern) => pattern.test(allText));

    if (hasCode && allText.trim().length > 20) {
      // ⚠️ MEJORADO: Extraer bloques de código completos
      // Buscar bloques que contengan múltiples propiedades
      const codeBlock = allText.trim();

      // Verificar que sea un bloque de código válido (no solo un fragmento)
      const isCompleteCodeBlock =
        codeBlock.includes('containerId') ||
        codeBlock.includes('window.UBITS') ||
        codeBlock.includes('create(') ||
        (codeBlock.includes('label') && codeBlock.includes('value'));

      if (isCompleteCodeBlock && !codeBlocks.includes(codeBlock)) {
        codeBlocks.push(codeBlock);
      }
    }

    // Buscar en elementos con role="text" o "code" específicamente
    if (node.role === 'text' || node.role === 'code') {
      const text = node.text || node.value || node.name || '';

      // Verificar si contiene código (HTML, JS, etc.)
      if (
        text.includes('window.UBITS') ||
        text.includes('create(') ||
        text.includes('containerId') ||
        text.includes('RadioButton') ||
        (text.includes('label') && text.includes('value'))
      ) {
        const cleaned = text.trim();
        if (cleaned.length > 20) {
          // Evitar duplicados
          if (!codeBlocks.includes(cleaned)) {
            codeBlocks.push(cleaned);
          }
        }
      }
    }

    // Buscar recursivamente en children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child) => findCodeInNode(child, depth + 1));
    }
  }

  // Buscar código en todos los nodos
  nodes.forEach((node) => findCodeInNode(node));

  // Si encontramos código, procesarlo
  if (codeBlocks.length > 0) {
    console.log(
      `   📋 Encontrados ${codeBlocks.length} bloque(s) de código en el snapshot`
    );

    // ⚠️ MEJORADO: Priorizar código más completo y específico
    // 1. Código que contenga "implementation" y "window.UBITS"
    const implementationCode = codeBlocks.find(
      (code) =>
        (code.includes('implementation') || code.includes('Implementation')) &&
        code.includes('window.UBITS')
    );

    // 2. Código que contenga "window.UBITS" y múltiples props
    const completeCode = codeBlocks.find(
      (code) =>
        code.includes('window.UBITS') &&
        (code.includes('containerId') ||
          code.includes('label') ||
          code.includes('value'))
    );

    // 3. Código que contenga "containerId" (indica código completo)
    const containerIdCode = codeBlocks.find((code) =>
      code.includes('containerId')
    );

    // 4. Código más largo (probablemente más completo)
    const longestCode = codeBlocks.reduce((longest, current) =>
      current.length > longest.length ? current : longest
    );

    // Priorizar: implementation > complete > containerId > longest
    const bestCode =
      implementationCode ||
      completeCode ||
      containerIdCode ||
      longestCode ||
      codeBlocks[0];

    console.log(`   📋 Usando código de ${bestCode.length} caracteres`);

    // Parsear código
    return parseCodeFromText(bestCode);
  }

  console.warn(`   ⚠️ No se encontraron bloques de código en el snapshot`);
  return { html: '', found: false };
}

/**
 * Parsea código desde texto extraído del snapshot
 */
function parseCodeFromText(text: string): {
  html: string;
  js?: string;
  found: boolean;
} {
  // Limpiar el texto
  let cleaned = text.trim();

  // Remover prefijos/sufijos comunes
  cleaned = cleaned
    .replace(/^Copy\s*/i, '')
    .replace(/^Hide code\s*/i, '')
    .replace(/^Show code\s*/i, '')
    .trim();

  // Si es código JavaScript puro
  if (cleaned.includes('window.UBITS') || cleaned.includes('create(')) {
    // Extraer código JS
    const jsMatch = cleaned.match(/(\{[\s\S]*\})/);
    if (jsMatch) {
      return { html: '', js: jsMatch[1], found: true };
    }
    return { html: '', js: cleaned, found: true };
  }

  // Si es código HTML
  if (cleaned.includes('<') && cleaned.includes('>')) {
    // Extraer HTML
    const htmlMatch = cleaned.match(/(<[\s\S]*>)/);
    if (htmlMatch) {
      return { html: htmlMatch[1], found: true };
    }
    return { html: cleaned, found: true };
  }

  return { html: '', found: false };
}
