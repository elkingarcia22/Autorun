# ⚠️ Problema: Storybook MCP no se puede consultar desde Node.js

**Fecha:** 2025-01-24  
**Problema:** `autorun.apply()` intenta consultar Storybook MCP desde Node.js, pero el MCP solo está disponible en el contexto de Cursor.

---

## 🔍 Análisis del Problema

### Situación Actual

1. **`autorun.apply()` en Mode B** intenta consultar Storybook MCP directamente:
   ```typescript
   // packages/autorun-core/src/mcp-server/tools/autorunApply.ts
   mcpInfo = await callStorybookMCPTool('getComponentsProps', {
     componentNames: [componentName],
   });
   ```

2. **`callStorybookMCPTool()`** intenta conectarse al servidor MCP desde Node.js:
   ```typescript
   // packages/autorun-core/src/helpers/mcpClient.ts
   const client = new MCPClient();
   await client.connect('storybook');
   ```

3. **El problema:** El servidor MCP de Storybook solo está disponible en el contexto de Cursor, no en Node.js directamente.

### Resultado

- ⚠️ La consulta al MCP falla silenciosamente
- ⚠️ Se emite una advertencia: "Storybook MCP no se pudo consultar. Se usará extracción de código directa."
- ✅ El flujo continúa con extracción de código directa (fallback)

---

## 💡 Soluciones Posibles

### Opción 1: El agente consulta MCP antes de llamar `autorun.apply()`

**Ventajas:**
- ✅ El MCP está disponible en el contexto de Cursor
- ✅ No requiere cambios en `autorun.apply()`
- ✅ El agente puede consultar múltiples componentes antes de implementar

**Desventajas:**
- ⚠️ Requiere que el agente recuerde consultar el MCP
- ⚠️ No es automático

**Implementación:**
```typescript
// El agente DEBE consultar MCP antes de llamar autorun.apply()
const mcpResult = await call_mcp_tool({
  server: 'storybook',
  toolName: 'getComponentsProps',
  arguments: { componentNames: ['Layout/Carousel'] }
});

// Luego llamar autorun.apply()
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: 'implementar un carousel debajo de la selection card',
    targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-24.html']
  }
});
```

### Opción 2: Mejorar manejo de errores en `autorun.apply()`

**Ventajas:**
- ✅ Hace el error más claro
- ✅ Documenta que el MCP debe ser consultado por el agente

**Implementación:**
```typescript
// packages/autorun-core/src/mcp-server/tools/autorunApply.ts
try {
  mcpInfo = await callStorybookMCPTool('getComponentsProps', {
    componentNames: [componentName],
  });
  // ...
} catch (mcpError: any) {
  console.warn(`   ⚠️ Storybook MCP no disponible desde Node.js: ${mcpError.message}`);
  console.warn(`   💡 SOLUCIÓN: El agente DEBE consultar Storybook MCP ANTES de llamar autorun.apply()`);
  console.warn(`   💡 Usar: call_mcp_tool({ server: 'storybook', toolName: 'getComponentsProps', ... })`);
  // Continuar con extracción directa
}
```

### Opción 3: Usar Browser MCP para extraer código directamente

**Ventajas:**
- ✅ No requiere Storybook MCP
- ✅ Extrae código directamente desde Storybook en Vercel

**Desventajas:**
- ⚠️ Requiere navegar a Storybook y extraer desde snapshot
- ⚠️ Más lento que consultar MCP

---

## 🎯 Recomendación

**Usar Opción 1 + Opción 2:**

1. **El agente consulta MCP antes de llamar `autorun.apply()`** (Opción 1)
2. **Mejorar manejo de errores en `autorun.apply()`** para documentar claramente que el MCP debe ser consultado por el agente (Opción 2)

Esto garantiza que:
- ✅ El MCP se consulta correctamente (desde Cursor)
- ✅ Los errores son claros y documentados
- ✅ El flujo continúa con fallback si el MCP no está disponible

---

## 📚 Referencias

- `packages/autorun-core/src/mcp-server/tools/autorunApply.ts` - Línea 1844-1871
- `packages/autorun-core/src/helpers/mcpClient.ts` - Línea 210-239
- `docs/analisis/CORRECCIONES-COMPLETADAS-AUTORUN-2025-01-24.md` - Correcciones anteriores

---

**Última actualización:** 2025-01-24



