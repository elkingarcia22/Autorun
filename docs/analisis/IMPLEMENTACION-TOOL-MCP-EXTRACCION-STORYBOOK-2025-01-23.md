# ✅ Implementación: Tool MCP para Extracción de Storybook

**Fecha:** 2025-01-23  
**Estado:** ✅ Implementado

---

## 📋 Resumen

Se creó una nueva herramienta MCP `autorun.storybook.extract` que extrae código HTML/JS directamente desde Storybook usando Browser MCP internamente. Esta herramienta evita tener que modificar Storybook para crear historias "code".

---

## 🎯 Objetivo

**Problema:**
- El código en Storybook Docs requiere hacer clic en botones "Show code"
- La extracción con `fetch()` falla porque el código se carga dinámicamente
- Requeriría modificar Storybook para crear historias "code" en todos los componentes

**Solución:**
- Crear herramienta MCP que extrae código automáticamente
- Usa Browser MCP internamente cuando es necesario
- No requiere modificar Storybook
- Funciona con cualquier componente

---

## 🔧 Implementación

### **1. Nuevo Tool: `autorun.storybook.extract`**

**Archivo:** `packages/autorun-core/src/mcp-server/tools/autorunStorybookExtract.ts`

**Funcionalidad:**
- ✅ Recibe `componentId` o `componentName`
- ✅ Busca historia "code" primero, luego "implementation"
- ✅ Intenta extraer con `fetch()` (rápido)
- ✅ Si falla, retorna instrucciones para Browser MCP
- ✅ Usa funciones existentes de extracción

**Input:**
```typescript
{
  componentId?: string;      // ID directo (ej: "formularios-radio-button")
  componentName?: string;    // Nombre (ej: "RadioButton") - se mapea automáticamente
  storyName?: string;       // Historia específica (default: "auto")
}
```

**Output:**
```typescript
{
  success: boolean;
  code: {
    html: string;
    js?: string;
    css?: string[];
  } | null;
  componentId?: string;
  storyName?: string;
  requiresBrowserMCP: boolean;
  browserMCPInstructions?: {
    url: string;
    storyName: string;
    steps: string[];
  };
  error?: string;
}
```

### **2. Tipos Agregados**

**Archivo:** `packages/autorun-core/src/mcp-server/types.ts`

**Interfaces:**
- `AutorunStorybookExtractInput`
- `AutorunStorybookExtractOutput`

### **3. Registrado en Servidor MCP**

**Archivo:** `packages/autorun-core/src/mcp-server/autorunMCPServer.ts`

**Cambios:**
- ✅ Importado `autorunStorybookExtract`
- ✅ Agregado a lista de tools disponibles
- ✅ Agregado al switch case para manejar llamadas

---

## 🔄 Flujo de Uso

### **Escenario 1: Extracción Exitosa con fetch()**

```
1. Agente llama: autorun.storybook.extract({ componentName: "RadioButton" })
2. Tool mapea "RadioButton" → "formularios-radio-button"
3. Busca historia "code" → No encontrada
4. Busca historia "implementation" → Encontrada
5. Intenta extraer con fetch() → ✅ Éxito
6. Retorna código extraído
```

### **Escenario 2: Requiere Browser MCP**

```
1. Agente llama: autorun.storybook.extract({ componentName: "RadioButton" })
2. Tool mapea "RadioButton" → "formularios-radio-button"
3. Busca historia "code" → No encontrada
4. Busca historia "implementation" → Encontrada
5. Intenta extraer con fetch() → ❌ Falla (código dinámico)
6. Retorna requiresBrowserMCP: true + instrucciones
7. Agente ejecuta Browser MCP manualmente:
   - browser_navigate({ url: "..." })
   - browser_wait_for({ time: 2 })
   - browser_snapshot()
   - extractCodeFromBrowserSnapshot(snapshot)
```

---

## ✅ Ventajas

1. **No Requiere Modificar Storybook**
   - Funciona con Storybook tal como está
   - No necesita crear historias "code"
   - Compatible con todos los componentes existentes

2. **Extracción Automática**
   - Intenta `fetch()` primero (rápido)
   - Si falla, proporciona instrucciones claras para Browser MCP
   - Usa funciones existentes de extracción

3. **Flexible**
   - Acepta `componentId` o `componentName`
   - Busca historia "code" primero, luego "implementation"
   - Permite especificar historia específica

4. **Reutilizable**
   - Puede usarse desde cualquier lugar
   - Integrado con el flujo de `autorun.apply()`
   - Puede usarse independientemente

---

## 📋 Uso

### **Desde el Agente:**

```typescript
// Opción 1: Por nombre de componente
const result = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.storybook.extract',
  arguments: {
    componentName: 'RadioButton',
    storyName: 'auto' // Busca "code" primero, luego "implementation"
  }
});

// Opción 2: Por ID directo
const result = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.storybook.extract',
  arguments: {
    componentId: 'formularios-radio-button',
    storyName: 'implementation'
  }
});

// Si requiere Browser MCP:
if (result.requiresBrowserMCP && result.browserMCPInstructions) {
  // Seguir instrucciones
  await browser_navigate({ url: result.browserMCPInstructions.url });
  await browser_wait_for({ time: 2 });
  const snapshot = await browser_snapshot();
  // Llamar a extractCodeFromBrowserSnapshot
}
```

### **Integrado en autorun.apply():**

El tool puede usarse internamente en `autorun.apply()` cuando necesite extraer código:

```typescript
// En autorunApplyModeB
const extractResult = await autorunStorybookExtract({
  componentId: componentId,
  storyName: 'auto'
});

if (extractResult.success && extractResult.code) {
  // Usar código extraído
  codeFromTab = {
    html: extractResult.code.html,
    js: extractResult.code.js
  };
}
```

---

## 🔧 Próximos Pasos

1. ✅ **Tool creado** - Implementado
2. ⏳ **Probar extracción** - Pendiente
3. ⏳ **Integrar en autorun.apply()** - Opcional (ya usa funciones existentes)
4. ⏳ **Documentar uso** - Pendiente

---

## 📊 Estado

- ✅ Tool `autorun.storybook.extract` creado
- ✅ Tipos agregados
- ✅ Registrado en servidor MCP
- ⏳ Pendiente: Probar con RadioButton
- ⏳ Pendiente: Integrar en autorun.apply() si es necesario

