# 🚀 Flujo Completo de Implementación con Autorun

**Fecha:** 2025-12-30  
**Objetivo:** Documentar y arreglar el flujo completo de implementación usando todas las herramientas MCP disponibles

---

## 📋 Flujo Ideal (Correcto)

### **PASO 1: Ejecutar `handleUserMessage()` vía MCP**
```typescript
// ⚠️ OBLIGATORIO: Ejecutar al inicio de cada mensaje
const handleResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.handleUserMessage',
  arguments: {
    message: userMessage,
    options: {}
  }
});

// Verificar si está bloqueado
if (handleResult.blocked) {
  throw new Error(`❌ BLOQUEADO: ${handleResult.reason}`);
}

// Si detectó componente, obtener información
if (handleResult.detected && handleResult.componentName) {
  console.log(`✅ Componente detectado: ${handleResult.componentName}`);
}
```

### **PASO 2: (Opcional) Usar `discoverComponent()` si necesitas el nombre exacto**
```typescript
// Solo si necesitas el nombre exacto del componente en Storybook
const discoverResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.discoverComponent',
  arguments: {
    searchTerm: 'tabs' // o el nombre del componente detectado
  }
});

if (discoverResult.found) {
  console.log(`✅ Nombre exacto: ${discoverResult.exactName}`);
  console.log(`✅ ID de Storybook: ${discoverResult.componentId}`);
}
```

### **PASO 3: Consultar Storybook MCP para obtener props**
```typescript
// ⚠️ OBLIGATORIO: Consultar props exactas del componente
const componentName = discoverResult?.exactName || handleResult.componentName || 'Navegación/Tabs';

const propsResult = await call_mcp_tool({
  server: 'storybook',
  toolName: 'mcp_storybook_getComponentsProps',
  arguments: {
    componentNames: [componentName]
  }
});

console.log(`✅ Props obtenidas para: ${componentName}`);
```

### **PASO 4: Usar `autorun.apply()` para implementar**
```typescript
// ⚠️ CRÍTICO: Usar autorun.apply() para implementar automáticamente
// autorun.apply() ya ejecuta handleUserMessage() internamente,
// pero es mejor ejecutarlo antes para verificar bloqueos

const applyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: userMessage, // Mensaje completo del usuario
    targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-29.html'], // Opcional
    options: {
      mode: 'prototypeTokens', // Para archivos en prototypes/
      requireStorybookMcp: true, // OBLIGATORIO: Consultar Storybook MCP
      allowPrototypeTokens: true // Permitir tokens en prototypes
    }
  }
});

if (!applyResult.success) {
  throw new Error(`❌ Error en implementación: ${applyResult.errors?.join(', ')}`);
}

console.log(`✅ Archivos escritos: ${applyResult.filesWritten?.join(', ')}`);
```

### **PASO 5: Verificar con `autorun.verify()`**
```typescript
// ⚠️ OBLIGATORIO: Verificar cambios después de implementar
const verifyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.verify',
  arguments: {
    targetFiles: 'diff', // Verifica todos los cambios
    options: {
      checkAccessibility: true,
      autoRevert: true // Revertir si no hay watermark
    }
  }
});

if (!verifyResult.success) {
  console.error(`❌ Verificación falló: ${verifyResult.errors?.join(', ')}`);
}
```

---

## 🔄 Flujo Simplificado (Recomendado)

**Nota:** `autorun.apply()` ya ejecuta `handleUserMessage()` internamente, así que puedes usar este flujo simplificado:

```typescript
// PASO 1: Ejecutar handleUserMessage() para verificar bloqueos
const handleResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.handleUserMessage',
  arguments: { message: userMessage }
});

if (handleResult.blocked) {
  throw new Error(`❌ BLOQUEADO: ${handleResult.reason}`);
}

// PASO 2: Implementar directamente con autorun.apply()
// (autorun.apply() ejecuta handleUserMessage() internamente también)
const applyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: userMessage,
    targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-29.html'],
    options: {
      mode: 'prototypeTokens',
      requireStorybookMcp: true
    }
  }
});

// PASO 3: Verificar
const verifyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.verify',
  arguments: { targetFiles: 'diff' }
});
```

