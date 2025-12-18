# Guía: Detección Automática del Wizard State (Mejorada)

**Fecha:** 2025-01-03  
**Objetivo:** El agente detecta automáticamente el wizard state y abre el browser interno de Cursor

---

## 🎯 Problema Resuelto

**Antes:**
- El wizard terminaba y creaba `.autorun/wizard-state.json`
- El agente NO detectaba automáticamente este archivo
- El usuario tenía que ejecutar manualmente: `node scripts/detect-wizard-state.js`
- El browser se abría en Chrome externo en lugar del browser interno de Cursor

**Después:**
- El wizard termina y crea `.autorun/wizard-state.json`
- `executeOnMessageStart()` detecta automáticamente el wizard state
- El agente procesa automáticamente usando `processWizardStateForAgent()`
- El browser se abre automáticamente en el browser interno de Cursor

---

## 📋 Flujo Automático Mejorado

### **1. Al inicio de cada mensaje:**

```typescript
// ⚠️ OBLIGATORIO: Ejecutar esto PRIMERO en cada mensaje
import { processWizardStateForAgent } from '@autorun/core';

const wizardResult = await processWizardStateForAgent();
if (wizardResult.success && wizardResult.url) {
  // 1. Inicializar AutorunHub (ya se hizo en processWizardStateForAgent)
  // 2. Abrir browser interno de Cursor
  await call_mcp_tool({
    server: 'cursor-ide-browser',
    toolName: 'browser_navigate',
    arguments: { url: wizardResult.url }
  });
  await call_mcp_tool({
    server: 'cursor-ide-browser',
    toolName: 'browser_snapshot'
  });
  // 3. Limpiar archivo de estado
  await run_terminal_cmd({ command: 'rm -f .autorun/wizard-state.json' });
}
```

### **2. Después, ejecutar handleUserMessage():**

```typescript
// ⚠️ OBLIGATORIO: Ejecutar esto DESPUÉS de procesar wizard state
import { handleUserMessage } from '@autorun/core';

const result = await handleUserMessage(userMessage);
// ... continuar con el flujo normal
```

---

## 🔧 Helpers Disponibles

### **1. `processWizardStateForAgent()` - RECOMENDADO**

**Uso:**
```typescript
import { processWizardStateForAgent } from '@autorun/core';

const wizardResult = await processWizardStateForAgent();
if (wizardResult.success && wizardResult.url) {
  // Procesar como se muestra arriba
}
```

**Ventajas:**
- ✅ Detecta automáticamente el wizard state
- ✅ Inicializa AutorunHub automáticamente
- ✅ Retorna la URL para abrir el browser
- ✅ Maneja errores automáticamente

### **2. `autoDetectWizardState()` - Detección sin procesamiento**

**Uso:**
```typescript
import { autoDetectWizardState } from '@autorun/core';

const detection = await autoDetectWizardState();
if (detection.detected && detection.url) {
  // Procesar manualmente
}
```

**Ventajas:**
- ✅ Solo detecta, no procesa
- ✅ Útil si necesitas más control

---

## 📝 Archivos Creados/Modificados

### **Nuevos:**
- `packages/autorun-core/src/helpers/autoWizardDetection.ts`
- `packages/autorun-core/src/helpers/processWizardStateForAgent.ts`

### **Modificados:**
- `packages/autorun-core/src/helpers/executeOnMessageStart.ts` - Detecta wizard state automáticamente
- `packages/autorun-core/src/helpers/index.ts` - Exporta nuevos helpers
- `.cursorrules` - Instrucciones mejoradas
- `.cursor/rules/00-inicio.md` - Instrucciones actualizadas

---

## ✅ Beneficios

1. **Detección automática:** El wizard state se detecta automáticamente al inicio de cada mensaje
2. **Sin intervención manual:** El usuario no necesita ejecutar scripts manualmente
3. **Browser interno:** Se abre automáticamente en el browser interno de Cursor (no Chrome)
4. **Flujo integrado:** Todo funciona dentro de `executeOnMessageStart()` que ya se ejecuta automáticamente
5. **Helper dedicado:** `processWizardStateForAgent()` facilita el procesamiento para el agente

---

## 🧪 Pruebas

**Prueba 1: Wizard termina y usuario envía mensaje**
- ✅ `processWizardStateForAgent()` detecta wizard state automáticamente
- ✅ Inicializa AutorunHub automáticamente
- ✅ Retorna URL para abrir browser
- ✅ El agente abre browser interno de Cursor automáticamente

**Prueba 2: Sin wizard state**
- ✅ `processWizardStateForAgent()` retorna `success: false`
- ✅ No bloquea el flujo
- ✅ Continúa normalmente con `handleUserMessage()`

---

**Guía completada:** 2025-01-03  
**Estado:** ✅ LISTO PARA USO
