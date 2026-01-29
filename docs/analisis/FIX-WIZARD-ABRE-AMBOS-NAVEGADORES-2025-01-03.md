# Fix: Wizard Abre en Ambos Navegadores (Externo + Interno)

**Fecha:** 2025-01-03  
**Estado:** ✅ IMPLEMENTADO

---

## 🎯 Problema

El usuario reportó que:
1. La detección automática del wizard state no funcionaba
2. El wizard NO abría el navegador externo (Chrome), solo emitía mensajes para el browser interno de Cursor

---

## ✅ Solución Implementada

Se modificó el wizard para que:
1. **Abra automáticamente en el navegador externo (Chrome)** cuando termina
2. **Emita mensajes para que el agente abra en el browser interno de Cursor** automáticamente
3. **Ambos navegadores se abran** - externo inmediatamente, interno cuando el agente procese el wizard state

### **Cambios Realizados:**

1. **Modificación en `InitializationWizard.openTemplateInBrowser()`:**
   - Ahora abre automáticamente en Chrome usando `execAsync` con comandos específicos por plataforma
   - macOS: `open -a "Google Chrome" "${url}"`
   - Windows: `start chrome "${url}"`
   - Linux: `xdg-open "${url}"`
   - Si falla, muestra advertencia pero continúa

2. **Mantiene la funcionalidad del browser interno:**
   - Sigue emitiendo mensajes `[AUTORUN_BROWSER_URL]` y `[AUTORUN_INIT_HUB]`
   - Sigue escribiendo el archivo de estado `.autorun/wizard-state.json`
   - El agente puede detectar y abrir en el browser interno de Cursor

---

## 📋 Flujo Mejorado

**Antes:**
```
Wizard termina → Solo emite mensajes → Usuario tiene que abrir manualmente
```

**Después:**
```
Wizard termina → Abre Chrome automáticamente → Emite mensajes → Agente abre browser interno
```

---

## 🔧 Cómo Funciona

### **1. Al terminar el wizard:**

```typescript
// El wizard ejecuta automáticamente:
await openTemplateInBrowser(canvasPath);

// Internamente:
// 1. Abre Chrome automáticamente
execAsync('open -a "Google Chrome" "http://localhost:3000/..."');

// 2. Emite mensajes para el agente
console.log('[AUTORUN_BROWSER_URL]http://localhost:3000/...[/AUTORUN_BROWSER_URL]');
console.log('[AUTORUN_INIT_HUB]true[/AUTORUN_INIT_HUB]');

// 3. Escribe archivo de estado
await writeWizardStateFile(url);
```

### **2. El agente detecta automáticamente:**

```typescript
// Al inicio de cada mensaje, el agente ejecuta:
const wizardResult = await processWizardStateForAgent();
if (wizardResult.success && wizardResult.url) {
  // Abre en browser interno de Cursor
  await call_mcp_tool({
    server: 'cursor-ide-browser',
    toolName: 'browser_navigate',
    arguments: { url: wizardResult.url }
  });
}
```

---

## 📝 Archivos Modificados

- `packages/autorun-core/src/wizard/InitializationWizard.ts` (MEJORADO)

---

## ✅ Beneficios

1. **Apertura inmediata:** Chrome se abre automáticamente cuando termina el wizard
2. **Doble apertura:** Tanto Chrome como el browser interno de Cursor se abren
3. **Fallback robusto:** Si Chrome no se puede abrir, muestra advertencia pero continúa
4. **Compatibilidad multiplataforma:** Funciona en macOS, Windows y Linux

---

## 🧪 Pruebas

**Prueba 1: Wizard termina**
- ✅ Chrome se abre automáticamente con la URL del template
- ✅ Se emiten mensajes para el agente
- ✅ Se escribe archivo de estado

**Prueba 2: Agente detecta wizard state**
- ✅ `processWizardStateForAgent()` detecta el archivo de estado
- ✅ Abre browser interno de Cursor automáticamente
- ✅ Limpia archivo de estado después de procesar

**Prueba 3: Chrome no disponible**
- ✅ Muestra advertencia pero continúa
- ✅ Emite mensajes para el agente normalmente
- ✅ El agente puede abrir en browser interno

---

**Fix completado:** 2025-01-03  
**Estado:** ✅ LISTO PARA USO
