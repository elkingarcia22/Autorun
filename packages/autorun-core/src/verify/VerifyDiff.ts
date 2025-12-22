import { spawn } from 'child_process';
import * as fs from 'fs/promises';
import { parseWatermarks, validateHash, type WatermarkBlock } from './Watermark';
import { getGlobalTokenRegistry } from '../tokens/GlobalTokenRegistry';

export interface VerifyDiffOptions {
  strict?: boolean;
  checkWatermarks?: boolean;
  checkHash?: boolean;
  checkHardcodedColors?: boolean;
  checkTokens?: boolean;
  
  // ✅ CI-Breaker #1 Fix: Soporte para CI y pre-commit
  staged?: boolean;        // pre-commit: validar staged changes
  baseRef?: string;        // CI/PR: comparar contra base (ej: origin/main)
}

export interface VerifyDiffOutput {
  valid: boolean;
  errors: string[];
  warnings: string[];
  files: Array<{
    path: string;
    hasWatermark: boolean;
    isValid: boolean;
    issues: string[];
  }>;
}

/**
 * ✅ Verifica cambios usando git diff (diff-based)
 */
export async function verifyDiff(options: VerifyDiffOptions = {}): Promise<VerifyDiffOutput> {
  // ✅ 1. Obtener git diff hunks (líneas modificadas)
  const diffHunks = await getGitDiffHunks(options);
  
  const results: VerifyDiffOutput = {
    valid: true,
    errors: [],
    warnings: [],
    files: []
  };

  const registry = await getGlobalTokenRegistry();

  // ✅ 2. Para cada archivo modificado
  const filesToCheck = new Set(diffHunks.map(h => h.file));
  
  for (const filePath of filesToCheck) {
    const fileHunks = diffHunks.filter(h => h.file === filePath);
    const fileResult = await verifyFile(filePath, fileHunks, options, registry);
    
    results.files.push(fileResult);
    
    if (!fileResult.isValid) {
      results.valid = false;
      results.errors.push(...fileResult.issues.map(issue => `${filePath}: ${issue}`));
    }
  }

  return results;
}

/**
 * ✅ CORRECTO (Fix E + CI-Breaker #1 Fix + Patch 1): Obtiene hunks de git diff con números de línea
 * 
 * Soporta:
 * - Working tree (default)
 * - Staged changes (--cached para pre-commit)
 * - Base ref (base...HEAD para CI/PR)
 * 
 * Patch 1: count omitido => 1 (no 0)
 * Patch 1: count === 0 marca punto de cambio (detecta borrados)
 */
