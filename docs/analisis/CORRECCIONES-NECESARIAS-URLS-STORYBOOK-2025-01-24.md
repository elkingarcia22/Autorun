# 🔧 Correcciones Necesarias: URLs de Storybook sin Codificar

**Fecha:** 2025-01-24  
**Problema:** Múltiples lugares construyen URLs sin codificar `componentId`, causando errores 404 con caracteres especiales

---

## 🐛 Errores Encontrados

### **Error #1: No usar nombre exacto para props**
- **Error:** `getComponentsProps(['Button'])` → Error: Component "Button" not found
- **Solución:** Usar `getComponentsProps(['Básicos/Button'])` (nombre exacto del listado)

### **Error #2: URLs sin codificar caracteres especiales**
- **Error:** `basicos-button--docs` → 404 (debería ser `b%C3%A1sicos-button--docs`)
- **Causa:** No usar `encodeURIComponent()` antes de construir URLs

---

## 📋 Lugares que Necesitan Corrección

### **1. `storybookExactCodeExtractorWithBrowser.ts`** ⚠️ CRÍTICO

**Línea 99:**
```typescript
// ❌ INCORRECTO
const storyUrl = `${activeConfig.url}/?path=/story/${componentId}--${finalStoryName}`;

// ✅ CORRECTO
const encodedComponentId = encodeURIComponent(componentId);
const storyUrl = `${activeConfig.url}/?path=/story/${encodedComponentId}--${finalStoryName}`;
```

**Línea 430:**
```typescript
// ❌ INCORRECTO
const docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;

// ✅ CORRECTO
const encodedComponentId = encodeURIComponent(componentId);
const docsUrl = `${activeConfig.url}/?path=/docs/${encodedComponentId}--docs`;
```

**Línea 459:**
```typescript
// ❌ INCORRECTO
error.docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;

// ✅ CORRECTO
const encodedComponentId = encodeURIComponent(componentId);
error.docsUrl = `${activeConfig.url}/?path=/docs/${encodedComponentId}--docs`;
```

---

### **2. `componentHelpers.ts`** ⚠️ CRÍTICO

**Línea 348:**
```typescript
// ❌ INCORRECTO
const docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;

// ✅ CORRECTO
const encodedComponentId = encodeURIComponent(componentId);
const docsUrl = `${activeConfig.url}/?path=/docs/${encodedComponentId}--docs`;
```

---

### **3. `storybook-mcp-wrapper.mjs`** ⚠️ CRÍTICO

**Líneas 249-251:**
```javascript
// ❌ INCORRECTO
const implementationUrl = `${baseUrl}/?path=/story/${componentId}--implementation`;
const storyUrl = storyName === 'implementation' ? implementationUrl : `${baseUrl}/?path=/story/${componentId}--${storyName}`;
const docsUrl = `${baseUrl}/?path=/docs/${componentId}--docs`;

// ✅ CORRECTO
const encodedComponentId = encodeURIComponent(componentId);
const implementationUrl = `${baseUrl}/?path=/story/${encodedComponentId}--implementation`;
const storyUrl = storyName === 'implementation' ? implementationUrl : `${baseUrl}/?path=/story/${encodedComponentId}--${storyName}`;
const docsUrl = `${baseUrl}/?path=/docs/${encodedComponentId}--docs`;
```

---

### **4. Otros archivos que también necesitan corrección:**

- `storybookFallback.ts` línea 248
- `mcpWithFallback.ts` línea 127
- `storybookExactCodeExtractor.ts` línea 63
- `codePropsCombiner.ts` línea 374
- `storybookUrlBuilder.ts` líneas 56, 58, 98, 100
- `testImplementationFromStorybook.ts` líneas 562, 597
- `verifyStorybookStories.ts` línea 285
- `storybookIdValidator.ts` línea 289
- `storybookDocsPriority.ts` líneas 49, 69
- `activeStepGuide.ts` línea 274
- `storybookPropsParser.ts` líneas 88, 89
- `storybookStructureExtractor.ts` línea 44
- `storybookRealWorldExamplesExtractor.ts` línea 38
- `storybookAPIExtractor.ts` línea 52
- `storybookBestPracticesExtractor.ts` línea 36
- `storybookCodeParser.ts` línea 85
- `storybookCompositionExtractor.ts` línea 41
- `test-get-component-code.mjs` línea 22

---

## ✅ Solución: Función Helper Centralizada

**Crear función helper para construir URLs correctamente:**

```typescript
/**
 * Construye URL de Storybook codificando correctamente el componentId
 */
export function buildStorybookUrl(
  baseUrl: string,
  componentId: string,
  storyName: string,
  type: 'story' | 'docs' = 'story'
): string {
  const encodedComponentId = encodeURIComponent(componentId);
  const path = type === 'docs' 
    ? `?path=/docs/${encodedComponentId}--docs`
    : `?path=/story/${encodedComponentId}--${storyName}`;
  return `${baseUrl}${path}`;
}
```

**Uso:**
```typescript
// ✅ CORRECTO - Usar función helper
const url = buildStorybookUrl(activeConfig.url, componentId, 'implementation', 'story');
const docsUrl = buildStorybookUrl(activeConfig.url, componentId, 'docs', 'docs');
```

---

## 📊 Resumen

### **Total de lugares que necesitan corrección:**
- **27 lugares** en `packages/autorun-core/src/helpers/`
- **4 lugares** en `scripts/`

### **Prioridad:**
1. ⚠️ **CRÍTICO:** `storybookExactCodeExtractorWithBrowser.ts` (3 lugares)
2. ⚠️ **CRÍTICO:** `componentHelpers.ts` (1 lugar)
3. ⚠️ **CRÍTICO:** `storybook-mcp-wrapper.mjs` (3 lugares)
4. ⚠️ **ALTA:** Otros archivos de helpers (20 lugares)
5. ⚠️ **MEDIA:** Scripts de prueba (1 lugar)

---

## 🔧 Plan de Corrección

1. **Crear función helper centralizada** para construir URLs
2. **Reemplazar todas las construcciones directas** con la función helper
3. **Verificar que TODAS las URLs usen codificación**
4. **Probar con componente Button** (tiene "á" que necesita codificación)

---

**Última actualización:** 2025-01-24  
**Estado:** 🐛 **31 LUGARES REQUIEREN CORRECCIÓN**

