# Solución: Error "No matching version found for firecrawl-mcp@3.7.2"

**Fecha:** 2025-01-24  
**Problema:** El MCP de Firecrawl falla con error "No matching version found for firecrawl-mcp@3.7.2"

---

## 🔍 Síntomas

En los logs de Cursor (`View > Output > MCP`), aparece:

```
npm error code ETARGET
npm error notarget No matching version found for firecrawl-mcp@3.7.2.
npm error notarget In most cases you or one of your dependencies are requesting
npm error notarget a package version that doesn't exist.
```

---

## 🔧 Solución Aplicada

### **1. Limpiar Caché de npx** ✅

El problema puede ser causado por una caché desactualizada de npx que intenta instalar una versión que ya no está disponible.

```bash
# Limpiar caché de npx
rm -rf ~/.npm/_npx

# O usar el comando oficial (si está disponible)
npx clear-npx-cache
```

---

### **2. Actualizar Configuración para Usar @latest** ✅

Actualizar la configuración de Firecrawl MCP para usar `@latest` explícitamente en lugar de depender de la caché.

**Archivo:** `~/.cursor/mcp.json`

**Configuración actualizada:**
```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": [
        "-y",
        "firecrawl-mcp@latest"
      ],
      "env": {
        "FIRECRAWL_API_KEY": "tu-api-key-aqui"
      }
    }
  }
}
```

**Cambio:** `"firecrawl-mcp"` → `"firecrawl-mcp@latest"`

---

## 📋 Verificación

### **Paso 1: Verificar Versión Disponible**

```bash
# Verificar última versión disponible
npm view firecrawl-mcp@latest version

# Ver todas las versiones disponibles
npm view firecrawl-mcp versions --json
```

---

### **Paso 2: Reiniciar Cursor Completamente**

1. **Cerrar TODAS las ventanas de Cursor**
2. **Esperar 5 segundos**
3. **Abrir Cursor nuevamente**

**⚠️ CRÍTICO:** No basta con recargar la ventana - debes cerrar completamente Cursor.

---

### **Paso 3: Verificar Logs**

1. **Abrir:** `View > Output > MCP`
2. **Buscar:**
   - ✅ "Successfully connected to stdio server" (para firecrawl)
   - ❌ "No matching version found" (no debería aparecer)

---

## 🔍 Diagnóstico Avanzado

### **Si el Error Persiste:**

1. **Verificar que la versión existe:**
   ```bash
   npm view firecrawl-mcp@3.7.2
   ```

2. **Limpiar completamente el caché de npm:**
   ```bash
   npm cache clean --force
   rm -rf ~/.npm/_npx
   ```

3. **Reinstalar manualmente:**
   ```bash
   npx -y firecrawl-mcp@latest
   ```

4. **Verificar configuración:**
   ```bash
   cat ~/.cursor/mcp.json | grep -A 10 "firecrawl"
   ```

---

## ⚠️ Nota Importante

**El error puede ocurrir por:**
- ✅ Caché desactualizada de npx
- ✅ Problemas de red temporales
- ✅ Versión específica eliminada temporalmente de npm

**Solución recomendada:**
- ✅ Usar `@latest` explícitamente en la configuración
- ✅ Limpiar caché de npx periódicamente
- ✅ Reiniciar Cursor después de cambios en la configuración

---

## 📚 Referencias

- **Paquete npm:** https://www.npmjs.com/package/firecrawl-mcp
- **Documentación Firecrawl:** https://docs.firecrawl.dev/

---

**Última actualización:** 2025-01-24

