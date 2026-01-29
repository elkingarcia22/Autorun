# 📚 Guía: Configuración del Nuevo Storybook MCP

**Fecha:** 2025-01-03  
**MCP:** [storybook-mcp](https://github.com/mcpland/storybook-mcp)

---

## 🎯 ¿Qué es el Nuevo Storybook MCP?

El nuevo MCP de Storybook ([mcpland/storybook-mcp](https://github.com/mcpland/storybook-mcp)) es un servidor MCP que proporciona herramientas para interactuar con la documentación y componentes de Storybook.

### Características:

- ✅ **getComponentList**: Lista todos los componentes disponibles en Storybook
- ✅ **getComponentsProps**: Obtiene información detallada de props para múltiples componentes usando automatización de navegador headless
- ✅ **Custom Tools**: Permite crear herramientas personalizadas para extraer información específica de Storybook

---

## ⚡ Configuración Automática (Recomendado)

### **Usar el Script Automático** ⭐

```bash
npm run setup-storybook-mcp
```

**El script:**
- ✅ Detecta automáticamente si Storybook local está corriendo
- ✅ Usa Vercel con token de bypass si Storybook local no está disponible
- ✅ Escribe la configuración automáticamente en Cursor
- ✅ Muestra instrucciones claras

---

## 🔧 Configuración Manual del MCP en Cursor

### **1. Ubicación del Archivo de Configuración**

**macOS:**
```
~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json
```

**Windows:**
```
%APPDATA%\Cursor\User\globalStorage\rooveterinaryinc.roo-cline\settings\cline_mcp_settings.json
```

**Linux:**
```
~/.config/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json
```

### **2. Configuración para UBITS Storybook**

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

### **3. Configuración para Storybook Local (Opcional)**

Si tienes Storybook corriendo localmente:

```json
{
  "mcpServers": {
    "storybook-ubits": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "http://localhost:6006/index.json"
      }
    }
  }
}
```

---

## 🛠️ Herramientas Disponibles

### **1. getComponentList**

Lista todos los componentes disponibles en Storybook.

**Ejemplo de uso:**
```
"Lista los componentes disponibles en Storybook"
```

**Resultado esperado:**
```
Available components:
Accordion
Avatar
Badge
Button
...
```

### **2. getComponentsProps**

Obtiene información detallada de props para múltiples componentes.

**Parámetros:**
- `componentNames` (array de strings): Array de nombres de componentes (ej: `["Button", "Input", "Avatar"]`)

**⚠️ IMPORTANTE:** 
- El nuevo MCP usa **nombres de componentes** (ej: `"Button"`), NO IDs de Storybook (ej: `"basicos-button"`)
- El código de Autorun convierte automáticamente los IDs a nombres usando `storybookMCPNameMapper.ts`

**Ejemplo de uso:**
```
"¿Cuáles son las props del componente Button?"
```

**Resultado esperado:**
```
Props del componente Button:
- variant: 'primary' | 'secondary' | 'tertiary' (default: 'primary')
- size: 'xs' | 'sm' | 'md' | 'lg' (default: 'md')
- text: string
- icon: string (opcional)
...
```

---

## 🔄 Cambios en el Código de Autorun

### **1. Mapeo de IDs a Nombres**

El nuevo MCP usa nombres de componentes en lugar de IDs de Storybook. Autorun incluye un mapeo automático:

**Archivo:** `packages/autorun-core/src/helpers/storybookMCPNameMapper.ts`

**Ejemplos de mapeo:**
- `basicos-button` → `Button`
- `formularios-input` → `Input`
- `feedback-modal` → `Modal`

### **2. Nombre de las Herramientas**

**ANTES (MCP anterior):**
- `mcp_storybook_getComponentsProps`
- `mcp_storybook_getComponentList`

**AHORA (Nuevo MCP):**
- `getComponentsProps`
- `getComponentList`

### **3. Parámetros**

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

---

## ✅ Verificación

### **1. Reiniciar Cursor**

Después de configurar el MCP, **reinicia Cursor completamente**.

### **2. Verificar que el MCP esté Activo**

El MCP debe aparecer **verde** en Cursor con las herramientas disponibles.

### **3. Probar el MCP**

Prueba con:
```
"Lista los componentes disponibles en Storybook"
```

O:
```
"¿Cuáles son las props del componente Button?"
```

---

## 🐛 Solución de Problemas

### **Problema: "fetch failed"**

**Causa:** El servidor MCP no puede conectarse a Storybook.

**Solución:**
1. Verifica que la URL del Storybook sea correcta
2. Si usas Vercel, verifica que el token de bypass sea válido
3. Verifica que el Storybook esté accesible desde tu navegador

### **Problema: "Component not found"**

**Causa:** El nombre del componente no coincide con el nombre en Storybook.

**Solución:**
1. Verifica el mapeo en `storybookMCPNameMapper.ts`
2. Usa `getComponentList` para ver los nombres exactos de los componentes

### **Problema: MCP aparece verde pero no funciona**

**Causa:** El nombre del servidor no coincide.

**Solución:**
1. Verifica que el servidor se llame `storybook-ubits` en la configuración
2. Verifica que el código use `storybook-ubits` como servidor

---

## 📋 Requisitos

- Node.js 18.0.0 o superior
- Chromium browser (se instala automáticamente con Playwright cuando se ejecuta el MCP)

---

## 🔗 Referencias

- **Repositorio del MCP:** https://github.com/mcpland/storybook-mcp
- **Documentación oficial:** Ver README.md del repositorio
- **Storybook UBITS:** https://ubits-storybook10.vercel.app

---

**Última actualización:** 2025-01-03


