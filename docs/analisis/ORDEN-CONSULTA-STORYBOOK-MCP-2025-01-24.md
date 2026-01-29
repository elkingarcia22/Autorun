# 📋 Orden Correcto de Consulta a Storybook con MCP

**Fecha:** 2025-01-24  
**Objetivo:** Definir y validar el orden correcto de consulta a Storybook para extraer código

---

## 🎯 Orden Correcto (Según Usuario)

### **PASO 1: Ver Listado de Componentes** ⚠️ OBLIGATORIO

**Herramienta:** `getComponentList` del MCP de Storybook

**Qué hace:**
```typescript
await call_mcp_tool({
  server: 'storybook',
  toolName: 'getComponentList',
  arguments: {}
});
```

**Resultado:**
- Lista completa de componentes disponibles
- Formato: Array de nombres (ej: `["Layout/Carousel", "Data/DataTable", ...]`)

**Propósito:**
- Verificar que el componente existe
- Obtener el nombre exacto del componente

---

### **PASO 2: Encontrar Nombre Exacto del Componente** ⚠️ OBLIGATORIO

**Qué hace:**
- Buscar el componente en la lista obtenida en PASO 1
- Mapear el nombre del usuario al nombre exacto de Storybook
- Ejemplo: `"DataTable"` → `"Data/DataTable"` o `"data-data-table"`

**Algoritmo de búsqueda:**
1. Buscar por ID exacto (ej: `"layout-carousel"`)
2. Buscar por nombre sin categoría (ej: `"Carousel"` en `"Layout/Carousel"`)
3. Buscar por coincidencia parcial

**Resultado:**
- Nombre exacto del componente encontrado
- ID exacto del componente (si se puede mapear)

---

### **PASO 3: Consultar y Extraer desde "implementation"** ⚠️ PRIORIDAD ALTA

**Herramienta:** `getComponentCode` del MCP de Storybook (o extracción directa)

**Qué hace:**
```typescript
await call_mcp_tool({
  server: 'storybook',
  toolName: 'getComponentCode',
  arguments: {
    componentId: 'data-data-table', // Nombre exacto encontrado
    storyName: 'implementation' // ⚠️ PRIORIDAD: "implementation" primero
  }
});
```

**Estrategia:**
1. **PRIORIDAD 1:** Intentar historia "implementation" (tiene código copy/paste)
2. Si no funciona, intentar la historia solicitada
3. Si no funciona, intentar "default"
4. Si no funciona, intentar Docs

**Resultado esperado:**
- HTML completo del componente
- JavaScript de inicialización
- Código listo para copiar/pegar

---

### **PASO 4: Verificar si "implementation" tiene lo que necesitamos** ⚠️ VALIDACIÓN

**Qué verificar:**
1. ✅ ¿El código extraído tiene HTML válido?
2. ✅ ¿El código extraído tiene JavaScript de inicialización?
3. ✅ ¿El código es completo (no está truncado)?
4. ✅ ¿El código corresponde al componente correcto?

**Si "implementation" NO tiene lo que necesitamos:**

#### **Opción A: Intentar "default"**
```typescript
await call_mcp_tool({
  server: 'storybook',
  toolName: 'getComponentCode',
  arguments: {
    componentId: 'data-data-table',
    storyName: 'default' // Fallback a "default"
  }
});
```

#### **Opción B: Intentar Docs**
```typescript
// Extraer HTML desde Docs (debajo del título y descripción)
const docsUrl = `https://ubits-storybook10.vercel.app/?path=/docs/${componentId}--docs`;

// Usar extractHTMLFromDocumentation() que:
// 1. Intenta fetch() desde URL de Docs
// 2. Si falla, requiere Browser MCP para navegar y extraer desde snapshot
```

---

## 📊 Flujo Visual Completo

```
┌─────────────────────────────────────────────────────────────┐
│ ORDEN DE CONSULTA A STORYBOOK                               │
└─────────────────────────────────────────────────────────────┘

PASO 1: getComponentList
  ↓
  Lista completa de componentes
  ↓
PASO 2: Buscar nombre exacto
  ↓
  Nombre exacto encontrado (ej: "Data/DataTable")
  ↓
PASO 3: getComponentCode con "implementation"
  ↓
  ¿Código extraído exitosamente?
  ├─ SÍ → ✅ USAR CÓDIGO DE "implementation"
  └─ NO → PASO 4
      ↓
PASO 4: Verificar alternativas
  ├─ Opción A: getComponentCode con "default"
  │   └─ ¿Código válido?
  │       ├─ SÍ → ✅ USAR CÓDIGO DE "default"
  │       └─ NO → Opción B
  │
  └─ Opción B: Extraer desde Docs
      ├─ fetch() desde URL de Docs
      │   └─ ¿HTML extraído?
      │       ├─ SÍ → ✅ USAR HTML DE DOCS
      │       └─ NO → Browser MCP
      │
      └─ Browser MCP (navegar a Docs y extraer desde snapshot)
          └─ ✅ USAR HTML DE DOCS (desde snapshot)
