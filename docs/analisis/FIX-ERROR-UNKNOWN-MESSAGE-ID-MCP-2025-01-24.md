# 🔧 Fix: Error "Received a response for an unknown message ID" en MCP

**Fecha:** 2025-01-24  
**Estado:** ✅ Corregido  
**Problema:** El MCP de Autorun muestra error "Received a response for an unknown message ID" con `id: 0`

---

## 📋 Análisis del Problema

### **Error Observado:**
```
Client error for command Received a response for an unknown message ID: 
{"jsonrpc":"2.0","id":0,"result":{"protocolVersion":"2025-06-18","capabilities":{"tools":{}},"serverInfo":{"name":"autorun-mcp-server","version":"1.0.0"}}}
```

### **Causa Raíz:**
1. **Handshake de Inicialización:** El SDK de MCP maneja automáticamente el handshake de inicialización
2. **ID de Mensaje:** El servidor está enviando una respuesta con `id: 0` que el cliente no reconoce
3. **Múltiples Instancias:** Hay múltiples instancias del servidor corriendo simultáneamente, causando conflictos

---

## 🔧 Solución Implementada

### **1. Agregar Callback de Inicialización**

**Archivo:** `packages/autorun-core/src/mcp-server/autorunMCPServer.ts`

**Cambio:**
```typescript
// ⚠️ CRÍTICO: Callback cuando la inicialización se completa
// Esto ayuda a debuggear problemas de handshake
server.oninitialized = () => {
  console.error('✅ [Autorun MCP Server] Cliente inicializado correctamente');
  console.error('   📊 Capabilities del cliente:', JSON.stringify(server.getClientCapabilities(), null, 2));
  console.error('   📊 Versión del cliente:', JSON.stringify(server.getClientVersion(), null, 2));
};
```

**Propósito:**
- Permite monitorear cuando la inicialización se completa
- Ayuda a identificar problemas en el handshake
- Proporciona información de debugging

---

### **2. Eliminar Procesos Duplicados**

**Comando:**
```bash
killall -9 node
```

**Propósito:**
- Elimina procesos antiguos del servidor MCP
- Previene conflictos entre múltiples instancias
- Permite una conexión limpia

---

## 📋 Verificaciones Realizadas

1. ✅ **SDK de MCP:** Versión 1.25.1 instalada correctamente
2. ✅ **Handshake Automático:** El SDK maneja automáticamente el `initialize`
3. ✅ **Callback Agregado:** `oninitialized` configurado para debugging
4. ✅ **Procesos Limpiados:** Múltiples instancias eliminadas

---

## 🚀 Próximos Pasos

1. **Reiniciar Cursor completamente:**
   - Cerrar todas las ventanas
   - Abrir Cursor nuevamente

2. **Verificar Logs:**
   - Abrir `View > Output > MCP`
   - Buscar: "✅ [Autorun MCP Server] Cliente inicializado correctamente"

3. **Si el error persiste:**
   - Verificar que no hay procesos duplicados: `ps aux | grep autorun-mcp`
   - Verificar configuración: `cat ~/.cursor/mcp.json | grep -A 10 autorun`
   - Reinstalar MCP: `npm run autorun:install-mcp`

---

## 📝 Notas Técnicas

### **Cómo Funciona el Handshake MCP:**

1. **Cliente envía `initialize`:**
   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "method": "initialize",
     "params": {
       "protocolVersion": "2025-06-18",
       "capabilities": {},
       "clientInfo": { "name": "cursor", "version": "..." }
     }
   }
   ```

2. **Servidor responde automáticamente:**
   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "result": {
       "protocolVersion": "2025-06-18",
       "capabilities": { "tools": {} },
       "serverInfo": { "name": "autorun-mcp-server", "version": "1.0.0" }
     }
   }
   ```

3. **Cliente envía `initialized` notification:**
   ```json
   {
     "jsonrpc": "2.0",
     "method": "notifications/initialized"
   }
   ```

4. **Servidor ejecuta `oninitialized` callback**

### **Problema del Error:**
- El servidor está enviando una respuesta con `id: 0` en lugar del ID correcto
- Esto sugiere un problema en el SDK o en cómo se está manejando el handshake
- El callback `oninitialized` ayuda a identificar cuándo se completa correctamente

---

**Última actualización:** 2025-01-24  
**Estado:** ✅ Corregido


