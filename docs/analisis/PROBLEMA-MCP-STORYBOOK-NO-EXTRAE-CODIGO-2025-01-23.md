# 🔍 Análisis: Por qué el MCP de Storybook NO puede extraer código HTML

**Fecha:** 2025-01-23  
**Problema:** El MCP de Storybook no puede extraer código HTML de la pestaña "Code"  
**Pregunta:** ¿El MCP no puede hacerlo o al Storybook le falta algo?

---

## 📋 Resumen Ejecutivo

**Respuesta:** El MCP de Storybook **NO tiene una herramienta** para extraer código HTML. Solo tiene 2 herramientas:
1. ✅ `getComponentList` - Lista componentes
2. ✅ `getComponentsProps` - Obtiene props desde la tabla de controles

**❌ NO tiene:** Herramienta para extraer código HTML de la pestaña "Code"

---

## 🔍 Análisis del MCP de Storybook

### **Herramientas Disponibles**

El MCP de Storybook (`storybook-mcp` de `mcpland`) solo proporciona:

1. **`getComponentList`**
   - Lista todos los componentes disponibles
   - Accede a `index.json` de Storybook
   - Retorna: Array de nombres de componentes

2. **`getComponentsProps`**
   - Obtiene props estructuradas desde la tabla de controles
   - Usa navegador headless (Playwright) para navegar a Storybook
   - Extrae información de la tabla de props en la pestaña "Controls"
   - Retorna: Props con tipos, defaults, descripciones

**❌ NO tiene:**
- Herramienta para extraer código HTML
- Herramienta para acceder a la pestaña "Code"
- Herramienta para obtener código de implementación

---

## 🔍 ¿Por qué NO puede extraer código HTML?

### **1. Limitación del MCP**

El MCP de Storybook está diseñado para:
- ✅ Obtener metadatos (`index.json`)
- ✅ Obtener props desde la tabla de controles
- ❌ **NO está diseñado** para extraer código HTML

### **2. El código HTML está en la pestaña "Code"**

El código HTML está en la pestaña "Code" de Storybook, que:
- Se carga dinámicamente con JavaScript
- No está en el HTML inicial servido por el servidor
- Requiere navegar a Storybook, hacer clic en "Code", y esperar a que se cargue

### **3. El MCP solo accede a la pestaña "Controls"**

`getComponentsProps` navega a Storybook pero solo accede a la pestaña "Controls" para extraer props. No accede a la pestaña "Code".

---

## 💡 Soluciones Posibles

### **Solución 1: Agregar herramienta personalizada al MCP**

El MCP de Storybook soporta herramientas personalizadas mediante `CUSTOM_TOOLS`:

```json
{
  "mcpServers": {
    "storybook-ubits": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://ubits-storybook10.vercel.app/index.json",
        "CUSTOM_TOOLS": "[{\"name\":\"getComponentCode\",\"description\":\"Get HTML code from Storybook Code tab\",\"parameters\":{\"type\":\"object\",\"properties\":{\"componentId\":{\"type\":\"string\"},\"storyName\":{\"type\":\"string\"}},\"required\":[\"componentId\"]},\"page\":\"https://ubits-storybook10.vercel.app/?path=/story/{componentId}--{storyName}\",\"handler\":\"document.querySelector('[data-testid=\\\"code-tab\\\"]')?.click(); setTimeout(() => document.querySelector('.sb-code pre')?.textContent || '', 1000)\"}]"
      }
    }
  }
}
```

**Ventajas:**
- ✅ Se integra con el MCP existente
- ✅ Usa el mismo navegador headless
- ✅ Puede acceder a la pestaña "Code"

**Desventajas:**
- ❌ Requiere configuración manual
- ❌ El handler JavaScript puede ser frágil
- ❌ Depende de la estructura HTML de Storybook

---

### **Solución 2: Usar Browser MCP directamente**

Usar Browser MCP de Cursor para navegar y extraer código:

```typescript
// 1. Navegar a Storybook
await browser_navigate({ 
  url: `https://ubits-storybook10.vercel.app/?path=/story/${componentId}--${storyName}` 
});

// 2. Hacer clic en pestaña "Code"
await browser_click({ 
  element: "Code tab", 
  ref: "button[aria-label='Code']" 
});

// 3. Esperar a que se cargue el código
await browser_wait_for({ text: "<button" });

// 4. Tomar snapshot
const snapshot = await browser_snapshot();

// 5. Extraer código del snapshot
const code = extractCodeFromSnapshot(snapshot);
```

**Ventajas:**
- ✅ Ya está disponible
- ✅ Puede ejecutar JavaScript
- ✅ Puede extraer código desde snapshot

**Desventajas:**
- ❌ Requiere navegación manual
- ❌ Requiere múltiples pasos
- ❌ Depende de la estructura HTML de Storybook

---

### **Solución 3: Mejorar el MCP de Storybook**

Crear un fork o contribuir al MCP de Storybook para agregar una herramienta `getComponentCode`:

```typescript
{
  name: "getComponentCode",
  description: "Get HTML code from Storybook Code tab",
  inputSchema: {
    type: "object",
    properties: {
      componentId: { type: "string" },
      storyName: { type: "string", default: "default" }
    },
    required: ["componentId"]
  }
}
```

**Ventajas:**
- ✅ Solución permanente
- ✅ Integrada en el MCP
- ✅ Reutilizable para otros proyectos

**Desventajas:**
- ❌ Requiere desarrollo significativo
- ❌ Requiere mantener fork o contribuir al proyecto original

---

## 🎯 Recomendación

**Solución inmediata:** Usar Browser MCP directamente en `extractExactCodeFromStorybookWithBrowser()`:
1. Navegar a Storybook
2. Hacer clic en pestaña "Code"
3. Esperar a que se cargue
4. Extraer código desde snapshot

**Solución a largo plazo:** Agregar herramienta personalizada al MCP de Storybook usando `CUSTOM_TOOLS` o contribuir al proyecto para agregar `getComponentCode`.

---

## 📊 Comparación de Soluciones

| Solución | Complejidad | Tiempo | Mantenibilidad | Factibilidad |
|----------|-------------|--------|----------------|--------------|
| **Herramienta personalizada** | Media | 1-2 horas | Media | 🟢 ALTA |
| **Browser MCP directo** | Baja | 30 min | Alta | 🟢 ALTA |
| **Mejorar MCP** | Alta | 1-2 días | Alta | 🟡 MEDIA |

---

## ✅ Conclusión

**El MCP de Storybook NO puede extraer código HTML porque:**
1. ❌ No tiene una herramienta para hacerlo
2. ❌ Solo está diseñado para obtener props desde la tabla de controles
3. ❌ No accede a la pestaña "Code"

**Solución:** Usar Browser MCP directamente para navegar y extraer código desde el snapshot después de que se cargue la pestaña "Code".

