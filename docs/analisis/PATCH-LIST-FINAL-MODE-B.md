# 📋 Patch List Final - Mode B

**Fecha:** 2025-01-03  
**Propósito:** Lista exacta de fixes mínimos que Cursor debe aplicar

---

## ✅ Patch List (Lo Mínimo que Cursor Debe Aplicar)

### ✅ Patch 1: autorun-verify.ts se ejecuta con tsx

**Archivo:** `package.json`

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

**NO usar:** `node packages/autorun-core/src/cli/autorun-verify.ts` (Node no ejecuta TS sin loader)

---

### ✅ Patch 2: verifyDiff soporta --staged y --base <ref>

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts`

**2.1 Actualizar interface:**

```typescript
export interface VerifyDiffOptions {
  checkWatermarks?: boolean;
  checkHash?: boolean;
  checkHardcodedColors?: boolean;
  checkTokens?: boolean;
  
  // ✅ NUEVO:
  staged?: boolean;        // pre-commit
  baseRef?: string;        // CI/PR: origin/main o similar
}
```

**2.2 Actualizar getGitDiffHunks():**

```typescript
async function getGitDiffHunks(options: VerifyDiffOptions = {}): Promise<Array<{
  file: string;
  lines: number[];
}>> {
  return new Promise((resolve, reject) => {
    const args = ['diff', '-U0'];
    
    if (options.staged) {
      args.push('--cached');
    } else if (options.baseRef) {
      args.push(`${options.baseRef}...HEAD`);
    }
    
    args.push('--', 'prototypes/');
    const git = spawn('git', args);
    // ... resto del código ...
  });
}
```

**2.3 Actualizar CLI para parsear flags:**

```typescript
// packages/autorun-core/src/cli/autorun-verify.ts
async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] === 'diff' ? 'diff' : 'full';
  
  let staged = false;
  let baseRef: string | undefined = undefined;
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--staged') {
      staged = true;
    } else if (args[i] === '--base' && i + 1 < args.length) {
      baseRef = args[i + 1];
      i++;
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
    // ... resto ...
  }
}
```

**2.4 Actualizar pre-commit:**

```bash
#!/bin/sh
npm run prototypes:verify -- --staged
```

**2.5 Actualizar CI workflow:**

```yaml
- name: Fetch base ref
  run: git fetch origin ${{ github.base_ref }} --depth=1

- name: Verify prototypes
  run: npm run prototypes:verify -- --base origin/${{ github.base_ref }}
```

---

### ✅ Patch 3: detectHardcodedColorsInLine() usa exec loop

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts`

**Reemplazar:**

```typescript
// ❌ INCORRECTO (versión vieja)
const matches = line.match(pattern.regex);
if (matches) {
  for (const match of matches) {
    const matchIndex = line.indexOf(match); // ❌ Siempre el primero
  }
}
```

**Por:**

```typescript
// ✅ CORRECTO
for (const { regex, name } of patterns) {
  regex.lastIndex = 0; // ✅ Resetear lastIndex
  let m: RegExpExecArray | null;
  
  while ((m = regex.exec(line)) !== null) {
    const matchIndex = m.index; // ✅ Índice real
    const match = m[0];
    // ... resto de la lógica ...
  }
}
```

---

### ✅ Patch 4: Fix D real - detecta white|black

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts`

**Agregar al inicio de detectHardcodedColorsInLine():**

```typescript
function detectHardcodedColorsInLine(line: string): string[] {
  const colors: string[] = [];
  
  // ✅ Bug 0 Fix: Detectar white/black explícitamente
  const bannedNamedColors = /\b(white|black)\b/i;
  
  // 1) Directo (no-var) — ejemplo: color: white;
  if (bannedNamedColors.test(line)) {
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
  
  // ... resto del código (patrones hex/rgb/hsl) ...
}
```

---

### ✅ Patch 5: DoD - startLine/endLine son derivados

**Archivo:** `docs/analisis/DEFINITION-OF-DONE-MODE-B.md`

**Cambiar:**

```markdown
- ✅ Watermark incluye `startLine` y `endLine` (para verify diff-based)
```

**Por:**

```markdown
- ✅ `parseWatermarks()` produce `startLine` y `endLine` (derivados del parse, no parte del meta)
- ✅ Watermark meta incluye: `v`, `mode`, `components`, `widgets`, `deps`, `hash`
```

---

### ✅ Patch 6: Maneja <style>...</style> inline

**Archivo:** `packages/autorun-core/src/verify/VerifyDiff.ts`

**En detectHardcodedColors(), agregar al inicio del loop:**

```typescript
for (let i = 0; i < lines.length; i++) {
  const lineNum = i + 1;
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
    continue; // No cambiar inStyleBlock
  }
  
  // ... resto del código (state machine) ...
}
```

---

## ✅ Checklist de Patches Aplicados

- [ ] Patch 1: autorun-verify.ts se ejecuta con tsx (no node directo)
- [ ] Patch 2: verifyDiff soporta --staged y --base <ref>
- [ ] Patch 3: detectHardcodedColorsInLine() usa exec loop
- [ ] Patch 4: Detecta white|black explícitamente (directo y fallback)
- [ ] Patch 5: DoD actualizado (startLine/endLine son derivados)
- [ ] Patch 6: Maneja <style>...</style> inline en una sola línea

---

## 🎯 Conclusión

**Con estos 6 patches aplicados, Mode B queda robusto en CI, pre-commit y local:**

1. ✅ No falla en hooks por ejecutar TS con node
2. ✅ Funciona en CI comparando contra base del PR
3. ✅ Funciona en pre-commit validando solo staged changes
4. ✅ Detecta white/black correctamente (no falsos negativos)
5. ✅ Maneja casos edge como <style> inline
6. ✅ DoD correcto (startLine/endLine son derivados)

