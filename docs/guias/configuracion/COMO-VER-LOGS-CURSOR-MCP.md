# 📋 Guía: Cómo Ver Logs de Cursor para MCP

> **Fecha:** 2025-01-24  
> **Objetivo:** Ver logs del servidor MCP de Storybook en Cursor

---

## 🎯 Método 1: Panel de Output (Recomendado)

### **Pasos:**

1. **Abrir el panel de Output:**
   - **macOS:** `Cmd + Shift + U`
   - **Windows/Linux:** `Ctrl + Shift + U`
   - O desde el menú: `View > Output`

2. **Seleccionar el canal de logs:**
   - En el dropdown superior del panel de Output, busca:
     - `MCP`
     - `Storybook`
     - `mcp-server`
     - O cualquier opción relacionada con MCP

3. **Revisar los logs:**
   - Busca mensajes relacionados con:
     - `storybook-mcp-wrapper.mjs`
     - `Failed to start`
     - `Error`
     - `Connected`

---

## 🎯 Método 2: Developer Tools

### **Pasos:**

1. **Abrir Developer Tools:**
   - **macOS:** `Cmd + Option + I` o `F12`
   - **Windows/Linux:** `Ctrl + Shift + I` o `F12`

2. **Ir a la pestaña Console:**
   - Busca mensajes relacionados con MCP
   - Filtra por "MCP" o "storybook"

3. **Revisar la pestaña Network (opcional):**
   - Puede mostrar conexiones fallidas al servidor MCP

---

## 🎯 Método 3: Archivos de Log en Disco

### **Ubicaciones:**

**macOS:**
```
~/Library/Application Support/Cursor/logs/
```

**Windows:**
```
%APPDATA%\Cursor\logs\
```

**Linux:**
```
~/.config/Cursor/logs/
```

### **Archivos relevantes:**

- `main.log` - Logs principales de Cursor
- `renderer.log` - Logs del renderer
- `mcp-server.log` - Logs del servidor MCP (si existe)

### **Ver el último log:**

```bash
# macOS
tail -f ~/Library/Application\ Support/Cursor/logs/main.log

# Filtrar por MCP
tail -f ~/Library/Application\ Support/Cursor/logs/main.log | grep -i mcp
```

---

## 🎯 Método 4: Verificar Procesos MCP

### **Desde la terminal:**

```bash
# Ver procesos MCP corriendo
ps aux | grep -i mcp | grep -v grep

# Ver procesos específicos de Storybook
ps aux | grep -i storybook | grep -v grep

# Ver procesos del wrapper
ps aux | grep storybook-mcp-wrapper
```

---

## 🔍 Qué Buscar en los Logs

### **Mensajes de éxito:**
- ✅ `MCP server started`
- ✅ `Connected to storybook`
- ✅ `Server initialized`

### **Mensajes de error:**
- ❌ `Failed to start MCP server`
- ❌ `Error loading module`
- ❌ `Cannot find module`
- ❌ `ERR_INPUT_TYPE_NOT_ALLOWED`
- ❌ `fetch failed`

### **Mensajes informativos:**
- ℹ️ `Starting MCP server`
- ℹ️ `Loading configuration`
- ℹ️ `Connecting to storybook`

---

## 🛠️ Solución de Problemas

### **Si no ves el panel de Output:**

1. **Asegúrate de que Cursor esté actualizado**
2. **Reinicia Cursor completamente**
3. **Verifica que el MCP esté configurado correctamente**

### **Si no hay logs del MCP:**

1. **Verifica la configuración:**
   - `~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`

2. **Verifica que el archivo del wrapper exista:**
   ```bash
   ls -la scripts/storybook-mcp-wrapper.mjs
   ```

3. **Prueba ejecutar el wrapper manualmente:**
   ```bash
   STORYBOOK_URL="..." node scripts/storybook-mcp-wrapper.mjs
   ```

---

## 📋 Checklist de Verificación

- [ ] Panel de Output abierto (`Cmd + Shift + U`)
- [ ] Canal de logs seleccionado (MCP, Storybook, etc.)
- [ ] Logs visibles en el panel
- [ ] Sin errores relacionados con `storybook-mcp-wrapper.mjs`
- [ ] Procesos MCP corriendo (verificado con `ps aux`)

---

## 💡 Tips

1. **Filtra los logs:** Usa `Cmd + F` (macOS) o `Ctrl + F` (Windows/Linux) para buscar términos específicos
2. **Guarda los logs:** Copia los logs relevantes para compartirlos si necesitas ayuda
3. **Revisa periódicamente:** Los logs pueden mostrar problemas que no son visibles en la interfaz

---

## 🎯 Próximos Pasos

Después de revisar los logs:

1. **Si hay errores:** Comparte el mensaje de error para diagnosticar
2. **Si no hay errores:** El MCP puede estar inicializándose, espera unos segundos más
3. **Si el MCP no aparece:** Verifica la configuración y reinicia Cursor

