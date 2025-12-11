# 🔍 Análisis: Problemas de Inicialización de AutorunHub y Auto-Reload

**Fecha:** 2025-01-03  
**Problemas identificados:**
1. ❌ AutorunHub no se inicializa automáticamente después del wizard
2. ❌ Auto-reload no funciona después de cambios en archivos

---

## 🔴 Problema 1: AutorunHub No Se Inicializa Automáticamente

### **Causa Raíz:**

Aunque el código en `packages/autorun-core/src/cli/autorun-init.ts` tiene lógica para inicializar AutorunHub automáticamente después del wizard:

```typescript
// Inicializar AutorunHub automáticamente después del wizard
try {
    console.log('\n🚀 Inicializando AutorunHub...');
    await hub.initialize();
    console.log('✅ AutorunHub inicializado correctamente');
    console.log('   - File watching activo');
    console.log('   - Add-ons cargados');
} catch (error: any) {
    console.warn('⚠️  No se pudo inicializar AutorunHub completamente:', error.message);
    console.warn('   Puedes ejecutar "npm run autorun:init-hub" después para inicializarlo.');
}
```

**El problema es que:**
1. El wizard se ejecuta en un proceso separado que termina después de completar
2. Cuando el agente de Cursor inicia una nueva sesión, AutorunHub no está inicializado
3. El agente debe ejecutar `npm run autorun:init-hub` al inicio de cada sesión según las reglas, pero **no lo está haciendo automáticamente**

### **Solución:**

El agente de Cursor debe seguir la regla obligatoria en `.cursorrules` y `.cursor/rules/00-inicio.md`:

**Regla obligatoria:**
```markdown
## ⚠️⚠️⚠️ CRÍTICO: INICIALIZAR AUTORUN PRIMERO ⚠️⚠️⚠️

**🚨 ESTA ES LA PRIMERA ACCIÓN OBLIGATORIA EN CADA SESIÓN 🚨**

**ANTES de usar CUALQUIER herramienta, EJECUTAR:**

npm run autorun:init-hub
```

**El agente debe:**
1. ✅ Ejecutar `npm run autorun:init-hub` al inicio de cada sesión
2. ✅ Verificar que vea en la salida:
   - ✅ "🚀 Inicializando AutorunHub..."
   - ✅ "✅ AutorunHub inicializado correctamente"
   - ✅ "📊 Estado de Autorun:"
   - ✅ "   - Inicializado: ✅"
   - ✅ "   - File Watching: ✅ activo"

**Si no ve estos logs, NO debe continuar hasta que AutorunHub esté inicializado.**

---

## 🔴 Problema 2: Auto-Reload No Funciona

### **Causa Raíz:**

El auto-reload depende de dos cosas:

1. **AutorunHub inicializado** (file watching activo)
   - Si AutorunHub no está inicializado, el Auto-Reload add-on no recibe eventos de cambios

2. **El agente debe interceptar y recargar automáticamente**
   - El Auto-Reload add-on emite mensajes `[AUTORUN_AUTO_RELOAD]` en los logs
   - El agente debe detectar estos mensajes y recargar automáticamente usando Browser MCP
   - **El agente NO está interceptando estos mensajes automáticamente**

### **Cómo Funciona el Auto-Reload:**

1. **FileWatcher (AutorunHub)** detecta cambios en archivos de `prototypes/`
2. **Auto-Reload Add-on** recibe evento `fileChange` de AutorunHub
3. **Auto-Reload Add-on** emite mensaje en logs:
   ```
   [AUTORUN_AUTO_RELOAD]/path/to/file[/AUTORUN_AUTO_RELOAD]
   💡 AutoReload: El agente de Cursor debe interceptar el mensaje [AUTORUN_AUTO_RELOAD] y recargar la página
   ```
4. **El agente debe interceptar** este mensaje y recargar automáticamente:
   ```javascript
   const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
   const currentUrl = snapshot?.url || `http://localhost:3000/${path.basename(filePath)}`;
   await mcp_cursor-ide-browser_browser_navigate({ url: currentUrl });
   setTimeout(async () => { await mcp_cursor-ide-browser_browser_snapshot(); }, 1000);
   ```

### **Solución:**

El agente debe implementar dos estrategias:

#### **Estrategia 1: Interceptar Mensajes `[AUTORUN_AUTO_RELOAD]` (Recomendado)**

Cuando el agente vea en los logs:
```
[AUTORUN_AUTO_RELOAD]/path/to/file[/AUTORUN_AUTO_RELOAD]
```

**DEBE ejecutar automáticamente (SIN preguntar):**
```javascript
// 1. Obtener URL actual del navegador
const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
const currentUrl = snapshot?.url || `http://localhost:3000/${path.basename(filePath)}`;

