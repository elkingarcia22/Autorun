# 🚀 Reglas de Inicio - Verificación Obligatoria

## ⚠️ VERIFICACIÓN OBLIGATORIA AL INICIO DE CADA SESIÓN

**ANTES de usar CUALQUIER herramienta, DEBES:**

### 1. Inicializar AutorunHub ⚠️ CRÍTICO

```typescript
// PASO 1: Detectar wizard state
import { processWizardStateForAgent } from '@autorun/core';

const wizardResult = await processWizardStateForAgent();
if (wizardResult.success && wizardResult.url) {
  // 2. Optimización: Reutilizar pestaña si ya existe
  const pages = await call_mcp_tool({ 
    server: 'cursor-ide-browser', 
    toolName: 'browser_list_pages' 
  });
  const existingPage = pages.find(p => p.url === wizardResult.url);
  
  if (existingPage) {
    await call_mcp_tool({ 
      server: 'cursor-ide-browser', 
      toolName: 'browser_snapshot', 
      arguments: { pageId: existingPage.pageId } 
    });
  } else {
    await call_mcp_tool({ 
      server: 'cursor-ide-browser', 
      toolName: 'browser_navigate', 
      arguments: { url: wizardResult.url } 
    });
  }
  
  // 3. Limpiar archivo de estado
  await run_terminal_cmd({ 
    command: 'rm -f .autorun/wizard-state.json' 
  });
}
```

### 2. Ejecutar handleUserMessage() ⚠️ OBLIGATORIO

```typescript
// ⚠️ OBLIGATORIO: Ejecutar SIEMPRE al inicio de cada mensaje
import { handleUserMessage } from '@autorun/core/helpers/autoMessageHandler';

const result = await handleUserMessage(userMessage);

if (result.blocked) {
  console.error(`❌ IMPLEMENTACIÓN BLOQUEADA: ${result.reason}`);
  throw new Error(`❌ BLOQUEADO: ${result.reason}`);
}

// Si hay mensajes MCP, consultar automáticamente
if (result.mcpMessages && result.mcpMessages.length > 0) {
  for (const msg of result.mcpMessages) {
    await call_mcp_tool({
      server: "storybook",
      toolName: "mcp_storybook_getComponentsProps",
      arguments: { componentIds: [msg.storybookId] }
    });
  }
}
```

### 3. Verificar Layout Guard

Asegurar que el script `LayoutGuard` esté inyectado en el canvas para evitar que el header/placeholder reaparezca dinámicamente.

## 🔗 Ver También

- Detección de imágenes: [01-deteccion-imagen.md](01-deteccion-imagen.md)
- Componentes UBITS: [02-componentes.md](02-componentes.md)
- Implementación: [03-implementacion.md](03-implementacion.md)
