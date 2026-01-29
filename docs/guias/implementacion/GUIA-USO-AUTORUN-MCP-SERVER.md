# Guía: Uso del Autorun MCP Server

**Fecha:** 2025-01-03  
**Objetivo:** Aprender a usar el Autorun MCP Server para implementar componentes desde Storybook

---

## 🎯 ¿Por qué usar el Autorun MCP Server?

**Problema anterior:**
- ❌ El agente podía saltarse el flujo automático
- ❌ Usaba `write()` y `search_replace()` directamente
- ❌ No consultaba Storybook MCP
- ❌ No validaba pre-implementación
- ❌ Resultado: Implementaciones incorrectas

**Solución con MCP Server:**
- ✅ El agente **DEBE** usar `autorun.apply()` (único camino válido)
- ✅ El flujo completo se ejecuta automáticamente
- ✅ No puede saltarse ningún paso
- ✅ Resultado: Implementaciones correctas y consistentes

---

## 📋 Flujo de Uso

### **Flujo Básico:**

```
Usuario: "implementa un botón que abra un drawer"
↓
Agente: autorun.apply({ message: "...", targetFiles: [...] })
↓
Autorun MCP Server ejecuta automáticamente:
  ├─ FASE 1: PREPARACIÓN
  │  ├─ Pre-Implementation Check ✅
  │  └─ Storybook Add-on ✅
  │
  ├─ FASE 2: IMPLEMENTACIÓN
  │  ├─ handleUserMessage() → Detecta componentes ✅
  │  ├─ Storybook MCP → Obtiene props ✅
  │  ├─ Extracción código exacto ✅
  │  ├─ Validación pre-implementación ✅
  │  └─ Escritura con marcas Autorun ✅
  │
  ├─ FASE 3: POST-IMPLEMENTACIÓN
  │  ├─ Prettier (formateo) ✅
  │  ├─ ESLint (validación) ✅
  │  ├─ Auto-Reload (recarga) ✅
  │  └─ GitHub (commit si está configurado) ✅
  │
  └─ FASE 4: VERIFICACIÓN
     └─ Tests visuales (opcional) ✅
↓
Retorna: { success: true, filesWritten: [...], verification: {...} }
```

---

## 🔧 Tools Disponibles

### **1. autorun.plan() - Generar Plan**

**Uso:**
```typescript
const plan = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.plan",
  arguments: {
    message: "implementa un botón que abra un drawer"
  }
});
```

**Retorna:**
```json
{
  "plan": {
    "components": [
      { "name": "Button", "storybookId": "🧩-ux-button", "detected": true },
      { "name": "Drawer", "storybookId": "⚙️-functional-drawer", "detected": true }
    ],
    "steps": [
      { "step": 1, "description": "Detectar componentes...", "required": true },
      { "step": 2, "description": "Consultar Storybook MCP...", "required": true },
      ...
    ],
    "totalSteps": 8,
    "estimatedTime": "~25s"
  },
  "blocked": false,
  "storybookUrls": ["https://libraries-ui.ubitslearning.com/..."],
  "mcpMessages": [
    { "componentName": "Button", "storybookId": "🧩-ux-button" },
    { "componentName": "Drawer", "storybookId": "⚙️-functional-drawer" }
  ]
}
```

**Cuándo usar:**
- Para previsualizar qué se va a hacer
- Para verificar que se detectaron los componentes correctos
- Para obtener URLs de Storybook antes de implementar

---

### **2. autorun.apply() - Implementar** ⭐ CRÍTICO

**Uso:**
```typescript
const result = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.apply",
  arguments: {
    message: "implementa un botón secundario solo icono que abra un drawer",
    targetFiles: ["prototypes/template.html"], // Opcional
    options: {
      skipVerification: false,      // Saltar validación pre-implementación
      dryRun: false,                // Solo simular, no escribir
      skipFormatting: false,        // Saltar Prettier
      skipLinting: false,          // Saltar ESLint
      skipAutoReload: false,       // Saltar recarga automática
      skipAutoCommit: false,       // Saltar auto-commit
      runVisualTests: false         // Ejecutar tests visuales
    }
  }
});
```

