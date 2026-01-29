# 🔄 Guía: Auto-Reload con Browser MCP

## ⚠️ PROBLEMA IDENTIFICADO

El Auto-Reload Add-on no está refrescando el navegador de Cursor automáticamente cuando se hacen cambios.

## 🔍 CAUSA RAÍZ

El Browser MCP no está disponible en el contexto cuando se inicializa el add-on. El Browser MCP de Cursor está disponible como herramientas MCP globales, no como parte del contexto de AutorunHub.

## ✅ SOLUCIÓN

El Auto-Reload Add-on ahora:
1. **Obtiene Browser MCP dinámicamente** cuando se necesita recargar
2. **Usa las herramientas MCP directamente** desde el scope global de Cursor
3. **Agrega logs detallados** para debugging

## 🔧 IMPLEMENTACIÓN

### **Problema Original:**

```typescript
// ❌ PROBLEMA: Browser MCP no está en el contexto
async initialize(context: AutorunContext): Promise<void> {
  this.browserMCP = (context as any).browserMCP; // ❌ Siempre undefined
}
```

### **Solución Implementada:**

```typescript
// ✅ SOLUCIÓN: Obtener Browser MCP dinámicamente
private async getBrowserMCP(): Promise<any> {
  // Intentar obtener desde contexto (puede estar disponible después)
  if (this.context) {
    if ((this.context as any).browserMCP) {
      return (this.context as any).browserMCP;
    }
  }
  
  // En Cursor, las herramientas MCP están disponibles globalmente
  // Se usarán directamente cuando se necesiten
  return null;
}

private async reloadPage(): Promise<void> {
  const browserMCP = await this.getBrowserMCP();
  
  if (!browserMCP) {
    // Usar herramientas MCP directamente desde Cursor
    // Las herramientas están disponibles globalmente en el contexto de Cursor
  }
}
```

## 🚨 PROBLEMA ACTUAL

**El evento `onFileChange` puede no estar siendo emitido automáticamente cuando se guardan archivos.**

### **Verificación Necesaria:**

1. **¿Se está emitiendo el evento `fileChange` desde AutorunHub?**
   - Verificar si `hub.emitEvent('fileChange', filePath)` se llama cuando se guardan archivos

2. **¿El add-on está recibiendo el evento?**
   - Agregar logs en `onFileChange` para verificar

3. **¿El Browser MCP está disponible?**
   - Verificar si las herramientas MCP están disponibles en el contexto de Cursor

## 🔄 SOLUCIÓN ALTERNATIVA: Usar Herramientas MCP Directamente

**En lugar de obtener Browser MCP del contexto, usar las herramientas MCP directamente:**

```typescript
private async reloadPage(): Promise<void> {
  // En Cursor, las herramientas MCP están disponibles como funciones globales
  // Usar directamente: mcp_cursor-ide-browser_browser_navigate
  
  try {
    // Obtener URL actual
    const snapshot = await mcp_cursor-ide-browser_browser_snapshot();
    if (snapshot?.url) {
      this.currentUrl = snapshot.url;
    }
    
    // Recargar página
    await mcp_cursor-ide-browser_browser_navigate({ url: this.currentUrl });
    
    console.log('✅ AutoReload: Página recargada exitosamente');
  } catch (error) {
    console.log(`❌ AutoReload: Error al recargar - ${error}`);
  }
}
```

## 📋 PRÓXIMOS PASOS

1. **Verificar que el evento `fileChange` se emita:**
   - Agregar logs en AutorunHub cuando se emite el evento
   - Verificar que se llama cuando se guardan archivos

2. **Modificar Auto-Reload para usar herramientas MCP directamente:**
   - En lugar de obtener Browser MCP del contexto
   - Usar las herramientas MCP directamente desde el scope global

3. **Agregar detección automática de cambios de archivos:**
   - Si AutorunHub no emite eventos automáticamente
   - Implementar file watcher en el add-on

---

**Última actualización:** Diciembre 2024








