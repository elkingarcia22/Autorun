# ✅ Señal de "DONE" Real - Mode B

**Fecha:** 2025-01-03  
**Propósito:** Criterios definitivos para considerar Mode B "cerrado" de verdad

---

## 🎯 Los 4 Casos Críticos

**Si estos 4 casos pasan, está "cerrado" de verdad:**

---

### ✅ Caso 1: Cambio válido dentro de watermark → verify OK

**Test:**
```bash
# 1. Editar contenido dentro de bloque AUTORUN válido
#    - Sin colores hardcodeados
#    - Sin tokens inexistentes
#    - Dentro de watermark

# 2. Ejecutar verify
npm run prototypes:verify
```

**✅ Resultado esperado:**
```
✅ Verificación de prototypes pasó
```

**✅ Criterio:** Debe pasar sin errores

---

### ✅ Caso 2: Cambio fuera de watermark → verify FAIL

**Test:**
```bash
# 1. Editar línea fuera de bloque AUTORUN
#    (cualquier línea que no esté entre <!-- AUTORUN: ... --> y <!-- /AUTORUN -->)

# 2. Ejecutar verify
npm run prototypes:verify
```

**✅ Resultado esperado:**
```
❌ Verificación de prototypes falló:
   prototypes/file.html: Línea X: Modificación fuera de bloques AUTORUN
```

**✅ Criterio:** Debe fallar con error claro

---

### ✅ Caso 3: Hardcoded color en CSS real → verify FAIL

**Test:**
```bash
# 1. Agregar color hardcodeado en CSS real:
#    - En <style>: background: #fff;
#    - En style="": color: rgb(0,0,0);
#    - Dentro de bloque AUTORUN

# 2. Ejecutar verify
npm run prototypes:verify
```

**✅ Resultado esperado:**
```
❌ Verificación de prototypes falló:
   prototypes/file.html: Línea X: hex: #fff
   # O
   prototypes/file.html: Línea X: rgb: rgb(0,0,0)
```

**✅ Criterio:** Debe fallar detectando el color hardcodeado

---

### ✅ Caso 4: Token inexistente en CSS real → verify FAIL

**Test:**
```bash
# 1. Agregar token inexistente en CSS real:
#    - En <style>: background: var(--ubits-bg-999);
#    - En style="": color: var(--ubits-fg-999);
#    - Dentro de bloque AUTORUN

# 2. Ejecutar verify
npm run prototypes:verify
```

**✅ Resultado esperado:**
```
❌ Verificación de prototypes falló:
   prototypes/file.html: Línea X: Token no encontrado: --ubits-bg-999. ¿Quizás quisiste: --ubits-bg-1, --ubits-bg-2, --ubits-bg-3?
```

**✅ Criterio:** Debe fallar con sugerencias de tokens similares

---

## ✅ Enforcement Activo (Obligatorio)

**Además de los 4 casos, DEBE haber al menos un enforcement activo:**

### Opción 1: Pre-commit

**Verificar:**
- ✅ `.husky/pre-commit` existe
- ✅ Ejecuta `npm run prototypes:verify -- --staged`
- ✅ Bloquea commit si falla

**Test:**
```bash
# 1. Hacer cambio inválido en prototypes/
# 2. git add prototypes/file.html
# 3. git commit

# ✅ Debe bloquear commit con error
```

---

### Opción 2: CI

**Verificar:**
- ✅ `.github/workflows/verify-prototypes.yml` existe
- ✅ Ejecuta en PRs con cambios en `prototypes/`
- ✅ Bloquea merge si falla

**Test:**
```bash
# 1. Crear PR con cambios inválidos en prototypes/
# 2. CI ejecuta verify

# ✅ Debe fallar CI y bloquear merge
```

---

## ✅ Checklist de "DONE" Real

### Los 4 Casos Críticos
- [ ] Caso 1: Cambio válido dentro de watermark → verify OK
- [ ] Caso 2: Cambio fuera de watermark → verify FAIL
- [ ] Caso 3: Hardcoded color en CSS real → verify FAIL
- [ ] Caso 4: Token inexistente en CSS real → verify FAIL

### Enforcement Activo
- [ ] Pre-commit activo Y bloquea commits inválidos
- [ ] O CI activo Y bloquea PRs inválidos

---

## 🎯 Conclusión

**Mode B está "cerrado" de verdad cuando:**

1. ✅ Los 4 casos críticos pasan (OK en válidos, FAIL en inválidos)
2. ✅ Al menos un enforcement está activo y funcionando
3. ✅ Smoke tests pasan en local, pre-commit y CI

**Si falta cualquiera de estos, NO está "cerrado" de verdad.**

