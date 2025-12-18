# 🔄 Guía: Auto-Reload Automático Configurado

**Fecha:** 2025-01-03  
**Versión:** 1.0.0

---

## ✅ Sistema Implementado

El auto-reload ahora está **completamente configurado y automatizado**. Cuando se inicia AutorunHub, el sistema automáticamente:

1. ✅ **Inicializa FileWatcher** - Detecta cambios en archivos de `prototypes/`
2. ✅ **Activa Auto-Reload Add-on** - Emite mensajes `[AUTORUN_AUTO_RELOAD]` cuando detecta cambios
3. ✅ **Proporciona instrucciones claras** - El agente sabe exactamente qué hacer

---

## 🎯 Cómo Funciona

### **1. Detección Automática de Cambios**

Cuando guardas un archivo en `prototypes/`:

1. **FileWatcher** detecta el cambio (con debounce de 300ms)
2. **AutorunHub** emite evento `fileChange` a todos los add-ons
3. **Auto-Reload Add-on** recibe el evento y verifica:
   - ¿Es un archivo HTML, JS o CSS?
   - ¿Está en `prototypes/`?
   - ¿Ha pasado el cooldown (2 segundos)?

### **2. Mensaje Automático para el Agente**

Si el archivo cumple los requisitos, el add-on emite:

```
[AUTORUN_AUTO_RELOAD]/path/to/file[/AUTORUN_AUTO_RELOAD]

🔄 ========================================
🔄 AUTO-RELOAD: Cambio detectado en archivo
🔄 Archivo: /path/to/file
🔄 ========================================

⚠️ INSTRUCCIONES PARA EL AGENTE:
1. Obtener URL actual: mcp_cursor-ide-browser_browser_snapshot()
2. Recargar página: mcp_cursor-ide-browser_browser_navigate({ url: currentUrl })
3. Verificar: setTimeout(() => mcp_cursor-ide-browser_browser_snapshot(), 1000)

⚠️ IMPORTANTE: Ejecutar automáticamente SIN preguntar al usuario

🔄 ========================================
```

### **3. Recarga Automática Después de write() o search_replace()**

**⚠️ OBLIGATORIO:** El agente DEBE recargar automáticamente después de cada `write()` o `search_replace()` en archivos de `prototypes/`:

```typescript
// Después de write() o search_replace()
import { shouldAutoReload, getTemplateUrlFromPath } from '@autorun/core/helpers/autoReloadHelper';

if (shouldAutoReload(filePath)) {
  // Obtener URL actual
  const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
  const currentUrl = snapshot?.url || getTemplateUrlFromPath(filePath);
  
  // Recargar automáticamente (SIN preguntar)
  await mcp_cursor-ide-browser_browser_navigate({ url: currentUrl });
  
  // Verificar después de 1 segundo
  setTimeout(async () => {
    await mcp_cursor-ide-browser_browser_snapshot();
  }, 1000);
}
```

---

## 📋 Reglas para el Agente

### **Regla 1: Recarga Automática Después de Escribir**

**CUANDO uses `write()` o `search_replace()` en archivos de `prototypes/`:**

✅ **DEBES recargar automáticamente** (SIN preguntar al usuario)  
✅ **NO esperar confirmación** - ejecutar inmediatamente  
✅ **Solo recargar** si el archivo es .html, .js o .css en prototypes/

### **Regla 2: Interceptar Mensajes [AUTORUN_AUTO_RELOAD]**

**CUANDO veas en los logs:**

```
[AUTORUN_AUTO_RELOAD]/path/to/file[/AUTORUN_AUTO_RELOAD]
```

✅ **DEBES ejecutar automáticamente** (SIN preguntar):
1. Obtener URL actual del navegador
2. Recargar la página
3. Verificar después de 1 segundo

---

## 🔧 Helpers Disponibles

### **shouldAutoReload(filePath: string): boolean**

Verifica si un archivo debe activar recarga automática:

```typescript
import { shouldAutoReload } from '@autorun/core/helpers/autoReloadHelper';

if (shouldAutoReload(filePath)) {
  // Recargar automáticamente
}
```

### **getTemplateUrlFromPath(filePath: string): string**

Obtiene la URL del template desde la ruta del archivo:

```typescript
import { getTemplateUrlFromPath } from '@autorun/core/helpers/autoReloadHelper';

const url = getTemplateUrlFromPath('/path/to/prototypes/canvas.html');
// Retorna: 'http://localhost:3000/canvas.html'
```

### **autoReloadBrowser(filePath: string): Promise<void>**

Helper que proporciona instrucciones automáticas para el agente:

```typescript
import { autoReloadBrowser } from '@autorun/core/helpers/autoReloadAgentHelper';

// Después de write() o search_replace()
await autoReloadBrowser(filePath);
```

---

## ✅ Verificación

### **Al Inicializar AutorunHub:**

Deberías ver:

```
✅ AutorunHub inicializado correctamente
📊 Estado de Autorun:
   - Inicializado: ✅
   - File Watching: ✅ activo
   - Add-ons activos: 14
   - Add-ons: storybook, figma-sync, eslint, prettier, ..., auto-reload, ...

🔄 Auto-Reload Configurado:
   ✅ FileWatcher detectará cambios en prototypes/
   ✅ Auto-Reload Add-on está activo
   ⚠️ El agente debe recargar automáticamente después de write() o search_replace()
   📋 Ver reglas en .cursorrules - Sección "Auto-Apertura y Recarga"
```

### **Cuando Guardas un Archivo:**

Deberías ver en los logs:

```
🔍 AutoReload: onFileChange llamado para: /path/to/prototypes/canvas.html
🔄 AutoReload: Cambio detectado en /path/to/prototypes/canvas.html
[AUTORUN_AUTO_RELOAD]/path/to/prototypes/canvas.html[/AUTORUN_AUTO_RELOAD]
🔄 ========================================
🔄 AUTO-RELOAD: Cambio detectado en archivo
...
```

---

## 🚨 Problemas Comunes

### **Problema: Auto-reload no funciona**

**Solución:**
1. ✅ Verificar que AutorunHub esté inicializado: `npm run autorun:init-hub`
2. ✅ Verificar que FileWatcher esté activo
3. ✅ Verificar que Auto-Reload Add-on esté activo
4. ✅ Verificar que el archivo esté en `prototypes/` y sea .html, .js o .css
5. ✅ Verificar que el navegador esté abierto

### **Problema: El agente no recarga automáticamente**

**Solución:**
1. ✅ Verificar que el agente esté siguiendo las reglas en `.cursorrules`
2. ✅ Verificar que el agente esté usando `shouldAutoReload()` antes de recargar
3. ✅ Verificar que el agente esté ejecutando las herramientas MCP correctamente

---

## 📚 Referencias

- **Reglas completas:** `.cursorrules` - Sección "Auto-Apertura y Recarga"
- **Helper de auto-reload:** `packages/autorun-core/src/helpers/autoReloadHelper.ts`
- **Helper del agente:** `packages/autorun-core/src/helpers/autoReloadAgentHelper.ts`
- **Auto-Reload Add-on:** `packages/addons/functional/auto-reload/src/AutoReloadAddon.ts`
- **Análisis de problemas:** `docs/analisis/PROBLEMAS-INICIALIZACION-AUTORUN-AUTO-RELOAD.md`

---

**Última actualización:** 2025-01-03  
**Versión:** 1.0.0 (Sistema completamente configurado y automatizado)