async function getGitDiffHunks(options: VerifyDiffOptions = {}): Promise<Array<{
  file: string;
  lines: number[];
}>> {
  return new Promise((resolve, reject) => {
    const args = ['diff', '-U0'];
    
    // ✅ CI-Breaker #1 Fix: Soporte staged y baseRef
    if (options.staged) {
      // Pre-commit: validar staged changes
      args.push('--cached');
    } else if (options.baseRef) {
      // CI/PR: comparar contra base
      args.push(`${options.baseRef}...HEAD`);
    }
    
    args.push('--', 'prototypes/');
    
    const git = spawn('git', args);
    let output = '';

    git.stdout.on('data', (data) => {
      output += data.toString();
    });

    git.on('close', (code) => {
      if (code !== 0 && code !== 1) {
        reject(new Error(`git diff failed with code ${code}`));
        return;
      }

      const hunks: Array<{ file: string; lines: number[] }> = [];
      const hunksByFile: Map<string, number[]> = new Map();
      
      let currentFile = '';

      for (const line of output.split('\n')) {
        // Detectar archivo (+++ b/prototypes/file.html o +++ /dev/null)
        if (line.startsWith('+++')) {
          const fileCandidate = line.substring(4).trim().replace(/^b\//, '');
          
          // ✅ Ajuste 4: Guarda 1 - Ignorar /dev/null (archivos borrados)
          if (fileCandidate === '/dev/null') {
            currentFile = '';
            continue;
          }
          
          // ✅ Ajuste 4: Guarda 2 - Solo procesar archivos en prototypes/
          if (!fileCandidate.startsWith('prototypes/')) {
            currentFile = '';
            continue;
          }
          
          currentFile = fileCandidate;
          if (!hunksByFile.has(currentFile)) {
            hunksByFile.set(currentFile, []);
          }
        }

        // Detectar rango de líneas (@@ -start,count +start,count @@)
        const hunkMatch = line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
        if (hunkMatch && currentFile) {
          const startLine = parseInt(hunkMatch[2], 10);
          
          // ✅ Patch 1: count omitido => 1 (no 0)
          const count = hunkMatch[3] === undefined ? 1 : parseInt(hunkMatch[3], 10);
          
          const fileLines = hunksByFile.get(currentFile) || [];
          
          // ✅ Patch 1: Si count === 0 (solo borrados), igual marcar "punto de cambio"
          if (count === 0) {
            fileLines.push(startLine);
          } else {
            // ✅ Generar array de líneas modificadas
            for (let i = 0; i < count; i++) {
              fileLines.push(startLine + i);
            }
          }
          
          hunksByFile.set(currentFile, fileLines);
        }
      }

      // ✅ Convertir Map a Array (soporta multi-hunks por archivo)
      for (const [file, lines] of hunksByFile.entries()) {
        if (lines.length > 0) {
          hunks.push({ file, lines: [...new Set(lines)].sort((a, b) => a - b) });
        }
      }

      resolve(hunks.filter(h => h.file.startsWith('prototypes/')));
    });
  });
}

/**
 * ✅ Verifica un archivo individual (diff-based)
 */
async function verifyFile(
  filePath: string,
  hunks: Array<{ lines: number[] }>,
  options: VerifyDiffOptions,
  registry: Awaited<ReturnType<typeof getGlobalTokenRegistry>>
): Promise<{
  path: string;
  hasWatermark: boolean;
  isValid: boolean;
  issues: string[];
}> {
  const issues: string[] = [];
  let hasWatermark = false;
  let isValid = true;

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const watermarks = parseWatermarks(content);

    if (watermarks.length > 0) {
      hasWatermark = true;
    }

    // ✅ Obtener todas las líneas modificadas
    const allModifiedLines = new Set<number>();
    for (const hunk of hunks) {
      hunk.lines.forEach(line => allModifiedLines.add(line));
    }

    // ✅ Ajuste 5: Fail-closed si hay cambios y no se pueden parsear watermarks
    if (allModifiedLines.size > 0 && watermarks.length === 0) {
      // Hay cambios pero no se pueden parsear watermarks → FAIL
      issues.push('Archivo modificado pero no se pueden parsear bloques AUTORUN. Posible watermark roto.');
      isValid = false;
    }

    // ✅ Regla 1: Verificar que líneas modificadas están dentro de bloques AUTORUN
    if (options.checkWatermarks !== false && allModifiedLines.size > 0) {

      for (const lineNum of allModifiedLines) {
        const isInWatermark = watermarks.some(block => 
          lineNum >= block.startLine && lineNum <= block.endLine
        );

        if (!isInWatermark) {
          issues.push(`Línea ${lineNum}: Modificación fuera de bloques AUTORUN`);
          isValid = false;
        }
      }

      // ✅ Validar hash de bloques modificados
      if (options.checkHash !== false) {
        for (const block of watermarks) {
          const blockWasModified = hunks.some(hunk =>
            hunk.lines.some(line =>
              line >= block.startLine && line <= block.endLine
            )
          );

          if (blockWasModified && !validateHash(block)) {
            issues.push(`Bloque en líneas ${block.startLine}-${block.endLine}: Hash mismatch`);
            isValid = false;
          }
        }
      }
    }

    // ✅ Regla 2: Detectar hardcoded colors solo en contextos de CSS real (Fix C)
    if (options.checkHardcodedColors !== false && allModifiedLines.size > 0) {
      const hardcodedColors = detectHardcodedColors(content, allModifiedLines);
      
      if (hardcodedColors.length > 0) {
        issues.push(...hardcodedColors);
        isValid = false;
      }
    }

    // ✅ Regla 3: Validar tokens usados (Fix B + Fix C + Patch 3)
    if (options.checkTokens !== false && allModifiedLines.size > 0) {
      const tokenIssues = validateTokensUsed(content, allModifiedLines, registry);
      
      if (tokenIssues.length > 0) {
        issues.push(...tokenIssues);
        isValid = false;
      }
    }

  } catch (error: any) {
    issues.push(`Error verificando archivo: ${error.message}`);
    isValid = false;
  }

  return {
    path: filePath,
    hasWatermark,
    isValid,
    issues
  };
}

/**
 * ✅ CORRECTO (Fix C + Extra): Detecta colores hardcodeados con state machine
 * 
 * Usa archivo completo pero solo analiza líneas modificadas dentro de CSS real
 * Maneja <style>...</style> inline en una sola línea
 */
