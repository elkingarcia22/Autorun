# 🛠️ Guía: Uso del Helper Function para Llamar Herramientas MCP de Autorun

**Fecha:** 2025-12-30  
**Objetivo:** Guía completa sobre cómo usar la función helper `callAutorunMCPTool` y `executeCompleteImplementationFlow`

---

## 🎯 ¿Cuándo Usar Esta Guía?

**Esta guía es para:**
- ✅ Scripts internos de Autorun
- ✅ Tests automatizados
- ✅ Herramientas CLI de Autorun
- ✅ Cualquier código Node.js/TypeScript que necesite llamar herramientas MCP de Autorun

**Esta guía NO es para:**
- ❌ Uso desde el agente en Cursor (ver `INSTRUCCIONES-USO-HERRAMIENTAS-MCP-AUTORUN.md`)
- ❌ Uso desde el navegador (las herramientas MCP solo funcionan en Node.js)

---

## 📦 Instalación

**La función helper está disponible en `@autorun/core`:**

```typescript
import {
  callAutorunMCPTool,
  callAutorunMCPTools,
  executeCompleteImplementationFlow,
} from '@autorun/core';
```

---

## 🔧 Funciones Disponibles

### **1. `callAutorunMCPTool(toolName, args)`**

**Descripción:** Llama a una herramienta MCP de Autorun individual.

**Parámetros:**
- `toolName: string` - Nombre de la herramienta (ej: `'autorun.handleUserMessage'`, `'autorun.apply'`)
- `args: any` - Argumentos para la herramienta

**Retorna:** `Promise<AutorunMCPToolResult>`

**Ejemplo:**
```typescript
import { callAutorunMCPTool } from '@autorun/core';

// Llamar handleUserMessage
const handleResult = await callAutorunMCPTool('autorun.handleUserMessage', {
  message: 'implementar una content card'
});

if (handleResult.success) {
  console.log('Componente detectado:', handleResult.result.componentName);
} else {
  console.error('Error:', handleResult.error);
}

// Llamar apply
const applyResult = await callAutorunMCPTool('autorun.apply', {
  message: 'implementar una content card',
  targetFiles: ['prototypes/file.html'],
  options: {
    mode: 'prototypeTokens',
    requireStorybookMcp: true
  }
});

if (applyResult.success) {
  console.log('Archivos escritos:', applyResult.result.filesWritten);
} else {
  console.error('Error:', applyResult.error);
}
```

---

### **2. `callAutorunMCPTools(calls)`**

**Descripción:** Llama a múltiples herramientas MCP de Autorun en secuencia.

**Parámetros:**
- `calls: Array<{ toolName: string; args: any }>` - Array de llamadas a herramientas

**Retorna:** `Promise<Array<AutorunMCPToolResult>>`

**Ejemplo:**
```typescript
import { callAutorunMCPTools } from '@autorun/core';

const results = await callAutorunMCPTools([
  {
    toolName: 'autorun.handleUserMessage',
    args: { message: 'implementar una content card' }
  },
  {
    toolName: 'autorun.apply',
    args: {
      message: 'implementar una content card',
      targetFiles: ['prototypes/file.html']
    }
  },
  {
    toolName: 'autorun.verify',
    args: { targetFiles: 'diff' }
  }
]);

results.forEach((result, index) => {
  if (result.success) {
    console.log(`✅ Llamada ${index + 1} exitosa`);
  } else {
    console.error(`❌ Llamada ${index + 1} falló:`, result.error);
  }
});
```

---

### **3. `executeCompleteImplementationFlow(message, targetFiles?, options?)`**

**Descripción:** Ejecuta automáticamente el flujo completo de implementación: `handleUserMessage` → `apply` → `verify`.

**Parámetros:**
- `message: string` - Mensaje del usuario describiendo qué implementar
- `targetFiles?: string[]` - Archivos objetivo (opcional, se detecta automáticamente)
- `options?: object` - Opciones adicionales:
  - `mode?: 'strict' | 'prototypeTokens'` - Modo de implementación
  - `requireStorybookMcp?: boolean` - Requerir Storybook MCP
  - `allowPrototypeTokens?: boolean` - Permitir tokens de prototipo

