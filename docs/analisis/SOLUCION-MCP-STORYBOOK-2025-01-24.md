# ✅ Solución: MCP de Storybook - Diagnóstico y Corrección

> **Fecha:** 2025-01-24  
> **Problema:** MCP de Storybook falla con "fetch failed"  
> **Estado:** ✅ Configuración corregida, requiere reiniciar Cursor

---

## 🔍 Diagnóstico del Problema

### **Problemas Identificados:**

1. **❌ URL incorrecta en configuración inicial**
   - Configurado para: `http://localhost:6006/index.json`
   - Necesario: `https://ubits-storybook10.vercel.app/index.json` (con token de bypass)

2. **❌ Nombre del servidor incorrecto**
   - Configurado como: `storybook-ubits`
   - Necesario: `storybook` (unificado)

3. **❌ Uso de npx en lugar de wrapper personalizado**
   - Configurado: `npx -y storybook-mcp@latest`
   - Mejor: `node scripts/storybook-mcp-wrapper.js` (mejor manejo de errores y timeouts)

---

## ✅ Solución Implementada

### **1. Actualización del Script de Configuración**

**Archivo:** `scripts/setup-storybook-mcp-auto.js`

**Cambios:**
- ✅ Nombre del servidor: `storybook` (no `storybook-ubits`)
- ✅ URL de Vercel con token de bypass automático
- ✅ Uso de wrapper personalizado con mejor manejo de errores

**Configuración generada:**
```json
{
  "mcpServers": {
    "storybook": {
      "command": "node",
      "args": [
        "/Users/elkinmac/Desktop/Autorun/scripts/storybook-mcp-wrapper.js"
      ],
      "env": {
        "STORYBOOK_URL": "https://ubits-storybook10.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT"
      }
    }
  }
}
```

### **2. Verificación de Dependencias**

✅ **Dependencias instaladas:**
- `@modelcontextprotocol/sdk@1.25.1`
- `playwright@1.57.0`
- `zod` (para validación)

### **3. Wrapper Personalizado**

**Archivo:** `scripts/storybook-mcp-wrapper.js`

**Mejoras:**
- ✅ Timeout aumentado (60s para navegación, 30s para selectores)
- ✅ Múltiples selectores alternativos para props
- ✅ Mejor manejo de errores
- ✅ Espera adicional para contenido dinámico (5s después de networkidle)

---

## ⚠️ Acción Requerida: Reiniciar Cursor

**🚨 CRÍTICO:** El MCP necesita reiniciarse para aplicar los cambios.

### **Pasos:**

1. **Cerrar Cursor completamente**
   - macOS: `Cmd + Q` (no solo cerrar ventanas)
   - Asegurarse de que no queden procesos en segundo plano

2. **Reabrir Cursor**

3. **Esperar 5-10 segundos** para que el MCP se inicialice

4. **Verificar que funciona:**
   ```typescript
   // Probar con:
   await call_mcp_tool({
     server: 'storybook',
     toolName: 'getComponentList',
     arguments: {}
   });
   ```

---

## 🧪 Pruebas Realizadas

### **✅ Verificaciones Exitosas:**

1. ✅ **URL de Storybook accesible**
   - `curl` a `https://ubits-storybook10.vercel.app/index.json` funciona
   - Retorna JSON válido con todos los componentes

2. ✅ **Configuración escrita correctamente**
   - Archivo: `~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`
   - Configuración correcta con nombre `storybook` y wrapper personalizado

3. ✅ **Dependencias instaladas**
   - `@modelcontextprotocol/sdk` ✅
   - `playwright` ✅

### **❌ Pruebas Pendientes (requieren reiniciar Cursor):**

1. ⏳ **getComponentList** - Listar componentes
2. ⏳ **getComponentsProps** - Obtener props de componentes
3. ⏳ **Mapeo de nombres** - Verificar que "Navegación/Tabs" funciona

---

## 📋 Checklist de Verificación

Después de reiniciar Cursor:

- [ ] MCP `storybook` aparece en la lista de servidores MCP
- [ ] `getComponentList` retorna lista de componentes
- [ ] `getComponentsProps(['Navegación/Tabs'])` retorna props
- [ ] No hay errores "fetch failed"
- [ ] El wrapper personalizado se ejecuta correctamente

---

## 🔧 Comandos Útiles

### **Verificar configuración:**
```bash
cat ~/Library/Application\ Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json | grep -A 10 storybook
```

### **Reconfigurar si es necesario:**
```bash
cd /Users/elkinmac/Desktop/Autorun
node scripts/setup-storybook-mcp-auto.js
```

### **Probar URL directamente:**
```bash
curl "https://ubits-storybook10.vercel.app/index.json?x-vercel-set-bypass-cookie=true&x-vercel-protection-bypass=dMReKsdpAT4Y3Vn3jntlWP7zQzsjCsrT" | head -50
```

---

## 🎯 Conclusión

**Estado:** ✅ Configuración corregida y lista para usar

**Próximo paso:** ⚠️ **REINICIAR CURSOR** para que el MCP se inicialice con la nueva configuración.

**Después de reiniciar:** Probar `getComponentList` y `getComponentsProps` para verificar que funciona correctamente.

---

## 📝 Notas Técnicas

- El wrapper personalizado usa Playwright para extraer props desde Storybook
- El timeout está aumentado a 60s para manejar páginas lentas
- La URL de Vercel incluye token de bypass para acceso protegido
- El nombre del servidor debe ser `storybook` (no `storybook-ubits`) para coincidir con el código


