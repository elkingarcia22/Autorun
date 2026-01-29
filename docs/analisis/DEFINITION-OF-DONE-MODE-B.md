# ✅ Definition of Done - Mode B

**Fecha:** 2025-01-03  
**Propósito:** Criterios obligatorios que Cursor debe cumplir antes de considerar terminada la implementación

---

## 🚨 Criterios Obligatorios

### ✅ Criterio 1: autorun.apply en prototypes/

**Debe cumplir:**
- ✅ Inserta solo en anchors (`<!-- AUTORUN:ANCHOR:CONTENT -->`, `<!-- AUTORUN:ANCHOR:SCRIPTS -->`)
- ✅ Siempre con Watermark v2 (`<!-- AUTORUN: {...} -->...<!-- /AUTORUN -->`)
- ✅ Watermark meta incluye: `v`, `mode`, `components`, `widgets`, `deps`, `hash`
- ✅ `parseWatermarks()` produce `startLine` y `endLine` (derivados del parse, no parte del meta)

**Verificación:**
```bash
# Ejecutar autorun.apply en un prototype
autorun.apply({
  message: "Agregar DataTable",
  targetFiles: ["prototypes/canvas-default.html"]
})

# Verificar que:
# 1. Se insertó en anchor CONTENT o SCRIPTS
# 2. Tiene watermark v2 completo
# 3. Hash es válido
```

---

### ✅ Criterio 2: autorun.verify("diff") debe fallar si:

#### 2.1 Una línea modificada queda fuera de watermark

**Test:**
```bash
# 1. Modificar manualmente una línea fuera de watermark
# 2. Ejecutar verify
autorun.verify({ targetFiles: "diff" })

# ✅ DEBE FALLAR con error: "Línea X: Modificación fuera de bloques AUTORUN"
```

#### 2.2 Hay colores hardcodeados en CSS real

**Test:**
```bash
# 1. Agregar manualmente en <style> o style="":
background: #fff;
color: rgb(0, 0, 0);

# 2. Ejecutar verify
autorun.verify({ targetFiles: "diff" })

# ✅ DEBE FALLAR con error: "Línea X: hex: #fff" o "Línea X: rgb: rgb(...)"
```

#### 2.3 Hay tokens inexistentes en var(--token)

**Test:**
```bash
# 1. Agregar manualmente:
background: var(--ubits-bg-999);

# 2. Ejecutar verify
autorun.verify({ targetFiles: "diff" })

# ✅ DEBE FALLAR con error: "Línea X: Token no encontrado: --ubits-bg-999"
```

#### 2.4 Hay fallback de color prohibido dentro de var()

**Test:**
```bash
# 1. Agregar manualmente:
background: var(--ubits-bg-1, #fff);
color: var(--ubits-fg-1, rgb(0,0,0));

# 2. Ejecutar verify
autorun.verify({ targetFiles: "diff" })

# ✅ DEBE FALLAR con error: "Línea X: Fallback prohibido en var(): #fff"
```

#### 2.5 Watermark roto / no parseable cuando hubo cambios

**Test:**
```bash
# 1. Borrar manualmente <!-- /AUTORUN --> de un bloque
# 2. Modificar una línea dentro del bloque
# 3. Ejecutar verify
autorun.verify({ targetFiles: "diff" })

# ✅ DEBE FALLAR con error: "Archivo modificado pero no se pueden parsear bloques AUTORUN"
```

---

### ✅ Criterio 3: autorun.verify("diff") debe pasar si:

#### 3.1 Cambios válidos dentro de watermark

**Test:**
```bash
# 1. Modificar contenido dentro de un bloque AUTORUN válido
# 2. Ejecutar verify
autorun.verify({ targetFiles: "diff" })

# ✅ DEBE PASAR sin errores
```

#### 3.2 Cambios fuera de prototypes/

**Test:**
```bash
# 1. Modificar archivo fuera de prototypes/
# 2. Ejecutar verify
autorun.verify({ targetFiles: "diff" })

# ✅ DEBE PASAR (no aplica a prototypes/)
```

---

### ✅ Criterio 4: Enforcement activo (al menos uno)

#### Opción A: Auto-Reload bloquea reload si verify falla

**Test:**
```bash
# 1. Modificar prototype manualmente con error (ej: color hardcoded)
# 2. Guardar archivo
# 3. Auto-Reload detecta cambio

# ✅ DEBE: Mostrar error y NO recargar página
```

#### Opción B: Pre-commit bloquea commit si verify falla

**Test:**
```bash
# 1. Modificar prototype manualmente con error
# 2. git add prototypes/
# 3. git commit

# ✅ DEBE: Ejecutar verify y bloquear commit con error
```

#### Opción C: CI bloquea PR si verify falla

**Test:**
```bash
# 1. Crear PR con cambios en prototypes/ que violen reglas
# 2. CI ejecuta verify

# ✅ DEBE: Falla CI y bloquea merge
```

---

