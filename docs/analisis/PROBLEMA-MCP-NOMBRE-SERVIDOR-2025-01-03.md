# 🔍 Análisis: Problema con Nombre del Servidor MCP

**Fecha:** 2025-01-03  
**Problema:** MCP aparece verde con herramientas activas pero no funciona

---

## 🔍 Problema Identificado

El servidor MCP está configurado con el nombre `storybook-ubits`, pero el código está buscando:
- `storybook-ubits-mcp` (en `mcpWithFallback.ts`)
- `storybook` (fallback)

**Configuración actual:**
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

**Código que busca el servidor:**
```typescript
// packages/autorun-core/src/helpers/mcpWithFallback.ts
function getMCPServerForStorybook(config: any): string {
  const urlToServer: Record<string, string> = {
    'https://ubits-storybook10.vercel.app': 'storybook-ubits-mcp', // ❌ Busca 'storybook-ubits-mcp'
    // ...
  };
  return urlToServer[baseUrl] || 'storybook'; // Fallback a 'storybook'
}
```

---

## ✅ Solución

Hay dos opciones:

### **Opción 1: Cambiar el nombre del servidor en la configuración** (Recomendado)

Cambiar `storybook-ubits` a `storybook-ubits-mcp` en el archivo de configuración:

```json
{
  "mcpServers": {
    "storybook-ubits-mcp": {  // ← Cambiar aquí
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://ubits-storybook10.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT"
      }
    }
  }
}
```

### **Opción 2: Cambiar el código para usar `storybook-ubits`**

Actualizar `mcpWithFallback.ts` para usar `storybook-ubits`:

```typescript
function getMCPServerForStorybook(config: any): string {
  const urlToServer: Record<string, string> = {
    'https://ubits-storybook10.vercel.app': 'storybook-ubits', // ← Cambiar aquí
    // ...
  };
  return urlToServer[baseUrl] || 'storybook';
}
```

---

## 🔧 Verificación

Después de cambiar, verificar:

1. **Reiniciar Cursor completamente**
2. **Verificar que el MCP esté activo:**
   - Debe aparecer verde en Cursor
   - Debe mostrar las herramientas disponibles
3. **Probar con:**
   ```
   "Lista los componentes disponibles en Storybook"
   ```

---

## 📋 Herramientas Esperadas del MCP de Storybook

El servidor `storybook-mcp` debe exponer estas herramientas:
- `getComponentList` - Lista todos los componentes
- `getComponentsProps` - Obtiene props de componentes específicos

**Nombre de las herramientas en Cursor:**
- `mcp_storybook_getComponentList`
- `mcp_storybook_getComponentsProps`

---

**Última actualización:** 2025-01-03


