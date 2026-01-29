# 🔄 Migración al Nuevo Storybook MCP

**Fecha:** 2025-01-03  
**MCP Anterior:** (desconocido, fallaba con "fetch failed")  
**Nuevo MCP:** [mcpland/storybook-mcp](https://github.com/mcpland/storybook-mcp)

---

## 🎯 Objetivo

Migrar de un MCP de Storybook que fallaba a uno funcional y bien mantenido.

---

## ✅ Cambios Realizados

### **1. Configuración del MCP**

**Archivo:** `~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`

**Configuración actualizada:**
```json
{
  "mcpServers": {
    "storybook-ubits": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://ubits-storybook10.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT"
      }
    }
  }
}
```

### **2. Nuevo Archivo: Mapeo de IDs a Nombres**

**Archivo:** `packages/autorun-core/src/helpers/storybookMCPNameMapper.ts`

**Propósito:** El nuevo MCP usa nombres de componentes (ej: `"Button"`) en lugar de IDs de Storybook (ej: `"basicos-button"`). Este archivo proporciona el mapeo automático.

**Funciones principales:**
- `storybookIdToComponentName()` - Convierte ID a nombre
- `storybookIdsToComponentNames()` - Convierte múltiples IDs a nombres
- `componentNameToStorybookId()` - Convierte nombre a ID (mapeo inverso)

### **3. Actualización de `mcpClient.ts`**

**Cambios:**
- Usa `storybook-ubits` como servidor (en lugar de `storybook`)
- Convierte automáticamente `componentIds` a `componentNames` cuando se usa `getComponentsProps`

### **4. Actualización de Nombres de Herramientas**

**ANTES:**
- `mcp_storybook_getComponentsProps`
- `mcp_storybook_getComponentList`

**AHORA:**
- `getComponentsProps`
- `getComponentList`

### **5. Actualización de Parámetros**

**ANTES:**
```typescript
{
  componentIds: ["basicos-button"]
}
```

**AHORA:**
```typescript
{
  componentNames: ["Button"]
}
```

### **6. Archivos Actualizados**

1. ✅ `packages/autorun-core/src/helpers/storybookMCPNameMapper.ts` (nuevo)
2. ✅ `packages/autorun-core/src/helpers/mcpClient.ts`
3. ✅ `packages/autorun-core/src/helpers/storybookMCPAutoCaller.ts`
4. ✅ `packages/autorun-core/src/helpers/autoMessageHandler.ts`
5. ✅ `packages/autorun-core/src/helpers/executeOnMessageStart.ts`
6. ✅ `packages/autorun-core/src/helpers/mcpWithFallback.ts`
7. ✅ `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`

---

## 🔍 Diferencias Clave

### **1. Nombres de Componentes vs IDs**

El nuevo MCP espera nombres de componentes como aparecen en Storybook:
- ✅ `"Button"` (correcto)
- ❌ `"basicos-button"` (incorrecto - es un ID)

**Solución:** Mapeo automático en `storybookMCPNameMapper.ts`

### **2. Nombre de Herramientas**

El nuevo MCP no usa prefijos:
- ✅ `getComponentsProps` (correcto)
- ❌ `mcp_storybook_getComponentsProps` (incorrecto - prefijo del MCP anterior)

### **3. Parámetros**

El nuevo MCP usa `componentNames` en lugar de `componentIds`:
- ✅ `{ componentNames: ["Button"] }` (correcto)
- ❌ `{ componentIds: ["basicos-button"] }` (incorrecto)

---

## 📋 Próximos Pasos

1. **Reiniciar Cursor completamente**
2. **Verificar que el MCP esté activo** (debe aparecer verde)
3. **Probar con:**
   ```
   "Lista los componentes disponibles en Storybook"
   ```
   O:
   ```
   "¿Cuáles son las props del componente Button?"
   ```

---

## 🐛 Problemas Conocidos

### **1. MCP aparece verde pero no funciona**

**Causa:** El nombre del servidor no coincide.

**Solución:** Verificar que el servidor se llame `storybook-ubits` en la configuración y en el código.

### **2. "Component not found"**

**Causa:** El nombre del componente no coincide con el nombre en Storybook.

**Solución:** Verificar el mapeo en `storybookMCPNameMapper.ts` o usar `getComponentList` para ver los nombres exactos.

---

## 📚 Referencias

- **Repositorio del nuevo MCP:** https://github.com/mcpland/storybook-mcp
- **Guía de configuración:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP-NUEVO.md`

---

**Última actualización:** 2025-01-03


