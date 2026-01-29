# Mejora: Detección Automática del Wizard State

**Fecha:** 2025-01-03  
**Estado:** ✅ IMPLEMENTADO

---

## 🎯 Problema

El wizard terminaba y creaba el archivo `.autorun/wizard-state.json`, pero el agente no detectaba automáticamente este archivo al inicio de cada mensaje para inicializar AutorunHub y abrir el browser interno de Cursor.

---

## ✅ Solución Implementada

Se mejoró el sistema para que `executeOnMessageStart()` detecte automáticamente el wizard state al inicio de cada mensaje y emita mensajes especiales que el agente debe procesar automáticamente.

### **Cambios Realizados:**

1. **Nuevo helper `autoWizardDetection.ts`:**
   - `autoDetectWizardState()`: Detecta automáticamente el archivo de estado del wizard
   - `processWizardState()`: Procesa el wizard state (inicializa AutorunHub, limpia archivo)
   - Emite mensajes especiales `[AUTORUN_WIZARD_STATE_DETECTED]`, `[AUTORUN_BROWSER_URL]`, `[AUTORUN_INIT_HUB]`

2. **Mejora en `executeOnMessageStart.ts`:**
   - Ahora detecta automáticamente el wizard state ANTES de cualquier otra cosa
   - Emite mensajes especiales para que el agente los procese
   - No bloquea si no hay wizard state

3. **Actualización de reglas:**
   - `.cursorrules`: Instrucciones mejoradas para procesar mensajes del wizard
   - `.cursor/rules/00-inicio.md`: Instrucciones actualizadas para usar `executeOnMessageStart()` que ya detecta el wizard

---

## 📋 Flujo Automático

**Antes:**
```
Wizard termina → Crea .autorun/wizard-state.json
↓
Usuario envía mensaje → Agente NO detecta automáticamente
↓
Usuario tiene que ejecutar manualmente: node scripts/detect-wizard-state.js
```

**Después:**
```
Wizard termina → Crea .autorun/wizard-state.json
↓
Usuario envía mensaje → executeOnMessageStart() detecta automáticamente
↓
executeOnMessageStart() emite mensajes especiales
↓
Agente procesa automáticamente:
  1. Inicializa AutorunHub
  2. Abre browser interno de Cursor
  3. Limpia archivo de estado
```

---

## 🔧 Cómo Funciona

### **1. Al inicio de cada mensaje:**

```typescript
// El agente ejecuta automáticamente:
const result = await executeOnMessageStart(userMessage);

// executeOnMessageStart() internamente:
// 1. Detecta wizard state automáticamente
// 2. Si detecta, emite mensajes especiales en los logs
// 3. El agente debe interceptar estos mensajes y procesarlos
```

### **2. Mensajes emitidos:**

Cuando se detecta wizard state, se emiten estos mensajes en los logs:
```
[AUTORUN_WIZARD_STATE_DETECTED]true[/AUTORUN_WIZARD_STATE_DETECTED]
[AUTORUN_BROWSER_URL]http://localhost:3000/...[/AUTORUN_BROWSER_URL]
[AUTORUN_INIT_HUB]true[/AUTORUN_INIT_HUB]
```

### **3. El agente debe procesar automáticamente:**

```typescript
// Si ve [AUTORUN_WIZARD_STATE_DETECTED]true en los logs:
// 1. Extraer URL de [AUTORUN_BROWSER_URL]...[/AUTORUN_BROWSER_URL]
const urlMatch = logs.match(/\[AUTORUN_BROWSER_URL\](.+?)\[\/AUTORUN_BROWSER_URL\]/);
const url = urlMatch ? urlMatch[1] : null;

// 2. Inicializar AutorunHub
if (url) {
  await run_terminal_cmd({ command: 'npm run autorun:init-hub' });
  
  // 3. Abrir browser interno de Cursor
  await call_mcp_tool({
    server: 'cursor-ide-browser',
    toolName: 'browser_navigate',
    arguments: { url }
  });
  
  // 4. Limpiar archivo de estado
  await run_terminal_cmd({ command: 'rm .autorun/wizard-state.json' });
}
```

---

## 📝 Archivos Modificados

- `packages/autorun-core/src/helpers/autoWizardDetection.ts` (NUEVO)
- `packages/autorun-core/src/helpers/executeOnMessageStart.ts` (MEJORADO)
- `packages/autorun-core/src/helpers/index.ts` (EXPORTADO)
- `.cursorrules` (ACTUALIZADO)
- `.cursor/rules/00-inicio.md` (ACTUALIZADO)

---

## ✅ Beneficios

1. **Detección automática:** El wizard state se detecta automáticamente al inicio de cada mensaje
2. **Sin intervención manual:** El usuario no necesita ejecutar scripts manualmente
3. **Browser interno:** Se abre automáticamente en el browser interno de Cursor (no Chrome)
4. **Flujo integrado:** Todo funciona dentro de `executeOnMessageStart()` que ya se ejecuta automáticamente

---

## 🧪 Pruebas

**Prueba 1: Wizard termina y usuario envía mensaje**
- ✅ `executeOnMessageStart()` detecta wizard state automáticamente
- ✅ Emite mensajes especiales en los logs
- ✅ El agente debe procesar automáticamente los mensajes

**Prueba 2: Sin wizard state**
- ✅ `executeOnMessageStart()` continúa normalmente
- ✅ No emite mensajes de wizard
- ✅ No bloquea el flujo

---

**Mejora completada:** 2025-01-03  
**Estado:** ✅ LISTO PARA USO
