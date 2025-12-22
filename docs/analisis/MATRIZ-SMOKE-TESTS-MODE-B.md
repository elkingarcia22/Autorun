# 🧪 Matriz de Smoke Tests - Mode B

**Fecha:** 2025-01-03  
**Propósito:** Verificación completa en local, pre-commit y CI

---

## ✅ A) Local (Working Tree)

### Test A1: Editar línea fuera de watermark

**Pasos:**
1. Editar una línea fuera de watermark en `prototypes/...`
2. Ejecutar: `npm run prototypes:verify`

**✅ Resultado esperado:**
```
❌ Verificación de prototypes falló:
   prototypes/file.html: Línea X: Modificación fuera de bloques AUTORUN
```

---

### Test A2: Color hardcodeado en `<style>`

**Pasos:**
1. Agregar en `<style>` dentro de un bloque AUTORUN:
   ```css
   background: #fff;
   ```
2. Ejecutar: `npm run prototypes:verify`

**✅ Resultado esperado:**
```
❌ Verificación de prototypes falló:
   prototypes/file.html: Línea X: hex: #fff
```

---

### Test A3: Color hardcodeado en `style=""`

**Pasos:**
1. Agregar en `style=""` dentro de un bloque AUTORUN:
   ```html
   <div style="color: rgb(0,0,0);">
   ```
2. Ejecutar: `npm run prototypes:verify`

**✅ Resultado esperado:**
```
❌ Verificación de prototypes falló:
   prototypes/file.html: Línea X: rgb: rgb(0,0,0)
```

---

### Test A4: Token inexistente en CSS real

**Pasos:**
1. Agregar en `<style>` o `style=""` dentro de un bloque AUTORUN:
   ```css
   background: var(--ubits-bg-999);
   ```
2. Ejecutar: `npm run prototypes:verify`

**✅ Resultado esperado:**
```
❌ Verificación de prototypes falló:
   prototypes/file.html: Línea X: Token no encontrado: --ubits-bg-999. ¿Quizás quisiste: --ubits-bg-1, --ubits-bg-2, ...?
```

---

### Test A5: Cambio válido dentro de watermark

**Pasos:**
1. Editar contenido dentro de un bloque AUTORUN válido (sin colores hardcodeados, sin tokens inexistentes)
2. Ejecutar: `npm run prototypes:verify`

**✅ Resultado esperado:**
```
✅ Verificación de prototypes pasó
```

---

## ✅ B) Pre-commit (Staged)

### Test B1: Validar solo staged (no working tree)

**Pasos:**
1. Hacer cambios en `prototypes/...` (algunos con errores, algunos válidos)
2. `git add prototypes/file1.html` (solo una parte con errores)
3. Dejar otros cambios sin stage (con errores también)
4. `git commit`

**✅ Resultado esperado:**
- ✅ Pre-commit ejecuta `npm run prototypes:verify -- --staged`
- ✅ Valida SOLO `file1.html` (staged)
- ✅ NO valida cambios sin stage
- ✅ Si `file1.html` tiene errores → bloquea commit
- ✅ Si `file1.html` es válido → permite commit (aunque working tree tenga errores)

---

## ✅ C) CI / PR (baseRef)

### Test C1: Detectar cambios en PR aunque working tree esté limpio

**Pasos:**
1. Crear PR con cambios en `prototypes/...` (con errores)
2. CI ejecuta workflow

**✅ Verificación del workflow:**
```yaml
- uses: actions/checkout@v3
  with:
    fetch-depth: 0  # ✅ Necesario para comparar contra base

- name: Fetch base ref
  run: git fetch origin ${{ github.base_ref }} --depth=1

- name: Verify prototypes
  run: npm run prototypes:verify -- --base origin/${{ github.base_ref }}
```

**✅ Resultado esperado:**
- ✅ CI detecta cambios comparando contra base del PR
- ✅ Si hay errores → CI falla y bloquea merge
- ✅ Si es válido → CI pasa

---

## ✅ Señal de "DONE" Real

**Si estos 4 casos pasan, está "cerrado" de verdad:**

### ✅ Caso 1: Cambio válido dentro de watermark → verify OK

**Test:**
- Editar contenido dentro de bloque AUTORUN válido
- Sin colores hardcodeados
- Sin tokens inexistentes
- `npm run prototypes:verify`

**✅ Debe pasar sin errores**

---

### ✅ Caso 2: Cambio fuera de watermark → verify FAIL

**Test:**
- Editar línea fuera de bloque AUTORUN
- `npm run prototypes:verify`

**✅ Debe fallar:** `Línea X: Modificación fuera de bloques AUTORUN`

---

### ✅ Caso 3: Hardcoded color en CSS real → verify FAIL

**Test:**
- Agregar `background: #fff;` en `<style>` o `style=""`
- `npm run prototypes:verify`

**✅ Debe fallar:** `Línea X: hex: #fff` o similar

---

### ✅ Caso 4: Token inexistente en CSS real → verify FAIL

**Test:**
- Agregar `background: var(--ubits-bg-999);` en `<style>` o `style=""`
- `npm run prototypes:verify`

**✅ Debe fallar:** `Línea X: Token no encontrado: --ubits-bg-999` con sugerencias

---

## ✅ Enforcement Activo

**Además de los 4 casos, debe haber al menos un enforcement activo:**

### Opción 1: Pre-commit

**Verificar:**
- `.husky/pre-commit` existe
- Ejecuta `npm run prototypes:verify -- --staged`
- Bloquea commit si falla

### Opción 2: CI

**Verificar:**
- `.github/workflows/verify-prototypes.yml` existe
- Ejecuta en PRs con cambios en `prototypes/`
- Bloquea merge si falla

---

## ✅ Checklist de Smoke Tests

### Local (Working Tree)
- [ ] Test A1: Editar línea fuera de watermark → FAIL
- [ ] Test A2: Color hardcodeado en `<style>` → FAIL
- [ ] Test A3: Color hardcodeado en `style=""` → FAIL
- [ ] Test A4: Token inexistente → FAIL con sugerencias
- [ ] Test A5: Cambio válido dentro de watermark → OK

### Pre-commit (Staged)
- [ ] Test B1: Validar solo staged (no working tree) → OK

### CI / PR (baseRef)
- [ ] Test C1: Detectar cambios en PR → OK

### Señal de "DONE" Real
- [ ] Caso 1: Cambio válido → verify OK
- [ ] Caso 2: Cambio fuera de watermark → verify FAIL
- [ ] Caso 3: Hardcoded color → verify FAIL
- [ ] Caso 4: Token inexistente → verify FAIL
- [ ] Al menos un enforcement activo (pre-commit o CI)

---

## 🎯 Conclusión

**Si todos los smoke tests pasan, Mode B está "cerrado" de verdad:**

1. ✅ Detecta cambios fuera de watermark
2. ✅ Detecta colores hardcodeados en CSS real
3. ✅ Detecta tokens inexistentes con sugerencias
4. ✅ Permite cambios válidos dentro de watermark
5. ✅ Funciona en local, pre-commit y CI
6. ✅ Enforcement activo bloquea violaciones

