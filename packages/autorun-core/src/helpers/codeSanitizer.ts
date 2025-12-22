/**
 * ✅ Code Sanitizer - Sanitiza código extraído de Storybook
 *
 * Reemplaza colores hardcodeados con tokens cuando sea posible
 * Valida que no queden colores hardcodeados después de sanitizar
 */

import { GlobalTokenRegistry } from '../tokens/GlobalTokenRegistry.js';

export interface SanitizeResult {
  sanitized: string;
  replaced: number;
  errors: string[];
  warnings: string[];
}

/**
 * ✅ Sanitiza código HTML/CSS reemplazando colores hardcodeados con tokens
 */
export async function sanitizeCodeFromStorybook(
  code: string,
  registry: GlobalTokenRegistry
): Promise<SanitizeResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  let replaced = 0;
  let sanitized = code;

  // ✅ 1. Detectar colores hardcodeados
  const hardcodedColors = detectHardcodedColorsInCode(sanitized);

  if (hardcodedColors.length === 0) {
    return {
      sanitized,
      replaced: 0,
      errors: [],
      warnings: [],
    };
  }

  console.log(
    `   🔍 [Code Sanitizer] Detectados ${hardcodedColors.length} colores hardcodeados`
  );

  // ✅ 2. Intentar reemplazar con tokens similares
  for (const colorInfo of hardcodedColors) {
    const { color, context, lineNum } = colorInfo;

    // Intentar encontrar token similar
    const suggestedToken = await suggestTokenForColor(color, registry);

    if (suggestedToken) {
      // Reemplazar color con token
      const beforeReplace = sanitized;
      sanitized = sanitized.replace(color, `var(${suggestedToken})`);

      if (beforeReplace !== sanitized) {
        replaced++;
        console.log(
          `   ✅ [Code Sanitizer] Reemplazado ${color} → var(${suggestedToken}) en línea ${lineNum}`
        );
      }
    } else {
      // No se pudo encontrar token similar
      errors.push(
        `Línea ${lineNum}: Color hardcodeado no reemplazable: ${color} (contexto: ${context})`
      );
      warnings.push(
        `No se encontró token similar para ${color}, requiere revisión manual`
      );
    }
  }

  // ✅ 3. Validar que no queden colores hardcodeados
  const remainingColors = detectHardcodedColorsInCode(sanitized);
  if (remainingColors.length > 0) {
    errors.push(
      `Aún quedan ${remainingColors.length} colores hardcodeados después de sanitizar. Requiere revisión manual.`
    );
  }

  return {
    sanitized,
    replaced,
    errors,
    warnings,
  };
}

/**
 * ✅ Detecta colores hardcodeados en código HTML/CSS
 */
function detectHardcodedColorsInCode(code: string): Array<{
  color: string;
  context: string;
  lineNum: number;
}> {
  const colors: Array<{ color: string; context: string; lineNum: number }> = [];
  const lines = code.split('\n');

  // Patrones de colores hardcodeados
  const patterns = [
    { regex: /(#[0-9a-fA-F]{3,8})/g, name: 'hex' },
    { regex: /(rgb\s*\([^)]+\))/gi, name: 'rgb' },
    { regex: /(rgba\s*\([^)]+\))/gi, name: 'rgba' },
    { regex: /(hsl\s*\([^)]+\))/gi, name: 'hsl' },
    { regex: /(hsla\s*\([^)]+\))/gi, name: 'hsla' },
    { regex: /\b(white|black)\b/gi, name: 'keyword' },
  ];

  // Keywords seguras permitidas
  const safeKeywords = new Set([
    'transparent',
    'currentColor',
    'inherit',
    'initial',
    'unset',
  ]);

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];

    // Verificar si la línea contiene CSS (dentro de <style> o style="...")
    const hasStyle = /style\s*=\s*["']/.test(line) || /<style[^>]*>/.test(line);

    if (!hasStyle) {
      continue; // No es CSS, ignorar
    }

    for (const { regex, name } of patterns) {
      regex.lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(line)) !== null) {
        const color = match[1] || match[0];
        const matchIndex = match.index;

        // Verificar si está dentro de var()
        const beforeMatch = line.substring(0, matchIndex);
        const lastVar = beforeMatch.lastIndexOf('var(');
        const lastClose = beforeMatch.lastIndexOf(')');

        // Si está dentro de var(), verificar fallback
        if (lastVar > lastClose) {
          const varContent = line.substring(lastVar);
          const varMatch = varContent.match(
            /var\s*\(\s*--[\w-]+,\s*([^)]+)\s*\)/
          );

          if (varMatch) {
            const fallback = varMatch[1].trim();

            // Si es keyword segura, permitir
            if (safeKeywords.has(fallback.toLowerCase())) {
              continue;
            }

            // Si es color hardcodeado en fallback, reportar
            if (name === 'keyword' && !safeKeywords.has(color.toLowerCase())) {
              colors.push({
                color,
                context: `fallback en var()`,
                lineNum,
              });
            } else if (name !== 'keyword') {
              colors.push({
                color,
                context: `fallback en var()`,
                lineNum,
              });
            }
          }
        } else {
          // No está dentro de var(), es hardcoded directo
          // Para keywords, verificar que no sea segura
          if (name === 'keyword' && !safeKeywords.has(color.toLowerCase())) {
            colors.push({
              color,
              context: `directo`,
              lineNum,
            });
          } else if (name !== 'keyword') {
            colors.push({
              color,
              context: `directo`,
              lineNum,
            });
          }
        }
      }
    }
  }

  return colors;
}

/**
 * ✅ Sugiere un token similar para un color dado
 */
async function suggestTokenForColor(
  color: string,
  registry: GlobalTokenRegistry
): Promise<string | null> {
  // Normalizar color a formato comparable
  const normalizedColor = normalizeColor(color);

  if (!normalizedColor) {
    return null;
  }

  // Buscar tokens de color en el registro
  const allTokens = registry.getAll();
  const colorTokens = allTokens.filter((token) => {
    // Buscar tokens relacionados con colores
    return (
      token.includes('color') ||
      token.includes('bg') ||
      token.includes('fg') ||
      token.includes('accent') ||
      token.includes('border')
    );
  });

  // Por ahora, retornar null (no hay mapeo de colores a tokens)
  // TODO: Implementar mapeo inteligente de colores a tokens
  // Esto requeriría conocer los valores de los tokens para comparar

  return null;
}

/**
 * ✅ Normaliza un color a formato comparable
 */
function normalizeColor(color: string): string | null {
  // Normalizar hex
  if (/^#[0-9a-fA-F]{3,8}$/.test(color)) {
    return color.toLowerCase();
  }

  // Normalizar rgb/rgba
  const rgbMatch = color.match(/rgba?\(([^)]+)\)/i);
  if (rgbMatch) {
    return color.toLowerCase();
  }

  // Normalizar hsl/hsla
  const hslMatch = color.match(/hsla?\(([^)]+)\)/i);
  if (hslMatch) {
    return color.toLowerCase();
  }

  // Keywords
  if (
    /^(white|black|transparent|currentColor|inherit|initial|unset)$/i.test(
      color
    )
  ) {
    return color.toLowerCase();
  }

  return null;
}
