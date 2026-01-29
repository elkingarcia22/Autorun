# ✅ Recreación de Tools MCP de Autorun - Flujo Completo

**Fecha:** 2025-12-29  
**Objetivo:** Recrear los tools MCP necesarios para el flujo completo de Autorun

---

## 📋 Tools Recreados

### **1. `autorun.handleUserMessage`** ⭐ **NUEVO - CRÍTICO**

**Archivo:** `packages/autorun-core/src/mcp-server-v2/tools/handleUserMessage.ts`

**Descripción:**
- Wrapper MCP para `handleUserMessage()`
- DEBE ejecutarse al inicio de cada mensaje del usuario
- Detecta componentes automáticamente
- Prepara mensajes MCP para consultar Storybook
- Verifica fases y bloquea si es necesario

**Uso:**
```typescript
const result = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.handleUserMessage',
  arguments: {
    message: userMessage,
    options: { skipPreCheck: false }
  }
});
```

**Retorna:**
- `detected`: Si se detectó un componente
- `componentName`: Nombre del componente detectado
- `blocked`: Si la implementación está bloqueada
- `reason`: Razón del bloqueo (si aplica)
- `mcpMessages`: Mensajes MCP para consultar Storybook
- `plan`: Plan basado en historias (si aplica)

---

### **2. `autorun.discoverComponent`** ⭐ **NUEVO - CRÍTICO**

**Archivo:** `packages/autorun-core/src/mcp-server-v2/tools/discoverComponent.ts`

**Descripción:**
- Descubre el nombre exacto del componente en Storybook
- NUNCA adivinar nombres - siempre consultar `getComponentList()` primero
- Busca coincidencias en la lista de componentes disponibles
- Retorna nombre exacto, ID y sugerencias

**Uso:**
```typescript
const result = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.discoverComponent',
  arguments: {
    searchTerm: 'ContentCard' // o "card content", "button", etc.
  }
});
```

**Retorna:**
- `found`: Si se encontró el componente
- `exactName`: Nombre exacto del componente (ej: "Layout/Card Content")
- `componentId`: ID del componente (ej: "layout-card-content")
- `suggestions`: Sugerencias si no se encontró coincidencia exacta

**Flujo:**
1. Consulta `getComponentList()` del Storybook MCP
2. Busca coincidencias exactas primero
3. Busca por palabras clave si no hay coincidencia exacta
4. Retorna sugerencias si no se encuentra

---

### **3. Tools Existentes Registrados**

Todos los tools existentes ahora están registrados en el servidor:

- ✅ `autorun.test` - Herramienta de prueba
- ✅ `autorun.plan` - Generar plan
- ✅ `autorun.checklist` - Obtener checklist
- ✅ `autorun.verify` - Verificar archivos
- ✅ `autorun.apply` - Implementar componentes
- ✅ `autorun.storybook.start` - Iniciar Storybook
- ✅ `autorun.storybook.build` - Construir Storybook
- ✅ `autorun.storybook.extract` - Extraer código
- ✅ `autorun.problems.list` - Listar problemas
- ✅ `autorun.github.commit` - Commit manual
- ✅ `autorun.lint` - Ejecutar ESLint
- ✅ `autorun.visualTest` - Tests visuales

**Total: 14 tools disponibles**

---

## 🔄 Flujo Correcto con Tools MCP

### **Paso 1: Ejecutar `handleUserMessage()` (OBLIGATORIO)**
```typescript
const handleResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.handleUserMessage',
  arguments: { message: userMessage }
});

if (handleResult.blocked) {
  throw new Error(`❌ BLOQUEADO: ${handleResult.reason}`);
}
```

### **Paso 2: Si detectó componente, descubrir nombre exacto**
```typescript
if (handleResult.detected && handleResult.componentName) {
  const discoverResult = await call_mcp_tool({
    server: 'autorun',
    toolName: 'autorun.discoverComponent',
    arguments: { searchTerm: handleResult.componentName }
  });
  
  if (!discoverResult.found) {
    throw new Error(`❌ Componente no encontrado`);
  }
  
  const exactName = discoverResult.exactName; // "Layout/Card Content"
}
```

### **Paso 3: Consultar Storybook MCP con nombre exacto**
```typescript
const props = await call_mcp_tool({
  server: 'storybook',
  toolName: 'getComponentsProps',
  arguments: { componentNames: [exactName] }
});
```

### **Paso 4: Usar `autorun.apply()` para implementar**
```typescript
const applyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: { message: userMessage }
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

## 📝 Cambios Realizados

### **1. Nuevos Tools Creados:**
- ✅ `handleUserMessage.ts` - Wrapper MCP para handleUserMessage()
- ✅ `discoverComponent.ts` - Descubrimiento de nombres exactos

### **2. Servidor Actualizado:**
- ✅ Todos los tools registrados en `server.ts`
- ✅ Handlers agregados para todos los tools
- ✅ Tipos agregados en `types.ts`

### **3. Documentación:**
- ✅ `GUIA-TOOLS-MCP-AUTORUN-COMPLETOS.md` - Guía completa de tools
- ✅ Este documento - Resumen de recreación

---

## ⚠️ Reglas Críticas

### **1. SIEMPRE ejecutar `handleUserMessage()` primero**
- ❌ NO saltar este paso
- ✅ Ejecutar al inicio de cada mensaje
- ✅ Usar el resultado para detectar componentes

### **2. SIEMPRE descubrir nombre exacto antes de consultar props**
- ❌ NO adivinar nombres
- ✅ Usar `discoverComponent` para obtener nombre exacto
- ✅ Consultar `getComponentList()` primero

### **3. SIEMPRE usar `autorun.apply()` para implementar**
- ❌ NO usar `write()` o `search_replace()` directamente
- ✅ Usar `autorun.apply()` que ejecuta todo el flujo automático

---

## ✅ Estado Final

**Tools Disponibles:** 14 tools
- 2 nuevos tools críticos (`handleUserMessage`, `discoverComponent`)
- 12 tools existentes registrados

**Flujo Completo:** ✅ Restaurado
- Detección automática → Descubrimiento → Consulta Storybook → Implementación → Verificación

**Documentación:** ✅ Completa
- Guía de tools disponible
- Flujo documentado
- Reglas críticas establecidas

---

**Última actualización:** 2025-12-29  
**Versión:** 1.0.0