function detectHardcodedColors(
  content: string,
  modifiedLines: Set<number>
): string[] {
  const colors: string[] = [];
  const lines = content.split('\n');
  
  // ✅ State machine para <style> blocks
  let inStyleBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1; // 1-indexed
    const line = lines[i];
    
    // ✅ Extra Fix: Manejar <style>...</style> inline en una sola línea
    const hasStyleOpen = /<style[^>]*>/i.test(line);
    const hasStyleClose = /<\/style>/i.test(line);
    
    if (hasStyleOpen && hasStyleClose) {
      // Estilo inline en una sola línea
      const styleMatch = line.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      if (styleMatch && modifiedLines.has(lineNum)) {
        const cssContent = styleMatch[1];
        const lineColors = detectHardcodedColorsInLine(cssContent);
        if (lineColors.length > 0) {
          colors.push(...lineColors.map(c => `Línea ${lineNum}: ${c}`));
        }
      }
      // No cambiar inStyleBlock (ya está cerrado)
      continue;
    }
    
    // Detectar inicio de <style>
    if (hasStyleOpen) {
      inStyleBlock = true;
    }
    
    // Detectar fin de </style>
    if (hasStyleClose) {
      inStyleBlock = false;
    }
    
    // ✅ Solo analizar si:
    // 1. La línea está modificada Y
    // 2. Está dentro de <style> O contiene style="..."
    const isModified = modifiedLines.has(lineNum);
    const hasInlineStyle = /style\s*=\s*["']/.test(line);
    
    if (isModified && (inStyleBlock || hasInlineStyle)) {
      // Analizar esta línea específica
      const lineColors = detectHardcodedColorsInLine(line);
      if (lineColors.length > 0) {
        colors.push(...lineColors.map(c => `Línea ${lineNum}: ${c}`));
      }
    }
  }
  
  return colors;
}

/**
 * ✅ CORRECTO (Ajuste 3 + Bug 0 Fix + Micro-Hardening): Detecta colores hardcodeados usando regex.exec loop
 * 
 * NO usa indexOf(match) con .match() porque siempre da el primer índice.
 * Usa regex.exec loop para obtener índices reales de múltiples matches.
 * Detecta white/black explícitamente (directo y fallback).
 * Micro-Hardening: case-insensitive para safeKeywords, fallback rgb/hsl, y var() detection.
 */
