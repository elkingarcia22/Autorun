# Implementación: Solución Definitiva para Autorun

**Fecha:** 2025-01-03  
**Propósito:** Implementar solución definitiva basada en feedback de ChatGPT para enforcement real de Autorun

---

## 🎯 Cambios Implementados

### ✅ 1. Unificación de Nombres de Servidor MCP

**Problema:** Mismatch entre `storybook-ubits` (en reglas) y `storybook` (en config MCP)

**Solución:**
- ✅ Cambiado todos los `storybook-ubits` → `storybook` en código
- ✅ Actualizado `.cursorrules` para usar `server: "storybook"`
- ✅ Actualizado helpers y mensajes para usar servidor unificado

**Archivos modificados:**
- `.cursorrules` (2 ocurrencias)
- `packages/autorun-core/src/helpers/storybookMCPHelper.ts`
- `packages/autorun-core/src/helpers/executeOnMessageStart.ts`
- `packages/autorun-core/src/helpers/autoMessageHandler.ts`
- `packages/autorun-core/src/helpers/storybookMCPAutoCaller.ts`
- `packages/autorun-core/src/helpers/mcpWithFallback.ts`

---

### ✅ 2. Nuevo Contrato: Solo autorun.apply()

**Problema:** Agente podía usar `write()`/`search_replace()` directamente, saltándose interceptores

**Solución:**
- ✅ Creado `.cursor/rules/00-autorun-enforcement.md` con reglas obligatorias
- ✅ Actualizado `.cursorrules` para prohibir `write()`/`search_replace()` directos
- ✅ Actualizado `.cursorrules` para requerir `autorun.apply()` vía MCP
- ✅ Deprecado `interceptedWrite()`/`interceptedSearchReplace()` en reglas

**Nuevo contrato:**
```typescript
// ✅ OBLIGATORIO
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: { message, targetFiles? }
});

// ❌ PROHIBIDO
await write(filePath, content);
await search_replace(filePath, old, new);
```

---

### ✅ 3. Fail-Closed en autorun.apply()

**Problema:** autorun.apply() no requería consulta a Storybook MCP

**Solución:**
- ✅ Actualizado `autorun.apply()` para requerir mensajes MCP preparados
- ✅ Si no hay mensajes MCP → retorna error (fail-closed)
- ✅ Instrucciones claras para que el agente consulte Storybook MCP ANTES

**Cambios en `autorunApply.ts`:**
```typescript
// 2.1 Consultar Storybook MCP (OBLIGATORIO - FAIL-CLOSED)
if (!result.mcpMessages || result.mcpMessages.length === 0) {
  return {
    success: false,
    errors: ['No se prepararon mensajes MCP para consultar Storybook. Esto es OBLIGATORIO.']
  };
}
```

---

### ✅ 4. Sistema de Watermark Mejorado

**Problema:** Watermark antiguo no era robusto para parsing

**Solución:**
- ✅ Cambiado formato a JSON: `<!-- AUTORUN: {"components":[...],"hash":"..."} -->`
- ✅ Agregada marca de cierre: `<!-- /AUTORUN -->`
- ✅ Mejorado parser para soportar formato nuevo y antiguo (backward compatible)

**Formato nuevo:**
```html
<!-- AUTORUN: {"components":["🧩-ux-accordion"],"storybookId":"...","hash":"..."} -->
...codigo generado...
<!-- /AUTORUN -->
```

**Archivos modificados:**
- `packages/autorun-core/src/mcp-server/helpers/codeMarkGenerator.ts`

---

### ✅ 5. Validación de Patrones Prohibidos en autorun.verify()

**Problema:** No se validaban patrones prohibidos (hex/rgb, inline styles, etc.)

**Solución:**
- ✅ Agregada validación de patrones prohibidos en `autorun.verify()`
- ✅ Detecta: colores hex/rgb hardcodeados, estilos inline con margin/padding
- ✅ Permite CSS vars y clases ubits-*
- ✅ Opción `checkProhibitedPatterns` (habilitada por defecto)

