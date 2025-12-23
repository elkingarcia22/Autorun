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
    if (depth > 20) return;

    // Buscar en elementos con role="text" que contengan código
    if (node.role === 'text' || node.role === 'code') {
      const text = node.text || node.value || node.name || '';

      // Verificar si contiene código (HTML, JS, etc.)
      if (
        text.includes('<') ||
        text.includes('window.UBITS') ||
        text.includes('create(') ||
        text.includes('Button') ||
        text.includes('Drawer') ||
        text.includes('Input') ||
        text.includes('variant:') ||
        text.includes('size:') ||
        text.includes('text:')
      ) {
        // Limpiar el texto (remover espacios extra, etc.)
        const cleaned = text.trim();
        if (cleaned.length > 10) {
          // Evitar duplicados
          if (!codeBlocks.includes(cleaned)) {
            codeBlocks.push(cleaned);
          }
        }
      }
    }

    // Buscar en name también (puede contener código)
    if (node.name) {
      const name = node.name;
      // Buscar código JavaScript (window.UBITS.Button.create)
      if (
        name.includes('window.UBITS') ||
        name.includes('create(') ||
        (name.includes('<') && name.includes('>')) ||
        (name.includes('{') && name.includes('variant'))
      ) {
        const cleaned = name.trim();
        if (cleaned.length > 10 && !codeBlocks.includes(cleaned)) {
          codeBlocks.push(cleaned);
        }
      }
    }

    // Buscar en value también
    if (node.value) {
      const value = node.value;
      if (
        value.includes('window.UBITS') ||
        value.includes('create(') ||
        (value.includes('<') && value.includes('>'))
      ) {
        const cleaned = value.trim();
        if (cleaned.length > 10 && !codeBlocks.includes(cleaned)) {
          codeBlocks.push(cleaned);
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

    // Priorizar código que contenga "implementation" o "window.UBITS"
    const implementationCode = codeBlocks.find(
      (code) => code.includes('implementation') || code.includes('window.UBITS')
    );

    // Si no hay código de implementation, buscar código más completo
    const bestCode =
      implementationCode ||
      codeBlocks.find(
        (code) => code.includes('window.UBITS') || code.includes('create(')
      ) ||
      codeBlocks.find((code) => code.length > 50) ||
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
