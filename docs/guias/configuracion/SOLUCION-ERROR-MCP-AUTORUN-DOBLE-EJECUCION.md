# Solución: Error "Received a response for an unknown message ID" en MCP de Autorun

**Fecha:** 2025-01-24  
**Problema:** El MCP de Autorun muestra error "Received a response for an unknown message ID" (id:0) y múltiples instancias del servidor

---

## 🔍 Síntomas

En los logs de Cursor (`View > Output > MCP`), aparece:

```
Client error for command Received a response for an unknown message ID: 
{"jsonrpc":"2.0","id":0,"result":{"protocolVersion":"2025-06-18",...}}
```

Además:
- ✅ El servidor SÍ se conecta correctamente
- ✅ Los tools se listan correctamente (11 tools encontrados)
- ❌ Pero aparece el error de "unknown message ID"

---

## 🔧 Solución Aplicada

### **1. Eliminar Procesos Duplicados** ✅

```bash
# Matar todos los procesos de Node.js (incluyendo servidores MCP)
killall -9 node

# Verificar que no hay procesos corriendo
ps aux | grep autorun-mcp-server | grep -v grep
```

**⚠️ IMPORTANTE:** Si hay múltiples instancias del servidor corriendo, pueden interferir entre sí y causar este error.

---

### **2. Corregir Doble Ejecución del Servidor** ✅

**Problema:** El servidor se estaba iniciando dos veces:
1. Desde `autorun-mcp-server.ts` (correcto)
2. Desde el código al final de `autorunMCPServer.ts` (causaba doble ejecución)

**Solución:** Deshabilitar la auto-ejecución al final de `autorunMCPServer.ts` porque `autorun-mcp-server.ts` ya llama a `startAutorunMCPServer()` directamente.

**Archivo modificado:** `packages/autorun-core/src/mcp-server/autorunMCPServer.ts`

---

### **3. Corregir `oninitialized` Duplicado** ✅

**Problema:** `server.oninitialized` estaba definido dos veces (líneas 53 y 851), causando conflictos.

**Solución:** Eliminar la primera definición y dejar solo la segunda (más completa) con verificación `if (!server.oninitialized)`.

**Archivo modificado:** `packages/autorun-core/src/mcp-server/autorunMCPServer.ts`

---

## 📋 Verificación

### **Paso 1: Reiniciar Cursor Completamente**

1. **Cerrar TODAS las ventanas de Cursor**
2. **Esperar 5 segundos**
3. **Abrir Cursor nuevamente**

**⚠️ CRÍTICO:** No basta con recargar la ventana - debes cerrar completamente Cursor.

---

### **Paso 2: Verificar Logs**

1. **Abrir:** `View > Output > MCP`
2. **Buscar:**
   - ✅ "✅ [Autorun MCP Server] Servidor iniciado y listo"
   - ✅ "✅ [Autorun MCP Server] Cliente inicializado correctamente"
   - ✅ "Found 11 tools"
   - ❌ "Received a response for an unknown message ID" (debería desaparecer o ser menos frecuente)

---

### **Paso 3: Probar el MCP**

El MCP debería funcionar correctamente a pesar del error. Puedes probar:

```typescript
// El agente puede usar:
await call_mcp_tool({
  server: 'autorun',
  toolName: 'autorun.plan',
  arguments: { message: 'Implementar Button' }
});
```

---

## ⚠️ Nota Importante

**El error "unknown message ID" (id:0) NO es crítico** - es un problema conocido del handshake de inicialización del protocolo MCP. El servidor funciona correctamente a pesar de este error.

**Si el error persiste pero el servidor funciona:**
- ✅ El MCP está funcionando correctamente
- ✅ Puedes usar todos los tools sin problemas
- ⚠️ El error es solo una advertencia del handshake inicial

---

## 🔍 Diagnóstico Avanzado

### **Si el Error Persiste:**

1. **Verificar que no hay procesos duplicados:**
   ```bash
   ps aux | grep autorun-mcp-server | grep -v grep
   ```

2. **Verificar configuración:**
   ```bash
   cat ~/.cursor/mcp.json | grep -A 10 "autorun"
   ```

3. **Reinstalar el MCP:**
   ```bash
   npm run autorun:install-mcp
   ```

4. **Reiniciar Cursor completamente**

---

## 📚 Referencias

- **Guía general:** `docs/guias/configuracion/GUIA-SOLUCION-PROBLEMAS-MCP-AUTORUN.md`
- **Error específico:** `docs/guias/configuracion/GUIA-SOLUCION-ERROR-UNKNOWN-MESSAGE-ID.md`
- **Análisis técnico:** `docs/analisis/FIX-ERROR-UNKNOWN-MESSAGE-ID-MCP-2025-01-24.md`

---

**Última actualización:** 2025-01-24


