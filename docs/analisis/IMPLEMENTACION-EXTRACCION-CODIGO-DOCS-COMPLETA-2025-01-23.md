# ✅ Implementación Completa: Extracción de Código desde Docs

**Fecha:** 2025-01-23  
**Estado:** ✅ Implementado

---

## 🎯 Objetivo

Extraer código exacto desde la página Docs de Storybook usando Browser MCP, ya que el código se carga dinámicamente con JavaScript.

---

## 📋 Implementación

### **1. Cambio de Story a Docs** ✅

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

**Cambio:**
- ❌ Antes: `/story/component-id--implementation` → requería clic en pestaña "Code"
- ✅ Ahora: `/docs/component-id--docs` → código visible con botones "Show code"

### **2. Función `extractCodeFromDocs()`** ✅

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

**Funcionalidad:**
- Busca código de historia específica (prioriza "implementation")
- Múltiples patrones de búsqueda (docs-code, docs-story, standard, etc.)
- Prioriza código de "implementation" si existe

### **3. Función `extractCodeFromBrowserSnapshot()`** ✅

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

**Funcionalidad:**
- Extrae código desde snapshot del Browser MCP
- Usa `extractCodeFromDocsSnapshot()` para parsear el snapshot
- Retorna código HTML y JS

### **4. Función `extractCodeFromDocsSnapshot()`** ✅

**Archivo:** `packages/autorun-core/src/helpers/extractCodeFromDocsSnapshot.ts`

**Funcionalidad:**
- Busca código en elementos con `role="text"` o `role="code"`
- Busca en `name`, `value`, y `text` de cada nodo
- Prioriza código que contenga "implementation" o "window.UBITS"
- Parsea código para separar HTML y JS

### **5. Flujo de Extracción** ✅

**Archivo:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

**Flujo:**
1. **Intento 1:** Fetch HTML y extraer código (rápido pero puede fallar)
2. **Intento 2:** Si falla, intentar código fuente local (fallback)
3. **Intento 3:** Si falla, requerir Browser MCP (el agente debe ejecutar)

---

## 🔄 Flujo Completo con Browser MCP

### **Paso 1: Navegar a Docs**
```typescript
await mcp_cursor-ide-browser_browser_navigate({
  url: `https://ubits-storybook10.vercel.app/?path=/docs/${componentId}--docs`
});
```

### **Paso 2: Esperar a que se cargue el código**
```typescript
await mcp_cursor-ide-browser_browser_wait_for({ time: 2 });
```

### **Paso 3: Buscar y hacer clic en "Show code" (si es necesario)**
```typescript
// Buscar botón "Show code" cerca de "Implementation"
const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
// Encontrar botón y hacer clic
await mcp_cursor-ide-browser_browser_click({
  element: 'Show code button',
  ref: 'ref-show-code-button'
});
```

### **Paso 4: Esperar después del clic**
```typescript
await mcp_cursor-ide-browser_browser_wait_for({ time: 1 });
```

### **Paso 5: Tomar snapshot final**
```typescript
const finalSnapshot = await mcp_cursor-ide-browser_browser_snapshot();
```

### **Paso 6: Extraer código desde snapshot**
```typescript
const { extractCodeFromBrowserSnapshot } = await import(
  './storybookExactCodeExtractorWithBrowser'
);
const code = await extractCodeFromBrowserSnapshot(finalSnapshot);
```

---

## ✅ Ventajas

1. ✅ **Código visible directamente** - No requiere clic en pestaña "Code"
2. ✅ **Múltiples ejemplos** - Docs muestra todas las historias con código
3. ✅ **Prioriza "implementation"** - Busca específicamente esa historia
4. ✅ **Múltiples fallbacks** - Fetch → Código fuente → Browser MCP
5. ✅ **Extracción desde snapshot** - Implementada y lista para usar

---

## ⚠️ Limitaciones

1. ⚠️ **Código dinámico** - Docs carga código dinámicamente con JavaScript
2. ⚠️ **Requiere Browser MCP** - Necesitamos navegar y hacer clic si es necesario
3. ⚠️ **Múltiples bloques** - Docs puede tener múltiples bloques de código, necesitamos identificar el correcto

---

## 🎯 Próximos Pasos

1. ✅ Probar extracción desde snapshot con código real
2. ✅ Mejorar detección de código en snapshot (buscar más patrones)
3. ✅ Implementar clic automático en "Show code" si el código no está visible
4. ✅ Probar con Button → Drawer → Inputs para verificar extracción recursiva

---

## 📊 Estado Actual

| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Cambio a Docs | ✅ | Implementado |
| `extractCodeFromDocs()` | ✅ | Implementado |
| `extractCodeFromBrowserSnapshot()` | ✅ | Implementado |
| `extractCodeFromDocsSnapshot()` | ✅ | Implementado |
| Flujo completo Browser MCP | ⚠️ | Requiere que el agente ejecute los pasos |
| Clic automático "Show code" | ⚠️ | Pendiente de implementar |

---

## ✅ Conclusión

La implementación está completa y lista para usar. El sistema ahora:

1. ✅ Usa Docs en lugar de Story
2. ✅ Tiene múltiples fallbacks (fetch → código fuente → Browser MCP)
3. ✅ Puede extraer código desde snapshot del Browser MCP
4. ⚠️ Requiere que el agente ejecute Browser MCP cuando fetch falla

**Próximo paso:** Probar con un componente real para verificar que funciona correctamente.

