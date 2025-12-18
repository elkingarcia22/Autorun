# Análisis: Flujo de Implementación de Componentes - 2025-01-03

**Objetivo:** Analizar a profundidad el flujo de implementación de componentes para verificar que funciona correctamente.

---

## 🔍 Flujo Actual de Implementación

### **PASO 1: Detección Automática** ✅

**Función:** `handleUserMessage()` → `executeOnMessageStart()` → `autoDetectComponent()`

**Qué hace:**
1. Detecta componentes mencionados en el mensaje del usuario
2. Detecta múltiples componentes (Button + Modal)
3. Obtiene IDs de Storybook usando `mapComponentNameToStorybookId()`

**Problema identificado:**
- ⚠️ `mapComponentNameToStorybookId()` puede estar usando mapeo estático de UBITS en lugar del dinámico de Libraries UI
- ⚠️ Necesita verificar que use el Storybook activo (Libraries UI)

**Estado:** ⚠️ **REQUIERE VERIFICACIÓN**

---

### **PASO 2: Consulta MCP Automática** ⚠️

**Función:** `autoCallStorybookMCP()` → Emite `[AUTORUN_STORYBOOK_MCP]`

**Qué hace:**
1. Obtiene ID de Storybook para cada componente
2. Verifica Storybook activo usando `StorybookManager`
3. Emite mensaje `[AUTORUN_STORYBOOK_MCP]componentName:storybookId[/AUTORUN_STORYBOOK_MCP]`
4. Instruye al agente a ejecutar `call_mcp_tool()` con `server: "storybook-ubits"`

**Problema identificado:**
- ❌ **CRÍTICO:** El código está hardcodeado para usar `server: "storybook-ubits"`
- ❌ No verifica qué servidor MCP usar según el Storybook activo
- ❌ Libraries UI puede necesitar un servidor MCP diferente o la misma URL pero con diferente configuración

**Estado:** ❌ **PROBLEMA CRÍTICO**

---

### **PASO 3: Implementación** ⚠️

**Función:** `interceptedWrite()` → `autoImplementationFlow()`

**Qué hace:**
1. Verifica que se consultó Storybook MCP
2. Navega a Storybook para consultar visualmente
3. Genera código basado en props y estructura obtenidas
4. Escribe el código en el template

**Problema identificado:**
- ⚠️ Puede estar usando fallback de UBITS si no encuentra información
- ⚠️ Necesita verificar que use SOLO Libraries UI (sin fallbacks)

**Estado:** ⚠️ **REQUIERE VERIFICACIÓN**

---

## 🎯 Requisitos del Usuario

**Usuario pide:**
1. Agregar botón debajo del subnav a 16px
2. Que abra un modal
3. Usar SOLO Libraries UI (no UBITS ni fallbacks)

**Componentes necesarios:**
- Button: `🧩-ux-button` (según mapeo de Libraries UI)
- Modal: `⚙️-functional-modal` (según mapeo de Libraries UI)

---

## ⚠️ Problemas Identificados

### **PROBLEMA 1: Servidor MCP Hardcodeado** ❌ CRÍTICO

**Archivo:** `packages/autorun-core/src/helpers/storybookMCPAutoCaller.ts` línea 105

**Código actual:**
```typescript
console.log(`     server: "storybook-ubits",`);
```

**Problema:**
- Está hardcodeado para usar `"storybook-ubits"`
- No verifica qué servidor MCP usar según el Storybook activo
- Libraries UI puede necesitar el mismo servidor pero con diferente URL, o un servidor diferente

**Solución necesaria:**
- Verificar Storybook activo
- Determinar servidor MCP correcto según el Storybook activo
- Usar configuración dinámica en lugar de hardcodeada

---

### **PROBLEMA 2: Mapeo de Componentes** ⚠️

**Archivo:** `packages/autorun-core/src/helpers/storybookStories.ts`

**Problema:**
- Puede estar usando mapeo estático de UBITS como fallback
- Debería usar SOLO el mapeo dinámico del Storybook activo

**Solución necesaria:**
- Verificar que `mapComponentNameToStorybookId()` use SOLO el Storybook activo
- NO usar fallback estático de UBITS si el Storybook activo es Libraries UI

---

### **PROBLEMA 3: Fallbacks de UBITS** ⚠️

**Archivo:** `packages/autorun-core/src/helpers/storybookFallback.ts`

**Problema:**
- Puede estar usando fallback de UBITS si Libraries UI no está disponible
- El usuario quiere SOLO Libraries UI (sin fallbacks)

**Solución necesaria:**
- Verificar que NO se use fallback de UBITS
- Si Libraries UI no está disponible, mostrar error en lugar de usar fallback

---

## ✅ Soluciones Propuestas

### **SOLUCIÓN 1: Servidor MCP Dinámico** ⭐

**Qué hacer:**
1. Verificar Storybook activo usando `StorybookManager`
2. Determinar servidor MCP correcto según el Storybook activo
3. Usar configuración dinámica en lugar de hardcodeada

**Código sugerido:**
```typescript
// En storybookMCPAutoCaller.ts
const manager = StorybookManager.getInstance();
const activeConfig = await manager.getActiveConfig();

// Determinar servidor MCP según Storybook activo
let mcpServer = "storybook-ubits"; // default
if (activeConfig?.id === "libraries-ui-ubitslearning-com") {
  // Libraries UI puede usar el mismo servidor pero con diferente URL
  // O puede necesitar un servidor diferente
  mcpServer = "storybook-ubits"; // Por ahora, mismo servidor
  // Pero la URL debe ser la de Libraries UI
}

console.log(`     server: "${mcpServer}",`);
```

---

### **SOLUCIÓN 2: Mapeo Solo del Storybook Activo** ⭐

**Qué hacer:**
1. Verificar que `mapComponentNameToStorybookId()` use SOLO el Storybook activo
2. NO usar fallback estático de UBITS si el Storybook activo es Libraries UI
3. Si no encuentra mapeo, mostrar error en lugar de usar fallback

---

### **SOLUCIÓN 3: Sin Fallbacks de UBITS** ⭐

**Qué hacer:**
1. Verificar que NO se use fallback de UBITS
2. Si Libraries UI no está disponible, mostrar error
3. Asegurar que todas las URLs usen Libraries UI

---

## 📋 Plan de Implementación

1. **Verificar Storybook activo** - Asegurar que es Libraries UI
2. **Consultar MCP correcto** - Usar servidor MCP dinámico
3. **Obtener props de Button y Modal** - Desde Libraries UI
4. **Implementar botón** - Debajo del subnav a 16px
5. **Implementar modal** - Que se abra al hacer clic en el botón
6. **Verificar que NO se use UBITS** - Sin fallbacks

---

**Última actualización:** 2025-01-03  
**Estado:** ⚠️ **ANÁLISIS COMPLETO** - Problemas identificados, soluciones propuestas
