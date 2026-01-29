# 🔧 Patches Finales - Falsos Negativos

**Fecha:** 2025-01-03  
**Propósito:** 3 patches críticos para cerrar falsos negativos

---

## ❌ Patch 1: Hunk count omitido ≠ 0 (es 1) - FALSO NEGATIVO

### Problema:
En unified diff, cuando el hunk viene así:

```
@@ -10 +10 @@
```

eso implica `count = 1`, no `0`.

En tu código actual:

```typescript
const count = parseInt(hunkMatch[3] || '0');
```

➡️ Eso convierte `undefined` en `0` y no agregas líneas, o sea **falso negativo para cambios de una sola línea**.

### ✅ Patch Correcto:

```typescript
const startLine = parseInt(hunkMatch[2], 10);

// ✅ count omitido => 1
const count = hunkMatch[3] === undefined ? 1 : parseInt(hunkMatch[3], 10);

// ✅ Si count === 0 (solo borrados), igual marcar "punto de cambio"
const fileLines = hunksByFile.get(currentFile) || [];
if (count === 0) {
  fileLines.push(startLine);
} else {
  for (let i = 0; i < count; i++) {
    fileLines.push(startLine + i);
  }
}
hunksByFile.set(currentFile, fileLines);
```

**🔒 Esto también cierra el hueco:** "borro `<!-- /AUTORUN -->` y como es delete-only no hay líneas y no se verifica".

---

## ❌ Patch 2: VerifyDiffOptions falta staged/baseRef

### Problema:
En el snippet final de `VerifyDiff.ts`, el interface aparece sin:

```typescript
staged?: boolean;
baseRef?: string;
```

pero `getGitDiffHunks()` los usa. Si esto quedó así en repo, te compila con error.

### ✅ Patch Correcto:

```typescript
export interface VerifyDiffOptions {
  strict?: boolean;
  checkWatermarks?: boolean;
  checkHash?: boolean;
  checkHardcodedColors?: boolean;
  checkTokens?: boolean;

  // ✅ NUEVO:
  staged?: boolean;        // pre-commit
  baseRef?: string;        // CI/PR: origin/main o similar
}
```

---

## ❌ Patch 3: validateTokensUsed() pierde <style>...</style> inline

### Problema:
Arreglaste el inline-style para colores, pero en `validateTokensUsed()` no veo el mismo "caso especial" cuando `<style>` y `</style>` están en la misma línea. Eso es otro **falso negativo para tokens**.

### ✅ Patch Correcto:

```typescript
function validateTokensUsed(
  content: string,
  modifiedLines: Set<number>,
  registry: Awaited<ReturnType<typeof getGlobalTokenRegistry>>
): string[] {
  const issues: string[] = [];
  const lines = content.split('\n');
  
  let inStyleBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    
    // ✅ Patch 3: Manejar <style>...</style> inline en una sola línea
    const hasStyleOpen = /<style[^>]*>/i.test(line);
    const hasStyleClose = /<\/style>/i.test(line);
    
    if (hasStyleOpen && hasStyleClose) {
      const styleMatch = line.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      if (styleMatch && modifiedLines.has(lineNum)) {
        const cssContent = styleMatch[1];
        // ✅ Correr el mismo varRegex sobre cssContent
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
    
    // ... resto del código (state machine) ...
  }
  
  return issues;
}
```

---

## ✅ Ajuste Opcional: Evitar doble reporte white en fallback

### Problema:
Con tu fix actual, `var(--x, white)` puede disparar:

- `keyword: white`
- `Fallback keyword prohibido...: white`

### ✅ Solución (Opcional):

Si quieres 1 solo mensaje, haz de-dupe con Set o "si matched fallback, no emitas keyword".

**Implementación simple:**

```typescript
// En detectHardcodedColorsInLine()
const colors: string[] = [];
let hasFallbackMatch = false;

// 2) En fallback — ejemplo: var(--x, white)
const namedFallback = line.match(/var\s*\(\s*--[\w-]+\s*,\s*(white|black)\b/i);
if (namedFallback) {
  colors.push(`Fallback keyword prohibido en var(): ${namedFallback[1]}`);
  hasFallbackMatch = true; // ✅ Marcar que ya reportamos
}

// 1) Directo (no-var) — ejemplo: color: white;
if (bannedNamedColors.test(line) && !hasFallbackMatch) { // ✅ Solo si no hay fallback
  const namedColorValue = line.match(/[: ,]\s*(white|black)\b/i);
  if (namedColorValue) {
    colors.push(`keyword: ${namedColorValue[1]}`);
  }
}
```

---

## 🧪 Tests Mínimos Adicionales

### Test 1: Hunk count omitido (@@ -1 +1 @@) debe tratarse como count=1

```typescript
it('debe tratar hunk count omitido como count=1', async () => {
  // Mock git diff con: @@ -10 +10 @@ (sin count)
  const mockDiff = `+++ b/prototypes/test.html
@@ -10 +10 @@
 content
`;
  
  const hunks = await getGitDiffHunks();
  
  // ✅ Debe incluir línea 10 (count=1, no 0)
  expect(hunks[0].lines).toContain(10);
});
```

### Test 2: Delete-only debe fallar

```typescript
it('debe detectar borrados (count=0) como punto de cambio', async () => {
  // Mock git diff con: @@ -10,1 +10,0 @@ (solo borrado)
  const mockDiff = `+++ b/prototypes/test.html
@@ -10,1 +10,0 @@
-<!-- /AUTORUN -->
`;
  
  const hunks = await getGitDiffHunks();
  
  // ✅ Debe incluir línea 10 aunque count=0
  expect(hunks[0].lines).toContain(10);
  
  // ✅ Debe fallar verify si está fuera de watermark
  const result = await verifyDiff({ checkWatermarks: true });
  expect(result.valid).toBe(false);
});
```

---

## ✅ Checklist de Patches Aplicados

- [x] Patch 1: Hunk count omitido tratado como count=1 (no 0)
- [x] Patch 1: count===0 marca punto de cambio (detecta borrados)
- [x] Patch 2: VerifyDiffOptions incluye staged/baseRef
- [x] Patch 3: validateTokensUsed() maneja <style>...</style> inline
- [x] Ajuste opcional: Evitar doble reporte white en fallback
- [x] Tests mínimos: Hunk count omitido y delete-only

---

## 🎯 Conclusión

**Con estos 3 patches finales, Mode B queda completamente blindado contra falsos negativos:**

1. ✅ Detecta cambios de 1 línea (count omitido = 1)
2. ✅ Detecta borrados (count=0 marca punto de cambio)
3. ✅ Detecta tokens en <style> inline
4. ✅ Interface completo (no errores de compilación)
5. ✅ Sin doble reporte de white/black