// 2. Recargar la página
await mcp_cursor-ide-browser_browser_navigate({ url: currentUrl });

// 3. Esperar y verificar
setTimeout(async () => {
  await mcp_cursor-ide-browser_browser_snapshot();
}, 1000);
```

#### **Estrategia 2: Recargar Automáticamente Después de `write()` o `search_replace()`**

Cuando el agente use `write()` o `search_replace()` en archivos de `prototypes/`:

**DEBE recargar automáticamente (SIN preguntar):**
```javascript
// Después de usar write() o search_replace() en prototypes/
const filePath = 'prototypes/canvas-encuestas.html';

if (filePath.includes('prototypes/') && 
    (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css'))) {
  
  // Recargar automáticamente
  const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
  const currentUrl = snapshot?.url || `http://localhost:3000/${path.basename(filePath)}`;
  await mcp_cursor-ide-browser_browser_navigate({ url: currentUrl });
  
  setTimeout(async () => {
    await mcp_cursor-ide-browser_browser_snapshot();
  }, 1000);
}
```

---

## ✅ Checklist de Verificación

### **Para AutorunHub:**
- [ ] ¿El agente ejecuta `npm run autorun:init-hub` al inicio de cada sesión?
- [ ] ¿Ve los logs de inicialización correcta?
- [ ] ¿Verifica que File Watching esté activo?
- [ ] ¿NO continúa hasta que AutorunHub esté inicializado?

### **Para Auto-Reload:**
- [ ] ¿AutorunHub está inicializado? (requisito previo)
- [ ] ¿El agente intercepta mensajes `[AUTORUN_AUTO_RELOAD]` en los logs?
- [ ] ¿El agente recarga automáticamente después de `write()` o `search_replace()` en `prototypes/`?
- [ ] ¿Usa Browser MCP para recargar (`mcp_cursor-ide-browser_browser_navigate`)?

---

## 🔧 Implementación Recomendada

### **1. Al Inicio de Cada Sesión:**

```typescript
// OBLIGATORIO: Ejecutar esto PRIMERO
await run_terminal_cmd({
  command: 'npm run autorun:init-hub',
  is_background: false
});

// Verificar que se inicializó correctamente
// Buscar en la salida:
// - ✅ "✅ AutorunHub inicializado correctamente"
// - ✅ "   - File Watching: ✅ activo"
```

### **2. Después de Cada `write()` o `search_replace()` en `prototypes/`:**

```typescript
// Después de guardar archivo en prototypes/
const filePath = 'prototypes/canvas-encuestas.html';

if (filePath.includes('prototypes/') && 
    (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css'))) {
  
  // Recargar automáticamente
  try {
    const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
    const currentUrl = snapshot?.url || `http://localhost:3000/${path.basename(filePath)}`;
    await mcp_cursor-ide-browser_browser_navigate({ url: currentUrl });
    
    setTimeout(async () => {
      await mcp_cursor-ide-browser_browser_snapshot();
    }, 1000);
  } catch (error) {
    console.warn('⚠️ No se pudo recargar automáticamente:', error);
  }
}
```

### **3. Interceptar Mensajes `[AUTORUN_AUTO_RELOAD]`:**

El agente debe monitorear los logs del terminal y cuando vea:
```
[AUTORUN_AUTO_RELOAD]/path/to/file[/AUTORUN_AUTO_RELOAD]
```

Ejecutar automáticamente el código de recarga (ver Estrategia 1 arriba).

---

## 📋 Referencias

- **Reglas de inicialización:** `.cursor/rules/00-inicio.md`
- **Reglas de auto-reload:** `.cursorrules` - Sección "Auto-Apertura y Recarga"
- **Helper de auto-reload:** `packages/autorun-core/src/helpers/autoReloadHelper.ts`
- **Auto-Reload Add-on:** `packages/addons/functional/auto-reload/src/AutoReloadAddon.ts`

---

## 🎯 Resumen

**Problemas:**
1. ❌ AutorunHub no se inicializa automáticamente al inicio de sesión
2. ❌ Auto-reload no funciona porque el agente no intercepta mensajes ni recarga automáticamente

**Soluciones:**
1. ✅ El agente debe ejecutar `npm run autorun:init-hub` al inicio de cada sesión
2. ✅ El agente debe recargar automáticamente después de `write()` o `search_replace()` en `prototypes/`
3. ✅ El agente debe interceptar mensajes `[AUTORUN_AUTO_RELOAD]` en los logs y recargar automáticamente




