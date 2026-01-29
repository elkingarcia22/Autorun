# Mode B (prototypeTokens) - Documentación

**Fecha:** 2025-01-03  
**Versión:** 1.0.0

---

## 🎯 Objetivo

Mode B (`prototypeTokens`) es un modo de implementación robusto y fail-closed para componentes en `prototypes/`. Garantiza que:

1. ✅ Todo código insertado tiene watermark v2 con hash
2. ✅ Solo se usan tokens reales (sin colores hardcodeados)
3. ✅ Las dependencias se resuelven desde contratos (no desde Storybook MCP)
4. ✅ Si falta un componente UBITS, se genera un widget tokenizado
5. ✅ El enforcement bloquea cambios manuales fuera de watermarks

---

## 🚀 Uso

### Detección Automática

Mode B se activa automáticamente cuando el archivo objetivo está en `prototypes/`:

```typescript
// Automáticamente usa mode="prototypeTokens"
await autorun.apply({
  message: "Agregar un botón de guardar",
  targetFiles: ["prototypes/canvas-default.html"]
});
```

### Modo Explícito

También puedes especificarlo explícitamente:

```typescript
await autorun.apply({
  message: "Agregar un botón de guardar",
  targetFiles: ["prototypes/canvas-default.html"],
  options: {
    mode: "prototypeTokens"
  }
});
```

---

## 🔍 Verificación

Después de implementar, siempre verifica:

```typescript
await autorun.verify({
  targetFiles: "diff"
});
```

Esto valida:
- ✅ Líneas modificadas están dentro de bloques AUTORUN
- ✅ No hay colores hardcodeados (#hex, rgb, hsl)
- ✅ Todos los tokens usados existen en GlobalTokenRegistry
- ✅ Hash de watermarks coincide

---

## 🛡️ Enforcement

### Pre-Commit Hook

El hook de Husky ejecuta automáticamente:

```bash
npm run prototypes:verify -- --staged
```

Si falla, el commit se bloquea.

### CI Workflow

El workflow `.github/workflows/verify-prototypes.yml` valida en cada PR que modifique `prototypes/`.

---

## 📋 Componentes Creados

### 1. GlobalTokenRegistry
- Carga tokens desde `vendor/ubits/packages/tokens/dist/tokens.css`
- Valida que tokens existan antes de usar
- Sugiere tokens similares si hay typos

### 2. Watermark v2
- Formato: `<!-- AUTORUN: {...} -->...<!-- /AUTORUN -->`
- Incluye hash SHA-256 del contenido
- `startLine` y `endLine` para verificación diff-based

### 3. VerifyDiff
- Usa `git diff -U0` para detectar líneas modificadas
- Valida solo líneas modificadas (no todo el archivo)
- Detecta colores hardcodeados solo en CSS real
- Valida tokens usados en `var(--token)`

### 4. PrototypeTokenKit
- Genera widgets tokenizados (KpiCard, FiltersRow, EmptyState, etc.)
- Solo usa tokens reales (sin colores hardcodeados)
- Valida tokens antes de generar

### 5. HtmlPrototypeAdapter
- Inserta contenido usando anchors estables
- Crea anchors si no existen
- Evita `search_replace` frágil

### 6. ContractStore
- Acceso a contratos UBITS desde stories
- Lee `parameters.ubits` desde código fuente

### 7. DependencyResolver
- Resuelve `dependsOn.required` recursivo
- Filtra `internals` (nunca se implementan)
- Resuelve slots

### 8. CompositionPlanner
- Planifica composición completa con profundidad
- Usa `contract.slots` para ubicar hijos
- Soporta recursión con `maxDepth`

---

## ⚠️ Reglas Críticas

1. **NO usar `write()` o `search_replace()` directos en `prototypes/`**
   - Siempre usar `autorun.apply()`
   - El enforcement bloquea cambios manuales

2. **Tokens solo desde repo local**
   - NO desde Storybook MCP (no existe `getTokens`)
   - Desde `vendor/ubits/packages/tokens/dist/tokens.css`

3. **Dependencias desde contratos**
   - NO desde Storybook MCP
   - Desde `parameters.ubits` en stories

4. **Storybook MCP solo para cross-check**
   - Validar que componente existe
   - Cross-check de props
   - NO para tokens ni dependencias

---

## 📚 Referencias

- `docs/analisis/PLAN-MODE-B-FINAL-CORREGIDO.md` - Plan completo
- `docs/analisis/PLAN-IMPLEMENTACION-MODE-B-ORDEN-EXACTO.md` - Orden de implementación
- `docs/analisis/DEFINITION-OF-DONE-MODE-B.md` - Criterios de completitud