---

## ⚠️ Reglas Críticas

### **1. SIEMPRE usar `autorun.apply()` para implementar**
- ❌ **NUNCA usar `write()` o `search_replace()` directos en `prototypes/`**
- ✅ **SIEMPRE usar `autorun.apply()` vía MCP**

### **2. SIEMPRE consultar Storybook MCP**
- ✅ `autorun.apply()` lo hace automáticamente si `requireStorybookMcp: true`
- ✅ Pero puedes consultarlo manualmente antes si necesitas las props

### **3. SIEMPRE verificar con `autorun.verify()`**
- ✅ Verifica watermarks y patrones prohibidos
- ✅ Revierte cambios sin watermark automáticamente

---

## 🛠️ Herramientas MCP Disponibles

### **Herramientas de Detección:**
- ✅ `autorun.handleUserMessage` - Detecta componentes automáticamente
- ✅ `autorun.discoverComponent` - Obtiene nombre exacto del componente

### **Herramientas de Implementación:**
- ✅ `autorun.apply` - **PRINCIPAL** - Ejecuta TODO el flujo automáticamente
- ✅ `autorun.verify` - Verifica cambios y watermarks

### **Herramientas de Planificación:**
- ✅ `autorun.plan` - Genera plan de implementación
- ✅ `autorun.checklist` - Obtiene checklist del componente

### **Herramientas de Storybook:**
- ✅ `mcp_storybook_getComponentList` - Lista todos los componentes
- ✅ `mcp_storybook_getComponentsProps` - Obtiene props exactas

---

## 📝 Ejemplo Completo

```typescript
// FLUJO COMPLETO DE IMPLEMENTACIÓN DE TABS

// 1. Detectar componente
const handleResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.handleUserMessage',
  arguments: {
    message: 'implementar tabs en el módulo de encuestas'
  }
});

if (handleResult.blocked) {
  throw new Error(`❌ BLOQUEADO: ${handleResult.reason}`);
}

// 2. (Opcional) Descubrir nombre exacto
const discoverResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.discoverComponent',
  arguments: { searchTerm: 'tabs' }
});

// 3. Consultar Storybook MCP
const componentName = discoverResult?.exactName || 'Navegación/Tabs';
const propsResult = await call_mcp_tool({
  server: 'storybook',
  toolName: 'mcp_storybook_getComponentsProps',
  arguments: { componentNames: [componentName] }
});

// 4. Implementar
const applyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: 'implementar tabs en el módulo de encuestas con 3 tabs: Encuestas, Resultados, Configuración',
    targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-29.html'],
    options: {
      mode: 'prototypeTokens',
      requireStorybookMcp: true,
      allowPrototypeTokens: true
    }
  }
});

// 5. Verificar
const verifyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.verify',
  arguments: {
    targetFiles: 'diff',
    options: { autoRevert: true }
  }
});

console.log(`✅ Implementación completada: ${applyResult.filesWritten?.join(', ')}`);
```

---

## 🔍 Qué Hace `autorun.apply()` Internamente

1. ✅ Ejecuta `handleUserMessage()` automáticamente
2. ✅ Consulta Storybook MCP para obtener props exactas
3. ✅ Extrae código exacto desde Storybook en Vercel
4. ✅ Valida estructura antes de implementar
5. ✅ Analiza componentes internos necesarios
6. ✅ Escribe código con watermarks de Autorun
7. ✅ Ejecuta Prettier y ESLint
8. ✅ Ejecuta Auto-Reload si está activo
9. ✅ Hace commit a GitHub si está configurado

**Por eso es la herramienta principal - hace TODO automáticamente.**

---

**Última actualización:** 2025-12-30
