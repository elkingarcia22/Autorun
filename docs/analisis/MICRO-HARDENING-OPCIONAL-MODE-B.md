# 🔒 Micro-Hardening Opcional - Mode B

**Fecha:** 2025-01-03  
**Propósito:** 3 mejoras opcionales para reducir "ruido" raro (no críticos pero recomendados)

---

## ✅ Micro-Hardening 1: safeKeywords case-insensitive

### Problema:
Ahora `transparent` ok, pero `Transparent` podría caer como error.

### ✅ Solución:

```typescript
// ✅ En detectHardcodedColorsInLine()
const safeKeywords = new Set([
  'transparent',
  'currentcolor',  // CSS es case-insensitive
  'inherit',
  'initial',
  'unset'
]);

// ✅ Comparar case-insensitive
if (safeKeywords.has(fallback.toLowerCase())) {
  continue; // Permitir
}
```

**Código actualizado:**

```typescript
function detectHardcodedColorsInLine(line: string): string[] {
  const colors: string[] = [];
  
  // ... código existente ...
  
  // ✅ Micro-Hardening 1: safeKeywords case-insensitive
  const safeKeywords = new Set([
    'transparent',
    'currentcolor',  // CSS es case-insensitive (currentColor = currentcolor)
    'inherit',
    'initial',
    'unset'
  ]);
  
  // ... en el loop de patterns ...
  if (lastVar > lastClose) {
    const varContent = line.substring(lastVar);
    const varMatch = varContent.match(/var\s*\(\s*--[\w-]+,\s*([^)]+)\s*\)/);
    
    if (varMatch) {
      const fallback = varMatch[1].trim();
      
      // ✅ Comparar case-insensitive
      if (safeKeywords.has(fallback.toLowerCase())) {
        continue; // Permitir
      }
      
      // ... resto de validación ...
    }
  }
  
  return colors;
}
```

---

## ✅ Micro-Hardening 2: fallback rgb/hsl case-insensitive

### Problema:
En tu check de fallback, `RGB()` o `Hsl()` podrían no detectarse.

### ✅ Solución:

```typescript
// ✅ Usar flag /i en regex
if (/^#[0-9a-fA-F]{3,8}$/i.test(fallback) ||
    /^(rgba?|hsla?)\s*\(/i.test(fallback)) {
  colors.push(`Fallback prohibido en var(): ${fallback}`);
}
```

**Código actualizado:**

```typescript
// ✅ Micro-Hardening 2: fallback rgb/hsl case-insensitive
if (/^#[0-9a-fA-F]{3,8}$/i.test(fallback) ||
    /^(rgba?|hsla?)\s*\(/i.test(fallback)) {
  colors.push(`Fallback prohibido en var(): ${fallback}`);
}
```

---

## ✅ Micro-Hardening 3: var() detection case-insensitive

### Problema:
Tu `lastIndexOf('var(')` no detecta `VAR(` (CSS es case-insensitive). Si te preocupa:

### ✅ Solución:

```typescript
// ✅ Usar toLowerCase() para detección case-insensitive
const beforeMatchLower = beforeMatch.toLowerCase();
const lastVar = beforeMatchLower.lastIndexOf('var(');
const lastClose = beforeMatchLower.lastIndexOf(')');
```

**Código actualizado:**

```typescript
// ✅ Micro-Hardening 3: var() detection case-insensitive
const beforeMatch = line.substring(0, matchIndex);
const beforeMatchLower = beforeMatch.toLowerCase();
const lastVar = beforeMatchLower.lastIndexOf('var(');
const lastClose = beforeMatchLower.lastIndexOf(')');
```

**Nota:** Esto es opcional porque en la práctica `var()` casi siempre se escribe en minúsculas, pero CSS es case-insensitive y esto hace el código más robusto.

---

## ✅ Código Completo con Micro-Hardening

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
    'currentcolor',
    'inherit',
    'initial',
    'unset'
  ]);
  
  for (const { regex, name } of patterns) {
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    
    while ((m = regex.exec(line)) !== null) {
      const matchIndex = m.index;
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
```

---

## ✅ Checklist de Micro-Hardening

- [x] Micro-Hardening 1: safeKeywords case-insensitive (Set con toLowerCase())
- [x] Micro-Hardening 2: fallback rgb/hsl case-insensitive (flag /i en regex)
- [x] Micro-Hardening 3: var() detection case-insensitive (toLowerCase() en beforeMatch)

---

## 🎯 Conclusión

**Estos 3 micro-hardening son opcionales pero recomendados:**

1. ✅ Reduce falsos positivos con `Transparent`, `CURRENTCOLOR`, etc.
2. ✅ Detecta `RGB()`, `HSL()` en fallbacks
3. ✅ Detecta `VAR()` en CSS (aunque raro, más robusto)

**No son críticos, pero hacen el código más robusto y reducen "ruido" raro.**

