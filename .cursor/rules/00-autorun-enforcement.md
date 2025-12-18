# AUTORUN ENFORCEMENT (OBLIGATORIO)

> **⚠️ CRÍTICO:** Estas reglas son OBLIGATORIAS y NO pueden ser ignoradas.

---

## 🚨 REGLAS DE IMPLEMENTACIÓN

Cuando el usuario pida UI/componentes:

### ❌ PROHIBIDO

- **PROHIBIDO** usar `write()` / `search_replace()` directo en `prototypes/`
- **PROHIBIDO** inventar HTML/CSS sin consultar Storybook
- **PROHIBIDO** usar `interceptedWrite()` o `interceptedSearchReplace()` (deprecado)

### ✅ OBLIGATORIO

- **OBLIGATORIO** usar MCP tool: `autorun.apply({ message, targetFiles? })`
- **OBLIGATORIO** al final correr `autorun.verify({ targetFiles: "diff" })`
- **OBLIGATORIO** copiar el snippet exacto desde Storybook (no inventar)

### ⚠️ FAIL-CLOSED

Si `autorun.apply` o Storybook MCP no están disponibles:
- **NO implementar**
- **Solo reportar el error y el plan**
- **NO usar write() o search_replace() como fallback**

---

## 🔍 CONSULTA AUTOMÁTICA A STORYBOOK

`autorun.apply()` **SIEMPRE** consulta Storybook MCP automáticamente:

1. **Obtiene lista de componentes:** `storybook.mcp_storybook_getComponentList`
2. **Obtiene props exactas:** `storybook.mcp_storybook_getComponentsProps`
3. **Extrae código exacto:** Desde Storybook en Vercel

Si Storybook MCP falla → **fail closed** (no escribes nada).

---

## 🎯 SERVIDOR MCP CORRECTO

**Server de Storybook:** `storybook` (NO `storybook-ubits`)

**Tools disponibles:**
- `mcp_storybook_getComponentList` - Lista componentes
- `mcp_storybook_getComponentsProps` - Obtiene props exactas

**Server de Autorun:** `autorun`

**Tools disponibles:**
- `autorun.plan` - Genera plan
- `autorun.apply` ⭐ - Implementa componentes (OBLIGATORIO)
- `autorun.verify` - Verifica implementación

---

## 📋 FLUJO OBLIGATORIO

```
1. Usuario pide implementar componente
   ↓
2. Llamar autorun.apply({ message, targetFiles? })
   ↓
3. autorun.apply() automáticamente:
   - Detecta componente
   - Consulta Storybook MCP (OBLIGATORIO)
   - Extrae código exacto
   - Valida estructura
   - Escribe con watermark
   ↓
4. Llamar autorun.verify({ targetFiles: "diff" })
   ↓
5. Si verify falla → REVERTIR cambios
```

---

## 🛡️ WATERMARK SYSTEM

Todo código generado por Autorun incluye watermark:

```html
<!-- AUTORUN: {"components":["🧩-ux-accordion"],"stories":["..."],"hash":"..."} -->
...codigo generado...
<!-- /AUTORUN -->
```

**autorun.verify() valida:**
- ✅ Cambios en `prototypes/` tienen watermark
- ✅ Hash coincide con snippet canónico
- ✅ No hay patrones prohibidos (hex/rgb, inline styles, clases fuera del DS)

**Si verify falla → cambios son inválidos**

---

## ⚠️ CONSECUENCIAS DE VIOLAR ESTAS REGLAS

1. **Cambios sin watermark** → `autorun.verify()` falla
2. **Cambios sin consultar Storybook** → `autorun.apply()` falla (fail-closed)
3. **Uso de write()/search_replace() directo** → Cambios no pasan verify
4. **En CI/pre-commit** → verify automático bloquea commits inválidos

---

**Última actualización:** 2025-01-03