**Retorna:** `Promise<{ success: boolean; handleResult?: any; applyResult?: any; verifyResult?: any; errors: string[] }>`

**Ejemplo:**
```typescript
import { executeCompleteImplementationFlow } from '@autorun/core';

const result = await executeCompleteImplementationFlow(
  'implementar una content card debajo del subnav usando el componente Layout/Card Content',
  ['prototypes/canvas-administrador-encuestas-2025-12-29.html'],
  {
    mode: 'prototypeTokens',
    requireStorybookMcp: true,
    allowPrototypeTokens: true
  }
);

if (result.success) {
  console.log('✅ Flujo completo ejecutado exitosamente');
  console.log('Componente detectado:', result.handleResult?.componentName);
  console.log('Archivos escritos:', result.applyResult?.filesWritten);
} else {
  console.error('❌ Flujo completo falló');
  result.errors.forEach(error => console.error(`  - ${error}`));
}
```

---

## 📋 Flujo Completo de Ejemplo

**Ejemplo completo usando `executeCompleteImplementationFlow`:**

```typescript
import { executeCompleteImplementationFlow } from '@autorun/core';

async function implementarCardContent() {
  console.log('🚀 Iniciando implementación de Card Content...\n');

  const message = `
    implementar una content card debajo del subnav usando el componente Layout/Card Content
    con las siguientes propiedades:
    - tipo: Curso
    - título: "Segmenta la experiencia del cliente"
    - proveedor: UBITS
    - duración: 60 min
    - nivel: Básico
    - competencia: Product design
    - idioma: Español
  `;

  const result = await executeCompleteImplementationFlow(
    message,
    ['prototypes/canvas-administrador-encuestas-2025-12-29.html'],
    {
      mode: 'prototypeTokens',
      requireStorybookMcp: true,
      allowPrototypeTokens: true
    }
  );

  if (result.success) {
    console.log('\n✅ Implementación completada exitosamente');
    console.log('📋 Componente detectado:', result.handleResult?.componentName);
    console.log('📝 Archivos modificados:', result.applyResult?.filesWritten);
    console.log('✅ Verificación exitosa:', result.verifyResult?.success);
  } else {
    console.error('\n❌ Implementación falló');
    console.error('Errores:');
    result.errors.forEach((error, index) => {
      console.error(`  ${index + 1}. ${error}`);
    });
  }
}

implementarCardContent();
```

---

## ⚠️ Manejo de Errores

**Todas las funciones retornan un objeto con `success` y `error`:**

```typescript
const result = await callAutorunMCPTool('autorun.handleUserMessage', {
  message: 'implementar card'
});

if (!result.success) {
  // Manejar error
  console.error('Error:', result.error);
  // result.error contiene el mensaje de error
}
```

**Para `executeCompleteImplementationFlow`, también hay un array `errors`:**

```typescript
const result = await executeCompleteImplementationFlow(...);

if (!result.success) {
  // result.errors contiene todos los errores encontrados
  result.errors.forEach(error => {
    console.error(`Error: ${error}`);
  });
}
```

---

## 🔍 Debugging

**Para debugging, puedes ver los logs del servidor MCP:**

```typescript
// Los logs del servidor MCP se muestran en stderr
// Puedes verlos ejecutando el script con:
// node script.js 2>&1 | grep "\[Autorun MCP\]"
```

---

## ✅ Conclusión

**La función helper `callAutorunMCPTool` y `executeCompleteImplementationFlow` permiten:**

1. ✅ Llamar herramientas MCP de Autorun desde código Node.js/TypeScript
2. ✅ Ejecutar el flujo completo de implementación automáticamente
3. ✅ Manejar errores de forma consistente
4. ✅ Usar en scripts, tests y herramientas CLI

**Para uso desde el agente en Cursor, ver:** `INSTRUCCIONES-USO-HERRAMIENTAS-MCP-AUTORUN.md`

---

**Última actualización:** 2025-12-30