**Retorna:**
```json
{
  "success": true,
  "filesWritten": ["prototypes/template.html"],
  "verification": {
    "preImplementation": true,
    "postImplementation": true,
    "prettier": true,
    "eslint": {
      "errors": 0,
      "fixed": 2,
      "warnings": 0
    },
    "autoReload": true,
    "github": {
      "committed": true,
      "pushed": false,
      "commitHash": "abc123..."
    },
    "errors": [],
    "warnings": []
  },
  "components": [
    {
      "name": "Button",
      "storybookId": "🧩-ux-button",
      "implemented": true
    },
    {
      "name": "Drawer",
      "storybookId": "⚙️-functional-drawer",
      "implemented": true
    }
  ],
  "plan": { ... } // Plan basado en historias si está disponible
}
```

**Cuándo usar:**
- ⭐ **SIEMPRE** para implementar componentes desde Storybook
- Es el único camino válido para escribir código de componentes

---

### **3. autorun.verify() - Verificar**

**Uso:**
```typescript
const verification = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.verify",
  arguments: {
    targetFiles: ["prototypes/template.html"], // O "diff" para git diff
    options: {
      strict: false,              // Errores en lugar de advertencias
      checkAutorunMarks: true,     // Verificar marcas Autorun
      checkStructure: true,        // Verificar estructura
      checkAccessibility: true     // Verificar accesibilidad
    }
  }
});
```

**Retorna:**
```json
{
  "valid": true,
  "errors": [],
  "warnings": [],
  "suggestions": [],
  "files": [
    {
      "path": "prototypes/template.html",
      "hasAutorunMark": true,
      "isValid": true,
      "issues": [],
      "metadata": {
        "component": "Button",
        "storybookId": "🧩-ux-button",
        "story": "default",
        "hash": "abc123...",
        "timestamp": "2025-01-03T12:00:00Z"
      }
    }
  ]
}
```

**Cuándo usar:**
- Después de implementar para verificar que todo está correcto
- Antes de hacer commit para asegurar calidad
- Para auditar archivos existentes

---

### **4. autorun.checklist() - Obtener Checklist**

**Uso:**
```typescript
const checklist = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.checklist",
  arguments: {
    componentName: "Button"
  }
});
```

**Retorna:**
```json
{
  "componentName": "Button",
  "checklist": {
    "storybookVercel": true,
    "storybookMCP": true,
    "documentation": true,
    "comparison": true
  },
  "missingSteps": [],
  "completedSteps": [
    "Consultar Storybook en Vercel",
    "Consultar Storybook MCP",
    "Consultar documentación",
    "Comparar versiones"
  ],
  "canImplement": true,
  "plan": { ... } // Plan basado en historias si está disponible
}
```

**Cuándo usar:**
- Para verificar qué pasos faltan antes de implementar
- Para ver el estado del checklist de un componente

---

## 🎯 Ejemplos Completos

### **Ejemplo 1: Implementar Botón y Drawer**

```typescript
// Paso 1: Generar plan (opcional)
const plan = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.plan",
  arguments: {
    message: "implementa un botón secundario solo icono que abra un drawer"
  }
});

console.log(`Plan: ${plan.plan.totalSteps} pasos`);
console.log(`Componentes: ${plan.plan.components.map(c => c.name).join(', ')}`);

// Paso 2: Implementar
const result = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.apply",
  arguments: {
    message: "implementa un botón secundario solo icono que abra un drawer",
    targetFiles: ["prototypes/template.html"]
  }
});

if (result.success) {
  console.log(`✅ Implementación exitosa!`);
  console.log(`   Archivos escritos: ${result.filesWritten.join(', ')}`);
  console.log(`   Componentes: ${result.components.map(c => c.name).join(', ')}`);
} else {
  console.error(`❌ Error: ${result.errors?.join(', ')}`);
}

// Paso 3: Verificar (opcional)
const verification = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.verify",
  arguments: {
    targetFiles: result.filesWritten
  }
});

if (verification.valid) {
  console.log(`✅ Verificación pasada`);
} else {
  console.error(`❌ Problemas encontrados: ${verification.errors.join(', ')}`);
}
```

