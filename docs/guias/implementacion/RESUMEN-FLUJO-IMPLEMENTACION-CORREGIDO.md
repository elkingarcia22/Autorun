# ✅ Flujo de Implementación Corregido - Autorun

**Fecha:** 2025-12-30  
**Estado:** ✅ Flujo completo documentado y corregido

---

## 🎯 Flujo Correcto (Simplificado)

### **PASO 1: Ejecutar `handleUserMessage()` vía MCP**
```typescript
const handleResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.handleUserMessage',
  arguments: {
    message: userMessage
  }
});

// Verificar bloqueos
if (handleResult.blocked) {
  throw new Error(`❌ BLOQUEADO: ${handleResult.reason}`);
}
```

### **PASO 2: Implementar con `autorun.apply()`**
```typescript
// ⚠️ CRÍTICO: autorun.apply() ya ejecuta handleUserMessage() internamente,
// pero es mejor ejecutarlo antes para verificar bloqueos

const applyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.apply',
  arguments: {
    message: userMessage,
    targetFiles: ['prototypes/canvas-administrador-encuestas-2025-12-29.html'],
    options: {
      mode: 'prototypeTokens', // Para archivos en prototypes/
      requireStorybookMcp: true, // OBLIGATORIO
      allowPrototypeTokens: true
    }
  }
});
```

### **PASO 3: Verificar con `autorun.verify()`**
```typescript
const verifyResult = await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.verify',
  arguments: {
    targetFiles: 'diff',
    options: { autoRevert: true }
  }
});
```

---

## 📋 Herramientas MCP Disponibles

### **✅ Todas las herramientas están registradas en `mcp-server-v3`:**

1. ✅ `autorun.handleUserMessage` - Detecta componentes automáticamente
2. ✅ `autorun.discoverComponent` - Obtiene nombre exacto del componente
3. ✅ `autorun.apply` - **PRINCIPAL** - Ejecuta TODO el flujo automáticamente
4. ✅ `autorun.verify` - Verifica cambios y watermarks
5. ✅ `autorun.plan` - Genera plan de implementación
6. ✅ `autorun.checklist` - Obtiene checklist del componente
7. ✅ `autorun.storybook.start` - Inicia Storybook local
8. ✅ `autorun.storybook.build` - Construye Storybook estático
9. ✅ `autorun.storybook.extract` - Extrae código desde Storybook
10. ✅ `autorun.problems.list` - Lista problemas detectados
11. ✅ `autorun.github.commit` - Hace commit a GitHub
12. ✅ `autorun.lint` - Ejecuta ESLint
13. ✅ `autorun.visualTest` - Pruebas visuales
14. ✅ `autorun.test` - Herramienta de prueba

---

## 🔄 Qué Hace `autorun.apply()` Internamente

`autorun.apply()` ejecuta automáticamente:

1. ✅ `handleUserMessage()` - Detecta componentes
2. ✅ Consulta Storybook MCP - Obtiene props exactas
3. ✅ Extrae código exacto - Desde Storybook en Vercel
4. ✅ Valida estructura - Pre-implementación
5. ✅ Analiza componentes internos - Dependencias
6. ✅ Escribe código - Con watermarks de Autorun
7. ✅ Prettier - Formatea código
8. ✅ ESLint - Valida código
9. ✅ Auto-Reload - Recarga browser automáticamente
10. ✅ GitHub - Hace commit si está configurado

**Por eso es la herramienta principal - hace TODO automáticamente.**

---

## ⚠️ Reglas Críticas

### **1. SIEMPRE usar `autorun.apply()` para implementar**
- ❌ **NUNCA usar `write()` o `search_replace()` directos en `prototypes/`**
- ✅ **SIEMPRE usar `autorun.apply()` vía MCP**

### **2. SIEMPRE ejecutar `handleUserMessage()` primero**
- ✅ Verifica bloqueos antes de implementar
- ✅ Detecta componentes automáticamente
- ✅ Prepara el flujo completo

### **3. SIEMPRE verificar con `autorun.verify()`**
- ✅ Verifica watermarks y patrones prohibidos
- ✅ Revierte cambios sin watermark automáticamente

---

## 📝 Ejemplo Completo

```typescript
// FLUJO COMPLETO DE IMPLEMENTACIÓN

// PASO 1: Detectar componente
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

// PASO 2: Implementar
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

if (!applyResult.success) {
  throw new Error(`❌ Error: ${applyResult.errors?.join(', ')}`);
}

// PASO 3: Verificar
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

## 🔍 Diferencias con Flujo Anterior

### **Flujo Anterior (Incorrecto):**
- ❌ Usaba `search_replace()` directo
- ❌ No ejecutaba `handleUserMessage()` primero
- ❌ No usaba `autorun.apply()` vía MCP
- ❌ No verificaba con `autorun.verify()`

### **Flujo Corregido (Correcto):**
- ✅ Ejecuta `handleUserMessage()` primero
- ✅ Usa `autorun.apply()` vía MCP
- ✅ Verifica con `autorun.verify()`
- ✅ Sigue el flujo automatizado completo

---

**Última actualización:** 2025-12-30
