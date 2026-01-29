# 🔧 Solución: Cómo Llamar Herramientas MCP desde el Agente - 2025-12-30

## 🎯 Problema Identificado

**El agente NO puede llamar directamente a las herramientas MCP usando `call_mcp_tool()` porque esta función NO existe en el entorno de ejecución del agente.**

**En Cursor:**
- Las herramientas MCP están disponibles como herramientas del sistema
- El agente puede usarlas mencionándolas en su respuesta
- Pero NO hay una función `call_mcp_tool()` disponible programáticamente

---

## ✅ Solución: Usar Herramientas MCP Directamente

**En Cursor, el agente debe usar las herramientas MCP directamente mencionándolas en su respuesta.**

**Ejemplo:**
```
El agente puede decir: "Voy a usar autorun.handleUserMessage para detectar componentes"
Cursor automáticamente llamará la herramienta MCP correspondiente
```

**Pero esto NO es suficiente para un flujo automatizado.**

---

## 🔧 Solución Propuesta: Crear Helper Function

**Crear una función helper que permita al agente llamar herramientas MCP explícitamente.**

### **Opción 1: Helper Function en Node.js (Recomendado)**

```typescript
// packages/autorun-core/src/helpers/callAutorunMCPTool.ts

/**
 * ✅ Helper para llamar herramientas MCP de Autorun desde Node.js
 * 
 * Esta función permite que el agente llame herramientas MCP de Autorun
 * directamente desde código TypeScript/JavaScript.
 */
export async function callAutorunMCPTool(
  toolName: string,
  args: any
): Promise<any> {
  const { MCPClient } = await import('./mcpClient.js');
  const client = new MCPClient();

  try {
    await client.connect('autorun');
    
    const result = await client.callMethod('tools/call', {
      name: toolName,
      arguments: args,
    });

    return result;
  } finally {
    client.disconnect();
  }
}
```

**Uso:**
```typescript
import { callAutorunMCPTool } from '@autorun/core/helpers/callAutorunMCPTool';

// Ejemplo de uso
const handleResult = await callAutorunMCPTool('autorun.handleUserMessage', {
  message: 'implementar una content card'
});

const applyResult = await callAutorunMCPTool('autorun.apply', {
  message: 'implementar una content card',
  targetFiles: ['prototypes/file.html']
});
```

### **Opción 2: Usar MCP Client Directamente**

```typescript
// El agente puede usar MCPClient directamente
import { MCPClient } from '@autorun/core/helpers/mcpClient';

const client = new MCPClient();
await client.connect('autorun');
const result = await client.callMethod('tools/call', {
  name: 'autorun.handleUserMessage',
  arguments: { message: 'implementar una content card' }
});
```

---

## ⚠️ Problema Actual

**El problema es que el agente NO puede importar funciones desde `@autorun/core` en el entorno de ejecución de Cursor.**

**El agente solo puede:**
1. Usar herramientas MCP directamente (mencionándolas)
2. Usar funciones disponibles en el entorno de ejecución
3. Usar herramientas del sistema (como `read_file`, `write`, etc.)

---

## ✅ Solución Final: Documentar Cómo el Agente Debe Usar las Herramientas

**El agente debe mencionar las herramientas MCP en su respuesta para que Cursor las llame automáticamente.**

**Ejemplo de respuesta del agente:**
```
Voy a implementar la content card usando el flujo completo de Autorun:

1. Primero ejecutaré autorun.handleUserMessage para detectar el componente
2. Luego usaré autorun.apply para implementar automáticamente
3. Finalmente verificaré con autorun.verify
```

**Cursor automáticamente llamará las herramientas MCP correspondientes.**

---

## 📋 Recomendaciones

1. **Documentar claramente** cómo el agente debe mencionar las herramientas MCP
2. **Crear ejemplos** de respuestas del agente que usen las herramientas MCP
3. **Probar el flujo completo** usando las herramientas MCP directamente cuando estén disponibles

---

**Fecha:** 2025-12-30  
**Estado:** ⚠️ Problema identificado, solución documentada