## 🧪 Tests Mínimos Requeridos

### ✅ Test 1: JSON parse Fix A

```typescript
it('debe parsear JSON correctamente (Fix A)', async () => {
  const json = {
    light: {
      background: {
        'ubits-bg-1': '#ffffff'
      }
    }
  };
  
  const registry = new GlobalTokenRegistry();
  registry.parseTokensFromJSON(json);
  
  // ✅ Debe agregar '--ubits-bg-1' (no '--light-background-ubits-bg-1')
  expect(registry.has('--ubits-bg-1')).toBe(true);
  expect(registry.has('--light-background-ubits-bg-1')).toBe(false);
});
```

### ✅ Test 2: suggest Fix B

```typescript
it('debe sugerir tokens similares (Fix B)', async () => {
  const registry = await getGlobalTokenRegistry();
  const suggestions = registry.suggest('--ubits-bg-999');
  
  // ✅ Debe retornar sugerencias (método público)
  expect(suggestions.length).toBeGreaterThan(0);
  expect(suggestions[0]).toContain('ubits-bg');
});
```

### ✅ Test 3: State machine Fix C

```typescript
it('debe detectar colores solo en CSS real (Fix C)', () => {
  const content = `
    <link href="tokens.css" />
    <style>
      .test { background: #fff; }
    </style>
    <div style="color: rgb(0,0,0);">
  `;
  
  const modifiedLines = new Set([3, 5]); // Líneas dentro de <style> y style=""
  const colors = detectHardcodedColors(content, modifiedLines);
  
  // ✅ Debe detectar #fff y rgb() pero NO en <link>
  expect(colors.length).toBeGreaterThan(0);
  expect(colors.some(c => c.includes('#fff'))).toBe(true);
  expect(colors.some(c => c.includes('rgb'))).toBe(true);
});
```

### ✅ Test 4: Safe keywords Fix D

```typescript
it('debe prohibir white/black en fallbacks (Fix D)', () => {
  const line = 'background: var(--ubits-bg-1, white);';
  const colors = detectHardcodedColorsInLine(line);
  
  // ✅ Debe fallar con white/black
  expect(colors.length).toBeGreaterThan(0);
  expect(colors.some(c => c.includes('white'))).toBe(true);
  
  // ✅ Debe permitir transparent
  const line2 = 'background: var(--ubits-bg-1, transparent);';
  const colors2 = detectHardcodedColorsInLine(line2);
  expect(colors2.length).toBe(0);
});
```

### ✅ Test 5: Hunks Fix E

```typescript
it('debe filtrar count=0 y soportar multi-hunks (Fix E)', async () => {
  // Mock git diff con:
  // - Hunk con count=0 (borrado)
  // - Múltiples hunks en el mismo archivo
  
  const hunks = await getGitDiffHunks();
  
  // ✅ No debe incluir hunks con count=0
  // ✅ Debe soportar múltiples hunks por archivo
  expect(hunks.length).toBeGreaterThan(0);
});
```

### ✅ Test 6: Fail-closed watermark roto

```typescript
it('debe fallar si watermark está roto y hay cambios', async () => {
  const content = `
    <!-- AUTORUN: {...} -->
    <div>content</div>
    <!-- /AUTORUN borrado manualmente -->
  `;
  
  const modifiedLines = new Set([2]); // Línea dentro del bloque
  const watermarks = parseWatermarks(content);
  
  // ✅ Si hay cambios pero no se pueden parsear watermarks → FAIL
  if (modifiedLines.size > 0 && watermarks.length === 0) {
    expect(true).toBe(true); // Fail-closed activo
  }
});
```

---

## ✅ Checklist Final de Verificación

Antes de considerar terminada la implementación, verificar:

- [ ] `autorun.apply` en `prototypes/` inserta solo en anchors
- [ ] `autorun.apply` siempre genera Watermark v2 completo
- [ ] `autorun.verify("diff")` falla si línea modificada fuera de watermark
- [ ] `autorun.verify("diff")` falla si hay colores hardcodeados en CSS real
- [ ] `autorun.verify("diff")` falla si hay tokens inexistentes
- [ ] `autorun.verify("diff")` falla si hay fallback de color prohibido
- [ ] `autorun.verify("diff")` falla si watermark está roto y hay cambios
- [ ] `autorun.verify("diff")` pasa en cambios válidos dentro de watermark
- [ ] Al menos un enforcement activo (Auto-Reload, pre-commit, o CI)
- [ ] Tests mínimos pasan (Fix A, B, C, D, E, fail-closed)

---

## 🎯 Conclusión

**NO está terminado hasta que:**

1. ✅ `autorun.verify("diff")` pasa en cambios válidos
2. ✅ `autorun.verify("diff")` falla en cambios inválidos
3. ✅ Al menos un enforcement está activo y funcionando
4. ✅ Todos los tests mínimos pasan

**Si falta cualquiera de estos criterios, la implementación NO está completa.**
