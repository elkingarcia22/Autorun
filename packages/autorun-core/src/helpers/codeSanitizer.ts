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
 * ✅ MEJORA: Sugiere un token similar para un color dado usando mapeo inteligente
 */
async function suggestTokenForColor(
  color: string,
  registry: GlobalTokenRegistry
): Promise<string | null> {
  // Normalizar color a formato RGB comparable
  const normalizedRGB = normalizeColorToRGB(color);

  if (!normalizedRGB) {
    return null;
  }

  // Obtener valores de tokens desde CSS
  const tokenValues = await registry.getTokenValues();

  // Buscar tokens de color
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

  // Calcular distancia de color para cada token
  const candidates: Array<{ token: string; distance: number }> = [];

  for (const token of colorTokens) {
    const tokenValue = tokenValues.get(token);
    if (!tokenValue) continue;

    // Normalizar valor del token a RGB
    const tokenRGB = normalizeColorToRGB(tokenValue);
    if (!tokenRGB) continue;

    // Calcular distancia euclidiana en espacio RGB
    const distance = colorDistance(normalizedRGB, tokenRGB);
    candidates.push({ token, distance });
  }

  // Ordenar por distancia (más cercano primero)
  candidates.sort((a, b) => a.distance - b.distance);

  // Retornar el token más cercano si la distancia es razonable (< 50 en espacio RGB)
  if (candidates.length > 0 && candidates[0].distance < 50) {
    return candidates[0].token;
  }

  return null;
}

/**
 * ✅ Normaliza un color a RGB para comparación
 */
function normalizeColorToRGB(
  color: string
): { r: number; g: number; b: number } | null {
  // Hex
  const hexMatch = color.match(/^#([0-9a-fA-F]{3,8})$/);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 3) {
      // #RGB -> #RRGGBB
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return { r, g, b };
    } else if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return { r, g, b };
    }
  }

  // RGB/RGBA
  const rgbMatch = color.match(/rgba?\(([^)]+)\)/i);
  if (rgbMatch) {
    const values = rgbMatch[1].split(',').map((v) => parseFloat(v.trim()));
    if (values.length >= 3) {
      return {
        r: Math.round(values[0]),
        g: Math.round(values[1]),
        b: Math.round(values[2]),
      };
    }
  }

  // HSL/HSLA (convertir a RGB)
  const hslMatch = color.match(/hsla?\(([^)]+)\)/i);
  if (hslMatch) {
    const values = hslMatch[1].split(',').map((v) => parseFloat(v.trim()));
    if (values.length >= 3) {
      return hslToRgb(values[0], values[1], values[2]);
    }
  }

  // Keywords conocidos
  const keywordColors: Record<string, { r: number; g: number; b: number }> = {
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0, g: 0, b: 0 },
    red: { r: 255, g: 0, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
  };

  const lowerColor = color.toLowerCase();
  if (keywordColors[lowerColor]) {
    return keywordColors[lowerColor];
  }

  return null;
}

/**
 * ✅ Convierte HSL a RGB
 */
function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/**
 * ✅ Calcula distancia euclidiana entre dos colores RGB
 */
function colorDistance(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
): number {
  const dr = color1.r - color2.r;
  const dg = color1.g - color2.g;
  const db = color1.b - color2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
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
