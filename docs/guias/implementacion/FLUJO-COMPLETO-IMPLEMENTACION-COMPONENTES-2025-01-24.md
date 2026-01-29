# 🔄 Flujo Completo: Implementación de Componentes con Autorun

> **Fecha:** 2025-01-24  
> **Versión:** Con nuevo tool `getComponentCode` del Storybook MCP

---

## 📋 Resumen Ejecutivo

Cuando el usuario pide implementar un componente, Autorun ejecuta automáticamente un flujo completo que:

1. ✅ **Detecta** el componente automáticamente
2. ✅ **Consulta** Storybook MCP para obtener props exactas
3. ✅ **Extrae** código HTML/JS desde Storybook (usando el nuevo tool `getComponentCode`)
4. ✅ **Valida** antes de implementar
5. ✅ **Implementa** con marcas Autorun
6. ✅ **Verifica** después de implementar

---

## 🎯 Flujo Paso a Paso

### **PASO 0: Usuario Pide Implementar** 👤

**Ejemplo:**
```
"Implementa un RadioButton en el template canvas-administrador-encuestas-2025-12-23.html"
```

---

### **PASO 1: Detección Automática** 🔍

**Sistema:** `handleUserMessage()` (ejecutado automáticamente al inicio)

**Qué hace:**
- ✅ Detecta palabras clave: `implementar`, `crear`, `agregar`, etc.
- ✅ Detecta nombre del componente: `RadioButton`, `Button`, `DataTable`, etc.
- ✅ Mapea nombre a ID de Storybook: `RadioButton` → `formularios-radio-button`
- ✅ Obtiene plan basado en historias de Storybook
- ✅ Verifica fases y pasos activos

**Logs:**
```
✅ [Auto Message Handler] Componente detectado: RadioButton
   Fase actual: Ninguna
   Siguiente fase: FASE 0
   Plan basado en historias disponible: 3 historias
```

**Si está bloqueado:**
- ❌ NO continúa con la implementación
- 📋 Muestra pasos faltantes o fases no completadas
- ⚠️ Bloquea hasta completar el checklist

---

### **PASO 2: Consulta Storybook MCP (Props)** 📚

**Sistema:** El agente DEBE consultar Storybook MCP ANTES de llamar `autorun.apply()`

**Tool usado:**
```typescript
await call_mcp_tool({
  server: 'storybook',
  toolName: 'getComponentsProps',
  arguments: {
    componentIds: ['formularios-radio-button']
  }
});
```

**Qué obtiene:**
- ✅ Props exactas (tipos, defaults, descripciones)
- ✅ Controles disponibles
- ✅ Validaciones y restricciones

**⚠️ CRÍTICO:**
- Si esta consulta falla → `autorun.apply()` NO continuará (fail-closed)
- El agente DEBE consultar Storybook MCP antes de llamar `autorun.apply()`

---

### **PASO 3: Extracción de Código HTML/JS** 🔧

**Sistema:** `autorun.apply()` → `extractExactCodeFromStorybookWithBrowser()`

**Estrategia actual (con fetch):**
1. **INTENTO 1:** Extraer desde URL de historia directamente (fetch)
   - URL: `/?path=/story/formularios-radio-button--default`
   - Busca código en múltiples formatos (regex)
   
2. **INTENTO 2:** Extraer desde Docs (fetch)
   - URL: `/?path=/docs/formularios-radio-button--docs`
   - Busca código en la página de Docs

3. **Si falla:** Lanza error `BROWSER_MCP_REQUIRED`

---

### **PASO 3.1: Extracción con Nuevo Tool `getComponentCode`** ✅ INTEGRADO

**Sistema:** Storybook MCP tool `getComponentCode` (usando Playwright) - **AHORA ES EL MÉTODO PRINCIPAL**

**Estrategia mejorada (con Playwright):**
1. **INTENTO 1:** Historia "implementation" (prioridad alta)
   - URL: `/?path=/story/formularios-radio-button--implementation`
   - Tiene código copy/paste directamente visible
   - Usa Playwright para navegar y extraer

2. **INTENTO 2:** Historia solicitada
   - URL: `/?path=/story/formularios-radio-button--default`
   - Si no se encontró en "implementation"

3. **INTENTO 3:** Docs con botón "Show code"
   - URL: `/?path=/docs/formularios-radio-button--docs`
   - Busca y hace clic en botón "Show code" automáticamente
   - Extrae código después del clic

