# Guía: Solución del Error "Received a response for an unknown message ID"

**Fecha:** 2025-01-24  
**Problema:** El MCP de Autorun muestra error "Received a response for an unknown message ID" con `id: 0`

---

## 🔍 Síntomas

En los logs de Cursor (`View > Output > MCP`), aparece:

```
Client error for command Received a response for an unknown message ID: 
{"jsonrpc":"2.0","id":0,"result":{"protocolVersion":"2025-06-18",...}}
```

El MCP aparece en **rojo** (error) en la lista de servidores MCP.

---

## 🔧 Solución Paso a Paso

### **Paso 1: Eliminar Procesos Duplicados**

```bash
# Matar todos los procesos de Node.js (incluyendo servidores MCP)
killall -9 node

# Verificar que no hay procesos corriendo
ps aux | grep autorun-mcp | grep -v grep
```

**⚠️ IMPORTANTE:** Si hay múltiples instancias del servidor corriendo, pueden interferir entre sí y causar este error.

---

### **Paso 2: Verificar Configuración**

```bash
# Verificar que la configuración es correcta
cat ~/.cursor/mcp.json | grep -A 10 "autorun"
```

**Debe mostrar:**
```json
{
  "mcpServers": {
    "autorun": {
      "command": "/ruta/absoluta/node_modules/.bin/tsx",
      "args": ["/ruta/absoluta/packages/autorun-core/src/cli/autorun-mcp-server.ts"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

---

### **Paso 3: Reinstalar el MCP (si es necesario)**

```bash
# Reinstalar el MCP
npm run autorun:install-mcp
```

---

### **Paso 4: Reiniciar Cursor Completamente**

1. **Cerrar TODAS las ventanas de Cursor**
2. **Esperar 5 segundos**
3. **Abrir Cursor nuevamente**

**⚠️ CRÍTICO:** No basta con recargar la ventana - debes cerrar completamente Cursor.

---

### **Paso 5: Verificar Logs**

1. **Abrir:** `View > Output > MCP`
2. **Buscar:**
   - ✅ "✅ [Autorun MCP Server] Servidor iniciado y listo"
   - ✅ "✅ [Autorun MCP Server] Cliente inicializado correctamente"
   - ❌ "Received a response for an unknown message ID"

---

## 🔍 Diagnóstico Avanzado

### **Si el Error Persiste:**

1. **Verificar versión del SDK:**
   ```bash
   npm list @modelcontextprotocol/sdk
   ```
   Debe ser `^1.25.1` o superior.

2. **Verificar que el servidor se puede iniciar manualmente:**
   ```bash
   npx tsx packages/autorun-core/src/cli/autorun-mcp-server.ts
   ```
   Debe mostrar: "✅ [Autorun MCP Server] Servidor iniciado y listo"

3. **Verificar logs detallados:**
   - Abrir `View > Output > MCP`
   - Buscar errores específicos
   - Verificar que el handshake se completa

---

## 📋 Causas Comunes

### **1. Múltiples Instancias del Servidor**
- **Síntoma:** Múltiples procesos `tsx autorun-mcp-server.ts` corriendo
- **Solución:** `killall -9 node` y reiniciar Cursor

### **2. Configuración Incorrecta**
- **Síntoma:** Paths relativos en lugar de absolutos
- **Solución:** Reinstalar MCP: `npm run autorun:install-mcp`

### **3. Versión Incompatible del SDK**
- **Síntoma:** Error al iniciar el servidor
- **Solución:** `npm install @modelcontextprotocol/sdk@latest`

### **4. Problema con el Handshake**
- **Síntoma:** Error "unknown message ID" con `id: 0`
- **Solución:** El SDK maneja esto automáticamente, pero puede requerir reiniciar Cursor

---

## ✅ Verificación Final

Después de seguir todos los pasos, verifica:

- [ ] No hay procesos duplicados: `ps aux | grep autorun-mcp | grep -v grep` (debe estar vacío o mostrar solo 1 proceso)
- [ ] Configuración correcta: `cat ~/.cursor/mcp.json | grep autorun` muestra paths absolutos
- [ ] Logs muestran inicialización exitosa: "✅ Cliente inicializado correctamente"
- [ ] El MCP aparece en verde (no rojo) en Cursor

---

## 🆘 Si Nada Funciona

1. **Limpiar completamente:**
   ```bash
   killall -9 node
   rm -rf node_modules
   npm install
   npm run autorun:install-mcp
   ```

2. **Verificar versión de Node.js:**
   ```bash
   node --version  # Debe ser >= 18
   ```

3. **Verificar versión de Cursor:**
   - Debe ser la versión más reciente
   - Verificar en `Help > About`

4. **Reportar el problema:**
   - Incluir logs completos de `View > Output > MCP`
   - Incluir salida de `node scripts/verify-autorun-mcp-complete.js`
   - Incluir versión de Node.js y Cursor

---

**Última actualización:** 2025-01-24


