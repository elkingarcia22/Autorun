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
  function findCodeInNode(node: SnapshotNode): void {
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
        text.includes('Input')
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
      if (
        name.includes('window.UBITS') ||
        name.includes('create(') ||
        (name.includes('<') && name.includes('>'))
      ) {
        const cleaned = name.trim();
        if (cleaned.length > 10 && !codeBlocks.includes(cleaned)) {
          codeBlocks.push(cleaned);
        }
      }
    }

    // Buscar recursivamente en children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child) => findCodeInNode(child));
    }
  }

  // Buscar código en todos los nodos
  nodes.forEach((node) => findCodeInNode(node));

  // Si encontramos código, procesarlo
  if (codeBlocks.length > 0) {
    // Priorizar código que contenga "implementation" o "window.UBITS"
    const implementationCode = codeBlocks.find(
      (code) => code.includes('implementation') || code.includes('window.UBITS')
    );

    const code = implementationCode || codeBlocks[0];

    // Parsear código
    return parseCodeFromText(code);
  }

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
