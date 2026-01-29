# 🐛 Errores Encontrados: Construcción de URLs de Storybook

**Fecha:** 2025-01-24  
**Problema:** URLs de Storybook no se construyen correctamente, causando errores 404

---

## 🐛 Error #1: No usar nombre exacto del componente para obtener props

### **Problema:**
Al obtener props, usé `"Button"` en lugar de `"Básicos/Button"` (el nombre exacto del listado).

### **Error:**
```
Props information for components:
Button
Error: Component "Button" not found in Storybook
```

### **Causa:**
El MCP de Storybook requiere el nombre completo como aparece en el listado (`getComponentList`), no solo el nombre del componente.

### **Solución:**
✅ **CORRECTO:** Usar el nombre exacto del listado:
```typescript
// PASO 1: Obtener listado
const componentList = await getComponentList();
// Resultado: ["Básicos/Button", "Básicos/Avatar", ...]

// PASO 2: Buscar nombre exacto
const exactName = componentList.find(name => name.includes("Button"));
// Resultado: "Básicos/Button"

// PASO 3: Usar nombre exacto para obtener props
await getComponentsProps(['Básicos/Button']); // ✅ CORRECTO
```

❌ **INCORRECTO:**
```typescript
await getComponentsProps(['Button']); // ❌ FALLA
```

---

## 🐛 Error #2: No codificar caracteres especiales en URLs

### **Problema:**
Las URLs se construyen sin codificar caracteres especiales (como "á" en "básicos"), causando errores 404.

### **Error:**
```
Couldn't find story matching 'basicos-button--docs'.
```

### **URL Incorrecta:**
```
https://ubits-storybook10.vercel.app/?path=/story/basicos-button--implementation
```

### **URL Correcta:**
```
https://ubits-storybook10.vercel.app/?path=/story/b%C3%A1sicos-button--implementation
```

**Nota:** La "á" debe codificarse como `%C3%A1` en la URL.

---

## 🔍 Análisis del Código

### **✅ Código que SÍ codifica correctamente:**

#### **1. `verifyStorybookStories.ts` (línea 330):**
```typescript
const encodedComponentId = encodeURIComponent(storyInfo.componentId);
const path = `?path=/story/${encodedComponentId}--${safeStoryName}`;
```
✅ **CORRECTO:** Usa `encodeURIComponent()` para codificar el componentId.

---

### **❌ Código que NO codifica (PROBLEMA):**

#### **1. `storybookExactCodeExtractorWithBrowser.ts` (línea 99):**
```typescript
const storyUrl = `${activeConfig.url}/?path=/story/${componentId}--${finalStoryName}`;
```
❌ **INCORRECTO:** No codifica `componentId` antes de construir la URL.

**Solución:**
```typescript
const encodedComponentId = encodeURIComponent(componentId);
const storyUrl = `${activeConfig.url}/?path=/story/${encodedComponentId}--${finalStoryName}`;
```

#### **2. `componentHelpers.ts` (línea 348):**
```typescript
const docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;
```
❌ **INCORRECTO:** No codifica `componentId` antes de construir la URL.

**Solución:**
```typescript
const encodedComponentId = encodeURIComponent(componentId);
const docsUrl = `${activeConfig.url}/?path=/docs/${encodedComponentId}--docs`;
```

#### **3. `storybook-mcp-wrapper.mjs` (getComponentCode):**
```javascript
const implementationUrl = `${baseUrl}/?path=/story/${componentId}--implementation`;
const storyUrl = `${baseUrl}/?path=/story/${componentId}--${storyName}`;
const docsUrl = `${baseUrl}/?path=/docs/${componentId}--docs`;
```
❌ **INCORRECTO:** No codifica `componentId` antes de construir las URLs.

**Solución:**
```javascript
const encodedComponentId = encodeURIComponent(componentId);
const implementationUrl = `${baseUrl}/?path=/story/${encodedComponentId}--implementation`;
const storyUrl = `${baseUrl}/?path=/story/${encodedComponentId}--${storyName}`;
const docsUrl = `${baseUrl}/?path=/docs/${encodedComponentId}--docs`;
```

---

## 📊 Comparación: Hardcodeado vs Real

### **❌ Lo que está HARDCODEADO (INCORRECTO):**

1. **URLs construidas directamente sin codificar:**
   ```typescript
   // ❌ HARDCODEADO - No codifica caracteres especiales
   const url = `${baseUrl}/?path=/story/${componentId}--${storyName}`;
   ```

2. **Nombres de componentes sin usar el listado:**
   ```typescript
   // ❌ HARDCODEADO - Asume que "Button" funciona
   await getComponentsProps(['Button']);
   ```

---

### **✅ Lo que es REAL (CORRECTO):**