---

### **Ejemplo 2: Implementar con Opciones Personalizadas**

```typescript
const result = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.apply",
  arguments: {
    message: "implementa un modal con formulario",
    targetFiles: ["prototypes/template.html"],
    options: {
      skipVerification: false,    // Validar antes de implementar
      dryRun: false,               // Escribir realmente
      skipFormatting: false,       // Formatear con Prettier
      skipLinting: true,          // Saltar ESLint (más rápido)
      skipAutoReload: false,      // Recargar browser
      skipAutoCommit: true,        // No hacer commit automático
      runVisualTests: false        // No ejecutar tests visuales
    }
  }
});
```

---

### **Ejemplo 3: Verificar Archivos Modificados en Git**

```typescript
const verification = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.verify",
  arguments: {
    targetFiles: "diff", // Verificar todos los archivos modificados en git
    options: {
      strict: true,              // Errores en lugar de advertencias
      checkAutorunMarks: true,   // Verificar marcas
      checkStructure: true,       // Verificar estructura
      checkAccessibility: true    // Verificar accesibilidad
    }
  }
});

if (!verification.valid) {
  console.error(`❌ ${verification.errors.length} error(es) encontrado(s)`);
  verification.errors.forEach(error => console.error(`   - ${error}`));
}
```

---

## ⚠️ Reglas Críticas

### **1. SIEMPRE usar autorun.apply() para implementar componentes**

❌ **NO hacer:**
```typescript
// ❌ NO usar write() o search_replace() directamente
await write('prototypes/template.html', code);
```

✅ **Hacer:**
```typescript
// ✅ SIEMPRE usar autorun.apply()
await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.apply",
  arguments: { message: "...", targetFiles: [...] }
});
```

### **2. El agente NO puede saltarse el flujo**

Con el MCP server, el agente **NO tiene opción** de saltarse el flujo:
- ❌ No puede usar `write()` directamente (no tiene acceso)
- ✅ Debe usar `autorun.apply()` (único camino válido)
- ✅ El flujo completo se ejecuta automáticamente

### **3. Verificar después de implementar**

Siempre verifica después de implementar:
```typescript
const verification = await call_mcp_tool({
  server: "autorun",
  toolName: "autorun.verify",
  arguments: { targetFiles: result.filesWritten }
});
```

---

## 🔍 Debugging

### **Ver Logs del Servidor**

El servidor MCP escribe logs a `stderr`. Para verlos:

```bash
# Ejecutar servidor manualmente para ver logs
npm run autorun:mcp-server 2>&1 | grep "\[Autorun MCP"
```

### **Verificar que el Servidor Está Cargado**

En Cursor, el servidor MCP debería aparecer en la lista de servidores MCP disponibles. Si no aparece:
1. Verifica que `.cursor/mcp.json` existe y tiene la configuración correcta
2. Reinicia Cursor completamente
3. Verifica que el servidor puede ejecutarse: `npm run autorun:mcp-server`

---

## 📚 Referencias

- **Instalación:** `docs/guias/configuracion/GUIA-INSTALACION-AUTORUN-MCP-SERVER.md`
- **Plan de Implementación:** `docs/analisis/PLAN-IMPLEMENTACION-AUTORUN-MCP-SERVER-2025-01-03.md`
- **Integración con Add-ons:** `docs/analisis/PLAN-INTEGRACION-MCP-SERVER-CON-ADDONS-2025-01-03.md`

---

**Última actualización:** 2025-01-03
