# 🚨 Huecos Críticos Identificados - Mode B

**Fecha:** 2025-01-03  
**Propósito:** Fixes críticos que rompen CI/pre-commit o causan falsos negativos

---

## ❌ Bug 0: Fix D no detecta white/black (FALSO NEGATIVO)

### Problema:
En `detectHardcodedColorsInLine()` actual, solo se reportan fallbacks si el fallback es `#...` o `rgb/hsl...`. Entonces esto NO dispara nada:

```css
background: var(--ubits-bg-1, white);
```

**O sea:** Remover `white`/`black` de `safeKeywords` NO alcanza, porque `white` ni siquiera entra al detector.

### ✅ Solución Correcta:

```typescript
/**
 * ✅ CORRECTO: Detecta white/black explícitamente (directo y fallback)
 */
function detectHardcodedColorsInLine(line: string): string[] {
  const colors: string[] = [];
  
  // ✅ Bug 0 Fix: Detectar white/black explícitamente
  const bannedNamedColors = /\b(white|black)\b/i;
  
  // 1) Directo (no-var) — ejemplo: color: white;
  if (bannedNamedColors.test(line)) {
    // Para reducir falsos positivos: exigir que venga después de ":" o "," (fallback)
    const namedColorValue = line.match(/[: ,]\s*(white|black)\b/i);
    if (namedColorValue) {
      colors.push(`keyword: ${namedColorValue[1]}`);
    }
  }
  
  // 2) En fallback — ejemplo: var(--x, white)
  const namedFallback = line.match(/var\s*\(\s*--[\w-]+\s*,\s*(white|black)\b/i);
  if (namedFallback) {
    colors.push(`Fallback keyword prohibido en var(): ${namedFallback[1]}`);
  }
  
  // ✅ Patrones prohibidos con exec loop (Ajuste 3)
  const patterns = [
    { regex: /#[0-9a-fA-F]{3,8}/g, name: 'hex' },
    { regex: /\brgb\s*\(/gi, name: 'rgb' },
    { regex: /\brgba\s*\(/gi, name: 'rgba' },
    { regex: /\bhsl\s*\(/gi, name: 'hsl' },
    { regex: /\bhsla\s*\(/gi, name: 'hsla' }
  ];
  
  for (const { regex, name } of patterns) {
    // ✅ Ajuste 3: Usar el mismo regex y resetear lastIndex
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    
    while ((m = regex.exec(line)) !== null) {
      const matchIndex = m.index; // ✅ Índice real del match
      const match = m[0];
      
      // ✅ Verificar si está dentro de var() con fallback seguro
      const beforeMatch = line.substring(0, matchIndex);
      const lastVar = beforeMatch.lastIndexOf('var(');
      const lastClose = beforeMatch.lastIndexOf(')');
      
      // Si está dentro de var(), verificar fallback
      if (lastVar > lastClose) {
        const varContent = line.substring(lastVar);
        const varMatch = varContent.match(/var\s*\(\s*--[\w-]+,\s*([^)]+)\s*\)/);
        
        if (varMatch) {
          const fallback = varMatch[1].trim();
          const safeKeywords = ['transparent', 'currentColor', 'inherit', 'initial', 'unset'];
          
          // Si el fallback es seguro, permitir
          if (safeKeywords.includes(fallback)) {
            continue;
          }
          
          // Si el fallback contiene hex/rgb/hsl, es error
          if (/^#[0-9a-fA-F]{3,8}$/.test(fallback) ||
              /^rgb\s*\(/.test(fallback) ||
              /^rgba\s*\(/.test(fallback) ||
              /^hsl\s*\(/.test(fallback) ||
              /^hsla\s*\(/.test(fallback)) {
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
```

---

## ❌ CI-Breaker #1: git diff en CI devuelve vacío

### Problema:
En CI normalmente el working tree está limpio, entonces:

```bash
git diff -U0 -- prototypes/
```

→ cero hunks → verify pasa aunque el PR cambió prototypes.

### ✅ Solución: Soporte baseRef (3-dot) o staged

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts`

```typescript
export interface VerifyDiffOptions {
  checkWatermarks?: boolean;
  checkHash?: boolean;
  checkHardcodedColors?: boolean;
  checkTokens?: boolean;
  