**Patrones detectados:**
- Colores hex hardcodeados (`#fff`, `#000000`)
- Colores RGB hardcodeados (`rgb()`, `rgba()`)
- Estilos inline con margin
- Estilos inline con padding

**Archivos modificados:**
- `packages/autorun-core/src/mcp-server/tools/autorunVerify.ts`

---

### ✅ 6. Regla de Enforcement Creada

**Archivo:** `.cursor/rules/00-autorun-enforcement.md`

**Contenido:**
- Reglas obligatorias (no pueden ser ignoradas)
- Prohibiciones claras
- Flujo obligatorio
- Sistema de watermark explicado
- Consecuencias de violar reglas

---

## 📋 Cambios Pendientes

### ⏳ 5. Hacer autorun.apply() fail-closed: siempre consulta Storybook MCP

**Estado:** Parcialmente implementado

**Lo que falta:**
- autorun.apply() requiere mensajes MCP preparados ✅
- Pero no puede llamar MCP directamente desde Node.js
- El agente DEBE consultar Storybook MCP ANTES de llamar autorun.apply()
- Necesitamos documentar esto claramente

**Próximo paso:**
- Documentar que el agente DEBE consultar Storybook MCP antes de autorun.apply()
- O implementar un sistema que permita a autorun.apply() llamar MCP directamente

---

### ⏳ 6. Agregar detección de subcomponentes (dependsOn/internals)

**Estado:** Pendiente

**Lo que falta:**
- Implementar sistema de metadata en stories de Storybook
- Parser de snippets para detectar `window.UBITS.X.create()` o `<ubits-x>`
- DOM scan en Storybook para detectar componentes internos
- Separación entre `dependsOn` (requeridos) e `internals` (privados)

**Próximo paso:**
- Crear sistema de metadata en stories
- Implementar parser de dependencias
- Integrar en autorun.apply()

---

### ⏳ 8. Actualizar .cursorrules y documentación con nuevo contrato

**Estado:** Parcialmente implementado

**Lo que falta:**
- Actualizar todas las referencias a `interceptedWrite()`/`interceptedSearchReplace()`
- Actualizar guías de implementación
- Actualizar documentación de MCP

---

## 🎯 Resultado Esperado

Con estos cambios:

1. ✅ **Unificación:** Todos usan `server: "storybook"` (no más confusiones)
2. ✅ **Contrato claro:** Solo `autorun.apply()` (no más `write()` directo)
3. ✅ **Fail-closed:** autorun.apply() requiere Storybook MCP
4. ✅ **Watermark robusto:** Formato JSON para parsing confiable
5. ✅ **Validación:** autorun.verify() detecta patrones prohibidos
6. ✅ **Enforcement:** Reglas claras en `.cursor/rules/00-autorun-enforcement.md`

**El agente ya NO puede saltarse el flujo automático** porque:
- Si usa `write()` directo → `autorun.verify()` falla (no tiene watermark)
- Si no consulta Storybook MCP → `autorun.apply()` falla (fail-closed)
- Si modifica código manualmente → `autorun.verify()` detecta hash inválido

---

## 📝 Notas de Implementación

### Limitación Actual

**autorun.apply() no puede llamar MCP directamente desde Node.js**

**Solución temporal:**
- autorun.apply() requiere que el agente consulte Storybook MCP ANTES
- Instrucciones claras en logs para que el agente ejecute la consulta
- Si el agente no consulta → autorun.apply() puede fallar en extracción

**Solución futura:**
- Implementar cliente MCP en Node.js para que autorun.apply() pueda llamar directamente
- O usar un sistema de "pre-flight" que valide que Storybook MCP fue consultado

---

## 🔄 Próximos Pasos

1. ✅ Completar unificación de nombres
2. ✅ Crear regla de enforcement
3. ✅ Mejorar sistema de watermark
4. ✅ Agregar validación de patrones prohibidos
5. ⏳ Documentar que el agente DEBE consultar Storybook MCP antes de autorun.apply()
6. ⏳ Implementar detección de subcomponentes
7. ⏳ Actualizar toda la documentación

---

**Última actualización:** 2025-01-03


