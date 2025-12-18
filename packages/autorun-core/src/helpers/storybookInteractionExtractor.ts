/**
 * Storybook Interaction Extractor
 *
 * Extrae información sobre cómo interactuar con el componente
 * (cómo abrir/cerrar modales, cómo activar componentes, etc.)
 */

import {
  extractExactCodeFromStorybook,
  getSourceCode,
} from './storybookExactCodeExtractor.js';
import { InteractionInfo } from './storybookCache';

/**
 * Extrae información de interacción desde Storybook
 * (cómo abrir/cerrar, qué métodos usar, etc.)
 */
export async function extractInteractionInfo(
  componentId: string
): Promise<InteractionInfo | null> {
  console.log(
    `🔍 [Interaction Extractor] Extrayendo información de interacción para: ${componentId}`
  );

  try {
    // 1. Obtener código exacto desde Storybook
    const exactCode = await extractExactCodeFromStorybook(
      componentId,
      'default'
    ).catch(() => null);

    // 2. Obtener código fuente real
    const sourceCode = await getSourceCode(componentId).catch(() => null);

    // 3. Extraer patrones de interacción
    const interactionInfo: InteractionInfo = {};

    // Para modales: buscar cómo se abre/cierra
    if (componentId.includes('modal') || componentId === 'modal') {
      const openPattern = extractOpenPattern(exactCode?.html, sourceCode);
      const closePattern = extractClosePattern(exactCode?.html, sourceCode);

      if (openPattern) {
        interactionInfo.openMethod = openPattern;
        console.log(
          `✅ [Interaction Extractor] Método de apertura encontrado: ${openPattern}`
        );
      }

      if (closePattern) {
        interactionInfo.closeMethod = closePattern;
        console.log(
          `✅ [Interaction Extractor] Método de cierre encontrado: ${closePattern}`
        );
      }

      // Validar que NO se use data-open
      if (
        openPattern &&
        (openPattern.includes('data-open') ||
          openPattern.includes('setAttribute'))
      ) {
        interactionInfo.warnings = interactionInfo.warnings || [];
        interactionInfo.warnings.push(
          `⚠️ Modal NO debe usar 'data-open'. Debe usar clase 'ubits-modal-overlay--open'`
        );
      }

      // Validar que se use la clase correcta
      if (
        openPattern &&
        !openPattern.includes('ubits-modal-overlay--open') &&
        !openPattern.includes('classList.add')
      ) {
        interactionInfo.warnings = interactionInfo.warnings || [];
        interactionInfo.warnings.push(
          `⚠️ Modal debe usar 'classList.add("ubits-modal-overlay--open")' para abrir`
        );
      }
    }

    // Para otros componentes, extraer patrones similares
    // (se puede extender según sea necesario)

    return interactionInfo;
  } catch (error: any) {
    console.warn(
      `⚠️ [Interaction Extractor] Error extrayendo información: ${error.message}`
    );
    return null;
  }
}

/**
 * Extrae patrón de apertura desde código
 */
function extractOpenPattern(html?: string, sourceCode?: string): string | null {
  // Buscar en código fuente primero (más confiable)
  if (sourceCode) {
    // Buscar classList.add con ubits-modal-overlay--open
    const classListAddMatch = sourceCode.match(
      /classList\.add\(['"]ubits-modal-overlay--open['"]\)/i
    );
    if (classListAddMatch) {
      return 'classList.add("ubits-modal-overlay--open")';
    }

    // Buscar otros patrones de apertura
    const openMatch = sourceCode.match(
      /(?:open|show|display).*?modal.*?overlay.*?open/gi
    );
    if (openMatch) {
      return openMatch[0];
    }
  }

  // Buscar en HTML si no se encontró en código fuente
  if (html) {
    // Buscar onclick o event listeners que abran el modal
    const onclickMatch = html.match(
      /onclick=["']([^"']*?ubits-modal-overlay--open[^"']*?)["']/i
    );
    if (onclickMatch) {
      return onclickMatch[1];
    }
  }

  return null;
}

/**
 * Extrae patrón de cierre desde código
 */
function extractClosePattern(
  html?: string,
  sourceCode?: string
): string | null {
  // Buscar en código fuente primero (más confiable)
  if (sourceCode) {
    // Buscar classList.remove con ubits-modal-overlay--open
    const classListRemoveMatch = sourceCode.match(
      /classList\.remove\(['"]ubits-modal-overlay--open['"]\)/i
    );
    if (classListRemoveMatch) {
      return 'classList.remove("ubits-modal-overlay--open")';
    }

    // Buscar otros patrones de cierre
    const closeMatch = sourceCode.match(
      /(?:close|hide|remove).*?modal.*?overlay.*?open/gi
    );
    if (closeMatch) {
      return closeMatch[0];
    }
  }

  // Buscar en HTML si no se encontró en código fuente
  if (html) {
    // Buscar onclick o event listeners que cierren el modal
    const onclickMatch = html.match(
      /onclick=["']([^"']*?remove.*?ubits-modal-overlay--open[^"']*?)["']/i
    );
    if (onclickMatch) {
      return onclickMatch[1];
    }
  }

  return null;
}
