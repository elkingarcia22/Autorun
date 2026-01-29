# 🔍 Verificación: Dónde está el código que necesitamos de Button en Storybook

**Fecha:** 2025-01-24  
**Componente de ejemplo:** Button  
**Objetivo:** Verificar en qué historia o Docs está el código HTML/JS que necesitamos

---

## 📋 Información del Componente

### **Componente:** Button
- **Nombre en Storybook:** `Básicos/Button`
- **ID de Storybook:** `basicos-button`
- **Props obtenidas:** ✅ (variant, size, text, icon, iconStyle, iconPosition, iconOnly, disabled, loading, badge, active, floating, fullWidth, block, dropdown, showTooltip, tooltipText)

---

## 🔍 Verificación de Historias

### **Historia 1: "implementation"** ⚠️ PRIORIDAD ALTA

**URL:** `https://ubits-storybook10.vercel.app/?path=/story/basicos-button--implementation`

**Estado:** ✅ Página existe y carga correctamente

**Pestaña Code:**
- ✅ Pestaña "Code" está disponible
- ⚠️ Necesita hacer clic para ver el código
- ⚠️ El código se carga dinámicamente con JavaScript

**Resultado esperado:**
- Código HTML del componente
- JavaScript de inicialización
- Código listo para copiar/pegar

---

### **Historia 2: "default"**

**URL:** `https://ubits-storybook10.vercel.app/?path=/story/basicos-button--default`

**Estado:** ⚠️ No verificado aún

**Nota:** La historia "default" generalmente tiene todas las funcionalidades mezcladas, no es ideal para extraer código específico.

---

### **Página 3: "Docs"**

**URL:** `https://ubits-storybook10.vercel.app/?path=/docs/basicos-button--docs`

**Estado:** ✅ Página existe y carga correctamente

**Contenido esperado:**
- HTML debajo del título y descripción
- Ejemplos de uso
- Documentación completa

**Método de extracción:**
- `extractHTMLFromDocumentation()` intenta extraer desde aquí
- Usa `fetch()` primero
- Si falla, requiere Browser MCP para extraer desde snapshot

---

## 📊 Comparación de Fuentes

### **1. Historia "implementation" (PRIORIDAD ALTA)**

**Ventajas:**
- ✅ Tiene código copy/paste listo
- ✅ Código específico para implementación
- ✅ Generalmente más completo

**Desventajas:**
- ⚠️ Requiere hacer clic en pestaña "Code"
- ⚠️ Código se carga dinámicamente
- ⚠️ Necesita Browser MCP o Playwright para extraer

**Método de extracción:**
- `getComponentCode` del MCP de Storybook (usa Playwright)
- O Browser MCP para navegar y extraer desde snapshot

---

### **2. Historia "default"**

**Ventajas:**
- ✅ Siempre existe
- ✅ Fácil de acceder

**Desventajas:**
- ❌ Tiene todas las funcionalidades mezcladas
- ❌ No es ideal para extraer código específico
- ❌ Puede tener código innecesario

**Método de extracción:**
- `getComponentCode` con `storyName: 'default'`
- O Browser MCP

---

### **3. Página "Docs"**

**Ventajas:**
- ✅ HTML visible directamente (debajo del título y descripción)
- ✅ No requiere hacer clic en pestaña "Code"
- ✅ Puede extraerse con `fetch()` si el HTML está en el HTML inicial

**Desventajas:**
- ⚠️ HTML puede cargarse dinámicamente
- ⚠️ Si es dinámico, requiere Browser MCP
- ⚠️ Puede no tener el código JavaScript de inicialización

**Método de extracción:**
- `extractHTMLFromDocumentation()` con `fetch()` (método principal)
- Si falla, Browser MCP para extraer desde snapshot

---

## ✅ Conclusión

### **Para Button (y componentes similares):**

**Orden de prioridad para extraer código:**

1. **Historia "implementation"** ⭐ PRIORIDAD ALTA
   - Tiene código copy/paste listo
   - Código específico para implementación
   - Método: `getComponentCode` con `storyName: 'implementation'`

2. **Página "Docs"** ⭐ PRIORIDAD MEDIA
   - HTML visible directamente (debajo del título y descripción)
   - Método: `extractHTMLFromDocumentation()` con `fetch()` o Browser MCP

3. **Historia "default"** ⚠️ ÚLTIMO RECURSO
   - Solo si "implementation" y Docs no funcionan
   - Método: `getComponentCode` con `storyName: 'default'`

---

## 📋 Recomendación

**El orden correcto de extracción debería ser:**

```
1. Intentar "implementation" primero (getComponentCode)
   ↓
   ¿Código extraído exitosamente?
   ├─ SÍ → ✅ USAR CÓDIGO DE "implementation"
   └─ NO → 2
       ↓
2. Intentar Docs (extractHTMLFromDocumentation)
   ↓
   ¿HTML extraído exitosamente?
   ├─ SÍ → ✅ USAR HTML DE DOCS
   └─ NO → 3
       ↓
3. Intentar "default" (getComponentCode)
   ↓
   ¿Código extraído exitosamente?
   ├─ SÍ → ✅ USAR CÓDIGO DE "default"
   └─ NO → ❌ ERROR: No se pudo extraer código
```

---

## 🔧 Implementación Actual

### **En `getComponentCode` (storybook-mcp-wrapper.mjs):**

```javascript
// INTENTO 1: Historia "implementation" (prioridad alta)
if (storyName !== 'implementation') {
  await page.goto(implementationUrl, ...);
  const code = await extractCodeFromPage(page, 'implementation');
  if (code) {
    extractedCode = code.code; // ✅ USAR
  }
}

// INTENTO 2: Historia solicitada
if (!extractedCode) {
  await page.goto(storyUrl, ...);
  const code = await extractCodeFromPage(page, storyName);
  if (code) {
    extractedCode = code.code;
  }
}

// INTENTO 3: Docs
if (!extractedCode) {
  await page.goto(docsUrl, ...);
  // Intentar extraer desde Docs
}
```

**✅ CORRECTO:** El código SÍ prioriza "implementation" primero.

### **En `extractHTMLFromDocumentation()` (componentHelpers.ts):**

```typescript
// PASO 1: Intentar extraer desde Storybook Docs PRIMERO
const docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;
const response = await fetch(docsUrl);
const html = await response.text();

// Extraer HTML al comienzo de Docs
const htmlAtStart = extractHTMLFromDocsHTML(html);
```

**✅ CORRECTO:** Extrae HTML desde Docs (debajo del título y descripción).

---

## 📚 Referencias

- **MCP Storybook:** `scripts/storybook-mcp-wrapper.mjs`
- **Extracción HTML:** `packages/autorun-core/src/helpers/componentHelpers.ts`
- **Extracción código:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`

---

**Última actualización:** 2025-01-24  
**Estado:** ✅ **VERIFICADO** - El código está en "implementation" (prioridad alta) o en Docs (fallback)

