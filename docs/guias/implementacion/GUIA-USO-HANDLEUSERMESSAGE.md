# 📚 Guía: Uso de handleUserMessage() en Autorun

**Fecha:** 2025-12-17  
**Objetivo:** Garantizar que Autorun funcione correctamente ejecutando automáticamente todos los pasos obligatorios

---

## 🎯 ¿Qué es `handleUserMessage()`?

`handleUserMessage()` es un wrapper que garantiza que se ejecuten automáticamente todos los pasos obligatorios al inicio de cada mensaje del usuario:

1. ✅ Ejecuta `executeOnMessageStart()` automáticamente
2. ✅ Detecta múltiples componentes en el mismo mensaje
3. ✅ Prepara mensajes MCP para todos los componentes detectados
4. ✅ Proporciona instrucciones claras al agente

---

## ⚠️ OBLIGATORIO: Usar al Inicio de Cada Mensaje

**AL INICIO de cada mensaje del usuario, SIEMPRE ejecutar:**

```typescript
import { handleUserMessage } from '@autorun/core/helpers/autoMessageHandler';

const result = await handleUserMessage(userMessage);
```

**⚠️ CRÍTICO:**
- ❌ NO preguntar al usuario si debe ejecutarse
- ❌ NO verificar palabras clave antes de ejecutar
- ✅ EJECUTAR SIEMPRE automáticamente
- ✅ Ejecutar DESPUÉS de inicializar AutorunHub

---

## 📋 Manejo del Resultado

### **1. Si `result.blocked === true`:**

```typescript
if (result.blocked) {
  // ❌ NO continuar con la implementación
  console.error(`❌ IMPLEMENTACIÓN BLOQUEADA: ${result.reason}`);
  
  if (result.plan) {
    console.log(`📚 Plan disponible: ${result.plan.totalSteps} historias`);
  }
  
  throw new Error(`❌ BLOQUEADO: ${result.reason}`);
}
```

---

### **2. Si `result.mcpMessages` existe:**

```typescript
// ⚠️ CRÍTICO: Consultar Storybook MCP automáticamente para TODOS los componentes
if (result.mcpMessages && result.mcpMessages.length > 0) {
  for (const msg of result.mcpMessages) {
    // ⚠️ OBLIGATORIO: Ejecutar automáticamente (SIN preguntar)
    await call_mcp_tool({
      server: "storybook-ubits",
      toolName: "mcp_storybook_getComponentsProps",
      arguments: { componentIds: [msg.storybookId] }
    });
  }
}
```

**⚠️ REGLAS:**
- ✅ Consultar MCP para TODOS los componentes detectados
- ✅ NO preguntar al usuario
- ✅ Ejecutar automáticamente

---

### **3. Si `result.detected === true` y `result.blocked === false`:**

```typescript
if (result.detected && !result.blocked) {
  // ✅ Continuar con la implementación
  console.log(`✅ Componente detectado: ${result.componentName}`);
  
  if (result.plan) {
    console.log(`📋 Plan disponible: ${result.plan.totalSteps} historias`);
    // Usar plan para implementar
  }
}
```

---

## 🔍 Detección de Múltiples Componentes

`handleUserMessage()` detecta automáticamente múltiples componentes en el mismo mensaje:

**Ejemplo:**
```
Mensaje: "implementa un boton que abra un modal"
```

**Resultado:**
```typescript
result.mcpMessages = [
  { componentName: "Button", storybookId: "🧩-ux-button" },
  { componentName: "Modal", storybookId: "⚙️-functional-modal" }
]
```

**El agente DEBE:**
1. ✅ Consultar MCP para Button
2. ✅ Consultar MCP para Modal
3. ✅ Implementar ambos componentes correctamente

---

## 📋 Ejemplo Completo

```typescript
// AL INICIO de cada mensaje
import { handleUserMessage } from '@autorun/core/helpers/autoMessageHandler';

async function processUserMessage(userMessage: string) {
  // PASO 1: Ejecutar handleUserMessage() SIEMPRE
  const result = await handleUserMessage(userMessage);
  
  // PASO 2: Verificar si está bloqueado
  if (result.blocked) {
    throw new Error(`❌ BLOQUEADO: ${result.reason}`);
  }
  
  // PASO 3: Consultar MCP para todos los componentes
  if (result.mcpMessages) {
    for (const msg of result.mcpMessages) {
      await call_mcp_tool({
        server: "storybook-ubits",
        toolName: "mcp_storybook_getComponentsProps",
        arguments: { componentIds: [msg.storybookId] }
      });
    }
  }
  
  // PASO 4: Continuar con implementación si está permitido
  if (result.detected && !result.blocked) {
    // Implementar componente(s)
  }
}
```

---

## ⚠️ Reglas Críticas

1. ✅ **SIEMPRE ejecutar** `handleUserMessage()` al inicio
2. ✅ **SIEMPRE consultar MCP** si hay `mcpMessages`
3. ✅ **NO preguntar** al usuario
4. ✅ **Ejecutar automáticamente** todos los pasos

---

**Última actualización:** 2025-12-17  
**Estado:** ✅ **IMPLEMENTADO** - Listo para usar
