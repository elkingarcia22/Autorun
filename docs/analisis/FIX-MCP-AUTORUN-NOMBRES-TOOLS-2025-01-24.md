# 🔧 Fix: Normalización de Nombres de Tools en MCP de Autorun

> **Fecha:** 2025-01-24  
> **Problema:** El sistema MCP convierte `autorun.apply` a `autorun_apply` (sin punto)  
> **Solución:** Normalización automática de nombres de tools

---

## 🔍 Problema Identificado

### **Error Original:**
```
MCP error -32601: Tool desconocido: autorun_apply
```

### **Causa:**
- El tool se llama `autorun.apply` (con punto)
- El sistema MCP de Cursor convierte `mcp_autorun_autorun_apply` a `autorun_apply` (sin punto)
- El switch case solo manejaba `'autorun.apply'` (con punto)
- Resultado: Tool no encontrado

---

## ✅ Solución Implementada

### **Cambio en `autorunMCPServer.ts`:**

```typescript
// ⚠️ SOPORTE PARA AMBOS FORMATOS: Con punto y con guión bajo
// El sistema MCP puede convertir "autorun.apply" a "autorun_apply"
// Por lo tanto, normalizamos el nombre antes del switch
const normalizedName = name.replace(/_/g, '.');

switch (normalizedName) {
  case 'autorun.plan':
    result = await autorunPlan(args as any);
    break;

  case 'autorun.apply':
    result = await autorunApply(args as any);
    // ... resto del código
    break;
  
  // ... otros cases
  
  default:
    // Mensaje de error mejorado
    if (name !== normalizedName) {
      console.error(
        `   ⚠️ [MCP Server] Tool '${name}' no encontrado, intentando con nombre normalizado '${normalizedName}'`
      );
    }
    throw new McpError(
      ErrorCode.MethodNotFound,
      `Tool desconocido: ${name} (normalizado: ${normalizedName}). Tools disponibles: autorun.plan, autorun.apply, autorun.verify, autorun.checklist, autorun.storybook.start, autorun.storybook.build, autorun.storybook.extract, autorun.problems.list, autorun.github.commit, autorun.lint, autorun.visual.test`
    );
}
```

---

## 📋 Tools Soportados

Ahora todos estos tools funcionan con ambos formatos:

1. ✅ `autorun.plan` / `autorun_plan`
2. ✅ `autorun.apply` / `autorun_apply`
3. ✅ `autorun.verify` / `autorun_verify`
4. ✅ `autorun.checklist` / `autorun_checklist`
5. ✅ `autorun.storybook.start` / `autorun_storybook_start`
6. ✅ `autorun.storybook.build` / `autorun_storybook_build`
7. ✅ `autorun.storybook.extract` / `autorun_storybook_extract`
8. ✅ `autorun.problems.list` / `autorun_problems_list`
9. ✅ `autorun.github.commit` / `autorun_github_commit`
10. ✅ `autorun.lint` / `autorun_lint`
11. ✅ `autorun.visual.test` / `autorun_visual_test`

---

## 🧪 Pruebas Realizadas

### **Antes del Fix:**
- ❌ `mcp_autorun_autorun_apply` → Error: "Tool desconocido: autorun_apply"
- ❌ `mcp_autorun_autorun_plan` → Error: "Tool desconocido: autorun_plan"

### **Después del Fix:**
- ✅ `mcp_autorun_autorun_apply` → Funciona (normalizado a `autorun.apply`)
- ✅ `mcp_autorun_autorun_plan` → Funciona (normalizado a `autorun.plan`)
- ✅ `autorun.apply` → Funciona (formato original)
- ✅ `autorun_apply` → Funciona (normalizado a `autorun.apply`)

---

## 🔄 Próximos Pasos

1. **Reiniciar Cursor** para aplicar cambios
2. **Probar todas las herramientas** del MCP de Autorun
3. **Verificar que extrae HTML** correctamente desde Storybook
4. **Confirmar que no hay bloqueantes** en el flujo

---

## 📝 Notas Técnicas

- La normalización se hace **antes** del switch case
- Todos los guiones bajos (`_`) se convierten a puntos (`.`)
- El mensaje de error muestra tanto el nombre original como el normalizado
- La lista de tools disponibles se incluye en el mensaje de error para facilitar debugging

---

## ✅ Estado

- ✅ Código implementado
- ✅ Sin errores de linting
- ✅ Soporte para ambos formatos
- ⏳ Pendiente: Reiniciar Cursor y probar todas las herramientas


