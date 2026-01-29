# 🔧 Solución: MCP No Visible en Cursor

**Fecha:** 2025-01-03  
**Problema:** El MCP no aparece en las configuraciones de Cursor (Tools & MCP)

---

## 🔍 Problema Identificado

El MCP está configurado en `cline_mcp_settings.json`, pero Cursor puede requerir que también esté en `settings.json` para que aparezca en la interfaz de usuario.

---

## ✅ Solución Aplicada

### **1. Configuración en `settings.json`**

Se agregó la configuración del MCP directamente en el archivo `settings.json` de Cursor:

**Ubicación:**
```
~/Library/Application Support/Cursor/User/settings.json
```

**Configuración agregada:**
```json
{
  "mcpServers": {
    "storybook-ubits": {
      "command": "npx",
      "args": ["-y", "storybook-mcp@latest"],
      "env": {
        "STORYBOOK_URL": "https://ubits-storybook10.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT"
      }
    }
  }
}
```

### **2. Configuración en `cline_mcp_settings.json`**

También se mantiene la configuración en el archivo específico de MCP:

**Ubicación:**
```
~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json
```

---

## 📋 Próximos Pasos

### **1. Reiniciar Cursor Completamente** ⚠️ CRÍTICO

**IMPORTANTE:** Cursor debe reiniciarse completamente para que los cambios surtan efecto.

1. **Cierra Cursor completamente:**
   - macOS: `Cmd + Q` o cerrar todas las ventanas
   - No solo minimizar, debe cerrarse completamente

2. **Vuelve a abrir Cursor**

3. **Espera unos segundos** para que el MCP se inicialice

### **2. Verificar en la Interfaz de Cursor**

1. **Abre la configuración de Cursor:**
   - `Cmd + ,` (macOS) o `Ctrl + ,` (Windows/Linux)
   - O ve a `Settings` → `Features` → `MCP`

2. **Busca "Tools & MCP" o "MCP Servers"**

3. **Deberías ver:**
   - ✅ `storybook-ubits` en la lista de servidores MCP
   - ✅ Estado: Verde (conectado) o Amarillo (conectando)
   - ✅ Herramientas disponibles: `getComponentList`, `getComponentsProps`

### **3. Verificar que Funciona**

**Pregunta al asistente:**
```
"Lista los componentes disponibles en Storybook"
```

**O pregunta:**
```
"¿Cuáles son las props del componente Button?"
```

---

## 🐛 Si Aún No Aparece

### **Opción 1: Verificar Logs de Cursor**

1. Abre la paleta de comandos: `Cmd + Shift + P`
2. Busca "Developer: Show Logs"
3. Busca archivos de log relacionados con MCP:
   - `MCP user-storybook-ubits.log`
   - `MCP storybook-ubits.log`

### **Opción 2: Verificar Configuración Manualmente**

1. Abre `settings.json`:
   - `Cmd + Shift + P` → "Preferences: Open User Settings (JSON)"
2. Verifica que `mcpServers` esté presente
3. Verifica que el formato JSON sea correcto (sin errores de sintaxis)

### **Opción 3: Reinstalar el MCP**

```bash
npm run install-storybook-mcp
```

Luego reinicia Cursor completamente.

---

## 📚 Referencias

- **Guía de configuración:** `docs/guias/configuracion/GUIA-CONFIGURACION-STORYBOOK-MCP-NUEVO.md`
- **Documentación del MCP:** https://github.com/mcpland/storybook-mcp

---

**Última actualización:** 2025-01-03