**Cómo se llama:**
```typescript
// Desde extractExactCodeFromStorybookWithBrowser()
const { callStorybookMCPTool } = await import('./mcpClient.js');

const mcpResult = await callStorybookMCPTool('getComponentCode', {
  componentId: 'formularios-radio-button',
  storyName: 'default' // opcional, busca "implementation" primero
});
```

**Retorna:**
```json
{
  "success": true,
  "html": "<div id=\"radio-container\">...</div>",
  "js": "window.UBITS.RadioButton.create({...})",
  "componentId": "formularios-radio-button",
  "storyName": "default",
  "codeLength": 1234,
  "extractionMethod": "implementation",
  "extractionSelector": "pre[0]"
}
```

**✅ INTEGRADO:** `extractExactCodeFromStorybookWithBrowser()` ahora usa `getComponentCode` como método principal, con fetch como fallback.

---

### **PASO 4: Validación Pre-Implementación** ✅

**Sistema:** `verifyBeforeImplementation()`

**Qué valida:**
- ✅ Componente existe en Storybook
- ✅ Props son correctas
- ✅ Código extraído es válido
- ✅ Estructura HTML es correcta
- ✅ No hay conflictos con código existente

**Si falla:**
- ❌ NO implementa
- 📋 Muestra errores específicos
- ⚠️ Bloquea hasta corregir

---

### **PASO 5: Análisis de Componentes Internos** 🔬

**Sistema:** `analyzeComponentInternals()`

**Qué analiza:**
- ✅ Componentes internos usados
- ✅ Dependencias requeridas
- ✅ Tokens de diseño necesarios
- ✅ Estilos CSS requeridos

---

### **PASO 6: Combinación de Código con Props** 🔗

**Sistema:** `combineCodeWithProps()`

**Qué hace:**
- ✅ Combina código HTML extraído con props exactas
- ✅ Valida estructura completa
- ✅ Asegura que todas las props estén presentes

---

### **PASO 7: Escritura con Marcas Autorun** ✍️

**Sistema:** `generateCodeWithAutorunMarks()`

**Qué hace:**
- ✅ Agrega marcas Autorun al código
- ✅ Incluye watermark para verificación
- ✅ Escribe en el archivo objetivo

**Marcas agregadas:**
```html
<!-- ⚠️ GENERADO POR AUTORUN - NO MODIFICAR MANUALMENTE -->
<!-- Autorun Component: formularios-radio-button -->
<!-- Autorun Story: default -->
<!-- Autorun Timestamp: 2025-01-24T10:30:00Z -->
<div id="radio-container">...</div>
```

---

### **PASO 8: Post-Implementación** 🎨

**Sistema:** `AddonOrchestrator` ejecuta automáticamente:

1. **Prettier:** Formatea el código
2. **ESLint:** Valida el código
3. **Auto-Reload:** Recarga el browser automáticamente
4. **GitHub:** Hace commit automático (opcional)

---

### **PASO 9: Verificación Post-Implementación** ✅

**Sistema:** `autorun.verify()`

**Qué verifica:**
- ✅ Código tiene marcas Autorun
- ✅ Estructura es correcta
- ✅ Props están presentes
- ✅ No hay errores de sintaxis

**Si falla:**
- ❌ Revierte cambios automáticamente
- 📋 Muestra errores específicos

---

## 🔄 Flujo Completo Visual