function detectHardcodedColorsInLine(line: string): string[] {
  const colors: string[] = [];
  
  // ✅ Bug 0 Fix: Detectar white/black explícitamente
  const bannedNamedColors = /\b(white|black)\b/i;
  let hasFallbackMatch = false;
  
  // 2) En fallback — ejemplo: var(--x, white)
  const namedFallback = line.match(/var\s*\(\s*--[\w-]+\s*,\s*(white|black)\b/i);
  if (namedFallback) {
    colors.push(`Fallback keyword prohibido en var(): ${namedFallback[1]}`);
    hasFallbackMatch = true; // ✅ Ajuste opcional: Evitar doble reporte
  }
  
  // 1) Directo (no-var) — ejemplo: color: white;
  if (bannedNamedColors.test(line) && !hasFallbackMatch) {
    // Para reducir falsos positivos: exigir que venga después de ":" o "," (fallback)
    const namedColorValue = line.match(/[: ,]\s*(white|black)\b/i);
    if (namedColorValue) {
      colors.push(`keyword: ${namedColorValue[1]}`);
    }
  }
  
  // ✅ Patrones prohibidos con exec loop
  const patterns = [
    { regex: /#[0-9a-fA-F]{3,8}/g, name: 'hex' },
    { regex: /\brgb\s*\(/gi, name: 'rgb' },
    { regex: /\brgba\s*\(/gi, name: 'rgba' },
    { regex: /\bhsl\s*\(/gi, name: 'hsl' },
    { regex: /\bhsla\s*\(/gi, name: 'hsla' }
  ];
  
  // ✅ Micro-Hardening 1: safeKeywords case-insensitive
  const safeKeywords = new Set([
    'transparent',
    'currentcolor',  // CSS es case-insensitive
    'inherit',
    'initial',
    'unset'
  ]);
  
  for (const { regex, name } of patterns) {
    // ✅ Ajuste 3: Usar el mismo regex y resetear lastIndex
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    
    while ((m = regex.exec(line)) !== null) {
      const matchIndex = m.index; // ✅ Índice real del match
      const match = m[0];
      
      // ✅ Micro-Hardening 3: var() detection case-insensitive
      const beforeMatch = line.substring(0, matchIndex);
      const beforeMatchLower = beforeMatch.toLowerCase();
      const lastVar = beforeMatchLower.lastIndexOf('var(');
      const lastClose = beforeMatchLower.lastIndexOf(')');
      
      // Si está dentro de var(), verificar fallback
      if (lastVar > lastClose) {
        const varContent = line.substring(lastVar);
        const varMatch = varContent.match(/var\s*\(\s*--[\w-]+,\s*([^)]+)\s*\)/);
        
        if (varMatch) {
          const fallback = varMatch[1].trim();
          
          // ✅ Micro-Hardening 1: Comparar case-insensitive
          if (safeKeywords.has(fallback.toLowerCase())) {
            continue; // Permitir
          }
          
          // ✅ Micro-Hardening 2: fallback rgb/hsl case-insensitive
          if (/^#[0-9a-fA-F]{3,8}$/i.test(fallback) ||
              /^(rgba?|hsla?)\s*\(/i.test(fallback)) {
            colors.push(`Fallback prohibido en var(): ${fallback}`);
          }
        }
      } else {
        // No está dentro de var(), es hardcoded directo
        colors.push(`${name}: ${match}`);
      }
    }
  }
  
  return colors;
}

/**
 * ✅ CORRECTO (Fix B + Fix C + Patch 3): Valida tokens usados en var(--token)
 * 
 * Fix B: Usar registry.suggest() (público)
 * Fix C: Solo validar en líneas modificadas dentro de CSS real (state machine)
 * Patch 3: Maneja <style>...</style> inline en una sola línea
 */
function validateTokensUsed(
  content: string,
  modifiedLines: Set<number>,
  registry: Awaited<ReturnType<typeof getGlobalTokenRegistry>>
): string[] {
  const issues: string[] = [];
  const lines = content.split('\n');
  
  // ✅ State machine para <style> blocks
  let inStyleBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    
    // ✅ Patch 3: Manejar <style>...</style> inline en una sola línea
    const hasStyleOpen = /<style[^>]*>/i.test(line);
    const hasStyleClose = /<\/style>/i.test(line);
    
    if (hasStyleOpen && hasStyleClose) {
      // Estilo inline en una sola línea
      const styleMatch = line.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      if (styleMatch && modifiedLines.has(lineNum)) {
        const cssContent = styleMatch[1];
        const varRegex = /var\s*\(\s*(--(?:ubits|modifiers)[\w-]+)/g;
        let m: RegExpExecArray | null;
        
        varRegex.lastIndex = 0;
        while ((m = varRegex.exec(cssContent)) !== null) {
          const tokenName = m[1];
          
          if (!registry.has(tokenName)) {
            const suggestions = registry.suggest(tokenName);
            const suggestionText = suggestions.length > 0
              ? ` ¿Quizás quisiste: ${suggestions.slice(0, 3).join(', ')}?`
              : '';
            
            issues.push(`Línea ${lineNum}: Token no encontrado: ${tokenName}.${suggestionText}`);
          }
        }
      }
      continue; // No cambiar inStyleBlock
    }
    
    // Detectar inicio/fin de <style>
    if (hasStyleOpen) {
      inStyleBlock = true;
    }
    if (hasStyleClose) {
      inStyleBlock = false;
    }
    
    const isModified = modifiedLines.has(lineNum);
    const hasInlineStyle = /style\s*=\s*["']/.test(line);
    
    // ✅ Solo validar tokens en líneas modificadas dentro de CSS real
    if (isModified && (inStyleBlock || hasInlineStyle)) {
      const varRegex = /var\s*\(\s*(--(?:ubits|modifiers)[\w-]+)/g;
      let match;
      
      while ((match = varRegex.exec(line)) !== null) {
        const tokenName = match[1];
        
        if (!registry.has(tokenName)) {
          // ✅ Fix B: Usar método público suggest()
          const suggestions = registry.suggest(tokenName);
          const suggestionText = suggestions.length > 0
            ? ` ¿Quizás quisiste: ${suggestions.slice(0, 3).join(', ')}?`
            : '';
          
          issues.push(`Línea ${lineNum}: Token no encontrado: ${tokenName}.${suggestionText}`);
        }
      }
    }
  }
  
  return issues;
}

