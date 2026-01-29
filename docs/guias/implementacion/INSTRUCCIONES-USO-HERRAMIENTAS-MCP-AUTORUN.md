# 📚 Instrucciones: Cómo Usar las Herramientas MCP de Autorun

**Fecha:** 2025-12-30  
**Objetivo:** Instrucciones claras para el agente sobre cómo usar las herramientas MCP

---

## ⚠️ IMPORTANTE: Cómo Llamar Herramientas MCP

**En Cursor, las herramientas MCP se llaman directamente usando el nombre de la herramienta.**

**NO hay función `call_mcp_tool()` - el agente debe usar las herramientas MCP directamente.**

---

## 📋 Flujo Correcto de Implementación

### **PASO 1: Ejecutar `handleUserMessage()`**

**El agente debe usar la herramienta MCP directamente:**

```typescript
// El agente debe llamar la herramienta MCP directamente
// En Cursor, esto se hace automáticamente cuando el agente menciona la herramienta
// O usando el sistema de herramientas MCP de Cursor

// Ejemplo de cómo el agente debe pensar:
// "Necesito ejecutar autorun.handleUserMessage con el mensaje del usuario"
```

**Resultado esperado:**
- `detected: true/false` - Si se detectó un componente
- `componentName: string` - Nombre del componente detectado
- `blocked: true/false` - Si la implementación está bloqueada
- `reason: string` - Razón del bloqueo (si aplica)
- `mcpMessages: array` - Mensajes MCP para consultar Storybook

---

### **PASO 2: Implementar con `autorun.apply()`**

**El agente debe usar la herramienta MCP directamente:**

```typescript
// El agente debe llamar la herramienta MCP directamente
// En Cursor, esto se hace automáticamente cuando el agente menciona la herramienta

// Ejemplo de cómo el agente debe pensar:
// "Necesito ejecutar autorun.apply con el mensaje del usuario y el archivo objetivo"
```

**Parámetros:**
- `message: string` - Mensaje del usuario describiendo qué implementar
- `targetFiles?: string[]` - Archivos objetivo (opcional, se detecta automáticamente)
- `options?: object` - Opciones de implementación

**Resultado esperado:**
- `success: boolean` - Si la implementación fue exitosa
- `filesWritten: string[]` - Archivos escritos
- `errors: string[]` - Errores encontrados
- `warnings: string[]` - Advertencias

---

### **PASO 3: Verificar con `autorun.verify()`**

**El agente debe usar la herramienta MCP directamente:**

```typescript
// El agente debe llamar la herramienta MCP directamente
// En Cursor, esto se hace automáticamente cuando el agente menciona la herramienta

// Ejemplo de cómo el agente debe pensar:
// "Necesito ejecutar autorun.verify para verificar los cambios"
```

**Parámetros:**
- `targetFiles: string | 'diff'` - Archivos a verificar
- `options?: object` - Opciones de verificación

**Resultado esperado:**
- `success: boolean` - Si la verificación fue exitosa
- `errors: string[]` - Errores encontrados
- `warnings: string[]` - Advertencias

---

## 🔍 Nota sobre `call_mcp_tool()`

**⚠️ IMPORTANTE:** La función `call_mcp_tool()` mencionada en la documentación es solo una referencia conceptual.

**En Cursor, el agente debe:**
1. **Mencionar la herramienta MCP directamente** en su respuesta
2. **O usar el sistema de herramientas MCP de Cursor** que permite llamar herramientas directamente

**Ejemplo:**
- El agente puede decir: "Voy a usar `autorun.handleUserMessage` para detectar componentes"
- Cursor automáticamente llamará la herramienta MCP correspondiente

---

## 🛠️ Helper Function para Uso Interno

**Para scripts internos de Autorun, existe una función helper:**

```typescript
import { callAutorunMCPTool, executeCompleteImplementationFlow } from '@autorun/core';

// Llamar una herramienta individual
const result = await callAutorunMCPTool('autorun.handleUserMessage', {
  message: 'implementar una content card'
});

// Ejecutar flujo completo automáticamente
const flowResult = await executeCompleteImplementationFlow(
  'implementar una content card debajo del subnav',
  ['prototypes/file.html'],
  {
    mode: 'prototypeTokens',
    requireStorybookMcp: true
  }
);
```

**⚠️ NOTA:** Esta función está diseñada para uso interno de Autorun. Para uso desde el agente en Cursor, ver la sección anterior.

---

## ✅ Conclusión

**Todas las herramientas están disponibles y funcionando.**

El agente debe:
1. Usar `autorun.handleUserMessage` al inicio de cada mensaje
2. Usar `autorun.apply` para implementar componentes
3. Usar `autorun.verify` para verificar cambios

**No falta nada - todas las herramientas están creadas y registradas.**

---

**Última actualización:** 2025-12-30