```

---

## 🔍 Validación del Código Actual

### **✅ Lo que SÍ está implementado:**

#### **1. Orden de Extracción en `getComponentCode` (storybook-mcp-wrapper.mjs):**

```javascript
// INTENTO 1: Historia "implementation" (prioridad alta)
if (storyName !== 'implementation') {
  await page.goto(implementationUrl, ...);
  const code = await extractCodeFromPage(page, 'implementation');
  if (code) {
    extractedCode = code.code; // ✅ USAR CÓDIGO DE "implementation"
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

#### **2. Obtención de Lista en `extractExactCodeFromStorybookWithBrowser.ts`:**

```typescript
// PASO 1: Obtener lista de componentes
const componentListResult = await callStorybookMCPTool('getComponentList', {});

// PASO 2: Buscar nombre exacto
const foundComponent = componentList.find(...);
exactComponentName = foundComponent;

// PASO 3: Extraer código con nombre exacto
const mcpResult = await callStorybookMCPTool('getComponentCode', {
  componentId: exactComponentId || componentId,
  storyName: finalStoryName, // Puede ser "implementation" si se encontró
});
```

**✅ CORRECTO:** El código SÍ obtiene lista primero, luego busca nombre exacto.

---

### **⚠️ Lo que FALTA o necesita mejorarse:**

#### **1. Verificación explícita de "implementation" antes de usar "default":**

**Código actual:**
```typescript
// Si storyName es "default", buscar "code" primero, luego "implementation"
if (storyName === 'default') {
  const codeStoryName = await findCodeStory(componentId);
  if (codeStoryName) {
    finalStoryName = codeStoryName;
  } else {
    const implementationStoryName = await findImplementationStory(componentId);
    if (implementationStoryName !== 'default') {
      finalStoryName = implementationStoryName;
    } else {
      finalStoryName = 'default'; // ⚠️ Usa "default" si no encuentra "implementation"
    }
  }
}
```

**⚠️ PROBLEMA:** Si no encuentra "implementation", usa "default" directamente sin verificar si "implementation" existe pero falló la extracción.

**✅ DEBERÍA:**
1. Intentar extraer desde "implementation" primero
2. Verificar si el código extraído es válido
3. Si no es válido, intentar "default"
4. Si "default" tampoco funciona, intentar Docs

#### **2. Verificación de validez del código extraído:**

**Código actual:**
```typescript
if (parsed.success && parsed.html) {
  codeFromTab = {
    html: parsed.html,
    js: parsed.js,
  };
  // ✅ Usa el código sin verificar si es completo
}
```

**⚠️ PROBLEMA:** No verifica si el código extraído es completo o está truncado.

**✅ DEBERÍA:**
1. Verificar que el HTML tiene estructura válida
2. Verificar que el JavaScript tiene la función de inicialización
3. Verificar que el código corresponde al componente correcto

---

## 📋 Orden Correcto Implementado (Según Código Actual)

### **Flujo Actual en `extractExactCodeFromStorybookWithBrowser.ts`:**

```
1. Obtener lista de componentes (getComponentList)
   ↓
2. Buscar nombre exacto en la lista
   ↓
3. Determinar historia a usar:
   - Si storyName === "default":
     - Buscar historia "code" primero
     - Si no existe, buscar "implementation"
     - Si no existe, usar "default"
   ↓
4. Extraer código con getComponentCode:
   - Usa el nombre exacto encontrado
   - Usa la historia determinada
   ↓
5. Si falla, intentar fetch() desde URL de historia
   ↓
6. Si falla, intentar Docs (fetch o Browser MCP)
```

### **Flujo Actual en `getComponentCode` (storybook-mcp-wrapper.mjs):**

```
1. Si storyName !== "implementation":
   - Intentar extraer desde "implementation" primero
   ↓
2. Si no se extrajo, intentar historia solicitada
   ↓
3. Si no se extrajo, intentar Docs
```

---

## ✅ Recomendaciones

### **1. Orden Recomendado (Según Usuario):**

```
PASO 1: getComponentList → Lista completa
PASO 2: Buscar nombre exacto → Nombre exacto encontrado
PASO 3: getComponentCode con "implementation" → Código de "implementation"
PASO 4: Verificar validez del código
  ├─ Si es válido → ✅ USAR
  ├─ Si no es válido → Intentar "default"
  └─ Si "default" tampoco funciona → Intentar Docs
```

### **2. Mejoras Necesarias:**

1. **Agregar verificación de validez del código:**
   - Verificar que HTML tiene estructura válida
   - Verificar que JavaScript tiene función de inicialización
   - Verificar que el código corresponde al componente correcto

2. **Mejorar orden de fallback:**
   - Intentar "implementation" primero (ya está)
   - Si falla, verificar explícitamente si "implementation" existe pero falló
   - Si existe pero falló, intentar "default"
   - Si "default" tampoco funciona, intentar Docs

3. **Agregar logging detallado:**
   - Log de cada paso del proceso
   - Log de qué historia se está usando
   - Log de por qué se eligió una historia sobre otra

---

## 📚 Referencias

- **Código de extracción:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`
- **MCP Storybook:** `scripts/storybook-mcp-wrapper.mjs`
- **Búsqueda de historias:** `packages/autorun-core/src/helpers/codePropsCombiner.ts`

---

**Última actualización:** 2025-01-24  
**Estado:** ✅ **ORDEN VALIDADO** - El código SÍ sigue el orden correcto, pero necesita mejoras en verificación de validez