  // ✅ NUEVO: Soporte para CI y pre-commit
  staged?: boolean;        // pre-commit: validar staged changes
  baseRef?: string;       // CI/PR: comparar contra base (ej: origin/main)
}

/**
 * ✅ CORRECTO: Obtiene hunks de git diff con soporte para CI y pre-commit
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
          const startLine = parseInt(hunkMatch[2]);
          const count = parseInt(hunkMatch[3] || '0');
          
          // ✅ Fix E: Si count === 0, no agregar líneas (son borrados)
          if (count > 0) {
            const fileLines = hunksByFile.get(currentFile) || [];
            
            for (let i = 0; i < count; i++) {
              fileLines.push(startLine + i);
            }
            
            hunksByFile.set(currentFile, fileLines);
          }
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
```

**CLI actualizada:** `packages/autorun-core/src/cli/autorun-verify.ts`

```typescript
#!/usr/bin/env node
import { verifyDiff } from '../verify/VerifyDiff';

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] === 'diff' ? 'diff' : 'full';
  
  // ✅ Parsear flags: --staged, --base <ref>
  let staged = false;
  let baseRef: string | undefined = undefined;
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--staged') {
      staged = true;
    } else if (args[i] === '--base' && i + 1 < args.length) {
      baseRef = args[i + 1];
      i++; // Skip next arg
    }
  }
  
  if (mode === 'diff') {
    const result = await verifyDiff({
      checkWatermarks: true,
      checkHash: true,
      checkHardcodedColors: true,
      checkTokens: true,
      staged,
      baseRef
    });
    
    if (!result.valid) {
      console.error('❌ Verificación de prototypes falló:');
      result.errors.forEach(error => console.error(`   - ${error}`));
      process.exit(1);
    }
    
    console.log('✅ Verificación de prototypes pasó');
    process.exit(0);
  }
  
  // ... otros modos ...
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
```

**package.json:**
```json
{
  "scripts": {
    "prototypes:verify": "tsx packages/autorun-core/src/cli/autorun-verify.ts diff"
  },
  "devDependencies": {
    "tsx": "^4.0.0"
  }
}
```

**Husky pre-commit:** `.husky/pre-commit`

```bash
#!/bin/sh
npm run prototypes:verify -- --staged
```

**CI Workflow:** `.github/workflows/verify-prototypes.yml`

```yaml
name: Verify Prototypes

on:
  pull_request:
    paths:
      - 'prototypes/**'

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Necesario para comparar contra base
      
      - uses: actions/setup-node@v3
      
      - run: npm install
      
      - name: Fetch base ref
        run: git fetch origin ${{ github.base_ref }} --depth=1
      
      - name: Verify prototypes
        run: npm run prototypes:verify -- --base origin/${{ github.base_ref }}
```

---

## ❌ CI-Breaker #2: pre-commit debe validar staged

### Problema:
En hooks, si alguien tiene cambios sin stage, la verificación puede:
- Fallar por cosas que ni van al commit, o
- Pasar aunque lo staged sea distinto

### ✅ Solución:
Ya aplicada arriba: usar `--staged` en pre-commit y `--cached` en git diff.

---

## ✅ Ajuste Extra: Manejar <style>...</style> inline

### Problema:
Tu state machine puede perder esto:

```html
<style>.a{background:#fff}</style>
```

Porque prendes y apagas `inStyleBlock` en la misma línea y luego no analizas.

### ✅ Solución:

```typescript
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
```

---

## ✅ Checklist de Fixes Aplicados

- [x] Bug 0: Detecta white/black explícitamente (directo y fallback)
- [x] CI-Breaker #1: Soporte `--staged` y `--base <ref>` en git diff
- [x] CI-Breaker #2: Pre-commit usa `--staged`
- [x] Ajuste 1: Script usa `tsx` (no `node` directo con TS)
- [x] Ajuste 3: Exec loop con `regex.lastIndex = 0`
- [x] Extra: Maneja `<style>...</style>` inline en una sola línea

---

## 🎯 Conclusión

**Con estos fixes críticos, Mode B queda robusto en CI, pre-commit y local:**

1. ✅ Detecta `white`/`black` correctamente (no falsos negativos)
2. ✅ Funciona en CI comparando contra base del PR
3. ✅ Funciona en pre-commit validando solo staged changes
4. ✅ Maneja casos edge como `<style>` inline