1. **`verifyStorybookStories.ts` SÍ codifica:**
   ```typescript
   // ✅ REAL - Codifica correctamente
   const encodedComponentId = encodeURIComponent(storyInfo.componentId);
   const path = `?path=/story/${encodedComponentId}--${safeStoryName}`;
   ```

2. **`storybookExactCodeExtractorWithBrowser.ts` obtiene listado primero:**
   ```typescript
   // ✅ REAL - Obtiene listado y busca nombre exacto
   const componentList = await getComponentList();
   const exactName = componentList.find(...);
   ```

---

## 🔧 Correcciones Necesarias

### **1. Corregir `storybookExactCodeExtractorWithBrowser.ts`:**

**Línea 99:**
```typescript
// ❌ ANTES (INCORRECTO)
const storyUrl = `${activeConfig.url}/?path=/story/${componentId}--${finalStoryName}`;

// ✅ DESPUÉS (CORRECTO)
const encodedComponentId = encodeURIComponent(componentId);
const storyUrl = `${activeConfig.url}/?path=/story/${encodedComponentId}--${finalStoryName}`;
```

**También corregir todas las URLs construidas en este archivo:**
- Línea 99: `storyUrl`
- Cualquier otra URL construida con `componentId`

---

### **2. Corregir `componentHelpers.ts`:**

**Línea 348:**
```typescript
// ❌ ANTES (INCORRECTO)
const docsUrl = `${activeConfig.url}/?path=/docs/${componentId}--docs`;

// ✅ DESPUÉS (CORRECTO)
const encodedComponentId = encodeURIComponent(componentId);
const docsUrl = `${activeConfig.url}/?path=/docs/${encodedComponentId}--docs`;
```

---

### **3. Corregir `storybook-mcp-wrapper.mjs`:**

**Líneas 249-251:**
```javascript
// ❌ ANTES (INCORRECTO)
const implementationUrl = `${baseUrl}/?path=/story/${componentId}--implementation`;
const storyUrl = storyName === 'implementation' ? implementationUrl : `${baseUrl}/?path=/story/${componentId}--${storyName}`;
const docsUrl = `${baseUrl}/?path=/docs/${componentId}--docs`;

// ✅ DESPUÉS (CORRECTO)
const encodedComponentId = encodeURIComponent(componentId);
const implementationUrl = `${baseUrl}/?path=/story/${encodedComponentId}--implementation`;
const storyUrl = storyName === 'implementation' ? implementationUrl : `${baseUrl}/?path=/story/${encodedComponentId}--${storyName}`;
const docsUrl = `${baseUrl}/?path=/docs/${encodedComponentId}--docs`;
```

---

### **4. Corregir uso de nombre exacto para props:**

**En cualquier lugar donde se llame `getComponentsProps`:**
```typescript
// ❌ ANTES (INCORRECTO)
await getComponentsProps(['Button']);

// ✅ DESPUÉS (CORRECTO)
// Primero obtener listado
const componentList = await getComponentList();
// Buscar nombre exacto
const exactName = componentList.find(name => name.includes("Button"));
// Usar nombre exacto
await getComponentsProps([exactName]); // ej: ['Básicos/Button']
```

---

## ✅ Verificación: ¿Está Hardcodeado o Funciona Realmente?

### **Respuesta: PARCIALMENTE HARDCODEADO**

**Lo que SÍ funciona realmente:**
- ✅ `verifyStorybookStories.ts` codifica URLs correctamente
- ✅ `storybookExactCodeExtractorWithBrowser.ts` obtiene listado primero
- ✅ Sistema de mapeo de nombres a IDs funciona

**Lo que está HARDCODEADO (causa errores):**
- ❌ URLs construidas directamente sin codificar en varios lugares
- ❌ Uso de nombres de componentes sin verificar el listado primero
- ❌ Asunción de que "Button" funciona en lugar de "Básicos/Button"

---

## 📋 Checklist de Correcciones

- [ ] Corregir `storybookExactCodeExtractorWithBrowser.ts` línea 99 (codificar componentId)
- [ ] Corregir `componentHelpers.ts` línea 348 (codificar componentId)
- [ ] Corregir `storybook-mcp-wrapper.mjs` líneas 249-251 (codificar componentId)
- [ ] Verificar que TODAS las URLs construidas usen `encodeURIComponent()`
- [ ] Verificar que TODAS las llamadas a `getComponentsProps` usen nombres exactos del listado

---

## 📚 Referencias

- **URL correcta de Button:** https://ubits-storybook10.vercel.app/?path=/story/b%C3%A1sicos-button--implementation
- **Código que codifica correctamente:** `packages/autorun-core/src/helpers/verifyStorybookStories.ts` línea 330
- **Código que NO codifica:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts` línea 99

---

**Última actualización:** 2025-01-24  
**Estado:** 🐛 **ERRORES IDENTIFICADOS** - Requieren corrección