```
┌─────────────────────────────────────────────────────────────┐
│ PASO 0: Usuario pide implementar componente                 │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ PASO 1: handleUserMessage() - Detección automática          │
│   ✅ Detecta componente                                     │
│   ✅ Mapea a ID de Storybook                               │
│   ✅ Obtiene plan basado en historias                      │
│   ✅ Verifica fases y pasos activos                       │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ PASO 2: Agente consulta Storybook MCP (Props)               │
│   Tool: getComponentsProps                                  │
│   ✅ Obtiene props exactas                                │
│   ⚠️ Si falla → NO continúa (fail-closed)                 │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ PASO 3: autorun.apply() - Extracción de código             │
│   Función: extractExactCodeFromStorybookWithBrowser()      │
│                                                             │
│   ✅ ESTRATEGIA MEJORADA (INTEGRADA):                      │
│   1. getComponentCode (Storybook MCP con Playwright)       │
│      - Historia "implementation" (prioridad alta)           │
│      - Historia solicitada                                 │
│      - Docs con botón "Show code"                          │
│   2. URL de historia (fetch + regex) - FALLBACK           │
│   3. Docs (fetch + regex) - FALLBACK                       │
│   4. Si falla → Error con instrucciones                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ PASO 4: verifyBeforeImplementation()                        │
│   ✅ Valida componente, props, código                       │
│   ⚠️ Si falla → NO implementa                              │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ PASO 5: analyzeComponentInternals()                         │
│   ✅ Analiza componentes internos, dependencias            │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ PASO 6: combineCodeWithProps()                             │
│   ✅ Combina código con props exactas                      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ PASO 7: generateCodeWithAutorunMarks()                     │
│   ✅ Agrega marcas Autorun                                 │
│   ✅ Escribe en archivo objetivo                           │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ PASO 8: AddonOrchestrator - Post-Implementación            │
│   ✅ Prettier (formatea)                                   │
│   ✅ ESLint (valida)                                       │
│   ✅ Auto-Reload (recarga browser)                        │
│   ✅ GitHub (commit automático)                           │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ PASO 9: autorun.verify()                                   │
│   ✅ Verifica marcas Autorun                               │
│   ✅ Verifica estructura                                   │
│   ⚠️ Si falla → Revierte cambios                          │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚠️ Integración Pendiente: `getComponentCode` en `extractExactCodeFromStorybookWithBrowser()`

**Estado actual:**
- ✅ Tool `getComponentCode` implementado en Storybook MCP
- ✅ Funciona con Playwright para extraer código
- ❌ NO está integrado en `extractExactCodeFromStorybookWithBrowser()`

**Qué falta:**
1. Modificar `extractExactCodeFromStorybookWithBrowser()` para usar `getComponentCode` como fallback
2. O mejor: Usar `getComponentCode` como método principal (más confiable que fetch)

**Propuesta de integración:**
```typescript
// En extractExactCodeFromStorybookWithBrowser()

// INTENTO 1: Usar getComponentCode del Storybook MCP (más confiable)
try {
  const mcpResult = await callStorybookMCP('getComponentCode', {
    componentId,
    storyName: finalStoryName
  });
  
  if (mcpResult.success && mcpResult.html) {
    codeFromTab = {
      html: mcpResult.html,
      js: mcpResult.js
    };
    console.log(`✅ Código extraído con getComponentCode`);
  }
} catch (error) {
  console.warn(`⚠️ getComponentCode falló, intentando fetch...`);
}

// INTENTO 2: Fallback a fetch (estrategia actual)
if (!codeFromTab || !codeFromTab.html) {
  // ... código actual con fetch ...
}
```

---

## 📊 Comparación: Estrategia Actual vs. Mejorada

| Aspecto | Estrategia Anterior (fetch) | Estrategia Actual (Playwright + fetch) |
|--------|---------------------------|----------------------------------|
| **Método Principal** | Fetch HTML + regex | Playwright navega y extrae |
| **Método Fallback** | N/A | Fetch HTML + regex |
| **Prioridad** | Historia solicitada | Historia "implementation" primero |
| **Docs** | Solo fetch | Busca y hace clic en "Show code" |
| **Confiabilidad** | Media (depende de regex) | Alta (extrae directamente) |
| **Velocidad** | Rápida | Media (requiere navegación) |
| **Estado** | ❌ Reemplazada | ✅ Implementada e integrada |

---

## ✅ Implementación Completada

**`getComponentCode` integrado como método principal** porque:
1. ✅ Más confiable (extrae directamente, no depende de regex)
2. ✅ Prioriza historia "implementation" (mejor código)
3. ✅ Maneja Docs con botón "Show code" automáticamente
4. ✅ Ya está implementado, funcionando e integrado

**Fetch mantenido como fallback** para:
- Casos donde Storybook MCP no esté disponible
- Errores temporales en la conexión MCP
- Extracción rápida cuando Playwright falla

---

## 📚 Referencias

- **Tool `getComponentCode`:** `scripts/storybook-mcp-wrapper.mjs`
- **Extracción actual:** `packages/autorun-core/src/helpers/storybookExactCodeExtractorWithBrowser.ts`
- **Implementación:** `packages/autorun-core/src/mcp-server/tools/autorunApply.ts`
- **Detección automática:** `packages/autorun-core/src/helpers/autoMessageHandler.ts`

