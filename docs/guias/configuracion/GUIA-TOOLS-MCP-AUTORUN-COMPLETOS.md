# 📚 Guía: Tools MCP de Autorun - Flujo Completo

**Fecha:** 2025-12-29  
**Objetivo:** Documentar todos los tools MCP disponibles y el flujo correcto de uso

---

## 🎯 Tools Disponibles (14 tools)

### **Tools Principales (Flujo Automático):**

1. **`autorun.handleUserMessage`** ⭐ **CRÍTICO**
   - **Descripción:** Maneja mensaje del usuario automáticamente. DEBE ejecutarse al inicio de cada mensaje.
   - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.handleUserMessage", arguments: { message: userMessage } })`
   - **Retorna:** Detección de componentes, mensajes MCP, plan, fases

2. **`autorun.discoverComponent`** ⭐ **CRÍTICO**
   - **Descripción:** Descubre el nombre exacto del componente en Storybook. NUNCA adivinar nombres.
   - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.discoverComponent", arguments: { searchTerm: "ContentCard" } })`
   - **Retorna:** Nombre exacto del componente, ID, sugerencias

3. **`autorun.apply`** ⭐ **CRÍTICO**
   - **Descripción:** Ejecuta TODO el flujo de implementación automática desde Storybook.
   - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.apply", arguments: { message: userMessage } })`
   - **Retorna:** Archivos escritos, errores, advertencias

4. **`autorun.plan`**
   - **Descripción:** Genera plan de implementación sin ejecutar.
   - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.plan", arguments: { message: userMessage } })`

5. **`autorun.checklist`**
   - **Descripción:** Obtiene checklist de implementación para un componente.
   - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.checklist", arguments: { componentName: "Button" } })`

6. **`autorun.verify`**
   - **Descripción:** Verifica archivos generados correctamente.
   - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.verify", arguments: { targetFiles: "diff" } })`

### **Tools de Storybook:**

7. **`autorun.storybook.start`**
   - **Descripción:** Inicia servidor de Storybook local.
   - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.storybook.start", arguments: {} })`

8. **`autorun.storybook.build`**
   - **Descripción:** Construye Storybook estático.
   - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.storybook.build", arguments: {} })`

9. **`autorun.storybook.extract`**
   - **Descripción:** Extrae código HTML/JS desde Storybook.
   - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.storybook.extract", arguments: { componentId: "layout-card-content" } })`

### **Tools de Add-ons:**

10. **`autorun.problems.list`**
    - **Descripción:** Lista problemas detectados por Problem Tracker.
    - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.problems.list", arguments: {} })`

11. **`autorun.github.commit`**
    - **Descripción:** Hace commit manual de archivos en GitHub.
    - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.github.commit", arguments: { files: ["file.ts"], message: "Commit message" } })`

12. **`autorun.lint`**
    - **Descripción:** Ejecuta ESLint en archivos.
    - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.lint", arguments: { files: ["file.ts"], fix: true } })`

13. **`autorun.visualTest`**
    - **Descripción:** Ejecuta pruebas visuales de componentes.
    - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.visualTest", arguments: { componentId: "button" } })`

14. **`autorun.test`**
    - **Descripción:** Herramienta de prueba simple.
    - **Uso:** `call_mcp_tool({ server: "autorun", toolName: "autorun.test", arguments: { message: "test" } })`

---

## 🔄 Flujo Correcto de Implementación

### **Paso 1: Ejecutar `handleUserMessage()` (OBLIGATORIO)**
```typescript
const handleResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.handleUserMessage',
  arguments: { message: userMessage }
});

// Verificar si está bloqueado
if (handleResult.blocked) {
  throw new Error(`❌ BLOQUEADO: ${handleResult.reason}`);
}
```

### **Paso 2: Si detectó componente, descubrir nombre exacto**
```typescript
if (handleResult.detected && handleResult.componentName) {
  // Descubrir nombre exacto del componente
  const discoverResult = await call_mcp_tool({
    server: 'autorun',
    toolName: 'autorun.discoverComponent',
    arguments: { searchTerm: handleResult.componentName }
  });
  
  if (!discoverResult.found) {
    throw new Error(`❌ Componente no encontrado: ${handleResult.componentName}`);
  }
  
  const exactComponentName = discoverResult.exactName;
  console.log(`✅ Componente encontrado: ${exactComponentName}`);
}
```

### **Paso 3: Consultar Storybook MCP con nombre exacto**
```typescript
// Consultar props con nombre exacto
const props = await call_mcp_tool({
  server: 'storybook',
  toolName: 'getComponentsProps',
  arguments: { componentNames: [exactComponentName] }
});
```

### **Paso 4: Usar `autorun.apply()` para implementar**
```typescript
const applyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: userMessage,
    targetFiles: [filePath] // Opcional
  }
});
```

### **Paso 5: Verificar implementación**
```typescript
const verifyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.verify',
  arguments: { targetFiles: 'diff' }
});
```

---

## ⚠️ Reglas Críticas

### **1. SIEMPRE ejecutar `handleUserMessage()` primero**
- ❌ NO saltar este paso
- ✅ Ejecutar al inicio de cada mensaje
- ✅ Usar el resultado para detectar componentes

### **2. SIEMPRE descubrir nombre exacto antes de consultar props**
- ❌ NO adivinar nombres (ej: "layout-card-content")
- ✅ Usar `discoverComponent` para obtener nombre exacto
- ✅ Consultar `getComponentList()` del Storybook MCP primero

### **3. SIEMPRE usar `autorun.apply()` para implementar**
- ❌ NO usar `write()` o `search_replace()` directamente
- ✅ Usar `autorun.apply()` que ejecuta todo el flujo automático
- ✅ Incluye validación, marcas Autorun, auto-reload, etc.

---

## 📋 Resumen de Tools por Categoría

### **Flujo Automático (3 tools críticos):**
- `autorun.handleUserMessage` - Detección automática
- `autorun.discoverComponent` - Descubrimiento de nombres
- `autorun.apply` - Implementación completa

### **Planificación (2 tools):**
- `autorun.plan` - Generar plan
- `autorun.checklist` - Obtener checklist

### **Verificación (1 tool):**
- `autorun.verify` - Verificar archivos

### **Storybook (3 tools):**
- `autorun.storybook.start` - Iniciar servidor
- `autorun.storybook.build` - Construir estático
- `autorun.storybook.extract` - Extraer código

### **Add-ons (4 tools):**
- `autorun.problems.list` - Listar problemas
- `autorun.github.commit` - Commit manual
- `autorun.lint` - Ejecutar ESLint
- `autorun.visualTest` - Tests visuales

### **Utilidades (1 tool):**
- `autorun.test` - Prueba simple

**Total: 14 tools disponibles**

---

**Última actualización:** 2025-12-29  
**Versión:** 1.0.0
