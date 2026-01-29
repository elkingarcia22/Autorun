# 🔧 Plan: Rehacer MCP de Autorun v3

**Fecha:** 2025-01-29  
**Objetivo:** Crear un MCP simple, robusto y funcional desde cero

---

## ✅ Cambios Realizados

### **1. Nuevo MCP Server v3**

**Archivos creados:**
- `packages/autorun-core/src/mcp-server-v3/server.ts` - Servidor principal simple
- `packages/autorun-core/src/mcp-server-v3/tools/apply.ts` - Tool autorun.apply simplificado
- `packages/autorun-core/src/cli/autorun-mcp-server-v3.ts` - CLI de entrada

**Características:**
- ✅ Sin complejidad innecesaria
- ✅ Manejo robusto de errores
- ✅ Logs claros y útiles
- ✅ Solo herramienta esencial: `autorun.apply()`

### **2. Fix ContractStore**

**Archivo:** `packages/autorun-core/src/ubits/ContractStore.ts`

**Cambio:**
- ✅ Cachea contratos con AMBOS IDs (Storybook ID y componentId del contrato)
- ✅ Resuelve el problema de desajuste de IDs (`layout-card-content` vs `🧩-ux-card-content`)

---

## 📋 Próximos Pasos

### **1. Actualizar Configuración MCP**

**Archivo:** `.cursor/mcp.json`

**Cambio necesario:**
```json
{
  "mcpServers": {
    "autorun": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "packages/autorun-core/src/cli/autorun-mcp-server-v3.ts"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### **2. Probar con Componente Pequeño**

**Componente sugerido:** Button (simple, sin dependencias)

**Comando de prueba:**
```
"implementar un button primario con texto 'Hola'"
```

### **3. Verificar Funcionamiento**

- ✅ MCP se inicia correctamente
- ✅ Tool `autorun.apply` está disponible
- ✅ Implementación funciona sin errores
- ✅ ContractStore encuentra contratos correctamente

---

## 🔍 Debugging

Si el MCP falla:

1. **Verificar logs en stderr:**
   - Los logs del MCP van a `stderr` (no `stdout`)
   - Buscar mensajes que empiecen con `[Autorun MCP v3]`

2. **Verificar configuración:**
   - Archivo `.cursor/mcp.json` tiene la ruta correcta
   - El archivo `autorun-mcp-server-v3.ts` existe y es ejecutable

3. **Verificar compilación:**
   - Ejecutar `npm run build` en `packages/autorun-core`
   - Verificar que no hay errores de TypeScript

---

## 🎯 Objetivo Final

**Un MCP que:**
- ✅ Funciona sin errores
- ✅ Implementa cualquier componente de Storybook
- ✅ Maneja errores de forma robusta
- ✅ Proporciona logs útiles para debugging

---

**Última actualización:** 2025-01-29
